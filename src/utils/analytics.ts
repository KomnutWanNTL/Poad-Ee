import type { LogRecord } from '../types'
import { getDateOnly, getDaysBack } from './dateUtils'

export function filterRecords(records: LogRecord[], days: number): LogRecord[] {
  const cutoff = getDaysBack(days)
  return records.filter((r) => new Date(r.recordedAt) >= cutoff)
}

export function getDailyFrequency(
  records: LogRecord[],
  days: number
): { date: string; label: string; count: number }[] {
  const THAI_DAYS_SHORT = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
  const result: { date: string; label: string; count: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const count = records.filter((r) => getDateOnly(r.recordedAt) === key).length
    result.push({
      date: key,
      label: THAI_DAYS_SHORT[d.getDay()],
      count,
    })
  }
  return result
}

export function getBristolDistribution(
  records: LogRecord[]
): { type: number; label: string; count: number; percentage: number; color: string }[] {
  const bristolColors: Record<number, string> = {
    1: '#6B3A1F',
    2: '#8B5230',
    3: '#4A7A50',
    4: '#2E8B52',
    5: '#3A6FA8',
    6: '#5A6ABF',
    7: '#7A55A8',
  }
  const bristolLabels: Record<number, string> = {
    1: 'ประเภท 1',
    2: 'ประเภท 2',
    3: 'ประเภท 3',
    4: 'ประเภท 4',
    5: 'ประเภท 5',
    6: 'ประเภท 6',
    7: 'ประเภท 7',
  }
  const counts: Record<number, number> = {}
  for (const r of records) {
    counts[r.bristolType] = (counts[r.bristolType] || 0) + 1
  }

  const total = records.length || 1
  const result = Object.entries(counts).map(([type, count]) => {
    const t = Number(type)
    return {
      type: t,
      label: bristolLabels[t],
      count,
      percentage: Math.round((count / total) * 100),
      color: bristolColors[t],
    }
  })
  result.sort((a, b) => b.percentage - a.percentage)
  return result
}

export function getColorDistribution(
  records: LogRecord[]
): { color: string; label: string; count: number; percentage: number; hex: string }[] {
  const colorMap: Record<string, string> = {
    brown: 'น้ำตาล',
    green: 'เขียว',
    black: 'ดำ',
    reddish: 'แดงปน',
    yellow: 'เหลือง',
    white: 'ขาว',
  }
  const colorHexMap: Record<string, string> = {
    brown: '#8B6914',
    green: '#4A7A50',
    black: '#2D2D2D',
    reddish: '#B22222',
    yellow: '#D4A81A',
    white: '#E8E0D8',
  }

  const counts: Record<string, number> = {}
  for (const r of records) {
    counts[r.color] = (counts[r.color] || 0) + 1
  }

  const total = records.length || 1
  const result = Object.entries(counts).map(([color, count]) => ({
    color,
    label: colorMap[color] || color,
    count,
    percentage: Math.round((count / total) * 100),
    hex: colorHexMap[color] || '#999',
  }))
  result.sort((a, b) => b.percentage - a.percentage)
  return result
}

export function getTopBristolType(
  records: LogRecord[]
): { type: number | null; label: string } {
  const dist = getBristolDistribution(records)
  if (dist.length === 0) return { type: null, label: '—' }
  return { type: dist[0].type, label: dist[0].label }
}

export function getCurrentStreak(records: LogRecord[]): number {
  if (records.length === 0) return 0
  const dates = new Set(records.map((r) => getDateOnly(r.recordedAt)))
  let streak = 0
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (dates.has(key)) {
      streak++
    } else {
      if (i === 0) continue
      break
    }
  }
  return streak
}

export function getLongestStreak(records: LogRecord[]): number {
  if (records.length === 0) return 0
  const sorted = [...records].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  )
  let longest = 0
  let current = 0
  let prevDate: Date | null = null

  for (const r of sorted) {
    const d = new Date(r.recordedAt)
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    if (!prevDate) {
      current = 1
    } else {
      const diff = (day.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      if (diff === 1) {
        current++
      } else if (diff > 1) {
        current = 1
      }
    }
    longest = Math.max(longest, current)
    prevDate = day
  }
  return longest
}

export function getFirstRecordDate(records: LogRecord[]): Date | null {
  if (records.length === 0) return null
  const sorted = [...records].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  )
  return new Date(sorted[0].recordedAt)
}
