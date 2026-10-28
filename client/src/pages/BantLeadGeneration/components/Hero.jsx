import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Check,
  ShieldCheck,
  Activity,
  Terminal,
  Sparkles,
  DollarSign,
  UserCheck,
  Flame,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { trackCtaClick, buildTrackedUrl } from '@utils/utmTracker'

// ─── BANT Stages & Rich Telemetry Data ─────────────────────────────────────────

const BANT_STAGES = [
  {
    id: 'budget',
    letter: 'B',
    name: 'Budget',
    title: 'Budget Allocation',
    subtitle: 'Confirmed Fiscal Discretionary Funds',
    color: '#00A6FF',
    badge: 'CAPEX APPROVED',
    icon: DollarSign,
    account: 'ApexScale Cloud Technologies',
    persona: 'Chief Financial Officer & VP Infrastructure',
    signal: 'Dedicated $250k–$750k annual budget approved for 2026/27 enterprise software upgrade.',
    metrics: [
      { label: 'Fiscal Status', val: 'Allocated' },
      { label: 'Authority Tier', val: 'VP / C-Suite' },
      { label: 'Spend Limit', val: '>$250,000' },
    ],
    auditLog: 'Finance Director verified via direct phone confirmation & fiscal calendar check.',
  },
  {
    id: 'authority',
    letter: 'A',
    name: 'Authority',
    title: 'Decision Authority',
    subtitle: 'C-Suite & Buying Committee Quorum',
    color: '#38BDF8',
    badge: 'DECISION MAKER',
    icon: UserCheck,
    account: 'Vanguard Enterprise Systems',
    persona: 'Chief Technology Officer & Head of SecOps',
    signal: 'Primary economic buyer & technical evaluation committee sign-off confirmed.',
    metrics: [
      { label: 'Direct Dial', val: 'Verified +1-415' },
      { label: 'Email Status', val: '100% In-Box' },
      { label: 'Buying Role', val: 'Final Sign-Off' },
    ],
    auditLog: 'Triple-layer SMTP ping passed. Zero-bounce domain verification approved.',
  },
  {
    id: 'need',
    letter: 'N',
    name: 'Need',
    title: 'Business Need',
    subtitle: 'Urgent Bottleneck & Solution Alignment',
    color: '#FFA600',
    badge: 'INTENT SURGE 98.4%',
    icon: Flame,
    account: 'DataMatrix Global Corp',
    persona: 'VP Revenue Operations & Enterprise Architect',
    signal: 'Urgent pain point: Legacy pipeline stagnation & CRM synchronization bottlenecks.',
    metrics: [
      { label: 'Urgency', val: 'Critical / Active' },
      { label: 'Intent Score', val: '98.4 / 100' },
      { label: 'Tech Stack', val: 'Salesforce + AWS' },
    ],
    auditLog: 'Custom discovery responses documented: active RFP in progress.',
  },
  {
    id: 'timeline',
    letter: 'T',
    name: 'Timeline',
    title: 'Buying Timeline',
    subtitle: 'Active 30–90 Day Evaluation Window',
    color: '#72D669',
    badge: 'ACTIVE 30–60 DAYS',
    icon: Clock,
    account: 'OmniSphere Health Systems',
    persona: 'Director of Procurement & Chief Information Officer',
    signal: 'Current legacy contract expires in 70 days. Immediate vendor demonstration requested.',
    metrics: [
      { label: 'Purchase Window', val: 'Within 60 Days' },
      { label: 'Project Status', val: 'Shortlist Phase' },
      { label: 'Meeting Intent', val: 'Immediate Demo' },
    ],
    auditLog: 'Procurement cycle verified: no tire-kickers or exploratory students.',
  },
  {
    id: 'qualified',
    letter: '✓',
    name: 'Qualified',
    title: 'BANT-Qualified Lead',
    subtitle: 'Sales-Ready Opportunity Dispatched',
    color: '#FF6D00',
    badge: '100% SALES READY',
    icon: CheckCircle2,
    account: 'Horizon FinTech Solutions',
    persona: 'Senior Buying Committee Matrix',
    signal: 'All 4 BANT criteria 100% audited. Lead dossier pushed directly to AE calendar & CRM.',
    metrics: [
      { label: 'CRM Sync', val: 'Live Push' },
      { label: 'Accuracy SLA', val: '99.8% Guaranteed' },
      { label: 'Delivery', val: 'Instant Route' },
    ],
    auditLog: 'Complete contact profile delivered with recorded discovery briefings.',
  },
]

// ─── Interactive Command Center Component ─────────────────────────────────────

