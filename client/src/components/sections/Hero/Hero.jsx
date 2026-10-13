import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Target,
  Database,
  Filter,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle2,
  Zap
} from 'lucide-react'
import { FlowButton } from '@components/ui/FlowButton'
import { useReducedMotion } from '@hooks/useReducedMotion'

const PROOF = [
  { value: '2,100+', label: 'campaigns delivered' },
  { value: '1,500+', label: 'qualified leads every month' },
  { value: '99.8%', label: 'data accuracy SLA' },
]

// Taraj Global Unique Differentiators (USPs)
const UNIQUES = [
  {
    id: 'reach',
    short: 'ICP Precision',
    badge: '100% In-Market',
    title: 'Tier-1 ICP Calibration',
    desc: 'Target buying committees with verified buying authority. Zero budget wasted on non-ICP accounts.',
    stat: '+42% Precision',
    icon: Target,
    link: '/abm',
    linkText: 'Explore ABM',
  },
  {
    id: 'data',
    short: 'Data Integrity',
    badge: '99.8% SLA',
    title: 'Human-Verified B2B Data',
    desc: 'Bespoke phone & email verification backing every record. Guaranteed zero contact decay.',
    stat: '< 1.2% Bounce',
    icon: ShieldCheck,
    link: '/b2b-list-building',
    linkText: 'Data Solutions',
  },
  {
    id: 'convert',
    short: 'BANT Qualification',
    badge: 'Sales-Ready',
    title: 'Intent & BANT Scoring',
    desc: 'Rigorously validated for Budget, Authority, Need, and Timeline before sales handoff.',
    stat: '3.4x Pipeline Lift',
    icon: Filter,
    link: '/bant-lead-generation',
    linkText: 'BANT Engine',
  },
  {
    id: 'meetings',
    short: 'Meeting Velocity',
    badge: 'Direct to Calendar',
    title: 'C-Suite Discovery Calls',
    desc: 'High-intent sales appointments booked straight into Account Executive calendars.',
    stat: '86% Show-Up Rate',
    icon: CalendarCheck,
    link: '/b2b-appointment-setting',
    linkText: 'Appointment Setting',
  },
]

