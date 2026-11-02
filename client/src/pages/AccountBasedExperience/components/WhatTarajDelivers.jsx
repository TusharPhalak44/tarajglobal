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
  Users,
} from 'lucide-react'

const ENGINE_LAYERS = [
  {
    num: '01',
    layer: '01 — Intelligence',
    title: 'DemandFlow Bridge — Account Intelligence',
    shortTitle: 'BUYER JOURNEY ARCHITECTURE',
    tag: 'BUYER JOURNEY ARCHITECTURE',
    module: 'DemandFlow Bridge — Journey Architecture',
    screen: 'Account Journey Blueprint & Stage Orchestration Console',
    metric: 'One Shared Playbook • 100% Revenue Team Alignment',
    desc: 'Without a shared journey, every team improvises its own next step. We map the stages each committee moves through and define the message, asset, and channel for every moment, so marketing, SDRs, and sales run one playbook.',
    icon: Layers,
    image: '/demandflow-admin.png',
    points: [
      '✔ Buying stages mapped from awareness to active evaluation',
      '✔ Message, asset, and channel defined for each stage and role',
      '✔ Shared stage definitions agreed with sales leadership',
    ],
  },
  {
    num: '02',
    layer: '02 — Intent Telemetry',
    title: ' DemandFlow Bridge: Behavioral Signals & Intent Telemetry',
    shortTitle: 'STAKEHOLDER INTELLIGENCE',
    tag: 'STAKEHOLDER INTELLIGENCE & VERIFICATION',
    module: 'DemandFlow Bridge — Stakeholder Intelligence',
    screen: 'Stakeholder Matrix & In-House Data Verification Console',
    metric: '99.8% Data Accuracy SLA • Zero-Bounce SMTP Verification',
    desc: 'A well-designed journey fails if it bounces or reaches the wrong person. Every stakeholder profile is validated by our AI-assisted, in-house verification tool, backed by our 99.8% Data Accuracy SLA, so each touch lands with the right role.',
    icon: Users,
    image: '/demandflow-dbms.png',
    points: [
      '✔ Champions, economic buyers, and evaluators profiled by role and priority',
      '✔ Zero-bounce SMTP validation and verified direct dials',
      '✔ Continuous deduplication so no stakeholder is contacted twice by different teams',
    ],
  },
  {
    num: '03',
    layer: '03 — Narrative',
    title: 'DemandFlow Bridge: Stage-Aware Content Sequencing',
    shortTitle: 'BEHAVIORAL & INTENT SIGNALS',
    tag: 'BEHAVIORAL SIGNALS & INTENT RADAR',
    module: 'DemandFlow Bridge: Behavioral Signals & Intent Telemetry',
    screen: 'Real-Time Intent Telemetry & Active Buying Windows',
    metric: 'First & Third-Party Telemetry • Instant Surge Alerts',
    desc: 'A fixed sequence can’t respond to a committee that suddenly turns active. AI-assisted intent and engagement signals show where each account sits in its journey, so the next touch matches what the buyer is doing.',
    icon: Activity,
    image: '/demandflow-tracking.png',
    points: [
      '✔ Topic surge and vendor-comparison detection across B2B networks',
      '✔ First-party engagement tracking on emails, content, and web touchpoints',
      '✔ Journey-stage updates triggered when account behavior changes',
    ],
  },
  {
    num: '04',
    layer: '04 — Orchestration',
    title: 'DemandFlow Bridge: Stage-Aware Content Sequencing',
    shortTitle: 'STAGE-AWARE CONTENT',
    tag: 'STAGE-AWARE CONTENT SEQUENCING',
    module: 'DemandFlow Bridge — Content Sequencing',
    screen: 'Stage-Aware Content Matrix & Collateral Sequencing Engine',
    metric: 'Role-Calibrated Content Tracks • Stage-Based Offers',
    desc: ' Sending an evaluation-stage asset to a buyer still defining the problem loses trust. Content, offers, and executive briefings are sequenced by stage and role, so every asset answers the question the committee is asking now.',
    icon: Sparkles,
    image: '/demandflow-personalization.png',
    points: [
      '✔ Role-specific content tracks for technical, financial, and executive stakeholders',
      '✔ Stage-based offers, from educational assets to evaluation-ready briefings',
      '✔ A/B testing of angles and formats within each stage',
    ],
  },
  {
    num: '05',
    layer: '05 — Verification',
    title: ' DemandFlow Bridge: Cross-Channel Experience Orchestration',
    shortTitle: 'CROSS-TEAM ORCHESTRATION',
    tag: 'CROSS-CHANNEL EXPERIENCE ORCHESTRATION',
    module: 'DemandFlow Bridge — Omnichannel Orchestration',
    screen: 'Multi-Touch Executive Engagement & Aircover Dispatch',
    metric: 'Synchronized Email, LinkedIn & Tele-Connect • 14–21 Day Sprints',
    desc: 'AEs who inherit an account with no history force buyers to repeat themselves. Every handoff carries the full touch history, documented priorities, and committee map, with discovery meetings booked on AE calendars.',
    icon: Share2,
    image: '/demandflow-campaigns.png',
    points: [
      '✔ One shared cadence across marketing and SDR touches',
      '✔ Live conversations by senior SDRs across 14–21 day sprints, never automated bot forms',
      '✔ Touch limits and sequencing rules that prevent duplicate outreach',
    ],
  },
  {
    num: '06',
    layer: '06 — CRM Handoff',
    title: ' DemandFlow Bridge: Experience Dossiers & Meeting Handoff',
    shortTitle: 'EXPERIENCE HANDOFF',
    tag: 'EXPERIENCE DOSSIERS & AE HANDOFF',
    module: 'DemandFlow Bridge — Experience Dossiers & Delivery',
    screen: 'Account Dossier & AE Meeting Handoff Protocol',
    metric: 'Complete Touch History Attached • Cal-Ready AE Handoff',
    desc: 'AEs who inherit an account with no history force buyers to repeat themselves. Every handoff carries the full touch history, documented priorities, and committee map, with discovery meetings booked on AE calendars.',
    icon: FileCheck,
    image: '/demandflow-sequences.png',
    points: [
      '✔ Complete touch history and engagement trail per stakeholder',
      '✔ Documented pain points, priorities, and installed tech stack',
      '✔ Discovery meetings booked directly on AE calendars',
    ],
  },
  {
    num: '07',
    layer: '07',
    title: ' DemandFlow Bridge: Experience Telemetry & Revenue Attribution',
    shortTitle: 'EXPERIENCE ANALYTICS',
    tag: 'EXPERIENCE TELEMETRY & REVENUE ATTRIBUTION',
    module: 'DemandFlow Bridge — Experience Telemetry & Attribution',
    screen: 'Closed-Loop Revenue Attribution & Pipeline Velocity Analytics',
    metric: 'Account-Level Attribution • 99.8% Data Accuracy SLA',
    desc: ' If you can’t see which touches moved an account forward, you can’t improve the journey. CRM sync links every interaction to opportunity progress and pipeline velocity, backed by our 99.8% Data Accuracy SLA.',
    icon: BadgeCheck,
    image: '/demandflow-qualification.png',
    points: [
      '✔ Native field mapping for Salesforce and HubSpot, plus custom API integrations',
      '✔ Touch-to-opportunity attribution tracked at the account level',
      '✔ Bi-weekly journey reviews with your sales and marketing leadership',
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
      id="what-taraj-delivers-abx"
      className="relative py-8 sm:py-10 lg:py-12 overflow-hidden bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-text-primary dark:text-white border-t border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300"
      aria-label="What Does Taraj Global Deliver for ABX"
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
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 mb-2.5">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              PROPRIETARY ABX DELIVERY ENGINE

            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight uppercase">
            <span className="text-slate-900 dark:text-text-primary dark:text-white">WHAT DOES TARAJ GLOBAL </span>
            <div className="text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
              DELIVER IN ABX
            </div>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
            Stop making buying committees repeat themselves to every team. TaRaj Global delivers one orchestrated account journey, scored by AI-assisted intent signals, verified in-house, and handed to sales with full context via DemandFlow Bridge.

          </p>
        </div>

        <div className="relative rounded-3xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#0B1424] border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

          {/* Stepper Rail */}
          <div
            ref={tabRailRef}
            className="overflow-x-auto pt-2 pb-3 mb-5 px-1 scrollbar-none border-b border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-stretch justify-between min-w-[880px] lg:min-w-full gap-1.5 py-1">
              {ENGINE_LAYERS.map((layer, idx) => {
                const Icon = layer.icon
                const isActive = idx === activeIdx

                return (
                  <button
                    key={layer.num}
                    data-tab-idx={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative flex-1 min-w-[115px] sm:min-w-[125px] lg:min-w-0 flex flex-col items-center py-2.5 px-1 sm:px-1.5 rounded-xl transition-all duration-300 cursor-pointer ${isActive
                      ? 'bg-sky-50 dark:bg-[#0A1D3A] text-[#00A6FF] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-all duration-300 ${isActive
                        ? 'bg-[#00A6FF] text-white shadow-md shadow-[#00A6FF]/30 scale-105'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:scale-105'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase mb-0.5 opacity-80">
                      {layer.num}
                    </span>
                    <div className="w-full min-h-[30px] flex items-center justify-center px-0.5">
                      <span className="text-[10px] sm:text-[10.5px] md:text-[11px] font-bold tracking-tight text-center leading-tight whitespace-normal">
                        {layer.shortTitle}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderlineAbx"
                        className="absolute -bottom-3 left-2 right-2 h-[2.5px] bg-[#00A6FF] rounded-full shadow-[0_0_10px_#00A6FF]"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Layer Content Box */}
          <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-center">
            {/* Left 6 cols: Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-[#00A6FF]/10 border border-[#00A6FF]/30 text-[#00A6FF] text-[11px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
                <span>{activeLayer.tag}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {activeLayer.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {activeLayer.desc}
              </p>

              <div className="space-y-2.5 pt-1">
                {activeLayer.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <Check className="w-4 h-4 text-[#00A6FF] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 cols: Platform Screen Image Preview */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-[#060D19] shadow-xl group">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[320px]">
                    {activeLayer.screen}
                  </span>
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="p-1 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                    title="Zoom Screenshot"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeLayer.image}
                      src={activeLayer.image}
                      alt={activeLayer.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </AnimatePresence>
                </div>

                <div className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-sky-400">
                    {activeLayer.metric}
                  </span>
                  <span className="text-[9.5px] font-mono text-slate-400">DemandFlow v4.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom View */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-[#0A1222] border border-white/20 shadow-2xl p-2">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={activeLayer.image} alt={activeLayer.title} className="w-full h-auto max-h-[82vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </section>
  )
}

export default WhatTarajDelivers

