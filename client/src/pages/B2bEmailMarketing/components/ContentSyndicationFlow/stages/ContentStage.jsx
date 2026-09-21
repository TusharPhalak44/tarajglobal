import React from 'react'
import { motion } from 'framer-motion'
import { FileText, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react'

export default function ContentStage({ isActive, isCompleted, onSelect }) {
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
              {isCompleted ? '✓' : '02'}
            </div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-muted">
              STAGE 02
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
            {isActive ? 'PACKAGING' : isCompleted ? 'POC READY' : 'QUEUED'}
          </span>
        </div>

        <h3 className="text-base font-bold text-text-primary mb-1 flex items-center gap-1.5">
          POC Content Created
          <FileText className={`w-4 h-4 text-primary transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:translate-x-0.5'}`} />
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          A proof of content is prepared according to campaign requirements and shared for client review.
        </p>
      </div>

      {/* Floating Document Stack Illustration */}
      <div className="rounded-xl bg-background/80 border border-border/70 p-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[135px]">
        {/* Document Deck Stacking Visual */}
        <div className="relative w-full max-w-[170px] h-20 flex items-center justify-center">
          {/* Back document: Case Study */}
          <motion.div
            className="absolute w-28 h-16 rounded-lg bg-surface border border-border/70 shadow-sm p-1.5 flex flex-col justify-between"
            animate={{
              y: isActive ? -8 : -4,
              rotate: isActive ? -6 : -3,
              scale: 0.9,
              opacity: 0.7,
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-1 text-[8px] text-text-muted">
              <BookOpen className="w-2.5 h-2.5 text-cta" />
              <span>eBook / Case Study</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-border rounded" />
              <div className="h-1 w-3/4 bg-border/60 rounded" />
            </div>
          </motion.div>

          {/* Middle document: Research Report */}
          <motion.div
            className="absolute w-32 h-17 rounded-lg bg-surface-alt border border-border shadow-md p-2 flex flex-col justify-between"
            animate={{
              y: isActive ? -2 : 0,
              rotate: isActive ? 4 : 2,
              scale: 0.95,
              opacity: 0.85,
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-1 text-[8.5px] text-text-muted">
              <Layers className="w-2.5 h-2.5 text-primary" />
              <span>Research Report</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-border rounded" />
              <div className="h-1 w-2/3 bg-border/70 rounded" />
            </div>
          </motion.div>

          {/* Front document: Main Whitepaper POC */}
          <motion.div
            className={`absolute w-36 h-18 rounded-lg bg-surface border p-2 flex flex-col justify-between transition-all duration-300 ${
              isActive
                ? 'border-primary/80 shadow-[0_0_15px_rgba(0,166,255,0.3)] bg-surface'
                : 'border-border/80 shadow-md'
            }`}
            animate={{
              y: isActive ? [0, -3, 0] : 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between text-[9px] font-mono">
              <span className="flex items-center gap-1 text-primary font-bold">
                <FileText className="w-3 h-3" />
                Whitepaper POC
              </span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-primary/10 text-primary">PDF</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 w-full bg-primary/30 rounded" />
              <div className="h-1 w-4/5 bg-primary/20 rounded" />
            </div>
            <div className="flex justify-between items-center text-[7.5px] text-text-muted">
              <span>Cloud Enterprise</span>
              <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </motion.div>
        </div>

        {/* Ready Badge & Dispatch Arrow */}
        <div className="mt-2 w-full flex items-center justify-between pt-2 border-t border-border/50 text-[10px] font-mono">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            POC Ready
          </span>
          <span className={`flex items-center gap-0.5 text-[9.5px] ${isActive ? 'text-primary font-bold animate-pulse' : 'text-text-muted'}`}>
            Review Queue
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[9.5px] font-mono text-text-muted">
        <span>Asset Type</span>
        <span className="text-text-secondary font-medium">Syndication Gated PDF</span>
      </div>
    </div>
  )
}
