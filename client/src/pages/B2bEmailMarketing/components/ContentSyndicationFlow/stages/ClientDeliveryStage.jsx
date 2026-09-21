import React from 'react'
import { motion } from 'framer-motion'
import { Share2, CheckCircle2, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react'

export default function ClientDeliveryStage({ isActive, isCompleted, onSelect, onReplay }) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all duration-500 rounded-2xl p-5 border backdrop-blur-xl h-full flex flex-col justify-between select-none ${
        isActive
          ? 'bg-surface/95 border-primary shadow-[0_0_35px_rgba(0,166,255,0.35)] ring-2 ring-primary/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/80 border-emerald-500/50 hover:border-emerald-500/70'
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
              {isCompleted ? '✓' : '10'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 10 // FINAL HANDOFF
            </span>
          </div>

          <span
            className={`font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all ${
              isActive || isCompleted
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 animate-pulse font-bold'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'SYNCING CRM' : isCompleted ? 'DELIVERED ✓' : 'STANDBY'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          Client Delivery
          <Share2 className={`w-4 h-4 text-primary transition-transform duration-300 ${isActive ? 'rotate-12 scale-110' : 'group-hover:scale-105'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Qualified leads are securely delivered to the client for sales follow-up and further engagement.
        </p>
      </div>

      {/* Client CRM / Webhook Dashboard Graphic */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono border-b border-border/50 pb-1.5 text-text-muted">
          <span className="flex items-center gap-1 text-primary">
            <Zap className="w-3 h-3 text-primary" />
            CRM_WEBHOOK_RELAY
          </span>
          <span className="text-emerald-400 font-bold">200 OK</span>
        </div>

        {/* Pipeline Handoff Progression */}
        <div className="p-2 rounded-lg bg-surface-alt/70 border border-border/60 flex items-center justify-between text-[10px] font-mono">
          <span className="text-text-muted">Qualified Lead</span>
          <ArrowRight className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-primary font-bold">Client CRM</span>
          <ArrowRight className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-emerald-400 font-bold">Outreach</span>
        </div>

        {/* Delivery Complete Confirmation Box */}
        <div className="pt-1">
          <div
            className={`py-2 px-3 rounded-lg border font-mono text-center text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 ${
              isCompleted || isActive
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-surface-alt border-border text-text-muted'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Delivery Complete ✓</span>
          </div>
        </div>

        {/* Pipeline Restart / Replay trigger if completed */}
        {isCompleted && (
          <div className="pt-1 flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onReplay?.()
              }}
              className="inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline hover:text-primary-light transition-colors cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Restart Pipeline Simulation</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Delivery Format</span>
        <span className="text-primary font-medium">Webhook / Salesforce / HubSpot</span>
      </div>
    </div>
  )
}
