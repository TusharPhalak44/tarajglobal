const MEDIA_BASE = (import.meta.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '')

export function mediaUrl(path) {
  if (!path || typeof path !== 'string') return path
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  return `${MEDIA_BASE}${path.startsWith('/') ? '' : '/'}${path}`
}
