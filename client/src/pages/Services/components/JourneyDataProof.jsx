import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { Sparkles, ShieldCheck } from 'lucide-react'

// Kinetic Counter Component
const KineticCounter = ({ target, duration = 1800, shouldAnimate, isDecimal = false }) => {
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

const STATS = [
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Monthly Leads',
    sub: 'Verified commercial decision-maker records delivered monthly',
    accentColor: '#00A6FF',
  },
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    sub: 'In validated commercial opportunities for enterprise sales teams',
    accentColor: '#38BDF8',
  },
  {
    prefix: '',
    target: 1500,
    suffix: '+',
    label: 'Enterprise Clients',
    sub: 'B2B technology organizations scaled across 35+ countries',
    accentColor: '#FFA600',
  },
  {
    prefix: '',
    target: 99.8,
    isDecimal: true,
    suffix: '%',
    label: 'Data Accuracy SLA',
    sub: 'Guaranteed phone and email deliverability on every record',
    accentColor: '#10B981',
  },
  {
    prefix: '',
    target: 16,
    suffix: '+',
    label: 'Industry Sectors',
    sub: 'Deep domain fluency from Cloud & Cyber to IT and Enterprise SaaS',
    accentColor: '#FF6D00',
  },
]

export default function JourneyDataProof() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Verified Commercial Data & Proof"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MEASURED PERFORMANCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06]"
            style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
          >
            Proof in Giant{' '}
            <span className="font-light italic block mt-1">
              Numbers.
            </span>
          </motion.h2>
        </div>

        {/* ══ CONNECTED HAIRLINE GRID (NOT 4 EQUAL CARDS) ══ */}
        <div
          className="border-t border-b grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-12 px-6 lg:px-8 flex flex-col justify-between group transition-colors duration-300"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
            >
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest block mb-6 opacity-40">
                  // METRIC 0{idx + 1}
                </span>

                {/* Giant Kinetic Number */}
                <div
                  className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tighter mb-4 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
                >
                  {stat.prefix}
                  <KineticCounter
                    target={stat.target}
                    shouldAnimate={isInView}
                    isDecimal={stat.isDecimal}
                  />
                  <span style={{ color: stat.accentColor }}>{stat.suffix}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mb-2" style={{ color: isDark ? '#F4F4F5' : '#18181B' }}>
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mt-4 font-normal" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
