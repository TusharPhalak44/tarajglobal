import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Command Center Flow Visual (SQL Focused) ────────────────────────────────

const FLOW_STAGES = [
  { id: 'target',    label: 'ICP Account Vetting',       sub: 'Firmographic & TAM Filter',   color: '#00A6FF', icon: 'target'    },
  { id: 'decision',  label: 'Economic Buyer Identified', sub: 'C-Level / VP Budget Holder',   color: '#38BDF8', icon: 'person'    },
  { id: 'outreach',  label: 'Multi-Touch Outreach',      sub: 'Omnichannel Senior SDR',      color: '#00A6FF', icon: 'mail'      },
  { id: 'criteria',  label: 'Sales Criteria Screen',     sub: 'Fit · Need · Buying Intent',   color: '#FFA600', icon: 'engage'    },
  { id: 'booking',   label: 'Calendar Direct Book',      sub: 'AE Schedule Confirmed',       color: '#72D669', icon: 'reply'     },
  { id: 'qualified', label: 'Sales Qualified (SQL)',     sub: 'Sales-Ready Pipeline Deal',   color: '#FF6D00', icon: 'qualified' },
]

const STATUS_PILLS = [
  { label: 'Scouted',    dot: '#00A6FF' },
  { label: 'Engaged',    dot: '#FFA600' },
  { label: 'Vetted',     dot: '#38BDF8' },
  { label: 'Confirmed',  dot: '#72D669' },
  { label: 'SQL Booked', dot: '#FF6D00' },
]

function TargetIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="4.5" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2" fill={color} />
    </svg>
  )
}

function PersonIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M2 7l7 4 7-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function EngageIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v3M9 13v3M2 9h3M13 9h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function ReplyIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9H14M8 5l-4 4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QualifiedIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9.5L7.5 13l6.5-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StageIcon({ type, color }) {
  if (type === 'target')    return <TargetIcon color={color} />
  if (type === 'person')    return <PersonIcon color={color} />
  if (type === 'mail')      return <MailIcon color={color} />
  if (type === 'engage')    return <EngageIcon color={color} />
  if (type === 'reply')     return <ReplyIcon color={color} />
  if (type === 'qualified') return <QualifiedIcon color={color} />
  return null
}

