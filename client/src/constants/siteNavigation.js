// Single Source of Truth for TaRaj Global navigation, services, and sitemap structures.
// Used across PremiumNavbar, FullscreenMenu, the HTML Sitemap page, and XML sitemap build scripts.
// Modifying this file automatically updates both the visual website menus and the sitemap.

export const PRIMARY_PAGES = [
  { name: 'Home', path: '/', desc: 'Enterprise overview & revenue pipeline', color: '#00A6FF' },
  { name: 'Who We Are', path: '/who-we-are', desc: 'Company mission, leadership & pedigree', color: '#FF6D00' },
  { name: 'Services Overview', path: '/services', desc: 'Complete directory of B2B revenue and demand solutions', color: '#00E5FF' },
  { name: 'Blogs', path: '/blog', desc: 'Market intelligence & B2B growth insights', color: '#EAB308' },
  { name: 'Careers', path: '/careers', desc: 'Join our revenue engineering team', color: '#A855F7' },
  { name: 'Contact Us', path: '/contact', desc: 'Direct strategy consultation & RFPs', color: '#00A6FF' },
]

export const SERVICES_MENU_DATA = [
  {
    title: 'Services',
    category: 'Services',
    desc: 'Bespoke intent verification and lead qualification tiers.',
    accent: '#00A6FF',
    iconType: 'Target',
    items: [
      { name: 'MQL Services', path: '/mql-services', desc: 'High-volume engaged prospects' },
      { name: 'HQL Services', path: '/hql-services', desc: 'Verified intent & confirmed interest' },
      { name: 'BANT Services', path: '/bant-lead-generation', desc: 'Budget, authority & need qualified' },
      { name: 'SQL Services', path: '/sql-services', desc: 'Sales-ready leads matched to ICP' },
      { name: 'Appointment Generation', path: '/b2b-appointment-setting', desc: 'Direct confirmed calendar meetings' },
    ],
  },
  {
    title: 'Program',
    category: 'Program',
    desc: 'Targeted account-based marketing, ABX, and pipeline acceleration.',
    accent: '#FF6D00',
    iconType: 'Layers',
    items: [
      { name: 'Full Funnel Demand', path: '/full-funnel-demand', desc: 'End-to-end intent & revenue capture' },
      { name: 'Account-Based Marketing', path: '/abm', desc: 'Targeted multi-tier key accounts' },
      { name: 'Account Based Experience', path: '/account-based-experience', desc: 'Omnichannel buyer journey & ABX' },
      { name: 'Lead Nurturing', path: '/lead-nurturing', desc: 'Multi-stage engagement cadences' },
    ],
  },
  {
    title: 'Channels & Data Solution',
    category: 'Channels & Data Solution',
    desc: 'Multi-channel outbound syndication, email, and human-verified contact data.',
    accent: '#8B5CF6',
    iconType: 'Mail',
    items: [
      { name: 'Email Marketing', path: '/b2b-email-marketing', desc: 'Cold outbound & nurture cadences' },
      { name: 'Content Syndication', path: '/content-syndication', desc: 'Whitepapers to targeted buying groups' },
      { name: 'Webinar Services', path: '/webinar-services', desc: 'Qualified executive attendees' },
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Human-verified ICP contact lists' },
      { name: 'Database Cleansing', path: '/database-cleansing', desc: 'Hygiene, enrichment & dedup' },
    ],
  },
  {
    title: 'Products & Publications',
    category: 'Products & Publications',
    desc: 'Platform technology and corporate publications.',
    accent: '#10B981',
    iconType: 'Database',
    items: [
      { name: 'DemandFlow Bridge', path: '/demandflow-bridge', desc: 'Connecting data, outreach & pipeline' },
      { name: 'TGS Tech Info', path: 'https://tgstechinfo.com/', desc: 'Technology publishing & media hub', isExternal: true },
    ],
  },
]

export const LEGAL_PAGES = [
  { name: 'Privacy Policy', path: '/privacy', desc: 'Global data protection standards, GDPR, and CCPA notice' },
  { name: 'Terms of Service', path: '/terms', desc: 'Terms and conditions for client engagements and site use' },
  { name: 'Cookie Policy', path: '/cookies', desc: 'Cookie categories, tracking consent, and browser settings' },
]

