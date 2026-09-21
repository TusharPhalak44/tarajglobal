import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * WhyTarajTypography — 11 WHY TARAJ
 * Large typography-based section (no cards):
 * Words: DATA, INTELLIGENCE, QUALITY, TARGETING, EXECUTION, RESULTS.
 * Displayed one at a time with calm, premium visual cues.
 */

const TYPO_PILLARS = [
  {
    word: 'DATA',
    num: '01',
    desc: 'Dynamic firmographic and technographic telemetry mapped directly to your ideal customer profile.',
    benchmark: '45M+ Global Profiles',
  },
  {
    word: 'INTELLIGENCE',
    num: '02',
    desc: 'First-party buyer intent signals that detect active research spikes before competitors identify the RFP.',
    benchmark: 'Active Intent Signals',
  },
  {
    word: 'QUALITY',
    num: '03',
    desc: 'Every campaign is built around accurate, relevant, triple-verified B2B data with zero scrape junk.',
    benchmark: '99.8% Data Accuracy SLA',
  },
  {
    word: 'TARGETING',
    num: '04',
    desc: 'Laser-focused outreach directly to decision-makers and buying committees holding active commercial budget.',
    benchmark: '100% ICP Calibration',
  },
  {
    word: 'EXECUTION',
    num: '05',
    desc: 'Transparent show-rate SLAs, guaranteed meeting calendar handoffs, and closed-loop AE reporting.',
    benchmark: '85%+ Show-Rate Guarantee',
  },
  {
    word: 'RESULTS',
    num: '06',
    desc: 'Measurable pipeline velocity and validated SQLs that sales teams eagerly accept and close.',
    benchmark: '3.4x Pipeline Velocity',
  },
]

export default function WhyTarajTypography() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(2) // Default to 'QUALITY'

  return (
    <section
      id="why-taraj-typographic"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#04060A' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-14">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />
          <span
            className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            11 // PHILOSOPHY & REASONING
          </span>
        </div>

        {/* Vertical Typography Sequence */}
        <div className="space-y-4">
          {TYPO_PILLARS.map((p, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={p.word}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className="group cursor-pointer border-b pb-6 transition-all duration-300"
                style={{
                  borderColor: isActive
                    ? isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.35)'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Number and Large Word */}
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className="font-mono text-xs sm:text-sm font-bold"
                      style={{
                        color: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#475569' : '#94A3B8',
                      }}
                    >
                      {p.num}
                    </span>

                    <h3
                      className={`font-mono tracking-tight uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-4xl sm:text-6xl lg:text-8xl font-black'
                          : 'text-2xl sm:text-4xl lg:text-5xl font-bold opacity-30 hover:opacity-60'
                      }`}
                      style={{
                        color: isActive
                          ? isDark ? '#FFFFFF' : '#090D15'
                          : isDark ? '#94A3B8' : '#475569',
                      }}
                    >
                      {p.word}
                    </h3>
                  </div>

                  {/* Active Short Description Reveal */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-md lg:text-right"
                    >
                      <p
                        className="text-sm sm:text-base font-normal leading-relaxed mb-1.5"
                        style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                      >
                        "{p.desc}"
                      </p>
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-wider text-sky-500"
                      >
                        BENCHMARK: {p.benchmark}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