function CommandCenter({ prefersReducedMotion }) {
  const [activeStage, setActiveStage] = useState(0)
  const [completedStages, setCompletedStages] = useState([])

  useEffect(() => {
    if (prefersReducedMotion) {
      setCompletedStages([0, 1, 2, 3, 4])
      setActiveStage(5)
      return
    }

    let cancelled = false
    let timerId = null
    const N = FLOW_STAGES.length

    const after = (ms, fn) => {
      timerId = setTimeout(() => { if (!cancelled) fn() }, ms)
    }

    const forward = (step) => {
      setActiveStage(step)
      setCompletedStages(Array.from({ length: step }, (_, i) => i))

      if (step < N - 1) {
        after(900, () => forward(step + 1))
      } else {
        after(900, () => {
          setCompletedStages(Array.from({ length: N }, (_, i) => i))
          setActiveStage(N)
          after(400, () => {
            setActiveStage(-1)
            setCompletedStages([])
            after(200, () => forward(0))
          })
        })
      }
    }

    forward(0)

    return () => {
      cancelled = true
      clearTimeout(timerId)
    }
  }, [prefersReducedMotion])

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #050D1A 0%, #080F20 60%, #060B16 100%)',
        border: '1px solid rgba(0,166,255,0.15)',
        boxShadow: '0 0 60px rgba(0,166,255,0.06), inset 0 0 40px rgba(0,0,0,0.4)',
      }}
      role="img"
      aria-label="Animated SQL Lead Generation campaign workflow from targeted accounts to sales-qualified pipeline opportunities"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="ml-2 text-[11px] font-mono tracking-wider text-[#00A6FF] opacity-90 uppercase">
          DEMANDFLOW BRIDGE™ // SQL PIPELINE COMMAND
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#72D669] animate-pulse" />
          <span className="text-[10px] font-mono text-white/50 tracking-wider">LIVE TELEMETRY</span>
        </div>
      </div>

      {/* Metrics ticker bar */}
      <div className="grid grid-cols-3 gap-px bg-white/[0.05] border-b border-white/[0.06] text-center">
        <div className="py-2.5 px-3 bg-[#050D1A]/80">
          <div className="text-[10px] font-mono text-white/50 tracking-wider">SQL PIPELINE</div>
          <div className="text-sm font-black text-[#00A6FF] font-mono">1,845+</div>
        </div>
        <div className="py-2.5 px-3 bg-[#050D1A]/80">
          <div className="text-[10px] font-mono text-white/50 tracking-wider">SHOW-UP RATE</div>
          <div className="text-sm font-black text-[#72D669] font-mono">85%+</div>
        </div>
        <div className="py-2.5 px-3 bg-[#050D1A]/80">
          <div className="text-[10px] font-mono text-white/50 tracking-wider">VELOCITY LIFT</div>
          <div className="text-sm font-black text-[#FF6D00] font-mono">3.2x</div>
        </div>
      </div>

      {/* Flow visual */}
      <div className="p-4 sm:p-5 space-y-2">
        {FLOW_STAGES.map((stage, idx) => {
          const isDone = completedStages.includes(idx)
          const isCurrent = activeStage === idx
          const isPending = !isDone && !isCurrent

          return (
            <div
              key={stage.id}
              className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 border"
              style={{
                background: isCurrent
                  ? 'rgba(0,166,255,0.08)'
                  : isDone
                  ? 'rgba(255,255,255,0.02)'
                  : 'rgba(255,255,255,0.01)',
                borderColor: isCurrent
                  ? stage.color
                  : isDone
                  ? `${stage.color}30`
                  : 'rgba(255,255,255,0.04)',
              }}
            >
              {/* Step indicator */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-all duration-300"
                style={{
                  background: isCurrent ? stage.color : isDone ? `${stage.color}20` : 'rgba(255,255,255,0.05)',
                  color: isCurrent ? '#050D1A' : isDone ? stage.color : 'rgba(255,255,255,0.3)',
                }}
              >
                {idx + 1}
              </div>

              {/* Icon badge */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-opacity duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  opacity: isPending ? 0.3 : 1,
                }}
              >
                <StageIcon type={stage.icon} color={isPending ? '#64748b' : stage.color} />
              </div>

              {/* Label + sub */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-bold tracking-tight truncate transition-colors duration-300"
                  style={{ color: isPending ? 'rgba(255,255,255,0.4)' : '#ffffff' }}
                >
                  {stage.label}
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate">{stage.sub}</div>
              </div>

              {/* Stage status indicator */}
              <div className="shrink-0 flex items-center gap-1.5">
                {isCurrent && (
                  <span className="text-[10px] font-mono font-bold tracking-wider animate-pulse" style={{ color: stage.color }}>
                    PROCESSING
                  </span>
                )}
                {isDone && (
                  <span className="text-[10px] font-mono font-bold text-[#72D669] tracking-wider">
                    VERIFIED ✓
                  </span>
                )}
                {isPending && (
                  <span className="text-[10px] font-mono text-white/20 tracking-wider">
                    QUEUED
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom status pills */}
      <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
        {STATUS_PILLS.map((pill) => (
          <div key={pill.label} className="flex items-center gap-1.5 text-[10px] font-mono text-white/60">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pill.dot }} />
            <span>{pill.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero Component ────────────────────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const handleStartCampaign = () => navigate('/contact')

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('sql-process')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-background pt-20 pb-6 sm:pt-22 sm:pb-8 lg:pt-22 lg:pb-8 transition-colors duration-300"
      aria-label="SQL Lead Generation Services Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true">
        {/* Radial glows */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 15% 40%, rgba(0,166,255,0.1) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 85% 65%, rgba(255,109,0,0.07) 0%, transparent 70%)
            `,
          }}
        />
        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Horizontal scan line */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-0 right-0 h-px opacity-20"
            style={{ background: 'linear-gradient(90deg, transparent, #00A6FF, transparent)' }}
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-6 lg:pb-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="flex flex-col justify-center order-1 lg:order-1">

            {/* Eyebrow badge */}
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full w-fit mb-4"
              style={{ background: 'rgba(0,166,255,0.08)', border: '1px solid rgba(0,166,255,0.25)' }}>
              {!prefersReducedMotion && (
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#00A6FF]"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#00A6FF] uppercase">
                SQL LEAD GENERATION
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-text-primary mb-4"
            >
              <span className="block pb-1 sm:pb-1.5">Generate Sales-Qualified Leads</span>
              <span
                className="inline-block bg-clip-text text-transparent pt-0.5 leading-[1.28]"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #38BDF8 50%, #FF6D00 100%)' }}
              >
                That Move Your Pipeline Forward
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 max-w-[540px]"
            >
              Taraj Global helps B2B technology and SaaS companies identify, qualify, and deliver sales-qualified leads aligned with their ideal customer profile, buying intent, and sales criteria.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row flex-wrap gap-3.5">
              <button
                onClick={handleStartCampaign}
                id="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, #00A6FF 0%, #0080CC 100%)',
                  boxShadow: '0 4px 20px rgba(0,166,255,0.3)',
                }}
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                id="hero-cta-secondary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Explore Our Services
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* ── Right: Command Center ── */}
          <motion.div
            className="order-2 lg:order-2"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CommandCenter prefersReducedMotion={prefersReducedMotion} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Hero
