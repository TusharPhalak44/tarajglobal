import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Cpu, Sparkles } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="cta"
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-background dark:bg-slate-950 text-text-primary dark:text-white"
      aria-label="Ready to Explore DemandFlow Bridge"
    >
      {/* Background Animated Connection Grid & Nebula */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #00A6FF 0%, rgba(255,109,0,0.15) 70%, transparent 80%)' }}
        />
        
        {/* Fine Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <motion.div
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="inline-flex items-center gap-2 mb-6"
>
  {/* <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" /> */}
  <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
    Unified Operations Ecosystem
  </span>
</motion.div>

        {/* Heading */}
        <motion.h2
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="text-2.5xl sm:text-4xl lg:text-[36px] font-black tracking-tight leading-[1.22] text-text-primary mb-4"
>
  Ready to Explore{' '}
  <span className="highlight">
    DemandFlow Bridge?
  </span>
</motion.h2>

        {/* Description */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-text-secondary dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-6 sm:mb-8"
        >
          Discover how one integrated platform can connect your business operations.
        </motion.p>

        {/* Action Buttons */}
        <div className="relative inline-block max-w-full">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-wrap items-center justify-center gap-4 z-10"
          >
            <button
              onClick={scrollToTop}
              data-cta="true"
              data-cta-section="DemandFlow Bridge Final CTA"
              data-cta-name="Explore DemandFlow Bridge"
              style={{ backgroundColor: '#FF6D00', color: '#FFFFFF', boxShadow: '0 4px 20px rgba(255,109,0,0.3)', border: 'none' }} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm  text-text-accent dark:text-white hover: shadow-lg shadow-accent hover:shadow-accent transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
            >
              <span>Explore DemandFlow Bridge</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              to="/contact"
              data-cta="true"
              data-cta-section="DemandFlow Bridge Final CTA"
              data-cta-name="Talk to Taraj Global"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-surface/90 dark:bg-white/10 hover:bg-white/20 border border-border dark:border-white/15 text-text-accent dark:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Talk to Taraj Global</span>
            </Link>

          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default FinalCTA
