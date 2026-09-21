import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, Zap, Clock, Sparkles } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import TarajButton from './TarajButton'

const ASSURANCES = [
  { label: 'Zero Long-Term Lock-in', icon: ShieldCheck },
  { label: 'Dedicated Account Strategist', icon: Users },
  { label: '99.8% Data Accuracy SLA', icon: Zap },
  { label: 'Fast 14-Day Pilot Launch', icon: Clock },
]

export default function EditorialCTADestination() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden select-none border-t"
      style={{
        backgroundColor: isDark ? '#04060A' : '#F4F6FB',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
      aria-label="Ready to Build a Stronger Pipeline — Final CTA"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 166, 255, 0.25) 0%, rgba(255, 109, 0, 0.15) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(0, 102, 204, 0.18) 0%, rgba(255, 107, 0, 0.1) 60%, transparent 80%)',
          }}
        />
      </div>

      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] mb-6"
            style={{ color: isDark ? '#A1A1AA' : '#52525B' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>THE NEXT STEP</span>
          </motion.div>

          {/* Large Statement Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8"
            style={{ color: isDark ? '#FFFFFF' : '#0B0F19' }}
          >
            Ready to Build a{' '}
            <span className="font-light italic block mt-2">
              Stronger Pipeline?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-normal"
            style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
          >
            Whether you need a targeted B2B pilot or an enterprise demand architecture, our growth strategists are ready to calibrate a customized program.
          </motion.p>

          {/* Interactive Custom Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center justify-center mb-16"
          >
            <TarajButton to="/contact" variant="primary" size="lg">
              Start a Conversation
            </TarajButton>
          </motion.div>

          {/* 4 Enterprise Assurance Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
          >
            {ASSURANCES.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2.5 text-xs font-mono font-semibold py-2 px-3 rounded-lg"
                  style={{ color: isDark ? '#94A3B8' : '#4B5563' }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
