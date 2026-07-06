import type { LogRecord } from '../types'

export function calculateTypeScore(records: LogRecord[]): number {
  if (records.length === 0) return 0
  let score = 0
  for (const r of records) {
    if (r.bristolType === 4) score += 1.0
    else if (r.bristolType === 3) score += 0.8
  }
  return score / records.length
}

export function calculateFrequencyScore(records: LogRecord[], days: number): number {
  if (records.length === 0) return 0
  const avgPerDay = records.length / days

  if (avgPerDay >= 0.7 && avgPerDay <= 1.3) return 1.0
  if (avgPerDay >= 0.5 && avgPerDay <= 1.5) return 0.8
  if (avgPerDay >= 0.3 && avgPerDay <= 2.0) return 0.5
  if (avgPerDay > 3.0) return 0.3
  return 0.2
}

export function calculateColorScore(records: LogRecord[]): number {
  if (records.length === 0) return 0
  const normalCount = records.filter((r) => r.color === 'brown').length
  return normalCount / records.length
}

export function calculateHealthScore(records: LogRecord[], days = 7): number {
  if (records.length === 0) return 0
  const typeScore = calculateTypeScore(records)
  const frequencyScore = calculateFrequencyScore(records, days)
  const colorScore = calculateColorScore(records)
  return Math.round((typeScore * 0.5 + frequencyScore * 0.3 + colorScore * 0.2) * 100)
}

export function getPreviousPeriodScore(
  allRecords: LogRecord[],
  currentPeriodDays: number
): number | null {
  const now = new Date()
  const prevStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - currentPeriodDays * 2
  )
  const prevEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - currentPeriodDays
  )
  const prevRecords = allRecords.filter((r) => {
    const d = new Date(r.recordedAt)
    return d >= prevStart && d < prevEnd
  })
  if (prevRecords.length === 0) return null
  return calculateHealthScore(prevRecords, currentPeriodDays)
}

export function getScoreClassification(score: number): {
  level: string
  color: string
  icon: string
} {
  if (score >= 80) return { level: 'ดีมาก', color: '#4A8F62', icon: '🟢' }
  if (score >= 60) return { level: 'ดี', color: '#4A8F62', icon: '✓' }
  if (score >= 40) return { level: 'ควรระวัง', color: '#F5A432', icon: '⚠️' }
  return { level: 'ควรพบแพทย์', color: '#DC2626', icon: '🔴' }
}

export function getScoreBreakdown(records: LogRecord[], days = 7): {
  typeScore: number
  frequencyScore: number
  colorScore: number
} {
  return {
    typeScore: Math.round(calculateTypeScore(records) * 100),
    frequencyScore: Math.round(calculateFrequencyScore(records, days) * 100),
    colorScore: Math.round(calculateColorScore(records) * 100),
  }
}
