import { getScoreColor, getScoreLabel } from './constants'

interface HealthScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
}

export default function HealthScoreRing({
  score,
  size = 80,
  strokeWidth = 8,
}: HealthScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const center = size / 2
  const color = getScoreColor(score)

  const label = getScoreLabel(score)

  return (
    <div className="flex flex-col items-center gap-1" role="img" aria-label={`คะแนนสุขภาพ ${score} — ${label}`}>
      <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#CBADA5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out motion-reduce:transition-none"
        />
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#1A1412"
          fontSize={size * 0.3}
          fontWeight={800}
          className="rotate-90"
        >
          {score}
        </text>
      </svg>
      <span className="text-small font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  )
}
