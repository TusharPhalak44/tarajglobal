import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { gsap, ScrollTrigger, refreshScrollTrigger } from '@animations/gsap'
import {
  Users,
  Target,
  Zap,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Plus,
  Award,
  Database,
  BarChart3,
  Building2,
  CalendarCheck,
  Star,
  Layers,
  ArrowUpRight,
  Eye,
  Flag,
  Clock,
  MapPin,
  Phone,
  Mail,
  Cpu,
  Activity,
  Radio,
  Compass,
  Check,
  ChevronRight,
  ChevronLeft,
  Crosshair,
  Share2,
  Search,
  Send,
  RotateCcw
} from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { StarButton } from '@components/ui/StarButton'
import { GrowthArchitectureFunnel } from './GrowthArchitectureFunnel'


const DNA_NODES = [
  {
    step: '01',
    label: 'DATA',
    desc: 'Verified intelligence'
  },
  {
    step: '02',
    label: 'PEOPLE',
    desc: 'Decision-makers'
  },
  {
    step: '03',
    label: 'PRECISION',
    desc: 'Targeted engagement'
  },
  {
    step: '04',
    label: 'GROWTH',
    desc: 'Measurable impact'
  }
]

const GROWTH_INTELLIGENCE_PRINCIPLES = [
  {
    num: '01',
    id: 'node-01',
    title: 'Proprietary Verification Tooling',
    shortTitle: 'Proprietary Verification',
    category: 'DATA HYGIENE',
    color: '#00A6FF',
    accentGrad: 'from-[#00A6FF] to-[#00E5FF]',
    icon: ShieldCheck,
    desc: 'We developed and maintained our own internal validation software. Every prospect email and direct-dial contact passes through automated deliverability checks post-research to enforce our 99.8% SLA.',
    badge: '99.8% Accuracy Standard',
  },
  {
    num: '02',
    id: 'node-02',
    title: 'Closed-Loop CRM Delivery',
    shortTitle: 'CRM Delivery',
    category: 'INTEGRATION',
    color: '#FF6D00',
    accentGrad: 'from-[#FF6D00] to-[#FFA600]',
    icon: Database,
    desc: 'Eliminating handoff friction. Every qualified opportunity flows through our native CRM delivery system, seamlessly syncing into client tech stacks (Salesforce, HubSpot, custom APIs).',
    badge: 'Direct Tech Stack Sync',
  },
  {
    num: '03',
    id: 'node-03',
    title: 'Live Client Portal Transparency',
    shortTitle: 'Client Portal Transparency',
    category: 'TRANSPARENCY',
    color: '#72D669',
    accentGrad: 'from-[#72D669] to-[#00E5FF]',
    icon: Activity,
    desc: 'True operational visibility. Clients access a dedicated portal to view campaign telemetry, receive real-time lead alerts, and track SLA delivery in real time.',
    badge: '24/7 Client Visibility',
  },
  {
    num: '04',
    id: 'node-04',
    title: 'Cross-Border Compliance Architecture',
    shortTitle: 'Cross-Border Compliance',
    category: 'COMPLIANCE',
    color: '#00E5FF',
    accentGrad: 'from-[#00E5FF] to-[#00A6FF]',
    icon: Globe2,
    desc: 'Built for global expansion. Our data research operations adhere to strict regional compliance standards, including GDPR (EMEA) and CCPA (North America).',
    badge: 'GDPR & CCPA Enforced',
  },
]

const B2B_GROWTH_ENGINE_CAPABILITIES = [
  {
    id: 'lead-gen',
    number: '01',
    title: 'Precision Lead Generation & Data Verification',
    category: 'DATA & TARGETING',
    description: 'Identify and engage decision-makers across target accounts. Every prospect record is processed through our custom post-research verification tool—validating active email deliverability and direct-dial phones to enforce a strict 99.8% SLA with zero duplicate contacts.',
    metricType: 'accuracy',
    color: '#00A6FF',
    accentGrad: 'from-[#00A6FF] to-[#00E5FF]',
    glowColor: 'rgba(0,166,255,0.35)',
    iconType: 'crosshair',
    position: 'top',
  },
  {
    id: 'abm-accel',
    number: '02',
    title: 'Account-Based Marketing (ABM) & Velocity',
    category: 'MULTI-TOUCH ENGAGEMENT',
    description: 'Orchestrate multi-touch ABM cadences across active buying committees. Powered by live intent telemetry, we engage high-value accounts through personalized email, content syndication, and multi-channel outreach when they enter an active buying cycle.',
    metric: 'Multi-Touch Velocity',
    metricType: 'velocity',
    color: '#FF6D00',
    accentGrad: 'from-[#FF6D00] to-[#FFA600]',
    glowColor: 'rgba(255,109,0,0.35)',
    iconType: 'network',
    position: 'right',
  },
  {
    id: 'research-intel',
    number: '03',
    title: 'Org-Chart Intelligence & Intent Telemetry',
    category: 'ACCOUNT INTELLIGENCE',
    description: 'Map complex enterprise buying structures before launching outreach. Our research team combines intent signal telemetry with deep org-chart analysis to isolate true economic buyers, budget owners, and technical evaluators.',
    color: '#72D669',
    accentGrad: 'from-[#72D669] to-[#00E5FF]',
    glowColor: 'rgba(114,214,105,0.35)',
    iconType: 'radar',
    position: 'left',
  },
  {
    id: 'outbound-conv',
    number: '04',
    title: 'Executive Appointment Setting & CRM Routing', category: 'PIPELINE CONVERSION',
    description: ' Convert qualified decision-makers into confirmed discovery calls directly on your sales calendars. Opportunities are scored against strict BANT parameters and routed automatically into your CRM pipeline alongside full account dossiers.',
    color: '#00E5FF',
    accentGrad: 'from-[#00E5FF] to-[#00A6FF]',
    glowColor: 'rgba(0,229,255,0.35)',
    iconType: 'trajectory',
    position: 'bottom',
  },
]

