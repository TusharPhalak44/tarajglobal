import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Filter, Users, CheckCircle2, ChevronRight } from 'lucide-react'

const stages = [
  {
    id: 'scatter',
    label: 'RAW TAM SCATTER',
    subtitle: '100,000+ Unfiltered Market Entities',
    desc: 'Unorganized marketplace data with incomplete records, outdated titles, and low response rates.',
  },
  {
    id: 'companies',
    label: '01 COMPANIES',
    subtitle: '18,500 Target Accounts',
    desc: 'Firmographic filtering: revenue thresholds, employee size, industry verticals, and headquarters geography.',
  },
  {
    id: 'contacts',
    label: '02 CONTACTS',
    subtitle: '42,000 Verified Corporate Inboxes',
    desc: 'Verified email deliverability, direct dials, and active corporate domain security records.',
  },
  {
    id: 'decision',
    label: '03 DECISION-MAKERS',
    subtitle: '7,800 Buying Committee Stakeholders',
    desc: 'VPs, Directors, and C-Suite officers with direct fiscal budget and procurement sign-off.',
  },
  {
    id: 'pipeline',
    label: '04 QUALIFIED ACCOUNTS',
    subtitle: 'High-Velocity Sales Pipeline',
    desc: 'Sales-ready opportunities entering your reps’ direct meeting calendar with verified purchase intent.',
  },
]

export const GalleryDataViz = () => {
  const [activeStage, setActiveStage] = useState(0)

  // Subtle auto-advance every 4 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Dot coordinates calculated per stage
  const getDotPosition = (index, total) => {
    // Random scatter baseline
    if (activeStage === 0) {
      const seed = (index * 9301 + 49297) % 233280
      const rndX = (seed / 233280) * 800 + 50
      const rndY = (((seed * 7) % 233280) / 233280) * 320 + 40
      return { x: rndX, y: rndY, color: 'text-border' }
    }

    // Stage 1: Companies (Organized in 3 horizontal tiers across the top)
    if (activeStage === 1) {
      const col = index % 25
      const row = Math.floor(index / 25)
      const x = 80 + col * 30
      const y = 60 + (row % 4) * 20
      return { x, y, color: 'text-text-muted' }
    }

    // Stage 2: Contacts (Dense clusters in the middle)
    if (activeStage === 2) {
      const col = index % 20
      const row = Math.floor(index / 20)
      const x = 150 + col * 32
      const y = 140 + (row % 3) * 25
      return { x, y, color: 'text-primary/70' }
    }

    // Stage 3: Decision-Makers (Narrowing focused band)
    if (activeStage === 3) {
      const col = index % 14
      const row = Math.floor(index / 14)
      const x = 240 + col * 35
      const y = 220 + (row % 2) * 25
      return { x, y, color: 'text-primary' }
    }

    // Stage 4: Qualified Accounts (Streamlined funnel path entering pipeline)
    const funnelWidth = Math.max(80, 500 - (index / total) * 400)
    const x = 450 + (Math.sin(index) * funnelWidth) * 0.5
    const y = 80 + (index / total) * 240
    return { x, y, color: 'text-primary' }
  }

  const dotCount = 80

  return (
    <section
      id="data-viz"
      className="relative py-28 md:py-36 px-6 md:px-14 lg:px-20 bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 08 // DATA VISUALIZATION]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-[0.98]">
              DATA THAT MOVES WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                YOUR STRATEGY.
              </span>
            </h2>
          </div>
          <div className="max-w-sm text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Watch hundreds of raw market entities compress, validate, and organize into high-conversion sales pipeline.
          </div>
        </div>

        {/* STAGE SELECTOR TABS */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border/40 pb-4">
          {stages.map((stg, i) => (
            <button
              key={stg.id}
              type="button"
              onClick={() => setActiveStage(i)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 border ${
                activeStage === i
                  ? 'bg-primary text-black border-primary font-bold shadow-md'
                  : 'bg-surface/50 text-text-muted border-border/60 hover:border-primary/50'
              }`}
            >
              {stg.label}
            </button>
          ))}
        </div>

        {/* VISUALIZATION CANVAS */}
        <div className="relative rounded-3xl border border-border/80 bg-surface/40 p-6 md:p-10 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-8 font-mono text-xs">
            <div>
              <span className="text-primary uppercase font-bold">{stages[activeStage].label}</span>
              <span className="text-text-muted mx-2">•</span>
              <span className="text-text-secondary">{stages[activeStage].subtitle}</span>
            </div>
            <p className="text-text-muted max-w-md font-sans text-xs">
              {stages[activeStage].desc}
            </p>
          </div>

          {/* Dynamic SVG Dot Matrix Funnel */}
          <div className="w-full h-80 md:h-96 relative flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 900 380"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Reference Grid lines */}
              <line x1="100" y1="90" x2="800" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-border/30" strokeDasharray="3 3" />
              <line x1="100" y1="180" x2="800" y2="180" stroke="currentColor" strokeWidth="0.5" className="text-border/30" strokeDasharray="3 3" />
              <line x1="100" y1="270" x2="800" y2="270" stroke="currentColor" strokeWidth="0.5" className="text-border/30" strokeDasharray="3 3" />

              {/* Labels on SVG */}
              <text x="30" y="95" className="fill-text-muted font-mono text-[10px] tracking-widest uppercase">TIER 01 // TAM</text>
              <text x="30" y="185" className="fill-text-muted font-mono text-[10px] tracking-widest uppercase">TIER 02 // CONTACTS</text>
              <text x="30" y="275" className="fill-text-muted font-mono text-[10px] tracking-widest uppercase">TIER 03 // BUYERS</text>

              {/* Dynamic Animated Dots */}
              {Array.from({ length: dotCount }).map((_, i) => {
                const pos = getDotPosition(i, dotCount)
                return (
                  <circle
                    key={i}
                    cx={pos.x}
                    cy={pos.y}
                    r={activeStage === 4 ? 4 : 3}
                    className={`${pos.color} fill-current transition-all duration-700 ease-out`}
                  />
                )
              })}

              {/* Target Hub in Stage 4 */}
              {activeStage === 4 && (
                <g className="transition-all duration-700">
                  <circle cx="450" cy="320" r="18" className="fill-primary/20 animate-ping" />
                  <circle cx="450" cy="320" r="12" className="fill-primary" />
                  <text x="450" y="360" textAnchor="middle" className="fill-primary font-mono text-xs font-bold uppercase tracking-wider">
                    CONFIRMED PIPELINE
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <span className="text-text-muted block text-[10px] uppercase">DATA ACCURACY</span>
              <span className="text-text-primary font-bold">99.8% VERIFIED SLA</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase">BOUNCE RATE</span>
              <span className="text-emerald-400 font-bold">&lt; 1.5% ZERO-BOUNCE</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase">COMPLIANCE</span>
              <span className="text-text-primary font-bold">100% GDPR & CCPA</span>
            </div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase">CONVERSION VELOCITY</span>
              <span className="text-primary font-bold">3.4X FASTER CYCLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryDataViz
