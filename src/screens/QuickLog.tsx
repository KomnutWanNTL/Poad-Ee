import { useState, useMemo, useCallback } from 'react'
import type { NavItemKey } from '../components/navigation/constants'
import type { LogRecord } from '../types'
import type { ColorValue, AmountValue, EffortValue } from '../components/selectors'
import {
  BristolTypeSelector,
  ColorSelector,
  AmountSelector,
  EffortSelector,
  Button,
  ConfirmDialog,
} from '../components'
import { toLocalISOString, formatDateTimeDMY } from '../utils/dateUtils'
import { BRISTOL_ICONS } from './bristolIcons'

interface QuickLogProps {
  editingRecord: LogRecord | null
  onSave: (record: LogRecord) => void
  onUpdate: (id: string, partial: Partial<LogRecord>) => void
  onDelete: (id: string) => void
  onNavigate: (key: NavItemKey) => void
  onToast: (message: string, variant?: 'success' | 'error' | 'info') => void
  onClearEdit: () => void
}

type Step = 1 | 2 | 3

export default function QuickLog({
  editingRecord,
  onSave,
  onUpdate,
  onDelete,
  onNavigate,
  onToast,
  onClearEdit,
}: QuickLogProps) {
  const isEditing = editingRecord !== null
  const now = useMemo(() => toLocalISOString(), [])
  const displayDate = useMemo(() => formatDateTimeDMY(now), [now])

  const [step, setStep] = useState<Step>(1)
  const [bristolType, setBristolType] = useState<number | null>(
    editingRecord?.bristolType ?? 4
  )
  const [color, setColor] = useState<ColorValue | null>(
    editingRecord ? (editingRecord.color as ColorValue) : null
  )
  const [amount, setAmount] = useState<AmountValue | null>(
    editingRecord ? (editingRecord.amount as AmountValue) : null
  )
  const [effort, setEffort] = useState<EffortValue | null>(
    editingRecord ? (editingRecord.effort as EffortValue) : null
  )
  const [note, setNote] = useState(editingRecord?.note ?? '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleNext = useCallback(() => {
    if (step === 1 && bristolType !== null) setStep(2)
    else if (step === 2 && color !== null) setStep(3)
  }, [step, bristolType, color])

  const handleBack = useCallback(() => {
    if (step === 2) { setStep(1) }
    else if (step === 3) { setStep(2) }
  }, [step])

  const handleSave = useCallback(() => {
    if (bristolType === null || !color || !amount || !effort) return

    if (isEditing && editingRecord) {
      onUpdate(editingRecord.id, {
        bristolType: bristolType as LogRecord['bristolType'],
        color: color,
        amount: amount,
        effort: effort,
        note: note || undefined,
        updatedAt: toLocalISOString(),
      })
      onToast('อัปเดตเรียบร้อย ✓', 'success')
      onNavigate('home')
      onClearEdit()
    } else {
      const record: LogRecord = {
        id: crypto.randomUUID(),
        recordedAt: toLocalISOString(),
        bristolType: bristolType as LogRecord['bristolType'],
        color: color,
        amount: amount,
        effort: effort,
        note: note || undefined,
        createdAt: toLocalISOString(),
        updatedAt: toLocalISOString(),
      }
      onSave(record)
      onToast('บันทึกเรียบร้อย ✓', 'success')
      onNavigate('home')
    }
  }, [bristolType, color, amount, effort, note, isEditing, editingRecord, onUpdate, onSave, onToast, onNavigate, onClearEdit])

  const handleDelete = useCallback(() => {
    if (!editingRecord) return
    onDelete(editingRecord.id)
    setShowDeleteConfirm(false)
    onToast('ลบบันทึกเรียบร้อย', 'info')
    onNavigate('home')
    onClearEdit()
  }, [editingRecord, onDelete, onToast, onNavigate, onClearEdit])

  return (
    <div className="px-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <div>
          <div className="text-h1 text-text">
            {isEditing ? 'แก้ไขบันทึก' : 'บันทึกด่วน'}
          </div>
          <div className="text-small text-muted mt-0.5">{displayDate}</div>
        </div>
        <button
          onClick={() => {
            if (isEditing) {
              onNavigate('home')
              onClearEdit()
            } else {
              onNavigate('home')
            }
          }}
          className="text-small text-muted min-h-[44px] min-w-[44px]"
        >
          {isEditing ? '✕' : 'ยกเลิก'}
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-2 mb-6">
        {([1, 2, 3] as Step[]).map((s) => (
          <div
            key={s}
            className={`flex-1 h-1.5 rounded-full transition-colors duration-200 ${
              s <= step ? 'bg-coral' : 'bg-border'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Bristol Type */}
      {step === 1 && (
        <div role="tabpanel" aria-label="ขั้นตอนที่ 1">
          <h2 className="text-h2 text-text mb-4">ลักษณะอุจจาระเป็นอย่างไร?</h2>
          <BristolTypeSelector
            types={BRISTOL_ICONS}
            selectedType={bristolType}
            onSelect={(t) => setBristolType(t)}
          />
          <div className="mt-6">
            <Button
              variant="primary"
              className="w-full"
              disabled={bristolType === null}
              onClick={handleNext}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Color */}
      {step === 2 && (
        <div role="tabpanel" aria-label="ขั้นตอนที่ 2">
          <h2 className="text-h2 text-text mb-4">สีเป็นอย่างไร?</h2>
          <ColorSelector
            selectedColor={color}
            onSelect={(c) => setColor(c)}
          />
          <div className="flex gap-3 mt-6">
            <Button variant="ghost" className="flex-1" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={color === null}
              onClick={handleNext}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Amount, Effort & Note */}
      {step === 3 && (
        <div role="tabpanel" aria-label="ขั้นตอนที่ 3">
          <h2 className="text-h2 text-text mb-4">ปริมาณและความยาก?</h2>

          <div className="mb-4">
            <div className="text-small text-muted mb-2">ปริมาณ</div>
            <AmountSelector
              selectedAmount={amount}
              onSelect={(a) => setAmount(a)}
            />
          </div>

          <div className="mb-4">
            <div className="text-small text-muted mb-2">ความยาก/อาการ</div>
            <EffortSelector
              selectedEffort={effort}
              onSelect={(e) => setEffort(e)}
            />
          </div>

          <div className="mb-6">
            <label className="text-small text-muted mb-2 block" htmlFor="log-note">บันทึกเพิ่มเติม (ไม่จำเป็น)</label>
            <textarea
              id="log-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น กินอะไรก่อนหน้า, อาการอื่นๆ..."
              className="w-full rounded-xl border border-border px-4 py-3 text-body text-text placeholder:text-muted resize-none focus:outline-none focus:border-coral min-h-[80px] bg-card"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={handleBack}>
              ย้อนกลับ
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              disabled={!bristolType || !color || !amount || !effort}
              onClick={handleSave}
            >
              {isEditing ? 'อัปเดต' : '✓ บันทึก'}
            </Button>
          </div>

          {isEditing && (
            <div className="mt-4">
              <Button
                variant="ghost"
                className="w-full text-danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                ลบบันทึกนี้
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="ลบบันทึก"
          message="คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
          confirmLabel="ลบ"
          cancelLabel="ยกเลิก"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  )
}
