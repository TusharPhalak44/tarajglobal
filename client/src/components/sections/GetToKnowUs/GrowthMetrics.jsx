import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Activity, ShieldCheck, TrendingUp, Target, Database, CheckCircle2, Zap, Lock } from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

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
 * GrowthMetrics
 * Right-Side System Telemetry & Statistics Panel in the Growth Intelligence Console.
 */
export const GrowthMetrics = ({ activeStage }) => {
  return (
    <div className="flex flex-col justify-between gap-3.5 w-full h-full">
      
      {/* Subhead */}
      <div className="flex items-center justify-between px-1 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        <span>LIVE TELEMETRY</span>
        <span className="text-emerald-400 flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE
        </span>
      </div>

      {/* Metric 01: ICP Precision */}
      <div className={`p-4 rounded-2xl border transition-all duration-300 ${
        activeStage === '01' 
          ? 'bg-[#0D121F] border-[#00A6FF] shadow-[0_0_20px_rgba(0,166,255,0.18)]' 
          : 'bg-[#090D17]/80 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
          <span className="text-slate-400">ICP PRECISION</span>
          <span className="text-[#00E5FF] font-bold">TAM MAPPED</span>
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
          <AnimatedMetricNumber targetValue={100} decimal={0} suffix="%" />
        </div>
        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
          Buying Committee Calibrated
        </span>
      </div>

      {/* Metric 02: Data Accuracy */}
      <div className={`p-4 rounded-2xl border transition-all duration-300 ${
        activeStage === '02' 
          ? 'bg-[#0D121F] border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.18)]' 
          : 'bg-[#090D17]/80 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
          <span className="text-slate-400">DATA ACCURACY</span>
          <span className="text-emerald-400 font-bold">DIRECT DIALS</span>
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
          <AnimatedMetricNumber targetValue={99.8} decimal={1} suffix="%" />
        </div>
        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
          Multi-Pass Direct Dial Verification
        </span>
      </div>

      {/* Metric 03: Pipeline Outcome */}
      <div className={`p-4 rounded-2xl border transition-all duration-300 ${
        activeStage === '03' 
          ? 'bg-[#0D121F] border-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.18)]' 
          : 'bg-[#090D17]/80 border-slate-800/80'
      }`}>
        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
          <span className="text-slate-400">PIPELINE OUTCOME</span>
          <span className="text-cta font-bold">WON</span>
        </div>
        <div className="text-2xl sm:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF6D00] tracking-tight">
          GROWTH
        </div>
        <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
          Predictable Demand &amp; Appointments
        </span>
      </div>

      {/* Live Pipeline Health Bar */}
      <div className="p-3.5 rounded-xl bg-[#090D17]/90 border border-slate-800/80">
        <div className="flex items-center justify-between text-[9px] font-mono mb-1.5">
          <span className="text-slate-300 font-bold">PIPELINE HEALTH INDEX</span>
          <span className="text-emerald-400 font-bold">88% OPTIMAL</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '88%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-primary via-[#00E5FF] to-emerald-400 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 mt-1.5">
          <span>ENCRYPTION: 256-BIT</span>
          <span>SLA: ZERO-BOUNCE</span>
        </div>
      </div>

    </div>
  )
}

export default GrowthMetrics
