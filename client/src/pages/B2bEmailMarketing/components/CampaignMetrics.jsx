import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const METRICS = [
  {
    label: 'DELIVERED',
    description: 'Emails successfully reaching target prospect inboxes',
    dots: 10,
    filled: 10,
    color: '#00A6FF',
  },
  {
    label: 'OPENED',
    description: 'Prospects who opened and viewed the campaign email',
    dots: 10,
    filled: 7,
    color: '#38BDF8',
  },
  {
    label: 'CLICKED',
    description: 'Prospects who engaged with campaign content or links',
    dots: 10,
    filled: 5,
    color: '#FFA600',
  },
  {
    label: 'REPLIED',
    description: 'Prospects who responded with a direct email reply',
    dots: 10,
    filled: 3,
    color: '#72D669',
  },
  {
    label: 'QUALIFIED',
    description: 'Responses identified as relevant sales opportunities',
    dots: 10,
    filled: 2,
    color: '#FF6D00',
  },
]

const CampaignMetrics = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="measure-email-marketing-engagement"
      className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-[#070B14] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/[0.06]"
      aria-label="Measure Every Stage of Engagement"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#00A6FF]/[0.025] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start mb-14">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,166,255,0.08)', border: '1px solid rgba(0,166,255,0.22)' }}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00A6FF] uppercase">Campaign Intelligence</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Measure Every Stage{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF, #FFA600)' }}
              >
                of Engagement
              </span>
            </motion.h2>
          </div>

          <motion.div
            className="self-end"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Understanding campaign performance across every stage — from delivery through to qualification — enables continuous improvement and more accurate assessment of email marketing effectiveness.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-[#FFA600]"
              style={{ background: 'rgba(255,166,0,0.08)', border: '1px solid rgba(255,166,0,0.2)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#FFA600" strokeWidth="1.2" />
                <path d="M5 3v2.5L6.5 7" stroke="#FFA600" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Conceptual representation — actual campaign metrics vary
            </div>
          </motion.div>
        </div>

        {/* ── Dot-pattern engagement indicators ── */}
        <div className="space-y-5" role="list" aria-label="Email campaign engagement metrics">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              role="listitem"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : idx * 0.09 }}
              className="flex items-center gap-5 group"
            >
              {/* Label */}
              <div className="shrink-0 w-[100px] sm:w-[120px]">
                <span
                  className="text-[10px] font-mono font-black tracking-[0.18em] uppercase"
                  style={{ color: metric.color }}
                >
                  {metric.label}
                </span>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5 flex-1" aria-label={`${metric.filled} out of ${metric.dots} units`}>
                {Array.from({ length: metric.dots }).map((_, i) => {
                  const isFilled = i < metric.filled
                  return (
                    <motion.div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: '100%',
                        maxWidth: 32,
                        height: 24,
                        background: isFilled ? metric.color : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isFilled ? metric.color + '60' : 'rgba(255,255,255,0.08)'}`,
                        opacity: isFilled ? (1 - i * 0.035) : 1,
                      }}
                      initial={prefersReducedMotion ? {} : { scaleY: 0 }}
                      whileInView={prefersReducedMotion ? {} : { scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : idx * 0.09 + i * 0.04 }}
                    />
                  )
                })}
              </div>

              {/* Description */}
              <div className="hidden md:block shrink-0 w-64 xl:w-72">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile descriptions */}
        <div className="md:hidden mt-6 space-y-2">
          {METRICS.map((metric) => (
            <div key={metric.label} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: metric.color }} />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold" style={{ color: metric.color }}>{metric.label}: </span>
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Funnel note */}
        <motion.div
          className="mt-10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            {['DELIVERED', 'OPENED', 'CLICKED', 'REPLIED', 'QUALIFIED'].map((label, i, arr) => (
              <React.Fragment key={label}>
                <span
                  className="text-[9px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: METRICS[i].color }}
                >
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M2 4h4M4 2l2 2-2 2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:ml-auto">
            Each stage represents a deeper level of prospect engagement and qualification.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CampaignMetrics
