import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, TrendingUp, Award, BarChart3, CheckCircle2, Zap, ArrowRight, Activity } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useTheme } from '@context/ThemeContext'
import CyberButton from './CyberButton'

const MetricCounter = ({ target, duration = 1800, shouldAnimate, isDecimal = false }) => {
  const [display, setDisplay] = useState(0)
  const hasRun = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(target)
      return
    }

    if (shouldAnimate && !hasRun.current) {
      hasRun.current = true
      let startTime = null

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const val = isDecimal ? +(ease * target).toFixed(1) : Math.floor(ease * target)
        setDisplay(val)

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          setDisplay(target)
        }
      }

      requestAnimationFrame(step)
    }
  }, [shouldAnimate, target, duration, prefersReducedMotion, isDecimal])

  return <span>{prefersReducedMotion ? target.toLocaleString() : display.toLocaleString()}</span>
}

const METRICS = [
  {
    prefix: '$',
    target: 18,
    suffix: 'M+',
    label: 'Pipeline Influenced',
    desc: 'in qualified revenue pipeline generated for enterprise clients',
    icon: TrendingUp,
    color: '#00A6FF',
    accentGlow: 'rgba(0, 166, 255, 0.4)',
    statBadge: 'VERIFIED REVENUE',
  },
  {
    prefix: '',
    target: 12,
    suffix: '+',
    label: 'Growth Solutions',
    desc: 'modular or full-funnel specialized B2B services',
    icon: BarChart3,
    color: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.4)',
    statBadge: 'FULL FUNNEL',
  },
  {
    prefix: '',
    target: 2100,
    suffix: '+',
    label: 'Campaigns Delivered',
    desc: 'executed globally across 35+ technology and industrial verticals',
    icon: Award,
    color: '#FFA600',
    accentGlow: 'rgba(255, 166, 0, 0.4)',
    statBadge: 'GLOBAL SCALE',
  },
  {
    prefix: '',
    target: 99.8,
    isDecimal: true,
    suffix: '%',
    label: 'Data Accuracy SLA',
    desc: 'rigorous human-verified data guarantee on every single record',
    icon: ShieldCheck,
    color: '#FF6D00',
    accentGlow: 'rgba(255, 109, 0, 0.4)',
    statBadge: 'GUARANTEED SLA',
  },
]

export default function VerifiedPerformance() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse 90% 60% at 50% 50%, #081125 0%, #030408 60%, #020306 100%)'
          : 'radial-gradient(ellipse 90% 60% at 50% 50%, #edf4fc 0%, #f8fafd 60%, #ffffff 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Verified Performance Metrics"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4"
            style={{
              background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
              border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
              color: isDark ? '#38BDF8' : '#0066CC',
            }}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>PROVEN TRACK RECORD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-5"
            style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
          >
            Performance Backed by{' '}
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
              Real Numbers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg leading-relaxed font-normal"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            We don’t measure success by activities or vanity impressions. Every metric below reflects tangible commercial outcomes generated for B2B growth teams.
          </motion.p>
        </div>

        {/* 4 Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mb-12">
          {METRICS.map((m, idx) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 24 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 border"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(8, 12, 24, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.92) 100%)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                  boxShadow: isDark
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                    : '0 20px 45px -15px rgba(0, 102, 204, 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = m.color
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 25px 60px -15px ${m.accentGlow}`
                    : `0 25px 60px -15px rgba(0, 102, 204, 0.15)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.7)'
                    : '0 20px 45px -15px rgba(0, 102, 204, 0.06)'
                }}
              >
                {/* Glowing Top Beam */}
                <div
                  className="absolute top-0 left-6 right-6 h-[3px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: isDark ? `${m.color}18` : `${m.color}15`,
                        color: m.color,
                        border: `1px solid ${m.color}35`,
                        boxShadow: `0 0 15px ${m.accentGlow}`,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${m.color}15`,
                        color: m.color,
                        border: `1px solid ${m.color}30`,
                      }}
                    >
                      {m.statBadge}
                    </span>
                  </div>

                  {/* Kinetic Counter with High-Contrast Typography */}
                  <div
                    className="text-4xl sm:text-5xl font-black font-mono tracking-tight mb-2 flex items-baseline"
                    style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                  >
                    {m.prefix}
                    <MetricCounter
                      target={m.target}
                      shouldAnimate={isInView}
                      isDecimal={m.isDecimal}
                    />
                    <span style={{ color: m.color }}>{m.suffix}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-2 tracking-tight" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
                    {m.label}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center gap-2 text-xs font-mono font-bold" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)', color: m.color }}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VERIFIED SLA CERTIFIED</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* SLA Guarantee Strip with CyberButton */}
        <div
          className="rounded-3xl p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 border backdrop-blur-xl"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(8, 12, 24, 0.85) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(0, 102, 204, 0.25)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-sky-500/15 text-sky-400 border border-sky-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold" style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}>
                Guaranteed Lead Replacement SLA
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                Any record or meeting that fails your agreed ICP or qualification criteria is replaced at zero charge.
              </p>
            </div>
          </div>

          <CyberButton
            to="/contact"
            variant="emerald"
            size="md"
          >
            Review SLA Terms
          </CyberButton>
        </div>

      </div>
    </section>
  )
}
