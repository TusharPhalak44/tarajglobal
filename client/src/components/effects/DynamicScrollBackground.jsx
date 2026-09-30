import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const DynamicScrollBackground = () => {
  const [isDark, setIsDark] = useState(false)

  const { scrollYProgress } = useScroll()

  const smoothScroll = scrollYProgress

  // ============================================================
  // GRID ANIMATION
  // ============================================================

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

  // ============================================================
  // BLUE ORB
  // ============================================================

  const blob1Y = useTransform(
    smoothScroll,
    [0, 1],
    [-80, 220]
  )

  const blob1X = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [-30, 25, -20]
  )

  const blob1Scale = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 1.25, 0.98, 1.3, 1.05]
  )

  // ============================================================
  // ORANGE ORB
  // ============================================================

  const blob2Y = useTransform(
    smoothScroll,
    [0, 1],
    [120, -180]
  )

  const blob2X = useTransform(
    smoothScroll,
    [0, 0.5, 1],
    [25, -30, 20]
  )

  const blob2Scale = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    [1.15, 0.95, 1.25, 0.98, 1.18]
  )

  // ============================================================
  // EMERALD ORB
  // ============================================================

  const blob3Y = useTransform(
    smoothScroll,
    [0, 1],
    [30, -100]
  )

  const blob3Scale = useTransform(
    smoothScroll,
    [0, 0.35, 0.7, 1],
    [0.95, 1.25, 0.96, 1.2]
  )

  // ============================================================
  // THEME DETECTION
  // ============================================================

  useEffect(() => {
    const checkDark = () => {
      const dark =
        document.documentElement.classList.contains('dark')

      setIsDark(dark)
    }

    // Initial check
    checkDark()

    // Watch for theme changes
    const observer = new MutationObserver(checkDark)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        fixed
        inset-0
        pointer-events-none
        z-0
        overflow-hidden
        select-none
      "
      aria-hidden="true"
    >

      {/* ========================================================
          BASE BACKGROUND
          ======================================================== */}

      <div
        className="
          absolute
          inset-0
          transition-colors
          duration-700
        "
        style={{
          backgroundColor: isDark
            ? '#050A14'
            : '#E8EDF5',
        }}
      />

      {/* ========================================================
          MASTER BACKGROUND LAYER
          ======================================================== */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          origin-center
        "
      >

        {/* ======================================================
            BLUE / CYAN AMBIENT ORB
            ====================================================== */}

        <motion.div
          className="
            absolute
            top-1/4
            left-1/4
            w-[750px]
            h-[750px]
            rounded-full
            blur-[130px]
            origin-center
          "
          style={{
            y: blob1Y,
            x: blob1X,
            scale: blob1Scale,
            translateX: '-20%',
            translateY: '-20%',
            willChange: 'transform',
          }}
          animate={{
            background: isDark
              ? `
                radial-gradient(
                  circle,
                  rgba(0,166,255,0.45) 0%,
                  rgba(0,229,255,0.20) 50%,
                  transparent 70%
                )
              `
              : `
                radial-gradient(
                  circle,
                  rgba(37,99,235,0.22) 0%,
                  rgba(59,130,246,0.13) 45%,
                  transparent 72%
                )
              `,
            opacity: isDark ? 0.35 : 0.85,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />

        {/* ======================================================
            ORANGE / GOLD AMBIENT ORB
            ====================================================== */}

        <motion.div
          className="
            absolute
            top-1/2
            right-1/6
            w-[700px]
            h-[700px]
            rounded-full
            blur-[140px]
            origin-center
          "
          style={{
            y: blob2Y,
            x: blob2X,
            scale: blob2Scale,
            translateX: '20%',
            translateY: '20%',
            willChange: 'transform',
          }}
          animate={{
            background: isDark
              ? `
                radial-gradient(
                  circle,
                  rgba(255,109,0,0.40) 0%,
                  rgba(255,165,0,0.15) 50%,
                  transparent 70%
                )
              `
              : `
                radial-gradient(
                  circle,
                  rgba(249,115,22,0.18) 0%,
                  rgba(251,146,60,0.10) 50%,
                  transparent 72%
                )
              `,
            opacity: isDark ? 0.30 : 0.80,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />

        {/* ======================================================
            EMERALD / TEAL AMBIENT ORB
            ====================================================== */}

        <motion.div
          className="
            absolute
            top-2/3
            left-1/2
            w-[650px]
            h-[650px]
            rounded-full
            blur-[150px]
            origin-center
          "
          style={{
            y: blob3Y,
            scale: blob3Scale,
            translateX: '-50%',
            translateY: '-50%',
            willChange: 'transform',
          }}
          animate={{
            background: isDark
              ? `
                radial-gradient(
                  circle,
                  rgba(16,185,129,0.35) 0%,
                  rgba(0,166,255,0.15) 55%,
                  transparent 70%
                )
              `
              : `
                radial-gradient(
                  circle,
                  rgba(16,185,129,0.15) 0%,
                  rgba(14,165,233,0.11) 55%,
                  transparent 72%
                )
              `,
            opacity: isDark ? 0.25 : 0.75,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />

        {/* ======================================================
            CYBERNETIC GRID
            ====================================================== */}

        <motion.div
          className="
            absolute
            pointer-events-none
            origin-center
          "
          style={{
            top: '-30%',
            left: '-30%',
            width: '160%',
            height: '160%',

            scale: gridScale,
            rotate: gridRotate,

            backgroundImage: isDark
              ? `
                linear-gradient(
                  rgba(0,166,255,0.50) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(0,166,255,0.50) 1px,
                  transparent 1px
                )
              `
              : `
                linear-gradient(
                  rgba(51,65,85,0.32) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(51,65,85,0.32) 1px,
                  transparent 1px
                )
              `,

            backgroundSize: '48px 48px',

            /*
             * Dark mode:
             * Keep existing subtle cyber-blue appearance.
             *
             * Light mode:
             * Stronger visibility + multiply blending.
             */
            opacity: isDark ? 0.06 : 0.85,

            mixBlendMode: isDark
              ? 'screen'
              : 'multiply',

            willChange: 'transform',
          }}
        />

        {/* ======================================================
            FLOATING SPARKLE DOTS
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            opacity: isDark ? 0.60 : 0.45,
          }}
        >
          {[...Array(16)].map((_, i) => {
            const isCyan = i % 2 === 0
            const size = (i % 3) + 3

            return (
              <motion.div
                key={i}
                className="
                  absolute
                  rounded-full
                  pointer-events-none
                "
                style={{
                  left: `${(i * 19 + 7) % 94}%`,
                  top: `${(i * 23 + 11) % 92}%`,

                  width: size,
                  height: size,

                  background: isDark
                    ? (
                      isCyan
                        ? '#00A6FF'
                        : '#FF6D00'
                    )
                    : (
                      isCyan
                        ? '#2563EB'
                        : '#EA580C'
                    ),

                  boxShadow: isDark
                    ? (
                      isCyan
                        ? '0 0 10px #00A6FF'
                        : '0 0 10px #FF6D00'
                    )
                    : (
                      isCyan
                        ? '0 0 8px rgba(37,99,235,0.45)'
                        : '0 0 8px rgba(234,88,12,0.40)'
                    ),

                  willChange: 'transform, opacity',
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

        {/* ======================================================
            GRAIN / NOISE TEXTURE
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            mix-blend-overlay
            z-20
          "
          style={{
            opacity: isDark ? 0.05 : 0.035,

            backgroundImage: `
              url("data:image/svg+xml,%3Csvg
                viewBox='0 0 250 250'
                xmlns='http://www.w3.org/2000/svg'
              %3E
                %3Cfilter id='noiseFilter'%3E
                  %3CfeTurbulence
                    type='fractalNoise'
                    baseFrequency='0.85'
                    numOctaves='3'
                    stitchTiles='stitch'
                  /%3E
                %3C/filter%3E

                %3Crect
                  width='100%25'
                  height='100%25'
                  filter='url(%23noiseFilter)'
                /%3E
              %3C/svg%3E")
            `,
          }}
        />

      </div>
    </div>
  )
}

export default DynamicScrollBackground