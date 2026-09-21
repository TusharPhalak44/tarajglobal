import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedGrid } from './AnimatedGrid'
import { GradientOrb } from './GradientOrb'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * AnimatedSectionBackground
 * High-performance, subtle ambient background system supporting:
 * - Technical fine grid
 * - Ambient radial gradient orbs
 * - Moving soft gradient line
 * - Responsive to light and dark themes
 * - Section-specific accent tinting (blue, cyan, orange, purple, emerald)
 */
export const AnimatedSectionBackground = ({
  accent = 'blue', // 'blue' | 'orange' | 'cyan' | 'purple' | 'emerald'
  showGrid = true,
  showOrbs = true,
  showLine = true,
  className = '',
}) => {
  const [isDark, setIsDark] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Accent color mappings
  const accentColors = {
    blue: {
      primary: isDark ? 'rgba(0, 102, 204, 0.16)' : 'rgba(0, 102, 204, 0.05)',
      secondary: isDark ? 'rgba(0, 166, 255, 0.12)' : 'rgba(0, 166, 255, 0.04)',
      tertiary: isDark ? 'rgba(255, 109, 0, 0.08)' : 'rgba(255, 109, 0, 0.03)',
      gridColor: isDark ? '#00A6FF' : '#0066CC',
      lineGrad: 'from-transparent via-primary/30 to-transparent',
    },
    orange: {
      primary: isDark ? 'rgba(255, 109, 0, 0.16)' : 'rgba(255, 109, 0, 0.05)',
      secondary: isDark ? 'rgba(255, 165, 0, 0.12)' : 'rgba(255, 165, 0, 0.04)',
      tertiary: isDark ? 'rgba(0, 166, 255, 0.08)' : 'rgba(0, 166, 255, 0.03)',
      gridColor: isDark ? '#FF6D00' : '#FF8533',
      lineGrad: 'from-transparent via-cta/30 to-transparent',
    },
    cyan: {
      primary: isDark ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.05)',
      secondary: isDark ? 'rgba(0, 166, 255, 0.12)' : 'rgba(0, 166, 255, 0.04)',
      tertiary: isDark ? 'rgba(255, 109, 0, 0.08)' : 'rgba(255, 109, 0, 0.03)',
      gridColor: isDark ? '#00E5FF' : '#00A6FF',
      lineGrad: 'from-transparent via-[#00E5FF]/30 to-transparent',
    },
    purple: {
      primary: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.05)',
      secondary: isDark ? 'rgba(0, 166, 255, 0.10)' : 'rgba(0, 166, 255, 0.03)',
      tertiary: isDark ? 'rgba(255, 109, 0, 0.08)' : 'rgba(255, 109, 0, 0.03)',
      gridColor: isDark ? '#A855F7' : '#8B5CF6',
      lineGrad: 'from-transparent via-purple-500/30 to-transparent',
    },
    emerald: {
      primary: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.05)',
      secondary: isDark ? 'rgba(0, 166, 255, 0.10)' : 'rgba(0, 166, 255, 0.03)',
      tertiary: isDark ? 'rgba(255, 109, 0, 0.06)' : 'rgba(255, 109, 0, 0.02)',
      gridColor: isDark ? '#10B981' : '#059669',
      lineGrad: 'from-transparent via-emerald-500/30 to-transparent',
    },
  }[accent] || {}

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* ── Base Section Fill ────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 transition-colors duration-500" 
        style={{
          backgroundColor: isDark ? '#080C14' : 'transparent',
        }}
      />

      {/* ── Technical Grid Overlay ────────────────────────────────────── */}
      {showGrid && (
        <AnimatedGrid
          opacity={isDark ? 0.03 : 0.025}
          size={56}
          color={accentColors.gridColor}
        />
      )}

      {/* ── Floating Blurred Radial Orbs ──────────────────────────────── */}
      {showOrbs && (
        <>
          {/* Primary Top-Left Orb */}
          <GradientOrb
            color={accentColors.primary}
            size={650}
            blur={150}
            top="-15%"
            left="10%"
            duration={9}
          />

          {/* Secondary Bottom-Right Orb */}
          <GradientOrb
            color={accentColors.secondary}
            size={550}
            blur={140}
            top="45%"
            left="65%"
            duration={11}
            delay={2}
          />

          {/* Tertiary Warm Accent Glow */}
          <GradientOrb
            color={accentColors.tertiary}
            size={450}
            blur={130}
            top="25%"
            left="80%"
            duration={13}
            delay={4}
          />
        </>
      )}

      {/* ── Slow Moving Subtle Gradient Line ──────────────────────────── */}
      {showLine && !prefersReducedMotion && (
        <motion.div
          className={`absolute left-0 right-0 h-[1px] bg-gradient-to-r ${accentColors.lineGrad}`}
          initial={{ top: '15%', opacity: 0 }}
          animate={{
            top: ['15%', '85%', '15%'],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  )
}

export default AnimatedSectionBackground
