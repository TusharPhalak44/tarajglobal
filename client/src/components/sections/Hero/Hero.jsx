import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Target,
  Users,
  ShieldCheck,
  CalendarCheck,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { FlowButton } from '@components/ui/FlowButton'
import AnimatedGrid from '@components/animations/AnimatedGrid'

const TECH_METRICS = [
  {
    value: '99.8%',
    label: 'Verification SLA',
    sub: 'Custom Tooling',
    color: '#00A6FF'
  },
  {
    value: '100%',
    label: 'Automated ICP Calibration',
    sub: null,
    color: '#38BDF8'
  },
  {
    value: '$18M+',
    label: 'Verified Pipeline Routed',
    sub: null,
    color: '#FF6D00'
  },
  {
    value: 'Native CRM',
    label: 'End-to-End Delivery Engine',
    sub: null,
    color: '#10B981'
  },
]

const PIPELINE_STEPS = [
  {
    id: 1,
    step: '01',
    label: 'Account Calibration',
    sub: 'Verified In-Market ICP',
    metric: '2,400 Accounts',
    pct: 100,
    color: '#00A6FF',
    icon: Target,
    detail: 'Tier-1 firmographic, technographic, and intent filters applied.'
  },
  {
    id: 2,
    step: '02',
    label: 'Decision-Maker Outreach',
    sub: 'Buying Committee Coverage',
    metric: '680 Stakeholders',
    pct: 72,
    color: '#38BDF8',
    icon: Users,
    detail: 'Personalized multi-touch cadences engaging economic buyers.'
  },
  {
    id: 3,
    step: '03',
    label: 'BANT Qualification',
    sub: 'Pre-Vetted Intent Scoring',
    metric: '150 Sales-Ready Leads',
    pct: 45,
    color: '#FF6D00',
    icon: ShieldCheck,
    detail: 'Validated for Budget, Authority, Need, and Timeline.'
  },
  {
    id: 4,
    step: '04',
    label: 'Confirmed Appointments',
    sub: 'Direct-to-Calendar Placement',
    metric: '45 Discovery Calls',
    pct: 100,
    color: '#FFA600',
    icon: CalendarCheck,
    detail: 'Booked directly onto Account Executive calendars with dossiers.'
  }
]

