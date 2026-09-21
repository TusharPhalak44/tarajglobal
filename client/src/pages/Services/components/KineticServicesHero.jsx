import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap, Target, Users, CheckCircle2 } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useReducedMotion } from '@hooks/useReducedMotion'

const QUICK_FILTERS = [
  { label: 'High-Intent SQL & BANT', target: 'leads' },
  { label: 'Executive Appointment Setting', target: 'outreach' },
  { label: 'Account-Based Marketing (ABM)', target: 'outreach' },
  { label: 'Demand & Content Syndication', target: 'demand' },
  { label: 'B2B Data Intelligence', target: 'data' },
]

const TRUST_TAGS = [
  { label: '99.8% Data Accuracy SLA' },
  { label: '2,100+ Campaigns Delivered' },
  { label: '100% GDPR & CCPA Compliant' },
  { label: '$18M+ Pipeline Influenced' },
]

export default function KineticServicesHero({ onSelectCategory }) {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const scrollToCatalog = (catId) => {
    if (onSelectCategory && catId) {
      onSelectCategory(catId)
    }
    const el = document.getElementById('kinetic-services-showcase')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="kinetic-services-hero"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden bg-background text-text-primary border-b border-border/70 select-none"
    >
      {/* Animated Glowing Radial Aurora Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] rounded-full blur-[140px] bg-gradient-to-r from-primary via-[#00A6FF] to-cta"
        />

        {/* Floating Ambient Dots */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#00A6FF 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        {/* Live Indicator Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6 shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            B2B REVENUE ACCELERATION ENGINE · 12 SERVICES
          </span>
        </motion.div>

        {/* Main H1 Headline with Staggered Entrance */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] uppercase max-w-5xl mx-auto"
        >
          <span>Connect Strategy, Data & Outreach To Build </span>
          <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent inline-block">
            Predictable B2B Pipeline.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
        >
          From intent-driven account discovery and verified B2B data to sales-qualified executive meetings, Taraj Global delivers the 12 specialized capabilities that fuel consistent revenue growth.
        </motion.p>

        {/* Interactive Quick-Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto"
        >
          <span className="text-xs font-mono text-text-muted mr-1 hidden sm:inline">
            QUICK JUMP:
          </span>
          {QUICK_FILTERS.map((filter, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCatalog(filter.target)}
              className="px-3.5 py-1.5 rounded-full border border-border/70 bg-surface/60 hover:bg-surface hover:border-primary/50 text-xs font-semibold text-text-secondary hover:text-text-primary transition-all cursor-pointer shadow-xs hover:scale-102"
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Main CTA Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <StarButton onClick={() => navigate('/contact')}>
            Start a Conversation
          </StarButton>

          <button
            type="button"
            onClick={() => scrollToCatalog('all')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface hover:bg-surface/80 text-text-primary text-sm font-semibold transition-all hover:border-primary/50 shadow-xs cursor-pointer group"
          >
            <span>Explore All 12 Services</span>
            <ChevronDown className="w-4 h-4 text-text-secondary group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Glass Trust Metric Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 pt-8 border-t border-border/60 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-text-secondary"
        >
          {TRUST_TAGS.map((t, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="font-semibold">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
