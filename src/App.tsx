import { useState, useCallback, useMemo, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Toast, OfflineBanner, IosInstallPrompt, UpdateToast } from '@/components'
import type { NavItemKey } from '@/components/navigation/constants'
import { useRecords } from './hooks/useRecords'
import { useToast } from './hooks/useToast'
import { useSettings } from './hooks/useSettings'
import { usePwa } from './hooks/usePwa'
import Dashboard from './screens/Dashboard'
import QuickLog from './screens/QuickLog'
import Analytics from './screens/Analytics'
import ImportExport from './screens/ImportExport'
import Settings from './screens/Settings'

const PROMPT_COOLDOWN_DAYS = 30

function promptDismissedBefore(settings: { iosPromptDismissed: boolean; iosPromptLastShown: string | null }): boolean {
  if (settings.iosPromptDismissed) return true
  if (!settings.iosPromptLastShown) return false
  const last = new Date(settings.iosPromptLastShown).getTime()
  const now = Date.now()
  return (now - last) < PROMPT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
}

function App() {
  const [activeNav, setActiveNav] = useState<NavItemKey>('home')
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null)
  const [iosPromptVisible, setIosPromptVisible] = useState(false)
  const { records, add, update, remove, clearAll, importData } = useRecords()
  const { toasts, show, dismiss } = useToast()
  const { settings, update: updateSettings } = useSettings()
  const pwa = usePwa()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  const editingRecord = useMemo(() => {
    if (!editingRecordId) return null
    return records.find((r) => r.id === editingRecordId) ?? null
  }, [editingRecordId, records])

  const handleEditRecord = useCallback(
    (id: string) => {
      setEditingRecordId(id)
      setActiveNav('log')
    },
    [setActiveNav]
  )

  const handleDeleteRecord = useCallback(
    (id: string) => {
      remove(id)
      show('ลบบันทึกเรียบร้อย', 'info')
    },
    [remove, show]
  )

  const handleClearEdit = useCallback(() => {
    setEditingRecordId(null)
  }, [])

  const handleDismissIosPrompt = useCallback(() => {
    setIosPromptVisible(false)
    updateSettings({
      iosPromptDismissed: true,
      iosPromptLastShown: new Date().toISOString(),
    })
  }, [updateSettings])

  const handleShowIosPrompt = useCallback(() => {
    setIosPromptVisible(true)
    updateSettings({ iosPromptLastShown: new Date().toISOString() })
  }, [updateSettings])

  const shouldShowIosPrompt = pwa.isIOS && !pwa.isStandalone && !promptDismissedBefore(settings)

  const renderScreen = () => {
    switch (activeNav) {
      case 'home':
        return (
          <Dashboard
            records={records}
            onNavigate={setActiveNav}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
            canInstall={pwa.canInstall}
            onInstall={pwa.installApp}
            shouldShowIosPrompt={shouldShowIosPrompt}
            onShowIosPrompt={handleShowIosPrompt}
          />
        )
      case 'log':
        return (
          <QuickLog
            editingRecord={editingRecord}
            onSave={(record) => {
              add(record)
            }}
            onUpdate={update}
            onDelete={remove}
            onNavigate={setActiveNav}
            onToast={show}
            onClearEdit={handleClearEdit}
          />
        )
      case 'analytics':
        return <Analytics records={records} onNavigate={setActiveNav} />
      case 'import-export':
        return (
          <ImportExport
            records={records}
            onImport={importData}
            onToast={show}
          />
        )
      case 'settings':
        return (
          <Settings
            settings={settings}
            onUpdateSettings={updateSettings}
            onClearAll={clearAll}
            onToast={show}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <OfflineBanner isOnline={pwa.isOnline} />

      <Layout activeNav={activeNav} onNavigate={setActiveNav}>
        {renderScreen()}
      </Layout>

      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          variant={t.variant}
          onDismiss={() => dismiss(t.id)}
        />
      ))}

      <UpdateToast visible={pwa.updateReady} onAccept={pwa.acceptUpdate} />

      <IosInstallPrompt
        visible={iosPromptVisible}
        onDismiss={handleDismissIosPrompt}
      />
    </>
  )
}

export default App
