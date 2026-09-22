import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Sparkles, Activity } from 'lucide-react'
import { gsap, ScrollTrigger } from '@animations/gsap'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * GrowthSignalField
 * The interactive "Growth Signal Field" installation:
 * - Concentric orbital rings with coordinate ticks
 * - Slow radar signal sweep scanning the field (360deg rotation)
 * - Central "TARGET" focus node (with restrained orange/cyan pulse)
 * - Scattered data nodes & signal points (ICP, DATA, INTENT, SIGNAL, DECISION MAKER, BUYING SIGNAL, PIPELINE)
 * - GSAP ScrollTrigger scrubbed subtle parallax and orbital drift
 */
export const GrowthSignalField = ({ containerRef }) => {
  const fieldRef = useRef(null)
  const sweepRef = useRef(null)
  const ring1Ref = useRef(null)
  const ring2Ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // GSAP ScrollTrigger: Subtle calm rotation & parallax during natural vertical scroll (NO PINNING)
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !fieldRef.current) return

    const ctx = gsap.context(() => {
      // Gentle parallax and subtle rotation driven by scroll
      gsap.to(fieldRef.current, {
        y: -35,
        rotation: 6,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smooth numeric scrub synchronized with Lenis
        },
      })

      // Continuous slow radar sweep
      if (sweepRef.current) {
        gsap.to(sweepRef.current, {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: 'none',
          transformOrigin: '250px 250px',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, prefersReducedMotion])

  // Scattered Intelligence Nodes across the field
  const signalNodes = [
    { label: 'ICP DEFINED', tag: 'TAM Criteria', angle: 30, dist: 130, color: '#0066CC', delay: 0.1 },
    { label: 'DECISION MAKER', tag: 'C-Suite / VP', angle: 80, dist: 195, color: '#00A6FF', delay: 0.2 },
    { label: 'VERIFIED DATA', tag: '99.8% Sync', angle: 145, dist: 165, color: '#00E5FF', delay: 0.3 },
    { label: 'BUYING SIGNAL', tag: 'High Intent', angle: 215, dist: 140, color: '#FF6D00', delay: 0.4 },
    { label: 'ENGAGEMENT', tag: 'Multi-Touch', angle: 275, dist: 185, color: '#10B981', delay: 0.5 },
    { label: 'PIPELINE SQL', tag: 'Sales Handoff', angle: 325, dist: 215, color: '#00A6FF', delay: 0.6 },
  ]

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center select-none overflow-visible">
      
      {/* ── Ambient Radial Atmosphere Glow ─────────────────────────── */}
      <div className="absolute w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-radial from-primary/18 via-[#00E5FF]/8 to-transparent blur-[100px] pointer-events-none -z-10" />

      {/* ── Main Growth Signal Field Visual ────────────────────────── */}
      <div 
        ref={fieldRef}
        className="relative w-[340px] sm:w-[460px] lg:w-[520px] h-[340px] sm:h-[460px] lg:h-[520px] flex items-center justify-center"
      >
        
        {/* SVG Orbital Field with Concentric Rings and Scanner */}
        <svg 
          viewBox="0 0 500 500" 
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Radial gradient for central target node */}
            <radialGradient id="targetPulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#00A6FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
            </radialGradient>

            {/* Radar scanner sweep gradient */}
            <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
            </linearGradient>

            {/* Accent connecting arc gradient */}
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* ── Radar Sweep Beam (Rotating Vector) ───────────────────── */}
          {!prefersReducedMotion && (
            <g ref={sweepRef}>
              <path
                d="M 250 250 L 480 250 A 230 230 0 0 0 412 88 Z"
                fill="url(#radarSweep)"
                opacity="0.6"
              />
              <line 
                x1="250" 
                y1="250" 
                x2="480" 
                y2="250" 
                stroke="#00E5FF" 
                strokeWidth="1.2" 
                opacity="0.8" 
              />
            </g>
          )}

          {/* Outer Orbital Ring 1 (r = 230) */}
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke="currentColor"
            className="text-border/60 dark:text-white/10"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Orbital Ring 2 (r = 185) */}
          <circle
            cx="250"
            cy="250"
            r="185"
            fill="none"
            stroke="currentColor"
            className="text-primary/40 dark:text-primary/30"
            strokeWidth="1.2"
            strokeDasharray="2 6"
          />

          {/* Orbital Ring 3 (r = 140) */}
          <circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke="currentColor"
            className="text-border/70 dark:text-white/15"
            strokeWidth="1"
          />

          {/* Orbital Ring 4 (r = 90) */}
          <circle
            cx="250"
            cy="250"
            r="90"
            fill="none"
            stroke="currentColor"
            className="text-[#00E5FF]/40 dark:text-[#00E5FF]/50"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />

          {/* Coordinate Crosshairs */}
          <line x1="250" y1="20" x2="250" y2="480" stroke="currentColor" className="text-border/30 dark:text-white/5" strokeWidth="1" strokeDasharray="3 6" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="currentColor" className="text-border/30 dark:text-white/5" strokeWidth="1" strokeDasharray="3 6" />

          {/* Dynamic Geometric Connecting Arcs */}
          <path
            d="M 250,65 A 185,185 0 0,1 435,250"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 250,435 A 185,185 0 0,1 65,250"
            fill="none"
            stroke="#0066CC"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Central Target Pulsing Disc */}
          <circle cx="250" cy="250" r="50" fill="url(#targetPulseGlow)" />
        </svg>

        {/* ── CENTRAL TARGET FOCUS POINT ("TARGET") ────────────────── */}
        <div className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-auto">
          {/* Target Core Pulsing Point */}
          <div className="relative flex items-center justify-center mb-2">
            <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cta opacity-40" />
            <div className="w-5 h-5 rounded-full bg-cta flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,109,0,0.85)] ring-4 ring-cta/25">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Target Central Badge */}
          <div className="px-3 py-1 rounded-full bg-surface/90 dark:bg-[#0A0E18]/90 border border-border/80 dark:border-white/15 shadow-xl backdrop-blur-md">
            <span className="text-[10px] font-mono font-black tracking-widest text-text-primary uppercase flex items-center gap-1.5">
              <Target size={11} className="text-cta" />
              <span>RIGHT AUDIENCE</span>
            </span>
          </div>
          <span className="text-[8px] font-mono text-text-muted mt-1 tracking-wider uppercase">
            TARGET FOCUS // ACTIVE
          </span>
        </div>

        {/* ── SCATTERED SIGNAL NODES ───────────────────────────────── */}
        {signalNodes.map((node, idx) => {
          const rad = (node.angle * Math.PI) / 180
          const x = 250 + node.dist * Math.cos(rad)
          const y = 250 + node.dist * Math.sin(rad)

          const leftPct = (x / 500) * 100
          const topPct = (y / 500) * 100

          return (
            <motion.div
              key={node.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.65, 
                delay: node.delay + 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="absolute z-20 flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-default"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {/* Pulsing Node Dot */}
              <div 
                className="w-2.5 h-2.5 rounded-full ring-2 transition-transform duration-300 group-hover:scale-125"
                style={{ 
                  backgroundColor: node.color,
                  boxShadow: `0 0 10px ${node.color}`,
                  ringColor: `${node.color}50`
                }}
              />

              {/* Minimal Technical Label Badge */}
              <div className="px-2 py-1 rounded-lg bg-surface/90 dark:bg-[#0A0E18]/90 border border-border/70 dark:border-white/10 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-primary/60">
                <span className="text-[9px] font-mono font-extrabold tracking-wider text-text-primary block whitespace-nowrap">
                  {node.label}
                </span>
                <span className="text-[8px] font-mono text-text-muted block leading-none whitespace-nowrap">
                  {node.tag}
                </span>
              </div>
            </motion.div>
          )
        })}

        {/* Technical Coordinate HUD Labels */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-text-muted/50 tracking-wider">
          FREQ: 24.5 GHZ // TAM SCAN
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-text-muted/50 tracking-wider">
          SIGNAL: ACTIVE // 100% ICP
        </div>

      </div>

    </div>
  )
}

export default GrowthSignalField
