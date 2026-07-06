import { ReactNode } from 'react'
import BottomNav from './navigation/BottomNav'
import type { NavItemKey } from './navigation/constants'

interface LayoutProps {
  children?: ReactNode
  activeNav: NavItemKey
  onNavigate: (key: NavItemKey) => void
}

export default function Layout({ children, activeNav, onNavigate }: LayoutProps) {
  return (
    <div
      className="h-dvh max-w-md md:max-w-2xl mx-auto flex flex-col bg-bg overflow-hidden"
      style={{
        paddingTop: 'var(--safe-area-top)',
        paddingLeft: 'var(--safe-area-left)',
        paddingRight: 'var(--safe-area-right)',
      }}
    >
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <footer
        className="shrink-0"
        style={{ paddingBottom: 'var(--safe-area-bottom)' }}
      >
        <BottomNav activeKey={activeNav} onNavigate={onNavigate} />
      </footer>
    </div>
  )
}
