import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Award, BarChart3, Globe2, Briefcase } from 'lucide-react'

const verifiedMetrics = [
  {
    value: '10M+',
    label: 'LEADS GENERATED',
    detail: 'Validated B2B executive contacts and verified marketing responses across multi-touch programs.',
    icon: TrendingUp,
  },
  {
    value: '1,500+',
    label: 'CLIENTS',
    detail: 'High-growth B2B software vendors, cybersecurity leaders, cloud providers, and global enterprises.',
    icon: Award,
  },
  {
    value: '2,100+',
    label: 'MONTHLY LEADS',
    detail: 'Consistently qualified pipeline delivered every single calendar month with strict SLA assurance.',
    icon: BarChart3,
  },
  {
    value: '12+',
    label: 'GROWTH CAMPAIGNS',
    detail: 'Specialized pipeline solutions spanning SQL, BANT, ABM, Webinars, and Content Syndication.',
    icon: Briefcase,
  },
  {
    value: '16+',
    label: 'SECTORS SERVED',
    detail: 'Deep domain expertise across SaaS, FinTech, Telecom, Cloud, HealthTech, and Professional Services.',
    icon: Globe2,
  },
]

export const GalleryResultsWall = () => {
  const [currentMetricIdx, setCurrentMetricIdx] = useState(0)

  // Smooth continuous transition across verified metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMetricIdx((prev) => (prev + 1) % verifiedMetrics.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [])

  const current = verifiedMetrics[currentMetricIdx]

  return (
    <section
      id="results-wall"
      className="relative py-28 md:py-36 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 10 // VERIFIED PERFORMANCE WALL]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary">
              OUTCOMES THAT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                SPEAK IN NUMBERS.
              </span>
            </h2>
          </div>
          <div className="max-w-xs text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Pure typography-driven results. No cards. Verified historical benchmarks across enterprise engagements.
          </div>
        </div>

        {/* GIANT TYPOGRAPHY NUMBER TRANSITION DISPLAY (NO CARDS) */}
        <div className="relative py-12 md:py-20 min-h-[380px] flex flex-col justify-center border-y border-border/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Giant Metric Number */}
              <div className="text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-primary to-text-primary/90">
                {current.value}
              </div>

              {/* Metric Label and Narrative */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pt-4">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-primary">
                  {current.label}
                </h3>
                <p className="max-w-xl text-text-secondary text-xs sm:text-sm md:text-base font-sans leading-relaxed">
                  {current.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Animated data progress vector line */}
          <div className="mt-12 w-full h-[2px] bg-border/40 relative overflow-hidden">
            <motion.div
              key={currentMetricIdx}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3.8, ease: 'linear' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </div>

        {/* METRIC SCRUBBER CONTROLS */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {verifiedMetrics.map((m, idx) => (
              <button
                key={m.label}
                type="button"
                onClick={() => setCurrentMetricIdx(idx)}
                className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 px-3 py-1 rounded-full border ${
                  currentMetricIdx === idx
                    ? 'bg-primary text-black border-primary font-bold shadow'
                    : 'bg-surface/50 text-text-muted border-border/70 hover:border-primary/50'
                }`}
              >
                {m.value}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-text-muted">
            INDEX 0{currentMetricIdx + 1} / 0{verifiedMetrics.length}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryResultsWall
