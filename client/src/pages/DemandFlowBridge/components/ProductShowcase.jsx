import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2,
  X,
  Layers,
  Activity,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const SHOWCASE_TABS = [
  {
    id: 'admin',
    label: 'Main Dashboard',
    tag: 'Executive Overview',
    module: 'Operations Control Center',
    metric: '49 Live Campaigns • 84 Daily Target',
    image: '/demandflow-admin.png',
    desc: 'High-level operational overview summarizing team activity, active campaign pacing, and company-wide performance.',
  },
  {
    id: 'dbms',
    label: 'CRM & DBMS',
    tag: 'Data Architecture',
    module: 'Assignment, Touch & CDQA Center',
    metric: '1,055 Verified Records • CDQA Approved',
    image: '/demandflow-dbms.png',
    desc: 'Structured database management system tracking decision-maker accounts, direct dials, and data hygiene.',
  },
  {
    id: 'qualification',
    label: 'Lead Management',
    tag: 'Lead Qualification',
    module: 'Lead QA & Qualification Center',
    metric: '765 Qualified • 94.2% BANT Ready',
    image: '/demandflow-qualification.png',
    desc: 'Automated evaluation scoring leads by budget authority, organizational need, and active evaluation timelines.',
  },
  {
    id: 'sequences',
    label: 'Sales Sequences',
    tag: 'Outreach Workflows',
    module: 'Email Cadence & Sequence Engine',
    metric: '99.4% Deliverability • 4-Step Architecture',
    image: '/demandflow-sequences.png',
    desc: 'Multi-touch SDR outreach cadences designed for sustained prospect engagement and automated follow-ups.',
  },
  {
    id: 'personalization',
    label: 'AI Personalization',
    tag: 'Dynamic Variables',
    module: 'Dynamic Personalization & ICP Variables',
    metric: '95.5% Match Rate • A/B Conversion Lift',
    image: '/demandflow-personalization.png',
    desc: 'Dynamic template personalization mapping buyer pain points and company firmographics into customized messaging.',
  },
  {
    id: 'campaigns',
    label: 'Campaign Operations',
    tag: 'Execution Engine',
    module: 'Campaign Operations & Pacing Board',
    metric: 'Live Allocation • 100% Pacing Tracking',
    image: '/demandflow-campaigns.png',
    desc: 'Real-time allocation board monitoring client deliverables, SLA timelines, and cross-team execution velocity.',
  },
  {
    id: 'tracking',
    label: 'Reports & Analytics',
    tag: 'Response Telemetry',
    module: 'Response Telemetry & Intent Analytics',
    metric: '24.8K Opens • 842 Positive Replies',
    image: '/demandflow-tracking.png',
    desc: 'Centralized analytics capturing open rates, click-throughs, positive sentiment responses, and conversion signals.',
  },
]

const ProductShowcase = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentTab = SHOWCASE_TABS[activeIdx]

  return (
    <section
      id="showcase"
      className="relative py-16 sm:py-20 lg:py-24 bg-surface border-t border-b border-border transition-colors duration-300"
      aria-label="Product Showcase"
    >
      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary mb-3.5 backdrop-blur-md"
          >
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Actual Product Views
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-text-primary mb-4"
          >
            See DemandFlow Bridge{' '}
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              in Action
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Inspect real application modules from our production environment. Click on any module tab below to switch views or expand for full-resolution inspection.
          </motion.p>
        </div>

        {/* Horizontal Controlled Tab Rail */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {SHOWCASE_TABS.map((tab, idx) => {
            const isActive = idx === activeIdx

            return (
              <button
                key={tab.id}
                onClick={() => setActiveIdx(idx)}
                className={`
                  px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer border
                  ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-102'
                      : 'bg-background text-text-secondary border-border hover:border-primary/40 hover:text-text-primary'
                  }
                `}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Active Screenshot Presentation in Premium Browser Frame */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-[#0B1424] shadow-2xl group transition-all duration-300 hover:border-primary/50"
            >
              {/* Chrome Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>demandflow.tarajglobal.com</span>
                  <span className="text-slate-500">/{currentTab.id}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors text-xs font-mono cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Inspect Fullscreen</span>
                </button>
              </div>

              {/* Viewport with Click to Zoom */}
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={currentTab.image}
                  alt={`${currentTab.label} - DemandFlow Bridge Platform Screen`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Label */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-primary">{currentTab.module}</span>
                </div>

                {/* Floating Bottom Status Strip */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                  <span className="text-slate-300">{currentTab.desc}</span>
                  <span className="text-primary font-bold">{currentTab.metric}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Zoom Inspect Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl w-full bg-[#070D18] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10">
                  <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>DemandFlow Bridge™ — {currentTab.label}</span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative max-h-[75vh] overflow-auto bg-black flex items-center justify-center p-2">
                  <img
                    src={currentTab.image}
                    alt={currentTab.label}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="px-4 py-2.5 bg-slate-900 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{currentTab.desc}</span>
                  <span className="text-primary font-bold">{currentTab.metric}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default ProductShowcase
