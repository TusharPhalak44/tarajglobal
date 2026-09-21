import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const INDUSTRIES = [
  {
    num: '01',
    name: 'SaaS & Cloud Platforms',
    roles: 'VP Product, Head of Cloud, VP Engineering, CTO',
    focus: 'ARR Scaling & Free-to-Paid Expansion',
  },
  {
    num: '02',
    name: 'Cybersecurity & InfoSec',
    roles: 'CISO, VP SecOps, Director IT Security, CIO',
    focus: 'Threat Intel, Zero-Trust, Compliance Buying Cycles',
  },
  {
    num: '03',
    name: 'Enterprise IT & Managed Services',
    roles: 'CIO, VP Infrastructure, Director IT Operations',
    focus: 'Digital Transformation & Multi-Cloud Migration',
  },
  {
    num: '04',
    name: 'Fintech & Payment Infrastructure',
    roles: 'Chief Risk Officer, Head of Fraud, VP FinTech Partnerships',
    focus: 'Transaction Volume & Core Banking Integration',
  },
  {
    num: '05',
    name: 'Telecommunications & Networks',
    roles: 'VP Network Architecture, Director Telecom Sourcing',
    focus: 'Edge Compute, 5G Infrastructure & Carrier Connectivity',
  },
  {
    num: '06',
    name: 'Consulting & Professional Services',
    roles: 'Managing Partner, Practice Leader, Chief Strategy Officer',
    focus: 'High-Ticket Enterprise Advisory Retainers',
  },
]

export default function ExperienceIndustries() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section
      id="industries-section"
      className="relative py-24 lg:py-32 bg-[#05070B] text-white border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                VERTICAL SPECIALIZATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Industries We Power <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Across Global Markets
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md">
            Our pipeline specialists speak your industry's exact technical dialect, navigating complex enterprise sales cycles with credibility.
          </p>
        </div>

        {/* ══════════ FULL-WIDTH TYPOGRAPHY ROWS (NO CARDS) ══════════ */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {INDUSTRIES.map((ind, idx) => {
            const isHovered = hoveredIdx === idx
            const isAnyHovered = hoveredIdx !== null && !isHovered

            return (
              <div
                key={ind.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`py-8 sm:py-10 px-4 sm:px-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group ${
                  isHovered
                    ? 'bg-white/[0.04] scale-[1.01]'
                    : isAnyHovered
                    ? 'opacity-30'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                {/* Left: Number + Industry Name */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold transition-colors ${
                      isHovered ? 'text-[#FF6D00]' : 'text-white/40'
                    }`}
                  >
                    {ind.num}
                  </span>
                  <span
                    className={`text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight transition-colors ${
                      isHovered ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {ind.name}
                  </span>
                </div>

                {/* Right: Target Titles & Focus */}
                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-mono text-[#FF6D00] block uppercase tracking-wider">
                      {ind.focus}
                    </span>
                    <span className="text-[11px] font-mono text-white/50 block mt-0.5">
                      {ind.roles}
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      isHovered
                        ? 'border-[#FF6D00] bg-[#FF6D00] text-black'
                        : 'border-white/10 text-white/40'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
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
