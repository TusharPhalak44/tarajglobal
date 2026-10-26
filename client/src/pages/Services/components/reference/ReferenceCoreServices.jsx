import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Target, Zap, Database, Layers } from 'lucide-react'

const PILLARS = [
  {
    id: 'lead-generation',
    // num: '01',
    heading: 'Lead Generation',
    tagline: 'Intent-driven buyer discovery, qualification frameworks (BANT, HQL, SQL), and confirmed C-suite appointment delivery.',
    icon: Target,
    services: [
      {
        // num: '02',
        line1: 'HQL',
        line2: 'Services',
        route: '/hql-services',
        tag: 'High-Quality Leads',
        image: '/hql.png',
      },
      {
        // num: '01',
        line1: 'MQL',
        line2: 'Services',
        route: '/mql-services',
        tag: 'Marketing Qualified',
        image: '/mql.png',
      },

      {
        // num: '03',
        line1: 'BANT',
        line2: 'Services',
        route: '/bant-lead-generation',
        tag: 'Budget & Authority',
        image: '/bant.png',
      },
      {
        // num: '04',
        line1: 'SQL',
        line2: 'Services',
        route: '/sql-services',
        tag: 'Sales Qualified',
        image: '/sql-lead-qualification-journey.jpg',
      },
      {
        // num: '05',
        line1: 'Appointment',
        line2: 'Setting',
        route: '/b2b-appointment-setting',
        tag: 'Confirmed Meetings',
        image: '/appointment-setting.png',
      },
    ],
  },
  {
    id: 'demand-abm',
    // num: '02',
    heading: 'Demand & ABM',
    tagline: 'Account-Based Marketing, full-lifecycle Account-Based Experience (ABX), and full-funnel demand orchestration.',
    icon: Zap,
    services: [
      {
        // num: '01',
        line1: 'Account-Based',
        line2: 'Marketing (ABM)',
        route: '/abm',
        tag: 'Target Accounts',
        image: '/abm.avif',
      },
      {
        // num: '02',
        line1: 'Account Based',
        line2: 'Experience (ABX)',
        route: '/account-based-experience',
        tag: 'Omnichannel ABX',
        image: '/demandflow-personalization.png',
      },
      {
        // num: '03',
        line1: 'Full Funnel',
        line2: 'Demand',
        route: '/full-funnel-demand',
        tag: 'End-to-End Pipeline',
        image: '/demandflow-tracking.png',
      },

    ],
  },
  {
    id: 'channels-programs',
    // num: '03',
    heading: 'Channels & Programs',
    tagline: 'Multi-touch outbound email cadences, whitepaper content syndication, event acceleration, and continuous lead nurturing.',
    icon: Layers,
    services: [
      {
        // num: '01',
        line1: 'Email',
        line2: 'Marketing',
        route: '/b2b-email-marketing',
        tag: 'Outbound Outreach',
        image: '/email-service.jpg',
      },
      {
        // num: '02',
        line1: 'Content',
        line2: 'Syndication',
        route: '/content-syndication',
        tag: 'Whitepaper Reach',
        image: '/content%20syndication.png',
      },
      {
        // num: '03',
        line1: 'Webinar',
        line2: 'Services',
        route: '/webinar-services',
        tag: 'Audience Acquisition',
        image: '/webinar.png',
      },
      {
        // num: '03',
        line1: 'Lead Nurturing',
        line2: 'Services',
        route: '/lead-nurturing',
        tag: 'Audience Acquisition',
        image: '/lead%20nurturing.png',
      },
    ],
  },

  {
    id: 'data-operations',
    // num: '04',
    heading: 'Data & Operations',
    tagline: 'Custom prospect research, automated CRM hygiene, and real-time middleware delivery enforcing a 99.8% Data Accuracy SLA.',
    icon: Database,
    services: [
      {
        // num: '01',
        line1: 'B2B List',
        line2: 'Building',
        route: '/b2b-list-building',
        tag: 'Custom ICP Contacts',
        image: '/b2b-list-building.png',
      },
      {
        // num: '02',
        line1: 'Database',
        line2: 'Cleansing',
        route: '/database-cleansing',
        tag: 'Verification & Hygiene',
        image: '/database%20cleansing.png',
      },
      {
        // num: '03',
        line1: 'DemandFlow',
        line2: 'Bridge',
        route: '/demandflow-bridge',
        tag: 'Middleware Integration',
        image: '/demandflow-personalization.png',
      },
    ],
  },
]

export default function ReferenceCoreServices() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('lead-generation')

  const filteredPillars = PILLARS.filter((p) => p.id === activeFilter)

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
              Structured into four strategic pillars: Lead Generation, Channels & Programs, Demand & ABM/ABX, and Data & Operations to engineer predictable pipeline velocity for enterprise B2B teams.
            </p>
          </div>
        </div>

        {/* ══════════ 3 PILLAR FILTER PILLS (LEAD GEN, DEMAND & ABM, DATA & OPERATIONS) ══════════ */}
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

        {/* ══════════ 3 PILLAR GROUPS (CARDS FORMAT) ══════════ */}
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
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-2xl'
                  : pillar.services.length === 3
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl'
                    : pillar.services.length === 6
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                  }`}>
                  {pillar.services.map((card, idx) => (
                    <motion.div
                      key={card.route + idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => navigate(card.route)}
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
                          <ArrowRight className="w-3.5 h-3.5 text-text-primary dark:text-white group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
