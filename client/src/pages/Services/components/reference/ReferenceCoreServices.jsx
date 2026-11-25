import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Target, Zap, Database, Layers, Mail } from 'lucide-react'
import { SERVICES_MENU_DATA } from '@/constants/siteNavigation'

const ICON_LOOKUP = {
  Target,
  Layers,
  Mail,
  Database,
  Zap,
}

const SERVICE_META = {
  '/mql-services': {
    line1: 'MQL',
    line2: 'Services',
    tag: 'Marketing Qualified',
    image: '/mql.png',
  },
  '/hql-services': {
    line1: 'HQL',
    line2: 'Services',
    tag: 'High-Quality Leads',
    image: '/hql.png',
  },
  '/bant-lead-generation': {
    line1: 'BANT',
    line2: 'Services',
    tag: 'Budget & Authority',
    image: '/bant.png',
  },
  '/sql-services': {
    line1: 'SQL',
    line2: 'Services',
    tag: 'Sales Qualified',
    image: '/sql-lead-qualification-journey.jpg',
  },
  '/b2b-appointment-setting': {
    line1: 'Appointment',
    line2: 'Generation',
    tag: 'Confirmed Meetings',
    image: '/appointment-setting.png',
  },
  '/full-funnel-demand': {
    line1: 'Full Funnel',
    line2: 'Demand',
    tag: 'End-to-End Pipeline',
    image: '/demandflow-tracking.png',
  },
  '/abm': {
    line1: 'Account-Based',
    line2: 'Marketing',
    tag: 'Target Accounts',
    image: '/abm.avif',
  },
  '/account-based-experience': {
    line1: 'Account Based',
    line2: 'Experience',
    tag: 'Omnichannel ABX',
    image: '/demandflow-personalization.png',
  },
  '/lead-nurturing': {
    line1: 'Lead',
    line2: 'Nurturing',
    tag: 'Multi-Stage Cadences',
    image: '/lead%20nurturing.png',
  },
  '/b2b-email-marketing': {
    line1: 'Email',
    line2: 'Marketing',
    tag: 'Outbound Outreach',
    image: '/email-service.jpg',
  },
  '/content-syndication': {
    line1: 'Content',
    line2: 'Syndication',
    tag: 'Whitepaper Reach',
    image: '/content%20syndication.png',
  },
  '/webinar-services': {
    line1: 'Webinar',
    line2: 'Services',
    tag: 'Audience Acquisition',
    image: '/webinar.png',
  },
  '/b2b-list-building': {
    line1: 'B2B List',
    line2: 'Building',
    tag: 'Custom ICP Contacts',
    image: '/b2b-list-building.png',
  },
  '/database-cleansing': {
    line1: 'Database',
    line2: 'Cleansing',
    tag: 'Verification & Hygiene',
    image: '/database%20cleansing.png',
  },
  '/demandflow-bridge': {
    line1: 'DemandFlow',
    line2: 'Bridge',
    tag: 'Middleware Integration',
    image: '/demandflow-personalization.png',
  },
  'https://tgstechinfo.com/': {
    line1: 'TGS Tech',
    line2: 'Info',
    tag: 'Tech Media Hub',
    image: '/saas-audience.jpg',
  },
}

// Dynamically derived from single-source-of-truth SERVICES_MENU_DATA to always stay perfectly in sync
const PILLARS = SERVICES_MENU_DATA.map((cat, pIdx) => {
  const id = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return {
    id,
    num: String(pIdx + 1).padStart(2, '0'),
    heading: cat.title,
    tagline: cat.desc,
    icon: ICON_LOOKUP[cat.iconType] || Target,
    accent: cat.accent,
    services: cat.items.map((item, sIdx) => {
      const meta = SERVICE_META[item.path] || {}
      const words = item.name.trim().split(/\s+/)
      const defaultLine1 = words[0] || item.name
      const defaultLine2 = words.slice(1).join(' ') || ''

      return {
        num: String(sIdx + 1).padStart(2, '0'),
        line1: meta.line1 || defaultLine1,
        line2: meta.line2 || defaultLine2,
        route: item.path,
        tag: meta.tag || item.desc || 'Specialized Service',
        image: meta.image || '/services.png',
        isExternal: Boolean(item.isExternal || item.path?.startsWith('http')),
      }
    }),
  }
})

