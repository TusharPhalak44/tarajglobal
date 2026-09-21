import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, TrendingUp, Database, MessageSquare, Target } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'

const BULLETS = [
  { text: 'More Leads', icon: TrendingUp },
  { text: 'Better Data', icon: Database },
  { text: 'Real Conversations', icon: MessageSquare },
  { text: 'Stronger Pipeline', icon: Target },
]

export default function ReferenceFinalCTA() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="final-cta-section"
      className="relative py-28 lg:py-36 bg-slate-100 dark:bg-[#05070B] text-slate-900 dark:text-white overflow-hidden select-none transition-colors duration-300 border-t border-slate-200 dark:border-white/10"
    >
      {/* Background Team Photo - clearly darker and richer in light theme */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-30 brightness-[0.80] contrast-110 dark:brightness-100 dark:contrast-100 mix-blend-multiply dark:mix-blend-normal transition-all duration-300"
        style={{ backgroundImage: `url('/careers-hero-team.jpg')` }}
      />

      {/* Subtle dark tint in light theme to ensure the image appears darker */}
      <div className="absolute inset-0 bg-slate-950/20 dark:bg-transparent pointer-events-none transition-colors duration-300" />

      {/* Horizontal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/85 via-slate-100/65 to-slate-100/35 dark:from-[#05070B] dark:via-[#05070B]/85 dark:to-[#05070B]/70 transition-colors duration-300" />

      {/* Vertical Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-slate-100/80 dark:from-[#05070B] dark:via-transparent dark:to-[#05070B] transition-colors duration-300" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ══════════ LEFT COLUMN: Heading, Paragraph & Orange Pill Button (7 cols) ══════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#FF6D00]" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF6D00]">
                LET'S GROW TOGETHER
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-950 dark:text-white">
              Ready to Build Your <br />
              Next Growth Engine?
            </h2>

            <p className="mt-6 text-sm sm:text-base text-slate-700 dark:text-white/75 leading-relaxed font-normal max-w-xl">
              Get in touch with our team and discover how our B2B services can help you generate more leads, reach the right accounts and create real business opportunities.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#FF6D00]/30 cursor-pointer group"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ══════════ RIGHT COLUMN: Circular Graphic & 4 Bullets (5 cols) ══════════ */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 sm:gap-12">
            {/* Circular "Your Growth / Our Mission" Graphic */}
            <div
              onClick={() => navigate('/contact')}
              className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#FF6D00]/50 bg-white/80 dark:bg-black/40 backdrop-blur-sm shadow-lg shadow-slate-300/40 dark:shadow-none flex items-center justify-center cursor-pointer group"
            >
              {/* Outer faint arc */}
              <div className="absolute -inset-2.5 rounded-full border border-[#FF6D00]/30 border-dashed animate-[spin_20s_linear_infinite]" />

              <div className="flex flex-col items-center text-center">
                <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Your Growth
                </div>
                <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#FF6D00]">
                  Our Mission
                </div>

                {/* Orange Circular Play / Arrow Button */}
                <div className="mt-2 w-7 h-7 rounded-full bg-[#FF6D00] flex items-center justify-center text-black shadow-md shadow-[#FF6D00]/50 group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                </div>
              </div>
            </div>

            {/* 4 Vertical Bullet Points with Icons */}
            <div className="space-y-4">
              {BULLETS.map((bullet) => {
                const Icon = bullet.icon

                return (
                  <div key={bullet.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 flex items-center justify-center text-[#FF6D00] shadow-sm dark:shadow-none">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white/90 tracking-wide">
                      {bullet.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
