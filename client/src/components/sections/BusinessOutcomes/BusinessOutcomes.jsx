import React, { useState } from 'react'
import { Building2, Database, Target, Rocket, Cpu } from 'lucide-react'
import AnimatedGrid from '@components/animations/AnimatedGrid'

const OUTCOME_METRICS = [
  {
    id: 'experience',
    num: '01',
    value: '12+',
    label: 'EXPERIENCE',
    icon: Building2,
    color: '#FF6D00',
    defaultProgress: 35,
    style: {
      left: '6.6%',
      top: '16.7%',
      width: '19.3%',
    },
    line: {
      d: 'M 186 174 C 205 186, 245 208, 294 214',
      dur: '2.4s',
    },
  },
  {
    id: 'data',
    num: '02',
    value: '2,100+',
    label: 'DATA',
    icon: Database,
    color: '#00A6FF',
    defaultProgress: 45,
    style: {
      left: '27.1%',
      top: '10.2%',
      width: '19.3%',
    },
    line: {
      d: 'M 330 150 C 338 168, 354 184, 362 194',
      dur: '2.1s',
    },
  },
  {
    id: 'targeting',
    num: '03',
    value: '1,500+',
    label: 'TARGETING',
    icon: Target,
    color: '#A855F7',
    defaultProgress: 100,
    style: {
      left: '54.8%',
      top: '10.2%',
      width: '19.5%',
    },
    line: {
      d: 'M 506 150 C 498 168, 482 184, 474 194',
      dur: '1.4s',
    },
  },
  {
    id: 'execution',
    num: '04',
    value: '16+',
    label: 'EXECUTION',
    icon: Rocket,
    color: '#F43F5E',
    defaultProgress: 35,
    style: {
      left: '75.8%',
      top: '17.8%',
      width: '19.3%',
    },
    line: {
      d: 'M 642 178 C 615 196, 550 208, 502 214',
      dur: '2.5s',
    },
  },
]

