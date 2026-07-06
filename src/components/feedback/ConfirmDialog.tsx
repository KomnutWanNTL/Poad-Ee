import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'coral'
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'ยืนยัน',
  cancelLabel = 'ยกเลิก',
  variant = 'coral',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    confirmRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll<HTMLElement>(
          '[data-dialog-focusable]'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />
      <div
        className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="text-h2 text-text mb-2">{title}</div>
        <div className="text-body text-muted mb-6">{message}</div>
        <div className="flex gap-3">
          <button
            data-dialog-focusable
            ref={confirmRef}
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-3 text-body font-medium text-white transition-colors duration-150 min-h-[44px] ${
              variant === 'danger'
                ? 'bg-danger hover:bg-red-700'
                : 'bg-coral hover:bg-coral-d'
            }`}
          >
            {confirmLabel}
          </button>
          <button
            data-dialog-focusable
            onClick={onCancel}
            className="flex-1 rounded-xl px-4 py-3 text-body font-medium text-coral bg-surface hover:bg-coral-l transition-colors duration-150 min-h-[44px]"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
