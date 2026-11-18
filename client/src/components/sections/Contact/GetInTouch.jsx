import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
import FlowButton from '../../ui/FlowButton'
import AnimatedGoldWave from './AnimatedGoldWave'
import './Contact.css'

const GetInTouch = ({ onBookMeeting }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  const handleBookMeeting = () => {
    if (onBookMeeting) {
      onBookMeeting()
    } else {
      scrollToForm()
    }
  }

  const scrollToForm = () => {
    if (location.pathname === '/contact') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/contact')
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }
  return (
    <section className="get-in-touch-section relative z-20 overflow-x-clip bg-background">
      {/* ── Animated Gold Wave: Leads this section as it smoothly flows UP over the fixed hero on scroll ── */}
      <AnimatedGoldWave />

      {/* Decorative gradient & blur circles clipped inside section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-hero" />
        
        {/* Animated orange gradient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(255, 166, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 60%)
            `
          }}
        />
        
        {/* Decorative blur circles with brand colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 right-20 w-96 h-96 bg-cta/30 dark:bg-cta/10 rounded-full blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl"
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container relative z-10">
        <div className="get-in-touch-grid">
          {/* Left Side - Contact Image Card (Slides in from Left on scroll) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="get-in-touch-left flex items-center justify-center"
          >
            <div className="relative w-full max-w-[430px]">

              {/* Glow blob behind image */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,166,255,0.18) 0%, rgba(255,109,0,0.10) 60%, transparent 100%)' }}
              />

              {/* Image card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,166,255,0.08)',
                }}
              >
                <img
                  src="/contach img.jpg"
                  alt="Contact Taraj Global"
                  className="w-full object-cover block"
                  style={{ borderRadius: '1.5rem', height: '480px', objectPosition: 'center' }}
                />

                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.5), transparent)' }}
                />
              </motion.div>

              {/* Floating badge — We respond */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.85 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold text-text-primary dark:text-white flex items-center gap-2"
                style={{
                  background: 'rgba(18,18,28,0.95)',
                  border: '1px solid rgba(0,166,255,0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
               WE’RE ONLINE
              </motion.div>

            </div>
          </motion.div>

          {/* Right Side - Contact Visual Card (Slides in from Right on scroll) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="get-in-touch-right flex items-center justify-center w-full"
          >
            <div className="relative w-full max-w-[560px]">

              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(0,166,255,0.4), rgba(255,109,0,0.4), rgba(0,166,255,0.4))',
                  padding: '1.5px',
                  borderRadius: '1.5rem',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Main card */}
              <div
                className="relative rounded-3xl p-6 sm:p-7 flex flex-col gap-5"
                style={{
                  background: 'rgba(18,18,28,0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Top icon */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(0,166,255,0.2), rgba(255,109,0,0.15))', border: '1px solid rgba(0,166,255,0.25)' }}
                    >
                      <Mail size={36} className="text-primary" />
                    </div>
                  </motion.div>
                </div>

                {/* Heading */}
                <div className="text-center">
                  <h3 className="text-text-primary dark:text-white font-bold text-xl mb-1"> Let’s Accelerate Your Pipeline</h3>
                  <p className="text-text-secondary text-sm">Our team typically replies within 2 hours during business hours.</p>
                </div>

                {/* 2-Column Split: HQ vs US per sketch */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Header Row */}
                  <div
                    className="grid grid-cols-2 text-center"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.03)',
                    }}
                  >
                    <div
                      className="py-2.5 px-3 flex items-center justify-center gap-1.5"
                      style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#00A6FF]" />
                      <span className="text-sm font-bold uppercase tracking-wider text-white">HQ</span>
                    </div>
                    <div className="py-2.5 px-3 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                      <span className="text-sm font-bold uppercase tracking-wider text-white">US</span>
                    </div>
                  </div>

                  {/* Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                    {/* HQ Column */}
                    <div className="p-3 sm:p-3.5 flex flex-col gap-2.5">
                      {/* Email */}
                      <a
                        href="mailto:sales@tarajglobal.com"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all hover:bg-white/5 hover:border-white/20 group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: '#00A6FF20' }}
                        >
                          <Mail size={13} style={{ color: '#00A6FF' }} />
                        </div>
                        <span className="text-xs text-text-secondary group-hover:text-white truncate font-medium transition-colors">sales@tarajglobal.com</span>
                      </a>

                      {/* Phone */}
                      <a
                        href="tel:+919665599442"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all hover:bg-white/5 hover:border-white/20 group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: '#FF6D0020' }}
                        >
                          <Phone size={13} style={{ color: '#FF6D00' }} />
                        </div>
                        <span className="text-xs text-text-secondary group-hover:text-white font-medium transition-colors">+91 96655-99442</span>
                      </a>

                      {/* Address */}
                      <div
                        className="flex items-start gap-2.5 rounded-xl px-3 py-2 flex-1"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: '#72D66920' }}
                        >
                          <MapPin size={13} style={{ color: '#72D669' }} />
                        </div>
                        <span className="text-xs text-text-secondary leading-relaxed font-medium">
                          The Space Business Complex, Office No 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014
                        </span>
                      </div>
                    </div>

                    {/* US Column */}
                    <div className="p-3 sm:p-3.5 flex flex-col gap-2.5">
                      {/* Email */}
                      <a
                        href="mailto:sales@tarajglobal.com"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all hover:bg-white/5 hover:border-white/20 group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: '#00A6FF20' }}
                        >
                          <Mail size={13} style={{ color: '#00A6FF' }} />
                        </div>
                        <span className="text-xs text-text-secondary group-hover:text-white truncate font-medium transition-colors">sales@tarajglobal.com</span>
                      </a>

                      {/* Phone */}
                      <a
                        href="tel:+13464878307"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all hover:bg-white/5 hover:border-white/20 group"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: '#FF6D0020' }}
                        >
                          <Phone size={13} style={{ color: '#FF6D00' }} />
                        </div>
                        <span className="text-xs text-text-secondary group-hover:text-white font-medium transition-colors">+1 346-487-8307</span>
                      </a>

                      {/* Address */}
                      <div
                        className="flex items-start gap-2.5 rounded-xl px-3 py-2 flex-1"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: '#A855F720' }}
                        >
                          <Globe size={13} style={{ color: '#A855F7' }} />
                        </div>
                        <span className="text-xs text-text-secondary leading-relaxed font-medium">
                          762, Fulton St, San Francisco, California 94115
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <FlowButton 
                  onClick={handleBookMeeting} 
                  text="Book a Strategy Call" 
                  variant="primary" 
                  className="w-full justify-center"
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouch

