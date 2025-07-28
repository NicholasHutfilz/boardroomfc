import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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