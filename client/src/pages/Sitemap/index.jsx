import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  ExternalLink,
  Layers,
  Target,
  Sparkles,
  ShieldCheck,
  Search,
  Database,
  Mail,
  Calendar,
  Building,
  ArrowRight,
  Code2,
  CheckCircle2
} from 'lucide-react'
import SEO from '@components/common/SEO'
import { useReducedMotion } from '@hooks/useReducedMotion'

const SITEMAP_SECTIONS = [
  {
    title: 'Primary Pages',
    desc: 'Core corporate and company discovery destinations.',
    icon: Building,
    color: '#00A6FF',
    links: [
      { name: 'Home', path: '/', desc: 'Predictable B2B pipeline generation homepage.' },
      { name: 'Who We Are', path: '/about', desc: 'Our mission, leadership, and company pedigree.' },
      { name: 'Services Overview', path: '/services', desc: 'Complete directory of B2B revenue and demand solutions.' },
      { name: 'Blog & Insights', path: '/blog', desc: 'Actionable B2B playbooks, guides, and strategy research.' },
      { name: 'Careers', path: '/careers', desc: 'Open roles and life at Taraj Global Solutions.' },
      { name: 'Contact Us', path: '/contact', desc: 'Book a strategy discovery session or message our team.' },
    ],
  },
  {
    title: 'Lead Generation & Qualification',
    desc: 'Bespoke intent verification and lead qualification tiers.',
    icon: Target,
    color: '#10B981',
    links: [
      { name: 'Sales Qualified Leads (SQL)', path: '/sql-services', desc: 'Sales-ready opportunities matched with active intent.' },
      { name: 'High-Quality Leads (HQL)', path: '/hql-services', desc: 'Verified intent and confirmed stakeholder interest.' },
      { name: 'BANT Lead Generation', path: '/bant-lead-generation', desc: 'Validated for Budget, Authority, Need, and Timeline.' },
      { name: 'Marketing Qualified Leads (MQL)', path: '/mql-services', desc: 'High-volume target account engagement programs.' },
      { name: 'B2B Appointment Setting', path: '/b2b-appointment-setting', desc: 'Direct confirmed meetings on sales calendars.' },
    ],
  },
  {
    title: 'Demand Generation & ABM',
    desc: 'Multi-channel account penetration and audience cultivation.',
    icon: Layers,
    color: '#FF6D00',
    links: [
      { name: 'Account-Based Marketing (ABM)', path: '/abm', desc: 'Targeted multi-tier key account penetration.' },
      { name: 'Full-Funnel Demand Generation', path: '/demand-generation', desc: 'Holistic pipeline velocity and multi-touch outbound.' },
      { name: 'Content Syndication', path: '/content-syndication', desc: 'Whitepaper distribution to verified buying committees.' },
      { name: 'B2B Email Marketing', path: '/b2b-email-marketing', desc: 'Precision outbound and multi-touch nurture cadences.' },
      { name: 'Lead Nurturing', path: '/lead-nurturing', desc: 'Multi-stage account engagement cadences.' },
      { name: 'Webinar Services', path: '/webinar-services', desc: 'Qualified executive webinar attendance acquisition.' },
    ],
  },
  {
    title: 'Data Intelligence & Architecture',
    desc: 'Human-verified contact research and CRM hygiene.',
    icon: Database,
    color: '#8B5CF6',
    links: [
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Custom human-verified decision-maker lists with 99.8% SLA.' },
      { name: 'Database Cleansing', path: '/database-cleansing', desc: 'Deduplication, data hygiene, and CRM contact enrichment.' },
      { name: 'DemandFlow Bridge', path: '/demandflow-bridge', desc: 'Automated CRM pipeline integration platform.' },
    ],
  },
  {
    title: 'Legal, Privacy & Compliance',
    desc: 'Governance, policies, and regulatory disclosures.',
    icon: ShieldCheck,
    color: '#F59E0B',
    links: [
      { name: 'Privacy Policy', path: '/privacy', desc: 'Global data protection standards, GDPR, and CCPA notice.' },
      { name: 'Terms of Service', path: '/terms', desc: 'Terms and conditions for client engagements and site use.' },
      { name: 'Cookie Policy', path: '/cookies', desc: 'Cookie categories, tracking consent, and browser settings.' },
    ],
  },
]

const sitemapSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HTML Sitemap | Taraj Global',
  url: 'https://tarajglobal.com/sitemap',
  description: 'Complete directory of all pages, B2B lead generation services, legal policies, and XML sitemaps for Taraj Global.',
}

export default function Sitemap() {
  const reducedMotion = useReducedMotion()
  const [search, setSearch] = useState('')

  const filteredSections = SITEMAP_SECTIONS.map((section) => ({
    ...section,
    links: section.links.filter(
      (link) =>
        link.name.toLowerCase().includes(search.toLowerCase()) ||
        link.desc.toLowerCase().includes(search.toLowerCase()) ||
        link.path.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((section) => section.links.length > 0)

  return (
    <>
      <SEO
        title="HTML Sitemap | Complete Site Directory & Services | Taraj Global"
        description="Explore the complete Taraj Global website directory. Access all B2B demand generation services, lead qualification solutions, company pages, and XML sitemap."
        keywords="Taraj Global sitemap, B2B services directory, demand generation site index, B2B lead generation pages, Taraj Global XML sitemap"
        canonical="/sitemap"
        schemaJson={sitemapSchema}
      />

      <div className="min-h-screen bg-background text-text-primary transition-colors duration-300 pb-20 pt-10 sm:pt-14">
        
        {/* ── HEADER BANNER ────────────────────────────────────────── */}
        <div className="relative max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
              <span>SITE DIRECTORY &amp; NAVIGATION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.08] text-text-primary">
              HTML <span className="text-primary">Sitemap</span>.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Browse the complete architectural map of Taraj Global. Find all core solutions, corporate pages, verified lead qualification tiers, and technical crawler feeds.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-surface/70 backdrop-blur-md">
            
            {/* Search Filter */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages or services..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Direct Link to XML Sitemap */}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary text-xs sm:text-sm font-semibold text-text-primary transition-all duration-200"
            >
              <Code2 size={15} className="text-primary" />
              <span>View XML Sitemap (For Crawlers)</span>
              <ExternalLink size={13} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── SITEMAP CATEGORIES GRID ──────────────────────────────── */}
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="space-y-12 sm:space-y-16">
            {filteredSections.map((section, sIdx) => {
              const Icon = section.icon

              return (
                <motion.div
                  key={section.title}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: sIdx * 0.08 }}
                  className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8 lg:p-10"
                >
                  {/* Category Title Bar */}
                  <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-border/60">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: `${section.color}40`,
                        backgroundColor: `${section.color}15`,
                        color: section.color,
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                        {section.desc}
                      </p>
                    </div>
                  </div>

                  {/* Links Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="group relative flex flex-col justify-between p-4 rounded-xl border border-border/80 bg-background/80 hover:bg-background hover:border-primary/40 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40 transition-all duration-200"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-semibold text-sm sm:text-[15px] text-text-primary group-hover:text-primary transition-colors">
                              {link.name}
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-200 shrink-0"
                            />
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                            {link.desc}
                          </p>
                        </div>

                        <span className="mt-3 font-mono text-[11px] text-text-muted group-hover:text-primary transition-colors">
                          {link.path}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            })}

            {filteredSections.length === 0 && (
              <div className="p-12 text-center rounded-2xl border border-border bg-surface text-text-secondary">
                <p className="text-base font-semibold">No pages match "{search}".</p>
                <button
                  onClick={() => setSearch('')}
                  className="mt-3 text-xs text-primary hover:underline cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>

          {/* ── BOTTOM CRAWLER INFO CARD ──────────────────────────── */}
          <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-border/80 bg-surface/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-success uppercase tracking-wider">
                <CheckCircle2 size={14} />
                <span>XML Sitemaps Live &amp; Configured</span>
              </div>
              <p className="text-sm text-text-secondary">
                Our dynamic XML sitemap updates automatically whenever new blog articles or service landing pages are published.
              </p>
            </div>
            <a
              href="/sitemap.xml"
              className="shrink-0 px-4 py-2 rounded-xl border border-border bg-background hover:border-primary text-xs font-mono font-semibold text-text-primary transition-colors"
            >
              https://tarajglobal.com/sitemap.xml
            </a>
          </div>

        </div>

      </div>
    </>
  )
}
