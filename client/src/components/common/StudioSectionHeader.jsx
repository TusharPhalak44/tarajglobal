import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export const StudioSectionHeader = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isLeft = align === 'left'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      className={`relative ${isLeft ? 'text-left' : 'text-center'} max-w-3xl ${isLeft ? '' : 'mx-auto'} mb-12 md:mb-16 ${className}`}
    >
      {/* ── Studio Precision Crosshairs ─────────────────────────────────── */}
      <div className={`flex items-center gap-2 mb-4 ${isLeft ? 'justify-start' : 'justify-center'}`}>
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          whileInView={{ rotate: 90, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary/70 dark:text-[#00E5FF]/70"
        >
          <Plus size={13} strokeWidth={3} />
        </motion.div>

        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
              {badge}
            </span>
          </div>
        )}

        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          whileInView={{ rotate: -90, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-cta/70 dark:text-orange-400/70"
        >
          <Plus size={13} strokeWidth={3} />
        </motion.div>
      </div>

      {/* ── Masked Kinetic Typography Title (a-lign studio signature) ──── */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.16] overflow-hidden py-1">
        <motion.span
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {title}{' '}
          {highlight && (
            <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </motion.span>
      </h2>

      {/* ── Subtitle ────────────────────────────────────────────────────── */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-text-secondary text-base sm:text-lg mt-4 leading-relaxed font-normal ${
            isLeft ? '' : 'max-w-2xl mx-auto'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Ambient Horizontal Micro Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta rounded-full mt-6 ${
          isLeft ? '' : 'mx-auto'
        }`}
      />
    </motion.div>
  )
}

export default StudioSectionHeader
