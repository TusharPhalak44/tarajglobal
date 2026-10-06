import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Activity, Database, Sparkles } from 'lucide-react'
 
/**
 * GrowthHeader
 * Editorial top area of the B2B Growth Command Center:
 * - Technical Eyebrow with animated "SYSTEM ACTIVE" indicator
 * - High-impact editorial headline: "POWERING SMARTER B2B GROWTH"
 * - Controlled readable description
 * - Live System Readout Indicators (SLA Guaranteed & Growth Signal Index)
 */
export const GrowthHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 lg:mb-12">
     
      {/* ── Left Column: Eyebrow + Dominant 3-Line Headline + Description ── */}
      <div className="max-w-2xl">
       
 
        {/* Large Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary dark:text-white tracking-tight leading-[1.16] mb-4"
        >
          <span className="block text-slate-100">POWERING</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00A6FF] to-[#00E5FF] my-0.5">
            SMARTER B2B
          </span>
          <span className="block text-slate-100">GROWTH</span>
        </motion.h2>
 
        {/* Controlled Paragraph Width (~560px) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-base lg:text-lg text-text-secondary dark:text-slate-300 font-normal leading-relaxed max-w-[640px]"
        >
          Taraj Global is a B2B demand generation and technology marketing partner helping organizations connect with the right companies, decision-makers, and buying audiences. We combine audience intelligence, verified B2B data, targeted outreach, and full-funnel marketing strategies to create qualified opportunities and support sustainable pipeline growth.
        </motion.p>
 
      </div>
 
      {/* ── Right Column: Live Intelligence Interface Indicators ── */}
      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:pb-1">
       
        {/* Readout 01: SLA Guaranteed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface dark:bg-[#0C101A]/90 border border-border dark:border-slate-800 dark:border-white/10 shadow-lg backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
                SLA GUARANTEED
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-slate-200 block">
              100% Validated Data Records
            </span>
          </div>
        </motion.div>
 
        {/* Readout 02: Growth Signal Index */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface dark:bg-[#0C101A]/90 border border-border dark:border-slate-800 dark:border-white/10 shadow-lg backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 border border-primary/30 flex items-center justify-center text-[#00E5FF] shrink-0">
            <Activity size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono font-bold tracking-widest text-[#00E5FF] uppercase">
                GROWTH SIGNAL INDEX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-slate-200 block">
              Predictable Telemetry
            </span>
          </div>
        </motion.div>
 
      </div>
 
    </div>
  )
}
 
export default GrowthHeader
 