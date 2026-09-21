import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import TarajButton from './TarajButton'

export default function WhyTarajMatrix() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Why TaRaj Global — Core Philosophy & Architecture"
    >
      {/* Background Subtle Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-35"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(0, 166, 255, 0.15) 0%, rgba(255, 109, 0, 0.1) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(0, 102, 204, 0.1) 0%, rgba(255, 107, 0, 0.06) 60%, transparent 80%)',
        }}
      />

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>THE STRATEGIC ADVANTAGE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Why{' '}
            <span className="font-light italic">TaRaj Global.</span>
          </motion.h2>
        </div>

        {/* ══ CENTRAL CONVERGENCE STATEMENT & FLOATING PILLARS ══ */}
        <div className="relative py-12 lg:py-20 max-w-5xl mx-auto flex flex-col items-center justify-center">

          {/* Top Axis: DATA */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center mb-8"
          >
            <div
              className="px-6 py-2.5 rounded-full border text-xs sm:text-sm font-mono font-bold tracking-widest backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(0, 102, 204, 0.25)',
                color: isDark ? '#38BDF8' : '#0066CC',
              }}
            >
              DATA INTEGRITY · 99.8% ACCURACY SLA
            </div>
            <div className="w-[1px] h-8 sm:h-12" style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }} />
          </motion.div>

          {/* Central Horizontal Axis: QUALITY — TARAJ GLOBAL — GROWTH */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 my-4 text-center">

            {/* Left Node: QUALITY */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="md:w-1/3 flex flex-col md:items-end items-center"
            >
              <div
                className="px-6 py-3 rounded-2xl border backdrop-blur-md max-w-xs text-center md:text-right"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase block mb-1 text-emerald-400">
                  PILLAR 01
                </span>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                  QUALITY
                </div>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                  BANT commercial qualification gating ensures zero wasted sales rep time.
                </p>
              </div>
            </motion.div>

            {/* Center Core: TARAJ GLOBAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="md:w-1/3 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl relative shadow-2xl"
              style={{
                backgroundColor: isDark ? 'rgba(12, 16, 26, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(0, 102, 204, 0.25)',
                boxShadow: isDark ? '0 0 50px rgba(0, 166, 255, 0.15)' : '0 10px 40px rgba(0, 102, 204, 0.08)',
              }}
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase block mb-2" style={{ color: isDark ? '#A1A1AA' : '#52525B' }}>
                THE REVENUE CORE
              </span>
              <div
                className="text-3xl sm:text-4xl font-black tracking-tight"
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 50%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0B0F19 0%, #0066CC 50%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                TARAJ GLOBAL
              </div>
              <span className="text-xs font-mono font-medium mt-2" style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>
                Synchronized Strategy & Execution
              </span>
            </motion.div>

            {/* Right Node: GROWTH */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="md:w-1/3 flex flex-col md:items-start items-center"
            >
              <div
                className="px-6 py-3 rounded-2xl border backdrop-blur-md max-w-xs text-center md:text-left"
                style={{
                  backgroundColor: isDark ? 'rgba(12, 16, 26, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              >
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase block mb-1 text-orange-400">
                  PILLAR 02
                </span>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>
                  GROWTH
                </div>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#94A3B8' : '#6B7280' }}>
                  Predictable, scalable outbound and inbound pipeline velocity tailored to your quota.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Bottom Axis: INTELLIGENCE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center mt-8"
          >
            <div className="w-[1px] h-8 sm:h-12" style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }} />
            <div
              className="px-6 py-2.5 rounded-full border text-xs sm:text-sm font-mono font-bold tracking-widest backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                borderColor: isDark ? 'rgba(255, 109, 0, 0.3)' : 'rgba(255, 107, 0, 0.25)',
                color: isDark ? '#FFA600' : '#EA580C',
              }}
            >
              COMMERCIAL INTELLIGENCE · REAL-TIME INTENT SIGNALS
            </div>
          </motion.div>

        </div>

        {/* Action Button */}
        <div className="text-center pt-16">
          <TarajButton to="/contact" variant="secondary" size="md">
            Partner With TaRaj Global
          </TarajButton>
        </div>

      </div>
    </section>
  )
}
