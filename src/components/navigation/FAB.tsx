interface FABProps {
  onClick: () => void
}

export default function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-6 w-14 h-14 bg-coral text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-150 hover:bg-coral-d active:scale-90 z-40"
      aria-label="บันทึกด่วน"
    >
      +
    </button>
  )
}
