import React, { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowUpRight,
  Search,
  Target,
  ShieldCheck,
  CheckCircle2,
  Award,
  CalendarCheck,
  Mail,
  Compass,
  FileSpreadsheet,
  Video,
  TrendingUp,
  Zap,
  Users,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const ALL_SERVICES = [
  {
    id: 'sql',
    num: '01',
    title: 'Sales Qualified Leads (SQL)',
    subtitle: 'Sales Qualified Lead Generation',
    desc: 'High-intent prospects with validated commercial challenges and confirmed exploratory sales meetings.',
    link: '/sql-services',
    tag: 'HIGH INTENT',
    category: 'leads',
    icon: Target,
    color: '#00A6FF',
    featured: true,
    deliverables: ['Verified ICP Match', 'Direct Buying Authority', 'Commercial Intent Validated'],
  },
  {
    id: 'bant',
    num: '02',
    title: 'BANT Lead Generation',
    subtitle: 'Buyer qualification based on intent',
    desc: 'Deep multi-tier qualification scoring prospects strictly against Budget, Authority, Need, and Timeline.',
    link: '/bant-lead-generation',
    tag: 'QUALIFICATION',
    category: 'leads',
    icon: ShieldCheck,
    color: '#FFA600',
    deliverables: ['Budget Allocation Scored', 'Decision-Maker Identified', 'Active Buying Timeline'],
  },
  {
    id: 'mql',
    num: '03',
    title: 'Marketing Qualified Leads (MQL)',
    subtitle: 'Marketing Qualified Leads',
    desc: 'Engaged accounts actively interacting with high-value technical assets, case studies, and brand touchpoints.',
    link: '/mql-services',
    tag: 'MID-FUNNEL',
    category: 'leads',
    icon: CheckCircle2,
    color: '#38BDF8',
    deliverables: ['Asset Engagement Telemetry', 'Account Lead Scoring', 'Seamless CRM Sync'],
  },
  {
    id: 'hql',
    num: '04',
    title: 'High-Quality Leads (HQL)',
    subtitle: 'High-Quality Leads with verified intent',
    desc: 'Hyper-vetted leads combining intent telemetry, firmographic criteria, and direct telephone confirmation.',
    link: '/hql-services',
    tag: 'VERIFIED',
    category: 'leads',
    icon: Award,
    color: '#34D399',
    deliverables: ['Human Phone Confirmed', 'Custom Filter Criteria', 'Guaranteed SLA Delivery'],
  },
  {
    id: 'appointments',
    num: '05',
    title: 'B2B Appointment Setting',
    subtitle: 'Connect with decision-makers',
    desc: 'Confirmed, qualified sales discovery meetings booked directly into your account executives’ calendars.',
    link: '/b2b-appointment-setting',
    tag: 'SALES-READY',
    category: 'outbound',
    icon: CalendarCheck,
    color: '#FF6D00',
    featured: true,
    deliverables: ['Direct Calendar Placement', 'Pre-Call Account Dossier', 'Zero No-Show Guarantee'],
  },
  {
    id: 'email',
    num: '06',
    title: 'B2B Email Marketing',
    subtitle: 'Targeted outbound engagement',
    desc: 'Hyper-personalized outbound sequences with advanced deliverability infrastructure and persuasive copywriting.',
    link: '/b2b-email-marketing',
    tag: 'OUTBOUND',
    category: 'outbound',
    icon: Mail,
    color: '#60A5FA',
    deliverables: ['Domain Warmup & DMARC', 'Custom Copywriting', 'Real-Time Positive Reply Routing'],
  },
  {
    id: 'abm',
    num: '07',
    title: 'Account-Based Marketing (ABM)',
    subtitle: 'Account-based strategic growth',
    desc: 'Full-funnel bespoke marketing programs tailored directly to tier-1 enterprise target accounts.',
    link: '/abm',
    tag: 'STRATEGIC',
    category: 'outbound',
    icon: Compass,
    color: '#A78BFA',
    featured: true,
    deliverables: ['Target Account Selection', 'Buying Committee Mapping', 'Multi-Channel Air Cover'],
  },
  {
    id: 'demand',
    num: '08',
    title: 'Demand Generation',
    subtitle: 'Build predictable revenue pipeline',
    desc: 'End-to-end demand engine creating sustainable pipeline velocity across every touchpoint of buyer journey.',
    link: '/demand-generation',
    tag: 'FULL-FUNNEL',
    category: 'demand',
    icon: Zap,
    color: '#F43F5E',
    featured: true,
    deliverables: ['Predictable Pipeline Gen', 'Omnichannel Inbound & Outbound', 'Attribution & Velocity Tracking'],
  },
  {
    id: 'syndication',
    num: '09',
    title: 'Content Syndication',
    subtitle: 'Reach high-intent audiences',
    desc: 'Distribute whitepapers, reports, and buyer guides directly to qualified decision-makers across partner networks.',
    link: '/content-syndication',
    tag: 'TOP-FUNNEL',
    category: 'demand',
    icon: FileSpreadsheet,
    color: '#F59E0B',
    deliverables: ['Targeted Asset Syndication', 'Cost-Per-Lead Models', 'Opt-in Consent Assured'],
  },
  {
    id: 'webinars',
    num: '10',
    title: 'B2B Webinar Services',
    subtitle: 'Build engagement and authority',
    desc: 'Turnkey webinar attendee acquisition, registration qualification, and post-event attendee pipeline conversion.',
    link: '/webinar-services',
    tag: 'ENGAGEMENT',
    category: 'demand',
    icon: Video,
    color: '#EC4899',
    deliverables: ['Targeted Registrations', 'Live Attendee Gating', 'Rapid Post-Event Followup'],
  },
  {
    id: 'nurturing',
    num: '11',
    title: 'Lead Nurturing Services',
    subtitle: 'Move prospects toward conversion',
    desc: 'Systematic multi-touch workflows that re-engage stale prospects and warm cold leads until purchase readiness.',
    link: '/lead-nurturing',
    tag: 'PIPELINE',
    category: 'data',
    icon: TrendingUp,
    color: '#10B981',
    deliverables: ['Automated Lead Cadences', 'Intent Trigger Scoring', 'Re-Activation Campaigns'],
  },
  {
    id: 'list-building',
    num: '12',
    title: 'B2B List Building Services',
    subtitle: 'Build accurate prospect lists',
    desc: 'Bespoke contact discovery tailored specifically to your ideal customer profile with direct phone and email records.',
    link: '/b2b-list-building',
    tag: 'DATA',
    category: 'data',
    icon: Users,
    color: '#06B6D4',
    deliverables: ['100% Bespoke Data Mining', 'Verified Direct Dials', 'Custom Technographic Filters'],
  },
  {
    id: 'cleansing',
    num: '13',
    title: 'Database Cleansing & Enrichment',
    subtitle: 'Clean and enrich your database',
    desc: 'Revitalize and enrich outdated CRM records, remove decay, and restore email deliverability with verified data.',
    link: '/database-cleansing',
    tag: 'DATA OPS',
    category: 'data',
    icon: RefreshCw,
    color: '#8B5CF6',
    deliverables: ['99.8% Hygiene SLA', 'Record Deduplication', 'Missing Field Enrichment'],
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Services', count: 13 },
  { id: 'leads', label: 'Lead Gen & SQL', count: 4 },
  { id: 'outbound', label: 'Outbound & ABM', count: 3 },
  { id: 'demand', label: 'Demand & Content', count: 3 },
  { id: 'data', label: 'Data Operations', count: 3 },
]

export default function InteractiveServiceGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 })

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((srv) => {
      const matchesCat = activeCategory === 'all' || srv.category === activeCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        srv.title.toLowerCase().includes(q) ||
        srv.subtitle.toLowerCase().includes(q) ||
        srv.desc.toLowerCase().includes(q) ||
        srv.tag.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section
      id="services-grid"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark ? '#020306' : '#f8fafd',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Explore Our 13 B2B Services"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ══ SECTION HEADER ══ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4"
              style={{
                background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                color: isDark ? '#38BDF8' : '#0066CC',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>THE COMPLETE B2B SUITE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Explore Our{' '}
              <span
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 50%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0066CC 0%, #0284C7 50%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                13 Growth Services
              </span>
            </motion.h2>
          </div>

          {/* Search Box with Glowing Neon Accent */}
          <div className="w-full lg:w-80 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#64748B' : '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search services or capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm transition-all duration-300 outline-none backdrop-blur-md"
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.95)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                color: isDark ? '#FFFFFF' : '#0F172A',
                boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 102, 204, 0.05)',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold px-2 py-1 rounded-md cursor-pointer"
                style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* ══ CATEGORY FILTER PILLS ══ */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 sm:mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer select-none"
                style={{
                  background: isActive
                    ? isDark ? 'linear-gradient(135deg, #00A6FF, #0284C7)' : 'linear-gradient(135deg, #0088FF, #0066CC)'
                    : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                  color: isActive ? '#FFFFFF' : isDark ? '#94A3B8' : '#475569',
                  border: isActive
                    ? '1px solid rgba(56, 189, 248, 0.5)'
                    : isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isActive ? '0 6px 25px rgba(0, 166, 255, 0.4)' : 'none',
                }}
              >
                <span>{cat.label}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: isActive ? 'rgba(0, 0, 0, 0.25)' : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ══ 13 ASYMMETRIC LUXURY BENTO CARDS ══ */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence>
            {filteredServices.map((srv, idx) => {
              const Icon = srv.icon
              return (
                <motion.div
                  layout
                  key={srv.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.025 * idx, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(8, 12, 24, 0.92) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: isDark
                      ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                      : '0 20px 45px -15px rgba(0, 102, 204, 0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = srv.color
                    e.currentTarget.style.boxShadow = isDark
                      ? `0 25px 60px -15px ${srv.color}35, 0 0 30px ${srv.color}15`
                      : `0 25px 60px -15px ${srv.color}25`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                    e.currentTarget.style.boxShadow = isDark
                      ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                      : '0 20px 45px -15px rgba(0, 102, 204, 0.06)'
                  }}
                >
                  {/* Top Glowing Beam */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[3px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, ${srv.color}, transparent)` }}
                  />

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: isDark ? `${srv.color}18` : `${srv.color}15`,
                          color: srv.color,
                          border: `1px solid ${srv.color}35`,
                          boxShadow: `0 0 15px ${srv.color}20`,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                          style={{
                            background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                            color: srv.color,
                            border: `1px solid ${srv.color}35`,
                          }}
                        >
                          {srv.tag}
                        </span>
                        <span className="font-mono text-xs font-bold" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                          #{srv.num}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-2 tracking-tight transition-colors duration-200"
                      style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                    >
                      {srv.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                      {srv.desc}
                    </p>

                    {/* Deliverable Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {srv.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                          style={{
                            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                            color: isDark ? '#CBD5E1' : '#475569',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Redesigned Attractive Button to Link */}
                  <Link
                    to={srv.link}
                    className="pt-4 border-t flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                      color: srv.color,
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Explore Capability</span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45"
                      style={{
                        background: isDark ? `${srv.color}20` : `${srv.color}15`,
                        color: srv.color,
                        border: `1px solid ${srv.color}40`,
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 rounded-3xl" style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
            <p className="text-base font-medium mb-4" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              No services found matching "{searchQuery}"
            </p>
            <CyberButton
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              variant="primary"
              size="sm"
            >
              Reset Filters
            </CyberButton>
          </div>
        )}

      </div>
    </section>
  )
}
