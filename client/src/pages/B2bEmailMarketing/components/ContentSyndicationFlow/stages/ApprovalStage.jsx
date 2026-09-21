import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, UserCheck, ShieldCheck, FileCheck, Clock, Check } from 'lucide-react'

export default function ApprovalStage({ isActive, isCompleted, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-emerald-500/80 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40 -translate-y-1'
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
              {isCompleted ? '✓' : '03'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 03
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'IN REVIEW' : isCompleted ? 'APPROVED ✓' : 'PENDING'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Client Approval
          <CheckCircle2 className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-105'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          The proof of content is reviewed by the client before campaign execution.
        </p>
      </div>

      {/* Review Interface & Approval Confirmation */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-emerald-400" />
            CLIENT_PORTAL_GATE
          </span>
          <span className="text-text-secondary">AUDIT_V2</span>
        </div>

        {/* Client review checklist preview */}
        <div className="space-y-1.5 text-[10.5px]">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-text-muted text-[10px] flex items-center gap-1">
              <FileCheck className="w-3 h-3 text-primary" />
              Messaging & Voice:
            </span>
            <span className="text-emerald-400 text-[10px] font-mono font-medium">Passed</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-text-muted text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" />
              GDPR Compliance:
            </span>
            <span className="text-emerald-400 text-[10px] font-mono font-medium">Verified</span>
          </div>
        </div>

        {/* Dynamic Approval Status Box */}
        <div className="pt-1.5">
          <div
            className={`py-2 px-3 rounded-lg border font-mono text-center text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
              isCompleted || isActive
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/10'
                : 'bg-surface-alt border-border text-text-muted'
            }`}
          >
            {isActive ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Reviewing... Approved ✓</span>
              </motion.div>
            ) : isCompleted ? (
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Client Sign-Off Approved ✓</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>Awaiting Review</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Gate Status</span>
        <span className={isActive || isCompleted ? 'text-emerald-400 font-bold' : ''}>
          {isActive || isCompleted ? 'Unlocked → Send to ICP' : 'Locked'}
        </span>
      </div>
    </div>
  )
}
