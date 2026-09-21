/**
 * Central Animation Easing Tokens
 * Studio-grade cubic bezier curves and transition timings
 */

export const EASINGS = {
  // Ultra smooth natural entrance (Vercel / Apple signature curve)
  studio: [0.22, 1, 0.36, 1],
  
  // Standard smooth curve for standard UI elements
  smooth: [0.25, 0.1, 0.25, 1],
  
  // High-energy snappy exit/entrance
  snappy: [0.16, 1, 0.3, 1],
  
  // Dramatic exponential decelerate
  expoOut: [0.19, 1, 0.22, 1],
  
  // Smooth gentle deceleration
  gentle: [0.33, 1, 0.68, 1],
  
  // Spring-like overshoot
  overshoot: [0.34, 1.56, 0.64, 1],
}

export const TRANSITION_DEFAULTS = {
  duration: 0.6,
  ease: EASINGS.studio,
}

export const SPRING_PRESETS = {
  stiff: { type: 'spring', stiffness: 300, damping: 30 },
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  wobbly: { type: 'spring', stiffness: 180, damping: 12 },
  bouncy: { type: 'spring', stiffness: 260, damping: 15 },
}
