import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useReducedMotion } from '@hooks/useReducedMotion'

const STATS_RIBBON = [
  { value: '10M+', label: 'Verified Contacts Delivered', icon: Users },
  { value: '100%', label: 'Replacement SLA Guarantee', icon: ShieldCheck },
  { value: '1,500+', label: 'Enterprise Clients Scaled', icon: TrendingUp },
  { value: '85%+', label: 'Discovery Call Show Rate', icon: Calendar },
]

export default function ServicesHero() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const scrollToCatalog = () => {
    const el = document.getElementById('services-catalog-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="services-hero"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center pt-28 pb-16 lg:py-24 bg-[#05070B] text-white overflow-hidden border-b border-white/10 select-none"
    >
      {/* ══════════ AMBIENT BACKGROUND LIGHTING ══════════ */}
      {/* Smooth floating ambient orbs */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 40, -30, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/5 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF6D00]/10 rounded-full blur-[170px] pointer-events-none -z-10"
      />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-primary/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Subtle fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Top accent light beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#FF6D00]/50 to-transparent" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto flex flex-col items-center text-center">
        {/* Luminous Pill Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-6 shadow-sm hover:border-[#FF6D00]/40 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6D00]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-white/90">
            TARAJ GLOBAL B2B CAPABILITIES
          </span>
          <span className="hidden sm:inline text-white/30 text-xs">|</span>
          <span className="hidden sm:inline text-[10px] font-mono uppercase text-[#FF6D00] font-semibold">
            AUDITED SLAS
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.06] text-white max-w-4xl"
        >
          Full-Funnel B2B Services <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#FF6D00]">
            Engineered for Scale.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed font-normal max-w-2xl"
        >
          From targeted TAM identification to double-confirmed sales discovery calls, we deliver verified B2B pipeline tailored to your exact Ideal Customer Profile.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <StarButton onClick={() => navigate('/contact')}>
            Start a Conversation
          </StarButton>

          <button
            type="button"
            onClick={scrollToCatalog}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all hover:border-[#FF6D00]/60 shadow-xs cursor-pointer group"
          >
            <span>Explore All 12 Services</span>
            <ChevronDown className="w-4 h-4 text-white/60 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Telemetry Stat Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
        >
          {STATS_RIBBON.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 text-center"
              >
                <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black font-mono text-white">
                  <span>{stat.value}</span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mt-1 flex items-center gap-1.5 justify-center">
                  <Icon className="w-3 h-3 text-[#FF6D00]" />
                  <span>{stat.label}</span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
