import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { CommandSecondaryButton } from './CommandButtons'

/**
 * CommandWhyTaraj — 07 WHY TARAJ
 * Large typographic section (no cards):
 * Vertically arranged words:
 * DATA
 * INTELLIGENCE
 * TARGETING
 * QUALITY
 * EXECUTION
 * Active word gets stronger weight, larger size, subtle accent, and short description.
 */

const PILLARS = [
  {
    word: 'DATA',
    num: '01',
    desc: 'Dynamic firmographic and technographic telemetry mapped directly to your ideal customer profile.',
    metric: '45M+ Verified Profiles',
  },
  {
    word: 'INTELLIGENCE',
    num: '02',
    desc: 'First-party buyer intent signals that detect corporate tech migrations before competitors enter.',
    metric: 'Active Buyer Telemetry',
  },
  {
    word: 'TARGETING',
    num: '03',
    desc: 'Laser-focused outreach directly to decision-makers and buying committees holding active commercial budget.',
    metric: '100% ICP Calibration',
  },
  {
    word: 'QUALITY',
    num: '04',
    desc: 'Every campaign is built around accurate, relevant, triple-verified B2B data with zero scrape junk.',
    metric: '99.8% Data Accuracy SLA',
  },
  {
    word: 'EXECUTION',
    num: '05',
    desc: 'Transparent show-rate SLAs, guaranteed meeting calendar handoffs, and closed-loop AE reporting.',
    metric: '85%+ Show-Rate Guarantee',
  },
]

export default function CommandWhyTaraj() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(3) // Default to 'QUALITY'

  return (
    <section
      id="why-taraj"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />
          <span
            className="font-mono text-xs font-semibold tracking-wider uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            07 // CORE PILLARS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-12">
          <div className="lg:col-span-6">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Built For B2B Growth.{' '}
              <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                Driven By Precision.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex lg:justify-end items-center">
            <CommandSecondaryButton to="/contact">
              SCHEDULE DISCOVERY AUDIT
            </CommandSecondaryButton>
          </div>
        </div>

        {/* Large Vertical Typography Stack */}
        <div className="space-y-4 pt-6">
          {PILLARS.map((pillar, idx) => {
            const isActive = activeIdx === idx

            return (
              <div
                key={pillar.word}
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
                  {/* Word & Number */}
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className="font-mono text-xs sm:text-sm font-bold"
                      style={{
                        color: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#475569' : '#94A3B8',
                      }}
                    >
                      {pillar.num}
                    </span>

                    <h3
                      className={`font-mono tracking-tight uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-4xl sm:text-6xl lg:text-7xl font-black'
                          : 'text-2xl sm:text-4xl lg:text-5xl font-bold opacity-35 hover:opacity-70'
                      }`}
                      style={{
                        color: isActive
                          ? isDark ? '#FFFFFF' : '#0B0F19'
                          : isDark ? '#94A3B8' : '#475569',
                      }}
                    >
                      {pillar.word}
                    </h3>
                  </div>

                  {/* Active Short Description & Metric */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-md lg:text-right"
                    >
                      <p
                        className="text-sm sm:text-base font-normal leading-relaxed mb-1"
                        style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                      >
                        "{pillar.desc}"
                      </p>
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-wider"
                        style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                      >
                        BENCHMARK: {pillar.metric}
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
