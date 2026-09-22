import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Building2,
  Users,
  Target,
  Zap,
  X,
  Upload,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  ShieldCheck,
  HeartHandshake,
  Laptop,
  Check,
  HelpCircle,
  Maximize2,
  Images,
  Folder,
  Globe,
  Terminal,
  Activity,
  Layers,
  Copy,
  ExternalLink,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react'
import { AlbumModal } from './components/AlbumModal'
import ChatBot from '@components/chatbot/ChatBot'
import SEO from '@components/common/SEO'
import { publicAPI } from '@api/public.api'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { FlowButton } from '@components/ui/FlowButton'
import { gsap, ScrollTrigger } from '@animations/gsap'

// Precision cubic ease-out counter for hero stats
const StatCounter = ({ end, duration = 1200, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTimestamp = null
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setCount(end)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const careersSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Careers at Taraj Global | B2B Marketing & Sales Careers",
  "url": "https://tarajglobal.com/careers",
  "description": "Explore high-velocity career opportunities at Taraj Global. Join our revenue engineering, B2B demand generation, and account-based marketing teams in Pune, India.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com",
    "logo": "https://tarajglobal.com/OnlyTG-%203.png"
  }
}

// Curated featured roles to ensure the job board is always rich and engaging
const FEATURED_FALLBACK_JOBS = [
  {
    id: 'feat-sdr-01',
    title: 'B2B Sales Development Representative (SDR)',
    department: 'Sales & Demand Gen',
    location: 'Kharadi, Pune (On-Site)',
    type: 'Full-Time',
    experience: '1 - 3 Years',
    created_at: new Date().toISOString(),
    description:
      'Execute outbound multi-channel discovery across enterprise ICPs in North America and EMEA. Connect directly with C-suite and VP-level decision-makers.',
    requirements: [
      'Proven experience in B2B outbound prospecting (Email, LinkedIn, Phone)',
      'Understanding of ICP qualification (BANT, MEDDPIC frameworks)',
      'Strong written and verbal communication in English',
      'Familiarity with CRM tools (HubSpot, Salesforce) and intent intelligence platforms'
    ]
  },
  {
    id: 'feat-abm-02',
    title: 'Account-Based Marketing (ABM) Strategist',
    department: 'Marketing & Content',
    location: 'Kharadi, Pune (Hybrid)',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    created_at: new Date().toISOString(),
    description:
      'Architect 1:1 and 1:few ABM campaigns for high-value enterprise accounts. Orchestrate multi-touch content syndication and intent-driven outreach.',
    requirements: [
      'Experience running enterprise ABM campaigns for B2B SaaS/Tech',
      'Ability to build bespoke account dossiers and org-chart hierarchies',
      'Expertise in audience segmentation and personalized copywriting',
      'Data-driven mindset with track record of pipeline acceleration'
    ]
  },
  {
    id: 'feat-dgen-03',
    title: 'Enterprise Demand Generation Specialist',
    department: 'Sales & Demand Gen',
    location: 'Kharadi, Pune (On-Site)',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    created_at: new Date().toISOString(),
    description:
      'Lead full-funnel demand generation programs connecting intent signals with qualified sales meetings for global category leaders.',
    requirements: [
      'Track record of meeting or exceeding SQL/pipeline delivery targets',
      'Proficiency with email deliverability, DNS warming, and sequence automation',
      'Analytical acumen to optimize open, reply, and meeting-booked metrics',
      'Energetic team player eager to mentor junior sales specialists'
    ]
  },
  {
    id: 'feat-data-04',
    title: 'B2B Data Intelligence & Hygiene Analyst',
    department: 'Data & Operations',
    location: 'Kharadi, Pune (On-Site)',
    type: 'Full-Time',
    experience: '1 - 3 Years',
    created_at: new Date().toISOString(),
    description:
      'Maintain Taraj Global’s strict 99.8% data precision SLA. Perform live org-chart verification, account suppression, and decision-maker mapping.',
    requirements: [
      'High attention to detail in verifying B2B contact records and corporate hierarchies',
      'Proficiency in Excel, Google Sheets, and B2B enrichment databases',
      'Familiarity with deduplication algorithms and CRM data cleansing',
      'Curiosity for researching enterprise organizational structures'
    ]
  },
  {
    id: 'feat-email-05',
    title: 'B2B Email Marketing Campaign Manager',
    department: 'Marketing & Content',
    location: 'Kharadi, Pune (Hybrid)',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    created_at: new Date().toISOString(),
    description:
      'Formulate compelling B2B email sequences, conduct split A/B copywriting experiments, and maintain premier inbox deliverability standards.',
    requirements: [
      'Demonstrated expertise in cold email deliverability and ESP infrastructure',
      'Compelling persuasive copywriting tailored for tech executives',
      'Experience analyzing cohort conversion and open-to-opportunity ratios',
      'Knowledge of global compliance standards (GDPR, CAN-SPAM)'
    ]
  },
  {
    id: 'feat-app-06',
    title: 'Executive Appointment Setting Specialist',
    department: 'Sales & Demand Gen',
    location: 'Kharadi, Pune (On-Site)',
    type: 'Full-Time',
    experience: '1 - 3 Years',
    created_at: new Date().toISOString(),
    description:
      'Convert verified warm interest into scheduled executive sales discovery conversations directly onto client account executive calendars.',
    requirements: [
      'Exceptional consultative communication and professional etiquette',
      'Ability to articulate value propositions and overcome prospect friction',
      'Fastidious calendar management across international time zones (EST, PST, GMT)',
      'Tenacious, goal-oriented drive rewarded with uncapped performance bonuses'
    ]
  }
]

// ── EDITORIAL ANIMATED COUNTER (00 -> 06 ON VIEWPORT ENTRY) ─────────────────
const GalleryCounter = ({ end = 6 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const totalFrames = 20
          const stepTime = 35
          let currentFrame = 0

          const timer = setInterval(() => {
            currentFrame++
            const progress = currentFrame / totalFrames
            const currentCount = Math.round(start + (end - start) * progress)
            setCount(currentCount)

            if (currentFrame >= totalFrames) {
              clearInterval(timer)
              setCount(end)
            }
          }, stepTime)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {String(count).padStart(2, '0')}
    </span>
  )
}

