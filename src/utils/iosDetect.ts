const IOS_REGEX = /iphone|ipad|ipod/i

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return IOS_REGEX.test(navigator.userAgent)
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  if ('standalone' in window.navigator && window.navigator.standalone !== undefined) {
    return window.navigator.standalone as boolean
  }
  return window.matchMedia('(display-mode: standalone)').matches
}
