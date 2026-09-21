import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandPrimaryButton } from './CommandButtons'

/**
 * CommandDecisionTool — 06 INTERACTIVE SERVICE COMPARISON
 * "Choose the Right Growth Motion"
 * Mini interactive decision tool:
 * Left: Question list
 * - Need more leads? -> Lead Generation
 * - Need qualified prospects? -> MQL / BANT
 * - Need meetings? -> Appointment Setting
 * - Need target-account engagement? -> ABM
 * - Need awareness? -> Content Syndication
 * - Need pipeline growth? -> Demand Generation
 * Right: Recommended service card updates on hover/click.
 */

const DECISIONS = [
  {
    question: 'Need more leads?',
    shortTarget: 'Lead Generation',
    serviceTitle: 'B2B LEAD GENERATION',
    path: '/sql-services',
    desc: 'High-volume outbound prospecting across verified accounts with confirmed interest from key decision-makers.',
    bestFor: 'Teams needing immediate pipeline velocity and verified ICP accounts.',
    sla: 'Guaranteed Lead Volumes',
  },
  {
    question: 'Need qualified prospects?',
    shortTarget: 'MQL / BANT',
    serviceTitle: 'BANT LEAD GENERATION',
    path: '/bant-lead-generation',
    desc: 'Human telephonic screening evaluating Budget, Authority, Need, and Timeline so your AEs only speak with qualified prospects.',
    bestFor: 'Sales teams struggling with low show-rates or unqualified leads.',
    sla: '4-Point Qualification SLA',
  },
  {
    question: 'Need meetings?',
    shortTarget: 'Appointment Setting',
    serviceTitle: 'B2B APPOINTMENT SETTING',
    path: '/b2b-appointment-setting',
    desc: 'Direct calendar booking with senior stakeholders, directors, and VPs ready to explore your solution.',
    bestFor: 'Enterprises wanting confirmed exploratory demos on sales reps’ calendars.',
    sla: '85%+ Show-Rate Guarantee',
  },
  {
    question: 'Need target-account engagement?',
    shortTarget: 'Account-Based Marketing',
    serviceTitle: 'ACCOUNT-BASED MARKETING (ABM)',
    path: '/abm',
    desc: 'Multi-touch personalized campaigns targeting defined Tier-1 enterprise accounts with tailored messaging.',
    bestFor: 'Companies with high ACV deals ($50k+) requiring buying committee consensus.',
    sla: 'Tier-1 Stakeholder Penetration',
  },
  {
    question: 'Need awareness?',
    shortTarget: 'Content Syndication',
    serviceTitle: 'CONTENT SYNDICATION',
    path: '/content-syndication',
    desc: 'Distribute whitepapers, analyst reports, and tech collateral to targeted professionals across top tech networks.',
    bestFor: 'Brands wanting authority, thought leadership, and top-funnel engagement.',
    sla: 'Guaranteed Asset Downloads',
  },
  {
    question: 'Need pipeline growth?',
    shortTarget: 'Demand Generation',
    serviceTitle: 'DEMAND GENERATION',
    path: '/demand-generation',
    desc: 'An end-to-end full-funnel demand generation engine combining intent data, nurture flows, and qualified handoffs.',
    bestFor: 'B2B SaaS companies seeking sustainable, predictable quarter-over-quarter revenue.',
    sla: 'Full-Funnel Pipeline SLA',
  },
]

export default function CommandDecisionTool() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeIdx, setActiveIdx] = useState(2) // Default to 'Need meetings?'

  const current = DECISIONS[activeIdx]

  return (
    <section
      id="growth-motion"
      className="relative py-24 sm:py-32 lg:py-36 px-4 sm:px-6 lg:px-12 border-b"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
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
            06 // INTERACTIVE DECISION TOOL
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
          style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
        >
          Choose the Right{' '}
          <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
            Growth Motion
          </span>
        </h2>

        <p
          className="text-base sm:text-lg leading-relaxed font-normal mb-14 max-w-2xl"
          style={{ color: isDark ? '#94A3B8' : '#64748B' }}
        >
          Hover over your current commercial challenge to identify the tailored delivery framework calibrated for your revenue team.
        </p>

        {/* 2-Column Decision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column (6 cols): Question Selector List */}
          <div className="lg:col-span-6 space-y-2.5">
            {DECISIONS.map((item, idx) => {
              const isActive = activeIdx === idx

              return (
                <div
                  key={item.question}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className="p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group"
                  style={{
                    backgroundColor: isActive
                      ? isDark ? '#111622' : '#FFFFFF'
                      : isDark ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                    borderColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                    boxShadow: isActive
                      ? isDark
                        ? '0 4px 15px rgba(56, 189, 248, 0.15)'
                        : '0 4px 15px rgba(2, 132, 199, 0.08)'
                      : 'none',
                    transform: isActive ? 'translateX(6px)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="text-base sm:text-lg font-bold tracking-tight transition-colors"
                      style={{
                        color: isActive
                          ? isDark ? '#FFFFFF' : '#0B0F19'
                          : isDark ? '#94A3B8' : '#475569',
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="hidden sm:inline font-mono text-xs font-semibold"
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                    >
                      → {item.shortTarget}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? 'translate-x-1' : ''
                      }`}
                      style={{ color: isActive ? (isDark ? '#38BDF8' : '#0284C7') : '#94A3B8' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column (6 cols): Recommended Service Panel */}
          <div className="lg:col-span-6">
            <div
              className="p-8 sm:p-10 rounded-2xl border relative overflow-hidden"
              style={{
                backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)',
                boxShadow: isDark
                  ? '0 15px 35px -5px rgba(0, 0, 0, 0.5)'
                  : '0 15px 35px -5px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div className="pb-4 mb-6 border-b flex items-center justify-between"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  >
                    RECOMMENDED MOTION
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                >
                  CALIBRATED SLA
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.serviceTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-widest block mb-2"
                    style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                  >
                    IN RESPONSE TO: "{current.question.toUpperCase()}"
                  </span>

                  <h3
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    {current.serviceTitle}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed font-normal mb-6"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {current.desc}
                  </p>

                  <div className="p-4 rounded-xl border mb-8 text-xs sm:text-sm space-y-2"
                    style={{
                      backgroundColor: isDark ? '#111622' : '#F8FAFC',
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono font-bold shrink-0 text-sky-500">BEST FIT:</span>
                      <span style={{ color: isDark ? '#CBD5E1' : '#334155' }}>{current.bestFor}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t"
                      style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="font-mono font-bold" style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
                        {current.sla}
                      </span>
                    </div>
                  </div>

                  <div>
                    <CommandPrimaryButton to={current.path}>
                      VIEW SERVICE →
                    </CommandPrimaryButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
