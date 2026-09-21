import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * GrowthJourneyButtons
 * Custom button system for the B2B Growth Journey:
 * - MagneticPrimary: Dark/black base, subtle arrow slide, smooth 400ms transition, slight magnetic scale
 * - OutlineSecondary: Minimal outline, arrow icon, border & background fill on hover
 * - CircularCTA: Large interactive circular button that expands, rotates arrow, and animates outer ring
 * - EditorialLink: Animated text underline with sliding arrow
 */

export function MagneticPrimaryButton({
  children = 'START A CONVERSATION',
  to = '/contact',
  onClick,
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer select-none transition-all duration-500 overflow-hidden ${className}`}
      style={{
        backgroundColor: isDark ? '#FFFFFF' : '#080A0F',
        color: isDark ? '#080A0F' : '#FFFFFF',
        boxShadow: isHovered
          ? isDark
            ? '0 12px 32px -6px rgba(255, 255, 255, 0.35)'
            : '0 12px 32px -6px rgba(8, 10, 15, 0.4)'
          : '0 4px 14px rgba(0, 0, 0, 0.1)',
      }}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
        {children}
      </span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-400 ease-out ${
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

export function OutlineSecondaryButton({
  children = 'EXPLORE SERVICES',
  to,
  onClick,
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-widest cursor-pointer select-none transition-all duration-400 border backdrop-blur-md ${className}`}
      style={{
        backgroundColor: isHovered
          ? isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(8, 10, 15, 0.05)'
          : 'transparent',
        borderColor: isHovered
          ? isDark ? '#FFFFFF' : '#080A0F'
          : isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(8, 10, 15, 0.25)',
        color: isDark ? '#FFFFFF' : '#080A0F',
      }}
    >
      <span>{children}</span>
      <ArrowUpRight
        className={`w-4 h-4 transition-transform duration-400 ease-out ${
          isHovered ? 'translate-x-1 -translate-y-1' : 'translate-x-0 translate-y-0'
        }`}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function CircularCTAButton({
  children = 'START A CONVERSATION',
  to = '/contact',
  onClick,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Surrounding Animated Ring */}
      <motion.div
        animate={isHovered ? { scale: 1.25, opacity: 0.8 } : { scale: 1.1, opacity: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed pointer-events-none"
        style={{
          borderColor: isDark ? '#00A6FF' : '#0066CC',
        }}
      />

      {/* Main Circular Button */}
      <motion.div
        animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center p-6 text-center transition-shadow duration-500 shadow-2xl relative z-10"
        style={{
          backgroundColor: isDark ? '#FFFFFF' : '#080A0F',
          color: isDark ? '#080A0F' : '#FFFFFF',
          boxShadow: isHovered
            ? isDark
              ? '0 20px 50px rgba(0, 166, 255, 0.4)'
              : '0 20px 50px rgba(0, 0, 0, 0.35)'
            : '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-2 leading-tight">
          {children}
        </span>
        <ArrowUpRight
          className={`w-6 h-6 transition-transform duration-500 ease-out ${
            isHovered ? 'translate-x-1.5 -translate-y-1.5 rotate-45' : 'translate-x-0 translate-y-0'
          }`}
          style={{ color: isDark ? '#00A6FF' : '#FF6D00' }}
        />
      </motion.div>
    </motion.div>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function EditorialLink({
  children,
  to = '#',
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative ${className}`}
      style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
    >
      <span className="relative">
        {children}
        <span
          className="absolute left-0 bottom-[-2px] w-full h-[1px] origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
          style={{ backgroundColor: isDark ? '#FFFFFF' : '#080A0F' }}
        />
      </span>
      <ArrowRight
        className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
          isHovered ? 'translate-x-1' : 'translate-x-0'
        }`}
      />
    </Link>
  )
}
