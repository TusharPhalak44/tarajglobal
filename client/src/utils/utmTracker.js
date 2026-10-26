/**
 * Global UTM & CTA Analytics Tracking Engine for Taraj Global
 * 
 * Tracks all CTA interactions across the whole website:
 * - Detects origin page & URL path
 * - Detects exact page section (e.g., hero, workflow, why-choose, faq, final-cta, nav, footer)
 * - Captures CTA button text & target destination
 * - Synthesizes & attaches standard UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
 * - Transmits real-time events to backend (/api/analytics/cta-click)
 * - Forwards events to Google Analytics (gtag)
 * - Persists attribution for CRM leads and meeting scheduling
 */

const SESSION_KEY = 'tg_analytics_session'
const LAST_CTA_KEY = 'tg_last_clicked_cta'
const FIRST_TOUCH_KEY = 'tg_first_touch'

/**
 * Get or create persistent session ID for visitor
 */
export function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36)
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch (_) {
    return 'sess_anon_' + Date.now()
  }
}

/**
 * Clean slug from string
 */
export function slugify(text) {
  if (!text) return ''
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^-+|-+$/g, '')
}

/**
 * Map pathname to clean campaign identifier
 */
export function getCampaignFromPath(pathname) {
  const path = (pathname || window.location.pathname || '/').toLowerCase()
  if (path === '/' || path === '') return 'home_page'
  if (path.includes('hql')) return 'hql_services'
  if (path.includes('demandflow')) return 'demandflow_bridge'
  if (path.includes('appointment')) return 'b2b_appointment_setting'
  if (path.includes('contact')) return 'contact_page'
  if (path.includes('career')) return 'careers'
  if (path.includes('blog')) return 'blog'
  if (path.includes('about')) return 'about_us'

  // Generic fallback: /services/content-syndication -> services_content_syndication
  const clean = path.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9_-]+/g, '_')
  return clean || 'marketing_site'
}

/**
 * Humanize section ID into clean readable name
 */
