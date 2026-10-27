import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, CheckCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import { getAttribution } from '@utils/attribution'

const DEFAULT_CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/tgs-admin001/30min'

const MeetingBooking = ({ isOpen, onClose }) => {
  const [iframeLoading, setIframeLoading] = useState(true)
  const [isScheduled, setIsScheduled] = useState(false)
  const [iframeKey, setIframeKey] = useState(1)

  // Load official Calendly widget script to support native responsive sizing & dropdowns
  useEffect(() => {
    const scriptSrc = 'https://assets.calendly.com/assets/external/widget.js'
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Robust listener for Calendly's postMessage events
  useEffect(() => {
    let hasLoaded = false
    const handleCalendlyMessage = (e) => {
      try {
        let data = e.data
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data)
          } catch {
            if (data.includes('event_scheduled') || data.includes('scheduled')) {
              setIsScheduled(true)
              setIframeLoading(false)
              return
            }
          }
        }
        const eventName = (data?.event || data?.action || '') + ''
        if (eventName.toLowerCase().includes('event_scheduled') || eventName.includes('scheduled')) {
          setIsScheduled(true)
          setIframeLoading(false)
        }
        // Auto-center when Calendly reports confirmation height (< 580px after initial calendar load)
        if (eventName === 'calendly.page_height' && data?.payload?.height) {
          const h = parseInt(data.payload.height, 10)
          if (h > 600) {
            hasLoaded = true
          } else if (hasLoaded && h > 0 && h < 580) {
            setIsScheduled(true)
            setIframeLoading(false)
          }
        }
      } catch (_) {}
    }
    window.addEventListener('message', handleCalendlyMessage)
    return () => window.removeEventListener('message', handleCalendlyMessage)
  }, [])

  // Build clean Calendly embed URL with native dark layout & full UTM attribution
  const calendlyEmbedUrl = useMemo(() => {
    const eventUrl = DEFAULT_CALENDLY_URL.trim()
    const separator = eventUrl.includes('?') ? '&' : '?'
    const domain = typeof window !== 'undefined' ? window.location.hostname : 'tarajglobal.com'

    let userTz = ''
    try {
      userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    } catch {}

    const tzParam = userTz ? `&timezone=${encodeURIComponent(userTz)}` : ''

    // Attach UTM parameters from last CTA click & attribution
    let utmParams = ''
    try {
      const attr = getAttribution()
      const parts = []
      if (attr.utm_source) parts.push(`utm_source=${encodeURIComponent(attr.utm_source)}`)
      if (attr.utm_medium) parts.push(`utm_medium=${encodeURIComponent(attr.utm_medium)}`)
      if (attr.utm_campaign) parts.push(`utm_campaign=${encodeURIComponent(attr.utm_campaign)}`)
      if (attr.utm_content) parts.push(`utm_content=${encodeURIComponent(attr.utm_content)}`)
      if (attr.cta_section) parts.push(`utm_term=${encodeURIComponent(attr.cta_section)}`)
      if (parts.length > 0) utmParams = '&' + parts.join('&')
    } catch (_) {}

    // Preserves native Calendly options, duration dropdown, and triggers postMessage events
    return `${eventUrl}${separator}hide_gdpr_banner=1&background_color=091122&text_color=ffffff&primary_color=00a6ff&embed_domain=${encodeURIComponent(
      domain
    )}&embed_type=Inline${tzParam}${utmParams}`
  }, [isOpen])

  // Reset state on open / lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsScheduled(false)
      setIframeLoading(true)
      // Safety timeout to dismiss loading skeleton if iframe load is slow or silent
      const timer = setTimeout(() => {
        setIframeLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleBookAnother = () => {
    setIsScheduled(false)
    setIframeLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
        style={{ colorScheme: 'dark' }}
      >
        {/* Dim Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* ══════════════════════════════════════════════════════════════
            MAIN MODAL SHELL
            - Standard: max-w-[780px] perfectly fits Calendly's 2-column view with NO dead space
            - Scheduled: max-w-[560px] perfectly frames the confirmation card in the dead center
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full ${
            isScheduled ? 'max-w-[580px]' : 'max-w-4xl lg:max-w-5xl'
          } h-[90vh] max-h-[820px] min-h-[640px] flex flex-col bg-[#070D1B] border border-[#00A6FF]/35 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,166,255,0.22),0_0_50px_rgba(0,0,0,0.85)] overflow-hidden z-10 text-white font-sans transition-all duration-300`}
          onClick={(e) => e.stopPropagation()}
          style={{ colorScheme: 'dark' }}
        >
          {/* Top Neon Gradient Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent pointer-events-none z-30" />

          {/* Ambient Corner Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#00A6FF]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none" />

          {/* ══════════════════════════════════════════
              HEADER (Balanced & Centered Branding)
          ══════════════════════════════════════════ */}
          <div className="relative z-20 flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-[#091122]/95 backdrop-blur-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A6FF] to-[#005599] flex items-center justify-center font-black text-sm text-white shadow-md shadow-[#00A6FF]/30 flex-shrink-0">
                TG
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#00A6FF] uppercase">
                    Taraj Global
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                    {isScheduled ? 'BOOKING CONFIRMED' : 'LIVE DISCOVERY'}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  {isScheduled ? 'Enterprise Consultation Reserved' : 'Enterprise Strategy Call Scheduler'}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ══════════════════════════════════════════
              CALENDLY IFRAME WRAPPER (Auto-Centered & Dark Themed)
          ══════════════════════════════════════════ */}
          <div 
            className="relative z-10 flex-1 w-full h-full min-h-0 bg-[#091122] overflow-hidden flex items-center justify-center"
            style={{ colorScheme: 'dark' }}
          >
            {/* Shimmering High-Performance Loader */}
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#091122] z-20 transition-opacity">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-[#00A6FF]/20 border-t-[#00A6FF] animate-spin" />
                  <div className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A6FF] to-[#005599] flex items-center justify-center font-bold text-xs text-white">
                    TG
                  </div>
                </div>
                <div className="text-center px-4">
                  <p className="text-xs font-mono text-white font-bold tracking-wide">
                    Connecting to Taraj Global Calendar...
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    Loading live availability & strategy time slots
                  </p>
                </div>
              </div>
            )}

            {/* Inner Centered Container */}
            <div className="w-full h-full mx-auto flex items-center justify-center overflow-hidden">
              <iframe
                key={`${calendlyEmbedUrl}-${iframeKey}`}
                src={calendlyEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Select a Date & Time - Taraj Global"
                className="w-full h-full border-0 block"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '620px',
                  border: 'none',
                  colorScheme: 'dark',
                }}
                onLoad={() => setIframeLoading(false)}
                loading="eager"
              />
            </div>
          </div>

          {/* ══════════════════════════════════════════
              POST-BOOKING ACTION BAR
          ══════════════════════════════════════════ */}
          {isScheduled && (
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-5 sm:px-6 py-3 bg-[#060B17] border-t border-white/10 text-xs font-mono gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 text-slate-300 text-center sm:text-left">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Calendar invite & conference link sent to your email.</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleBookAnother}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Slot</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg bg-[#00A6FF] hover:bg-[#0090E0] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-[#00A6FF]/25 flex items-center gap-1"
                >
                  <span>Done</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default MeetingBooking