function BANTCommandCenter({ activeStage, setActiveStage, prefersReducedMotion }) {
  const current = BANT_STAGES[activeStage] || BANT_STAGES[0]
  const Icon = current.icon

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border transition-all duration-500 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #050D1A 0%, #081124 50%, #060B18 100%)',
        borderColor: `${current.color}35`,
        boxShadow: `0 20px 60px -15px ${current.color}25, 0 0 40px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.5)`,
      }}
      role="region"
      aria-label="Interactive BANT Lead Qualification Intelligence Console"
    >
      {/* ── Background Cyber Ambient Glow & Matrix Lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Stage Reacting Radial Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[110px] opacity-25 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: current.color }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[110px] opacity-20 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: current.color }}
        />
      </div>

      {/* ── Top Chrome Telemetry Bar ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-xs" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-xs" />
          </div>
          <div className="h-3.5 w-px bg-white/10 ml-1" />
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00A6FF]" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              DEMANDFLOW • BANT ENGINE v4.2
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE AUDIT
          </span>
        </div>
      </div>

      {/* ── Interactive Stage Selector Rail (B · A · N · T · ✓) ── */}
      <div className="relative z-10 p-2 sm:p-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {BANT_STAGES.map((stage, idx) => {
            const isSelected = activeStage === idx
            const StageIconComponent = stage.icon

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`group relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden text-center ${isSelected
                  ? 'bg-white/10 border shadow-lg'
                  : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/15'
                  }`}
                style={{
                  borderColor: isSelected ? `${stage.color}70` : undefined,
                  boxShadow: isSelected ? `0 4px 20px ${stage.color}25` : undefined,
                }}
              >
                {/* Active Top Glow Line */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: stage.color }}
                  />
                )}

                <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                  <span
                    className="text-xs sm:text-sm font-black font-mono"
                    style={{ color: isSelected ? stage.color : 'rgba(255,255,255,0.6)' }}
                  >
                    {stage.letter}
                  </span>
                  <StageIconComponent
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:scale-110"
                    style={{ color: isSelected ? stage.color : 'rgba(255,255,255,0.4)' }}
                  />
                </div>

                <span
                  className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-tight truncate max-w-full px-1"
                  style={{ color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
                >
                  {stage.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Active Stage Live Screening Console ── */}
      <div className="relative z-10 p-4 sm:p-6 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Header row: Status Badge + Live Target Persona */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs"
                  style={{
                    backgroundColor: `${current.color}15`,
                    borderColor: `${current.color}40`,
                    color: current.color,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-wide flex items-center gap-2">
                    <span>{current.title}</span>
                    <span
                      className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-md uppercase"
                      style={{
                        backgroundColor: `${current.color}18`,
                        color: current.color,
                        border: `1px solid ${current.color}35`,
                      }}
                    >
                      {current.badge}
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-white/50">{current.subtitle}</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[9.5px] font-mono uppercase text-white/40 block">Screened Target</span>
                <span className="text-xs font-bold text-white/90 truncate block max-w-[220px]">
                  {current.account}
                </span>
              </div>
            </div>

            {/* Signal & Discovery Callout */}
            <div
              className="p-3.5 rounded-xl border relative overflow-hidden backdrop-blur-xs"
              style={{
                backgroundColor: `${current.color}08`,
                borderColor: `${current.color}25`,
              }}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-ping"
                  style={{ backgroundColor: current.color }}
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block">
                    Verified Lead Intelligence:
                  </span>
                  <p className="text-xs text-white/90 leading-relaxed font-medium">
                    {current.signal}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Live Metric Chips */}
            <div className="grid grid-cols-3 gap-2">
              {current.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
                >
                  <span className="text-[9px] font-mono uppercase text-white/40 block mb-0.5 truncate">
                    {metric.label}
                  </span>
                  <span
                    className="text-xs font-mono font-bold truncate block"
                    style={{ color: current.color }}
                  >
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Verification Terminal Stream */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] space-y-1">
              <div className="flex items-center justify-between text-white/40 text-[9.5px]">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#00A6FF]" />
                  <span>CDQA TELEMETRY AUDIT</span>
                </span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>
              <p className="text-white/80 leading-relaxed text-[10.5px] truncate">
                <span className="text-[#00A6FF] mr-1.5">&gt;</span>
                {current.auditLog}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom SLA Status Bar ── */}
      <div className="relative z-10 border-t border-white/[0.08] bg-black/60 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#72D669]" />
          <span>ISO 27001 &amp; GDPR COMPLIANT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40">SLA: <strong className="text-white font-bold">99.8% ACCURACY</strong></span>
          <span className="text-white/40">•</span>
          <span className="text-emerald-400 font-bold">0% EMAIL BOUNCE</span>
        </div>
      </div>
    </div>
  )
}