export function humanizeSection(sectionId) {
  if (!sectionId) return 'General Page Section'
  
  const map = {
    'hero': 'Hero Section',
    'hql-hero': 'HQL Hero Section',
    'what-is-hql': 'What is HQL Section',
    'who-is-hql-for': 'Target Audience Section',
    'what-problems-solved': 'Problems Solved Section',
    'workflow': 'Process Workflow Section',
    'hql-process': 'HQL Process Section',
    'what-taraj-delivers': 'Deliverables Section',
    'why-choose': 'Why Choose Taraj Section',
    'why-choose-taraj': 'Why Choose Taraj Section',
    'faq': 'FAQ Section',
    'hql-faq': 'HQL FAQ Section',
    'final-cta': 'Final CTA Section',
    'navbar': 'Navigation Header',
    'footer': 'Footer Section',
    'meeting-modal': 'Meeting Booking Modal',
    'contact-form': 'Contact Form Section',
  }

  const normalized = sectionId.toLowerCase().trim()
  if (map[normalized]) return map[normalized]

  return normalized
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Resolve the section in which an element resides
 */
export function findElementSection(element) {
  if (!element || !(element instanceof HTMLElement)) {
    return { id: 'unknown_section', name: 'General Page Section' }
  }

  // 1. Explicit data attributes on element or ancestors
  const sectionHost = element.closest('[data-cta-section], [data-section], section, nav, header, footer, [id]')

  if (sectionHost) {
    const customSection = sectionHost.getAttribute('data-cta-section') || sectionHost.getAttribute('data-section')
    if (customSection) {
      return {
        id: slugify(customSection),
        name: humanizeSection(customSection)
      }
    }

    const hostId = sectionHost.id
    if (hostId && !hostId.startsWith('headlessui-') && !hostId.startsWith(':r')) {
      return {
        id: slugify(hostId),
        name: humanizeSection(hostId)
      }
    }

    const tagName = sectionHost.tagName.toLowerCase()
    if (tagName === 'nav' || tagName === 'header') {
      return { id: 'navbar', name: 'Navigation Header' }
    }
    if (tagName === 'footer') {
      return { id: 'footer', name: 'Footer Section' }
    }
    if (tagName === 'section') {
      // Check for first heading in section
      const heading = sectionHost.querySelector('h1, h2, h3')
      if (heading && heading.textContent) {
        const text = heading.textContent.trim().slice(0, 40)
        return {
          id: slugify(text),
          name: text + ' Section'
        }
      }
    }
  }

  return { id: 'page_body', name: 'Page Body' }
}

/**
 * Build UTM parameters for a given section and CTA button
 */
export function buildUtmParams({ sectionId, sectionName, ctaText, customCampaign }) {
  const currentPath = window.location.pathname
  const campaign = customCampaign || getCampaignFromPath(currentPath)
  const buttonSlug = slugify(ctaText || 'button')
  const secSlug = slugify(sectionId || 'section')

  // Check if first-touch had an external source (e.g. google, linkedin)
  let source = 'tarajglobal'
  try {
    const firstTouch = JSON.parse(sessionStorage.getItem(FIRST_TOUCH_KEY) || '{}')
    if (firstTouch.utm_source) {
      source = firstTouch.utm_source
    }
  } catch (_) {}

  return {
    utm_source: source,
    utm_medium: 'cta_button',
    utm_campaign: campaign,
    utm_content: `${secSlug}__${buttonSlug}`,
    utm_term: secSlug,
  }
}

/**
 * Construct destination URL enriched with UTM query parameters
 */
export function buildTrackedUrl(targetUrl, { sectionId, sectionName, ctaText, customCampaign } = {}) {
  if (!targetUrl) return ''

  try {
    // If it's a relative URL or internal anchor
    const isRelative = !targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')
    const base = isRelative ? window.location.origin : undefined
    const parsed = new URL(targetUrl, base)

    const utms = buildUtmParams({ sectionId, sectionName, ctaText, customCampaign })

    // Only set UTM params if not already set on target URL
    Object.entries(utms).forEach(([key, val]) => {
      if (!parsed.searchParams.has(key) && val) {
        parsed.searchParams.set(key, val)
      }
    })

    // Also include section info for conversion form pre-fill or analytics
    if (sectionName && !parsed.searchParams.has('source_section')) {
      parsed.searchParams.set('source_section', sectionName)
    }

    if (isRelative) {
      return parsed.pathname + parsed.search + parsed.hash
    }
    return parsed.toString()
  } catch (err) {
    return targetUrl
  }
}

/**
 * Dispatch CTA click event to backend & analytics providers
 */
export async function trackCtaClick({
  page_url,
  page_title,
  section_id,
  section_name,
  cta_text,
  destination_url,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
} = {}) {
  const currentPath = page_url || window.location.pathname
  const currentTitle = page_title || document.title || 'Taraj Global'
  const sessionId = getSessionId()

  const defaultUtms = buildUtmParams({
    sectionId: section_id,
    sectionName: section_name,
    ctaText: cta_text,
    customCampaign: utm_campaign
  })

  const payload = {
    page_url: currentPath,
    page_title: currentTitle,
    section_id: section_id || 'unknown',
    section_name: section_name || humanizeSection(section_id),
    cta_text: (cta_text || 'CTA Click').slice(0, 150),
    destination_url: destination_url || null,
    utm_source: utm_source || defaultUtms.utm_source,
    utm_medium: utm_medium || defaultUtms.utm_medium,
    utm_campaign: utm_campaign || defaultUtms.utm_campaign,
    utm_term: utm_term || defaultUtms.utm_term,
    utm_content: utm_content || defaultUtms.utm_content,
    session_id: sessionId,
    timestamp: new Date().toISOString(),
  }

  // 1. Persist in sessionStorage so subsequent lead forms inherit the exact originating CTA
  try {
    sessionStorage.setItem(LAST_CTA_KEY, JSON.stringify(payload))
  } catch (_) {}

  // 2. Transmit to Google Analytics (gtag) if installed
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA Interaction',
        event_label: payload.cta_text,
        page_location: window.location.href,
        page_path: payload.page_url,
        cta_section: payload.section_name,
        cta_destination: payload.destination_url,
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
        utm_content: payload.utm_content,
      })
    } catch (_) {}
  }

  // 3. Transmit to Backend API via sendBeacon (ideal for outgoing navigations) or fetch keepalive
  const apiEndpoint = '/api/analytics/cta-click'
  const bodyData = JSON.stringify(payload)

  if (typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([bodyData], { type: 'application/json' })
      const sent = navigator.sendBeacon(apiEndpoint, blob)
      if (sent) return payload
    } catch (_) {}
  }

  // Fallback to fetch with keepalive
  try {
    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyData,
      keepalive: true,
    }).catch(() => {})
  } catch (_) {}

  return payload
}

