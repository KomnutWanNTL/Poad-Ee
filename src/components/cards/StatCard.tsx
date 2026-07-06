interface StatCardProps {
  value: string
  label: string
  color?: string
}

export default function StatCard({ value, label, color = 'text-coral' }: StatCardProps) {
  return (
    <div className="flex-1 bg-card rounded-xl p-4 text-center shadow-sm border border-border">
      <div className={`text-display ${color}`}>{value}</div>
      <div className="text-small text-muted mt-1">{label}</div>
    </div>
  )
}
