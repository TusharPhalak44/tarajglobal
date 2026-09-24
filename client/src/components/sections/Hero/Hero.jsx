import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, ShieldCheck, Target, Sparkles, Activity } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'
import { HeroRightAnimation } from './HeroRightAnimation'
import { gsap, ScrollTrigger } from '@animations/gsap'
import { useReducedMotion } from '@hooks/useReducedMotion'

import { SectionLaserDivider } from '@components/animations'

/**
 * Hero — "The Revenue Signal"
 * Master Editorial Hero for Taraj Global:
 * - Asymmetric composition overlapping high-impact typography and Revenue Signal Field
 * - Live abstract global intelligence field: orbital rings, global market nodes, precision target lock
 * - Saturated, high-contrast headline gradient (zero washed-out white effect)
 * - Desktop subtle cursor parallax (disabled on mobile & prefers-reduced-motion)
 * - GSAP ScrollTrigger natural scroll scrub handoff into GetToKnowUs (no pinning)
 */
export const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const visualRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle Mouse Parallax Tracking (Desktop Only, Max 14px displacement)
  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || typeof window === 'undefined' || window.innerWidth < 1024) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    // Normalize coordinates from -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2
    const y = (clientY / innerHeight - 0.5) * 2
    setMousePos({ x, y })
  }, [prefersReducedMotion])

  // GSAP ScrollTrigger Scrub Transition into next section (NO Pinning)
  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return

    const ctx = gsap.context(() => {
      // Gentle scroll parallax as user scrolls down
      gsap.to(contentRef.current, {
        y: 40,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(visualRef.current, {
        y: 65,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-background min-h-[85vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-28 pb-12 lg:pb-16 select-none"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
      aria-label="Taraj Global Hero — The Revenue Signal"
    >
      
      {/* ── Background Layer: Fine Dotted Grid & Atmospheric Specular Light ─ */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #00A6FF 1px, transparent 1px), linear-gradient(to bottom, #00A6FF 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/4 left-1/5 w-[650px] h-[650px] rounded-full blur-[150px] bg-primary/6 dark:bg-primary/9" />
        <div className="absolute bottom-1/4 right-1/5 w-[550px] h-[550px] rounded-full blur-[140px] bg-cta/5 dark:bg-cta/8" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ── Top Eyebrow & Live Telemetry Badge ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex flex-wrap items-center gap-2 sm:gap-3 mb-3.5 sm:mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-primary">
              TARAJ GLOBAL // REVENUE INTELLIGENCE
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-text-muted text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>GLOBAL B2B ICP RADAR: ACTIVE</span>
          </div>
        </motion.div>

        {/* ── Asymmetric Editorial Grid: Typography & Revenue Signal Field */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ══ Left Editorial Block (Span 7) ══════════════════════════ */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black text-text-primary tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6"
            >
              <span>Generate </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#0088FF] to-cta font-black inline-block">
                Qualified B2B Leads
              </span>
              <span className="block mt-1.5 text-text-primary">
                and Build a Stronger Sales Pipeline
              </span>
            </motion.h1>

            {/* Supporting Copy constrained to max 560px */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed font-normal max-w-[560px] mb-6 sm:mb-8"
            >
              Taraj Global helps B2B SaaS and technology companies generate high-quality B2B leads, connect with the right decision-makers, and build a stronger sales pipeline through data-driven demand generation, targeted lead generation, account-based marketing, and personalized outreach.
            </motion.p>

            {/* Enterprise CTA Action Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8"
            >
              {/* Primary CTA */}
              <Link to="/contact" className="w-full sm:w-auto inline-block">
                <StarButton 
                  lightColor={isDark ? "#87CEEB" : "#FF8533"} 
                  backgroundColor={isDark ? "currentColor" : "rgba(255,109,0,0.15)"}
                  className={`w-full sm:w-auto rounded-[100px] cursor-pointer ${isDark ? "shadow-lg shadow-primary/20" : ""}`}
                >
                  <span className="flex items-center justify-center gap-2 min-h-[44px]">
                    <span>Start a Conversation</span>
                    <ArrowRight size={15} />
                  </span>
                </StarButton>
              </Link>

              {/* Secondary CTA */}
              <Link to="/services" className="w-full sm:w-auto inline-block">
                <StarButton 
                  lightColor={isDark ? "#87CEEB" : "#FF8533"} 
                  backgroundColor={isDark ? "currentColor" : "rgba(255,109,0,0.15)"} 
                  className={`w-full sm:w-auto rounded-[100px] cursor-pointer ${isDark ? "shadow-lg shadow-primary/20" : ""}`}
                >
                  <span className="flex items-center justify-center min-h-[44px]">
                    Explore Our Services
                  </span>
                </StarButton>
              </Link>
            </motion.div>

            {/* Live Trust & SLA Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/70 dark:border-white/10"
            >
              {/* Trust Badge 1 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-xs font-semibold text-text-primary">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>99.8% Data Accuracy SLA</span>
              </div>

              {/* Trust Badge 2 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-xs font-semibold text-text-primary">
                <Target size={13} className="text-primary" />
                <span>100% ICP Calibration</span>
              </div>

              {/* Trust Badge 3 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-xs font-semibold text-text-primary hidden sm:inline-flex">
                <Sparkles size={13} className="text-cta" />
                <span>$18M+ Pipeline Generated</span>
              </div>
            </motion.div>

          </div>

          {/* ══ Right Visual Block: Signature Revenue Signal Field (Span 5) ═ */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center relative w-full h-full min-h-[500px]">
            <HeroRightAnimation />
          </div>

        </div>

      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="cyan" position="bottom" />
    </section>
  )
}

export default Hero
