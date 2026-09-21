import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import {
  Layers,
  ShieldCheck,
  Search,
  MailCheck,
  TrendingUp,
  LineChart,
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
    title: 'DemandFlow Bridge',
    shortTitle: 'Platform',
    tag: 'CRM & WORKFLOW INTELLIGENCE',
    module: 'DemandFlow Bridge',
    subLabel: 'Proprietary Intelligence Platform',
    screen: 'Unified Operations & Intelligence Center',
    metric: 'CENTRALIZED PROSPECT DATA • REAL-TIME VISIBILITY',
    desc: 'Centralize prospect data, engagement activity, intent signals, lead scoring, qualification, and campaign performance in one intelligent layer.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      'Centralized prospect data & activity',
      'Coordinated lead nurturing workflows',
      'Real-time visibility across buyer journey',
      'Faster campaign execution cycles',
      'Unified sales & marketing alignment',
    ],
  },
  {
    num: '02',
    layer: '02 — SEGMENTATION',
    title: 'Targeted Segmentation',
    shortTitle: 'Segmentation',
    tag: 'Audience Hygiene & Grouping',
    module: 'DemandFlow Bridge — Segmentation',
    subLabel: 'Audience Hygiene & Grouping',
    screen: 'Audience Segmentation & Stage Mapping',
    metric: '100% ICP Filtered • Persona Groups',
    desc: 'Group prospects by industry, role, firmographics, and buying journey stage for tailored relevance.',
    icon: ShieldCheck,
    image: '/demandflow-dbms.png',
    points: [
      'Role & industry cluster segmentation',
      'Tech stack and firmographic filters',
      'Clean, validated contact databases',
    ],
  },
  {
    num: '03',
    layer: '03 — RESEARCH',
    title: 'Buyer Research',
    shortTitle: 'Research',
    tag: 'Account Context & Intent',
    module: 'DemandFlow Bridge — Research',
    subLabel: 'Account Context & Intent',
    screen: 'Account Intelligence & Signal Mapping',
    metric: 'Verified Contact Intelligence • Intent Signals',
    desc: 'Understand buyer context, organizational initiatives, and evaluated business challenges.',
    icon: Search,
    image: '/demandflow-sequences.png',
    points: [
      'Account-level initiative mapping',
      'Key decision-maker identification',
      'Contextual research for tailored messaging',
    ],
  },
  {
    num: '04',
    layer: '04 — OUTREACH',
    title: 'Relevant Outreach',
    shortTitle: 'Outreach',
    tag: 'Multi-Channel Cadence',
    module: 'DemandFlow Bridge — Outreach',
    subLabel: 'Multi-Channel Cadence',
    screen: 'Multi-Touch Nurture Cadence Studio',
    metric: 'Multi-Step Sequences • Timely Touchpoints',
    desc: 'Deliver thoughtful, value-first messaging across appropriate communication channels.',
    icon: MailCheck,
    image: '/demandflow-personalization.png',
    points: [
      'Multi-channel communication workflows',
      'Automated cadence management',
      'Stage-aligned educational collateral',
    ],
  },
  {
    num: '05',
    layer: '05 — ENGAGEMENT',
    title: 'Lead Engagement',
    shortTitle: 'Engagement',
    tag: 'Telemetry & Consumption',
    module: 'DemandFlow Bridge — Engagement',
    subLabel: 'Telemetry & Consumption',
    screen: 'Prospect Engagement Telemetry Board',
    metric: 'Real-Time Interaction Monitoring • Heatmaps',
    desc: 'Track opens, clicks, content consumption, and buyer interactions across all touchpoints.',
    icon: TrendingUp,
    image: '/demandflow-campaigns.png',
    points: [
      'Real-time interaction tracking',
      'Content asset engagement measurement',
      'Multi-touch engagement attribution',
    ],
  },
  {
    num: '06',
    layer: '06 — SCORING',
    title: 'Lead Scoring',
    shortTitle: 'Scoring',
    tag: 'Behavioral & Fit Score',
    module: 'DemandFlow Bridge — Scoring',
    subLabel: 'Behavioral & Fit Score',
    screen: 'Behavioral Scoring & Intent Intelligence',
    metric: 'Dynamic Scoring Algorithms • Real-Time Triggers',
    desc: 'Evaluate implicit activity and explicit fit to understand prospect sales readiness.',
    icon: LineChart,
    image: '/demandflow-tracking.png',
    points: [
      'Explicit ICP fit calculation',
      'Implicit behavioral score tracking',
      'Automated readiness threshold alerts',
    ],
  },
  {
    num: '07',
    layer: '07 — QUALIFICATION',
    title: 'Qualification & Sales Handoff',
    shortTitle: 'Handoff',
    tag: 'Sales-Ready Opportunities',
    module: 'DemandFlow Bridge — Qualification',
    subLabel: 'Sales-Ready Opportunities',
    screen: 'Sales Handoff & Dossier Routing',
    metric: '100% Sales-Ready • Full Account Dossier',
    desc: 'Pass pre-qualified opportunities directly to sales teams with actionable prospect dossiers.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      'Complete engagement history dossiers',
      'Automated CRM synchronization & routing',
      'Seamless AE calendar scheduling',
    ],
  },
]

