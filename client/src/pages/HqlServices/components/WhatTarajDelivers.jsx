import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Layers,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ClipboardList,
  TrendingUp,
  BadgeCheck,
  Check,
  Maximize2,
  X,
  Cpu,
  Activity,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: '01 — Strategy',
    title: 'DemandFlow Bridge — ICP & TAM Strategy',
    shortTitle: 'ICP Strategy',
    tag: 'TAM & Firmographic Filters',
    module: 'DemandFlow Bridge — ICP Matrix',
    screen: 'Target Account & ICP Calibration Console',
    metric: 'Verified TAM • 100% ICP Account Match',
    desc: 'We calibrate exact revenue tiers, industry verticals, technographic stacks, and buying committee personas before any campaign launch.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      'Firmographic filters: ARR, employee count, geography & software stack',
      'Persona matrix targeting C-suite, VPs, and budget-holding directors',
      'TAM saturation analysis & white-space account discovery',
    ],
  },
  {
    num: '02',
    layer: '02 — Data',
    title: 'DemandFlow Bridge — Contact Hygiene & CDQA',
    shortTitle: 'Data Hygiene',
    tag: 'Direct Dials & Verified Inboxes',
    module: 'DemandFlow Bridge — DBMS',
    screen: 'CDQA Cleanse & Telephony Verification Hub',
    metric: '100% CDQA Approved • 0% Bounce Risk',
    desc: 'Every contact dossier undergoes automated SMTP validation and human QA checks to ensure 100% inbox validity and verified phone dials.',
    icon: ShieldCheck,
    image: '/demandflow-dbms.png',
    points: [
      'Triple-layer SMTP validation eliminating bounce risks and stale records',
      'Direct business telephone dials and verified corporate emails',
      'Strict GDPR, CCPA, and CAN-SPAM data privacy compliance audit',
    ],
  },
  {
    num: '03',
    layer: '03 — Content',
    title: 'DemandFlow Bridge — Pain-Centric Content',
    shortTitle: 'Engagement',
    tag: 'Research Briefs & Whitepapers',
    module: 'DemandFlow Bridge — Sequences',
    screen: 'Asset Syndication & Cadence Architecture',
    metric: 'Multi-Touch Nurture • Active Problem Briefs',
    desc: 'We engage target decision-makers through authoritative research reports, technical whitepapers, and category problem frameworks.',
    icon: BookOpen,
    image: '/demandflow-sequences.png',
    points: [
      'Syndication of technical research briefs and benchmark reports',
      'Role-specific messaging addressing urgent strategic business pain points',
      'Omnichannel engagement across email, LinkedIn, and research portals',
    ],
  },
  {
    num: '04',
    layer: '04 — Intent',
    title: 'DemandFlow Bridge — Intent & Telemetry Surge',
    shortTitle: 'Intent Telemetry',
    tag: 'Reading Depth & Surge Signals',
    module: 'DemandFlow Bridge — Personalization',
    screen: 'Real-Time Intent Telemetry & Score Matrix',
    metric: 'Surge Intent Confirmed • Top 5% Category Interest',
    desc: 'We measure reading dwell time, document download completions, and surge category research signals to quantify genuine purchase intent.',
    icon: Sparkles,
    image: '/demandflow-personalization.png',
    points: [
      'Granular engagement telemetry: time-on-asset & reading depth',
      'Category-level intent surge tracking and active evaluation signals',
      'Strict exclusion of casual form-fills and non-decision-makers',
    ],
  },
  {
    num: '05',
    layer: '05 — Discovery',
    title: 'DemandFlow Bridge — Custom Screening Q&A',
    shortTitle: 'Screening Q&A',
    tag: 'Custom Discovery Answers',
    module: 'DemandFlow Bridge — Campaigns',
    screen: 'Custom Discovery Questionnaire Gateway',
    metric: '2–4 Mandatory Custom Answers Recorded',
    desc: 'Prospects answer your bespoke qualifying questions—revealing current software vendor, contract renewal, urgent pain, and timeline.',
    icon: ClipboardList,
    image: '/demandflow-campaigns.png',
    points: [
      'Verbatim answers to 2 to 4 mandatory qualification questions',
      'Current tech stack install base and renewal dates confirmed',
      'Documented project priorities and purchase evaluation criteria',
    ],
  },
  {
    num: '06',
    layer: '06 — Dossiers',
    title: 'DemandFlow Bridge — Executive Lead Dossiers',
    shortTitle: 'Lead Dossiers',
    tag: 'Sales-Ready Pre-Call Intelligence',
    module: 'DemandFlow Bridge — Qualification',
    screen: 'Pre-Discovery Prospect Intelligence Brief',
    metric: '100% Human-Audited Dossiers Delivered',
    desc: 'Sales reps receive rich briefing dossiers detailing contact intel, LinkedIn profile, asset consumed, and verbatim discovery answers.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      'Complete contact dossier: direct dial, corporate email, LinkedIn profile',
      'Asset consumption log with timestamps and engagement telemetry',
      'Pre-call discovery briefing arming SDRs for high-converting demos',
    ],
  },
  {
    num: '07',
    layer: '07 — Delivery',
    title: 'DemandFlow Bridge — CRM Ingestion & SLA',
    shortTitle: 'CRM & SLA',
    tag: 'Native CRM Sync & 14-Day SLA',
    module: 'DemandFlow Bridge — Tracking',
    screen: 'Direct CRM Pipeline Ingestion & SLA Monitor',
    metric: '14-Day 1-to-1 Replacement SLA Guarantee',
    desc: 'Leads are routed directly to your CRM with automated rep assignment, backed by our 14-day zero-bounce 1-to-1 lead replacement guarantee.',
    icon: TrendingUp,
    image: '/demandflow-tracking.png',
    points: [
      'Instant CRM sync via HubSpot, Salesforce, Marketo, or Webhooks',
      'Automated lead source tagging, SDR routing, and task creation',
      '14-day zero-bounce 1-to-1 lead replacement guarantee SLA',
    ],
  },
]

