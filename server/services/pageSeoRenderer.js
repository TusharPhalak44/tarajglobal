import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import db from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_URL = (process.env.SITE_URL || 'https://tarajglobal.com').replace(/\/+$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/OnlyTG-%203.png`

// HTML entity escaper
const esc = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// In-memory HTML cache with 5 minute TTL
const pageHtmlCache = new Map()
const CACHE_TTL_MS = 5 * 60 * 1000

/**
 * Invalidate HTML cache for a specific page entity or all pages
 */
export const invalidatePageCache = (entityId = null) => {
  if (!entityId) {
    pageHtmlCache.clear()
    console.log('🧹 [PageSeoRenderer] Cleared entire page HTML cache')
    return
  }
  const key = String(entityId).toLowerCase().trim()
  let deleted = 0
  for (const cacheKey of pageHtmlCache.keys()) {
    if (cacheKey === key || cacheKey.includes(key)) {
      pageHtmlCache.delete(cacheKey)
      deleted++
    }
  }
  console.log(`🧹 [PageSeoRenderer] Invalidated ${deleted} cache entries for: ${entityId}`)
}

export const PAGE_ALIASES = {
  '': 'home',
  '/': 'home',
  'home': 'home',
  'who-we-are': 'who-we-are',
  'about': 'who-we-are',
  'services': 'services',
  'contact': 'contact',
  'contact-us': 'contact',
  'careers': 'careers',
  'career': 'careers',
  'blog': 'blog',
  'blogs': 'blog',
  'bant-lead-generation': 'bant-lead-generation',
  'demandflow-bridge': 'demandflow-bridge',
  'demand-flow-bridge': 'demandflow-bridge',
  'mql-services': 'mql-services',
  'hql-services': 'hql-services',
  'sql-services': 'sql-services',
  'b2b-appointment-setting': 'b2b-appointment-setting',
  'b2b-email-marketing': 'b2b-email-marketing',
  'abm': 'abm',
  'webinar-services': 'webinar-services',
  'lead-nurturing': 'lead-nurturing',
  'demand-generation': 'demand-generation',
  'full-funnel-demand': 'full-funnel-demand',
  'account-based-experience': 'account-based-experience',
  'b2b-list-building': 'b2b-list-building',
  'database-cleansing': 'database-cleansing',
  'content-syndication': 'content-syndication',
  'sitemap': 'sitemap',
  'privacy': 'privacy',
  'privacy-policy': 'privacy',
  'terms': 'terms',
  'terms-and-conditions': 'terms',
  'cookies': 'cookies',
  'cookie-policy': 'cookies'
}

export const DEFAULT_PAGE_META = {
  home: {
    title: 'Tech-Powered B2B Demand Generation & AI Lead Gen | TaRaj Global',
    description: 'Accelerate enterprise sales pipeline across US, EMEA, and APAC. TaRaj Global combines demand generation services with proprietary verification tools and unified CRM pipeline delivery.',
    canonical: `${SITE_URL}/`
  },
  'who-we-are': {
    title: 'About TaRaj Global | Tech-Powered B2B Demand Generation Engine',
    description: "Learn about TaRaj Global's company heritage, leadership team, and mission. We combine in-house verification tools, custom CRM pipeline delivery, and account outreach across US, EMEA & APAC.",
    canonical: `${SITE_URL}/who-we-are`
  },
  services: {
    title: 'Strategic Data-Driven B2B Services | TaRaj Global',
    description: "Discover TaRaj Global's data-driven B2B services: Lead Generation, Channels & Programs, Demand & ABM/ABX, and Data Operations across US, EMEA, and APAC markets.",
    canonical: `${SITE_URL}/services`
  },
  contact: {
    title: 'Contact TaRaj Global | Book a B2B Strategy Call',
    description: 'Talk to TaRaj Global about B2B appointment setting, lead generation, content syndication, and ABM. Book a strategy call or send us a message.',
    canonical: `${SITE_URL}/contact`
  },
  blog: {
    title: 'B2B Marketing & Demand Generation Blog | Insights & Strategies | Taraj Global',
    description: 'Explore actionable B2B marketing insights, sales qualification strategies, ABM frameworks, and lead generation trends to scale your enterprise sales pipeline.',
    canonical: `${SITE_URL}/blog`
  },
  careers: {
    title: 'TaRaj Global Careers | B2B Sales & Marketing Jobs in Pune',
    description: 'Join TaRaj Global in Kharadi, Pune. Explore B2B sales development, demand generation and MarTech roles with fast promotion and uncapped incentives.',
    canonical: `${SITE_URL}/careers`
  },
  'sql-services': {
    title: 'SQL Lead Generation Services | Tech-Powered Sales Qualified Leads | TaRaj Global',
    description: 'Fill AE calendars with verified Sales Qualified Leads across US, EMEA, and APAC. TaRaj Global delivers sales-ready decision-makers verified via in-house tooling and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/sql-services`
  },
  'mql-services': {
    title: 'B2B MQL Lead Generation Services | TaRaj Global',
    description: 'Get verified Marketing Qualified Leads (MQLs) scored by AI against your ICP and routed straight into your CRM across US, EMEA, and APAC',
    canonical: `${SITE_URL}/mql-services`
  },
  'hql-services': {
    title: 'High-Quality Leads (HQL) Services | Taraj Global',
    description: "Accelerate your B2B sales pipeline with Taraj Global's High-Quality Leads (HQL) services. Verified decision-makers, custom discovery screening, 100% human-verified data, and guaranteed CPL delivery.",
    canonical: `${SITE_URL}/hql-services`
  },
  'bant-lead-generation': {
    title: 'BANT Lead Generation Services | Tech-Powered B2B Qualification | TaRaj Global',
    description: 'Accelerate enterprise B2B deal velocity across US, EMEA, and APAC. TaRaj Global delivers BANT-qualified decision-makers verified via custom in-house tooling and 99.8% Data Accuracy SLA',
    canonical: `${SITE_URL}/bant-lead-generation`
  },
  'b2b-appointment-setting': {
    title: 'B2B Appointment Setting Services | Verified Decision-Maker Meetings | TaRaj Global',
    description: 'Book qualified discovery meetings with verified decision-makers across US, EMEA, and APAC. TaRaj Global combines SDR expertise, AI-assisted intent signals, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/b2b-appointment-setting`
  },
  'b2b-email-marketing': {
    title: 'B2B Email Marketing Services | AI-Enhanced Verified-Data Email Outreach | TaRaj Global',
    description: 'Reach verified decision-makers across US, EMEA, and APAC with AI-enhanced B2B email outreach, custom deliverability engines, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/b2b-email-marketing`
  },
  abm: {
    title: 'Account-Based Marketing (ABM) Services | Tech-Powered Enterprise Account Engagement | TaRaj Global',
    description: 'Engage high-value target accounts and full buying committees across US, EMEA, and APAC. TaRaj Global combines AI-assisted account scoring, intent telemetry, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/abm`
  },
  'content-syndication': {
    title: 'B2B Content Syndication Services | Verified Opt-In Leads on Guaranteed CPL | TaRaj Global',
    description: 'Syndicate whitepapers and research to verified decision-makers across US, EMEA, and APAC. TaRaj Global delivers opt-in, ICP-matched leads on guaranteed CPL with a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/content-syndication`
  },
  'demand-generation': {
    title: 'B2B Demand Generation Services | Demand Generation Agency | Taraj Global',
    description: 'Taraj Global provides B2B demand generation services that help technology and SaaS companies reach target audiences, engage decision-makers, generate qualified leads, and build stronger sales pipelines.',
    canonical: `${SITE_URL}/demand-generation`
  },
  'full-funnel-demand': {
    title: 'B2B Demand Generation Services | Tech-Powered Sales-Ready Pipeline | TaRaj Global',
    description: 'Build verified, sales-ready B2B pipeline across US, EMEA, and APAC. TaRaj Global combines AI-assisted intent scoring, multi-channel campaigns, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/full-funnel-demand`
  },
  'account-based-experience': {
    title: 'Account-Based Experience (ABX) Services | Tech-Powered Unified Buyer Journeys | TaRaj Global',
    description: 'Orchestrate one consistent, personalized journey for every enterprise buying committee across US, EMEA, and APAC. TaRaj Global combines AI-assisted intent signals, verified stakeholder data, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/account-based-experience`
  },
  'webinar-services': {
    title: 'B2B Webinar Services | Verified Registrations & Attendee-Qualified Pipeline | TaRaj Global',
    description: 'Fill B2B webinars with verified decision-makers and turn live engagement into sales-ready pipeline across US, EMEA, and APAC. TaRaj Global combines targeted promotion, attendee intelligence, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/webinar-services`
  },
  'lead-nurturing': {
    title: 'B2B Lead Nurturing Services | Tech-Powered Lead Engagement & Reactivation | TaRaj Global',
    description: 'Re-engage and develop B2B leads into sales-ready opportunities across US, EMEA, and APAC. TaRaj Global combines behavioral scoring, AI-assisted intent signals, and a 99.8% Data Accuracy SLA.',
    canonical: `${SITE_URL}/lead-nurturing`
  },
  'b2b-list-building': {
    title: 'Custom B2B List Building Services | Verified Prospect Data, Built to Your ICP | TaRaj Global',
    description: 'Get custom-built B2B prospect lists matched to your ICP across US, EMEA, and APAC. Human-led research, AI-assisted verification, and a 99.8% Data Accuracy SLA, delivered CRM-ready.',
    canonical: `${SITE_URL}/b2b-list-building`
  },
  'database-cleansing': {
    title: 'B2B Database Cleansing Services | Taraj Global',
    description: 'Scrub, deduplicate, verify, and enrich your stale CRM databases. Boost email deliverability, protect sender score, and empower sales with accurate contact data.',
    canonical: `${SITE_URL}/database-cleansing`
  },
  'demandflow-bridge': {
    title: 'DemandFlow Bridge | Unified Business Operations Platform | Taraj Global',
    description: "Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations.",
    canonical: `${SITE_URL}/demandflow-bridge`,
    image: `${SITE_URL}/demandflow-admin.png`
  },
  privacy: {
    title: 'Privacy Policy | Data Protection & Compliance | Taraj Global',
    description: 'Learn how Taraj Global collects, processes, and protects your personal data. Read our comprehensive Privacy Policy covering GDPR, CCPA, and enterprise B2B compliance.',
    canonical: `${SITE_URL}/privacy`
  },
  terms: {
    title: 'Terms of Service | Service Agreement | Taraj Global',
    description: "Read the complete Terms of Service governing the use of Taraj Global's website, B2B demand generation, lead qualification, and digital solutions.",
    canonical: `${SITE_URL}/terms`
  },
  cookies: {
    title: 'Cookie Policy | Tracking Technologies & Consent | Taraj Global',
    description: "Learn about the cookies and tracking technologies used on Taraj Global's website. Manage your cookie consent preferences and privacy settings.",
    canonical: `${SITE_URL}/cookies`
  },
  sitemap: {
    title: 'HTML Sitemap | Complete Site Directory & Services | Taraj Global',
    description: 'Explore the complete Taraj Global website directory. Access all B2B demand generation services, lead qualification solutions, company pages, and XML sitemap.',
    canonical: `${SITE_URL}/sitemap`
  }
}

