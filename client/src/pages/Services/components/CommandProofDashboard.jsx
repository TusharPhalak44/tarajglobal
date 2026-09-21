import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, ArrowUpRight, TrendingUp } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CommandProofDashboard — 08 PROOF / NUMBERS
 * Large "dashboard" style section:
 * Heading: "Growth, Measured."
 * Analytics-inspired layout (not statistic cards):
 * 12+ Campaigns Delivered
 * 2,100+ Monthly Leads
 * 1,500+ Clients
 * 16+ Sectors
 * Simple decorative animated line graph connecting the numbers.
 */

const DASHBOARD_METRICS = [
  { target: 12, suffix: '+', label: 'Campaigns Delivered', sub: 'High-performing enterprise pipeline sprints' },
  { target: 2100, suffix: '+', label: 'Monthly Leads', sub: 'Vetted BANT & SQL opportunities' },
  { target: 1500, suffix: '+', label: 'Clients', sub: 'Technology scale-ups and global brands' },
  { target: 16, suffix: '+', label: 'Sectors', sub: 'Enterprise verticals & niche industries' },
]

function CounterValue({ target, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const duration = 1500
    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)))
      setCount(current)

      if (frame >= totalFrames) {
        clearInterval(timer)
        setCount(target)
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [isInView, target])

  const formatted = count >= 1000 ? count.toLocaleString() : count

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {formatted}{suffix}
    </span>
  )
}

export default function CommandProofDashboard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="proof-dashboard"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
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
              08 // PERFORMANCE TELEMETRY
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Growth,{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Measured.
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            A consolidated telemetry view of global pipeline acceleration across our active B2B customer base.
          </p>
        </div>

        {/* ══ Clean Analytics Dashboard Frame ══ */}
        <div
          className="rounded-2xl border p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm"
          style={{
            backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            boxShadow: isDark
              ? '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
              : '0 10px 40px -10px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Top Dashboard Header Bar */}
          <div
            className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b text-xs font-mono"
            style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold uppercase tracking-wider" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                COMMAND CENTER TELEMETRY // ACTIVE DEPLOYMENTS
              </span>
            </div>

            <div className="flex items-center gap-6" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              <span>REFRESH: REAL-TIME</span>
              <span>CONFIDENCE: 99.8%</span>
            </div>
          </div>

          {/* Decorative Animated Line Graph SVG Connecting the metrics */}
          <div className="relative w-full h-24 mb-10 overflow-hidden">
            <svg
              className="w-full h-full preserve-3d"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              {/* Subtle background horizontal grid lines */}
              <line x1="0" y1="25" x2="1000" y2="25" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="4 4" />
              <line x1="0" y1="50" x2="1000" y2="50" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="1000" y2="75" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} strokeDasharray="4 4" />

              {/* Decorative Trending Graph Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                d="M 0 85 Q 150 70 300 55 T 600 35 T 850 20 L 1000 12"
                fill="none"
                stroke={isDark ? '#38BDF8' : '#0284C7'}
                strokeWidth="2.5"
              />

              {/* Glowing gradient fill under graph */}
              <motion.path
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.4 }}
                d="M 0 85 Q 150 70 300 55 T 600 35 T 850 20 L 1000 12 L 1000 100 L 0 100 Z"
                fill={isDark ? '#38BDF8' : '#0284C7'}
              />

              {/* Metric Milestone Nodes */}
              {[
                { cx: 120, cy: 73 },
                { cx: 380, cy: 48 },
                { cx: 650, cy: 30 },
                { cx: 920, cy: 15 },
              ].map((dot, i) => (
                <circle
                  key={i}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="4"
                  fill={isDark ? '#38BDF8' : '#0284C7'}
                  className="animate-pulse"
                />
              ))}
            </svg>
          </div>

          {/* 4 Numbers Across Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {DASHBOARD_METRICS.map((item, idx) => (
              <div
                key={item.label}
                className="p-4 rounded-xl border flex flex-col justify-between transition-colors"
                style={{
                  backgroundColor: isDark ? '#111622' : '#F8FAFC',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <div>
                  <div
                    className="text-4xl sm:text-5xl font-black tracking-tight mb-2"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    <CounterValue target={item.target} suffix={item.suffix} />
                  </div>

                  <h3
                    className="font-mono text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    {item.label}
                  </h3>

                  <p
                    className="text-xs font-normal"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {item.sub}
                  </p>
                </div>

                <div
                  className="mt-4 pt-3 border-t text-[10px] font-mono flex items-center justify-between"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                    color: isDark ? '#64748B' : '#94A3B8',
                  }}
                >
                  <span>KPI POINT 0{idx + 1}</span>
                  <span className="text-emerald-500 font-bold">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
