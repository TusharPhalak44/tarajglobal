import React from 'react'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, ShieldCheck, Sparkles, Check, Star } from 'lucide-react'

export default function QualificationStage({ isActive, isCompleted, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.35)] ring-2 ring-emerald-400/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-emerald-500/40 hover:border-emerald-500/70'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/70'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? '✓' : '09'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 09
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'QUALIFIED ✓' : isCompleted ? 'CERTIFIED' : 'PENDING'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Qualified Lead
          <Award className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-105'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Verified contacts that match the client's agreed criteria are marked as qualified leads.
        </p>
      </div>

      {/* Premium Qualified Lead Card & Glowing Badge */}
      <motion.div
        className={`rounded-xl bg-background/90 border p-3 space-y-2 relative overflow-hidden transition-all duration-500 ${
          isActive
            ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
            : isCompleted
            ? 'border-emerald-500/50'
            : 'border-border/70'
        }`}
        animate={{
          scale: isActive ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Glowing QUALIFIED LEAD Badge */}
        <div className="flex items-center justify-between pb-1.5 border-b border-border/50 text-[10px] font-mono">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold">
            <Star className="w-3 h-3 fill-current text-emerald-400" />
            QUALIFIED LEAD
          </span>
          <span className="text-emerald-400 text-[10px] font-bold">100% SQL</span>
        </div>

        {/* Lead Confirmation Snapshot */}
        <div className="p-2 rounded-lg bg-surface border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs text-text-primary">Michael Ross</div>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-text-secondary font-mono">NexaScale Systems • VP Cloud</div>
        </div>

        {/* 4 Qualified Badges */}
        <div className="grid grid-cols-2 gap-1 text-[8.5px] font-mono">
          <div className="p-1 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 truncate">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>ICP Match ✓</span>
          </div>
          <div className="p-1 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 truncate">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>Verified ✓</span>
          </div>
          <div className="p-1 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 truncate">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>Engaged ✓</span>
          </div>
          <div className="p-1 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 truncate">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            <span>Ready Delivery ✓</span>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Outcome</span>
        <span className="text-emerald-400 font-bold">Sales-Accepted Lead (SAL)</span>
      </div>
    </div>
  )
}
