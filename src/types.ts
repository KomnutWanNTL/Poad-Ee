export interface LogRecord {
  id: string
  recordedAt: string
  bristolType: 1 | 2 | 3 | 4 | 5 | 6 | 7
  color: 'brown' | 'green' | 'black' | 'reddish' | 'yellow' | 'white'
  amount: 'low' | 'normal' | 'high'
  effort: 'easy' | 'moderate' | 'hard'
  note?: string
  createdAt: string
  updatedAt: string
}

export interface AppSettings {
  language: 'th' | 'en'
  theme: 'light' | 'dark'
  iosPromptDismissed: boolean
  iosPromptLastShown: string | null
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'th',
  theme: 'light',
  iosPromptDismissed: false,
  iosPromptLastShown: null,
}

export interface ImportResult {
  imported: number
  skipped: number
  total: number
}

export interface AlertWarning {
  id: string
  level: 'warning' | 'danger' | 'critical'
  message: string
}
