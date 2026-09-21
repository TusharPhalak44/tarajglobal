import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import TarajButton from './TarajButton'

const INDUSTRIES = [
  {
    id: 'saas',
    name: 'SaaS & Software',
    headline: 'Scaling Annual Recurring Revenue with High-Intent Tech Buyers',
    desc: 'B2B SaaS companies rely on TaRaj Global to identify product-qualified prospects, map software evaluation committees, and convert technical trials into enterprise pipeline.',
    kpi: '3.4x Average ARR Pipeline Velocity',
    tags: ['Product-Led Outreach', 'Software Evaluators', 'CIO / VP Engineering ICP'],
    accentColor: '#00A6FF',
  },
  {
    id: 'technology',
    name: 'Technology Hardware',
    headline: 'Navigating Multi-Stakeholder Procurement Cycles',
    desc: 'Connecting technology OEM manufacturers and enterprise infrastructure vendors directly with technical decision-makers and C-suite procurement directors.',
    kpi: '85% Buying Committee Coverage',
    tags: ['OEM Sourcing', 'IT Procurement', 'Global Supply Chain ICP'],
    accentColor: '#38BDF8',
  },
  {
    id: 'it-services',
    name: 'IT Services & Consulting',
    headline: 'Engaging Enterprises for High-Ticket Digital Transformation',
    desc: 'From systems integration to custom cloud development, we deliver qualified introductory consultations with CTOs and enterprise architects seeking specialized delivery partners.',
    kpi: '$2.4M Avg Deal Size Influenced',
    tags: ['Digital Transformation', 'Enterprise Modernization', 'CTO / Architect ICP'],
    accentColor: '#10B981',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    headline: 'Reaching CISOs and Risk Officers Across Regulated Sectors',
    desc: 'Security buyers have zero tolerance for spam. We build trust-driven, compliance-focused outreach campaigns that address specific threat vectors and audit mandates.',
    kpi: '99.8% Compliance Validated',
    tags: ['CISO Mapping', 'Threat Vector Targeting', 'Zero-Trust Architecture'],
    accentColor: '#FFA600',
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    headline: 'Accelerating Migration and DevOps Cloud Spending',
    desc: 'Targeting mid-market and Fortune 500 enterprises actively modernizing their infrastructure, adopting multi-cloud strategies, and expanding Kubernetes orchestration.',
    kpi: '4.8x Outbound Response Lift',
    tags: ['Cloud Migration', 'DevOps Decision-Makers', 'Infrastructure VPs'],
    accentColor: '#8B5CF6',
  },
  {
    id: 'telecom',
    name: 'Telecom & Connectivity',
    headline: 'Connecting Enterprise Telecom Solutions to Distributed Operations',
    desc: 'Delivering confirmed exploratory meetings with network architects, unified communications managers, and facility operations leaders across distributed organizations.',
    kpi: '92% Account Engagement Rate',
    tags: ['SD-WAN & Fiber', 'Unified Comms', 'Network Infrastructure'],
    accentColor: '#EC4899',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    headline: 'Positioning Specialized Advisory & Corporate Consulting',
    desc: 'Enabling management consulting, corporate legal, and executive search firms to initiate confidential conversations with CEOs, CFOs, and board members.',
    kpi: '100% C-Level Direct Targeting',
    tags: ['CFO / Board ICP', 'Management Advisory', 'Executive Search'],
    accentColor: '#FF6D00',
  },
]

export default function IndustrySolutionsSelector() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const activeIndustry = INDUSTRIES[activeIdx]

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Industries We Accelerate — Interactive Solution Selector"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>SPECIALIZED DOMAIN EXPERTISE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Sectors We{' '}
            <span className="font-light italic">Accelerate.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed"
            style={{ color: isDark ? '#94A3B8' : '#6B7280' }}
          >
            B2B buying behaviors vary dramatically across verticals. We adapt targeting, messaging, and qualification gating to your industry’s commercial dynamics.
          </motion.p>
        </div>

        {/* ══ EDITORIAL MAGAZINE-LIKE DUAL-PANE COMPOSITION ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT: Interactive Industry Selector List */}
          <div className="lg:col-span-5 space-y-1">
            {INDUSTRIES.map((ind, idx) => {
              const isSelected = activeIdx === idx

              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="w-full text-left py-4 px-5 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'
                      : 'transparent',
                    border: isSelected
                      ? isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)'
                      : '1px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isSelected ? ind.accentColor : isDark ? '#52525B' : '#A1A1AA' }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200"
                      style={{
                        color: isSelected
                          ? isDark ? '#FFFFFF' : '#0B0F19'
                          : isDark ? '#71717A' : '#71717A',
                      }}
                    >
                      {ind.name}
                    </span>
                  </div>

                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300"
                    style={{
                      color: isSelected ? ind.accentColor : 'transparent',
                      transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  />
                </button>
              )
            })}
          </div>

          {/* RIGHT: Editorial Magazine Showcase Pane (Changes dynamically) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-3xl p-8 sm:p-12 border backdrop-blur-xl relative overflow-hidden"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.75)' : 'rgba(250, 251, 253, 0.95)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark
                    ? `0 30px 60px -20px rgba(0, 0, 0, 0.8)`
                    : `0 30px 60px -20px rgba(0, 0, 0, 0.06)`,
                }}
              >
                {/* Background Ambient Tint */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${activeIndustry.accentColor}30 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-widest block mb-4"
                    style={{ color: activeIndustry.accentColor }}
                  >
                    // SECTOR SOLUTION: {activeIndustry.name.toUpperCase()}
                  </span>

                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6"
                    style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                  >
                    {activeIndustry.headline}
                  </h3>

                  <p
                    className="text-base sm:text-lg leading-relaxed mb-8 font-normal"
                    style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
                  >
                    {activeIndustry.desc}
                  </p>

                  {/* Benchmark Stat */}
                  <div className="mb-8 p-5 rounded-2xl border" style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-1" style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}>
                      PROVEN SECTOR BENCHMARK
                    </span>
                    <div className="text-2xl font-extrabold" style={{ color: activeIndustry.accentColor }}>
                      {activeIndustry.kpi}
                    </div>
                  </div>

                  {/* Sector Tags */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {activeIndustry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                          color: isDark ? '#D4D4D8' : '#374151',
                          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <TarajButton to="/contact" variant="primary" size="md">
                    Discuss {activeIndustry.name} Strategy
                  </TarajButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
