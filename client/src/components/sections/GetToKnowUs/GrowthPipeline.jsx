import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PipelineMilestone } from './PipelineMilestone'
import { GrowthSignalIndex } from './GrowthSignalIndex'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthPipeline
 * Main Visual Component: Vertical Strategic Growth Pipeline.
 * Connects the 3 milestones with an animated vertical data conduit.
 */
export const GrowthPipeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(null)
  const [pulsePos, setPulsePos] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Slow continuous pulse travelling down vertical line
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPulsePos((prev) => (prev + 1) % 100)
    }, 45)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const milestones = [
    {
      number: '01',
      label: 'AUDIENCE INTEL',
      subLabel: 'TAM MAPPED',
      description: 'Precision ICP identification & buying committee calibration across your total addressable market.',
      metricLabel: '100% ICP PRECISION',
      color: '#00A6FF',
    },
    {
      number: '02',
      label: 'VERIFIED DATA',
      subLabel: 'DIRECT DIALS',
      description: 'Multi-pass direct-dial verification & zero re-syndication SLA for guaranteed reach and zero bounce.',
      metricLabel: '99.8% ACCURACY',
      color: '#FF6D00',
    },
    {
      number: '03',
      label: 'FULL FUNNEL',
      subLabel: 'PIPELINE WON',
      description: 'Closed-loop demand generation & executive appointment setting driving sales-ready revenue opportunities.',
      metricLabel: 'GROWTH PREDICTABLE',
      color: '#72D669',
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start select-none">
      
      {/* ── Left/Main Area: Vertical Growth Pipeline (Span 7) ──────── */}
      <div className="lg:col-span-7 relative">
        
        {/* Animated Vertical Centerline Conduit Line */}
        <div className="absolute left-5 sm:left-[21px] top-6 bottom-10 w-px pointer-events-none z-0">
          
          {/* Base Vertical Gradient Track */}
          <div className="w-full h-full bg-gradient-to-b from-primary/60 via-[#FF6D00]/60 to-[#72D669]/80" />

          {/* Traveling Animated Light Packet */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute w-1 -left-[1.5px] h-12 bg-white rounded-full opacity-90 shadow-[0_0_10px_#ffffff]"
              style={{ top: `${pulsePos}%` }}
            />
          )}
        </div>

        {/* 3 Pipeline Milestones */}
        <div className="relative z-10 flex flex-col divide-y divide-slate-800/60">
          {milestones.map((milestone, idx) => (
            <PipelineMilestone
              key={milestone.number}
              milestone={milestone}
              index={idx}
              isActive={activeMilestone === milestone.number}
              onHover={setActiveMilestone}
            />
          ))}
        </div>

      </div>

      {/* ── Right Area: Floating Analytical Signal Panel (Span 5) ───── */}
      <div className="lg:col-span-5 sticky top-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <GrowthSignalIndex />
        </motion.div>
      </div>

    </div>
  )
}

export default GrowthPipeline
