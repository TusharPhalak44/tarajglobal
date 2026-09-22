import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'
import { useReducedMotion } from '@hooks/useReducedMotion'
import TarajButton from './TarajButton'

// 5 Network Nodes: Data → Decision Makers → Engagement → Opportunities → Pipeline
const NETWORK_NODES = [
  { id: 'data', label: 'Data', x: '18%', y: '28%', delay: 0 },
  { id: 'decision', label: 'Decision Makers', x: '38%', y: '68%', delay: 0.6 },
  { id: 'engagement', label: 'Engagement', x: '55%', y: '24%', delay: 1.2 },
  { id: 'opportunities', label: 'Opportunities', x: '72%', y: '62%', delay: 1.8 },
  { id: 'pipeline', label: 'Pipeline', x: '86%', y: '32%', delay: 2.4 },
]

export default function EditorialHeroV2() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)

  const handleScrollToDirectory = () => {
    const el = document.getElementById('service-directory')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#080A0F' : '#FAFBFD',
      }}
      aria-label="Taraj Global Services — Editorial B2B Growth Platform"
    >
      {/* ── Background Subtle Network of Connected Dots & Lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-40"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(0, 166, 255, 0.15) 0%, rgba(255, 109, 0, 0.08) 50%, transparent 80%)'
              : 'radial-gradient(ellipse, rgba(0, 102, 204, 0.1) 0%, rgba(255, 107, 0, 0.06) 50%, transparent 80%)',
          }}
        />

        {/* SVG Network Canvas with animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-75">
          <defs>
            <linearGradient id="networkLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#00A6FF' : '#0066CC'} stopOpacity="0.15" />
              <stop offset="50%" stopColor={isDark ? '#38BDF8' : '#0284C7'} stopOpacity="0.45" />
              <stop offset="100%" stopColor={isDark ? '#FF6D00' : '#EA580C'} stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Animated Connecting Pathways */}
          <polyline
            points="180,180 380,440 580,160 760,400 920,210"
            fill="none"
            stroke="url(#networkLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className={prefersReducedMotion ? '' : 'animate-pulse'}
          />
        </svg>

        {/* Floating Telemetry Nodes (Data → Decision Makers → Engagement → Opportunities → Pipeline) */}
        {NETWORK_NODES.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.8 }
                : { opacity: [0.5, 0.95, 0.5], scale: [1, 1.05, 1] }
            }
            transition={{ duration: 6, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
            className="hidden md:flex absolute flex-col items-center gap-2 pointer-events-none"
            style={{ left: node.x, top: node.y }}
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isDark ? '#00A6FF' : '#0066CC' }} />
              <span
                className="absolute w-5 h-5 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: isDark ? '#00A6FF' : '#0066CC' }}
              />
            </div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                color: isDark ? '#94A3B8' : '#64748B',
              }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* Subtle Horizontal Grid lines for Editorial feel */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? '#FFF' : '#000'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? '#FFF' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Main Editorial Content ── */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl">

          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span
              className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                color: isDark ? '#A1A1AA' : '#52525B',
              }}
            >
              OUR SERVICES
            </span>
            <span
              className="w-12 h-[1px]"
              style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)' }}
            />
          </motion.div>

          {/* Large Headline focused on B2B Growth */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] mb-8"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Everything You Need{' '}
            <span className="block mt-1 font-light italic">
              to Build Better{' '}
              <span
                className="font-extrabold not-italic inline-block"
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 60%, #FF6D00 100%)'
                    : 'linear-gradient(135deg, #0B0F19 0%, #0066CC 60%, #EA580C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                B2B Growth.
              </span>
            </span>
          </motion.h1>

          {/* Subtitle with generous whitespace */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl font-normal mb-12"
            style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
          >
            From demand generation to qualified pipeline, Taraj Global brings strategy, data and execution together to help B2B businesses grow.
          </motion.p>

          {/* Custom Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <TarajButton to="/contact" variant="primary" size="lg">
              Start a Conversation
            </TarajButton>

            <TarajButton onClick={handleScrollToDirectory} variant="secondary" size="lg">
              Explore Services
            </TarajButton>
          </motion.div>

        </div>
      </div>

      {/* Editorial Bottom Meta Ticker */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 border-t mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)', color: isDark ? '#64748B' : '#9CA3AF' }}
      >
        <div className="flex items-center gap-6 uppercase tracking-wider">
          <span>01 / DATA</span>
          <span>→</span>
          <span>02 / DECISION MAKERS</span>
          <span>→</span>
          <span>03 / PIPELINE</span>
        </div>
        <div>
          <span>SCROLL TO EXPLORE ARCHITECTURE ↓</span>
        </div>
      </div>
    </section>
  )
}
