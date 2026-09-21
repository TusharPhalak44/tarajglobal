import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CyberButton
 * Ultra-attractive, high-impact interactive button featuring:
 * - Radiant neon ambient glow
 * - Dynamic light sweep shimmer
 * - Flying magnetic arrow
 * - Fluid click bounce
 * - Seamless Link vs Button rendering
 */
export default function CyberButton({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'orange' | 'glass' | 'emerald' | 'purple'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  icon = true,
  iconComponent: CustomIcon = null,
  className = '',
  sparkle = false,
  fullWidth = false,
  type = 'button',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  // Variant color definitions
  const VARIANTS = {
    primary: {
      gradient: isDark
        ? 'linear-gradient(135deg, #00A6FF 0%, #0284C7 50%, #0369A1 100%)'
        : 'linear-gradient(135deg, #0088FF 0%, #0066CC 100%)',
      glow: 'rgba(0, 166, 255, 0.45)',
      text: '#FFFFFF',
      border: isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(0, 102, 204, 0.4)',
      shimmer: 'rgba(255, 255, 255, 0.35)',
    },
    orange: {
      gradient: isDark
        ? 'linear-gradient(135deg, #FF6D00 0%, #EA580C 50%, #C2410C 100%)'
        : 'linear-gradient(135deg, #FF6D00 0%, #E65100 100%)',
      glow: 'rgba(255, 109, 0, 0.45)',
      text: '#FFFFFF',
      border: isDark ? 'rgba(251, 146, 60, 0.6)' : 'rgba(234, 88, 12, 0.4)',
      shimmer: 'rgba(255, 255, 255, 0.35)',
    },
    emerald: {
      gradient: isDark
        ? 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)'
        : 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
      glow: 'rgba(16, 185, 129, 0.45)',
      text: '#FFFFFF',
      border: isDark ? 'rgba(52, 211, 153, 0.6)' : 'rgba(16, 185, 129, 0.4)',
      shimmer: 'rgba(255, 255, 255, 0.35)',
    },
    purple: {
      gradient: isDark
        ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)'
        : 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
      glow: 'rgba(139, 92, 246, 0.45)',
      text: '#FFFFFF',
      border: isDark ? 'rgba(167, 139, 250, 0.6)' : 'rgba(124, 58, 237, 0.4)',
      shimmer: 'rgba(255, 255, 255, 0.35)',
    },
    glass: {
      gradient: isDark
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 246, 255, 0.8) 100%)',
      glow: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(0, 102, 204, 0.12)',
      text: isDark ? '#F1F5F9' : '#0F172A',
      border: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)',
      shimmer: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 102, 204, 0.15)',
    },
  }

  const SIZES = {
    sm: 'h-9 px-4 text-xs font-semibold rounded-xl gap-1.5',
    md: 'h-12 px-6 text-xs sm:text-sm font-bold rounded-2xl gap-2.5',
    lg: 'h-14 px-8 text-sm sm:text-base font-bold rounded-2xl gap-3',
    xl: 'h-16 px-10 text-base sm:text-lg font-black rounded-2xl gap-3.5',
  }

  const v = VARIANTS[variant] || VARIANTS.primary
  const s = SIZES[size] || SIZES.md

  const content = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none tracking-wider uppercase backdrop-blur-md transition-shadow duration-300 ${s} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={{
        background: v.gradient,
        color: v.text,
        border: `1px solid ${v.border}`,
        boxShadow: isHovered
          ? `0 12px 30px -5px ${v.glow}, 0 0 20px ${v.glow}`
          : `0 4px 15px -3px ${v.glow}`,
      }}
    >
      {/* Light Sweep Shimmer Effect */}
      <motion.div
        animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 0.85, ease: 'easeInOut' }}
        className="absolute inset-y-0 w-1/2 skew-x-12 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${v.shimmer} 50%, transparent 100%)`,
        }}
      />

      {/* Sparkle Icon */}
      {sparkle && <Sparkles className="w-4 h-4 shrink-0 animate-pulse text-amber-300" />}

      {/* Button Label */}
      <span className="relative z-10 font-bold">{children}</span>

      {/* Trailing Icon with Flying Animation */}
      {icon && (
        <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
          {CustomIcon ? (
            <CustomIcon className="w-4 h-4 shrink-0" />
          ) : (
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      )}
    </motion.div>
  )

  if (to) {
    return (
      <Link to={to} className={`group inline-block ${fullWidth ? 'w-full' : ''}`}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`group inline-block ${fullWidth ? 'w-full' : ''}`}>
      {content}
    </button>
  )
}
