import React from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Sparkles, Building, Mail, MapPin, FileText, ArrowRight, Shield } from 'lucide-react'

export default function LeadCaptureStage({ isActive, isCompleted, onSelect }) {
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
              {isCompleted ? '✓' : '07'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 07
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
            {isActive ? 'TRANSFORMING' : isCompleted ? 'LEAD CAPTURED' : 'STANDBY'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Lead Captured
          <UserCheck className={`w-4 h-4 text-primary transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Engaged contacts are captured in the lead generation system for further evaluation.
        </p>
      </div>

      {/* Structured Lead Card Transformation */}
      <motion.div
        className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden"
        animate={{
          scale: isActive ? [0.98, 1.01, 1] : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1 text-primary font-bold">
            <Sparkles className="w-3 h-3" />
            NEW_LEAD_DOSSIER
          </span>
          <span className="text-emerald-400 font-bold">#LEAD-8842</span>
        </div>

        {/* Lead Identity Summary */}
        <div className="p-2 rounded-lg bg-surface-alt/70 border border-border/60">
          <div className="text-xs font-bold text-text-primary">Michael Ross</div>
          <div className="text-[10px] text-primary font-medium">VP of Cloud Engineering</div>
          <div className="text-[9.5px] text-text-muted flex items-center gap-1 mt-0.5">
            <Building className="w-2.5 h-2.5" />
            <span>NexaScale Systems • 500+ Empl.</span>
          </div>
        </div>

        {/* Lead Attributes Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-mono">
          <div className="p-1 rounded bg-surface/50 border border-border/40 truncate">
            <span className="text-text-muted">Email: </span>
            <span className="text-text-secondary">m.ross@nexa...</span>
          </div>
          <div className="p-1 rounded bg-surface/50 border border-border/40 truncate">
            <span className="text-text-muted">Region: </span>
            <span className="text-text-secondary">US-East</span>
          </div>
          <div className="p-1 rounded bg-surface/50 border border-border/40 col-span-2 truncate">
            <span className="text-text-muted">Asset: </span>
            <span className="text-primary">Cloud Migration Report</span>
          </div>
        </div>

        {/* Transformation banner */}
        <div className="pt-1 flex items-center justify-between text-[9px] font-mono text-text-muted border-t border-border/40">
          <span>Engaged Contact</span>
          <ArrowRight className="w-3 h-3 text-primary" />
          <span className="text-emerald-400 font-bold">New Lead Created ✓</span>
        </div>
      </motion.div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Channel Source</span>
        <span className="text-text-secondary font-medium">Content Syndication Email</span>
      </div>
    </div>
  )
}
