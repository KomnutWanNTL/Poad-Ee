import { useState, useCallback } from 'react'
import type { AppSettings } from '../types'
import * as settingsService from '../services/settingsService'

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() =>
    settingsService.getSettings()
  )

  const update = useCallback((partial: Partial<AppSettings>) => {
    const updated = settingsService.updateSettings(partial)
    setSettings(updated)
    return updated
  }, [])

  return { settings, update }
}
