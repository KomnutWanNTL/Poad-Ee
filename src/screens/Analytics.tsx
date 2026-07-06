import { useState, useMemo } from 'react'
import type { LogRecord } from '../types'
import {
  ChartCard,
  BarChart,
  HorizontalBar,
  AlertCard,
  Button,
} from '../components'
import {
  filterRecords,
  getDailyFrequency,
  getBristolDistribution,
  getColorDistribution,
} from '../utils/analytics'
import {
  calculateHealthScore,
  getScoreBreakdown,
  getScoreClassification,
} from '../utils/scoring'
import { checkWarnings } from '../utils/warnings'
import type { NavItemKey } from '../components/navigation/constants'

type Period = '1d' | '7d' | '30d'
const PERIOD_DAYS: Record<Period, number> = { '1d': 1, '7d': 7, '30d': 30 }
const PERIOD_LABELS: Record<Period, string> = {
  '1d': 'วันนี้',
  '7d': 'สัปดาห์นี้',
  '30d': 'เดือนนี้',
}

interface AnalyticsProps {
  records: LogRecord[]
  onNavigate: (key: NavItemKey) => void
}

export default function Analytics({ records, onNavigate }: AnalyticsProps) {
  const [period, setPeriod] = useState<Period>('7d')
  const days = PERIOD_DAYS[period]

  const filtered = useMemo(() => filterRecords(records, days), [records, days])
  const frequency = useMemo(() => getDailyFrequency(filtered, Math.min(days, 7)), [filtered, days])
  const bristolDist = useMemo(() => getBristolDistribution(filtered), [filtered])
  const colorDist = useMemo(() => getColorDistribution(filtered), [filtered])
  const score = useMemo(() => calculateHealthScore(filtered, days), [filtered, days])
  const breakdown = useMemo(() => getScoreBreakdown(filtered, days), [filtered, days])
  const classification = useMemo(() => getScoreClassification(score), [score])
  const warnings = useMemo(() => checkWarnings(records), [records])

  if (records.length < 5) {
    return (
      <div className="px-4 pb-20">
        <div className="text-h1 text-text py-4">ผลวิเคราะห์</div>
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📊</div>
          <div className="text-body text-muted">
            ยังมีข้อมูลไม่เพียงพอสำหรับการวิเคราะห์
          </div>
          <div className="text-small text-muted mt-1">
            ลองบันทึกอย่างน้อย 5 วัน
          </div>
          <div className="mt-6">
            <Button variant="primary" onClick={() => onNavigate('log')}>
              เริ่มบันทึก
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pb-20">
      <div className="text-h1 text-text py-4">ผลวิเคราะห์</div>

      {/* Period Tabs */}
      <div className="flex rounded-xl overflow-hidden border border-border mb-4" role="tablist" aria-label="ช่วงเวลา">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => {
          const isActive = period === p
          return (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              role="tab"
              aria-selected={isActive}
              className={`flex-1 py-2.5 text-body font-medium transition-colors duration-150 min-h-[44px] ${
                isActive
                  ? 'bg-coral text-white'
                  : 'bg-card text-text hover:bg-surface'
              } ${p !== '1d' ? 'border-l border-border' : ''}`}
            >
              {PERIOD_LABELS[p]}{isActive ? '●' : ''}
            </button>
          )
        })}
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          {warnings.map((w) => (
            <AlertCard key={w.id} variant={w.level}>
              {w.message}
            </AlertCard>
          ))}
        </div>
      )}

      {/* Health Score Detail */}
      <ChartCard title="คะแนนสุขภาพ" className="mb-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div
              className="text-display font-extrabold"
              style={{ color: classification.color }}
            >
              {score}
            </div>
            <div
              className="text-small font-medium"
              style={{ color: classification.color }}
            >
              {classification.icon} {classification.level}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-small text-muted">Type Score (50%)</span>
              <span className="text-small font-semibold text-text">
                {breakdown.typeScore}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-coral rounded-full"
                style={{ width: `${breakdown.typeScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-small text-muted">Frequency (30%)</span>
              <span className="text-small font-semibold text-text">
                {breakdown.frequencyScore}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-navy rounded-full"
                style={{ width: `${breakdown.frequencyScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-small text-muted">Color (20%)</span>
              <span className="text-small font-semibold text-text">
                {breakdown.colorScore}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: `${breakdown.colorScore}%` }}
              />
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Frequency Chart */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <ChartCard title={`ความถี่ — ${PERIOD_LABELS[period]}`} className="mb-4 md:mb-0">
          <BarChart
            data={frequency.map((d) => ({ label: d.label, value: d.count }))}
            barColor="#C2503A"
          />
        </ChartCard>

      {/* Bristol Distribution */}
        <ChartCard title="การกระจาย Bristol Type" className="mb-4 md:mb-0">
          {bristolDist.length === 0 ? (
            <div className="text-center py-4 text-muted text-small">ไม่มีข้อมูล</div>
          ) : (
            <HorizontalBar
              data={bristolDist.map((d) => ({
                label: d.label,
                value: d.count,
                percentage: d.percentage,
                color: d.color,
              }))}
            />
          )}
        </ChartCard>
      </div>

      {/* Color Distribution */}
      <ChartCard title="การกระจายสี" className="mb-4 mt-4 md:mt-0">
        {colorDist.length === 0 ? (
          <div className="text-center py-4 text-muted text-small">ไม่มีข้อมูล</div>
        ) : (
          <HorizontalBar
            data={colorDist.map((d) => ({
              label: d.label,
              value: d.count,
              percentage: d.percentage,
              color: d.hex,
            }))}
          />
        )}
      </ChartCard>

      {/* Recommendation */}
      {score < 60 && (
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <div className="text-h2 text-text mb-2">คำแนะนำ</div>
          <div className="text-body text-muted">
            {score < 40 && 'ควรปรึกษาแพทย์เพื่อตรวจสุขภาพระบบขับถ่ายอย่างละเอียด'}
            {score >= 40 && score < 60 && 'ดื่มน้ำมากขึ้น รับประทานอาหารที่มีกากใยสูง และออกกำลังกายสม่ำเสมอเพื่อปรับปรุงระบบขับถ่าย'}
          </div>
        </div>
      )}
    </div>
  )
}
