import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, ShieldCheck, TrendingUp, DollarSign, Users, Calendar, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LiquidMetalButton } from '@components/ui/LiquidMetalButton'

export const HomeCTA = () => {
  const [dealSize, setDealSize] = useState(25000) // Average deal size in USD
  const [leadTier, setLeadTier] = useState(50) // Target monthly lead volume
  const [isDark, setIsDark] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [sheen, setSheen] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Calculations
  const calculatedSQLs = Math.round(leadTier * 0.42) // 42% SQL conversion rate
  const calculatedPipeline = calculatedSQLs * dealSize
  const formattedPipeline = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(calculatedPipeline)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setSheen({ x: px * 100, y: py * 100 })
    setTilt({
      rx: (0.5 - py) * 8,
      ry: (px - 0.5) * 10,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setIsHovered(false)
  }

  const dealSizes = [
    { label: '$10k', value: 10000 },
    { label: '$25k', value: 25000 },
    { label: '$50k', value: 50000 },
    { label: '$100k+', value: 100000 }
  ]

  const leadTiers = [
    { label: '25 Leads', value: 25 },
    { label: '50 Leads', value: 50 },
    { label: '100 Leads', value: 100 },
    { label: '250+ Leads', value: 250 }
  ]

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Ready to scale pipeline CTA">
      {/* Background Ambient Spotlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-cta/15 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div style={{ perspective: '1400px' }}>
          {/* Main 3D Conversion Deck */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            animate={{
              rotateX: isHovered ? tilt.rx : 0,
              rotateY: isHovered ? tilt.ry : 0,
              scale: isHovered ? 1.015 : 1,
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative rounded-[36px] sm:rounded-[44px] border border-white/30 dark:border-white/15 bg-surface/90 dark:bg-[#0B0F19]/90 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,102,204,0.18)] dark:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_20px_60px_-10px_rgba(0,166,255,0.35),0_0_20px_-3px_rgba(255,109,0,0.2)] overflow-hidden p-8 sm:p-12 lg:p-14 transition-all duration-300"
          >
            {/* Specular Sheen Follower */}
            {isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 opacity-50"
                style={{
                  background: `radial-gradient(circle 400px at ${sheen.x}% ${sheen.y}%, rgba(0, 166, 255, 0.22), transparent 70%)`
                }}
              />
            )}

            {/* Top Perimeter Animated Energy Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#00E5FF] to-cta opacity-90" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Value Proposition & Action (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                {/* Micro Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md shadow-xs w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-[0.22em]">
                    Scale Your Revenue Engine
                  </span>
                </div>

                {/* H2 Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.15]">
                  Ready to Build a{' '}
                  <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                    Predictable Sales Pipeline?
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                  Connect with verified in-market decision-makers and accelerate your deal flow. Schedule a discovery call with our B2B growth architects today.
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to="/contact">
                    <LiquidMetalButton size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl group">
                      <span className="flex items-center gap-2 font-bold">
                        Schedule a Growth Strategy Call
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </LiquidMetalButton>
                  </Link>

                  <Link to="/services">
                    <motion.div
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3.5 rounded-xl border border-border/80 dark:border-white/15 bg-surface/60 dark:bg-white/5 hover:bg-surface dark:hover:bg-white/10 text-sm font-bold text-text-primary transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Explore Capabilities</span>
                    </motion.div>
                  </Link>
                </div>

                {/* Trust Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                    <span>48h Campaign Launch</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                    <span>99.8% ICP Precision</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />
                    <span>Zero Lock-in Terms</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive B2B Pipeline Growth Simulator (5 cols) */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-3xl bg-surface/90 dark:bg-[#070A12]/90 border border-primary/30 dark:border-primary/40 shadow-xl backdrop-blur-xl relative overflow-hidden">
                  
                  {/* Top Simulator Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/5 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <TrendingUp size={15} />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-text-primary">
                        Pipeline ROI Simulator
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ● LIVE MODEL
                    </span>
                  </div>

                  {/* Input 1: Average Deal Size */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                        Average Deal Size (ACV)
                      </label>
                      <span className="text-xs font-extrabold font-mono text-primary">
                        ${dealSize.toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {dealSizes.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setDealSize(item.value)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                            dealSize === item.value
                              ? 'bg-primary text-white shadow-sm ring-1 ring-primary'
                              : 'bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-text-muted hover:border-primary/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 2: Target Lead Volume */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                        Target Lead Intake
                      </label>
                      <span className="text-xs font-extrabold font-mono text-cta">
                        {leadTier}/mo
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {leadTiers.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => setLeadTier(item.value)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                            leadTier === item.value
                              ? 'bg-cta text-white shadow-sm ring-1 ring-cta'
                              : 'bg-surface/80 dark:bg-white/5 border border-border/80 dark:border-white/10 text-text-muted hover:border-cta/40'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Output Cockpit Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-surface dark:via-black/30 to-cta/10 border border-primary/25">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      Estimated Monthly Pipeline Opportunity
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00E5FF] to-cta tracking-tight">
                      {formattedPipeline}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-text-secondary mt-2 pt-2 border-t border-black/5 dark:border-white/10">
                      <span>⚡ Projected SQLs: <strong className="text-text-primary">{calculatedSQLs} meetings/mo</strong></span>
                      <span className="text-emerald-500">4.8x Velocity</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HomeCTA
