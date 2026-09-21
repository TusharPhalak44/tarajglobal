import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Award, Sparkles, CheckCircle, Zap } from 'lucide-react'

// Array of 30 celebratory confetti particles for the blast explosion
const CONFETTI_PARTICLES = Array.from({ length: 30 }).map((_, i) => {
  const angle = (i * (360 / 30) * Math.PI) / 180
  const dist = 70 + (i % 5) * 22
  const x = Math.cos(angle) * dist
  const y = Math.sin(angle) * dist
  const colors = [
    '#00f0ff',
    '#fbbf24',
    '#ec4899',
    '#34d399',
    '#38bdf8',
    '#ffffff',
    '#a855f7',
    '#f97316',
  ]
  const color = colors[i % colors.length]
  const size = i % 3 === 0 ? 8 : i % 3 === 1 ? 6 : 4
  const isSquare = i % 2 === 0
  const delay = (i % 6) * 0.05

  return { id: i, x, y, color, size, isSquare, delay, rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 25) }
})

const CELEBRATION_MESSAGES = [
  '🎯 Verified Opt-In Readers!',
  '🚀 High-Intent CPL Leads!',
  '✨ 100% ICP Matched!',
  '🔥 Sales-Ready Opportunities!',
]

export default function WorkflowTargetBadge({
  isActive = false,
  isCompleted = false,
  onClick,
  isReducedMotion = false,
  className = '',
}) {
  const isCelebrated = isActive || isCompleted
  const [clickBurstKey, setClickBurstKey] = useState(0)
  const [floatingTexts, setFloatingTexts] = useState([])

  const handleClick = (e) => {
    e?.stopPropagation()
    const nextKey = clickBurstKey + 1
    setClickBurstKey(nextKey)

    const msg = CELEBRATION_MESSAGES[nextKey % CELEBRATION_MESSAGES.length]
    const newId = Date.now() + Math.random()
    setFloatingTexts((prev) => [...prev.slice(-2), { id: newId, text: msg }])

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== newId))
    }, 1800)

    if (onClick) onClick()
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }}
      className={`relative flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}
      title="Click to celebrate Qualified B2B Leads!"
    >
      {/* ── Outer Soft Atmospheric Glow ── */}
      <div
        className={`absolute -inset-4 rounded-full blur-[28px] transition-all duration-700 pointer-events-none ${
          isCelebrated
            ? 'bg-gradient-to-r from-sky-400/35 via-[#00f0ff]/45 to-amber-400/35 scale-110 opacity-90'
            : 'bg-primary/10 dark:bg-[#0077dd]/20 group-hover:bg-primary/25 opacity-50'
        }`}
      />

      {/* ── CLICK REACTION: Radial Luminous Flash Wave ── */}
      <AnimatePresence>
        {clickBurstKey > 0 && !isReducedMotion && (
          <motion.div
            key={`luminous-flash-${clickBurstKey}`}
            className="absolute -inset-8 rounded-full blur-xl pointer-events-none bg-gradient-to-r from-cyan-400/60 via-amber-300/60 to-sky-400/60"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── CONFETTI EXPLOSION PARTICLES ON CLICK ── */}
      <AnimatePresence>
        {clickBurstKey > 0 && !isReducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
            {CONFETTI_PARTICLES.map((p) => (
              <motion.div
                key={`confetti-${clickBurstKey}-${p.id}`}
                className="absolute shadow-sm"
                style={{
                  backgroundColor: p.color,
                  width: `${p.size}px`,
                  height: p.isSquare ? `${p.size}px` : `${p.size * 1.8}px`,
                  borderRadius: p.isSquare ? '2px' : '999px',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.2, rotate: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 1, 0],
                  scale: [0.2, 1.2, 0.8],
                  rotate: p.rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: p.delay,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ── FLOATING CELEBRATION CHIPS ── */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center gap-1">
        <AnimatePresence>
          {floatingTexts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: -12, scale: 1.05 }}
              exit={{ opacity: 0, y: -26, scale: 0.9 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="px-2.5 py-0.5 rounded-full bg-slate-900/95 dark:bg-black/90 border border-primary/40 dark:border-[#00f0ff]/50 text-white font-mono text-[10px] font-bold shadow-lg whitespace-nowrap"
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Outer Pulsing Target Halo Rings ── */}
      <motion.div
        className="absolute -inset-2 rounded-full border border-dashed border-primary/40 dark:border-[#00f0ff]/40 pointer-events-none"
        animate={isReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      {isCelebrated && !isReducedMotion && (
        <motion.div
          className="absolute -inset-3.5 rounded-full border border-dotted border-amber-400/40 dark:border-[#00e5ff]/50 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* ── Core Circular Badge ── */}
      <motion.div
        whileHover={isReducedMotion ? {} : { scale: 1.08 }}
        whileTap={isReducedMotion ? {} : { scale: 0.94 }}
        animate={
          isCelebrated && !isReducedMotion
            ? {
                scale: [1, 1.04, 1],
                boxShadow: [
                  '0 0 15px rgba(0,166,255,0.3)',
                  '0 0 35px rgba(0,210,255,0.6)',
                  '0 0 15px rgba(0,166,255,0.3)',
                ],
              }
            : {}
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`
          relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-3 text-center
          transition-all duration-500 shadow-xl backdrop-blur-md border-2
          ${
            isCelebrated
              ? 'bg-gradient-to-br from-primary via-[#0077dd] to-[#014499] dark:from-[#00c8ff] dark:via-[#0077ee] dark:to-[#032b69] border-white dark:border-[#00f0ff] text-white'
              : 'bg-white/95 dark:bg-[#031938]/90 border-slate-300 dark:border-[#0099ff]/50 text-slate-800 dark:text-white hover:border-primary'
          }
        `}
      >
        {/* Top Mini Pill */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider mb-1 ${
            isCelebrated
              ? 'bg-white/20 text-white'
              : 'bg-primary/10 text-primary dark:bg-[#00f0ff]/15 dark:text-[#00f0ff]'
          }`}
        >
          <Sparkles className="w-2.5 h-2.5" />
          TARGET GOAL
        </span>

        {/* Target Trophy / Crosshair Icon */}
        <div className="relative my-0.5">
          {isCelebrated ? (
            <Award className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-bounce" />
          ) : (
            <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary dark:text-[#00c8ff] group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Main Badge Text */}
        <div className="font-black text-[10.5px] sm:text-[11.5px] tracking-tight leading-tight uppercase font-heading">
          QUALIFIED B2B LEADS
        </div>

        {/* Verified Subtext */}
        <div
          className={`text-[7.5px] sm:text-[8px] font-mono mt-0.5 font-semibold ${
            isCelebrated ? 'text-sky-100 dark:text-[#cceeff]' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {isCelebrated ? '✓ PIPELINE READY' : 'CLICK TO TEST'}
        </div>
      </motion.div>
    </div>
  )
}
