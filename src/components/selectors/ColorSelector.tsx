import { COLORS } from './constants'
import type { ColorValue } from './constants'

interface ColorSelectorProps {
  selectedColor: string | null
  onSelect: (color: ColorValue) => void
}

export default function ColorSelector({ selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex justify-center gap-4" role="radiogroup" aria-label="สี">
      {COLORS.map((c) => {
        const isSelected = selectedColor === c.value
        return (
          <button
            key={c.value}
            onClick={() => onSelect(c.value)}
            role="radio"
            aria-checked={isSelected}
            aria-label={`สี${c.label}`}
            className="flex flex-col items-center gap-1.5 min-w-[44px] min-h-[44px]"
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all duration-150 ${
                isSelected ? 'border-coral scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: c.hex }}
              aria-hidden="true"
            />
            <span className="text-caption text-muted">{c.label}</span>
          </button>
        )
      })}
    </div>
  )
}
