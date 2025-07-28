import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'
import { useAuth } from '@/lib/auth-context'

export interface ManagerFormData {
  firstName: string
  lastName: string
  nationality?: string
  birthPlace?: string
  dateOfBirth?: string
  favoriteTeam?: string
  selectedClub?: string | null
  isUnemployed?: boolean
  coachingLicense?: string
  playingExperience?: string
}

export function useManagerCreation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  const createManagerAndSave = async (managerData: ManagerFormData) => {
    if (!user) {
      logger.auth.failure('create manager', new Error('No authenticated user'))
      setError('You must be logged in to create a manager')
      return
    }

    try {
      logger.info('Creating manager and save', { 
        managerName: `${managerData.firstName} ${managerData.lastName}`,
        userId: user.id 
      })
      setLoading(true)
      setError(null)

      // Create save metadata first
      const saveMetadata = {
        user_id: user.id,
        name: `${managerData.firstName} ${managerData.lastName}`,
        manager_name: `${managerData.firstName} ${managerData.lastName}`,
        date_created: new Date().toISOString(),
        date_last_opened: new Date().toISOString(),
        most_recent_team: managerData.isUnemployed ? null : managerData.selectedClub,
        most_recent_place: null,
        most_recent_season: '2024/25'
      }

      logger.db.query('INSERT', 'save_metadata', { userId: user.id })
      const { data: saveData, error: saveError } = await supabase
        .from('save_metadata')
        .insert(saveMetadata)
        .select()
        .single()

      if (saveError) {
        logger.db.error('INSERT', 'save_metadata', saveError, { userId: user.id })
        throw saveError
      }

      logger.db.success('INSERT', 'save_metadata', { 
        saveId: saveData.id,
        userId: user.id 
      })

      // Create temporary manager info
      const tempManagerInfo = {
        save_id: saveData.id,
        first_name: managerData.firstName,
        last_name: managerData.lastName,
        nationality: managerData.nationality || '',
        birth_place: managerData.birthPlace || '',
        date_of_birth: managerData.dateOfBirth || null,
        favorite_team: managerData.favoriteTeam || '',
        selected_club: managerData.selectedClub || null,
        coaching_license: managerData.coachingLicense || 'None',
        playing_experience: managerData.playingExperience || 'Amateur'
      }

      logger.db.query('INSERT', 'temp_manager_info', { saveId: saveData.id })
      const { error: managerError } = await supabase
        .from('temp_manager_info')
        .insert(tempManagerInfo)

      if (managerError) {
        logger.db.error('INSERT', 'temp_manager_info', managerError, { saveId: saveData.id })
        throw managerError
      }

      logger.db.success('INSERT', 'temp_manager_info', { saveId: saveData.id })
      logger.info('Manager and save created successfully', { 
        saveId: saveData.id,
        managerName: `${managerData.firstName} ${managerData.lastName}`
      })

      // Navigate to dashboard
      router.push('/dashboard')

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create manager'
      logger.error('Failed to create manager and save', err, { userId: user.id })
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    createManagerAndSave
  }
} 