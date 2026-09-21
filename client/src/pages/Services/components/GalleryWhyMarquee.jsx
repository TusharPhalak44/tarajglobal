import React from 'react'
import { motion } from 'framer-motion'

const marqueeWords = ['DATA', 'QUALITY', 'INTELLIGENCE', 'TARGETING', 'EXECUTION', 'GROWTH']

export const GalleryWhyMarquee = () => {
  return (
    <section
      id="why-taraj"
      className="relative py-28 md:py-36 bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 mb-12">
        <span className="font-mono text-xs tracking-widest uppercase text-primary block">
          [SECTION 11 // THE TARAJ ADVANTAGE]
        </span>
      </div>

      {/* DUAL OPPOSING HORIZONTAL TEXT MARQUEES */}
      <div className="space-y-4 py-8 border-y border-border/40 overflow-hidden">
        {/* Layer 1: Right to Left */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-text-primary/15"
          >
            {Array.from({ length: 4 }).flatMap(() =>
              marqueeWords.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="hover:text-primary transition-colors cursor-default"
                >
                  {word} <span className="text-primary/40 mx-4">•</span>
                </span>
              ))
            )}
          </motion.div>
        </div>

        {/* Layer 2: Left to Right (Opposing direction) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-8 text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-text-muted/20 via-primary/30 to-text-muted/20"
          >
            {Array.from({ length: 4 }).flatMap(() =>
              [...marqueeWords].reverse().map((word, idx) => (
                <span
                  key={`rev-${word}-${idx}`}
                  className="hover:text-primary transition-colors cursor-default"
                >
                  {word} <span className="text-border mx-4">/</span>
                </span>
              ))
            )}
          </motion.div>
        </div>
      </div>

      {/* MINIMAL STATEMENT SECTION */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 lg:px-20 pt-16 md:pt-24 text-center">
        <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-text-primary leading-[1.05]">
          "BUILT FOR COMPANIES THAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
            WANT MORE THAN LEADS."
          </span>
        </h3>

        <p className="mt-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-text-secondary font-sans leading-relaxed">
          Leads without context burn sales rep morale. We deliver verified accounts with demonstrated organizational need, verified buying committee stakeholders, and scheduled discovery sessions.
        </p>

        {/* Key Core Pillars */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/40 font-mono text-xs">
          <div>
            <span className="text-primary font-bold block mb-1">01 / TARGETING</span>
            <span className="text-text-muted">Zero-waste ICP precision</span>
          </div>
          <div>
            <span className="text-primary font-bold block mb-1">02 / INTEGRITY</span>
            <span className="text-text-muted">Direct dial & email hygiene</span>
          </div>
          <div>
            <span className="text-primary font-bold block mb-1">03 / VELOCITY</span>
            <span className="text-text-muted">Accelerated time-to-meeting</span>
          </div>
          <div>
            <span className="text-primary font-bold block mb-1">04 / REVENUE</span>
            <span className="text-text-muted">Pipeline that actually closes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryWhyMarquee
