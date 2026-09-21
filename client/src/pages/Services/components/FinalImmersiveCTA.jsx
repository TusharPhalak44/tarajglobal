import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, Clock, Users, Check } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CircularProjectButton } from './UniverseButtons'

/**
 * FinalImmersiveCTA — 12 FINAL CTA
 * Large text:
 * "YOUR NEXT
 * OPPORTUNITY
 * STARTS HERE."
 * Huge circular CTA with cursor reaction, expanding circle, rotating arrow, expanding outer ring.
 */

export default function FinalImmersiveCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="final-immersive-cta"
      className="relative py-28 sm:py-36 lg:py-44 px-4 sm:px-8 lg:px-14 border-b overflow-hidden flex flex-col justify-center min-h-[75vh] select-none"
      style={{
        backgroundColor: isDark ? '#020306' : '#F0F3F8',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Subtle Radiant Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden">
        {[250, 500, 750].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${r * 2}px`,
              height: `${r * 2}px`,
              borderColor: isDark ? '#38BDF8' : '#0284C7',
              borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8 backdrop-blur-md"
          style={{
            backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span
            className="font-mono text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: isDark ? '#38BDF8' : '#0284C7' }}
          >
            12 // DEPLOY YOUR ENGINE
          </span>
        </div>

        {/* Large Text */}
        <h2
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[1] uppercase mb-8"
          style={{ color: isDark ? '#FFFFFF' : '#090D15' }}
        >
          YOUR NEXT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">
            OPPORTUNITY
          </span>
          <br />
          STARTS HERE.
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-xl font-normal leading-relaxed max-w-xl mx-auto mb-14"
          style={{ color: isDark ? '#94A3B8' : '#475569' }}
        >
          Connect directly with our enterprise demand architects to map your ICP, configure qualified meeting handoffs, and scale ARR.
        </p>

        {/* Huge Circular CTA Button */}
        <div className="flex justify-center mb-16">
          <CircularProjectButton to="/contact">
            START A CONVERSATION
          </CircularProjectButton>
        </div>

        {/* 4 Clean Assurance Badges */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t max-w-3xl mx-auto text-xs font-mono"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            color: isDark ? '#94A3B8' : '#64748B',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Guaranteed Show-Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
            <span>7-Day Pilot Launch</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Dedicated Lead Pod</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-sky-400 shrink-0" />
            <span>100% Human-Verified Data</span>
          </div>
        </div>
      </div>
    </section>
  )
}
