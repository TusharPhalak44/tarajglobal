import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── Command Center Flow Visual (ABX Specific) ────────────────────────────────

const FLOW_STAGES = [
  { id: 'target', label: 'Tiered Accounts', sub: 'ICP & TAM Matrix Scored', color: '#00A6FF', icon: 'target' },
  { id: 'committee', label: 'Buying Committee', sub: '6–10 Persona Roles Mapped', color: '#38BDF8', icon: 'person' },
  { id: 'narrative', label: 'Bespoke Experience', sub: '1:1 Value Narratives', color: '#00A6FF', icon: 'mail' },
  { id: 'telemetry', label: 'Intent Telemetry', sub: 'Surge & Buying Window Detection', color: '#FFA600', icon: 'engage' },
  { id: 'consensus', label: 'Consensus Building', sub: 'Aircover & Champion Enablement', color: '#72D669', icon: 'reply' },
  { id: 'pipeline', label: 'Enterprise Pipeline', sub: 'Unified RevOps Deal Velocity', color: '#FF6D00', icon: 'qualified' },
]

const STATUS_PILLS = [
  { label: 'Tiered', dot: '#00A6FF' },
  { label: 'Multi-Threaded', dot: '#38BDF8' },
  { label: 'Personalized', dot: '#FFA600' },
  { label: 'Consensus', dot: '#72D669' },
  { label: 'Sales-Ready', dot: '#FF6D00' },
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
      <path d="M7 4L3 8l4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 8h9a4 4 0 014 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function QualifiedIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2l2.2 4.5 4.8.7-3.5 3.4.8 4.9L9 13.2 4.7 15.5l.8-4.9L2 7.2l4.8-.7L9 2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

const ICON_MAP = {
  target: TargetIcon,
  person: PersonIcon,
  mail: MailIcon,
  engage: EngageIcon,
  reply: ReplyIcon,
  qualified: QualifiedIcon,
}

// ─── Automated Interactive Stage Pipeline ─────────────────────────────────────

function InteractivePipelineVisual({ prefersReducedMotion }) {
  const [activeStage, setActiveStage] = useState(0)
  const [completedStages, setCompletedStages] = useState([])

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStage(FLOW_STAGES.length - 1)
      setCompletedStages(FLOW_STAGES.map((_, i) => i))
      return
    }

    let cancelled = false
    let timerId = null

    const forward = (current) => {
      if (cancelled) return
      const N = FLOW_STAGES.length

      if (current < N) {
        setActiveStage(current)
        setCompletedStages(Array.from({ length: current }, (_, i) => i))
        timerId = setTimeout(() => forward(current + 1), 750)
      } else {
        timerId = setTimeout(() => {
          if (cancelled) return
          setCompletedStages(Array.from({ length: N }, (_, i) => i))
          setActiveStage(N)
          timerId = setTimeout(() => {
            if (cancelled) return
            setActiveStage(-1)
            setCompletedStages([])
            timerId = setTimeout(() => forward(0), 200)
          }, 400)
        }, 900)
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
      aria-label="Animated Account Based Experience pipeline workflow from tiered accounts to enterprise pipeline"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-surface/90 dark:bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-surface/90 dark:bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-surface/90 dark:bg-white/10" />
        </div>
        <span className="ml-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#00A6FF]/80 uppercase">
          ABX Command & Experience Center
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#72D669] animate-pulse" />
          <span className="text-[9px] font-mono text-[#72D669]/70 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/[0.04] overflow-x-auto scrollbar-none">
        {STATUS_PILLS.map((pill) => (
          <span
            key={pill.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium text-text-secondary bg-surface/80 dark:bg-white/[0.03] border border-white/[0.06] shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pill.dot }} />
            {pill.label}
          </span>
        ))}
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-2 relative">
        {FLOW_STAGES.map((stage, idx) => {
          const isActive = activeStage === idx
          const isCompleted = completedStages.includes(idx)
          const IconComp = ICON_MAP[stage.icon]

          return (
            <motion.div
              key={stage.id}
              initial={false}
              animate={
                isActive
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
              <span
                className="text-[9px] font-mono font-bold w-4 shrink-0"
                style={{ color: isActive ? stage.color : 'rgba(255,255,255,0.2)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {idx > 0 && (
                <div
                  className="absolute left-[28px] top-0 w-px h-2.5"
                  style={{ background: isCompleted ? `${stage.color}50` : 'rgba(255,255,255,0.06)' }}
                />
              )}

              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: isActive || isCompleted ? `${stage.color}18` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? stage.color : isCompleted ? `${stage.color}40` : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <IconComp color={isActive ? stage.color : isCompleted ? stage.color : 'rgba(255,255,255,0.3)'} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold tracking-tight truncate"
                    style={{ color: isActive ? '#FFFFFF' : isCompleted ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}
                  >
                    {stage.label}
                  </span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider text-black shrink-0"
                      style={{ backgroundColor: stage.color }}
                    >
                      Active
                    </motion.span>
                  )}
                  {isCompleted && (
                    <span className="text-[9px] text-[#72D669] font-mono shrink-0">✓</span>
                  )}
                </div>
                <p className="text-[10px] text-text-secondary truncate mt-0.5">
                  {stage.sub}
                </p>
              </div>

              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: stage.color, opacity: isActive ? 1 : 0.3 }} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Hero Component ────────────────────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  const handleStartConversation = () => navigate('/contact')

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('abx-process')
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
      className="relative min-h-[80vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-background pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-10 lg:pb-8 transition-colors duration-300"
      aria-label="Account Based Experience Hero"
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 15% 40%, rgba(0,166,255,0.1) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 85% 65%, rgba(255,109,0,0.07) 0%, transparent 70%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,166,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,166,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
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
          {/* Left: Content */}
          <div className="flex flex-col justify-center order-1 lg:order-1">
            <motion.div {...fadeUp(0.1)} className="flex items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                ACCOUNT BASED EXPERIENCE (ABX)
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] text-text-primary mb-4"
            >
              Transform account targeting into{' '}
              <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
                meaningful Account Based Experiences.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-normal mb-6 max-w-xl"
            >
              Taraj Global evolves traditional ABM into cohesive Account Based Experiences (ABX). We orchestrate hyper-personalized, multi-stakeholder buyer journeys that unite marketing, sales, and executive engagement around your most critical enterprise accounts.
            </motion.p>

            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <button
                onClick={handleStartConversation}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[#0070E0] text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Launch Your ABX Program</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface/80 dark:bg-white/5 border border-border hover:border-primary/50 text-text-primary font-semibold text-sm hover:bg-surface transition-all duration-200 cursor-pointer"
              >
                <span>Explore 9-Step Workflow</span>
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              </button>
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60"
            >
              <div>
                <div className="text-xl sm:text-2xl font-black text-text-primary font-mono">100%</div>
                <div className="text-xs text-text-secondary font-medium mt-0.5">Verified Buying Groups</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-text-primary font-mono">6–10</div>
                <div className="text-xs text-text-secondary font-medium mt-0.5">Stakeholder Touchpoints</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-text-primary font-mono">3x</div>
                <div className="text-xs text-text-secondary font-medium mt-0.5">Account Velocity Lift</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Command Center Visual */}
          <div className="flex items-center justify-center order-2 lg:order-2">
            <InteractivePipelineVisual prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

