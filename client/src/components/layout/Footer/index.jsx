import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Linkedin,
  Twitter,
  Instagram,
  Globe
} from 'lucide-react'
import { useCookies } from '@components/cookies/CookieContext'
import { cmsAPI } from '@api'
import FooterNetworkMap from './FooterNetworkMap'
import TGAnimatedLogo from '../PremiumNavbar/TGAnimatedLogo'
import './footer.css'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { openPreferences } = useCookies()
  const [footerData, setFooterData] = useState(null)

  // ── Fetch dynamic footer data (with instant fallback) ─────────────────────
  const fetchFooterData = useCallback(async () => {
    try {
      const response = await cmsAPI.getFooterData()
      if (response?.data?.success && response?.data?.data) {
        setFooterData(response.data.data)
      } else if (response?.data) {
        setFooterData(response.data)
      }
    } catch {
      // Graceful fallback to static defaults
    }
  }, [])

  useEffect(() => {
    fetchFooterData()

    const handleSync = () => fetchFooterData()
    window.addEventListener('focus', handleSync)
    window.addEventListener('taraj_footer_updated', handleSync)

    let bc = null
    if ('BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('taraj_cms_channel')
        bc.onmessage = (e) => {
          if (e.data?.type === 'FOOTER_UPDATED') handleSync()
        }
      } catch (_) { }
    }

    return () => {
      window.removeEventListener('focus', handleSync)
      window.removeEventListener('taraj_footer_updated', handleSync)
      if (bc) bc.close()
    }
  }, [fetchFooterData])

  const settings = footerData?.settings || {}

  // ── Main Horizontal Nav Links (Centered Command Bar) ─────────────────────
  const navLinks = [
    { label: 'Lead Generation', url: '/sql-services' },
    { label: 'Demand Generation', url: '/demand-generation' },
    { label: 'ABM', url: '/abm' },
    { label: 'Industries', url: '/services' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Who We Are', url: '/about' },
    { label: 'Blogs', url: '/blog' },
    { label: 'Careers', url: '/careers' },
  ]

  // ── Social Icons Helper with Glassmorphism Brand Hover Treatments ─────────
  const renderSocialIcon = (platform) => {
    const key = (platform || '').toLowerCase()
    if (key.includes('linkedin')) return <Linkedin size={18} />
    if (key.includes('twitter') || key.includes('x')) {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
    if (key.includes('instagram')) return <Instagram size={18} />
    return <Globe size={18} />
  }

  const getSocialGlassClasses = (platform) => {
    const key = (platform || '').toLowerCase()
    const base = 'relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#040711]'

    if (key.includes('linkedin')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 hover:text-[#0A66C2] hover:shadow-[0_0_18px_rgba(10,102,194,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#0A66C2]`
    }
    if (key.includes('twitter') || key === 'x') {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/50 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-[1.05] focus-visible:ring-white`
    }
    if (key.includes('instagram')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-gradient-to-tr hover:from-[#FF543E]/20 hover:via-[#C837AB]/20 hover:to-[#4158D0]/20 hover:border-[#E1306C]/60 hover:text-[#E1306C] hover:shadow-[0_0_18px_rgba(225,48,108,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#E1306C]`
    }
    return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-[#FF6D00]/20 hover:border-[#FF6D00]/60 hover:text-[#FF6D00] hover:shadow-[0_0_18px_rgba(255,109,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#FF6D00]`
  }

  const defaultSocials = [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/taraj-global/' },
    { platform: 'X', url: 'https://x.com/TaRajGlobal' },
    { platform: 'Instagram', url: 'https://www.instagram.com/taraj_global' },
  ]

  const rawSocialLinks = Array.isArray(footerData?.socialLinks) ? footerData.socialLinks : []
  const activeSocials = rawSocialLinks
    .filter((s) => s.is_visible !== 0 && !s.platform?.toLowerCase().includes('youtube'))
    .map((s) => {
      const p = (s.platform || '').toLowerCase()
      if (p === 'x' || p === 'twitter') {
        return { ...s, platform: 'X', url: s.url && s.url.includes('x.com/TaRajGlobal') ? s.url : 'https://x.com/TaRajGlobal' }
      }
      if (p.includes('instagram')) {
        return { ...s, url: s.url && s.url.includes('taraj_global') ? s.url : 'https://www.instagram.com/taraj_global' }
      }
      return s
    })
  
  // Merge active socials from DB with guaranteed presence of X and Instagram
  const mergedSocials = activeSocials.length > 0 ? [...activeSocials] : [...defaultSocials]
  defaultSocials.forEach((def) => {
    const hasDef = mergedSocials.some(
      (s) => s.platform?.toLowerCase() === def.platform.toLowerCase() ||
             (def.platform === 'X' && (s.platform?.toLowerCase() === 'twitter' || s.platform?.toLowerCase() === 'x'))
    )
    if (!hasDef) {
      mergedSocials.push(def)
    }
  })

  const socialsToRender = mergedSocials.filter(s => !s.platform?.toLowerCase().includes('youtube'))

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-[#040711] text-white border-t border-white/10 select-none z-10 transition-colors duration-300"
      aria-label="Taraj Global Solutions Footer"
    >
      {/* ── Top Border (Clean, distraction-free edge) ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

      {/* ── Ambient Radial Atmosphere ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[300px] rounded-full bg-[#00A6FF]/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[520px] h-[300px] rounded-full bg-[#FF6D00]/[0.05] blur-[130px]" />
      </div>

      {/* ── Animated Background World Map with Glowing Network Lines ────── */}
      <FooterNetworkMap />

      {/* ── Footer Foreground Content ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 xl:px-12 pt-4 sm:pt-5 pb-2.5">
        
        {/* ── 1. CENTER BRANDING: CIRCULAR TG EMBLEM & WORDMARK & SOCIAL ICONS ── */}
        <div className="flex flex-col items-center justify-center text-center mb-3 sm:mb-4">
          <Link
            to="/"
            className="group flex flex-col items-center focus:outline-none"
            aria-label="Taraj Global Home"
          >
            {/* TG Animated Circular Emblem with subtle ambient reactive glow */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#00A6FF]/20 blur-xl group-hover:bg-[#FF6D00]/25 transition-all duration-500 scale-115 pointer-events-none" />
              <TGAnimatedLogo
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-[80px] lg:h-[80px] drop-shadow-[0_2px_16px_rgba(0,166,255,0.4)]"
                alt="Taraj Global Emblem"
              />
            </div>

            {/* Wordmark: TARAJ GLOBAL SOLUTIONS / BUSINESS SIMPLIFIED */}
            <img
              src="/taraj-solutions-wordmark.png"
              alt="Taraj Global Solutions - Business Simplified"
              className="h-7 sm:h-8 lg:h-9 xl:h-10 w-auto max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] object-contain mt-2 sm:mt-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] group-hover:brightness-110 transition-all duration-300 select-none"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading="eager"
            />
          </Link>

          {/* Social Icons Centered Directly Below Taraj Global Logo */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-3 sm:mt-3.5">
            {socialsToRender.map((social, sIdx) => (
              <a
                key={social.id || social.platform || sIdx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={getSocialGlassClasses(social.platform)}
                aria-label={`Follow Taraj Global on ${social.platform}`}
                title={social.platform}
              >
                {renderSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        {/* ── 2. MAIN HORIZONTAL COMMAND BAR (CENTERED NAVIGATION LINKS & BALANCED ISO BADGES) ─── */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-3 sm:gap-4 py-2 sm:py-2.5 border-t border-white/[0.08] lg:border-t-0">
          
          {/* LEFT: Dual ISO Certificates Badges (Non-overlapping, Flexbox Balanced) */}
          <div className="flex items-center shrink-0 lg:w-[240px] justify-center lg:justify-start">
            <img
              src={settings.cert_image_url || "/footerimage.png"}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = "/footerimage.png"
              }}
              alt="Taraj Global ISO 27001 & ISO 9001 Certifications"
              className="h-16 sm:h-20 lg:h-[78px] xl:h-[86px] w-auto object-contain select-none hover:brightness-110 transition-all drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              loading="lazy"
            />
          </div>

          {/* CENTER: Main Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 lg:gap-x-5 gap-y-2 text-center flex-1 max-w-4xl px-2"
          >
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                {idx > 0 && (
                  <span className="text-white/20 select-none text-xs font-light">
                    |
                  </span>
                )}
                <Link
                  to={link.url}
                  className="text-xs sm:text-sm lg:text-[14px] font-semibold text-slate-200 hover:text-[#FF6D00] transition-colors duration-200 tracking-wide py-0.5 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* RIGHT: Invisible Balancing Spacer for Desktop (Equal width to ISO on left) */}
          <div className="hidden lg:flex shrink-0 lg:w-[240px] justify-end" aria-hidden="true" />
        </div>

        {/* ── 3. BOTTOM LEGAL BAR & COPYRIGHT ROW (COMPACT, FULL-WIDTH) ───── */}
        <div className="border-t border-white/[0.08] mt-2 sm:mt-2.5 pt-2 pb-1 flex flex-col md:flex-row items-center justify-between w-full gap-2 text-xs sm:text-[13px] text-slate-400 font-normal">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            &copy; {currentYear}{' '}
            <span>
              {settings.copyright_text
                ? settings.copyright_text
                    .replace(/^(Copyright\s*)?©?\s*\d{4}\s*/i, '')
                    .replace(/^(Copyright\s*)?©?\s*/i, '')
                : 'Taraj Global Solutions Private Limited. All rights reserved.'}
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200 py-0.5">
              Privacy Policy
            </Link>
            <span className="text-white/20 select-none">|</span>
            <Link to="/terms" className="hover:text-white transition-colors duration-200 py-0.5">
              Terms of Service
            </Link>
            <span className="text-white/20 select-none">|</span>
            <Link to="/cookies" className="hover:text-white transition-colors duration-200 py-0.5">
              Cookie Policy
            </Link>
            <span className="text-white/20 select-none">|</span>
            <Link to="/sitemap" className="hover:text-white transition-colors duration-200 py-0.5">
              Sitemap
            </Link>
            <span className="text-white/20 select-none">|</span>
            <button
              onClick={openPreferences}
              type="button"
              className="hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none py-0.5"
            >
              Cookie Settings
            </button>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
