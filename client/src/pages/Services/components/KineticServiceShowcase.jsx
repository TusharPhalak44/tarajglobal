import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search, Target, ShieldCheck, Mail, Compass, Database, CheckCircle2, Layers, Zap, Calendar, Award, Sparkles } from 'lucide-react'

const SERVICES_DATA = [
  {
    id: 'sql',
    name: 'Sales Qualified Leads (SQL)',
    category: 'leads',
    categoryLabel: 'SALES-READY PIPELINE',
    route: '/sql-services',
    desc: 'Connect with verified decision-makers who have an active commercial need, confirmed budget, and near-term buying timeline ready for discovery calls.',
    deliverables: ['Confirmed Calendar Meetings', 'Pre-Call Buyer Dossier', 'No-Show Replacement Guarantee'],
    metric: '98% Show Rate',
    icon: Target,
  },
  {
    id: 'bant',
    name: 'BANT Lead Generation',
    category: 'leads',
    categoryLabel: 'STRICT QUALIFICATION',
    route: '/bant-lead-generation',
    desc: 'Rigorous 4-point vetting across Budget, Authority, Need, and Timeline to eliminate unqualified prospects and protect AE selling time.',
    deliverables: ['100% Vetted Authority', 'Documented Fiscal Spend', 'Active Project Scope'],
    metric: 'Zero-Waste Pipeline',
    icon: ShieldCheck,
  },
  {
    id: 'mql',
    name: 'Marketing Qualified Leads (MQL)',
    category: 'demand',
    categoryLabel: 'AUDIENCE NURTURE',
    route: '/mql-services',
    desc: 'Capture and score decision-makers actively engaging with your corporate whitepapers, technical briefs, and solution research.',
    deliverables: ['Intent-Scored Engagement', 'Direct Opt-In Records', 'Automated CRM Routing'],
    metric: 'High-Affinity Buyers',
    icon: Layers,
  },
  {
    id: 'appointment',
    name: 'B2B Appointment Setting',
    category: 'outreach',
    categoryLabel: 'EXECUTIVE MEETINGS',
    route: '/b2b-appointment-setting',
    desc: 'Turnkey meeting booking engine placing confirmed discovery sessions with VPs and C-Suite officers directly onto your reps’ calendars.',
    deliverables: ['Calendar Direct Invites', 'Agenda Pre-Alignment', 'Full Meeting Recordings'],
    metric: 'Sales-Ready Velocity',
    icon: Calendar,
  },
  {
    id: 'email',
    name: 'B2B Email Marketing',
    category: 'outreach',
    categoryLabel: 'DIRECT CADENCES',
    route: '/b2b-email-marketing',
    desc: 'Deliverability-optimized 1-on-1 cold and warm outreach engineered with secondary domain warmup and humanized copywriting.',
    deliverables: ['Custom Domain Warmup', 'A/B Messaging Iteration', 'Real-Time Reply Classification'],
    metric: '42% Average Open Rate',
    icon: Mail,
  },
  {
    id: 'abm',
    name: 'Account-Based Marketing (ABM)',
    category: 'outreach',
    categoryLabel: 'STRATEGIC TIER-1',
    route: '/abm',
    desc: 'Surround named enterprise accounts with multi-threaded stakeholder outreach, bespoke collateral, and synchronized digital air cover.',
    deliverables: ['Buying Committee Mapping', 'Custom Tier-1 Decks', 'Multi-Threaded Outreach'],
    metric: '$120K+ Average ACV',
    icon: Award,
  },
  {
    id: 'syndication',
    name: 'Content Syndication',
    category: 'demand',
    categoryLabel: 'CONTENT REACH',
    route: '/content-syndication',
    desc: 'Distribute your research and thought leadership directly to verified B2B decision-makers across our authoritative network.',
    deliverables: ['100% Opt-In Verification', 'Seniority Title Gating', 'Account Telemetry Logs'],
    metric: '10M+ Reader Reach',
    icon: Compass,
  },
  {
    id: 'demand-gen',
    name: 'Demand Generation',
    category: 'demand',
    categoryLabel: 'GROWTH ENGINE',
    route: '/demand-generation',
    desc: 'Holistic revenue programs connecting multi-touch content distribution, intent tracking, and nurture workflows into predictable ARR.',
    deliverables: ['Full-Funnel Attribution', 'Multi-Touch Orchestration', 'CAC Reduction Strategy'],
    metric: '3.4x Faster Velocity',
    icon: Zap,
  },
  {
    id: 'webinars',
    name: 'B2B Webinar Services',
    category: 'demand',
    categoryLabel: 'DIGITAL EVENTS',
    route: '/webinar-services',
    desc: 'End-to-end event recruitment filling your virtual webinars and product demos with verified corporate ICP registrants.',
    deliverables: ['Guaranteed Live Attendance', 'Pre-Event Nurture Cadence', 'Post-Event MQL Handshake'],
    metric: '45%+ Live Attendance',
    icon: Sparkles,
  },
  {
    id: 'nurture',
    name: 'Lead Nurturing',
    category: 'data',
    categoryLabel: 'PIPELINE ACCELERATION',
    route: '/lead-nurturing',
    desc: 'Automated and human follow-up sequences that warm stalled pipeline and maintain consistent relationship touches until purchase readiness.',
    deliverables: ['Lifecycle Nurture Cadences', 'Intent-Triggered Follow-ups', 'Stalled Deal Revival'],
    metric: '35% Stalled Revival',
    icon: CheckCircle2,
  },
  {
    id: 'list-building',
    name: 'B2B List Building',
    category: 'data',
    categoryLabel: 'DATA FOUNDATION',
    route: '/b2b-list-building',
    desc: 'Custom-built contact repositories tailored strictly to your TAM, tech stack signals, departmental hierarchy, and geography.',
    deliverables: ['100% Custom Research', 'Dual-Layer Email Verification', 'Direct Dial Coverage'],
    metric: '99.8% Data Accuracy',
    icon: Database,
  },
  {
    id: 'cleansing',
    name: 'Database Cleansing',
    category: 'data',
    categoryLabel: 'CRM HYGIENE',
    route: '/database-cleansing',
    desc: 'Scrub obsolete contacts, eliminate bounce rates, update job transitions, and append missing phone numbers to revitalize your CRM.',
    deliverables: ['Bounce Rate Reduction', 'Job Change Updates', 'Duplicate De-Duplication'],
    metric: '< 1.5% Bounce Guarantee',
    icon: ShieldCheck,
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All 12 Services' },
  { id: 'leads', label: 'Sales-Ready Leads' },
  { id: 'outreach', label: 'Outreach & ABM' },
  { id: 'demand', label: 'Demand & Content' },
  { id: 'data', label: 'Data Infrastructure' },
]

export default function KineticServiceShowcase({ activeCategory, onCategoryChange }) {
  const [internalTab, setInternalTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const currentTab = activeCategory || internalTab

  const handleTabChange = (tabId) => {
    if (onCategoryChange) {
      onCategoryChange(tabId)
    } else {
      setInternalTab(tabId)
    }
  }

  const filteredServices = SERVICES_DATA.filter((item) => {
    const matchesTab = currentTab === 'all' || item.category === currentTab
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deliverables.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <section
      id="kinetic-services-showcase"
      className="relative py-20 lg:py-28 bg-background text-text-primary border-b border-border/70 overflow-hidden select-none"
      aria-label="12 Core B2B Services Catalog"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/70 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-primary text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>INTERACTIVE SERVICES CATALOG</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-text-primary">
              The 12 Core Growth Capabilities <br />
              <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
                Engineered For Conversion
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
            Hover any card to inspect deliverables, SLA metrics, and direct execution specifications.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          {/* Animated Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const isActive = currentTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary bg-surface/70 border border-border/80'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/25 z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, deliverables..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-border/80 bg-surface/70 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 12 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                  className="group relative rounded-2xl border border-border/80 bg-surface/60 hover:bg-surface hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted bg-surface border border-border px-2 py-0.5 rounded-md">
                          {service.categoryLabel}
                        </span>
                      </div>

                      <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                        {service.metric}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-text-primary group-hover:text-primary transition-colors duration-200 leading-snug">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                      {service.desc}
                    </p>

                    {/* Deliverable Pills */}
                    <div className="mt-5 pt-4 border-t border-border/60 space-y-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-text-primary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Route Action Link */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <Link
                      to={service.route}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-primary group-hover:text-primary transition-colors"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>

                    <span className="font-mono text-[11px] text-text-muted">
                      0{idx + 1}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
