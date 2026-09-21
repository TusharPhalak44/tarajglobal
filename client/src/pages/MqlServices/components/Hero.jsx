import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Command Center Flow Visual ───────────────────────────────────────────────

const FLOW_STAGES = [
  { id: 'target',    label: 'Target Account',       sub: 'Ideal Customer Profile',      color: '#00A6FF', icon: 'target'    },
  { id: 'decision',  label: 'Decision Maker',        sub: 'Buying Persona Mapped',       color: '#38BDF8', icon: 'person'    },
  { id: 'content',   label: 'Asset Engagement',      sub: 'Whitepaper · Report',         color: '#00A6FF', icon: 'mail'      },
  { id: 'intent',    label: 'Intent Surge',          sub: 'Active Solution Research',    color: '#FFA600', icon: 'engage'    },
  { id: 'score',     label: 'Lead Scoring',          sub: 'Authority & Criteria Match',  color: '#72D669', icon: 'reply'     },
  { id: 'qualified', label: 'Qualified MQL',         sub: 'Sales-Ready Opportunity',     color: '#FF6D00', icon: 'qualified' },
]

const STATUS_PILLS = [
  { label: 'Discovered', dot: '#00A6FF' },
  { label: 'Engaged',    dot: '#FFA600' },
  { label: 'Scored',     dot: '#38BDF8' },
  { label: 'Verified',   dot: '#72D669' },
  { label: 'MQL Ready',  dot: '#FF6D00' },
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
      <path d="M9 2l2.163 4.382 4.837.703-3.5 3.411.826 4.817L9 13.045l-4.326 2.268.826-4.817-3.5-3.411 4.837-.703L9 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function StageIcon({ type, color }) {
  switch (type) {
    case 'target':    return <TargetIcon color={color} />
    case 'person':    return <PersonIcon color={color} />
    case 'mail':      return <MailIcon color={color} />
    case 'engage':    return <EngageIcon color={color} />
    case 'reply':     return <ReplyIcon color={color} />
    case 'qualified': return <QualifiedIcon color={color} />
    default:          return <TargetIcon color={color} />
  }
}

function CommandCenter({ prefersReducedMotion }) {
  const [activeStage, setActiveStage] = useState(0)
  const [completedStages, setCompletedStages] = useState([])

  useEffect(() => {
    if (prefersReducedMotion) return

    let current = 0
    let timerId
    let cancelled = false

    const advance = () => {
      if (cancelled) return
      setActiveStage(current)
      setCompletedStages(prev => {
        const next = []
        for (let i = 0; i < current; i++) next.push(i)
        return next
      })

      const holdTime = current === FLOW_STAGES.length - 1 ? 3200 : 1800

      timerId = setTimeout(() => {
        if (cancelled) return
        current = (current + 1) % FLOW_STAGES.length
        if (current === 0) {
          setCompletedStages([])
        }
        advance()
      }, holdTime)
    }

    advance()

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
      aria-label="Animated MQL lead generation campaign workflow from targeted prospects to qualified sales opportunities"
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
        <span className="ml-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#00A6FF]/80 uppercase">
          MQL Campaign Command Center
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#72D669] animate-pulse" />
          <span className="text-[9px] font-mono text-[#72D669]/70 uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Status pills row */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] flex-wrap">
        {STATUS_PILLS.map((pill) => (
          <div
            key={pill.label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: pill.dot }} />
            <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider">{pill.label}</span>
          </div>
        ))}
      </div>

      {/* Flow stages */}
      <div className="p-5 space-y-1.5">
        {FLOW_STAGES.map((stage, idx) => {
          const isActive = activeStage === idx
          const isCompleted = completedStages.includes(idx)

          return (
            <motion.div
              key={stage.id}
              initial={prefersReducedMotion ? {} : { opacity: 0.3, x: -8 }}
              animate={
                prefersReducedMotion
                  ? {}
                  : isActive
                  ? { opacity: 1, x: 0, scale: 1.01 }
                  : isCompleted
                  ? { opacity: 0.85, x: 0, scale: 1 }
                  : { opacity: 0.3, x: 0, scale: 1 }
              }
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 relative overflow-hidden"
              style={{
                background: isActive
                  ? `linear-gradient(90deg, ${stage.color}18 0%, transparent 100%)`
                  : isCompleted
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
                border: isActive
                  ? `1px solid ${stage.color}35`
                  : isCompleted
                  ? '1px solid rgba(255,255,255,0.05)'
                  : '1px solid transparent',
              }}
            >
              {/* Active left indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: stage.color }}
                />
              )}

              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                style={{
                  background: isActive
                    ? `${stage.color}20`
                    : isCompleted
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? stage.color + '40' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <StageIcon
                  type={stage.icon}
                  color={isActive ? stage.color : isCompleted ? '#94A3B8' : '#475569'}
                />
              </div>

              {/* Label & sub */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-bold leading-tight truncate"
                  style={{ color: isActive ? '#FFFFFF' : isCompleted ? '#E2E8F0' : '#64748B' }}
                >
                  {stage.label}
                </div>
                <div className="text-[10px] font-mono text-white/40 truncate">{stage.sub}</div>
              </div>

              {/* Stage indicator */}
              {isCompleted && (
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${stage.color}20`, border: `1px solid ${stage.color}50` }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3 5.5 6.5 2" stroke={stage.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Active pulse */}
              {isActive && !prefersReducedMotion && (
                <motion.div
                  className="w-5 h-5 rounded-full shrink-0"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ background: `${stage.color}30` }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Bottom metric strip */}
      <div className="border-t border-white/[0.05] px-5 py-3 grid grid-cols-3 gap-3">
        {[
          { label: 'Campaign Status', value: 'Active', color: '#72D669' },
          { label: 'Intent Velocity', value: 'High Surge', color: '#FFA600' },
          { label: 'Qualification', value: 'MQL Ready', color: '#00A6FF' },
        ].map(m => (
          <div key={m.label} className="text-center">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-wider mb-0.5">{m.label}</div>
            <div className="text-[10px] font-bold font-mono" style={{ color: m.color }}>{m.value}</div>
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
    const el = document.getElementById('mql-process')
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
      aria-label="MQL Lead Generation Hero"
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
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full w-fit mb-4"
              style={{ background: 'rgba(0,166,255,0.08)', border: '1px solid rgba(0,166,255,0.25)' }}
            >
              {!prefersReducedMotion && (
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#00A6FF]"
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#00A6FF] uppercase">
                MQL LEAD GENERATION
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-text-primary mb-4"
            >
              <span className="block pb-1 sm:pb-1.5">Generate Marketing Qualified Leads</span>
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
              Taraj Global helps B2B technology companies identify, qualify, and deliver high-intent prospects that align with their ideal customer profile and sales goals.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row flex-wrap gap-3.5">
              <button
                onClick={handleStartCampaign}
                id="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer shadow-md hover:shadow-lg hover:brightness-105"
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
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-text-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer hover:bg-white/10"
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
