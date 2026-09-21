import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const JOURNEY_STAGES = [
  {
    id: 'account',
    label: 'Target Account',
    desc: 'Identify organizations that match your ideal customer profile by industry, size, and business context.',
    color: '#00A6FF',
    icon: 'account',
  },
  {
    id: 'decision',
    label: 'Decision Maker',
    desc: 'Pinpoint the relevant decision-makers and stakeholders within each target account.',
    color: '#38BDF8',
    icon: 'person',
  },
  {
    id: 'email',
    label: 'Personalized Email',
    desc: 'Deliver structured, personalized email sequences aligned to the prospect\'s role and business context.',
    color: '#0EA5E9',
    icon: 'mail',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    desc: 'Track delivery, opens, clicks, and interaction signals that indicate genuine prospect interest.',
    color: '#FFA600',
    icon: 'engage',
  },
  {
    id: 'response',
    label: 'Response',
    desc: 'Direct prospect replies signal active interest and open the door to a meaningful business conversation.',
    color: '#72D669',
    icon: 'response',
  },
  {
    id: 'qualification',
    label: 'Qualification',
    desc: 'Assess each response to identify relevant intent, appropriate timing, and sales conversation readiness.',
    color: '#A78BFA',
    icon: 'qualify',
  },
  {
    id: 'opportunity',
    label: 'Sales Opportunity',
    desc: 'Qualified responses become structured sales opportunities — passed to the appropriate sales process.',
    color: '#FF6D00',
    icon: 'star',
  },
]

function JourneyIcon({ type, color, size = 18 }) {
  if (type === 'account') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M6 7h6M6 10h4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
  if (type === 'person') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3.5" stroke={color} strokeWidth="1.4" />
      <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
  if (type === 'mail') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M2 7l7 4 7-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
  if (type === 'engage') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M3 12L6 7l3 3 3-5 3 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 14h12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
  if (type === 'response') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M3 9H15M8 5l-4 4 4 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'qualify') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="2" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M5 9.5l2.5 2.5 5-5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (type === 'star') return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 2l2.09 4.26L16 7.27l-3.5 3.41.82 4.82L9 13.27l-4.32 2.23.82-4.82L2 7.27l4.91-.71L9 2z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
  return null
}

const OpportunityJourney = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="from-inbox-to-sales-opportunity"
      className="relative py-20 lg:py-28 overflow-hidden bg-white dark:bg-[#070B14] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/[0.06]"
      aria-label="From Inbox to Sales Opportunity"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00A6FF]/[0.025] rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(114,214,105,0.08)', border: '1px solid rgba(114,214,105,0.22)' }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#72D669] uppercase">Conversion Journey</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            From Inbox to{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #72D669, #FF6D00)' }}
            >
              Sales Opportunity
            </span>
          </motion.h2>

          <motion.p
            className="text-base text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Every qualified B2B sales opportunity begins with the right message reaching the right decision-maker. This is the journey that Taraj Global's email marketing campaigns are designed to complete.
          </motion.p>
        </div>

        {/* ── Desktop: Horizontal flow ── */}
        <div className="hidden lg:flex items-stretch gap-0 relative" role="list" aria-label="Email to opportunity journey stages">

          {JOURNEY_STAGES.map((stage, idx) => {
            const isLast = idx === JOURNEY_STAGES.length - 1
            return (
              <div key={stage.id} className="flex-1 flex items-stretch gap-0" role="listitem">
                {/* Stage card */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col items-center text-center px-3 py-6 rounded-xl flex-1"
                  style={{
                    background: `${stage.color}06`,
                    border: `1px solid ${stage.color}18`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shrink-0"
                    style={{
                      background: `${stage.color}15`,
                      border: `1.5px solid ${stage.color}35`,
                    }}
                  >
                    <JourneyIcon type={stage.icon} color={stage.color} size={18} />
                  </div>

                  {/* Stage number */}
                  <span
                    className="text-[9px] font-mono font-black tracking-widest mb-1.5"
                    style={{ color: stage.color }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Label */}
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {stage.label}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {stage.desc}
                  </p>
                </motion.div>

                {/* Connector arrow */}
                {!isLast && (
                  <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, scaleX: 0 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 + 0.2 }}
                    className="flex items-center justify-center w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <div
                        className="w-4 h-px"
                        style={{ background: `linear-gradient(90deg, ${stage.color}60, ${JOURNEY_STAGES[idx + 1].color}40)` }}
                      />
                      <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
                        <path d="M1 1l4 3-4 3" stroke={stage.color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Mobile: Vertical flow ── */}
        <div className="lg:hidden space-y-1" role="list" aria-label="Email to opportunity journey stages">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isLast = idx === JOURNEY_STAGES.length - 1
            return (
              <div key={stage.id} role="listitem">
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.07, 0.35) }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{
                    background: `${stage.color}05`,
                    border: `1px solid ${stage.color}15`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${stage.color}15`, border: `1.5px solid ${stage.color}35` }}
                  >
                    <JourneyIcon type={stage.icon} color={stage.color} size={17} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono font-black tracking-widest" style={{ color: stage.color }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{stage.label}</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{stage.desc}</p>
                  </div>
                </motion.div>

                {/* Down arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1" aria-hidden="true">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M5 1v10M2 8l3 3 3-3" stroke={stage.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default OpportunityJourney
