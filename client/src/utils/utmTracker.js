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
const ORIGIN_CTA_KEY = 'tg_origin_cta'
const PERSISTENT_CTA_KEY = 'tg_persistent_last_cta'
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
  const path = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '/') || '/').toLowerCase()
  if (path === '/' || path === '') return 'home_page'
  if (path.includes('hql')) return 'hql_services'
  if (path.includes('sql')) return 'sql_services'
  if (path.includes('mql')) return 'mql_services'
  if (path.includes('bant')) return 'bant_lead_generation'
  if (path.includes('appointment')) return 'b2b_appointment_setting'
  if (path.includes('content-syndication') || path.includes('contentsyndication')) return 'content_syndication'
  if (path.includes('demand-generation') || path.includes('demandgeneration')) return 'demand_generation'
  if (path.includes('lead-nurturing') || path.includes('leadnurturing')) return 'lead_nurturing'
  if (path.includes('database-cleansing') || path.includes('databasecleansing')) return 'database_cleansing'
  if (path.includes('list-building') || path.includes('listbuilding')) return 'b2b_list_building'
  if (path.includes('email-marketing') || path.includes('emailmarketing')) return 'b2b_email_marketing'
  if (path.includes('webinar')) return 'webinar_services'
  if (path.includes('demandflow')) return 'demandflow_bridge'
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
    'sql-hero': 'SQL Hero Section',
    'mql-hero': 'MQL Hero Section',
    'bant-hero': 'BANT Hero Section',
    'appointment-hero': 'Appointment Setting Hero Section',
    'demand-gen-hero': 'Demand Gen Hero Section',
    'careers-hero': 'Careers Hero Section',
    'what-is-hql': 'What is HQL Section',
    'what-is-service': 'Service Overview Section',
    'who-is-hql-for': 'Target Audience Section',
    'who-is-it-for': 'Target Audience Section',
    'what-problems-solved': 'Problems Solved Section',
    'problems-solved': 'Problems Solved Section',
    'workflow': 'Process Workflow Section',
    'process': 'Execution Process Section',
    'hql-process': 'HQL Process Section',
    'sql-process': 'SQL Process Section',
    'mql-process': 'MQL Process Section',
    'webinar-process': 'Webinar Process Section',
    'what-taraj-delivers': 'Deliverables Section',
    'deliverables': 'Deliverables Section',
    'why-choose': 'Why Choose Taraj Section',
    'why-choose-taraj': 'Why Choose Taraj Section',
    'faq': 'FAQ Section',
    'hql-faq': 'HQL FAQ Section',
    'final-cta': 'Final CTA Section',
    'cta': 'Call to Action Section',
    'navbar': 'Navigation Header',
    'header': 'Navigation Header',
    'footer': 'Footer Section',
    'meeting-modal': 'Meeting Booking Modal',
    'contact-form': 'Contact Form Section',
    'contact-hero': 'Contact Hero Section',
    'get-in-touch': 'Get In Touch Section',
    'command-center': 'Command Center Section',
    'product-showcase': 'Product Showcase Section',
    'open-roles': 'Open Roles Section',
    'application-modal': 'Job Application Modal',
    'chat-widget': 'ChatBot Assistant',
    'pricing': 'Pricing Section',
  }

  const normalized = String(sectionId).toLowerCase().trim()
  if (map[normalized]) return map[normalized]

  return normalized
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Filter out generic non-semantic IDs that should not be used as section names
 */
function isIgnoredId(id) {
  if (!id) return true
  const lower = id.toLowerCase()
  return (
    lower.startsWith('headlessui-') ||
    lower.startsWith(':r') ||
    ['root', 'app', 'main', 'wrapper', 'container', 'layout', 'content', 'portal', 'modal-portal'].includes(lower)
  )
}

/**
 * Resolve the section in which an element resides
 */
