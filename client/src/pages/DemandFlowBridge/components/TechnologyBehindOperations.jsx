import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

const B2B_CARDS = [
  {
    role: 'Revenue & Demand Gen Leaders',
    desc: 'Campaigns spread across tools make results hard to trust. See pipeline, intent, and delivery in one place.',
    headingColor: '#E65100',
  },
  {
    role: 'SDR & Sales Operations Teams',
    desc: 'Reps lose time to manual follow-up. Cadences, quotas, and lead handoffs run in one workflow.',
    headingColor: '#E65100',
  },
  {
    role: 'Teams Delivering Client Campaigns',
    desc: 'Clients want proof of progress. Shared workspaces show milestones, pacing, and SLA performance.',
    headingColor: '#E65100',
  },
]

const TechnologyBehindOperations = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="product-views"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#040816] border-t border-b border-border overflow-hidden transition-colors duration-300"
      aria-label="Product Views and Built for B2B Teams"
    >
      {/* ── Background Ambient Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            opacity: 0.1,
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, var(--cta) 0%, transparent 70%)',
            opacity: 0.08,
          }}
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ═══════════════════════════════════════════════════════════════
            TOP HEADER: PRODUCT VIEWS
           ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          
          {/* Pre-header Badge: PRODUCT VIEWS */}
          {/* <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-bold tracking-[0.2em] uppercase backdrop-blur-sm mb-4"
          >
            PRODUCT VIEWS
          </motion.div> */}
          <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">PRODUCT VIEWS</span>

          {/* Main Title (<h2> - 36px) */}
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-[36px] font-black tracking-tight leading-[1.22] text-text-primary mb-4"
          >
            See DemandFlow Bridge{' '}
            <span className="highlight">
              in Action
            </span>
          </motion.h2>

          {/* Subtext (<p> - 16px) */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-[16px] text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Explore the modules your team will use every day. Click a tab to switch views or expand for full resolution.
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            WHO USES DEMANDFLOW BRIDGE (BUILT FOR B2B TEAMS)
           ═══════════════════════════════════════════════════════════════ */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Sub-Header */}
          <div className="text-center mb-12 sm:mb-16">
          
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">BUILT FOR B2B TEAMS</span>
            

            {/* Main Title (<h2> - 36px) */}
            <motion.h2
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2.5xl sm:text-4xl lg:text-[36px] font-black tracking-tight leading-[1.22] text-text-primary mb-3"
            >
              Who Uses{' '}
              <span className="highlight">
                DemandFlow Bridge
              </span>
            </motion.h2>

            {/* Caption (<p> - 14px) */}
            <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-[16px] text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
             Match assets and message variables to each persona’s role and intent, with A/B testing across angles and offers.

          </motion.p>
          </div>

          {/* Cards Wrapper with Kept Horizontal Orange Accent Band */}
          <div className="relative py-8 sm:py-12">
            
            {/* The Kept Horizontal Orange Accent Band behind the cards */}
            <div
              className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[-6%] right-[-6%] h-28 lg:h-36 pointer-events-none z-0 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, #E65100 0%, #FF6D00 50%, #E65100 100%)',
                boxShadow: '0 10px 40px rgba(255, 109, 0, 0.25)',
              }}
            />

            {/* 3 Clean Cards (Only Heading & Content) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 items-stretch">
              {B2B_CARDS.map((card, idx) => (
                <motion.div
                  key={card.role}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -8,
                          transition: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                  className="relative flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-xl bg-white text-slate-900 shadow-2xl transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-slate-100 min-h-[220px]"
                >
                  {/* Role Title (<h3>) */}
                  <h3
                    className="text-[18px] sm:text-[20px] font-extrabold uppercase tracking-wider leading-snug mb-3.5"
                    style={{ color: card.headingColor }}
                  >
                    {card.role}
                  </h3>

                  {/* Card Description (<p> - 14px) */}
                  <p className="text-[14px] text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TechnologyBehindOperations
