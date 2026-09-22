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
  Layers, 
  ChevronRight,
  Database,
  CalendarCheck,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * AnimatedCounter
 * Smooth counter from lower value to target value upon entering viewport
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
 * Station 01 Micro-Visualization:
 * Broad Market Dots Converging & Filtering into Ideal Customer Profile Target
 */
const Station01Visual = ({ isHovered }) => {
  const prefersReducedMotion = useReducedMotion()

  // 16 Market dots converging into target
  const marketDots = [
    { x: -32, y: -24, isICP: false, delay: 0 },
    { x: -22, y: -30, isICP: true, delay: 0.2 },
    { x: 28, y: -26, isICP: false, delay: 0.1 },
    { x: 34, y: -12, isICP: true, delay: 0.3 },
    { x: -36, y: 14, isICP: false, delay: 0.4 },
    { x: -20, y: 28, isICP: true, delay: 0.5 },
    { x: 22, y: 26, isICP: false, delay: 0.2 },
    { x: 32, y: 20, isICP: true, delay: 0.6 },
    { x: -14, y: -16, isICP: true, delay: 0.7 },
    { x: 16, y: -14, isICP: true, delay: 0.8 },
    { x: -12, y: 14, isICP: true, delay: 0.9 },
    { x: 14, y: 12, isICP: true, delay: 1.0 },
  ]

  return (
    <div className="relative w-full h-32 rounded-xl bg-[#080C16]/90 border border-slate-800/80 p-3 overflow-hidden flex items-center justify-between">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A6FF10_1px,transparent_1px),linear-gradient(to_bottom,#00A6FF10_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />

      {/* Target Radar with Converging Market Dots */}
      <div className="relative w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center shrink-0">
        {/* Outer Rotating Radar Line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border border-dashed border-[#00E5FF]/40"
        />

        {/* Converging Market Dots */}
        {marketDots.map((dot, i) => (
          <motion.div
            key={i}
            animate={prefersReducedMotion ? {} : {
              x: dot.isICP ? [dot.x, dot.x * 0.3, dot.x] : [dot.x, dot.x * 0.8, dot.x],
              y: dot.isICP ? [dot.y, dot.y * 0.3, dot.y] : [dot.y, dot.y * 0.8, dot.y],
              opacity: dot.isICP ? [0.4, 1, 0.4] : [0.2, 0.4, 0.2],
              scale: dot.isICP ? [1, 1.3, 1] : [0.8, 0.8, 0.8],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full"
            style={{
              width: dot.isICP ? '5px' : '3px',
              height: dot.isICP ? '5px' : '3px',
              backgroundColor: dot.isICP ? '#00E5FF' : '#475569',
              boxShadow: dot.isICP ? '0 0 8px #00E5FF' : 'none',
            }}
          />
        ))}

        {/* Center Target Lock */}
        <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_#00A6FF] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* Target Conversion Hierarchy */}
      <div className="flex-1 pl-4 space-y-1.5 text-[9px] font-mono">
        <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-900/90 border border-primary/20 text-slate-300">
          <span className="text-[#00E5FF] flex items-center gap-1">
            <Layers size={10} />
            <span>Broad Market</span>
          </span>
          <span className="text-slate-400">TAM Mapped</span>
        </div>

        <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-900/90 border border-primary/30 text-white">
          <span className="text-primary flex items-center gap-1 font-bold">
            <Target size={10} />
            <span>Ideal ICP Target</span>
          </span>
          <span className="text-emerald-400 font-bold">100% LOCKED</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Station 02 Micro-Visualization:
 * Sophisticated Data Verification Animation:
 * RAW DATA → VERIFY → VALIDATE → TRUSTED DATA
 */
const Station02Visual = ({ isHovered }) => {
  return (
    <div className="relative w-full h-32 rounded-xl bg-[#080C16]/90 border border-slate-800/80 p-3 overflow-hidden flex flex-col justify-between">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10B98110_1px,transparent_1px),linear-gradient(to_bottom,#10B98110_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <Database size={10} />
          <span>MULTI-PASS PIPELINE</span>
        </span>
        <span className="text-slate-400">ZERO RE-SYNC SLA</span>
      </div>

      {/* 4-Stage Scanning & Validation Stream */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 my-1">
        {[
          { label: 'RAW DATA', sub: 'Inflow', color: '#64748b' },
          { label: 'VERIFY', sub: 'Direct-Dial', color: '#00A6FF' },
          { label: 'VALIDATE', sub: 'Deliverable', color: '#10B981' },
          { label: 'TRUSTED', sub: '99.8% Sync', color: '#72D669' },
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-1 rounded-lg bg-slate-900/90 border border-emerald-500/20 text-center">
            <div 
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center mb-1 text-white shadow-xs"
              style={{
                backgroundColor: `${step.color}25`,
                border: `1px solid ${step.color}`,
              }}
            >
              <Check size={8} strokeWidth={3} />
            </div>
            <span className="text-[8.5px] font-mono font-bold text-slate-200">
              {step.label}
            </span>
            <span className="text-[7.5px] font-mono text-slate-400 truncate w-full">
              {step.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
        <span>ACCURACY GUARANTEE:</span>
        <span className="font-bold">99.8% VALIDATED SLA</span>
      </div>
    </div>
  )
}

/**
 * Station 03 Micro-Visualization:
 * Upward-Moving Pipeline Visualization ending in Predictable GROWTH
 */
const Station03Visual = ({ isHovered }) => {
  return (
    <div className="relative w-full h-32 rounded-xl bg-[#080C16]/90 border border-slate-800/80 p-3 overflow-hidden flex flex-col justify-between">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FF6D0010_1px,transparent_1px),linear-gradient(to_bottom,#FF6D0010_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-slate-800 pb-1.5">
        <span className="text-cta font-bold flex items-center gap-1">
          <Zap size={10} />
          <span>PIPELINE VELOCITY</span>
        </span>
        <span className="text-amber-400">CLOSED-LOOP</span>
      </div>

      {/* Upward Graduating Funnel Stages */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-1">
        {/* Stage 1: Outreach */}
        <div className="flex-1 text-center p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-[8px] font-mono text-slate-400 block">01 REACH</span>
          <span className="text-[9px] font-mono font-bold text-white block mt-0.5">Multi-Touch</span>
        </div>

        <ChevronRight size={12} className="text-slate-600 shrink-0" />

        {/* Stage 2: Appointments */}
        <div className="flex-1 text-center p-1.5 rounded-lg bg-slate-900/80 border border-cta/30">
          <span className="text-[8px] font-mono text-cta block">02 SQL APPT</span>
          <span className="text-[9px] font-mono font-bold text-white block mt-0.5">Confirmed</span>
        </div>

        <ChevronRight size={12} className="text-slate-600 shrink-0" />

        {/* Stage 3: Revenue Growth */}
        <div className="flex-1 text-center p-1.5 rounded-lg bg-cta/20 border border-cta/60 shadow-[0_0_12px_rgba(255,109,0,0.3)]">
          <span className="text-[8px] font-mono text-amber-300 font-bold block">03 GROWTH</span>
          <span className="text-[9px] font-mono font-black text-white block mt-0.5">PREDICTABLE</span>
        </div>
      </div>

      {/* Bottom Conversion Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-amber-400 bg-cta/10 px-2 py-0.5 rounded">
        <span>DEMAND CONVERSION:</span>
        <span className="font-bold">SUSTAINABLE REVENUE</span>
      </div>
    </div>
  )
}

/**
 * GrowthJourney
 * The Continuous Horizontal B2B Growth Journey System
 */
export const GrowthJourney = () => {
  const [activeStation, setActiveStation] = useState(null)
  const [pulsePos, setPulsePos] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Traveling Light Pulse along Data Path
  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPulsePos((prev) => (prev + 1) % 100)
    }, 40)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const journeySteps = [
    { label: 'DISCOVER', color: '#00A6FF' },
    { label: 'IDENTIFY', color: '#00E5FF' },
    { label: 'VERIFY', color: '#10B981' },
    { label: 'ACTIVATE', color: '#FFA600' },
    { label: 'CONVERT', color: '#FF6D00' },
    { label: 'GROW', color: '#72D669' },
  ]

  const stations = [
    {
      id: '01',
      number: '01',
      label: 'AUDIENCE INTEL',
      statement: 'TAM MAPPED',
      desc: 'Precision ICP identification & buying committee calibration',
      metric: 100,
      decimal: 0,
      metricLabel: 'ICP PRECISION',
      color: '#00A6FF',
      accent: '#00E5FF',
    },
    {
      id: '02',
      number: '02',
      label: 'VERIFIED DATA',
      statement: 'DIRECT DIALS',
      desc: 'Multi-pass direct-dial verification & zero re-syndication SLA',
      metric: 99.8,
      decimal: 1,
      metricLabel: 'ACCURACY',
      color: '#10B981',
      accent: '#72D669',
    },
    {
      id: '03',
      number: '03',
      label: 'FULL FUNNEL',
      statement: 'PIPELINE WON',
      desc: 'Closed-loop demand generation & executive appointment setting',
      metric: 'GROWTH',
      metricLabel: 'PREDICTABLE',
      color: '#FF6D00',
      accent: '#FFA600',
    },
  ]

  return (
    <div className="relative w-full select-none my-6">
      
      {/* ── 1. Top Intelligent Step Progression Bar ─────────────────── */}
      <div className="flex items-center justify-between mb-8 px-4 sm:px-8 py-3 rounded-2xl bg-[#090D17]/90 border border-slate-800 backdrop-blur-xl overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-200 uppercase">
            THE B2B GROWTH JOURNEY
          </span>
        </div>

        {/* Step Flow Ribbon */}
        <div className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono shrink-0 pl-6">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-1.5 h-1.5 rounded-full" 
                  style={{ backgroundColor: step.color, boxShadow: `0 0 6px ${step.color}` }}
                />
                <span className="font-bold text-slate-300">{step.label}</span>
              </div>
              {idx < journeySteps.length - 1 && (
                <ChevronRight size={11} className="text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── 2. The Flowing Data Highway & Three Major Stations ───────── */}
      <div className="relative w-full rounded-3xl bg-[#0A0E1A]/95 border border-slate-800/90 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 lg:p-10 overflow-hidden">
        
        {/* Subtle Background Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Desktop SVG Continuous Flowing Data Conduit ────────────── */}
        <div className="hidden lg:block absolute inset-x-12 top-[108px] h-12 pointer-events-none z-10">
          <svg viewBox="0 0 1000 48" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="journeyStream" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FF6D00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFA600" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Base Continuous Conduit Track */}
            <path
              d="M 10 24 L 990 24"
              fill="none"
              stroke="url(#journeyStream)"
              strokeWidth="2.5"
              strokeDasharray="4 6"
              opacity="0.5"
            />

            {/* Continuous Traveling Glowing Pulse Beam */}
            {!prefersReducedMotion && (
              <path
                d="M 10 24 L 990 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="16 120"
                strokeDashoffset={-pulsePos * 10}
                opacity="0.95"
              />
            )}

            {/* Station Mile Beacons along Track */}
            <circle cx="160" cy="24" r="6" fill="#00A6FF" stroke="#ffffff" strokeWidth="2" />
            <circle cx="500" cy="24" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
            <circle cx="840" cy="24" r="6" fill="#FF6D00" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        {/* ── Three Major Journey Stations Grid ──────────────────────── */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* ════════════════ STATION 01: AUDIENCE INTEL ════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setActiveStation('01')}
            onMouseLeave={() => setActiveStation(null)}
            className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#090D17]/95 border transition-all duration-300 backdrop-blur-xl ${
              activeStation === '01'
                ? 'border-[#00A6FF] shadow-[0_10px_40px_rgba(0,166,255,0.22)] -translate-y-1'
                : 'border-slate-800/90 hover:border-[#00A6FF]/60 hover:shadow-[0_8px_30px_rgba(0,166,255,0.15)]'
            }`}
          >
            {/* Top Station Tag & Number */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00E5FF]">
                    01
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/15 text-[#00E5FF] border border-primary/30 uppercase">
                    TAM MAPPED
                  </span>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_#00A6FF]" />
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 block tracking-widest uppercase">
                STATION 01 - AUDIENCE INTEL
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 mb-2 group-hover:text-primary transition-colors">
                TAM MAPPED
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                Precision ICP identification &amp; buying committee calibration across total addressable market.
              </p>
            </div>

            {/* Micro-Visualization */}
            <div className="my-5">
              <Station01Visual isHovered={activeStation === '01'} />
            </div>

            {/* Dominant Metric */}
            <div className="pt-4 border-t border-slate-800/80 flex items-end justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  <AnimatedCounter targetValue={100} decimal={0} suffix="%" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00E5FF] block mt-0.5">
                  ICP PRECISION
                </span>
              </div>

              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/40 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={16} />
              </div>
            </div>
          </motion.div>

          {/* ════════════════ STATION 02: VERIFIED DATA ═════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onMouseEnter={() => setActiveStation('02')}
            onMouseLeave={() => setActiveStation(null)}
            className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#090D17]/95 border transition-all duration-300 backdrop-blur-xl ${
              activeStation === '02'
                ? 'border-[#10B981] shadow-[0_10px_40px_rgba(16,185,129,0.22)] -translate-y-1'
                : 'border-slate-800/90 hover:border-[#10B981]/60 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]'
            }`}
          >
            {/* Top Station Tag & Number */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#72D669]">
                    02
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase">
                    DIRECT DIALS
                  </span>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 block tracking-widest uppercase">
                STATION 02 - VERIFIED DATA
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 mb-2 group-hover:text-emerald-400 transition-colors">
                DIRECT DIALS
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                Multi-pass direct-dial verification &amp; zero re-syndication SLA for guaranteed reach.
              </p>
            </div>

            {/* Micro-Visualization */}
            <div className="my-5">
              <Station02Visual isHovered={activeStation === '02'} />
            </div>

            {/* Dominant Metric */}
            <div className="pt-4 border-t border-slate-800/80 flex items-end justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  <AnimatedCounter targetValue={99.8} decimal={1} suffix="%" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mt-0.5">
                  ACCURACY
                </span>
              </div>

              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={16} />
              </div>
            </div>
          </motion.div>

          {/* ════════════════ STATION 03: FULL FUNNEL ═══════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onMouseEnter={() => setActiveStation('03')}
            onMouseLeave={() => setActiveStation(null)}
            className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[#090D17]/95 border transition-all duration-300 backdrop-blur-xl ${
              activeStation === '03'
                ? 'border-[#FF6D00] shadow-[0_10px_40px_rgba(255,109,0,0.22)] -translate-y-1'
                : 'border-slate-800/90 hover:border-[#FF6D00]/60 hover:shadow-[0_8px_30px_rgba(255,109,0,0.15)]'
            }`}
          >
            {/* Top Station Tag & Number */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF6D00]">
                    03
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cta/15 text-cta border border-cta/30 uppercase">
                    PIPELINE WON
                  </span>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-cta shadow-[0_0_8px_#FF6D00]" />
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 block tracking-widest uppercase">
                STATION 03 - FULL FUNNEL
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 mb-2 group-hover:text-cta transition-colors">
                PIPELINE WON
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[44px]">
                Closed-loop demand generation &amp; executive appointment setting driving sales pipeline.
              </p>
            </div>

            {/* Micro-Visualization */}
            <div className="my-5">
              <Station03Visual isHovered={activeStation === '03'} />
            </div>

            {/* Dominant Metric */}
            <div className="pt-4 border-t border-slate-800/80 flex items-end justify-between">
              <div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF6D00]">
                  GROWTH
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mt-0.5">
                  PREDICTABLE
                </span>
              </div>

              <div className="w-9 h-9 rounded-xl bg-cta/10 border border-cta/40 text-cta flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp size={16} />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── 3. Destination Terminus: Sustainable Enterprise Growth ───── */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              GROWTH DESTINATION: <strong className="text-white">SUSTAINABLE B2B REVENUE PIPELINE</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-primary font-bold">01 INTEL</span>
            <ArrowRight size={12} />
            <span className="text-emerald-400 font-bold">02 DATA</span>
            <ArrowRight size={12} />
            <span className="text-cta font-bold">03 CONVERSION</span>
            <ArrowRight size={12} />
            <span className="text-white font-black">GROWTH</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default GrowthJourney