export function findElementSection(element) {
  if (!element || !(element instanceof HTMLElement)) {
    return { id: 'unknown_section', name: 'General Page Section' }
  }

  // 1. Explicit data attributes on element or ancestors
  const explicitHost = element.closest('[data-cta-section], [data-section]')
  if (explicitHost) {
    const customSection = explicitHost.getAttribute('data-cta-section') || explicitHost.getAttribute('data-section')
    if (customSection) {
      return {
        id: slugify(customSection),
        name: humanizeSection(customSection)
      }
    }
  }

  // 2. Structural landmark elements (section, header, nav, footer, dialog/modal)
  const landmarkHost = element.closest('section, header, nav, footer, [role="dialog"], [role="region"], [data-modal], aside')
  if (landmarkHost) {
    const tagName = landmarkHost.tagName.toLowerCase()

    // Check if landmark has explicit section attribute or valid ID
    const explicitSec = landmarkHost.getAttribute('data-cta-section') || landmarkHost.getAttribute('data-section')
    if (explicitSec) {
      return { id: slugify(explicitSec), name: humanizeSection(explicitSec) }
    }

    const hostId = landmarkHost.id
    if (hostId && !isIgnoredId(hostId)) {
      return { id: slugify(hostId), name: humanizeSection(hostId) }
    }

    const ariaLabel = landmarkHost.getAttribute('aria-label')
    if (ariaLabel && ariaLabel.trim()) {
      const cleanAria = ariaLabel.trim().slice(0, 50)
      return { id: slugify(cleanAria), name: humanizeSection(cleanAria) }
    }

    if (tagName === 'nav' || tagName === 'header') {
      return { id: 'navbar', name: 'Navigation Header' }
    }
    if (tagName === 'footer') {
      return { id: 'footer', name: 'Footer Section' }
    }
    if (landmarkHost.getAttribute('role') === 'dialog' || landmarkHost.hasAttribute('data-modal')) {
      return { id: 'modal_dialog', name: 'Modal Dialog' }
    }

    // Check for first prominent heading in this section
    const heading = landmarkHost.querySelector('h1, h2, h3, h4')
    if (heading && heading.textContent) {
      const text = heading.textContent.trim().slice(0, 40)
      return {
        id: slugify(text),
        name: humanizeSection(text)
      }
    }
  }

  // 3. Fallback to any ancestor with a valid semantic ID (e.g. #hero, #final-cta, #contact)
  const idHost = element.closest('[id]')
  if (idHost && !isIgnoredId(idHost.id)) {
    return {
      id: slugify(idHost.id),
      name: humanizeSection(idHost.id)
    }
  }

  return { id: 'page_body', name: 'Page Body' }
}

/**
 * Build UTM parameters for a given section and CTA button
 */
export function buildUtmParams({ sectionId, sectionName, ctaText, customCampaign }) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
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
  } catch (_) { }

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

  // Never expose internal CTA tracking parameters in browser address bar for /contact
  if (targetUrl === '/contact' || targetUrl.startsWith('/contact?')) {
    return '/contact'
  }

  try {
    const isRelative = !targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')
    const base = isRelative && typeof window !== 'undefined' ? window.location.origin : undefined
    const parsed = new URL(targetUrl, base)

    const utms = buildUtmParams({ sectionId, sectionName, ctaText, customCampaign })

    // Only set UTM params if not already set on target URL
    Object.entries(utms).forEach(([key, val]) => {
      if (!parsed.searchParams.has(key) && val) {
        parsed.searchParams.set(key, val)
      }
    })

    // Include section & button text for conversion form pre-fill or telemetry
    if (sectionName && !parsed.searchParams.has('source_section')) {
      parsed.searchParams.set('source_section', sectionName)
    }
    if (ctaText && !parsed.searchParams.has('cta_button')) {
      parsed.searchParams.set('cta_button', ctaText)
    }
    if (typeof window !== 'undefined' && !parsed.searchParams.has('source_page')) {
      parsed.searchParams.set('source_page', window.location.pathname)
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
  const currentPath = page_url || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const currentTitle = page_title || (typeof document !== 'undefined' ? document.title : 'Taraj Global')
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

  // 1. Persist in sessionStorage & localStorage so all forms inherit the exact originating CTA
  try {
    sessionStorage.setItem(LAST_CTA_KEY, JSON.stringify(payload))
    // Also save as origin CTA if not already present in session
    if (!sessionStorage.getItem(ORIGIN_CTA_KEY)) {
      sessionStorage.setItem(ORIGIN_CTA_KEY, JSON.stringify(payload))
    }
    localStorage.setItem(PERSISTENT_CTA_KEY, JSON.stringify(payload))
  } catch (_) { }

  // 2. Transmit to Google Analytics (gtag) if installed
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
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
    } catch (_) { }
  }

  // 3. Transmit to Backend API via sendBeacon (ideal for outgoing navigations) or fetch keepalive
  const apiEndpoint = '/api/analytics/cta-click'
  const bodyData = JSON.stringify(payload)

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    try {
      const blob = new Blob([bodyData], { type: 'application/json' })
      const sent = navigator.sendBeacon(apiEndpoint, blob)
      if (sent) return payload
    } catch (_) { }
  }

  // Fallback to fetch with keepalive
  try {
    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyData,
      keepalive: true,
    }).catch(() => { })
  } catch (_) { }

  return payload
}

