import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useReducedMotion } from '@hooks/useReducedMotion'
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
    <section className="get-in-touch-section relative z-20 overflow-visible bg-background">
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
          className="absolute top-20 right-20 w-96 h-96 bg-cta/10 rounded-full blur-3xl"
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
            <div className="relative w-full max-w-sm">

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
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold text-white flex items-center gap-2"
                style={{
                  background: 'rgba(18,18,28,0.95)',
                  border: '1px solid rgba(0,166,255,0.3)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                We respond within a few hours
              </motion.div>

            </div>
          </motion.div>

          {/* Right Side - Contact Visual Card (Slides in from Right on scroll) */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="get-in-touch-right flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">

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
                className="relative rounded-3xl p-8 flex flex-col gap-6"
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
                    {/* Ping dot */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                    </span>
                  </motion.div>
                </div>

                {/* Heading */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl mb-1">Accelerate your growth</h3>
                  <p className="text-text-secondary text-sm">Our team typically responds within a few hours.</p>
                </div>

                {/* Channel pills */}
                <div className="flex flex-col gap-2">
                  {[
                    { icon: Mail, label: 'info@tarajglobal.com', color: '#00A6FF' },
                    { icon: Phone, label: '+91 96655-99442', color: '#FF6D00' },
                    { icon: MapPin, label: 'Pune, Maharashtra', color: '#72D669' },
                    { icon: MapPin, label: 'The Space Business Complex, Office No 512-516, Grant Rd, Kharadi, Pune, Maharashtra 411014', color: '#72D669' },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20` }}
                        >
                          <Icon size={14} style={{ color: item.color }} />
                        </div>
                        <span className="text-sm text-text-secondary">{item.label}</span>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA button */}
                <motion.button
                  onClick={handleBookMeeting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #00A6FF, #FF6D00)',
                    boxShadow: '0 4px 20px rgba(0,166,255,0.25)',
                  }}
                >
                  <Mail size={15} />
                  Book a Meeting
                </motion.button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouch
