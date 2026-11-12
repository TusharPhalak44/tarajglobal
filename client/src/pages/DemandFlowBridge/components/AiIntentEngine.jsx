import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Cpu,
  Radio,
  Zap,
  Target,
  ShieldCheck,
  Workflow,
  Sparkles,
  ChevronRight,
  Activity,
  UserCheck,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  Mail,
  Video,
  Database,
  Award,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ======================================================
// DATA — EXACT CONTENT PRESERVED
// ======================================================

const CAPABILITIES = [
  {
    badge: '01',
    title: 'ICP Lookalike Modeling',
    text: 'Uses your ICP and best-fit account attributes to surface lookalike accounts for tiering and targeting.',
    icon: Target,
    tag: 'Lookalike Analysis',
  },
  {
    badge: '02',
    title: 'Intent Signal Detection',
    text: 'Combines first-party engagement (email, content, web, event activity) with third-party topic-surge signals to show who is researching your category.',
    icon: Radio,
    tag: 'Surge Telemetry',
  },
  {
    badge: '03',
    title: 'Behavioral & Fit Scoring',
    text: 'Scores leads on ICP fit plus behavior against readiness thresholds agreed with your sales team.',
    icon: Activity,
    tag: 'Readiness Gates',
  },
  {
    badge: '04',
    title: 'AI Personalization',
    text: 'Matches assets, message variables, and offers to each persona’s role and intent, with A/B testing.',
    icon: Sparkles,
    tag: 'Asset Matching',
  },
  {
    badge: '05',
    title: 'AI-Assisted Verification',
    text: 'Flags invalid, risky, and duplicate records through SMTP checks, spam-trap suppression, and fuzzy matching, then CDQA analysts review.',
    icon: ShieldCheck,
    tag: 'CDQA Guardrails',
  },
  {
    badge: '06',
    title: 'Trigger Engine',
    text: 'Rules fire when signals change: alert the rep, adjust the cadence, attach the dossier, or start re-engagement.',
    icon: Zap,
    tag: 'Automated Routing',
  },
]

const PIPELINE_STEPS = [
  {
    stepTag: '01 SIGNAL',
    title: 'Capture Signals',
    text: 'Capture engagement and topic-surge signals against target accounts.',
    icon: Radio,
    phase: 'Detection Phase',
  },
  {
    stepTag: '02 SCORE',
    title: 'Score Readiness',
    text: 'Combine ICP fit and behavior into a readiness score with agreed thresholds.',
    icon: Cpu,
    phase: 'Algorithmic Calibration',
  },
  {
    stepTag: '03 TRIGGER',
    title: 'Fire Triggers',
    text: 'Threshold crossings alert reps, adjust cadences, or start re-engagement.',
    icon: Zap,
    phase: 'Execution Protocol',
  },
  {
    stepTag: '04 ACT',
    title: 'Hand Off With Context',
    text: 'Reps receive the dossier and history, then book the discovery meeting.',
    icon: UserCheck,
    phase: 'Revenue Handoff',
  },
]

const POWERED_SERVICES = [
  {
    badge: '01',
    service: 'ABM & ABX',
    capability: 'Lookalike modeling, account intent, journey-stage tracking',
    path: '/account-based-experience',
    icon: Target,
  },
  {
    badge: '02',
    service: 'Demand Generation & Lead Nurturing',
    capability: 'Behavioral scoring, trigger-based nurture, readiness alerts',
    path: '/demand-generation',
    icon: TrendingUp,
  },
  {
    badge: '03',
    service: 'Content Syndication',
    capability: 'Asset-to-persona matching, reader engagement scoring',
    path: '/content-syndication',
    icon: Layers,
  },
  {
    badge: '04',
    service: 'B2B Email Marketing',
    capability: 'AI personalization, deliverability monitoring, reply tracking',
    path: '/b2b-email-marketing',
    icon: Mail,
  },
  {
    badge: '05',
    service: 'Webinar Services',
    capability: 'Attendee engagement and intent scoring',
    path: '/webinar-services',
    icon: Video,
  },
  {
    badge: '06',
    service: 'B2B List Building & Database Cleansing',
    capability: 'AI-assisted verification, fuzzy deduplication',
    path: '/b2b-list-building',
    icon: Database,
  },
  {
    badge: '07',
    service: 'MQL, HQL, SQL & BANT',
    capability: 'Fit and intent scoring, qualification workflows, CRM handoff',
    path: '/bant-lead-generation',
    icon: Award,
  },
]

// ======================================================
// REUSABLE COMPACT SECTION LABEL
// ======================================================

const SectionLabel = ({ number, children }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-primary">
      {number}
    </span>
    <span className="w-5 h-px bg-primary/40" />
    <span className="text-xs sm:text-[13px] uppercase tracking-[0.18em] font-sans font-bold text-primary">
      {children}
    </span>
  </div>
)

// ======================================================
// MAIN COMPONENT
// ======================================================

const AiIntentEngine = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeStep, setActiveStep] = useState(null)
  const [activeCapability, setActiveCapability] = useState(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const cardRefs = useRef([])

  const reveal = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, ease: 'easeOut' },
  }

  // Track active card in the scroll stack
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-card-index'))
            if (!isNaN(index)) {
              setActiveCardIndex(index)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0,
      }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll jump to a specific card in the stack
  const scrollToCard = (index) => {
    const el = cardRefs.current[index]
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="ai-intent-engine"
      aria-label="How DemandFlow Bridge Uses AI and Intent Signals"
      className="relative isolate overflow-x-clip bg-[#040711] text-text-primary py-10 sm:py-12 lg:py-16 border-t border-b border-white/[0.08] font-sans"
    >
      {/* ── Seamless Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top/Bottom Modern Gradient Edges */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[450px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,166,255,0.07) 0%, transparent 65%)',
          }}
        />

        {/* Micro Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            01 — HERO HEADER (COMPACT)
        ================================================== */}

        <motion.div
          {...reveal}
          className="relative max-w-4xl lg:max-w-5xl mx-auto text-center mb-8 sm:mb-10"
        >
          {/* Eyebrow Badge (Modern Beveled Pill) */}
          {/* <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-[0.16em] uppercase bg-primary/[0.08] border border-primary/25 text-primary shadow-[inset_0_1px_0_0_rgba(0,166,255,0.15)]">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span></span>
            </span>
          </div> */}
          <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">AI-Assisted CRM Intelligence</span>

          {/* Main Title (<h2> - 36px) */}
      <motion.h2
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="text-2.5xl sm:text-4xl lg:text-[36px] font-black tracking-tight leading-[1.22] text-text-primary mb-4"
>
  How DemandFlow Bridge Uses{' '}
  <span className="highlight">
    AI and Intent Signals
  </span>
