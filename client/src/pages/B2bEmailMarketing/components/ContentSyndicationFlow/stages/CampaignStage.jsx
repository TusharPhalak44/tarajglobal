import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Play, Activity, Sparkles, CheckCircle2 } from 'lucide-react'

export default function CampaignStage({ isActive, isCompleted, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-primary shadow-[0_0_30px_rgba(0,166,255,0.25)] ring-1 ring-primary/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-primary/40 hover:border-primary/70'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/70'
      }`}
    >
      {/* Top Bar: Stage Number & Status Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? '✓' : '01'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 01
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse'
                : isCompleted
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'ACTIVE' : isCompleted ? 'LAUNCHED' : 'READY'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Campaign Launch
          <Rocket className={`w-4 h-4 text-primary transition-transform duration-300 ${isActive ? 'translate-x-0.5 -translate-y-0.5 rotate-12' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Campaign requirements, audience objectives and content syndication goals are defined and activated.
        </p>
      </div>

      {/* Futuristic Campaign Dashboard UI */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        {/* Subtle grid line decoration */}
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            CONTROL_NODE
          </span>
          <span className="text-text-secondary font-semibold">Q3-TECH-SYND</span>
        </div>

        <div className="space-y-1.5 text-[10.5px]">
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-[10px]">Audience:</span>
            <span className="font-medium text-text-primary text-[10px] truncate max-w-[120px]">VP & C-Suite Tech</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-[10px]">Target Region:</span>
            <span className="font-medium text-text-primary text-[10px]">AMER & EMEA</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-[10px]">Content Type:</span>
            <span className="font-medium text-primary text-[10px]">Cloud Whitepaper</span>
          </div>
        </div>

        {/* Animated Launch Button */}
        <div className="pt-2">
          <div
            className={`w-full py-1.5 px-2.5 rounded-lg font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-primary to-cta text-white shadow-lg shadow-primary/30 ring-1 ring-white/30 scale-[1.01]'
                : isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-surface-alt border border-border text-text-secondary'
            }`}
          >
            {isActive ? (
              <>
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>ACTIVATING ENGINE...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>CAMPAIGN ACTIVE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>LAUNCH CAMPAIGN</span>
              </>
            )}
          </div>
        </div>

        {/* Glowing pulse indicator when active */}
        {isActive && (
          <motion.div
            layoutId="pulse-01"
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-cta/10 pointer-events-none"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Footer Tag */}
      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Signal Status</span>
        <span className={isActive ? 'text-primary font-bold' : isCompleted ? 'text-emerald-400' : ''}>
          {isActive ? 'Transmitting Data →' : isCompleted ? 'Delivered to POC' : 'Standby'}
        </span>
      </div>
    </div>
  )
}
