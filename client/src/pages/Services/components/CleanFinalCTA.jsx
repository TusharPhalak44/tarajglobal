import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Clock, Users, Check } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { CleanPrimaryButton } from './CleanButtons'

/**
 * CleanFinalCTA — 08 FINAL CTA
 * Very clean, minimal final CTA:
 * - Large dark / high-contrast section
 * - Heading: "Ready to Build a Stronger Pipeline?"
 * - Short supporting sentence
 * - Large button: "START A CONVERSATION ->"
 * - Subtle animated circular line around the button
 * - Minimal, no unnecessary graphics.
 */

export default function CleanFinalCTA() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="final-cta"
      className="relative py-28 sm:py-36 lg:py-40 px-4 sm:px-6 lg:px-12 border-b overflow-hidden"
      style={{
        backgroundColor: isDark ? '#06080C' : '#0B0F19',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
      }}
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0284C7 0%, transparent 65%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border mb-8 border-white/10 bg-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-slate-300">
            08 // ACCELERATE YOUR PIPELINE
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-white">
          Ready to Build a{' '}
          <span className="text-sky-400">
            Stronger Pipeline?
          </span>
        </h2>

        {/* Short Supporting Sentence */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-12 font-normal">
          Connect with our growth strategists to evaluate your ICP, identify active in-market accounts, and deploy an enterprise outbound engine within days.
        </p>

        {/* Button with Subtle Animated Circular Accent */}
        <div className="relative inline-flex items-center justify-center mb-16">
          {/* Subtle animated circular accent line */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-3.5 rounded-xl border border-sky-400/40 pointer-events-none"
          />

          <CleanPrimaryButton
            to="/contact"
            size="large"
            className="!bg-white !text-slate-900 !border-white hover:!bg-slate-100 hover:!border-slate-200"
          >
            START A CONVERSATION
          </CleanPrimaryButton>
        </div>

        {/* 4 Clean Minimal Assurance Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/10 max-w-3xl mx-auto text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Guaranteed Show-Rates</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
            <span>7-Day Pilot Onboarding</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Dedicated Strategist</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Zero Long-Term Lock-in</span>
          </div>
        </div>
      </div>
    </section>
  )
}
