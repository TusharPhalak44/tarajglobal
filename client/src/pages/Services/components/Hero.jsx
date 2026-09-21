import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Layers, ShieldCheck, Zap, BarChart3, Users, Sparkles, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ─── 6-Stage Full-Funnel Flow Visual ─────────────────────────────────────────

const FLOW_STAGES = [
  { id: 'intelligence', label: 'Account Intelligence', sub: 'TAM & ICP Discovery', color: '#00A6FF', icon: 'intelligence' },
  { id: 'verification', label: 'Decision Makers', sub: 'Triple-Layer Verified', color: '#38BDF8', icon: 'verification' },
  { id: 'outreach', label: 'Omnichannel Outreach', sub: 'Email · ABM · Cadence', color: '#8B5CF6', icon: 'outreach' },
  { id: 'qualification', label: 'Lead Qualification', sub: 'MQL · BANT · SQL Vetting', color: '#FFA600', icon: 'qualification' },
  { id: 'appointment', label: 'Sales Appointment', sub: 'Direct Calendar Sync', color: '#10B981', icon: 'appointment' },
  { id: 'pipeline', label: 'Revenue Pipeline', sub: 'Accelerated Deal Velocity', color: '#FF6D00', icon: 'pipeline' },
]

const STATUS_PILLS = [
  { label: 'Targeted', dot: '#00A6FF' },
  { label: 'Verified', dot: '#38BDF8' },
  { label: 'Engaged', dot: '#8B5CF6' },
  { label: 'Qualified', dot: '#FFA600' },
  { label: 'Pipeline Ready', dot: '#10B981' },
]

function StageIcon({ type, color }) {
  if (type === 'intelligence') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" />
        <circle cx="9" cy="9" r="4.5" stroke={color} strokeWidth="1.5" />
        <circle cx="9" cy="9" r="2" fill={color} />
      </svg>
    )
  }
  if (type === 'verification') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3.5" stroke={color} strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'outreach') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
        <path d="M2 7l7 4 7-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'qualification') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v3M9 13v3M2 9h3M13 9h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="1.5" />
      </svg>
    )
  }
  if (type === 'appointment') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 9H14M8 5l-4 4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (type === 'pipeline') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 9.5L7.5 13l6.5-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
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
    let timer = null

    const runSequence = () => {
      setCompletedStages([])
      setActiveStage(0)

      let current = 0
      const advance = () => {
        if (cancelled) return
        if (current < FLOW_STAGES.length - 1) {
          current += 1
          setActiveStage(current)
          setCompletedStages((prev) => [...prev, current - 1])
          timer = setTimeout(advance, 1400)
        } else {
          setCompletedStages([0, 1, 2, 3, 4, 5])
          timer = setTimeout(() => {
            if (!cancelled) runSequence()
          }, 3200)
        }
      }

      timer = setTimeout(advance, 1400)
    }

    runSequence()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [prefersReducedMotion])

  const currentStage = FLOW_STAGES[activeStage]

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 sm:mt-12">
      {/* Visual Container */}
      <div className="relative rounded-2xl border border-border bg-surface/80 dark:bg-[#0c1424]/90 backdrop-blur-xl p-5 sm:p-7 shadow-2xl shadow-primary/5 transition-all duration-300">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-text-secondary">
              Services Pipeline Engine &bull; Live Telemetry
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {STATUS_PILLS.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border border-border bg-background/60"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pill.dot }} />
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        {/* 6-Stage Progress Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          {FLOW_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx
            const isDone = completedStages.includes(idx)

            return (
              <div
                key={stage.id}
                className={`relative flex flex-col p-3 rounded-xl border transition-all duration-300 select-none ${
                  isActive
                    ? 'border-primary bg-primary/10 shadow-lg scale-102 ring-1 ring-primary/40'
                    : isDone
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-border bg-background/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    <StageIcon type={stage.icon} color="#ffffff" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-text-tertiary">
                    {`0${idx + 1}`}
                  </span>
                </div>

                <div className="text-xs font-bold text-text-primary leading-tight line-clamp-1">
                  {stage.label}
                </div>
                <div className="text-[10px] text-text-secondary leading-snug mt-0.5 line-clamp-1">
                  {stage.sub}
                </div>

                {/* Micro completion badge */}
                {isDone && (
                  <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono text-emerald-500 font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </div>
                )}
                {isActive && (
                  <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono text-primary font-bold animate-pulse">
                    &bull; Active
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Live Active Insight Bar */}
        <div className="mt-6 p-3 sm:p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: currentStage.color }}
            />
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                Current Execution Stage: <span style={{ color: currentStage.color }}>{currentStage.label}</span>
              </div>
              <div className="text-[11px] text-text-secondary mt-0.5">
                Targeting and synchronizing revenue growth across all 12 specialized B2B services.
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-surface border border-border shrink-0">
            <span className="text-emerald-500 font-bold">98.6%</span> Accuracy SLA
          </div>
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const scrollToServices = () => {
    const el = document.getElementById('services-catalog')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="services-hero"
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-background text-text-primary border-b border-border"
      aria-label="Taraj Global B2B Services Overview"
    >
      {/* Soft Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-15 dark:opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, #FF6D00 60%, transparent 80%)' }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary dark:text-[#00d2ff] mb-4 sm:mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-[11.5px] font-mono font-bold tracking-[0.14em] uppercase">
            Full-Funnel B2B Demand & Lead Generation
          </span>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase max-w-4xl mx-auto">
          <span>Data-Driven B2B Services Engineered For </span>
          <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
            Predictable Pipeline Growth
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal">
          From intent data and decision-maker validation to sales-qualified meetings and multi-touch outreach cadences, Taraj Global delivers turnkey B2B services that fuel consistent revenue growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-102 active:scale-98 transition-all cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface hover:bg-surface/80 text-text-primary text-sm font-bold hover:border-primary/40 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <span>Explore 12 Core Services</span>
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Command Center Pipeline Simulation */}
        <CommandCenter prefersReducedMotion={prefersReducedMotion} />

        {/* Trust Counter Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-10 border-t border-border/80">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-text-primary font-mono">12+</span>
            <span className="text-xs text-text-secondary mt-0.5">Specialized B2B Services</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-primary font-mono">98.6%</span>
            <span className="text-xs text-text-secondary mt-0.5">Verified Contact Accuracy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-text-primary font-mono">500K+</span>
            <span className="text-xs text-text-secondary mt-0.5">Decision Makers Reached</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-cta font-mono">$45M+</span>
            <span className="text-xs text-text-secondary mt-0.5">Client Pipeline Generated</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
