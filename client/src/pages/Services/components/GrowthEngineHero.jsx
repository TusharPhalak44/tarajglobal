import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

// 7 orbiting service capabilities converging into the GROWTH engine
const ORBITING_CAPABILITIES = [
  {
    id: 'demand',
    label: 'DEMAND',
    sub: 'PIPELINE CREATION',
    x: 250,
    y: 50,
    textAnchor: 'middle',
    color: '#00A6FF',
    linePath: 'M 250 75 L 250 175',
    pathDuration: '4s',
    dotOffset: '0s',
  },
  {
    id: 'generate',
    label: 'GENERATE',
    sub: 'HIGH-INTENT LEADS',
    x: 400,
    y: 110,
    textAnchor: 'start',
    color: '#FF6D00',
    linePath: 'M 385 125 L 295 195',
    pathDuration: '4.5s',
    dotOffset: '0.8s',
  },
  {
    id: 'engage',
    label: 'ENGAGE',
    sub: 'MULTI-TOUCH OUTREACH',
    x: 420,
    y: 270,
    textAnchor: 'start',
    color: '#00A6FF',
    linePath: 'M 405 270 L 305 245',
    pathDuration: '4.2s',
    dotOffset: '1.6s',
  },
  {
    id: 'qualify',
    label: 'QUALIFY',
    sub: 'BANT & SQL GATING',
    x: 320,
    y: 410,
    textAnchor: 'middle',
    color: '#FFA600',
    linePath: 'M 310 395 L 270 295',
    pathDuration: '4.8s',
    dotOffset: '2.4s',
  },
  {
    id: 'convert',
    label: 'CONVERT',
    sub: 'MEETINGS SECURED',
    x: 150,
    y: 410,
    textAnchor: 'middle',
    color: '#72D669',
    linePath: 'M 165 395 L 225 295',
    pathDuration: '5s',
    dotOffset: '3.2s',
  },
  {
    id: 'nurture',
    label: 'NURTURE',
    sub: 'LIFECYCLE CADENCE',
    x: 80,
    y: 270,
    textAnchor: 'end',
    color: '#00A6FF',
    linePath: 'M 95 270 L 195 245',
    pathDuration: '4.6s',
    dotOffset: '4.0s',
  },
  {
    id: 'data',
    label: 'DATA',
    sub: 'VERIFIED B2B ICP',
    x: 100,
    y: 110,
    textAnchor: 'end',
    color: '#FF6D00',
    linePath: 'M 115 125 L 205 195',
    pathDuration: '4.4s',
    dotOffset: '4.8s',
  },
]

