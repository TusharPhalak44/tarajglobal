import React from 'react'
import { motion } from 'framer-motion'
import {
  Compass,
  ListChecks,
  Globe,
  FileText,
  UserCog,
  Rocket,
  LineChart,
  UserCheck,
  RefreshCw,
  Target,
  CheckCircle2,
} from 'lucide-react'

const ICON_MAP = {
  Compass: Compass,
  ListChecks: ListChecks,
  Globe: Globe,
  FileText: FileText,
  UserCog: UserCog,
  Rocket: Rocket,
  LineChart: LineChart,
  UserCheck: UserCheck,
  RefreshCw: RefreshCw,
}

export default function WorkflowCard({
  step,
  isActive = false,
  isCompleted = false,
  onClick,
  isReducedMotion = false,
  customStyle = {},
  className = '',
}) {
  const IconComponent = (step && ICON_MAP[step.iconName]) || Target

  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick && onClick()
        }
      }}
      whileHover={
        isReducedMotion
          ? {}
          : {
            y: -3,
            scale: 1.02,
            transition: { duration: 0.2, ease: 'easeOut' },
          }
      }
      whileTap={isReducedMotion ? {} : { scale: 0.98 }}
      style={customStyle}
      className={`
        relative group cursor-pointer select-none
        rounded-xl p-2.5 sm:p-3 xl:p-3.5 flex flex-col justify-between
        transition-all duration-300 backdrop-blur-md
        border ${isActive
          ? 'border-primary dark:border-[#00d2ff] bg-gradient-to-b from-blue-50/95 via-sky-50/90 to-white/95 dark:from-[#052654]/95 dark:via-[#031b3e]/95 dark:to-[#021029]/98 shadow-[0_4px_15px_rgba(0,166,255,0.25)] dark:shadow-[0_0_30px_rgba(0,180,255,0.4)] ring-2 ring-primary/30 dark:ring-[#00d2ff]/40'
          : isCompleted
            ? 'border-sky-300/70 dark:border-[#0088dd]/60 bg-white/95 dark:bg-gradient-to-b dark:from-[#031e42]/85 dark:via-[#021533]/90 dark:to-[#010e24]/95 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_0_18px_rgba(0,140,255,0.18)]'
            : 'border-slate-200/90 dark:border-[#0077cc]/35 hover:border-primary/50 dark:hover:border-[#00aaff]/70 bg-white/90 dark:bg-gradient-to-b dark:from-[#031938]/85 dark:via-[#02122b]/90 dark:to-[#010b1e]/95 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_15px_rgba(0,166,255,0.15)] dark:hover:shadow-[0_0_20px_rgba(0,166,255,0.25)]'
        }
        ${className}
      `}
    >
      {/* ── Top Ambient Edge Highlight ── */}
      <div
        className={`absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary dark:via-[#00c8ff] to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-75'
          }`}
      />

      {/* ── Active Ping & Pulsing Border Effect ── */}
      {isActive && !isReducedMotion && (
        <>
          <motion.div
            className="absolute -inset-[1px] rounded-xl border border-primary dark:border-[#00e5ff] pointer-events-none"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00f0ff] shadow-[0_0_8px_currentColor] animate-ping" />
        </>
      )}

      {/* ── CARD TOP ROW: Step Number, Category & Icon ── */}
      <div className="flex items-center justify-between gap-1 w-full mb-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-mono text-[11px] sm:text-xs font-bold transition-colors ${isActive
              ? 'text-primary dark:text-[#00f0ff]'
              : isCompleted
                ? 'text-primary/90 dark:text-[#00c8ff]'
                : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            {step?.stepNumber}
          </span>
          <span
            className={`text-[9.5px] uppercase font-mono tracking-wider transition-colors truncate max-w-[80px] sm:max-w-[100px] ${isActive
              ? 'text-primary dark:text-[#00d2ff] font-bold'
              : 'text-slate-500 dark:text-slate-400'
              }`}
          >
            {step?.category}
          </span>
        </div>

        <div
          className={`p-1 sm:p-1.5 rounded-lg transition-all duration-300 shrink-0 ${isActive
            ? 'bg-primary text-white dark:bg-gradient-to-br dark:from-[#00d2ff] dark:to-[#0077ff] dark:text-slate-950 shadow-xs dark:shadow-[0_0_12px_#00d2ff]'
            : isCompleted
              ? 'bg-primary/10 text-primary dark:bg-[#0088ff]/20 dark:text-[#00e5ff]'
              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary'
            }`}
        >
          {isCompleted && !isActive ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : (
            <IconComponent className="w-3.5 h-3.5" />
          )}
        </div>
      </div>

      {/* ── CARD MAIN: Title & One-Sentence Description ── */}
      <div>
        <h4
          className={`font-black text-xs sm:text-[13px] xl:text-[13.5px] leading-tight tracking-tight mb-1 transition-colors ${isActive
            ? 'text-slate-950 dark:text-white'
            : 'text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-white'
            }`}
        >
          {step?.title}
        </h4>
        <p className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-300 leading-snug line-clamp-2">
          {step?.description}
        </p>
      </div>

      {/* ── Bottom Active Glow Bar ── */}
      <div
        className={`mt-2 w-full h-[2px] rounded-full transition-all duration-300 ${isActive
          ? 'bg-primary dark:bg-gradient-to-r dark:from-[#00d2ff] dark:via-[#00f0ff] dark:to-[#0088ff] opacity-100 shadow-xs'
          : isCompleted
            ? 'bg-primary/40 dark:bg-[#00aaff]/50 opacity-60'
            : 'bg-slate-200 dark:bg-white/10 opacity-30 group-hover:opacity-60'
          }`}
      />
    </motion.div>
  )
}
