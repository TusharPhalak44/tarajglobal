import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Target, Database, TrendingUp, Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * AnimatedMetricNumber
 * Smooth counter from a start number to the final target number
 */
const AnimatedMetricNumber = ({ targetValue, decimal = 0, suffix = '%' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(targetValue)
      return
    }

    if (isInView) {
      const start = targetValue > 50 ? targetValue - 20 : 0
      const controls = animate(start, targetValue, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(latest),
      })
      return () => controls.stop()
    }
  }, [isInView, targetValue, prefersReducedMotion])

  return (
    <span ref={nodeRef} className="tabular-nums">
      {displayValue.toFixed(decimal)}
      {suffix}
    </span>
  )
}

/**
 * PipelineMilestone
 * Represents an individual milestone node along the vertical strategic growth pipeline.
 */
export const PipelineMilestone = ({ 
  milestone, 
  index, 
  isActive, 
  onHover 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const iconMap = {
    '01': Target,
    '02': Database,
    '03': TrendingUp,
  }

  const Icon = iconMap[milestone.number] || Target

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.18 + 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.(milestone.number)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
      className={`group relative flex items-start gap-5 sm:gap-8 py-6 sm:py-8 transition-all duration-300 ${
        isHovered ? 'translate-x-1.5' : ''
      }`}
    >
      
      {/* ── Centerline Circular Milestone Node ─────────────────────── */}
      <div className="relative flex items-center justify-center shrink-0 mt-1">
        
        {/* Outer Pulsing Glow Rings */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.4,
            ease: 'easeInOut',
          }}
          className="absolute w-12 h-12 rounded-full pointer-events-none"
          style={{
            backgroundColor: `${milestone.color}20`,
          }}
        />

        {/* Milestone Node Disk */}
        <div 
          className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0E121E] border-2 flex items-center justify-center transition-all duration-300 shadow-xl"
          style={{
            borderColor: milestone.color,
            boxShadow: `0 0 20px ${milestone.color}40`,
          }}
        >
          <Icon size={16} strokeWidth={2.2} style={{ color: milestone.color }} />
        </div>

        {/* Small Connector Tick to Content */}
        <div 
          className="hidden sm:block absolute left-full w-4 h-px"
          style={{ backgroundColor: `${milestone.color}60` }}
        />
      </div>

      {/* ── Milestone Editorial Content Block ──────────────────────── */}
      <div className="flex-1 min-w-0">
        
        {/* Milestone Meta Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <span 
            className="text-xs font-mono font-black tracking-tight"
            style={{ color: milestone.color }}
          >
            STAGE {milestone.number}
          </span>
          <span className="text-slate-600 font-mono text-[10px]">|</span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 uppercase tracking-wider">
            {milestone.subLabel}
          </span>
        </div>

        {/* Milestone Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 group-hover:text-primary transition-colors">
          {milestone.label}
        </h3>

        {/* Milestone Description */}
        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-300 font-normal leading-relaxed max-w-lg mb-4">
          {milestone.description}
        </p>

        {/* Milestone Metric Display */}
        <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#090D17]/90 border border-slate-800">
          <div>
            <div className="text-lg sm:text-xl font-mono font-black text-white tracking-tight">
              {milestone.number === '01' && <AnimatedMetricNumber targetValue={100} decimal={0} suffix="%" />}
              {milestone.number === '02' && <AnimatedMetricNumber targetValue={99.8} decimal={1} suffix="%" />}
              {milestone.number === '03' && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#72D669]">
                  GROWTH
                </span>
              )}
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block -mt-0.5">
              {milestone.metricLabel}
            </span>
          </div>

          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: milestone.color, boxShadow: `0 0 6px ${milestone.color}` }}
          />
        </div>

      </div>

    </motion.div>
  )
}

export default PipelineMilestone
