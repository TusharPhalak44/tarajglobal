import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowUp,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  Globe,
  Zap,
  Target,
  CheckCircle2,
  ChevronRight,
  Clock
} from 'lucide-react'
import { useCookies } from '@components/cookies/CookieContext'
import { useLenis } from '@hooks/useLenis'
import TGAnimatedLogo from '@components/layout/PremiumNavbar/TGAnimatedLogo'
import { cmsAPI } from '@api'
import './footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const { openPreferences } = useCookies()
  const lenis = useLenis()

  // ── Dynamic Footer Data State ──────────────────────────────────────────────
  const [footerData, setFooterData] = useState(null)

  // ── Live Timezone Clocks (IST & PST) ─────────────────────────────────────────
  const [timezones, setTimezones] = useState({ ist: '', pst: '' })

  useEffect(() => {
    const updateClocks = () => {
      try {
        const now = new Date()
        const istStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        const pstStr = now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setTimezones({ ist: istStr, pst: pstStr })
      } catch {
        setTimezones({ ist: 'IST Active', pst: 'PST Active' })
      }
    }
    updateClocks()
    const timer = setInterval(updateClocks, 60000)
    return () => clearInterval(timer)
  }, [])

  // ── Fetch dynamic footer data ───────────────────────────────────────────────
  const fetchFooterData = useCallback(async () => {
    try {
      const response = await cmsAPI.getFooterData()
      if (response?.data?.success && response?.data?.data) {
        setFooterData(response.data.data)
      } else if (response?.data) {
        setFooterData(response.data)
      }
    } catch (err) {
      console.warn('Could not fetch dynamic footer data, using default fallback:', err.message)
    }
  }, [])

  // ── Real-time synchronization across tabs & components ─────────────────────
  useEffect(() => {
    fetchFooterData()

    const handleSync = () => fetchFooterData()
    window.addEventListener('focus', handleSync)
    window.addEventListener('taraj_footer_updated', handleSync)

    const handleStorage = (e) => {
      if (e.key === 'taraj_cms_footer_updated') handleSync()
    }
    window.addEventListener('storage', handleStorage)

    let bc = null
    if ('BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('taraj_cms_channel')
        bc.onmessage = (e) => {
          if (e.data?.type === 'FOOTER_UPDATED') handleSync()
        }
      } catch (_) {}
    }

    return () => {
      window.removeEventListener('focus', handleSync)
      window.removeEventListener('taraj_footer_updated', handleSync)
      window.removeEventListener('storage', handleStorage)
      if (bc) bc.close()
    }
  }, [fetchFooterData])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // ── Helper to render social icon ───────────────────────────────────────────
  const renderSocialIcon = (platform, iconName) => {
    const key = (platform || iconName || '').toLowerCase()
    if (key.includes('linkedin')) return <Linkedin size={18} />
    if (key.includes('twitter') || key.includes('x')) return <Twitter size={18} />
    if (key.includes('facebook')) return <Facebook size={18} />
    if (key.includes('instagram')) return <Instagram size={18} />
    if (key.includes('youtube')) return <Youtube size={18} />
    if (key.includes('github')) return <Github size={18} />
    return <Globe size={18} />
  }

  // ── Extract Data with Robust Defaults ──────────────────────────────────────
  const settings = footerData?.settings || {}
  const allSections = Array.isArray(footerData?.sections) ? footerData.sections : []
  const linksMap = footerData?.links || {}
  const rawOffices = Array.isArray(footerData?.offices) ? footerData.offices : []
  const rawSocialLinks = Array.isArray(footerData?.socialLinks) ? footerData.socialLinks : []

  // Separate content link sections and legal section
  const contentSections = allSections.filter(
    (s) => s.is_visible !== 0 && s.title?.toLowerCase() !== 'legal' && s.section_type !== 'offices'
  )
  const legalSection = allSections.find(
    (s) => s.title?.toLowerCase() === 'legal'
  )
  const legalLinks = legalSection
    ? linksMap[legalSection.id]?.links || []
    : []

  // Default fallback link sections if CMS fetch completely fails
  const defaultSections = [
    {
      id: 'default-leadgen',
      title: 'Lead Gen',
      color: '#00A6FF',
      links: [
        { label: 'Email Marketing', url: '/b2b-email-marketing' },
        { label: 'MQL Services', url: '/mql-services' },
        { label: 'HQL Services', url: '/hql-services' },
        { label: 'BANT Services', url: '/bant-lead-generation' },
        { label: 'SQL Services', url: '/sql-services' },
        { label: 'Appointment Generation', url: '/b2b-appointment-setting' },
        { label: 'B2B List Building', url: '/b2b-list-building' },
      ],
    },
    {
      id: 'default-demand',
      title: 'Demand & ABM',
      color: '#FF6D00',
      links: [
        { label: 'Lead Nurturing', url: '/lead-nurturing' },
        { label: 'Content Syndication', url: '/content-syndication' },
        { label: 'Account-Based Mktg', url: '/abm' },
        { label: 'Webinar Services', url: '/webinar-services' },
        { label: 'Demand Generation', url: '/demand-generation' },
        { label: 'Database Cleansing', url: '/database-cleansing' },
      ],
    },
    {
      id: 'default-company',
      title: 'Company',
      color: 'slate',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'All Solutions', url: '/services' },
        { label: 'Industries We Serve', url: '/industries' },
        { label: 'Careers', url: '/careers' },
        { label: 'Blogs & Insights', url: '/blog' },
        { label: 'Contact Us', url: '/contact' },
      ],
    },
  ]

  // Prepared sections to render
  let sectionsToRender = [];
  if (footerData && footerData.sections) {
    // If we have data from the CMS, use it strictly.
    sectionsToRender = contentSections.map((s, idx) => {
      const apiLinks = linksMap[s.id]?.links || (Array.isArray(s.links) ? s.links : [])
      return {
        id: s.id,
        title: s.title,
        color: idx === 0 ? '#00A6FF' : idx === 1 ? '#FF6D00' : 'slate',
        links: apiLinks,
      }
    })
  } else {
    // Fallback if data hasn't loaded or failed
    sectionsToRender = defaultSections
  }

  // Active offices or defaults
  const officesToRender = rawOffices.filter((o) => o.is_visible !== 0)

  // Default offices
  const defaultOffices = [
    {
      id: 'pune',
      name: 'Pune, India',
      city: 'Pune',
      country: 'India',
      address: 'The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, 411017',
      phone: '+91 96655-99442',
      email: 'info@tarajglobal.com',
      isPST: false,
    },
    {
      id: 'sf',
      name: 'San Francisco',
      city: 'San Francisco',
      country: 'USA',
      address: '762, Fulton St, San Francisco, California 94115',
      phone: '+1 346-487-8307',
      email: 'info@tarajglobal.com',
      isPST: true,
    },
  ]

  const activeOffices = (footerData && footerData.offices)
    ? officesToRender.map((o) => {
        const text = `${o.name || ''} ${o.city || ''} ${o.country || ''} ${o.state || ''}`.toLowerCase()
        const isPST = text.includes('francisco') || text.includes('usa') || text.includes('california') || text.includes('us')
        const address = [o.address_line_1, o.address_line_2, o.city, o.postal_code].filter(Boolean).join(', ')
        return {
          id: o.id,
          name: o.name || `${o.city || ''}, ${o.country || ''}`,
          city: o.city,
          country: o.country,
          address: address || 'Global Business Complex',
          phone: o.phone,
          email: o.email || 'info@tarajglobal.com',
          map_url: o.map_url,
          icon: o.icon,
          isPST,
        }
      })
    : defaultOffices

  // Active social links or defaults
  const activeSocials = rawSocialLinks.filter((s) => s.is_visible !== 0)

  return (
    <footer
      ref={footerRef}
      className="footer-master-root relative overflow-hidden bg-[#FAFAFA] dark:bg-[#070B14] text-slate-800 dark:text-slate-100 transition-colors duration-500"
      aria-label="Taraj Global Footer"
    >
      {/* ── Top Cyber Laser Divider ───────────────────────────────────────── */}
      <div className="footer-laser-divider">
        <div className="footer-laser-beam footer-laser-cyan" />
        <div className="footer-laser-beam footer-laser-amber" />
      </div>

      {/* ── Ambient Background Lighting Spheres ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div className="footer-orb footer-orb-cyan absolute -top-28 left-1/4 w-[500px] h-[300px] rounded-full bg-[#00A6FF]/6 dark:bg-[#00A6FF]/10 blur-[130px]" />
        <div className="footer-orb footer-orb-amber absolute top-1/2 right-1/4 w-[550px] h-[350px] rounded-full bg-[#FF6D00]/6 dark:bg-[#FF6D00]/09 blur-[140px]" />
        <div className="footer-mesh-grid absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      {/* ── MAIN 12-COLUMN ENTERPRISE FOOTER CONTENT ─────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* ── COLUMN 1 (SPAN 3): BRAND & VALUE PROPOSITION ──────────────── */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-5">
            {/* Logo & ISO Certification Badges Stack (Centered relative to the badges) */}
            <div className="w-[200px] sm:w-[230px] md:w-[250px] flex flex-col items-center gap-3">
              {settings.is_logo_visible !== 0 && settings.is_logo_visible !== false && (
                <Link to="/" className="inline-flex items-center justify-center group" aria-label="Taraj Global Home">
                  {settings.logo_url && settings.logo_url !== '/OnlyTG- 3.png' ? (
                    <img src={settings.logo_url} alt="Taraj Global" className="w-[88px] h-auto sm:w-[100px] md:w-[112px]" loading="lazy" />
                  ) : (
                    <TGAnimatedLogo
                      alt="Taraj Global"
                      className="!w-[88px] !h-[88px] sm:!w-[100px] sm:!h-[100px] md:!w-[112px] md:!h-[112px]"
                    />
                  )}
                </Link>
              )}

              {settings.is_cert_image_visible !== 0 && settings.is_cert_image_visible !== false && (
                <div className="pt-1 w-full flex justify-center">
                  <img
                    src={settings.cert_image_url || "/footerimage.png"}
                    alt="Taraj Global Certification"
                    className="w-full h-auto object-contain select-none max-w-[210px] sm:max-w-[230px]"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            {/* Description / Content (Clearly visible & high contrast) */}
            {settings.is_description_visible !== 0 && settings.is_description_visible !== false && (
              <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
                {settings.company_description ||
                  'Taraj Global is an ISO certified demand generation agency.'}
              </p>
            )}

            {/* Social Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {(footerData && footerData.socialLinks) ? (
                activeSocials.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-text-primary dark:text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all shadow-sm"
                    aria-label={`Taraj Global ${social.platform} Profile`}
                    title={social.platform}
                  >
                    {renderSocialIcon(social.platform, social.icon)}
                  </motion.a>
                ))
              ) : (
                <motion.a
                  href="https://www.linkedin.com/company/taraj-global/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-text-primary dark:text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all shadow-sm"
                  aria-label="Taraj Global LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </motion.a>
              )}
            </div>
          </div>

          {/* ── DYNAMIC LINK COLUMNS (SPAN 2 EACH) ─────────────────────────── */}
          {sectionsToRender.slice(0, 3).map((section) => {
            const isCyan = section.color === '#00A6FF'
            const isAmber = section.color === '#FF6D00'

            const dotClass = isCyan
              ? 'bg-[#00A6FF]'
              : isAmber
              ? 'bg-[#FF6D00]'
              : 'bg-slate-400 dark:bg-slate-500'

            const headingClass = isCyan
              ? 'text-[#00A6FF] dark:text-[#38BDF8]'
              : isAmber
              ? 'text-[#FF6D00] dark:text-[#FB923C]'
              : 'text-slate-800 dark:text-slate-200'

            const hoverClass = isAmber
              ? 'hover:text-[#FF6D00] dark:hover:text-[#FF6D00]'
              : 'hover:text-[#00A6FF] dark:hover:text-[#00A6FF]'

            const chevronColor = isAmber ? 'text-[#FF6D00]' : 'text-[#00A6FF]'

            return (
              <div key={section.id} className="lg:col-span-2 space-y-4 pt-4 sm:pt-7 lg:pt-16">
                <ul className="space-y-2.5">
                  {section.links.map((link, lIdx) => {
                    const isCustomAction =
                      link.link_type === 'custom_action' ||
                      link.custom_action === 'openCookiePreferences' ||
                      (!link.url && link.label?.toLowerCase().includes('cookie'))
                    const isExternal =
                      link.link_type === 'external' ||
                      link.target === '_blank' ||
                      link.url?.startsWith('http')

                    if (isCustomAction) {
                      return (
                        <li key={link.id || lIdx}>
                          <button
                            type="button"
                            onClick={openPreferences}
                            className={`footer-nav-link text-slate-600 dark:text-slate-300 ${hoverClass} transition-all duration-200 text-xs sm:text-sm inline-flex items-center gap-1 group py-0.5 text-left cursor-pointer`}
                          >
                            <ChevronRight size={12} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${chevronColor}`} />
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                              {link.label}
                            </span>
                          </button>
                        </li>
                      )
                    }

                    if (isExternal) {
                      return (
                        <li key={link.id || lIdx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`footer-nav-link text-slate-600 dark:text-slate-300 ${hoverClass} transition-all duration-200 text-xs sm:text-sm inline-flex items-center gap-1 group py-0.5`}
                          >
                            <ChevronRight size={12} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${chevronColor}`} />
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                              {link.label}
                            </span>
                          </a>
                        </li>
                      )
                    }

                    return (
                      <li key={link.id || lIdx}>
                        <Link
                          to={link.url || '/'}
                          className={`footer-nav-link text-slate-600 dark:text-slate-300 ${hoverClass} transition-all duration-200 text-xs sm:text-sm inline-flex items-center gap-1 group py-0.5`}
                        >
                          <ChevronRight size={12} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${chevronColor}`} />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

          {/* ── COLUMN 5 (SPAN 3): GLOBAL HUBS & CLOCKS ────────────── */}
          <div className="lg:col-span-3 space-y-4 pt-4 sm:pt-7 lg:pt-16">
            <div className="space-y-3 text-xs">
              {activeOffices.map((office, oIdx) => {
                const isPST = office.isPST
                const accentColor = isPST ? '#FF6D00' : '#00A6FF'
                const clockTime = isPST ? (timezones.pst || '11:15 AM') : (timezones.ist || '11:45 PM')

                return (
                  <div
                    key={office.id || oIdx}
                    className={`footer-office-card p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] space-y-2 transition-all duration-300 ${
                      isPST ? 'hover:border-[#FF6D00]/50' : 'hover:border-[#00A6FF]/50'
                    } shadow-sm`}
                  >
                    <div className="flex flex-wrap min-[360px]:flex-nowrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-text-primary dark:text-white">
                        {isPST ? (
                          <Building2 size={14} className="text-[#FF6D00] flex-shrink-0" />
                        ) : (
                          <MapPin size={14} className="text-[#00A6FF] flex-shrink-0" />
                        )}
                        <span>{office.name}</span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md ${
                          isPST
                            ? 'text-[#FF6D00] dark:text-[#FB923C] bg-[#FF6D00]/10 dark:bg-[#FF6D00]/15'
                            : 'text-[#00A6FF] dark:text-[#38BDF8] bg-[#00A6FF]/10 dark:bg-[#00A6FF]/15'
                        }`}
                      >
                        <Clock size={11} /> {clockTime}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {office.address}
                    </p>

                    <div className="flex flex-col gap-1 pt-0.5">
                      {office.phone && (
                        <a
                          href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`}
                          className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold hover:underline py-0.5 ${
                            isPST ? 'text-[#FF6D00] dark:text-[#FB923C]' : 'text-[#00A6FF] dark:text-[#38BDF8]'
                          }`}
                        >
                          <Phone size={12} />
                          {office.phone}
                        </a>
                      )}
                      {office.email && (
                        <a
                          href={`mailto:${office.email}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-[#00A6FF] hover:underline py-0.5"
                        >
                          <Mail size={12} className={`text-[${accentColor}]`} />
                          {office.email}
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM LEGAL BAR, COPYRIGHT & BACK TO TOP ────────────────────── */}
      <div className="relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-black/40 py-5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">

            {/* Copyright */}
            <div className="text-slate-500 dark:text-slate-400 text-center md:text-left">
              &copy; {currentYear}{' '}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {settings.copyright_text
                  ? settings.copyright_text.replace('{year}', currentYear).replace('Copyright © ', '').replace(/Copyright\s*©?\s*\d*\s*/i, '')
                  : 'Taraj Global Solutions Private Limited. All rights reserved.'}
              </span>
            </div>

            {/* Legal & Cookie Policy Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-5 gap-y-2 text-slate-600 dark:text-slate-300 text-xs">
              {(footerData && footerData.sections) ? (
                legalLinks.map((ll, idx) => {
                  const isCookieAction =
                    ll.link_type === 'custom_action' ||
                    ll.custom_action === 'openCookiePreferences' ||
                    (!ll.url && ll.label?.toLowerCase().includes('cookie'))

                  return (
                    <React.Fragment key={ll.id || idx}>
                      {idx > 0 && <span className="text-text-secondary dark:text-slate-300 dark:text-white/20 hidden min-[360px]:inline">•</span>}
                      {isCookieAction ? (
                        <button
                          onClick={openPreferences}
                          type="button"
                          className="hover:text-[#FF6D00] transition-colors cursor-pointer focus:outline-none py-1"
                        >
                          {ll.label}
                        </button>
                      ) : (
                        <Link to={ll.url || '/'} className="hover:text-[#FF6D00] transition-colors py-1">
                          {ll.label}
                        </Link>
                      )}
                    </React.Fragment>
                  )
                })
              ) : (
                <>
                  <Link to="/privacy" className="hover:text-[#FF6D00] transition-colors py-1">
                    Privacy Policy
                  </Link>
                  <span className="text-text-secondary dark:text-slate-300 dark:text-white/20 hidden min-[360px]:inline">•</span>
                  <Link to="/terms" className="hover:text-[#FF6D00] transition-colors py-1">
                    Terms of Service
                  </Link>
                  <span className="text-text-secondary dark:text-slate-300 dark:text-white/20 hidden min-[360px]:inline">•</span>
                  <Link to="/cookies" className="hover:text-[#FF6D00] transition-colors py-1">
                    Cookie Policy
                  </Link>
                  <span className="text-text-secondary dark:text-slate-300 dark:text-white/20 hidden min-[360px]:inline">•</span>
                  <button
                    onClick={openPreferences}
                    type="button"
                    className="hover:text-[#FF6D00] transition-colors cursor-pointer focus:outline-none py-1"
                  >
                    Cookie Settings
                  </button>
                </>
              )}
            </div>

            {/* Scroll To Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-white/[0.05] text-slate-700 dark:text-slate-200 hover:text-[#FF6D00] hover:border-[#FF6D00] dark:hover:border-[#FF6D00] transition-all shadow-sm cursor-pointer text-xs font-semibold"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} className="text-[#00A6FF]" />
            </motion.button>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
