import React from 'react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * SectionLaserDivider
 * Renders an enterprise hairline divider with a traveling glowing laser beam.
 * 
 * @param {'cyan' | 'amber' | 'dual' | 'blue'} variant - Color scheme of the traveling laser beam
 * @param {'bottom' | 'top'} position - Placement along the section border
 * @param {string} className - Additional CSS classes
 */
export const SectionLaserDivider = ({
  variant = 'cyan',
  position = 'bottom',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`global-section-laser-divider laser-pos-${position} ${className}`}
      aria-hidden="true"
    >
      {!prefersReducedMotion && (
        <>
          {(variant === 'cyan' || variant === 'dual' || variant === 'blue') && (
            <div className="global-laser-beam global-laser-cyan" />
          )}
          {(variant === 'amber' || variant === 'dual') && (
            <div className="global-laser-beam global-laser-amber" />
          )}
        </>
      )}
    </div>
  )
}

export default SectionLaserDivider
