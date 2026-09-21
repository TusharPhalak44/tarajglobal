import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Phone, ArrowDown, Sparkles } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export default function ContactHero({ onBookMeeting }) {
  const heroRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleScrollToForm = () => {
    const el = document.getElementById('contact-form') || document.querySelector('.contact-form-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        const firstInput = el.querySelector('input, textarea')
        if (firstInput) firstInput.focus()
      }, 600)
    } else if (onBookMeeting) {
      onBookMeeting()
    }
  }

  return (
    <section
      ref={heroRef}
      className="sticky top-0 w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] h-[88vh] sm:h-[92vh] lg:h-[95vh] flex flex-col justify-center items-center overflow-hidden bg-black text-white pt-16 sm:pt-20 pb-16 sm:pb-20 select-none z-0"
      aria-label="Contact Taraj Global — Connect With Us"
    >
      {/* ── Background: Cinematic Golden Horizon & Telephone Handset ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <motion.div
          initial={{ scale: 1.04, opacity: 0.8 }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1.02, 1.04, 1.02],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/contact-hero-bg.jpg')",
            backgroundPosition: 'center 15%',
          }}
        />

        {/* Ambient Specular Beam Glow */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.3, 0.55, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[220px] rounded-full blur-[110px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 190, 0, 0.45) 0%, rgba(255, 140, 0, 0.2) 50%, transparent 75%)',
          }}
        />

        {/* Subtle Top & Bottom Cinematic Gradient Vignetters */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* ── Foreground Content: Typography & Book a Strategy Call Button ── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Main Heading: CONTACT US */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] uppercase mb-3 sm:mb-4"
        >
          CONTACT US
        </motion.h1>

        {/* Spaced Subtitle: CONNECT WITH TARAJ GLOBAL */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.35em] sm:tracking-[0.45em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] uppercase mb-8 sm:mb-10 pl-1"
        >
          C O N N E C T &nbsp; W I T H &nbsp; T A R A J &nbsp; G L O B A L
        </motion.div>

        {/* Primary CTA Button: BOOK A STRATEGY CALL */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
        >
          <motion.button
            type="button"
            onClick={onBookMeeting}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative group px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-extrabold text-sm sm:text-base tracking-[0.15em] uppercase text-black bg-white hover:bg-[#FFF9E6] shadow-[0_0_35px_rgba(255,200,50,0.45)] hover:shadow-[0_0_50px_rgba(255,210,70,0.65)] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Subtle Shimmer Sweep */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              }}
            />

            <span className="relative z-10 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-black" />
              <span>BOOK A STRATEGY CALL</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Subtle Down Scroll Indicator */}
        <motion.button
          type="button"
          onClick={handleScrollToForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>Or send us a message below</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.button>

      </div>
    </section>
  )
}
