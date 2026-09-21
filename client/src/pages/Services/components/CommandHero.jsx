import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Crosshair, CheckCircle2, MessageSquare, Award, Sparkles, Activity } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CommandPrimaryButton, CommandSecondaryButton } from './CommandButtons'

/**
 * CommandHero — 01 HERO SECTION
 * "B2B GROWTH COMMAND CENTER"
 * Left 55%: Eyebrow "TAJAR GLOBAL / OUR SERVICES", Large heading, SEO narrative, CTA.
 * Right 45%: Interactive circular command-center visual.
 * Center: TARAJ GLOBAL.
 * 5 connected nodes: RESEARCH, TARGET, QUALIFY, ENGAGE, OPPORTUNITY.
 * Thin connecting lines, cursor hover activates node, lines glow, node scales.
 */

const STAGES = [
  { id: 'research', label: 'RESEARCH', icon: Search, angle: -90, metric: 'ICP & Tech Stack' },
  { id: 'target', label: 'TARGET', icon: Crosshair, angle: -18, metric: 'Decision-Makers' },
  { id: 'qualify', label: 'QUALIFY', icon: CheckCircle2, angle: 54, metric: 'BANT & SQL SLA' },
  { id: 'engage', label: 'ENGAGE', icon: MessageSquare, angle: 126, metric: 'Multi-Touch' },
  { id: 'opportunity', label: 'OPPORTUNITY', icon: Award, angle: 198, metric: 'Closed Pipeline' },
]

export default function CommandHero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStage, setActiveStage] = useState(0)

  const handleScrollToOrbit = () => {
    const el = document.getElementById('service-orbit')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Radius for the circular nodes (desktop 135px)
  const radius = 130

  return (
    <section
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FFFFFF',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Subtle Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ══ LEFT 55%: Editorial Statement & CTAs ══ */}
          <div className="lg:col-span-7">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-6"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" style={{ color: isDark ? '#38BDF8' : '#0284C7' }} />
              <span
                className="font-mono text-xs font-bold tracking-widest uppercase"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                TAJAR GLOBAL / OUR SERVICES
              </span>
            </div>

            {/* Large Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
            >
              Everything You Need to Build a{' '}
              <span
                className="relative inline-block underline decoration-sky-500 decoration-2 underline-offset-8"
                style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
              >
                Stronger B2B Pipeline
              </span>
            </h1>

            {/* Supporting Copy using existing SEO content */}
            <p
              className="text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-xl"
              style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
            >
              From targeted demand generation and multi-channel ABM to verified sales-qualified appointments, Taraj Global acts as your end-to-end B2B growth engine. We turn market demand into predictable revenue pipeline.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <CommandPrimaryButton to="/contact">
                START A CONVERSATION →
              </CommandPrimaryButton>
              <CommandSecondaryButton onClick={handleScrollToOrbit}>
                EXPLORE SERVICES
              </CommandSecondaryButton>
            </div>

            {/* Telemetry Bar */}
            <div
              className="pt-6 border-t flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono"
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
            >
              <div>
                <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>ACCURACY SLA: </span>
                <span className="font-bold" style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>99.8%</span>
              </div>
              <div>
                <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>SHOW-RATE: </span>
                <span className="font-bold" style={{ color: isDark ? '#38BDF8' : '#0284C7' }}>85%+</span>
              </div>
              <div>
                <span style={{ color: isDark ? '#64748B' : '#94A3B8' }}>EXECUTION: </span>
                <span className="font-bold" style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}>HUMAN VERIFIED</span>
              </div>
            </div>
          </div>

          {/* ══ RIGHT 45%: Circular Command-Center Visual ══ */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center select-none"
            >
              {/* Outer Orbit Guide Rings */}
              <div
                className="absolute inset-0 rounded-full border border-dashed pointer-events-none transition-colors duration-300"
                style={{
                  borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.2)',
                }}
              />
              <div
                className="absolute w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] rounded-full border pointer-events-none"
                style={{
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                }}
              />

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {STAGES.map((stage, idx) => {
                  const rad = (stage.angle * Math.PI) / 180
                  const cx = 200 // center based on 400x400 viewBox
                  const cy = 200
                  const x = cx + radius * Math.cos(rad)
                  const y = cy + radius * Math.sin(rad)
                  const isActive = activeStage === idx

                  return (
                    <line
                      key={stage.id}
                      x1={cx}
                      y1={cy}
                      x2={x}
                      y2={y}
                      stroke={isActive ? (isDark ? '#38BDF8' : '#0284C7') : (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)')}
                      strokeWidth={isActive ? '2' : '1'}
                      strokeDasharray={isActive ? 'none' : '4 4'}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>

              {/* Central Core: TARAJ GLOBAL */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full border flex flex-col items-center justify-center p-3 text-center shadow-lg backdrop-blur-md cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
                  borderColor: isDark ? '#38BDF8' : '#0284C7',
                  boxShadow: isDark ? '0 0 30px rgba(56, 189, 248, 0.2)' : '0 10px 25px rgba(2, 132, 199, 0.12)',
                }}
              >
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-sky-500 mb-0.5">
                  COMMAND
                </span>
                <span
                  className="font-bold text-xs sm:text-sm tracking-tight leading-tight"
                  style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
                >
                  TARAJ
                  <br />
                  GLOBAL
                </span>
                <span
                  className="mt-1 text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border"
                  style={{
                    backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                    borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)',
                    color: isDark ? '#38BDF8' : '#0284C7',
                  }}
                >
                  {STAGES[activeStage].label}
                </span>
              </motion.div>

              {/* 5 Surrounding Circular Nodes */}
              {STAGES.map((stage, idx) => {
                const rad = (stage.angle * Math.PI) / 180
                // Convert to percentage offset from center
                const xOffset = Math.cos(rad) * (radius * 0.9)
                const yOffset = Math.sin(rad) * (radius * 0.9)
                const isActive = activeStage === idx
                const Icon = stage.icon

                return (
                  <div
                    key={stage.id}
                    onMouseEnter={() => setActiveStage(idx)}
                    onClick={() => setActiveStage(idx)}
                    style={{
                      transform: `translate(${xOffset}px, ${yOffset}px)`,
                    }}
                    className="absolute z-30 flex flex-col items-center cursor-pointer transition-transform duration-300"
                  >
                    {/* Small Circular Node */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'scale-115 shadow-md' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? '#111622' : '#F8FAFC',
                        borderColor: isActive
                          ? isDark ? '#38BDF8' : '#0284C7'
                          : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)',
                        color: isActive
                          ? isDark ? '#0B0F19' : '#FFFFFF'
                          : isDark ? '#94A3B8' : '#64748B',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Node Label */}
                    <span
                      className={`mt-1 font-mono text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? isDark ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-sky-50 text-sky-700 border border-sky-200'
                          : isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {stage.label}
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
