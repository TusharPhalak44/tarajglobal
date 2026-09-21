import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Search, Crosshair, CheckCircle2, MessageSquare, Award } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * HorizontalServiceJourney — 05 HORIZONTAL SERVICE JOURNEY
 * 5 Stages:
 * 01 RESEARCH (Understand your market, accounts and buyers.)
 * 02 TARGET (Find the companies that matter.)
 * 03 QUALIFY (Prioritize real opportunities.)
 * 04 ENGAGE (Reach decision-makers with relevant messaging.)
 * 05 OPPORTUNITY (Turn engagement into conversations.)
 * Large animated connecting line travelling across all five stages.
 */

const JOURNEY_STAGES = [
  {
    num: '01',
    title: 'RESEARCH',
    desc: 'Understand your market, accounts and buyers with precision intelligence.',
    icon: Search,
    detail: 'Firmographic analysis, installed tech stack discovery, and intent signal mapping.',
  },
  {
    num: '02',
    title: 'TARGET',
    desc: 'Find the companies that matter most to your annual revenue targets.',
    icon: Crosshair,
    detail: 'Buying committee triangulation and direct-dial stakeholder verification.',
  },
  {
    num: '03',
    title: 'QUALIFY',
    desc: 'Prioritize real opportunities through strict criteria gating.',
    icon: CheckCircle2,
    detail: 'Dual-channel validation confirming Budget, Authority, Need, and Timeline.',
  },
  {
    num: '04',
    title: 'ENGAGE',
    desc: 'Reach decision-makers with relevant, highly personalized messaging.',
    icon: MessageSquare,
    detail: 'Human tele-prospecting combined with high-deliverability email sequences.',
  },
  {
    num: '05',
    title: 'OPPORTUNITY',
    desc: 'Turn engagement into booked sales conversations on your AE calendars.',
    icon: Award,
    detail: 'Qualified introductory and technical discovery calls ready to close.',
  },
]

export default function HorizontalServiceJourney() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(0)

  const handleNext = () => {
    setActiveIdx((prev) => (prev < JOURNEY_STAGES.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : JOURNEY_STAGES.length - 1))
  }

  return (
    <section
      id="service-journey"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
              />
              <span
                className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
                style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
              >
                05 // THE GROWTH JOURNEY
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase"
              style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
            >
              Five Connected{' '}
              <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                Growth Stages
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="w-12 h-12 rounded-md border flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: isDark ? '#111622' : '#FFFFFF',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                color: isDark ? '#FFFFFF' : '#090D15',
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-12 h-12 rounded-md border flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: isDark ? '#38BDF8' : '#0284C7',
                borderColor: isDark ? '#38BDF8' : '#0284C7',
                color: isDark ? '#090D15' : '#FFFFFF',
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Connecting Line */}
        <div className="relative mb-12 hidden lg:block">
          <div
            className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
            style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
          />
          {/* Animated Highlight Line */}
          <motion.div
            animate={{ width: `${((activeIdx + 1) / JOURNEY_STAGES.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2"
            style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
          />

          {/* 5 Step Indicator Nodes along the line */}
          <div className="relative z-10 flex justify-between">
            {JOURNEY_STAGES.map((s, idx) => {
              const isPastOrCurrent = idx <= activeIdx

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isPastOrCurrent ? 'scale-110 shadow-md' : 'scale-100'
                  }`}
                  style={{
                    backgroundColor: isPastOrCurrent
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isPastOrCurrent
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                    color: isPastOrCurrent
                      ? isDark ? '#090D15' : '#FFFFFF'
                      : isDark ? '#64748B' : '#94A3B8',
                  }}
                >
                  {s.num}
                </button>
              )
            })}
          </div>
        </div>

        {/* Horizontal Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isActive = activeIdx === idx
            const Icon = stage.icon

            return (
              <div
                key={stage.num}
                onClick={() => setActiveIdx(idx)}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive ? 'shadow-xl scale-102' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#111622' : '#FFFFFF'
                    : isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-3xl font-black"
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#475569' : '#94A3B8') }}
                    >
                      {stage.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg border flex items-center justify-center"
                      style={{
                        backgroundColor: isActive
                          ? isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)'
                          : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                        borderColor: isActive
                          ? isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)'
                          : 'transparent',
                        color: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#64748B' : '#94A3B8',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className="font-mono text-xl sm:text-2xl font-black uppercase tracking-wider mb-2"
                    style={{ color: isActive ? (isDark ? '#FFFFFF' : '#090D15') : (isDark ? '#CBD5E1' : '#334155') }}
                  >
                    {stage.title}
                  </h3>

                  <p
                    className="text-sm font-normal leading-relaxed mb-4"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {stage.desc}
                  </p>
                </div>

                <div
                  className="pt-4 border-t text-[11px] font-mono leading-normal"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                    color: isDark ? '#64748B' : '#94A3B8',
                  }}
                >
                  {stage.detail}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
