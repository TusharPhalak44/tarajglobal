import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GrowthStage } from './GrowthStage'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * GrowthConnector
 * The Main Attraction: An elegant animated horizontal connector line
 * with a glowing signal traveling continuously between the 3 stages:
 * Stage 01 (0-38%) -> Stage 02 (38-75%) -> Stage 03 (75-100%) -> Loops smoothly.
 * 
 * Adapts to vertical on mobile. Supports both dark and light themes seamlessly.
 */
export const GrowthConnector = () => {
  const [hoveredStage, setHoveredStage] = useState(null)
  const [signalPosition, setSignalPosition] = useState(0) // 0 to 100%
  const prefersReducedMotion = useReducedMotion()

  const stages = [
    {
      number: '01',
      title: 'AUDIENCE INTEL',
      sub: 'TAM MAPPED',
      desc: 'Precision ICP identification & buying committee calibration',
      metric: '100% ICP PRECISION',
      color: '#00A6FF',
    },
    {
      number: '02',
      title: 'VERIFIED DATA',
      sub: 'DIRECT DIALS',
      desc: 'Multi-pass direct-dial verification & zero re-syndication SLA',
      metric: '99.8% ACCURACY',
      color: '#FF6D00',
    },
    {
      number: '03',
      title: 'FULL FUNNEL',
      sub: 'PIPELINE WON',
      desc: 'Closed-loop demand generation & executive appointment setting',
      metric: 'GROWTH PREDICTABLE',
      color: '#72D669',
    },
  ]

  // Continuous sophisticated traveling signal loop (6 seconds per cycle)
  useEffect(() => {
    if (prefersReducedMotion) return

    const cycleDuration = 6000 // 6 seconds per full loop
    const stepTime = 30 // update every 30ms
    const increment = (stepTime / cycleDuration) * 100

    const timer = setInterval(() => {
      setSignalPosition((prev) => (prev >= 100 ? 0 : prev + increment))
    }, stepTime)

    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  // Determine active stage based on user hover or moving signal position
  const getActiveStageNumber = () => {
    if (hoveredStage) return hoveredStage
    if (signalPosition < 38) return '01'
    if (signalPosition < 75) return '02'
    return '03'
  }

  const activeStageNum = getActiveStageNumber()

  return (
    <div className="relative w-full my-6 sm:my-8 select-none">
      
      {/* ── Desktop Animated Horizontal Connector Line ───────────────── */}
      <div className="hidden md:block absolute top-[7px] left-2 right-2 h-[2px] pointer-events-none z-0">
        
        {/* Base Track Line */}
        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300" />

        {/* Scroll Entrance Line Drawing */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-[#00A6FF]/40 via-[#FF6D00]/40 to-[#72D669]/40"
        />

        {/* Traveling Glowing Signal Bead */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center pointer-events-none transition-opacity duration-200"
            style={{ 
              left: `${signalPosition}%`,
              opacity: hoveredStage ? 1 : 0.95
            }}
          >
            {/* Outer Glow Halo */}
            <div 
              className="absolute w-6 h-6 rounded-full blur-[3px] transition-colors duration-500"
              style={{
                backgroundColor: signalPosition < 38 ? '#00A6FF' : signalPosition < 75 ? '#FF6D00' : '#72D669',
                opacity: hoveredStage ? 0.9 : 0.75,
              }}
            />
            {/* Bright Center Particle */}
            <div className="relative z-10 w-2 h-2 rounded-full bg-white shadow-xs" />
          </motion.div>
        )}
      </div>

      {/* ── Mobile Animated Vertical Connector Line ─────────────────── */}
      <div className="md:hidden absolute top-2 bottom-6 left-[7px] w-[2px] pointer-events-none z-0">
        
        {/* Base Vertical Line */}
        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300" />

        {/* Traveling Vertical Signal Bead on Mobile */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full flex items-center justify-center pointer-events-none"
            style={{ top: `${signalPosition}%` }}
          >
            <div 
              className="absolute w-5 h-5 rounded-full blur-[2px] transition-colors duration-500"
              style={{
                backgroundColor: signalPosition < 38 ? '#00A6FF' : signalPosition < 75 ? '#FF6D00' : '#72D669',
                opacity: 0.8,
              }}
            />
            <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-white" />
          </motion.div>
        )}
      </div>

      {/* ── 3 Connected Stage Blocks ─────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 pl-6 md:pl-0">
        {stages.map((stage, idx) => (
          <GrowthStage
            key={stage.number}
            stage={stage}
            index={idx}
            isStageActive={activeStageNum === stage.number}
            isHovered={hoveredStage === stage.number}
            onHover={setHoveredStage}
          />
        ))}
      </div>

    </div>
  )
}

export default GrowthConnector
