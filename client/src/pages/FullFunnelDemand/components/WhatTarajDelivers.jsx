import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  Share2,
  FileCheck,
  Cpu,
  Gauge,
  BarChart,
  BadgeCheck,
  Check,
  Maximize2,
  X,
  Activity,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: 'Layer 01',
    title: 'DemandFlow Bridge: Central Command & CRM Intelligence',
    shortTitle: 'ICP Matrix',
    tag: '01 — PLATFORM • CENTRALIZED CRM & WORKFLOW INTELLIGENCE',
    module: 'DemandFlow Bridge™ Admin',
    screen: ': Full-Funnel Matrix & ICP Calibration',
    metric: '49 Live Campaigns • 84 Daily Target',
    desc: 'Campaign data scattered across tools makes pipeline impossible to trust. One integrated CRM and workflow platform powers account intelligence, engagement activity, intent signals, lead qualification, and pipeline reporting.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      '✔ CRM and verified prospect database',
       '✔ Multi-stakeholder workflow and role alignment',
       '✔ Closed-loop revenue velocity reporting',
       '✔ Centralized campaign command and budget pacing',
    ],
  },
  {
    num: '02',
    layer: 'Layer 02',
    title: 'DemandFlow Bridge: Audience & Buying Committee Intelligence',
    shortTitle: 'Verified Data',
    tag: ' 02 — AUDIENCE • ICP & BUYING COMMITTEE MAPPING',
    module: 'DemandFlow Bridge™ DBMS',
    screen: 'Assignment, Touch & CDQA Control Center',
    metric: '1,055 Records • CDQA Approved',
    desc: ' Campaigns aimed at the wrong accounts burn budget before the first click. We map your ideal customer profile to isolate verified accounts and senior decision-makers in your addressable market, refined with AI-assisted lookalike modeling.',
    icon: FileCheck,
    image: '/demandflow-dbms.png',
    points: [
      '✔ Firmographic, technographic, and revenue filtering',
      '✔ Verified job title and buying committee taxonomy',
      '✔ Target Account List (TAL) mapping and enrichment',
      '✔ Contact data hygiene and deduplication through our in-house verification tool',
    ],
  },
  {
    num: '03',
    layer: 'Layer 03',
    title: 'DemandFlow Bridge: Multi-Channel Cadence Engine',
    shortTitle: 'Nurture Cadence',
    tag: '03 — CADENCE • OMNICHANNEL OUTREACH WORKFLOWS',
    module: 'DemandFlow Bridge™ Sequences',
    screen: 'Outreach Cadence & Discovery Sprints',
    metric: '99.8% Data Accuracy • 4-Step Architecture',
    desc: 'Cold blast outreach burns domain reputation. We execute synchronized multi-touch cadences across executive email, LinkedIn touchpoints, content syndication, and senior SDR phone discovery.',
    icon: Share2,
    image: '/demandflow-sequences.png',
    points: [
      '✔ Multi-touch persistence across 14–21 day multi-channel sprints',
      '✔ Role-tailored value propositions addressing specific stakeholder friction',
      '✔ Complete call recordings and conversation telemetry captured for QA',
    ],
  },
  {
    num: '04',
    layer: 'Layer 04',
    title: 'DemandFlow Bridge: Campaign Pacing & Revenue Operations',
    shortTitle: 'Pacing Ops',
    tag: 'Live Pipeline Dispatch',
    module: 'DemandFlow Bridge™ Campaigns',
    screen: 'Campaign Operations & Pacing Board',
    metric: 'Live Allocation • 100% Pacing Tracking',
    desc: 'Uneven lead flow stresses SDR and AE capacity. Live telemetry tracks account progress across all funnel stages, throttling volume to match your sales executives’ meeting schedules.',
    icon: Gauge,
    image: '/demandflow-campaigns.png',
    points: [
      '✔ Continuous pipeline pacing matched to AE discovery capacity',
      '✔ Real-time status monitoring in your dedicated client dashboard',
      '✔ Transparent stage-by-stage stage conversion tracking',
    ],
  },
  {
    num: '05',
    layer: 'Layer 05',
    title: 'DemandFlow Bridge: Full-Funnel Pre-Meeting Dossiers',
    shortTitle: 'Dossiers',
    tag: 'Pre-Call Intelligence',
    module: 'DemandFlow Bridge™ Matrix',
    screen: 'Dynamic ICP & Pain Matrix',
    metric: '95.5% Match Rate • A/B Conversion Lift',
    desc: 'Reps waste valuable pitch time asking basic introductory questions. Each dossier arrives with mapped buying committee members, confirmed pain points, active tech stack, and intent triggers.',
    icon: Cpu,
    image: '/demandflow-personalization.png',
    points: [
      '✔ Multi-stakeholder buying committee structure and org charts',
      '✔ Documented operational bottlenecks and purchase timeline drivers',
      '✔ Current tech stack, displacement opportunities, and budget fit',
    ],
  },
  {
    num: '06',
    layer: 'Layer 06',
    title: 'DemandFlow Bridge: Direct Sales Meeting Calendar Handoff',
    shortTitle: 'Scheduling',
    tag: 'CONFIRMED DISCOVERY MEETINGS',
    module: 'DemandFlow Bridge™ Telemetry',
    screen: 'Response Telemetry & Meeting Telemetry',
    metric: '24.8K Opens • 178 Meeting Requests',
    desc: 'Qualified interest must turn into held meetings. We schedule confirmed discovery calls directly onto AE calendars across US, EMEA, and APAC with automated attendee reminders.',
    icon: BadgeCheck,
    image: '/demandflow-tracking.png',
    points: [
      '✔ Seamless calendar integration for Google Calendar and Outlook',
      '✔ Time-zone-aware scheduling with automated prospect reminders',
      '✔ 88%+ average meeting hold rate with instant rescheduling support',
    ],
  },
  {
    num: '07',
    layer: 'Layer 07',
    title: 'DemandFlow Bridge: Closed-Loop CRM Attribution & Telemetry',
    shortTitle: 'CRM Telemetry',
    tag: 'Pipeline Reporting',
    module: 'DemandFlow Bridge™ QA',
    screen: 'Lead Qualification & QA Control Center',
    metric: '765 Qualified • 100% Client Ready',
    desc: 'Revenue pipeline you cannot trace cannot be forecasted. All records, dossiers, and meeting notes sync bi-directionally into Salesforce or HubSpot with multi-touch attribution.',
    icon: BarChart,
    image: '/demandflow-qualification.png',
    points: [
      '✔ Native 2-way field mapping for Salesforce, HubSpot, and Outreach',
      '✔ Closed-loop attribution tracking pipeline velocity and CAC',
      '✔ Strict 99.8% Data Accuracy SLA with 1:1 replacement guarantee',
    ],
  },
]

