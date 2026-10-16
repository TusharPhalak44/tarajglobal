import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Globe
} from 'lucide-react'
import { useCookies } from '@components/cookies/CookieContext'
import { cmsAPI } from '@api'
import FooterNetworkMap from './FooterNetworkMap'
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

  // ── Main Horizontal Nav Links (Matching User Design) ─────────────────────
  const navLinks = [
    { label: 'Lead Generation', url: '/sql-services' },
    { label: 'Demand Generation', url: '/demand-generation' },
    { label: 'ABM', url: '/abm' },
    { label: 'Industries', url: '/services' },
    { label: 'Careers', url: '/careers' },
    { label: 'Blogs', url: '/blog' },
    { label: 'Contact Us', url: '/contact' },
  ]

  // ── Social Icons Helper with Glassmorphism Brand Hover Treatments ─────────
  const renderSocialIcon = (platform) => {
    const key = (platform || '').toLowerCase()
    if (key.includes('linkedin')) return <Linkedin size={18} />
    if (key.includes('twitter') || key.includes('x')) return <Twitter size={18} />
    if (key.includes('youtube')) return <Youtube size={18} />
    if (key.includes('instagram')) return <Instagram size={18} />
    return <Globe size={18} />
  }

  const getSocialGlassClasses = (platform) => {
    const key = (platform || '').toLowerCase()
    const base = 'relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#040711]'

    if (key.includes('linkedin')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60 hover:text-[#0A66C2] hover:shadow-[0_0_18px_rgba(10,102,194,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#0A66C2]`
    }
    if (key.includes('twitter') || key.includes('x')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/50 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:scale-[1.05] focus-visible:ring-white`
    }
    if (key.includes('youtube')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-[#FF0000]/20 hover:border-[#FF0000]/60 hover:text-[#FF0000] hover:shadow-[0_0_18px_rgba(255,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#FF0000]`
    }
    if (key.includes('instagram')) {
      return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-gradient-to-tr hover:from-[#FF543E]/20 hover:via-[#C837AB]/20 hover:to-[#4158D0]/20 hover:border-[#E1306C]/60 hover:text-[#E1306C] hover:shadow-[0_0_18px_rgba(225,48,108,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#E1306C]`
    }
    return `${base} bg-white/[0.05] border border-white/10 text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-[#FF6D00]/20 hover:border-[#FF6D00]/60 hover:text-[#FF6D00] hover:shadow-[0_0_18px_rgba(255,109,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.05] focus-visible:ring-[#FF6D00]`
  }

  const defaultSocials = [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/taraj-global/' },
    { platform: 'X', url: 'https://twitter.com/tarajglobal' },
    { platform: 'YouTube', url: 'https://youtube.com/@tarajglobal' },
    { platform: 'Instagram', url: 'https://www.instagram.com/tarajglobal' },
  ]

  const rawSocialLinks = Array.isArray(footerData?.socialLinks) ? footerData.socialLinks : []
  const activeSocials = rawSocialLinks.filter((s) => s.is_visible !== 0)
  const socialsToRender = activeSocials.length > 0 ? activeSocials : defaultSocials

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
        
        {/* ── 1. CENTER BRANDING: CIRCULAR TG EMBLEM & WORDMARK (CLEAR & PROMINENT) ── */}
        <div className="flex flex-col items-center justify-center text-center mb-2.5 sm:mb-3">
          <Link
            to="/"
            className="group flex flex-col items-center focus:outline-none"
            aria-label="Taraj Global Home"
          >
            {/* TG Circular Logo with subtle ambient reactive glow */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#00A6FF]/25 blur-xl group-hover:bg-[#FF6D00]/30 transition-all duration-500 scale-115 pointer-events-none" />
              <img
                src="/circle.png"
                alt="Taraj Global Emblem"
                className="relative z-10 w-20 h-20 sm:w-22 sm:h-22 lg:w-[90px] lg:h-[90px] object-contain drop-shadow-[0_2px_12px_rgba(0,166,255,0.4)] group-hover:scale-105 transition-transform duration-300 select-none"
                style={{ imageRendering: 'high-quality' }}
                loading="eager"
              />
            </div>

            {/* Wordmark: TARAJ GLOBAL / BUSINESS SIMPLIFIED (Large, High-Contrast & Clear) */}
            <img
              src="/middle.png"
              alt="Taraj Global - Business Simplified"
              className="h-9 sm:h-10 lg:h-11 xl:h-12 w-auto max-w-[360px] sm:max-w-[430px] lg:max-w-[480px] object-contain mt-2 sm:mt-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:brightness-105 transition-all duration-300 select-none"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              loading="eager"
            />
          </Link>
        </div>

        {/* ── 2. MAIN HORIZONTAL COMMAND BAR (FULL-WIDTH BALANCED) ─────────── */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-2.5 border-t border-white/[0.08] lg:border-t-0">
          
          {/* LEFT: Dual ISO Certificates Badges (ENLARGED) */}
          <div className="flex items-center shrink-0">
            <img
              src={settings.cert_image_url || "/footerimage.png"}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = "/footerimage.png"
              }}
              alt="Taraj Global ISO 27001 & ISO 9001 Certifications"
              className="h-14 sm:h-16 lg:h-[66px] xl:h-[72px] w-auto object-contain select-none hover:brightness-110 transition-all drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              loading="lazy"
            />
          </div>

          {/* Vertical Separator for Desktop */}
          <div className="hidden lg:block h-9 w-[1px] bg-white/[0.16] mx-2 shrink-0" />

          {/* CENTER: Main Navigation Links (Spreading Across Full Width) */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 xl:gap-x-8 gap-y-1.5 text-center flex-1"
          >
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                {idx > 0 && (
                  <span className="text-white/20 hidden sm:inline select-none text-xs font-light">
                    |
                  </span>
                )}
                <Link
                  to={link.url}
                  className="text-sm sm:text-[15px] font-semibold text-slate-100 hover:text-[#FF6D00] transition-colors duration-200 tracking-wide py-0.5 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* Vertical Separator for Desktop */}
          <div className="hidden lg:block h-9 w-[1px] bg-white/[0.16] mx-2 shrink-0" />

          {/* RIGHT: Glassmorphism Social Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
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

        {/* ── 3. BOTTOM LEGAL BAR & COPYRIGHT ROW (COMPACT, FULL-WIDTH) ───── */}
        <div className="border-t border-white/[0.08] mt-2 sm:mt-2.5 pt-2 pb-1 flex flex-col md:flex-row items-center justify-between w-full gap-2 text-xs sm:text-[13px] text-slate-400 font-normal">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            &copy; {currentYear}{' '}
            <span>
              {settings.copyright_text
                ? settings.copyright_text
                    .replace('{year}', currentYear)
                    .replace('Copyright © ', '')
                    .replace(/Copyright\s*©?\s*\d*\s*/i, '')
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
