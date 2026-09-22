import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Target, Search, Send, ShieldCheck, CalendarCheck, CheckCircle2, ArrowRight, ArrowLeft, Terminal, Cpu } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import CyberButton from './CyberButton'

const STAGES = [
  {
    num: '01',
    name: 'DEFINE',
    tagline: 'Strategic Foundation & TAM Calibration',
    desc: 'Aligning ICP, TAM boundaries, buyer personas, and qualification metrics.',
    deliverables: ['Custom ICP Blueprint', 'TAM Universe Sizing', 'Scoring & Qualification Framework'],
    metrics: 'Stage Duration: 3-5 Days',
    icon: Target,
    color: '#00A6FF',
    accentGlow: 'rgba(0, 166, 255, 0.4)',
  },
  {
    num: '02',
    name: 'IDENTIFY',
    tagline: 'Verified Intelligence & Intent Sourcing',
    desc: 'Extracting verified decision-maker records with direct dials & active intent signals.',
    deliverables: ['Human-Verified Direct Dials', 'Real-Time Intent Telemetry', 'Buying Committee Mapping'],
    metrics: '99.8% Data Accuracy SLA',
    icon: Search,
    color: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
  },
  {
    num: '03',
    name: 'ENGAGE',
    tagline: 'Multi-Touch Omnichannel Outreach',
    desc: 'Orchestrating multi-touch cold email, phone touchpoints, and asset syndication.',
    deliverables: ['Cold Email Sequences', 'Executive Phone Touchpoints', 'Asset Syndication Distribution'],
    metrics: 'Multi-Channel Air Cover',
    icon: Send,
    color: '#A78BFA',
    accentGlow: 'rgba(167, 139, 250, 0.4)',
  },
  {
    num: '04',
    name: 'QUALIFY',
    tagline: 'Strict BANT Commercial Gating',
    desc: 'Vetting accounts across BANT criteria to ensure true commercial readiness.',
    deliverables: ['Budget & Need Discovery', 'Authority Level Validation', 'Active Project Timeline Fit'],
    metrics: 'Zero Unqualified Meetings',
    icon: ShieldCheck,
    color: '#FFA600',
    accentGlow: 'rgba(255, 166, 0, 0.4)',
  },
  {
    num: '05',
    name: 'CONVERT',
    tagline: 'Sales Calendar Bookings & CRM Sync',
    desc: 'Booking confirmed meetings onto your sales calendars and syncing CRM data.',
    deliverables: ['Confirmed Calendar Invites', 'Full Account Dossier Briefing', 'Bi-Directional CRM Sync'],
    metrics: 'Direct Sales Pipeline Hand-Off',
    icon: CalendarCheck,
    color: '#FF6D00',
    accentGlow: 'rgba(255, 109, 0, 0.4)',
  },
]

export default function OperationalPipeline() {
  const [activeStage, setActiveStage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isInView) return
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, isPaused, isInView])

  const stage = STAGES[activeStage]
  const StageIcon = stage.icon

  const handlePrev = () => {
    setActiveStage((prev) => (prev === 0 ? STAGES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveStage((prev) => (prev + 1) % STAGES.length)
  }

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #020307 0%, #080f24 50%, #020307 100%)'
          : 'linear-gradient(180deg, #f8fafd 0%, #edf4fc 50%, #f8fafd 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="How We Turn Strategy Into Pipeline — Operational Process"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4"
            style={{
              background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
              border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
              color: isDark ? '#38BDF8' : '#0066CC',
            }}
          >
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>OPERATIONAL PIPELINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-5"
            style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
          >
            How We Turn Strategy Into{' '}
            <span
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 50%, #FF6D00 100%)'
                  : 'linear-gradient(135deg, #0066CC 0%, #0284C7 50%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Qualified Pipeline
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            A 5-stage systematic pipeline that replaces unpredictable guesswork with rigorous ICP targeting, verified outreach, and strict qualification gating.
          </motion.p>
        </div>

        {/* ══ INTERACTIVE 5-NODE SCRUBBER ══ */}
        <div className="relative mb-12 sm:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {STAGES.map((st, idx) => {
              const isActive = activeStage === idx
              const Icon = st.icon

              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center p-4 sm:p-5 rounded-2xl transition-all duration-300 relative cursor-pointer text-center"
                  style={{
                    background: isActive
                      ? isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)'
                      : isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
                    border: isActive
                      ? `1px solid ${st.color}`
                      : isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isActive
                      ? `0 10px 30px -5px ${st.accentGlow}`
                      : 'none',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300"
                    style={{
                      background: isActive
                        ? `${st.color}25`
                        : isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                      color: isActive ? st.color : isDark ? '#94A3B8' : '#64748B',
                      border: `1px solid ${isActive ? st.color : 'transparent'}`,
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-[10px] font-bold tracking-widest mb-1" style={{ color: isActive ? st.color : isDark ? '#64748B' : '#94A3B8' }}>
                    PHASE {st.num}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-tight" style={{ color: isActive ? (isDark ? '#FFFFFF' : '#0F172A') : (isDark ? '#94A3B8' : '#475569') }}>
                    {st.name}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activePipelineGlow"
                      className="absolute -bottom-1 left-4 right-4 h-[3px] rounded-full"
                      style={{ background: st.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ══ ACTIVE STAGE HERO PANEL WITH CYBER CONTROLS ══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl p-7 sm:p-10 lg:p-12 relative overflow-hidden backdrop-blur-xl border"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(8, 12, 24, 0.96) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 248, 255, 0.95) 100%)',
              borderColor: isDark ? `${stage.color}40` : `${stage.color}35`,
              boxShadow: isDark
                ? `0 25px 60px -20px ${stage.accentGlow}, 0 0 40px rgba(0,0,0,0.5)`
                : '0 25px 60px -20px rgba(0, 102, 204, 0.15)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${stage.color}, transparent)` }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: isDark ? `${stage.color}20` : `${stage.color}15`,
                      color: stage.color,
                      border: `1px solid ${stage.color}45`,
                      boxShadow: `0 0 20px ${stage.accentGlow}`,
                    }}
                  >
                    <StageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest block" style={{ color: stage.color }}>
                      STAGE {stage.num} // {stage.name}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                      {stage.tagline}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: isDark ? '#CBD5E1' : '#475569' }}>
                  {stage.desc}
                </p>

                {/* Stage Navigation Cyber Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="h-10 px-4 rounded-xl border flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                      color: isDark ? '#CBD5E1' : '#334155',
                    }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="h-10 px-4 rounded-xl border flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    style={{
                      borderColor: stage.color,
                      color: stage.color,
                      background: `${stage.color}15`,
                    }}
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono ml-3" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                    {stage.metrics}
                  </span>
                </div>
              </div>

              {/* Deliverables side */}
              <div className="lg:col-span-5">
                <div
                  className="p-6 rounded-2xl"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-4" style={{ color: stage.color }}>
                    KEY PHASE DELIVERABLES
                  </span>
                  <div className="space-y-3">
                    {stage.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: stage.color }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
