import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, Plus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@components/layout/Container'
import { AnimatedSectionBackground, SectionLaserDivider } from '@components/animations'

const testimonials = [
  {
    id: 'innovatetech',
    company: 'InnovateTech Solutions',
    companyLogo: '/Vonage.png',
    accentColor: '#FF6D00',
    rating: 5,
    quote: "Taraj Global's data-driven approach and attention to detail sets them apart. They don't just deliver leads; they deliver opportunities that convert. Our partnership has been instrumental in scaling our business growth.",
  },
  {
    id: 'avaya',
    company: 'Avaya Global Systems',
    companyLogo: '/Avaya.webp',
    accentColor: '#DA291C',
    rating: 5,
    quote: "Taraj Global transformed our B2B demand generation strategy. Their targeted outreach helped us connect with high-value enterprise accounts and build a high-velocity sales pipeline with verified decision-makers.",
  },
  {
    id: 'oracle-partner',
    company: 'Oracle Solutions Partner',
    companyLogo: '/ora.png',
    accentColor: '#C74634',
    rating: 5,
    quote: "Working with Taraj Global improved our ability to reach verified decision-makers across global accounts. The quality of qualified leads and account-based intelligence is exceptional.",
  },
  {
    id: 'mitel',
    company: 'Mitel Networks',
    companyLogo: '/mitel.png',
    accentColor: '#005596',
    rating: 5,
    quote: "The content syndication and appointment setting programs delivered exceptional results. We've seen a measurable increase in qualified pipeline and executive engagement across our key verticals.",
  },
  {
    id: 'ringcentral',
    company: 'RingCentral Inc.',
    companyLogo: '/ringcentral.png',
    accentColor: '#FF6200',
    rating: 5,
    quote: "Their B2B lead generation services helped us reach the right audience and accelerate our sales cycle. The Taraj Global team is proactive, knowledgeable, and focused on delivering real revenue impact.",
  },
  {
    id: 'microsoft-partner',
    company: 'Microsoft Solutions Partner',
    companyLogo: '/micro.png',
    accentColor: '#00A4EF',
    rating: 5,
    quote: "Taraj Global provided a targeted B2B lead generation strategy that helped us identify relevant prospects and create predictable new enterprise revenue opportunities with zero duplicate data.",
  },
]

// Duplicate list for infinite seamless marquee loop
const marqueeList = [...testimonials, ...testimonials]

export const Testimonials = () => {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden bg-background text-text-primary"
      aria-label="Client Reviews & Testimonials"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* ── Background Ambient Glowing Lighting ────────────────────────── */}
      <AnimatedSectionBackground accent="purple" />

      <Container className="relative z-10 mb-12">
        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary/70 dark:text-[#00E5FF]/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                Client Reviews &amp; Endorsements
              </span>
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cta/70 dark:text-orange-400/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16]">
            Trusted by Enterprise{' '}
            <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
              Revenue Leaders
            </span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Real impact delivered to global technology enterprises and fast-scaling B2B organizations.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta mx-auto rounded-full mt-6" />
        </div>
      </Container>

      {/* ── Infinite Animated Kinetic Marquee Track (Non-Stop Continuous Flow) ── */}
      <div className="relative w-full overflow-hidden py-4 -my-4">
        {/* Edge Fade Masks for Luxury Depth */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-4 sm:gap-6 w-max px-3 sm:px-4"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {marqueeList.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-[280px] min-[375px]:w-[320px] sm:w-[380px] md:w-[420px] shrink-0 rounded-2xl sm:rounded-3xl p-5 min-[375px]:p-6 sm:p-8 bg-surface/95 dark:bg-[#0B0F19]/95 border border-border/80 dark:border-white/10 shadow-lg hover:shadow-2xl dark:hover:border-primary/50 dark:hover:shadow-[0_20px_50px_-10px_rgba(0,166,255,0.3)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl group"
            >
              {/* Corner Rotating Precision Crosshair */}
              <div className="absolute top-4 right-4 text-text-muted/30 group-hover:text-primary transition-colors duration-300">
                <Plus size={14} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>

              {/* Ambient Brand Color Corner Flare */}
              <div
                className="absolute -top-16 -left-16 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Top Row: Logo & Star Rating */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  {/* Clean 3D Logo Pod */}
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/95 p-2 flex items-center justify-center border border-border/80 shadow-md group-hover:scale-108 group-hover:shadow-lg transition-transform duration-300 flex-shrink-0">
                    <img
                      src={item.companyLogo}
                      alt={item.company}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* 5-Star Rating Cluster with micro-animations */}
                  <div className="flex items-center gap-1 bg-surface/80 dark:bg-white/5 px-3 py-1.5 rounded-full border border-border/70 dark:border-white/10 shadow-2xs">
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.28, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="cursor-pointer"
                      >
                        <Star
                          size={13}
                          className="fill-amber-400 text-amber-400"
                        />
                      </motion.div>
                    ))}
                    <span className="text-[11px] font-mono font-bold text-text-primary ml-1">5.0</span>
                  </div>
                </div>

                {/* Company Name */}
                <h3 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight leading-snug mb-3 group-hover:text-primary dark:group-hover:text-[#00E5FF] transition-colors duration-300">
                  {item.company}
                </h3>

                {/* Quote Icon */}
                <div className="mb-2 text-primary/30 dark:text-primary/40 group-hover:text-primary transition-colors duration-300">
                  <Quote size={24} className="transform -scale-x-100" />
                </div>

                {/* Review Quote Text */}
                <blockquote className="text-text-secondary text-sm sm:text-[15px] leading-relaxed font-normal italic">
                  "{item.quote}"
                </blockquote>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="cyan" position="bottom" />
    </section>
  )
}

export default Testimonials
