import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  FileCheck,
  Share2,
  Sparkles,
  Gauge,
  BarChart,
  BadgeCheck,
  Cpu,
  Check,
  Maximize2,
  X,
  Activity,
  Target,
  Users,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: '01 — Strategy',
    title: 'DemandFlow Bridge — Target Account Selection',
    shortTitle: 'TAL Strategy',
    tag: 'Account Tiers & TAM Matrix',
    module: 'DemandFlow Bridge™ Admin',
    screen: 'Target Account List (TAL) Allocation & ICP Tiering',
    metric: 'Global 2000 Mapped • High-ARR Accounts',
    desc: 'We analyze your closed-won historical patterns, define high-fit firmographic and technographic thresholds, and tier your target account list into 1:1, 1:Few, and 1:Many campaigns.',
    icon: Target,
    image: '/demandflow-admin.png',
    points: [
      '✔ Custom account scoring based on revenue thresholds, headcount, and installed tech stacks',
      '✔ Tier-1 named accounts assigned dedicated executive research and bespoke narratives',
      '✔ Continuous lookalike modeling expanding your target addressable market (TAM)',
    ],
  },
  {
    num: '02',
    layer: '02 — Intelligence',
    title: 'DemandFlow Bridge — Buying Committee Intelligence',
    shortTitle: 'Committee Map',
    tag: 'Stakeholder Hierarchy',
    module: 'DemandFlow Bridge™ DBMS',
    screen: 'Organizational Chart & Decision-Maker Matrix Hub',
    metric: '99.8% Data Accuracy SLA • 6–10 Roles per Account',
    desc: 'Every target account buying committee is mapped across economic buyers, technical evaluators, champions, and procurement heads, backed by our 99.8% Data Accuracy SLA.',
    icon: Users,
    image: '/demandflow-dbms.png',
    points: [
      '✔ Multi-persona mapping across C-suite, VPs, and budget-holding Directors',
      '✔ Triple-layer SMTP ping and phone extension verification on every contact',
      '✔ Zero-bounce replacement guarantee ensuring clean, active CRM pipeline records',
    ],
  },
  {
    num: '03',
    layer: '03 — Content',
    title: 'DemandFlow Bridge — Bespoke 1:1 Value Narratives',
    shortTitle: '1:1 Narratives',
    tag: 'Executive Personalization',
    module: 'DemandFlow Bridge™ Sequences',
    screen: 'Multi-Persona Messaging Architecture & Collateral Engine',
    metric: 'Tailored ROI Models • Executive Briefing Kits',
    desc: 'We produce bespoke 1:1 executive briefing collateral, customized ROI models, and role-specific case studies addressing the strategic corporate priorities of each buying persona.',
    icon: Layers,
    image: '/demandflow-sequences.png',
    points: [
      '✔ Highly personalized 1:1 and 1:few messaging playbooks tailored by role',
      '✔ Custom case studies and ROI calculators mapped to account-specific tech stacks',
      '✔ Executive aircover collateral resolving security, procurement, and architecture doubts',
    ],
  },
  {
    num: '04',
    layer: '04 — Orchestration',
    title: 'DemandFlow Bridge — Omnichannel Outbound Cadence',
    shortTitle: 'Omnichannel',
    tag: 'Synchronized Touches',
    module: 'DemandFlow Bridge™ Campaigns',
    screen: 'Synchronized Multi-Touch Outbound Cadence Console',
    metric: 'Email + LinkedIn + Tele-Connect Synchronized',
    desc: 'Deploy coordinated touches across executive email cadences, personalized LinkedIn outreach, targeted digital content syndication, and senior SDR phone discussions.',
    icon: Share2,
    image: '/demandflow-campaigns.png',
    points: [
      '✔ Multi-touch outreach cadences harmonized across all committee stakeholders',
      '✔ High-touch executive touchpoints establishing immediate credibility and brand authority',
      '✔ Real-time engagement alerts triggering timely sales team interventions',
    ],
  },
  {
    num: '05',
    layer: '05 — Telemetry',
    title: 'DemandFlow Bridge — Intent Surge Telemetry',
    shortTitle: 'Intent Telemetry',
    tag: 'Behavioral Signals',
    module: 'DemandFlow Bridge™ Tracking',
    screen: 'Real-Time Intent Telemetry & Content Consumption Analytics',
    metric: 'Live Intent Surges • Dwell-Time Tracking',
    desc: 'Track content consumption depth, repeat visits, reading dwell velocity, and third-party category surge telemetry to alert sales teams when accounts enter active purchase cycles.',
    icon: Activity,
    image: '/demandflow-tracking.png',
    points: [
      '✔ First-party content consumption analytics tracking account-level interest spikes',
      '✔ Third-party topic surge monitoring across thousands of B2B digital publications',
      '✔ Automated lead scoring escalating surging accounts straight to Account Executives',
    ],
  },
  {
    num: '06',
    layer: '06 — CRM Sync',
    title: 'DemandFlow Bridge — Sales Handoff & Closed-Loop Sync',
    shortTitle: 'CRM Routing',
    tag: 'Closed-Loop Pipeline',
    module: 'DemandFlow Bridge™ Delivery',
    screen: 'Real-Time Enterprise CRM Sync & SDR Handover Protocol',
    metric: 'Salesforce & HubSpot Native • Real-Time Webhooks',
    desc: 'Complete account dossiers with verified stakeholder details, discovery notes, and full engagement history are synced straight into Salesforce or HubSpot with zero manual data entry.',
    icon: Cpu,
    image: '/demandflow-qualification.png',
    points: [
      '✔ Native 2-way integration with Salesforce, HubSpot, Marketo, and custom webhooks',
      '✔ Full buying committee dossiers and discovery transcripts provided before meetings',
      '✔ Real-time revenue attribution and pipeline velocity tracking in your CRM dashboard',
    ],
  },
]

