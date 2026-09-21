import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WHY_ITEMS = [
  {
    num: '01',
    title: 'ICP-Focused Targeting',
    desc: 'Reach the prospects that matter.',
  },
  {
    num: '02',
    title: 'Verified B2B Data',
    desc: 'Build campaigns on reliable information.',
  },
  {
    num: '03',
    title: 'Intent-Led Qualification',
    desc: 'Prioritize prospects with genuine buying signals.',
  },
  {
    num: '04',
    title: 'Multi-Channel Engagement',
    desc: 'Connect across the channels your buyers use.',
  },
  {
    num: '05',
    title: 'Scalable Campaign Execution',
    desc: 'Scale outreach without losing quality.',
  },
]

export default function WhyTarajEditorial() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-background border-t border-border/50 overflow-hidden select-none"
      aria-label="Why Taraj Global — Editorial Perspective"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>THE TARAJ ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12]">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Taraj Global
            </span>
          </h2>
        </div>

        {/* ── 5-ROW CLEAN SPLIT LAYOUT (Number on left, Title in center, Desc on right) ── */}
        <div className="divide-y divide-border/60 border-t border-b border-border/60">
          {WHY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 16 }}
              transition={{ duration: 0.55, delay: 0.1 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="py-7 sm:py-8 lg:py-9 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                
                {/* Number on left */}
                <div className="md:col-span-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-text-muted group-hover:text-primary transition-colors duration-200">
                    {item.num}
                  </span>
                </div>

                {/* Title in center */}
                <div className="md:col-span-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                {/* Description on right */}
                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
