import { AMOUNT_OPTIONS } from './constants'
import type { AmountValue } from './constants'

interface AmountSelectorProps {
  selectedAmount: string | null
  onSelect: (amount: AmountValue) => void
}

export default function AmountSelector({ selectedAmount, onSelect }: AmountSelectorProps) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-border" role="radiogroup" aria-label="ปริมาณ">
      {AMOUNT_OPTIONS.map((opt, i) => {
        const isSelected = selectedAmount === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            role="radio"
            aria-checked={isSelected}
            className={`flex-1 py-3 text-body font-medium transition-colors duration-150 min-h-[44px] ${
              isSelected
                ? 'bg-coral text-white'
                : 'bg-card text-text hover:bg-surface'
            } ${i > 0 ? 'border-l border-border' : ''}`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
