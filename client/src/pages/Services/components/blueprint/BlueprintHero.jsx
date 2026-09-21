import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'

const SERVICE_INDEX = [
  { num: '01', name: 'Lead Generation', route: '/sql-services', img: '/sql-lead-qualification-journey.jpg' },
  { num: '02', name: 'Demand Generation', route: '/demand-generation', img: '/demandflow-campaigns.png' },
  { num: '03', name: 'Account-Based Marketing', route: '/abm', img: '/enterprise-audience.jpg' },
  { num: '04', name: 'Email Marketing', route: '/b2b-email-marketing', img: '/demandflow-qualification.png' },
  { num: '05', name: 'Appointment Setting', route: '/b2b-appointment-setting', img: '/b2b-appointment-setting-journey.jpg' },
  { num: '06', name: 'Data Solutions', route: '/b2b-list-building', img: '/careers-hero-team.jpg' },
]

export default function BlueprintHero() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToCoreServices = () => {
    const el = document.getElementById('core-services-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const currentItem = SERVICE_INDEX[activeIndex]

  return (
    <section
      id="blueprint-hero"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center pt-28 pb-16 lg:py-24 bg-[#05070B] text-white overflow-hidden border-b border-white/10 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[#FF6D00]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Subtle fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ══════════ LEFT: Headline & Actions (5 cols) ══════════ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6D00]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                OUR SERVICES
              </span>
            </motion.div>

            {/* H1 with orange highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.06] text-white"
            >
              Strategic B2B Services for <br />
              <span className="text-[#FF6D00]">Sustainable Growth</span>
            </motion.h1>

            {/* Exact Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed font-normal max-w-xl"
            >
              We help businesses find the right accounts, engage the right people and create real opportunities. Our data-driven B2B services are designed to build a stronger pipeline and fuel long-term growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={scrollToCoreServices}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#FF6D00]/30 cursor-pointer group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all hover:border-[#FF6D00]/60 cursor-pointer"
              >
                <span>Talk to Our Experts</span>
              </button>
            </motion.div>
          </div>

          {/* ══════════ CENTER: Large B2B Visual with Orange Growth Line (4 cols) ══════════ */}
          <div className="lg:col-span-4 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              {/* Dynamic Image driven by active index */}
              <motion.div
                key={currentItem.img}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentItem.img})` }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent" />

              {/* Subtle SVG Orange Growth Line Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
                viewBox="0 0 400 500"
                fill="none"
              >
                <path
                  d="M 30 450 C 120 400, 180 320, 260 220 S 340 120, 370 80"
                  stroke="#FF6D00"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                />
                <circle cx="370" cy="80" r="6" fill="#FF6D00" />
                <circle cx="370" cy="80" r="14" stroke="#FF6D00" strokeWidth="1.5" opacity="0.5" className="animate-ping" />
              </svg>

              {/* Bottom Caption inside visual */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#05070B]/80 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-mono text-[#FF6D00] uppercase font-bold tracking-wider">
                  GROWTH BLUEPRINT
                </div>
                <div className="text-sm font-bold uppercase text-white tracking-wide mt-0.5">
                  {currentItem.name}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══════════ FAR-RIGHT: Interactive Service Index (3 cols) ══════════ */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6 shadow-2xl space-y-2"
            >
              <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
                <span>SERVICE INDEX</span>
                <span className="text-[#FF6D00]">06 MODULES</span>
              </div>

              {SERVICE_INDEX.map((item, idx) => {
                const isActive = activeIndex === idx

                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => navigate(item.route)}
                    className={`group relative p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-white/10 border-[#FF6D00] shadow-[0_0_15px_rgba(255,109,0,0.25)] scale-[1.02]'
                        : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive ? 'text-[#FF6D00]' : 'text-white/30 group-hover:text-white/60'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors ${
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 text-[#FF6D00] transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0 -translate-x-1'
                      }`}
                    />
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
