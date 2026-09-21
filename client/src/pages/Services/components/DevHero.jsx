import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight, Layers, ShieldCheck, Zap, BarChart3, Users, Sparkles, CheckCircle2, Terminal, Activity, Database, Check } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

const PIPELINE_HUD_STAGES = [
  {
    id: 'icp-data',
    title: '01 ICP & TAM Discovery',
    tagline: 'Precision Market Intelligence',
    color: '#00A6FF',
    deliverables: ['Custom TAM Mapping', 'Technographic Signal Tracking', 'Direct-Dial Verification'],
    metric: '99.8% Data Accuracy SLA',
    status: 'ACTIVE_QUERY',
  },
  {
    id: 'outreach',
    title: '02 Multi-Touch Outreach',
    tagline: 'Personalized Omnichannel Touch',
    color: '#FF6D00',
    deliverables: ['1-on-1 Dedicated Inboxes', 'Executive LinkedIn Touchpoints', 'A/B Tested Value Copy'],
    metric: '42% Average Open Rate',
    status: 'CADENCE_STREAMING',
  },
  {
    id: 'qualification',
    title: '03 BANT Qualification',
    tagline: 'Strict Commercial Readiness',
    color: '#8B5CF6',
    deliverables: ['Confirmed Fiscal Budget', 'C-Suite Authority Proof', 'Near-Term Purchase Need'],
    metric: 'Zero-Waste Pipeline',
    status: 'VERIFICATION_PASSED',
  },
  {
    id: 'meetings',
    title: '04 Confirmed Meetings',
    tagline: 'Direct Calendar Conversion',
    color: '#10B981',
    deliverables: ['Direct Calendar Invites', 'Full Pre-Call Buyer Dossier', 'Guaranteed Show-Up Rate'],
    metric: '98% Confirmed Show Rate',
    status: 'CALENDAR_SYNCED',
  },
]

const TRUST_BAR_METRICS = [
  { value: '99.8%', label: 'Data Accuracy SLA', sub: 'Triple-Layer Verified' },
  { value: '2,100+', label: 'Campaigns Delivered', sub: 'Across 16+ Sectors' },
  { value: '100%', label: 'GDPR / CCPA Compliant', sub: 'Zero-Spam Infrastructure' },
  { value: '$18M+', label: 'Pipeline Influenced', sub: 'Closed-Won Revenue' },
]

export default function DevHero() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const [activeHudTab, setActiveHudTab] = useState(0)

  // Auto-cycle through HUD tabs if reduced motion is false
  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveHudTab((prev) => (prev + 1) % PIPELINE_HUD_STAGES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  const currentHud = PIPELINE_HUD_STAGES[activeHudTab]

  const scrollToCatalog = () => {
    const el = document.getElementById('services-bento-catalog')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="dev-services-hero"
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-background text-text-primary border-b border-border/70"
      aria-label="Taraj Global B2B Services Platform"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/8 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* TOP: Live Orchestration Pill */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-5 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
              THE B2B PIPELINE OPERATING SYSTEM · 12 SPECIALIZED CAPABILITIES
            </span>
          </motion.div>

          {/* MAIN H1 HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase text-text-primary"
          >
            Every Growth Engine Needs <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              Precision Fuel.
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal"
          >
            From intent-surged account discovery and decision-maker validation to sales-qualified meetings, Taraj Global delivers turnkey B2B services engineered to build predictable enterprise revenue.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <StarButton onClick={() => navigate('/contact')}>
              Start a Conversation
            </StarButton>

            <button
              type="button"
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface hover:bg-surface/80 text-text-primary text-sm font-semibold transition-all hover:border-primary/50 shadow-xs cursor-pointer"
            >
              <span>Explore 12 Capabilities</span>
              <ChevronRight className="w-4 h-4 text-text-secondary" />
            </button>
          </motion.div>
        </div>

        {/* INTERACTIVE TELEMETRY HUD CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto rounded-2xl border border-border/80 bg-surface/80 dark:bg-[#0b1322]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Top HUD Terminal Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border/70 bg-surface/50 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-text-muted">|</span>
              <span className="font-bold text-text-primary uppercase tracking-wider">
                LIVE PIPELINE TELEMETRY // ORCHESTRATION_ENGINE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                ● {currentHud.status}
              </span>
              <span className="text-text-muted text-[11px] hidden sm:inline">
                LATENCY // 14ms
              </span>
            </div>
          </div>

          {/* Interactive HUD Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border/70 divide-x divide-border/70 bg-surface/30">
            {PIPELINE_HUD_STAGES.map((stage, idx) => {
              const isActive = activeHudTab === idx
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveHudTab(idx)}
                  className={`p-4 text-left transition-all relative ${
                    isActive
                      ? 'bg-surface/90 text-text-primary'
                      : 'hover:bg-surface/50 text-text-muted'
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">
                    STAGE 0{idx + 1}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-primary' : ''}`}>
                    {stage.title.split(' ')[1] || stage.title}
                  </div>

                  {/* Active bottom accent bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHudIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* HUD Content Area */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  {currentHud.title}
                </span>
                <span className="text-border">•</span>
                <span className="font-mono text-xs text-text-muted">
                  {currentHud.tagline}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {currentHud.deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-text-primary p-2.5 rounded-lg bg-background/70 border border-border/50 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Stamp */}
            <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 flex flex-col items-start md:items-end shrink-0 w-full md:w-auto">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-0.5">
                VERIFIED SLA DELIVERABLE
              </span>
              <span className="font-mono text-sm md:text-base font-bold text-primary">
                {currentHud.metric}
              </span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM: Enterprise Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12 pt-8 border-t border-border/60">
          {TRUST_BAR_METRICS.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3">
              <span className="text-2xl sm:text-3xl font-black text-text-primary font-mono tracking-tight">
                {item.value}
              </span>
              <span className="text-xs font-semibold text-text-primary mt-1">
                {item.label}
              </span>
              <span className="text-[11px] font-mono text-text-muted mt-0.5">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
