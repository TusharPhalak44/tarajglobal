import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'

export default function EditorialCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleScrollToTop = () => {
    const el = document.getElementById('services-list')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="Let's Build Your Next Growth Opportunity"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-5">
            <span>GET STARTED</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary tracking-tight leading-[1.08] mb-6">
            Let's Build Your Next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Growth Opportunity.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed font-normal max-w-2xl mb-10">
            Tell us where you want to grow. We'll help you build the strategy, reach the right prospects and create a stronger pipeline.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
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
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
