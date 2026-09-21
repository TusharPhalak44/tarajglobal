import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, LineChart, FileText, CheckCircle2 } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CleanPrimaryButton } from './CleanButtons'

/**
 * CleanWhyTaraj — 05 WHY TARAJ GLOBAL
 * Clean split-screen layout:
 * - Left: Large heading "Why Businesses Choose TaRaj Global" + supporting narrative + trust checks.
 * - Right: 4 vertically stacked benefits:
 *   01 Quality-First Data
 *   02 Targeted Decision-Makers
 *   03 Data-Driven Campaigns
 *   04 Transparent Execution
 * - Hover: selected item becomes visually stronger, others slightly muted.
 * - Subtle vertical line connecting the items.
 */

const BENEFITS = [
  {
    num: '01',
    title: 'Quality-First Data',
    description: 'Dual-channel telephone and email verification ensures zero synthetic records, zero stale lists, and virtually zero email bounce rates.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Targeted Decision-Makers',
    description: 'We connect directly with economic buyers, department heads, and C-level leaders who hold real commercial budget authority.',
    icon: Users,
  },
  {
    num: '03',
    title: 'Data-Driven Campaigns',
    description: 'Outbound orchestration powered by real-time technographic installs, company expansion events, and first-party intent telemetry.',
    icon: LineChart,
  },
  {
    num: '04',
    title: 'Transparent Execution',
    description: 'Complete visibility into every contact touchpoint, validated qualification dossiers, and transparent show-rate SLA guarantees.',
    icon: FileText,
  },
]

export default function CleanWhyTaraj() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIdx, setHoveredIdx] = useState(0)

  return (
    <section
      id="why-taraj"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#0A0C10' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ══ LEFT: Split-Screen Editorial Statement ══ */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
              />
              <span
                className="font-mono text-xs font-semibold tracking-wider uppercase"
                style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
              >
                05 // WHY TARAJ GLOBAL
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Why Businesses Choose{' '}
              <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                TaRaj Global
              </span>
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed font-normal mb-8"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              Modern revenue organizations need predictable, qualified pipeline—not vanity outreach metrics. We provide human-verified B2B demand engines designed for enterprise sales cycles.
            </p>

            <div className="space-y-3 mb-10">
              {[
                'GDPR, CAN-SPAM & CCPA compliant data pipelines',
                'Pre-vetted BANT and SQL lead criteria before handoff',
                'Dedicated Account Strategist for every campaign',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  />
                  <span
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <CleanPrimaryButton to="/contact">
                Start a Conversation
              </CleanPrimaryButton>
            </div>
          </div>

          {/* ══ RIGHT: 4 Vertically Stacked Benefits with Connecting Line ══ */}
          <div className="lg:col-span-7 relative">
            {/* Subtle vertical line connecting items */}
            <div
              className="absolute left-6 top-8 bottom-8 w-[1px] hidden sm:block"
              style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
            />

            <div className="space-y-4 sm:pl-10">
              {BENEFITS.map((item, index) => {
                const isHovered = hoveredIdx === index
                const hasHover = hoveredIdx !== null
                const Icon = item.icon

                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(index)}
                    className="p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative"
                    style={{
                      backgroundColor: isHovered
                        ? isDark ? '#111622' : '#FFFFFF'
                        : isDark ? 'rgba(255, 255, 255, 0.015)' : '#FAFBFD',
                      borderColor: isHovered
                        ? isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.35)'
                        : isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                      boxShadow: isHovered
                        ? isDark
                          ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
                          : '0 10px 30px -10px rgba(0, 0, 0, 0.06)'
                        : 'none',
                      opacity: hasHover ? (isHovered ? 1 : 0.65) : 1,
                      transform: isHovered ? 'translateX(4px)' : 'none',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Number badge */}
                      <span
                        className="font-mono text-sm font-bold pt-1"
                        style={{ color: isHovered ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                      >
                        {item.num}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3
                            className="text-lg sm:text-xl font-bold tracking-tight transition-colors"
                            style={{
                              color: isHovered
                                ? isDark ? '#FFFFFF' : '#0B0F19'
                                : isDark ? '#E2E8F0' : '#1E293B',
                            }}
                          >
                            {item.title}
                          </h3>

                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors"
                            style={{
                              backgroundColor: isHovered
                                ? isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.1)'
                                : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                              borderColor: isHovered
                                ? isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)'
                                : 'transparent',
                              color: isHovered
                                ? isDark ? '#38BDF8' : '#0284C7'
                                : isDark ? '#64748B' : '#94A3B8',
                            }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <p
                          className="text-sm sm:text-base leading-relaxed font-normal"
                          style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
