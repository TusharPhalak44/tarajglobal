import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Layers,
  ShieldCheck,
  MailCheck,
  Sparkles,
  Gauge,
  TrendingUp,
  BadgeCheck,
  Cpu,
  Check,
  Maximize2,
  X,
  ExternalLink,
  Activity,
  ArrowRight,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: '01 — Strategy',
    title: 'DemandFlow Bridge: Email Audience & ICP Strategy',
    shortTitle: 'Platform',
    tag: ' AUDIENCE & ICP STRATEGY',
    module: 'DemandFlow Bridge',
    subLabel: 'Unified Business Operations Platform',
    screen: 'Unified Business Operations Platform',
    metric: 'ONE PLATFORM • MULTIPLE OPERATIONS • REAL-TIME CONTROL',
    desc: 'Campaigns sent to the wrong audience waste every downstream effort. We define ICP, personas, and ARR tiers before launch, refined with AI-assisted lookalike modeling.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      '✔ ICP and persona matrix across target verticals and ARR tiers',
      '✔ Positive and negative account screening filters',
      '✔ Campaign goals and reply-qualification criteria agreed upfront',
    ],
  },
  {
    num: '02',
    layer: '02 —Data Hygiene',
    title: 'DemandFlow Bridge: Verified Contact Data Hygiene',
    shortTitle: 'Data',
    tag: ' VERIFIED INBOXES & DIRECT DIALS',
    module: 'DemandFlow Bridge — Data',
    screen: 'Assignment, Touch & CDQA Control Center',
    metric: '1,055 Verified Records • CDQA Approved',
    desc: ' High bounce rates damage sender reputation and burn a whole domain. Every address passes our AI-assisted, in-house verification tool, backed by our 99.8% Data Accuracy SLA.',
    icon: ShieldCheck,
    image: '/demandflow-dbms.png',
    points: [
      '✔ Triple-layer SMTP validation eliminating bounce risk',
      '✔ Spam-trap and stale-record purge on every list',
      '✔ ISO 27001:2022, GDPR, CCPA, and CAN-SPAM compliance audit',
    ],
  },
  {
    num: '03',
    layer: '03 —   Personalization',
    title: 'DemandFlow Bridge: AI-Enhanced Message Personalization',
    shortTitle: 'Sequences',
    tag: 'AI-ENHANCED PERSONALIZATION',
    module: 'DemandFlow Bridge — Sequences',
    screen: 'Email Cadence & Sequence Operations',
    metric: '99.4% Deliverability • 4-Step Architecture',
    desc: 'Generic blasts are deleted in seconds by senior buyers. AI-enhanced personalization tailors subject lines, copy, and offers to each persona’s role, pain points, and installed stack.',
    icon: MailCheck,
    image: '/demandflow-sequences.png',
    points: [
      '✔ Role-specific messaging for C-suite, VP, and Director personas',
      '✔ Dynamic fields from firmographic and technographic data',
      '✔ A/B testing of subject lines, angles, and calls to action',
    ],
  },
  {
    num: '04',
    layer: '04 — Deliverability',
    title: ' DemandFlow Bridge: Custom Deliverability Engine',
    shortTitle: 'Personalization',
    tag: 'AI & Buyer Signals',
    module: 'DemandFlow Bridge — Personalization',
    screen: 'Dynamic Personalization & ICP Variables',
    metric: '95.5% Match Rate • A/B Conversion Lift',
    desc: ' Emails that land in spam never get read, however good the copy. Our custom deliverability engine manages sender reputation, sending pace, and placement monitoring across every campaig.',
    icon: Sparkles,
    image: '/demandflow-personalization.png',
    points: [
      '✔ Sender reputation and sending-pace controls',
      '✔ Inbox placement monitoring with automated alerts',
      '✔ Bounce and complaint thresholds enforced to protect your domains',
    ],
  },
  {
    num: '05',
    layer: '05 —  Cadences',
    title: ' DemandFlow Bridge: Validated Multi-Step Email Cadences',
    shortTitle: 'Execution',
    tag: 'VALIDATED MULTI-TOUCH CADENCES',
    module: 'DemandFlow Bridge — Execution',
    screen: 'Campaign Operations & Pacing Board',
    metric: 'Live Allocation • 100% Pacing Tracking',
    desc: 'One email rarely wins a reply from a busy executive. Validated multi-step cadences follow up on a paced schedule that adjusts to each prospect’s response.',
    icon: Gauge,
    image: '/demandflow-campaigns.png',
    points: [
      '✔ Multi-touch sequences across 14–21 day conversational sprints',
      '✔ Automated follow-up logic and unsubscribe handling',
      '✔ Live pacing board tracking daily sends against targets',
    ],
  },
  {
    num: '06',
    layer: '06 — Reply Handling',
    title: 'DemandFlow Bridge: Reply Triage & Response Telemetry',
    shortTitle: 'Tracking',
    tag: 'REPLY TRIAGE & QUALIFICATION',
    module: 'DemandFlow Bridge — Tracking',
    screen: 'Response Telemetry & Intent Analytics',
    metric: '24.8K Opens • 842 Positive Replies',
    desc: 'Positive replies lose value when they sit unanswered. SDRs triage every response in real time, qualify interest against your criteria, and book discovery meetings.',
    icon: TrendingUp,
    image: '/demandflow-tracking.png',
    points: [
      '✔ Real-time reply monitoring and SDR triage',
      '✔ Qualification against ICP and BANT criteria before handoff',
      '✔ Discovery meetings booked directly on AE calendars',
    ],
  },
  {
    num: '07',
    layer: '07 — CRM Telemetry',
    title: ' DemandFlow Bridge: CRM Telemetry & Reply Attribution',
    shortTitle: 'Qualification',
    tag: 'PIPELINE REPORTING',
    module: 'DemandFlow Bridge — Qualification',
    screen: 'Lead Qualification & QA Control Center',
    metric: '765 Qualified • 94.2% BANT Ready',
    desc: 'Email results that stop at open rates can’t justify the program. CRM sync attributes replies and meetings to campaigns, backed by our 99.8% Data Accuracy SLA.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      '✔ Native field mapping for Salesforce and HubSpot, plus custom API integrations',
      '✔ Reply-to-opportunity attribution tracked by campaign',
      '✔ Bi-weekly performance reviews with your sales and marketing leaders',
    ],
  },
]

