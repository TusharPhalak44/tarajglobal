import React from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Share2,
  Eye,
  TrendingUp,
} from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

const VALUE_PILLARS = [
  {
    num: '01',
    title: 'One Source of Truth',
    icon: Database,
    color: '#008CFF',
    neonColor: '#00D2FF',
    glow: 'rgba(0, 140, 255, 0.9)',
    glowSubtle: 'rgba(0, 140, 255, 0.25)',
    cubeGradient: 'linear-gradient(145deg, #60a5fa 0%, #008CFF 45%, #004ecc 100%)',
    ringColor: '#00D2FF',
    tilt: 'perspective(1000px) rotateY(-5deg) rotateX(1.5deg) rotateZ(-1.2deg)',
    cardBorderRadius: '32px 18px 24px 16px',
    topCrestColor: '#00D2FF',
    wing: {
      className: 'absolute -top-6 right-0 w-[64%] h-[74px] pointer-events-none -z-10',
      style: {
        background: 'linear-gradient(135deg, rgba(0, 140, 255, 0.25) 0%, rgba(0, 60, 180, 0.06) 60%, transparent 100%)',
        borderTop: '1.8px solid rgba(0, 210, 255, 0.75)',
        borderRight: '1.2px solid rgba(0, 210, 255, 0.45)',
        borderRadius: '0 24px 0 0',
        transform: 'skewY(-6deg) rotate(2.5deg)',
        boxShadow: '0 0 20px rgba(0, 140, 255, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
    },
    details: 'Conflicting records waste time. One record per account, lead, and client keeps sales, operations, and leadership aligned.',
  },
  {
    num: '02',
    title: 'Connected Workflows',
    icon: Share2,
    color: '#00D9E8',
    neonColor: '#00F0FF',
    glow: 'rgba(0, 217, 232, 0.9)',
    glowSubtle: 'rgba(0, 217, 232, 0.25)',
    cubeGradient: 'linear-gradient(145deg, #67e8f9 0%, #00D9E8 45%, #0891b2 100%)',
    ringColor: '#00F0FF',
    tilt: 'perspective(1000px) rotateY(-2deg) rotateX(0.8deg) rotateZ(-0.5deg)',
    cardBorderRadius: '26px 18px 22px 24px',
    topCrestColor: '#00D9E8',
    wing: {
      className: 'absolute -top-7 -right-1 w-[66%] h-[78px] pointer-events-none -z-10',
      style: {
        background: 'linear-gradient(135deg, rgba(0, 217, 232, 0.25) 0%, rgba(8, 145, 178, 0.06) 60%, transparent 100%)',
        borderTop: '1.8px solid rgba(0, 240, 255, 0.8)',
        borderRight: '1.2px solid rgba(0, 240, 255, 0.45)',
        borderRadius: '0 26px 0 0',
        transform: 'skewY(-7deg) rotate(3deg)',
        boxShadow: '0 0 20px rgba(0, 217, 232, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
    },
    details: 'Manual handoffs drop leads. Workflows pass each lead from discovery to qualification, sales, and delivery without rework.',
  },
  {
    num: '03',
    title: 'Real-Time Visibility',
    icon: Eye,
    color: '#FF8A00',
    neonColor: '#FFA600',
    glow: 'rgba(255, 138, 0, 0.9)',
    glowSubtle: 'rgba(255, 138, 0, 0.25)',
    cubeGradient: 'linear-gradient(145deg, #fed7aa 0%, #FF8A00 45%, #c2410c 100%)',
    ringColor: '#FFA600',
    tilt: 'perspective(1000px) rotateY(2deg) rotateX(0.8deg) rotateZ(0.5deg)',
    cardBorderRadius: '24px 28px 24px 18px',
    topCrestColor: '#FFA600',
    wing: {
      className: 'absolute -top-7 right-0 w-[64%] h-[76px] pointer-events-none -z-10',
      style: {
        background: 'linear-gradient(135deg, rgba(255, 138, 0, 0.25) 0%, rgba(194, 65, 12, 0.06) 60%, transparent 100%)',
        borderTop: '1.8px solid rgba(255, 166, 0, 0.8)',
        borderRight: '1.2px solid rgba(255, 166, 0, 0.45)',
        borderRadius: '0 26px 0 0',
        transform: 'skewY(-6.5deg) rotate(2.5deg)',
        boxShadow: '0 0 20px rgba(255, 138, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
    },
    details: 'Logging reports hide problems. Live telemetry shows campaign pacing, SLA delivery, and revenue conversion as they happen.',
  },
  {
    num: '04',
    title: 'Scalable Operations',
    icon: TrendingUp,
    color: '#22D878',
    neonColor: '#34F58E',
    glow: 'rgba(34, 216, 120, 0.9)',
    glowSubtle: 'rgba(34, 216, 120, 0.25)',
    cubeGradient: 'linear-gradient(145deg, #86efac 0%, #22D878 45%, #059669 100%)',
    ringColor: '#34F58E',
    tilt: 'perspective(1000px) rotateY(5deg) rotateX(1.5deg) rotateZ(1.2deg)',
    cardBorderRadius: '24px 24px 18px 30px',
    topCrestColor: '#34F58E',
    wing: {
      className: 'absolute -top-8 -right-1 w-[68%] h-[82px] pointer-events-none -z-10',
      style: {
        background: 'linear-gradient(135deg, rgba(34, 216, 120, 0.25) 0%, rgba(5, 150, 105, 0.06) 60%, transparent 100%)',
        borderTop: '1.8px solid rgba(52, 245, 142, 0.85)',
        borderRight: '1.2px solid rgba(52, 245, 142, 0.45)',
        borderRadius: '0 28px 0 0',
        transform: 'skewY(-8deg) rotate(3.5deg)',
        boxShadow: '0 0 22px rgba(34, 216, 120, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
    },
    details: 'Growth breaks fragile processes. The platform scales across SDR pods, international time zones, and expanding service suites.',
  },
]

const WhyOnePlatform = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="why-one-platform"
      className="relative py-16 sm:py-20 lg:py-24 bg-background overflow-hidden"
      aria-label="Why One Platform"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-3.5"
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              THE UNIFIED ADVANTAGE
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2.5xl sm:text-4xl lg:text-[36px] font-black tracking-tight leading-[1.22] text-text-primary mb-4"
          >
            Less Switching.{' '}
            <span className="highlight">
              More Control.
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Disjointed software breeds confusion, lost leads, and administrative friction. DemandFlow Bridge gives your team one structure for consistent execution.
          </motion.p>
        </div>

        {/* 4 Feature Cards Grid with Better Spacing and Compact Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7 xl:gap-8 pt-9 sm:pt-11 items-stretch">
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon

            return (
              <div
                key={pillar.num}
                className="h-full"
                style={{
                  transform: prefersReducedMotion ? 'none' : pillar.tilt,
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 28 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -8,
                          transition: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                  className="group relative flex flex-col justify-between cursor-default h-full"
                >
                  {/* 1. Behind-Card Tilted / Cross Glass Wing */}
                  <div
                    className={`${pillar.wing.className} transition-all duration-500 group-hover:scale-105`}
                    style={pillar.wing.style}
                  />

                  {/* 2. Floating 3D Glossy App Icon Tile with Tilted Saturn Orbital Ring */}
                  <div className="absolute -top-6 sm:-top-7 right-4 sm:right-5 z-30 flex items-center justify-center pointer-events-none">
                    {/* Glowing Saturn-like Orbital Ring */}
                    <div
                      className="absolute w-[76px] h-[32px] sm:w-[84px] sm:h-[35px] rounded-[100%] border-[2px] -rotate-[18deg] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-[14deg]"
                      style={{
                        borderColor: pillar.ringColor,
                        boxShadow: `0 0 15px ${pillar.glow}, inset 0 0 7px ${pillar.glow}`,
                      }}
                    />

                    {/* 3D Glossy Beveled Squircle Tile */}
                    <div
                      className="relative z-10 w-12 h-12 sm:w-13 sm:h-13 rounded-[16px] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: pillar.cubeGradient,
                        boxShadow: `0 14px 24px -4px rgba(0,0,0,0.85), 0 5px 16px ${pillar.glow}, inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -4px 7px rgba(0,0,0,0.6)`,
                        border: '1.5px solid rgba(255,255,255,0.5)',
                      }}
                    >
                      {/* Top half specular glossy reflection streak */}
                      <div
                        className="absolute top-0.5 left-1.5 right-1.5 h-[44%] rounded-t-[12px]"
                        style={{
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.08) 100%)',
                        }}
                      />
                      <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] relative z-10" />
                    </div>
                  </div>

                  {/* 3. Main Glass Card Body */}
                  <div
                    className="relative flex-1 flex flex-col justify-between p-5 sm:p-6 pt-6 sm:pt-7 overflow-hidden transition-all duration-300"
                    style={{
                      borderRadius: pillar.cardBorderRadius,
                      background: 'linear-gradient(170deg, rgba(255, 255, 255, 0.08) 0%, rgba(13, 22, 38, 0.90) 30%, rgba(3, 7, 18, 0.98) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      boxShadow: `0 24px 50px -12px rgba(0, 0, 0, 0.95), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.28)`,
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Top-Left Glowing Neon Curved Crest Cap */}
                    <div className="absolute top-0 left-0 w-22 h-22 pointer-events-none rounded-tl-[32px] overflow-hidden">
                      <div
                        className="w-full h-full rounded-tl-[32px]"
                        style={{
                          borderTop: `2.5px solid ${pillar.topCrestColor}`,
                          borderLeft: `2.5px solid ${pillar.topCrestColor}`,
                          boxShadow: `0 0 16px ${pillar.glow}`,
                          maskImage: 'linear-gradient(to bottom right, black 35%, transparent 75%)',
                          WebkitMaskImage: 'linear-gradient(to bottom right, black 35%, transparent 75%)',
                        }}
                      />
                    </div>

                    {/* Bottom-Right Layered Translucent Gradient Facet Wedge */}
                    <div
                      className="absolute -bottom-2 -right-2 w-32 h-28 pointer-events-none rounded-tl-[44px] overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, transparent 20%, ${pillar.glowSubtle} 100%)`,
                        borderTop: '1.5px solid rgba(255, 255, 255, 0.18)',
                        borderLeft: '1.5px solid rgba(255, 255, 255, 0.18)',
                      }}
                    />

                    {/* Upper Content: Large Frosted Number in Top-Left */}
                    <div className="relative z-10 mb-5 pt-0.5">
                      <span className="text-3xl sm:text-[34px] font-black tracking-tight font-sans text-white/50 group-hover:text-white/80 transition-colors">
                        {pillar.num}
                      </span>
                    </div>

                    {/* Middle Content: Heading + Description */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center my-auto pb-3">
                      <h3 className="text-lg sm:text-[20px] font-black tracking-tight text-white leading-snug mb-2.5">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                        {pillar.details}
                      </p>
                    </div>

                    {/* Bottom Laser Neon Edge Glow */}
                    <div
                      className="absolute bottom-0 left-5 right-5 h-[2.5px] rounded-full pointer-events-none transition-all duration-300 group-hover:left-3 group-hover:right-3 group-hover:h-[3.5px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${pillar.color}, ${pillar.neonColor}, transparent)`,
                        boxShadow: `0 -2px 16px 2px ${pillar.glow}, 0 4px 22px ${pillar.color}`,
                      }}
                    />
                  </div>

                  {/* 4. Ambient Floor Ground Glow underneath each card */}
                  <div
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4/5 h-10 opacity-40 group-hover:opacity-85 transition-opacity duration-500 blur-xl pointer-events-none -z-20"
                    style={{ backgroundColor: pillar.color }}
                  />
                </motion.div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default WhyOnePlatform