export const BusinessOutcomes = () => {
  // Default active card is 'targeting' (Card 03 with purple glow) matching the reference design 1:1
  const [activeCardId, setActiveCardId] = useState('targeting')

  return (
    <section
      id="outcomes"
      className="relative bg-[#070B14] py-14 sm:py-16 lg:py-20 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="outcomes-heading"
    >
      {/* ── Background Ambient Radial Lights & Technical Coordinate Grid ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] rounded-full bg-[#00A6FF]/[0.05] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[280px] rounded-full bg-[#A855F7]/[0.05] blur-[130px]" />
      </div>

      <AnimatedGrid size={64} opacity={0.03} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── Left Column: Editorial Vision Copy ─── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Pre-header Eyebrow matching other sections */}
            <div className="mb-3 sm:mb-4">
              <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
                BUSINESS OUTCOMES
              </p>
            </div>

            {/* Headline matching screenshot */}
            <h2
              id="outcomes-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.03em] leading-[1.08] text-white"
            >
              BUILT ON EXPERIENCE
              <span className="block">FOCUSED ON</span>
              <span className="block text-[#00A6FF] drop-shadow-[0_0_25px_rgba(0,166,255,0.4)]">
                OUTCOMES.
              </span>
            </h2>

            {/* Paragraph matching screenshot copy */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-[14.5px] leading-relaxed text-slate-300 font-normal max-w-lg">
              We work with the leading business firms globally to deliver what actually drives them providing consumer leads that increase their sales. We motivate consumers to embrace your business and build a long term relationship with you. We are experienced in creating digital experiences that generate high quality leads that increase the growth of any business.
            </p>
          </div>

          {/* ── Right Column: Exact 818x370 Canvas Architecture ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center w-full">
            <div className="relative w-full aspect-[818/370] min-h-[340px] max-w-[820px] mx-auto select-none">

              {/* Vertical Cyan Light Pillar in Background Grid (matches screenshot exactly at X=135) */}
              <div
                className="absolute w-[2px] bg-gradient-to-b from-transparent via-[#00A6FF]/40 to-transparent blur-[0.5px] pointer-events-none -z-10"
                style={{
                  left: '16.5%',
                  top: '64%',
                  height: '26%',
                }}
              />

              {/* Dynamic SVG Connection Lines matching 818x370 viewBox */}
              <svg
                className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
                viewBox="0 0 818 370"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Glow filter for active beam and traveling energy beads */}
                  <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {OUTCOME_METRICS.map((item) => {
                  const isActive = activeCardId === item.id

                  return (
                    <g key={`svg-stream-${item.id}`}>
                      {/* Inactive Subtle Dotted Line (matches reference screenshot) */}
                      <path
                        d={item.line.d}
                        stroke="rgba(255, 255, 255, 0.18)"
                        strokeWidth="1.2"
                        strokeDasharray="3 4"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Active Illuminated Beam (when card is selected like Card 03 in screenshot) */}
                      {isActive && (
                        <path
                          d={item.line.d}
                          stroke={item.color}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          filter="url(#coreGlow)"
                          fill="none"
                          className="transition-all duration-300"
                        />
                      )}

                      {/* Traveling Energy Bead (matches the orange dot on Line 01 in screenshot) */}
                      <g>
                        <animateMotion
                          path={item.line.d}
                          dur={item.line.dur}
                          repeatCount="indefinite"
                        />
                        {/* Outer Soft Halo */}
                        <circle
                          r={isActive ? 6.5 : 5.5}
                          fill={item.color}
                          opacity={isActive ? 0.5 : 0.45}
                          filter="url(#coreGlow)"
                        />
                        {/* Core Solid Bead */}
                        <circle
                          r={isActive ? 3.5 : 2.8}
                          fill={item.color}
                          opacity={0.95}
                        />
                        {/* Center Hot Spark */}
                        <circle r="1.3" fill="#FFFFFF" />
                      </g>
                    </g>
                  )
                })}
              </svg>

              {/* ── 4 Positioned Capability Cards matching exact screenshot layout ─── */}
              {OUTCOME_METRICS.map((item) => {
                const isActive = activeCardId === item.id
                const Icon = item.icon

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveCardId(item.id)}
                    onMouseEnter={() => setActiveCardId(item.id)}
                    className={`absolute z-10 flex flex-col justify-between rounded-xl sm:rounded-2xl border p-1.5 sm:p-2.5 lg:p-3.5 transition-all duration-300 cursor-pointer backdrop-blur-xl ${isActive
                      ? 'bg-[#0B1020]/95 -translate-y-0.5 sm:-translate-y-1'
                      : 'bg-[#080D1A]/90 hover:bg-[#0B1224]'
                      }`}
                    style={{
                      left: item.style.left,
                      top: item.style.top,
                      width: item.style.width,
                      borderWidth: isActive ? '2px' : '1px',
                      borderColor: isActive ? item.color : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: isActive
                        ? `0 0 28px ${item.color}59, inset 0 0 16px ${item.color}1F`
                        : undefined,
                    }}
                  >
                    {/* Top Row: Icon Badge (left) & Number with dot (right) */}
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                      <div
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md sm:rounded-lg flex items-center justify-center transition-colors shadow-sm shrink-0"
                        style={{
                          backgroundColor: `${item.color}1F`,
                          border: `1px solid ${item.color}4D`,
                          color: item.color,
                        }}
                      >
                        <Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[8px] sm:text-[10px] lg:text-xs font-bold text-slate-400">
                        <span>{item.num}</span>
                        <span
                          className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full transition-colors"
                          style={{
                            backgroundColor: isActive ? item.color : '#64748B',
                            boxShadow: isActive ? `0 0 8px ${item.color}` : undefined,
                          }}
                        />
                      </div>
                    </div>

                    {/* Stat Value */}
                    <div
                      className="text-xs sm:text-lg lg:text-2xl font-black tracking-tight leading-none"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>

                    {/* Stat Label */}
                    <div
                      className={`text-[7px] sm:text-[9.5px] lg:text-[11px] font-mono font-bold uppercase tracking-wider mt-0.5 truncate ${isActive ? 'text-[#A855F7]' : 'text-white'
                        }`}
                    >
                      {item.label}
                    </div>

                    {/* Bottom Full-Width Horizontal Progress Track */}
                    <div className="w-full h-1 sm:h-1.5 rounded-full bg-slate-800/80 overflow-hidden mt-1.5 sm:mt-2.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: isActive ? '100%' : `${item.defaultProgress}%`,
                          backgroundColor: item.color,
                          boxShadow: isActive ? `0 0 10px ${item.color}` : undefined,
                        }}
                      />
                    </div>
                  </div>
                )
              })}

              {/* ── OUTCOME CORE Center Box (positioned matching screenshot 1:1) ─── */}
              <div
                className="absolute z-10 rounded-xl sm:rounded-2xl border border-white/20 bg-[#080D1A]/95 p-2 sm:p-3.5 lg:p-5 backdrop-blur-2xl text-center shadow-[0_0_35px_rgba(0,166,255,0.15)] select-none flex flex-col justify-between items-center"
                style={{
                  left: '36.0%',
                  top: '52.4%',
                  width: '28.0%',
                  height: '34.0%',
                }}
              >
                {/* 4 White Corner L-Brackets (matching screenshot 1:1) */}
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-t-2 border-l-2 border-white/80 pointer-events-none" />
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-t-2 border-r-2 border-white/80 pointer-events-none" />
                <span className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b-2 border-l-2 border-white/80 pointer-events-none" />
                <span className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b-2 border-r-2 border-white/80 pointer-events-none" />

                {/* Pre-header: 🔲 OUTCOME CORE (with microchip Cpu icon) */}
                <div className="inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[7.5px] sm:text-[9.5px] lg:text-[11px] font-mono font-bold tracking-widest text-[#00A6FF] uppercase">
                  <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-[#00A6FF]" />
                  <span>OUTCOME CORE</span>
                </div>

                {/* Main Heading: OUTCOME */}
                <div className="text-xs sm:text-lg lg:text-[24px] font-black text-white tracking-tight leading-none my-0.5">
                  OUTCOME
                </div>

                {/* Subtitle: PIPELINE IMPACT */}
                <div className="text-[7.5px] sm:text-[9.5px] lg:text-xs font-mono font-bold text-[#00A6FF] tracking-[0.16em] leading-snug">
                  PIPELINE IMPACT
                </div>

                {/* Status Badge: CONVERSION ACTIVE */}
                <div className="inline-flex items-center justify-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#05231C]/90 border border-emerald-500/40 text-emerald-400 font-mono text-[6.5px] sm:text-[8.5px] lg:text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)] mt-0.5">
                  CONVERSION ACTIVE
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BusinessOutcomes
