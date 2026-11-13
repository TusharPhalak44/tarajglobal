import { SERVICES_MENU_DATA } from '../src/constants/siteNavigation.js'

// Static head metadata per public route. Keep in sync with the <SEO> props on each page;
// this is what crawlers and link previews see before JavaScript runs.
export const SITE_URL = 'https://tarajglobal.com'
export const DEFAULT_IMAGE = `${SITE_URL}/OnlyTG-%203.png`

export const SERVICES = SERVICES_MENU_DATA.flatMap((cat) =>
  cat.items
    .filter((item) => !item.isExternal)
    .map((item) => ({ path: item.path, name: item.name }))
)

export const ROUTES = {
  '/': {
    title: 'Tech-Powered B2B Demand Generation & AI Lead Gen | TaRaj Global',
    description: 'Accelerate enterprise sales pipeline across US, EMEA, and APAC. TaRaj Global combines demand generation services with proprietary verification tools and unified CRM pipeline delivery.',
    h1: 'Tech-Powered B2B Demand Generation & AI Lead Gen',
  },
  '/who-we-are': {
    title: 'About TaRaj Global | Tech-Powered B2B Demand Generation Engine',
    description: "Learn about TaRaj Global's company heritage, leadership team, and mission. We combine in-house verification tools, custom CRM pipeline delivery, and account outreach across US, EMEA & APAC.",
    h1: 'About TaRaj Global',
  },
  '/about': {
    title: 'About TaRaj Global | Tech-Powered B2B Demand Generation Engine',
    description: "Learn about TaRaj Global's company heritage, leadership team, and mission. We combine in-house verification tools, custom CRM pipeline delivery, and account outreach across US, EMEA & APAC.",
    h1: 'About TaRaj Global',
  },
  '/services': {
    title: 'Strategic Data-Driven B2B Services | TaRaj Global',
    description: "Discover TaRaj Global's data-driven B2B services: Lead Generation, Channels & Programs, Demand & ABM/ABX, and Data Operations across US, EMEA, and APAC markets.",
    h1: 'Strategic Data-Driven B2B Services',
  },
  '/contact': {
    title: 'Contact TaRaj Global | Book a B2B Strategy Call',
    description: 'Talk to TaRaj Global about B2B appointment setting, lead generation, content syndication, and ABM. Book a strategy call or send us a message.',
    h1: 'Contact TaRaj Global',
  },
  '/blog': {
    title: 'B2B Marketing & Demand Generation Blog | Insights & Strategies | Taraj Global',
    description: 'Explore actionable B2B marketing insights, sales qualification strategies, ABM frameworks, and lead generation trends to scale your enterprise sales pipeline.',
    h1: 'B2B Marketing & Demand Generation Blog',
  },
  '/careers': {
    title: 'TaRaj Global Careers | B2B Sales & Marketing Jobs in Pune',
    description: 'Join TaRaj Global in Kharadi, Pune. Explore B2B sales development, demand generation and MarTech roles with fast promotion and uncapped incentives.',
    h1: 'Careers at TaRaj Global',
  },
  '/sql-services': {
    title: 'SQL Lead Generation Services | Tech-Powered Sales Qualified Leads | TaRaj Global',
    description: 'Fill AE calendars with verified Sales Qualified Leads across US, EMEA, and APAC. TaRaj Global delivers sales-ready decision-makers verified via in-house tooling and a 99.8% Data Accuracy SLA.',
    h1: 'Sales Qualified Leads (SQL) Services',
  },
  '/mql-services': {
    title: 'B2B MQL Lead Generation Services | TaRaj Global',
    description: 'Get verified Marketing Qualified Leads (MQLs) scored by AI against your ICP and routed straight into your CRM across US, EMEA, and APAC',
    h1: 'Marketing Qualified Leads (MQL) Services',
  },
  '/hql-services': {
    title: 'High-Quality Leads (HQL) Services | Taraj Global',
    description: "Accelerate your B2B sales pipeline with Taraj Global's High-Quality Leads (HQL) services. Verified decision-makers, custom discovery screening, 100% human-verified data, and guaranteed CPL delivery.",
    h1: 'High-Quality Leads (HQL) Services',
  },
  '/bant-lead-generation': {
    title: 'BANT Lead Generation Services | Tech-Powered B2B Qualification | TaRaj Global',
    description: 'Accelerate enterprise B2B deal velocity across US, EMEA, and APAC. TaRaj Global delivers BANT-qualified decision-makers verified via custom in-house tooling and 99.8% Data Accuracy SLA',
    h1: 'BANT Lead Generation Services',
  },
  '/b2b-appointment-setting': {
    title: 'B2B Appointment Setting Services | Verified Decision-Maker Meetings | TaRaj Global',
    description: 'Book qualified discovery meetings with verified decision-makers across US, EMEA, and APAC. TaRaj Global combines SDR expertise, AI-assisted intent signals, and a 99.8% Data Accuracy SLA.',
    h1: 'B2B Appointment Setting Services',
  },
  '/b2b-email-marketing': {
    title: 'B2B Email Marketing Services | AI-Enhanced Verified-Data Email Outreach | TaRaj Global',
    description: 'Reach verified decision-makers across US, EMEA, and APAC with AI-enhanced B2B email outreach, custom deliverability engines, and a 99.8% Data Accuracy SLA.',
    h1: 'B2B Email Marketing Services',
  },
  '/abm': {
    title: 'Account-Based Marketing (ABM) Services | Tech-Powered Enterprise Account Engagement | TaRaj Global',
    description: 'Engage high-value target accounts and full buying committees across US, EMEA, and APAC. TaRaj Global combines AI-assisted account scoring, intent telemetry, and a 99.8% Data Accuracy SLA.',
    h1: 'Account-Based Marketing (ABM) Services',
  },
  '/content-syndication': {
    title: 'B2B Content Syndication Services | Verified Opt-In Leads on Guaranteed CPL | TaRaj Global',
    description: 'Syndicate whitepapers and research to verified decision-makers across US, EMEA, and APAC. TaRaj Global delivers opt-in, ICP-matched leads on guaranteed CPL with a 99.8% Data Accuracy SLA.',
    h1: 'B2B Content Syndication Services',
  },
  '/demand-generation': {
    title: 'B2B Demand Generation Services | Demand Generation Agency | Taraj Global',
    description: 'Taraj Global provides B2B demand generation services that help technology and SaaS companies reach target audiences, engage decision-makers, generate qualified leads, and build stronger sales pipelines.',
    h1: 'B2B Demand Generation Services',
  },
  '/full-funnel-demand': {
    title: 'B2B Demand Generation Services | Tech-Powered Sales-Ready Pipeline | TaRaj Global',
    description: 'Build verified, sales-ready B2B pipeline across US, EMEA, and APAC. TaRaj Global combines AI-assisted intent scoring, multi-channel campaigns, and a 99.8% Data Accuracy SLA.',
    h1: 'Full Funnel Demand Generation Services',
  },
  '/account-based-experience': {
    title: 'Account-Based Experience (ABX) Services | Tech-Powered Unified Buyer Journeys | TaRaj Global',
    description: 'Orchestrate one consistent, personalized journey for every enterprise buying committee across US, EMEA, and APAC. TaRaj Global combines AI-assisted intent signals, verified stakeholder data, and a 99.8% Data Accuracy SLA.',
    h1: 'Account Based Experience (ABX) Services',
  },
  '/webinar-services': {
    title: 'B2B Webinar Services | Verified Registrations & Attendee-Qualified Pipeline | TaRaj Global',
    description: 'Fill B2B webinars with verified decision-makers and turn live engagement into sales-ready pipeline across US, EMEA, and APAC. TaRaj Global combines targeted promotion, attendee intelligence, and a 99.8% Data Accuracy SLA.',
    h1: 'B2B Webinar Services',
  },
  '/lead-nurturing': {
    title: 'B2B Lead Nurturing Services | Tech-Powered Lead Engagement & Reactivation | TaRaj Global',
    description: 'Re-engage and develop B2B leads into sales-ready opportunities across US, EMEA, and APAC. TaRaj Global combines behavioral scoring, AI-assisted intent signals, and a 99.8% Data Accuracy SLA.',
    h1: 'B2B Lead Nurturing Services',
  },
  '/b2b-list-building': {
    title: 'Custom B2B List Building Services | Verified Prospect Data, Built to Your ICP | TaRaj Global',
    description: 'Get custom-built B2B prospect lists matched to your ICP across US, EMEA, and APAC. Human-led research, AI-assisted verification, and a 99.8% Data Accuracy SLA, delivered CRM-ready.',
    h1: 'B2B List Building Services',
  },
  '/database-cleansing': {
    title: 'B2B Database Cleansing Services | Taraj Global',
    description: 'Scrub, deduplicate, verify, and enrich your stale CRM databases. Boost email deliverability, protect sender score, and empower sales with accurate contact data.',
    h1: 'B2B Database Cleansing Services',
  },
  '/demandflow-bridge': {
    title: 'DemandFlow Bridge | Unified Business Operations Platform | Taraj Global',
    description: "Discover DemandFlow Bridge, Taraj Global's unified business operations platform connecting CRM, lead management, sales, client management, HRMS, payroll and operations.",
    h1: 'DemandFlow Bridge',
    image: `${SITE_URL}/demandflow-admin.png`,
  },
  '/privacy': {
    title: 'Privacy Policy | Data Protection & Compliance | Taraj Global',
    description: 'Learn how Taraj Global collects, processes, and protects your personal data. Read our comprehensive Privacy Policy covering GDPR, CCPA, and enterprise B2B compliance.',
    h1: 'Privacy Policy',
  },
  '/terms': {
    title: 'Terms of Service | Service Agreement | Taraj Global',
    description: "Read the complete Terms of Service governing the use of Taraj Global's website, B2B demand generation, lead qualification, and digital solutions.",
    h1: 'Terms of Service',
  },
  '/cookies': {
    title: 'Cookie Policy | Tracking Technologies & Consent | Taraj Global',
    description: "Learn about the cookies and tracking technologies used on Taraj Global's website. Manage your cookie consent preferences and privacy settings.",
    h1: 'Cookie Policy',
  },
  '/sitemap': {
    title: 'HTML Sitemap | Complete Site Directory & Services | Taraj Global',
    description: 'Explore the complete Taraj Global website directory. Access all B2B demand generation services, lead qualification solutions, company pages, and XML sitemap.',
    h1: 'HTML Sitemap - Taraj Global',
  },
}
