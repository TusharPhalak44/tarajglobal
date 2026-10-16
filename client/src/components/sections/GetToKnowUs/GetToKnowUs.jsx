import React from 'react'
import { motion } from 'framer-motion'
import { GrowthConnector } from './GrowthConnector'
import { useReducedMotion } from '@hooks/useReducedMotion'
import AnimatedGrid from '@components/animations/AnimatedGrid'

/**
 * Enterprise Growth Architecture Section (GetToKnowUs)
 * “DYNAMIC B2B GROWTH FLOW”
 *
 * Flow: AUDIENCE INTEL → VERIFIED DATA → FULL FUNNEL
 */
export const GetToKnowUs = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="enterprise-architecture"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#070B14] text-white border-y border-white/[0.08] select-none"
      aria-label="Enterprise Growth Architecture — Dynamic B2B Growth Flow"
    >
      {/* ── Background: Ambient Radial Glow & Subtle Technical Grid ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Ambient Radial Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] rounded-full blur-[140px] bg-[#00A6FF]/[0.06] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] rounded-full blur-[130px] bg-[#FF6D00]/[0.04] pointer-events-none" />
      </div>

      {/* Subtle Technical Coordinate Grid Background */}
      <AnimatedGrid size={64} opacity={0.035} />

      <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between">

        {/* ── 1. Compact Centered Top Introduction ───────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">

          {/* Pre-header Eyebrow (Clean, Editorial, Global Font - Same as Hero) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center justify-center mb-3.5"
          >
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              ENGINEERED FOR PRECISION
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-2xl sm:text-3xl lg:text-[44px] font-black tracking-normal leading-[1.25] mb-5 text-white uppercase"
          >
            <span className="inline-block [word-spacing:0.1em] sm:[word-spacing:0.1em]">
              POWERING SMARTER <span className="text-[#00A6FF] inline-block ml-1">&</span>
            </span>
            <span className="block text-[#00A6FF] mt-2 sm:mt-2.5 [word-spacing:0.1em] sm:[word-spacing:0.1em]">
              CRM Pipeline Delivery
            </span>
          </motion.h2>

          {/* Centered Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Unlike traditional lead agencies relying on third-party data aggregators, TaRaj Global Solutions operates on its own first-party data infrastructure solution. Following audience research, every prospect record passes through our proprietary verification engine-validating direct-dial phones and active email deliverability. The entire lifecycle, from target identification to final client handover, is managed inside a single, unified CRM platform for total pipeline transparency.
          </motion.p>

        </div>

        {/* ── 2. Main Visual: Dynamic B2B Growth Flow (Three Connected Stages) ── */}
        <GrowthConnector />

      </div>

    </section>
  )
}

export default GetToKnowUs
