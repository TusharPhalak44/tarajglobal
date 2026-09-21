import React from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  Shield,
  Send,
  FileText,
  Building,
  Mail,
  X,
  Layers,
  Award,
} from 'lucide-react'

export default function WorkflowStageCard({
  stage,
  isActive,
  isCompleted,
  onSelect,
  isReducedMotion = false,
}) {
  const Icon = stage.icon

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-500 cursor-pointer select-none flex flex-col justify-between h-full backdrop-blur-xl ${
        isActive
          ? 'bg-surface/95 border-primary shadow-[0_0_28px_rgba(0,166,255,0.22)] ring-1 ring-primary/40 -translate-y-1'
          : isCompleted
          ? 'bg-surface/85 border-primary/40 hover:border-primary/70 hover:-translate-y-0.5'
          : 'bg-surface/50 border-border/80 hover:border-border hover:bg-surface/75 hover:-translate-y-0.5'
      }`}
    >
      {/* Top Header: Number & Status Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-surface-alt border border-border text-text-muted'
              }`}
            >
              {isCompleted ? '✓' : stage.num}
            </div>
            <span className="font-mono text-[9.5px] uppercase font-bold tracking-wider text-text-muted">
              STAGE {stage.num}
            </span>
          </div>

          <span
            className={`font-mono text-[8.5px] px-2 py-0.5 rounded-full border transition-all ${
              isActive
                ? 'bg-primary/15 text-primary border-primary/40 animate-pulse font-bold'
                : isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-surface-alt text-text-muted border-border'
            }`}
          >
            {isActive ? 'ACTIVE' : isCompleted ? 'COMPLETE' : 'STANDBY'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          {stage.title}
          <Icon className={`w-3.5 h-3.5 text-primary transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        {/* Short Subtitle Description */}
        <p className="text-[11.5px] text-text-secondary leading-relaxed mb-3">
          {stage.subtitle}
        </p>
      </div>

      {/* Interactive Compact Visual Chamber */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-2.5 space-y-1.5 overflow-hidden">
        {renderChamberVisual(stage, isActive, isCompleted)}
      </div>

      {/* Hover Micro-Information Strip */}
      <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[9px] font-mono text-text-muted">
        <span className="truncate max-w-[150px]">{stage.hoverInfo}</span>
        <span className={isActive ? 'text-primary font-bold' : isCompleted ? 'text-emerald-400' : ''}>
          {isActive ? 'Processing →' : isCompleted ? 'Passed ✓' : 'Queue'}
        </span>
      </div>
    </div>
  )
}

function renderChamberVisual(stage, isActive, isCompleted) {
  switch (stage.id) {
    case 1: // Campaign Launch
      return (
        <div className="space-y-1 text-[10px] font-mono">
          <div className="flex justify-between text-text-muted">
            <span>Audience:</span>
            <span className="text-text-primary font-medium">VP/C-Suite Tech</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Region:</span>
            <span className="text-text-primary font-medium">AMER & EMEA</span>
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40">
            <span className="text-text-muted">Status:</span>
            <span className={`font-bold ${isActive || isCompleted ? 'text-emerald-400' : 'text-text-muted'}`}>
              {isActive ? 'READY → ACTIVE' : isCompleted ? 'ACTIVE ✓' : 'READY'}
            </span>
          </div>
        </div>
      )

    case 2: // Content Created
      return (
        <div className="space-y-1 text-[9.5px] font-mono">
          <div className="flex flex-wrap gap-1">
            {stage.documents.map((doc, idx) => (
              <span
                key={doc}
                className={`px-1.5 py-0.5 rounded text-[8.5px] border ${
                  idx === 0 && (isActive || isCompleted)
                    ? 'bg-primary/15 border-primary/50 text-primary font-bold'
                    : 'bg-surface border-border/60 text-text-muted'
                }`}
              >
                {doc}
              </span>
            ))}
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40 text-[9px]">
            <span className="text-text-muted">POC Asset:</span>
            <span className="text-primary font-semibold">Gated PDF Ready ✓</span>
          </div>
        </div>
      )

    case 3: // Client Approval
      return (
        <div className="space-y-1 text-[10px] font-mono">
          <div className="flex items-center justify-between text-text-muted text-[9px]">
            <span>Audit Check:</span>
            <span className="text-emerald-400 font-medium">GDPR & Tone OK</span>
          </div>
          <div
            className={`py-1 px-2 rounded-lg text-center font-bold border transition-all text-[10px] flex items-center justify-center gap-1 ${
              isCompleted || isActive
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                : 'bg-surface border-border text-text-muted'
            }`}
          >
            {isActive ? (
              <>
                <Clock className="w-3 h-3 animate-spin text-emerald-400" />
                <span>Reviewing... Approved ✓</span>
              </>
            ) : isCompleted ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Client Approved ✓</span>
              </>
            ) : (
              'Awaiting Client Review'
            )}
          </div>
        </div>
      )

    case 4: // ICP Data Collection
      return (
        <div className="space-y-1 text-[9px] font-mono">
          <div className="grid grid-cols-3 gap-0.5">
            {stage.criteria.slice(0, 6).map((crit) => (
              <span key={crit} className="px-1 py-0.5 rounded bg-surface border border-border/60 text-center truncate text-[8px] text-text-muted">
                {crit}
              </span>
            ))}
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40">
            <span className="text-text-muted">Filtered Pool:</span>
            <span className="text-primary font-bold">10,000+ Matching</span>
          </div>
        </div>
      )

    case 5: // Smart Email Distribution
      return (
        <div className="space-y-1 text-[9.5px] font-mono">
          <div className="grid grid-cols-3 gap-1 text-center">
            {stage.regions.map((reg) => (
              <div key={reg.code} className="p-1 rounded bg-surface border border-cta/30">
                <span className="text-cta font-bold block text-[9px]">{reg.code}</span>
                <span className="text-[7.5px] text-text-muted">{reg.time.split(' ')[0]}</span>
              </div>
            ))}
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40 text-[9px]">
            <span className="text-text-muted">Delivery:</span>
            <span className="text-emerald-400 font-bold">99.2% Inboxes ✓</span>
          </div>
        </div>
      )

    case 6: // Engagement Tracking
      return (
        <div className="space-y-1 text-[9px] font-mono">
          <div className="flex items-center justify-between text-[8px] text-text-muted">
            <span className="text-primary font-semibold">Delivered → Opened → Clicked</span>
          </div>
          <div className="p-1 rounded bg-surface border border-border/70 text-[8.5px] flex items-center justify-between truncate">
            <span className="text-text-primary font-medium">Michael Ross (VP)</span>
            <span className="text-emerald-400 font-bold">Downloaded ✓</span>
          </div>
          <div className="text-[8.5px] text-cta font-bold text-center">
            Asset Downloaded ✓
          </div>
        </div>
      )

    case 7: // Lead Captured
      return (
        <div className="space-y-1 text-[9px] font-mono">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-primary font-bold">NEW LEAD:</span>
            <span className="text-text-primary">Michael Ross</span>
          </div>
          <div className="text-[8.5px] text-text-secondary truncate">VP Cloud • NexaScale Systems</div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40 text-[8.5px]">
            <span className="text-text-muted">Dossier:</span>
            <span className="text-emerald-400 font-semibold">MQL Encapsulated ✓</span>
          </div>
        </div>
      )

    case 8: // Human Verification
      return (
        <div className="space-y-1 text-[9px] font-mono">
          <div className="grid grid-cols-2 gap-0.5 text-[8px]">
            <span className="text-emerald-400">✓ Valid Contact</span>
            <span className="text-emerald-400">✓ Company Match</span>
            <span className="text-emerald-400">✓ Title Match</span>
            <span className="text-emerald-400">✓ ICP Match</span>
          </div>
          <div className="pt-1 flex items-center justify-between border-t border-border/40 text-[8.5px]">
            <span className="text-emerald-400 font-bold">YES → Qualified</span>
            <span className="text-text-muted/50">NO (Rejected)</span>
          </div>
        </div>
      )

    case 9: // Qualified Lead
      return (
        <div className="space-y-1 text-[9px] font-mono text-center">
          <div className="py-1 px-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-[9.5px] flex items-center justify-center gap-1">
            <Award className="w-3 h-3 text-emerald-400" />
            <span>QUALIFIED LEAD</span>
          </div>
          <div className="flex justify-around text-[8px] text-text-secondary">
            <span>✓ Verified</span>
            <span>✓ ICP Match</span>
            <span>✓ Engaged</span>
          </div>
        </div>
      )

    case 10: // Client Delivery
      return (
        <div className="space-y-1 text-[9px] font-mono">
          <div className="flex justify-between text-text-muted text-[8.5px]">
            <span>Destination:</span>
            <span className="text-primary font-semibold">Client CRM Webhook</span>
          </div>
          <div className="py-1 px-1.5 rounded-md bg-primary/10 border border-primary/30 text-primary font-bold text-center text-[9px]">
            Ready for Outreach
          </div>
          <div className="text-emerald-400 font-bold text-center text-[8.5px]">
            Delivery Complete ✓
          </div>
        </div>
      )

    default:
      return null
  }
}
