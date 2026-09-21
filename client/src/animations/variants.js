import { EASINGS, TRANSITION_DEFAULTS } from './easings'

/**
 * Standard Framer Motion Variants Library
 * Provides consistent, high-performance animation presets across all pages and components
 */

// ── FADE VARIANTS ────────────────────────────────────────────────────────────
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

// ── SLIDE VARIANTS ───────────────────────────────────────────────────────────
export const slideUpVariants = {
  hidden: (custom = {}) => ({
    opacity: 0,
    y: custom.distance ?? 30,
  }),
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

export const slideDownVariants = {
  hidden: (custom = {}) => ({
    opacity: 0,
    y: -(custom.distance ?? 30),
  }),
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

export const slideLeftVariants = {
  hidden: (custom = {}) => ({
    opacity: 0,
    x: custom.distance ?? 40,
  }),
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

export const slideRightVariants = {
  hidden: (custom = {}) => ({
    opacity: 0,
    x: -(custom.distance ?? 40),
  }),
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

// ── SCALE VARIANTS ───────────────────────────────────────────────────────────
export const scaleInVariants = {
  hidden: (custom = {}) => ({
    opacity: 0,
    scale: custom.initialScale ?? 0.92,
  }),
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration ?? TRANSITION_DEFAULTS.duration,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.studio,
    },
  }),
}

// ── STAGGER CONTAINER VARIANTS ───────────────────────────────────────────────
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren ?? 0.12,
      delayChildren: custom.delayChildren ?? 0.05,
    },
  }),
}

// ── REVEAL MASK VARIANTS ─────────────────────────────────────────────────────
export const revealMaskVariants = {
  hidden: {
    clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    opacity: 0,
    y: 20,
  },
  visible: (custom = {}) => ({
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
      ease: custom.ease ?? EASINGS.snappy,
    },
  }),
}

// ── HOVER VARIANTS ───────────────────────────────────────────────────────────
export const hoverLiftVariants = {
  initial: { y: 0, scale: 1 },
  hover: (custom = {}) => ({
    y: -(custom.lift ?? 6),
    scale: custom.scale ?? 1.02,
    transition: {
      duration: 0.3,
      ease: EASINGS.studio,
    },
  }),
}
