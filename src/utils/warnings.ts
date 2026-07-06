import type { LogRecord, AlertWarning } from '../types'
import { getDateOnly, getDaysBack } from './dateUtils'

function daysSinceLastRecord(records: LogRecord[]): number {
  if (records.length === 0) return Infinity
  const sorted = [...records].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  )
  const last = new Date(sorted[0].recordedAt)
  const now = new Date()
  const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  return Math.floor(diff)
}

export function checkWarnings(records: LogRecord[]): AlertWarning[] {
  const warnings: AlertWarning[] = []

  const noRecordDays = daysSinceLastRecord(records)
  if (noRecordDays >= 3) {
    warnings.push({
      id: 'constipation-warning',
      level: 'danger',
      message:
        noRecordDays >= 7
          ? `ไม่มีการบันทึกมา ${noRecordDays} วันแล้ว — ควรตรวจสุขภาพ`
          : `คุณไม่มีการบันทึกมา ${noRecordDays} วันแล้ว`,
    })
  }

  const weekAgo = getDaysBack(7)
  const weekRecords = records.filter((r) => new Date(r.recordedAt) >= weekAgo)

  const type1Count = weekRecords.filter((r) => r.bristolType === 1).length
  if (type1Count > 5) {
    warnings.push({
      id: 'chronic-constipation',
      level: 'warning',
      message: `พบท้องผูกรุนแรงต่อเนื่อง (Type 1 ซ้ำ ${type1Count} ครั้งใน 7 วัน)`,
    })
  }

  const hasBlood = weekRecords.some(
    (r) => r.color === 'black' || r.color === 'reddish'
  )
  if (hasBlood) {
    warnings.push({
      id: 'blood-warning',
      level: 'critical',
      message: 'พบสีผิดปกติ (ดำ/แดงปน) — ควรปรึกษาแพทย์',
    })
  }

  const recentDays: string[] = []
  for (let i = 2; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    recentDays.push(d.toISOString().slice(0, 10))
  }

  const type5to6ByDay: Record<string, number> = {}
  for (const r of records) {
    const day = getDateOnly(r.recordedAt)
    if (recentDays.includes(day) && (r.bristolType === 5 || r.bristolType === 6)) {
      type5to6ByDay[day] = (type5to6ByDay[day] || 0) + 1
    }
  }
  let consecutiveType5to6 = 0
  let maxConsecutiveType5to6 = 0
  for (const day of recentDays) {
    if ((type5to6ByDay[day] || 0) > 0) {
      consecutiveType5to6++
      maxConsecutiveType5to6 = Math.max(maxConsecutiveType5to6, consecutiveType5to6)
    } else {
      consecutiveType5to6 = 0
    }
  }
  if (maxConsecutiveType5to6 >= 2) {
    warnings.push({
      id: 'diarrhea-trend',
      level: 'warning',
      message: `พบท้องเสียต่อเนื่อง (Type 5-6 ติดต่อกัน ${maxConsecutiveType5to6} วัน)`,
    })
  }

  return warnings
}
