import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EditorialIntro() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="What We Solve — Editorial Intro"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ══════════ LEFT COLUMN: Small Label (Span 3) ══════════ */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-28"
            >
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.22em] text-primary">
                WHAT WE SOLVE
              </span>
            </motion.div>
          </div>

          {/* ══════════ CENTER / RIGHT: Editorial Content with subtle vertical border (Span 9) ══════════ */}
          <div className="lg:col-span-9 lg:pl-12 lg:border-l lg:border-border/60">
            {/* Large Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 22 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.14] mb-6 sm:mb-8 max-w-3xl"
            >
              Turning B2B Complexity Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
                Clear Growth Opportunities.
              </span>
            </motion.h2>

            {/* Explanatory Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 18 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed font-normal max-w-2xl"
            >
              Every business needs a different combination of targeting, engagement, qualification and conversion. Our services are designed to work individually or together around your growth objectives.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  )
}
