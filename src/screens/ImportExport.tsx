import { useState, useMemo, useRef, useCallback } from 'react'
import { jsPDF } from 'jspdf'
import type { LogRecord, ImportResult } from '../types'
import { ReportCard, Button } from '../components'
import { validateImportData, filterNewRecords } from '../utils/importExport'
import { formatDateThai } from '../utils/dateUtils'
import { registerSarabunFont } from '../utils/pdfFonts'
import {
  getBristolDistribution,
  getFirstRecordDate,
} from '../utils/analytics'
import { calculateHealthScore, getScoreClassification } from '../utils/scoring'

interface ImportExportProps {
  records: LogRecord[]
  onImport: (newRecords: LogRecord[]) => void
  onToast: (message: string, variant?: 'success' | 'error' | 'info') => void
}

function getMedicalSummary(records: LogRecord[]) {
  const total = records.length
  if (total === 0) return null

  const firstDate = getFirstRecordDate(records)
  const lastDate = new Date(
    [...records].sort(
      (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
    )[0].recordedAt
  )

  const days =
    Math.ceil(
      (lastDate.getTime() - (firstDate?.getTime() ?? 0)) / (1000 * 60 * 60 * 24)
    ) + 1
  const avgPerDay = (total / Math.max(days, 1)).toFixed(1)

  const bristolDist = getBristolDistribution(records)
  const topType = bristolDist.length > 0 ? bristolDist[0].label : '—'

  const type1to2Count = records.filter(
    (r) => r.bristolType === 1 || r.bristolType === 2
  ).length
  const type6to7Count = records.filter(
    (r) => r.bristolType === 6 || r.bristolType === 7
  ).length
  const constipPct = Math.round((type1to2Count / total) * 100)
  const diarrheaPct = Math.round((type6to7Count / total) * 100)

  const abnormalColorCount = records.filter(
    (r) => r.color === 'black' || r.color === 'reddish' || r.color === 'white'
  ).length
  const abnormalColorPct = Math.round((abnormalColorCount / total) * 100)

  const healthScore = calculateHealthScore(records, 30)
  const status: 'good' | 'warning' = healthScore >= 60 ? 'good' : 'warning'

  return {
    firstDate,
    lastDate,
    total,
    avgPerDay,
    topType,
    constipPct,
    diarrheaPct,
    abnormalColorPct,
    healthScore,
    status,
  }
}

export default function ImportExport({
  records,
  onImport,
  onToast,
}: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const summary = useMemo(() => getMedicalSummary(records), [records])

  const handleExportJson = useCallback(() => {
    const json = JSON.stringify(records, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const date = new Date().toISOString().slice(0, 10)
    const a = document.createElement('a')
    a.href = url
    a.download = `poad-ee-export-${date}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onToast('ส่งออกสำเร็จ ✓', 'success')
  }, [records, onToast])

  const handleImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setImportError(null)
      setImportResult(null)

      const reader = new FileReader()
      reader.onload = () => {
        try {
          const raw = reader.result as string
          const data = JSON.parse(raw)
          const validated = validateImportData(data)
          const newRecords = filterNewRecords(validated, records)

          if (newRecords.length === 0) {
            setImportResult({ imported: 0, skipped: validated.length, total: validated.length })
            onToast('ไม่มีข้อมูลใหม่นำเข้า (ซ้ำทั้งหมด)', 'info')
          } else {
            onImport(newRecords)
            setImportResult({ imported: newRecords.length, skipped: validated.length - newRecords.length, total: validated.length })
            onToast(`นำเข้าใหม่ ${newRecords.length} รายการ` + (validated.length - newRecords.length > 0 ? ` ซ้ำ ${validated.length - newRecords.length} รายการ` : ''), 'success')
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'ไฟล์เสียหายหรือรูปแบบไม่ถูกต้อง'
          setImportError(msg)
          onToast(msg, 'error')
        }
      }
      reader.readAsText(file)

      // Reset input
      e.target.value = ''
    },
    [records, onImport, onToast]
  )

  const handleExportPdf = useCallback(async () => {
    if (!summary) return

    const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
    await registerSarabunFont(pdf)

    let y = 20

    pdf.setFont('Sarabun', 'bold')
    pdf.setFontSize(18)
    pdf.text('\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E', 105, y, { align: 'center' })
    y += 10

    pdf.setFontSize(12)
    pdf.setFont('Sarabun', 'normal')
    pdf.text('\u0E1B\u0E27\u0E14\u0E2D\u0E36 (Poad-Ee)', 105, y, { align: 'center' })
    y += 8

    pdf.setFontSize(10)
    pdf.text(`${formatDateThai(summary.firstDate!)} \u2014 ${formatDateThai(summary.lastDate)}`, 105, y, { align: 'center' })
    y += 10

    pdf.setDrawColor(200, 200, 200)
    pdf.line(15, y, 195, y)
    y += 10

    const rows: [string, string][] = [
      ['\u0E08\u0E33\u0E19\u0E27\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14', `${summary.total} \u0E04\u0E23\u0E31\u0E49\u0E07`],
      ['\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E27\u0E31\u0E19', `${summary.avgPerDay} \u0E04\u0E23\u0E31\u0E49\u0E07`],
      ['Bristol Type \u0E40\u0E14\u0E48\u0E19', summary.topType],
      ['% \u0E17\u0E49\u0E2D\u0E07\u0E1C\u0E39\u0E01 (Type 1\u20132)', `${summary.constipPct}%`],
      ['% \u0E17\u0E49\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 (Type 6\u20137)', `${summary.diarrheaPct}%`],
      ['% \u0E2A\u0E35\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34', `${summary.abnormalColorPct}%`],
      ['\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E', `${summary.healthScore}`],
    ]

    pdf.setFontSize(10)
    for (const [label, value] of rows) {
      pdf.setFont('Sarabun', 'normal')
      pdf.text(label, 20, y)
      pdf.setFont('Sarabun', 'bold')
      pdf.text(value, 190, y, { align: 'right' })
      y += 7
    }

    y += 6
    const classification = getScoreClassification(summary.healthScore)
    pdf.setFont('Sarabun', 'bold')
    pdf.setFontSize(12)
    pdf.text(`\u0E2A\u0E16\u0E32\u0E19\u0E30: ${classification.icon} ${classification.level}`, 105, y, { align: 'center' })
    y += 12

    pdf.setFont('Sarabun', 'italic')
    pdf.setFontSize(8)
    pdf.text('\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E42\u0E14\u0E22 \u0E1B\u0E27\u0E14\u0E2D\u0E36 (Poad-Ee) \u2014 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E02\u0E31\u0E1A\u0E16\u0E48\u0E32\u0E22', 105, y, { align: 'center' })
    y += 6
    pdf.text('\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E35\u0E49\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19 \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C', 105, y, { align: 'center' })

    const date = new Date().toISOString().slice(0, 10)
    pdf.save(`poad-ee-report-${date}.pdf`)
    onToast('\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01 PDF \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u2713', 'success')
  }, [summary, onToast])

  const handleShare = useCallback(async () => {
    if (records.length === 0) {
      onToast('ยังไม่มีข้อมูลให้แชร์', 'info')
      return
    }

    const json = JSON.stringify(records, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const date = new Date().toISOString().slice(0, 10)
    const file = new File([blob], `poad-ee-export-${date}.json`, {
      type: 'application/json',
    })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: 'ปวดอึ — ข้อมูลบันทึก',
          files: [file],
        })
      } catch {
        // User cancelled or not supported
      }
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: 'ปวดอึ — ข้อมูลบันทึก',
          text: `ส่งออกข้อมูลบันทึกการขับถ่าย ${records.length} รายการ`,
        })
      } catch {
        // User cancelled
      }
    } else {
      handleExportJson()
    }
  }, [records, onToast, handleExportJson])

  return (
    <div className="pb-20">
      {/* Header — Coral like other screens */}
      <div className="bg-coral text-white px-4 pt-12 pb-6 rounded-b-3xl mb-4">
        <h1 className="text-h1">นำเข้า/ส่งออกข้อมูล</h1>
        <div className="text-small text-white/80 mt-1">สำรองและย้ายข้อมูล</div>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {/* Import */}
        <ReportCard header="📂 นำเข้าข้อมูล" subtitle="นำเข้าไฟล์ JSON ที่เคยส่งออกไว้">
          <div className="py-3 flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <Button
              variant="navy"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              📂 เลือกไฟล์ JSON
            </Button>
            {importResult && (
              <div className="text-small text-muted text-center">
                นำเข้าใหม่ {importResult.imported} / ซ้ำ {importResult.skipped} / ทั้งหมด {importResult.total}
              </div>
            )}
            {importError && (
              <div className="text-small text-danger text-center">{importError}</div>
            )}
            <div className="text-caption text-muted text-center">🔒 ข้อมูลเก็บในเครื่อง</div>
          </div>
        </ReportCard>

        {/* Export */}
        <div className="bg-white rounded-xl border border-border p-4 flex flex-col gap-2">
          <div className="text-h2 text-text">📥 ส่งออกข้อมูล</div>
          <Button variant="navy" className="w-full" onClick={handleExportJson}>
            📥 ส่งออก JSON
          </Button>
          {summary && (
            <Button variant="navy" className="w-full" onClick={handleExportPdf}>
              📄 ส่งออก PDF
            </Button>
          )}
          <Button variant="outline" className="w-full" onClick={handleShare}>
            ↑ แชร์ผ่านแอป
          </Button>
        </div>

        {/* Medical Report */}
        {summary && (
          <ReportCard
            header="📄 รายงานสุขภาพ"
            subtitle={`${formatDateThai(summary.firstDate!)} — ${formatDateThai(summary.lastDate)}`}
            rows={[
              { label: 'จำนวนครั้งทั้งหมด', value: `${summary.total} ครั้ง` },
              { label: 'ค่าเฉลี่ยต่อวัน', value: `${summary.avgPerDay} ครั้ง` },
              { label: 'Bristol Type เด่น', value: summary.topType },
              { label: '% ท้องผูก (Type 1–2)', value: `${summary.constipPct}%` },
              { label: '% ท้องเสีย (Type 6–7)', value: `${summary.diarrheaPct}%` },
              { label: '% สีผิดปกติ', value: `${summary.abnormalColorPct}%` },
              { label: 'คะแนนสุขภาพ', value: `${summary.healthScore}`, status: summary.status },
            ]}
          />
        )}
      </div>
    </div>
  )
}
