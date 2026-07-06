import { ReactNode } from 'react'

type AlertVariant = 'warning' | 'danger' | 'critical'

interface AlertCardProps {
  variant: AlertVariant
  children: ReactNode
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  warning: {
    container: 'bg-amber/10 border-l-4 border-amber text-amber',
    icon: '',
  },
  danger: {
    container: 'bg-danger/10 border-l-4 border-danger text-danger',
    icon: '',
  },
  critical: {
    container: 'bg-danger/10 border-l-4 border-danger text-danger',
    icon: '⚠️',
  },
}

export default function AlertCard({ variant, children }: AlertCardProps) {
  const styles = variantStyles[variant]

  return (
    <div className={`flex items-start gap-2 rounded-r-xl p-3 ${styles.container}`}>
      {styles.icon && <span className="text-lg shrink-0 mt-0.5">{styles.icon}</span>}
      <div className="text-small">{children}</div>
    </div>
  )
}
