import { useEffect, useState, useRef } from 'react'

interface IosInstallPromptProps {
  visible: boolean
  onDismiss: () => void
}

export default function IosInstallPrompt({ visible, onDismiss }: IosInstallPromptProps) {
  const [show, setShow] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!visible) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => setShow(true))
    })
    return () => cancelAnimationFrame(rafRef.current)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-end justify-center transition-colors duration-300 ${
        show ? 'bg-black/50' : 'bg-black/0'
      }`}
      onClick={onDismiss}
    >
      <div
        className={`w-full max-w-md bg-white rounded-t-2xl px-5 pt-6 pb-8 transition-transform duration-300 ease-out ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-h4 font-bold text-coral">เพิ่มแอปไปที่หน้าจอโฮม</h2>
          <button
            onClick={onDismiss}
            className="text-muted hover:text-text p-1"
            aria-label="ปิด"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8634B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <polyline points="8 12 12 16 16 12" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-muted/10 rounded-lg px-3 py-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-navy">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span className="text-body text-text font-medium">แตะ</span>
            <span className="text-caption text-muted">แล้วเลือก</span>
          </div>
        </div>

        <p className="text-caption text-muted text-center mb-5 leading-relaxed">
          แตะปุ่มแชร์{' '}
          <span className="inline-flex align-middle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8634B" strokeWidth="2.5" strokeLinecap="round" className="inline">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </span>
          {' '}ที่แถบด้านล่างของ Safari แล้วเลือก{' '}
          <strong>&ldquo;เพิ่มไปยังหน้าจอโฮม&rdquo;</strong>
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-3 bg-coral text-white rounded-xl text-body font-bold transition-colors hover:bg-coral/90 active:bg-coral/80"
        >
          เข้าใจแล้ว
        </button>
      </div>
    </div>
  )
}
