import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3, Database, Calendar, Layers, Activity, Radio } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import CyberButton from './CyberButton'

const PIPELINE_STEPS = [
  {
    id: '01',
    name: 'Data Intelligence',
    title: 'Precision ICP & Intent Scoring',
    metric: '99.8% Accuracy',
    desc: 'Deep TAM discovery, direct-dial extraction, and intent-signal mapping across your target accounts.',
    badge: 'STAGE 01 // DISCOVER',
    icon: Database,
    color: '#00A6FF',
    accentGlow: 'rgba(0, 166, 255, 0.4)',
    deliverables: ['Custom TAM Mapping', 'Intent Telemetry', 'Direct Dial Verification'],
  },
  {
    id: '02',
    name: 'Multi-Touch Outbound',
    title: 'Synchronized Omnichannel Touch',
    metric: '4.2x Reply Lift',
    desc: 'Coordinated email cadences, phone touchpoints, and custom content delivery to executive decision-makers.',
    badge: 'STAGE 02 // ENGAGE',
    icon: Zap,
    color: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    deliverables: ['Cold Email Cadences', 'Asset Syndication', 'ABM Social Surfacing'],
  },
  {
    id: '03',
    name: 'BANT Qualification',
    title: 'Strict Commercial Gating',
    metric: '100% Vetted Leads',
    desc: 'Every account is strictly scored against Budget, Authority, Need, and Timeline parameters before passing.',
    badge: 'STAGE 03 // QUALIFY',
    icon: ShieldCheck,
    color: '#FFA600',
    accentGlow: 'rgba(255, 166, 0, 0.4)',
    deliverables: ['BANT Matrix Verification', 'Buying Authority Check', 'Active Project Fit'],
  },
  {
    id: '04',
    name: 'Meeting Delivery',
    title: 'Confirmed Sales Pipeline',
    metric: 'Zero No-Show Guarantee',
    desc: 'High-intent introductory and discovery meetings scheduled directly onto your sales team calendars.',
    badge: 'STAGE 04 // CONVERT',
    icon: Calendar,
    color: '#FF6D00',
    accentGlow: 'rgba(255, 109, 0, 0.4)',
    deliverables: ['Direct Calendar Bookings', 'Complete Account Dossier', 'CRM Bi-Directional Sync'],
  },
]

const TRUST_PILLS = [
  { label: '99.8% Data Accuracy SLA', icon: ShieldCheck, color: '#38BDF8' },
  { label: '100% GDPR & CCPA Compliant', icon: CheckCircle2, color: '#34D399' },
  { label: '2,100+ Campaigns Delivered', icon: BarChart3, color: '#FFA600' },
  { label: 'Custom ICP Calibration', icon: Layers, color: '#FF6D00' },
]

