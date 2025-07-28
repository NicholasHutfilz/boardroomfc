"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Server-side logging utility
const log = {
  info: (message: string, data?: unknown) => {
    console.log(`[AUTH-INFO] ${new Date().toISOString()} - ${message}`, data || '')
  },
  error: (message: string, error?: unknown) => {
    console.error(`[AUTH-ERROR] ${new Date().toISOString()} - ${message}`, error || '')
  },
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUTH-DEBUG] ${new Date().toISOString()} - ${message}`, data || '')
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    log.info('Initializing auth context')
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        log.debug('Getting initial session')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          log.error('Error getting initial session', error)
        } else {
          setUser(session?.user ?? null)
          log.info('Initial session loaded', { 
            hasUser: !!session?.user,
            userId: session?.user?.id 
          })
        }
      } catch (error) {
        log.error('Exception getting initial session', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        log.info('Auth state changed', { event, hasUser: !!session?.user })
        
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle user profile creation on sign up
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user && !session.user.email_confirmed_at) {
          log.info('Creating user profile for new user', { userId: session.user.id })
          try {
            const { error: profileError } = await supabase
              .from('user_profiles')
              .insert({
                id: session.user.id,
                email: session.user.email || '',
                first_name: '',
                last_name: ''
              })
            
            if (profileError) {
              log.error('Error creating user profile', profileError)
            } else {
              log.info('User profile created successfully')
            }
          } catch (error) {
            log.error('Exception creating user profile', error)
          }
        }
      }
    )

    return () => {
      log.debug('Cleaning up auth subscription')
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      log.info('Attempting sign in', { email })
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        log.error('Sign in failed', { email, error: error.message })
        return { error }
      }

      log.info('Sign in successful', { 
        email, 
        userId: data.user?.id 
      })
      
      return { error: null }
    } catch (error) {
      log.error('Exception during sign in', error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      log.info('Attempting sign up', { email })
      setLoading(true)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        log.error('Sign up failed', { email, error: error.message })
        return { error }
      }

      log.info('Sign up successful', { 
        email, 
        userId: data.user?.id,
        needsConfirmation: !data.session
      })
      
      return { error: null }
    } catch (error) {
      log.error('Exception during sign up', error)
      return { error: error as Error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      log.info('Attempting sign out', { userId: user?.id })
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        log.error('Sign out failed', error)
        return { error }
      }

      log.info('Sign out successful')
      return { error: null }
    } catch (error) {
      log.error('Exception during sign out', error)
      return { error: error as Error }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 