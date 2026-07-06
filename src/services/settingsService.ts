import type { AppSettings } from '../types'
import { DEFAULT_SETTINGS } from '../types'

const SETTINGS_KEY = 'poad-ee-settings'

function readSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

function writeSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function getSettings(): AppSettings {
  return readSettings()
}

export function updateSettings(partial: Partial<AppSettings>): AppSettings {
  const current = readSettings()
  const updated = { ...current, ...partial }
  writeSettings(updated)
  return updated
}
