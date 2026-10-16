import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Check, SlidersHorizontal } from 'lucide-react'
import { useCookies } from './CookieContext'
import { useTheme } from '@context/ThemeContext'

const CookieBanner = () => {
  const { isBannerVisible, acceptAll, openPreferences, closeBanner } = useCookies()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHoveredClose, setIsHoveredClose] = useState(false)

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 80, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[430px] max-w-[calc(100vw-32px)] sm:max-w-[92%] md:bottom-8 md:left-8 md:w-[460px]"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        {/* Main Card Container */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 select-none"
          style={{
            backgroundColor: isDark ? '#0C111C' : '#FFFFFF',
            boxShadow: isDark
              ? '0 25px 60px -10px rgba(0, 0, 0, 0.95), 0 0 25px rgba(0, 166, 255, 0.16)'
              : '0 20px 45px -10px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Top Brand Laser Line Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]" />

          {/* Ambient Background Glow (Dark Mode Only) */}
          {isDark && (
            <>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A6FF]/10 blur-3xl rounded-full pointer-events-none -z-0" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF6D00]/8 blur-2xl rounded-full pointer-events-none -z-0" />
            </>
          )}

          {/* Inner Content */}
          <div className="relative z-10 p-5 sm:p-6">
            
            {/* Header: Badge + Title + Close Button */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-xs"
                  style={{
                    backgroundColor: isDark ? 'rgba(0, 166, 255, 0.12)' : 'rgba(0, 166, 255, 0.08)',
                  }}
                >
                  🍪
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
                      style={{ color: isDark ? '#38BDF8' : '#0066CC' }}
                    >
                      PRIVACY &amp; DATA
                    </span>
                  </div>
                  <h3
                    id="cookie-banner-title"
                    className="text-base sm:text-lg font-black tracking-tight"
                    style={{ color: isDark ? '#FFFFFF' : '#0F172A' }}
                  >
                    We use cookies
                  </h3>
                </div>
              </div>

              {/* Dismiss / Close Button (Working) */}
              <button
                onClick={closeBanner}
                onMouseEnter={() => setIsHoveredClose(true)}
                onMouseLeave={() => setIsHoveredClose(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: isHoveredClose
                    ? (isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0')
                    : (isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9'),
                  color: isHoveredClose
                    ? (isDark ? '#FFFFFF' : '#0F172A')
                    : (isDark ? '#94A3B8' : '#64748B'),
                }}
                aria-label="Close cookie banner"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Description Body */}
            <p
              id="cookie-banner-description"
              className="text-xs sm:text-sm leading-relaxed mb-5"
              style={{ color: isDark ? '#CBD5E1' : '#475569' }}
            >
              We use cookies to improve your browsing experience, analyze website traffic, and enhance our services. You can manage your preferences anytime by visiting our{' '}
              <Link
                to="/cookies"
                className="font-semibold underline underline-offset-2 transition-colors"
                style={{ color: '#FF6D00' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6D00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#00A6FF')}
              >
                Cookie Settings
              </Link>
              {' '}or{' '}
              <Link
                to="/cookies"
                className="font-semibold underline underline-offset-2 transition-colors"
                style={{ color: '#FF6D00' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FF6D00')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#00A6FF')}
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Action Buttons: Ultra-Modern UI */}
            <div className="grid grid-cols-2 gap-3 pt-2 w-full">
              {/* Customize Button (Sleek Glassmorphic Secondary Action) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={openPreferences}
                className="relative group flex items-center justify-center gap-2 h-11 px-4 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer select-none overflow-hidden border"
                style={{
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0',
                  color: isDark ? '#E2E8F0' : '#334155',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.10)' : '#E2E8F0'
                  e.currentTarget.style.borderColor = isDark ? 'rgba(0, 166, 255, 0.45)' : '#94A3B8'
                  e.currentTarget.style.color = isDark ? '#FFFFFF' : '#0F172A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9'
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#E2E8F0'
                  e.currentTarget.style.color = isDark ? '#E2E8F0' : '#334155'
                }}
                aria-label="Customize cookie preferences"
              >
                <SlidersHorizontal size={14} className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                <span className="font-medium tracking-tight">Customize</span>
              </motion.button>

              {/* Accept All Button (Electric Blue Gradient with Glow & Specular Sheen) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={acceptAll}
                className="relative group flex items-center justify-center gap-2 h-11 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all duration-200 cursor-pointer select-none overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #00A6FF 0%, #0077EE 100%)',
                  boxShadow: isDark
                    ? '0 4px 20px -2px rgba(0, 166, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                    : '0 4px 16px -2px rgba(0, 166, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 6px 26px 0px rgba(0, 166, 255, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                    : '0 6px 22px 0px rgba(0, 166, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 4px 20px -2px rgba(0, 166, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                    : '0 4px 16px -2px rgba(0, 166, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
                aria-label="Accept all cookies"
              >
                {/* Modern light sweep shimmer effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                <Check size={15} className="stroke-[2.5] shrink-0" />
                <span className="font-semibold tracking-tight">Accept All</span>
              </motion.button>
            </div>

          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