/**
 * Global Click Listener Initializer
 * Listens on window for all button / link clicks to automatically identify CTA events
 */
let isListenerAttached = false

export function initGlobalCtaTracker() {
  if (typeof window === 'undefined' || isListenerAttached) return
  isListenerAttached = true

  document.addEventListener('click', (event) => {
    try {
      const target = event.target
      if (!(target instanceof HTMLElement)) return

      // Find closest clickable element
      const clickable = target.closest('button, a, [role="button"], [data-cta]')
      if (!clickable) return

      // Check if element is an ignored UI control (e.g. accordion toggle, theme switch, tab switcher)
      if (
        clickable.getAttribute('data-no-track') === 'true' ||
        clickable.classList.contains('no-track') ||
        clickable.getAttribute('aria-label')?.includes('Close') ||
        clickable.getAttribute('aria-label')?.includes('theme')
      ) {
        return
      }

      // Check if element is a CTA:
      // A: explicitly marked with data-cta or data-cta-name or data-cta-section
      // B: anchor pointing to /contact, /#contact, or external meeting/calendly
      // C: button with text indicating conversion intent
      const hasCtaAttr = clickable.hasAttribute('data-cta') || clickable.hasAttribute('data-cta-section') || clickable.hasAttribute('data-cta-name')
      const href = clickable.getAttribute('href') || ''
      const isContactLink = href.includes('/contact') || href.includes('calendly.com') || href.startsWith('tel:') || href.startsWith('mailto:')

      const rawText = (clickable.getAttribute('data-cta-name') || clickable.innerText || clickable.getAttribute('aria-label') || '').trim()
      const textSample = rawText.toLowerCase()

      const ctaKeywords = [
        'schedule', 'book', 'start', 'contact', 'talk to', 'get in touch',
        'get started', 'hire', 'consultation', 'request', 'demo', 'explore services',
        'let\'s talk', 'view pricing', 'reach out', 'partner'
      ]

      const isCtaKeyword = ctaKeywords.some((kw) => textSample.includes(kw))

      if (!hasCtaAttr && !isContactLink && !isCtaKeyword) {
        // Not a conversion CTA button, pass through without tracking
        return
      }

      // Resolve section and button details
      const sectionInfo = findElementSection(clickable)
      const explicitSection = clickable.getAttribute('data-cta-section')
      const sectionId = explicitSection ? slugify(explicitSection) : sectionInfo.id
      const sectionName = explicitSection ? humanizeSection(explicitSection) : sectionInfo.name

      const ctaText = clickable.getAttribute('data-cta-name') || (rawText ? rawText.slice(0, 100) : 'CTA Action')
      const destination = href || clickable.getAttribute('data-destination') || 'modal_or_action'

      // If it's a contact link, enrich its href with UTMs on the fly so router or browser navigation carries them
      if (clickable.tagName.toLowerCase() === 'a' && isContactLink && !href.includes('utm_campaign=')) {
        const enriched = buildTrackedUrl(href, { sectionId, sectionName, ctaText })
        if (enriched && enriched !== href) {
          clickable.setAttribute('href', enriched)
        }
      }

      // Fire tracking event
      trackCtaClick({
        section_id: sectionId,
        section_name: sectionName,
        cta_text: ctaText,
        destination_url: destination,
      })
    } catch (err) {
      // Do not block user action on tracker error
      console.debug('Global CTA tracking error:', err)
    }
  }, true) // Capture phase ensures we intercept before navigation
}