export default function WhatTarajDelivers() {
  const prefersReducedMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const tabRailRef = useRef(null)

  // Automatic progression: moves one by one continuously every 3.5 seconds
  useEffect(() => {
    if (isZoomed) return // Pause auto-rotation when zoomed
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ENGINE_LAYERS.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [activeIdx, isZoomed])

  // Close zoom modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Ensure active tab is visible inside horizontal scroll container
  useEffect(() => {
    if (!tabRailRef.current) return
    const container = tabRailRef.current
    const activeBtn = container.querySelector(`[data-tab-idx="${activeIdx}"]`)
    if (activeBtn) {
      const containerRect = container.getBoundingClientRect()
      const btnRect = activeBtn.getBoundingClientRect()
      if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeIdx])

  const activeLayer = ENGINE_LAYERS[activeIdx]

  return (
    <section
      id="what-does-taraj-actually-deliver"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Does Taraj Actually Deliver"
    >
      {/* ── Subtle Ambient Background Illumination ── */}
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Proprietary HQL Delivery Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-white">What Does Taraj </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
              Actually Deliver?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Taraj Global delivers verified, sales-ready High-Quality Leads (HQL) equipped with verbatim pain points and direct decision-maker access.
          </p>
        </div>

        {/* ── UNIFIED COMMAND THEATER ── */}
        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Top Subtle Cyan Glow Accent Line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* ── 1. HORIZONTAL CONNECTED 7-STAGE STEPPER RAIL ── */}
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
                      ${
                        isActive
                          ? 'bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border-2 border-[#00A6FF] shadow-md shadow-[#00A6FF]/15 ring-1 ring-[#00A6FF]/30'
                          : 'bg-slate-100/80 dark:bg-[#060D19]/80 border-2 border-slate-200/70 dark:border-white/5 hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 hover:bg-slate-100 dark:hover:bg-[#081222]'
                      }
                    `}
                  >
                    {/* Stage Number & Icon */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={`font-mono text-[11px] font-black ${
                          isActive
                            ? 'text-[#00A6FF]'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}
                      >
                        {layer.num}
                      </span>
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive
                            ? 'text-[#00A6FF]'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-[#00A6FF]'
                        }`}
                      />
                    </div>

                    <span
                      className={`text-[11.5px] font-bold tracking-tight whitespace-nowrap ${
                        isActive
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}
                    >
                      {layer.shortTitle}
                    </span>

                    {/* Active Progress Bar - fills over 3.5s cycle */}
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

          {/* ── 2. TWO-COLUMN INTERACTIVE CONTENT & DEMANDFLOW ENGINE SHOWCASE ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px]"
            >
              {/* Left Column: Stage Details & Points (6 Cols) */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30">
                    {activeLayer.layer}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {activeLayer.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {activeLayer.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeLayer.desc}
                </p>

                {/* 3 Core Capability Points */}
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

                {/* Platform Telemetry Strip */}
                <div className="inline-flex items-center gap-2 pt-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    System State: <strong className="text-emerald-500 font-semibold">{activeLayer.metric}</strong>
                  </span>
                </div>
              </div>

              {/* Right Column: High-Fidelity DEMANDFLOW Bridge Window (6 Cols) */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => setIsZoomed(true)}
                  className="relative rounded-2xl overflow-hidden border border-slate-300/80 dark:border-[#00A6FF]/30 bg-[#060D19] shadow-xl dark:shadow-[0_16px_40px_rgba(0,166,255,0.15)] group cursor-pointer transition-all duration-300 hover:border-[#00A6FF] hover:shadow-[0_20px_50px_rgba(0,166,255,0.25)]"
                >
                  {/* DEMANDFLOW Application Top Chrome Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-white/10 select-none">
                    {/* macOS Style Window Control Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    {/* URL / Path Pill */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-[11px] font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-slate-300">demandflow.tarajglobal.com</span>
                      <span className="text-slate-500">/hql/bridge</span>
                    </div>

                    {/* Fullscreen Hint Action */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase hidden md:inline">
                        Click to expand
                      </span>
                      <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#00A6FF]/20 transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Image Viewport (16:9 Aspect Ratio) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={activeLayer.image}
                      alt={`${activeLayer.title} - DemandFlow Bridge Platform Screen`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Subtle Gradient Shadow for bottom readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-white/15 text-[10.5px] font-mono font-bold text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[#00A6FF]">{activeLayer.module}</span>
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono font-semibold text-slate-400">
                          {activeLayer.screen}
                        </span>
                        <span className="text-xs font-bold text-white drop-shadow">
                          {activeLayer.metric}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white bg-[#00A6FF] shadow-sm shrink-0">
                        {activeLayer.num}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── FULL RESOLUTION INSPECT MODAL ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00A6FF] text-white">
                    {activeLayer.num}
                  </span>
                  <span className="text-sm font-bold text-white truncate">
                    {activeLayer.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-mono text-slate-400">
                  Screen: <strong className="text-white">{activeLayer.screen}</strong>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold">
                  {activeLayer.metric}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
