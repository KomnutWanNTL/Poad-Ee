interface UpdateToastProps {
  visible: boolean
  onAccept: () => void
}

export default function UpdateToast({ visible, onAccept }: UpdateToastProps) {
  if (!visible) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <div className="max-w-md mx-auto bg-coral text-white rounded-xl px-4 py-3 text-body text-center font-medium shadow-lg">
        <button
          onClick={onAccept}
          className="w-full flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          มีเวอร์ชันใหม่ — แตะเพื่ออัปเดต
        </button>
      </div>
    </div>
  )
}
