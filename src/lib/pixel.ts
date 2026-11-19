declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    __yorfiPixelReady?: boolean
    __yorfiPixelEvents?: Set<string>
  }
}

function send(event: string, params?: Record<string, string | number>, custom = false) {
  if (!window.__yorfiPixelReady || !window.fbq) return
  if (params) {
    window.fbq(custom ? 'trackCustom' : 'track', event, params)
  } else {
    window.fbq(custom ? 'trackCustom' : 'track', event)
  }
}

function sendOnce(key: string, event: string, params?: Record<string, string | number>, custom = false) {
  const events = window.__yorfiPixelEvents
  if (!window.__yorfiPixelReady || !window.fbq || !events || events.has(key)) return
  events.add(key)
  send(event, params, custom)
}

export function trackViewContent() {
  sendOnce('ViewContent', 'ViewContent', { content_name: 'YORFI ÉLITE GOLD CLUB', content_category: 'XAU/USD' })
}

export function trackLead(section: string, buttonId: string) {
  send('Lead', { section, button_id: buttonId })
}

// Usar estas funciones solo si se añaden enlaces reales en el futuro.
export function trackTelegramDownload(store: 'app_store' | 'google_play') {
  send('TelegramDownload', { store }, true)
}

export function trackSocialClick(platform: 'instagram' | 'facebook') {
  send('SocialClick', { platform }, true)
}

export function trackTimeOnPage() {
  sendOnce('TimeOnPage', 'TimeOnPage', { seconds: 30 }, true)
}

export function trackScrollDepth(percent: 25 | 50 | 75 | 100) {
  sendOnce(`ScrollDepth:${percent}`, 'ScrollDepth', { percent }, true)
}