const WhatTarajDelivers = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [modalImage, setModalImage] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const tabRailRef = useRef(null)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ENGINE_LAYERS.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused])

  const activeLayer = ENGINE_LAYERS[activeIdx]

  return (
    <section
      id="what-we-deliver"
      className="relative py-10 sm:py-12 lg:py-16 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10"
      aria-label="What Taraj Global Delivers: ABM Engine"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[360px] bg-[#00A6FF]/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              PROPRIETARY ABM ENGINE • DEMANDFLOW BRIDGE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span>What Does Taraj Global </span>
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
              Deliver?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            TaRaj Global delivers high-precision Account-Based Marketing programs backed by multi-stakeholder committee mapping, 1:1 executive personalization, and closed-loop CRM synchronization.
          </p>
        </div>

        {/* Command Theater */}
        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* Stepper Tabs */}
          <div
            ref={tabRailRef}
            className="overflow-x-auto pt-2 pb-3 mb-5 px-1 scrollbar-none border-b border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center justify-between min-w-[720px] gap-1.5 py-1">
              {ENGINE_LAYERS.map((layer, idx) => {
                const Icon = layer.icon
                const isActive = idx === activeIdx

                return (
                  <button
                    key={layer.num}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`
                      relative flex-1 flex flex-col items-center py-2 px-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center group overflow-hidden
                      ${
                        isActive
                          ? 'bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border-2 border-[#00A6FF] shadow-md shadow-[#00A6FF]/15 ring-1 ring-[#00A6FF]/30'
                          : 'bg-slate-100/80 dark:bg-[#060D19]/80 border-2 border-slate-200/70 dark:border-white/5 hover:border-[#00A6FF]/40 hover:bg-slate-100 dark:hover:bg-[#081222]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`font-mono text-[11px] font-black ${
                          isActive ? 'text-[#00A6FF]' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {layer.num}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#00A6FF]' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      />
                    </div>

                    <span
                      className={`text-[11.5px] font-bold tracking-tight whitespace-nowrap ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {layer.shortTitle}
                    </span>

                    {isActive && (
                      <motion.div
                        key={`bar-${idx}-${activeIdx}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Content Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {activeLayer.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {activeLayer.module}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {activeLayer.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {activeLayer.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                    {activeLayer.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-primary font-bold">✔</span>
                        <span>{pt.replace(/^✔\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Metric Verification</span>
                  <span className="text-primary font-bold">{activeLayer.metric}</span>
                </div>
              </div>

              {/* Screenshot Preview */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-900 shadow-xl group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={activeLayer.image}
                    alt={activeLayer.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="truncate max-w-[280px]">{activeLayer.screen}</span>
                  <button
                    onClick={() => setModalImage(activeLayer.image)}
                    className="p-1.5 rounded-lg bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-colors cursor-pointer"
                    title="Expand View"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden border border-white/20">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={modalImage} alt="Expanded Screenshot" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}

export default WhatTarajDelivers