const WhatTarajDelivers = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const tabRailRef = useRef(null)

  useEffect(() => {
    if (isZoomed) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ENGINE_LAYERS.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [activeIdx, isZoomed])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!tabRailRef.current) return
    const container = tabRailRef.current
    const activeBtn = container.querySelector(`[data-tab-idx="${activeIdx}"]`)
    if (activeBtn) {
      const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeIdx])

  const activeLayer = ENGINE_LAYERS[activeIdx]

  return (
    <section
      id="what-taraj-global-delivers"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Does Taraj Global Deliver in Full-Funnel Demand"
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
        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
             PROPRIETARY DEMAND ENGINE


            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-text-primary dark:text-white">HOW DEMANDFLOW BRIDGE </span>
            <div className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
            SUPPORTS DEMAND GENERATION

            </div>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Disconnected martech hides which campaigns actually create pipeline. DemandFlow Bridge centralizes prospect data, engagement, intent, qualification, and campaign performance in one workflow, from first touch to CRM.
          </p>
        </div>

        {/* ── UNIFIED COMMAND THEATER ── */}
        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* ── 1. HORIZONTAL STEPPER RAIL ── */}
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
                    data-tab-idx={idx}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`
                      relative flex-1 flex flex-col items-center py-2 px-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center group overflow-hidden
                      ${isActive
                        ? 'bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border-2 border-[#00A6FF] shadow-md shadow-[#00A6FF]/15 ring-1 ring-[#00A6FF]/30'
                        : 'bg-slate-100/80 dark:bg-[#060D19]/80 border-2 border-slate-200/70 dark:border-white/5 hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 hover:bg-slate-100 dark:hover:bg-[#081222]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`font-mono text-[11px] font-black ${isActive
                          ? 'text-[#00A6FF]'
                          : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                      >
                        {layer.num}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 ${isActive
                          ? 'text-[#00A6FF]'
                          : 'text-slate-500 dark:text-slate-400 group-hover:text-[#00A6FF]'
                          }`}
                      />
                    </div>

                    <span
                      className={`text-[11.5px] font-bold tracking-tight whitespace-nowrap ${isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                        }`}
                    >
                      {layer.shortTitle}
                    </span>

                    {isActive && (
                      <motion.div
                        key={`bar-${idx}-${activeIdx}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3.5, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── 2. TWO-COLUMN INTERACTIVE CONTENT SHOWCASE ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px]"
            >
              <div className="lg:col-span-6 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30">
                    {activeLayer.layer}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {activeLayer.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-text-primary dark:text-white tracking-tight leading-tight">
                  {activeLayer.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeLayer.desc}
                </p>

                <div className="space-y-2.5 pt-3 border-t border-slate-200/80 dark:border-white/10">
                  {activeLayer.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/30">
                        <Check className="w-3 h-3" strokeWidth={2.8} />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 pt-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    System State: <strong className="text-emerald-500 font-semibold">{activeLayer.metric}</strong>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 shadow-xl group">
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/80 border-b border-white/10 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-slate-300 font-bold ml-1">{activeLayer.module}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsZoomed(true)}
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Enlarge View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={activeLayer.image}
                      alt={activeLayer.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── 3. FULL-SCREEN ENLARGED MODAL LIGHTBOX ── */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 text-xs font-mono text-slate-300">
                <span className="font-bold">{activeLayer.title}</span>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2 bg-slate-950 flex items-center justify-center">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WhatTarajDelivers

