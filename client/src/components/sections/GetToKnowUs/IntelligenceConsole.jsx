import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react'
import { GrowthStageSelector } from './GrowthStageSelector'
import { IntelligenceVisualization } from './IntelligenceVisualization'
import { GrowthMetrics } from './GrowthMetrics'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/**
 * IntelligenceConsole
 * Main Command Center Control Surface embedded inside the website.
 * Contains:
 * - Left Control Rail (Stage Selector)
 * - Center Dynamic Intelligence Visualization (Audience -> Data -> Pipeline)
 * - Right-Side Live Metrics & Telemetry Readouts
 */
export const IntelligenceConsole = () => {
  const [activeStage, setActiveStage] = useState('01')
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const stages = [
    {
      id: '01',
      number: '01',
      label: 'AUDIENCE INTEL',
      statement: 'TAM MAPPED',
      desc: 'Precision ICP identification & buying committee calibration',
      metric: '100%',
      metricLabel: 'ICP PRECISION',
    },
    {
      id: '02',
      number: '02',
      label: 'VERIFIED DATA',
      statement: 'DIRECT DIALS',
      desc: 'Multi-pass direct-dial verification & zero re-syndication SLA',
      metric: '99.8%',
      metricLabel: 'ACCURACY',
    },
    {
      id: '03',
      number: '03',
      label: 'FULL FUNNEL',
      statement: 'PIPELINE WON',
      desc: 'Closed-loop demand generation & executive appointment setting',
      metric: 'GROWTH',
      metricLabel: 'PREDICTABLE',
    },
  ]

  // Auto-rotation every 5 seconds (5000ms), paused when user hovers
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return

    const intervalTime = 50 // Update progress every 50ms
    const totalDuration = 5000 // 5 seconds

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next stage
          setActiveStage((curr) => {
            if (curr === '01') return '02'
            if (curr === '02') return '03'
            return '01'
          })
          return 0
        }
        return prev + (intervalTime / totalDuration) * 100
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused, prefersReducedMotion])

  const handleSelectStage = (stageId) => {
    setActiveStage(stageId)
    setProgress(0)
  }

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full rounded-3xl bg-[#090C16]/95 border border-slate-800/90 shadow-2xl backdrop-blur-2xl p-4 sm:p-6 lg:p-8 overflow-hidden select-none"
    >
      {/* ── Technical Corner Bracket Accents ────────────────────────── */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/25 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/25 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/25 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/25 rounded-br-sm pointer-events-none" />

      {/* ── Top Console HUD Bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2.5 mb-6 rounded-2xl bg-[#06080F]/90 border border-slate-800/80 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-2.5">
          <Terminal size={13} className="text-[#00E5FF]" />
          <span className="text-white font-bold tracking-widest uppercase">
            GROWTH INTELLIGENCE CONSOLE // v3.4 ACTIVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>PIPELINE TELEMETRY: <strong className="text-emerald-400">OPTIMAL</strong></span>
          <span className="hidden md:inline-block">SLA: <strong className="text-primary">100% VALIDATED</strong></span>
          <span>LATENCY: <strong className="text-cta">8ms</strong></span>
        </div>
      </div>

      {/* ── Console 3-Column Interface (Desktop) / Stacked (Mobile) ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Control Rail (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <GrowthStageSelector
            stages={stages}
            activeStage={activeStage}
            onSelectStage={handleSelectStage}
            progress={progress}
          />
        </div>

        {/* Center Dynamic Intelligence Visualization (Span 5) */}
        <div className="lg:col-span-5 flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
          <IntelligenceVisualization activeStage={activeStage} />
        </div>

        {/* Right-Side Metrics & Telemetry Readouts (Span 3) */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <GrowthMetrics activeStage={activeStage} />
        </div>

      </div>

      {/* ── Bottom Console Status Strip ─────────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">INFRASTRUCTURE STATUS:</span>
          <span className="text-emerald-400 font-bold">ALL SYSTEMS LIVE &amp; CALIBRATED</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">AUTO-CYCLE: {isPaused ? 'PAUSED' : 'ACTIVE'}</span>
          <span className="text-primary font-bold">TARAJ GLOBAL PROPRIETARY PIPELINE</span>
        </div>
      </div>

    </div>
  )
}

export default IntelligenceConsole
