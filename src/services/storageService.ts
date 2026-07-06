import type { LogRecord } from '../types'
import { toLocalISOString } from '../utils/dateUtils'

const STORAGE_KEY = 'poad-ee-records'

function readRecords(): LogRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as LogRecord[]
  } catch {
    return []
  }
}

function writeRecords(records: LogRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch (err) {
    if (
      err instanceof DOMException &&
      (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
      const quotaErr = new Error(
        'พื้นที่เก็บข้อมูลเต็ม — กรุณาส่งออกและลบข้อมูลบางส่วนก่อนบันทึกใหม่'
      )
      throw quotaErr
    }
    throw err
  }
}

export function getRecords(): LogRecord[] {
  return readRecords()
}

export function getRecordById(id: string): LogRecord | undefined {
  return readRecords().find((r) => r.id === id)
}

export function addRecord(record: LogRecord): void {
  const records = readRecords()
  records.push(record)
  writeRecords(records)
}

export function updateRecord(id: string, partial: Partial<LogRecord>): void {
  const records = readRecords()
  const idx = records.findIndex((r) => r.id === id)
  if (idx === -1) return
  records[idx] = { ...records[idx], ...partial, updatedAt: toLocalISOString() }
  writeRecords(records)
}

export function deleteRecord(id: string): void {
  const records = readRecords().filter((r) => r.id !== id)
  writeRecords(records)
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function importRecords(newRecords: LogRecord[]): void {
  const existing = readRecords()
  const keys = new Set(existing.map((r) => `${r.recordedAt}_${r.bristolType}`))
  const toAdd = newRecords.filter(
    (r) => !keys.has(`${r.recordedAt}_${r.bristolType}`)
  )
  writeRecords([...existing, ...toAdd])
}
