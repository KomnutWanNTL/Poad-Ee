export interface BarChartData {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartData[]
  maxValue?: number
  barColor?: string
}

export default function BarChart({
  data,
  maxValue,
  barColor = '#C2503A',
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex items-end justify-between gap-1 h-32" role="img" aria-label={`กราฟแท่ง: ${data.map(d => `${d.label} ${d.value} ครั้ง`).join(', ')}`}>
      {data.map((d, i) => {
        const height = max > 0 ? (d.value / max) * 100 : 0
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <span className="text-caption text-muted" aria-hidden="true">{d.value}</span>
            <div
              className="w-full rounded-t-md transition-all duration-300 motion-reduce:transition-none"
              style={{
                height: `${Math.max(height, 1)}%`,
                backgroundColor: barColor,
              }}
              role="img"
              aria-label={`${d.label}: ${d.value} ครั้ง`}
            />
            <span className="text-caption text-muted">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}
