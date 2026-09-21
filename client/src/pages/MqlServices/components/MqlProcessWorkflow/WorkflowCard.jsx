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
  const IconComponent = ICON_MAP[step.iconName] || Target

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
        border ${
          isActive
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
        className={`absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary dark:via-[#00c8ff] to-transparent transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-75'
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

      {/* ── CARD TOP ROW: Step Number & Icon ── */}
      <div className="flex items-center justify-between gap-1.5 w-full mb-1">
        {/* Step Number */}
        <div className="flex items-center gap-1">
          <span
            className={`font-mono text-xs sm:text-[13px] font-black tracking-wider transition-colors duration-300 ${
              isActive
                ? 'text-primary dark:text-[#00f0ff] dark:drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]'
                : 'text-slate-700 dark:text-white/90 group-hover:text-primary dark:group-hover:text-white'
            }`}
          >
            {step.stepNumber}
          </span>
          {isCompleted && !isActive && (
            <CheckCircle2 className="w-3 h-3 text-primary dark:text-[#00d2ff]" />
          )}
        </div>

        {/* Step Icon */}
        <div
          className={`relative p-1.5 rounded-lg transition-all duration-300 ${
            isActive
              ? 'bg-primary/15 dark:bg-[#0099ff]/20 text-primary dark:text-[#00f0ff] shadow-[0_0_10px_rgba(0,180,255,0.3)]'
              : 'text-slate-600 dark:text-white/80 group-hover:text-primary dark:group-hover:text-white group-hover:bg-primary/10 dark:group-hover:bg-[#0099ff]/10'
          }`}
        >
          <IconComponent
            className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 ${
              isActive ? 'scale-110' : 'group-hover:scale-105'
            }`}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* ── CARD BODY: Title & Description ── */}
      <div className="flex-1 flex flex-col justify-start">
        <h3
          className={`font-heading font-bold text-[11.5px] sm:text-[12.5px] xl:text-[13px] leading-tight mb-0.5 tracking-tight transition-colors duration-300 ${
            isActive
              ? 'text-primary dark:text-white dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
              : 'text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#e0f7ff]'
          }`}
        >
          {step.title}
        </h3>
        <p className="text-[9.5px] sm:text-[10px] xl:text-[10.5px] leading-snug text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-[#cbd5e1] transition-colors duration-200 line-clamp-3">
          {step.description}
        </p>
      </div>

      {/* ── Active Status Indicator Strip at Bottom ── */}
      <div className="mt-1 pt-1 border-t border-slate-200/80 dark:border-[#0099ff]/15 flex items-center justify-between text-[8.5px] sm:text-[9px] font-mono text-slate-500 dark:text-[#00a6ff]/70">
        <span className="uppercase tracking-wider font-medium">{step.category}</span>
        {isActive ? (
          <span className="text-primary dark:text-[#00f0ff] font-bold flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-primary dark:bg-[#00f0ff] animate-pulse" />
            ACTIVE
          </span>
        ) : (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-white/60">
            Select
          </span>
        )}
      </div>
    </motion.div>
  )
}
