import { useMemo } from 'react'
import type { NavItemKey } from '../components/navigation/constants'
import type { LogRecord } from '../types'
import {
  StatCard,
  LogEntryCard,
  ChartCard,
  BarChart,
  HealthScoreRing,
  FAB,
} from '../components'
import {
  getGreeting,
  formatDateTimeDMY,
} from '../utils/dateUtils'
import {
  calculateHealthScore,
  getPreviousPeriodScore,
} from '../utils/scoring'
import {
  getDailyFrequency,
  getTopBristolType,
  getCurrentStreak,
  filterRecords,
} from '../utils/analytics'
import { BRISTOL_COLORS, BRISTOL_LABELS_THAI, BRISTOL_DESCRIPTIONS, COLOR_LABELS_THAI, AMOUNT_LABELS_THAI, EFFORT_LABELS_THAI } from './bristolIcons'

interface DashboardProps {
  records: LogRecord[]
  onNavigate: (key: NavItemKey) => void
  onEditRecord: (id: string) => void
  onDeleteRecord: (id: string) => void
  canInstall: boolean
  onInstall: () => void
  shouldShowIosPrompt: boolean
  onShowIosPrompt: () => void
}

export default function Dashboard({
  records,
  onNavigate,
  onEditRecord,
  onDeleteRecord,
  canInstall,
  onInstall,
  shouldShowIosPrompt,
  onShowIosPrompt,
}: DashboardProps) {
  const greeting = useMemo(() => getGreeting(), [])
  const weekRecords = useMemo(() => filterRecords(records, 7), [records])
  const score = useMemo(() => calculateHealthScore(weekRecords), [weekRecords])
  const prevScore = useMemo(
    () => getPreviousPeriodScore(records, 7),
    [records]
  )
  const frequency = useMemo(() => getDailyFrequency(records, 7), [records])
  const topType = useMemo(() => getTopBristolType(weekRecords), [weekRecords])
  const streak = useMemo(() => getCurrentStreak(records), [records])
  const recentLogs = useMemo(
    () => [...records].sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()).slice(0, 20),
    [records]
  )

  const scoreChange = prevScore !== null ? score - prevScore : null

  return (
    <div className="pb-20">
      {/* Greeting Header */}
      <header className="bg-coral text-white px-4 pt-12 pb-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl" aria-hidden="true">{greeting.emoji}</span>
              <h1 className="text-h2">{greeting.text}</h1>
            </div>
            <div className="text-small text-white/80">ปวดอึ — บันทึกสุขภาพขับถ่าย</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg" aria-label="ผู้ใช้">
            👤
          </div>
        </div>

        {/* Health Score Ring */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <HealthScoreRing score={score} size={90} strokeWidth={8} />
            {scoreChange !== null && (
              <div
                className={`text-caption mt-1 font-semibold ${
                  scoreChange >= 0 ? 'text-white/90' : 'text-red-200'
                }`}
                aria-label={`เปลี่ยนแปลง ${scoreChange >= 0 ? '+' : ''}${scoreChange}%`}
              >
                {scoreChange >= 0 ? `▲ +${scoreChange}%` : `▼ ${scoreChange}%`}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Weekly Stats Row */}
      <section className="flex gap-3 px-4 -mt-6" aria-label="สถิติสัปดาห์นี้">
        <StatCard
          value={`${weekRecords.length}`}
          label="ครั้ง/สัปดาห์"
          color="text-coral"
        />
        <StatCard
          value={topType.label}
          label="ประเภทเด่น"
          color="text-navy"
        />
        <StatCard
          value={`${streak}`}
          label="วันติดต่อกัน"
          color="text-success"
        />
      </section>

      {/* Install Prompt */}
      {(canInstall || shouldShowIosPrompt) && (
        <div className="px-4 mt-4">
          {canInstall && (
            <button
              onClick={onInstall}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-navy text-white text-body font-medium min-h-[44px] hover:bg-navy/90 active:bg-navy/80 transition-colors"
              aria-label="ติดตั้งแอปบนหน้าจอโฮม"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <polyline points="8 12 12 16 16 12" />
              </svg>
              ติดตั้งแอป
            </button>
          )}
          {shouldShowIosPrompt && !canInstall && (
            <button
              onClick={onShowIosPrompt}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-navy text-white text-body font-medium min-h-[44px] hover:bg-navy/90 active:bg-navy/80 transition-colors"
              aria-label="ดูวิธีเพิ่มแอปไปที่หน้าจอโฮม"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <polyline points="8 12 12 16 16 12" />
              </svg>
              เพิ่มแอปไปที่หน้าจอโฮม
            </button>
          )}
        </div>
      )}

      {/* 7-Day Chart */}
      <section className="px-4 mt-4" aria-label="ความถี่ 7 วัน">
        <ChartCard title="ความถี่ 7 วัน">
          {records.length === 0 ? (
            <div className="text-center py-8 text-muted text-small">
              ยังไม่มีข้อมูล
            </div>
          ) : (
            <BarChart
              data={frequency.map((d) => ({ label: d.label, value: d.count }))}
              barColor="#C2503A"
            />
          )}
        </ChartCard>
      </section>

      {/* Recent Logs */}
      <section className="px-4 mt-4" aria-label="บันทึกล่าสุด">
        <h2 className="text-h2 text-text mb-3">บันทึกล่าสุด</h2>

        {records.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <div className="text-4xl mb-3" aria-hidden="true">📝</div>
            <div className="text-body text-muted mb-4">ยังไม่มีบันทึกวันนี้</div>
            <button
              onClick={() => onNavigate('log')}
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-body font-medium bg-coral text-white min-h-[44px]"
            >
              บันทึกครั้งแรก →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {recentLogs.map((log) => {
              const color = BRISTOL_COLORS[log.bristolType]
              return (
                <button
                  key={log.id}
                  onClick={() => onEditRecord(log.id)}
                  className="text-left w-full"
                  aria-label={`${BRISTOL_LABELS_THAI[log.bristolType]} — ${formatDateTimeDMY(log.recordedAt)}`}
                >
                  <LogEntryCard
                    icon={
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <rect x="4" y="3" width="16" height="18" rx="8" fill={color} />
                      </svg>
                    }
                    bristolColor={color}
                    title={`${BRISTOL_LABELS_THAI[log.bristolType]} — ${BRISTOL_DESCRIPTIONS[log.bristolType]}`}
                    description={`สี${COLOR_LABELS_THAI[log.color] || log.color} • ปริมาณ${AMOUNT_LABELS_THAI[log.amount] || log.amount} • ${EFFORT_LABELS_THAI[log.effort] || log.effort}`}
                    time={formatDateTimeDMY(log.recordedAt)}
                    onDelete={() => onDeleteRecord(log.id)}
                  />
                </button>
              )
            })}
          </div>
        )}
      </section>

      {/* FAB */}
      <FAB onClick={() => onNavigate('log')} />
    </div>
  )
}
