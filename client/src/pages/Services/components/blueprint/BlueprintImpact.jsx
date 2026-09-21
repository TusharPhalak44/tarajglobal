import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users2, TrendingUp, Globe2 } from 'lucide-react'

const METRICS = [
  {
    num: '10M+',
    label: 'Leads Generated',
    caption: 'Verified high-intent B2B prospect records delivered to sales teams globally.',
    icon: BarChart3,
  },
  {
    num: '1,500+',
    label: 'Clients',
    caption: 'Enterprise SaaS, Cybersecurity, and IT market leaders scaling through our engine.',
    icon: Users2,
  },
  {
    num: '2,100+',
    label: 'Monthly Leads',
    caption: 'Active BANT and SQL leads processed, validated, and handed off monthly.',
    icon: TrendingUp,
  },
  {
    num: '16+',
    label: 'Sectors',
    caption: 'Targeted vertical expertise spanning enterprise tech, cloud, and advisory.',
    icon: Globe2,
  },
]

export default function BlueprintImpact() {
  return (
    <section
      id="impact-statistics-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                OUR IMPACT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Real Results. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Lasting Growth.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Audited performance data reflecting our commitment to transparent pipeline creation.
          </p>
        </div>

        {/* ══════════ OVERSIZED TYPOGRAPHY METRICS (NO CONVENTIONAL CARDS) ══════════ */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="py-10 sm:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:bg-white/[0.02] px-4 sm:px-8 rounded-2xl transition-colors"
              >
                {/* Left: Oversized Number Display */}
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs font-bold text-white/30 tracking-widest">
                    0{idx + 1}
                  </span>
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-white group-hover:text-[#FF6D00] transition-colors duration-300">
                    {metric.num}
                  </div>
                </div>

                {/* Right: Label & Context */}
                <div className="lg:max-w-md flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-[#FF6D00]" />
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                      {metric.label}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                    {metric.caption}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Animated Subtle Orange Wave / Data Line Underneath */}
        <div className="mt-12 relative w-full h-[2px] bg-white/10 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            whileInView={{ x: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FF6D00] to-transparent"
          />
        </div>
      </div>
    </section>
  )
}
