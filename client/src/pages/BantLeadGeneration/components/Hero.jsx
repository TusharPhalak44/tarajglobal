import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Command Center BANT Flow Visual ──────────────────────────────────────────

const FLOW_STAGES = [
  { id: 'target',    label: 'Target Account',       sub: 'ICP & TAM Definition',             color: '#00A6FF', icon: 'target'    },
  { id: 'budget',    label: 'Budget Allocation',    sub: 'Confirmed Fiscal Budget',          color: '#38BDF8', icon: 'budget'    },
  { id: 'authority', label: 'Decision Authority',   sub: 'C-Suite / Buying Committee',       color: '#00A6FF', icon: 'person'    },
  { id: 'need',      label: 'Business Need',        sub: 'Urgent Pain & Solution Fit',       color: '#FFA600', icon: 'need'      },
  { id: 'timeline',  label: 'Buying Timeline',      sub: 'Active 30–90 Day Window',          color: '#72D669', icon: 'timeline'  },
  { id: 'qualified', label: 'BANT-Qualified Lead',  sub: 'Sales Conversation Ready',         color: '#FF6D00', icon: 'qualified' },
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

function BudgetIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 9h.01M13 9h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
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

function NeedIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v3M9 13v3M2 9h3M13 9h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function TimelineIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.5" />
      <path d="M9 5v4l2.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  if (type === 'budget')    return <BudgetIcon color={color} />
  if (type === 'person')    return <PersonIcon color={color} />
  if (type === 'need')      return <NeedIcon color={color} />
  if (type === 'timeline')  return <TimelineIcon color={color} />
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
        // Last stage reached — brief flash (400ms), then restart
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
      aria-label="Animated BANT lead qualification workflow from targeted accounts to sales-ready opportunities"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Chrome Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-black/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
          <span className="text-[11px] font-mono text-white/40 ml-2">BANT Lead Qualification Engine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400/80">Active Qualification</span>
        </div>
      </div>

      {/* Flow Stages List */}
      <div className="p-4 sm:p-5 space-y-2.5">
        {FLOW_STAGES.map((stage, idx) => {
          const isActive = activeStage === idx
          const isCompleted = completedStages.includes(idx)

          return (
            <motion.div
              key={stage.id}
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
              {/* Index number */}
              <span
                className="text-[9px] font-mono font-bold w-4 shrink-0"
                style={{ color: isActive ? stage.color : 'rgba(255,255,255,0.2)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Connecting line from above */}
              {idx > 0 && (
                <div
                  className="absolute left-[28px] top-0 w-px h-2.5"
                  style={{ background: isCompleted ? `${stage.color}50` : 'rgba(255,255,255,0.06)' }}
                />
              )}

              {/* Icon node */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: isActive || isCompleted ? `${stage.color}18` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive || isCompleted ? stage.color + '40' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <StageIcon type={stage.icon} color={isActive || isCompleted ? stage.color : 'rgba(255,255,255,0.2)'} />
              </div>

              {/* Label */}
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
          { label: 'Campaign Status', value: 'Active', color: '#72D669' },
          { label: 'BANT Vetted', value: '100% Audited', color: '#FFA600' },
          { label: 'Pipeline Quality', value: 'Sales-Ready', color: '#00A6FF' },
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
    const el = document.getElementById('bant-process')
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
      aria-label="BANT Lead Generation Hero"
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
                BANT Lead Generation
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-text-primary mb-4"
            >
              <span className="block pb-1 sm:pb-1.5">Generate BANT-Qualified Leads</span>
              <span
                className="inline-block bg-clip-text text-transparent pt-0.5 leading-[1.28]"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #38BDF8 50%, #FF6D00 100%)' }}
              >
                Ready for Sales Conversations
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.32)}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 max-w-[540px]"
            >
              Taraj Global helps B2B technology companies identify, qualify, and deliver prospects based on Budget, Authority, Need, and Timeline — helping sales teams focus on the opportunities that matter.
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
                See How It Works
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
