import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Info,
  Briefcase,
  Layers,
  Users,
  BookOpen,
  Mail,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  X,
  Globe2,
  ArrowUpRight,
  Sparkles,
  Plus,
  ShieldCheck,
  Zap,
  Target,
  Database
} from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import TGAnimatedLogo from './TGAnimatedLogo'

const menuItems = [
  { index: '01', name: 'Home', path: '/', icon: Home, desc: 'Enterprise overview & revenue pipeline', color: '#00A6FF' },
  { index: '02', name: 'About Us', path: '/about', icon: Info, desc: 'Company mission, leadership & pedigree', color: '#FF6D00' },
  { index: '03', name: 'Services', path: '/services', icon: Briefcase, desc: '13 Specialized B2B growth solutions', color: '#00E5FF', isServices: true },
  { index: '04', name: 'Careers', path: '/careers', icon: Users, desc: 'Join our revenue engineering team', color: '#A855F7' },
  { index: '05', name: 'Blogs', path: '/blog', icon: BookOpen, desc: 'Market intelligence & B2B growth insights', color: '#EAB308' },
  { index: '06', name: 'Contact Us', path: '/contact', icon: Mail, desc: 'Direct strategy consultation & RFPs', color: '#00A6FF' },
]

const SERVICES_SUBGROUPS = [
  {
    category: 'Lead Generation',
    accent: '#00A6FF',
    items: [
      { name: 'Email Marketing', path: '/b2b-email-marketing' },
      { name: 'MQL Services', path: '/mql-services' },
      { name: 'HQL Services', path: '/hql-services' },
      { name: 'BANT Services', path: '/bant-lead-generation' },
      { name: 'SQL Services', path: '/sql-services' },
      { name: 'Appointment Setting', path: '/b2b-appointment-setting' },
    ],
  },
  {
    category: 'Demand & ABM',
    accent: '#FF6D00',
    items: [
      { name: 'Lead Nurturing', path: '/lead-nurturing' },
      { name: 'Content Syndication', path: '/content-syndication' },
      { name: 'Account-Based Marketing', path: '/abm' },
      { name: 'Webinar Services', path: '/webinar-services' },
      { name: 'Demand Generation', path: '/demand-generation' },
    ],
  },
  {
    category: 'Data & Operations',
    accent: '#10B981',
    items: [
      { name: 'B2B List Building', path: '/b2b-list-building' },
      { name: 'Database Cleansing', path: '/database-cleansing' },
    ],
  },
]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.1 } },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1], // Ultra smooth cubic-bezier
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export const FullscreenMenu = ({ isOpen, onClose, logoUrl, logoText, navLinks = [] }) => {
  const [hovered, setHovered] = useState(null)
  const [isServicesExpanded, setIsServicesExpanded] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const knownItemsMeta = {
    '/': { icon: Home, desc: 'Enterprise overview & revenue pipeline', color: '#00A6FF' },
    '/about': { icon: Info, desc: 'Company mission, leadership & pedigree', color: '#FF6D00' },
    '/services': { icon: Briefcase, desc: '13 Specialized B2B growth solutions', color: '#00E5FF', isServices: true },
    '/careers': { icon: Users, desc: 'Join our revenue engineering team', color: '#A855F7' },
    '/blog': { icon: BookOpen, desc: 'Market intelligence & B2B growth insights', color: '#EAB308' },
    '/contact': { icon: Mail, desc: 'Direct strategy consultation & RFPs', color: '#00A6FF' },
  }

  const effectiveMenuItems = (navLinks && navLinks.length > 0)
    ? navLinks.map((link, idx) => {
        const meta = knownItemsMeta[link.path] || {}
        const isServices = link.path === '/services' || link.name?.toLowerCase() === 'services'
        const isExternal =
          link.path?.startsWith('http://') ||
          link.path?.startsWith('https://') ||
          link.path?.startsWith('mailto:') ||
          link.path?.startsWith('tel:')
        return {
          index: String(idx + 1).padStart(2, '0'),
          name: link.name,
          path: link.path,
          icon: meta.icon || Sparkles,
          desc: meta.desc || `${link.name} Navigation`,
          color: meta.color || '#00A6FF',
          isServices,
          isExternal
        }
      })
    : menuItems

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Frosted Blur */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[70] bg-slate-950/60 dark:bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* ── ENTERPRISE ANIMATED DRAWER ────────────────────────────── */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] z-[80] flex flex-col bg-white/98 dark:bg-[#080C14]/98 border-l border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-3xl text-slate-900 dark:text-white overflow-hidden"
          >
            {/* Ambient Background Energy Flare */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/10 dark:bg-[#00A6FF]/12 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cta/10 dark:bg-[#FF6D00]/10 blur-3xl pointer-events-none" />

            {/* ── HEADER: BRAND + GLOBAL PORTAL ───────────────────────── */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-100 dark:border-white/10 flex-shrink-0 bg-slate-50/60 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Link to="/" onClick={onClose} className="group flex items-center gap-2.5 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-0 ring-0">
                  <TGAnimatedLogo
                    logoUrl={logoUrl}
                    alt={logoText || "Taraj Global"}
                  />
                  {logoText && (
                    <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white font-display">
                      {logoText}
                    </span>
                  )}
                </Link>
                <div className="pl-3 border-l border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Global Portal
                  </span>
                </div>
              </div>

              {/* Animated Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer shadow-2xs focus:outline-none"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={2.2} />
              </motion.button>
            </div>

            {/* ── DYNAMIC ANIMATED NAVIGATION ROWS ──────────────────────── */}
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 space-y-2 custom-scrollbar"
            >
              {effectiveMenuItems.map((item) => {
                const Icon = item.icon
                const isHovered = hovered === item.path

                if (item.isServices) {
                  return (
                    <motion.div key={item.path} variants={itemVariants} className="space-y-1.5">
                      <div
                        className={`p-3 sm:p-3.5 min-h-[48px] rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer relative overflow-hidden bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/5 hover:border-primary/40 dark:hover:border-[#00E5FF]/30 shadow-2xs`}
                        onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                      >
                        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                          <span className="font-mono text-[11px] font-bold shrink-0 text-slate-400 dark:text-slate-500">
                            {item.index}
                          </span>

                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                            <Icon size={16} strokeWidth={2} />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-[15px] font-bold tracking-tight leading-snug text-slate-900 dark:text-white">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        {/* Expand / Collapse button */}
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <Link
                            to="/services"
                            onClick={(e) => {
                              e.stopPropagation()
                              onClose()
                            }}
                            className="text-[11px] font-mono font-bold text-[#00A6FF] hover:underline px-2 py-1 rounded-md bg-sky-500/10"
                          >
                            All
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsServicesExpanded(!isServicesExpanded)
                            }}
                            aria-label="Toggle services list"
                            className="p-1 rounded-lg text-slate-400 hover:text-primary transition-transform"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${isServicesExpanded ? 'rotate-180 text-primary' : ''}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Services List */}
                      <AnimatePresence>
                        {isServicesExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4 pr-1 space-y-3 pt-1 pb-2"
                          >
                            {SERVICES_SUBGROUPS.map((group) => (
                              <div key={group.category} className="space-y-1">
                                <div className="flex items-center gap-2 px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: group.accent }}
                                  />
                                  <span>{group.category}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-1">
                                  {group.items.map((service) => (
                                    <Link
                                      key={service.path}
                                      to={service.path}
                                      onClick={onClose}
                                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-white/5 transition-colors min-h-[40px]"
                                    >
                                      <span>{service.name}</span>
                                      <ArrowRight size={12} className="opacity-40" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                if (item.isExternal) {
                  return (
                    <motion.div key={item.path || item.name} variants={itemVariants}>
                      <a
                        href={item.path}
                        target={item.path.startsWith('http') ? '_blank' : undefined}
                        rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={onClose}
                        onMouseEnter={() => setHovered(item.path)}
                        onMouseLeave={() => setHovered(null)}
                        className="block group"
                      >
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          className="p-3 sm:p-3.5 min-h-[48px] rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer relative overflow-hidden bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/5 hover:border-primary/40 dark:hover:border-[#00E5FF]/30 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] shadow-2xs"
                        >
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                            <span className="font-mono text-[11px] font-bold shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-[#00E5FF]">
                              {item.index}
                            </span>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                              <Icon size={16} strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[15px] font-bold tracking-tight leading-snug text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#00E5FF] transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="text-slate-400 group-hover:text-primary dark:group-hover:text-[#00E5FF] transition-transform duration-200 group-hover:translate-x-0.5" />
                        </motion.div>
                      </a>
                    </motion.div>
                  )
                }

                return (
                  <motion.div key={item.path || item.name} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      onMouseEnter={() => setHovered(item.path)}
                      onMouseLeave={() => setHovered(null)}
                      className="block group"
                    >
                      {({ isActive }) => (
                        <motion.div
                          whileHover={{ x: 6, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          className={`p-3 sm:p-3.5 min-h-[48px] rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer relative overflow-hidden ${
                            isActive
                              ? 'bg-gradient-to-r from-primary/15 to-primary/5 dark:from-[#00A6FF]/20 dark:to-transparent border-primary/50 dark:border-[#00E5FF]/50 shadow-sm'
                              : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-200/70 dark:border-white/5 hover:border-primary/40 dark:hover:border-[#00E5FF]/30 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] shadow-2xs'
                          }`}
                        >
                          {/* Active Left Indicator Bar */}
                          {isActive && (
                            <motion.div
                              layoutId="active-indicator"
                              className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-primary to-cta"
                            />
                          )}

                          {/* Left: Index + Icon Pod + Typography */}
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                            {/* Monospace Index */}
                            <span
                              className={`font-mono text-[11px] font-bold shrink-0 transition-colors duration-200 ${
                                isActive
                                  ? 'text-primary dark:text-[#00E5FF]'
                                  : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-[#00E5FF]'
                              }`}
                            >
                              {item.index}
                            </span>

                            {/* Animated Icon Pod */}
                            <motion.div
                              animate={{
                                scale: isHovered ? 1.12 : 1,
                                rotate: isHovered ? 6 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                                isActive
                                  ? 'bg-primary text-white border-primary shadow-xs'
                                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary'
                              }`}
                            >
                              <Icon size={16} strokeWidth={2} />
                            </motion.div>

                            {/* Title & Description Stack */}
                            <div className="min-w-0">
                              <h4
                                className={`text-[15px] font-bold tracking-tight leading-snug transition-colors duration-200 ${
                                  isActive
                                    ? 'text-primary dark:text-[#00E5FF]'
                                    : 'text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#00E5FF]'
                                }`}
                              >
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          {/* Right: Dynamic Gliding Arrow */}
                          <motion.div
                            animate={{
                              x: isHovered || isActive ? 0 : -4,
                              opacity: isHovered || isActive ? 1 : 0.4,
                              scale: isHovered ? 1.15 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className={`shrink-0 pl-2 ${
                              isActive
                                ? 'text-primary dark:text-[#00E5FF]'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-[#00E5FF]'
                            }`}
                          >
                            <ArrowRight size={15} strokeWidth={2.2} />
                          </motion.div>
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* ── ENTERPRISE FOOTER STRIP ───────────────────────────────── */}
            <div className="relative z-10 px-6 py-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-black/20 flex flex-col gap-2.5 flex-shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="font-mono text-[11px] font-bold">
                  SLA: 48–72h Outbound
                </span>
                <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Globe2 size={11} />
                  <span>Pune &amp; San Francisco</span>
                </span>
              </div>

              <Link
                to="/contact"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Book Strategy Consultation</span>
                <ArrowUpRight size={13} strokeWidth={2.2} />
              </Link>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FullscreenMenu