export const AboutCompany = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const [activeNode, setActiveNode] = useState(0)
  const [counters, setCounters] = useState({ clients: 0, retention: 0, leads: 0, team: 0 })
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-50px' })

  // Heritage Section InView Ref
  const heritageRef = useRef(null)
  const isHeritageInView = useInView(heritageRef, { once: true, margin: '-60px' })

  // 3D Perspective Parallax Tracking for DNA Section
  const dnaCardRef = useRef(null)
  const dnaMouseX = useMotionValue(0)
  const dnaMouseY = useMotionValue(0)
  const springConf = { damping: 22, stiffness: 110 }
  const dnaRotateX = useSpring(useTransform(dnaMouseY, [-0.5, 0.5], [10, -10]), springConf)
  const dnaRotateY = useSpring(useTransform(dnaMouseX, [-0.5, 0.5], [-12, 12]), springConf)

  const handleDnaMouseMove = (e) => {
    if (prefersReducedMotion || !dnaCardRef.current) return
    const rect = dnaCardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    dnaMouseX.set(x)
    dnaMouseY.set(y)
  }

  const handleDnaMouseLeave = () => {
    dnaMouseX.set(0)
    dnaMouseY.set(0)
  }

  // Live Time Clocks for Global Hubs
  const [istTime, setIstTime] = useState('')
  const [pstTime, setPstTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setIstTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
      setPstTime(now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // DNA Signal Pulse Loop (Flow: DATA -> PEOPLE -> PRECISION -> GROWTH)
  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4)
    }, 1200)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  const scrollToStory = () => {
    const el = document.getElementById('our-story')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }


  // Section 03: "FOUNDATIONAL VALUES" (Mission, Vision & Operating Principles)
  const intelligenceSectionRef = useRef(null)
  const isIntelligenceInView = useInView(intelligenceSectionRef, { once: true, margin: '-60px' })
  const [activeSubsection, setActiveSubsection] = useState(0)
  const [isSubsectionHovered, setIsSubsectionHovered] = useState(false)

  // Section 03 Automatic Accordion Rotation (Cycles every 3.2s when in view, pauses on hover)
  useEffect(() => {
    if (prefersReducedMotion || !isIntelligenceInView || isSubsectionHovered) return

    const interval = setInterval(() => {
      setActiveSubsection((prev) => (prev + 1) % GROWTH_INTELLIGENCE_PRINCIPLES.length)
    }, 3200)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, isIntelligenceInView, isSubsectionHovered])

  // Section 04: "THE B2B GROWTH ENGINE" (Full-Funnel Capabilities) State
  const capabilitiesSectionRef = useRef(null)
  const isCapabilitiesInView = useInView(capabilitiesSectionRef, { once: true, margin: '-60px' })
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0)
  const [hoveredCapabilityIndex, setHoveredCapabilityIndex] = useState(null)
  const [hasCapabilitiesUserInteracted, setHasCapabilitiesUserInteracted] = useState(false)
  const [capabilitiesCoreReactionKey, setCapabilitiesCoreReactionKey] = useState(0)

  const triggerCapabilitiesCoreReaction = () => {
    setCapabilitiesCoreReactionKey((prev) => prev + 1)
  }

  // Auto-activation cycling: 01 -> 02 -> 03 -> 04 every 2.8s when in view, until user interacts
  useEffect(() => {
    if (prefersReducedMotion || !isCapabilitiesInView || hasCapabilitiesUserInteracted) return
    // On mobile devices, avoid automatic cycling that can cause repaints while scrolling
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const interval = setInterval(() => {
      setActiveCapabilityIndex((prev) => (prev + 1) % 4)
      triggerCapabilitiesCoreReaction()
    }, 2800)

    return () => clearInterval(interval)
  }, [isCapabilitiesInView, hasCapabilitiesUserInteracted, prefersReducedMotion])

  const handleSelectCapability = (idx) => {
    if (!hasCapabilitiesUserInteracted) setHasCapabilitiesUserInteracted(true)
    setActiveCapabilityIndex(idx)
    triggerCapabilitiesCoreReaction()
  }

  // Section 04 Parallax Transforms
  const { scrollYProgress: capScrollProgress } = useScroll({
    target: capabilitiesSectionRef,
    offset: ['start end', 'end start'],
  })
  const capBgY = useTransform(capScrollProgress, [0, 1], [-18, 18])
  const capCoreY = useTransform(capScrollProgress, [0, 1], [6, -6])
  const capNodesY = useTransform(capScrollProgress, [0, 1], [3, -3])

  return (
    <div className="relative overflow-hidden bg-background text-text-primary transition-colors duration-500">

      {/* ── HIGH-TECH AMBIENT NEURAL LIGHTING ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft Radial Gradient Blobs */}
        <div className="absolute -top-40 left-1/4 w-[750px] h-[600px] rounded-full bg-primary/35 dark:bg-primary/15 dark:bg-[#00A6FF]/12 blur-[160px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-20 w-[650px] h-[550px] rounded-full bg-cta/35 dark:bg-cta/15 dark:bg-[#FF6D00]/12 blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-2/3 -left-20 w-[650px] h-[550px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[170px]" />

        {/* Subtle Cybernetic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,150,200,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,150,200,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── SECTION 01: HERO — THE TARAJ GLOBAL DNA ──────────────────── */}
      <section className="relative pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14 overflow-hidden">
        <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          {/* Eyebrow with Beacon Animation */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4 sm:mb-6"
          >
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              THE TECHNOLOGY & TEAM BEHIND TARAJ GLOBAL
            </span>
          </motion.div>

          {/* Master Editorial Statement with Attractive Gradients & Ambient Glow */}
          <div className="mb-4 sm:mb-6 max-w-5xl mx-auto relative">
            {/* Ambient soft glow aura behind the headline */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[550px] h-[200px] rounded-full bg-[#00A6FF]/12 blur-[100px] pointer-events-none -z-10" />

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.12,
                  },
                },
              }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text-primary leading-[1.12]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block sm:whitespace-nowrap text-text-primary dark:text-white"
              >
                Engineered B2B
              </motion.span>

              <motion.span
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block sm:whitespace-nowrap mt-1 sm:mt-1.5"
              >
                <span className="inline-block bg-gradient-to-r from-[#00A6FF] via-[#00D2FF] to-[#38BDF8] bg-clip-text text-transparent">
                  In-House Innovation
                </span>
              </motion.span>
            </motion.h1>
          </div>

          {/* Compact Editorial Narrative */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto mb-5 sm:mb-6"
          >
            Founded to replace broken, unverified lead generation with accountable growth architecture. Operating from San Francisco and Pune, our revenue engineers combine custom verification tooling with transparent client portal access to power global enterprise pipelines.
          </motion.p>

          {/* Animated Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.28 }}
            className="flex items-center justify-center mb-7 sm:mb-9"
          >
            <motion.button
              onClick={scrollToStory}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-slate-200 dark:bg-white/10 transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(0,166,255,0.45)] cursor-pointer"
            >
              {/* Rotating Continuous Border Glow Beam */}
              {!prefersReducedMotion && (
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00A6FF_0%,transparent_40%,transparent_60%,#00A6FF_100%)] pointer-events-none" />
              )}

              {/* Button Inner Body with Opaque Background */}
              <span className="relative inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white dark:bg-[#070B16] text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-colors duration-200">
                <span>Explore Our Operations</span>
                <ArrowRight
                  size={15}
                  className="text-[#00A6FF] transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </span>
            </motion.button>
          </motion.div>

          {/* ══ THE TARAJ GLOBAL DNA VISUAL (3D SPATIAL TELEMETRY MATRIX) ═════ */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Center Minimal Brand Marker */}
            <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6 text-center">
              <span className="h-[1px] w-8 sm:w-12 bg-border/60 dark:bg-white/10" />
              <span className="text-sm sm:text-sm font-mono tracking-[0.25em] uppercase text-text-muted">
                TARAJ GLOBAL SOLUTIONS &bull; EST. B2B GROWTH SYSTEM
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-border/60 dark:bg-white/10" />
            </div>

            {/* Desktop / Tablet: 3D Perspective Matrix with 3D Gyroscopic Quantum Satellite */}
            <div
              ref={dnaCardRef}
              onMouseMove={handleDnaMouseMove}
              onMouseLeave={handleDnaMouseLeave}
              className="hidden md:block relative px-2 [perspective:1400px] select-none"
            >
              {/* 3D Motion Canvas */}
              <motion.div
                style={{
                  rotateX: prefersReducedMotion ? 0 : dnaRotateX,
                  rotateY: prefersReducedMotion ? 0 : dnaRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative py-2 transition-transform duration-200 ease-out [transform-style:preserve-3d]"
              >
                {/* 3D Perspective Ground Grid & Ambient Glow Floor (Layer Z: -30px) */}
                <div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/[0.04] via-[#00A6FF]/[0.02] to-transparent pointer-events-none opacity-80 dark:opacity-60 [transform:translateZ(-30px)]"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at 50% 30%, rgba(0, 166, 255, 0.12) 0%, transparent 70%)`,
                  }}
                />

                {/* 3D SVG Dual-Helix Track (Layer Z: 0px) */}
                <div className="relative h-20 w-full mb-2 [transform:translateZ(0px)]">
                  <svg
                    viewBox="0 0 1000 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      {/* High-intensity Glow Filter */}
                      <filter id="quantumCoreGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur2" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur3" />
                        <feMerge>
                          <feMergeNode in="blur3" />
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      {/* Primary Base Line Gradient */}
                      <linearGradient id="dnaPrimaryTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.08" />
                        <stop offset="25%" stopColor="#00E5FF" stopOpacity="0.38" />
                        <stop offset="50%" stopColor="#00A6FF" stopOpacity="0.55" />
                        <stop offset="75%" stopColor="#00E5FF" stopOpacity="0.38" />
                        <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.08" />
                      </linearGradient>

                      {/* Secondary Inverted Helix Strand */}
                      <linearGradient id="dnaSecondaryTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.04" />
                        <stop offset="30%" stopColor="#818CF8" stopOpacity="0.22" />
                        <stop offset="70%" stopColor="#A855F7" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>

                    {/* Secondary Counter DNA Helix Wave */}
                    <path
                      d="M 20 48 C 150 64, 230 24, 375 48 C 470 64, 530 32, 625 48 C 770 64, 850 24, 980 48"
                      stroke="url(#dnaSecondaryTrack)"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Primary DNA Guide Track */}
                    <path
                      id="dnaCurveTrack"
                      d="M 20 36 C 150 18, 230 54, 375 36 C 470 20, 530 50, 625 36 C 770 18, 850 54, 980 36"
                      stroke="url(#dnaPrimaryTrack)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Neural Ladder Intersection Links */}
                    {[125, 250, 375, 500, 625, 750, 875].map((x, i) => (
                      <line
                        key={i}
                        x1={x}
                        y1={26 + Math.sin(i * 1.2) * 6}
                        x2={x}
                        y2={54 - Math.sin(i * 1.2) * 6}
                        stroke="#00A6FF"
                        strokeOpacity="0.14"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                    ))}

                    {/* ══ 3D MOVING GYROSCOPIC SATELLITE (Directly riding ON the curved line) ══ */}
                    {!prefersReducedMotion && (
                      <g>
                        <animateMotion
                          dur="4.8s"
                          repeatCount="indefinite"
                        >
                          <mpath href="#dnaCurveTrack" />
                        </animateMotion>

                        {/* Downward Holographic Scanning Ray following the curve */}
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="34"
                          stroke="#00E5FF"
                          strokeWidth="1.5"
                          strokeOpacity="0.5"
                          strokeDasharray="3 2"
                          filter="url(#quantumCoreGlow)"
                        />

                        {/* 3D Gyro Satellite Body via foreignObject positioned directly on the line */}
                        <foreignObject x="-24" y="-24" width="48" height="48" className="overflow-visible pointer-events-none">
                          <div className="w-full h-full relative flex items-center justify-center [transform-style:preserve-3d]">
                            {/* 3D Gyro Ring X (Rotates on X-Axis in 3D Space) */}
                            <div
                              className="absolute inset-0 rounded-full border-[1.5px] border-[#00E5FF] shadow-[0_0_12px_#00E5FF] animate-spin"
                              style={{
                                transform: 'rotateX(70deg)',
                                animationDuration: '3s',
                              }}
                            />

                            {/* 3D Gyro Ring Y (Rotates on Y-Axis in 3D Space) */}
                            <div
                              className="absolute inset-0 rounded-full border-[1.5px] border-[#00A6FF] shadow-[0_0_12px_#00A6FF] animate-spin"
                              style={{
                                transform: 'rotateY(70deg)',
                                animationDuration: '2.4s',
                                animationDirection: 'reverse',
                              }}
                            />

                            {/* 3D Gyro Ring Z (Diagonal Angle Ring) */}
                            <div
                              className="absolute inset-1 rounded-full border border-border/80 dark:border-white/90 shadow-[0_0_14px_#FFFFFF] animate-spin"
                              style={{
                                transform: 'rotateZ(45deg) rotateX(45deg)',
                                animationDuration: '4s',
                              }}
                            />

                            {/* 3D Floating Diamond Prism Core */}
                            <div className="relative z-10 w-3 h-3 bg-gradient-to-tr from-[#00E5FF] via-white to-[#00A6FF] rotate-45 rounded-xs shadow-[0_0_16px_#00E5FF]" />
                          </div>
                        </foreignObject>
                      </g>
                    )}
                  </svg>
                </div>

                {/* 4 Connected 3D Hologram Node Pedestals (Layer Z: +15px to +45px) */}
                <div className="grid grid-cols-4 gap-4 lg:gap-6 text-center [transform-style:preserve-3d]">
                  {DNA_NODES.map((node, idx) => {
                    const isActive = activeNode === idx
                    return (
                      <motion.div
                        key={node.step}
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.4 + idx * 0.08 }}
                        onClick={() => setActiveNode(idx)}
                        style={{
                          transform: isActive ? 'translateZ(45px)' : 'translateZ(14px)',
                        }}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer [transform-style:preserve-3d] ${isActive
                          ? 'bg-surface/90 dark:bg-[#0E1522]/90 border border-[#00A6FF]/40 shadow-[0_8px_30px_rgba(0,166,255,0.18)]'
                          : 'bg-surface/30 dark:bg-white/[0.02] border border-border/40 dark:border-white/5 hover:bg-surface/70 dark:hover:bg-white/[0.04] hover:border-[#00A6FF]/25 hover:translate-y-[-2px]'
                          }`}
                      >
                        {/* 3D Ground Pedestal Glow Ring */}
                        {isActive && (
                          <div className="absolute -inset-1 rounded-2xl bg-[#00A6FF]/15 blur-[8px] -z-10 pointer-events-none" />
                        )}

                        {/* Active Top Cyber Light Bar */}
                        {isActive && (
                          <div className="absolute -top-[1px] inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_10px_#00E5FF]" />
                        )}

                        {/* Node Indicator Dot with 3D Energy Ripple Bloom */}
                        <div className="flex items-center justify-center mb-2.5 relative">
                          {isActive && !prefersReducedMotion && (
                            <span className="absolute w-5 h-5 rounded-full bg-[#00E5FF]/20 blur-[2px] pointer-events-none" />
                          )}
                          <div
                            className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive
                              ? 'bg-[#00E5FF] shadow-[0_0_16px_#00E5FF] scale-125 ring-2 ring-white/80 dark:ring-white/95'
                              : 'bg-border/80 dark:bg-white/20 group-hover:bg-[#00A6FF]/70'
                              }`}
                          />
                        </div>

                        {/* 3D High-Tech Badge Number */}
                        <div className="flex items-center justify-center mb-1">
                          <span
                            className={`inline-flex items-center font-mono text-sm font-bold px-2 py-0.5 rounded-md transition-all duration-300 ${isActive
                              ? 'bg-[#00A6FF]/15 text-[#00E5FF] border border-[#00A6FF]/35 shadow-[0_0_12px_rgba(0,166,255,0.35)]'
                              : 'text-text-muted group-hover:text-text-secondary'
                              }`}
                          >
                            {node.step}
                          </span>
                        </div>

                        {/* Label */}
                        <h3
                          className={`text-sm lg:text-base font-bold tracking-wider uppercase transition-colors duration-300 mb-1 ${isActive
                            ? 'text-text-primary font-extrabold drop-shadow-xs'
                            : 'text-text-secondary group-hover:text-text-primary'
                            }`}
                        >
                          {node.label}
                        </h3>

                        {/* Short Supporting Text */}
                        <p
                          className={`text-sm text-text-muted transition-colors duration-300 leading-relaxed ${isActive ? 'text-text-secondary' : 'group-hover:text-text-secondary'
                            }`}
                        >
                          {node.desc}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Mobile: Vertical Flowing DNA Path */}
            <div className="md:hidden relative max-w-xs mx-auto text-left pl-8 space-y-5 border-l border-border/70 dark:border-white/10">
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute -left-[1.5px] w-[3px] h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#00A6FF] to-transparent"
                  animate={{
                    top: ['0%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.8,
                    ease: 'linear',
                  }}
                />
              )}

              {DNA_NODES.map((node, idx) => {
                const isActive = activeNode === idx
                return (
                  <div
                    key={node.step}
                    onClick={() => setActiveNode(idx)}
                    className="relative group transition-transform duration-250 hover:-translate-y-[1px] cursor-pointer"
                  >
                    <div
                      className={`absolute -left-[35px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${isActive
                        ? 'bg-[#00A6FF] border-white dark:border-[#0E0E0E] shadow-[0_0_8px_rgba(0,166,255,0.85)]'
                        : 'bg-background border-border dark:border-white/20'
                        }`}
                    />
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span
                        className={`font-mono text-sm font-bold transition-colors duration-300 ${isActive ? 'text-[#00A6FF]' : 'text-text-muted'
                          }`}
                      >
                        {node.step}
                      </span>
                      <h3
                        className={`text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary'
                          }`}
                      >
                        {node.label}
                      </h3>
                    </div>
                    <p className="text-sm text-text-muted leading-tight">{node.desc}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 02: OUR HERITAGE • PRECISION SCALE ──────────────────────── */}
      <section
        id="our-story"
        ref={heritageRef}
        className="relative py-12 sm:py-16 lg:py-20 border-t border-border/60 dark:border-white/10 overflow-hidden"
      >
        {/* Subtle Ambient Technical Grid & Soft Glow */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[450px] rounded-full bg-[#00A6FF]/[0.03] dark:bg-[#00A6FF]/[0.05] blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,150,200,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,150,200,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── DESKTOP SPLIT-SCREEN (50% LEFT / 50% RIGHT) & MOBILE EDITORIAL FLOW ── */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* ── LEFT / STORY COLUMN (6 cols on Desktop) ── */}
            <div className="w-full lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 order-1 lg:order-1">

              {/* Eyebrow & Headline */}
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-text-muted">
                    OUR HERITAGE <span className="text-text-muted/40">•</span> <span className="text-[#00A6FF]">PRECISION SCALE</span>
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-text-primary"
                >
                  Why We Built Our Own B2B{' '}
                  <span className="bg-gradient-to-r from-[#00A6FF] via-[#33B8FF] to-[#00E5FF] bg-clip-text text-transparent">
                    Growth Architecture
                  </span>.
                </motion.h2>
              </div>

              {/* Story Paragraphs - Clean left-aligned modern typography */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 text-base text-text-secondary leading-relaxed max-w-prose"
              >
                <p className="font-semibold text-text-primary">
                  In a market crowded with generic database vendors and outsourced lead aggregators, TaRaj Global was established to restore engineering discipline to outbound revenue generation.
                </p>
                <p>
                  We recognized early that enterprise sales teams don't need vanity lead counts—they need verified, sales-ready decision-makers. By engineering our own post-research verification tool and unifying campaign delivery inside a single CRM infrastructure, we eliminated the risk of zero-deliverability data and duplicate accounts.
                </p>
                <p className="text-sm text-text-muted">
                  Today, enterprise technology firms across North America, Europe, the Middle East, and Asia-Pacific trust our dual-headquarter teams in San Francisco and Pune to execute compliant, high-velocity revenue operations.
                </p>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN: PRECISION FUNNEL (GROWTH ARCHITECTURE) ── */}
            <div className="w-full lg:col-span-6 flex items-center justify-center order-2 lg:order-2 my-2 lg:my-0">
              <GrowthArchitectureFunnel />
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 03: PURPOSE-DRIVEN STRATEGY (MISSION & VISION + EXPANDING SUBSECTION ACCORDION) ── */}
      <section
        id="foundational-values"
        ref={intelligenceSectionRef}
        className="relative py-8 sm:py-10 lg:py-12 border-t border-border/60 dark:border-white/10 overflow-hidden bg-slate-50/50 dark:bg-[#070B14] transition-colors duration-500"
      >
        {/* Subtle Ambient Technical Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[300px] bg-[#00A6FF]/[0.04] dark:bg-[#00A6FF]/[0.07] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[320px] bg-[#03BBD0]/[0.04] dark:bg-[#03BBD0]/[0.07] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,150,200,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,150,200,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── SECTION HEADER (COMPACT) ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#00A6FF] uppercase">
                  Foundational Values
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-text-primary leading-tight">
                Purpose-Driven Strategy.{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#33B8FF] to-[#00E5FF] bg-clip-text text-transparent">
                  Flawless Execution.
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-[13px] text-text-secondary max-w-md md:text-right font-normal leading-relaxed">
              Two foundational strategic pillars powering our global revenue operations, realized across all four core operating principles.
            </p>
          </div>

          {/* ── MISSION & VISION PARENT STRATEGIC PILLARS (TIER 1 - COMPACT) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">

            {/* Mission Pillar Card */}
            <div
              className="rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 backdrop-blur-xl relative overflow-hidden bg-surface/90 dark:bg-[#0B1528] border-[#00A6FF]/40 shadow-[0_8px_25px_rgba(0,166,255,0.1)] ring-1 ring-[#00A6FF]/25"
            >
              <div className="flex items-center justify-between gap-2.5 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-[#00A6FF]/20 text-[#00A6FF] border border-[#00A6FF]/40 shadow-sm shrink-0">
                    <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>

                    <h3 className="text-lg sm:text-[20px] font-bold text-text-primary tracking-tight leading-tight">
                      Our Mission
                    </h3>
                  </div>
                </div>

              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed pl-10 sm:pl-11">
                To equip global B2B SaaS and enterprise tech leaders with accountable, tech-backed growth operations-combining automated contact verification with closed-loop CRM delivery to turn target accounts into measurable business outcomes.
              </p>
            </div>

            {/* Vision Pillar Card (Matching Blue Color Scheme) */}
            <div
              className="rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border transition-all duration-300 backdrop-blur-xl relative overflow-hidden bg-surface/90 dark:bg-[#0B1528] border-[#00A6FF]/40 shadow-[0_8px_25px_rgba(0,166,255,0.1)] ring-1 ring-[#00A6FF]/25"
            >
              <div className="flex items-center justify-between gap-2.5 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-[#00A6FF]/20 text-[#00A6FF] border border-[#00A6FF]/40 shadow-sm shrink-0">
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>

                    <h3 className="text-lg sm:text-[20px] font-bold text-text-primary tracking-tight leading-tight">
                      Our Vision
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed pl-10 sm:pl-11">
                To remain the global gold standard in tech-enabled B2B demand generation, recognized for operating superior verification software, transparent client portals, and zero-bounce execution engines across global markets.
              </p>
            </div>

          </div>

          {/* ── 4 EXPANDING INTERACTIVE SUBSECTION CARDS (ACCORDION ANIMATION - REDUCED HEIGHT) ── */}
          <div
            onMouseEnter={() => setIsSubsectionHovered(true)}
            onMouseLeave={() => setIsSubsectionHovered(false)}
            className="w-full flex flex-col md:flex-row gap-2.5 sm:gap-3 h-auto md:h-[265px] lg:h-[280px]"
          >
            {GROWTH_INTELLIGENCE_PRINCIPLES.map((sub, idx) => {
              const SubIcon = sub.icon
              const isActive = activeSubsection === idx

              return (
                <motion.div
                  key={sub.id}
                  layout
                  transition={{
                    layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  onMouseEnter={() => {
                    setIsSubsectionHovered(true)
                    setActiveSubsection(idx)
                  }}
                  onMouseLeave={() => setIsSubsectionHovered(false)}
                  onClick={() => setActiveSubsection(idx)}
                  style={{
                    flex: isActive ? 3.4 : 0.8,
                  }}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col justify-between select-none ${isActive
                    ? 'bg-gradient-to-br from-[#86D8E4] via-[#48CBDC] to-[#03BBD0] text-[#082F49] border border-[#22D3EE]/50 shadow-[0_14px_35px_rgba(3,187,208,0.25)] ring-1 ring-[#22D3EE]/30'
                    : 'bg-surface/70 dark:bg-white/[0.03] border border-border/80 dark:border-white/10 hover:border-[#03BBD0]/40 hover:bg-surface/90 dark:hover:bg-white/[0.06] cursor-pointer'
                    } p-3.5 sm:p-4.5 min-h-[85px] md:min-h-0`}
                >
                  {/* EXPANDED VIEW */}
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.08 }}
                      className="h-full flex flex-col justify-between relative z-10 w-full"
                    >
                      {/* Giant Faint Watermark Number */}
                      <span className="absolute top-5 right-1 sm:right-2 text-5xl sm:text-6xl lg:text-7xl font-black text-[#03BBD0]/100 pointer-events-none select-none font-mono leading-none">
                        {sub.num}.
                      </span>

                      {/* Top Row: Glass Icon Badge + Parent Relationship Tag */}
                      <div className="flex items-start justify-between gap-2 relative z-10">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0F9EB6] border border-white/40 flex items-center justify-center text-white shadow-sm shrink-0">
                          <SubIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#E4F8F8] border border-white/70 text-[#0E4A59] tracking-wider uppercase shadow-sm">
                          MISSION & VISION • PRINCIPLE {sub.num}
                        </span>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="mt-3 md:mt-auto relative z-10">
                        <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-[#083344] mb-0.5">
                          {sub.num}. {sub.category}
                        </div>
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-[#082F49] tracking-tight leading-snug mb-1">
                          {sub.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#0E384D] font-medium leading-relaxed max-w-xl mb-2 line-clamp-2 sm:line-clamp-3">
                          {sub.desc}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#E4F8F8] border border-white/70 text-[#0E4A59] shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-[#0F9EB6]" />
                          {sub.badge}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* COLLAPSED VIEW */
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex flex-row md:flex-col items-center justify-between w-full"
                    >
                      {/* Faded Top Number */}
                      <span className="text-base sm:text-lg font-mono font-black text-text-muted/40 text-center md:pt-1">
                        {sub.num}.
                      </span>

                      {/* Centered Circular Icon Badge */}
                      <div className="w-8 h-8 rounded-full bg-surface/90 dark:bg-white/[0.05] border border-border/80 dark:border-white/10 flex items-center justify-center text-text-muted group-hover:text-[#03BBD0] transition-all shadow-sm">
                        <SubIcon className="w-3.5 h-3.5" />
                      </div>

                      {/* Vertical Title Text */}
                      <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden pb-2">
                        <span
                          className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-text-muted group-hover:text-text-primary transition-colors whitespace-nowrap"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {sub.shortTitle || sub.title}
                        </span>
                      </div>

                      {/* Mobile Horizontal Title */}
                      <span className="md:hidden text-xs font-bold text-text-primary truncate ml-2">
                        {sub.shortTitle || sub.title}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>
      {/* ── SECTION 04: THE B2B GROWTH ENGINE (FULL-FUNNEL CAPABILITIES / WHAT WE DO) ── */}
      <section
        id="what-we-do"
        ref={capabilitiesSectionRef}
        className="relative py-20 lg:py-32 border-t border-border/60 dark:border-white/10 overflow-hidden select-none bg-slate-50/50 dark:bg-[#0E0E0E] transition-colors duration-500"
      >
        {/* Subtle Ambient Technical Lighting & Blueprint Grid (Parallax Enabled) */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : capBgY }}
          className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        >
          {/* Central Radial Energy Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
            style={{
              background:
                activeCapabilityIndex === 0
                  ? 'radial-gradient(circle, rgba(0,166,255,0.18) 0%, transparent 70%)'
                  : activeCapabilityIndex === 1
                    ? 'radial-gradient(circle, rgba(255,109,0,0.18) 0%, transparent 70%)'
                    : activeCapabilityIndex === 2
                      ? 'radial-gradient(circle, rgba(114,214,105,0.18) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, transparent 70%)',
            }}
          />
          {/* Subtle Cybernetic Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,166,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,166,255,0.035)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Faint Decorative Circuit Geometric Nodes */}
          <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#00A6FF]/30" />
          <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 rounded-full bg-[#FF6D00]/30" />
        </motion.div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ══ STEP 1–4: TOP INTRODUCTION (Staggered Scroll Power-On Entrance) ═════════════════ */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            {/* Step 02: Eyebrow (+20px upward reveal) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2  text-primary text-sm font-mono font-bold tracking-wider uppercase mb-3"
            >
              <Zap size={12} className="text-[#00A6FF] animate-pulse" />
              <span>OUR REVENUE ENGINEERING CAPABILITIES</span>
            </motion.div>

            {/* Step 03: Heading (+25px upward reveal) */}
            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mb-4 leading-tight"
            >
              Full-Funnel Tech-Enabled{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Demand Capabilities

              </span>
            </motion.h2>

            {/* Step 04: Description (+15px fade reveal) */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-text-secondary text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Architected for enterprise SaaS and technology organizations scaling across North America, EMEA, and APAC.
            </motion.p>
          </div>

          {/* ══ DESKTOP / TABLET CONNECTED ECOSYSTEM LAYOUT (lg and above) ════ */}
          <div className="hidden lg:block relative max-w-5xl mx-auto">

            {/* ── STEP 07: SVG TELEMETRY DATA CONNECTOR NETWORK (Progressive Digital Draw) ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              viewBox="0 0 1024 680"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="trackGrad01" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="trackGrad02" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFA600" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="trackGrad03" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#72D669" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="trackGrad04" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.25" />
                </linearGradient>

                <filter id="sigGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Top Path: 01 Lead Gen (x: 512, y: 145) -> Center Core Top (x: 512, y: 255) */}
              <motion.path
                d="M 512 145 L 512 255"
                stroke={activeCapabilityIndex === 0 ? 'url(#trackGrad01)' : 'currentColor'}
                className={activeCapabilityIndex === 0 ? 'stroke-[2.5px]' : 'text-slate-300/70 dark:text-white/10 stroke-[1.5px]'}
                strokeDasharray="200"
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 200 }}
                animate={isCapabilitiesInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
              />

              {/* 2. Right Path: 02 Demand & ABM (x: 690, y: 340) -> Center Core Right (x: 605, y: 340) */}
              <motion.path
                d="M 690 340 L 605 340"
                stroke={activeCapabilityIndex === 1 ? 'url(#trackGrad02)' : 'currentColor'}
                className={activeCapabilityIndex === 1 ? 'stroke-[2.5px]' : 'text-slate-300/70 dark:text-white/10 stroke-[1.5px]'}
                strokeDasharray="200"
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 200 }}
                animate={isCapabilitiesInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.65, ease: 'easeOut' }}
              />

              {/* 3. Left Path: 03 Research & Intel (x: 334, y: 340) -> Center Core Left (x: 419, y: 340) */}
              <motion.path
                d="M 334 340 L 419 340"
                stroke={activeCapabilityIndex === 2 ? 'url(#trackGrad03)' : 'currentColor'}
                className={activeCapabilityIndex === 2 ? 'stroke-[2.5px]' : 'text-slate-300/70 dark:text-white/10 stroke-[1.5px]'}
                strokeDasharray="200"
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 200 }}
                animate={isCapabilitiesInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.75, ease: 'easeOut' }}
              />

              {/* 4. Bottom Path: Center Core Bottom (x: 512, y: 425) -> 04 Outbound Conversion (x: 512, y: 535) */}
              <motion.path
                d="M 512 425 L 512 535"
                stroke={activeCapabilityIndex === 3 ? 'url(#trackGrad04)' : 'currentColor'}
                className={activeCapabilityIndex === 3 ? 'stroke-[2.5px]' : 'text-slate-300/70 dark:text-white/10 stroke-[1.5px]'}
                strokeDasharray="200"
                initial={{ strokeDashoffset: prefersReducedMotion ? 0 : 200 }}
                animate={isCapabilitiesInView ? { strokeDashoffset: 0 } : { strokeDashoffset: 200 }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.85, ease: 'easeOut' }}
              />

              {/* Step 09: Traveling Data Signal Particles along Connections */}
              {!prefersReducedMotion && isCapabilitiesInView && (
                <>
                  {activeCapabilityIndex === 0 && (
                    <motion.circle
                      r={4.5}
                      fill="#00A6FF"
                      filter="url(#sigGlow)"
                      initial={{ cx: 512, cy: 145, opacity: 0 }}
                      animate={{ cx: 512, cy: [145, 255], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {activeCapabilityIndex === 1 && (
                    <motion.circle
                      r={4.5}
                      fill="#FF6D00"
                      filter="url(#sigGlow)"
                      initial={{ cx: 690, cy: 340, opacity: 0 }}
                      animate={{ cx: [690, 605], cy: 340, opacity: [0, 1, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {activeCapabilityIndex === 2 && (
                    <motion.circle
                      r={4.5}
                      fill="#72D669"
                      filter="url(#sigGlow)"
                      initial={{ cx: 334, cy: 340, opacity: 0 }}
                      animate={{ cx: [334, 419], cy: 340, opacity: [0, 1, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {activeCapabilityIndex === 3 && (
                    <motion.circle
                      r={4.5}
                      fill="#00E5FF"
                      filter="url(#sigGlow)"
                      initial={{ cx: 512, cy: 535, opacity: 0 }}
                      animate={{ cx: 512, cy: [535, 425], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </>
              )}
            </svg>

            {/* ── TOP ZONE: CAPABILITY 01 (B2B Lead Generation) ── */}
            <div className="flex justify-center mb-6 relative z-10">
              {(() => {
                const cap = B2B_GROWTH_ENGINE_CAPABILITIES[0]
                const isActive = activeCapabilityIndex === 0

                return (
                  <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -25 }}
                    animate={
                      isCapabilitiesInView
                        ? {
                          opacity: activeCapabilityIndex !== null && !isActive ? 0.75 : 1,
                          y: isActive && !prefersReducedMotion ? -5 : 0,
                          scale: isActive ? 1.03 : 1,
                        }
                        : { opacity: 0, y: prefersReducedMotion ? 0 : -25 }
                    }
                    transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.70, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => {
                      setHoveredCapabilityIndex(0)
                      handleSelectCapability(0)
                    }}
                    onMouseLeave={() => setHoveredCapabilityIndex(null)}
                    onClick={() => handleSelectCapability(0)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSelectCapability(0)
                      }
                    }}
                    role="button"
                    aria-label={`Capability 01: ${cap.title}`}
                    className={`w-full max-w-[460px] p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#00A6FF]/50 ${isActive
                      ? 'border-[#00A6FF]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                      : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#00A6FF]/40'
                      }`}
                  >
                    {/* Top Layer Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                    {/* Brand Left Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${isActive ? 'w-[4px] shadow-[0_0_12px_rgba(0,166,255,0.6)]' : 'w-[3px]'
                        }`}
                    />

                    {/* Header Row: 01 Badge + Crosshair Icon + Category Tag */}
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border border-[#00A6FF]/30">
                          <span className={`font-mono text-sm font-bold text-[#00A6FF] transition-all duration-350 ${isActive ? 'scale-110' : 'scale-100'}`}>
                            {cap.number}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Crosshair size={17} className={`text-[#00A6FF] transition-all duration-350 ${isActive ? 'rotate-90 scale-110' : 'rotate-0'}`} />
                          <h3 className={`font-bold text-[15px] sm:text-base tracking-tight transition-all duration-350 ${isActive ? 'text-[#00A6FF] translate-x-0.5' : 'text-text-primary'}`}>
                            {cap.title}
                          </h3>
                        </div>
                      </div>

                      {/* Verified Metric Badge with Micro Animation */}
                      <div className="inline-flex items-center gap-1.5  text-sm font-mono font-bold text-[#00A6FF]">
                        <Check size={11} className={isActive ? 'scale-125 transition-transform text-[#00A6FF]' : 'text-slate-400 dark:text-white/40'} />
                        <span>{cap.metric}</span>
                      </div>
                    </div>

                    {/* Mission-like Micro Signal Accent Line */}
                    <div
                      className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-slate-200 dark:bg-white/10 my-2"
                      style={{ width: isActive ? '76px' : '36px' }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cap.accentGrad}`} />
                      {isActive && !prefersReducedMotion && (
                        <motion.div
                          initial={{ left: '0%', opacity: 0 }}
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                          className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#00A6FF]"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-[13.5px] text-text-secondary leading-relaxed font-normal relative z-10 pl-0.5">
                      {cap.description}
                    </p>

                    {/* Bottom Connecting Port Marker */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00A6FF]' : 'bg-slate-300 dark:bg-white/20'}`} />
                    </div>
                  </motion.div>
                )
              })()}
            </div>

            {/* ── MIDDLE ROW: CAPABILITY 03 (LEFT) + STRATEGIC CORE (CENTER) + CAPABILITY 02 (RIGHT) ── */}
            <div className="grid grid-cols-12 gap-6 items-center my-2 relative z-10">

              {/* LEFT: 03 — Research & Intelligence (delay: 1.00s) */}
              <div className="col-span-4 flex justify-end">
                {(() => {
                  const cap = B2B_GROWTH_ENGINE_CAPABILITIES[2]
                  const isActive = activeCapabilityIndex === 2

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                      animate={
                        isCapabilitiesInView
                          ? {
                            opacity: activeCapabilityIndex !== null && !isActive ? 0.75 : 1,
                            x: isActive && !prefersReducedMotion ? -4 : 0,
                            scale: isActive ? 1.03 : 1,
                          }
                          : { opacity: 0, x: prefersReducedMotion ? 0 : -30 }
                      }
                      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 1.00, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => {
                        setHoveredCapabilityIndex(2)
                        handleSelectCapability(2)
                      }}
                      onMouseLeave={() => setHoveredCapabilityIndex(null)}
                      onClick={() => handleSelectCapability(2)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleSelectCapability(2)
                        }
                      }}
                      role="button"
                      aria-label={`Capability 03: ${cap.title}`}
                      className={`w-full max-w-[340px] p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#72D669]/50 ${isActive
                        ? 'border-[#72D669]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#72D669]/40'
                        }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${isActive ? 'w-[4px] shadow-[0_0_12px_rgba(114,214,105,0.6)]' : 'w-[3px]'
                          }`}
                      />

                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-[#72D669]/10 dark:bg-[#72D669]/15 border border-[#72D669]/30">
                            <span className={`font-mono text-sm font-bold text-[#72D669] ${isActive ? 'scale-110' : ''}`}>
                              {cap.number}
                            </span>
                          </div>
                          <Compass size={17} className={`text-[#72D669] transition-all duration-350 ${isActive ? 'rotate-45 scale-110' : ''}`} />
                        </div>

                        <span className="text-sm font-mono font-semibold tracking-wider text-[#72D669] uppercase px-2 py-0.5 rounded bg-[#72D669]/10 border border-[#72D669]/20">
                          {cap.category}
                        </span>
                      </div>

                      {/* Mission-like Micro Signal Accent Line */}
                      <div
                        className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-slate-200 dark:bg-white/10 my-2"
                        style={{ width: isActive ? '76px' : '36px' }}
                      >
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cap.accentGrad}`} />
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            initial={{ left: '0%', opacity: 0 }}
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                            className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#72D669]"
                          />
                        )}
                      </div>

                      <h3 className={`font-bold text-[15px] tracking-tight mb-0.5 transition-all duration-350 ${isActive ? 'text-[#72D669]' : 'text-text-primary'}`}>
                        {cap.title}
                      </h3>

                      <h4 className="text-sm font-semibold text-primary dark:text-[#00E5FF] mb-2">
                        {cap.subtitle}
                      </h4>

                      <p className="text-sm text-text-secondary leading-relaxed font-normal relative z-10">
                        {cap.description}
                      </p>
                    </motion.div>
                  )
                })()}
              </div>

              {/* CENTER: STRATEGIC GROWTH ENGINE (THE CORE with Step 05 & 06 Staggered Entry + Breathing + Orbiting Signal) */}
              <div className="col-span-4 flex items-center justify-center relative">
                <motion.div
                  key={capabilitiesCoreReactionKey}
                  initial={{ scale: prefersReducedMotion ? 1 : 0.8, opacity: 0 }}
                  animate={isCapabilitiesInView ? { scale: 1, opacity: 1 } : { scale: prefersReducedMotion ? 1 : 0.8, opacity: 0 }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.40, ease: [0.22, 1, 0.36, 1] }}
                  style={{ y: prefersReducedMotion ? 0 : capCoreY }}
                  className="relative flex items-center justify-center w-[290px] h-[290px] select-none"
                >
                  {/* Step 06: Outer Rotating Dashed Ring (16s duration clockwise) */}
                  {!prefersReducedMotion && (
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#00A6FF]/30 dark:border-[#00A6FF]/40 animate-[spin_16s_linear_infinite]" />
                  )}

                  {/* Inner Counter-Rotating Ring (22s duration counter-clockwise) */}
                  {!prefersReducedMotion && (
                    <div className="absolute inset-4 rounded-full border border-dashed border-[#FF6D00]/25 dark:border-[#FF6D00]/35 animate-[spin_22s_linear_infinite_reverse]" />
                  )}

                  {/* Continuously Orbiting Small Signal Dot (4.5s orbit) */}
                  {!prefersReducedMotion && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                      className="absolute inset-0 pointer-events-none z-30"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00A6FF] shadow-[0_0_10px_#00A6FF]" />
                    </motion.div>
                  )}

                  {/* 4 Cardinal Docking Ports (Top, Right, Bottom, Left) */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#141414] border-2 border-[#00A6FF] shadow-[0_0_8px_#00A6FF] z-20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#00A6FF]" />
                  </div>
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#141414] border-2 border-[#FF6D00] shadow-[0_0_8px_#FF6D00] z-20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#FF6D00]" />
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#141414] border-2 border-[#00E5FF] shadow-[0_0_8px_#00E5FF] z-20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#00E5FF]" />
                  </div>
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#141414] border-2 border-[#72D669] shadow-[0_0_8px_#72D669] z-20 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-[#72D669]" />
                  </div>

                  {/* Central Glass Control Core Body with Continuous Breathing Pulse (1 -> 1.025 -> 1) */}
                  <motion.div
                    animate={!prefersReducedMotion ? { scale: [1, 1.025, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="relative w-[240px] h-[240px] rounded-3xl p-5 flex flex-col justify-between items-center text-center bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border border-primary/25 dark:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.50)] overflow-hidden z-10"
                  >
                    {/* Top Inner Subtle Edge */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                    {/* Central Status Badge */}
                    <div className="inline-flex items-center text-primary dark:text-[#00E5FF] text-xs font-semibold tracking-wider uppercase">
                      <span>Strategic Growth Engine</span>
                    </div>

                    {/* Core Heading */}
                    <div>
                      <h4 className="text-[15px] font-extrabold text-text-primary tracking-tight leading-snug mb-1">
                        Powering Predictable B2B Pipeline
                      </h4>
                      <p className="text-sm text-text-secondary leading-snug font-normal line-clamp-3">
                        We bridge the gap between sales and marketing by converting target account intent into highly qualified pipeline meetings.
                      </p>
                    </div>

                    {/* Step 08: Center Minimal CTA: Explore All Services with Hover Shift */}
                    <Link
                      to="/services"
                      className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-surface/90 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-sm font-mono font-bold text-accent dark:text-[#FF6D00] transition-all duration-200 shadow-xs hover:-translate-y-[2px]"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5 text-primary dark:text-[#00E5FF]" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT: 02 — Demand & ABM Acceleration (delay: 0.85s) */}
              <div className="col-span-4 flex justify-start">
                {(() => {
                  const cap = B2B_GROWTH_ENGINE_CAPABILITIES[1]
                  const isActive = activeCapabilityIndex === 1

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                      animate={
                        isCapabilitiesInView
                          ? {
                            opacity: activeCapabilityIndex !== null && !isActive ? 0.75 : 1,
                            x: isActive && !prefersReducedMotion ? 4 : 0,
                            scale: isActive ? 1.03 : 1,
                          }
                          : { opacity: 0, x: prefersReducedMotion ? 0 : 30 }
                      }
                      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => {
                        setHoveredCapabilityIndex(1)
                        handleSelectCapability(1)
                      }}
                      onMouseLeave={() => setHoveredCapabilityIndex(null)}
                      onClick={() => handleSelectCapability(1)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleSelectCapability(1)
                        }
                      }}
                      role="button"
                      aria-label={`Capability 02: ${cap.title}`}
                      className={`w-full max-w-[340px] p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#FF6D00]/50 ${isActive
                        ? 'border-[#FF6D00]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#FF6D00]/40'
                        }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${isActive ? 'w-[4px] shadow-[0_0_12px_rgba(255,109,0,0.6)]' : 'w-[3px]'
                          }`}
                      />

                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-[#FF6D00]/10 dark:bg-[#FF6D00]/15 border border-[#FF6D00]/30">
                            <span className={`font-mono text-sm font-bold text-[#FF6D00] ${isActive ? 'scale-110' : ''}`}>
                              {cap.number}
                            </span>
                          </div>
                          <Share2 size={17} className={`text-[#FF6D00] transition-all duration-350 ${isActive ? 'scale-110' : ''}`} />
                        </div>

                        <div className="inline-flex items-center gap-1 text-sm font-mono font-bold text-[#FF6D00] dark:text-[#FFA600]">
                          <Zap size={10} className={isActive ? 'animate-bounce' : ''} />
                          <span>{cap.metric}</span>
                        </div>
                      </div>

                      {/* Mission-like Micro Signal Accent Line */}
                      <div
                        className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-slate-200 dark:bg-white/10 my-2"
                        style={{ width: isActive ? '76px' : '36px' }}
                      >
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cap.accentGrad}`} />
                        {isActive && !prefersReducedMotion && (
                          <motion.div
                            initial={{ left: '0%', opacity: 0 }}
                            animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                            className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FF6D00]"
                          />
                        )}
                      </div>

                      <h3 className={`font-bold text-[15px] tracking-tight mb-2 transition-all duration-350 ${isActive ? 'text-[#FF6D00] dark:text-[#FFA600]' : 'text-text-primary'}`}>
                        {cap.title}
                      </h3>

                      <p className="text-sm text-text-secondary leading-relaxed font-normal relative z-10">
                        {cap.description}
                      </p>
                    </motion.div>
                  )
                })()}
              </div>

            </div>

            {/* ── BOTTOM ZONE: CAPABILITY 04 (Outbound Conversion, delay: 1.15s) ── */}
            <div className="flex justify-center mt-6 relative z-10">
              {(() => {
                const cap = B2B_GROWTH_ENGINE_CAPABILITIES[3]
                const isActive = activeCapabilityIndex === 3

                return (
                  <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                    animate={
                      isCapabilitiesInView
                        ? {
                          opacity: activeCapabilityIndex !== null && !isActive ? 0.75 : 1,
                          y: isActive && !prefersReducedMotion ? 5 : 0,
                          scale: isActive ? 1.03 : 1,
                        }
                        : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }
                    }
                    transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => {
                      setHoveredCapabilityIndex(3)
                      handleSelectCapability(3)
                    }}
                    onMouseLeave={() => setHoveredCapabilityIndex(null)}
                    onClick={() => handleSelectCapability(3)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSelectCapability(3)
                      }
                    }}
                    role="button"
                    aria-label={`Capability 04: ${cap.title}`}
                    className={`w-full max-w-[460px] p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#00E5FF]/50 ${isActive
                      ? 'border-[#00E5FF]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                      : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#00E5FF]/40'
                      }`}
                  >
                    {/* Top Connecting Port Marker */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00E5FF]' : 'bg-slate-300 dark:bg-white/20'}`} />
                    </div>

                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${isActive ? 'w-[4px] shadow-[0_0_12px_rgba(0,229,255,0.6)]' : 'w-[3px]'
                        }`}
                    />

                    <div className="flex items-center justify-between mb-1.5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00E5FF]/10 dark:bg-[#00E5FF]/15 border border-[#00E5FF]/30">
                          <span className={`font-mono text-sm font-bold text-[#00E5FF] transition-all duration-350 ${isActive ? 'scale-110' : ''}`}>
                            {cap.number}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarCheck size={17} className={`text-[#00E5FF] transition-all duration-350 ${isActive ? 'scale-110' : ''}`} />
                          <h3 className={`font-bold text-[15px] sm:text-base tracking-tight transition-all duration-350 ${isActive ? 'text-[#00E5FF] translate-x-0.5' : 'text-text-primary'}`}>
                            {cap.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-sm font-mono font-semibold tracking-wider text-primary dark:text-[#00E5FF] uppercase px-2.5 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                        {cap.subtitle}
                      </span>
                    </div>

                    {/* Mission-like Micro Signal Accent Line */}
                    <div
                      className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-slate-200 dark:bg-white/10 my-2"
                      style={{ width: isActive ? '76px' : '36px' }}
                    >
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cap.accentGrad}`} />
                      {isActive && !prefersReducedMotion && (
                        <motion.div
                          initial={{ left: '0%', opacity: 0 }}
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                          className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#00E5FF]"
                        />
                      )}
                    </div>

                    <p className="text-sm sm:text-[13.5px] text-text-secondary leading-relaxed font-normal relative z-10 pl-0.5">
                      {cap.description}
                    </p>
                  </motion.div>
                )
              })()}
            </div>

          </div>

          {/* ══ MOBILE & TABLET VERTICAL TELEMETRY FLOW (< lg) ════════════════ */}
          <div className="block lg:hidden max-w-xl mx-auto space-y-5">

            {/* Mobile Strategic Core Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-3xl text-center bg-white dark:bg-[#141414] border border-primary/30 dark:border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.16)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45)] relative overflow-hidden mb-6"
            >
              <div className="inline-flex items-center gap-1.5   text-primary dark:text-[#00E5FF] text-sm font-mono font-bold tracking-wider uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF]" />
                <span>Strategic Growth Engine</span>
              </div>

              <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-2">
                Powering Predictable B2B Pipeline
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed font-normal mb-4 max-w-md mx-auto">
                We bridge the gap between sales and marketing by converting target account intent into highly qualified pipeline meetings.
              </p>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-accent dark:bg-accent dark:bg-white/5 hover:bg-accent dark:bg-accent text-accent dark:text-[#FF6D00] text-sm font-mono font-bold tracking-wider uppercase border border-accent dark:border-white/10 transition-colors"
              >
                <span>Explore All Services</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Mobile 4 Capability Cards Stacked with Continuous Visual Pulse */}
            <div className="relative pl-4 sm:pl-6 border-l-2 border-dashed border-primary/30 dark:border-white/15 space-y-4">
              {B2B_GROWTH_ENGINE_CAPABILITIES.map((cap, idx) => {
                const isActive = activeCapabilityIndex === idx

                return (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    onClick={() => handleSelectCapability(idx)}
                    role="button"
                    tabIndex={0}
                    className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 bg-white dark:bg-[#141414] border ${isActive
                      ? 'border-primary shadow-lg ring-1 ring-primary/30'
                      : 'border-slate-200/90 dark:border-white/[0.08] shadow-sm'
                      }`}
                  >
                    {/* Left Node Pin */}
                    <span
                      className={`absolute -left-[23px] sm:-left-[31px] top-6 w-3 h-3 rounded-full border-2 transition-all ${isActive
                        ? 'bg-primary border-white dark:border-[#0E0E0E] shadow-[0_0_8px_#00A6FF]'
                        : 'bg-slate-300 dark:bg-white/20 border-white dark:border-[#0E0E0E]'
                        }`}
                    />

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-bold px-2 py-0.5 rounded bg-primary/30 dark:bg-primary/10 text-primary">
                          {cap.number}
                        </span>
                        <h4 className="font-bold text-sm sm:text-[15px] text-text-primary">
                          {cap.title}
                        </h4>
                      </div>

                      {cap.metric && (
                        <span className="text-sm font-mono font-bold text-primary dark:text-[#00E5FF] px-2 py-0.5 rounded bg-primary/30 dark:bg-primary/10 border border-primary/20">
                          {cap.metric}
                        </span>
                      )}
                    </div>

                    {cap.subtitle && (
                      <span className="text-sm font-semibold text-primary dark:text-[#00E5FF] block mb-1.5">
                        {cap.subtitle}
                      </span>
                    )}

                    <p className="text-sm text-text-secondary leading-relaxed font-normal">
                      {cap.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default AboutCompany