/**
 * Sync address bar UTM parameters from the last clicked CTA if missing
 * Useful when navigating via SPA React Router navigate('/contact')
 */
export function syncUrlUtmsWithLastCta() {
  if (typeof window === 'undefined') return
  try {
    if (window.location.pathname === '/contact' && window.location.search) {
      const currentParams = new URLSearchParams(window.location.search)
      // If internal CTA attribution was passed via query params, archive it to storage then clean address bar
      if (
        currentParams.has('utm_campaign') ||
        currentParams.has('utm_medium') ||
        currentParams.has('cta_button') ||
        currentParams.has('source_section')
      ) {
        const ctaData = {
          cta_text: currentParams.get('cta_button'),
          section_name: currentParams.get('source_section'),
          page_url: currentParams.get('source_page') || document.referrer || '/',
          utm_source: currentParams.get('utm_source') || 'tarajglobal',
          utm_medium: currentParams.get('utm_medium') || 'cta_button',
          utm_campaign: currentParams.get('utm_campaign'),
          utm_content: currentParams.get('utm_content'),
          utm_term: currentParams.get('utm_term'),
          timestamp: new Date().toISOString(),
        }
        if (ctaData.cta_text || ctaData.utm_campaign) {
          sessionStorage.setItem(LAST_CTA_KEY, JSON.stringify(ctaData))
          localStorage.setItem(PERSISTENT_CTA_KEY, JSON.stringify(ctaData))
        }
        // Clean address bar so visitors always see clean /contact
        window.history.replaceState(null, '', '/contact' + window.location.hash)
      }
    }
  } catch (_) { }
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

      // CRITICAL: Ignore form submit buttons so submitting the form does NOT overwrite
      // the originating CTA button and page/section that brought the user to the form!
      const isFormSubmit =
        clickable.type === 'submit' ||
        clickable.getAttribute('type') === 'submit' ||
        (clickable.closest('form') && !clickable.hasAttribute('data-cta'))

      if (isFormSubmit) {
        return
      }

      // Check if element is an ignored UI control (e.g. accordion toggle, theme switch, tab switcher)
      if (
        clickable.getAttribute('data-no-track') === 'true' ||
        clickable.classList.contains('no-track') ||
        clickable.getAttribute('aria-label')?.toLowerCase().includes('close') ||
        clickable.getAttribute('aria-label')?.toLowerCase().includes('theme') ||
        clickable.getAttribute('role') === 'tab' ||
        clickable.classList.contains('accordion-trigger')
      ) {
        return
      }

      // Check if element is a CTA:
      // A: explicitly marked with data-cta or data-cta-name or data-cta-section
      // B: anchor pointing to /contact, /#contact, /careers, or external meeting/calendly
      // C: button with text indicating conversion intent
      // D: button located inside a hero section or final-cta section
      const hasCtaAttr =
        clickable.hasAttribute('data-cta') ||
        clickable.hasAttribute('data-cta-section') ||
        clickable.hasAttribute('data-cta-name')

      const href = clickable.getAttribute('href') || ''
      const isContactLink =
        href.includes('/contact') ||
        href.includes('/careers') ||
        href.includes('calendly.com') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')

      const rawText = (
        clickable.getAttribute('data-cta-name') ||
        clickable.innerText ||
        clickable.getAttribute('aria-label') ||
        ''
      ).trim()
      const textSample = rawText.toLowerCase()

      const ctaKeywords = [
        'schedule', 'book', 'start', 'contact', 'talk', 'get in touch',
        'get started', 'hire', 'consultation', 'request', 'demo', 'explore',
        'pricing', 'reach out', 'partner', 'deploy', 'audit', 'apply',
        'claim', 'sample', 'speak', 'connect', 'discuss', 'quote',
        'inquire', 'inquiry', 'call', 'meeting', 'submit resume', 'qualify',
        'discover', 'grow', 'scale', 'calculate', 'download', 'see how it works'
      ]

      const isCtaKeyword = ctaKeywords.some((kw) => textSample.includes(kw))

      // Check if element is inside an active conversion section
      const isInConversionArea = Boolean(
        clickable.closest(
          'section#hero, section#final-cta, section[id*="cta"], section[id*="hero"], [data-cta-section], nav, header, footer'
        )
      )

      if (!hasCtaAttr && !isContactLink && !isCtaKeyword && !isInConversionArea) {
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

      // Fire tracking event and persist attribution silently in session/local storage
      // Do not mutate link href so the browser URL stays clean as /contact
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