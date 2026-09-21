import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'

export default function KineticCTA() {
  const navigate = useNavigate()

  return (
    <section
      id="kinetic-cta"
      className="relative py-24 lg:py-32 bg-background border-t border-border/70 overflow-hidden text-center select-none"
      aria-label="Let's Build Your Next Growth Engine"
    >
      {/* Ambient Radial Mesh Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[150px] bg-primary/8 dark:bg-primary/12 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-primary">
            ACCELERATE YOUR REVENUE
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary tracking-tight leading-[1.1] mb-6 uppercase">
          Ready To Build A Stronger, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00c8ff] to-cta">
            More Predictable Pipeline?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto mb-10">
          Schedule a 20-minute architecture review with our senior pipeline team. We will inspect your addressable market, map high-intent accounts, and formulate an executable outbound blueprint.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <StarButton onClick={() => navigate('/contact')}>
            Start a Conversation
          </StarButton>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('kinetic-services-showcase')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface hover:bg-surface/80 text-text-primary text-sm font-semibold transition-all hover:border-primary/50 shadow-xs cursor-pointer"
          >
            <span>Review All 12 Capabilities</span>
            <ArrowRight className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border/60 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>99.8% Data Accuracy SLA</span>
          </div>
          <span className="text-border hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>100% GDPR & CCPA Compliant</span>
          </div>
          <span className="text-border hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>No-Show Replacement Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
