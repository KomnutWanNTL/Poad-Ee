import { useState, useEffect, useCallback, useRef } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PwaState {
  isOnline: boolean
  isStandalone: boolean
  isIOS: boolean
  canInstall: boolean
  updateReady: boolean
}

export function usePwa() {
  const [state, setState] = useState<PwaState>(() => ({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isStandalone: typeof window !== 'undefined'
      ? (('standalone' in window.navigator && (window.navigator.standalone as boolean)) ||
         window.matchMedia('(display-mode: standalone)').matches)
      : false,
    isIOS: typeof navigator !== 'undefined'
      ? /iphone|ipad|ipod/i.test(navigator.userAgent)
      : false,
    canInstall: false,
    updateReady: false,
  }))

  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)
  const swRegistration = useRef<ServiceWorkerRegistration | null>(null)

  const handleOnline = useCallback(() => setState((p) => ({ ...p, isOnline: true })), [])
  const handleOffline = useCallback(() => setState((p) => ({ ...p, isOnline: false })), [])

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [handleOnline, handleOffline])

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      deferredPrompt.current = e as BeforeInstallPromptEvent
      setState((p) => ({ ...p, canInstall: true }))
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  }, [])

  useEffect(() => {
    const registerSW = async () => {
      if (!('serviceWorker' in navigator)) return

      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
        swRegistration.current = reg

        if (reg.waiting) {
          setState((p) => ({ ...p, updateReady: true }))
        }

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setState((p) => ({ ...p, updateReady: true }))
            }
          })
        })
      } catch {
        // SW registration failed silently — app still works with localStorage
      }
    }

    window.addEventListener('load', registerSW)
  }, [])

  const installApp = useCallback(async () => {
    if (!deferredPrompt.current) return
    await deferredPrompt.current.prompt()
    const result = await deferredPrompt.current.userChoice
    if (result.outcome === 'accepted') {
      setState((p) => ({ ...p, canInstall: false }))
    }
    deferredPrompt.current = null
  }, [])

  const acceptUpdate = useCallback(() => {
    swRegistration.current?.waiting?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }, [])

  return { ...state, installApp, acceptUpdate }
}
