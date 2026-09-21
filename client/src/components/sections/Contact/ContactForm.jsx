import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  CheckCircle,
  Loader2,
  RotateCcw,
  Sparkles,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react'
import { contactAPI } from '@api/contact.api'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import './Contact.css'

const SERVICE_TAGS = [
  'B2B Email Marketing',
  'Appointment Setting',
  'Lead Generation',
  'Content Syndication',
]

const COUNTRIES = [
  { code: 'us', name: 'United States' },
  { code: 'uk', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'in', name: 'India' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'sg', name: 'Singapore' },
  { code: 'ae', name: 'United Arab Emirates' },
  { code: 'other', name: 'Other' },
]

const TRUST_METRICS = [
  {
    icon: Clock,
    title: 'Fast Response',
    desc: 'Average response under 2 hours',
    color: '#00A6FF',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise NDA',
    desc: '100% confidential data governance',
    color: '#FF6D00',
  },
  {
    icon: TrendingUp,
    title: 'Custom Audit',
    desc: 'Tailored B2B pipeline growth blueprint',
    color: '#72D669',
  },
]

const ContactForm = () => {
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
    agreeToPrivacy: false,
  })
  const [selectedTag, setSelectedTag] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSelectTag = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('')
      setFormData((prev) => ({ ...prev, subject: '' }))
    } else {
      setSelectedTag(tag)
      setFormData((prev) => ({
        ...prev,
        subject: tag,
        message:
          !prev.message || prev.message.startsWith("I'm interested in")
            ? `I'm interested in ${tag} for our pipeline growth.`
            : prev.message,
      }))
      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }))
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      subject: '',
      message: '',
      agreeToPrivacy: false,
    })
    setSelectedTag('')
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required'
    if (!formData.email.trim()) {
      newErrors.email = 'Business email required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid work email required'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone required'
    if (!formData.country.trim()) newErrors.country = 'Select country'
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a message'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Minimum 10 characters required'
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'Please agree to privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const resolvedSubject = [
      selectedTag || formData.subject || 'Growth Consultation',
      formData.country ? `[${formData.country.toUpperCase()}]` : '',
    ]
      .filter(Boolean)
      .join(' ')

    try {
      await contactAPI.submit({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: resolvedSubject,
        message: formData.message,
      })
      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        handleReset()
      }, 4000)
    } catch (error) {
      setIsSubmitting(false)
      setErrors({
        submit: error?.response?.data?.message || 'Something went wrong. Please try again.',
      })
    }
  }

  if (isSubmitted) {
    return (
      <section className="contact-form-section relative py-12 sm:py-16 overflow-hidden bg-background text-text-primary transition-colors duration-300">
        <div className="absolute inset-0 bg-hero" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(255, 166, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 60%)
            `
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center p-8 rounded-3xl bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Message Transmitted!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Thank you for reaching out. Our growth strategists have received your brief and will connect with you within 2 hours.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Priority Ingestion Active
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact-form"
      className="contact-form-section relative py-4 sm:py-6 lg:py-7 overflow-hidden bg-background text-text-primary transition-colors duration-300"
    >
      {/* Main gradient background matching OfficeLocation */}
      <div className="absolute inset-0 bg-hero" />
      
      {/* Animated orange gradient glow matching OfficeLocation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255, 166, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Decorative blur circles with brand colors matching OfficeLocation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 right-20 w-96 h-96 bg-cta/10 rounded-full blur-3xl pointer-events-none"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-20 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none"
      />
      
      {/* Grid pattern overlay matching OfficeLocation */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ── Section Header (With Signature Brand Highlight Color) ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-4 sm:mb-5"
        >
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase !mb-2">
            <span className="text-slate-900 dark:text-white">Send Us a </span>
            <span className="text-[#00A6FF] drop-shadow-[0_0_20px_rgba(0,166,255,0.4)]">Message</span>
          </h2>
          <p className="section-subtitle text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 !mb-0 font-normal">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </motion.div>

        {/* ── Dual-Column Executive Glass Console ── */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl p-0.5 bg-gradient-to-br from-slate-200/90 via-slate-200/40 to-slate-200/20 dark:from-white/20 dark:via-white/5 dark:to-transparent shadow-xl dark:shadow-[0_20px_70px_rgba(0,0,0,0.65)]"
        >
          {/* Subtle Outer Neon Halo */}
          <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-[#00A6FF]/20 via-[#FF6D00]/15 to-[#00A6FF]/20 blur-lg opacity-40 pointer-events-none" />

          {/* Main Card Frame */}
          <div className="relative rounded-[20px] bg-white/95 dark:bg-[#0C1526]/95 backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Mouse-tracking Spotlight Effect */}
            <div
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                width: '350px',
                height: '350px',
                background:
                  'radial-gradient(circle, rgba(0, 166, 255, 0.10) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: `translate(${mousePosition.x - 175}px, ${mousePosition.y - 175}px)`,
                left: 0,
                top: 0,
                opacity: mousePosition.x !== 0 ? 1 : 0,
              }}
            />

            {/* Top Accent Light Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_12px_#00A6FF]" />

            {/* ═══════════════════════════════════════════════════════
                LEFT SIDE: Executive Context, Chips & Trust Pillars
                (Takes 5 of 12 columns on desktop)
            ═══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-black/25 relative">
              
              <div>
                {/* Live Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 dark:border-[#00A6FF]/30 bg-primary/10 dark:bg-[#00A6FF]/10 text-primary dark:text-[#00d2ff] mb-2.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#00d2ff] animate-ping" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase">
                    Direct Inquiry
                  </span>
                  <span className="text-slate-300 dark:text-white/20">|</span>
                  <span className="text-[10.5px] font-medium text-slate-600 dark:text-slate-300">
                    &lt; 2h Response
                  </span>
                </div>

                {/* Left Panel Heading */}
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug text-slate-900 dark:text-white">
                  <span>Accelerate Your </span>
                  <span className="bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#FF6D00] bg-clip-text text-transparent">
                    Pipeline
                  </span>
                </h3>

                {/* Context Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-normal">
                  Select your objective below. Our growth architects will tailor a dedicated outreach strategy for your team.
                </p>

                {/* ── Quick Requirement Selector ── */}
                <div className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-white/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block mb-1.5">
                    Select Requirement:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TAGS.map((tag) => {
                      const isSelected = selectedTag === tag
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleSelectTag(tag)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer border ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-xs dark:bg-[#00A6FF] dark:text-black dark:border-[#00A6FF] font-bold'
                              : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-white/30 hover:text-primary dark:hover:text-white shadow-xs'
                          }`}
                        >
                          {tag}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ── Trust Pillars (Horizontal 3-column Grid) ── */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-white/10 grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 text-left min-[420px]:text-center">
                  {TRUST_METRICS.map((metric) => {
                    const Icon = metric.icon
                    return (
                      <div
                        key={metric.title}
                        className="flex min-[420px]:flex-col items-center min-[420px]:items-center gap-2.5 min-[420px]:gap-0 p-2 sm:p-2.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 shadow-xs"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mb-0 min-[420px]:mb-1"
                          style={{
                            background: `${metric.color}18`,
                            color: metric.color,
                          }}
                        >
                          <Icon size={15} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {metric.title}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {metric.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Direct Help Footnote */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
                Prefer direct email?{' '}
                <a
                  href="mailto:info@tarajglobal.com"
                  className="font-semibold text-primary dark:text-[#00d2ff] hover:underline"
                >
                  info@tarajglobal.com
                </a>
              </div>

            </div>

            {/* ═══════════════════════════════════════════════════════
                RIGHT SIDE: Form Inputs (Comfortable Height + Clear Readable Fonts)
                (Takes 7 of 12 columns on desktop)
            ═══════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* First Name */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-firstName" className="flex items-center gap-1 cursor-pointer">
                        <span>First Name</span>
                        <span className="text-[#FF6D00] font-bold leading-none">*</span>
                      </label>
                      {errors.firstName && (
                        <span className="text-xs font-semibold text-rose-500">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="form-firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                          errors.firstName
                            ? 'border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-lastName" className="flex items-center gap-1 cursor-pointer">
                        <span>Last Name</span>
                        <span className="text-[#FF6D00] font-bold leading-none">*</span>
                      </label>
                      {errors.lastName && (
                        <span className="text-xs font-semibold text-rose-500">{errors.lastName}</span>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="form-lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Sharma"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                          errors.lastName
                            ? 'border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Business Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Business Email */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-email" className="flex items-center gap-1 cursor-pointer">
                        <span>Business Email</span>
                        <span className="text-[#FF6D00] font-bold leading-none">*</span>
                      </label>
                      {errors.email && (
                        <span className="text-xs font-semibold text-rose-500">{errors.email}</span>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                          errors.email
                            ? 'border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-phone" className="flex items-center gap-1 cursor-pointer">
                        <span>Phone Number</span>
                        <span className="text-[#FF6D00] font-bold leading-none">*</span>
                      </label>
                      {errors.phone && (
                        <span className="text-xs font-semibold text-rose-500">{errors.phone}</span>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                          errors.phone
                            ? 'border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Country & Subject/Need */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Country */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-country" className="flex items-center gap-1 cursor-pointer">
                        <span>Country</span>
                        <span className="text-[#FF6D00] font-bold leading-none">*</span>
                      </label>
                      {errors.country && (
                        <span className="text-xs font-semibold text-rose-500">{errors.country}</span>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <select
                        id="form-country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-8 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white cursor-pointer ${
                          errors.country
                            ? 'border-rose-500 ring-1 ring-rose-500/20'
                            : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                        }`}
                      >
                        <option value="">Select Country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code} className="dark:bg-[#0C1526] text-slate-900 dark:text-white">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject / Need */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                      <label htmlFor="form-subject" className="flex items-center gap-1 cursor-pointer">
                        <span>Subject / Need</span>
                        <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                      </label>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <input
                        id="form-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Pipeline Growth"
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: Message (Comfortable 3 rows) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    <label htmlFor="form-message" className="flex items-center gap-1 cursor-pointer">
                      <span>Message Brief</span>
                      <span className="text-[#FF6D00] font-bold leading-none">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {errors.message && (
                        <span className="text-xs font-semibold text-rose-500">{errors.message}</span>
                      )}
                      <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute left-3.5 top-3 pointer-events-none text-slate-400 group-focus-within:text-[#00A6FF] transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      maxLength={1000}
                      placeholder="Share details about your target audience, volume expectations, or timeline..."
                      className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-xl bg-slate-50 dark:bg-[#070D18]/90 border transition-all duration-200 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none min-h-[72px] ${
                        errors.message
                          ? 'border-rose-500 ring-1 ring-rose-500/20'
                          : 'border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 focus:border-[#00A6FF] focus:ring-2 focus:ring-[#00A6FF]/25 shadow-xs'
                      }`}
                    />
                  </div>
                </div>

                {/* Row 5: Privacy Agreement & Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Privacy checkbox */}
                  <div className="space-y-0.5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="agreeToPrivacy"
                        checked={formData.agreeToPrivacy}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-slate-300 dark:border-white/20 text-primary dark:text-[#00A6FF] focus:ring-primary/30 cursor-pointer accent-[#00A6FF]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                        I agree to the <span className="underline font-semibold hover:text-primary dark:hover:text-[#00d2ff]">Privacy Policy</span> *
                      </span>
                    </label>
                    {errors.agreeToPrivacy && (
                      <div className="text-xs font-semibold text-rose-500 pl-6">{errors.agreeToPrivacy}</div>
                    )}
                  </div>

                  {/* Submission Error Banner if any */}
                  {errors.submit && (
                    <div className="text-xs font-semibold text-rose-500 bg-rose-500/10 px-3.5 py-1 rounded-lg border border-rose-500/20">
                      {errors.submit}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 cursor-pointer disabled:opacity-60 shadow-md hover:shadow-xl group"
                      style={{
                        background: 'linear-gradient(90deg, #FF6D00 0%, #FF8C00 50%, #00A6FF 100%)',
                        boxShadow: '0 4px 18px rgba(255, 109, 0, 0.35)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleReset}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-1 px-3.5 py-3 min-h-[44px] min-w-[44px] rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/15 hover:bg-slate-300/80 dark:hover:bg-white/15 transition-colors cursor-pointer"
                      title="Clear fields"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="hidden sm:inline">Reset</span>
                    </motion.button>
                  </div>
                </div>

              </form>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default ContactForm
