// ── Standardized Framer Motion Presets & Utilities for Taraj Global ────────

export const TRANSITION_EASE = [0.22, 1, 0.36, 1] // Custom smooth ease-out
export const TRANSITION_SPRING = { type: 'spring', stiffness: 300, damping: 25 }

// Check if user prefers reduced motion
export const getPrefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Fade up animation preset
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: custom * 0.1,
      ease: TRANSITION_EASE,
    },
  }),
}

// Fade in preset
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.08,
      ease: 'easeOut',
    },
  }),
}

// Scale in preset (0.95 -> 1)
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: TRANSITION_EASE,
    },
  }),
}

// Staggered parent container variants
export const staggerContainerVariants = (stagger = 0.1, delayChildren = 0.15) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delayChildren,
    },
  },
})

// Slide in left
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.1,
      ease: TRANSITION_EASE,
    },
  }),
}

// Slide in right
export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: custom * 0.1,
      ease: TRANSITION_EASE,
    },
  }),
}

// Card hover effect preset
export const cardHoverProps = {
  whileHover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  whileTap: {
    scale: 0.985,
  },
}

// Magnetic button hover effect preset
export const buttonHoverProps = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  whileTap: {
    scale: 0.97,
  },
}
