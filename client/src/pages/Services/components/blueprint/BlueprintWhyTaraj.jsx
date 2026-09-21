import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'Quality-First Data',
    subtitle: 'Accurate. Relevant. Actionable.',
    desc: 'We verify every contact through multi-step automated pings, SMTP handshakes, and phone validation to ensure 98%+ deliverability.',
  },
  {
    num: '02',
    title: 'Targeted Decision-Makers',
    subtitle: 'Reach the right people, not just more people.',
    desc: 'Laser-focused account selection aligned with your Ideal Customer Profile (ICP) and org chart buying committees.',
  },
  {
    num: '03',
    title: 'Data-Driven Campaigns',
    subtitle: 'Strategies backed by real buyer insights.',
    desc: 'We analyze real-time purchase intent signals, tech-stack triggers, and funding milestones to strike when buyers are in-market.',
  },
  {
    num: '04',
    title: 'Transparent Execution',
    subtitle: 'Clear process. Measurable results.',
    desc: 'Live telemetry reporting, CRM auto-synchronization, and strict contractual replacement guarantees on all delivered leads.',
  },
  {
    num: '05',
    title: 'Dedicated Support',
    subtitle: 'A team that’s with you every step.',
    desc: 'Direct access to senior SDRs, account strategists, and data researchers focused solely on maximizing your pipeline ROI.',
  },
]

export default function BlueprintWhyTaraj() {
  const [hoveredIdx, setHoveredIdx] = useState(0)

  return (
    <section
      id="why-taraj-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                WHY TARAJ GLOBAL
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Why Businesses <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Choose TaRaj Global
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Five operational principles that separate our revenue engine from conventional lead brokers.
          </p>
        </div>

        {/* ══════════ HORIZONTAL EDITORIAL LIST ══════════ */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {PILLARS.map((pillar, idx) => {
            const isHovered = hoveredIdx === idx

            return (
              <div
                key={pillar.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative py-10 sm:py-12 px-4 sm:px-8 transition-all duration-300 cursor-pointer ${
                  isHovered ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.01]'
                }`}
              >
                {/* Active Orange Left Bar */}
                {isHovered && (
                  <motion.div
                    layoutId="whyTarajActiveLine"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF6D00] shadow-[0_0_12px_rgba(255,109,0,0.8)]"
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Number + Title (6 cols) */}
                  <div className="lg:col-span-6 flex items-baseline gap-6 sm:gap-10">
                    <span
                      className={`font-mono text-base font-bold transition-colors ${
                        isHovered ? 'text-[#FF6D00]' : 'text-white/30'
                      }`}
                    >
                      {pillar.num}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-colors ${
                          isHovered ? 'text-white' : 'text-white/80'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono text-[#FF6D00] block mt-1">
                        // {pillar.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Narrative Description (6 cols) */}
                  <div className="lg:col-span-6 flex items-center justify-between gap-6">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed transition-all ${
                        isHovered ? 'text-white/90' : 'text-white/50'
                      }`}
                    >
                      {pillar.desc}
                    </p>
                    <ArrowRight
                      className={`w-4 h-4 text-[#FF6D00] shrink-0 transition-transform hidden sm:block ${
                        isHovered ? 'translate-x-1 opacity-100' : 'opacity-20'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
