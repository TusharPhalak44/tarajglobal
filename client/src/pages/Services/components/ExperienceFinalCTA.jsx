import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'

export default function ExperienceFinalCTA() {
  const navigate = useNavigate()
  const boundingRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(e) {
    if (!boundingRef.current) return
    const rect = boundingRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const radialGradient = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255, 109, 0, 0.15), transparent 80%)`

  return (
    <section
      id="final-cta-section"
      className="relative py-28 lg:py-36 bg-[#05070B] text-white overflow-hidden"
    >
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FF6D00]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div
          ref={boundingRef}
          onMouseMove={handleMouseMove}
          className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl text-center group"
        >
          {/* Dynamic cursor reactive background highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: radialGradient }}
          />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono font-bold uppercase tracking-widest text-[#FF6D00] mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ACCELERATE YOUR PIPELINE</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Ready to Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#FF6D00]">
              Next Growth Engine?
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Whether you need to scale lead volume, penetrate enterprise accounts, or fill sales calendars, TaRaj Global delivers qualified, contract-backed outcomes.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <StarButton onClick={() => navigate('/contact')}>
              Start a Conversation
            </StarButton>

            <button
              onClick={() => navigate('/case-studies')}
              className="px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all hover:border-[#FF6D00]/60 cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>View Case Studies</span>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6D00]" />
              <span>100% REPLACEMENT SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6D00]" />
              <span>GDPR & CAN-SPAM COMPLIANT</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6D00]" />
              <span>DEDICATED CAMPAIGN SDRS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
