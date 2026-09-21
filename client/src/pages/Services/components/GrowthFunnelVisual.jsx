import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Sparkles, TrendingUp, ArrowDown } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * GrowthFunnelVisual — 07 B2B GROWTH FUNNEL
 * Full-screen animated funnel: "FROM DATA TO PIPELINE"
 * 5 large horizontal layers narrowing toward PIPELINE:
 * DATA -> TARGETING -> QUALIFICATION -> ENGAGEMENT -> OPPORTUNITY -> PIPELINE
 * Animated particles flowing through the funnel.
 */

const FUNNEL_LAYERS = [
  {
    layer: '01',
    name: 'DATA',
    tagline: 'Raw Market Telemetry & Contact Registries',
    metric: '45M+ Verified Profiles',
    widthStyle: 'w-full',
  },
  {
    layer: '02',
    name: 'TARGETING',
    tagline: 'Ideal Customer Profile (ICP) & Intent Calibration',
    metric: 'Top-Decile Account Identification',
    widthStyle: 'w-[90%]',
  },
  {
    layer: '03',
    name: 'QUALIFICATION',
    tagline: 'Budget, Authority, Need, and Timeline Verification',
    metric: '4-Point Gated Criteria',
    widthStyle: 'w-[80%]',
  },
  {
    layer: '04',
    name: 'ENGAGEMENT',
    tagline: 'Multi-Touch Human Phone + High-Deliverability Email',
    metric: 'Senior Buying Committee Dialogue',
    widthStyle: 'w-[70%]',
  },
  {
    layer: '05',
    name: 'OPPORTUNITY',
    tagline: 'Confirmed AE Appointments & Qualified Pipeline',
    metric: '85%+ Show-Rate SLA',
    widthStyle: 'w-[60%]',
  },
]

export default function GrowthFunnelVisual() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeLayer, setActiveLayer] = useState(4)

  return (
    <section
      id="growth-funnel"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#04060A' : '#F5F7FB',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-4"
            style={{
              backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)',
              borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)',
            }}
          >
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span
              className="font-mono text-xs font-bold tracking-widest uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              07 // THE TRANSFORMATION FUNNEL
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase mb-4"
            style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
          >
            FROM DATA TO{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              PIPELINE
            </span>
          </h2>

          <p
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
          >
            Each horizontal layer filters and qualifies market demand into predictable sales opportunities.
          </p>
        </div>

        {/* ══ 5 Progressively Narrowing Funnel Layers ══ */}
        <div className="flex flex-col items-center space-y-3.5 relative">
          {FUNNEL_LAYERS.map((item, idx) => {
            const isActive = activeLayer === idx

            return (
              <motion.div
                key={item.layer}
                onMouseEnter={() => setActiveLayer(idx)}
                className={`${item.widthStyle} p-5 sm:p-7 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive ? 'shadow-lg scale-101' : 'opacity-85 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive
                    ? isDark ? '#0F1420' : '#FFFFFF'
                    : isDark ? '#090C13' : '#FFFFFF',
                  borderColor: isActive
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-xs font-black"
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                    >
                      {item.layer}
                    </span>

                    <h3
                      className="font-mono text-xl sm:text-2xl font-black tracking-wider uppercase transition-colors"
                      style={{
                        color: isActive
                          ? isDark ? '#FFFFFF' : '#090D15'
                          : isDark ? '#CBD5E1' : '#334155',
                      }}
                    >
                      {item.name}
                    </h3>
                  </div>

                  <p
                    className="text-xs sm:text-sm font-normal sm:text-center"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {item.tagline}
                  </p>

                  <span
                    className="font-mono text-xs font-bold shrink-0 sm:text-right"
                    style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                  >
                    {item.metric}
                  </span>
                </div>
              </motion.div>
            )
          })}

          {/* Downward Funnel Flow Pointing Toward Pipeline */}
          <div className="flex flex-col items-center pt-4">
            <ArrowDown className="w-5 h-5 text-sky-400 animate-bounce mb-2" />

            {/* Final Outcome Anchor: PIPELINE */}
            <div
              className="px-8 py-3.5 rounded-full border font-mono text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-2 shadow-xl"
              style={{
                backgroundColor: isDark ? '#38BDF8' : '#0284C7',
                borderColor: isDark ? '#38BDF8' : '#0284C7',
                color: isDark ? '#090D15' : '#FFFFFF',
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>SALES PIPELINE (CLOSED ARR)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
