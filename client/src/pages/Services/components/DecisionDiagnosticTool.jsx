import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { ArrowRevealButton } from './UniverseButtons'

/**
 * DecisionDiagnosticTool — 08 SERVICES AS A DECISION TOOL
 * Large heading: "WHAT DO YOU NEED TO SOLVE?"
 * Large typography rows for questions:
 * - "Need more qualified leads?" -> B2B LEAD GENERATION
 * - "Need meetings with decision-makers?" -> B2B APPOINTMENT SETTING
 * - "Need to reach specific accounts?" -> ACCOUNT-BASED MARKETING
 * - "Need stronger engagement?" -> CONTENT SYNDICATION & EMAIL
 * - "Need cleaner prospect data?" -> DATABASE CLEANSING & ENRICHMENT
 * When hovered: question slides left, recommendation slides in from right.
 */

const DIAGNOSTIC_QUESTIONS = [
  {
    question: 'Need more qualified leads?',
    service: 'B2B LEAD GENERATION',
    path: '/sql-services',
    summary: 'High-volume outbound prospecting across verified accounts with confirmed interest from key decision-makers.',
  },
  {
    question: 'Need meetings with decision-makers?',
    service: 'B2B APPOINTMENT SETTING',
    path: '/b2b-appointment-setting',
    summary: 'Confirmed, high-impact introductory and technical discovery calls scheduled directly on sales calendars.',
  },
  {
    question: 'Need to reach specific accounts?',
    service: 'ACCOUNT-BASED MARKETING (ABM)',
    path: '/abm',
    summary: 'Multi-touch personalized campaigns targeting defined Tier-1 enterprise accounts with tailored messaging.',
  },
  {
    question: 'Need stronger engagement?',
    service: 'CONTENT SYNDICATION & EMAIL',
    path: '/content-syndication',
    summary: 'Syndicate whitepapers and deploy high-converting nurture sequences across targeted buying committees.',
  },
  {
    question: 'Need cleaner prospect data?',
    service: 'DATABASE CLEANSING & ENRICHMENT',
    path: '/database-cleansing',
    summary: 'Eliminate dead records, SMTP bounce-backs, and duplicate contacts with automated verification.',
  },
]

export default function DecisionDiagnosticTool() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIdx, setHoveredIdx] = useState(1) // Default to 'Need meetings?'

  return (
    <section
      id="decision-diagnostic"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#05070B' : '#FFFFFF',
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
              className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
            >
              08 // INTERACTIVE DIAGNOSTIC
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase"
            style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
          >
            WHAT DO YOU NEED TO{' '}
            <span style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>
              SOLVE?
            </span>
          </h2>
        </div>

        {/* ══ Large Typography Question Rows ══ */}
        <div className="space-y-4">
          {DIAGNOSTIC_QUESTIONS.map((item, idx) => {
            const isHovered = hoveredIdx === idx

            return (
              <div
                key={item.question}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group"
                style={{
                  backgroundColor: isHovered
                    ? isDark ? '#0D1117' : '#FAFBFD'
                    : isDark ? 'rgba(255, 255, 255, 0.015)' : '#FFFFFF',
                  borderColor: isHovered
                    ? isDark ? '#38BDF8' : '#0284C7'
                    : isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  boxShadow: isHovered
                    ? isDark ? '0 10px 30px -5px rgba(56, 189, 248, 0.2)' : '0 10px 30px -5px rgba(2, 132, 199, 0.1)'
                    : 'none',
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                  {/* Question (Slides Left on Hover) */}
                  <div className="lg:col-span-6 transition-transform duration-300 group-hover:-translate-x-2">
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-xs sm:text-sm font-bold"
                        style={{ color: isHovered ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? '#64748B' : '#94A3B8') }}
                      >
                        0{idx + 1}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors"
                        style={{
                          color: isHovered
                            ? isDark ? '#FFFFFF' : '#090D15'
                            : isDark ? '#94A3B8' : '#475569',
                        }}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Recommendation (Slides in from Right) */}
                  <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-transform duration-300 group-hover:translate-x-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-sky-500">
                          RECOMMENDED DISCIPLINE:
                        </span>
                      </div>
                      <h4
                        className="font-mono text-base sm:text-lg font-black uppercase tracking-wider mb-1"
                        style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
                      >
                        → {item.service}
                      </h4>
                      <p
                        className="text-xs font-normal max-w-sm line-clamp-1"
                        style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                      >
                        {item.summary}
                      </p>
                    </div>

                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider shrink-0 px-4 py-2.5 rounded-md border transition-all"
                      style={{
                        backgroundColor: isHovered
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#111622' : '#F8FAFC',
                        borderColor: isHovered
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                        color: isHovered
                          ? isDark ? '#090D15' : '#FFFFFF'
                          : isDark ? '#FFFFFF' : '#090D15',
                      }}
                    >
                      <span>VIEW SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
