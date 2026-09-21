import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react'

const PILLARS_LIST = [
  'More Leads',
  'Better Data',
  'Real Conversations',
  'Stronger Pipeline',
]

export default function BlueprintFinalCTA() {
  const navigate = useNavigate()

  return (
    <section
      id="final-cta-section"
      className="relative py-28 lg:py-36 bg-[#05070B] text-white overflow-hidden"
    >
      {/* Cinematic Background Artwork with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('/careers-hero-team.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/90 to-[#05070B]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ══════════ LEFT: Headline & CTA (7 cols) ══════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF6D00] w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S GROW TOGETHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08] text-white">
              Ready to Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
                Next Growth Engine?
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed font-normal max-w-xl">
              Let's turn the right data, accounts and conversations into measurable pipeline growth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF6D00] hover:bg-[#FF8A00] text-black text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#FF6D00]/25 cursor-pointer group"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ══════════ RIGHT: Circular Animated Graphic & 4 Bullets (5 cols) ══════════ */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-8 sm:gap-12">
            {/* Circular Rotating CTA Graphic */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-[#FF6D00]/40 flex items-center justify-center p-2 group cursor-pointer" onClick={() => navigate('/contact')}>
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-[#FF6D00]/20 animate-ping" />

              {/* Rotating SVG text: "YOUR GROWTH • OUR MISSION • " */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="w-full h-full"
                viewBox="0 0 160 160"
              >
                <path
                  id="circlePath"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="none"
                />
                <text fill="#ffffff" fontSize="10" fontWeight="bold" letterSpacing="2.5">
                  <textPath href="#circlePath" startOffset="0%">
                    YOUR GROWTH • OUR MISSION •
                  </textPath>
                </text>
              </motion.svg>

              {/* Center orange arrow / play indicator */}
              <div className="absolute w-14 h-14 rounded-full bg-[#FF6D00] flex items-center justify-center shadow-lg shadow-[#FF6D00]/40 group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-black fill-black ml-0.5" />
              </div>
            </div>

            {/* 4 Bullet Pillars Beside Circular Graphic */}
            <div className="space-y-3 font-mono">
              {PILLARS_LIST.map((pillar) => (
                <div key={pillar} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6D00] shrink-0" />
                  <span className="text-sm font-bold uppercase tracking-wider text-white/90">
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
