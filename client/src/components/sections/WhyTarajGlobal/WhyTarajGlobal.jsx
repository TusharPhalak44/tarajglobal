import React, { useState } from 'react'
import { Target, Database, ArrowUpRight, Layers, TrendingUp } from 'lucide-react'
import AnimatedGrid from '@components/animations/AnimatedGrid'

const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'AI-Powered Audience Intelligence',
    description: 'Pinpoint active buying committees with automated market mapping. Our tech stack isolates high-value accounts and decision-maker personas across US, EMEA, and APAC markets with total precision.',
    icon: Target,
  },
  {
    num: '02',
    title: 'In-House Verification Tooling',
    description: 'Eliminate zero-bounce risks and dead dials. Every contact passes through our custom post-research verification engine, validating direct phones and active email deliverability to enforce a 99.8% SLA.',
    icon: Database,
  },
  {
    num: '03',
    title: 'Real-Time Buyer Intent Telemetry',
    description: 'Capture active buying signals before your competitors do. Our system continuously monitors prospect intent metrics, ensuring your outreach engages accounts right when they enter an active buying cycle.',
    icon: ArrowUpRight,
  },
  {
    num: '04',
    title: 'Live Client Portal & Fast Iteration',
    description: ' Monitor pipeline performance in real time. Gain single-pane visibility through our dedicated client portal—offering instant lead alerts, transparent campaign telemetry, and rapid turnaround SLAs.',
    icon: Layers,
  },
  {
    num: '05',
    title: 'Unified CRM Pipeline Delivery',
    description: 'Scale campaigns seamlessly across global regions without operational bottlenecks. Every verified, sales-ready opportunity routes directly into your existing CRM ecosystem (Salesforce, HubSpot, APIs).',
    icon: TrendingUp,
  },
]

export default function WhyTarajGlobal() {
  // Default active card is index 3 (Card 04: Multi-Channel Engagement) matching the reference design
  const [activeIdx, setActiveIdx] = useState(3)

  return (
    <section
      id="why-taraj"
      className="relative bg-[#070B14] py-12 sm:py-14 lg:py-16 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="why-heading"
    >
      {/* ── Background Ambient Radial Glow & Coordinate Grid ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[340px] rounded-full bg-[#00A6FF]/[0.06] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[250px] rounded-full bg-[#FF6D00]/[0.04] blur-[130px]" />
      </div>

      <AnimatedGrid size={64} opacity={0.03} />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow matching the site's brand styling */}
          <div className="inline-flex items-center justify-center mb-2.5 sm:mb-3">
            <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
              WHY TARAJ GLOBAL
            </p>
          </div>

          {/* Headline matching screenshot */}
          <h2
            id="why-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.03em] leading-tight text-white"
          >
            Why B2B Leaders Choose Our {' '}
            <span className="text-[#00A6FF]">Tech-Powered {' '}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA600] to-[#FF6D00]">
              Engine
            </span>
          </h2>

          {/* Centered Small Gradient Bar Accent */}
          <div className="w-16 h-[3px] mx-auto rounded-full bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] mt-3.5" />
        </div>

        {/* ── 5 Connected Strategic Capability Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon
            const isActive = activeIdx === idx

            return (
              <div
                key={item.num}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-5 sm:p-5.5 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${isActive
                  ? 'border-[#00A6FF]/70 bg-[#0A1224]/95 shadow-[0_0_35px_rgba(0,166,255,0.22)] ring-1 ring-[#00A6FF]/40 -translate-y-1'
                  : 'border-white/10 bg-[#080D1A]/90 hover:border-white/25 hover:bg-[#090F20]'
                  }`}
              >
                {/* Active Card Corner Tech Circuit Lines Overlay */}
                {isActive && (
                  <>
                    <svg
                      className="absolute top-2 right-2 w-16 h-16 pointer-events-none opacity-40 text-[#00A6FF]"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <path d="M 60 16 L 40 16 L 32 8 L 14 8" stroke="currentColor" strokeWidth="0.8" />
                      <circle cx="40" cy="16" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="8" r="1.5" fill="currentColor" />
                    </svg>
                    <svg
                      className="absolute bottom-2 left-2 w-16 h-16 pointer-events-none opacity-40 text-[#00A6FF]"
                      viewBox="0 0 60 60"
                      fill="none"
                    >
                      <path d="M 0 44 L 20 44 L 28 52 L 46 52" stroke="currentColor" strokeWidth="0.8" />
                      <circle cx="20" cy="44" r="1.5" fill="currentColor" />
                      <circle cx="46" cy="52" r="1.5" fill="currentColor" />
                    </svg>
                  </>
                )}

                <div>
                  {/* Top Row: Circular Icon Badge & Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-[#00A6FF] text-white shadow-[0_0_18px_rgba(0,166,255,0.55)] scale-105'
                        : 'border border-[#00A6FF]/35 bg-[#00A6FF]/10 text-[#00A6FF] group-hover:border-[#00A6FF]/60'
                        }`}
                    >
                      <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <span
                      className={`font-mono text-xs sm:text-[13px] font-bold transition-colors ${isActive ? 'text-[#00A6FF]' : 'text-slate-500'
                        }`}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-sm sm:text-base font-bold tracking-tight mb-2.5 leading-snug transition-colors duration-200 ${isActive ? 'text-[#00A6FF]' : 'text-white group-hover:text-slate-100'
                      }`}
                  >
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-[12.5px] leading-relaxed text-slate-400 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* ── Bottom Section Accent Indicator ─── */}
                <div className="mt-5">
                  {isActive ? (
                    /* Active Tech Circuit Trace with Glowing Cyan-to-Orange Bar */
                    <div className="relative pt-1 flex items-center">
                      <svg className="w-full h-4 text-slate-500/50" viewBox="0 0 200 16" fill="none">
                        {/* Side circuit branching lines */}
                        <path d="M 0 8 L 20 8 L 28 3 L 50 3" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
                        <circle cx="20" cy="8" r="1.5" fill="currentColor" fillOpacity="0.6" />

                        {/* Central Glowing Active Gradient Bar */}
                        <path d="M 12 8 L 188 8" stroke="url(#circuitBarGrad)" strokeWidth="2" strokeLinecap="round" />

                        <path d="M 150 13 L 172 13 L 180 8 L 200 8" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
                        <circle cx="172" cy="13" r="1.5" fill="currentColor" fillOpacity="0.6" />

                        <defs>
                          <linearGradient id="circuitBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00A6FF" />
                            <stop offset="60%" stopColor="#38BDF8" />
                            <stop offset="100%" stopColor="#FF6D00" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    /* Default Inactive Subtle Accent Pill */
                    <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] opacity-80 group-hover:w-12 transition-all duration-300" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