export default function ModernServicesHero() {
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, isPaused])

  const handleScrollToGrid = () => {
    const el = document.getElementById('services-grid')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const currentStep = PIPELINE_STEPS[activeStep]
  const CurrentIcon = currentStep.icon

  return (
    <section
      className="relative min-h-[94vh] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse 100% 70% at 50% -15%, #0e2447 0%, #050813 55%, #020307 100%)'
          : 'radial-gradient(ellipse 100% 70% at 50% -15%, #e1effe 0%, #f4f8fe 50%, #eef3f9 100%)',
      }}
      aria-label="Taraj Global B2B Services Overview"
    >
      {/* ── Futuristic Rotating Holographic Radar Rings ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Animated Conic Radar Sweep */}
        <motion.div
          animate={prefersReducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: isDark
              ? 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 166, 255, 0.3) 60deg, transparent 90deg)'
              : 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 102, 204, 0.25) 60deg, transparent 90deg)',
          }}
        />

        {/* Concentric Telemetry Circles */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-sky-500/10" />
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-sky-500/15" />
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-sky-500/20" />

        {/* Ambient Glowing Orbs */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[140px]"
          style={{ background: isDark ? 'rgba(0, 166, 255, 0.18)' : 'rgba(0, 102, 204, 0.12)' }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/4 -right-32 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: isDark ? 'rgba(255, 109, 0, 0.16)' : 'rgba(255, 107, 0, 0.1)' }}
        />

        {/* Cyber Digital Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? '#38BDF8' : '#0066CC'} 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center py-6 sm:py-10">

          {/* ══ LEFT: High-Impact Typography & New Cyber Buttons ══ */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col">

            {/* Glowing Live HUD Pill */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider self-start mb-6 backdrop-blur-xl"
              style={{
                background: isDark ? 'rgba(0, 166, 255, 0.1)' : 'rgba(0, 102, 204, 0.08)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(0, 102, 204, 0.25)',
                color: isDark ? '#38BDF8' : '#0066CC',
                boxShadow: isDark ? '0 0 25px rgba(0, 166, 255, 0.25)' : 'none',
              }}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-sky-400" />
              <span>ORBITAL B2B REVENUE ENGINE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] font-black tracking-tight leading-[1.05] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Everything You Need{' '}
              <span className="block mt-1">
                to Build Better{' '}
                <span
                  className="inline-block relative"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 45%, #FF6D00 100%)'
                      : 'linear-gradient(135deg, #0066CC 0%, #0284C7 45%, #EA580C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  B2B Growth.
                </span>
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl font-normal"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              From demand generation to qualified leads and appointment setting, we connect the right strategies, data and execution to help B2B businesses create meaningful opportunities.
            </motion.p>

            {/* Redesigned Attractive Cyber Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
            >
              <CyberButton
                onClick={handleScrollToGrid}
                variant="primary"
                size="lg"
                sparkle={true}
              >
                Explore All 13 Services
              </CyberButton>

              <CyberButton
                to="/contact"
                variant="glass"
                size="lg"
              >
                Schedule Strategy Call
              </CyberButton>
            </motion.div>
          </div>

          {/* ══ RIGHT: High-Tech Telemetry HUD Console ══ */}
          <div
            className="lg:col-span-6 xl:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Floating 3D Badge 1: +42% Velocity Lift */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-6 -right-4 z-20 items-center gap-2.5 px-4 py-2 rounded-2xl backdrop-blur-xl border shadow-xl"
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(0, 102, 204, 0.3)',
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
              <div className="text-xs">
                <span className="font-bold text-sky-400">+4.2x</span>{' '}
                <span className="font-medium text-[11px] opacity-80">Pipeline Velocity</span>
              </div>
            </motion.div>

            {/* Terminal Glass Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-6 sm:p-8 overflow-hidden backdrop-blur-2xl transition-all duration-500"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(13, 23, 42, 0.88) 0%, rgba(8, 12, 24, 0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                boxShadow: isDark
                  ? '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 45px rgba(0, 166, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
                  : '0 30px 70px -15px rgba(0, 102, 204, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)',
              }}
            >
              {/* Terminal Top Bar */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
                  <span className="font-mono text-xs ml-2 tracking-wider font-semibold" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    LIVE PROTOCOL CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 102, 204, 0.1)',
                      color: isDark ? '#38BDF8' : '#0066CC',
                    }}
                  >
                    ORCHESTRATING
                  </span>
                </div>
              </div>

              {/* 4 Pipeline Step Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {PIPELINE_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl transition-all duration-300 text-center relative cursor-pointer"
                      style={{
                        background: isActive
                          ? isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(0, 102, 204, 0.12)'
                          : isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                        border: isActive
                          ? isDark ? `1px solid ${step.color}` : `1px solid ${step.color}`
                          : '1px solid transparent',
                        boxShadow: isActive ? `0 0 20px ${step.accentGlow}` : 'none',
                      }}
                    >
                      <span
                        className="font-mono text-[10px] font-bold tracking-widest mb-1"
                        style={{ color: isActive ? step.color : (isDark ? '#64748B' : '#94A3B8') }}
                      >
                        {step.id}
                      </span>
                      <span
                        className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-1"
                        style={{ color: isActive ? (isDark ? '#FFFFFF' : '#0F172A') : (isDark ? '#94A3B8' : '#64748B') }}
                      >
                        {step.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabGlow"
                          className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                          style={{ background: step.color }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Active Stage Details Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-5 sm:p-6 rounded-2xl"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: isDark ? `${currentStep.color}20` : `${currentStep.color}15`,
                          color: currentStep.color,
                          border: `1px solid ${currentStep.color}40`,
                          boxShadow: `0 0 15px ${currentStep.accentGlow}`,
                        }}
                      >
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest block" style={{ color: currentStep.color }}>
                          {currentStep.badge}
                        </span>
                        <h2 className="text-base sm:text-lg font-bold leading-tight" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                          {currentStep.title}
                        </h2>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0"
                      style={{
                        background: `${currentStep.color}18`,
                        color: currentStep.color,
                        border: `1px solid ${currentStep.color}40`,
                      }}
                    >
                      {currentStep.metric}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    {currentStep.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentStep.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                        style={{
                          background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                          color: isDark ? '#CBD5E1' : '#334155',
                          border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: currentStep.color }} />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Terminal Footer */}
              <div className="mt-5 flex items-center justify-between text-xs font-mono" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                <span>CYCLE SPEED: 4.2s</span>
                <span>HOVER TO PAUSE</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ══ Enterprise Trust Confidence Bar ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-6 sm:pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
        >
          {TRUST_PILLS.map((pill, idx) => {
            const Icon = pill.icon
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.7)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: isDark ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: isDark ? `${pill.color}15` : `${pill.color}12`,
                    color: pill.color,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold tracking-tight" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                  {pill.label}
                </span>
              </div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
