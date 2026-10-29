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
    title: 'DemandFlow Bridge: Tiered Target Account Matrix',
    shortTitle: 'TAL Strategy',
    tag: 'TARGET ACCOUNT SELECTION',
    module: 'DemandFlow Bridge™ Admin',
    screen: 'Target Account List (TAL) Allocation & ICP Tiering',
    metric: 'Global 2000 Mapped • High-ARR Accounts',
    desc: 'Accounts chosen on gut feel waste an entire campaign. We tier target accounts by firmographics, tech stack, and revenue potential, refined with AI-assisted lookalike modeling.',
    icon: Target,
    image: '/demandflow-admin.png',
    points: [
      '✔ Tier 1, 2, and 3 account lists scored on firmographic fit and live intent',
      '✔ Positive and negative account screening filters tied to your ICP',
      '✔ TAM white-space discovery and lookalike account expansion',
    ],
  },
  {
    num: '02',
    layer: '02 — Intelligence',
    title: 'DemandFlow Bridge: Verified Buying Committee Data',
    shortTitle: 'Committee Map',
    tag: 'BUYING COMMITTEE DATA',
    module: 'DemandFlow Bridge™ DBMS',
    screen: 'Organizational Chart & Decision-Maker Matrix Hub',
    metric: '99.8% Data Accuracy SLA • 6–10 Roles per Account',
    desc: ' Stale contacts burn sender reputation and miss the people who actually decide. Every stakeholder in each account’s committee is validated by our AI-assisted, in-house verification tool, backed by our 99.8% Data Accuracy SLA.',
    icon: Users,
    image: '/demandflow-dbms.png',
    points: [
      '✔ Multi-persona mapping across C-suite, VPs, and budget-holding Directors',
      '✔ Zero-bounce SMTP validation on every email address',
      '✔ Direct dials and compliant mobile numbers under ISO 27001:2022, GDPR, and CCPA safeguards',

    ],
  },
  {
    num: '03',
    layer: '03 — Content',
    title: 'DemandFlow Bridge: Account Intent Radar & Surge Signals',
    shortTitle: '1:1 Narratives',
    tag: 'INTENT & SURGE SIGNALS',
    module: 'DemandFlow Bridge™ Sequences',
    screen: 'Multi-Persona Messaging Architecture & Collateral Engine',
    metric: 'Tailored ROI Models • Executive Briefing Kits',
    desc: 'Teams blind to account intent contact accounts that aren’t buying. AI-assisted intent telemetry highlights target accounts researching your category, comparing vendors, or engaging with your content.',
    icon: Layers,
    image: '/demandflow-sequences.png',
    points: [
      '✔ Topic and keyword surge detection across B2B networks',
       '✔ First-party engagement tracking on emails, content, and web touchpoints',
       '✔ Buying-stage classification and prioritized in-market account alerts',

    ],
  },
  {
    num: '04',
    layer: '04 — Orchestration',
    title: 'DemandFlow Bridge: 1:1 Account-Specific Personalization',
    shortTitle: 'Omnichannel',
    tag: 'ACCOUNT PERSONALIZATION',
    module: 'DemandFlow Bridge™ Campaigns',
    screen: 'Synchronized Multi-Touch Outbound Cadence Console',
    metric: 'Email + LinkedIn + Tele-Connect Synchronized',
    desc: 'Generic outreach gets ignored by senior buyers. Messaging and assets are tailored to each account’s industry context, role priorities, and real enterprise initiatives.',
    icon: Share2,
    image: '/demandflow-campaigns.png',
    points: [
      '✔ Role-specific value propositions for each buying-committee member',
      '✔ Account-specific assets, briefings, and executive messaging',
      '✔ A/B testing of angles and offers by account tier',

    ],
  },
  {
    num: '05',
    layer: '05 — Telemetry',
    title: 'DemandFlow Bridge: Multi-Channel ABM Orchestration',
    shortTitle: 'Intent Telemetry',
    tag: 'MULTI-CHANNEL ORCHESTRATION',
    module: 'DemandFlow Bridge™ Tracking',
    screen: 'Real-Time Intent Telemetry & Content Consumption Analytics',
    metric: 'Live Intent Surges • Dwell-Time Tracking',
    desc: 'Single-touch outreach never reaches a whole committee. Senior SDRs coordinate email, phone, and LinkedIn touches across stakeholders on a synchronized cadence, prioritized by intent.',
    icon: Activity,
    image: '/demandflow-tracking.png',
    points: [
      '✔ Synchronized multi-touch cadences across 14–21 day conversational sprints',
       '✔ Live conversations by senior SDRs, never automated bot forms',
       '✔ Automated follow-up logic and engagement tracking per stakeholder',

    ],
  },
  {
    num: '06',
    layer: '06 — CRM Sync',
    title: ' DemandFlow Bridge: Account Dossiers & Meeting Handoff',
    shortTitle: 'CRM Routing',
    tag: 'ACCOUNT INTELLIGENCE & HANDOFF',
    module: 'DemandFlow Bridge™ Delivery',
    screen: 'Real-Time Enterprise CRM Sync & SDR Handover Protocol',
    metric: 'Salesforce & HubSpot Native • Real-Time Webhooks',
    desc: 'Reps who engage a warmed account without context lose momentum. Each opportunity arrives with a dossier covering committee, pain points, tech stack, and intent history, with discovery meetings booked on AE calendars.',
    icon: Cpu,
    image: '/demandflow-qualification.png',
    points: [
      '✔ Stakeholder map, documented pain points, and installed tech stack',
       '✔ Intent history and engagement trail across every touch',
       '✔ Discovery meetings booked directly on AE calendars',

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
              PROPRIETARY ABM DELIVERY ENGINE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span>WHAT DOES TARAJ GLOBAL </span>
            <span className="inline-block bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent py-1 sm:py-1.5">
             DELIVER IN ABM
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Stop running campaigns that no one on the buying committee sees. TaRaj Global delivers tiered target accounts, mapped committees, and engaged opportunities, scored by AI-assisted intent signals, verified in-house, and routed via DemandFlow Bridge.
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

