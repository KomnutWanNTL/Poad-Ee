import type { LogRecord } from '../types'

const REQUIRED_FIELDS: (keyof LogRecord)[] = [
  'id',
  'recordedAt',
  'bristolType',
  'color',
  'amount',
  'effort',
  'createdAt',
  'updatedAt',
]

const VALID_BRISTOL = [1, 2, 3, 4, 5, 6, 7]
const VALID_COLORS = ['brown', 'green', 'black', 'reddish', 'yellow', 'white']
const VALID_AMOUNTS = ['low', 'normal', 'high']
const VALID_EFFORTS = ['easy', 'moderate', 'hard']

export function validateRecord(obj: unknown): obj is LogRecord {
  if (!obj || typeof obj !== 'object') return false
  const r = obj as Record<string, unknown>

  for (const field of REQUIRED_FIELDS) {
    if (!(field in r)) return false
  }

  if (typeof r.id !== 'string') return false
  if (typeof r.recordedAt !== 'string') return false
  if (isNaN(Date.parse(r.recordedAt as string))) return false
  if (!VALID_BRISTOL.includes(r.bristolType as number)) return false
  if (!VALID_COLORS.includes(r.color as string)) return false
  if (!VALID_AMOUNTS.includes(r.amount as string)) return false
  if (!VALID_EFFORTS.includes(r.effort as string)) return false
  if (typeof r.createdAt !== 'string' || isNaN(Date.parse(r.createdAt as string)))
    return false
  if (typeof r.updatedAt !== 'string' || isNaN(Date.parse(r.updatedAt as string)))
    return false

  return true
}

export function validateImportData(jsonData: unknown): LogRecord[] {
  if (!Array.isArray(jsonData)) {
    throw new Error('ข้อมูลไม่ถูกต้อง — ไฟล์ JSON ต้องเป็น array')
  }

  const records: LogRecord[] = []
  for (const item of jsonData) {
    if (!validateRecord(item)) {
      throw new Error('ข้อมูลไม่ถูกต้อง — พบ record ที่ schema ไม่ถูกต้อง')
    }
    records.push(item)
  }
  return records
}

export function filterNewRecords(
  incoming: LogRecord[],
  existing: LogRecord[]
): LogRecord[] {
  const existingKeys = new Set(
    existing.map((r) => `${r.recordedAt}_${r.bristolType}`)
  )
  return incoming.filter(
    (r) => !existingKeys.has(`${r.recordedAt}_${r.bristolType}`)
  )
}
