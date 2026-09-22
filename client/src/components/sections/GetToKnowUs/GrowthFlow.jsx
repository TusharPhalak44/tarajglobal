import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GrowthStage } from './GrowthStage'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthFlow
 * “THE GROWTH FLOW”
 * Horizontal growth flow diagram on desktop / compact vertical flow on mobile.
 * Connects the 3 stages: AUDIENCE INTEL → VERIFIED DATA → FULL FUNNEL
 */
export const GrowthFlow = () => {
  const [hoveredStage, setHoveredStage] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  const stages = [
    {
      number: '01',
      title: 'AUDIENCE INTEL',
      sub: 'TAM MAPPED',
      desc: 'Precision ICP identification & buying committee calibration across your total addressable market.',
      metric: '100%',
      metricLabel: 'ICP PRECISION',
      color: '#00A6FF',
    },
    {
      number: '02',
      title: 'VERIFIED DATA',
      sub: 'DIRECT DIALS',
      desc: 'Multi-pass direct-dial verification & zero re-syndication SLA for guaranteed reach.',
      metric: '99.8%',
      metricLabel: 'ACCURACY',
      color: '#FF6D00',
    },
    {
      number: '03',
      title: 'FULL FUNNEL',
      sub: 'PIPELINE WON',
      desc: 'Closed-loop demand generation & executive appointment setting driving sales-ready SQLs.',
      metric: 'GROWTH',
      metricLabel: 'PREDICTABLE',
      color: '#72D669',
    },
  ]

  return (
    <div className="relative w-full my-6 sm:my-8 select-none">
      
      {/* ── Desktop Animated Horizontal Connecting Line ──────────────── */}
      <div className="hidden md:block absolute top-[9px] left-3 right-3 h-px pointer-events-none z-0">
        {/* Base Track */}
        <div className="w-full h-full bg-slate-800/80" />
        
        {/* Animated Drawing Gradient Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-primary via-[#FF6D00] to-[#72D669]"
        />
      </div>

      {/* ── Mobile Animated Vertical Connecting Line ────────────────── */}
      <div className="md:hidden absolute top-2 bottom-6 left-[7px] w-px pointer-events-none z-0">
        <div className="w-full h-full bg-slate-800/80" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-[#FF6D00] to-[#72D669]"
        />
      </div>

      {/* ── 3 Connected Stages Grid ──────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 pl-6 md:pl-0">
        {stages.map((stage, idx) => (
          <GrowthStage
            key={stage.number}
            stage={stage}
            index={idx}
            isHovered={hoveredStage === stage.number}
            onHover={setHoveredStage}
          />
        ))}
      </div>

    </div>
  )
}

export default GrowthFlow
