import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Shield, DollarSign, Activity, Radio, Cpu, Plus, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

const IndustryCard = ({ industry, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [sheen, setSheen] = useState({ x: 50, y: 50 })
  const cardRef = useRef(null)
  const Icon = industry.icon

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setSheen({ x: px * 100, y: py * 100 })
    setTilt({
      rx: (0.5 - py) * 12,
      ry: (px - 0.5) * 14,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setIsHovered(false)
  }

  return (
    <div style={{ perspective: '1200px' }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        animate={{
          rotateX: isHovered ? tilt.rx : 0,
          rotateY: isHovered ? tilt.ry : 0,
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.025 : 1,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative h-full flex flex-col justify-between rounded-3xl p-6 sm:p-7 overflow-hidden border transition-all duration-300 cursor-pointer ${
          isHovered
            ? 'bg-surface dark:bg-[#0B0F19]/90 border-primary/70 shadow-[0_18px_45px_-10px_rgba(0,102,204,0.2),0_0_15px_-2px_rgba(0,166,255,0.15)] dark:shadow-[0_12px_32px_-5px_rgba(0,166,255,0.35),0_0_15px_-2px_rgba(0,166,255,0.2)] dark:border-primary/80 z-20'
            : 'bg-surface/85 dark:bg-white/5 border-border/75 dark:border-white/10 shadow-sm hover:border-primary/40 dark:hover:shadow-[0_8px_20px_-4px_rgba(0,166,255,0.25)] z-10'
        }`}
      >
        {/* Dynamic Specular Cursor Sheen */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 opacity-45"
            style={{
              background: `radial-gradient(circle 220px at ${sheen.x}% ${sheen.y}%, ${industry.glowColor}, transparent 70%)`
            }}
          />
        )}

        {/* Top Accent Gradient Line */}
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${industry.gradient} opacity-90`} />

        {/* Corner Precision Accents */}
        <div className={`absolute top-3 right-3 text-[10px] font-mono font-bold transition-colors ${
          isHovered ? 'text-primary' : 'text-text-muted/50'
        }`}>
          0{index + 1}
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Top Row: Icon Pod + Live Focus Tag */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  scale: isHovered ? 1.12 : 1,
                  rotate: isHovered ? [0, -8, 8, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${industry.iconBg}`}
              >
                <Icon size={22} />
              </motion.div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
                  {industry.sector}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-text-primary tracking-tight leading-snug">
                  {industry.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal mb-4">
              {industry.desc}
            </p>
          </div>

          {/* Bottom Telemetry Row */}
          <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary">
              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
              <span>{industry.metric}</span>
            </span>

            <span className="text-[10px] font-mono font-bold text-primary dark:text-[#00E5FF] uppercase tracking-wider">
              {industry.tag}
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export const IndustriesWeAccelerate = () => {
  const industries = [
    {
      icon: Cloud,
      sector: 'Cloud & Infrastructure',
      title: 'Enterprise SaaS Platforms',
      desc: 'Targeting DevOps, CRM, ERP, and AI software decision-makers with high-intent pipeline generation.',
      metric: '4.8x Pipeline Velocity',
      tag: 'B2B SaaS',
      gradient: 'from-[#00A6FF] to-[#00E5FF]',
      glowColor: 'rgba(0, 166, 255, 0.3)',
      iconBg: 'bg-gradient-to-br from-[#00A6FF] to-[#0085CC]',
    },
    {
      icon: Shield,
      sector: 'InfoSec & Compliance',
      title: 'Cybersecurity & Defense',
      desc: 'Penetrating buying committees across CISOs, SecOps directors, and IT compliance leadership.',
      metric: '100% Verified CISOs',
      tag: 'CyberSec',
      gradient: 'from-emerald-400 to-teal-400',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    },
    {
      icon: DollarSign,
      sector: 'Financial Technology',
      title: 'FinTech & InsurTech',
      desc: 'Connecting payment infrastructure, core banking tech, and compliance platforms with enterprise finance buyers.',
      metric: 'High-ACV Deal Flow',
      tag: 'FinTech',
      gradient: 'from-[#FF6D00] to-[#FFA000]',
      glowColor: 'rgba(255, 109, 0, 0.3)',
      iconBg: 'bg-gradient-to-br from-[#FF6D00] to-amber-600',
    },
    {
      icon: Activity,
      sector: 'Life Sciences',
      title: 'HealthTech & MedTech',
      desc: 'Reaching hospital systems, digital therapeutics directors, and healthcare executives with verified data.',
      metric: 'HIPAA/GDPR Compliant',
      tag: 'HealthTech',
      gradient: 'from-purple-400 to-indigo-400',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    },
    {
      icon: Radio,
      sector: 'Unified Communications',
      title: 'Telecom & UCaaS',
      desc: 'Strategic demand generation across Mitel, Avaya, RingCentral, and enterprise VoIP ecosystems.',
      metric: 'Ecosystem Specialists',
      tag: 'UCaaS',
      gradient: 'from-blue-500 to-cyan-400',
      glowColor: 'rgba(0, 166, 255, 0.3)',
      iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-500',
    },
    {
      icon: Cpu,
      sector: 'Hardware & IoT',
      title: 'Enterprise Hardware & IoT',
      desc: 'Full-funnel outreach for industrial automation, robotics, edge computing, and smart sensors.',
      metric: 'Multi-Stakeholder ABM',
      tag: 'Industrial IoT',
      gradient: 'from-amber-400 to-orange-500',
      glowColor: 'rgba(255, 109, 0, 0.3)',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    }
  ]

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Industries We Accelerate">
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cta/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header (a-lign studio masked kinetic typography reveal) */}
        <div className="relative text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="flex items-center justify-center gap-2 mb-3.5">
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary/70 dark:text-[#00E5FF]/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                Vertical Specialization
              </span>
            </div>

            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -90, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cta/70 dark:text-orange-400/70"
            >
              <Plus size={13} strokeWidth={3} />
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16] overflow-hidden py-1">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              Industries We{' '}
              <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
                Accelerate
              </span>
            </motion.span>
          </h2>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Deep firmographic intelligence and buying committee mapping tailored to high-growth B2B sectors.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-[#00E5FF] to-cta mx-auto rounded-full mt-6" />
        </div>

        {/* 6-Card 3D Perspective Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustriesWeAccelerate
