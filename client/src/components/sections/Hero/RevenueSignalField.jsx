import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Target, Activity, ShieldCheck, Zap, Radio, Globe2 } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * RevenueSignalField
 * The Signature "Revenue Signal Field" for Taraj Global Hero:
 * - Layer 1: Fine coordinate grid + global wireframe longitude/latitude arcs
 * - Layer 2: Global connection arcs between international business hubs with travelling signal pulses
 * - Layer 3: Precision Target Lock at the focal center ("TARGET LOCK: QUALIFIED OPPORTUNITY")
 * - Layer 4: Micro floating intelligence badges (ICP Match, Intent Score, Decision-Maker Verified)
 * - Desktop subtle mouse tracking with smooth lerp physics (disabled on mobile & reduced motion)
 */
export const RevenueSignalField = ({ mousePos = { x: 0, y: 0 } }) => {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intelligence Nodes placed across the field (Global B2B Market Coverage)
  const globalNodes = [
    { id: 'us-west', x: 170, y: 255, label: 'SF / Silicon Valley', signal: 'Tech ICP', intent: 'High', color: '#0066CC' },
    { id: 'us-east', x: 260, y: 170, label: 'NYC / FinTech', signal: 'Enterprise', intent: '99.4%', color: '#00A6FF' },
    { id: 'emea', x: 420, y: 160, label: 'London / EMEA', signal: 'B2B SaaS', intent: 'High', color: '#00E5FF' },
    { id: 'apac-in', x: 550, y: 250, label: 'India / Tech Hub', signal: 'Buying Committee', intent: 'Active', color: '#FF6D00' },
    { id: 'apac-sg', x: 620, y: 290, label: 'Singapore / APAC', signal: 'Decision-Maker', intent: 'Verified', color: '#10B981' },
    { id: 'apac-au', x: 680, y: 370, label: 'Sydney / ANZ', signal: 'Pipeline SQL', intent: 'Confirmed', color: '#00A6FF' },
  ]

  // Dynamic mouse parallax offsets
  const fieldX = !prefersReducedMotion && !isMobile ? mousePos.x * 16 : 0
  const fieldY = !prefersReducedMotion && !isMobile ? mousePos.y * 14 : 0
  const targetX = !prefersReducedMotion && !isMobile ? mousePos.x * 8 : 0
  const targetY = !prefersReducedMotion && !isMobile ? mousePos.y * 8 : 0

  return (
    <div className="relative w-full h-[360px] sm:h-[500px] lg:h-[660px] flex items-center justify-center select-none overflow-hidden lg:overflow-visible pointer-events-none max-w-full">
      
      {/* ── Ambient Radial Atmosphere Glow ───────────────────────────── */}
      <div 
        className="absolute w-[280px] sm:w-[500px] lg:w-[720px] h-[280px] sm:h-[500px] lg:h-[720px] rounded-full bg-radial from-primary/15 via-[#00A6FF]/8 to-transparent blur-[80px] sm:blur-[110px] pointer-events-none -z-10" 
      />

      {/* ── Master Interactive Signal Canvas ─────────────────────────── */}
      <motion.div
        animate={{ x: fieldX, y: fieldY }}
        transition={{ type: 'spring', stiffness: 45, damping: 25, mass: 0.8 }}
        className="relative w-[290px] min-[360px]:w-[340px] sm:w-[500px] lg:w-[720px] h-[290px] min-[360px]:h-[340px] sm:h-[500px] lg:h-[560px] max-w-full flex items-center justify-center"
      >
        
        {/* SVG Global Signal Mesh */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Target Pulse Glow */}
            <radialGradient id="heroTargetPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00A6FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
            </radialGradient>

            {/* Global Connection Arc Gradient */}
            <linearGradient id="globalArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.3" />
              <stop offset="35%" stopColor="#00A6FF" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.9" />
            </linearGradient>

            {/* Linear Gradient for Scan Wave */}
            <linearGradient id="signalWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0066CC" stopOpacity="0" />
            </linearGradient>

            {/* Path definition for packet motion */}
            <path id="route1" d="M 170,255 Q 300,120 420,160" />
            <path id="route2" d="M 420,160 Q 480,210 550,250" />
            <path id="route3" d="M 550,250 Q 580,270 620,290" />
            <path id="route4" d="M 260,170 Q 320,330 400,310" />
          </defs>

          {/* ── Layer 1: Abstract Global Sphere Contour Arcs ─────────── */}
          <g className="text-border/40 dark:text-white/10" stroke="currentColor" fill="none">
            {/* Global Elliptical Latitudes */}
            <ellipse cx="400" cy="300" rx="340" ry="180" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
            <ellipse cx="400" cy="300" rx="260" ry="130" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
            <ellipse cx="400" cy="300" rx="170" ry="85" strokeWidth="0.8" opacity="0.4" />
            
            {/* Longitude Arcs */}
            <path d="M 400,120 C 330,180 330,420 400,480" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.5" />
            <path d="M 400,120 C 470,180 470,420 400,480" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.5" />
            <line x1="60" y1="300" x2="740" y2="300" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.4" />
            <line x1="400" y1="100" x2="400" y2="500" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.4" />
          </g>

          {/* ── Layer 2: Precision Concentric Signal Radar Rings ──────── */}
          <g className="text-primary/30 dark:text-primary/25" stroke="currentColor" fill="none">
            <circle cx="400" cy="300" r="220" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="400" cy="300" r="150" strokeWidth="1.2" strokeDasharray="2 6" />
            <circle cx="400" cy="300" r="90" strokeWidth="1" />
            <circle cx="400" cy="300" r="45" strokeWidth="1.5" stroke="#00E5FF" strokeDasharray="3 4" opacity="0.6" />
          </g>

          {/* ── Layer 3: Inter-Market Revenue Flow Arcs ──────────────── */}
          <path d="M 170,255 Q 300,120 420,160" fill="none" stroke="url(#globalArcGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          <path d="M 420,160 Q 480,210 550,250" fill="none" stroke="url(#globalArcGrad)" strokeWidth="1.5" opacity="0.8" />
          <path d="M 550,250 Q 580,270 620,290" fill="none" stroke="#FF6D00" strokeWidth="1.8" opacity="0.8" />
          <path d="M 260,170 Q 320,330 400,300" fill="none" stroke="#00E5FF" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.7" />

          {/* Travelling Data Photon Packets along routes */}
          {!prefersReducedMotion && (
            <>
              <circle r="3.5" fill="#00E5FF" filter="drop-shadow(0 0 6px #00E5FF)">
                <animateMotion dur="4.5s" repeatCount="indefinite">
                  <mpath href="#route1" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#FF6D00" filter="drop-shadow(0 0 6px #FF6D00)">
                <animateMotion dur="3.8s" repeatCount="indefinite" delay="1s">
                  <mpath href="#route2" />
                </animateMotion>
              </circle>
              <circle r="3.5" fill="#10B981" filter="drop-shadow(0 0 6px #10B981)">
                <animateMotion dur="3s" repeatCount="indefinite" delay="0.5s">
                  <mpath href="#route3" />
                </animateMotion>
              </circle>
            </>
          )}

          {/* ── Central Precision Focal Disc ────────────────────────── */}
          <circle cx="400" cy="300" r="60" fill="url(#heroTargetPulse)" />
        </svg>

        {/* ── CENTRAL PRECISION TARGET LOCK (THE REVENUE OPPORTUNITY) ─ */}
        <motion.div
          animate={{ x: targetX, y: targetY }}
          transition={{ type: 'spring', stiffness: 55, damping: 20 }}
          className="absolute z-20 flex flex-col items-center justify-center text-center pointer-events-auto"
        >
          {/* Target Reticle Radar Beacon */}
          <div className="relative flex items-center justify-center mb-2">
            <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-cta opacity-40" />
            <div className="w-5 h-5 rounded-full bg-cta flex items-center justify-center text-white shadow-[0_0_24px_rgba(255,109,0,0.9)] ring-4 ring-cta/25">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Precision Target Lock Badge */}
          <div className="px-3.5 py-1.5 rounded-full bg-surface/90 dark:bg-[#080C14]/90 border border-cta/40 dark:border-cta/50 shadow-xl backdrop-blur-md">
            <span className="text-[10px] font-mono font-black tracking-widest text-text-primary uppercase flex items-center gap-1.5">
              <Target size={12} className="text-cta" />
              <span>TARGET LOCKED // RIGHT AUDIENCE</span>
            </span>
          </div>

          {/* Telemetry metadata */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cta/10 text-cta border border-cta/20">
              100% ICP MATCH
            </span>
            <span className="text-[8px] font-mono text-text-muted">
              C-SUITE DIRECT DIAL
            </span>
          </div>
        </motion.div>

        {/* ── SCATTERED GLOBAL B2B HUBS & METADATA NODES ────────────── */}
        {globalNodes.map((node, idx) => {
          const leftPct = (node.x / 800) * 100
          const topPct = (node.y / 600) * 100

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-10 flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-default"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              {/* Pulsing Signal Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full ring-2 transition-transform duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: node.color,
                  boxShadow: `0 0 10px ${node.color}`,
                  ringColor: `${node.color}50`,
                }}
              />

              {/* Minimalist Editorial Tech Chip */}
              <div className="px-2 py-1 rounded-lg bg-surface/85 dark:bg-[#070B12]/85 border border-border/70 dark:border-white/10 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md hidden sm:block">
                <span className="text-[9px] font-mono font-bold text-text-primary block whitespace-nowrap leading-tight">
                  {node.label}
                </span>
                <span className="text-[8px] font-mono text-text-muted flex items-center gap-1 leading-none mt-0.5 whitespace-nowrap">
                  <span>{node.signal}</span>
                  <span className="text-emerald-500 font-bold">[{node.intent}]</span>
                </span>
              </div>
            </motion.div>
          )
        })}

        {/* Technical Coordinate Overlay Marks */}
        <div className="absolute top-2 left-4 text-[9px] font-mono text-text-muted/60 tracking-wider flex items-center gap-1.5 hidden md:flex">
          <Globe2 size={11} className="text-primary" />
          <span>GLOBAL REVENUE SIGNAL // ACTIVE TELEMETRY</span>
        </div>
        <div className="absolute bottom-2 right-4 text-[9px] font-mono text-text-muted/60 tracking-wider flex items-center gap-1.5 hidden md:flex">
          <Activity size={11} className="text-emerald-500 animate-pulse" />
          <span>SLA: 99.8% VERIFIED DATA</span>
        </div>

      </motion.div>

    </div>
  )
}

export default RevenueSignalField
