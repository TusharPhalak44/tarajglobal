import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Target,
  Calendar,
  Activity,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useReducedMotion } from '@hooks/useReducedMotion'

// Infinite Marquee Telemetry Ticker Items
const TELEMETRY_STREAM = [
  { text: 'Lead Qualified: Director of Cloud @ Enterprise SaaS', badge: 'SQL READY', color: 'text-[#FF6D00]' },
  { text: 'Meeting Confirmed: VP IT Infrastructure @ Global Fintech', badge: 'CALENDAR SYNC', color: 'text-emerald-400' },
  { text: 'BANT Validated: Budget $180k+ Timeline Q3/Q4 Confirmed', badge: 'AUDITED SLA', color: 'text-amber-400' },
  { text: 'ABM Engagement: 6 of 7 Stakeholders Active @ Fortune 500', badge: 'TIER-1 LOGO', color: 'text-purple-400' },
  { text: 'Data Cleansed: 14,000 Records Verified & Enriched', badge: '99% ACCURACY', color: 'text-blue-400' },
]

// 4 Interactive Kinetic Growth Modules
const KINETIC_MODULES = [
  {
    id: 'sql',
    step: '01',
    name: 'SQL Lead Generation',
    tag: 'BUDGET & INTENT',
    metric: '+340%',
    metricLabel: 'Pipeline Velocity',
    desc: 'Pre-qualified, sales-ready prospects actively evaluating solutions in your category.',
    route: '/sql-services',
    pulseSpeed: 3,
  },
  {
    id: 'abm',
    step: '02',
    name: 'Enterprise ABM',
    tag: 'TIER-1 TARGETING',
    metric: '92%',
    metricLabel: 'Committee Reach',
    desc: 'Multi-stakeholder orchestration penetrating strategic enterprise buying committees.',
    route: '/abm',
    pulseSpeed: 3.4,
  },
  {
    id: 'appointments',
    step: '03',
    name: 'Appointment Setting',
    tag: 'CALENDAR BOOKINGS',
    metric: '85%+',
    metricLabel: 'Show-Up Rate',
    desc: 'Double-confirmed discovery calls placed straight into your sales reps’ calendars.',
    route: '/b2b-appointment-setting',
    pulseSpeed: 2.8,
  },
  {
    id: 'demand',
    step: '04',
    name: 'Demand Generation',
    tag: 'OMNICHANNEL SCALE',
    metric: '48%',
    metricLabel: 'Conversion Lift',
    desc: 'Syndicating high-value assets to targeted decision-makers on a performance CPL model.',
    route: '/demand-generation',
    pulseSpeed: 3.2,
  },
]

export default function ExperienceHero() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [activeModule, setActiveModule] = useState(null)

  const scrollToServices = () => {
    const el = document.getElementById('pillar-directory-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="experience-hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-14 lg:pt-32 lg:pb-16 bg-[#05070B] text-white overflow-hidden border-b border-white/10 select-none"
    >
      {/* ══════════ FULL DYNAMIC BACKGROUND ANIMATIONS ══════════ */}
      {/* Continuous floating glow orb 1 */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 50, -30, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.15, 0.95, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/6 left-1/3 w-[600px] h-[400px] bg-[#FF6D00]/12 rounded-full blur-[160px] pointer-events-none -z-10"
      />

      {/* Continuous floating glow orb 2 */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -40, 30, 0],
                y: [0, 35, -25, 0],
                scale: [1, 0.9, 1.1, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[380px] bg-primary/14 rounded-full blur-[170px] pointer-events-none -z-10"
      />

      {/* Animated subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Sweeping laser light beam */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: ['-100%', '200%'],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#FF6D00] to-transparent pointer-events-none"
      />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto flex flex-col items-center text-center">
        {/* ══════════ TOP: Luminous Eyebrow Badge ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-5 shadow-sm hover:border-[#FF6D00]/40 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6D00]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-white/90">
            NEXT-GEN REVENUE ARCHITECTURE
          </span>
          <span className="hidden sm:inline text-white/30 text-xs">|</span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase text-[#FF6D00] font-semibold">
            AUDITED SLA
          </span>
        </motion.div>

        {/* ══════════ CENTER: Balanced & Refined Heading (Not Too Big!) ══════════ */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08] text-white max-w-4xl"
        >
          Build a Stronger <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#FF6D00]">
            B2B Growth Engine.
          </span>
        </motion.h1>

        {/* Narrative Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed font-normal max-w-2xl"
        >
          From pinpointing in-market accounts to orchestrating verified sales conversations, TaRaj Global turns cold outreach into predictable revenue pipeline.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-4"
        >
          <StarButton onClick={() => navigate('/contact')}>
            Start a Conversation
          </StarButton>

          <button
            type="button"
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-all hover:border-[#FF6D00]/60 shadow-xs cursor-pointer group"
          >
            <span>Explore 12 Solutions</span>
            <ChevronDown className="w-4 h-4 text-white/60 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* ══════════ MIDDLE: Live Flowing Kinetic Marquee Ribbon ══════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 w-full overflow-hidden border-y border-white/10 bg-white/[0.02] backdrop-blur-md py-3 relative"
        >
          {/* Gradient edge fades for seamless marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#05070B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#05070B] to-transparent z-10 pointer-events-none" />

          {/* Continuous looping ticker */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: ['0%', '-50%'],
                  }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-10 whitespace-nowrap w-max"
          >
            {[...TELEMETRY_STREAM, ...TELEMETRY_STREAM].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] animate-pulse" />
                <span className="text-white/80">{item.text}</span>
                <span className={`px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-wider ${item.color}`}>
                  {item.badge}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══════════ BOTTOM: 4 Kinetic Interactive Pipeline Cards ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
        >
          {KINETIC_MODULES.map((mod, idx) => {
            const isHovered = activeModule === mod.id

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setActiveModule(mod.id)}
                onMouseLeave={() => setActiveModule(null)}
                onClick={() => navigate(mod.route)}
                className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isHovered
                    ? 'border-[#FF6D00] bg-white/[0.06] -translate-y-1.5 shadow-[0_15px_35px_rgba(255,109,0,0.15)] z-20'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 z-10'
                }`}
              >
                {/* Subtle animated pulsating corner glow */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          opacity: isHovered ? 0.8 : [0.2, 0.4, 0.2],
                          scale: isHovered ? 1.2 : [1, 1.1, 1],
                        }
                  }
                  transition={{
                    duration: mod.pulseSpeed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-12 -right-12 w-28 h-28 bg-[#FF6D00]/15 rounded-full blur-2xl pointer-events-none"
                />

                {/* Card Top: Number + Tag */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#FF6D00]">
                      {mod.step} // {mod.tag}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? 'border-[#FF6D00] bg-[#FF6D00] text-black scale-110'
                          : 'border-white/10 bg-white/5 text-white/50'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
                    {mod.name}
                  </h3>

                  <p className="mt-2 text-xs text-white/60 leading-relaxed line-clamp-2">
                    {mod.desc}
                  </p>
                </div>

                {/* Card Bottom: Telemetry Metric & Explore Action */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-black font-mono text-white group-hover:text-[#FF6D00] transition-colors">
                      {mod.metric}
                    </div>
                    <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mt-0.5">
                      {mod.metricLabel}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6D00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Deploy</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
