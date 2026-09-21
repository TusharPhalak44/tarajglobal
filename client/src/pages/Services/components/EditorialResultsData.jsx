import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Sparkles, ShieldCheck } from 'lucide-react'

// Kinetic Counter Component
const EditorialCounter = ({ target, duration = 1600, shouldAnimate, isDecimal = false }) => {
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(target)
      return
    }

    if (shouldAnimate && !hasRun.current) {
      hasRun.current = true
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const val = isDecimal ? +(ease * target).toFixed(1) : Math.floor(ease * target)
        setDisplay(val)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplay(target)
        }
      }

      requestAnimationFrame(step)
    }
  }, [shouldAnimate, target, duration, prefersReducedMotion, isDecimal])

  return <span>{prefersReducedMotion ? target.toLocaleString() : display.toLocaleString()}</span>
}

const STATS_DATA = [
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
    desc: 'Across global technology and industrial verticals',
  },
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    desc: 'In verified commercial revenue opportunities',
  },
  {
    prefix: '',
    target: 1500,
    suffix: '+',
    label: 'Enterprise Accounts',
    desc: 'Engaged across global buying committees',
  },
  {
    prefix: '',
    target: 99.8,
    isDecimal: true,
    suffix: '%',
    label: 'Data Accuracy SLA',
    desc: 'Guaranteed human-verified record integrity',
  },
  {
    prefix: '',
    target: 16,
    suffix: '+',
    label: 'Industry Sectors',
    desc: 'Deep market specialization and domain fluency',
  },
]

export default function EditorialResultsData() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Verified Performance Data & Statistics"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>MEASURED IMPACT</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Proven by the{' '}
              <span className="font-light italic">Numbers.</span>
            </motion.h2>
          </div>

          <p className="text-sm sm:text-base max-w-md font-normal" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
            We measure our success by tangible pipeline acceleration. Every figure is audited and verified against strict commercial SLAs.
          </p>
        </div>

        {/* ══ BOLD EDITORIAL HORIZONTAL CONNECTED GRID ══ */}
        <div className="border-t border-b divide-y lg:divide-y-0 lg:divide-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}
        >
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8 flex flex-col justify-between group transition-colors duration-300"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-6" style={{ color: isDark ? '#52525B' : '#A1A1AA' }}>
                  // METRIC 0{idx + 1}
                </span>

                {/* Big Editorial Number */}
                <div
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono tracking-tighter mb-4"
                  style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                >
                  {stat.prefix}
                  <EditorialCounter
                    target={stat.target}
                    shouldAnimate={isInView}
                    isDecimal={stat.isDecimal}
                  />
                  <span style={{ color: idx === 1 ? '#00A6FF' : idx === 3 ? '#10B981' : isDark ? '#A1A1AA' : '#52525B' }}>
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight mb-2" style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mt-4" style={{ color: isDark ? '#71717A' : '#71717A' }}>
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
