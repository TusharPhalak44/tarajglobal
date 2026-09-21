import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Sparkles, TrendingUp } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * ResultsDataScroll — 09 RESULTS
 * One large animated number that transitions across verified metrics:
 * - 10M+ LEADS GENERATED
 * - 1,500+ CLIENTS
 * - 2,100+ MONTHLY LEADS
 * - 12+ CAMPAIGNS DELIVERED
 * - 16+ SECTORS
 * Thin moving data line behind it, no statistic cards.
 */

const SCROLL_METRICS = [
  { val: '10M+', label: 'LEADS GENERATED', sub: 'Verified pipeline opportunities influenced globally' },
  { val: '1,500+', label: 'ENTERPRISE CLIENTS', sub: 'High-growth technology and SaaS companies served' },
  { val: '2,100+', label: 'MONTHLY LEADS', sub: 'Triple-verified BANT and SQL prospects delivered monthly' },
  { val: '12+', label: 'CAMPAIGNS DELIVERED', sub: 'High-velocity go-to-market outbound programs executed' },
  { val: '16+', label: 'SECTORS SERVED', sub: 'Global B2B software, infrastructure, and hardware verticals' },
]

export default function ResultsDataScroll() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0)

  // Auto-cycle through metrics every 3.5s if not manually switched
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SCROLL_METRICS.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const current = SCROLL_METRICS[activeIdx]

  return (
    <section
      id="results-visualization"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#04060A' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Animated Moving Data Line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden">
        <svg className="w-full h-40" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            animate={{ x: [-100, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            d="M 0 60 Q 300 20 600 60 T 1200 60 T 1800 60"
            fill="none"
            stroke={isDark ? '#38BDF8' : '#0284C7'}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-8"
          style={{
            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)',
          }}
        >
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            09 // VERIFIED PERFORMANCE METRICS
          </span>
        </div>

        {/* ══ One Large Transitioning Number ══ */}
        <div className="min-h-[220px] sm:min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.val}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span
                className="font-mono text-7xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none mb-4 block"
                style={{
                  color: isDark ? '#FFFFFF' : '#090D15',
                  textShadow: isDark ? '0 0 50px rgba(56, 189, 248, 0.2)' : 'none',
                }}
              >
                {current.val}
              </span>

              <h3
                className="font-mono text-xl sm:text-3xl font-black uppercase tracking-wider text-sky-500 mb-2"
              >
                {current.label}
              </h3>

              <p
                className="text-sm sm:text-base font-normal max-w-md"
                style={{ color: isDark ? '#94A3B8' : '#64748B' }}
              >
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Milestone Indicator Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-12 pt-8 border-t max-w-2xl mx-auto"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
        >
          {SCROLL_METRICS.map((m, idx) => {
            const isActive = activeIdx === idx

            return (
              <button
                key={m.label}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive ? 'shadow-md scale-105' : 'opacity-50 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? '#111622' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  color: isActive
                    ? isDark ? '#090D15' : '#FFFFFF'
                    : isDark ? '#94A3B8' : '#475569',
                }}
              >
                {m.val}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
