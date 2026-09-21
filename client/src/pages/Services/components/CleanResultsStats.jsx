import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanResultsStats — 06 RESULTS / STATS
 * Minimal statistics section with a 2x2 clean layout with large numbers:
 * - 12+ Campaigns Delivered
 * - 2,100+ Monthly Leads
 * - 1,500+ Clients
 * - 16+ Sectors
 * Connected by thin hairline dividers, no heavy cards.
 * Animated counter values on viewport entry.
 */

const STATS = [
  {
    target: 12,
    suffix: '+',
    label: 'Campaigns Delivered',
    subtext: 'High-performing enterprise GTM sprints',
  },
  {
    target: 2100,
    suffix: '+',
    label: 'Monthly Leads',
    subtext: 'Fully verified SQL and BANT prospects',
  },
  {
    target: 1500,
    suffix: '+',
    label: 'Clients',
    subtext: 'Technology companies and SaaS scale-ups',
  },
  {
    target: 16,
    suffix: '+',
    label: 'Sectors',
    subtext: 'Global tech verticals and industries served',
  },
]

function AnimatedCounter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1600
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      // Ease out cubic
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)))

      setCount(current)

      if (frame >= totalFrames) {
        clearInterval(timer)
        setCount(target)
      }
    }, frameDuration)

    return () => clearInterval(timer)
  }, [isInView, target])

  const formatted = count >= 1000 ? count.toLocaleString() : count

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {formatted}{suffix}
    </span>
  )
}

export default function CleanResultsStats() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="results-stats"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#080A0E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              06 // RESULTS & IMPACT
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Measurable Proof of{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Execution
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            We benchmark every campaign against hard revenue outcomes—delivering verified stakeholder engagement and qualified pipeline.
          </p>
        </div>

        {/* 2x2 Clean Layout with Thin Dividers */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border overflow-hidden"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
          }}
        >
          {STATS.map((stat, idx) => {
            const isTopRow = idx < 2
            const isLeftCol = idx % 2 === 0

            return (
              <div
                key={stat.label}
                className={`p-8 sm:p-12 lg:p-14 flex flex-col justify-between transition-colors duration-200 group ${
                  isTopRow ? 'border-b md:border-b' : ''
                } ${isLeftCol ? 'md:border-r' : ''}`}
                style={{
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
                }}
              >
                <div>
                  {/* Large Stat Number */}
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>

                  {/* Stat Label */}
                  <h3
                    className="text-base sm:text-lg font-semibold tracking-tight mb-1"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    {stat.label}
                  </h3>

                  {/* Subtext */}
                  <p
                    className="text-xs sm:text-sm font-normal"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {stat.subtext}
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
