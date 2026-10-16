import React from 'react'
import { Star } from 'lucide-react'
import AnimatedGrid from '@components/animations/AnimatedGrid'

export const TESTIMONIALS_DATA = [
  {
    id: 'avaya',
    company: 'Avaya Global Systems',
    companyLogo: '/Avaya.webp',
    category: 'Enterprise Demand Generation',
    rating: 4.7,
    quote: 'Combining targeted ABM with their in-house verification tool helped us engage active buying committees with zero data bounce. Their automated pipeline delivery routes qualified C-suite meetings straight into our CRM',
  },
  {
    id: 'oracle-partner',
    company: 'Oracle Solutions Partner',
    companyLogo: '/ora.png',
    category: 'Account-Based Intelligence',
    rating: 5.0,
    quote: 'The speed and precision of TaRaj Global infrastructure set them apart. Their real-time intent signal tracking allowed us to connect with high-intent enterprise decision-makers right when they entered an active buying cycle.',
  },
  {
    id: 'mitel',
    company: 'Mitel Networks',
    companyLogo: '/mitel.png',
    category: 'Appointment Setting & Syndication',
    rating: 4.3,
    quote: "Their tech-backed content syndication and appointment setting generated a measurable surge in executive engagement. Having live client portal access made tracking campaign SLAs and pipeline velocity effortless.",
  },
  {
    id: 'ringcentral',
    company: 'RingCentral Inc.',
    companyLogo: '/ringcentral.png',
    category: 'B2B Lead Acceleration',
    rating: 3.9,
    quote: "TaRaj Global's proprietary outreach stack significantly shortened our enterprise sales cycles. Their multi-pass verification ensured zero duplicate contacts, delivering high-converting accounts directly into our sales workflows.",
  },
  {
    id: 'vonage',
    company: 'Vonage Enterprise Solutions',
    companyLogo: '/Vonage.png',
    category: 'Lead Conversion & Sales Pipeline',
    rating: 5.0,
    quote: "Taraj Global's data-driven approach and attention to detail sets them apart. They don't just deliver leads; they deliver opportunities that convert. Our partnership has been instrumental in scaling our business growth.",
  },
  {
    id: 'microsoft-partner',
    company: 'Microsoft Solutions Partner',
    companyLogo: '/micro.png',
    category: 'Decision-Maker Discovery',
    rating: 3.8,
    quote: 'Operating on custom infrastructure rather than generic databases makes a huge difference. TaRaj Global delivered a predictable flow of BANT-qualified opportunities with strict 99.8% data accuracy across our target verticals.',
  },
]

// Helper to render fractional and filled star icons cleanly
const renderStars = (rating = 5.0) => {
  return [0, 1, 2, 3, 4].map((i) => {
    const fillPercent = Math.max(0, Math.min(100, Math.round((rating - i) * 100)))
    return (
      <div key={i} className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
        {/* Muted background star */}
        <Star size={12} className="text-slate-600 fill-slate-700/50" />
        {/* Precision golden fill overlay */}
        {fillPercent > 0 && (
          <div
            className="absolute top-0 left-0 bottom-0 overflow-hidden"
            style={{ width: `${fillPercent}%` }}
          >
            <Star size={12} className="fill-[#FBBF24] text-[#FBBF24] shrink-0" style={{ minWidth: 12 }} />
          </div>
        )}
      </div>
    )
  })
}

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative bg-[#070B14] py-14 sm:py-16 lg:py-20 border-b border-white/[0.08] overflow-hidden select-none"
      aria-labelledby="testimonials-heading"
    >
      {/* ── Ambient Radial Lighting & Subtle Technical Grid Background ─── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] rounded-full bg-[#00A6FF]/[0.06] blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[250px] rounded-full bg-[#FF6D00]/[0.04] blur-[130px]" />
      </div>

      <AnimatedGrid size={64} opacity={0.03} />

      {/* ── Section Header (Matching Screenshot Layout & Typography) ─── */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-8 sm:mb-10">
        {/* Pre-header Eyebrow matching Hero and other sections */}
        <div className="inline-flex items-center justify-center mb-2.5 sm:mb-3">
          <p className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#00A6FF]">
            CLIENT TESTIMONIALS
          </p>
        </div>

        {/* Main Headline */}
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-[-0.03em] leading-[1.12] text-white"
        >
          Trusted by Enterprise {' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00]">
            Revenue Leaders
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Real impact delivered to global technology enterprises and fast-scaling B2B organizations.
        </p>

        {/* Centered Small Gradient Bar Accent */}
        <div className="w-14 h-[3px] mx-auto rounded-full bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00] mt-3.5" />
      </div>

      {/* ── Continuous Infinite Loop Card Scroller ─── */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Bilateral Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-r from-[#070B14] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-10 bg-gradient-to-l from-[#070B14] to-transparent" />

        {/* Continuous Seamless Infinite Marquee Track */}
        <div
          className="flex items-stretch gap-5 sm:gap-6 w-max animate-marquee hover:[animation-play-state:paused]"
          style={{
            animation: 'marqueeScroll 45s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative w-[340px] sm:w-[400px] shrink-0 rounded-2xl border border-white/10 bg-[#090E1B]/95 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:border-[#00A6FF]/50 hover:shadow-[0_10px_30px_rgba(0,166,255,0.14)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Subtle Top-Right Tech Crosshair Accent */}
              <span className="absolute top-5 right-5 text-slate-500/60 font-mono text-sm select-none pointer-events-none group-hover:text-[#00A6FF] transition-colors">
                +
              </span>

              <div>
                {/* Top Row: Client Logo Badge & 5.0 Star Rating Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  {/* Clean White Rounded Logo Badge */}
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm shrink-0">
                    <img
                      src={item.companyLogo}
                      alt={item.company}
                      className="max-h-7 max-w-[85%] object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#05070E] border border-white/10 shadow-inner">
                    <div className="flex items-center gap-0.5">
                      {renderStars(item.rating || 5.0)}
                    </div>
                    <span className="text-xs font-bold text-white font-mono ml-0.5">
                      {(item.rating || 5.0).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Client Company Name */}
                <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight mb-2.5 leading-snug">
                  {item.company}
                </h3>

                {/* Quotation Marks Symbol */}
                <div className="text-slate-400/80 mb-2.5">
                  <svg width="22" height="16" viewBox="0 0 24 18" fill="currentColor">
                    <path d="M0 10.5C0 4.7 4.1 0.7 10 0L8.5 4C5.5 4.5 4.1 6.5 4 8.5H10V18H0V10.5ZM14 10.5C14 4.7 18.1 0.7 24 0L22.5 4C19.5 4.5 18.1 6.5 18 8.5H24V18H14V10.5Z" />
                  </svg>
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-xs sm:text-[13.5px] italic text-slate-300 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Minimal Clean Card Footer */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-[#00A6FF]">{item.category}</span>
                <span className="text-slate-500">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
