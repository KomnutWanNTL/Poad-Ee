import { NAV_ITEMS } from './constants'
import type { NavItemKey } from './constants'

interface BottomNavProps {
  activeKey: NavItemKey
  onNavigate: (key: NavItemKey) => void
}

export default function BottomNav({ activeKey, onNavigate }: BottomNavProps) {
  return (
    <nav className="bg-card border-t border-border flex items-center justify-around py-1" aria-label="เมนูหลัก">
      {NAV_ITEMS.map((item) => {
        const isActive = activeKey === item.key
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] transition-colors duration-150 ${
              isActive ? 'text-coral' : 'text-muted'
            }`}
          >
            <span className="text-lg" aria-hidden="true">{item.icon}</span>
            <span className="text-caption">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
