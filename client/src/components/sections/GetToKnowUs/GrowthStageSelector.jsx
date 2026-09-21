import React from 'react'
import { motion } from 'framer-motion'
import { Target, ShieldCheck, TrendingUp, Layers, Database, Zap, ChevronRight } from 'lucide-react'

/**
 * GrowthStageSelector
 * Left Control Rail of the Growth Intelligence Console.
 * Allows the user to toggle/inspect the 3 core stages of the growth engine:
 * 01 — AUDIENCE INTEL (TAM MAPPED)
 * 02 — VERIFIED DATA (DIRECT DIALS)
 * 03 — FULL FUNNEL (PIPELINE WON)
 */
export const GrowthStageSelector = ({ 
  stages, 
  activeStage, 
  onSelectStage, 
  progress = 0 
}) => {
  const iconMap = {
    '01': Target,
    '02': Database,
    '03': TrendingUp,
  }

  const themeMap = {
    '01': {
      activeBorder: 'border-[#00A6FF] shadow-[0_0_25px_rgba(0,166,255,0.2)]',
      activeBg: 'bg-gradient-to-r from-primary/15 via-[#00A6FF]/10 to-transparent',
      accentColor: '#00A6FF',
      subColor: '#00E5FF',
      tagBg: 'bg-primary/20 text-[#00E5FF] border-primary/40',
      progressBar: 'bg-[#00A6FF]',
    },
    '02': {
      activeBorder: 'border-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.2)]',
      activeBg: 'bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-transparent',
      accentColor: '#10B981',
      subColor: '#72D669',
      tagBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      progressBar: 'bg-[#10B981]',
    },
    '03': {
      activeBorder: 'border-[#FF6D00] shadow-[0_0_25px_rgba(255,109,0,0.2)]',
      activeBg: 'bg-gradient-to-r from-cta/15 via-amber-400/10 to-transparent',
      accentColor: '#FF6D00',
      subColor: '#FFA600',
      tagBg: 'bg-cta/20 text-[#FF6D00] border-cta/40',
      progressBar: 'bg-[#FF6D00]',
    },
  }

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Rail Subhead */}
      <div className="flex items-center justify-between px-1 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        <span>CONTROL RAIL // STAGES</span>
        <span className="text-slate-400">SELECT TO INSPECT</span>
      </div>

      {stages.map((stage) => {
        const isActive = activeStage === stage.id
        const theme = themeMap[stage.id] || themeMap['01']
        const Icon = iconMap[stage.id] || Target

        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelectStage(stage.id)}
            onFocus={() => onSelectStage(stage.id)}
            className={`group relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? `${theme.activeBorder} ${theme.activeBg} bg-[#0D121F]/95`
                : 'border-slate-800/80 bg-[#090D17]/70 hover:border-slate-700 hover:bg-[#0D121F]/50 opacity-75 hover:opacity-100'
            }`}
          >
            {/* Active Left Indicator Bar */}
            {isActive && (
              <div 
                className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                style={{ backgroundColor: theme.accentColor, boxShadow: `0 0 10px ${theme.accentColor}` }}
              />
            )}

            {/* Top Row: Index + Tag + Active LED */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span 
                  className="font-mono text-xs font-black tracking-tight"
                  style={{ color: isActive ? theme.subColor : '#94a3b8' }}
                >
                  STAGE {stage.number}
                </span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${theme.tagBg}`}>
                  {stage.statement}
                </span>
              </div>

              {/* Status Indicator LED */}
              <div 
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? theme.accentColor : '#334155',
                  boxShadow: isActive ? `0 0 8px ${theme.accentColor}` : 'none',
                }}
              />
            </div>

            {/* Title & Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors shrink-0"
                  style={{
                    backgroundColor: isActive ? `${theme.accentColor}25` : 'rgba(255,255,255,0.04)',
                    color: isActive ? theme.subColor : '#94a3b8',
                    border: `1px solid ${isActive ? `${theme.accentColor}50` : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <Icon size={13} strokeWidth={2.5} />
                </div>
                <h4 className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-primary transition-colors">
                  {stage.label}
                </h4>
              </div>

              <ChevronRight 
                size={14} 
                className={`transition-transform duration-300 ${
                  isActive ? 'translate-x-0.5 text-white' : 'text-slate-600'
                }`} 
              />
            </div>

            {/* Subtitle Description */}
            <p className="text-[11px] sm:text-xs text-slate-400 font-normal leading-relaxed mt-1.5 pl-8.5">
              {stage.desc}
            </p>

            {/* Active Auto-Rotation Progress Bar */}
            {isActive && (
              <div className="mt-3.5 w-full h-[2px] rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className={`h-full ${theme.progressBar}`}
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default GrowthStageSelector
