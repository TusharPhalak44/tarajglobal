import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    title: 'DATA-DRIVEN',
    summary: 'Validated Intent Signals & Precision Intelligence',
    detail:
      'We never spray and pray. Every prospect is mapped against behavioral purchase triggers, technographic installations, and verified through multi-step phone and SMTP handshakes.',
  },
  {
    num: '02',
    title: 'TARGETED',
    summary: 'Laser-Focused Account Selection & Committee Mapping',
    detail:
      'We penetrate the entire buying group—from VP champions to C-suite economic buyers—ensuring your value proposition resonates across every decision-maker.',
  },
  {
    num: '03',
    title: 'QUALITY-FOCUSED',
    summary: 'Strict Replacement SLAs & Zero Junk Leads',
    detail:
      'Our contractual replacement guarantee protects your investment. If a delivered lead does not meet agreed BANT criteria or becomes non-responsive, we replace it instantly.',
  },
  {
    num: '04',
    title: 'GROWTH-ORIENTED',
    summary: 'Predictable Outbound Architecture Built to Scale',
    detail:
      'Designed to act as a seamless extension of your internal sales development function, generating a steady, compounding stream of qualified meetings month after month.',
  },
]

export default function ExperienceWhyTaraj() {
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
                OPERATIONAL ADVANTAGE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Why Global Enterprise Teams <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Choose TaRaj Global
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Four foundational operating principles that separate our demand engine from conventional lead brokers.
          </p>
        </div>

        {/* ══════════ 4 HORIZONTAL EXPANDING STATEMENTS ══════════ */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {PILLARS.map((pillar, idx) => {
            const isHovered = hoveredIdx === idx

            return (
              <div
                key={pillar.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative py-10 sm:py-12 px-4 sm:px-8 transition-all duration-500 cursor-pointer ${
                  isHovered ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.01]'
                }`}
              >
                {/* Accent border bar on left */}
                {isHovered && (
                  <motion.div
                    layoutId="pillarAccentLine"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF6D00] shadow-[0_0_12px_rgba(255,109,0,0.8)]"
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Col 1: Number + Title (6 cols) */}
                  <div className="lg:col-span-6 flex items-baseline gap-6 sm:gap-8">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold transition-colors ${
                        isHovered ? 'text-[#FF6D00]' : 'text-white/30'
                      }`}
                    >
                      {pillar.num}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-colors ${
                          isHovered ? 'text-white' : 'text-white/70'
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono text-[#FF6D00] block mt-1">
                        // {pillar.summary}
                      </span>
                    </div>
                  </div>

                  {/* Col 2: Expandable Narrative Copy (6 cols) */}
                  <div className="lg:col-span-6 flex items-center justify-between gap-6">
                    <p
                      className={`text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                        isHovered ? 'text-white/90' : 'text-white/40'
                      }`}
                    >
                      {pillar.detail}
                    </p>

                    <ArrowRight
                      className={`w-5 h-5 text-[#FF6D00] shrink-0 transition-transform duration-300 hidden sm:block ${
                        isHovered ? 'translate-x-2 opacity-100' : 'opacity-20'
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
