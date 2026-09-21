import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Cpu, Sparkles, Orbit, Activity } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { MagneticButton } from './UniverseButtons'

/**
 * UniverseHero — 01 FULL SCREEN HERO & 02 SERVICE TRANSITION
 * "THE GROWTH ENGINE"
 * Center: Large animated circular growth engine with rotating concentric rings,
 * travelling nodes, and TARAJ GLOBAL core with DATA, TARGET, QUALIFY, ENGAGE, CONVERT.
 * Left: Small vertical text "B2B GROWTH SERVICES"
 * Right: Oversized headline "TURN THE RIGHT ACCOUNTS INTO REAL OPPORTUNITIES." (line-by-line reveal)
 * Bottom: Scroll indicator "SCROLL TO EXPLORE ↓"
 */

const ENGINE_STAGES = [
  { name: 'DATA', angle: -90, color: '#38BDF8' },
  { name: 'TARGET', angle: -18, color: '#60A5FA' },
  { name: 'QUALIFY', angle: 54, color: '#818CF8' },
  { name: 'ENGAGE', angle: 126, color: '#A78BFA' },
  { name: 'CONVERT', angle: 198, color: '#34D399' },
]

export default function UniverseHero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeStage, setActiveStage] = useState(0)

  const radius = 140

  const handleScrollDown = () => {
    const el = document.getElementById('service-universe')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="growth-engine-hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 lg:px-14 border-b overflow-hidden select-none"
      style={{
        backgroundColor: isDark ? '#05070B' : '#FAFBFD',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Architectural Grid & Subtle Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#FFFFFF' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ══ TOP ROW: Left Vertical Label + Right Oversized Line-by-Line Headline ══ */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 flex-1 my-auto">

        {/* Left Side: Small Vertical Eyebrow */}
        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase rotate-[-90deg] whitespace-nowrap opacity-60 font-bold"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            B2B GROWTH SERVICES
          </span>
        </div>

        {/* Center: The Growth Engine (Large Animated Circular Core) */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
          {/* Ring 1 (Outer Ring, Slow Counter-Clockwise Rotation) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed pointer-events-none"
            style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.25)' }}
          >
            {/* Travelling node on Ring 1 */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-md shadow-sky-400"
            />
          </motion.div>

          {/* Ring 2 (Middle Ring, Clockwise Rotation) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full border pointer-events-none"
            style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)' }}
          >
            {/* Travelling node on Ring 2 */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400"
            />
          </motion.div>

          {/* Ring 3 (Inner Ring) */}
          <div
            className="absolute w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] rounded-full border pointer-events-none"
            style={{ borderColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 132, 199, 0.15)' }}
          />

          {/* Center Engine Core: TARAJ GLOBAL */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full border flex flex-col items-center justify-center p-3 text-center backdrop-blur-md shadow-2xl cursor-pointer"
            style={{
              backgroundColor: isDark ? '#0D1117' : '#FFFFFF',
              borderColor: isDark ? '#38BDF8' : '#0284C7',
              boxShadow: isDark
                ? '0 0 35px rgba(56, 189, 248, 0.25)'
                : '0 15px 35px rgba(2, 132, 199, 0.15)',
            }}
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-sky-500">
                GROWTH ENGINE
              </span>
            </div>

            <span
              className="font-mono font-black text-xs sm:text-sm tracking-widest leading-tight uppercase"
              style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
            >
              TARAJ
              <br />
              GLOBAL
            </span>

            <span
              className="mt-1.5 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase"
              style={{
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)',
                color: isDark ? '#38BDF8' : '#0284C7',
              }}
            >
              {ENGINE_STAGES[activeStage].name}
            </span>
          </motion.div>

          {/* 5 Growth Stage Nodes Around the Engine */}
          {ENGINE_STAGES.map((stage, idx) => {
            const rad = (stage.angle * Math.PI) / 180
            const xOffset = Math.cos(rad) * radius
            const yOffset = Math.sin(rad) * radius
            const isActive = activeStage === idx

            return (
              <div
                key={stage.name}
                onMouseEnter={() => setActiveStage(idx)}
                onClick={() => setActiveStage(idx)}
                style={{
                  transform: `translate(${xOffset}px, ${yOffset}px)`,
                }}
                className="absolute z-30 flex flex-col items-center cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'scale-120 shadow-lg' : 'scale-100 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? '#111622' : '#FFFFFF',
                    borderColor: isActive
                      ? isDark ? '#38BDF8' : '#0284C7'
                      : isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.14)',
                    color: isActive
                      ? isDark ? '#090D15' : '#FFFFFF'
                      : isDark ? '#94A3B8' : '#475569',
                  }}
                >
                  <span className="font-mono text-[10px] font-black">
                    0{idx + 1}
                  </span>
                </div>

                <span
                  className={`mt-1 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? isDark ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-sky-50 text-sky-700 border border-sky-200'
                      : isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {stage.name}
                </span>
              </div>
            )
          })}
        </div>

        {/* Right Side: Oversized Headline (Revealed Line-by-Line) & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-1 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.98] uppercase"
              style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
            >
              TURN THE RIGHT
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.98] uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
            >
              ACCOUNTS INTO
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.98] uppercase"
              style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
            >
              REAL OPPORTUNITIES.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-lg"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            We synchronize verified decision-maker intelligence, multi-touch account engagement, and guaranteed sales meeting SLAs into one continuous growth pipeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4"
          >
            <MagneticButton to="/contact">
              START A CONVERSATION →
            </MagneticButton>
          </motion.div>
        </div>

      </div>

      {/* ══ BOTTOM: Scroll Indicator ══ */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t z-10"
        style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest font-bold"
          style={{ color: isDark ? '#64748B' : '#94A3B8' }}
        >
          // ENGINE ACTIVE // 12 SERVICES ONLINE
        </span>

        <button
          type="button"
          onClick={handleScrollDown}
          className="group flex items-center gap-2 cursor-pointer font-mono text-xs font-bold uppercase tracking-widest transition-colors"
          style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
