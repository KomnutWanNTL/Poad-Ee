import { useState, useCallback } from 'react'
import type { AppSettings } from '../types'
import { Button, ConfirmDialog } from '../components'

interface SettingsProps {
  settings: AppSettings
  onUpdateSettings: (partial: Partial<AppSettings>) => void
  onClearAll: () => void
  onToast: (message: string, variant?: 'success' | 'error' | 'info') => void
}

export default function Settings({
  settings,
  onUpdateSettings,
  onClearAll,
  onToast,
}: SettingsProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClearAll = useCallback(() => {
    onClearAll()
    setShowClearConfirm(false)
    onToast('ล้างข้อมูลทั้งหมดเรียบร้อย', 'info')
  }, [onClearAll, onToast])

  const handleLanguageChange = useCallback(
    (lang: 'th' | 'en') => {
      onUpdateSettings({ language: lang })
      onToast(
        lang === 'th' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switched to English (not yet fully supported)',
        'info'
      )
    },
    [onUpdateSettings, onToast]
  )

  return (
    <div className="px-4 pb-20">
      <div className="text-h1 text-text py-4">ตั้งค่า</div>

      {/* Language */}
      <div className="bg-white rounded-xl border border-border p-4 mb-4">
        <div className="text-h2 text-text mb-3">ภาษา</div>
        <div className="flex rounded-xl overflow-hidden border border-border" role="radiogroup" aria-label="เลือกภาษา">
          <button
            onClick={() => handleLanguageChange('th')}
            role="radio"
            aria-checked={settings.language === 'th'}
            className={`flex-1 py-3 text-body font-medium transition-colors duration-150 min-h-[44px] ${
              settings.language === 'th'
                ? 'bg-coral text-white'
                : 'bg-white text-text hover:bg-surface'
            }`}
          >
            ไทย
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            role="radio"
            aria-checked={settings.language === 'en'}
            className={`flex-1 py-3 text-body font-medium transition-colors duration-150 min-h-[44px] border-l border-border ${
              settings.language === 'en'
                ? 'bg-coral text-white'
                : 'bg-white text-text hover:bg-surface'
            }`}
          >
            English
          </button>
        </div>
        <div className="text-caption text-muted mt-2 text-center">
          v1.0 — เฉพาะภาษาไทย
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white rounded-xl border border-border p-4 mb-4">
        <div className="text-h2 text-text mb-3">ธีม</div>
        <div className="flex rounded-xl overflow-hidden border border-border" role="radiogroup" aria-label="เลือกธีม">
          <button
            onClick={() => onUpdateSettings({ theme: 'light' })}
            role="radio"
            aria-checked={settings.theme === 'light'}
            className={`flex-1 py-3 text-body font-medium transition-colors duration-150 min-h-[44px] ${
              settings.theme === 'light'
                ? 'bg-coral text-white'
                : 'bg-white text-text hover:bg-surface'
            }`}
          >
            ☀️ สว่าง
          </button>
          <button
            onClick={() => onUpdateSettings({ theme: 'dark' })}
            role="radio"
            aria-checked={settings.theme === 'dark'}
            className={`flex-1 py-3 text-body font-medium transition-colors duration-150 min-h-[44px] border-l border-border ${
              settings.theme === 'dark'
                ? 'bg-navy text-white'
                : 'bg-white text-text hover:bg-surface'
            }`}
          >
            🌙 มืด
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-border p-4 mb-4">
        <div className="text-h2 text-text mb-2">เกี่ยวกับ</div>
        <div className="flex flex-col gap-1.5 text-small text-muted">
          <div className="flex justify-between">
            <span>แอป</span>
            <span className="text-text font-medium">ปวดอึ (Poad-Ee)</span>
          </div>
          <div className="flex justify-between">
            <span>เวอร์ชัน</span>
            <span className="text-text font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>เทคโนโลยี</span>
            <span className="text-text font-medium">React + Vite + Tailwind</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-danger/20 p-4 mb-4">
        <div className="text-h2 text-danger mb-2">⚠️ ล้างข้อมูล</div>
        <div className="text-small text-muted mb-3">
          ลบบันทึกทั้งหมดอย่างถาวร — ไม่สามารถกู้คืนได้
        </div>
        <Button
          variant="ghost"
          className="w-full text-danger"
          onClick={() => setShowClearConfirm(true)}
        >
          ล้างข้อมูลทั้งหมด
        </Button>
      </div>

      {/* Credits */}
      <div className="text-center text-caption text-muted py-4">
        Made with ❤️ for healthy poops
        <br />
        © 2026 Poad-Ee App
      </div>

      {showClearConfirm && (
        <ConfirmDialog
          title="ล้างข้อมูลทั้งหมด"
          message="คุณแน่ใจหรือไม่ว่าต้องการลบบันทึกทั้งหมด? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
          confirmLabel="ล้างข้อมูล"
          cancelLabel="ยกเลิก"
          variant="danger"
          onConfirm={handleClearAll}
          onCancel={() => setShowClearConfirm(false)}
        />
      )}
    </div>
  )
}
