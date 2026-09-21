import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export const GalleryHero = () => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle scroll parallax
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 600], [0, -90])
  const opacityParallax = useTransform(scrollY, [0, 500], [1, 0.25])

  // Mouse tilt for moving grid dots
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] md:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background text-text-primary px-6 md:px-14 lg:px-20 pt-28 md:pt-36 pb-12 select-none border-b border-border/40"
    >
      {/* BACKGROUND: Subtle interactive grid with moving point matrix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 dark:opacity-25">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <defs>
            <pattern
              id="gallery-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1.2" className="fill-text-secondary/40" />
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border/40"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-grid)" />
        </svg>

        {/* Floating live coordinate accents */}
        <div className="absolute top-1/4 right-12 font-mono text-[10px] tracking-widest text-text-muted/60 hidden md:block">
          LAT // 28.6139° N · LON // 77.2090° E
        </div>
        <div className="absolute bottom-1/3 left-12 font-mono text-[10px] tracking-widest text-text-muted/60 hidden md:block">
          STATUS // EXHIBITION_ACTIVE [12_MODULES]
        </div>
      </div>

      {/* TOP: Small Label with editorial slash */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-between border-b border-border/60 pb-4 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest uppercase text-text-muted">
          <span className="text-primary font-bold">TARAJ GLOBAL</span>
          <span className="text-border">/</span>
          <span>SERVICES</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-wider text-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>B2B GROWTH GALLERY</span>
        </div>
      </motion.div>

      {/* CENTER: Massive Typography Composition */}
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-10 my-auto py-8 max-w-7xl mx-auto w-full flex flex-col justify-center"
      >
        <div className="relative font-black tracking-tighter uppercase leading-[0.88] select-none text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[9vw]">
          {/* WORD 01: BUILD */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-primary hover:text-primary transition-colors duration-500 inline-block"
            >
              BUILD
            </motion.div>
          </div>

          {/* WORD 02: BETTER (Shifted slightly to the right) */}
          <div className="overflow-hidden flex justify-start sm:justify-center md:pl-24">
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-secondary to-text-muted inline-block"
            >
              BETTER
            </motion.div>
          </div>

          {/* WORD 03 & 04: B2B GROWTH. (Shifted off-grid with accent) */}
          <div className="overflow-hidden flex flex-wrap items-baseline justify-between gap-4 md:gap-12">
            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-primary inline-block tracking-tight"
            >
              B2B
            </motion.div>

            <motion.div
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-primary hover:text-primary transition-colors duration-500 inline-block text-right self-end -mr-2 md:-mr-6"
            >
              GROWTH.
            </motion.div>
          </div>
        </div>

        {/* Supporting Curated Narrative Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 pt-6 border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-text-muted text-xs md:text-sm font-sans"
        >
          <div className="font-mono text-xs uppercase tracking-wider text-text-primary">
            [EXHIBITION // 2026]
          </div>
          <div className="md:col-span-2 leading-relaxed">
            From demand generation to qualified pipeline, Taraj Global connects verified B2B intelligence, precision outreach, and conversion systems into an orchestrated revenue engine.
          </div>
        </motion.div>
      </motion.div>

      {/* BOTTOM: Continuous Subtle Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full pt-4 border-t border-border/40"
      >
        <div className="text-[11px] font-mono tracking-widest uppercase text-text-muted">
          INDEX 01 / 13
        </div>

        <a
          href="#growth-map"
          className="group inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-text-muted hover:text-primary transition-colors duration-300"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5 text-primary" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}

export default GalleryHero
