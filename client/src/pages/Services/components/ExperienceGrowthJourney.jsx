import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, Crosshair, MessageSquare, CheckCircle2, UserCheck, TrendingUp } from 'lucide-react'

const JOURNEY_STAGES = [
  {
    step: '01',
    title: 'Identify',
    subtitle: 'Data Hygiene & TAM Mapping',
    icon: Search,
    desc: 'Cleanse legacy databases and map net-new verified enterprise accounts matching strict revenue, tech-stack, and headcount filters.',
    connectedServices: [
      { name: 'B2B List Building', route: '/b2b-list-building' },
      { name: 'Database Cleansing', route: '/database-cleansing' },
    ],
  },
  {
    step: '02',
    title: 'Target',
    subtitle: 'Tier-1 Committee Profiling',
    icon: Crosshair,
    desc: 'Isolate key buying centers, uncover decision-maker org charts, and formulate 1:1 and 1:few account-level engagement blueprints.',
    connectedServices: [
      { name: 'Account-Based Marketing', route: '/abm' },
    ],
  },
  {
    step: '03',
    title: 'Engage',
    subtitle: 'Omnichannel Narrative Pull',
    icon: MessageSquare,
    desc: 'Syndicate targeted thought-leadership assets, run warm email dialogues, and host high-retention live digital webinars.',
    connectedServices: [
      { name: 'Demand Generation', route: '/demand-generation' },
      { name: 'Content Syndication', route: '/content-syndication' },
      { name: 'Webinar Services', route: '/webinar-services' },
      { name: 'B2B Email Marketing', route: '/b2b-email-marketing' },
    ],
  },
  {
    step: '04',
    title: 'Qualify',
    subtitle: 'BANT Rigor & Intent Scoring',
    icon: CheckCircle2,
    desc: 'Every inbound signal and outbound respondent is scored against Budget, Authority, Need, and Timeline before sales engagement.',
    connectedServices: [
      { name: 'BANT Lead Generation', route: '/bant-lead-generation' },
      { name: 'MQL Services', route: '/mql-services' },
    ],
  },
  {
    step: '05',
    title: 'Convert',
    subtitle: 'Calendar Bookings & SQL Delivery',
    icon: UserCheck,
    desc: 'Deliver double-confirmed discovery calls and high-intent sales qualified prospects straight into your reps’ calendars.',
    connectedServices: [
      { name: 'B2B Appointment Setting', route: '/b2b-appointment-setting' },
      { name: 'SQL Services', route: '/sql-services' },
    ],
  },
  {
    step: '06',
    title: 'Grow',
    subtitle: 'Pipeline Nurturing & Expansion',
    icon: TrendingUp,
    desc: 'Continuous lifecycle nurturing of delayed deals, stalled opportunities, and expansion across subsidiary business units.',
    connectedServices: [
      { name: 'Lead Nurturing', route: '/lead-nurturing' },
    ],
  },
]

export default function ExperienceGrowthJourney() {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  const current = JOURNEY_STAGES[activeStep]

  return (
    <section
      id="growth-journey-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                UNIFIED PIPELINE PIPELINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              How Our Services <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Connect & Compound
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Our capabilities don’t live in silos. Each module feeds the next to produce a frictionless revenue compounder.
          </p>
        </div>

        {/* ══════════ HORIZONTAL CONTINUOUS TIMELINE / NODES ══════════ */}
        <div className="relative mb-12">
          {/* Base Horizontal Connecting Track Line */}
          <div className="hidden lg:block absolute top-[28px] left-[4%] right-[4%] h-[2px] bg-white/10 -z-0">
            {/* Animated Progress Filled Line */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6D00] via-[#FF8A00] to-[#FF6D00]"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (JOURNEY_STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {/* 6 Interactive Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = activeStep === idx
              const isPassed = idx < activeStep
              const StageIcon = stage.icon

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col items-start ${
                    isActive
                      ? 'bg-white/[0.08] border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.25)]'
                      : isPassed
                      ? 'bg-white/[0.03] border-white/20 text-white/80'
                      : 'bg-white/[0.01] border-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  {/* Top Node Indicator Circle */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#FF6D00] text-black shadow-md shadow-[#FF6D00]/50'
                          : isPassed
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {stage.step}
                    </div>
                    <StageIcon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#FF6D00]' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    />
                  </div>

                  <span className="text-sm font-bold uppercase tracking-wider text-white">
                    {stage.title}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 truncate w-full mt-0.5">
                    {stage.subtitle.split('&')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ══════════ ACTIVE STAGE DETAIL HERO DISPLAY ══════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left narrative */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[11px] text-[#FF6D00] uppercase">
                  <span>STAGE {current.step} OF 06</span>
                  <span>//</span>
                  <span>{current.subtitle}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                  {current.desc}
                </p>
              </div>

              {/* Right connected services */}
              <div className="lg:col-span-6">
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
                  INTEGRATED ENGINE CAPABILITIES AT THIS STAGE:
                </div>

                <div className="flex flex-wrap gap-3">
                  {current.connectedServices.map((srv) => (
                    <button
                      key={srv.route}
                      onClick={() => navigate(srv.route)}
                      className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#FF6D00] hover:border-[#FF6D00] text-white hover:text-black transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                        {srv.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#FF6D00] group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
