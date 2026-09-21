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
    layer: '01 — PLATFORM',
    title: 'DemandFlow Bridge — Central Command',
    shortTitle: 'Platform',
    tag: 'CENTRALIZED CRM & WORKFLOW INTELLIGENCE',
    module: 'DemandFlow Bridge — Central Command',
    subLabel: 'Unified Demand Operations Platform',
    screen: 'Centralized Prospect Data & Campaign Command',
    metric: 'ONE PLATFORM • MULTIPLE OPERATIONS • REAL-TIME CONTROL',
    desc: 'An integrated CRM and workflow intelligence platform powering account intelligence, engagement activity, intent signals, lead qualification, and pipeline reporting.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      'CRM & Verified Prospect Database',
      'Multi-Stakeholder Workflow & Role Alignment',
      'Closed-Loop Revenue Velocity Reporting',
      'Centralized Campaign Command & Budget Pacing',
    ],
  },
  {
    num: '02',
    layer: '02 — AUDIENCE',
    title: 'DemandFlow Bridge — Audience Intelligence',
    shortTitle: 'Audience',
    tag: 'ICP & BUYING COMMITTEE MAPPING',
    module: 'DemandFlow Bridge — Audience Intelligence',
    subLabel: 'Target Account Intelligence Center',
    screen: 'Account Identification & Decision-Maker Matching',
    metric: '100% ICP VALIDATION • VERIFIED BUYING COMMITTEES',
    desc: 'Map ideal customer profiles to isolate verified accounts and senior decision-makers in your target addressable market.',
    icon: ShieldCheck,
    image: '/demandflow-dbms.png',
    points: [
      'Firmographic, technographic & revenue filtering',
      'Verified job title & buying committee taxonomy',
      'Target Account List (TAL) mapping & enrichment',
      'Continuous contact data hygiene & deduplication',
    ],
  },
  {
    num: '03',
    layer: '03 — CADENCE',
    title: 'DemandFlow Bridge — Multi-Channel Cadence',
    shortTitle: 'Cadence',
    tag: 'OMNICHANNEL OUTREACH WORKFLOWS',
    module: 'DemandFlow Bridge — Cadence Engine',
    subLabel: 'Multi-Touch Outreach Operations',
    screen: 'Synchronized Multi-Touch Outreach Operations',
    metric: '99.4% INBOX PLACEMENT • MULTI-CHANNEL CADENCE',
    desc: 'Deploy synchronized outreach across email, LinkedIn, and content syndication to capture target buyer attention.',
    icon: MailCheck,
    image: '/demandflow-sequences.png',
    points: [
      'Synchronized email, social & syndication touchpoints',
      'Automated follow-up logic & response tracking',
      'Deliverability & sender reputation optimization',
      'A/B testing of messaging angles & offer formats',
    ],
  },
  {
    num: '04',
    layer: '04 — ENGAGEMENT',
    title: 'DemandFlow Bridge — Buyer Engagement',
    shortTitle: 'Engagement',
    tag: 'INTERACTION & CONTENT TELEMETRY',
    module: 'DemandFlow Bridge — Engagement Tracker',
    subLabel: 'Buyer Interaction Analytics',
    screen: 'Buyer Interaction Analytics & Signal Scoring',
    metric: 'REAL-TIME SIGNAL TELEMETRY • HIGH-INTENT INTERACTIONS',
    desc: 'Track how target buyers interact with your content, emails, and collateral in real-time across channels.',
    icon: Sparkles,
    image: '/demandflow-personalization.png',
    points: [
      'Multi-touch content consumption & download tracking',
      'Engagement duration & interaction depth scoring',
      'Account-level aggregate engagement indexing',
      'Dynamic retargeting based on reading behavior',
    ],
  },
  {
    num: '05',
    layer: '05 — INTENT',
    title: 'DemandFlow Bridge — Intent Radar',
    shortTitle: 'Intent',
    tag: 'FIRST & THIRD-PARTY SURGE SIGNALS',
    module: 'DemandFlow Bridge — Intent Radar',
    subLabel: 'Active Buyer Intent Matrix',
    screen: 'Active Buyer Intent Matrix & Surge Radar',
    metric: 'SURGE DETECTION • IN-MARKET TIMELINE TRACKING',
    desc: 'Isolate accounts demonstrating active research, vendor comparison, and buying evaluation surges in your category.',
    icon: Gauge,
    image: '/demandflow-tracking.png',
    points: [
      'Topic search & keyword surge detection across B2B networks',
      'Vendor comparison & category intent tracking',
      'Buying stage classification from Awareness to Decision',
      'Prioritized notification of in-market target accounts',
    ],
  },
  {
    num: '06',
    layer: '06 — NURTURING',
    title: 'DemandFlow Bridge — Automated Nurture',
    shortTitle: 'Nurture',
    tag: 'LIFECYCLE PIPELINE ACCELERATION',
    module: 'DemandFlow Bridge — Nurture Automations',
    subLabel: 'Lifecycle Nurture Workflows',
    screen: 'Adaptive Lifecycle Nurturing & Dynamic Cadences',
    metric: 'ZERO LEAKAGE • PERSISTENT BUYER RELATIONSHIPS',
    desc: 'Keep non-sales-ready prospects engaged with automated, educational touchpoints that build credibility and buyer affinity.',
    icon: TrendingUp,
    image: '/demandflow-campaigns.png',
    points: [
      'Behavioral trigger-based content drops & invitations',
      'Role-specific educational journeys addressing friction',
      'Automated re-engagement of dormant marketing leads',
      'Seamless escalation when buying intent spikes',
    ],
  },
  {
    num: '07',
    layer: '07 — QUALIFICATION',
    title: 'DemandFlow Bridge — Sales Qualification & Routing',
    shortTitle: 'Qualification',
    tag: 'BANT VALIDATION & CRM SYNC',
    module: 'DemandFlow Bridge — Lead Scorer & Sync',
    subLabel: 'Multi-Parameter Lead Validation',
    screen: 'BANT Criteria & Lead Score Verification Board',
    metric: 'SALES-READY VALIDATION • DIRECT CRM ROUTING',
    desc: 'Score and validate leads against rigorous BANT criteria and automatically route sales-ready opportunities directly into your CRM.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      'BANT & customized qualification verification',
      'Budget authority & buying committee confirmation',
      'Native sync with HubSpot, Salesforce & Pipedrive',
      'Real-time rep routing & meeting scheduling',
    ],
  },
]

const WhatTarajDelivers = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)
  const tabRailRef = useRef(null)

  // 1. Auto-advance active layer every 3.5s unless paused/reduced motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return

    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ENGINE_LAYERS.length)
    }, 3500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, prefersReducedMotion])

  // 2. Center active tab in scrollable rail for smaller screens
  useEffect(() => {
    if (tabRailRef.current) {
      const activeTab = tabRailRef.current.querySelector(`[data-tab-idx="${activeIdx}"]`)
      if (activeTab) {
        const railLeft = tabRailRef.current.getBoundingClientRect().left
        const tabLeft = activeTab.getBoundingClientRect().left
        const offset = tabLeft - railLeft - tabRailRef.current.clientWidth / 2 + activeTab.clientWidth / 2
        tabRailRef.current.scrollBy({ left: offset, behavior: 'smooth' })
      }
    }
  }, [activeIdx])

  // 3. Escape key closes zoom modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const activeLayer = ENGINE_LAYERS[activeIdx]

  return (
    <section
      id="demandflow-bridge"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="How DemandFlow Bridge Supports Demand Generation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
        <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Proprietary Platform Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span className="block text-slate-900 dark:text-white whitespace-normal sm:whitespace-nowrap">
              How DemandFlow Bridge
            </span>
            <span className="block text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)] whitespace-normal sm:whitespace-nowrap">
              Supports Demand Generation
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            DemandFlow Bridge centralizes prospect data, engagement, intent, qualification, and campaign performance in one streamlined workflow.
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
                        key={`bar-dg-${idx}-${activeIdx}`}
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#00A6FF] text-white hover:bg-[#00A6FF]/90 shadow-md shadow-[#00A6FF]/20 hover:shadow-[#00A6FF]/35 transition-all duration-300 hover:-translate-y-0.5 group"
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
                        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase hidden md:inline">
                          Click to expand
                        </span>
                      )}
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
                      {activeLayer.subLabel && (
                        <span className="text-slate-300 font-medium hidden sm:inline">• {activeLayer.subLabel}</span>
                      )}
                    </div>

                    {/* Bottom Status Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-slate-400">View:</span>
                        <span className="text-white font-medium truncate">{activeLayer.screen}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Connected</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* ── FULLSCREEN LIGHTBOX MODAL (Click-to-Expand) ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl cursor-default"
            >
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-300 ml-2">
                    {activeLayer.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/demandflow-bridge"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#00A6FF]/20 border border-[#00A6FF]/40 text-[#00A6FF] hover:bg-[#00A6FF]/30 transition-colors"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsZoomed(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close Preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* High-Res Fullscreen View */}
              <div className="relative aspect-[16/9] w-full bg-slate-950">
                <img
                  src={activeLayer.image}
                  alt={`${activeLayer.title} - DemandFlow Bridge Full View`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Bottom Bar */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-[#00A6FF] font-semibold">{activeLayer.tag}</span>
                <span>Press ESC or click outside to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WhatTarajDelivers
