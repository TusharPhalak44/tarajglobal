export const KNOWN_AUTHOR_MAP = {
  'hanmant.dhotre@tarajglobal.com': 'Hanmant Dhotre',
  'hanmant-dhotre': 'Hanmant Dhotre',
  'tushar@tarajglobal.com': 'Tushar',
  'atarwasim73@gmail.com': 'Wasim Attar',
  'wasim@tarajglobal.com': 'Wasim Attar',
  'wasim attar': 'Wasim Attar',
  'alex@example.com': 'Alex',
  'admin@tarajglobal.com': 'Taraj Global Editorial Team',
  'test@gmail.com': 'Taraj Contributor',
  'test123@gmail.com': 'Taraj Contributor'
}

export function formatAuthorName(rawName, fallback = 'Taraj Global Editorial Team') {
  if (!rawName || typeof rawName !== 'string') return fallback
  const trimmed = rawName.trim()
  if (!trimmed) return fallback

  const lower = trimmed.toLowerCase()
  if (KNOWN_AUTHOR_MAP[lower]) {
    return KNOWN_AUTHOR_MAP[lower]
  }

  // If it's an email address or contains @
  if (trimmed.includes('@')) {
    const prefix = trimmed.split('@')[0]
    const cleanPrefix = prefix.replace(/\d+$/, '')
    const parts = (cleanPrefix || prefix).split(/[._-]+/).filter(Boolean)
    if (parts.length > 0) {
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ')
    }
    return fallback
  }

  // If single word lowercase like 'alex' or 'wasim', title case it
  if (!trimmed.includes(' ') && /^[a-zA-Z]+$/.test(trimmed)) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  }

  return trimmed
}
