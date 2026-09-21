import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Award, PartyPopper, Sparkles, CheckCircle, Zap } from 'lucide-react'

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
  '🎯 100% BANT Certified!',
  '🚀 Budget & Timeline Locked!',
  '✨ Qualified BANT Leads!',
  '🔥 Economic Signer Ready!',
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

    // Spawn floating celebration chip
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
      title="Click to celebrate Qualified BANT Leads!"
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
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap shadow-lg bg-gradient-to-r from-sky-500 via-[#00c8ff] to-amber-400 text-slate-950 flex items-center gap-1.5"
            >
              <span>{chip.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Circular Core Container */}
      <motion.div
        key={`badge-core-${clickBurstKey}`}
        animate={
          isReducedMotion
            ? {}
            : clickBurstKey > 0
            ? {
                scale: [0.93, 1.14, 1.02],
                transition: { duration: 0.45, ease: 'easeOut' },
              }
            : isCelebrated
            ? {
                scale: [1, 1.05, 1],
                transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
              }
            : {}
        }
        whileHover={isReducedMotion ? {} : { scale: 1.06, y: -2 }}
        whileTap={isReducedMotion ? {} : { scale: 0.92 }}
        className={`
          relative w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36
          rounded-full flex flex-col items-center justify-center text-center
          p-2 transition-all duration-300
          border-0 outline-none ring-0
          ${
            isCelebrated || clickBurstKey > 0
              ? 'shadow-[0_0_40px_rgba(0,210,255,0.5),inset_0_0_25px_rgba(0,200,255,0.3)]'
              : 'shadow-[0_0_16px_rgba(0,140,255,0.18),inset_0_0_12px_rgba(0,140,255,0.12)] group-hover:shadow-[0_0_25px_rgba(0,180,255,0.3)]'
          }
        `}
        style={{
          background:
            isCelebrated || clickBurstKey > 0
              ? 'radial-gradient(circle at center, #0284c7 0%, #0369a1 35%, #075985 70%, #082f49 100%)'
              : 'radial-gradient(circle at center, #0284c7 0%, #0369a1 40%, #075985 75%, #0c4a6e 100%)',
        }}
      >
        {/* Center Icon */}
        <div className="relative mb-1">
          <motion.div
            animate={
              isReducedMotion
                ? {}
                : clickBurstKey > 0
                ? {
                    scale: [1, 1.35, 1],
                    rotate: [0, -15, 15, 0],
                    transition: { duration: 0.5 },
                  }
                : isCelebrated
                ? {
                    scale: [1, 1.15, 1],
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                  }
                : {
                    scale: [1, 1.04, 1],
                    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className={`relative p-1.5 rounded-full border-0 transition-colors duration-300 ${
              isCelebrated || clickBurstKey > 0
                ? 'bg-amber-400/30 shadow-[0_0_14px_rgba(251,191,36,0.6)]'
                : 'bg-white/20 dark:bg-[#0088ff]/25 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
            }`}
          >
            {isCelebrated || clickBurstKey > 0 ? (
              <PartyPopper
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-300 dark:text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                strokeWidth={2.4}
              />
            ) : (
              <Target
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white dark:text-[#00f0ff] drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]"
                strokeWidth={2.2}
              />
            )}
          </motion.div>
        </div>

        {/* Target Outcome Typography */}
        <div className="space-y-0 z-10 leading-tight">
          <span className="block text-white font-black text-[10px] sm:text-[11px] xl:text-[12px] tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            QUALIFIED
          </span>
          <span className="block text-sky-200 dark:text-[#00f0ff] font-black text-[10px] sm:text-[11px] xl:text-[12px] tracking-wider uppercase drop-shadow-[0_0_6px_rgba(0,240,255,0.7)]">
            BANT LEADS
          </span>
        </div>

        {/* Celebration Sub-pill Badge */}
        <motion.div
          animate={clickBurstKey > 0 ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.3 }}
          className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider transition-all duration-300 border-0 ${
            isCelebrated || clickBurstKey > 0
              ? 'bg-amber-400/25 dark:bg-amber-500/25 text-amber-300 dark:text-amber-200'
              : 'bg-black/40 dark:bg-[#000d24]/80 text-sky-200 dark:text-[#38bdf8]'
          }`}
        >
          {isCelebrated || clickBurstKey > 0 ? (
            <>
              <Award className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
              <span>GOAL ACHIEVED!</span>
            </>
          ) : (
            <>
              <Award className="w-2 h-2 text-sky-300 dark:text-[#00f0ff]" />
              <span>GOAL</span>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
