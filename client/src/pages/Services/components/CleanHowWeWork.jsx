import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Crosshair, CheckCircle2, MessageSquare, Award } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanHowWeWork — 04 HOW WE WORK
 * Clean connected process timeline:
 * 01 RESEARCH -> 02 TARGET -> 03 QUALIFY -> 04 ENGAGE -> 05 OPPORTUNITY
 * - Desktop: Single connected horizontal timeline with a thin line connecting steps.
 * - Mobile: Converted into a clean vertical timeline.
 * - Active step: slightly larger, stronger typography, subtle accent, small highlight.
 * - Clean, no heavy cards.
 */

const STEPS = [
  {
    num: '01',
    title: 'Research',
    sentence: 'Analyze firmographics, tech stack telemetry, and intent signals to isolate high-yield accounts.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Target',
    sentence: 'Map the buying committee and identify verified decision-makers across telephone and email.',
    icon: Crosshair,
  },
  {
    num: '03',
    title: 'Qualify',
    sentence: 'Screen prospects against rigorous criteria—confirming commercial need, authority, and timeline.',
    icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'Engage',
    sentence: 'Deploy multi-touch outbound sequences combining human tele-prospecting and personalized copy.',
    icon: MessageSquare,
  },
  {
    num: '05',
    title: 'Opportunity',
    sentence: 'Deliver high-intent sales conversations directly onto your account executives’ calendars.',
    icon: Award,
  },
]

export default function CleanHowWeWork() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStep, setActiveStep] = useState(2) // Default to '03 Qualify'

  return (
    <section
      id="how-we-work"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#080A0E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
            />
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              04 // HOW WE WORK
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            How We Turn Data Into{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              Opportunities
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            A disciplined, five-stage methodology engineered to eliminate wasted sales cycles and deliver guaranteed pipeline velocity.
          </p>
        </div>

        {/* ══ DESKTOP: Connected Horizontal Timeline ══ */}
        <div className="hidden lg:block relative">
          {/* Continuous Connecting Thin Horizontal Line */}
          <div
            className="absolute top-6 left-8 right-8 h-[1px]"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
            }}
          />

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx
              const Icon = step.icon

              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="cursor-pointer group flex flex-col pt-1 transition-all duration-300"
                >
                  {/* Step Node Marker */}
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isActive ? 'scale-110 shadow-md' : 'scale-100 group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#11151F' : '#FFFFFF',
                        borderColor: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                        color: isActive
                          ? isDark ? '#0B0F19' : '#FFFFFF'
                          : isDark ? '#94A3B8' : '#64748B',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? isDark ? 'text-sky-400' : 'text-sky-600'
                          : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Step Card Container */}
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 flex-1 flex flex-col justify-between ${
                      isActive ? 'shadow-sm' : ''
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(2, 132, 199, 0.04)'
                        : isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(255, 255, 255, 0.6)',
                      borderColor: isActive
                        ? isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.3)'
                        : isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div>
                      <h3
                        className={`text-lg font-bold tracking-tight mb-2 transition-colors ${
                          isActive
                            ? isDark ? 'text-white' : 'text-slate-900'
                            : isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm font-normal leading-relaxed"
                        style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                      >
                        {step.sentence}
                      </p>
                    </div>

                    <div
                      className="mt-4 pt-3 border-t text-[11px] font-mono"
                      style={{
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                        color: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#64748B' : '#94A3B8',
                      }}
                    >
                      STAGE {step.num} VERIFIED
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ══ MOBILE / TABLET: Clean Vertical Timeline ══ */}
        <div className="lg:hidden relative pl-6 border-l space-y-8"
          style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon
            const isActive = activeStep === idx

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className="relative cursor-pointer"
              >
                {/* Marker Dot on Vertical Line */}
                <div
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border flex items-center justify-center"
                  style={{
                    backgroundColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#0A0C10' : '#FFFFFF',
                    borderColor: isDark ? '#38BDF8' : '#0284C7',
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isActive ? '#FFFFFF' : 'transparent' }}
                  />
                </div>

                {/* Content block */}
                <div
                  className="p-5 rounded-xl border transition-all duration-200"
                  style={{
                    backgroundColor: isActive
                      ? isDark ? 'rgba(56, 189, 248, 0.06)' : 'rgba(2, 132, 199, 0.04)'
                      : isDark ? '#0F131A' : '#FFFFFF',
                    borderColor: isActive
                      ? isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.3)'
                      : isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="text-base font-bold"
                      style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {step.sentence}
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
