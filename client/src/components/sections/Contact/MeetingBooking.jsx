import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { X, RefreshCw, CheckCircle } from 'lucide-react'

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

  // Listen to Calendly's event_scheduled message to auto-center the confirmation screen
  useEffect(() => {
    const handleCalendlyMessage = (e) => {
      let data = e.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {}
      }
      if (data && data.event === 'calendly.event_scheduled') {
        setIsScheduled(true)
      }
    }
    window.addEventListener('message', handleCalendlyMessage)
    return () => window.removeEventListener('message', handleCalendlyMessage)
  }, [])

  // Build clean Calendly embed URL with full native layout (event details, duration dropdown, calendar)
  const calendlyEmbedUrl = useMemo(() => {
    const eventUrl = DEFAULT_CALENDLY_URL.trim()
    const separator = eventUrl.includes('?') ? '&' : '?'
    const domain = typeof window !== 'undefined' ? window.location.hostname : 'tarajglobal.com'

    let userTz = ''
    try {
      userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    } catch {}

    const tzParam = userTz ? `&timezone=${encodeURIComponent(userTz)}` : ''

    // Preserves duration dropdown and native Calendly options
    return `${eventUrl}${separator}hide_gdpr_banner=1&background_color=091122&text_color=ffffff&primary_color=00a6ff&embed_domain=${encodeURIComponent(
      domain
    )}${tzParam}`
  }, [])

  // Reset state on open / lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsScheduled(false)
      setIframeLoading(true)
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Main Modal Shell (Auto-centers to max-w-xl upon booking so the confirmation card sits perfectly centered) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full ${
          isScheduled ? 'max-w-xl' : 'max-w-4xl lg:max-w-5xl'
        } h-[92vh] min-h-[680px] max-h-[860px] flex flex-col bg-[#070D1B] border border-[#00A6FF]/35 rounded-3xl shadow-[0_25px_80px_rgba(0,166,255,0.25)] overflow-hidden z-10 text-white font-sans transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent pointer-events-none z-30" />

        {/* Ambient Corner Atmosphere Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#00A6FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#FF6D00]/12 rounded-full blur-3xl pointer-events-none" />

        {/* ══════════════════════════════════════════
            HEADER (Title + Close only)
        ══════════════════════════════════════════ */}
        <div className="relative z-20 flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#091122]/95 backdrop-blur-md flex-shrink-0">
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
                  LIVE CALENDLY DISCOVERY
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                Enterprise Strategy Call Scheduler
              </h1>
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
            CALENDLY IFRAME CONTAINER
        ══════════════════════════════════════════ */}
        <div className="relative z-10 flex-1 w-full h-full min-h-0 bg-[#091122] overflow-hidden flex flex-col items-center justify-center">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#091122] z-10">
              <div className="relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#00A6FF]/20 border-t-[#00A6FF] animate-spin" />
                <div className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A6FF] to-[#005599] flex items-center justify-center font-bold text-xs text-white">
                  TG
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-mono text-white font-bold">
                  Initializing Calendly Scheduler...
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  Synchronizing enterprise strategy calendar
                </p>
              </div>
            </div>
          )}

          <iframe
            key={`${calendlyEmbedUrl}-${iframeKey}`}
            src={calendlyEmbedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Select a Date & Time - Taraj Global"
            className="w-full h-full border-0"
            style={{ width: '100%', height: '100%', minHeight: '620px', border: 'none' }}
            onLoad={() => setIframeLoading(false)}
            loading="lazy"
          />
        </div>

        {/* ══════════════════════════════════════════
            POST-BOOKING HELPER BAR
            (Appears when booked to provide clear reschedule & cancel guidance + action buttons)
        ══════════════════════════════════════════ */}
        {isScheduled && (
          <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-5 sm:px-7 py-3 bg-[#060B17] border-t border-white/10 text-xs font-mono gap-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-slate-300 text-center sm:text-left">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                To reschedule or cancel, use the 1-click links sent to your confirmation email.
              </span>
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
                className="px-4 py-1.5 rounded-lg bg-[#00A6FF] hover:bg-[#0090E0] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-[#00A6FF]/25"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default MeetingBooking