const WhatTarajDelivers = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const tabRailRef = useRef(null)

  // Automatic progression: moves one by one continuously every 3.5 seconds
  useEffect(() => {
    if (isZoomed) return
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
      id="what-taraj-global-delivers"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Does Taraj Global Deliver"
    >
      {/* Subtle Ambient Background Illumination */}
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
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Powered by DemandFlow Bridge
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-white">What Does Taraj Global </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
              Deliver?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Taraj Global delivers targeted B2B lead nurturing powered by DemandFlow Bridge to move prospects toward sales readiness.
          </p>
        </div>

        {/* UNIFIED COMMAND THEATER */}
        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {/* Top Subtle Cyan Glow Accent Line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* 1. HORIZONTAL CONNECTED 7-STAGE STEPPER RAIL */}
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
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative flex-1 flex flex-col items-center py-2.5 px-2 rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-sky-50 dark:bg-[#0A1D3A] text-[#00A6FF] shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isActive
                            ? 'bg-[#00A6FF] shadow-[0_0_8px_#00A6FF] scale-125'
                            : 'bg-slate-300 dark:bg-white/20 group-hover:bg-slate-400'
                        }`}
                      />
                      <span className="font-mono text-[10px] font-bold tracking-wider">
                        {layer.num}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                      <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap">
                        {layer.shortTitle}
                      </span>
                    </div>

                    {/* Active Bottom Indicator Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute -bottom-3 left-3 right-3 h-[2.5px] bg-[#00A6FF] rounded-full shadow-[0_0_8px_#00A6FF]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. MAIN ACTIVE LAYER SHOWCASE */}
          <div className="grid lg:grid-cols-12 gap-5 lg:gap-7 items-center">
            {/* Left Column: Layer Overview, Description & Key Capabilities (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10.5px] font-mono font-bold text-[#00A6FF] mb-2">
                  <Activity className="w-3 h-3 text-[#00A6FF] animate-pulse" />
                  <span>{activeLayer.layer}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-snug mb-1">
                  {activeLayer.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
                  {activeLayer.desc}
                </p>

                {/* Capability Bullet Points */}
                <div className="space-y-1.5 pt-1 border-t border-slate-200/80 dark:border-white/10">
                  {activeLayer.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-sky-100 dark:bg-[#00A6FF]/15 text-[#00A6FF] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-[12.5px] text-slate-700 dark:text-slate-200 font-medium">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DemandFlow Bridge Product Link */}
              <div className="pt-2">
                <Link
                  to="/demandflow-bridge"
                  className="group inline-flex items-center gap-2 text-xs font-bold text-[#00A6FF] hover:text-sky-400 transition-colors"
                >
                  <span>Explore DemandFlow Bridge Platform</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Live Software Command Center Screenshot Preview (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-900 shadow-2xl group">
                {/* Simulated Application Window Top Chrome Bar */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-800/90 dark:bg-[#08101E] border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[10px] font-mono text-slate-400">
                      {activeLayer.module}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsZoomed(true)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    title="Enlarge screenshot view"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                </div>

                {/* Screenshot Frame with smooth fade transition */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeLayer.image}
                      src={activeLayer.image}
                      alt={`${activeLayer.title} Interface`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                      loading="lazy"
                    />
                  </AnimatePresence>

                  {/* Gradient highlight on bottom edge */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Bottom Metric Tag */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
                      <span>{activeLayer.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. BOTTOM PLATFORM BRANDING BANNER ── */}
          <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-[#00A6FF]/20 text-[#00A6FF] flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Powered by DemandFlow Bridge
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Taraj Global&apos;s proprietary CRM and workflow intelligence layer that helps centralize prospect data, engagement activity, intent signals, lead scoring, qualification, and campaign performance.
                </p>
              </div>
            </div>

            <Link
              to="/demandflow-bridge"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-sky-600 transition-colors shadow-sm shrink-0"
            >
              <span>Explore Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. FULLSCREEN SCREENSHOT PREVIEW MODAL ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsZoomed(false)}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-white">
                  {activeLayer.title} — {activeLayer.screen}
                </span>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WhatTarajDelivers
