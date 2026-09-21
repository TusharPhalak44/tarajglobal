import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Target, CheckCircle, Zap, TrendingUp, Compass } from 'lucide-react'

const stages = [
  {
    id: 'data',
    name: 'DATA',
    subtitle: 'Verified ICP Intelligence',
    icon: Database,
    description: 'B2B list building, contact intelligence, and verified TAM enrichment.',
    metric: '99.8% Accuracy',
  },
  {
    id: 'leadgen',
    name: 'LEAD GENERATION',
    subtitle: 'Syndication & Demand',
    icon: Target,
    description: 'Multi-touch demand generation and content syndication programs.',
    metric: '10M+ Reached',
  },
  {
    id: 'qualify',
    name: 'QUALIFY',
    subtitle: 'MQL to BANT Criteria',
    icon: CheckCircle,
    description: 'Strict qualification frameworks filtering active decision-makers.',
    metric: 'Zero Waste',
  },
  {
    id: 'engage',
    name: 'ENGAGE',
    subtitle: 'ABM & Email Sequences',
    icon: Zap,
    description: 'Synchronized email cadences, targeted webinars, and account nurturing.',
    metric: 'High Conversion',
  },
  {
    id: 'opportunity',
    name: 'OPPORTUNITY',
    subtitle: 'SQL & Discovery Calls',
    icon: TrendingUp,
    description: 'High-intent buying interest verified with budget and timeline confirmed.',
    metric: 'Sales-Ready',
  },
  {
    id: 'pipeline',
    name: 'PIPELINE',
    subtitle: 'Revenue Acceleration',
    icon: Compass,
    description: 'Pre-qualified, calendar-confirmed appointments directly on your calendar.',
    metric: 'Predictable ROI',
  },
]

export const GalleryGrowthMap = () => {
  const [activeStage, setActiveStage] = useState(0)

  // Continuous traveling node simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="growth-map"
      className="relative py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* SECTION HEADER */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 02 // ROUTE MAP]
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-text-primary leading-[1.05]">
              ONE GOAL. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-primary">
                MULTIPLE GROWTH CHANNELS.
              </span>
            </h2>
          </div>
          <div className="max-w-md text-text-muted text-xs md:text-sm leading-relaxed font-sans">
            Every service functions as a node in an orchestrated pipeline. Follow the route from raw TAM intelligence to high-value executive meetings.
          </div>
        </div>

        {/* DESKTOP CONNECTED ROUTE MAP (Horizontal with animated SVG path) */}
        <div className="hidden lg:block relative py-12">
          {/* Animated Connecting SVG Path */}
          <div className="absolute top-[72px] left-[5%] right-[5%] h-6 pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 24">
              {/* Background faint path line */}
              <line
                x1="0"
                y1="12"
                x2="1000"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border/60"
                strokeDasharray="4 4"
              />
              {/* Active animated stroke progress */}
              <motion.line
                x1="0"
                y1="12"
                x2={`${(activeStage / (stages.length - 1)) * 1000}`}
                y2="12"
                stroke="var(--color-primary, #00A6FF)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
              {/* Travelling node glow pulse */}
              <circle
                cx={`${(activeStage / (stages.length - 1)) * 1000}`}
                cy="12"
                r="6"
                className="fill-primary transition-all duration-700 ease-out shadow-lg"
              />
              <circle
                cx={`${(activeStage / (stages.length - 1)) * 1000}`}
                cy="12"
                r="12"
                className="fill-primary/20 animate-ping transition-all duration-700"
              />
            </svg>
          </div>

          {/* 6 Connected Interactive Nodes */}
          <div className="relative z-10 grid grid-cols-6 gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon
              const isActive = activeStage === idx
              const isPassed = activeStage >= idx

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center text-center cursor-pointer group select-none"
                  data-cursor-label="STAGEMAP"
                >
                  {/* Node Icon Circle */}
                  <div
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 mb-6 border ${
                      isActive
                        ? 'bg-primary text-black border-primary scale-110 shadow-lg shadow-primary/25 ring-4 ring-primary/20'
                        : isPassed
                        ? 'bg-surface text-primary border-primary/60'
                        : 'bg-surface/60 text-text-muted border-border/70 group-hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse border-2 border-background" />
                    )}
                  </div>

                  {/* Stage Name & Tag */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-widest text-text-muted block">
                      STAGE 0{idx + 1}
                    </span>
                    <h3
                      className={`text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                      }`}
                    >
                      {stage.name}
                    </h3>
                    <p className="text-[11px] font-mono text-text-muted tracking-tight">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Stage description on active / hover */}
                  <div
                    className={`mt-4 p-3 rounded-lg border transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-surface border-primary/40 shadow-sm opacity-100 scale-100'
                        : 'bg-transparent border-transparent opacity-60 group-hover:opacity-100'
                    }`}
                  >
                    <p className="text-[11px] leading-relaxed text-text-secondary">
                      {stage.description}
                    </p>
                    <div className="mt-2 text-[10px] font-mono font-semibold tracking-wider text-primary">
                      {stage.metric}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* MOBILE / TABLET CONNECTED ROUTE (Vertical Stepper with continuous line) */}
        <div className="lg:hidden relative pl-8 border-l-2 border-dashed border-border/70 space-y-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            const isActive = activeStage === idx

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`relative transition-all duration-300 cursor-pointer ${
                  isActive ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {/* Stepper Node Marker on the vertical border */}
                <div
                  className={`absolute -left-[41px] top-1 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-black border-primary scale-110 shadow-md ring-2 ring-primary/20'
                      : 'bg-surface text-text-muted border-border'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-surface border-primary/50 shadow-md'
                      : 'bg-surface/40 border-border/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] tracking-widest text-primary uppercase">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted font-semibold">
                      {stage.metric}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-text-primary uppercase tracking-wide">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-text-muted mb-2 font-mono">
                    {stage.subtitle}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GalleryGrowthMap
