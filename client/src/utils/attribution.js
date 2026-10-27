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

const readLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null')
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

/** Payload attached to lead submissions (contact form, meeting booking, job applications, chatbot). */
export function getAttribution() {
  const first = read(FIRST_TOUCH_KEY) || {}
  // Priority: last clicked CTA -> origin CTA -> persistent localStorage CTA
  const lastCta =
    read('tg_last_clicked_cta') ||
    read('tg_origin_cta') ||
    readLocal('tg_persistent_last_cta') ||
    {}

  // Parse any current query parameters (e.g. if arrived at /contact with CTA UTMs)
  let currentUtms = {}
  try {
    const params = new URLSearchParams(window.location.search)
    currentUtms = Object.fromEntries(
      [...UTM_KEYS, 'source_section', 'cta_button', 'source_page'].map((k) => [k, params.get(k)]).filter(([, v]) => v)
    )
  } catch (_) {}

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isContactPage = currentPath === '/contact'

  // Resolve originating CTA details
  const sourcePage =
    currentUtms.source_page ||
    lastCta.page_url ||
    read(LAST_PAGE_KEY) ||
    first.landing_page ||
    currentPath

  const ctaButton =
    currentUtms.cta_button ||
    lastCta.cta_text ||
    (isContactPage ? 'Direct Contact Form' : 'General Page Form')

  const ctaSection =
    currentUtms.source_section ||
    lastCta.section_name ||
    lastCta.section_id ||
    (isContactPage ? 'Contact Form Section' : 'Page Form')

  const utmCampaign =
    currentUtms.utm_campaign ||
    lastCta.utm_campaign ||
    first.utm_campaign ||
    (isContactPage ? 'contact_page' : 'website')

  const utmContent =
    currentUtms.utm_content ||
    lastCta.utm_content ||
    first.utm_content ||
    `${String(ctaSection).toLowerCase().replace(/[^a-z0-9]+/g, '_')}__${String(ctaButton).toLowerCase().replace(/[^a-z0-9]+/g, '_')}`

  const utmTerm =
    currentUtms.utm_term ||
    lastCta.utm_term ||
    first.utm_term ||
    String(ctaSection).toLowerCase().replace(/[^a-z0-9]+/g, '_')

  const utmSource =
    currentUtms.utm_source ||
    lastCta.utm_source ||
    first.utm_source ||
    'tarajglobal'

  const utmMedium =
    currentUtms.utm_medium ||
    lastCta.utm_medium ||
    first.utm_medium ||
    (lastCta.cta_text ? 'cta_button' : 'website')

  return {
    ...first,
    source_page: sourcePage,
    page_title: lastCta.page_title || (typeof document !== 'undefined' ? document.title : ''),
    conversion_page: currentPath,
    cta_button: ctaButton,
    cta_section: ctaSection,
    channel: first.channel || (lastCta.cta_text ? `cta / ${utmCampaign}` : 'website / direct'),
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_content: utmContent,
    utm_term: utmTerm,
    timestamp: new Date().toISOString(),
  }
}


