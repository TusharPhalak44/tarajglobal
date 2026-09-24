// Media, Video & PDF resolution helpers for Taraj Global Blog & CMS

export const resolveMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/uploads')) {
    const apiHost = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
    return `${apiHost}${url}`
  }
  return url
}

export const parseVideoInfo = (url) => {
  if (!url || typeof url !== 'string') return null
  let trimmed = url.trim()

  // Support markdown links: [Watch Video](https://youtu.be/...)
  const mdMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/)
  if (mdMatch) {
    trimmed = mdMatch[2].trim()
  }

  // YouTube detection (supports youtu.be, youtube.com/watch, embed, shorts)
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|(?:embed|v|shorts)\/))([\w-]{11})/)
  if (ytMatch) {
    return {
      type: 'youtube',
      id: ytMatch[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`,
      fallbackThumb: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
    }
  }

  // Vimeo detection
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/)
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      thumbnailUrl: null
    }
  }

  // Direct video files (.mp4, .webm, .mov, .ogg, .m4v)
  const cleanPath = trimmed.split('?')[0].split('#')[0]
  if (/\.(mp4|webm|mov|ogg|m4v)$/i.test(cleanPath)) {
    return {
      type: 'direct',
      src: resolveMediaUrl(trimmed)
    }
  }

  return null
}

// PDF detection & parsing
export const isPdfUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  const mdMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/)
  const targetUrl = mdMatch ? mdMatch[2].trim() : trimmed
  const cleanPath = targetUrl.split('?')[0].split('#')[0].toLowerCase()
  return cleanPath.endsWith('.pdf')
}

export const parsePdfInfo = (url) => {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!isPdfUrl(trimmed)) return null

  // Check if markdown link e.g. [Q4 B2B Report](https://.../report.pdf)
  const mdMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/)
  const rawUrl = (mdMatch ? mdMatch[2] : trimmed).trim()
  const label = mdMatch ? mdMatch[1].trim() : null

  const resolved = resolveMediaUrl(rawUrl)
  const rawFileName = rawUrl.split('/').pop().split('?')[0].split('#')[0] || 'Research-Document.pdf'
  const decodedFileName = decodeURIComponent(rawFileName)

  return {
    url: resolved,
    fileName: decodedFileName,
    title: label || decodedFileName.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ')
  }
}

