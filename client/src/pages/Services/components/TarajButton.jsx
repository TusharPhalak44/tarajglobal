import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * TarajButton
 * Custom button system for TaRaj Global Services page:
 * - Primary: Dark/black base, subtle arrow movement, smooth 300-500ms transition, slight magnetic feel
 * - Secondary: Transparent, thin animated border, background transition on hover
 * - TextLink: Editorial animated underline + arrow
 */
export default function TarajButton({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'link'
  size = 'md', // 'sm' | 'md' | 'lg'
  arrow = true,
  className = '',
  type = 'button',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  // Size mapping
  const SIZES = {
    sm: 'h-10 px-5 text-xs font-semibold tracking-wide',
    md: 'h-12 px-7 text-xs sm:text-sm font-semibold tracking-wide',
    lg: 'h-14 px-9 text-sm sm:text-base font-semibold tracking-wide',
  }

  // Variant Styles
  let baseStyle = {}
  let arrowClass = 'transition-transform duration-300 ease-out'

  if (variant === 'primary') {
    baseStyle = {
      backgroundColor: isDark ? '#FFFFFF' : '#0B0F19',
      color: isDark ? '#0B0F19' : '#FFFFFF',
      border: '1px solid transparent',
      boxShadow: isHovered
        ? isDark
          ? '0 10px 25px -5px rgba(255, 255, 255, 0.25)'
          : '0 10px 25px -5px rgba(11, 15, 25, 0.35)'
        : '0 2px 8px rgba(0, 0, 0, 0.08)',
    }
  } else if (variant === 'secondary') {
    baseStyle = {
      backgroundColor: isHovered
        ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(11, 15, 25, 0.05)'
        : 'transparent',
      color: isDark ? '#FFFFFF' : '#0B0F19',
      border: isDark
        ? `1px solid ${isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)'}`
        : `1px solid ${isHovered ? '#0B0F19' : 'rgba(11, 15, 25, 0.25)'}`,
    }
  } else if (variant === 'link') {
    return (
      <Link
        to={to || '#'}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-300 relative ${className}`}
        style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
      >
        <span className="relative">
          {children}
          <span
            className="absolute left-0 bottom-0 w-full h-[1px] origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
            style={{ backgroundColor: isDark ? '#FFFFFF' : '#0B0F19' }}
          />
        </span>
        {arrow && (
          <ArrowRight
            className={`w-4 h-4 transition-transform duration-300 ease-out ${
              isHovered ? 'translate-x-1.5' : 'translate-x-0'
            }`}
          />
        )}
      </Link>
    )
  }

  const innerContent = (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer select-none transition-all duration-300 ease-out ${
        SIZES[size] || SIZES.md
      } ${className}`}
      style={baseStyle}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className={`w-4 h-4 shrink-0 ${arrowClass} ${
            isHovered ? 'translate-x-1.5' : 'translate-x-0'
          }`}
        />
      )}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {innerContent}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {innerContent}
    </button>
  )
}
