import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
} from 'lucide-react'

const METRICS = [
  { num: '10M+', label: 'Leads Generated' },
  { num: '1,500+', label: 'Clients' },
  { num: '2,100+', label: 'Monthly Leads' },
  { num: '16+', label: 'Sectors' },
]

const INDUSTRIES = [
  { name: 'SaaS', icon: Laptop },
  { name: 'Technology', icon: Cpu },
  { name: 'IT Services', icon: Server },
  { name: 'Cybersecurity', icon: Shield },
  { name: 'Cloud', icon: Cloud },
  { name: 'Telecom', icon: Radio },
  { name: 'Professional Services', icon: Briefcase },
  { name: 'Enterprise Solutions', icon: Building },
]

export default function ReferenceImpactIndustries() {
  const navigate = useNavigate()

  return (
    <section
      id="impact-industries-section"
      className="relative py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 overflow-hidden select-none transition-colors duration-300"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-4 h-[2px] bg-[#FF6D00]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
              PROVEN EXPERTISE & IMPACT
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.15]">
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
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-slate-800 dark:border-white/10 bg-slate-950 dark:bg-[#0B0F17]/60 backdrop-blur-xl relative overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-none text-white">
            {/* Subtle orange ambient wave lines in background */}
            <div className="absolute -bottom-10 left-0 right-0 h-40 opacity-30 pointer-events-none">
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
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-4 h-[2px] bg-[#FF6D00]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
                  THE IMPACT
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Real Results. <br />
                Lasting Growth.
              </h2>
            </div>

            {/* 4 Numbers in a clean 2x2 or 4-item horizontal row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 my-8 relative z-10">
              {METRICS.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-[#FF6D00] tracking-tight">
                    {m.num}
                  </div>
                  <div className="text-[11px] font-mono text-white/60 uppercase tracking-wider mt-1 leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-white/40 pt-4 border-t border-white/10">
              AUDITED GLOBAL REVENUE IMPACT
            </div>
          </div>

          {/* ══════════ RIGHT HALF: INDUSTRIES WE SERVE (LIGHT/DARK ADAPTABLE) (7 cols) ══════════ */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0F17] p-6 sm:p-8 text-[#0F172A] dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between transition-colors duration-300">
            {/* Header of Industries box */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/10 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-4 h-[2px] bg-[#FF6D00]" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                    INDUSTRIES WE SERVE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Built for Modern B2B Teams
                </h3>
              </div>

              <button
                onClick={() => navigate('/industries')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-white/70 hover:text-[#FF6D00] dark:hover:text-[#FF6D00] transition-colors cursor-pointer group"
              >
                <span>View All Industries</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 8-Box Grid (4 cols x 2 rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {INDUSTRIES.map((ind) => {
                const Icon = ind.icon

                return (
                  <div
                    key={ind.name}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] hover:bg-white dark:hover:bg-white/[0.08] hover:border-[#FF6D00] dark:hover:border-[#FF6D00] hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/80 group-hover:bg-[#FF6D00] group-hover:border-[#FF6D00] group-hover:text-black transition-colors mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white/80 group-hover:text-slate-950 dark:group-hover:text-white tracking-tight">
                      {ind.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
