interface LogEntryCardProps {
  icon: React.ReactNode
  bristolColor: string
  title: string
  description: string
  time: string
  onDelete?: () => void
}

export default function LogEntryCard({
  icon,
  bristolColor,
  title,
  description,
  time,
  onDelete,
}: LogEntryCardProps) {
  return (
    <div className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border touch-pan-y">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: bristolColor + '20' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-body font-medium text-text truncate">{title}</div>
        <div className="text-small text-muted truncate">{description}</div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-caption text-muted">{time}</span>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
            className="text-danger text-small min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="ลบ"
          >
            ลบ
          </button>
        )}
      </div>
    </div>
  )
}
