const MEDIA_BASE = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_MEDIA_BASE_URL) || '').replace(/\/$/, '')

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80'

export function mediaUrl(path) {
  if (!path || typeof path !== 'string') return ''
  const trimmed = path.trim()
  if (!trimmed) return ''
  if (/^(https?:|data:|blob:)/i.test(trimmed)) return trimmed

  const clean = trimmed.replace(/^\/+/, '')
  if (clean.startsWith('uploads/')) {
    return `${MEDIA_BASE}/${clean}`
  }

  // Raw filename (e.g., 1793993254897-385472f6e84f54d0.png) -> default to uploads/media
  return `${MEDIA_BASE}/uploads/media/${clean}`
}

export function handleImageFallback(e, fallback = FALLBACK_IMAGE) {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null
    e.currentTarget.src = fallback
  }
}
