import { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-card rounded-xl p-4 border border-border ${className}`}>
      <div className="text-h2 text-text mb-3">{title}</div>
      <div className="w-full">{children}</div>
    </div>
  )
}
