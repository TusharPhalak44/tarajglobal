import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Command Center Flow Visual for Content Syndication ──────────────────────

const FLOW_STAGES = [
  { id: 'target',    label: 'Target Audience',       sub: 'Ideal Customer Profile',      color: '#00A6FF', icon: 'target'    },
  { id: 'decision',  label: 'Decision Maker',        sub: 'Verified B2B Buyer',          color: '#38BDF8', icon: 'person'    },
  { id: 'asset',     label: 'Content Asset',         sub: 'Whitepaper & eBook',          color: '#00A6FF', icon: 'doc'       },
  { id: 'engage',    label: 'Distribution & Engage', sub: 'Read & Downloaded',           color: '#FFA600', icon: 'engage'    },
  { id: 'capture',   label: 'Lead Capture & Intent', sub: 'Opt-in Reader MQL',           color: '#72D669', icon: 'check'     },
  { id: 'qualified', label: 'Qualified Opportunity', sub: 'Sales Pipeline Ready',       color: '#FF6D00', icon: 'qualified' },
]

const STATUS_PILLS = [
  { label: 'Syndicated',  dot: '#00A6FF' },
  { label: 'Engaged',     dot: '#FFA600' },
  { label: 'Downloaded',  dot: '#38BDF8' },
  { label: 'Qualified',   dot: '#72D669' },
  { label: 'Pipeline Ready', dot: '#FF6D00' },
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

function DocIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M6 6h6M6 9h6M6 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
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

function CheckIcon({ color }) {
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
  if (type === 'doc')       return <DocIcon color={color} />
  if (type === 'engage')    return <EngageIcon color={color} />
  if (type === 'check')     return <CheckIcon color={color} />
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
      aria-label="Animated B2B content syndication campaign workflow from targeted audience to qualified sales opportunities"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,166,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top terminal bar */}
      <div className="relative border-b border-white/[0.07] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[11px] font-mono text-white/40 tracking-wider">
            DEMANDFLOW BRIDGE // SYNDICATION OPS
          </span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
          </span>
          <span className="text-[10px] font-mono text-[#00A6FF] font-semibold tracking-wider">
            LIVE DISPATCH
          </span>
        </div>
      </div>

      {/* Pipeline sub-header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
          Syndication Distribution Lifecycle
        </span>
        <div className="flex items-center gap-1.5">
          {STATUS_PILLS.map((p, i) => (
            <span
              key={p.label}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full hidden sm:inline-block"
              style={{
                background: completedStages.includes(i) || activeStage === i ? `${p.dot}18` : 'rgba(255,255,255,0.04)',
                color: completedStages.includes(i) || activeStage === i ? p.dot : 'rgba(255,255,255,0.3)',
                border: `1px solid ${completedStages.includes(i) || activeStage === i ? `${p.dot}40` : 'transparent'}`,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Flow stages list */}
      <div className="p-4 sm:p-5 space-y-2 relative">
        {/* Continuous track line */}
        <div
          className="absolute left-[33px] sm:left-[37px] top-6 bottom-6 w-0.5 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        />

        {FLOW_STAGES.map((stage, idx) => {
          const isActive = activeStage === idx
          const isCompleted = completedStages.includes(idx)

          return (
            <motion.div
              key={stage.id}
              className="relative flex items-center gap-3.5 p-2.5 sm:p-3 rounded-xl transition-all duration-300"
              style={{
                background: isActive
                  ? `linear-gradient(90deg, ${stage.color}14 0%, rgba(255,255,255,0.02) 100%)`
                  : isCompleted
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
                border: isActive
                  ? `1px solid ${stage.color}45`
                  : isCompleted
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid transparent',
              }}
              animate={isActive ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Stage icon / state node */}
              <div
                className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  background: isActive
                    ? `${stage.color}25`
                    : isCompleted
                    ? `${stage.color}15`
                    : 'rgba(255,255,255,0.04)',
                  border: isActive
                    ? `1.5px solid ${stage.color}`
                    : isCompleted
                    ? `1px solid ${stage.color}60`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `0 0 16px ${stage.color}40` : 'none',
                }}
              >
                <StageIcon
                  type={stage.icon}
                  color={isActive ? stage.color : isCompleted ? stage.color : 'rgba(255,255,255,0.3)'}
                />
              </div>

              {/* Text metadata */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-semibold leading-tight"
                  style={{ color: isActive ? '#fff' : isCompleted ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
                >
                  {stage.label}
                </div>
                <div
                  className="text-[9px] font-mono mt-0.5"
                  style={{ color: isActive ? `${stage.color}` : 'rgba(255,255,255,0.2)' }}
                >
                  {stage.sub}
                </div>
              </div>

              {/* Completed checkmark */}
              {isCompleted && (
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${stage.color}25`, border: `1px solid ${stage.color}50` }}
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
          { label: 'Syndication Status', value: 'Active', color: '#72D669' },
          { label: 'Avg. Engagement', value: 'High Intent', color: '#FFA600' },
          { label: 'Lead Quality', value: 'CDQA Verified', color: '#00A6FF' },
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

// ─── Hero Component ──────────────────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const handleStartCampaign = () => navigate('/contact')

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('syndication-process')
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
      aria-label="B2B Content Syndication Hero"
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
                B2B CONTENT SYNDICATION
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-text-primary mb-4"
            >
              <span className="block pb-1 sm:pb-1.5">Reach the Right B2B Buyers</span>
              <span
                className="inline-block bg-clip-text text-transparent pt-0.5 leading-[1.28]"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #38BDF8 50%, #FF6D00 100%)' }}
              >
                With Targeted Content Syndication
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 max-w-[540px]"
            >
              Taraj Global helps B2B technology and SaaS companies distribute relevant content to targeted audiences, engage decision-makers, and generate qualified leads through data-driven content syndication.
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
