import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Cpu, Database, Target, Zap } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { OutlineSecondaryButton } from './GrowthJourneyButtons'

/**
 * SECTION 08 — WHY TARAJ
 * Editorial split typography section:
 * "Built For B2B Growth. Driven By Data."
 * Sequential reveal of core pillars: QUALITY, DATA, INTELLIGENCE, TARGETING, RESULTS.
 * No generic cards — pure typography, hairline dividers, and subtle ambient background.
 */

const PILLARS = [
  {
    num: '01',
    word: 'QUALITY',
    tagline: 'Zero synthetic or stale records.',
    detail: 'Every contact and decision-maker is triple-verified across dual telephone and email validation channels before entering your pipeline.',
    icon: ShieldCheck,
    metric: '99.2% Accuracy',
  },
  {
    num: '02',
    word: 'DATA',
    tagline: 'Dynamic telemetry, not static lists.',
    detail: 'Real-time firmographic, technographic, and organizational restructuring signals mapped to your ideal customer profile.',
    icon: Database,
    metric: '45M+ Global Profiles',
  },
  {
    num: '03',
    word: 'INTELLIGENCE',
    tagline: 'First-party intent signal capture.',
    detail: 'We track active research spikes, tech stack migrations, and leadership transitions before competitors identify the opportunity.',
    icon: Cpu,
    metric: 'Active Buyer Signals',
  },
  {
    num: '04',
    word: 'TARGETING',
    tagline: 'Account-tiered precision outreach.',
    detail: 'Tier-1 enterprise accounts receive personalized multi-touch orchestration, eliminating generic cold spam and maximizing response.',
    icon: Target,
    metric: '100% ICP Alignment',
  },
  {
    num: '05',
    word: 'RESULTS',
    tagline: 'Revenue acceleration you can forecast.',
    detail: 'Guaranteed meeting show-rates and vetted SQL criteria so your account executives spend time closing, not prospecting.',
    icon: TrendingUp,
    metric: '3.4x Pipeline Velocity',
  },
]

export default function JourneyWhyTaraj() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activePillar, setActivePillar] = useState(0)

  return (
    <section
      id="why-taraj"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#06080E' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Subtle Ambience & Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Giant Watermark Typography */}
        <div
          className="absolute -bottom-10 right-0 font-mono text-[14vw] font-black uppercase tracking-tighter leading-none opacity-[0.02] text-right"
          style={{ color: isDark ? '#FFFFFF' : '#000000' }}
        >
          PRECISION
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: isDark ? '#00A6FF' : '#FF6D00' }}
          />
          <span
            className="font-mono text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: isDark ? '#00A6FF' : '#0066CC' }}
          >
            08 // WHY TARAJ GLOBAL
          </span>
          <span
            className="h-px flex-1 max-w-[80px]"
            style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }}
          />
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Massive Editorial Statement */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.05] mb-8"
              style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
            >
              Built For <span className="font-sans font-black italic">B2B Growth.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent font-sans font-black">
                Driven By Data.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              Most outbound engines collapse because they rely on stale contact lists, automated spray-and-pray spam, and unvetted leads. TaRaj Global replaces guesswork with rigorous market intelligence and verified human engagement.
            </motion.p>

            {/* Quick credibility checklist */}
            <div className="space-y-3 mb-10">
              {[
                'GDPR, CAN-SPAM & CCPA compliant data pipelines',
                'Dual-channel telephone + email identity verification',
                'Direct SLA on meeting show-rates and SQL qualifications',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: isDark ? '#00A6FF' : '#0066CC' }}
                  />
                  <span
                    className="font-mono text-xs sm:text-sm"
                    style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <OutlineSecondaryButton to="/contact">
                SCHEDULE ARCHITECTURE AUDIT
              </OutlineSecondaryButton>
            </div>
          </div>

          {/* Right Column: Sequential Typography Pillars */}
          <div className="lg:col-span-6 space-y-4">
            {PILLARS.map((pillar, index) => {
              const IconComponent = pillar.icon
              const isActive = activePillar === index

              return (
                <motion.div
                  key={pillar.word}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActivePillar(index)}
                  className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive ? 'shadow-xl' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? isDark
                        ? 'rgba(255, 255, 255, 0.04)'
                        : '#FFFFFF'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.015)'
                      : 'rgba(255, 255, 255, 0.5)',
                    borderColor: isActive
                      ? isDark
                        ? '#00A6FF'
                        : '#0066CC'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.08)',
                    transform: isActive ? 'translateX(8px)' : 'none',
                  }}
                >
                  {/* Subtle active glow accent on left border */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: isDark ? '#00A6FF' : '#0066CC' }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                      >
                        {pillar.num}
                      </span>
                      {/* Oversized Word */}
                      <h3
                        className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider transition-colors duration-300"
                        style={{
                          color: isActive
                            ? isDark ? '#FFFFFF' : '#080A0F'
                            : isDark ? '#94A3B8' : '#64748B',
                        }}
                      >
                        {pillar.word}
                      </h3>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border transition-all duration-300 ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? isDark ? 'rgba(0, 166, 255, 0.15)' : 'rgba(0, 102, 204, 0.1)'
                          : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                        borderColor: isActive
                          ? isDark ? 'rgba(0, 166, 255, 0.4)' : 'rgba(0, 102, 204, 0.3)'
                          : 'transparent',
                        color: isActive
                          ? isDark ? '#00A6FF' : '#0066CC'
                          : isDark ? '#64748B' : '#94A3B8',
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <p
                    className="font-mono text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: isDark ? '#00A6FF' : '#0066CC' }}
                  >
                    {pillar.tagline}
                  </p>

                  <p
                    className="text-sm sm:text-base leading-relaxed mb-4"
                    style={{ color: isDark ? '#94A3B8' : '#475569' }}
                  >
                    {pillar.detail}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t"
                    style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)' }}
                  >
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: isDark ? '#64748B' : '#94A3B8' }}
                    >
                      BENCHMARK
                    </span>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}
                    >
                      {pillar.metric}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
