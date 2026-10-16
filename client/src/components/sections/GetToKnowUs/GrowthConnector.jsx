import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GrowthStage } from './GrowthStage'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthConnector
 * Features:
 * - Perfectly centered horizontal connector line spanning from Dot 1 to Dot 3.
 * - The line cleanly terminates at the third dot (no overshoot).
 * - Animated glowing signal bead traveling smoothly across the pipeline:
 *   Stage 01 (0%) -> Stage 02 (50%) -> Stage 03 (100% / End of line) -> Loops.
 * - Three enterprise-styled cards with live hover & active telemetry state.
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

  // Continuous traveling signal loop (5.5 seconds per full cycle)
  useEffect(() => {
    if (prefersReducedMotion) return

    const cycleDuration = 5500
    const stepTime = 30
    const increment = (stepTime / cycleDuration) * 100

    const timer = setInterval(() => {
      setSignalPosition((prev) => (prev >= 100 ? 0 : prev + increment))
    }, stepTime)

    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  // Determine active stage centered around 0% (01), 50% (02), 100% (03)
  const getActiveStageNumber = () => {
    if (hoveredStage) return hoveredStage
    if (signalPosition < 25) return '01'
    if (signalPosition < 75) return '02'
    return '03'
  }

  const activeStageNum = getActiveStageNumber()

  return (
    <div className="relative w-full my-6 sm:my-10 select-none [--grid-gap:24px] lg:[--grid-gap:32px]">
      
      {/* ── Desktop Animated Horizontal Connector Line (Centered, Ends at Dot 3) ── */}
      <div className="hidden md:block relative w-full mb-6">
        <div 
          className="relative h-6"
          style={{
            marginLeft: 'calc((100% - 2 * var(--grid-gap)) / 6)',
            marginRight: 'calc((100% - 2 * var(--grid-gap)) / 6)',
          }}
        >
          {/* Base Track Line (Strictly spans from Dot 1 [0%] to Dot 3 [100%]) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-white/10 rounded-full" />

          {/* Scroll Entrance Gradient Track */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#00A6FF]/60 via-[#FF6D00]/60 to-[#72D669]/60 rounded-full"
          />

          {/* Traveling Glowing Signal Bead (0% to 100%) */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center pointer-events-none z-20"
              style={{ 
                left: `${signalPosition}%`,
              }}
            >
              {/* Outer Glow Halo */}
              <div 
                className="absolute w-7 h-7 rounded-full blur-[4px] transition-colors duration-500"
                style={{
                  backgroundColor: signalPosition < 25 ? '#00A6FF' : signalPosition < 75 ? '#FF6D00' : '#72D669',
                  opacity: hoveredStage ? 0.95 : 0.8,
                }}
              />
              {/* Bright Center Particle */}
              <div className="relative z-10 w-2 h-2 rounded-full bg-white shadow-xs" />
            </motion.div>
          )}

          {/* 3 Interactive Dots at 0% (Dot 1), 50% (Dot 2), and 100% (Dot 3 / Line Endpoint) */}
          {stages.map((stage, idx) => {
            const posPercent = idx === 0 ? 0 : idx === 1 ? 50 : 100
            const isActive = activeStageNum === stage.number
            const isHovered = hoveredStage === stage.number

            return (
              <div
                key={stage.number}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
                style={{ left: `${posPercent}%` }}
                onMouseEnter={() => setHoveredStage(stage.number)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Node Disk with Expanding Activation Pulse Ring */}
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={prefersReducedMotion ? {} : {
                      scale: isActive || isHovered ? [1, 1.5, 1] : 1,
                      opacity: isActive || isHovered ? [0.65, 0, 0.65] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    className="absolute w-8 h-8 rounded-full pointer-events-none"
                    style={{ backgroundColor: `${stage.color}25` }}
                  />

                  {/* Core Disk */}
                  <div 
                    className={`relative z-10 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      isActive || isHovered ? 'scale-115' : 'scale-100'
                    } bg-[#070B14] flex items-center justify-center`}
                    style={{
                      borderColor: stage.color,
                      boxShadow: isActive || isHovered 
                        ? `0 0 16px ${stage.color}` 
                        : `0 0 6px ${stage.color}40`,
                    }}
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: isActive || isHovered ? stage.color : '#ffffff',
                        opacity: isActive || isHovered ? 1 : 0.6
                      }}
                    />
                  </div>
                </div>

                {/* Vertical Connecting Stem pointing to Card Below */}
                <div 
                  className="w-[1.5px] h-3.5 mt-0.5 transition-all duration-300"
                  style={{
                    background: `linear-gradient(to bottom, ${stage.color}, transparent)`,
                    opacity: isActive || isHovered ? 0.9 : 0.35,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 3 Connected Stage Cards Grid ─────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)] items-stretch">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.number}>
            <GrowthStage
              stage={stage}
              index={idx}
              isStageActive={activeStageNum === stage.number}
              isHovered={hoveredStage === stage.number}
              onHover={setHoveredStage}
            />
            {/* Mobile-only connector between vertically stacked cards */}
            {idx < stages.length - 1 && (
              <div className="md:hidden flex justify-center py-1 select-none">
                <div 
                  className="w-[2px] h-6 rounded-full opacity-60"
                  style={{
                    background: `linear-gradient(to bottom, ${stage.color}, ${stages[idx + 1].color})`
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  )
}

export default GrowthConnector
