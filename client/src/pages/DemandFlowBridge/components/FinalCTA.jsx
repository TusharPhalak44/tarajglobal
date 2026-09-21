import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Cpu, Sparkles, CheckCircle2 } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const FinalCTA = () => {
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="cta"
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-slate-950 text-white"
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
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-mono font-bold uppercase mb-6"
        >
          <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Unified Operations Ecosystem</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4"
        >
          Ready to Explore{' '}
          <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
            DemandFlow Bridge?
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal mb-8"
        >
          Discover how one integrated platform can connect your business operations.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
          >
            <span>Explore DemandFlow Bridge</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>Talk to Taraj Global</span>
          </Link>
        </motion.div>

        {/* Trust Badges Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proprietary Internal Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Multi-Department Synchronization</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise-Grade Security & RBAC</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default FinalCTA