// ─── Hero Main Component ──────────────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const [activeStage, setActiveStage] = useState(0)

  // Continuously advance BANT stages every 3.2s unless reduced motion is on
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % BANT_STAGES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const handleStartCampaign = () => {
    trackCtaClick({
      section_id: 'bant_hero',
      section_name: 'BANT Hero Section',
      cta_text: 'Deploy BANT Campaign',
      destination_url: '/contact',
      utm_campaign: 'bant_lead_generation',
    })
    navigate('/contact')
  }

  const handleSeeHowItWorks = () => {
    trackCtaClick({
      section_id: 'bant_hero',
      section_name: 'BANT Hero Section',
      cta_text: 'Explore BANT Process',
      destination_url: '#bant-process',
      utm_campaign: 'bant_lead_generation',
    })
    const el = document.getElementById('bant-process')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
      }

  const currentStage = BANT_STAGES[activeStage] || BANT_STAGES[0]

  return (
    <section
      id="hero"
      data-cta-section="BANT Hero Section"
      ref={sectionRef}
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-900 dark:bg-[#040914] text-white pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-12 lg:pb-16 transition-colors duration-300"
      aria-label="Generate BANT-Qualified B2B Leads"
    >
      {/* ── Futuristic Ambient Background (Light/Dark Reactive) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dynamic stage-tinted radial glows */}
        <div
          className="absolute -top-32 left-1/4 w-[650px] h-[650px] rounded-full blur-[160px] opacity-20 transition-colors duration-1000"
          style={{ backgroundColor: currentStage.color }}
        />
        <div
          className="absolute bottom-10 -right-20 w-[550px] h-[550px] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, transparent 70%)' }}
        />

        {/* Clean Tech Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dynamic Sweeping Telemetry Beam */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-0 right-0 h-px opacity-25"
            style={{
              background: 'linear-gradient(90deg, transparent, #00A6FF, #38BDF8, transparent)',
            }}
            animate={{ top: ['5%', '95%', '5%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── Left Column: High-Impact Typography & Interactive BANT Selector (Col 6/12) ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0.08)} className="flex items-center mb-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00A6FF]">
                TECH-POWERED BANT ARCHITECTURE
              </span>
            </motion.div>


            {/* Main H1 Headline with High-Contrast Gradient */}
            <motion.h1
              {...fadeUp(0.18)}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.70rem] font-black tracking-tight leading-[1.2] text-white mb-3"
            >
              <span className="block pb-0.5">Generate BANT Qualified Leads</span>
              <div
                className="inline-block bg-clip-text text-transparent pb-2 sm:pb-2.5 pt-0.5"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00A6FF 0%, #38BDF8 50%, #FFA600 100%)',
                }}
              >
                Driven by In House Verification
              </div>
            </motion.h1>

            {/* Sub-headline description */}
            <motion.p
              {...fadeUp(0.28)}
              className="text-md sm:text-lg text-slate-300 leading-relaxed mb-5 max-w-[560px] font-normal"
            >
              TaRaj Global accelerates enterprise revenue pipelines across US, EMEA, and APAC. Combining AI intent telemetry with our proprietary prospect verification engine, we validate Budget, Authority, Need, and Timeline parameters to route sales-ready opportunities directly into your CRM.
            </motion.p>


            {/* CTAs with Dynamic Glow & UTM Tracking */}
            <motion.div {...fadeUp(0.44)} className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8">
              <button
                onClick={handleStartCampaign}
                id="hero-cta-primary"
                data-cta="true"
                data-cta-section="BANT Hero Section"
                data-cta-name="Deploy BANT Campaign"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[46px] rounded-xl font-bold text-sm text-white transition-all duration-200 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00]"
                style={{
                  background: 'linear-gradient(135deg, #FF6D00 0%, #FF8C42 100%)',
                  boxShadow: '0 4px 25px rgba(255,109,0,0.35)',
                }}
              >
                {/* Continuous Shimmer Light Ray */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    animate={{ translateX: ['-100%', '200%'] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <span>Deploy Custom BANT Campaign </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                id="hero-cta-secondary"
                data-cta="true"
                data-cta-section="BANT Hero Section"
                data-cta-name="Explore BANT Process"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] rounded-xl font-bold text-sm text-white/90 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 transition-all duration-200 focus:outline-none cursor-pointer backdrop-blur-xs"
              >
                <span>Explore Qualification Architecture</span>
                <ChevronDown className="w-4 h-4 text-[#00A6FF] transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>


          </div>

          {/* ── Right Column: Interactive BANT Command Center (Col 6/12) ── */}
          <div className="lg:col-span-6 order-2 lg:order-2">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 28 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <BANTCommandCenter
                activeStage={activeStage}
                setActiveStage={setActiveStage}
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
