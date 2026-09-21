import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Activity, Database, Zap } from 'lucide-react'

/**
 * TelemetryStatusBadge
 * Live system-status indicators for the Enterprise Growth Architecture:
 * - [ ● SLA GUARANTEED ] 100% Validated Data Records
 * - [ ◉ GROWTH SIGNAL INDEX ] Predictable Telemetry
 */
export const TelemetryStatusBadge = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
      
      {/* ── Status Indicator 01: SLA Guaranteed / Validated Data ────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#090D17]/90 border border-slate-700/60 dark:border-white/10 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-emerald-500/60 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] cursor-default"
      >
        {/* Pulsing Live Green LED */}
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
        </div>

        {/* Micro Category Tag */}
        <div className="flex items-center gap-1.5 pl-0.5 border-r border-slate-700/60 dark:border-white/10 pr-2.5">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
            SLA GUARANTEED
          </span>
        </div>

        {/* Text */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-100 whitespace-nowrap">
            100% Validated Data Records
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
            0% RE-SYNC
          </span>
        </div>

        {/* Technical Corner Bracket Accent */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400/50 rounded-tr-[2px]" />
      </motion.div>

      {/* ── Status Indicator 02: Growth Signal Index ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#090D17]/90 border border-slate-700/60 dark:border-white/10 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-[0_4px_20px_rgba(0,166,255,0.15)] cursor-default"
      >
        {/* Pulsing Electric Blue LED */}
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-[#00A6FF] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]" />
        </div>

        {/* Micro Category Tag */}
        <div className="flex items-center gap-1.5 pl-0.5 border-r border-slate-700/60 dark:border-white/10 pr-2.5">
          <Activity size={12} className="text-[#00A6FF]" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00A6FF] uppercase">
            GROWTH SIGNAL INDEX
          </span>
        </div>

        {/* Text */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-100 whitespace-nowrap">
            Predictable Telemetry
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hidden sm:inline-block">
            ACTIVE PIPELINE
          </span>
        </div>

        {/* Technical Corner Bracket Accent */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50 rounded-tr-[2px]" />
      </motion.div>

    </div>
  )
}

export default TelemetryStatusBadge
