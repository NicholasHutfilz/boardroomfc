import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, TempManagerInfo } from '../supabase'
import { useAuth } from '../auth-context'
import { useSaves } from './use-saves'

export interface ManagerFormData {
  firstName: string
  lastName: string
  nationality: string
  birthPlace: string
  dateOfBirth: string
  favoriteTeam: string
  selectedClub: string | null
  isUnemployed: boolean
  coachingLicense: string
  playingExperience: string
}

export function useManagerCreation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { createSave } = useSaves()
  const router = useRouter()

  const createManagerAndSave = async (formData: ManagerFormData) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    setLoading(true)
    setError(null)

    try {
      // First create the save metadata
      const saveData = await createSave({
        name: `${formData.firstName} ${formData.lastName} - ${formData.selectedClub || 'Unemployed'}`,
        manager_name: `${formData.firstName} ${formData.lastName}`,
        most_recent_team: formData.isUnemployed ? undefined : formData.selectedClub || undefined,
        most_recent_place: formData.isUnemployed ? undefined : 'Preseason',
        most_recent_season: new Date().getFullYear() + '/' + (new Date().getFullYear() + 1).toString().slice(-2),
      })

      if (!saveData) {
        throw new Error('Failed to create save')
      }

      // Then create the temporary manager info
      const { error: managerError } = await supabase
        .from('temp_manager_info')
        .insert({
          save_id: saveData.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          nationality: formData.nationality,
          birth_place: formData.birthPlace,
          date_of_birth: formData.dateOfBirth || null,
          favorite_team: formData.favoriteTeam,
          selected_club: formData.selectedClub,
          coaching_license: formData.coachingLicense,
          playing_experience: formData.playingExperience,
        })

      if (managerError) {
        throw managerError
      }

      // Navigate to dashboard on success
      router.push('/dashboard')
      
      return saveData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create manager'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getManagerInfo = async (saveId: string): Promise<TempManagerInfo | null> => {
    try {
      const { data, error } = await supabase
        .from('temp_manager_info')
        .select('*')
        .eq('save_id', saveId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (err) {
      console.error('Error fetching manager info:', err)
      return null
    }
  }

  const updateManagerInfo = async (saveId: string, updates: Partial<TempManagerInfo>) => {
    try {
      const { error } = await supabase
        .from('temp_manager_info')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('save_id', saveId)

      if (error) {
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update manager info')
      throw err
    }
  }

  return {
    loading,
    error,
    createManagerAndSave,
    getManagerInfo,
    updateManagerInfo,
  }
} 