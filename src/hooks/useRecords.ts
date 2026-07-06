import { useState, useCallback, useEffect } from 'react'
import type { LogRecord } from '../types'
import * as storage from '../services/storageService'

export function useRecords() {
  const [records, setRecords] = useState<LogRecord[]>(() => storage.getRecords())

  const refresh = useCallback(() => {
    setRecords(storage.getRecords())
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'poad-ee-records' || e.key === null) {
        refresh()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [refresh])

  const add = useCallback(
    (record: LogRecord) => {
      storage.addRecord(record)
      refresh()
    },
    [refresh]
  )

  const update = useCallback(
    (id: string, partial: Partial<LogRecord>) => {
      storage.updateRecord(id, partial)
      refresh()
    },
    [refresh]
  )

  const remove = useCallback(
    (id: string) => {
      storage.deleteRecord(id)
      refresh()
    },
    [refresh]
  )

  const clearAll = useCallback(() => {
    storage.clearAll()
    refresh()
  }, [refresh])

  const importData = useCallback(
    (newRecords: LogRecord[]) => {
      storage.importRecords(newRecords)
      refresh()
    },
    [refresh]
  )

  return { records, refresh, add, update, remove, clearAll, importData }
}
