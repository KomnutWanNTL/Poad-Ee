import { useState, useCallback, useRef } from 'react'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastState {
  id: number
  message: string
  variant: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([])
  const nextId = useRef(0)

  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { id, message, variant }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, show, dismiss }
}
