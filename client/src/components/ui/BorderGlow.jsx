import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * React Bits Border Glow Component
 * Renders an elegant, interactive dynamic border glow using cyan brand accent #00A6FF.
 */
export const BorderGlow = ({
  children,
  glowColor = 'rgba(0, 166, 255, 0.45)',
  borderColor = 'rgba(0, 166, 255, 0.35)',
  hoverBorderColor = '#00A6FF',
  borderRadius = '12px',
  className = '',
  ...props
}) => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius }}
      className={`relative p-[1px] overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor-Following Spotlight Border Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: isHovered && !prefersReducedMotion
            ? `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor} 0%, rgba(0, 166, 255, 0.15) 50%, transparent 100%)`
            : `linear-gradient(135deg, ${borderColor} 0%, rgba(0, 166, 255, 0.1) 100%)`,
        }}
      />

      {/* Static Base Border Fallback */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-300"
        style={{
          borderRadius,
          border: `1px solid ${isHovered ? hoverBorderColor : borderColor}`,
        }}
      />

      {/* Inner Children Content (e.g. Button Body) */}
      <div
        style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </div>
  )
}

export default BorderGlow