const WhatTarajDelivers = () => {
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
      const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeIdx])

  const activeLayer = ENGINE_LAYERS[activeIdx]

  return (
    <section
      id="what-taraj-global-delivers"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Does Taraj Global Deliver"
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
          <div className="inline-flex items-center gap-2   mb-2.5">
            {/* <Cpu className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" /> */}
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              PROPRIETARY EMAIL ENGINE • DEMANDFLOW BRIDGE

            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-text-primary dark:text-white">WHAT DOES TARAJ GLOBAL  </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
              DELIVER IN EMAIL MARKETING?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Stop sending campaigns that never reach the inbox. TaRaj Global delivers verified-data email programs with validated cadences and qualified replies, scored by AI-assisted signals and routed via DemandFlow Bridge.
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
                      ${isActive
                        ? 'bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border-2 border-[#00A6FF] shadow-md shadow-[#00A6FF]/15 ring-1 ring-[#00A6FF]/30'
                        : 'bg-slate-100/80 dark:bg-[#060D19]/80 border-2 border-slate-200/70 dark:border-white/5 hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 hover:bg-slate-100 dark:hover:bg-[#081222]'
                      }
                    `}
                  >
                    {/* Stage Number & Icon */}
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

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-text-primary dark:text-white tracking-tight leading-tight">
                  {activeLayer.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeLayer.desc}
                </p>

                {/* Core Capability Points */}
                <div className="space-y-2 sm:space-y-2.5 pt-3 border-t border-slate-200/80 dark:border-white/10">
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
                    {activeLayer.num === '01' ? (
                      <strong className="text-emerald-500 font-semibold tracking-wider">{activeLayer.metric}</strong>
                    ) : (
                      <>System State: <strong className="text-emerald-500 font-semibold">{activeLayer.metric}</strong></>
                    )}
                  </span>
                </div>

                {/* Direct CTA link for DemandFlow Bridge platform */}
                {activeLayer.num === '01' && (
                  <div className="pt-2">
                    <Link
                      to="/demandflow-bridge"
                      style={{ backgroundColor: '#FF6D00', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,109,0,0.3)', border: 'none' }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold  text-text-accent dark:text-white hover:/90 shadow-md shadow-[#FF6D00]/20 hover:shadow-[#FF6D00]/35 transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      <span>Explore DemandFlow Bridge</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}

              </div>

              {/* Right Column: High-Fidelity DEMANDFLOW Bridge Window (6 Cols) */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => setIsZoomed(true)}
                  className="relative rounded-2xl overflow-hidden border border-slate-300/80 dark:border-[#00A6FF]/30 bg-background dark:bg-[#060D19] shadow-xl dark:shadow-[0_16px_40px_rgba(0,166,255,0.15)] group cursor-pointer transition-all duration-300 hover:border-[#00A6FF] hover:shadow-[0_20px_50px_rgba(0,166,255,0.25)]"
                >

                  {/* DEMANDFLOW Application Top Chrome Bar */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface dark:bg-slate-900 border-b border-border dark:border-white/10 select-none">
                    {/* macOS Style Window Control Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    {/* URL / Path Pill */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-background dark:bg-slate-950/80 border border-border dark:border-white/10 text-[11px] font-mono text-text-secondary dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-text-secondary dark:text-slate-300">demandflow.tarajglobal.com</span>
                      <span className="text-slate-500">/bridge/live</span>
                    </div>

                    {/* Fullscreen & Explore Action */}
                    <div className="flex items-center gap-2">
                      {activeLayer.num === '01' ? (
                        <Link
                          to="/demandflow-bridge"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00A6FF]/20 hover:bg-[#00A6FF]/30 border border-[#00A6FF]/40 text-[#00A6FF] text-[11px] font-mono font-bold transition-colors"
                        >
                          <span>Explore Platform</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-[10px] font-mono font-bold tracking-wider text-text-secondary dark:text-slate-400 uppercase hidden md:inline">
                          Click to expand
                        </span>
                      )}
                      <div className="w-6 h-6 rounded-md bg-surface/80 dark:bg-white/5 flex items-center justify-center text-text-secondary dark:text-slate-400 group-hover:text-white group-hover:bg-[#00A6FF]/20 transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Image Viewport (16:9 Aspect Ratio) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-background dark:bg-slate-950">
                    <img
                      src={activeLayer.image}
                      alt={`${activeLayer.title} - DemandFlow Bridge Platform Screen`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Subtle Gradient Shadow for bottom readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-background dark:bg-slate-950/90 backdrop-blur-md border border-border dark:border-white/15 text-[10.5px] font-mono font-bold text-text-primary dark:text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[#00A6FF]">{activeLayer.module}</span>
                      {activeLayer.subLabel && (
                        <span className="text-text-secondary dark:text-slate-300 font-medium hidden sm:inline">• {activeLayer.subLabel}</span>
                      )}
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono font-semibold text-text-secondary dark:text-slate-400">
                          {activeLayer.screen}
                        </span>
                        <span className="text-xs font-bold text-text-primary dark:text-white drop-shadow">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background dark:bg-black/90 backdrop-blur-md"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-background dark:bg-[#070D18] border border-border dark:border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface dark:bg-slate-900 border-b border-border dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-text-primary dark:text-white">
                    DEMANDFLOW Bridge™ — {activeLayer.screen}
                  </span>
                  <span className="hidden sm:inline px-2 py-0.5 text-xs font-mono rounded text-[#00A6FF] border border-[#00A6FF]/30">
                    {activeLayer.layer}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg bg-surface/90 dark:bg-white/10 hover:bg-white/20 text-text-secondary dark:text-slate-300 hover:text-text-primary dark:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Full-Width Image */}
              <div className="relative max-h-[80vh] overflow-auto bg-background dark:bg-black flex items-center justify-center">
                <img
                  src={activeLayer.image}
                  alt={`${activeLayer.title} Full View`}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface dark:bg-slate-900 border-t border-border dark:border-white/10 text-xs font-mono text-text-secondary dark:text-slate-400">
                <span>{activeLayer.desc}</span>
                <span className="text-[#00A6FF] font-bold">{activeLayer.metric}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WhatTarajDelivers
