import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CleanButtons — Refined B2B SaaS Button System
 * Primary:
 * - Dark filled button (in light mode) / Crisp white filled (in dark mode)
 * - On hover: arrow moves 5–8px right, slight expand (scale 1.015), smooth background transition, subtle border highlight
 * - Transition: 300–450ms smooth easing
 *
 * Secondary:
 * - Refined 1px outline button
 * - On hover: subtle background fill, arrow moves 5px right, border becomes stronger
 */

export function CleanPrimaryButton({
  children = 'Start a Conversation',
  to = '/contact',
  onClick,
  className = '',
  size = 'default', // 'default' | 'large'
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const isLarge = size === 'large'

  const content = (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-lg font-medium cursor-pointer select-none transition-all duration-300 border ${
        isLarge ? 'px-8 py-4 text-base tracking-wide font-semibold' : 'px-6 py-3 text-sm tracking-normal'
      } ${className}`}
      style={{
        backgroundColor: isDark ? '#FFFFFF' : '#0B0F19',
        color: isDark ? '#0B0F19' : '#FFFFFF',
        borderColor: isHovered
          ? isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 25, 0.9)'
          : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(11, 15, 25, 0.1)',
        boxShadow: isHovered
          ? isDark
            ? '0 10px 25px -5px rgba(255, 255, 255, 0.2)'
            : '0 10px 25px -5px rgba(11, 15, 25, 0.25)'
          : '0 2px 6px rgba(0, 0, 0, 0.04)',
        transform: isHovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <span className="relative z-10 transition-transform duration-300">
        {children}
      </span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1.5' : 'translate-x-0'
        }`}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function CleanSecondaryButton({
  children = 'Explore Services',
  to,
  onClick,
  className = '',
  size = 'default',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const isLarge = size === 'large'

  const content = (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-lg font-medium cursor-pointer select-none transition-all duration-300 border ${
        isLarge ? 'px-8 py-4 text-base font-semibold' : 'px-6 py-3 text-sm'
      } ${className}`}
      style={{
        backgroundColor: isHovered
          ? isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(11, 15, 25, 0.04)'
          : 'transparent',
        borderColor: isHovered
          ? isDark ? '#FFFFFF' : '#0B0F19'
          : isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(11, 15, 25, 0.2)',
        color: isDark ? '#FFFFFF' : '#0B0F19',
      }}
    >
      <span>{children}</span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1.5' : 'translate-x-0'
        }`}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}
