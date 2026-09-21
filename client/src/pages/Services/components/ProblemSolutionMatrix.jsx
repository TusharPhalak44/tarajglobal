import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Target, Zap, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, XCircle, Sparkles, TrendingDown, TrendingUp } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const STATS = [
  { value: '12+', label: 'Specialized Growth Services', sub: 'Modular or full-funnel', color: '#38BDF8' },
  { value: '2,100+', label: 'Global B2B Campaigns', sub: 'Executed across 35+ verticals', color: '#00A6FF' },
  { value: '99.8%', label: 'Guaranteed Data Accuracy', sub: 'Human-in-the-loop SLA', color: '#FF6D00' },
]

const TRANSFORMATION_PILLARS = [
  {
    id: 'targeting',
    step: '01',
    title: 'Targeting & Data Integrity',
    friction: 'Wasting 40%+ of sales outreach budget targeting outdated, scraped, or unresponsive non-decision makers.',
    frictionMetric: '42% Contact Decay / Year',
    acceleration: 'Deep TAM discovery, direct-dial validation, and custom ICP scoring with guaranteed 99.8% verified accuracy.',
    accelerationMetric: '99.8% Verified Accuracy SLA',
    icon: Target,
    color: '#00A6FF',
    badge: 'ACCURACY',
  },
  {
    id: 'outbound',
    step: '02',
    title: 'Outbound & Omnichannel Reach',
    friction: 'Disconnected cold email blasts and blind cold calls that burn your domain reputation and deliver negligible reply rates.',
    frictionMetric: '< 0.8% Average Industry Reply',
    acceleration: 'Synchronized multi-touch orchestration across email, phone touchpoints, thought leadership, and custom ABM air-cover.',
    accelerationMetric: '4.2x Reply Velocity Lift',
    icon: Zap,
    color: '#38BDF8',
    badge: 'ENGAGEMENT',
  },
  {
    id: 'qualification',
    step: '03',
    title: 'Qualification & Sales Handoff',
    friction: 'Account executives spending 60% of their selling time on unqualified exploratory calls with zero budget or urgency.',
    frictionMetric: '65% Disqualified on Call 1',
    acceleration: 'Rigorous multi-tier BANT and SQL gating ensuring your closers only meet vetted stakeholders with commercial intent.',
    accelerationMetric: '100% Sales-Ready Pipeline',
    icon: ShieldCheck,
    color: '#FF6D00',
    badge: 'CONVERSION',
  },
]

export default function ProblemSolutionMatrix() {
  const [selectedPillar, setSelectedPillar] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const active = TRANSFORMATION_PILLARS[selectedPillar]
  const ActiveIcon = active.icon

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #020307 0%, #060c1c 50%, #020307 100%)'
          : 'linear-gradient(180deg, #eef3f9 0%, #ffffff 50%, #f0f5fc 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Turning B2B Complexity Into Clear Growth Opportunities"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ══ HEADER ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14 sm:mb-18">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 14 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-5"
              style={{
                background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
                color: isDark ? '#38BDF8' : '#0066CC',
              }}
            >
              WHAT WE SOLVE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
            >
              Turning B2B Complexity Into{' '}
              <span
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 50%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0066CC 0%, #0284C7 50%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Clear Growth Opportunities.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              Every business needs a different combination of targeting, engagement, qualification and conversion. Our services are designed to work individually or together around your growth objectives.
            </motion.p>
          </div>

          {/* Stat Badges */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all duration-300 hover:translate-x-1"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 248, 255, 0.8) 100%)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div>
                  <div className="text-xs sm:text-sm font-semibold mb-0.5" style={{ color: isDark ? '#F1F5F9' : '#0F172A' }}>
                    {stat.label}
                  </div>
                  <div className="text-xs" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
                    {stat.sub}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono shrink-0 ml-4" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ UNIQUE DUAL-PANE TRANSFORMATION CONSOLE ══ */}
        <div className="rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden backdrop-blur-xl border mb-10"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(13, 23, 42, 0.75) 0%, rgba(8, 12, 24, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 249, 255, 0.9) 100%)',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(0, 102, 204, 0.2)',
            boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 102, 204, 0.08)',
          }}
        >
          {/* Pillar Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}>
            <span className="text-xs font-mono font-bold uppercase tracking-wider mr-2" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>
              SELECT FOCUS:
            </span>
            {TRANSFORMATION_PILLARS.map((p, idx) => {
              const isSelected = selectedPillar === idx
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPillar(idx)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  style={{
                    background: isSelected
                      ? isDark ? '#38BDF8' : '#0066CC'
                      : isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                    color: isSelected ? (isDark ? '#05070d' : '#FFFFFF') : (isDark ? '#94A3B8' : '#64748B'),
                    border: isSelected
                      ? '1px solid transparent'
                      : isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span className="font-mono text-[10px]">#{p.step}</span>
                  <span>{p.title}</span>
                </button>
              )
            })}
          </div>

          {/* Side-by-Side Dual Pane: The Friction vs The Solution */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left: The Traditional Friction (Warning Red/Amber Card) */}
              <div
                className="lg:col-span-6 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                style={{
                  background: isDark ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.03)',
                  border: isDark ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/15 text-red-400">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                        TRADITIONAL FRICTION
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      LOST EFFICIENCY
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                    {active.title} Problem
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    {active.friction}
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center gap-2 text-xs font-mono text-red-400 border-red-500/15">
                  <TrendingDown className="w-4 h-4" />
                  <span className="font-bold">{active.frictionMetric}</span>
                </div>
              </div>

              {/* Right: The Taraj Solution (Cyan/Emerald Illuminated Card) */}
              <div
                className="lg:col-span-6 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                style={{
                  background: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(0, 102, 204, 0.05)',
                  border: isDark ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(0, 102, 204, 0.25)',
                  boxShadow: isDark ? '0 10px 30px rgba(0, 166, 255, 0.1)' : 'none',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${active.color}20`, color: active.color }}
                      >
                        <ActiveIcon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: active.color }}>
                        THE TARAJ ACCELERATION
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: `${active.color}18`, color: active.color, border: `1px solid ${active.color}35` }}
                    >
                      {active.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                    The Taraj Engine
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 font-medium" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                    {active.acceleration}
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: `${active.color}20` }}>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: active.color }}>
                    <TrendingUp className="w-4 h-4" />
                    <span>{active.accelerationMetric}</span>
                  </div>
                  <CyberButton
                    to="/contact"
                    variant="primary"
                    size="sm"
                  >
                    Deploy Fix
                  </CyberButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
