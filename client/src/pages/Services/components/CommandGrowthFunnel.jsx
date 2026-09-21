import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Filter, Sparkles, TrendingUp, Check } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CommandGrowthFunnel — 05 GROWTH FUNNEL
 * Heading: "From First Signal to Sales Opportunity"
 * Wide horizontal funnel:
 * AWARENESS (Reach the right accounts.)
 * -> INTEREST (Create relevant engagement.)
 * -> ENGAGEMENT (Spark direct dialogue.)
 * -> QUALIFICATION (Identify buying signals.)
 * -> OPPORTUNITY (Create sales conversations.)
 * Progressively changing geometric shapes, very short descriptions, no standard process cards.
 */

const FUNNEL_STAGES = [
  {
    step: '01',
    name: 'AWARENESS',
    desc: 'Reach the right accounts.',
    ratio: '100% In-Market Reach',
    widthClass: 'w-full',
  },
  {
    step: '02',
    name: 'INTEREST',
    desc: 'Create relevant engagement.',
    ratio: '45% Content Interaction',
    widthClass: 'w-[90%]',
  },
  {
    step: '03',
    name: 'ENGAGEMENT',
    desc: 'Spark direct dialogue.',
    ratio: '25% Multi-Touch Response',
    widthClass: 'w-[80%]',
  },
  {
    step: '04',
    name: 'QUALIFICATION',
    desc: 'Identify buying signals.',
    ratio: '12% BANT / SQL Verified',
    widthClass: 'w-[70%]',
  },
  {
    step: '05',
    name: 'OPPORTUNITY',
    desc: 'Create sales conversations.',
    ratio: 'High-Converting Pipeline',
    widthClass: 'w-[60%]',
  },
]

export default function CommandGrowthFunnel() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStage, setActiveStage] = useState(4)

  return (
    <section
      id="growth-funnel"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
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
            05 // THE GROWTH FUNNEL
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
        >
          From First Signal to{' '}
          <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
            Sales Opportunity
          </span>
        </h2>

        <p
          className="text-base sm:text-lg leading-relaxed font-normal mb-16 max-w-2xl"
          style={{ color: isDark ? '#94A3B8' : '#64748B' }}
        >
          How raw firmographic intelligence is systematically refined into closed-won revenue conversations.
        </p>

        {/* ══ DESKTOP: Wide Horizontal Funnel ══ */}
        <div className="hidden lg:grid grid-cols-5 gap-3 items-stretch relative">
          {FUNNEL_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx
            const isLast = idx === FUNNEL_STAGES.length - 1

            return (
              <div
                key={stage.step}
                onMouseEnter={() => setActiveStage(idx)}
                onClick={() => setActiveStage(idx)}
                className="group relative cursor-pointer flex flex-col transition-all duration-300"
              >
                {/* Stage Geometric Header Bar (Tapering Visual) */}
                <div
                  className="h-2 rounded-full mb-4 transition-all duration-300"
                  style={{
                    backgroundColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                />

                {/* Stage Body Container */}
                <div
                  className={`p-6 rounded-xl border flex-1 flex flex-col justify-between transition-all duration-300 ${
                    isActive ? 'scale-102 shadow-md' : 'hover:border-slate-400'
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? isDark ? '#111622' : '#F8FAFC'
                      : isDark ? '#0D1117' : '#FFFFFF',
                    borderColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div>
                    {/* Step Number & Connector */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                      >
                        STAGE {stage.step}
                      </span>
                      {!isLast && (
                        <ChevronRight
                          className="w-4 h-4 text-slate-400 opacity-60"
                        />
                      )}
                    </div>

                    {/* Stage Name */}
                    <h3
                      className="font-mono text-lg font-black tracking-wider uppercase mb-2"
                      style={{
                        color: isActive
                          ? isDark ? '#FFFFFF' : '#0B0F19'
                          : isDark ? '#E2E8F0' : '#1E293B',
                      }}
                    >
                      {stage.name}
                    </h3>

                    {/* Very Short Description */}
                    <p
                      className="text-xs sm:text-sm font-normal leading-relaxed"
                      style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                    >
                      {stage.desc}
                    </p>
                  </div>

                  {/* Ratio / Metric */}
                  <div
                    className="mt-6 pt-3 border-t text-[11px] font-mono font-medium"
                    style={{
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                      color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8'),
                    }}
                  >
                    {stage.ratio}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ══ MOBILE / TABLET: Vertical Tapering Funnel ══ */}
        <div className="lg:hidden space-y-3">
          {FUNNEL_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx

            return (
              <div
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className="p-5 rounded-xl border transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#111622' : '#F8FAFC'
                    : isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                    >
                      {stage.step}
                    </span>
                    <h3
                      className="font-mono text-base font-bold uppercase"
                      style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                    >
                      {stage.name}
                    </h3>
                  </div>
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    {stage.ratio}
                  </span>
                </div>

                <p
                  className="text-xs leading-relaxed"
                  style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                >
                  {stage.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
