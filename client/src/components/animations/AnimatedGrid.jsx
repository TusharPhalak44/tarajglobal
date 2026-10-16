import React from 'react'

/**
 * AnimatedGrid
 * Subtle, lightweight technical coordinate grid background pattern.
 * Pure CSS solution with spacious 64px cell size, low opacity (barely visible texture),
 * and smooth gradient fade masks around the edges and boundaries.
 */
export const AnimatedGrid = ({
  size = 64,
  opacity = 0.035,
  color = '#00A6FF',
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, ${color}26 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
        }}
      />
    </div>
  )
}

export default AnimatedGrid


