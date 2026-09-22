import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'

const ROW1 = [
  'LEAD GENERATION',
  'ACCOUNT-BASED MARKETING',
  'COLD EMAIL OUTREACH',
  'CONTENT SYNDICATION',
  'B2B WEBINARS',
  'LEAD NURTURING',
  'DEMAND GENERATION',
]

const ROW2 = [
  'BANT QUALIFICATION',
  'SQL PIPELINE',
  'APPOINTMENT SETTING',
  'B2B LIST BUILDING',
  'DATABASE CLEANSING',
  'HQL VERIFICATION',
  'INTENT TELEMETRY',
]

export default function JourneyServiceWall() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Multi-speed parallax transforms
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -250])
  const x2 = useTransform(scrollYProgress, [0, 1], [-250, 0])

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden select-none border-b"
      style={{
        backgroundColor: isDark ? '#04060A' : '#F4F6FB',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="One Pipeline. Multiple Growth Channels. — Service Marquee Wall"
    >
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 mb-14 text-center">
        <span
          className="font-mono text-xs font-bold uppercase tracking-[0.25em] block mb-3"
          style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}
        >
          OMNICHANNEL SYNCHRONIZATION
        </span>
        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          style={{ color: isDark ? '#FFFFFF' : '#080A0F' }}
        >
          One Pipeline.{' '}
          <span className="font-light italic">Multiple Growth Channels.</span>
        </h2>
      </div>

      {/* Row 1 Moving Left */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: x1 }}
        className="flex whitespace-nowrap gap-8 mb-6 cursor-default"
      >
        {[...ROW1, ...ROW1, ...ROW1].map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-6 font-mono text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-opacity duration-300 hover:opacity-100"
            style={{
              color: isDark ? '#FFFFFF' : '#080A0F',
              opacity: i % 2 === 0 ? 0.35 : 0.7,
            }}
          >
            <span>{item}</span>
            <span className="text-xl sm:text-3xl opacity-40 text-sky-400">•</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 Moving Right */}
      <motion.div
        style={prefersReducedMotion ? {} : { x: x2 }}
        className="flex whitespace-nowrap gap-8 cursor-default"
      >
        {[...ROW2, ...ROW2, ...ROW2].map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-6 font-mono text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-opacity duration-300 hover:opacity-100"
            style={{
              color: isDark ? '#FFFFFF' : '#080A0F',
              opacity: i % 2 === 0 ? 0.65 : 0.3,
            }}
          >
            <span>{item}</span>
            <span className="text-xl sm:text-3xl opacity-40 text-orange-400">•</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