export default function GrowthEngineHero() {
  const heroRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredNode, setHoveredNode] = useState(null)

  const handleScrollToSolutions = () => {
    const el = document.getElementById('capabilities') || document.getElementById('capabilities-strip')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-background min-h-[86vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-32 pb-14 lg:pb-20 select-none transition-colors duration-500"
      aria-label="Taraj Global Services — Your Growth. Engineered."
    >
      {/* ── Background Layer: Fine Technical Grid & Ambient Lighting ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/4 left-1/5 w-[650px] h-[650px] rounded-full blur-[150px] bg-primary/6 dark:bg-primary/10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-[550px] h-[550px] rounded-full blur-[140px] bg-cta/5 dark:bg-cta/8 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ══════════ LEFT COLUMN: Editorial Content (Span 7) ══════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Eyebrow: OUR SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md mb-5 self-start"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-primary">
                OUR SERVICES
              </span>
            </motion.div>

            {/* H1: Your Growth. Engineered. */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-black text-text-primary tracking-tight leading-[1.08] mb-5 sm:mb-6"
            >
              <span>Your Growth.{' '}</span>
              <span className="block mt-1 sm:mt-1.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#0088FF] to-cta font-black inline-block">
                  Engineered.
                </span>
                <span
                  className="inline-block w-8 sm:w-10 h-[3px] bg-cta ml-3 sm:ml-4 align-middle mb-1 rounded-full"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-[560px] mb-8"
            >
              End-to-end B2B growth solutions designed to identify the right prospects, create meaningful engagement and build qualified pipeline.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={handleScrollToSolutions}
                className="group cursor-pointer"
              >
                <StarButton
                  as="div"
                  className="h-12 px-7 text-[13px] font-bold tracking-wide uppercase shadow-lg shadow-primary/20 text-white dark:text-neutral-900 flex items-center justify-center gap-2 transition-transform duration-300 active:scale-95"
                  lightColor={isDark ? '#87CEEB' : '#FF8533'}
                  backgroundColor={isDark ? '#00A6FF' : '#FF6D00'}
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </StarButton>
              </button>

              <Link
                to="/contact"
                className="h-12 px-7 rounded-xl text-[13px] font-bold uppercase tracking-wider text-text-primary border border-border/80 hover:border-primary/60 hover:bg-surface/60 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>Talk to Our Team</span>
              </Link>
            </motion.div>

            {/* Micro Trust Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 pt-6 border-t border-border/40 flex items-center gap-6 text-[11px] font-mono text-text-muted"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>DATA ACCURACY SLA: 99.8%</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>PIPELINE ENGINE: ACTIVE</span>
              </div>
            </motion.div>
          </div>

          {/* ══════════ RIGHT COLUMN: Central "Growth Engine" Visual (Span 5) ══════════ */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px] aspect-square flex items-center justify-center select-none"
            >
              {/* SVG Growth Engine Network Canvas */}
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  {/* Glowing Filters */}
                  <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Linear Gradient for Hub */}
                  <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Concentric Engine Radar Rings */}
                <circle
                  cx="250"
                  cy="235"
                  r="190"
                  fill="none"
                  stroke={isDark ? '#00A6FF' : '#00A6FF'}
                  strokeWidth="1"
                  strokeOpacity={isDark ? '0.12' : '0.18'}
                  strokeDasharray="4 6"
                />
                <circle
                  cx="250"
                  cy="235"
                  r="135"
                  fill="none"
                  stroke={isDark ? '#FFFFFF' : '#0E0E0E'}
                  strokeWidth="1"
                  strokeOpacity={isDark ? '0.08' : '0.1'}
                  strokeDasharray="2 4"
                />

                {/* Technical Axis Guides */}
                <line
                  x1="250"
                  y1="50"
                  x2="250"
                  y2="420"
                  stroke={isDark ? '#FFFFFF' : '#0E0E0E'}
                  strokeWidth="0.75"
                  strokeOpacity={isDark ? '0.05' : '0.08'}
                />
                <line
                  x1="60"
                  y1="235"
                  x2="440"
                  y2="235"
                  stroke={isDark ? '#FFFFFF' : '#0E0E0E'}
                  strokeWidth="0.75"
                  strokeOpacity={isDark ? '0.05' : '0.08'}
                />

                {/* ── Connecting Lines & Animated Traveling Signal Dots ── */}
                {ORBITING_CAPABILITIES.map((node) => {
                  const isHovered = hoveredNode === node.id
                  return (
                    <g key={`line-${node.id}`}>
                      {/* Connection Line with SVG Stroke Animation */}
                      <motion.path
                        d={node.linePath}
                        fill="none"
                        stroke={isHovered ? node.color : (isDark ? '#00A6FF' : '#00A6FF')}
                        strokeWidth={isHovered ? 1.8 : 1.2}
                        strokeOpacity={isHovered ? 0.85 : (isDark ? 0.35 : 0.4)}
                        strokeDasharray={isHovered ? 'none' : '3 3'}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                      />

                      {/* Traveling Signal Dot along the path */}
                      {!prefersReducedMotion && (
                        <circle r={isHovered ? 3.5 : 2.5} fill={node.color} opacity="0.9">
                          <animateMotion
                            path={node.linePath}
                            dur={node.pathDuration}
                            begin={node.dotOffset}
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  )
                })}

                {/* ── Central "GROWTH" Core Element ── */}
                <g className="cursor-pointer">
                  {/* Outer Pulsing Aura Ring */}
                  <motion.circle
                    cx="250"
                    cy="235"
                    r="58"
                    fill="url(#hubGradient)"
                    stroke="#00A6FF"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    animate={{
                      r: [56, 60, 56],
                      strokeOpacity: [0.35, 0.6, 0.35],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Core Inner Disc */}
                  <circle
                    cx="250"
                    cy="235"
                    r="46"
                    fill={isDark ? '#0E0E0E' : '#FFFFFF'}
                    stroke={isDark ? '#00A6FF' : '#00A6FF'}
                    strokeWidth="2"
                    filter="url(#coreGlow)"
                  />

                  {/* Concentric Reticle Tick Marks */}
                  <circle
                    cx="250"
                    cy="235"
                    r="38"
                    fill="none"
                    stroke={isDark ? '#FFFFFF' : '#0E0E0E'}
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                    strokeOpacity={isDark ? '0.25' : '0.3'}
                  />

                  {/* Central Text: GROWTH */}
                  <text
                    x="250"
                    y="239"
                    textAnchor="middle"
                    className="font-black tracking-[0.24em] select-none"
                    fill={isDark ? '#FFFFFF' : '#0E0E0E'}
                    fontSize="13"
                    fontWeight="900"
                    letterSpacing="0.22em"
                  >
                    GROWTH
                  </text>
                  <text
                    x="250"
                    y="253"
                    textAnchor="middle"
                    className="font-mono select-none"
                    fill="#00A6FF"
                    fontSize="7"
                    fontWeight="700"
                    letterSpacing="0.18em"
                  >
                    ENGINE // 01
                  </text>
                </g>

                {/* ── Orbiting Service Nodes & Labels ── */}
                {ORBITING_CAPABILITIES.map((node, index) => {
                  const isHovered = hoveredNode === node.id
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Node Anchor Dot */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 4.5 : 3}
                        fill={node.color}
                        filter="url(#nodeGlow)"
                      />

                      {/* Ripple on Hover */}
                      {isHovered && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="10"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1"
                          strokeOpacity="0.5"
                        />
                      )}

                      {/* Primary Label */}
                      <motion.text
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                        x={node.textAnchor === 'middle' ? node.x : node.textAnchor === 'start' ? node.x + 8 : node.x - 8}
                        y={node.textAnchor === 'middle' ? (node.y > 235 ? node.y + 16 : node.y - 10) : node.y + 4}
                        textAnchor={node.textAnchor}
                        fontSize="10.5"
                        fontWeight="800"
                        letterSpacing="0.12em"
                        fill={isHovered ? node.color : (isDark ? '#FAFAFA' : '#111827')}
                        className="font-mono tracking-wider transition-colors duration-200"
                      >
                        {node.label}
                      </motion.text>

                      {/* Secondary Micro Sublabel */}
                      <text
                        x={node.textAnchor === 'middle' ? node.x : node.textAnchor === 'start' ? node.x + 8 : node.x - 8}
                        y={node.textAnchor === 'middle' ? (node.y > 235 ? node.y + 26 : node.y - 20) : node.y + 14}
                        textAnchor={node.textAnchor}
                        fontSize="7"
                        fontWeight="600"
                        letterSpacing="0.15em"
                        fill={isDark ? '#888888' : '#6B7280'}
                        className="font-mono opacity-80"
                      >
                        {node.sub}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Bottom Technical Tag */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 dark:bg-white/5 border border-border/60 text-[9px] font-mono text-text-muted backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>GROWTH CONVERGENCE SYSTEM // TGS</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
