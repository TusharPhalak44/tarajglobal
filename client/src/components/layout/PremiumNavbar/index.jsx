import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  LogIn,
  ChevronDown,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  Target,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  FileSpreadsheet,
  Zap,
  Database,
  ShieldCheck
} from 'lucide-react'
import { cmsAPI } from '@api'
import ThemeToggle from './ThemeToggle'
import HamburgerButton from './HamburgerButton'
import FullscreenMenu from './FullscreenMenu'
import SearchModal from './SearchModal'
import { SectionLaserDivider } from '@components/animations'
import TGAnimatedLogo from './TGAnimatedLogo'

// ── 2. SERVICES MEGA MENU DATA (PRESERVING 100% CONTENT) ───────────────────────
const SERVICES_DATA = [
  {
    title: 'Lead Generation',
    accent: '#00A6FF',
    items: [
      { name: 'Email Marketing', path: '/b2b-email-marketing', desc: 'Cold outbound and multi-touch nurture cadences', icon: Mail },
      { name: 'MQL Services', path: '/mql-services', desc: 'High-volume engaged marketing prospects', icon: TrendingUp },
      { name: 'HQL Services', path: '/hql-services', desc: 'High-quality leads with verified intent and interest', icon: ShieldCheck },
      { name: 'BANT Services', path: '/bant-lead-generation', desc: 'Budget, Authority, Need & Timeline qualified', icon: CheckCircle2 },
      { name: 'SQL Services', path: '/sql-services', desc: 'Sales-ready leads matched with active intent', icon: Target },
      { name: 'Appointment Generation', path: '/b2b-appointment-setting', desc: 'Direct confirmed meetings on sales calendars', icon: Calendar },
    ]
  },
  {
    title: 'Demand & ABM',
    accent: '#FF6D00',
    items: [
      { name: 'Lead Nurturing', path: '/lead-nurturing', desc: 'Multi-stage account engagement cadences', icon: TrendingUp },
      { name: 'Content Syndication', path: '/content-syndication', desc: 'Distribute whitepapers to targeted buying groups', icon: FileSpreadsheet },
      { name: 'Account-Based Marketing', path: '/abm', desc: 'Targeted multi-tier key account penetration', icon: Layers },
      { name: 'Webinar Services', path: '/webinar-services', desc: 'Qualified executive webinar attendees', icon: Sparkles },
      { name: 'Demand Generation', path: '/demand-generation', desc: 'Full-funnel pipeline and velocity growth', icon: Zap },
    ]
  },
  {
    title: 'Data & Operations',
    accent: '#10B981',
    items: [
      { name: 'B2B List Building', path: '/b2b-list-building', desc: 'Custom human-verified decision-maker lists', icon: Database },
      { name: 'Database Cleansing', path: '/database-cleansing', desc: 'Data hygiene, enrichment and deduplication', icon: Database },
    ]
  }
]

