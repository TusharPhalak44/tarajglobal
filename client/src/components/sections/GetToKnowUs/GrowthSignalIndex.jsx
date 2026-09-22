import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Activity, Radio, Database, TrendingUp, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthSignalIndex
 * Right-side floating enterprise analytical panel:
 * - Header: GROWTH SIGNAL INDEX / Predictable Telemetry
 * - Minimal animated horizontal telemetry signal graph
 * - SLA GUARANTEED: 100% Validated Data Records
 */
export const GrowthSignalIndex = () => {
  const prefersReducedMotion = useReducedMotion()

  const telemetrySignals = [
    { label: 'TAM MAPPED', val: '100%', color: '#00A6FF' },
    { label: 'INTENT SURGE', val: '94.2%', color: '#00E5FF' },
    { label: 'DIRECT DIALS', val: '99.8%', color: '#FF6D00' },
    { label: 'PIPELINE SQL', val: 'ACTIVE', color: '#72D669' },
  ]

  return (
    <div className="relative w-full rounded-2xl bg-[#090D17]/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl p-5 sm:p-6 overflow-hidden select-none">
      
      {/* Subtle Coordinate Grid in panel */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={13} className="text-[#00E5FF]" />
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              GROWTH SIGNAL INDEX
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
            Predictable Telemetry // Live Stream
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>REAL-TIME</span>
        </div>
      </div>

      {/* ── Animated Horizontal Signal Graph ─────────────────────────── */}
      <div className="relative z-10 my-5">
        <div className="relative w-full h-28 rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* SVG Sparkline Signal Curve */}
          <svg viewBox="0 0 320 60" className="w-full h-14 overflow-visible relative z-10 my-auto">
            <defs>
              <linearGradient id="signalStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.8" />
                <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#FF6D00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#72D669" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Base Horizontal Baseline */}
            <line x1="0" y1="45" x2="320" y2="45" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

            {/* Dynamic Signal Path */}
            <motion.path
              d="M 10 42 Q 50 18 90 35 T 170 20 T 250 15 T 310 8"
              fill="none"
              stroke="url(#signalStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Data Nodes along curve */}
            <circle cx="10" cy="42" r="3.5" fill="#00A6FF" />
            <circle cx="90" cy="35" r="3.5" fill="#00E5FF" />
            <circle cx="170" cy="20" r="3.5" fill="#FF6D00" />
            <circle cx="310" cy="8" r="4.5" fill="#72D669" stroke="#ffffff" strokeWidth="1.5" />
          </svg>

          {/* Telemetry Data Markers along the bottom */}
          <div className="grid grid-cols-4 gap-1 text-[8.5px] font-mono relative z-10 pt-1 border-t border-slate-800/80">
            {telemetrySignals.map((item, idx) => (
              <div key={idx} className="text-center">
                <span className="text-slate-400 block truncate">{item.label}</span>
                <span className="font-bold block" style={{ color: item.color }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom SLA Guaranteed Enterprise Indicator ───────────────── */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block">
                SLA GUARANTEED
              </span>
              <span className="text-xs font-semibold text-slate-100 block">
                100% Validated Data Records
              </span>
            </div>
          </div>
          <div className="text-right text-[9px] font-mono text-slate-400 hidden sm:block">
            <span>ZERO RE-SYNC</span>
          </div>
        </div>

        {/* Technical Footer Metadata */}
        <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-slate-400 px-1">
          <span>ENCRYPTION: 256-BIT</span>
          <span>LATENCY: 8ms</span>
          <span>SLA: 0% BOUNCE</span>
        </div>
      </div>

    </div>
  )
}

export default GrowthSignalIndex
