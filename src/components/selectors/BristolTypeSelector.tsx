import BristolCard from '../cards/BristolCard'

export interface BristolType {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7
  icon: React.ReactNode
  label: string
  description: string
}

interface BristolTypeSelectorProps {
  types: BristolType[]
  selectedType: number | null
  onSelect: (type: number) => void
}

export default function BristolTypeSelector({
  types,
  selectedType,
  onSelect,
}: BristolTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="radiogroup" aria-label="ลักษณะอุจจาระ">
      {types.map((t) => (
        <BristolCard
          key={t.type}
          icon={t.icon}
          label={t.label}
          description={t.description}
          isSelected={selectedType === t.type}
          isIdeal={t.type === 4}
          onClick={() => onSelect(t.type)}
        />
      ))}
    </div>
  )
}
