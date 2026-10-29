import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── ABM Command Center Flow Visual ───────────────────────────────────────────

const FLOW_STAGES = [
  { id: 'target', label: 'Target Account Selection', sub: 'Tier-1 TAL · Firmographic ICP', color: '#00A6FF', icon: 'target' },
  { id: 'committee', label: 'Buying Committee Mapping', sub: '6–10 Verified C-Suite Roles', color: '#38BDF8', icon: 'person' },
  { id: 'content', label: 'Bespoke 1:1 Narratives', sub: 'Custom Executive Briefings', color: '#00A6FF', icon: 'mail' },
  { id: 'aircover', label: 'Omnichannel Aircover', sub: 'Synchronized Multi-Touch Cadence', color: '#FFA600', icon: 'engage' },
  { id: 'intent', label: 'Intent Surge Telemetry', sub: 'Active Solution Evaluation', color: '#72D669', icon: 'reply' },
  { id: 'pipeline', label: 'Won Enterprise ACV', sub: 'Sales-Ready Opportunity Sync', color: '#FF6D00', icon: 'qualified' },
]

const STATUS_PILLS = [
  { label: 'TAL Scored', dot: '#00A6FF' },
  { label: 'Committee Mapped', dot: '#38BDF8' },
  { label: 'Aircover Live', dot: '#FFA600' },
  { label: 'Surge Active', dot: '#72D669' },
  { label: 'Won ACV', dot: '#FF6D00' },
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
    case 'target': return <TargetIcon color={color} />
    case 'person': return <PersonIcon color={color} />
    case 'mail': return <MailIcon color={color} />
    case 'engage': return <EngageIcon color={color} />
    case 'reply': return <ReplyIcon color={color} />
    case 'qualified': return <QualifiedIcon color={color} />
    default: return <TargetIcon color={color} />
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
      current = (current + 1) % FLOW_STAGES.length
      setActiveStage(current)

      setCompletedStages(() => {
        const completed = []
        for (let i = 0; i < current; i++) {
          completed.push(i)
        }
        return completed
      })

      const delay = current === FLOW_STAGES.length - 1 ? 3600 : 2200
      timerId = setTimeout(advance, delay)
    }

    timerId = setTimeout(advance, 2200)

    return () => {
      cancelled = true
      clearTimeout(timerId)
    }
  }, [prefersReducedMotion])

  const stage = FLOW_STAGES[activeStage]

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-2xl transition-all duration-300"
      style={{
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(0,166,255,0.08)',
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-raised">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
          <span className="ml-2 font-mono text-xs text-text-secondary">DemandFlow™ ABM Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A6FF] animate-pulse" />
          <span className="font-mono text-xs text-[#00A6FF]">LIVE CAMPAIGN</span>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Active Stage Callout */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface-raised">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
              style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}40` }}
            >
              <StageIcon type={stage.icon} color={stage.color} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
                STAGE {activeStage + 1} OF {FLOW_STAGES.length}
              </span>
              <p className="text-sm font-bold text-text-primary leading-tight">{stage.label}</p>
            </div>
          </div>
          <span
            className="text-xs font-mono font-bold px-2.5 py-1 rounded-full border transition-all duration-300"
            style={{
              background: `${stage.color}15`,
              borderColor: `${stage.color}40`,
              color: stage.color,
            }}
          >
            {stage.sub}
          </span>
        </div>

        {/* 6 Stages Stepper Grid */}
        <div className="space-y-2">
          {FLOW_STAGES.map((s, idx) => {
            const isActive = idx === activeStage
            const isDone = completedStages.includes(idx)

            return (
              <div
                key={s.id}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-all duration-300 ${
                  isActive
                    ? 'border border-[#00A6FF]/40 bg-[#00A6FF]/10 text-text-primary font-semibold'
                    : isDone
                    ? 'text-text-secondary opacity-60'
                    : 'text-text-secondary/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#00A6FF] text-white'
                        : isDone
                        ? 'bg-[#00A6FF]/30 text-[#00A6FF]'
                        : 'bg-border text-text-secondary'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </span>
                  <span>{s.label}</span>
                </div>
                <span className="font-mono text-[10px] opacity-75">{s.sub}</span>
              </div>
            )
          })}
        </div>

        {/* Status Badges */}
        <div className="pt-2 border-t border-border flex flex-wrap gap-2">
          {STATUS_PILLS.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-border bg-surface-raised text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.dot }} />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const handleStartCampaign = () => {
    navigate('/contact')
  }

  const handleSeeHowItWorks = () => {
    const el = document.getElementById('abm-process')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
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
      id="abm-hero"
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-background"
      aria-label="Account-Based Marketing Services Hero"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />

        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-15"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[500px] h-[400px] rounded-full blur-[130px] opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6D00 0%, transparent 70%)' }}
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
          {/* Left Column: Copy & Actions */}
          <div className="flex flex-col justify-center order-1 lg:order-1">
            <motion.div {...fadeUp(0.1)} className="flex items-center mb-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                TECH-ENABLED ABM ARCHITECTURE
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.2] text-text-primary mb-4"
            >
              <span className="block pb-1 sm:pb-1.5">Account-Based Marketing </span>
              <div
                className="inline-block bg-clip-text text-transparent pt-0.5 leading-[1.28]"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #67E8F9 100%)' }}
              >
                That Turns Target Accounts Into Pipeline
              </div>
            </motion.h1>

            <motion.p
              {...fadeUp(0.32)}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 max-w-[540px]"
            >
              Stop spreading outreach across accounts that were never going to buy. TaRaj Global pairs AI-assisted account scoring with our proprietary verification engine to engage buying committees at high-fit enterprise accounts across US, EMEA, and APAC, routed straight into your CRM. 
            </motion.p>

            <motion.div {...fadeUp(0.42)} className="flex flex-col sm:flex-row flex-wrap gap-3.5">
              <button
                onClick={handleStartCampaign}
                id="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm text-text-accent dark:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer shadow-md hover:shadow-lg hover:brightness-105"
                style={{
                  background: '#FF6D00',
                  boxShadow: '0 4px 20px rgba(0,166,255,0.3)',
                }}
              >
                 Deploy Custom ABM Campaign 
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                id="hero-cta-secondary"
                className="text-text-accent dark:text-white group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer hover:brightness-110"
                style={{ background: 'transparent', color: 'inherit', boxShadow: 'none', border: '1.5px solid currentColor' }}
              >
             Explore ABM Architecture
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Command Center */}
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

