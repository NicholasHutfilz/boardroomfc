import { useState, useEffect, useCallback } from 'react'
import { supabase, SaveMetadata } from '../supabase'
import { useAuth } from '../auth-context'

export function useSaves() {
  const [saves, setSaves] = useState<SaveMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchSaves = useCallback(async () => {
    if (!user) {
      setSaves([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('save_metadata')
        .select('*')
        .eq('user_id', user.id)
        .order('date_last_opened', { ascending: false })

      if (error) {
        throw error
      }

      setSaves(data || [])
    } catch (err) {
      console.error('Error fetching saves:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch saves')
      setSaves([])
    } finally {
      setLoading(false)
    }
  }, [user])

  const createSave = async (saveData: {
    name: string
    manager_name: string
    most_recent_team?: string
    most_recent_place?: string
    most_recent_season?: string
  }) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const now = new Date().toISOString()
    
    try {
      const { data, error } = await supabase
        .from('save_metadata')
        .insert({
          user_id: user.id,
          name: saveData.name,
          manager_name: saveData.manager_name,
          date_created: now,
          date_last_opened: now,
          most_recent_team: saveData.most_recent_team,
          most_recent_place: saveData.most_recent_place,
          most_recent_season: saveData.most_recent_season,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      // Refresh saves list
      await fetchSaves()
      
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create save')
      throw err
    }
  }

  const updateSaveLastOpened = async (saveId: string) => {
    try {
      const { error } = await supabase
        .from('save_metadata')
        .update({ date_last_opened: new Date().toISOString() })
        .eq('id', saveId)

      if (error) {
        throw error
      }

      // Refresh saves list
      await fetchSaves()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update save')
      throw err
    }
  }

  const deleteSave = async (saveId: string) => {
    try {
      const { error } = await supabase
        .from('save_metadata')
        .delete()
        .eq('id', saveId)

      if (error) {
        throw error
      }

      // Refresh saves list
      await fetchSaves()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete save')
      throw err
    }
  }

  useEffect(() => {
    fetchSaves()
  }, [fetchSaves])

  return {
    saves,
    loading,
    error,
    createSave,
    updateSaveLastOpened,
    deleteSave,
    refetch: fetchSaves,
  }
} 