</motion.h2>

          {/* Subtext (<p> - 16px) */}
          <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
            The AI-assisted scoring, intent detection, and personalization behind every TaRaj Global service run on specific CRM capabilities, with your team and our QA analysts making the final call.
          </p>
        </motion.div>

        {/* ==================================================
            02 — CAPABILITY SECTION (SCROLL STACK)
        ================================================== */}

        <div className="mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* Left Column: Sticky Header & Interactive Scrubber (Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start space-y-4">
              <div>
                <SectionLabel number="01">
                  Intelligence Architecture
                </SectionLabel>

                <h3 className="text-xl sm:text-2xl lg:text-[28px] font-heading font-bold tracking-tight text-white mb-1.5">
                  Core Engine Capabilities
                </h3>

                <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-normal">
                  Six autonomous CRM intelligence modules executed as a synchronized telemetry stack—turning raw account signals and surge telemetry into qualified, sales-ready pipeline.
                </p>
              </div>

              {/* Scrubber Stack Navigation (Desktop) with Modern Inset Highlights */}
              <div className="hidden lg:flex flex-col gap-1.5 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-[10px] font-mono text-text-muted uppercase tracking-wider pb-0.5">
                  <span>Stack Navigation</span>
                  <span className="text-primary font-bold">
                    0{activeCardIndex + 1} / 06
                  </span>
                </div>

                {CAPABILITIES.map((card, idx) => {
                  const isActive = activeCardIndex === idx
                  return (
                    <button
                      key={card.badge}
                      type="button"
                      onClick={() => scrollToCard(idx)}
                      className={`group w-full text-left px-3 py-2 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${isActive
                        ? 'bg-primary/[0.08] border-primary/40 text-white shadow-[inset_0_1px_0_0_rgba(0,166,255,0.25)]'
                        : 'bg-white/[0.02] border-white/[0.06] text-text-secondary hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono text-xs font-bold transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-white'
                            }`}
                        >
                          {card.badge}
                        </span>
                        <span className="w-3 h-px bg-white/10" />
                        <span className="text-xs font-medium tracking-tight">
                          {card.title}
                        </span>
                      </div>

                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all ${isActive
                          ? 'bg-primary scale-125 shadow-[0_0_6px_var(--primary)]'
                          : 'bg-white/20'
                          }`}
                      />
                    </button>
                  )
                })}
              </div>

              {/* Meta Status Indicator */}
              <div className="flex items-center gap-2 pt-1 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/[0.08] text-primary text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  06 Autonomous Modules
                </span>
                <span className="text-[11px] text-text-muted">Continuous Sync</span>
              </div>
            </div>

            {/* Right Column: Physical Scroll Stack Cards (Modern Beveled Glass Borders) */}
            <div className="lg:col-span-7 relative [--stack-top:74px] sm:[--stack-top:84px] lg:[--stack-top:96px]">
              {CAPABILITIES.map((card, idx) => {
                const Icon = card.icon
                const isActive = activeCardIndex === idx

                return (
                  <div
                    key={card.badge}
                    id={`cap-card-${idx}`}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    data-card-index={idx}
                    style={{
                      position: 'sticky',
                      top: `calc(var(--stack-top) + ${idx * 20}px)`,
                      zIndex: 10 + idx * 5,
                    }}
                    className="mb-4 sm:mb-6 last:mb-0 transition-transform duration-200"
                  >
                    {/* Modern Beveled Glass Card */}
                    <div
                      onMouseEnter={() => {
                        setActiveCapability(idx)
                        setActiveCardIndex(idx)
                      }}
                      onMouseLeave={() => setActiveCapability(null)}
                      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 p-4 sm:p-5 backdrop-blur-xl bg-gradient-to-b from-[#0F1829]/95 via-[#0A101D]/95 to-[#070B14]/95 shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)] ${isActive || activeCapability === idx
                        ? 'border-primary/45 shadow-[0_8px_28px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(0,166,255,0.3)]'
                        : 'border-white/[0.08] hover:border-white/[0.16]'
                        }`}
                    >
                      {/* Modern Top Hairline Glow Beam */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                      {/* Left Subtle Gradient Bevel */}
                      <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />

                      {/* Header Row: Badge, Tag & Icon */}
                      <div className="relative z-10 flex justify-between items-center mb-3 pb-2.5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="card-badge inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-primary/[0.08] border border-primary/30 font-mono text-[11px] font-bold text-primary shadow-[inset_0_1px_0_0_rgba(0,166,255,0.15)]">
                            {card.badge}
                          </span>
                          <span className="w-3 h-px bg-primary/30" />
                          <span className="text-[10px] uppercase font-sans tracking-[0.14em] font-semibold text-text-secondary">
                            {card.tag}
                          </span>
                        </div>

                        <div className="w-8 h-8 rounded-lg bg-primary/[0.08] border border-primary/25 flex items-center justify-center text-primary shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all">
                          <Icon size={16} />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="relative z-10 space-y-1.5">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>

                        <p className="text-xs sm:text-[13px] leading-relaxed text-text-secondary font-normal">
                          {card.text}
                        </p>
                      </div>

                      {/* Card Footer Telemetry Bar */}
                      <div className="relative z-10 mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          CRM Synced &bull; Stage 0{idx + 1}
                        </span>

                        <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                          <span>Active</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* ==================================================
            03 — SIGNAL TO ACTION PIPELINE (COMPACT)
        ================================================== */}

        <div className="mb-10 sm:mb-14">
          <motion.div
            {...reveal}
            className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4"
          >
            <div>
              <SectionLabel number="02">
                Execution Architecture
              </SectionLabel>

              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-heading font-bold tracking-tight text-white">
                Signal-to-Action Pipeline
              </h3>
            </div>

            <p className="text-xs font-mono text-primary font-semibold">
              04 End-to-End Stages
            </p>
          </motion.div>

          {/* Pipeline Outer Frame (Modern Beveled Edge & Top Gradient Beam) */}
          <div className="relative rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0F1829]/90 via-[#0A101D]/90 to-[#070B14]/90 p-4 sm:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden">
            {/* Top Hairline Glow Beam */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {PIPELINE_STEPS.map((step, idx) => {
                const Icon = step.icon
                const isActive = activeStep === idx

                return (
                  <motion.div
                    key={step.stepTag}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${isActive
                      ? 'bg-primary/[0.08] border-primary/40 shadow-[inset_0_1px_0_0_rgba(0,166,255,0.2)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.03]'
                      }`}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="step-tag inline-flex items-center px-2 py-0.5 rounded bg-primary/[0.08] border border-primary/30 font-mono text-[10px] font-bold text-primary shadow-[inset_0_1px_0_0_rgba(0,166,255,0.15)]">
                          {step.stepTag}
                        </span>

                        <div className="w-7 h-7 rounded-lg bg-primary/[0.08] border border-primary/25 flex items-center justify-center text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                          <Icon size={14} />
                        </div>
                      </div>

                      {/* Step Title */}
                      <h3 className="text-sm sm:text-[15px] font-heading font-bold text-white mb-1 tracking-tight group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>

                      {/* Step Text */}
                      <p className="text-xs leading-relaxed text-text-secondary font-normal">
                        {step.text}
                      </p>
                    </div>

                    {/* Step Stage Meta */}
                    <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-text-muted">
                      <span>Stage 0{idx + 1}</span>
                      <span className={isActive ? 'text-primary font-semibold' : 'text-text-muted'}>
                        {step.phase}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ==================================================
            04 — HUMAN IN THE LOOP (MODERN BEVELED GLASS BANNER)
        ================================================== */}

        <motion.div
          {...reveal}
          className="mb-10 sm:mb-14"
        >
          <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-3.5 sm:gap-4 py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#0F1829]/95 via-[#0A101D]/90 to-[#070B14]/95 border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            {/* Top Hairline Glow Beam */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Left Subtle Gradient Bevel */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />

            {/* Icon Dock */}
            <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/[0.08] border border-primary/30 flex items-center justify-center text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
              <ShieldCheck size={17} />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="block text-[10px] uppercase tracking-[0.14em] font-sans font-bold text-primary mb-0.5">
                Human Oversight & Accountability
              </span>

              {/* Accountability Line (<p> - 15px) */}
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-text-primary font-normal">
                AI-assisted means the platform recommends and prioritizes. Reps and CDQA analysts review and make the final decision.
              </p>
            </div>

            {/* Right Standard Website Button / Pill without Border */}
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.08] text-primary text-[11px] font-sans font-semibold tracking-wide">
              <CheckCircle2 size={13} className="text-primary" />
              <span>Human-in-the-Loop</span>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            05 — WHAT IT POWERS (MODERN GLASS MATRIX)
        ================================================== */}

        <div>
          <motion.div
            {...reveal}
            className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4"
          >
            <div>
              <SectionLabel number="03">
                Connected Ecosystem
              </SectionLabel>

              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-heading font-bold tracking-tight text-white">
                What It Powers
              </h3>

              <p className="text-xs text-text-secondary mt-0.5 font-normal">
                Direct integration between DemandFlow Bridge AI engines and TaRaj Global services.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/[0.08] text-primary text-[11px] font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>07 Service Integrations</span>
            </div>
          </motion.div>

          {/* Compact Streamlined Table / Matrix with Glass Bevel */}
          <div className="rounded-xl sm:rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0F1829]/90 via-[#0A101D]/90 to-[#070B14]/90 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden relative">
            {/* Top Hairline Glow Beam */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* Header Strip */}
            <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-primary uppercase tracking-wider font-bold">
              <div className="flex items-center gap-2">
                <Workflow size={13} />
                <span>TaRaj Global Service & Capabilities</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-text-muted font-normal">
                CRM Pipeline Integration
              </span>
            </div>

            {/* Compact Rows with Modern Hairline Dividers */}
            <div className="divide-y divide-white/[0.05]">
              {POWERED_SERVICES.map((row) => {
                const Icon = row.icon

                return (
                  <Link
                    key={row.service}
                    to={row.path}
                    className="group relative flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-white/[0.025] transition-all duration-150 cursor-pointer"
                  >
                    {/* Left Active Edge Indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center" />

                    {/* Left: Number + Icon + Service Name */}
                    <div className="flex items-center gap-2.5 md:w-[35%] shrink-0">
                      <span className="font-mono text-xs font-bold text-primary w-5 shrink-0">
                        {row.badge}
                      </span>

                      <div className="w-7 h-7 rounded-md bg-primary/[0.08] border border-primary/25 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all">
                        <Icon size={14} />
                      </div>

                      <h4 className="text-xs sm:text-[14px] font-heading font-bold text-white group-hover:text-primary transition-colors tracking-tight">
                        {row.service}
                      </h4>
                    </div>

                    {/* Middle: Capability Description */}
                    <div className="flex-1 md:px-2">
                      <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors font-normal leading-relaxed">
                        {row.capability}
                      </p>
                    </div>

                    {/* Right: Action Button (Modern Glass Bevel Circle) */}
                    <div className="shrink-0 flex items-center justify-end gap-1.5 text-xs text-primary group-hover:text-white transition-colors">
                      <span className="hidden lg:inline text-[10px] font-sans text-text-muted group-hover:text-text-secondary">
                        Explore
                      </span>

                      <div className="w-6 h-6 rounded-full bg-white/[0.03] group-hover:bg-primary group-hover:text-black border border-white/[0.08] group-hover:border-primary flex items-center justify-center text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all">
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AiIntentEngine
