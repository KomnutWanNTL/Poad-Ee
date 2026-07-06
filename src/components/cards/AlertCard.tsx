import { ReactNode } from 'react'

type AlertVariant = 'warning' | 'danger' | 'critical'

interface AlertCardProps {
  variant: AlertVariant
  children: ReactNode
}

const variantStyles: Record<AlertVariant, { container: string; icon: string }> = {
  warning: {
    container: 'bg-[#FFFBEB] border-l-4 border-amber text-amber-900',
    icon: '',
  },
  danger: {
    container: 'bg-[#FFF5F5] border-l-4 border-danger text-red-800',
    icon: '',
  },
  critical: {
    container: 'bg-[#FFF5F5] border-l-4 border-danger text-red-800',
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
