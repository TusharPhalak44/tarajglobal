import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock, Users, Flame } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import CyberButton from './CyberButton'

const ASSURANCES = [
  { label: 'Zero Long-Term Lock-in', icon: ShieldCheck, color: '#38BDF8' },
  { label: 'Dedicated Account Strategist', icon: Users, color: '#A78BFA' },
  { label: '99.8% Data Accuracy SLA', icon: Zap, color: '#FFA600' },
  { label: 'Fast 14-Day Pilot Launch', icon: Clock, color: '#FF6D00' },
]

export default function ModernServicesCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()

  const handleScrollToGrid = () => {
    const el = document.getElementById('services-grid')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative py-28 lg:py-40 overflow-hidden select-none"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse 100% 80% at 50% 50%, #0d2042 0%, #040813 50%, #020306 100%)'
          : 'radial-gradient(ellipse 100% 80% at 50% 50%, #e1effe 0%, #f4f8fe 50%, #eef3f9 100%)',
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Let's Build Your Next Growth Opportunity"
    >
      {/* ── Gravitational Cosmic Rings ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Pulsing Concentric Energy Rings */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border"
          style={{ borderColor: isDark ? 'rgba(0, 166, 255, 0.2)' : 'rgba(0, 102, 204, 0.15)' }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.14, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border"
          style={{ borderColor: isDark ? 'rgba(255, 109, 0, 0.2)' : 'rgba(255, 107, 0, 0.15)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border"
          style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 102, 204, 0.1)' }}
        />

        {/* Ambient Glowing Orbs */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: isDark ? 'rgba(0, 166, 255, 0.2)' : 'rgba(0, 102, 204, 0.12)' }}
        />
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: isDark ? 'rgba(255, 109, 0, 0.18)' : 'rgba(255, 107, 0, 0.12)' }}
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6 backdrop-blur-xl"
            style={{
              background: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(0, 102, 204, 0.08)',
              border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(0, 102, 204, 0.2)',
              color: isDark ? '#38BDF8' : '#0066CC',
            }}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
            <span>START SCALING PIPELINE TODAY</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.06] mb-6"
            style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
          >
            Let's Build Your Next{' '}
            <span
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #38BDF8 0%, #00A6FF 45%, #FF6D00 100%)'
                  : 'linear-gradient(135deg, #0066CC 0%, #0284C7 45%, #EA580C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Growth Opportunity.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-normal"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            Whether you need a dedicated campaign or a comprehensive pipeline strategy, our team is ready to help you identify, engage, and convert your most valuable B2B prospects.
          </motion.p>

          {/* Redesigned Attractive Dual CyberButtons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16"
          >
            <CyberButton
              to="/contact"
              variant="orange"
              size="xl"
              sparkle={true}
            >
              Schedule a Consultation
            </CyberButton>

            <CyberButton
              onClick={handleScrollToGrid}
              variant="glass"
              size="xl"
            >
              Explore All 13 Services
            </CyberButton>
          </motion.div>

          {/* Enterprise Confidence Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
          >
            {ASSURANCES.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2.5 text-xs font-semibold py-2.5 px-3.5 rounded-xl border backdrop-blur-md"
                  style={{
                    color: isDark ? '#E2E8F0' : '#1E293B',
                    background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
