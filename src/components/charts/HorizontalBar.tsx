export interface HorizontalBarData {
  label: string
  value: number
  percentage: number
  color: string
}

interface HorizontalBarProps {
  data: HorizontalBarData[]
}

export default function HorizontalBar({ data }: HorizontalBarProps) {
  const maxPercentage = Math.max(...data.map((d) => d.percentage), 1)

  return (
    <div className="flex flex-col gap-2" role="list">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2" role="listitem">
          <span className="text-small text-muted w-16 shrink-0">{d.label}</span>
          <div className="flex-1 h-6 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 motion-reduce:transition-none"
              style={{
                width: `${(d.percentage / maxPercentage) * 100}%`,
                backgroundColor: d.color,
              }}
            />
          </div>
          <span className="text-small text-muted w-12 text-right" aria-label={`${d.percentage} เปอร์เซ็นต์`}>{d.percentage}%</span>
        </div>
      ))}
    </div>
  )
}
