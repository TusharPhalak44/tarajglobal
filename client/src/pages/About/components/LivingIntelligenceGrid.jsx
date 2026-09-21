import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

/* ─────────────────────────────────────────────────────────────────────────────
   INTELLIGENCE NETWORK NODES CONFIGURATION
   Strategic nodes distributed vertically along the entire About Us page journey.
───────────────────────────────────────────────────────────────────────────── */
const NETWORK_NODES = [
  { id: 'node-1', x: '12%', y: '6%', color: '#00A6FF', size: 6, pulseDelay: 0 },
  { id: 'node-2', x: '88%', y: '16%', color: '#FF6D00', size: 5, pulseDelay: 1.2 },
  { id: 'node-3', x: '8%', y: '30%', color: '#00A6FF', size: 5, pulseDelay: 2.4 },
  { id: 'node-4', x: '92%', y: '44%', color: '#72D669', size: 6, pulseDelay: 0.8 },
  { id: 'node-5', x: '14%', y: '58%', color: '#FFA600', size: 5, pulseDelay: 1.8 },
  { id: 'node-6', x: '86%', y: '74%', color: '#00A6FF', size: 6, pulseDelay: 2.8 },
  { id: 'node-7', x: '18%', y: '88%', color: '#72D669', size: 5, pulseDelay: 1.4 },
  { id: 'node-8', x: '82%', y: '96%', color: '#FF6D00', size: 6, pulseDelay: 0.4 },
]

export const LivingIntelligenceGrid = () => {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)

  // Scroll Progress across the entire About page
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end end'],
  })

  // Subtle Parallax Layer Transforms
  const gridParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const nodesParallaxY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const signalProgress = useTransform(scrollYProgress, [0, 1], [0, 1000])

  // Mouse Proximity Spring Tracking (Restrained 2-4px movement on desktop)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 90 }
  const mouseMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig)
  const mouseMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), springConfig)

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || typeof window === 'undefined') return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX / innerWidth - 0.5)
    mouseY.set(clientY / innerHeight - 0.5)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* ── LAYER 1: ULTRA-CLEAN TECHNICAL GEOMETRIC GRID ──────────────── */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : gridParallaxY }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Light Theme Primary Grid: Crisp 64px hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.055] dark:opacity-[0.035] transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Micro-Crosshairs at 128px intersections */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1.5px, transparent 0)`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Soft Ambient Brand Atmospheric Glows (Light Theme enhanced) */}
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00A6FF]/08 dark:bg-[#00A6FF]/05 blur-[160px]" />
        <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#FF6D00]/06 dark:bg-[#FF6D00]/04 blur-[160px]" />
        <div className="absolute top-[65%] left-[-8%] w-[580px] h-[580px] rounded-full bg-[#72D669]/07 dark:bg-[#72D669]/04 blur-[160px]" />
        <div className="absolute top-[88%] right-[-8%] w-[600px] h-[600px] rounded-full bg-[#00A6FF]/07 dark:bg-[#00A6FF]/04 blur-[160px]" />
      </motion.div>

      {/* ── LAYER 2: SVG LIVING INTELLIGENCE SIGNAL PATHWAY ────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Signal Gradient for Light & Dark Theme */}
          <linearGradient id="grid-signal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.08" />
            <stop offset="25%" stopColor="#FF6D00" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#72D669" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#FFA600" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.08" />
          </linearGradient>

          {/* Soft Glow Filter for Signal Points */}
          <filter id="intelligence-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary Spine Connection Route weaving subtly across the page */}
        <path
          d="M 120 60 Q 500 110, 880 160 T 80 300 T 920 440 T 140 580 T 860 740 T 180 880 T 820 960"
          stroke="url(#grid-signal-grad)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeOpacity="0.4"
        />

        {/* Secondary Cross-Telemetry Connections (Subtle Lateral Links) */}
        <line
          x1="120"
          y1="60"
          x2="880"
          y2="160"
          stroke="currentColor"
          strokeOpacity="0.03"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="80"
          y1="300"
          x2="920"
          y2="440"
          stroke="currentColor"
          strokeOpacity="0.03"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="140"
          y1="580"
          x2="860"
          y2="740"
          stroke="currentColor"
          strokeOpacity="0.03"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="180"
          y1="880"
          x2="820"
          y2="960"
          stroke="currentColor"
          strokeOpacity="0.03"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>

      {/* ── LAYER 3: CONNECTED INTELLIGENCE NODES & PULSES ─────────────── */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : nodesParallaxY,
          x: prefersReducedMotion ? 0 : mouseMoveX,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {NETWORK_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            {/* Soft Ambient Radial Pulse Ring */}
            {!prefersReducedMotion && (
              <motion.div
                animate={{
                  scale: [1, 2.2, 1],
                  opacity: [0.35, 0, 0.35],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  delay: node.pulseDelay,
                  ease: 'easeInOut',
                }}
                className="absolute inset-[-6px] rounded-full pointer-events-none"
                style={{
                  border: `1px solid ${node.color}`,
                  boxShadow: `0 0 10px ${node.color}40`,
                }}
              />
            )}

            {/* Core Micro-Intersection Point */}
            <div
              className="rounded-full relative shadow-xs transition-transform duration-300"
              style={{
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: node.color,
                boxShadow: `0 0 8px ${node.color}60`,
              }}
            >
              {/* Inner White Core Pin */}
              <div className="absolute inset-[1px] rounded-full bg-white opacity-80" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default LivingIntelligenceGrid
