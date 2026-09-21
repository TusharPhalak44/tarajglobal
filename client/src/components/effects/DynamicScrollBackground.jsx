import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const DynamicScrollBackground = () => {
  const [isDark, setIsDark] = useState(false)
  const { scrollYProgress } = useScroll()

  // Use scrollYProgress directly; Lenis already provides global hardware-accelerated smoothing
  const smoothScroll = scrollYProgress

  // Multi-wave zoom in & zoom out transforms mapped across scroll depth
  const gridScale = useTransform(
    smoothScroll,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1.0, 1.15, 1.02, 1.18, 1.04, 1.2]
  )

  const gridRotate = useTransform(
    smoothScroll,
    [0, 0.35, 0.7, 1],
    [0, 2, -2, 0]
  )

  // Radial ambient gradient blobs shifting & zooming with scroll
  const blob1Y = useTransform(smoothScroll, [0, 1], [-80, 220])
  const blob1X = useTransform(smoothScroll, [0, 0.5, 1], [-30, 25, -20])
  const blob1Scale = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 1.25, 0.98, 1.3, 1.05]
  )

  const blob2Y = useTransform(smoothScroll, [0, 1], [120, -180])
  const blob2X = useTransform(smoothScroll, [0, 0.5, 1], [25, -30, 20])
  const blob2Scale = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    [1.15, 0.95, 1.25, 0.98, 1.18]
  )

  const blob3Y = useTransform(smoothScroll, [0, 1], [30, -100])
  const blob3Scale = useTransform(
    smoothScroll,
    [0, 0.35, 0.7, 1],
    [0.95, 1.25, 0.96, 1.2]
  )

  // Light-Mode specific Iridescent Aurora Mesh translation
  const auroraRotate = useTransform(smoothScroll, [0, 1], [0, 15])
  const auroraScale = useTransform(
    smoothScroll,
    [0, 0.3, 0.6, 1],
    [1.0, 1.15, 1.04, 1.18]
  )
  const auroraY = useTransform(smoothScroll, [0, 1], [-50, 120])

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Background Surface */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      {/* Master Container */}
      <div 
        className="absolute inset-0 origin-center"
      >
        {/* ── LIGHT MODE: Prismatic Aurora Mesh & Caustic Glow Waves ────── */}
        {!isDark && (
          <motion.div
            style={{
              y: auroraY,
              rotate: auroraRotate,
              scale: auroraScale,
            }}
            className="absolute -inset-[20%] opacity-70 pointer-events-none origin-center"
          >
            {/* Iridescent Aurora Stream 1 (Sky Azure to Soft Violet) */}
            <div 
              className="absolute top-1/4 left-1/5 w-[850px] h-[500px] rounded-[100%] blur-[120px] opacity-65 transform -rotate-12"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 166, 255, 0.28) 0%, rgba(139, 92, 246, 0.18) 50%, rgba(0, 229, 255, 0.12) 100%)'
              }}
            />

            {/* Iridescent Aurora Stream 2 (Peach Gold to Coral Glow) */}
            <div 
              className="absolute top-1/2 right-1/5 w-[800px] h-[550px] rounded-[100%] blur-[130px] opacity-60 transform rotate-15"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 109, 0, 0.25) 0%, rgba(255, 183, 77, 0.20) 50%, rgba(255, 87, 34, 0.10) 100%)'
              }}
            />

            {/* Iridescent Aurora Stream 3 (Fresh Mint to Azure) */}
            <div 
              className="absolute bottom-1/5 left-1/3 w-[750px] h-[480px] rounded-[100%] blur-[140px] opacity-50 transform -rotate-6"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(0, 166, 255, 0.18) 60%, transparent 100%)'
              }}
            />
          </motion.div>
        )}

        {/* ── AMBIENT RADIAL COLOR ORBS (Both Themes with Theme Tuning) ── */}
        {/* Cyan / Blue Orb */}
        <motion.div
          style={{
            y: blob1Y,
            x: blob1X,
            scale: blob1Scale,
            translateX: '-20%',
            translateY: '-20%',
          }}
          className="absolute top-1/4 left-1/4 w-[750px] h-[750px] rounded-full blur-[130px] opacity-60 dark:opacity-35 origin-center"
          animate={{
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 166, 255, 0.45) 0%, rgba(0, 229, 255, 0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 166, 255, 0.35) 0%, rgba(0, 229, 255, 0.18) 50%, transparent 70%)',
          }}
        />

        {/* Orange / Gold Orb */}
        <motion.div
          style={{
            y: blob2Y,
            x: blob2X,
            scale: blob2Scale,
            translateX: '20%',
            translateY: '20%',
          }}
          className="absolute top-1/2 right-1/6 w-[700px] h-[700px] rounded-full blur-[140px] opacity-55 dark:opacity-30 origin-center"
          animate={{
            background: isDark
              ? 'radial-gradient(circle, rgba(255, 109, 0, 0.4) 0%, rgba(255, 165, 0, 0.15) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 109, 0, 0.30) 0%, rgba(255, 165, 0, 0.14) 50%, transparent 70%)',
          }}
        />

        {/* Emerald / Electric Center Pulse */}
        <motion.div
          style={{
            y: blob3Y,
            scale: blob3Scale,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute top-2/3 left-1/2 w-[650px] h-[650px] rounded-full blur-[150px] opacity-45 dark:opacity-25 origin-center"
          animate={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(0, 166, 255, 0.15) 55%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, rgba(0, 166, 255, 0.14) 55%, transparent 70%)',
          }}
        />

        {/* ── HIGH-PRECISION DOT & CYBERNETIC PERSPECTIVE GRID ───────────── */}
        <motion.div
          style={{
            scale: gridScale,
            rotate: gridRotate,
          }}
          className="absolute -inset-[30%] opacity-[0.045] dark:opacity-[0.05] pointer-events-none origin-center"
          animate={{
            backgroundImage: isDark
              ? `
                linear-gradient(rgba(0, 166, 255, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 166, 255, 0.5) 1px, transparent 1px)
              `
              : `
                radial-gradient(circle, rgba(0, 102, 204, 0.7) 1.2px, transparent 1.2px)
              `,
            backgroundSize: isDark ? '48px 48px' : '32px 32px',
          }}
        />

        {/* ── FLOATING CRYSTAL PRISM SPARKLES ON SCROLL ──────────────────── */}
        <div className="absolute inset-0 opacity-40 dark:opacity-60 pointer-events-none">
          {[...Array(16)].map((_, i) => {
            const isCyan = i % 2 === 0
            const size = (i % 3) + 3
            return (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${(i * 19 + 7) % 94}%`,
                  top: `${(i * 23 + 11) % 92}%`,
                  width: size,
                  height: size,
                  background: isDark 
                    ? (isCyan ? '#00A6FF' : '#FF6D00')
                    : (isCyan ? '#0070F3' : '#FF7A00'),
                  boxShadow: isDark
                    ? (isCyan ? '0 0 10px #00A6FF' : '0 0 10px #FF6D00')
                    : (isCyan ? '0 0 8px rgba(0,112,243,0.6)' : '0 0 8px rgba(255,122,0,0.6)'),
                }}
                animate={{
                  y: [0, -25, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.35, 0.85, 0.35],
                }}
                transition={{
                  duration: 3.5 + (i % 4),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.25,
                }}
              />
            )
          })}
        </div>

        {/* ── ULTRA-LUXURY ANALOG GRAIN / NOISE TEXTURE (a-lign studio signature) ── */}
        <div 
          className="absolute inset-0 opacity-[0.032] dark:opacity-[0.05] pointer-events-none mix-blend-overlay z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </div>
  )
}

export default DynamicScrollBackground
