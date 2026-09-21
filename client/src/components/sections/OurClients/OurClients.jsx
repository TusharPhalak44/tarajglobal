import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedSectionBackground } from '@components/animations'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import './OurClients.css'

// ── 6 PARTNER LOGOS ─────────────────────────────────────────────────────────
const PARTNER_LOGOS = [
  { id: 'mitel', name: 'Mitel', src: '/mitel.png', alt: 'Mitel' },
  { id: 'vonage', name: 'Vonage', src: '/Vonage.png', alt: 'Vonage' },
  { id: 'ringcentral', name: 'RingCentral', src: '/ringcentral.png', alt: 'RingCentral' },
  { id: 'avaya', name: 'AVAYA', src: '/Avaya.webp', alt: 'AVAYA' },
  { id: 'microsoft', name: 'Microsoft', src: '/micro.png', alt: 'Microsoft' },
  { id: 'oracle', name: 'Oracle', src: '/ora.png', alt: 'Oracle' },
]

// ── REPEATED ARRAY FOR UNBROKEN SEAMLESS INFINITE LOOP ───────────────────────
const MARQUEE_ITEMS = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS]

export const OurClients = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="compact-partnerships-section relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#FAFAFA] dark:bg-[#0E0E0E] text-slate-900 dark:text-white transition-colors duration-500"
      aria-labelledby="partnerships-heading"
    >
      {/* Subtle Background Accent Animation */}
      <AnimatedSectionBackground accent="blue" />

      {/* Top Hairline Divider with Cyber Laser Beam */}
      <div className="section-laser-divider section-laser-top">
        {!prefersReducedMotion && <div className="laser-beam laser-beam-cyan" />}
      </div>

      {/* Ambient Color Glow Spheres */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[260px] rounded-full bg-[#00A6FF]/6 dark:bg-[#00A6FF]/10 blur-[130px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[260px] rounded-full bg-[#FF6D00]/6 dark:bg-[#FF6D00]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── COMPACT HEADER CONTENT ──────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 dark:bg-sky-500/10 backdrop-blur-md mb-3 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.22em] text-[#00A6FF] uppercase">
              GLOBAL PARTNERSHIPS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="partnerships-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] mb-2.5 font-heading"
          >
            <span className="text-slate-900 dark:text-white mr-2 sm:mr-3">
              TRUSTED BY
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
              LEADING B2B BRANDS
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal"
          >
            Building demand with the technology ecosystem trusted by modern enterprises.
          </motion.p>
        </div>

        {/* ── EXPANSIVE WIDE CARD WITH SINGLE CONTINUOUS MARQUEE LINE ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="compact-marquee-card relative w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center"
        >
          {/* Subtle Ambient Card Glow Perimeter */}
          {!prefersReducedMotion && <div className="card-ambient-perimeter" />}

          {/* Marquee Container with Left & Right Gradient Fade Masks */}
          <div className="marquee-wrapper relative overflow-hidden py-6 sm:py-8">
            
            {/* Left & Right Smooth Edge Fade Vignettes */}
            <div className="marquee-fade-overlay marquee-fade-left" />
            <div className="marquee-fade-overlay marquee-fade-right" />

            {/* ── SINGLE CONTINUOUS MARQUEE LINE ─────────────────────────── */}
            <div className="marquee-track-container">
              <div className="marquee-track marquee-animate-single">
                {MARQUEE_ITEMS.map((logo, idx) => (
                  <div key={`single-${logo.id}-${idx}`} className="compact-logo-pill group/pill">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="compact-logo-img"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="marquee-track marquee-animate-single" aria-hidden="true">
                {MARQUEE_ITEMS.map((logo, idx) => (
                  <div key={`single-clone-${logo.id}-${idx}`} className="compact-logo-pill group/pill">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="compact-logo-img"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* Bottom Hairline Divider with Amber Laser Beam */}
      <div className="section-laser-divider section-laser-bottom">
        {!prefersReducedMotion && <div className="laser-beam laser-beam-amber" />}
      </div>
    </section>
  )
}

export default OurClients

