import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Database,
  Compass,
  Mail,
  UserCog,
  Rocket,
  LineChart,
  UserCheck,
  RefreshCw,
  CheckCircle2,
  Target,
} from 'lucide-react'

const ICON_MAP = {
  Users: Users,
  Database: Database,
  Compass: Compass,
  Mail: Mail,
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

  if (!step) return null

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
            className={`font-mono text-[10px] xl:text-[11px] font-black tracking-wider transition-colors ${isActive
              ? 'text-primary dark:text-[#00e5ff]'
              : isCompleted
                ? 'text-sky-500 dark:text-[#38bdf8]'
                : 'text-slate-400 dark:text-slate-500'
              }`}
          >
            {step.stepNumber}
          </span>
          <span
            className={`text-[8.5px] xl:text-[9.5px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border transition-colors ${isActive
              ? 'bg-primary/10 border-primary/30 text-primary dark:bg-[#00d2ff]/20 dark:border-[#00d2ff]/40 dark:text-[#00f0ff]'
              : isCompleted
                ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40 text-sky-600 dark:text-sky-300'
                : 'bg-slate-100 dark:bg-white/5 border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400'
              }`}
          >
            {step.category}
          </span>
        </div>

        {/* Square Icon Container with subtle glow */}
        <div
          className={`w-6 h-6 xl:w-7 xl:h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${isActive
            ? 'bg-primary dark:bg-[#00d2ff] text-white dark:text-[#04132b] shadow-sm dark:shadow-[0_0_12px_#00d2ff]'
            : isCompleted
              ? 'bg-sky-100 dark:bg-sky-900/50 text-primary dark:text-[#38bdf8]'
              : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-primary/10 dark:group-hover:bg-[#00c8ff]/20 group-hover:text-primary dark:group-hover:text-[#00e5ff]'
            }`}
        >
          <IconComponent className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
        </div>
      </div>

      {/* ── CARD MIDDLE: Title ── */}
      <div className="my-auto py-0.5">
        <h3
          className={`text-[11.5px] xl:text-[12.5px] font-black tracking-tight leading-tight line-clamp-1 transition-colors ${isActive
            ? 'text-primary dark:text-[#00e5ff]'
            : isCompleted
              ? 'text-slate-900 dark:text-white'
              : 'text-slate-800 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-[#00d2ff]'
            }`}
        >
          {step.title}
        </h3>
        <p className="text-[9.5px] xl:text-[10px] text-slate-500 dark:text-slate-300 line-clamp-2 leading-tight mt-0.5 font-normal">
          {step.description}
        </p>
      </div>

      {/* ── CARD BOTTOM: Status Tag ── */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/10 text-[8.5px] font-mono">
        <span
          className={`flex items-center gap-1 font-bold ${isActive
            ? 'text-primary dark:text-[#00f0ff]'
            : isCompleted
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-400 dark:text-slate-500'
            }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Verified</span>
            </>
          ) : isActive ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00f0ff] animate-ping" />
              <span>Active</span>
            </>
          ) : (
            <span>Ready</span>
          )}
        </span>

        <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono tracking-wider">
          PHASE {step.stepNumber}
        </span>
      </div>
    </motion.div>
  )
}
