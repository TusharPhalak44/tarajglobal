import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Award, PartyPopper } from 'lucide-react'

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
  '🎯 Discovery Meeting Booked!',
  '🚀 100% Sales Ready!',
  '✨ Verified Decision-Maker!',
  '🔥 High-Converting Opportunity!',
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
      title="Click to celebrate Qualified Sales Meetings!"
    >
      {/* Outer Soft Atmospheric Glow */}
      <div
        className={`absolute -inset-4 rounded-full blur-[28px] transition-all duration-700 pointer-events-none ${
          isCelebrated
            ? 'bg-gradient-to-r from-sky-400/35 via-[#00f0ff]/45 to-amber-400/35 scale-110 opacity-90'
            : 'bg-primary/10 dark:bg-[#0077dd]/20 group-hover:bg-primary/25 opacity-50'
        }`}
      />

      {/* CLICK REACTION: Radial Luminous Flash Wave */}
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

      {/* CELEBRATION BLAST: 360-Degree Confetti & Sparkles */}
      {(isCelebrated || clickBurstKey > 0) && !isReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-visible">
          {CONFETTI_PARTICLES.map((p) => (
            <motion.div
              key={`confetti-${clickBurstKey}-${p.id}`}
              className="absolute pointer-events-none"
              style={{
                backgroundColor: p.color,
                width: p.size,
                height: p.isSquare ? p.size * 1.6 : p.size,
                borderRadius: p.isSquare ? '2px' : '50%',
                boxShadow: `0 0 10px ${p.color}`,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: [0, p.x * 0.65, p.x],
                y: [0, p.y * 0.65, p.y],
                scale: [0, 1.4, 0],
                rotate: [0, p.rotate / 2, p.rotate],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
                delay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* FLOATING SUCCESS CHIPS ON CLICK */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-40 flex flex-col items-center gap-1">
        <AnimatePresence>
          {floatingTexts.map((chip) => (
            <motion.div
              key={chip.id}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: -20, scale: 1.05 }}
              exit={{ opacity: 0, y: -45, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-900/95 dark:bg-black/95 text-white text-xs font-mono font-bold shadow-xl border border-[#00f0ff]/50 backdrop-blur-md"
            >
              {chip.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── CENTRAL TARGET BADGE CONTAINER (Round Circular Badge) ── */}
      <motion.div
        whileHover={isReducedMotion ? {} : { scale: 1.08 }}
        whileTap={isReducedMotion ? {} : { scale: 0.92 }}
        animate={
          isCelebrated && !isReducedMotion
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
              }
            : {}
        }
        className={`
          relative w-24 h-24 sm:w-28 sm:h-28 rounded-full
          flex flex-col items-center justify-center text-center p-2.5
          transition-all duration-500 backdrop-blur-xl
          border-2 shadow-2xl
          ${
            isCelebrated
              ? 'border-primary dark:border-[#00f0ff] bg-gradient-to-b from-sky-100/95 via-white/95 to-sky-50/98 dark:from-[#082a5c] dark:via-[#041d44] dark:to-[#021029] shadow-[0_0_40px_rgba(0,180,255,0.6)] dark:shadow-[0_0_50px_rgba(0,220,255,0.7)]'
              : 'border-slate-300 dark:border-[#0088ff]/50 bg-white/95 dark:bg-gradient-to-b dark:from-[#031c3e] dark:via-[#021430] dark:to-[#010c20] group-hover:border-primary dark:group-hover:border-[#00d2ff] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          }
        `}
      >
        {/* Continuous Outer Rotating Luminous Ring */}
        {!isReducedMotion && (
          <motion.div
            className="absolute -inset-2 rounded-full border border-dashed border-primary/40 dark:border-[#00d2ff]/50 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Inner Pulsing Radar Glow */}
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-1 ${
            isCelebrated
              ? 'bg-primary/20 dark:bg-[#00d2ff]/25 text-primary dark:text-[#00f0ff] shadow-[0_0_20px_rgba(0,200,255,0.6)] scale-110'
              : 'bg-slate-100 dark:bg-[#004499]/25 text-slate-700 dark:text-[#00c8ff] group-hover:bg-primary/15 dark:group-hover:bg-[#00d2ff]/20'
          }`}
        >
          {isCelebrated ? (
            <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5 animate-pulse text-primary dark:text-[#00f0ff]" />
          ) : (
            <Target className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          )}
        </div>

        {/* Category Tag */}
        <span className="text-[8px] sm:text-[8.5px] font-mono font-black tracking-widest text-primary dark:text-[#00d2ff] uppercase leading-none">
          OUTCOME
        </span>

        {/* Goal Title */}
        <span className="text-[9.5px] sm:text-[10px] font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight mt-0.5 max-w-[80px]">
          QUALIFIED MEETINGS
        </span>

        {/* Celebratory Click Badge Pill */}
        <div className="mt-1">
          <span
            className={`text-[7px] sm:text-[7.5px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-full transition-all duration-300 ${
              isCelebrated
                ? 'bg-primary/20 dark:bg-[#00d2ff]/30 text-primary dark:text-[#00f0ff] border border-primary/40 dark:border-[#00d2ff]/50'
                : 'bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-primary/20 dark:group-hover:bg-[#00d2ff]/20'
            }`}
          >
            {isCelebrated ? '100% READY' : 'SALES GOAL'}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