export const Hero = () => {
  const [activeStep, setActiveStep] = useState(1)

  // Subtle cyclic animation of the live pipeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1))
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  const current = PIPELINE_STEPS.find((s) => s.id === activeStep) || PIPELINE_STEPS[0]
  const CurrentIcon = current.icon

  return (
    <section
      id="hero"
      className="relative flex items-center bg-background pt-[calc(var(--nav-offset)+14px)] pb-10 sm:pb-12 lg:min-h-[calc(100vh-var(--nav-offset))] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background ambient lighting aura */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 h-[480px] w-[480px] rounded-full bg-[#00A6FF]/[0.08] blur-[140px]" />
        <div className="absolute bottom-10 left-0 h-[420px] w-[420px] rounded-full bg-[#FF6D00]/[0.05] blur-[140px]" />
      </div>

      {/* Subtle Technical Coordinate Grid Background */}
      <AnimatedGrid size={64} opacity={0.035} />

      <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

          {/* ══ Left Editorial Column (Span 6) ════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            {/* Pre-header Eyebrow (Clean, Editorial, Global Font) */}
            <div className="mb-3 sm:mb-4 mt-2">
              <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
                TECH-POWERED B2B DEMAND &amp; AI-DRIVEN LEAD GENERATION
              </p>
            </div>

            {/* Main Headline (H1 - Refined & Minimized Scale) */}
            <h1
              id="hero-heading"
              className="text-[26px] sm:text-[34px] xl:text-[40px] font-black leading-[1.12] tracking-[-0.025em] text-white"
            >
              Demand Generation Driven by First-Party {''}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
                Data Infrastructure Solution
              </span>
            </h1>

            {/* Subheadline (Refined scale) */}
            <p className="mt-3.5 max-w-[540px] text-[13px] sm:text-[14.5px] leading-relaxed text-slate-300 font-normal">
              TaRaj Global accelerates enterprise revenue pipelines across North America, EMEA, and APAC. Combining multi-touch account targeting with our proprietary prospect verification engine, we validate decision-maker intelligence and route sales-ready opportunities through a unified CRM delivery lifecycle.
            </p>

            {/* Exact CTAs */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link 
                to="/contact" 
                data-cta="true"
                data-cta-section="Home Hero Section"
                data-cta-name="Build Your Sales Pipeline"
                className="w-full sm:w-auto"
              >
                <FlowButton
                  text="Build Your Sales Pipeline"
                  variant="primary"
                  className="w-full sm:w-auto min-h-[46px] px-6 justify-center text-[14px] font-bold shadow-[0_10px_25px_-8px_rgba(255,109,0,0.5)]"
                />
              </Link>
              <Link
                to="/services"
                data-cta="true"
                data-cta-section="Home Hero Section"
                data-cta-name="Explore Tech & Services"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-[13px] font-semibold text-white hover:border-[#00A6FF] hover:bg-[#00A6FF]/10 transition-colors"
              >
                <span>Explore Tech &amp; Services</span>
                <ArrowRight size={13} className="text-[#00A6FF]" />
              </Link>
            </div>


            {/* Updated Tech-Metrics Ribbon (Compact & Minimized) */}
            <div className="mt-6 sm:mt-7 w-full pt-5 border-t border-white/10">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {TECH_METRICS.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col p-2 sm:p-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all group"
                  >
                    <dd className="text-lg sm:text-[20px] font-black tracking-tight font-mono leading-tight" style={{ color: item.color }}>
                      {item.value}
                    </dd>
                    <dt className="mt-1 text-[10.5px] font-bold text-white leading-tight">
                      {item.label}
                    </dt>
                    {item.sub && (
                      <span className="text-[9.5px] font-mono text-slate-400 mt-0.5">
                        ({item.sub})
                      </span>
                    )}
                  </div>
                ))}
              </dl>
            </div>

          </div>

          {/* ══ Right Column: Animated Live Pipeline Simulation (Span 6) ═════ */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[530px] rounded-2xl border border-white/15 bg-[#090E1B] p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden">

              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A6FF]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Pipeline Architecture
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-slate-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                  Target to Conversion
                </span>
              </div>

              {/* 4 Interactive Animated Pipeline Stage Selectors */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {PIPELINE_STEPS.map((s) => {
                  const isSelected = activeStep === s.id
                  const Icon = s.icon
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveStep(s.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${isSelected
                        ? 'border-[#00A6FF] bg-[#00A6FF]/15 text-white shadow-[0_0_15px_rgba(0,166,255,0.3)] ring-1 ring-[#00A6FF]'
                        : 'border-white/[0.08] bg-[#050811] text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                    >
                      <Icon size={16} style={{ color: isSelected ? s.color : '#94A3B8' }} />
                      <span className="font-mono text-[11px] font-black mt-1">
                        {s.step}
                      </span>
                      <span className="text-[10px] font-medium truncate max-w-full opacity-80">
                        {s.label.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Animated Stage Live Telemetry Canvas */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="mt-4 rounded-xl border border-white/[0.08] bg-[#04060E] p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/[0.06] text-white">
                        <CurrentIcon size={16} style={{ color: current.color }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {current.label}
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          {current.sub}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-black text-white" style={{ color: current.color }}>
                      {current.metric}
                    </span>
                  </div>

                  {/* Dynamic Animated Pipeline Laser Beam */}
                  <div className="mt-3 relative h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: current.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${current.pct}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Live Signal Footer */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Zap size={13} className="text-[#00A6FF]" />
                  <span>Real-Time Buying Signals</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#FF6D00]">
                  Step {current.step} / 04 Active
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
