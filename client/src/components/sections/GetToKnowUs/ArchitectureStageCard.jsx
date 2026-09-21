import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  Activity, 
  Users, 
  Radio, 
  PhoneCall, 
  Sparkles,
  Zap,
  Layers,
  Database
} from 'lucide-react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * AnimatedCounter
 * Smoothly animates numbers from a start value to target value upon entering viewport
 */
const AnimatedCounter = ({ targetValue, decimal = 0, suffix = '%' }) => {
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
      const start = targetValue > 50 ? targetValue - 25 : 0
      const controls = animate(start, targetValue, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(latest)
        }
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
 * Stage 01 Internal Micro-Visualization:
 * Multiple audience nodes converging onto the Ideal Customer Profile target
 */
const Stage01Visualization = ({ isHovered }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative w-full h-24 rounded-xl bg-slate-950/80 border border-slate-800/90 p-2 overflow-hidden flex items-center justify-between">
      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A6FF12_1px,transparent_1px),linear-gradient(to_bottom,#00A6FF12_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

      {/* Target Radar with Converging Nodes */}
      <div className="relative w-18 h-18 rounded-full border border-primary/40 flex items-center justify-center shrink-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border border-dashed border-[#00E5FF]/40"
        />
        
        {/* Converging Audience Nodes */}
        {[
          { x: -18, y: -14, delay: 0 },
          { x: 16, y: -16, delay: 0.3 },
          { x: -14, y: 16, delay: 0.6 },
          { x: 18, y: 14, delay: 0.9 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            animate={prefersReducedMotion ? {} : {
              x: [pt.x, 0, pt.x],
              y: [pt.y, 0, pt.y],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: pt.delay,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
          />
        ))}

        {/* Bullseye Core */}
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#00A6FF] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </div>

      {/* Telemetry Target Info */}
      <div className="flex-1 pl-3 space-y-1 text-[9px] font-mono">
        <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-900/90 border border-primary/20 text-slate-300">
          <span className="flex items-center gap-1 text-[#00E5FF]">
            <Target size={10} />
            <span>TAM Convergence</span>
          </span>
          <span className="text-emerald-400 font-bold">LOCKED</span>
        </div>
        <div className="flex items-center justify-between px-2 py-1 rounded bg-slate-900/90 border border-primary/20 text-slate-300">
          <span className="flex items-center gap-1 text-primary">
            <Users size={10} />
            <span>Buying Committee</span>
          </span>
          <span className="text-white font-bold">C-Suite / VP</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Stage 02 Internal Micro-Visualization:
 * Multi-Pass Verification Stream: Raw Data → Verification → Validated Record
 */
const Stage02Visualization = ({ isHovered }) => {
  return (
    <div className="relative w-full h-24 rounded-xl bg-slate-950/80 border border-slate-800/90 p-2 overflow-hidden flex items-center justify-between">
      {/* Blueprint Stream Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10B98112_1px,transparent_1px),linear-gradient(to_bottom,#10B98112_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

      {/* 3 Sequential Data Verification Steps */}
      <div className="w-full grid grid-cols-3 gap-1.5 relative z-10">
        {[
          { step: '01', title: 'Raw Data', desc: 'Direct-Dial', ok: true },
          { step: '02', title: 'Multi-Pass', desc: 'Validation', ok: true },
          { step: '03', title: 'Validated', desc: '0% Re-Sync', ok: true },
        ].map((gate, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-900/95 border border-emerald-500/25 text-center">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center mb-1 text-emerald-400 shadow-[0_0_6px_#10B981]">
              <Check size={9} strokeWidth={3} />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-200">
              {gate.title}
            </span>
            <span className="text-[8px] font-mono text-slate-400 truncate w-full">
              {gate.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Stage 03 Internal Micro-Visualization:
 * Closed-Loop Pipeline Funnel moving toward Sustainable Growth
 */
const Stage03Visualization = ({ isHovered }) => {
  return (
    <div className="relative w-full h-24 rounded-xl bg-slate-950/80 border border-slate-800/90 p-2 overflow-hidden flex items-center justify-between">
      {/* Stream Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF6D0012_1px,transparent_1px),linear-gradient(to_bottom,#FF6D0012_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

      {/* Conversion Funnel Progress Velocity */}
      <div className="w-full flex items-center justify-between gap-2 px-1 relative z-10 text-[9px] font-mono">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-cta">Outreach Sprint</span>
            <span className="text-white font-bold">Multi-Touch</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#FFA600] to-[#FF6D00] rounded-full"
              animate={{ width: isHovered ? '100%' : '88%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between text-slate-400 pt-0.5">
            <span>Executive SQLs</span>
            <span className="text-emerald-400 font-bold">Closed-Loop</span>
          </div>
        </div>

        {/* Growth Activation Emblem */}
        <div className="w-12 h-14 rounded-lg bg-cta/15 border border-cta/40 flex flex-col items-center justify-center shrink-0 text-cta shadow-[0_0_14px_rgba(255,109,0,0.35)]">
          <TrendingUp size={16} />
          <span className="text-[8px] font-mono font-black mt-1 text-white">
            GROWTH
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * ArchitectureStageCard
 * Architectural Module representing one part of the growth machine:
 * Stage 01, Stage 02, or Stage 03.
 */
export const ArchitectureStageCard = ({ 
  stage, 
  index, 
  isActive, 
  onHover 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const colorMap = {
    '01': {
      border: 'hover:border-[#00A6FF]/60',
      activeBorder: 'border-[#00A6FF]/85',
      glow: 'hover:shadow-[0_10px_35px_rgba(0,166,255,0.18)]',
      activeGlow: 'shadow-[0_10px_35px_rgba(0,166,255,0.25)]',
      tagBg: 'bg-primary/15 text-[#00E5FF] border-primary/30',
      accentColor: '#00A6FF',
    },
    '02': {
      border: 'hover:border-[#10B981]/60',
      activeBorder: 'border-[#10B981]/85',
      glow: 'hover:shadow-[0_10px_35px_rgba(16,185,129,0.18)]',
      activeGlow: 'shadow-[0_10px_35px_rgba(16,185,129,0.25)]',
      tagBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      accentColor: '#10B981',
    },
    '03': {
      border: 'hover:border-[#FF6D00]/60',
      activeBorder: 'border-[#FF6D00]/85',
      glow: 'hover:shadow-[0_10px_35px_rgba(255,109,0,0.18)]',
      activeGlow: 'shadow-[0_10px_35px_rgba(255,109,0,0.25)]',
      tagBg: 'bg-cta/15 text-[#FF6D00] border-cta/30',
      accentColor: '#FF6D00',
    },
  }

  const currentTheme = colorMap[stage.num] || colorMap['01']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15 + 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover?.(stage.num)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover?.(null)
      }}
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
      className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#090D17]/95 border transition-all duration-300 backdrop-blur-xl ${
        isActive 
          ? `${currentTheme.activeBorder} ${currentTheme.activeGlow}` 
          : `border-slate-800/90 dark:border-white/10 ${currentTheme.border} ${currentTheme.glow}`
      }`}
    >
      {/* ── Technical Corner Bracket Accents ────────────────────────── */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-sm pointer-events-none group-hover:border-primary/60 transition-colors" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 rounded-tr-sm pointer-events-none group-hover:border-primary/60 transition-colors" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 rounded-bl-sm pointer-events-none group-hover:border-primary/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 rounded-br-sm pointer-events-none group-hover:border-primary/60 transition-colors" />

      {/* Top Accent Glowing Line */}
      <div 
        className={`absolute top-0 left-6 right-6 h-px transition-opacity duration-300 ${
          isActive || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(90deg, transparent, ${currentTheme.accentColor}, transparent)`,
        }}
      />

      {/* ── CARD HEADER: STAGE NUMBER + CATEGORY + PILL TAG ─────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              MODULE {stage.num}
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${currentTheme.tagBg}`}>
              {stage.pill}
            </span>
          </div>

          <div 
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentTheme.accentColor,
              boxShadow: `0 0 8px ${currentTheme.accentColor}`,
            }}
          />
        </div>

        {/* Stage Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-200">
          {stage.title}
        </h3>

        {/* Stage Editorial Description */}
        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-300 leading-relaxed min-h-[44px]">
          {stage.subtitle}
        </p>
      </div>

      {/* ── CARD BODY: INTERNAL INTERACTIVE MICRO-VISUALIZATION ──────── */}
      <div className="my-5">
        {stage.num === '01' && <Stage01Visualization isHovered={isHovered || isActive} />}
        {stage.num === '02' && <Stage02Visualization isHovered={isHovered || isActive} />}
        {stage.num === '03' && <Stage03Visualization isHovered={isHovered || isActive} />}
      </div>

      {/* ── CARD FOOTER: DOMINANT METRIC & TELEMETRY STATUS ─────────── */}
      <div className="pt-4 border-t border-slate-800/90 dark:border-white/10 flex items-end justify-between">
        <div>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-black text-white tracking-tight block group-hover:scale-105 transition-transform origin-left">
            {stage.num === '01' && <AnimatedCounter targetValue={100} decimal={0} suffix="%" />}
            {stage.num === '02' && <AnimatedCounter targetValue={99.8} decimal={1} suffix="%" />}
            {stage.num === '03' && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA600] to-[#FF6D00]">
                GROWTH
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mt-0.5">
            {stage.metricLabel}
          </span>
        </div>

        {/* Interactive Action Icon Indicator */}
        <div 
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border"
          style={{
            backgroundColor: isHovered || isActive ? `${currentTheme.accentColor}25` : 'rgba(255,255,255,0.03)',
            borderColor: isHovered || isActive ? currentTheme.accentColor : 'rgba(255,255,255,0.1)',
            color: isHovered || isActive ? '#ffffff' : '#94a3b8',
          }}
        >
          <ArrowRight size={15} className={`transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
        </div>
      </div>

    </motion.div>
  )
}

export default ArchitectureStageCard
