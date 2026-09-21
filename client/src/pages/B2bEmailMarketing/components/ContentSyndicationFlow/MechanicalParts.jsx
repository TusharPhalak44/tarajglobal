import React from 'react'
import { motion } from 'framer-motion'

/**
 * Procedural SVG Mechanical Gear with metallic teeth and center bearing
 */
export function RotatingGear({
  size = 40,
  teeth = 12,
  speed = 4,
  direction = 'clockwise',
  color = 'var(--primary)',
  className = '',
}) {
  const radius = size / 2
  const innerRadius = radius * 0.65
  const holeRadius = radius * 0.25

  // Generate gear teeth path
  const points = []
  const angleStep = (Math.PI * 2) / teeth

  for (let i = 0; i < teeth; i++) {
    const a1 = i * angleStep
    const a2 = a1 + angleStep * 0.25
    const a3 = a1 + angleStep * 0.5
    const a4 = a1 + angleStep * 0.75

    // Outer tooth tip
    points.push(`${radius + radius * 0.9 * Math.cos(a1)},${radius + radius * 0.9 * Math.sin(a1)}`)
    points.push(`${radius + radius * 0.9 * Math.cos(a2)},${radius + radius * 0.9 * Math.sin(a2)}`)
    // Inner tooth root
    points.push(`${radius + innerRadius * Math.cos(a3)},${radius + innerRadius * Math.sin(a3)}`)
    points.push(`${radius + innerRadius * Math.cos(a4)},${radius + innerRadius * Math.sin(a4)}`)
  }

  const pathData = `M ${points.join(' L ')} Z`

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`inline-block shrink-0 ${className}`}
      animate={{ rotate: direction === 'clockwise' ? 360 : -360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={`gearGrad-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="70%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* Main Gear Body */}
      <path
        d={pathData}
        fill={`url(#gearGrad-${size})`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Center Bearing & Hub */}
      <circle
        cx={radius}
        cy={radius}
        r={innerRadius * 0.7}
        fill="#121212"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <circle
        cx={radius}
        cy={radius}
        r={holeRadius}
        fill="var(--background)"
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Spoke bolts */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180
        const bx = radius + innerRadius * 0.45 * Math.cos(rad)
        const by = radius + innerRadius * 0.45 * Math.sin(rad)
        return <circle key={deg} cx={bx} cy={by} r="1.5" fill={color} />
      })}
    </motion.svg>
  )
}

/**
 * Animated Mechanical Conveyor Roller Strip
 */
export function ConveyorTrack({ isActive = true, length = '100%', className = '' }) {
  return (
    <div className={`relative h-5 w-full bg-surface-elevated rounded-md border border-border/80 overflow-hidden flex items-center ${className}`}>
      {/* Conveyor Rail Shadow */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-black/40 z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/40 z-10" />

      {/* Animated Roller Treads */}
      <motion.div
        className="flex gap-2 w-[200%] shrink-0"
        animate={{ x: isActive ? ['0%', '-50%'] : '0%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-3.5 rounded-xs bg-gradient-to-b from-white/20 via-border to-black/50 shrink-0 border-r border-black/30"
          />
        ))}
      </motion.div>
    </div>
  )
}

/**
 * Pressure Gauge Meter
 */
export function MechanicalGauge({ value = 75, label = 'PSI', color = '#00A6FF' }) {
  const angle = -120 + (value / 100) * 240

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-12 rounded-full bg-surface border border-border/80 p-1 flex items-center justify-center shadow-inner">
        {/* Dial ticks */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="18"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="2 4"
          />
        </svg>

        {/* Needle */}
        <motion.div
          className="absolute w-0.5 h-4.5 rounded-full origin-bottom"
          style={{
            backgroundColor: color,
            bottom: '24px',
            boxShadow: `0 0 6px ${color}`,
          }}
          animate={{ rotate: angle }}
          transition={{ duration: 0.5, type: 'spring' }}
        />

        {/* Center pin */}
        <div className="w-2.5 h-2.5 rounded-full bg-white/80 border border-black z-10 shadow-xs" />
      </div>
      <span className="text-[9px] font-mono text-text-muted mt-1">{label}: {value}%</span>
    </div>
  )
}
