import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Sparkles, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import ImageCarousel from './ImageCarousel'

// ─── Value Points Configuration (Clean Font-Sans, Attractive Flying Cards) ──
const FLYING_POINTS = [
  {
    num: 'Point 01',
    icon: Layers,
    title: 'One CRM, Every Function',
    desc: 'Leads, accounts, cadences, clients, and reports in one synchronized platform.',
    floatDelay: 0,
  },
  {
    num: 'Point 02',
    icon: Sparkles,
    title: 'AI-Assisted Intent Scoring',
    desc: 'Fit and behavior signals show which accounts are ready for a conversation.',
    floatDelay: 1.2,
  },
  {
    num: 'Point 03',
    icon: ShieldCheck,
    title: 'Built in Real Delivery Operations',
    desc: 'Developed and used by TaRaj Global to run B2B demand programs across US, EMEA, and APAC.',
    floatDelay: 0.6,
  },
]

// ─── Glimmer Wrap Particle Background (Styled with Brand Blue) ───────────────
const GlimmerWrap = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate brand glimmer particles
    const particleCount = 75
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.1,
      flashSpeed: Math.random() * 0.02 + 0.008,
      growing: Math.random() > 0.5,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Glimmer / twinkle flash
        if (p.growing) {
          p.alpha += p.flashSpeed
          if (p.alpha >= 0.85) p.growing = false
        } else {
          p.alpha -= p.flashSpeed
          if (p.alpha <= 0.1) p.growing = true
        }

        // Strictly using Taraj Global brand primary blue (#00A6FF)
        ctx.fillStyle = `rgba(0, 166, 255, ${p.alpha * 0.7})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(0, 166, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-0"
    />
  )
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-background text-text-primary font-sans overflow-x-clip overflow-y-visible flex flex-col justify-start pt-24 sm:pt-24 lg:pt-22 xl:pt-24 pb-8 sm:pb-12 mt-[-80px]"
      aria-label="DemandFlow Bridge Hero"
    >
      {/* ─── Glimmer Wrap Animated Background (Brand Blue) ─────────────────── */}
      <GlimmerWrap />

      {/* ─── TOP 2-COLUMN SECTION: LEFT (PITCH & CTAs) + RIGHT (3 VALUE CARDS) ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center shrink-0">

        {/* LEFT COLUMN: Eyebrow, Headline, Subtitle, CTA buttons (Aligned Left) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left shrink-0">

          {/* Eyebrow Tag */}
          <div className="mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-primary">
              B2B CRM PLATFORM
            </span>
          </div>

          {/* Main Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] xl:text-[34px] font-heading font-bold tracking-tight text-text-primary mb-2 sm:mb-2.5 leading-[1.15]"
          >
            <span className="block pb-0.5 sm:pb-1">DemandFlow Bridge:  The AI-Assisted</span>
            <span
              className="inline-block bg-clip-text text-transparent pt-0.5 leading-[1.28]"
              style={{ backgroundImage: 'linear-gradient(90deg, #00A6FF 0%, #67E8F9 100%)' }}
            >
              CRM for B2B Demand Operations
            </span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            {...fadeUp(0.32)}
            className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed mb-3 sm:mb-3.5 max-w-[560px]"
          >
            Leads that live in spreadsheets, intent signals nobody sees, and reports that arrive too late slow every B2B campaign. DemandFlow Bridge, TaRaj Global’s CRM product, unifies leads, accounts, outreach, client SLAs, and AI-assisted intent scoring in one platform.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 min-h-[40px] sm:min-h-[42px] rounded-3xl font-sans font-semibold text-xs sm:text-sm text-text-accent dark:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
              style={{
                background: '#FF6D00',
                boxShadow: '0 4px 20px rgba(0,166,255,0.3)',
              }}
            >
              <span>Talk To TarajGlobal</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-text-accent dark:text-white group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 min-h-[40px] sm:min-h-[42px] rounded-3xl font-sans font-semibold text-xs sm:text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
              style={{ background: 'transparent', color: 'inherit', boxShadow: 'none', border: '1.5px solid currentColor' }}
            >
              <span>Explore the Platform</span>
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Strip Badge + 3 Attractive Glassmorphism Cards */}
        <div className="lg:col-span-5 flex flex-col gap-1 sm:gap-1.5 w-full">

          {/* Strip Badge */}
          <div className="flex items-center justify-start lg:justify-end mb-0.5">
            <div className="inline-flex items-center  font-sans font-bold tracking-[0.14em] uppercase text-primary">
              <span className="relative flex h-1.5 w-1.5">

              </span>
              <span>WHY TEAMS USE DEMANDFLOW BRIDGE</span>
            </div>
          </div>

          {/* 3 Attractive Floating Glass Cards (Minimized Font Sizes) */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {FLYING_POINTS.map((pt) => {
              const Icon = pt.icon
              return (
                <motion.div
                  key={pt.num}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                        y: [0, -3, 0],
                      }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: pt.floatDelay,
                  }}
                  className="group relative rounded-xl sm:rounded-2xl p-2 sm:p-2.5 bg-gradient-to-r from-[#0C1322]/90 via-[#0A0F1D]/85 to-[#070B16]/90 border border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_8px_24px_rgba(0,166,255,0.18)] flex flex-col gap-0.5 backdrop-blur-xl overflow-hidden cursor-default"
                >
                  {/* Subtle hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Left Edge Accent Bar */}
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_8px_var(--primary)] transition-all duration-300" />

                  {/* Top Row: Icon Dock + Point Tag + Title */}
                  <div className="flex items-center gap-1.5 pl-1">
                    {/* Glowing Icon Dock */}
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_8px_rgba(0,166,255,0.2)] group-hover:shadow-[0_0_14px_rgba(0,166,255,0.35)] group-hover:border-primary/60 group-hover:scale-105 transition-all duration-300 shrink-0">
                      <Icon className="w-3 h-3 text-primary" />
                    </div>

                    {/* Point Tag */}
                    <span className="text-[9px] font-sans font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-primary/10 text-primary-light border border-primary/25 shrink-0">
                      {pt.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-[13px] sm:text-[14px] font-heading font-semibold text-text-primary tracking-tight leading-snug group-hover:text-primary transition-colors truncate">
                      {pt.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] sm:text-[12px] font-sans text-text-secondary leading-snug font-normal pl-8.5 pr-2">
                    {pt.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>

      {/* ─── 3D CONCAVE CYLINDER IMAGE CAROUSEL SECTION ─────────────────── */}
      <div className="relative w-full z-10 flex flex-col items-center justify-center pt-2 sm:pt-4 overflow-visible">
        <ImageCarousel />
      </div>
    </section>
  )
}

export default Hero