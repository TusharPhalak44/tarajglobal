const FIRST_TOUCH_KEY = 'tg_first_touch'
const LAST_PAGE_KEY = 'tg_last_content_page'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const CONVERSION_PATHS = ['/contact', '/loginadmin']

const read = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  } catch (_) {
    return null
  }
}

const write = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (_) {}
}

function channelFromReferrer(referrer) {
  if (!referrer) return 'direct'
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '')
    if (host === window.location.hostname.replace(/^www\./, '')) return 'internal'
    if (/google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|baidu\./.test(host)) return `${host.split('.')[0]} / organic`
    if (/linkedin\.|lnkd\.in/.test(host)) return 'linkedin / social'
    if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com|youtube\./.test(host)) return `${host} / social`
    return `${host} / referral`
  } catch (_) {
    return 'unknown'
  }
}

/** Call on every route change. Records first touch once per session and the last content page viewed. */
export function trackAttribution(pathname, search) {
  if (!read(FIRST_TOUCH_KEY)) {
    const params = new URLSearchParams(search)
    const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k)]).filter(([, v]) => v))
    write(FIRST_TOUCH_KEY, {
      landing_page: pathname + search,
      referrer: document.referrer || '',
      channel: utm.utm_source
        ? [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' / ')
        : channelFromReferrer(document.referrer),
      ...utm,
    })
  }
  if (!CONVERSION_PATHS.includes(pathname)) write(LAST_PAGE_KEY, pathname)
}

/** Payload attached to lead submissions (contact form, meeting booking). */
export function getAttribution() {
  const first = read(FIRST_TOUCH_KEY) || {}
  return {
    ...first,
    source_page: read(LAST_PAGE_KEY) || first.landing_page || '/',
    conversion_page: window.location.pathname,
  }
}
