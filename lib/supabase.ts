import { createClient } from '@supabase/supabase-js'
import { logger } from './logger'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = 'Missing Supabase environment variables. Please check your .env.local file.'
  logger.error('Supabase configuration error', new Error(errorMessage), {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  })
  throw new Error(errorMessage)
}

logger.info('Initializing Supabase client', {
  url: supabaseUrl,
  environment: process.env.NODE_ENV
})

// Create Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Enhanced auth options for better reliability
    storageKey: 'boardroomfc-auth-token',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
  // Add global error handling
  global: {
    headers: {
      'x-client': 'boardroom-fc'
    }
  }
})

// Enhanced database query wrapper with logging
export const createDbQuery = (tableName: string) => {
  return {
    select: async (columns = '*', filters?: Record<string, any>) => {
      logger.db.query('SELECT', tableName, { columns, filters })
      
      try {
        let query = supabase.from(tableName).select(columns)
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }
        
        const result = await query
        
        if (result.error) {
          logger.db.error('SELECT', tableName, result.error, { columns, filters })
        } else {
          logger.db.success('SELECT', tableName, { 
            count: result.data?.length || 0,
            columns,
            filters 
          })
        }
        
        return result
      } catch (error) {
        logger.db.error('SELECT', tableName, error, { columns, filters })
        throw error
      }
    },

    insert: async (data: Record<string, any> | Record<string, any>[]) => {
      logger.db.query('INSERT', tableName, { recordCount: Array.isArray(data) ? data.length : 1 })
      
      try {
        const result = await supabase.from(tableName).insert(data).select()
        
        if (result.error) {
          logger.db.error('INSERT', tableName, result.error, { data })
        } else {
          logger.db.success('INSERT', tableName, { 
            insertedCount: result.data?.length || 0 
          })
        }
        
        return result
      } catch (error) {
        logger.db.error('INSERT', tableName, error, { data })
        throw error
      }
    },

    update: async (data: Record<string, any>, filters: Record<string, any>) => {
      logger.db.query('UPDATE', tableName, { data, filters })
      
      try {
        let query = supabase.from(tableName).update(data)
        
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
        
        const result = await query.select()
        
        if (result.error) {
          logger.db.error('UPDATE', tableName, result.error, { data, filters })
        } else {
          logger.db.success('UPDATE', tableName, { 
            updatedCount: result.data?.length || 0,
            filters 
          })
        }
        
        return result
      } catch (error) {
        logger.db.error('UPDATE', tableName, error, { data, filters })
        throw error
      }
    },

    delete: async (filters: Record<string, any>) => {
      logger.db.query('DELETE', tableName, { filters })
      
      try {
        let query = supabase.from(tableName).delete()
        
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
        
        const result = await query
        
        if (result.error) {
          logger.db.error('DELETE', tableName, result.error, { filters })
        } else {
          logger.db.success('DELETE', tableName, { filters })
        }
        
        return result
      } catch (error) {
        logger.db.error('DELETE', tableName, error, { filters })
        throw error
      }
    }
  }
}

// Pre-configured query helpers for our main tables
export const dbQueries = {
  userProfiles: createDbQuery('user_profiles'),
  saveMetadata: createDbQuery('save_metadata'),
  tempManagerInfo: createDbQuery('temp_manager_info')
}

// Types for our database tables
export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  nationality?: string
  birth_place?: string
  date_of_birth?: string
  favorite_team?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface SaveMetadata {
  id: string
  user_id: string
  name: string
  manager_name: string
  date_created: string
  date_last_opened: string
  most_recent_team?: string
  most_recent_place?: string
  most_recent_season?: string
  save_uuid: string
  created_at: string
  updated_at: string
}

export interface TempManagerInfo {
  id: string
  save_id: string
  first_name: string
  last_name: string
  nationality?: string
  birth_place?: string
  date_of_birth?: string
  favorite_team?: string
  selected_club?: string
  coaching_license?: string
  playing_experience?: string
  created_at: string
  updated_at: string
} 