/**
 * Locate and read base HTML template
 */
let cachedTemplate = null
let templateMtime = 0

const getBaseHtmlTemplate = () => {
  const candidatePaths = [
    path.resolve(process.cwd(), 'client', 'dist', 'index.html'),
    path.resolve(process.cwd(), 'client', 'index.html'),
    path.resolve(__dirname, '..', '..', 'client', 'dist', 'index.html'),
    path.resolve(__dirname, '..', '..', 'client', 'index.html'),
    '/usr/share/nginx/html/index.html'
  ]

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const stats = fs.statSync(p)
        if (!cachedTemplate || stats.mtimeMs > templateMtime) {
          cachedTemplate = fs.readFileSync(p, 'utf8')
          templateMtime = stats.mtimeMs
        }
        return cachedTemplate
      }
    } catch {
      // Continue searching
    }
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`
}

/**
 * Fetch page SEO from database
 */
export const fetchPageSeo = async (entityId) => {
  try {
    const aliasMap = {
      'who-we-are': ['who-we-are', 'about'],
      'about': ['about', 'who-we-are'],
      'careers': ['careers', 'career'],
      'career': ['careers', 'career'],
      'blog': ['blog', 'blogs'],
      'contact': ['contact', 'contact-us'],
      'privacy': ['privacy', 'privacy-policy'],
      'terms': ['terms', 'terms-and-conditions'],
      'cookies': ['cookies', 'cookie-policy'],
      'demandflow-bridge': ['demandflow-bridge', 'demand-flow-bridge']
    }

    const candidateIds = aliasMap[entityId] || [entityId]
    const placeholders = candidateIds.map(() => '?').join(',')

    const [rows] = await db.execute(
      `SELECT * FROM seo_metadata WHERE entity_type = 'page' AND entity_id IN (${placeholders}) ORDER BY updated_at DESC LIMIT 1`,
      candidateIds
    )

    return rows.length > 0 ? rows[0] : null
  } catch (err) {
    console.warn(`⚠️ [PageSeoRenderer] Database lookup warning for ${entityId}:`, err.message)
    return null
  }
}

/**
 * Render complete HTML for any static or service page with live DB metadata
 */
export const renderPageHtml = async (urlPath) => {
  const cleanPath = (urlPath || '').split('?')[0].replace(/\/+$/, '') || '/'
  const rawId = cleanPath === '/' ? 'home' : cleanPath.slice(1).toLowerCase()
  const entityId = PAGE_ALIASES[rawId] || rawId

  const cacheKey = `${entityId}:${cleanPath}`
  const cached = pageHtmlCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached
  }

  // 1. Fetch live metadata from database
  const dbMeta = await fetchPageSeo(entityId)
  const defaultMeta = DEFAULT_PAGE_META[entityId] || {
    title: 'Taraj Global | B2B Lead Generation & Demand Generation Agency',
    description: 'Scale your B2B sales pipeline with Taraj Global.',
    canonical: `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`
  }

  // 2. Resolve final SEO properties (database overrides take highest precedence)
  const isFromCMS = Boolean(dbMeta?.meta_title && dbMeta.meta_title.trim())
  const pageTitle = isFromCMS
    ? dbMeta.meta_title.trim()
    : defaultMeta.title

  const metaDescription = (dbMeta?.meta_description || defaultMeta.description || '').trim()
  const canonicalUrl = dbMeta?.canonical_url || defaultMeta.canonical || `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`
  const metaKeywords = (dbMeta?.meta_keywords || '').trim()

  const ogTitle = (dbMeta?.og_title || metaTitle || pageTitle).trim()
  const ogDescription = (dbMeta?.og_description || metaDescription).trim()
  const ogImage = dbMeta?.og_image || defaultMeta.image || DEFAULT_IMAGE

  const twitterTitle = (dbMeta?.twitter_title || ogTitle).trim()
  const twitterDescription = (dbMeta?.twitter_description || ogDescription).trim()
  const twitterImage = dbMeta?.twitter_image || ogImage

  let robots = dbMeta?.robots || 'index, follow, max-image-preview:large'
  if (robots.includes('noindex')) {
    robots = 'noindex, nofollow'
  }

  let structuredDataTag = ''
  if (dbMeta?.structured_data) {
    try {
      const parsed = typeof dbMeta.structured_data === 'string'
        ? JSON.parse(dbMeta.structured_data)
        : dbMeta.structured_data
      structuredDataTag = `\n    <script data-prerender type="application/ld+json">${JSON.stringify(parsed)}</script>`
    } catch {
      structuredDataTag = ''
    }
  }

  // 3. Assemble complete, pristine head tags
  const headTags = [
    `<title>${esc(pageTitle)}</title>`,
    `<meta data-prerender name="description" content="${esc(metaDescription)}" />`,
    `<link data-prerender rel="canonical" href="${esc(canonicalUrl)}" />`,
    metaKeywords ? `<meta data-prerender name="keywords" content="${esc(metaKeywords)}" />` : '',
    `<meta data-prerender name="robots" content="${esc(robots)}" />`,
    `<meta data-prerender property="og:type" content="website" />`,
    `<meta data-prerender property="og:site_name" content="Taraj Global" />`,
    `<meta data-prerender property="og:title" content="${esc(ogTitle)}" />`,
    `<meta data-prerender property="og:description" content="${esc(ogDescription)}" />`,
    `<meta data-prerender property="og:url" content="${esc(canonicalUrl)}" />`,
    `<meta data-prerender property="og:image" content="${esc(ogImage)}" />`,
    `<meta data-prerender property="og:locale" content="en_US" />`,
    `<meta data-prerender name="twitter:card" content="summary_large_image" />`,
    `<meta data-prerender name="twitter:site" content="@tarajglobal" />`,
    `<meta data-prerender name="twitter:title" content="${esc(twitterTitle)}" />`,
    `<meta data-prerender name="twitter:description" content="${esc(twitterDescription)}" />`,
    `<meta data-prerender name="twitter:image" content="${esc(twitterImage)}" />`,
    structuredDataTag
  ].filter(Boolean).join('\n    ')

  // 4. Strip ANY existing title, meta description, og, twitter, or prerender tags from template
  const template = getBaseHtmlTemplate()
  const renderedHtml = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta[^>]*data-prerender[^>]*>\s*/gi, '')
    .replace(/<link[^>]*data-prerender[^>]*>\s*/gi, '')
    .replace(/<script[^>]*data-prerender[^>]*>[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace('</head>', `    ${headTags}\n  </head>`)

  const result = { statusCode: 200, html: renderedHtml, meta: { title: pageTitle, description: metaDescription } }
  pageHtmlCache.set(cacheKey, { ...result, timestamp: Date.now() })
  return result
}

export default renderPageHtml
