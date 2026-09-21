import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Target, Zap, Database } from 'lucide-react'

const PILLARS = [
  {
    id: 'lead-generation',
    num: '01',
    heading: 'Lead Generation',
    tagline: 'High-intent buyer discovery and sales-ready pipeline inflow',
    icon: Target,
    services: [
      {
        num: '01',
        line1: 'Email',
        line2: 'Marketing',
        route: '/b2b-email-marketing',
        tag: 'Outbound Outreach',
        image: '/email-service.jpg',
      },
      {
        num: '02',
        line1: 'MQL',
        line2: 'Services',
        route: '/mql-services',
        tag: 'Marketing Qualified',
        image: '/mql.png',
      },
      {
        num: '03',
        line1: 'HQL',
        line2: 'Services',
        route: '/hql-services',
        tag: 'High-Quality Leads',
        image: '/hql.png',
      },
      {
        num: '04',
        line1: 'BANT',
        line2: 'Services',
        route: '/bant-lead-generation',
        tag: 'Budget & Authority',
        image: '/bant.png',
      },
      {
        num: '05',
        line1: 'SQL',
        line2: 'Services',
        route: '/sql-services',
        tag: 'Sales Qualified',
        image: '/sql-lead-qualification-journey.jpg',
      },
      {
        num: '06',
        line1: 'Appointment',
        line2: 'Generation',
        route: '/b2b-appointment-setting',
        tag: 'Confirmed Meetings',
        image: '/appointment-setting.png',
      },
    ],
  },
  {
    id: 'demand-abm',
    num: '02',
    heading: 'Demand & ABM',
    tagline: 'Hyper-targeted account acquisition and continuous market demand',
    icon: Zap,
    services: [
      {
        num: '01',
        line1: 'Lead',
        line2: 'Nurturing',
        route: '/lead-nurturing',
        tag: 'Pipeline Retention',
        image: '/lead%20nurturing.png',
      },
      {
        num: '02',
        line1: 'Content',
        line2: 'Syndication',
        route: '/content-syndication',
        tag: 'Whitepaper Reach',
        image: '/content%20syndication.png',
      },
      {
        num: '03',
        line1: 'Account-Based',
        line2: 'Marketing (ABM)',
        route: '/abm',
        tag: 'Target Accounts',
        image: '/abm.avif',
      },
      {
        num: '04',
        line1: 'Webinar',
        line2: 'Services',
        route: '/webinar-services',
        tag: 'Audience Acquisition',
        image: '/webinar.png',
      },
      {
        num: '05',
        line1: 'Demand',
        line2: 'Generation',
        route: '/demand-generation',
        tag: 'Full-Funnel Demand',
        image: '/demandflow-campaigns.png',
      },
    ],
  },
  {
    id: 'data-operations',
    num: '03',
    heading: 'Data & Operations',
    tagline: 'Accurate B2B intelligence, CRM verification, and data hygiene',
    icon: Database,
    services: [
      {
        num: '01',
        line1: 'B2B List',
        line2: 'Building',
        route: '/b2b-list-building',
        tag: 'Custom ICP Contacts',
        image: '/b2b-list-building.png',
      },
      {
        num: '02',
        line1: 'Database',
        line2: 'Cleansing',
        route: '/database-cleansing',
        tag: 'Verification & Hygiene',
        image: '/database%20cleansing.png',
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
      className="relative py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-4 h-[2px] bg-[#FF6D00]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
              OUR CORE SERVICES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Solutions Built Around <br className="hidden sm:inline" />
              Your Growth Goals
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-white/60 leading-relaxed font-normal lg:max-w-md lg:pb-1">
              Structured into three strategic pillars: Lead Generation, Demand & ABM, and Data & Operations to move your pipeline forward.
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF6D00] text-black shadow-md shadow-[#FF6D00]/25'
                    : 'border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:border-[#FF6D00] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pillar.heading}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-black/20 text-black' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/60'
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
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        {pillar.heading}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-white/55 max-w-md sm:text-right font-normal">
                    {pillar.tagline}
                  </p>
                </div>

                {/* ── Services Grid for this Pillar ── */}
                <div className={`grid gap-4 ${
                  pillar.services.length <= 2
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-2xl'
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
                      className="group relative rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0B0F17]/80 hover:bg-slate-50 dark:hover:bg-[#0E141F] hover:border-[#FF6D00] dark:hover:border-[#FF6D00] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-2 shadow-md shadow-slate-200/50 dark:shadow-xl overflow-hidden min-h-[320px]"
                    >
                      {/* Top: Number & Tag */}
                      <div className="relative z-10 flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-black text-slate-400 dark:text-white/40 group-hover:text-[#FF6D00] transition-colors">
                          {card.num}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 border border-slate-200/60 dark:border-white/5 truncate max-w-[120px]">
                          {card.tag}
                        </span>
                      </div>

                      {/* Title (2 lines) */}
                      <div className="relative z-10 my-3">
                        <h4 className="text-sm sm:text-base font-black uppercase text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-[#FF6D00] transition-colors">
                          <div>{card.line1}</div>
                          <div>{card.line2}</div>
                        </h4>
                      </div>

                      {/* Lower Portion: Visual Artwork */}
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mt-auto border border-slate-200/80 dark:border-white/5 bg-slate-950">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ backgroundImage: `url(${card.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-[#0B0F17] dark:via-[#0B0F17]/40 dark:to-transparent" />

                        {/* Bottom Circular Arrow Icon */}
                        <div className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full border border-white/30 bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:border-[#FF6D00] group-hover:bg-[#FF6D00] transition-all">
                          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" />
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
