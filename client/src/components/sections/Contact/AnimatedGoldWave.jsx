import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

// ── C1-CONTINUOUS 2-PERIOD MATHEMATICAL BEZIER CURVES (1200px cycle, 2400px total) ──
// Seamless loop from x = 0 to x = -1200 units

// Layer 1: Subtle Back Dark Gold Wave (Higher crests for depth)
const LAYER1_FILL =
  'M 0,38 C 106.7,29.7 213.3,6.3 320.0,18.0 C 426.7,29.7 536.7,66.0 640.0,56.0 C 743.3,46.0 866.7,15.3 950.0,22.0 C 1033.3,28.7 1093.3,46.3 1200.0,38.0 C 1306.7,29.7 1413.3,6.3 1520.0,18.0 C 1626.7,29.7 1736.7,66.0 1840.0,56.0 C 1943.3,46.0 2066.7,15.3 2150.0,22.0 C 2233.3,28.7 2293.3,46.3 2400.0,38.0 V 140 H 0 Z'

// Layer 2: Warm Amber / Gold Translucent Layer (Offset peaks)
const LAYER2_FILL =
  'M 0,52 C 93.3,62.7 180.0,91.3 280.0,78.0 C 380.0,64.7 480.0,20.3 580.0,32.0 C 680.0,43.7 773.3,74.7 880.0,68.0 C 986.7,61.3 1106.7,41.3 1200.0,52.0 C 1293.3,62.7 1380.0,91.3 1480.0,78.0 C 1580.0,64.7 1680.0,20.3 1780.0,32.0 C 1880.0,43.7 1973.3,74.7 2080.0,68.0 C 2186.7,61.3 2306.7,41.3 2400.0,52.0 V 140 H 0 Z'

// Layer 3: Main Flowing Wave Fill (Seamlessly blends into next section)
const MAIN_WAVE_FILL =
  'M 0,68 C 100.0,56.3 193.3,32.0 300.0,42.0 C 406.7,52.0 520.0,90.3 620.0,82.0 C 720.0,73.7 826.7,36.7 920.0,46.0 C 1013.3,55.3 1100.0,79.7 1200.0,68.0 C 1300.0,56.3 1393.3,32.0 1500.0,42.0 C 1606.7,52.0 1720.0,90.3 1820.0,82.0 C 1920.0,73.7 2026.7,36.7 2120.0,46.0 C 2213.3,55.3 2300.0,79.7 2400.0,68.0 V 140 H 0 Z'

// Glowing Gold Contour Stroke (Exact upper contour line of Main Wave)
const MAIN_WAVE_STROKE =
  'M 0,68 C 100.0,56.3 193.3,32.0 300.0,42.0 C 406.7,52.0 520.0,90.3 620.0,82.0 C 720.0,73.7 826.7,36.7 920.0,46.0 C 1013.3,55.3 1100.0,79.7 1200.0,68.0 C 1300.0,56.3 1393.3,32.0 1500.0,42.0 C 1606.7,52.0 1720.0,90.3 1820.0,82.0 C 1920.0,73.7 2026.7,36.7 2120.0,46.0 C 2213.3,55.3 2300.0,79.7 2400.0,68.0'

export default function AnimatedGoldWave() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className="absolute -top-[78px] sm:-top-[94px] md:-top-[110px] lg:-top-[126px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-30 select-none border-none outline-none h-20 sm:h-24 md:h-28 lg:h-32"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+4px)] -ml-[2px] h-full text-background fill-current transition-colors duration-300 border-none outline-none"
      >
        <defs>
          {/* Subtle Back Dark Gold Gradient */}
          <linearGradient id="goldBackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" stopOpacity="0.22" />
            <stop offset="25%" stopColor="#D97706" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.38" />
            <stop offset="75%" stopColor="#D97706" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.22" />
          </linearGradient>

          {/* Secondary Warm Amber / Gold Gradient */}
          <linearGradient id="amberSecondaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.38" />
            <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.55" />
            <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.38" />
          </linearGradient>

          {/* Premium Thin Glowing Gold Contour Gradient */}
          <linearGradient id="goldContourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Soft Elegant Outer Glow Filter (1-3px delicate contour, not neon) */}
          <filter id="goldContourGlow" x="-20%" y="-60%" width="140%" height="220%">
            <feDropShadow
              dx="0"
              dy="-1"
              stdDeviation="2"
              floodColor="#F59E0B"
              floodOpacity="0.75"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="0.8"
              floodColor="#FEF08A"
              floodOpacity="0.9"
            />
          </filter>
        </defs>

        {/* ── LAYER 1: BACK DARK GOLD WAVE ── */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                x: [0, -1200],
              }
          }
          transition={{
            x: {
              repeat: Infinity,
              duration: 32,
              ease: 'linear',
            },
          }}
        >
          <path d={LAYER1_FILL} fill="url(#goldBackGrad)" />
        </motion.g>

        {/* ── LAYER 2: SECONDARY WARM AMBER WAVE ── */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                x: [0, -1200],
              }
          }
          transition={{
            x: {
              repeat: Infinity,
              duration: 24,
              ease: 'linear',
            },
          }}
        >
          <path d={LAYER2_FILL} fill="url(#amberSecondaryGrad)" />
        </motion.g>

        {/* ── LAYER 3: MAIN FLOWING WAVE + GLOWING GOLD CONTOUR ── */}
        {/* Moving together in the same group so the contour line stays locked to the wave */}
        <motion.g
          animate={
            prefersReducedMotion
              ? {}
              : {
                x: [0, -1200],
              }
          }
          transition={{
            x: {
              repeat: Infinity,
              duration: 18,
              ease: 'linear',
            },
          }}
        >
          {/* Main Wave Solid Body: Fills seamlessly with the theme background */}
          <path d={MAIN_WAVE_FILL} fill="var(--background)" />

          {/* Thin Glowing Gold Contour Line: 2px delicate stroke along upper crest */}
          <path
            d={MAIN_WAVE_STROKE}
            fill="none"
            stroke="url(#goldContourGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldContourGlow)"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>

        {/* Solid bottom seal inside SVG: guarantees ZERO sub-pixel gap at the baseline */}
        <rect x="0" y="115" width="1200" height="90" fill="var(--background)" />
      </svg>

      {/* Solid underlay strip below SVG: eliminates any hairline seam between sections */}
      <div className="w-full h-2 bg-background -mt-[1px] border-none outline-none pointer-events-none" />
    </div>
  )
}
