import React from 'react'
import { motion } from 'framer-motion'
import { Database, Target, Users, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CleanPrimaryButton, CleanSecondaryButton } from './CleanButtons'

/**
 * CleanHero — 01 HERO SECTION
 * Clean, minimal, powerful B2B SaaS Hero:
 * - Left: Eyebrow, Large Heading "Solutions That Turn B2B Demand Into Pipeline", concise copy, dual buttons.
 * - Right: Clean abstract B2B visual: DATA -> TARGETING -> ENGAGEMENT -> OPPORTUNITY with thin lines and subtle pulse.
 */

const PIPELINE_NODES = [
  {
    step: '01',
    label: 'DATA',
    detail: 'Verified B2B Intelligence',
    icon: Database,
    badge: '99.8% Accuracy',
  },
  {
    step: '02',
    label: 'TARGETING',
    detail: 'ICP & Intent Filtering',
    icon: Target,
    badge: 'Account-Tiered',
  },
  {
    step: '03',
    label: 'ENGAGEMENT',
    detail: 'Multi-Touch Outreach',
    icon: Users,
    badge: 'Human-in-the-Loop',
  },
  {
    step: '04',
    label: 'OPPORTUNITY',
    detail: 'Sales-Ready Pipeline',
    icon: TrendingUp,
    badge: 'Guaranteed Show-Rates',
  },
]

export default function CleanHero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleScrollToOverview = () => {
    const el = document.getElementById('services-overview')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#0A0C10' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
      }}
    >
      {/* Subtle Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ══ LEFT: Clean Editorial Content ══ */}
          <div className="lg:col-span-7">
            {/* Small Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-6"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
              />
              <span
                className="text-xs font-semibold tracking-wider uppercase font-mono"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                OUR SERVICES
              </span>
            </motion.div>

            {/* Large Clean Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Solutions That Turn B2B Demand Into{' '}
              <span
                className="relative inline-block"
                style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
              >
                Pipeline
              </span>
            </motion.h1>

            {/* Short Paragraph + Natural SEO Value */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl font-normal"
              style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
            >
              Taraj Global partners with enterprise and mid-market B2B technology teams to architect predictable outbound engines, engage verified decision-makers, and generate high-converting sales pipeline.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <CleanPrimaryButton to="/contact">
                Start a Conversation
              </CleanPrimaryButton>
              <CleanSecondaryButton onClick={handleScrollToOverview}>
                Explore Services
              </CleanSecondaryButton>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-10 mt-10 border-t flex flex-wrap items-center gap-6 sm:gap-8"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
            >
              {[
                'GDPR & CAN-SPAM Compliant',
                'Dual-Channel Verification',
                'Guaranteed Show-Rates',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2
                    className="w-4 h-4"
                    style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT: Clean Abstract B2B Visual ══ */}
          {/* DATA -> TARGETING -> ENGAGEMENT -> OPPORTUNITY */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-2xl border relative backdrop-blur-sm"
              style={{
                backgroundColor: isDark ? 'rgba(17, 21, 28, 0.6)' : 'rgba(248, 250, 252, 0.85)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                boxShadow: isDark ? '0 20px 40px -15px rgba(0, 0, 0, 0.5)' : '0 15px 35px -15px rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* Header inside visual card */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
                  />
                  <span
                    className="text-xs font-mono font-semibold tracking-wider uppercase"
                    style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}
                  >
                    THE PIPELINE JOURNEY
                  </span>
                </div>
                <span
                  className="text-[11px] font-mono"
                  style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                >
                  REAL-TIME SLA
                </span>
              </div>

              {/* 4 Connected Sequential Nodes */}
              <div className="relative space-y-4">
                {/* Thin connecting vertical line */}
                <div
                  className="absolute left-[19px] top-6 bottom-6 w-[1px]"
                  style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}
                />

                {PIPELINE_NODES.map((node, index) => {
                  const Icon = node.icon
                  const isLast = index === PIPELINE_NODES.length - 1

                  return (
                    <motion.div
                      key={node.step}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="relative flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 group hover:translate-x-1"
                      style={{
                        backgroundColor: isDark
                          ? isLast ? 'rgba(56, 189, 248, 0.06)' : 'rgba(255, 255, 255, 0.02)'
                          : isLast ? 'rgba(2, 132, 199, 0.04)' : '#FFFFFF',
                        borderColor: isLast
                          ? isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.3)'
                          : isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      {/* Left: Icon & Node details */}
                      <div className="flex items-center gap-3.5 relative z-10">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 transition-colors duration-300"
                          style={{
                            backgroundColor: isDark ? '#0F131A' : '#F1F5F9',
                            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                            color: isDark ? '#38BDF8' : '#0284C7',
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-mono font-bold uppercase tracking-wider"
                              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                            >
                              {node.label}
                            </span>
                            <span
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                              style={{
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                                color: isDark ? '#94A3B8' : '#64748B',
                              }}
                            >
                              {node.step}
                            </span>
                          </div>
                          <span
                            className="text-xs font-normal"
                            style={{ color: isDark ? '#94A3B8' : '#64748B' }}
                          >
                            {node.detail}
                          </span>
                        </div>
                      </div>

                      {/* Right: Badge */}
                      <span
                        className="text-[11px] font-mono font-medium shrink-0 ml-2"
                        style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
                      >
                        {node.badge}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Subtle Pipeline Outcome */}
              <div
                className="mt-5 pt-4 border-t flex items-center justify-between text-xs"
                style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
              >
                <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                  Target Conversion Benchmark
                </span>
                <span
                  className="font-mono font-semibold"
                  style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                >
                  3.4x Velocity
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
