import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSectionBackground } from '@components/animations'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { cmsAPI } from '@api/cms.api'
import './OurClients.css'

// ── HARDCODED FALLBACK (shown while loading) ─────────────────────────────────
const FALLBACK_LOGOS = [
  { id: 'mitel', client_name: 'Mitel', logo_path: '/mitel.png' },
  { id: 'vonage', client_name: 'Vonage', logo_path: '/Vonage.png' },
  { id: 'ringcentral', client_name: 'RingCentral', logo_path: '/ringcentral.png' },
  { id: 'avaya', client_name: 'AVAYA', logo_path: '/Avaya.webp' },
  { id: 'microsoft', client_name: 'Microsoft', logo_path: '/micro.png' },
  { id: 'oracle', client_name: 'Oracle', logo_path: '/ora.png' },
]

const FALLBACK_SETTINGS = {
  eyebrow: 'GLOBAL PARTNERSHIPS',
  title_white: 'TRUSTED BY',
  title_gradient: 'LEADING B2B BRANDS',
  subtitle: 'Building demand with the technology ecosystem trusted by modern enterprises.',
  is_visible: true,
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''
const resolveImg = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('//')) return path
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path
}

export const OurClients = () => {
  const prefersReducedMotion = useReducedMotion()
  const [logos, setLogos] = useState(FALLBACK_LOGOS)
  const [settings, setSettings] = useState(FALLBACK_SETTINGS)

  useEffect(() => {
    const load = async () => {
      try {
        const [clientsRes, settingsRes] = await Promise.all([
          cmsAPI.getClients(),
          cmsAPI.getClientSectionSettings(),
        ])
        const rawClients = clientsRes.data?.data || clientsRes.data || []
        if (Array.isArray(rawClients) && rawClients.length > 0) setLogos(rawClients)
        if (settingsRes.data?.data) setSettings(settingsRes.data.data)
      } catch (err) {
        // silently fall back to hardcoded defaults
        console.warn('OurClients: CMS fetch failed, using defaults', err)
      }
    }
    load()
  }, [])

  // If admin hid the section, render nothing
  if (!settings.is_visible) return null

  const MARQUEE_ITEMS = [...logos, ...logos, ...logos, ...logos]

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
              {settings.eyebrow}
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
              {settings.title_white}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
              {settings.title_gradient}
            </span>
          </motion.h2>

          {/* Supporting Text */}
          {settings.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              {settings.subtitle}
            </motion.p>
          )}
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
                      src={resolveImg(logo.logo_path || logo.src)}
                      alt={logo.client_name || logo.alt || logo.name}
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
                      src={resolveImg(logo.logo_path || logo.src)}
                      alt={logo.client_name || logo.alt || logo.name}
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

