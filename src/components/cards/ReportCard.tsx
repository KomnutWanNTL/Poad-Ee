import { ReactNode } from 'react'

interface ReportCardRow {
  label: string
  value: string
  status?: 'good' | 'warning'
}

interface ReportCardProps {
  header: string
  subtitle?: string
  children?: ReactNode
  rows?: ReportCardRow[]
}

export default function ReportCard({ header, subtitle, children, rows }: ReportCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div className="bg-navy text-white px-4 py-3">
        <div className="text-h2">{header}</div>
        {subtitle && <div className="text-small text-white/80 mt-0.5">{subtitle}</div>}
      </div>
      <div className="bg-card px-4 py-2">
        {rows?.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-border last:border-b-0"
          >
            <span className="text-body text-text">{row.label}</span>
            <div className="flex items-center gap-1.5">
              {row.status === 'good' && <span className="text-success">✓</span>}
              {row.status === 'warning' && <span className="text-amber">⚠</span>}
              <span className="text-body font-medium text-text">{row.value}</span>
            </div>
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}
