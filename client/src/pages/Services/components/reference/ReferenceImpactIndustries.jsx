import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import {
  Laptop,
  Cpu,
  Server,
  Shield,
  Cloud,
  Radio,
  Briefcase,
  Building,
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Globe,
} from 'lucide-react'

const METRICS = [
  {
    value: 10,
    suffix: 'M+',
    label: 'Leads Generated',
    caption: 'Verified Pipeline',
    icon: TrendingUp,
  },
  {
    value: 1500,
    suffix: '+',
    separator: ',',
    label: 'Clients',
    caption: 'Global B2B Accounts',
    icon: Users,
  },
  {
    value: 2100,
    suffix: '+',
    separator: ',',
    label: 'Monthly Leads',
    caption: 'Sales-Ready Volume',
    icon: Zap,
  },
  {
    value: 16,
    suffix: '+',
    label: 'Sectors',
    caption: 'Target Industries',
    icon: Globe,
  },
]

const INDUSTRIES = [
  { name: 'SaaS', tag: 'ARR & Pipeline', icon: Laptop },
  { name: 'Technology', tag: 'AI & Platforms', icon: Cpu },
  { name: 'IT Services', tag: 'MSP & Cloud', icon: Server },
  { name: 'Cybersecurity', tag: 'SecOps & Zero Trust', icon: Shield },
  { name: 'Cloud', tag: 'Infra & DevOps', icon: Cloud },
  { name: 'Telecom', tag: 'Unified Comms', icon: Radio },
  { name: 'Professional Services', tag: 'Advisory & Legal', icon: Briefcase },
  { name: 'Enterprise Solutions', tag: 'ERP & Workflows', icon: Building },
]

export default function ReferenceImpactIndustries() {

  return (
    <section
      id="impact-industries-section"
      className="relative py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-text-primary dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
              PROVEN EXPERTISE & IMPACT
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-text-primary dark:text-white leading-[1.15]">
              Measurable Results Across <br className="hidden sm:inline" />
              Target Industries
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-white/60 leading-relaxed font-normal lg:max-w-md lg:pb-1">
              Combining audited performance data with specialized sector know-how to accelerate pipeline growth for modern B2B teams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ══════════ LEFT HALF: THE IMPACT (HIGH CONTRAST B2B STATS) (5 cols) ══════════ */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-slate-800/80 dark:border-white/10 bg-[#0B0F17] relative overflow-hidden shadow-2xl text-white">
            {/* Ambient background glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle orange ambient wave lines in background */}
            <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-25 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 150" fill="none">
                <path
                  d="M 0 100 Q 100 40 200 90 T 400 60"
                  stroke="#FF6D00"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 120 Q 120 70 240 110 T 400 80"
                  stroke="#FF8A00"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6D00]/10 border border-[#FF6D00]/25 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
                  THE IMPACT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Real Results. <br />
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  Lasting Growth.
                </span>
              </h2>
            </div>

            {/* 4 Numbers in attractive, distinct cards with counting animation (2x2 grid) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6 sm:my-8 relative z-10">
              {METRICS.map((m) => {
                const Icon = m.icon
                return (
                  <motion.div
                    key={m.label}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF6D00]/60 shadow-lg hover:shadow-[#FF6D00]/15 transition-all duration-300 overflow-hidden backdrop-blur-md flex flex-col justify-between"
                  >
                    {/* Corner accent glow */}
                    <div className="absolute -top-8 -right-8 w-20 h-20 bg-[#FF6D00]/10 rounded-full blur-xl group-hover:bg-[#FF6D00]/25 transition-all duration-500 pointer-events-none" />

                    {/* Top row with icon badge & micro indicator */}
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-[#FF6D00]/10 border border-[#FF6D00]/25 flex items-center justify-center text-[#FF6D00] group-hover:bg-[#FF6D00] group-hover:text-black transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#FF6D00] transition-colors" />
                    </div>

                    {/* Animated Count-Up Number */}
                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#FF6D00] flex items-baseline">
                        <CountUp
                          end={m.value}
                          duration={2.4}
                          separator={m.separator || ''}
                          enableScrollSpy={true}
                          scrollSpyOnce={true}
                        />
                        <span className="text-[#FF8A00] ml-0.5">{m.suffix}</span>
                      </div>

                      {/* Label & Caption */}
                      <div className="text-xs font-bold text-white uppercase tracking-wider mt-1.5 leading-snug">
                        {m.label}
                      </div>
                      <div className="text-[10px] font-mono text-white/50 tracking-wide mt-0.5">
                        {m.caption}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-white/50 relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] animate-pulse" />
                AUDITED GLOBAL REVENUE IMPACT
              </span>
              <span className="text-white/30 hidden sm:inline">2026 VERIFIED</span>
            </div>
          </div>

          {/* ══════════ RIGHT HALF: INDUSTRIES WE SERVE (HIGH-PERFORMANCE B2B) (7 cols) ══════════ */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800/80 dark:border-white/10 bg-[#0B0F17] p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient background glow - brand blue accent */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header of Industries box */}
            <div className="relative z-10 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/25 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A6FF]">
                  INDUSTRIES WE SERVE
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                    Built for Modern <br />
                    <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                      B2B Teams.
                    </span>
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-white/60 max-w-xs leading-relaxed">
                  Specialized ICP intent signals, custom contact filters, and dedicated outbound campaigns tailored for your vertical.
                </p>
              </div>
            </div>

            {/* 8-Box Grid (4 cols x 2 rows) - Attractive, balanced cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-4 relative z-10">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon

                return (
                  <motion.div
                    key={ind.name}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-2xl border border-white/10 hover:border-[#00A6FF]/60 bg-white/[0.04] hover:bg-white/[0.08] hover:shadow-lg hover:shadow-[#00A6FF]/15 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden backdrop-blur-md"
                  >
                    {/* Micro corner highlight */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#00A6FF]/10 rounded-full blur-xl group-hover:bg-[#00A6FF]/25 transition-all pointer-events-none" />

                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="w-9 h-9 rounded-xl bg-[#00A6FF]/10 border border-[#00A6FF]/25 flex items-center justify-center text-[#00A6FF] group-hover:bg-[#00A6FF] group-hover:border-[#00A6FF] group-hover:text-black transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00A6FF] transition-colors" />
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00A6FF] transition-colors tracking-tight leading-snug">
                        {ind.name}
                      </h4>
                      <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase mt-1">
                        {ind.tag}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom Footer Badge */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-white/50 relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
                ENTERPRISE-GRADE ICP TARGETING
              </span>
              <span className="text-white/30 hidden sm:inline">MULTI-SECTOR COVERAGE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
