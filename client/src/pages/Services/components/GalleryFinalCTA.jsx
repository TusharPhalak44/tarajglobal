import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CircularGalleryCTA, MinimalArrowButton } from './GalleryButtons'

export const GalleryFinalCTA = () => {
  const containerRef = useRef(null)

  return (
    <section
      ref={containerRef}
      id="final-cta"
      className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col justify-between items-center bg-[#05070B] text-white px-6 md:px-14 lg:px-20 py-24 md:py-32 select-none overflow-hidden"
    >
      {/* Subtle deep ambient glow behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top indicator tag */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <span className="font-mono text-xs tracking-widest uppercase text-white/50">
          INDEX 13 / 13 // EXHIBITION FINALE
        </span>
        <span className="font-mono text-xs tracking-widest uppercase text-primary font-bold">
          PIPELINE AWAITS
        </span>
      </div>

      {/* CENTER: Line by line dramatic statement */}
      <div className="relative z-10 my-auto text-center max-w-5xl mx-auto py-12">
        <div className="space-y-2 md:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white/80"
          >
            READY TO BUILD
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white"
          >
            A STRONGER
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-white"
          >
            PIPELINE?
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-white/60 font-sans leading-relaxed"
        >
          Book a strategy session with our senior pipeline architects. We will inspect your current TAM, identify high-intent accounts, and formulate an executable pipeline blueprint.
        </motion.p>

        {/* Large Circular Cursor-Following / Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 flex justify-center"
        >
          <CircularGalleryCTA
            to="/contact"
            title="START A PROJECT"
            subtext="BOOK DISCOVERY"
          />
        </motion.div>
      </div>

      {/* Bottom Status bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
        <div>
          TARAJ GLOBAL © 2026 // ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center gap-6">
          <MinimalArrowButton to="/contact" className="text-white hover:text-primary">
            DIRECT INQUIRY
          </MinimalArrowButton>
        </div>
      </div>
    </section>
  )
}

export default GalleryFinalCTA
