import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * CommandButtons — TaRaj Global "Command Center" Button System
 * - Restrained, refined shapes (slightly squared rounded-md, not giant pills everywhere)
 * - Primary: Dark background in light mode / pure white in dark mode.
 *   Hover: button expands slightly, arrow moves right 5-8px, border animates, background subtly changes.
 * - Secondary: Transparent, thin 1px border, arrow.
 * - TextLink: Underline grows from left -> right.
 */

export function CommandPrimaryButton({
  children = 'START A CONVERSATION',
  to = '/contact',
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
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer select-none transition-all duration-300 border ${
        isLarge ? 'px-8 py-4 text-sm sm:text-base' : 'px-6 py-3.5'
      } ${className}`}
      style={{
        backgroundColor: isDark ? '#FFFFFF' : '#0B0F19',
        color: isDark ? '#0B0F19' : '#FFFFFF',
        borderColor: isHovered
          ? isDark ? '#38BDF8' : '#0284C7'
          : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(11, 15, 25, 0.2)',
        boxShadow: isHovered
          ? isDark
            ? '0 8px 24px -4px rgba(56, 189, 248, 0.25)'
            : '0 8px 24px -4px rgba(11, 15, 25, 0.25)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <span className="relative z-10 transition-transform duration-200">
        {children}
      </span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1.5' : 'translate-x-0'
        }`}
        style={{ color: isDark ? '#0284C7' : '#38BDF8' }}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function CommandSecondaryButton({
  children = 'EXPLORE SERVICES',
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
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-md font-mono text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer select-none transition-all duration-300 border ${
        isLarge ? 'px-8 py-4 text-sm sm:text-base' : 'px-6 py-3.5'
      } ${className}`}
      style={{
        backgroundColor: isHovered
          ? isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(11, 15, 25, 0.04)'
          : 'transparent',
        borderColor: isHovered
          ? isDark ? '#38BDF8' : '#0284C7'
          : isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(11, 15, 25, 0.25)',
        color: isDark ? '#FFFFFF' : '#0B0F19',
      }}
    >
      <span>{children}</span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1' : 'translate-x-0'
        }`}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function CommandTextLink({
  children,
  to = '#',
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${className}`}
      style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
    >
      <span className="relative">
        {children}
        <span
          className="absolute bottom-[-2px] left-0 w-full h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          style={{ backgroundColor: isDark ? '#38BDF8' : '#0284C7' }}
        />
      </span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}