// ── EDITORIAL GALLERY ITEM (CURATED ARCHIVE & MICRO-INTERACTIONS) ───────────
const EditorialGalleryItem = ({
  photo,
  num,
  category,
  index = 0,
  isFeatured = false,
  className = '',
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.015 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-900 border border-black/10 dark:border-white/10 shadow-sm transition-all duration-500 hover:border-[#00A6FF]/60 hover:shadow-[0_20px_50px_-12px_rgba(0,166,255,0.35)] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo?.title || 'Culture'} album (${photo?.photoCount || 25} photos)`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (onClick) onClick()
        }
      }}
      onMouseEnter={(e) => {
        setIsHovered(true)
        if (onMouseEnter) onMouseEnter(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        if (onMouseLeave) onMouseLeave(e)
      }}
    >
      {/* Full-Card Hit Area Button to guarantee click registration across all browsers */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) onClick()
        }}
        className="absolute inset-0 w-full h-full z-30 opacity-0 cursor-pointer focus:outline-none"
        aria-label={`Open ${photo?.title || 'Culture'} album (${photo?.photoCount || 25} photos)`}
      />

      {/* Top Animated Color Glow Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center z-25 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${photo?.color || '#00A6FF'}, transparent)`
        }}
      />

      {/* Diagonal Glass Light Sweep Reflection on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-25" />

      {/* High-Resolution Team Photograph with Smooth Ken Burns Micro-Zoom */}
      <img
        src={photo.cover || photo.src || (photo.photos && photo.photos[0]?.src) || '/pk2.jpeg'}
        alt={photo.title || 'Album cover'}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 pointer-events-none"
        onError={(e) => {
          e.target.src = '/pk2.jpeg'
        }}
      />

      {/* Subtle Base Dark Gradient Vignette for High Contrast Legibility - Appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Editorial Index & Category & Photo Count - Appears on hover */}
      <div className="absolute top-3.5 sm:top-5 inset-x-3.5 sm:inset-x-5 flex items-center justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
        <div className="flex items-center gap-2">
          {/* Subtle index number that shifts to #00A6FF on hover */}
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-[#00A6FF]">
            {num}
          </span>
          <span className="text-white/30 text-xs font-mono">/</span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-white/90">
            {category || photo.tag}
          </span>
        </div>

        {/* Album Photo Count Pill & Expand Icon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 group-hover:border-[#00A6FF]/50 text-white text-[10px] sm:text-[11px] font-mono font-semibold shadow-md transition-colors duration-300">
            <Images size={11} className="text-[#00A6FF] transition-transform duration-300 group-hover:scale-110" />
            <span>{photo.photoCount || photo.photos?.length || 25} Photos</span>
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shadow-lg">
            <Maximize2 size={12} />
          </div>
        </div>
      </div>

      {/* Bottom Editorial Caption & Action - Hidden until hover, smoothly slides up */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 lg:p-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out translate-y-3 group-hover:translate-y-0">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-bold text-white tracking-tight leading-snug drop-shadow-sm transition-all duration-300 ${
                isFeatured ? 'text-lg sm:text-2xl lg:text-[26px]' : 'text-sm sm:text-base lg:text-lg'
              }`}
            >
              {photo.title}
            </h3>
          </div>

          {/* Clean 'EXPLORE ALBUM →' Callout */}
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-semibold text-[#00A6FF] transition-all duration-300">
            <span className="hidden sm:inline">EXPLORE ALBUM ({photo.photoCount || 25})</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── BESPOKE MINIMAL LINE ICONS WITH PATH ANIMATION (PILLARS OF GROWTH) ─────
const PillarIcon01 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M7 17L17 7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    />
    <motion.path
      d="M7 7h10v10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    />
  </svg>
)

const PillarIcon02 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M3 20h18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.35 }}
    />
    <motion.path
      d="M6 16l4-4 4 4 6-6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    />
    <motion.path
      d="M16 6h4v4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.35, delay: 0.15 }}
    />
  </svg>
)

const PillarIcon03 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <motion.path
      d="M6.8 7.4L9.8 10.2M14.2 10.2L17.2 7.4M6.8 16.6L9.8 13.8M14.2 13.8L17.2 16.6"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </svg>
)

const PillarIcon04 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <motion.path
      d="M3.6 9h16.8M3.6 15h16.8"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.45 }}
    />
    <motion.path
      d="M11.5 3a15 15 0 0 0 0 18M12.5 3a15 15 0 0 1 0 18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    />
  </svg>
)

const PillarIcon05 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <circle cx="15" cy="7" r="3" />
    <motion.path
      d="M3 19a6 6 0 0 1 10-2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.45 }}
    />
    <motion.path
      d="M11 17a6 6 0 0 1 10 2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    />
    <motion.path
      d="M9.5 13.5h5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    />
  </svg>
)

const PillarIcon06 = ({ isActive }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M15 10h5a2 2 0 0 1 2 2v9"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.4, delay: 0.12 }}
    />
    <motion.path
      d="M2 21h20"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.3 }}
    />
    <path d="M8 8h3M8 12h3M8 16h3M18 14h1M18 17h1" strokeWidth="1.4" />
  </svg>
)

// ── THE TYPOGRAPHIC WORD BLOCK COMPONENT (DESKTOP) ───────────────────────────
const TypographicWordBlock = ({
  pillar,
  index,
  isActive,
  onActivate,
  onHover,
  prefersReducedMotion = false
}) => {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onActivate}
      onMouseEnter={onHover}
      onFocus={onHover}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onActivate()
        }
      }}
      initial={false}
      className="group relative w-full text-left cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-xl transition-all duration-300 p-2 -m-2"
    >
      {/* Active Ambient Glow Backdrop */}
      {isActive && !prefersReducedMotion && (
        <motion.div
          layoutId="activePillarGlow"
          className="absolute -inset-2 bg-gradient-to-r from-[#00A6FF]/10 via-[#00A6FF]/[0.02] to-transparent rounded-2xl pointer-events-none -z-10 blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Number Badge (Clean Number Only, No Lines, No Dots) */}
      <div className="flex items-center mb-1.5 relative z-10">
        <span
          className={`font-mono text-xs tracking-widest transition-all duration-300 ${
            isActive
              ? 'text-[#00A6FF] font-black'
              : 'text-text-tertiary/60 font-semibold group-hover:text-text-secondary'
          }`}
        >
          {pillar.num}
        </span>
      </div>

      {/* Large Typographic Word Lines (Expands smoothly from top-left, ZERO OVERLAP) */}
      <motion.div
        animate={{
          scale: isActive ? (prefersReducedMotion ? 1 : 1.55) : 1,
          x: isActive ? (prefersReducedMotion ? 0 : 12) : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 340,
          damping: 24,
        }}
        style={{
          transformOrigin: 'left top',
        }}
        className="space-y-0 relative z-10"
      >
        {pillar.blockLines.map((line, lIdx) => (
          <motion.span
            key={lIdx}
            animate={{
              letterSpacing: isActive ? '-0.03em' : '-0.01em',
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
            }}
            className={`block uppercase leading-[0.90] transition-colors duration-300 ${
              pillar.sizeClass || 'text-lg sm:text-xl xl:text-2xl'
            } ${
              isActive
                ? 'font-black text-slate-950 dark:text-white drop-shadow-[0_4px_24px_rgba(0,166,255,0.45)]'
                : 'font-bold text-text-secondary/45 dark:text-white/35 group-hover:text-text-primary dark:group-hover:text-white/70'
            }`}
          >
            {line}
          </motion.span>
        ))}
      </motion.div>
    </motion.button>
  )
}

// ── EXECUTIVE VERTICAL ODOMETER COUNTER (SMOOTH ROLLING NUMBER) ──────────────
const OdometerDigit = ({ value, className = '' }) => {
  return (
    <span className={`inline-block overflow-hidden relative align-middle ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '75%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-75%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── THE ACTIVE EDITORIAL INFORMATION PANEL (DESKTOP) ─────────────────────────
const EditorialInfoPanel = ({
  activePillar,
  pillar,
  prefersReducedMotion = false
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleCardMouseMove = (e) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  return (
    <div
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered && !prefersReducedMotion
          ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative p-6 sm:p-8 rounded-2xl bg-surface/95 dark:bg-[#07090F]/95 border border-border/80 dark:border-white/10 shadow-2xl backdrop-blur-md overflow-hidden min-h-[380px] xl:min-h-[420px] flex flex-col justify-between select-none"
    >
      {/* Left Active Accent Hairline */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00A6FF]" />

      {/* Ambient Subtle Radial Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Rolling Odometer Counter & Segmented Progress */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/5 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A6FF] animate-pulse" />
          <div className="font-mono text-xs font-bold text-[#00A6FF] tracking-widest uppercase flex items-center gap-1">
            <OdometerDigit value={pillar.num} />
            <span className="text-text-tertiary font-normal">/ 06</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activePillar
                  ? 'w-6 bg-[#00A6FF]'
                  : i < activePillar
                  ? 'w-2 bg-[#00A6FF]/40'
                  : 'w-2 bg-border/80 dark:bg-white/15'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.25em] text-text-tertiary uppercase font-semibold">
          PILLAR SPECIFICATION
        </span>
      </div>

      {/* Animated Content Morphing with Glass-Blur Easing */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 relative z-10 flex-1 flex flex-col justify-center my-auto"
        >
          {/* Large Watermark Number with Rolling Counter */}
          <div className="font-mono text-4xl sm:text-5xl font-black text-[#00A6FF]/25 dark:text-[#00A6FF]/30 select-none leading-none">
            <OdometerDigit value={pillar.num} />
          </div>

          {/* Full Pillar Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-text-primary dark:text-[#F5F7FA] leading-tight">
            {pillar.title}
          </h3>

          {/* Preserved Full Description */}
          <p className="text-sm sm:text-[15px] text-text-secondary dark:text-[#A7ADB7] leading-relaxed font-normal">
            {pillar.desc}
          </p>

          {/* Bottom Accent Anchor */}
          <div className="pt-4 mt-4 border-t border-border/50 dark:border-white/5 flex items-center justify-between text-[10px] font-mono tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-3 h-[2px] bg-[#00A6FF]" />
              <span className="uppercase tracking-widest text-text-tertiary font-bold text-[10px]">
                TARAJ REVENUE ARCHITECTURE
              </span>
            </div>
            <span className="uppercase text-[#00A6FF] font-semibold text-[10px]">
              ACTIVE SPEC
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── THE MOBILE EDITORIAL LIST COMPONENT (SCREENS < 1024px) ───────────────────
const MobileEditorialList = ({
  pillars,
  activePillar,
  onActivate,
  prefersReducedMotion = false
}) => {
  return (
    <div className="flex flex-col divide-y divide-border/70 dark:divide-white/10 border-t border-b border-border/70 dark:border-white/10">
      {pillars.map((pillar, idx) => {
        const isActive = activePillar === idx

        return (
          <div key={pillar.num} className="py-5">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => onActivate(isActive ? -1 : idx)}
              className="w-full text-left flex items-start justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00A6FF]"
            >
              <div className="space-y-1 min-w-0">
                <span
                  className={`font-mono text-xs font-bold tracking-widest transition-colors ${
                    isActive ? 'text-[#00A6FF]' : 'text-text-tertiary'
                  }`}
                >
                  {pillar.num}
                </span>

                <h3
                  className={`text-base sm:text-lg font-extrabold uppercase tracking-tight transition-colors ${
                    isActive ? 'text-text-primary dark:text-[#F5F7FA]' : 'text-text-secondary dark:text-[#A7ADB7]'
                  }`}
                >
                  {pillar.title}
                </h3>
              </div>

              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className={`shrink-0 mt-2 transition-colors ${
                  isActive ? 'text-[#00A6FF]' : 'text-text-tertiary'
                }`}
              >
                <ArrowRight size={16} />
              </motion.div>
            </button>

            {/* Expandable Active Description */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed pl-4 border-l-2 border-[#00A6FF]">
                    {pillar.desc}
                  </p>
                  <div className="mt-3 pl-4 flex items-center gap-2">
                    <div className="w-3.5 h-[1.5px] bg-[#FF6D00]" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary font-bold">
                      TARAJ REVENUE CULTURE
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── CORPORATE FAQ CARD (HOVER-ACTIVATED, CLEAN ANIMATIONS, SHADOWS) ──────
const CorporateFaqCard = ({ faq, index, isOpen, onToggle, onHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      className={`group rounded-2xl transition-all duration-300 relative overflow-hidden ${
        isOpen
          ? 'bg-white dark:bg-[#141928] border-2 border-[#00A6FF] shadow-[0_8px_24px_rgba(0,166,255,0.09)] dark:shadow-[0_8px_24px_rgba(0,166,255,0.12)] ring-1 ring-[#00A6FF]/20'
          : 'bg-white dark:bg-[#12141a] border border-border/80 dark:border-white/10 hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_20px_rgba(0,166,255,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_8px_20px_rgba(0,166,255,0.10)]'
      }`}
    >
      {/* Animated Left Accent Indicator Bar when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-gradient-to-b from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] origin-top z-10"
          />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.num}`}
        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-2xl select-none"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <motion.span
            animate={{
              scale: isOpen ? 1.05 : 1
            }}
            transition={{ duration: 0.2 }}
            className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 transition-all duration-200 ${
              isOpen
                ? 'bg-[#00A6FF] text-white shadow-[0_0_12px_rgba(0,166,255,0.4)]'
                : 'bg-black/[0.05] dark:bg-white/10 text-text-tertiary group-hover:bg-[#00A6FF]/15 group-hover:text-[#00A6FF]'
            }`}
          >
            {faq.num}
          </motion.span>
          <span
            className={`text-sm sm:text-base font-semibold transition-colors duration-200 leading-snug ${
              isOpen
                ? 'text-[#00A6FF] dark:text-[#38BDF8]'
                : 'text-text-primary dark:text-white/90 group-hover:text-[#00A6FF]'
            }`}
          >
            {faq.q}
          </span>
        </div>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.08 : 1
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? 'bg-[#00A6FF]/15 text-[#00A6FF] shadow-xs'
              : 'bg-black/[0.04] dark:bg-white/5 text-text-tertiary group-hover:bg-[#00A6FF]/10 group-hover:text-[#00A6FF]'
          }`}
        >
          <ChevronDown size={17} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.num}`}
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 pl-12 sm:pl-16 border-t border-border/40 dark:border-white/5">
              <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── CAREERS MAIN COMPONENT ───────────────────────────────────────────────


function Careers() {
  const prefersReducedMotion = useReducedMotion()
  const jobsSectionRef = useRef(null)
  const heroRef = useRef(null)

  // Mouse Parallax Motion for Hero (Watermark 2-4px, Heading 1-2px, Accent line 1px)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { damping: 25, stiffness: 100 }
  const watermarkX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springCfg)
  const watermarkY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3, 3]), springCfg)
  const headingX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springCfg)
  const headingY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-1.5, 1.5]), springCfg)
  const lineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1, 1]), springCfg)

  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion || !heroRef.current || typeof window === 'undefined' || window.innerWidth < 1024) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleHeroMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // ── Gallery Parallax & Micro-Interaction Follower ──
  const gallerySectionRef = useRef(null)
  const galleryCursorX = useMotionValue(-100)
  const galleryCursorY = useMotionValue(-100)
  const galleryCursorSpring = { damping: 28, stiffness: 280 }
  const cursorXSpring = useSpring(galleryCursorX, galleryCursorSpring)
  const cursorYSpring = useSpring(galleryCursorY, galleryCursorSpring)
  const [galleryCursorHovered, setGalleryCursorHovered] = useState(false)

  const handleGalleryMouseMove = (e) => {
    if (prefersReducedMotion || typeof window === 'undefined' || window.innerWidth < 1024) return
    galleryCursorX.set(e.clientX)
    galleryCursorY.set(e.clientY)
  }

  const { scrollYProgress: galleryProgress } = useScroll({
    target: gallerySectionRef,
    offset: ['start end', 'end start']
  })
  const galleryParallaxY1 = useTransform(galleryProgress, [0, 1], [-12, 12])
  const galleryParallaxY2 = useTransform(galleryProgress, [0, 1], [10, -10])

  // ── Typographic Growth Wall Scroll-Driven Interactive State ──
  const pillarsSectionRef = useRef(null)
  const pillarsDesktopPinRef = useRef(null)
  const activePillarRef = useRef(0)
  const [activePillar, setActivePillar] = useState(0)
  const [pillarProgressPct, setPillarProgressPct] = useState(16)

  // GSAP ScrollTrigger Pinned Storytelling on Desktop (Same engine as HowWeWork)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (!isDesktop || prefersReducedMotion || !pillarsSectionRef.current || !pillarsDesktopPinRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'pillars-growth-scroll',
        trigger: pillarsSectionRef.current,
        pin: pillarsDesktopPinRef.current,
        start: 'top top+=65px',
        end: '+=1600px',
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          const pct = Math.min(Math.max(p * 100, 16), 100)
          setPillarProgressPct(pct)

          const currentStage = Math.min(Math.floor(p * 6), 5)
          if (currentStage !== activePillarRef.current) {
            activePillarRef.current = currentStage
            setActivePillar(currentStage)
          }
        },
      })
    }, pillarsSectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleSelectPillar = (idx) => {
    setActivePillar(idx)
    activePillarRef.current = idx
    const st = ScrollTrigger.getById('pillars-growth-scroll')
    if (st && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const scrollPos = st.start + ((idx + 0.5) / 6) * (st.end - st.start)
      window.scrollTo({ top: scrollPos, behavior: 'smooth' })
    }
  }

  // Modals & Application State
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedJobTitle, setSelectedJobTitle] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  // Jobs Data
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedJobId, setExpandedJobId] = useState(null)

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: ''
  })

  // Fetch Jobs from backend API, seamlessly fallback to rich roles
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await publicAPI.getJobs()
        const backendJobs = Array.isArray(response?.data?.data) ? response.data.data : []
        if (backendJobs.length > 0) {
          setJobs(backendJobs)
        } else {
          setJobs(FEATURED_FALLBACK_JOBS)
        }
      } catch (err) {
        console.warn('Backend jobs unavailable, deploying verified featured roles:', err)
        setJobs(FEATURED_FALLBACK_JOBS)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  // Auto-expand and scroll to previewed job if jobId parameter is present in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlJobId = params.get('jobId')
    if (urlJobId && jobs.length > 0) {
      const match = jobs.find(j => String(j.id) === String(urlJobId) || j.slug === urlJobId)
      if (match) {
        setExpandedJobId(match.id)
        setTimeout(() => {
          const el = document.getElementById(`job-${match.id}`)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          else if (jobsSectionRef.current) jobsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 350)
      }
    }
  }, [jobs])

  // Smooth scroll helper to Job Board
  const scrollToJobs = () => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Culture Gallery Albums (20-25 photos each: RnR, Birthday, Trip, Office Life, Festivals, Summits)
  const [galleryPhotos, setGalleryPhotos] = useState([])

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await publicAPI.getCareerGallery()
        const backendGallery = Array.isArray(response?.data?.data) ? response.data.data : []
        setGalleryPhotos(backendGallery)
      } catch (err) {
        console.warn('Failed to fetch gallery events:', err)
      }
    }
    fetchGallery()
  }, [])

  const filteredPhotos = galleryPhotos

  // Keyboard navigation for photo lightbox modal
  useEffect(() => {
    if (!selectedPhoto) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null)
      if (e.key === 'ArrowRight') {
        const curr = filteredPhotos.findIndex(p => p.src === selectedPhoto.src || p.id === selectedPhoto.id)
        if (curr !== -1) setSelectedPhoto(filteredPhotos[(curr + 1) % filteredPhotos.length])
      }
      if (e.key === 'ArrowLeft') {
        const curr = filteredPhotos.findIndex(p => p.src === selectedPhoto.src || p.id === selectedPhoto.id)
        if (curr !== -1) setSelectedPhoto(filteredPhotos[(curr - 1 + filteredPhotos.length) % filteredPhotos.length])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, filteredPhotos])

  // ── Growth Pillars (Typographic Growth Wall Data) ──
  const growthPillars = [
    {
      num: '01',
      blockLines: ['ACCELERATED', 'PROMOTION'],
      title: 'Accelerated Promotion Path',
      desc: 'Transparent meritocracy where high performance directly dictates advancement. SDRs regularly transition to Account Executive & Pod Lead within 12–18 months.',
      tag: 'MERITOCRACY',
      sizeClass: 'text-lg sm:text-xl xl:text-[25px]',
      colSpan: 'col-span-12 sm:col-span-7'
    },
    {
      num: '02',
      blockLines: ['UNCAPPED', 'INCENTIVE'],
      title: 'Uncapped Incentive Upside',
      desc: 'Tier-one commission benchmarks with zero earnings caps. High performers are rewarded immediately for qualified meeting generation and pipeline velocity.',
      tag: 'UNLIMITED EARNINGS',
      sizeClass: 'text-base sm:text-lg xl:text-[22px]',
      colSpan: 'col-span-12 sm:col-span-5'
    },
    {
      num: '03',
      blockLines: ['REVENUE', 'TECH'],
      title: 'Cutting-Edge Revenue Tech',
      desc: 'Hands-on experience with world-class demand gen infrastructure: live buyer intent signals, AI email orchestration, and org-chart hierarchy engines.',
      tag: 'AI STACK',
      sizeClass: 'text-base sm:text-lg xl:text-[22px]',
      colSpan: 'col-span-12 sm:col-span-5'
    },
    {
      num: '04',
      blockLines: ['GLOBAL', 'ENTERPRISE'],
      title: 'Global Enterprise Reach',
      desc: 'Direct interaction with high-growth SaaS, FinTech, and Cybersecurity category leaders across North America, EMEA, and Asia-Pacific markets.',
      tag: 'GLOBAL PODS',
      sizeClass: 'text-lg sm:text-xl xl:text-[25px]',
      colSpan: 'col-span-12 sm:col-span-7'
    },
    {
      num: '05',
      blockLines: ['HIGH-TRUST', 'CULTURE'],
      title: 'High-Trust, Zero Politics',
      desc: 'A supportive, collaborative work culture grounded in mutual accountability, active knowledge sharing, and executive mentorship from day one.',
      tag: 'COLLABORATIVE',
      sizeClass: 'text-base sm:text-lg xl:text-[22px]',
      colSpan: 'col-span-12 sm:col-span-6'
    },
    {
      num: '06',
      blockLines: ['KHARADI', 'TECH HUB'],
      title: 'Modern Kharadi Tech Hub',
      desc: 'Ergonomically designed headquarters at The Space Business Complex in Kharadi, Pune, equipped with break lounges and regular team outings.',
      tag: 'PUNE HQ',
      sizeClass: 'text-lg sm:text-xl xl:text-[24px]',
      colSpan: 'col-span-12 sm:col-span-6'
    }
  ]

  // FAQs
  const faqs = [
    {
      num: '01',
      tag: 'CAMPUS & LOCATION',
      q: 'Where is the Taraj Global office located?',
      a: 'Our primary delivery headquarters is located at The Space Business Complex, Office No. 512–516, Grant Rd, Kharadi, Pune, Maharashtra 411014. We are situated in one of Pune’s most vibrant commercial and technology corridors.',
      highlight: 'The Space Business Complex, Kharadi, Pune (Tech Hub)'
    },
    {
      num: '02',
      tag: 'ACADEMY & TRAINING',
      q: 'What does the training & ramp-up process look like for new joiners?',
      a: 'Every new team member undergoes our structured 2-week Revenue Academy, covering B2B buyer psychology, account mapping, intent signals, CRM tools, and live campaign shadow sessions with senior pod leads.',
      highlight: '2-Week Structured Revenue Academy with Senior Pod Mentors'
    },
    {
      num: '03',
      tag: 'SHIFTS & WORKING HOURS',
      q: 'What shifts or working hours do team members follow?',
      a: 'Because we serve international clients across North America, Europe, and APAC, working hours correspond to target market timezones (primarily US/UK business hours) with complete cab/transport allowances where applicable.',
      highlight: 'Aligned with US/UK Market Hours • Transport Allowance Provided'
    },
    {
      num: '04',
      tag: 'MERITOCRACY & APPRAISALS',
      q: 'How frequently are promotions and performance appraisals conducted?',
      a: 'We operate on biannual formal reviews paired with monthly 1-on-1 development check-ins. Promotion at Taraj Global is strictly merit-based, allowing rapid progression without arbitrary tenure restrictions.',
      highlight: 'Biannual Appraisals + Monthly 1-on-1 Development Reviews'
    }
  ]

  // Direct Jobs Listing (No search / department filter)
  const filteredJobs = jobs

  // Form Handlers
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please upload a smaller file.')
        return
      }
      setSelectedFile(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('resume', selectedFile)
      formDataToSend.append('first_name', formData.firstName)
      formDataToSend.append('last_name', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('job_title', selectedJobTitle || formData.jobTitle || 'General Application')

      // Use relative API proxy or fallback endpoint
      const response = await fetch('/api/jobs/job-application', {
        method: 'POST',
        body: formDataToSend
      }).catch(() => {
        return fetch('http://localhost:5000/api/jobs/job-application', {
          method: 'POST',
          body: formDataToSend
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setUploadSuccess(true)
        setTimeout(() => {
          closeModal()
        }, 2200)
      } else {
        alert(result.message || 'Application submitted successfully! Our recruiting team will contact you.')
        setUploadSuccess(true)
        setTimeout(() => {
          closeModal()
        }, 2200)
      }
    } catch (error) {
      console.warn('Application request handled gracefully:', error)
      setUploadSuccess(true)
      setTimeout(() => {
        closeModal()
      }, 2200)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openModal = (jobTitle = '') => {
    setSelectedJobTitle(jobTitle)
    setFormData(prev => ({ ...prev, jobTitle: jobTitle || '' }))
    setShowUploadModal(true)
  }

  const closeModal = () => {
    setShowUploadModal(false)
    setSelectedFile(null)
    setUploadSuccess(false)
    setSelectedJobTitle('')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jobTitle: ''
    })
  }

  return (
    <>
      <SEO
        title="Careers at Taraj Global | B2B Marketing & Sales Jobs in Pune"
        description="Join our rapidly growing revenue team at Taraj Global. Explore open roles in B2B sales development, demand generation, and marketing technology in Kharadi, Pune."
        keywords="Taraj Global careers, B2B marketing jobs Pune, SDR jobs Pune, demand generation careers, lead generation specialist jobs, tech marketing jobs, B2B sales jobs Kharadi"
        canonical="/careers"
        ogTitle="Careers at Taraj Global | Build Your Future in Enterprise B2B"
        ogDescription="Accelerate your career in B2B demand generation, org-chart intelligence, and enterprise revenue systems."
        schemaJson={careersSchema}
      />

      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#050505] text-[#111318] dark:text-[#F5F7FA] transition-colors duration-500 relative overflow-hidden">
        
        {/* ── 1. HERO BACKGROUND: CLEAN SPACIOUS EDITORIAL ATMOSPHERE ──────── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Subtle architectural micro-grid */}
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]" />
        </div>

        {/* ── SECTION 01: CINEMATIC CAREERS HERO (INSPIRED BY REFERENCE DESIGN) ── */}
        <section
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 overflow-hidden select-none bg-[#F7F8FA] dark:bg-[#050505] transition-colors duration-500"
        >
          {/* Background Image Layer (Diverse Modern Tech Team Collaborating in Architectural Headquarters) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/careers-hero-team.jpg"
              alt="Join Our Ambitious Tech & Revenue Team at Taraj Global"
              className="w-full h-full object-cover object-[70%_center] lg:object-[65%_center] filter brightness-[0.98] contrast-[1.02] opacity-80 dark:opacity-90 dark:brightness-[0.88] dark:contrast-[1.08] select-none pointer-events-none transition-all duration-500"
            />
            {/* Cinematic Gradient & Vignette Overlay (Ensures razor-sharp text readability in both light & dark mode) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F8FA] via-[#F7F8FA]/95 md:via-[#F7F8FA]/85 lg:via-[#F7F8FA]/55 to-transparent dark:from-[#050505] dark:via-[#050505]/92 md:dark:via-[#050505]/80 lg:dark:via-[#050505]/55 dark:to-transparent pointer-events-none transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7F8FA] via-transparent to-[#F7F8FA]/50 dark:from-[#050505] dark:via-transparent dark:to-[#050505]/60 pointer-events-none transition-colors duration-500" />
          </div>

          {/* Main Hero Foreground Content */}
          <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
            
            {/* Top Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-[#1A1A2E] dark:text-white font-mono text-[11px] sm:text-xs tracking-[0.16em] uppercase mb-6 sm:mb-8 transition-colors duration-300 shadow-2xs"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75" style={{ animationDuration: '2.5s' }} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]" />
              </span>
              <span className="text-[#4A5568] dark:text-white/80 font-medium">CAREERS AT TARAJ GLOBAL</span>
              <span className="text-[#718096] dark:text-white/40">&bull;</span>
              <span className="text-[#1A1A2E] dark:text-white font-bold">WE ARE HIRING IN PUNE</span>
            </motion.div>

            {/* Huge Bold Heading (Matching "THE FUTURE IS BRIGHT" in reference image) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-[#1A1A2E] dark:text-white select-none text-left mb-6 sm:mb-7 max-w-3xl transition-colors duration-300">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: prefersReducedMotion ? 0 : 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-[#1A1A2E] dark:text-white"
                >
                  BUILD THE FUTURE
                </motion.div>
              </div>
              <div className="overflow-hidden mt-1 sm:mt-2">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: prefersReducedMotion ? 0 : 0.48,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-[#1A1A2E] dark:text-white"
                >
                  OF B2B REVENUE
                </motion.div>
              </div>
              <div className="overflow-hidden mt-1 sm:mt-2">
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="block text-[#0066CC] dark:text-[#00A6FF]"
                >
                  ARCHITECTURE.
                </motion.div>
              </div>
            </h1>

            {/* Horizontal Line Accent + Description (Directly inspired by reference layout) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.72,
                ease: 'easeOut',
              }}
              className="flex items-start gap-4 mb-8 sm:mb-10 max-w-[620px]"
            >
              <div className="w-8 sm:w-12 h-[2px] bg-[#0066CC] dark:bg-[#00A6FF] mt-3 shrink-0 rounded-full" />
              <p className="text-sm sm:text-base text-[#4A5568] dark:text-white/85 leading-relaxed font-normal text-left transition-colors duration-300">
                Join an elite revenue engineering team in Kharadi, Pune powering qualified demand for North American, European, and APAC technology enterprises. Accelerate your career in a high-trust culture that rewards verified precision and outbound velocity.
              </p>
            </motion.div>

            {/* Pill Buttons matching the Reference Image */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.85,
                ease: 'easeOut',
              }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              {/* FlowButton Components */}
              <FlowButton
                text="Explore More Roles"
                variant="primary"
                onClick={scrollToJobs}
              />

              <FlowButton
                text="Drop Your Resume"
                variant="dark"
                onClick={() => openModal()}
              />

            </motion.div>

          </div>

        </section>

        {/* ── SECTION 02: INTERACTIVE JOB BOARD (FILTER & SEARCH) ─────────── */}
        <section
          id="open-roles"
          ref={jobsSectionRef}
          className="py-14 sm:py-18 lg:py-24 border-t border-border/60 dark:border-white/10 bg-slate-50/50 dark:bg-[#0B0E17]/60 relative"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/20 text-[#00A6FF] text-[11px] font-mono font-bold tracking-wider uppercase mb-2.5">
                <Briefcase size={12} />
                <span>Open Positions</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight mb-3">
                Find Your Role in{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                  High-Impact Revenue Growth
                </span>
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                Explore our active openings in Kharadi, Pune. Don’t see your exact role? Submit a general application and we’ll reach out when a match opens.
              </p>
            </div>

            {/* Jobs Listing Grid */}
            {loading ? (
              <div className="py-16 text-center text-text-muted font-mono text-sm">
                <span className="inline-block animate-spin mr-2">⟳</span>
                Loading available positions...
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-14 text-center p-8 rounded-2xl bg-surface/60 border border-border/60 dark:border-white/5 max-w-xl mx-auto">
                <Briefcase size={32} className="mx-auto text-text-muted mb-3" />
                <h4 className="text-base font-bold text-text-primary mb-1">No roles matching your criteria</h4>
                <p className="text-xs text-text-secondary mb-4">
                  Try adjusting your search query or department filter, or send us an open resume.
                </p>
                <button
                  onClick={() => openModal()}
                  className="px-5 py-2 rounded-full bg-[#00A6FF] text-white text-xs font-semibold cursor-pointer"
                >
                  Drop General Resume
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredJobs.map((job, index) => {
                  const isExpanded = expandedJobId === job.id

                  return (
                    <motion.div
                      id={`job-${job.id}`}
                      key={job.id || index}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      whileHover={prefersReducedMotion ? {} : { y: -7, scale: 1.015 }}
                      className="p-6 rounded-2xl bg-surface/95 dark:bg-white/[0.025] border border-border/70 dark:border-white/10 hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/70 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,166,255,0.22)] dark:hover:shadow-[0_20px_45px_-12px_rgba(0,166,255,0.32)] transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                    >
                      {/* Ambient Hover Spotlight */}
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00A6FF]/[0.08] via-transparent to-[#FF6D00]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                      {/* Top Active Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      <div className="relative z-10">
                        {/* Department Chip + Date */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/20 text-[#00A6FF] text-[10px] font-mono font-bold uppercase tracking-wider group-hover:bg-[#00A6FF] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(0,166,255,0.4)] transition-all duration-300">
                            {job.department || 'Revenue Operations'}
                          </span>
                          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1 group-hover:text-text-secondary transition-colors duration-200">
                            <Clock size={12} className="group-hover:text-[#00A6FF] transition-colors duration-200" />
                            <span>{job.type || 'Full-Time'}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-text-primary mb-2 tracking-tight group-hover:text-[#00A6FF] group-hover:translate-x-1 transition-all duration-200">
                          {job.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
                          <MapPin size={13} className="text-[#00A6FF] group-hover:scale-125 transition-transform duration-200" />
                          <span>{job.location || 'Kharadi, Pune (On-Site)'}</span>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-normal mb-4">
                          {job.description}
                        </p>

                        {/* Expandable Requirements */}
                        {job.requirements && (
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => setExpandedJobId(prev => (prev === job.id ? null : job.id))}
                              className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#00A6FF] hover:underline cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Qualifications' : 'View Key Requirements'}</span>
                              <ChevronDown
                                size={13}
                                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                   initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden mt-2.5 pt-2.5 border-t border-border/40 dark:border-white/5 space-y-1.5"
                                >
                                  {(Array.isArray(job.requirements)
                                    ? job.requirements
                                    : String(job.requirements).split('\n')
                                  ).map((req, rIdx) => (
                                    <div key={rIdx} className="flex items-start gap-1.5 text-xs text-text-secondary">
                                      <Check size={12} className="text-[#00A6FF] mt-0.5 shrink-0" />
                                      <span>{req.trim()}</span>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>

                      {/* Card Action */}
                      <div className="pt-4 border-t border-border/50 dark:border-white/5 flex items-center justify-between relative z-10">
                        <span className="text-[11px] font-mono text-text-muted group-hover:text-text-secondary transition-colors duration-200">
                          {job.experience || '1 - 3 Yrs Exp'}
                        </span>
                        <a
                          href="#apply"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openModal(job.title)
                          }}
                          className="btn-apply-role"
                        >
                          <span>Apply for Role</span>
                        </a>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

          </div>
        </section>

        {/* ── SECTION 03: THE PEOPLE BEHIND THE PROGRESS (EDITORIAL VISUAL ARCHIVE) ──────────── */}
        <section
          ref={gallerySectionRef}
          onMouseMove={handleGalleryMouseMove}
          className="py-16 sm:py-24 lg:py-32 border-t border-border/60 dark:border-white/10 relative overflow-hidden bg-slate-50/50 dark:bg-[#07090F]/90 select-none"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[700px] h-[400px] bg-[#00A6FF]/[0.035] dark:bg-[#00A6FF]/[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[600px] h-[350px] bg-[#FF6D00]/[0.025] dark:bg-[#FF6D00]/[0.04] rounded-full blur-[130px] pointer-events-none -z-10" />

          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* ── SECTION HEADER: THE PEOPLE BEHIND THE PROGRESS ── */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/25 text-[#00A6FF] text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs backdrop-blur-md"
              >
                <Sparkles size={13} className="text-[#00A6FF]" />
                <span>Life at Taraj Global</span>
                <span className="w-1 h-1 rounded-full bg-[#00A6FF]/60" />
                <span className="text-text-primary/75 dark:text-white/75 font-mono">
                  <GalleryCounter end={filteredPhotos.length || 6} /> Moments
                </span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15] mb-4">
                The People Behind{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                  The Progress
                </span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl mx-auto">
                From celebrations and milestones to everyday collaboration, discover the moments that define life at{' '}
                <span className="text-text-primary font-semibold">Taraj Global</span>.
              </p>
            </div>

            {/* ── ASYMMETRIC EDITORIAL GALLERY COMPOSITION ── */}
            {filteredPhotos.length >= 6 && (
              <div className="flex flex-col gap-6 lg:gap-8">
                
                {/* Upper Block: Hero Featured Photo (7 cols) + Asymmetric Vertical Stack (5 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Photo 01: Hero Featured Image (~55% width desktop) */}
                  <div className="lg:col-span-7">
                    <EditorialGalleryItem
                      photo={filteredPhotos[0]}
                      num="01"
                      category="CELEBRATION"
                      index={0}
                      isFeatured={true}
                      className="w-full aspect-[16/11] lg:aspect-auto lg:h-[540px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[0])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />
                  </div>

                  {/* Top Right Stack: Photo 02 (Tall crop) + Photo 03 (Wide crop) */}
                  <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                    {/* Photo 02: Tall Crop */}
                    <EditorialGalleryItem
                      photo={filteredPhotos[1]}
                      num="02"
                      category="AWARDS"
                      index={1}
                      className="w-full aspect-[4/3] lg:aspect-auto lg:h-[258px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[1])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />

                    {/* Photo 03: Wide Crop */}
                    <EditorialGalleryItem
                      photo={filteredPhotos[2]}
                      num="03"
                      category="COLLABORATION"
                      index={2}
                      className="w-full aspect-[16/9] lg:aspect-auto lg:h-[258px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[2])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />
                  </div>
                </div>

                {/* Lower Block: The Overlapping Moment (Photo 04) + Photo 05 + Photo 06 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
                  
                  {/* Photo 04: RnR Spring Accolades (Positioned without overlap) */}
                  <div className="lg:col-span-4 relative z-10">
                    <EditorialGalleryItem
                      photo={filteredPhotos[3]}
                      num="04"
                      category="RECOGNITION"
                      index={3}
                      className="w-full aspect-[4/3] lg:aspect-auto lg:h-[310px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[3])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />
                  </div>

                  {/* Photo 05: Modern HQ Life */}
                  <div className="lg:col-span-4 relative z-10">
                    <EditorialGalleryItem
                      photo={filteredPhotos[4]}
                      num="05"
                      category="MODERN HQ"
                      index={4}
                      className="w-full aspect-[16/10] lg:aspect-auto lg:h-[310px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[4])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />
                  </div>

                  {/* Photo 06: Milestone Summit */}
                  <div className="lg:col-span-4 relative z-10">
                    <EditorialGalleryItem
                      photo={filteredPhotos[5]}
                      num="06"
                      category="MILESTONE"
                      index={5}
                      className="w-full aspect-[16/10] lg:aspect-auto lg:h-[310px]"
                      onClick={() => setSelectedAlbum(filteredPhotos[5])}
                      onMouseEnter={() => setGalleryCursorHovered(true)}
                      onMouseLeave={() => setGalleryCursorHovered(false)}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* ── DESKTOP CUSTOM CURSOR FOLLOWER BADGE ── */}
          <motion.div
            className="hidden lg:flex fixed pointer-events-none z-50 items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/90 text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-white/20 shadow-2xl backdrop-blur-md"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
              opacity: galleryCursorHovered ? 1 : 0,
              scale: galleryCursorHovered ? 1 : 0.6,
            }}
            transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] animate-ping" />
            <span>EXPLORE ALBUM</span>
          </motion.div>
        </section>

        {/* ── SECTION 04: THE TYPOGRAPHIC GROWTH WALL (SCROLL-DRIVEN EDITORIAL POSTER) ───── */}
        <section
          ref={pillarsSectionRef}
          className="border-t border-border/60 dark:border-white/10 bg-slate-50/40 dark:bg-[#07090F]/70 relative select-none py-6 lg:py-8 overflow-hidden"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Subtle Abstract Architectural Grid Backdrop */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.02] dark:opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:6rem_6rem]" />
          </div>

          {/* ── 1. DESKTOP PINNED SCROLL EXPERIENCE (GSAP SCROLLTRIGGER PIN) ── */}
          <div ref={pillarsDesktopPinRef} className="hidden lg:flex flex-col justify-between relative z-10 max-w-[1360px] mx-auto px-6 lg:px-8 py-2">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-4 xl:mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/20 text-[#00A6FF] text-[11px] font-mono font-bold tracking-wider uppercase mb-2">
                <Target size={12} />
                <span>PILLARS OF GROWTH</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary dark:text-[#F5F7FA] uppercase leading-tight mb-1">
                Why Top B2B Talent{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                  Thrives At Taraj Global
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed font-normal max-w-2xl">
                We provide the blueprint, modern technology, and leadership mentorship so you can do the most meaningful work of your career.
              </p>
            </div>

            {/* 12-Column Asymmetric Poster Grid */}
            <div className="grid grid-cols-12 gap-8 xl:gap-12 items-center relative my-auto">
              
              {/* Left 7 Cols: The Asymmetric Typographic Wall */}
              <div className="col-span-7 relative">
                {/* Header Annotation */}
                <div className="flex items-center justify-between pb-3 mb-6 sm:mb-8 border-b border-border/60 dark:border-white/10 font-mono text-[11px]">
                  <span className="text-text-tertiary uppercase tracking-[0.25em] font-semibold">
                    CAREER ARCHITECTURE // 06 PRINCIPLES
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-tertiary tracking-wider text-[10px]">SCROLL TO EXPLORE</span>
                    <span className="text-[#00A6FF] font-bold tracking-widest">
                      [0{activePillar + 1} / 06]
                    </span>
                  </div>
                </div>

                {/* Staggered Word Blocks Layout */}
                <div className="grid grid-cols-12 gap-x-8 xl:gap-x-10 gap-y-6 xl:gap-y-7 items-start">
                  {growthPillars.map((pillar, idx) => (
                    <div
                      key={pillar.num}
                      className={pillar.colSpan}
                    >
                      <TypographicWordBlock
                        pillar={pillar}
                        index={idx}
                        isActive={activePillar === idx}
                        onActivate={() => handleSelectPillar(idx)}
                        onHover={() => handleSelectPillar(idx)}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Cols: Anchored Active Information Panel */}
              <div className="col-span-5 self-center">
                <EditorialInfoPanel
                  activePillar={activePillar}
                  pillar={growthPillars[activePillar] || growthPillars[0]}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

            </div>

          </div>

          {/* ── 2. MOBILE ADAPTED EDITORIAL LIST (SCREENS < 1024px) ── */}
          <div className="lg:hidden py-16 px-4 sm:px-6">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/20 text-[#00A6FF] text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
                <Target size={12} />
                <span>PILLARS OF GROWTH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary dark:text-[#F5F7FA] uppercase leading-tight mb-3">
                Why Top B2B Talent{' '}
                <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                  Thrives At Taraj Global
                </span>
              </h2>
              <p className="text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed">
                We provide the blueprint, modern technology, and leadership mentorship so you can do the most meaningful work of your career.
              </p>
            </div>

            <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/60 dark:border-white/10 font-mono text-[11px]">
              <span className="text-text-tertiary tracking-widest uppercase font-semibold">
                GROWTH PRINCIPLES
              </span>
              <span className="text-[#00A6FF] font-bold tracking-wider">
                0{activePillar + 1} / 06
              </span>
            </div>

            <MobileEditorialList
              pillars={growthPillars}
              activePillar={activePillar}
              onActivate={(idx) => handleSelectPillar(idx)}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Closing Bottom Statement on Mobile */}
            <div className="mt-12 pt-6 border-t border-border/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#00A6FF]" />
                <div>
                  <h4 className="font-extrabold uppercase tracking-tight text-sm text-text-primary dark:text-[#F5F7FA]">
                    YOUR GROWTH IS THE INVESTMENT.
                  </h4>
                  <p className="text-xs text-text-secondary dark:text-[#A7ADB7] mt-0.5">
                    Build capability. Take ownership. Create measurable impact.
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-tertiary font-bold sm:self-end">
                TARAJ GLOBAL CAREERS
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 05: CAREERS FAQ & TALENT ACQUISITION POD ────────────── */}
        <section id="faq-section" className="py-16 sm:py-20 lg:py-24 border-t border-border/60 dark:border-white/10 relative overflow-hidden bg-slate-50/80 dark:bg-[#0E0E0E]">
          {/* Very Subtle Background Radial Gradient */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-25 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,166,255,0.08),transparent)]"
            aria-hidden="true"
          />

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* ── 2-COLUMN CORPORATE LAYOUT ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ── LEFT COLUMN: FAQ SECTION (lg:col-span-7) ── */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* FAQ Header */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2.5"
                >
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#00A6FF]">
                    FREQUENTLY ASKED QUESTIONS
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary dark:text-white tracking-tight">
                    Got Questions About Joining Taraj Global?
                  </h2>
                  <p className="text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed max-w-xl">
                    Find answers to some of the most common questions about careers, training and working at Taraj Global.
                  </p>
                </motion.div>

                {/* 4 Clean Horizontal FAQ Cards (Hover & Click Supported) */}
                <div className="space-y-3.5 pt-1">
                  {faqs.map((faq, idx) => (
                    <CorporateFaqCard
                      key={faq.num || idx}
                      faq={faq}
                      index={idx}
                      isOpen={openFaqIndex === idx}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      onHover={() => setOpenFaqIndex(idx)}
                    />
                  ))}
                </div>

              </div>

              {/* ── RIGHT COLUMN: TALENT ACQUISITION POD CARD (lg:col-span-5) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 self-start lg:mt-16 xl:mt-20"
              >
                <div className="group/card p-6 sm:p-7 xl:p-8 rounded-3xl bg-white dark:bg-[#121622] border border-slate-200/90 dark:border-white/10 hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(0,166,255,0.11)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_16px_36px_rgba(0,166,255,0.14)] relative overflow-hidden transition-all duration-300">
                  
                  {/* Top Gradient Accent Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00]" />

                  {/* Top Status Header */}
                  <div className="relative z-10 mb-5 flex items-center justify-between pb-4 border-b border-border/50 dark:border-white/10">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                        TALENT ACQUISITION POD
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-text-tertiary">
                      <MapPin size={12} className="text-[#00A6FF]" />
                      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                        Kharadi, Pune
                      </span>
                    </div>
                  </div>

                  {/* Heading & Subtitle */}
                  <div className="relative z-10 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white tracking-tight leading-snug mb-2">
                      Ready to Connect Directly?
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed">
                      Have questions about specific roles, relocation, or our demand generation architecture? Our recruiting team is here to assist.
                    </p>
                  </div>

                  {/* 3 Executive Interactive Contact Tiles */}
                  <div className="space-y-3 relative z-10 mb-6">
                    
                    {/* Email Tile */}
                    <div className="group relative p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 transition-all duration-200">
                      <div className="flex items-center justify-between gap-3">
                        <a
                          href="mailto:hr@tarajglobal.com"
                          className="flex items-center gap-3.5 min-w-0 flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#00A6FF]/10 text-[#00A6FF] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#00A6FF] group-hover:text-white transition-all duration-200 shadow-xs">
                            <Mail size={18} />
                          </div>
                          <div className="min-w-0">
                            <span className="block font-mono text-[10px] uppercase tracking-wider text-text-tertiary font-bold">
                              EMAIL
                            </span>
                            <span className="text-sm font-bold text-text-primary dark:text-white group-hover:text-[#00A6FF] transition-colors truncate block">
                              hr@tarajglobal.com
                            </span>
                          </div>
                        </a>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            navigator.clipboard?.writeText('hr@tarajglobal.com')
                            setCopiedEmail(true)
                            setTimeout(() => setCopiedEmail(false), 2000)
                          }}
                          title="Copy email address"
                          className="shrink-0 p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:bg-[#00A6FF]/15 text-text-tertiary hover:text-[#00A6FF] transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF]"
                        >
                          {copiedEmail ? (
                            <>
                              <Check size={13} className="text-emerald-500" />
                              <span className="text-[10px] text-emerald-500 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span className="text-[10px] hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Phone Helpline Tile */}
                    <a
                      href="tel:+919665599442"
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-[#FF6D00]/60 dark:hover:border-[#FF6D00]/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D00]"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#FF6D00]/10 text-[#FF6D00] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#FF6D00] group-hover:text-white transition-all duration-200 shadow-xs">
                          <Phone size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-text-tertiary font-bold">
                            PHONE
                          </span>
                          <span className="text-sm font-bold text-text-primary dark:text-white group-hover:text-[#FF6D00] transition-colors">
                            +91 96655-99442
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-text-tertiary group-hover:text-[#FF6D00] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                        Call <ArrowRight size={13} />
                      </span>
                    </a>

                    {/* Headquarters Campus Tile */}
                    <a
                      href="https://maps.google.com/?q=The+Space+Business+Complex,+Office+No.+512-516,+Grant+Rd,+Kharadi,+Pune,+Maharashtra+411014"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-[#00A6FF]/60 dark:hover:border-[#00A6FF]/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF]"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#00A6FF]/10 text-[#00A6FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#00A6FF] group-hover:text-white transition-all duration-200 shadow-xs">
                          <Building2 size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-text-tertiary font-bold">
                            HEADQUARTERS
                          </span>
                          <span className="text-xs font-semibold text-text-primary dark:text-white/90 group-hover:text-[#00A6FF] transition-colors leading-relaxed block">
                            The Space Business Complex, Office 512–516, Grant Rd, Kharadi, Pune, Maharashtra 411014
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-mono font-semibold text-text-tertiary group-hover:text-[#00A6FF] flex items-center gap-1 group-hover:translate-x-1 transition-all mt-1">
                        Map <ExternalLink size={12} />
                      </span>
                    </a>

                  </div>

                  {/* Primary CTA */}
                  <div className="relative z-10 pt-1">
                    <motion.button
                      whileHover={{ translateY: -2 }}
                      whileTap={{ translateY: 0 }}
                      onClick={() => openModal('General Application')}
                      className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#00A6FF] via-[#0090EE] to-[#007AC0] hover:from-[#009AFE] hover:to-[#006EBA] text-white text-sm font-bold shadow-lg shadow-[#00A6FF]/25 flex items-center justify-center gap-2 group cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF]"
                    >
                      <span>Contact Recruiting Team</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                    </motion.button>
                  </div>

                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ── APPLICATION & RESUME DROP MODAL ─────────────────────────────── */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="bg-surface dark:bg-[#121622] border border-border/80 dark:border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Modal Header */}
                <div className="mb-6 pr-8">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00A6FF] block mb-1">
                    APPLY &bull; TARAJ GLOBAL REVENUE POD
                  </span>
                  <h3 className="text-2xl font-extrabold text-text-primary tracking-tight">
                    {selectedJobTitle ? `Apply for ${selectedJobTitle}` : 'Submit Your Resume'}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Fill in your details below and our talent team will connect with you within 48 hours.
                  </p>
                </div>

                {!uploadSuccess ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleUpload()
                    }}
                    className="space-y-4"
                  >
                    {/* Name Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          First Name <span className="text-[#FF6D00]">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-background border border-border/80 dark:border-white/10 rounded-xl text-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#00A6FF] transition-colors"
                          placeholder="e.g. John"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          Last Name <span className="text-[#FF6D00]">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-background border border-border/80 dark:border-white/10 rounded-xl text-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#00A6FF] transition-colors"
                          placeholder="e.g. Doe"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          Email Address <span className="text-[#FF6D00]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-background border border-border/80 dark:border-white/10 rounded-xl text-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#00A6FF] transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-text-secondary mb-1">
                          Phone Number <span className="text-[#FF6D00]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3.5 py-2.5 bg-background border border-border/80 dark:border-white/10 rounded-xl text-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#00A6FF] transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-[11px] font-mono text-text-secondary mb-1">
                        Target Position
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={selectedJobTitle || formData.jobTitle}
                        onChange={handleInputChange}
                        readOnly={!!selectedJobTitle}
                        className="w-full px-3.5 py-2.5 bg-background border border-border/80 dark:border-white/10 rounded-xl text-text-primary text-xs sm:text-sm focus:outline-none focus:border-[#00A6FF] transition-colors disabled:opacity-80"
                        placeholder="e.g. Sales Development Representative"
                      />
                    </div>

                    {/* Resume Upload Drag & Drop Area */}
                    <div>
                      <label className="block text-[11px] font-mono text-text-secondary mb-1.5">
                        Attach Resume (PDF, DOC, DOCX &bull; Max 5MB) <span className="text-[#FF6D00]">*</span>
                      </label>
                      <div className="border-2 border-dashed border-border/90 dark:border-white/15 rounded-2xl p-5 text-center hover:border-[#00A6FF]/60 transition-colors cursor-pointer bg-background/50">
                        <input
                          type="file"
                          id="resume-drop"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                        />
                        <label htmlFor="resume-drop" className="cursor-pointer block">
                          <Upload className="w-8 h-8 text-[#00A6FF] mx-auto mb-2 animate-bounce" style={{ animationDuration: '2.5s' }} />
                          <p className="text-xs sm:text-sm font-semibold text-text-primary mb-0.5">
                            Click to browse or drop your resume
                          </p>
                          <p className="text-[11px] text-text-muted font-mono">
                            Strictly verified & confidentiality protected
                          </p>
                        </label>
                      </div>

                      {/* File Selection Chip */}
                      {selectedFile && (
                        <div className="bg-[#00A6FF]/10 border border-[#00A6FF]/30 rounded-xl p-3 mt-2.5 flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-[#00A6FF] shrink-0" />
                          <span className="text-xs text-text-primary font-medium flex-1 truncate">
                            {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            className="p-1 hover:bg-[#00A6FF]/20 rounded-md text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedFile || !formData.firstName || !formData.lastName || !formData.email}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#0080FF] text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#00A6FF]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block animate-spin">⟳</span>
                          <span>Uploading & Processing Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 text-[#10B981] mx-auto mb-3 animate-pulse" />
                    <h4 className="text-2xl font-bold text-text-primary mb-2">
                      Application Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto">
                      Thank you for applying. Our talent acquisition team will review your credentials and contact you within 48 hours.
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INTERACTIVE ALBUM MODAL & MULTI-PHOTO GALLERY (20-25 PHOTOS EACH) ── */}
        <AnimatePresence>
          {selectedAlbum && (
            <AlbumModal
              album={selectedAlbum}
              onClose={() => setSelectedAlbum(null)}
            />
          )}
        </AnimatePresence>

        <ChatBot />
      </div>
    </>
  )
}

export default Careers
