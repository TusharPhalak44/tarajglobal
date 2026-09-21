import React from 'react'
import { motion } from 'framer-motion'
import { Database, Filter, Cpu, Users, Layers, CheckCircle2 } from 'lucide-react'

const CRITERIA_CHIPS = [
  'Industry',
  'Job Title',
  'Company Size',
  'Geography',
  'Department',
  'Seniority',
  'Technology',
  'Revenue',
]

export default function ICPStage({ isActive, isCompleted, onSelect }) {
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
              {isCompleted ? '✓' : '04'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 04
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-primary/15 text-primary border-primary/40 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'SEGMENTING' : isCompleted ? 'ICP FILTERED' : 'READY'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          ICP Data Collection
          <Database className={`w-4 h-4 text-primary transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Target contacts are identified and segmented according to the client's Ideal Customer Profile.
        </p>
      </div>

      {/* Futuristic Database Hub & 8 Criteria Chips */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        {/* Database Hub Header & Counter */}
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-primary" />
            TAL_DATABASE_ENGINE
          </span>
          <span className="text-primary font-bold">
            {isActive ? (
              <span className="animate-pulse">FILTERING...</span>
            ) : isCompleted ? (
              <span className="text-emerald-400">10,000+ MATCHED</span>
            ) : (
              '10,000+ POOL'
            )}
          </span>
        </div>

        {/* 8 Criteria Filter Chips */}
        <div className="grid grid-cols-4 gap-1 pt-1">
          {CRITERIA_CHIPS.map((chip, idx) => (
            <div
              key={chip}
              className={`px-1 py-1 rounded text-[8.5px] font-mono text-center truncate border transition-all duration-300 ${
                isActive
                  ? 'bg-primary/10 text-primary border-primary/40 shadow-xs'
                  : isCompleted
                  ? 'bg-emerald-500/5 text-emerald-400/90 border-emerald-500/20'
                  : 'bg-surface-alt text-text-muted border-border/60'
              }`}
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
              title={chip}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Database Cylinder / Particle Flow Graphic */}
        <div className="relative py-1 flex items-center justify-between text-[10px] font-mono bg-surface-alt/60 rounded-lg p-2 border border-border/60">
          <div className="flex items-center gap-1.5 text-text-muted text-[9.5px]">
            <motion.div
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                rotate: isActive ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Filter className="w-3 h-3 text-primary" />
            </motion.div>
            <span>Raw Ingestion</span>
          </div>

          <span className="text-text-muted">→</span>

          <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9.5px]">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Verified ICP Match</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Extraction Rule</span>
        <span className="text-text-secondary font-medium">B2B Decision-Makers</span>
      </div>
    </div>
  )
}
