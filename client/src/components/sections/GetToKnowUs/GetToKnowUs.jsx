import React from 'react'
import { motion } from 'framer-motion'
import { GrowthConnector } from './GrowthConnector'
import { TrustIndicator } from './TrustIndicator'
import { useReducedMotion } from '@hooks/useReducedMotion'

import { SectionLaserDivider } from '@components/animations'

/**
 * Enterprise Growth Architecture Section (GetToKnowUs)
 * “DYNAMIC B2B GROWTH FLOW”
 * 
 * Simple + Professional + Modern + Compact + Premium
 * Medium height: ~500–650px on desktop.
 * Flow: AUDIENCE INTEL → VERIFIED DATA → FULL FUNNEL
 * Full Dark & Light Theme Support.
 */
export const GetToKnowUs = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="enterprise-architecture"
      className="relative py-14 sm:py-16 lg:py-20 overflow-hidden bg-[#FAFAFA] dark:bg-[#0E0E0E] text-slate-900 dark:text-white transition-colors duration-300 select-none"
      aria-label="Enterprise Growth Architecture — Dynamic B2B Growth Flow"
    >
      {/* ── Background: Subtle Moving Architectural Grid & Radial Glow ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle Theme-Aware Coordinate Grid with Slow Movement */}
        <motion.div 
          animate={prefersReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Very Subtle Radial Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] bg-primary/5 dark:bg-primary/8 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between">
        
        {/* ── 1. Compact Centered Top Introduction ───────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          
          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/60 mb-3 transition-colors duration-300 shadow-xs"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary dark:text-[#00E5FF] uppercase">
              ENTERPRISE GROWTH ARCHITECTURE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-3 text-slate-900 dark:text-white transition-colors duration-300"
          >
            POWERING SMARTER{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00A6FF] to-[#00E5FF]">
              B2B GROWTH
            </span>
          </motion.h2>

          {/* Centered Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto transition-colors duration-300"
          >
            Taraj Global is a B2B demand generation and technology marketing partner helping organizations connect with the right companies, decision-makers, and buying audiences. We combine audience intelligence, verified B2B data, targeted outreach, and full-funnel marketing strategies to create qualified opportunities and support sustainable pipeline growth.
          </motion.p>

        </div>

        {/* ── 2. Main Visual: Dynamic B2B Growth Flow (Three Connected Stages) ── */}
        <GrowthConnector />

        {/* ── 3. Compact Bottom Trust Indicators ───────────────────────── */}
        <TrustIndicator />

      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="amber" position="bottom" />
    </section>
  )
}

export default GetToKnowUs
