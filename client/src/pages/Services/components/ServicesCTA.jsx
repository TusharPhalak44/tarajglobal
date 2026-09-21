import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'

export default function ServicesCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleScrollToTop = () => {
    const el = document.getElementById('capabilities-strip') || document.getElementById('service-selector')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden text-center"
      aria-label="Let's Build Your Next Growth Engine"
    >
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] bg-primary/7 dark:bg-primary/10 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-primary">
            ACCELERATE YOUR REVENUE
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary tracking-tight leading-[1.1] mb-6">
          Let’s Build Your Next{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#0088FF] to-cta">
            Growth Engine.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto mb-10">
          Connect strategy, data and execution to create a stronger, more predictable B2B pipeline.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact">
            <StarButton
              as="div"
              className="h-12 px-8 text-[13px] font-bold tracking-wide uppercase shadow-lg shadow-primary/20 text-white dark:text-neutral-900 flex items-center justify-center gap-2 transition-transform duration-300 active:scale-95"
              lightColor={isDark ? '#87CEEB' : '#FF8533'}
              backgroundColor={isDark ? '#00A6FF' : '#FF6D00'}
            >
              <span>Talk to Our Team</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </StarButton>
          </Link>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="h-12 px-7 rounded-xl text-[13px] font-bold uppercase tracking-wider text-text-primary border border-border/80 hover:border-primary/60 hover:bg-surface/60 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
          >
            <span>Explore Solutions</span>
          </button>
        </div>

        {/* Micro SLA Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>48-72 HOUR CAMPAIGN ACTIVATION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>ZERO LONG-TERM CONTRACT LOCKS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cta" />
            <span>DIRECT CRM SYNCHRONIZATION</span>
          </div>
        </div>
      </div>
    </section>
  )
}
