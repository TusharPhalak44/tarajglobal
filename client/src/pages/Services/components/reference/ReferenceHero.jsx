import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const SERVICE_INDEX = [
  { num: '01', name: 'Lead Generation', route: '/sql-services', img: '/sql-lead-qualification-journey.jpg' },
  { num: '02', name: 'Demand Generation', route: '/demand-generation', img: '/demandflow-campaigns.png' },
  { num: '03', name: 'Account-Based Marketing', route: '/abm', img: '/enterprise-audience.jpg' },
  { num: '04', name: 'Email Marketing', route: '/b2b-email-marketing', img: '/demandflow-qualification.png' },
  { num: '05', name: 'Appointment Setting', route: '/b2b-appointment-setting', img: '/b2b-appointment-setting-journey.jpg' },
  { num: '06', name: 'Data Solutions', route: '/b2b-list-building', img: '/careers-hero-team.jpg' },
]

export default function ReferenceHero() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToCoreServices = () => {
    const el = document.getElementById('core-services-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const currentItem = SERVICE_INDEX[activeIndex]

  return (
    <section
      id="reference-hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#05070B] text-slate-900 dark:text-white overflow-hidden border-b border-slate-200 dark:border-white/10 select-none transition-colors duration-300"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-[#FF6D00]/10 dark:bg-[#FF6D00]/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ══════════ LEFT COLUMN: Copy & CTAs (5 cols) ══════════ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow: — OUR SERVICES */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-4 h-[2px] bg-[#FF6D00]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#FF6D00]">
                OUR SERVICES
              </span>
            </motion.div>

            {/* Main H1: Strategic B2B Services for Sustainable Growth */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white"
            >
              Strategic B2B Services <br />
              for <span className="text-[#FF6D00]">Sustainable Growth</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-slate-600 dark:text-white/70 leading-relaxed font-normal max-w-lg"
            >
              We help businesses find the right accounts, engage the right people and create real opportunities. Our data-driven B2B services are designed to build a stronger pipeline and fuel long-term growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5"
            >
              {/* Primary Orange Pill Button */}
              <button
                type="button"
                onClick={scrollToCoreServices}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] rounded-full bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#FF6D00]/25 cursor-pointer group w-full sm:w-auto"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button with Circular Arrow */}
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center sm:justify-start gap-2.5 min-h-[44px] text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-white/80 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:border-[#FF6D00] group-hover:bg-[#FF6D00]/10 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 dark:text-white/70 group-hover:text-[#FF6D00] group-hover:translate-x-0.5 transition-all" />
                </div>
                <span>Talk to Our Experts</span>
              </button>
            </motion.div>
          </div>

          {/* ══════════ MIDDLE COLUMN: B2B Growth Visual with Orange Glowing Curve (4 cols) ══════════ */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/5] max-w-[380px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 shadow-2xl shadow-slate-300/60 dark:shadow-black/80"
            >
              {/* Background Business Photo */}
              <motion.div
                key={currentItem.img}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentItem.img})` }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent" />

              {/* Floating Top-Left Tag in Visual */}
              <div className="absolute top-5 left-5 text-xs font-mono font-bold text-white/90 leading-tight">
                <div>More Leads</div>
                <div>More Meetings</div>
                <div>More Revenue</div>
              </div>

              {/* Dynamic Luminous Orange Upward Growth Line */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 380 475"
                fill="none"
              >
                <defs>
                  <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.1" />
                    <stop offset="60%" stopColor="#FF6D00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF8A00" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M 40 420 C 130 380, 200 280, 260 200 S 320 100, 350 70"
                  stroke="url(#growthGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <circle cx="350" cy="70" r="7" fill="#FF8A00" filter="url(#glow)" />
                <circle cx="350" cy="70" r="16" stroke="#FF6D00" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
              </svg>
            </motion.div>
          </div>

          {/* ══════════ RIGHT COLUMN: Interactive Service Index (3 cols) ══════════ */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-2"
            >
              {SERVICE_INDEX.map((item, idx) => {
                const isActive = activeIndex === idx

                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => navigate(item.route)}
                    className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                      isActive
                        ? 'border-[#FF6D00] bg-orange-50/70 dark:bg-white/[0.04] shadow-[0_4px_20px_rgba(255,109,0,0.18)] dark:shadow-[0_0_20px_rgba(255,109,0,0.25)]'
                        : 'border-slate-200/80 dark:border-white/5 bg-white/80 dark:bg-transparent hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/[0.02] shadow-sm dark:shadow-none'
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#FF6D00] text-black font-black'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white/70'
                      }`}
                    >
                      {item.num}
                    </div>

                    {/* Service Name */}
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                        isActive ? 'text-slate-950 dark:text-white font-black' : 'text-slate-600 dark:text-white/60 group-hover:text-slate-950 dark:group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
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