export const Hero = ({ goals = [], activeGoal, onSelectGoal }) => {
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [activeUniqueId, setActiveUniqueId] = useState(activeGoal?.id || 'reach')
  const [isHovered, setIsHovered] = useState(false)

  // Sync active unique with activeGoal from parent if provided
  useEffect(() => {
    if (activeGoal?.id) {
      setActiveUniqueId(activeGoal.id)
    }
  }, [activeGoal])

  // Handle Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  // Handle Mute / Unmute toggle
  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleSelectUnique = (id) => {
    setActiveUniqueId(id)
    if (onSelectGoal) {
      onSelectGoal(id)
    }
  }

  const activeUnique = UNIQUES.find((u) => u.id === activeUniqueId) || UNIQUES[0]
  const ActiveIcon = activeUnique.icon

  return (
    <section
      id="start"
      className="relative overflow-hidden bg-background pt-28 sm:pt-36 pb-14 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      {/* ── Ambient Background Lighting ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#00A6FF]/10 blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#FF6D00]/[0.07] blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1360px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        
        {/* ══ Left Editorial Block (Span 7) ════════════════════════════════ */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-semibold text-text-secondary backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>B2B demand generation for SaaS &amp; enterprise technology</span>
          </div>

          <h1
            id="hero-heading"
            className="text-[38px] sm:text-[52px] xl:text-[62px] font-black leading-[1.04] tracking-[-0.035em] text-text-primary"
          >
            Qualified B2B leads that turn into{' '}
            <span className="relative whitespace-nowrap text-primary">
              sales meetings
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-[0.18em] w-full text-cta"
              >
                <path d="M2 9 C 80 2, 220 2, 298 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-[580px] text-base sm:text-lg leading-relaxed text-text-secondary font-normal">
            We find the decision-makers who fit your ideal customer profile, start the conversation, and hand your
            sales team only the buyers who are ready to talk.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <FlowButton text="Book a pipeline review" variant="primary" className="w-full sm:w-auto min-h-[48px] justify-center text-[15px]" />
            </Link>
            <a
              href="#journey"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 px-5 text-[15px] font-semibold text-text-primary hover:text-primary transition-colors"
            >
              See how it works <ArrowDown size={16} />
            </a>
          </div>

          {/* SLA & Proof Metrics */}
          <dl className="mt-10 grid max-w-[580px] grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {PROOF.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary">{item.value}</dd>
                <dd className="mt-1 text-[13px] leading-snug text-text-secondary">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ══ Right Visual Block: Cinematic Video & Unique Differentiators (Span 5) ═ */}
        <div
          className="lg:col-span-5 relative flex flex-col justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient Multi-Layer Aura Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[36px] bg-gradient-to-r from-[#00A6FF]/25 via-[#FF6D00]/15 to-[#00A6FF]/25 blur-3xl opacity-80 transition-opacity duration-500"
          />

          {/* ── Top-Right Floating Unique Badge ── */}
          <motion.div
            animate={reducedMotion ? {} : { y: [-4, 4, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-2 sm:-right-4 z-20 pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#091122]/95 px-3.5 py-2.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.55)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00A6FF]/20 border border-[#00A6FF]/40 text-[#00A6FF]">
                <Target size={16} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] font-bold text-white leading-none">100% In-Market ICP</span>
                  <span className="font-mono text-[9.5px] font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    +42% Lift
                  </span>
                </div>
                <p className="mt-0.5 text-[10.5px] text-slate-400 leading-tight">Human-Vetted Decision Makers</p>
              </div>
            </div>
          </motion.div>

          {/* ── Mid-Left Floating Unique Badge ── */}
          <motion.div
            animate={reducedMotion ? {} : { y: [4, -4, 4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-28 sm:top-32 -left-3 sm:-left-6 z-20 pointer-events-auto"
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#0D1424]/95 px-3.5 py-2.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.55)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FF6D00]/20 border border-[#FF6D00]/40 text-[#FF6D00]">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] font-bold text-white leading-none">99.8% Accuracy SLA</span>
                  <span className="font-mono text-[9.5px] font-semibold text-amber-400 bg-amber-500/15 px-1.5 py-0.5 rounded border border-amber-500/30">
                    Guaranteed
                  </span>
                </div>
                <p className="mt-0.5 text-[10.5px] text-slate-400 leading-tight">Zero Lead Decay Protocol</p>
              </div>
            </div>
          </motion.div>

          {/* ── Main High-Tech Container ── */}
          <div className="relative rounded-[28px] bg-gradient-to-br from-[#00A6FF]/60 via-white/10 to-[#FF6D00]/50 p-[1.5px] shadow-[0_25px_70px_-20px_rgba(0,166,255,0.4)]">
            <div className="rounded-[26.5px] bg-gradient-to-b from-[#090E1B]/95 via-[#060A14]/98 to-[#04060E] overflow-hidden backdrop-blur-2xl border border-white/[0.04]">
              
              {/* ── Video Telemetry Control Bar ── */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Live Pipeline Engine
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-[#00A6FF]/60 hover:bg-[#00A6FF]/15 transition-colors"
                  >
                    {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  </button>

                  {/* Audio Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                      !isMuted
                        ? 'border-[#00A6FF] bg-[#00A6FF]/20 text-[#00A6FF]'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {!isMuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                </div>
              </div>

              {/* ── Cinematic Video Frame ── */}
              <div className="relative w-full aspect-[16/10] bg-black/60 overflow-hidden group">
                <video
                  ref={videoRef}
                  src="/video.mp4"
                  loop
                  muted={isMuted}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover block"
                />

                {/* Bottom Cinematic Gradient to blend smoothly into differentiators */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060A14] via-[#060A14]/70 to-transparent"
                />

                {/* Subtle Floating Pipeline Velocity Pill over video */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-md">
                  <Zap size={11} className="text-[#00A6FF]" />
                  <span className="font-mono text-[10.5px] font-semibold text-white">
                    3.4x Pipeline Acceleration
                  </span>
                </div>
              </div>

              {/* ── Taraj Global Unique Differentiators (The "Uniques") Dock ── */}
              <div className="p-4 sm:p-5 pt-3">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Taraj Global Bespoke Uniques
                  </span>
                  <span className="font-mono text-[10.5px] font-semibold text-[#00A6FF]">
                    {activeUnique.badge}
                  </span>
                </div>

                {/* 4 Core Unique Selector Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {UNIQUES.map((item) => {
                    const isSelected = activeUniqueId === item.id
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectUnique(item.id)}
                        className={`group relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[#00A6FF] bg-gradient-to-r from-[#00A6FF]/20 via-[#00A6FF]/10 to-transparent text-white shadow-[0_0_20px_rgba(0,166,255,0.25)] ring-1 ring-[#00A6FF]'
                            : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            isSelected
                              ? 'border-[#00A6FF] bg-[#00A6FF]/20 text-[#00A6FF]'
                              : 'border-white/10 bg-white/5 text-slate-400 group-hover:text-white'
                          }`}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-bold leading-tight truncate">
                            {item.short}
                          </div>
                          <div className="text-[10px] text-text-muted truncate mt-0.5">
                            {item.stat}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Active Unique Differentiator Highlight Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeUnique.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-[#00A6FF] shrink-0" />
                          <span className="text-[12.5px] font-bold text-white truncate">
                            {activeUnique.title}
                          </span>
                        </div>
                        <p className="mt-1 text-[11.5px] text-slate-400 leading-snug line-clamp-2">
                          {activeUnique.desc}
                        </p>
                      </div>

                      <Link
                        to={activeUnique.link}
                        className="group/link shrink-0 inline-flex items-center gap-1 rounded-lg border border-[#00A6FF]/30 bg-[#00A6FF]/10 px-2.5 py-1 text-[11px] font-semibold text-[#38BDF8] hover:border-[#00A6FF] hover:bg-[#00A6FF]/25 hover:text-white transition-all shadow-sm"
                      >
                        <span>{activeUnique.linkText}</span>
                        <ArrowUpRight size={11} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
