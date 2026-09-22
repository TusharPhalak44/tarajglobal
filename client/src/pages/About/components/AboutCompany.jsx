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
  Crosshair,
  Share2,
  Search,
  Send
} from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { StarButton } from '@components/ui/StarButton'

const INTELLIGENCE_FIELD_NODES = [
  {
    id: 'icp',
    label: 'ICP',
    sublabel: 'ACCOUNT FIT',
    x: 110,
    y: 105,
    cluster: [
      { x: 55, y: 75 },
      { x: 75, y: 145 },
      { x: 165, y: 65 },
      { x: 45, y: 125 },
      { x: 145, y: 145 },
    ],
    relatedLabels: ['Tier-1 Accounts', 'Tech Stack', 'Firmographics'],
    signalRange: [0.0, 0.22],
  },
  {
    id: 'data',
    label: 'DATA',
    sublabel: 'VERIFIED RECORDS',
    x: 410,
    y: 95,
    cluster: [
      { x: 465, y: 65 },
      { x: 365, y: 55 },
      { x: 475, y: 135 },
      { x: 355, y: 135 },
      { x: 445, y: 165 },
    ],
    relatedLabels: ['Direct Dials', 'Email SLA', 'Mobile Validated'],
    signalRange: [0.24, 0.48],
  },
  {
    id: 'people',
    label: 'PEOPLE',
    sublabel: 'ORG-CHART MAP',
    x: 395,
    y: 335,
    cluster: [
      { x: 455, y: 305 },
      { x: 345, y: 375 },
      { x: 465, y: 375 },
      { x: 355, y: 305 },
      { x: 425, y: 265 },
    ],
    relatedLabels: ['Economic Buyers', 'Buying Committee', 'Champions'],
    signalRange: [0.5, 0.72],
  },
  {
    id: 'signals',
    label: 'SIGNALS',
    sublabel: 'BUYER INTENT',
    x: 125,
    y: 335,
    cluster: [
      { x: 65, y: 305 },
      { x: 175, y: 375 },
      { x: 65, y: 375 },
      { x: 165, y: 295 },
      { x: 95, y: 265 },
    ],
    relatedLabels: ['Hiring Surges', 'Tech Adoption', 'Intent Spikes'],
    signalRange: [0.74, 0.9],
  },
]

const BACKGROUND_FIELD_DOTS = [
  { x: 40, y: 40 },
  { x: 180, y: 30 },
  { x: 260, y: 50 },
  { x: 330, y: 30 },
  { x: 480, y: 40 },
  { x: 30, y: 220 },
  { x: 490, y: 220 },
  { x: 40, y: 400 },
  { x: 210, y: 410 },
  { x: 260, y: 390 },
  { x: 320, y: 410 },
  { x: 480, y: 400 },
]

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
    title: 'DATA PRECISION FIRST',
    shortTitle: 'DATA PRECISION',
    color: '#00A6FF',
    desc: 'We eliminate vanity volume. Every record is verified against live org-charts with strict 99.8% accuracy SLAs.',
    badge: '99.8% Accuracy SLA',
  },
  {
    num: '02',
    id: 'node-02',
    title: 'HIGH-VELOCITY OUTBOUND',
    shortTitle: 'VELOCITY',
    color: '#FF6D00',
    desc: 'Multi-channel outbound cadence engineered to launch within 48–72 hours and compress enterprise sales cycles.',
    badge: '48–72h Outbound SLA',
  },
  {
    num: '03',
    id: 'node-03',
    title: 'ZERO DUPLICATE GUARANTEE',
    shortTitle: 'ZERO DUPLICATES',
    color: '#72D669',
    desc: 'Bespoke account suppression and data hygiene protocols guarantee 100% unique, high-intent buyer accounts.',
    badge: '100% Unique Accounts',
  },
  {
    num: '04',
    id: 'node-04',
    title: 'STRATEGIC PARTNERSHIP',
    shortTitle: 'PARTNERSHIP',
    color: '#FFA600',
    desc: 'We operate as an agile extension of your revenue team with continuous optimization and transparent reporting.',
    badge: 'Agile Extension',
  },
]

