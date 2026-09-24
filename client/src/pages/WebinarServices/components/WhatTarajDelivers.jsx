import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  Activity,
  ArrowRight,
  Video,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: '01 — STRATEGY',
    title: 'DemandFlow Bridge — Webinar Strategy',
    shortTitle: 'Strategy',
    tag: 'GOALS & AUDIENCE ALIGNMENT',
    module: 'DemandFlow Bridge — Webinar Strategy',
    subLabel: 'Session Architecture & Topic Engine',
    screen: 'Webinar Campaign Architecture & Goal Matrix',
    metric: 'PRECISION AUDIENCE BLUEPRINT • HIGH-CONVERTING TOPICS',
    desc: 'Align session themes, target ICPs, and commercial goals to drive executive interest.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      'Commercial goal setting & ICP definition',
      'Value-driven topic & agenda formulation',
      'Multi-stakeholder messaging framework',
      'Speaker briefing & presentation structure',
    ],
  },
  {
    num: '02',
    layer: '02 — TARGETING',
    title: 'DemandFlow Bridge — Audience Targeting',
    shortTitle: 'Targeting',
    tag: 'ICP & FIRMOGRAPHIC FILTERING',
    module: 'DemandFlow Bridge — Audience Selector',
    subLabel: 'B2B Account & Persona Mapping',
    screen: 'Audience Segmentation & Account Match Radar',
    metric: 'VERIFIED DECISION-MAKERS • ZERO AUDIENCE WASTE',
    desc: 'Isolate target companies and senior personas that match your precise customer profile.',
    icon: ShieldCheck,
    image: '/demandflow-dbms.png',
    points: [
      'Firmographic & revenue tier filtering',
      'Verified job title & department taxonomy',
      'Active buyer intent topic triggers',
      'Clean prospect database validation',
    ],
  },
  {
    num: '03',
    layer: '03 — OUTREACH',
    title: 'DemandFlow Bridge — Decision-Maker Outreach',
    shortTitle: 'Outreach',
    tag: '1:1 EXECUTIVE ENGAGEMENT',
    module: 'DemandFlow Bridge — Executive Outreach',
    subLabel: 'Personalized Invite Sequences',
    screen: 'Executive Invitation Cadence & Touchpoint Control',
    metric: '99.4% DELIVERABILITY • 1:1 INVITATION CADENCE',
    desc: 'Reach relevant stakeholders directly using tailored invitations that cut through noise.',
    icon: MailCheck,
    image: '/demandflow-sequences.png',
    points: [
      'Multi-touch executive invite sequences',
      'Personalized value propositions by seniority',
      'Strategic follow-up cadences',
      'Deliverability & sender reputation monitoring',
    ],
  },
  {
    num: '04',
    layer: '04 — PROMOTION',
    title: 'DemandFlow Bridge — Webinar Promotion',
    shortTitle: 'Promotion',
    tag: 'MULTI-CHANNEL DISTRIBUTION',
    module: 'DemandFlow Bridge — Promotion Engine',
    subLabel: 'Multi-Channel Campaign Dispatch',
    screen: 'Omnichannel Campaign Promotion & Channel Pacing',
    metric: 'SYNCHRONIZED CAMPAIGNS • OMNICHANNEL VISIBILITY',
    desc: 'Deploy synchronized multi-channel promotion across email, LinkedIn, and partner feeds.',
    icon: Sparkles,
    image: '/demandflow-personalization.png',
    points: [
      'Cross-channel promotional synchronization',
      'Dynamic ad and organic outreach integration',
      'Executive social network activation',
      'Continuous registration pacing optimization',
    ],
  },
  {
    num: '05',
    layer: '05 — REGISTRATION',
    title: 'DemandFlow Bridge — Registration Generation',
    shortTitle: 'Registration',
    tag: 'HIGH-FIT REGISTRANT CAPTURE',
    module: 'DemandFlow Bridge — Registration Hub',
    subLabel: 'Custom Screening & Opt-In Gates',
    screen: 'Live Registration Tracker & Screening Approval',
    metric: '100% ICP VALIDATED • ZERO UNQUALIFIED SIGNUPS',
    desc: 'Drive high-volume, verified registrations backed by custom business qualification gates.',
    icon: Gauge,
    image: '/demandflow-campaigns.png',
    points: [
      'Frictionless custom landing experiences',
      'Mandatory corporate domain verification',
      'Custom screening question capture',
      'Automated confirmation & calendar holds',
    ],
  },
  {
    num: '06',
    layer: '06 — ENGAGEMENT',
    title: 'DemandFlow Bridge — Attendee Engagement',
    shortTitle: 'Engagement',
    tag: 'SESSION PARTICIPATION & SIGNALS',
    module: 'DemandFlow Bridge — Engagement Tracker',
    subLabel: 'Live Interaction & Telemetry',
    screen: 'Attendee Heatmap & Interaction Telemetry Board',
    metric: 'REAL-TIME PARTICIPATION • POLLS & CHAT ACTIVITY',
    desc: 'Capture live interaction, poll responses, questions, and duration of attendee stay.',
    icon: TrendingUp,
    image: '/demandflow-tracking.png',
    points: [
      'Session attendance duration tracking',
      'Interactive poll and Q&A telemetry',
      'Content resource download logging',
      'In-session buying signal identification',
    ],
  },
  {
    num: '07',
    layer: '07 — QUALIFICATION',
    title: 'DemandFlow Bridge — Lead Qualification',
    shortTitle: 'Qualification',
    tag: 'SCORING & BANT EVALUATION',
    module: 'DemandFlow Bridge — Qualification Matrix',
    subLabel: 'Multi-Signal Lead Scoring',
    screen: 'Lead Qualification & Readiness Dashboard',
    metric: '94.6% BANT COMPLIANCE • SALES-READY SCORING',
    desc: 'Score attendees by engagement depth, corporate authority, and declared project timing.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      'Multi-signal engagement scoring algorithms',
      'BANT and project timeframe validation',
      'Attended vs no-show segment prioritization',
      'High-intent commercial trigger alerts',
    ],
  },
  {
    num: '08',
    layer: '08 — INTELLIGENCE',
    title: 'DemandFlow Bridge — Prospect Intelligence',
    shortTitle: 'Intelligence',
    tag: 'DEEP ACCOUNT DOSSIERS',
    module: 'DemandFlow Bridge — Dossier Generator',
    subLabel: 'Executive Briefings & Question Logs',
    screen: 'Attendee Dossier & Engagement Audit Profile',
    metric: 'DEEP DOSSIERS • QUESTION LOGS • PAIN POINT MAPPING',
    desc: 'Deliver rich attendee dossiers that equip sales reps with specific discussion context.',
    icon: Cpu,
    image: '/demandflow-admin.png',
    points: [
      'Complete attendee activity audit trails',
      'Specific questions asked during the session',
      'Company tech stack and organizational context',
      'Actionable discussion starters for sales calls',
    ],
  },
  {
    num: '09',
    layer: '09 — HANDOFF',
    title: 'DemandFlow Bridge — Sales Handoff & Pipeline Integration',
    shortTitle: 'Sales Handoff',
    tag: 'CRM SYNC & DISCOVERY CALLS',
    module: 'DemandFlow Bridge — Pipeline Router',
    subLabel: 'Instant CRM Integration & Cadence',
    screen: 'Direct CRM Pipeline Routing & Opportunity Sync',
    metric: 'INSTANT CRM SYNC • WARM MEETING BOOKING',
    desc: 'Seamlessly transfer qualified leads into your CRM and initiate warm post-webinar outreach.',
    icon: Video,
    image: '/demandflow-sequences.png',
    points: [
      'Instant bi-directional CRM integration (Salesforce, HubSpot)',
      'Automated sales rep notification & lead routing',
      'Pre-built post-event follow-up email sequences',
      'Pipeline attribution & deal velocity tracking',
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
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-200 dark:border-[#00A6FF]/30 bg-white/90 dark:bg-[#0A1426]/90 backdrop-blur-md mb-2.5 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#00A6FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">
              Proprietary Campaign Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-white">What Does Taraj Global </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
              Deliver?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Taraj Global delivers high-impact B2B webinar campaigns powered by DemandFlow Bridge, converting verified registrations into qualified opportunities.
          </p>
        </div>

        {/* ── Unified Command Theater ── */}
        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* Stepper Rail */}
          <div
            ref={tabRailRef}
            className="overflow-x-auto pt-2 pb-3 mb-5 px-1 scrollbar-none border-b border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center justify-between min-w-[880px] gap-1.5 py-1">
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
                      className={`text-[11px] font-bold tracking-tight whitespace-nowrap ${
                        isActive
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

          {/* Interactive Content & DemandFlow Bridge Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[340px]"
            >
              {/* Left Column (6 Cols) */}
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

                <div className="inline-flex items-center gap-2 pt-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    System State: <strong className="text-emerald-500 font-semibold">{activeLayer.metric}</strong>
                  </span>
                </div>

                {/* Direct CTA link for DemandFlow Bridge platform - only for stage 01 */}
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

              {/* Right Column (6 Cols) */}
              <div className="lg:col-span-6">
                <div 
                  onClick={() => setIsZoomed(true)}
                  className="relative rounded-2xl overflow-hidden border border-slate-300/80 dark:border-[#00A6FF]/30 bg-[#060D19] shadow-xl dark:shadow-[0_16px_40px_rgba(0,166,255,0.15)] group cursor-pointer transition-all duration-300 hover:border-[#00A6FF] hover:shadow-[0_20px_50px_rgba(0,166,255,0.25)]"
                >
                  <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900 border-b border-white/10 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950/80 border border-white/10 text-[11px] font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-slate-300">demandflow.tarajglobal.com</span>
                      <span className="text-slate-500">/bridge/live</span>
                    </div>

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

                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src={activeLayer.image}
                      alt={`${activeLayer.title} - DemandFlow Bridge Platform Screen`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-white/15 text-[10.5px] font-mono font-bold text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[#00A6FF]">{activeLayer.module}</span>
                      {activeLayer.subLabel && (
                        <span className="text-slate-300 font-medium hidden sm:inline">• {activeLayer.subLabel}</span>
                      )}
                    </div>

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

      {/* Full Resolution Inspect Modal */}
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
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-[#070D18] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-sm font-bold text-white">
                    DemandFlow Bridge™ — {activeLayer.screen}
                  </span>
                  <span className="hidden sm:inline px-2 py-0.5 text-xs font-mono rounded bg-[#00A6FF]/20 text-[#00A6FF] border border-[#00A6FF]/30">
                    {activeLayer.layer}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative max-h-[80vh] overflow-auto bg-black flex items-center justify-center">
                <img
                  src={activeLayer.image}
                  alt={`${activeLayer.title} Full View`}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900 border-t border-white/10 text-xs font-mono text-slate-400">
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
