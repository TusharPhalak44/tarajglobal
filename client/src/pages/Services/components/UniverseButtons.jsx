import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

/**
 * UniverseButtons — 3 completely new button designs for the Services Experience:
 * 1. MagneticButton (Type 01): Button subtly follows cursor on desktop.
 * 2. ArrowRevealButton (Type 02): Arrow slides in from outside on hover.
 * 3. CircularProjectButton (Type 03): Huge circular button that expands, rotates arrow, and animates outer ring.
 */

export function MagneticButton({
  children = 'START A CONVERSATION',
  to = '/contact',
  onClick,
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const btnRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setOffset({ x: x * 0.25, y: y * 0.25 })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const content = (
    <motion.span
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md font-mono text-xs sm:text-sm font-black uppercase tracking-widest cursor-pointer select-none transition-all duration-300 border ${className}`}
      style={{
        backgroundColor: isDark ? '#FFFFFF' : '#090D15',
        color: isDark ? '#090D15' : '#FFFFFF',
        borderColor: isDark ? '#38BDF8' : '#0284C7',
        boxShadow: isDark
          ? '0 10px 30px -5px rgba(56, 189, 248, 0.3)'
          : '0 10px 30px -5px rgba(9, 13, 21, 0.3)',
      }}
    >
      <span className="relative z-10 transition-transform duration-200 group-hover:-translate-x-0.5">
        {children}
      </span>
      <ArrowRight
        className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        style={{ color: isDark ? '#0284C7' : '#38BDF8' }}
      />
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function ArrowRevealButton({
  children = 'EXPLORE SERVICE',
  to,
  onClick,
  className = '',
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const content = (
    <motion.span
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md font-mono text-xs font-bold uppercase tracking-wider cursor-pointer select-none transition-all duration-300 border overflow-hidden backdrop-blur-md ${className}`}
      style={{
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(9, 13, 21, 0.03)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
        color: isDark ? '#FFFFFF' : '#090D15',
      }}
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        {children}
      </span>
      {/* Arrow that enters from the right on hover */}
      <div className="relative w-4 h-4 overflow-hidden">
        <ArrowRight
          className="w-4 h-4 absolute inset-0 transition-transform duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
        />
        <ArrowRight
          className="w-4 h-4 absolute inset-0 transition-transform duration-300 translate-x-0 opacity-70 group-hover:translate-x-full group-hover:opacity-0"
        />
      </div>
    </motion.span>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}

export function CircularProjectButton({
  children = 'START A CONVERSATION',
  to = '/contact',
  onClick,
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Outer Dashed Orbit Ring */}
      <motion.div
        animate={isHovered ? { scale: 1.25, opacity: 0.8 } : { scale: 1.08, opacity: 0.25 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: isDark ? '#38BDF8' : '#0284C7' }}
      />

      {/* Main Circular Button */}
      <motion.div
        animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center p-6 text-center transition-shadow duration-500 shadow-2xl relative z-10"
        style={{
          backgroundColor: isDark ? '#FFFFFF' : '#090D15',
          color: isDark ? '#090D15' : '#FFFFFF',
          boxShadow: isHovered
            ? isDark
              ? '0 20px 50px rgba(56, 189, 248, 0.4)'
              : '0 20px 50px rgba(9, 13, 21, 0.4)'
            : '0 10px 25px rgba(0, 0, 0, 0.15)',
        }}
      >
        <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider mb-2 leading-tight">
          {children}
        </span>
        <ArrowUpRight
          className={`w-6 h-6 transition-transform duration-400 ease-out ${
            isHovered ? 'translate-x-1.5 -translate-y-1.5 rotate-45 text-sky-500' : 'translate-x-0 translate-y-0 text-sky-400'
          }`}
        />
      </motion.div>
    </div>
  )

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>
  }
  return <button type="button" onClick={onClick} className="inline-block">{content}</button>
}