const B2B_GROWTH_ENGINE_CAPABILITIES = [
  {
    id: 'lead-gen',
    number: '01',
    title: 'B2B Lead Generation',
    category: 'DATA & TARGETING',
    description: 'Identify and reach high-fit enterprise accounts with triple-verified B2B data, precise title targeting, and guaranteed zero duplicate records.',
    metric: '99.8% Data Accuracy',
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
    title: 'Demand & ABM Acceleration',
    category: 'MULTI-TOUCH ENGAGEMENT',
    description: 'Engage buyer groups across multiple channels through intent-driven Account-Based Marketing, content syndication, and high-velocity outbound.',
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
    title: 'Research & Intelligence',
    subtitle: 'Proprietary Account Mapping',
    category: 'ACCOUNT INTELLIGENCE',
    description: 'In-depth org-chart mapping to identify the true economic decision-makers and budget holders.',
    color: '#72D669',
    accentGrad: 'from-[#72D669] to-[#00E5FF]',
    glowColor: 'rgba(114,214,105,0.35)',
    iconType: 'radar',
    position: 'left',
  },
  {
    id: 'outbound-conv',
    number: '04',
    title: 'Outbound Conversion',
    subtitle: 'Executive Appointment Setting',
    category: 'PIPELINE CONVERSION',
    description: 'Direct peer-to-peer outreach that secures confirmed calendar slots with enterprise buyers.',
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
    const DURATION = 4800
    let animId
    const startTime = performance.now()

    const tick = (currentTime) => {
      const elapsed = (currentTime - startTime) % DURATION
      const progress = elapsed / DURATION
      // Exact synchronization with column centers (11%, 37%, 63%, 89%) and SVG trajectory
      const currentIndex =
        progress < 0.24 ? 0 : progress < 0.50 ? 1 : progress < 0.76 ? 2 : 3
      setActiveNode((prev) => (prev !== currentIndex ? currentIndex : prev))
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [prefersReducedMotion])

  const scrollToStory = () => {
    const el = document.getElementById('our-story')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Heritage Precision in Motion (PRECISION FIELD)
  const [hoveredFieldNode, setHoveredFieldNode] = useState(null)
  const [signalProgress, setSignalProgress] = useState(0)
  const fieldSignalPathRef = useRef(null)
  const [fieldSignalCoord, setFieldSignalCoord] = useState({ x: 110, y: 105 })

  useEffect(() => {
    if (prefersReducedMotion || !isHeritageInView) return
    let animId
    let startTime = null
    const DURATION = 8000 // 8s calm cycle

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) % DURATION
      const progress = elapsed / DURATION
      setSignalProgress(progress)

      if (fieldSignalPathRef.current) {
        try {
          const totalLength = fieldSignalPathRef.current.getTotalLength()
          const point = fieldSignalPathRef.current.getPointAtLength(progress * totalLength)
          setFieldSignalCoord({ x: point.x, y: point.y })
        } catch (e) {
          // ignore
        }
      }

      animId = requestAnimationFrame(tick)
    }

    const timeoutId = setTimeout(() => {
      animId = requestAnimationFrame(tick)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [isHeritageInView, prefersReducedMotion])

  // Section 03: "THE GROWTH INTELLIGENCE FIELD" State & Interactive Progression
  const intelligenceSectionRef = useRef(null)
  const isIntelligenceInView = useInView(intelligenceSectionRef, { once: true, margin: '-60px' })
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0)
  const [scrollProgressPct, setScrollProgressPct] = useState(25)
  const [hoveredPrincipleIndex, setHoveredPrincipleIndex] = useState(null)
  const [hoveredStrategicBlock, setHoveredStrategicBlock] = useState(null)
  const [coreReactionKey, setCoreReactionKey] = useState(0)
  const [hasPrinciplesUserInteracted, setHasPrinciplesUserInteracted] = useState(false)
  const activePrincipleRef = useRef(0)

  const triggerCoreReaction = () => {
    setCoreReactionKey((prev) => prev + 1)
  }

  // Auto-activation cycling: 01 -> 02 -> 03 -> 04 every 3.2s when in view, until user interacts
  useEffect(() => {
    if (prefersReducedMotion || !isIntelligenceInView || hasPrinciplesUserInteracted) return

    const interval = setInterval(() => {
      setActivePrincipleIndex((prev) => {
        const next = (prev + 1) % 4
        activePrincipleRef.current = next
        setScrollProgressPct(Math.round(((next + 1) / 4) * 100))
        return next
      })
      triggerCoreReaction()
    }, 3200)

    return () => clearInterval(interval)
  }, [isIntelligenceInView, hasPrinciplesUserInteracted, prefersReducedMotion])

  const handleSelectPrinciple = (idx) => {
    if (!hasPrinciplesUserInteracted) {
      setHasPrinciplesUserInteracted(true)
    }
    activePrincipleRef.current = idx
    setActivePrincipleIndex(idx)
    setScrollProgressPct(Math.round(((idx + 1) / 4) * 100))
    triggerCoreReaction()
  }

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
        <div className="absolute -top-40 left-1/4 w-[750px] h-[600px] rounded-full bg-primary/15 dark:bg-[#00A6FF]/12 blur-[160px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 -right-20 w-[650px] h-[550px] rounded-full bg-cta/15 dark:bg-[#FF6D00]/12 blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-2/3 -left-20 w-[650px] h-[550px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[170px]" />
        
        {/* Subtle Cybernetic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,150,200,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,150,200,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── SECTION 01: HERO — THE TARAJ GLOBAL DNA ──────────────────── */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-18 lg:pb-14 overflow-hidden">
        <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow with Beacon Animation */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/90 dark:bg-white/[0.04] border border-primary/25 dark:border-[#00A6FF]/30 backdrop-blur-md mb-4 sm:mb-6 shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-text-secondary via-text-primary to-text-secondary dark:from-slate-300 dark:via-white dark:to-slate-300 bg-clip-text text-transparent">
              ABOUT TARAJ GLOBAL &bull; GLOBAL B2B DEMAND GENERATION
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
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight text-text-primary leading-[1.08]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block sm:whitespace-nowrap bg-gradient-to-r from-text-primary via-text-primary to-text-secondary dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
              >
                WE CONNECT
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block sm:whitespace-nowrap bg-gradient-to-r from-text-primary via-slate-700 to-[#00A6FF] dark:from-slate-200 dark:via-slate-100 dark:to-[#00A6FF] bg-clip-text text-transparent"
              >
                THE RIGHT PEOPLE
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="block sm:whitespace-nowrap text-text-primary"
              >
                WITH THE{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#00D2FF] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,166,255,0.4)]">
                  RIGHT OPPORTUNITIES.
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
            Taraj Global helps businesses build meaningful connections with decision-makers through data, technology and strategic demand generation.
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
              className="relative group p-[1.5px] rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(0,166,255,0.45)] cursor-pointer shadow-md shadow-primary/5"
            >
              {/* Rotating Continuous Border Glow Beam */}
              {!prefersReducedMotion && (
                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00A6FF_0%,transparent_40%,transparent_60%,#00A6FF_100%)]" />
              )}

              {/* Button Glass Inner Body */}
              <span className="relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/95 dark:bg-[#0E0E0E]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white transition-colors duration-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
                </span>
                <span>Discover Our Story</span>
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
              <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.25em] uppercase text-text-muted">
                TARAJ GLOBAL &bull; EST. B2B GROWTH SYSTEM
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
                              className="absolute inset-1 rounded-full border border-white/90 shadow-[0_0_14px_#FFFFFF] animate-spin"
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
                        className={`group relative p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer [transform-style:preserve-3d] ${
                          isActive
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
                            <>
                              <span className="absolute w-7 h-7 rounded-full bg-[#00A6FF]/35 animate-ping pointer-events-none" />
                              <span className="absolute w-5 h-5 rounded-full bg-[#00E5FF]/45 blur-[3px] pointer-events-none" />
                            </>
                          )}
                          <div
                            className={`relative z-10 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-[#00E5FF] shadow-[0_0_16px_#00E5FF] scale-125 ring-2 ring-white/80 dark:ring-white/95'
                                : 'bg-border/80 dark:bg-white/20 group-hover:bg-[#00A6FF]/70'
                            }`}
                          />
                        </div>

                        {/* 3D High-Tech Badge Number */}
                        <div className="flex items-center justify-center mb-1">
                          <span
                            className={`inline-flex items-center font-mono text-[11px] font-bold px-2 py-0.5 rounded-md transition-all duration-300 ${
                              isActive
                                ? 'bg-[#00A6FF]/15 text-[#00E5FF] border border-[#00A6FF]/35 shadow-[0_0_12px_rgba(0,166,255,0.35)]'
                                : 'text-text-muted group-hover:text-text-secondary'
                            }`}
                          >
                            {node.step}
                          </span>
                        </div>

                        {/* Label */}
                        <h3
                          className={`text-sm lg:text-base font-bold tracking-wider uppercase transition-colors duration-300 mb-1 ${
                            isActive
                              ? 'text-text-primary font-extrabold drop-shadow-xs'
                              : 'text-text-secondary group-hover:text-text-primary'
                          }`}
                        >
                          {node.label}
                        </h3>

                        {/* Short Supporting Text */}
                        <p
                          className={`text-xs text-text-muted transition-colors duration-300 leading-relaxed ${
                            isActive ? 'text-text-secondary' : 'group-hover:text-text-secondary'
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
                      className={`absolute -left-[35px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00A6FF] border-white dark:border-[#0E0E0E] shadow-[0_0_8px_rgba(0,166,255,0.85)]'
                          : 'bg-background border-border dark:border-white/20'
                      }`}
                    />
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span
                        className={`font-mono text-xs font-bold transition-colors duration-300 ${
                          isActive ? 'text-[#00A6FF]' : 'text-text-muted'
                        }`}
                      >
                        {node.step}
                      </span>
                      <h3
                        className={`text-sm font-bold tracking-wider uppercase transition-colors duration-300 ${
                          isActive ? 'text-text-primary' : 'text-text-secondary'
                        }`}
                      >
                        {node.label}
                      </h3>
                    </div>
                    <p className="text-xs text-text-muted leading-tight">{node.desc}</p>
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
          
          {/* ── DESKTOP SPLIT-SCREEN (55% LEFT / 45% RIGHT) & MOBILE EDITORIAL FLOW ── */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* ── LEFT / STORY COLUMN (55% on Desktop) ── */}
            <div className="w-full lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 order-1 lg:order-1">
              
              {/* Eyebrow & Headline (Order 1 on mobile) */}
              <div className="space-y-3 sm:space-y-4">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-xs font-mono font-bold tracking-[0.24em] uppercase text-text-muted">
                    OUR HERITAGE <span className="text-text-muted/40">•</span> <span className="text-[#00A6FF]">PRECISION SCALE</span>
                  </span>
                </motion.div>

                {/* Main Headline (2-3 lines editorial, not oversized) */}
                <motion.h2
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.18] text-text-primary"
                >
                  Built on a simple truth:{' '}
                  <span className="block sm:inline text-text-primary">
                    Predictable revenue demands <span className="text-[#00A6FF]">verified precision</span>.
                  </span>
                </motion.h2>
              </div>

              {/* Story Paragraphs - combined with natural tight spacing */}
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3 sm:space-y-3.5 text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-2xl"
              >
                <p>
                  <strong className="text-text-primary font-semibold">Taraj Global</strong> was founded to solve the core inefficiency in modern B2B demand generation: unverified data, spam outbound, and hollow metrics. From day one, we committed to deep account intelligence, org-chart mapping, and verified decision-maker access.
                </p>
                <p>
                  Today, enterprise technology leaders across North America, Europe, and Asia-Pacific trust our Pune &amp; San Francisco revenue teams to deliver qualified opportunities that convert to closed business.
                </p>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN (~45% on Desktop): “PRECISION FIELD” INTELLIGENCE VISUALIZATION ── */}
            <div className="w-full lg:col-span-5 flex items-center justify-center order-2 lg:order-2 my-2 lg:my-0">
              
              {/* Visual Container */}
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[500px] aspect-[520/440] relative rounded-2xl bg-surface/30 dark:bg-white/[0.015] border border-border/50 dark:border-white/5 p-2 sm:p-4 backdrop-blur-sm shadow-sm select-none"
              >
                {/* SVG Visual Canvas */}
                <svg
                  viewBox="0 0 520 440"
                  className="w-full h-full overflow-visible"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="fieldBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00A6FF" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="fieldGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Subtle Background Grid Points */}
                  {BACKGROUND_FIELD_DOTS.map((pt, i) => (
                    <circle
                      key={`bg-dot-${i}`}
                      cx={pt.x}
                      cy={pt.y}
                      r="1.5"
                      className="fill-slate-300 dark:fill-white/10"
                    />
                  ))}

                  {/* 2. Outer Perimeter Ring / Connection Lines between Nodes */}
                  <path
                    d="M 110,105 L 410,95 L 395,335 L 125,335 Z"
                    className="stroke-slate-200/80 dark:stroke-white/5"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    fill="none"
                  />

                  {/* 3. Connecting Lines to Central PRECISION Marker */}
                  {INTELLIGENCE_FIELD_NODES.map((node) => {
                    const isNodeActive =
                      hoveredFieldNode === node.id ||
                      (!prefersReducedMotion &&
                        signalProgress >= node.signalRange[0] &&
                        signalProgress <= node.signalRange[1])

                    return (
                      <line
                        key={`spoke-${node.id}`}
                        x1={node.x}
                        y1={node.y}
                        x2={260}
                        y2={215}
                        stroke={isNodeActive ? '#00A6FF' : 'currentColor'}
                        strokeOpacity={isNodeActive ? 0.75 : 0.12}
                        strokeWidth={isNodeActive ? 1.8 : 1}
                        className={`transition-all duration-300 ${
                          isNodeActive ? '' : 'stroke-slate-400 dark:stroke-white'
                        }`}
                      />
                    )
                  })}

                  {/* 4. Structured Cluster Dots & Links for each Node */}
                  {INTELLIGENCE_FIELD_NODES.map((node) => {
                    const isNodeActive =
                      hoveredFieldNode === node.id ||
                      (!prefersReducedMotion &&
                        signalProgress >= node.signalRange[0] &&
                        signalProgress <= node.signalRange[1])

                    return (
                      <g key={`cluster-group-${node.id}`}>
                        {/* Cluster connecting lines */}
                        {node.cluster.map((cpt, ci) => (
                          <line
                            key={`c-line-${node.id}-${ci}`}
                            x1={node.x}
                            y1={node.y}
                            x2={cpt.x}
                            y2={cpt.y}
                            stroke={isNodeActive ? '#00A6FF' : 'currentColor'}
                            strokeOpacity={isNodeActive ? 0.45 : 0.08}
                            strokeWidth="0.8"
                            className={`transition-all duration-300 ${
                              isNodeActive ? '' : 'stroke-slate-400 dark:stroke-white'
                            }`}
                          />
                        ))}
                        {/* Cluster Dots */}
                        {node.cluster.map((cpt, ci) => (
                          <circle
                            key={`c-dot-${node.id}-${ci}`}
                            cx={cpt.x}
                            cy={cpt.y}
                            r={isNodeActive ? 2.5 : 1.8}
                            fill={isNodeActive ? '#00A6FF' : 'currentColor'}
                            fillOpacity={isNodeActive ? 0.75 : 0.2}
                            className={`transition-all duration-300 ${
                              isNodeActive ? '' : 'text-slate-400 dark:text-white'
                            }`}
                          />
                        ))}
                      </g>
                    )
                  })}

                  {/* 5. Traveling Signal Path (Calculated & Tracked) */}
                  <path
                    ref={fieldSignalPathRef}
                    d="M 110,105 L 410,95 L 395,335 L 125,335 L 260,215"
                    fill="none"
                    stroke="transparent"
                  />

                  {/* 6. Traveling Blue Signal */}
                  {!prefersReducedMotion && isHeritageInView && (
                    <g transform={`translate(${fieldSignalCoord.x}, ${fieldSignalCoord.y})`}>
                      <circle
                        r="5"
                        fill="#00A6FF"
                        filter="url(#fieldGlow)"
                        opacity="0.95"
                      />
                      <circle r="2.5" fill="#ffffff" />
                    </g>
                  )}

                  {/* 7. Central PRECISION Marker */}
                  <g
                    transform="translate(260, 215)"
                    className="cursor-default"
                  >
                    {/* Ambient subtle breathing ring */}
                    <circle
                      r="48"
                      className="fill-background stroke-border dark:stroke-white/10"
                      strokeWidth="1"
                    />
                    <circle
                      r="38"
                      fill="#00A6FF"
                      fillOpacity="0.04"
                      className="stroke-[#00A6FF]/30"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />

                    {/* Central Core Circle */}
                    <circle
                      r="22"
                      className="fill-background stroke-[#00A6FF] stroke-[1.8]"
                    />

                    {/* Precision Icon/Dot */}
                    <circle
                      r="4.5"
                      fill="#00A6FF"
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Central Label */}
                    <text
                      y="-28"
                      textAnchor="middle"
                      className="font-mono text-[11px] font-extrabold tracking-[0.2em] fill-[#00A6FF] uppercase"
                    >
                      PRECISION
                    </text>

                    {/* Subtext */}
                    <text
                      y="32"
                      textAnchor="middle"
                      className="font-mono text-[8px] font-semibold tracking-wider fill-text-muted uppercase"
                    >
                      VERIFIED
                    </text>
                    <text
                      y="42"
                      textAnchor="middle"
                      className="font-mono text-[8px] font-semibold tracking-wider fill-text-muted uppercase"
                    >
                      DECISION-MAKER DATA
                    </text>
                  </g>

                  {/* 8. Four Intelligence Nodes (ICP, DATA, PEOPLE, SIGNALS) */}
                  {INTELLIGENCE_FIELD_NODES.map((node) => {
                    const isNodeActive =
                      hoveredFieldNode === node.id ||
                      (!prefersReducedMotion &&
                        signalProgress >= node.signalRange[0] &&
                        signalProgress <= node.signalRange[1])

                    return (
                      <g
                        key={`node-${node.id}`}
                        transform={`translate(${node.x}, ${node.y})`}
                        className="cursor-pointer transition-transform duration-300"
                        onMouseEnter={() => setHoveredFieldNode(node.id)}
                        onMouseLeave={() => setHoveredFieldNode(null)}
                      >
                        {/* Active Pulse Ring */}
                        {isNodeActive && (
                          <circle
                            r="18"
                            fill="#00A6FF"
                            opacity="0.15"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Marker Ring */}
                        <circle
                          r={isNodeActive ? 12 : 9}
                          className={`transition-all duration-300 ${
                            isNodeActive
                              ? 'fill-background stroke-[#00A6FF] stroke-[2]'
                              : 'fill-background stroke-slate-300 dark:stroke-white/20 stroke-[1.2]'
                          }`}
                        />

                        {/* Inner Bullet */}
                        <circle
                          r={isNodeActive ? 4.5 : 3}
                          className={`transition-all duration-300 ${
                            isNodeActive ? 'fill-[#00A6FF]' : 'fill-slate-400 dark:fill-white/40'
                          }`}
                        />

                        {/* Label Badge */}
                        <text
                          y={node.y > 220 ? 24 : -18}
                          textAnchor="middle"
                          className={`font-mono text-[11px] font-extrabold tracking-wider transition-colors duration-300 ${
                            isNodeActive
                              ? 'fill-[#00A6FF]'
                              : 'fill-text-primary'
                          }`}
                        >
                          {node.label}
                        </text>

                        {/* Sublabel */}
                        <text
                          y={node.y > 220 ? 34 : -28}
                          textAnchor="middle"
                          className={`font-mono text-[8px] tracking-wider uppercase transition-colors duration-300 ${
                            isNodeActive
                              ? 'fill-[#00A6FF]/80 font-semibold'
                              : 'fill-text-muted'
                          }`}
                        >
                          {node.sublabel}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Micro hover indicator badge */}
                {hoveredFieldNode && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-background/90 border border-[#00A6FF]/30 backdrop-blur text-[10px] font-mono text-[#00A6FF] tracking-wider uppercase shadow-sm">
                    {INTELLIGENCE_FIELD_NODES.find((n) => n.id === hoveredFieldNode)?.relatedLabels.join(' • ')}
                  </div>
                )}
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 03: THE GROWTH INTELLIGENCE FIELD ──────────────────── */}
      <section
        id="foundational-values"
        ref={intelligenceSectionRef}
        className="relative py-14 sm:py-18 lg:py-20 border-t border-border/60 dark:border-white/10 overflow-hidden bg-background text-text-primary transition-colors duration-500"
      >
        {/* ══ 1. BACKGROUND INTELLIGENCE ENVIRONMENT & MOTION ══════════════ */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Moving / Panning Background Grid (0ms sequence start) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isIntelligenceInView
                ? {
                    opacity: isDark ? 0.05 : 0.035,
                    backgroundPosition: !prefersReducedMotion ? ['0px 0px', '24px 24px'] : '0px 0px',
                  }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              backgroundPosition: { repeat: Infinity, duration: 24, ease: 'linear' },
            }}
            className="absolute inset-0 bg-[radial-gradient(#00A6FF_1px,transparent_1px)] [background-size:24px_24px]"
          />

          {/* Subtle Ambient Light Fields */}
          <div
            className="absolute -top-12 left-10 w-80 h-80 rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
            style={{
              backgroundColor: '#00A6FF',
              opacity: isDark ? 0.06 : 0.02,
            }}
          />
          <div
            className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 rounded-full blur-[150px] pointer-events-none transition-colors duration-700"
            style={{
              backgroundColor: GROWTH_INTELLIGENCE_PRINCIPLES[activePrincipleIndex].color,
              opacity: isDark ? 0.08 : 0.025,
            }}
          />
          <div
            className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
            style={{
              backgroundColor: '#FF6D00',
              opacity: isDark ? 0.05 : 0.018,
            }}
          />

          {/* Tiny Floating Geometric Data Particles */}
          {!prefersReducedMotion && isIntelligenceInView && (
            <>
              {[
                { top: '14%', left: '8%', size: 2.5, dur: 7.2, delay: 0 },
                { top: '35%', left: '46%', size: 2, dur: 8.5, delay: 1.2 },
                { top: '78%', left: '16%', size: 3, dur: 9.0, delay: 0.5 },
                { top: '22%', right: '12%', size: 2.5, dur: 6.8, delay: 1.8 },
                { top: '82%', right: '18%', size: 2, dur: 8.0, delay: 0.8 },
              ].map((p, i) => (
                <motion.div
                  key={`intel-dot-${i}`}
                  className="absolute rounded-full bg-[#00A6FF]/40 pointer-events-none"
                  style={{ top: p.top, left: p.left, right: p.right, width: p.size, height: p.size }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.15, 0.45, 0.15],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: p.dur,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </>
          )}
        </div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ── COMPACT SECTION HEADER (REVEAL TIMINGS: 150ms -> 250ms -> 400ms) ── */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            {/* Eyebrow (150ms + growing accent line) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isIntelligenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/20 relative overflow-hidden"
            >
              <span className="relative flex h-2 w-2">
                {!prefersReducedMotion && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A6FF]">
                FOUNDATIONAL VALUES
              </span>

              {/* Eyebrow Micro Accent Line Growing from 0 to 100% */}
              <motion.div
                initial={{ width: 0 }}
                animate={isIntelligenceInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.18, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent pointer-events-none"
              />
            </motion.div>

            {/* Main Heading (250ms grouped reveal) */}
            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              animate={isIntelligenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-text-primary leading-[1.12] mb-2.5"
            >
              OUR MISSION, VISION &amp;{' '}
              <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                CORE PRINCIPLES
              </span>
            </motion.h2>

            {/* Subtext (400ms reveal) */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={isIntelligenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.40, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal max-w-2xl"
            >
              The operating blueprint that guides our revenue engineering team across every campaign.
            </motion.p>
          </div>

          {/* ── TWO-COLUMN STRATEGIC & INTELLIGENCE NETWORK COMPOSITION ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── LEFT COLUMN: MISSION (500ms) & VISION (600ms) STRATEGIC BLOCKS (50%) ───── */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              {/* Mission Block (500ms entrance + visible black/dark elevation shadow + subtle hover) */}
              {(() => {
                const isMissionActive = hoveredStrategicBlock === 'mission'
                const isMissionMuted = hoveredStrategicBlock === 'vision'

                return (
                  <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                    animate={
                      isIntelligenceInView
                        ? {
                            opacity: isMissionMuted ? 0.75 : 1,
                            y: isMissionActive && !prefersReducedMotion ? -3 : 0,
                          }
                        : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }
                    }
                    transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.50, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredStrategicBlock('mission')}
                    onMouseLeave={() => setHoveredStrategicBlock(null)}
                    onClick={() => setHoveredStrategicBlock((prev) => (prev === 'mission' ? null : 'mission'))}
                    className={`group p-6 sm:p-7 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer select-none bg-white dark:bg-[#141414] border ${
                      isMissionActive
                        ? 'border-[#00A6FF]/60 dark:border-[#00A6FF]/70 shadow-[0_12px_32px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.52),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#00A6FF]/40'
                    }`}
                  >
                    {/* Top Subtle Inner Highlight Line for Layered Depth */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                    {/* Left Brand Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#00A6FF] to-[#00E5FF] transition-all duration-350 ${
                        isMissionActive
                          ? 'w-[4px] shadow-[0_0_10px_rgba(0,166,255,0.6)]'
                          : 'w-[3px]'
                      }`}
                    />

                    {/* Faint Internal Blue Decorative Arc */}
                    <svg
                      className={`absolute -right-3 -bottom-3 w-36 h-36 pointer-events-none transition-all duration-500 overflow-visible ${
                        isMissionActive ? 'opacity-25' : 'opacity-10 dark:opacity-15'
                      }`}
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 15 90 C 35 25, 75 25, 95 65"
                        stroke="#00A6FF"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        fill="none"
                      />
                    </svg>

                    {/* Header Row: Visual Anchor 01 Badge + Accent Line + Title + Badge */}
                    <div className="flex items-center justify-between mb-3.5 relative z-10">
                      <div className="flex items-center gap-3">
                        {/* 01 Number Container */}
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border border-[#00A6FF]/30 shadow-[0_0_8px_rgba(0,166,255,0.15)]">
                          {/* Animated Circular Outline SVG */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[1px]" viewBox="0 0 28 28">
                            <circle
                              cx="14"
                              cy="14"
                              r="11.5"
                              fill="none"
                              stroke="#00A6FF"
                              strokeWidth="1"
                              strokeOpacity="0.25"
                            />
                            <circle
                              cx="14"
                              cy="14"
                              r="11.5"
                              fill="none"
                              stroke="#00A6FF"
                              strokeWidth="1.5"
                              strokeDasharray="72.2"
                              strokeDashoffset={isMissionActive ? 0 : 72.2}
                              className="transition-all duration-500 ease-out"
                            />
                          </svg>
                          <span
                            className={`font-mono text-xs font-bold text-[#00A6FF] transition-all duration-350 ${
                              isMissionActive ? 'scale-[1.10] -rotate-3' : 'scale-100 rotate-0'
                            }`}
                          >
                            01
                          </span>
                        </div>

                        {/* Visible Default Accent Line (36px -> 76px) + Traveling Signal Dot on Hover */}
                        <div
                          className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-[#00A6FF]/20"
                          style={{ width: isMissionActive ? '76px' : '36px' }}
                        >
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A6FF] to-[#00E5FF]" />
                          {isMissionActive && !prefersReducedMotion && (
                            <motion.div
                              initial={{ left: '0%', opacity: 0 }}
                              animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                              className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#00A6FF]"
                            />
                          )}
                        </div>

                        {/* Heading Shift */}
                        <span
                          className={`font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-350 ${
                            isMissionActive ? 'translate-x-1 text-[#00A6FF]' : 'text-text-primary'
                          }`}
                        >
                          OUR MISSION
                        </span>
                      </div>

                      {/* Strategic Purpose Label */}
                      <span
                        className={`text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded border transition-all duration-350 ${
                          isMissionActive
                            ? 'bg-[#00A6FF]/15 text-text-primary border-[#00A6FF]/40'
                            : 'text-text-muted bg-surface/70 dark:bg-white/5 border-border/60 dark:border-white/5'
                        }`}
                      >
                        STRATEGIC PURPOSE
                      </span>
                    </div>

                    {/* Mission Paragraph (Rises 2px on hover) */}
                    <p
                      className={`text-[15px] sm:text-[16px] text-text-primary leading-[1.65] font-normal relative z-10 transition-transform duration-350 ${
                        isMissionActive ? '-translate-y-[2px]' : 'translate-y-0'
                      }`}
                    >
                      To empower B2B SaaS and technology enterprises with predictable, high-converting demand generation engines and verified decision-maker intelligence that consistently turn market opportunity into measurable revenue outcomes.
                    </p>
                  </motion.div>
                )
              })()}

              {/* Vision Block (600ms entrance + visible black/dark elevation shadow + subtle hover) */}
              {(() => {
                const isVisionActive = hoveredStrategicBlock === 'vision'
                const isVisionMuted = hoveredStrategicBlock === 'mission'

                return (
                  <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                    animate={
                      isIntelligenceInView
                        ? {
                            opacity: isVisionMuted ? 0.75 : 1,
                            y: isVisionActive && !prefersReducedMotion ? -3 : 0,
                          }
                        : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }
                    }
                    transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.60, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHoveredStrategicBlock('vision')}
                    onMouseLeave={() => setHoveredStrategicBlock(null)}
                    onClick={() => setHoveredStrategicBlock((prev) => (prev === 'vision' ? null : 'vision'))}
                    className={`group p-6 sm:p-7 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer select-none bg-white dark:bg-[#141414] border ${
                      isVisionActive
                        ? 'border-[#72D669]/60 dark:border-[#72D669]/70 shadow-[0_12px_32px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.52),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#72D669]/40'
                    }`}
                  >
                    {/* Top Subtle Inner Highlight Line for Layered Depth */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />

                    {/* Left Brand Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#72D669] to-[#FFA600] transition-all duration-350 ${
                        isVisionActive
                          ? 'w-[4px] shadow-[0_0_10px_rgba(114,214,105,0.6)]'
                          : 'w-[3px]'
                      }`}
                    />

                    {/* Faint Internal Green/Amber Decorative Arc */}
                    <svg
                      className={`absolute -right-3 -bottom-3 w-36 h-36 pointer-events-none transition-all duration-500 overflow-visible ${
                        isVisionActive ? 'opacity-25' : 'opacity-10 dark:opacity-15'
                      }`}
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 10 90 C 40 20, 80 20, 95 60"
                        stroke="#72D669"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        fill="none"
                      />
                    </svg>

                    {/* Header Row: Visual Anchor 02 Badge + Accent Line + Title + Badge */}
                    <div className="flex items-center justify-between mb-3.5 relative z-10">
                      <div className="flex items-center gap-3">
                        {/* 02 Number Container */}
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#72D669]/10 dark:bg-[#72D669]/15 border border-[#72D669]/30 shadow-[0_0_8px_rgba(114,214,105,0.15)]">
                          {/* Animated Circular Outline SVG */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[1px]" viewBox="0 0 28 28">
                            <circle
                              cx="14"
                              cy="14"
                              r="11.5"
                              fill="none"
                              stroke="#72D669"
                              strokeWidth="1"
                              strokeOpacity="0.25"
                            />
                            <circle
                              cx="14"
                              cy="14"
                              r="11.5"
                              fill="none"
                              stroke="#72D669"
                              strokeWidth="1.5"
                              strokeDasharray="72.2"
                              strokeDashoffset={isVisionActive ? 0 : 72.2}
                              className="transition-all duration-500 ease-out"
                            />
                          </svg>
                          <span
                            className={`font-mono text-xs font-bold text-[#72D669] transition-all duration-350 ${
                              isVisionActive ? 'scale-[1.10] rotate-3' : 'scale-100 rotate-0'
                            }`}
                          >
                            02
                          </span>
                        </div>

                        {/* Visible Default Accent Line (36px -> 76px) + Traveling Signal Dot on Hover */}
                        <div
                          className="relative h-[2px] rounded-full transition-all duration-350 overflow-visible bg-[#72D669]/20"
                          style={{ width: isVisionActive ? '76px' : '36px' }}
                        >
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#72D669] to-[#FFA600]" />
                          {isVisionActive && !prefersReducedMotion && (
                            <motion.div
                              initial={{ left: '0%', opacity: 0 }}
                              animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                              className="absolute -top-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#72D669]"
                            />
                          )}
                        </div>

                        {/* Heading Shift */}
                        <span
                          className={`font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-350 ${
                            isVisionActive ? 'translate-x-1 text-[#72D669]' : 'text-text-primary'
                          }`}
                        >
                          OUR VISION
                        </span>
                      </div>

                      {/* North Star Label */}
                      <span
                        className={`text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded border transition-all duration-350 ${
                          isVisionActive
                            ? 'bg-[#72D669]/15 text-text-primary border-[#72D669]/40'
                            : 'text-text-muted bg-surface/70 dark:bg-white/5 border-border/60 dark:border-white/5'
                        }`}
                      >
                        NORTH STAR
                      </span>
                    </div>

                    {/* Vision Paragraph (Rises 2px on hover) */}
                    <p
                      className={`text-[15px] sm:text-[16px] text-text-primary leading-[1.65] font-normal relative z-10 transition-transform duration-350 ${
                        isVisionActive ? '-translate-y-[2px]' : 'translate-y-0'
                      }`}
                    >
                      To stand as the world's most dependable B2B growth architecture partner, trusted by global category leaders to pioneer intelligent, data-driven revenue systems across international markets.
                    </p>
                  </motion.div>
                )
              })()}

              {/* Strategic Architecture Note */}
              <div className="flex items-center gap-3 px-3 py-1.5 text-xs font-mono text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-pulse" />
                <span>MISSION &amp; VISION POWER STRATEGY &bull; 4 PRINCIPLES POWER EXECUTION</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN: ABSTRACT INTELLIGENCE CORE (650ms) & INTERACTIVE NODES (50%) ── */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Central Intelligence Core Display (650ms scale + opacity entrance) */}
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.75 }}
                animate={isIntelligenceInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: prefersReducedMotion ? 1 : 0.75 }}
                transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 sm:p-5 rounded-2xl bg-surface/30 dark:bg-white/[0.015] border border-border/60 dark:border-white/10 relative overflow-hidden select-none"
              >
                {/* Visual SVG Network Matrix */}
                <div className="relative flex items-center justify-between gap-4 py-2">
                  
                  {/* Left Flow Nodes Indicator */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00A6FF] font-bold block">
                      NODE 01 &bull; 03
                    </span>
                    <span className="text-xs text-text-muted font-medium">Data &amp; Hygiene</span>
                  </div>

                  {/* Central Animated Geometric Intelligence Core */}
                  <motion.div
                    key={`core-reaction-${coreReactionKey}`}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Breathing Ambient Aura (Shifts color dynamically) */}
                    <div
                      className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full blur-xl transition-all duration-500 pointer-events-none opacity-35"
                      style={{
                        backgroundColor: GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color,
                        transform: !prefersReducedMotion ? 'scale(1.035)' : 'none',
                      }}
                    />

                    {/* SVG Orbit Tracks & Counter-Rotating Rings */}
                    <svg className="w-28 h-28 sm:w-32 sm:h-32 overflow-visible" viewBox="0 0 100 100">
                      {/* Base Dashed Outer Orbit Ring (750ms reveal) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        className="stroke-border/80 dark:stroke-white/15"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                      />

                      {/* 1. Outer Ring: Slow Clockwise Rotation (15s) with Traveling Signal Dot (4.5s) */}
                      {!prefersReducedMotion && (
                        <g className="animate-spin" style={{ animationDuration: '15s' }}>
                          <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                            strokeWidth="1.2"
                            strokeDasharray="24 110"
                            strokeLinecap="round"
                          />
                          {/* Glowing Signal Dot Orbiting on Outer Ring */}
                          <circle
                            cx="50"
                            cy="4"
                            r="2.8"
                            fill="#FFFFFF"
                            stroke={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                            strokeWidth="1.5"
                          />
                        </g>
                      )}

                      {/* 2. Inner Ring: Slow Counter-Clockwise Rotation (22s) */}
                      {!prefersReducedMotion && (
                        <g className="animate-spin" style={{ animationDuration: '22s', animationDirection: 'reverse' }}>
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                            strokeOpacity="0.35"
                            strokeWidth="0.8"
                            strokeDasharray="6 8"
                          />
                        </g>
                      )}

                      {/* Dynamic Core Body (850ms path/ring reveal) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="34"
                        className="fill-background stroke-border dark:stroke-white/15"
                        strokeWidth="1"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                        fillOpacity="0.10"
                        stroke={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                        strokeWidth="1.5"
                        className="transition-colors duration-500"
                      />
                    </svg>

                    {/* Central Core Monospace Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-1">
                      <span className="font-mono text-[8.5px] font-extrabold tracking-wider uppercase text-text-primary leading-tight mb-0.5">
                        TARAJ
                      </span>
                      <span
                        className="font-mono text-[7px] font-extrabold tracking-normal uppercase transition-colors duration-500 leading-tight"
                        style={{ color: GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color }}
                      >
                        INTELLIGENCE
                      </span>
                    </div>
                  </motion.div>

                  {/* Right Flow Nodes Indicator */}
                  <div className="space-y-1 text-right">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6D00] font-bold block">
                      NODE 02 &bull; 04
                    </span>
                    <span className="text-xs text-text-muted font-medium">Cadence &amp; Integration</span>
                  </div>
                </div>

                {/* SVG Progressive Connection Paths between Nodes & Core */}
                <svg className="w-full h-3 overflow-visible pointer-events-none mt-1" viewBox="0 0 400 12" fill="none">
                  {/* Progressive Path Length Drawing on Entrance (850ms) */}
                  <motion.path
                    d="M 30 6 L 160 6 M 240 6 L 370 6"
                    stroke={GROWTH_INTELLIGENCE_PRINCIPLES[hoveredPrincipleIndex !== null ? hoveredPrincipleIndex : activePrincipleIndex].color}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isIntelligenceInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.85, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>

              {/* Active Scroll Progression Bar (like HowWeWork) */}
              <div className="relative w-full px-0.5 py-1">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold tracking-wider mb-1.5 text-text-muted">
                  <span className="flex items-center gap-1.5 transition-colors duration-300" style={{ color: GROWTH_INTELLIGENCE_PRINCIPLES[activePrincipleIndex].color }}>
                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: GROWTH_INTELLIGENCE_PRINCIPLES[activePrincipleIndex].color }} />
                    <span className="uppercase">
                      STAGE 0{activePrincipleIndex + 1} &bull; {GROWTH_INTELLIGENCE_PRINCIPLES[activePrincipleIndex].shortTitle}
                    </span>
                  </span>
                  <span className="text-[10px] text-text-muted font-mono">
                    STAGE SEQUENCE &bull; {scrollProgressPct}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(0,166,255,0.7)]"
                    style={{
                      width: `${scrollProgressPct}%`,
                      backgroundColor: GROWTH_INTELLIGENCE_PRINCIPLES[activePrincipleIndex].color,
                    }}
                  />
                </div>
              </div>

              {/* 4 Connected Interactive Principle Nodes (Staggered reveal: 950ms -> 1050ms -> 1150ms -> 1250ms) */}
              <div className="space-y-2.5">
                {GROWTH_INTELLIGENCE_PRINCIPLES.map((principle, idx) => {
                  const isActive = activePrincipleIndex === idx
                  const isHovered = hoveredPrincipleIndex === idx
                  const isMuted = !isActive && hoveredPrincipleIndex === null
                    ? false
                    : !isActive && hoveredPrincipleIndex !== null && !isHovered

                  const delayOffset = 0.95 + idx * 0.10

                  return (
                    <motion.button
                      key={principle.id}
                      type="button"
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                      animate={isIntelligenceInView ? { opacity: isMuted ? 0.55 : 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : delayOffset, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => handleSelectPrinciple(idx)}
                      onMouseEnter={() => {
                        setHoveredPrincipleIndex(idx)
                        handleSelectPrinciple(idx)
                      }}
                      onMouseLeave={() => setHoveredPrincipleIndex(null)}
                      style={{
                        borderColor: isActive ? principle.color : undefined,
                        boxShadow: isActive
                          ? isDark
                            ? `0 8px 24px -6px ${principle.color}33`
                            : `0 6px 18px -4px ${principle.color}22`
                          : undefined,
                      }}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-350 group cursor-pointer focus:outline-none relative overflow-hidden ${
                        isActive
                          ? 'bg-surface/90 dark:bg-white/[0.04] -translate-y-1 scale-[1.01]'
                          : 'bg-surface/30 dark:bg-white/[0.015] border-border/60 dark:border-white/10 hover:opacity-100 hover:bg-surface/50 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Active / Hover Circular Glow Ring */}
                      {isActive && (
                        <div
                          className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                          style={{
                            backgroundColor: principle.color,
                            opacity: isDark ? 0.15 : 0.08,
                          }}
                        />
                      )}

                      {/* Active Traveling Signal Micro-Animation across bottom edge */}
                      {isActive && !prefersReducedMotion && (
                        <motion.div
                          key={`active-signal-${principle.id}`}
                          initial={{ left: '0%', width: '0%', opacity: 0 }}
                          animate={{
                            left: ['0%', '0%', '100%'],
                            width: ['0%', '40%', '0%'],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                          className="absolute bottom-0 h-[2px] pointer-events-none z-10"
                          style={{ backgroundColor: principle.color }}
                        />
                      )}

                      {/* Header Row: Number + Short Title + Status */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          {/* Node Number with subtle scale & indicator ring */}
                          <div className="relative flex items-center justify-center">
                            {isActive && !prefersReducedMotion && (
                              <span
                                className="absolute -inset-1 rounded-full animate-ping opacity-30"
                                style={{ backgroundColor: principle.color }}
                              />
                            )}
                            <span
                              className="font-mono text-xs font-bold tracking-widest transition-all duration-300"
                              style={{ color: isActive ? principle.color : undefined }}
                            >
                              {principle.num}
                            </span>
                          </div>

                          <span className="h-3 w-[1px] bg-border/60 dark:bg-white/10" />

                          {/* Principle Title (Shifts 2-3px on active/hover) */}
                          <h4
                            className={`text-sm sm:text-[15px] font-bold uppercase tracking-tight transition-all duration-300 ${
                              isActive
                                ? 'text-text-primary translate-x-1'
                                : 'text-text-secondary group-hover:text-text-primary group-hover:translate-x-0.5'
                            }`}
                          >
                            {principle.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded transition-all duration-300 ${
                              isActive
                                ? 'bg-surface dark:bg-white/10 text-text-primary border border-border/60 dark:border-white/10'
                                : 'text-text-muted opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            {principle.badge}
                          </span>
                          <ArrowRight
                            size={14}
                            className={`transition-all duration-300 ${
                              isActive ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                            }`}
                            style={{ color: isActive ? principle.color : undefined }}
                          />
                        </div>
                      </div>

                      {/* Expanding Dynamic Description with Spring/Easeout */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 4 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden mt-2.5 pt-2.5 border-t border-border/40 dark:border-white/5 relative z-10"
                          >
                            <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-normal">
                              {principle.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )
                })}
              </div>

            </div>

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
          <div className="absolute top-12 left-1/4 w-1.5 h-1.5 rounded-full bg-[#00A6FF]/40 animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 rounded-full bg-[#FF6D00]/40 animate-ping" style={{ animationDuration: '5s' }} />
        </motion.div>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ══ STEP 1–4: TOP INTRODUCTION (Staggered Scroll Power-On Entrance) ═════════════════ */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            {/* Step 02: Eyebrow (+20px upward reveal) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-xs"
            >
              <Zap size={12} className="text-[#00A6FF] animate-pulse" />
              <span>Full-Funnel Capabilities</span>
            </motion.div>

            {/* Step 03: Heading (+25px upward reveal) */}
            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-text-primary mb-4 leading-tight"
            >
              What We{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Do
              </span>
            </motion.h2>

            {/* Step 04: Description (+15px fade reveal) */}
            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              animate={isCapabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="text-text-secondary text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto"
            >
              Bespoke demand generation solutions architected for high-growth enterprise SaaS and technology organizations.
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
                    className={`w-full max-w-[460px] p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#00A6FF]/50 ${
                      isActive
                        ? 'border-[#00A6FF]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#00A6FF]/40'
                    }`}
                  >
                    {/* Top Layer Highlight */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />
                    
                    {/* Brand Left Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${
                        isActive ? 'w-[4px] shadow-[0_0_12px_rgba(0,166,255,0.6)]' : 'w-[3px]'
                      }`}
                    />

                    {/* Header Row: 01 Badge + Crosshair Icon + Category Tag */}
                    <div className="flex items-center justify-between mb-2 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border border-[#00A6FF]/30">
                          <span className={`font-mono text-xs font-bold text-[#00A6FF] transition-all duration-350 ${isActive ? 'scale-110' : 'scale-100'}`}>
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
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 border border-[#00A6FF]/25 text-[11px] font-mono font-bold text-[#00A6FF] shadow-xs">
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
                    <p className="text-xs sm:text-[13.5px] text-text-secondary leading-relaxed font-normal relative z-10 pl-0.5">
                      {cap.description}
                    </p>

                    {/* Bottom Connecting Port Marker */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00A6FF] animate-ping' : 'bg-slate-300 dark:bg-white/20'}`} />
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
                      className={`w-full max-w-[340px] p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#72D669]/50 ${
                        isActive
                          ? 'border-[#72D669]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                          : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#72D669]/40'
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />
                      
                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${
                          isActive ? 'w-[4px] shadow-[0_0_12px_rgba(114,214,105,0.6)]' : 'w-[3px]'
                        }`}
                      />

                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-[#72D669]/10 dark:bg-[#72D669]/15 border border-[#72D669]/30">
                            <span className={`font-mono text-[11px] font-bold text-[#72D669] ${isActive ? 'scale-110' : ''}`}>
                              {cap.number}
                            </span>
                          </div>
                          <Compass size={17} className={`text-[#72D669] transition-all duration-350 ${isActive ? 'rotate-45 scale-110' : ''}`} />
                        </div>

                        <span className="text-[10px] font-mono font-semibold tracking-wider text-[#72D669] uppercase px-2 py-0.5 rounded bg-[#72D669]/10 border border-[#72D669]/20">
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

                      <h4 className="text-xs font-semibold text-primary dark:text-[#00E5FF] mb-2">
                        {cap.subtitle}
                      </h4>

                      <p className="text-xs text-text-secondary leading-relaxed font-normal relative z-10">
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
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#00E5FF] text-[10px] font-mono font-bold tracking-wider uppercase border border-primary/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00A6FF]" />
                      </span>
                      <span>Strategic Growth Engine</span>
                    </div>

                    {/* Core Heading */}
                    <div>
                      <h4 className="text-[15px] font-extrabold text-text-primary tracking-tight leading-snug mb-1">
                        Powering Predictable B2B Pipeline
                      </h4>
                      <p className="text-[11px] text-text-secondary leading-snug font-normal line-clamp-3">
                        We bridge the gap between sales and marketing by converting target account intent into highly qualified pipeline meetings.
                      </p>
                    </div>

                    {/* Step 08: Center Minimal CTA: Explore All Services with Hover Shift */}
                    <Link
                      to="/services"
                      className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-primary dark:text-[#00E5FF] transition-all duration-200 shadow-xs hover:-translate-y-[2px]"
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
                      className={`w-full max-w-[340px] p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#FF6D00]/50 ${
                        isActive
                          ? 'border-[#FF6D00]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                          : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#FF6D00]/40'
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />
                      
                      <div
                        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${
                          isActive ? 'w-[4px] shadow-[0_0_12px_rgba(255,109,0,0.6)]' : 'w-[3px]'
                        }`}
                      />

                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-[#FF6D00]/10 dark:bg-[#FF6D00]/15 border border-[#FF6D00]/30">
                            <span className={`font-mono text-[11px] font-bold text-[#FF6D00] ${isActive ? 'scale-110' : ''}`}>
                              {cap.number}
                            </span>
                          </div>
                          <Share2 size={17} className={`text-[#FF6D00] transition-all duration-350 ${isActive ? 'scale-110' : ''}`} />
                        </div>

                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF6D00]/10 border border-[#FF6D00]/20 text-[10px] font-mono font-bold text-[#FF6D00] dark:text-[#FFA600]">
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

                      <p className="text-xs text-text-secondary leading-relaxed font-normal relative z-10">
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
                    className={`w-full max-w-[460px] p-6 rounded-2xl relative overflow-hidden transition-all duration-350 cursor-pointer bg-white dark:bg-[#141414] border focus:outline-hidden focus:ring-2 focus:ring-[#00E5FF]/50 ${
                      isActive
                        ? 'border-[#00E5FF]/70 shadow-[0_14px_35px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.55),0_4px_12px_rgba(0,0,0,0.35)]'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.30)] hover:border-[#00E5FF]/40'
                    }`}
                  >
                    {/* Top Connecting Port Marker */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00E5FF] animate-ping' : 'bg-slate-300 dark:bg-white/20'}`} />
                    </div>

                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent pointer-events-none" />
                    
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-b ${cap.accentGrad} transition-all duration-350 ${
                        isActive ? 'w-[4px] shadow-[0_0_12px_rgba(0,229,255,0.6)]' : 'w-[3px]'
                      }`}
                    />

                    <div className="flex items-center justify-between mb-1.5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[#00E5FF]/10 dark:bg-[#00E5FF]/15 border border-[#00E5FF]/30">
                          <span className={`font-mono text-xs font-bold text-[#00E5FF] transition-all duration-350 ${isActive ? 'scale-110' : ''}`}>
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

                      <span className="text-[10px] font-mono font-semibold tracking-wider text-primary dark:text-[#00E5FF] uppercase px-2.5 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20">
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

                    <p className="text-xs sm:text-[13.5px] text-text-secondary leading-relaxed font-normal relative z-10 pl-0.5">
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#00E5FF] text-[10px] font-mono font-bold tracking-wider uppercase mb-3 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-ping" />
                <span>Strategic Growth Engine</span>
              </div>

              <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-2">
                Powering Predictable B2B Pipeline
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed font-normal mb-4 max-w-md mx-auto">
                We bridge the gap between sales and marketing by converting target account intent into highly qualified pipeline meetings.
              </p>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-primary/10 dark:bg-white/5 hover:bg-primary/20 text-primary dark:text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase border border-primary/30 dark:border-white/10 transition-colors"
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
                    className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-300 bg-white dark:bg-[#141414] border ${
                      isActive
                        ? 'border-primary shadow-lg ring-1 ring-primary/30'
                        : 'border-slate-200/90 dark:border-white/[0.08] shadow-sm'
                    }`}
                  >
                    {/* Left Node Pin */}
                    <span
                      className={`absolute -left-[23px] sm:-left-[31px] top-6 w-3 h-3 rounded-full border-2 transition-all ${
                        isActive
                          ? 'bg-primary border-white dark:border-[#0E0E0E] shadow-[0_0_8px_#00A6FF]'
                          : 'bg-slate-300 dark:bg-white/20 border-white dark:border-[#0E0E0E]'
                      }`}
                    />

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {cap.number}
                        </span>
                        <h4 className="font-bold text-sm sm:text-[15px] text-text-primary">
                          {cap.title}
                        </h4>
                      </div>

                      {cap.metric && (
                        <span className="text-[10px] font-mono font-bold text-primary dark:text-[#00E5FF] px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                          {cap.metric}
                        </span>
                      )}
                    </div>

                    {cap.subtitle && (
                      <span className="text-[11px] font-semibold text-primary dark:text-[#00E5FF] block mb-1.5">
                        {cap.subtitle}
                      </span>
                    )}

                    <p className="text-xs text-text-secondary leading-relaxed font-normal">
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