export const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)
  const location = useLocation()
  const dropdownTimeoutRef = useRef(null)

  // Scroll listener with Lenis & window fallback
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.lenis ? window.lenis.scroll : window.scrollY
      setIsScrolled(scrollPos > 30)
    }

    if (window.lenis) {
      window.lenis.on('scroll', handleScroll)
      return () => window.lenis?.off('scroll', handleScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus upon page navigation
  useEffect(() => {
    setIsServicesOpen(false)
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [location.pathname])

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setIsServicesOpen(true)
  }

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 280)
  }

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const isServicesActive = [
    '/services',
    '/sql-services',
    '/bant-lead-generation',
    '/mql-services',
    '/b2b-appointment-setting',
    '/b2b-email-marketing',
    '/abm',
    '/content-syndication',
    '/demand-generation',
    '/webinar-services',
    '/lead-nurturing',
    '/b2b-list-building',
    '/database-cleansing',
  ].some((path) => location.pathname === path)

  const [logoData, setLogoData] = useState({
    logo_url: '/middle.png',
    logo_text: 'Taraj Global',
    logo_alt: 'Taraj Global - B2B Growth & Lead Generation Agency',
    header_visible: true,
    show_logo_text: false
  })
  const [headerItems, setHeaderItems] = useState([])
  const [navLinks, setNavLinks] = useState([
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ])

  const fetchNavbarData = useCallback(() => {
    cmsAPI.getLogo()
      .then(res => {
        const data = res.data?.data || res.data
        if (data) {
          setLogoData(prev => ({
            ...prev,
            ...data,
            show_logo_text: data.show_logo_text === true || data.show_logo_text === 1 || data.show_logo_text === '1' || data.show_logo_text === 'true'
          }))
        }
      })
      .catch(() => {})

    cmsAPI.getNavbarItems()
      .then(res => {
        const raw = res.data?.data || res.data
        if (Array.isArray(raw)) {
          const allItems = raw
          const headers = allItems.filter(item => item.section === 'header' && (item.is_active === 1 || item.is_active === true))
          const navs = allItems.filter(item => (item.section === 'navbar' || !item.section) && (item.is_active === 1 || item.is_active === true))
          setHeaderItems(headers)
          if (navs.length > 0) {
            setNavLinks(navs.map(item => ({
              name: item.label,
              path: item.url,
              id: item.id
            })))
          }
        }
      })
      .catch(() => {})
  }, [])

  // Fetch on mount & listen for real-time changes across tabs & components
  useEffect(() => {
    fetchNavbarData()

    const handleSync = () => fetchNavbarData()
    window.addEventListener('focus', handleSync)
    window.addEventListener('taraj_navbar_updated', handleSync)

    const handleStorage = (e) => {
      if (e.key === 'taraj_cms_navbar_updated') handleSync()
    }
    window.addEventListener('storage', handleStorage)

    let bc = null
    if ('BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('taraj_cms_channel')
        bc.onmessage = (e) => {
          if (e.data?.type === 'NAVBAR_UPDATED') handleSync()
        }
      } catch (_) {}
    }

    return () => {
      window.removeEventListener('focus', handleSync)
      window.removeEventListener('taraj_navbar_updated', handleSync)
      window.removeEventListener('storage', handleStorage)
      if (bc) bc.close()
    }
  }, [fetchNavbarData])

  // Re-fetch whenever user returns to public routes
  useEffect(() => {
    fetchNavbarData()
  }, [location.pathname, fetchNavbarData])

  const hasTopHeader = logoData.header_visible && headerItems.length > 0 && !isScrolled

  return (
    <>
      {/* ── TOP HEADER ANNOUNCEMENT BAR (CMS MANAGED) ───────────────────── */}
      {hasTopHeader && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 text-slate-300 border-b border-white/10 text-xs h-8 px-4 flex items-center backdrop-blur-md">
          <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-[11px] font-medium">
              {headerItems.filter(h => h.url.startsWith('mailto:') || h.url.startsWith('tel:')).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="inline-flex items-center gap-1.5 hover:text-[#00A6FF] transition-colors"
                >
                  {item.url.startsWith('mailto:') ? <Mail size={12} className="text-[#00A6FF]" /> : <Phone size={12} className="text-[#00A6FF]" />}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              {headerItems.filter(h => !h.url.startsWith('mailto:') && !h.url.startsWith('tel:')).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="inline-flex items-center gap-1.5 font-medium hover:text-[#00A6FF] transition-colors text-slate-200"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={11} className="opacity-70 text-[#00A6FF]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed ${hasTopHeader ? 'top-8' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'h-[74px] sm:h-[80px] bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/[0.04] dark:shadow-black/50'
            : 'h-[80px] sm:h-[88px] bg-white/85 dark:bg-[#070B14]/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/[0.07]'
          }`}
        role="banner"
      >
        {/* Subtle Ambient Background Gradient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-10 left-1/4 w-72 h-20 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -top-10 right-1/4 w-72 h-20 bg-amber-500/10 dark:bg-orange-500/15 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="relative max-w-[1600px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ── 1. LEFT: CMS HEADER LOGO / BRANDING ─────────────────────────── */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3.5 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-0 ring-0 group cursor-pointer select-none"
              aria-label={logoData.logo_alt || logoData.logo_text || "Taraj Global Home"}
            >
              {/* Ultra-premium animated SVG TG Emblem / Logo */}
              <TGAnimatedLogo
                logoUrl={logoData.logo_url}
                alt={logoData.logo_alt || logoData.logo_text || "Taraj Global Logo"}
              />

              {/* Dynamic CMS Brand Name Text (only if toggled on in CMS or with emblem) */}
              {logoData.show_logo_text && logoData.logo_text && (
                <span className="inline-block font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-slate-900 dark:text-white leading-tight font-display group-hover:text-[#00A6FF] transition-colors whitespace-nowrap">
                  {logoData.logo_text}
                </span>
              )}
            </Link>
          </div>

          {/* ── 2. CENTER: PROFESSIONAL DESKTOP NAVIGATION ─────────────────── */}
          <nav
            className="relative hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100/70 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md shadow-2xs"
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((item) => {
              const isServices = item.path === '/services' || item.name?.toLowerCase() === 'services'
              const isExternal =
                item.path?.startsWith('http://') ||
                item.path?.startsWith('https://') ||
                item.path?.startsWith('mailto:') ||
                item.path?.startsWith('tel:')

              if (isServices) {
                return (
                  <div
                    key={item.path || item.name}
                    className="relative"
                    onMouseEnter={() => {
                      handleDropdownEnter()
                      setHoveredNav('Services')
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <NavLink
                      to={item.path || '/services'}
                      className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                        isServicesActive || isServicesOpen
                          ? 'text-[#00A6FF]'
                          : 'text-slate-700 dark:text-slate-200 hover:text-[#00A6FF] dark:hover:text-[#00A6FF]'
                      }`}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 relative z-10 ${
                          isServicesOpen ? 'rotate-180 text-[#00A6FF]' : 'text-slate-400 group-hover:text-[#00A6FF]'
                        }`}
                      />
                      {(isServicesActive || isServicesOpen) && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 rounded-xl bg-sky-500/10 border border-[#00A6FF]/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </NavLink>

                    {/* Mega-Dropdown Menu */}
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[880px] max-w-[95vw] z-50 pointer-events-auto"
                          role="menu"
                          aria-label="Services Menu"
                        >
                          {/* Invisible hover bridge to prevent mouse-leave gaps */}
                          <div className="absolute -top-3 left-0 right-0 h-4" />

                          <div className="relative bg-white/95 dark:bg-[#0C1220]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-6 overflow-hidden">
                            {/* Top Ambient Glow Hairline */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent" />

                            {/* 3 Columns Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {SERVICES_DATA.map((col) => (
                                <div key={col.title} className="space-y-3">
                                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100 dark:border-white/5">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full"
                                      style={{ backgroundColor: col.accent, boxShadow: `0 0 8px ${col.accent}` }}
                                    />
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                                      {col.title}
                                    </span>
                                  </div>

                                  <div className="space-y-1">
                                    {col.items.map((serviceItem) => {
                                      const Icon = serviceItem.icon
                                      return (
                                        <Link
                                          key={serviceItem.path}
                                          to={serviceItem.path}
                                          onClick={() => setIsServicesOpen(false)}
                                          className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all group/item"
                                        >
                                          <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover/item:scale-110 group-hover/item:shadow-sm"
                                            style={{
                                              backgroundColor: `${col.accent}15`,
                                              color: col.accent,
                                              border: `1px solid ${col.accent}30`
                                            }}
                                          >
                                            <Icon size={14} />
                                          </div>

                                          <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-[#00A6FF] dark:group-hover/item:text-[#00A6FF] transition-colors leading-tight">
                                              {serviceItem.name}
                                            </span>
                                            <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">
                                              {serviceItem.desc}
                                            </span>
                                          </div>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Bottom Bar: Explore All + Rapid SLA */}
                            <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs bg-slate-50/70 dark:bg-white/[0.02] -mx-6 -mb-6 px-6 py-3.5">
                              <Link
                                to="/services"
                                onClick={() => setIsServicesOpen(false)}
                                className="inline-flex items-center gap-1.5 font-bold text-[#00A6FF] hover:underline"
                              >
                                <span>Explore All 12 Growth Solutions</span>
                                <ArrowRight size={13} />
                              </Link>

                              <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:flex">
                                <span className="flex items-center gap-1.5">
                                  <ShieldCheck size={13} className="text-emerald-500" />
                                  99.8% Data Accuracy SLA
                                </span>
                                <span className="text-slate-300 dark:text-slate-700">|</span>
                                <span className="text-[#FF6D00] font-semibold flex items-center gap-1">
                                  <Zap size={13} className="text-[#FF6D00]" />
                                  48–72h Rapid Outbound
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                isExternal ? (
                  <a
                    key={item.id || item.path || item.name}
                    href={item.path}
                    target={item.path.startsWith('http') ? '_blank' : undefined}
                    rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onMouseEnter={() => setHoveredNav(item.name)}
                    className="relative whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-colors duration-200 text-slate-700 dark:text-slate-200 hover:text-[#00A6FF] dark:hover:text-[#00A6FF] cursor-pointer"
                  >
                    <span className="relative z-10">{item.name}</span>
                  </a>
                ) : (
                  <NavLink
                    key={item.id || item.path || item.name}
                    to={item.path}
                    onMouseEnter={() => setHoveredNav(item.name)}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-[#00A6FF]'
                          : 'text-slate-700 dark:text-slate-200 hover:text-[#00A6FF] dark:hover:text-[#00A6FF]'
                      }`
                    }
                  >
                    <span className="relative z-10">{item.name}</span>
                    <NavLinkActiveIndicator to={item.path} />
                  </NavLink>
                )
              )
            })}
          </nav>

          {/* ── 3. RIGHT: UTILITIES, LOGIN & PRIMARY CTA ──────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Quick Search Button */}
            <motion.button
              type="button"
              onClick={toggleSearch}
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#00A6FF] hover:border-[#00A6FF]/50 transition-all cursor-pointer shadow-2xs"
              aria-label="Search Services and Pages"
              title="Search"
            >
              <Search size={15} />
            </motion.button>

            {/* Theme Toggle Switch */}
            <ThemeToggle />

            {/* Enterprise Login */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200/90 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#00A6FF] hover:border-[#00A6FF]/40 transition-colors shadow-2xs"
                aria-label="Login"
              >
                <LogIn size={13} />
                <span>Login</span>
              </Link>
            </motion.div>

            {/* Primary Action Button ("Get Started") */}
            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-block"
            >
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A6FF] via-[#0088EE] to-[#FF6D00] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-sky-500/25 transition-all overflow-hidden group cursor-pointer"
              >
                {/* Ambient Shimmer Light Bar */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <span>Get Started</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden">
              <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>

          </div>

        </div>

        {/* ── 4. CASUAL CYBER LASER BEAM (NAVBAR BOTTOM BORDER) ───────────── */}
        <SectionLaserDivider variant="cyan" position="bottom" />
      </header>

      {/* ── Interactive Search Modal ─────────────────────────────────────── */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
      />

      {/* ── Fullscreen Drawer for Mobile ─────────────────────────────────── */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        logoUrl={logoData.logo_url}
        logoText={logoData.logo_text}
        navLinks={navLinks}
      />
    </>
  )
}

// Sub-component for active nav pill
const NavLinkActiveIndicator = ({ to }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  if (!isActive) return null

  return (
    <motion.div
      layoutId="active-nav-pill"
      className="absolute inset-0 rounded-xl bg-sky-500/10 border border-[#00A6FF]/20"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  )
}

export default PremiumNavbar