export default function ReferenceCoreServices() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState(PILLARS[0]?.id || 'services')

  const filteredPillars = PILLARS.filter((p) => p.id === activeFilter)

  const handleCardClick = (card) => {
    if (card.isExternal || card.route.startsWith('http')) {
      window.open(card.route, '_blank', 'noopener,noreferrer')
    } else {
      navigate(card.route)
    }
  }

  return (
    <section
      id="core-services-section"
      className="relative py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-text-primary dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header Card */}
        <div className="relative rounded-3xl border border-slate-800/80 dark:border-white/10 bg-[#0B0F17] p-8 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden mb-12">
          {/* Ambient background glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top accent glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF]/60 to-transparent pointer-events-none" />

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/25 mb-5 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
            <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              OUR CORE SERVICES • FULL-FUNNEL ARCHITECTURE
            </span>
          </div>

          {/* Title & Description Grid */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.15]">
              Solutions Built Around <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Your Growth Goals
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal lg:max-w-md lg:pb-1">
              Structured into four strategic pillars: Services, Program, Channels & Data Solution, and Products & Publications to engineer predictable pipeline velocity for enterprise B2B teams.
            </p>
          </div>
        </div>

        {/* ══════════ PILLAR FILTER PILLS ══════════ */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-12">
          {PILLARS.map((pillar) => {
            const isActive = activeFilter === pillar.id
            const Icon = pillar.icon

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveFilter(pillar.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${isActive
                  ? 'bg-[#FF6D00] text-black shadow-md shadow-[#FF6D00]/25'
                  : 'border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:border-[#FF6D00] hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pillar.heading}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60'
                  }`}>
                  {pillar.services.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* ══════════ PILLAR GROUPS (CARDS FORMAT) ══════════ */}
        <div className="space-y-16">
          {filteredPillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <div key={pillar.id} className="relative">
                {/* ── Pillar Heading Banner ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-slate-200 dark:border-white/10 gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6D00]/10 border border-[#FF6D00]/30 flex items-center justify-center text-[#FF6D00]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#FF6D00]">
                          PILLAR {pillar.num}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
                        <span className="text-xs font-mono text-slate-500 dark:text-white/50">
                          {pillar.services.length} Specialized Services
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-text-primary dark:text-white">
                        {pillar.heading}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-white/55 max-w-md sm:text-right font-normal">
                    {pillar.tagline}
                  </p>
                </div>

                {/* ── Services Grid for this Pillar ── */}
                <div className={`grid gap-4 ${pillar.services.length <= 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
                  : pillar.services.length === 3
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl'
                    : pillar.services.length === 4
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-6xl'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                  }`}>
                  {pillar.services.map((card, idx) => {
                    const isExternal = card.isExternal || card.route.startsWith('http')

                    return (
                      <motion.div
                        key={card.route + idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        onClick={() => handleCardClick(card)}
                        className="group relative rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0B0F17]/80 hover:bg-slate-50 dark:hover:bg-surface dark:bg-[#0E141F] hover:border-[#FF6D00] dark:hover:border-[#FF6D00] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-md shadow-slate-200/50 dark:shadow-xl overflow-hidden min-h-[320px]"
                      >
                        {/* Top: Number & Tag */}
                        <div className="relative z-10 flex items-center justify-between gap-1">
                          <span className="font-mono text-xs font-black text-text-secondary dark:text-slate-400 dark:text-white/40 group-hover:text-[#FF6D00] transition-colors">
                            {card.num}
                          </span>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200/60 dark:border-white/5 truncate max-w-[120px]">
                            {card.tag}
                          </span>
                        </div>

                        {/* Title (2 lines) */}
                        <div className="relative z-10 my-3">
                          <h4 className="text-sm sm:text-base font-black uppercase text-slate-900 dark:text-text-primary dark:text-white tracking-tight leading-tight group-hover:text-[#FF6D00] transition-colors">
                            <div>{card.line1}</div>
                            <div>{card.line2}</div>
                          </h4>
                        </div>

                        {/* Lower Portion: Visual Artwork */}
                        <div className="relative w-full h-32 rounded-xl overflow-hidden mt-auto border border-slate-200/80 dark:border-white/5 bg-background dark:bg-slate-950">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                            style={{ backgroundImage: `url(${card.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-[#0B0F17] dark:via-[#0B0F17]/40 dark:to-transparent" />

                          {/* Bottom Circular Arrow Icon */}
                          <div className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full border border-border dark:border-white/30 bg-background dark:bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:border-[#FF6D00] group-hover:bg-[#FF6D00] transition-all">
                            {isExternal ? (
                              <ArrowUpRight className="w-3.5 h-3.5 text-text-primary dark:text-white group-hover:text-black transition-colors" />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-text-primary dark:text-white group-hover:text-black transition-colors" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
