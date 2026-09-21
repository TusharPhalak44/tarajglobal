import React from 'react'
import { motion } from 'framer-motion'

/**
 * Vertical SVG Arrow Connector with moving glowing particle
 */
export function VerticalConnector({
  isActive = false,
  isPassed = false,
  color = '#00A6FF',
  height = 40,
  label = '',
  isReducedMotion = false,
}) {
  const strokeColor = isPassed ? '#72D669' : isActive ? color : 'var(--border)'

  return (
    <div className="relative flex flex-col items-center justify-center my-1 select-none pointer-events-none" style={{ height }}>
      {label && (
        <span className="absolute -top-1 px-1.5 py-0.2 rounded bg-surface border border-border text-[8.5px] font-mono font-bold text-text-muted z-10">
          {label}
        </span>
      )}

      <svg width="24" height={height} viewBox={`0 0 24 ${height}`} className="overflow-visible">
        <defs>
          <linearGradient id={`vGrad-${label || 'conn'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isPassed ? '#72D669' : color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPassed ? '#72D669' : color} stopOpacity="1" />
          </linearGradient>

          <marker
            id={`arrow-${label || 'conn'}`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill={strokeColor} />
          </marker>
        </defs>

        {/* Base connecting line */}
        <line
          x1="12"
          y1="0"
          x2="12"
          y2={height - 4}
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray={isPassed ? 'none' : '4 4'}
          markerEnd={`url(#arrow-${label || 'conn'})`}
        />

        {/* Traveling glowing lead particle */}
        {isActive && !isReducedMotion && (
          <motion.circle
            r="3.5"
            cx="12"
            fill={color}
            filter="drop-shadow(0 0 6px currentColor)"
            initial={{ cy: 0 }}
            animate={{ cy: height - 6 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
    </div>
  )
}

/**
 * Curved Lateral Branch for Decision -> Nurture Alternative Path
 */
export function BranchConnector({
  direction = 'right', // 'right' | 'left'
  isActive = false,
  isPassed = false,
  color = '#FFA600',
  label = 'NO — Nurture',
  isReducedMotion = false,
}) {
  const strokeColor = isPassed ? '#72D669' : isActive ? color : 'var(--border)'

  return (
    <div className="relative flex items-center justify-center pointer-events-none select-none my-2">
      <svg width="120" height="40" viewBox="0 0 120 40" className="overflow-visible">
        <defs>
          <marker
            id="branch-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill={strokeColor} />
          </marker>
        </defs>

        {/* Smooth Cubic Bezier Curved Path */}
        <path
          d={direction === 'right' ? 'M 10 10 C 60 10, 70 30, 110 30' : 'M 110 10 C 60 10, 50 30, 10 30'}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeDasharray="4 4"
          markerEnd="url(#branch-arrow)"
        />

        {/* Traveling Particle along branch */}
        {isActive && !isReducedMotion && (
          <motion.circle
            r="3"
            fill={color}
            filter="drop-shadow(0 0 6px currentColor)"
            animate={{
              cx: direction === 'right' ? [10, 110] : [110, 10],
              cy: [10, 30],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </svg>

      {label && (
        <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-surface border border-border text-[9px] font-mono text-text-muted shadow-xs">
          {label}
        </span>
      )}
    </div>
  )
}

/**
 * Curved Loop-Back Arc (Nurture -> Return to Pipeline)
 */
export function ReturnArcConnector({
  label = 'Revisit Prospect Loop',
  color = '#00A6FF',
  isActive = false,
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-surface/50 border border-border/80 text-[10px] font-mono text-text-muted my-2">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
      <span>{label}</span>
      <span className="text-primary font-bold">↺ Return to Cadence</span>
    </div>
  )
}
