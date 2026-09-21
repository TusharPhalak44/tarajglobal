import React from 'react'
import { Send, Activity, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PipelineSummary() {
  const navigate = useNavigate()

  return (
    <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-surface/90 to-surface-alt/60 border border-border/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-cta/10 blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10.5px] font-mono font-bold text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>OPERATIONAL ASSURANCE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Turning Engagement into Opportunity
          </h3>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2.5">
            Every interaction is tracked. Every lead is verified. Every qualified opportunity is delivered with confidence.
          </p>

          {/* 3 Core Quality Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/90 border border-border/80 text-xs font-mono text-text-primary shadow-sm">
              <Send className="w-3.5 h-3.5 text-primary" />
              <span>Targeted Distribution</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/90 border border-border/80 text-xs font-mono text-text-primary shadow-sm">
              <Activity className="w-3.5 h-3.5 text-cta" />
              <span>Real-Time Engagement</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background/90 border border-border/80 text-xs font-mono text-emerald-400 border-emerald-500/30 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human-Verified Leads</span>
            </div>
          </div>
        </div>

        {/* Action Button to schedule campaign */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-cta text-white shadow-xl shadow-primary/20 hover:opacity-95 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Launch Your Syndication Campaign</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
