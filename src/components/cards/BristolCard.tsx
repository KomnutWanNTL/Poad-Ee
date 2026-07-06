import { ReactNode } from 'react'

interface BristolCardProps {
  icon: ReactNode
  label: string
  description: string
  isSelected: boolean
  isIdeal?: boolean
  onClick: () => void
}

export default function BristolCard({
  icon,
  label,
  description,
  isSelected,
  isIdeal = false,
  onClick,
}: BristolCardProps) {
  let borderClass = 'border-border'
  let bgClass = 'bg-white'
  let hoverClass = 'hover:border-[#C8A8A0]'
  const descId = `bristol-desc-${label}`

  if (isIdeal && isSelected) {
    borderClass = 'border-success'
    bgClass = 'bg-[#E0F5EA]'
  } else if (isIdeal) {
    borderClass = 'border-success/40'
    bgClass = 'bg-white'
    hoverClass = 'hover:border-success'
  } else if (isSelected) {
    borderClass = 'border-coral'
    bgClass = 'bg-coral-p'
  }

  return (
    <button
      onClick={onClick}
      role="radio"
      aria-checked={isSelected}
      aria-describedby={descId}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all duration-150 min-h-[44px] ${borderClass} ${bgClass} ${hoverClass}`}
    >
      <div className="w-10 h-10 flex items-center justify-center" aria-hidden="true">{icon}</div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-small font-semibold text-text">{label}</span>
        <span id={descId} className="text-caption text-muted text-center leading-tight">{description}</span>
        {isIdeal && (
          <span className="text-caption text-success font-bold mt-0.5">✓ ดีที่สุด</span>
        )}
      </div>
    </button>
  )
}
