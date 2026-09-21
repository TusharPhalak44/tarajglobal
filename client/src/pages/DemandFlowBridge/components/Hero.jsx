import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  Zap,
  Activity,
  Maximize2,
  Layers,
  Cpu,
  Database,
  Users,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-background text-text-primary"
      aria-label="Meet DemandFlow Bridge"
    >
      {/* Background Ambience & Cyber Grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(0,166,255,0.3) 0%, rgba(255,109,0,0.08) 60%, transparent 80%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
          }}
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-5 backdrop-blur-md shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse text-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Powering Business Operations
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3.5xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-4"
          >
            <span>Meet </span>
            <span className="bg-gradient-to-r from-primary via-[#00c8ff] to-cta bg-clip-text text-transparent">
              DemandFlow Bridge
            </span>
          </motion.h1>

          {/* Highlighted Line */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-text-primary mb-5 tracking-tight"
          >
            One Platform. Every Operation.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed font-normal mb-8"
          >
            DemandFlow Bridge is Taraj Global&apos;s unified business operations platform, connecting CRM, lead management, sales, client management, HRMS, payroll, and operational workflows in one centralized ecosystem.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('capabilities')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('ecosystem')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-surface border border-border text-text-primary hover:border-primary/40 hover:bg-surface/80 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 shadow-xs"
            >
              <span>See How It Works</span>
            </button>
          </motion.div>
        </div>

        {/* Hero Visual: Premium Application Showcase Frame */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Ambient Glow behind frame */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-cta/20 to-primary/30 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none" />

          {/* Browser / Application Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-[#0B1424] shadow-2xl shadow-black/40 dark:shadow-[0_25px_60px_rgba(0,166,255,0.15)]">
            
            {/* Top Chrome / Address Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/10 select-none">
              {/* Window Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Secure App URL */}
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">demandflow.tarajglobal.com</span>
                <span className="text-slate-500">/bridge/overview</span>
              </div>

              {/* Live Telemetry Pill */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 font-semibold">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>SYSTEM ONLINE</span>
                </div>
              </div>
            </div>

            {/* Application Screenshot Viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src="/demandflow-admin.png"
                alt="DemandFlow Bridge Unified Business Operations Platform Dashboard"
                className="w-full h-full object-cover object-top"
                priority="true"
              />

              {/* Subtle Gradient Shadow for bottom overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-primary font-bold">DemandFlow Bridge™</span>
                <span className="text-slate-300 hidden sm:inline">• Unified Business Operations Platform</span>
              </div>

              {/* Bottom Live Control Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">Central Operations Hub</div>
                    <div className="text-[11px] text-slate-400">8 Connected Core Business Modules Active</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/10 text-slate-200 border border-white/10">
                    ONE PLATFORM • REAL-TIME CONTROL
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
