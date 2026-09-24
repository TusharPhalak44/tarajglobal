import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  RotateCcw,
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { chatbotAPI } from '@api'

// ─── Country Codes for Phone Input ────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: '+91', country: 'IN', label: 'India (+91)' },
  { code: '+1', country: 'US', label: 'United States (+1)' },
  { code: '+44', country: 'GB', label: 'United Kingdom (+44)' },
  { code: '+61', country: 'AU', label: 'Australia (+61)' },
  { code: '+1', country: 'CA', label: 'Canada (+1)' },
  { code: '+65', country: 'SG', label: 'Singapore (+65)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
  { code: '+49', country: 'DE', label: 'Germany (+49)' },
  { code: '+33', country: 'FR', label: 'France (+33)' },
  { code: '+81', country: 'JP', label: 'Japan (+81)' },
  { code: '+41', country: 'CH', label: 'Switzerland (+41)' },
  { code: '+31', country: 'NL', label: 'Netherlands (+31)' },
  { code: '+60', country: 'MY', label: 'Malaysia (+60)' },
  { code: '+966', country: 'SA', label: 'Saudi Arabia (+966)' },
]

// ─── Knowledge Base ───────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  'What services do you offer?',
  'Tell me about Taraj Global',
  'How can I contact you?',
  'What industries do you serve?',
]

const BOT_RESPONSES = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
    response: "Hello! 👋 Welcome to **Taraj Global**! I'm your virtual assistant. I can help you learn about our services, industries we serve, or connect you directly with our team. How can I assist you further?",
  },
  {
    patterns: ['service', 'services', 'what do you do', 'offer', 'offerings', 'solutions', 'provide'],
    response: "We offer a comprehensive suite of B2B marketing and demand generation solutions:\n\n**Lead Generation Services:**\n• **Content Syndication** — Turn high-intent prospects into qualified sales opportunities\n• **BANT Lead Generation** — Qualify smarter, connect with buyers ready to act\n• **MQL Services** — Turn marketing engagement into sales-ready opportunities\n• **B2B Appointment Setting** — Turn targeted outreach into qualified sales meetings\n• **B2B Email Marketing** — Transform email outreach into qualified opportunities\n• **ABM** — Target high-value accounts that drive growth\n• **Webinar Services** — Engage decision-makers with B2B webinars\n• **Lead Nurturing** — Nurture every opportunity into a lasting customer relationship\n• **Demand Generation** — Build a predictable pipeline with strategic demand generation\n\n**Database Services:**\n• **B2B List Building** — Build a high-precision B2B prospect database\n• **Database Cleansing** — Maintain accurate data for better business decisions\n\nWould you like to explore any specific service?",
  },
  {
    patterns: ['about', 'taraj', 'company', 'who are you', 'taraj global', 'tell me about'],
    response: "**Taraj Global** is an ISO 9001:2015 (Quality) and ISO 27001:2022 (Data Security) certified B2B demand generation and technology marketing agency.\n\nWe deliver performance-driven solutions that help technology companies generate high-quality leads, build brand awareness, and accelerate revenue growth.\n\n🏆 Certified. Trusted. Results-focused.",
  },
  {
    patterns: ['contact', 'reach', 'email', 'phone', 'call', 'touch', 'talk', 'speak'],
    response: "You can reach our team through multiple direct channels:\n\n📧 **Email:** info@tarajglobal.com\n📞 **Phone:** +91 96655-99442\n📍 **Office:** The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014\n\nOr visit our [Contact page](/contact) to schedule a strategy call!",
  },
  {
    patterns: ['industry', 'industries', 'sector', 'sectors', 'vertical', 'verticals', 'market'],
    response: "We serve a wide range of technology sectors:\n\n• 💻 **Technology & SaaS**\n• ☁️ **Cloud & Infrastructure**\n• 🔒 **Cybersecurity**\n• 📊 **Data & Analytics**\n• 🤖 **Artificial Intelligence**\n• 🏥 **Healthcare IT**\n• 💰 **FinTech**\n• 📦 **Enterprise Software**\n\nOur expertise spans the entire global B2B technology landscape.",
  },
  {
    patterns: ['lead', 'leads', 'lead generation', 'generate', 'qualified'],
    response: "Our lead generation engine is built on **precision targeting** and **data intelligence**:\n\n✅ Intent-based targeting\n✅ Multi-channel outreach (Email, Phone, Social)\n✅ Verified & qualified contacts with 100% SMTP validation\n✅ Real-time reporting dashboards via DemandFlow Bridge\n✅ Full GDPR & CCPA compliance\n\nWe focus on quality over quantity — every lead delivered is sales-ready.",
  },
  {
    patterns: ['abm', 'account based', 'account-based marketing'],
    response: "**Account-Based Marketing (ABM)** is one of our flagship specialisations. We help you:\n\n🎯 Identify & prioritise high-value target accounts (TAL)\n🎯 Map buying committees and key budget holders\n🎯 Create hyper-personalised 1:1 content & messaging\n🎯 Measure account engagement & pipeline influence\n\nABM with Taraj Global means zero waste and deeper enterprise penetration.",
  },
  {
    patterns: ['content syndication', 'content', 'syndication', 'publish', 'distribute', 'whitepaper'],
    response: "Our **Content Syndication** service puts your authoritative content directly in front of your ideal buyers:\n\n📰 Distribute whitepapers, eBooks, reports & guides\n📰 Access our network of premium B2B publishers\n📰 Target by job title, company size, industry & intent\n📰 Receive guaranteed lead volumes with fixed CPL terms",
  },
  {
    patterns: ['iso', 'certified', 'certification', 'quality', 'security', 'data security'],
    response: "Taraj Global holds two prestigious international certifications:\n\n🏆 **ISO 9001:2015** — Quality Management Systems\nEnsures consistent, high-quality delivery across all our processes.\n\n🔐 **ISO 27001:2022** — Information Security Management\nGuarantees your data is protected to the highest global standards.",
  },
  {
    patterns: ['career', 'careers', 'job', 'jobs', 'hiring', 'work', 'join', 'team', 'openings'],
    response: "We're always looking for ambitious talent to join the Taraj Global family! 🚀\n\nVisit our [Careers page](/careers) to browse current job openings, understand our hiring process, and apply online!",
  },
  {
    patterns: ['price', 'pricing', 'cost', 'how much', 'budget', 'quote', 'plan', 'rate'],
    response: "Our pricing is fully **customised** to your business goals, target markets, and campaign scale:\n\nFactors we consider:\n• Target audience & geography\n• Lead volume requirements\n• Service mix (CPL, Appointment Setting, ABM)\n• Campaign duration\n\n📞 Reach out to our team for a tailored proposal: **info@tarajglobal.com** or call **+91 96655-99442**.",
  },
  {
    patterns: ['blog', 'article', 'articles', 'insights', 'news', 'resource', 'resources', 'read'],
    response: "Check out our [Blog](/blog) for the latest insights on:\n\n📖 B2B demand generation strategies\n📖 Marketing technology trends\n📖 Account-based marketing playbooks\n📖 Industry benchmarks & thought leadership",
  },
  {
    patterns: ['location', 'address', 'where', 'office', 'pune', 'india', 'headquarters'],
    response: "Our headquarters is located in Pune's premier tech corridor:\n\n📍 **The Space Business Complex**\nOffice No. 512 to 517, Grant Rd, Kharadi\nPune, Maharashtra 411014, India",
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect', 'helpful'],
    response: "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to explore about Taraj Global? I'm here anytime!",
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'farewell', 'take care'],
    response: "Goodbye! 👋 Thanks for chatting with us today. Our team will review your inquiry and follow up shortly. Have a productive day! 🌟",
  },
]

const FALLBACK_RESPONSES = [
  "Thank you for sharing that! Our team of B2B specialists will review your requirements and follow up with tailored insights. You can also reach us directly at **info@tarajglobal.com**.",
  "That's a great question! For a detailed strategy tailored to your organization, feel free to contact our senior strategists at **info@tarajglobal.com** or call **+91 96655-99442**.",
  "I've noted this in your session context. Our growth consultants are ready to assist you further — you can also reach us on our [Contact page](/contact).",
]

function getBotResponse(input) {
  const lower = input.toLowerCase().trim()
  for (const entry of BOT_RESPONSES) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry.response
    }
  }
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
}

function formatMessage(text) {
  if (!text) return ''
  let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-primary/80" target="_self">$1</a>'
  )
  formatted = formatted.replace(/\n/g, '<br/>')
  return formatted
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 flex-shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 px-4 py-1.5 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 flex-shrink-0 mb-0.5">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
          isBot
            ? 'bg-white/5 border border-white/10 rounded-tl-sm text-slate-100 shadow-sm'
            : 'bg-primary text-white rounded-br-sm shadow-sm'
        }`}
        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
      />
      {!isBot && (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 flex-shrink-0 mb-0.5">
          <User className="w-4 h-4 text-white/70" />
        </div>
      )}
    </motion.div>
  )
}

// ─── Session Storage Key ──────────────────────────────────────────────────────
const STORAGE_KEY = 'taraj_chatbot_session_v1'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  
  // Session / Lead state
  const [session, setSession] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Stage: 'form' (pre-chat lead capture) or 'chat' (active conversation)
  const [stage, setStage] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      return saved ? 'chat' : 'form'
    } catch {
      return 'form'
    }
  })

  // Pre-Chat Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    question: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Chat conversation state
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.messages && parsed.messages.length > 0) {
          return parsed.messages
        }
      }
    } catch {
      // fallback
    }
    return []
  })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const nameInputRef = useRef(null)

  // ── Sync Session to Storage ────────────────────────────────────────────────
  useEffect(() => {
    if (session && stage === 'chat') {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...session,
            messages,
          })
        )
      } catch (err) {
        console.error('Failed to sync session storage:', err)
      }
    }
  }, [session, stage, messages])

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
  }

  useEffect(() => {
    if (open && !minimised && stage === 'chat') {
      scrollToBottom()
      setUnread(0)
    }
  }, [messages, open, minimised, stage])

  useEffect(() => {
    if (open && !minimised) {
      if (stage === 'form') {
        setTimeout(() => nameInputRef.current?.focus(), 250)
      } else if (stage === 'chat') {
        setTimeout(() => inputRef.current?.focus(), 250)
      }
    }
  }, [open, minimised, stage])

  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(distFromBottom > 80)
  }

  // ── Form Validation ────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {}
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()
    const trimmedQuestion = formData.question.trim()

    // Name validation
    if (!trimmedName) {
      newErrors.name = 'Please enter your name.'
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    }

    // Business Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your business email.'
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid business email.'
    }

    // Phone validation
    const digitsOnly = trimmedPhone.replace(/\D/g, '')
    if (!trimmedPhone) {
      newErrors.phone = 'Please enter your phone number.'
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (7–15 digits).'
    }

    // Question validation
    if (!trimmedQuestion) {
      newErrors.question = 'Please tell us how we can help.'
    } else if (trimmedQuestion.length < 5) {
      newErrors.question = 'Please provide a little more detail in your question.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Pre-Chat Form Submit Handler ───────────────────────────────────────────
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    if (!validateForm()) {
      return
    }

    const fullPhone = `${formData.countryCode} ${formData.phone.trim()}`
    const userName = formData.name.trim()
    const userEmail = formData.email.trim()
    const userQuestion = formData.question.trim()

    setSubmitting(true)

    try {
      let leadId = null
      let sessionId = `cb_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`

      try {
        const response = await chatbotAPI.createLead({
          name: userName,
          email: userEmail,
          phone: fullPhone,
          question: userQuestion,
        })
        if (response?.data?.data) {
          leadId = response.data.data.leadId
          sessionId = response.data.data.sessionId || sessionId
        }
      } catch (apiError) {
        console.warn('Chatbot lead API call completed with offline fallback:', apiError?.message)
      }

      const newSession = {
        leadId,
        sessionId,
        name: userName,
        email: userEmail,
        phone: fullPhone,
        initialQuestion: userQuestion,
        createdAt: new Date().toISOString(),
      }

      // Initialise conversation with user's question
      const userMsg = {
        id: `user_${Date.now()}`,
        role: 'user',
        text: userQuestion,
      }

      const firstName = userName.split(' ')[0]
      const answer = getBotResponse(userQuestion)
      const botMsg = {
        id: `bot_${Date.now() + 1}`,
        role: 'bot',
        text: `Hi **${firstName}**! 👋 Thanks for reaching out.\n\nI received your question:\n> *"${userQuestion}"*\n\n${answer}`,
      }

      const initialMessages = [userMsg, botMsg]

      setSession(newSession)
      setMessages(initialMessages)
      setStage('chat')

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...newSession,
            messages: initialMessages,
          })
        )
      } catch {
        // ignore storage errors
      }
    } catch (err) {
      console.error('Failed to submit pre-chat form:', err)
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Send Message logic ─────────────────────────────────────────────────────
  const sendMessage = (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed) return

    const userMsg = { id: `user_${Date.now()}`, role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const delay = 600 + Math.random() * 600
    setTimeout(() => {
      const botMsg = {
        id: `bot_${Date.now() + 1}`,
        role: 'bot',
        text: getBotResponse(trimmed),
      }
      setTyping(false)
      setMessages((prev) => [...prev, botMsg])
      if (!open || minimised) setUnread((n) => n + 1)
    }, delay)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Reset chat and start fresh
  const resetChat = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setSession(null)
    setMessages([])
    setStage('form')
    setFormData({
      name: '',
      email: '',
      countryCode: '+91',
      phone: '',
      question: '',
    })
    setErrors({})
    setSubmitError('')
    setInput('')
    setTyping(false)
    setUnread(0)
  }

  const toggleOpen = () => {
    setOpen((v) => {
      if (!v) {
        setMinimised(false)
        setUnread(0)
      }
      return !v
    })
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-sans">
      {/* ── Chatbot Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="w-[calc(100vw-32px)] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10, 10, 18, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 166, 255, 0.22)',
              boxShadow:
                '0 24px 64px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(0, 166, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* ── Window Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0, 166, 255, 0.18) 0%, rgba(255, 109, 0, 0.12) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #00A6FF, #FF6D00)' }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0a12]" />
              </div>

              {/* Title & Status */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  Taraj Assistant
                </p>
                <p className="text-emerald-400 text-[11px] leading-tight flex items-center gap-1 font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Instant Response
                </p>
              </div>

              {/* Control Actions */}
              <div className="flex items-center gap-1">
                {stage === 'chat' && (
                  <button
                    onClick={resetChat}
                    title="New conversation"
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setMinimised((v) => !v)}
                  title={minimised ? 'Expand' : 'Minimise'}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {minimised ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Window Body ── */}
            <AnimatePresence initial={false}>
              {!minimised && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex flex-col overflow-hidden"
                >
                  {/* ────────────────────────────────────────────────────────── */}
                  {/* VIEW 1: PRE-CHAT LEAD CAPTURE FORM                        */}
                  {/* ────────────────────────────────────────────────────────── */}
                  {stage === 'form' ? (
                    <div
                      className="p-4 overflow-y-auto max-h-[500px]"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(0,166,255,0.3) transparent',
                      }}
                    >
                      {/* Form Header / Intro */}
                      <div className="mb-4 text-center">
                        <div className="inline-flex items-center justify-center p-2 rounded-xl bg-primary/10 border border-primary/20 mb-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-white font-semibold text-base leading-snug">
                          Let's Get Started
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Tell us a bit about yourself to connect with our B2B team.
                        </p>
                      </div>

                      {submitError && (
                        <div className="mb-3.5 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
                          {submitError}
                        </div>
                      )}

                      <form onSubmit={handleFormSubmit} className="space-y-3" noValidate>
                        {/* 1. Full Name */}
                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              ref={nameInputRef}
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                              }}
                              placeholder="Enter your name"
                              className={`w-full bg-white/5 border rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                                errors.name
                                  ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/40'
                                  : 'border-white/10 focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/40'
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* 2. Business Email */}
                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Business Email <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                              }}
                              placeholder="Enter your business email"
                              className={`w-full bg-white/5 border rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                                errors.email
                                  ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/40'
                                  : 'border-white/10 focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/40'
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* 3. Phone Number with Country Code */}
                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Phone Number <span className="text-primary">*</span>
                          </label>
                          <div className="flex gap-2">
                            {/* Country Selector */}
                            <div className="relative flex-shrink-0 w-[100px]">
                              <select
                                value={formData.countryCode}
                                onChange={(e) =>
                                  setFormData((prev) => ({ ...prev, countryCode: e.target.value }))
                                }
                                className="w-full bg-[#121222] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer"
                              >
                                {COUNTRY_CODES.map((item, idx) => (
                                  <option key={`${item.country}-${idx}`} value={item.code} className="bg-[#0a0a14] text-white">
                                    {item.country} ({item.code})
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                            </div>

                            {/* Phone Input */}
                            <div className="relative flex-1">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                                }}
                                placeholder="Enter your phone number"
                                className={`w-full bg-white/5 border rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 ${
                                  errors.phone
                                    ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/40'
                                    : 'border-white/10 focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/40'
                                }`}
                              />
                            </div>
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* 4. Your Question */}
                        <div>
                          <label className="block text-[11px] font-medium text-slate-300 mb-1">
                            Your Question <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <textarea
                              rows={3}
                              name="question"
                              value={formData.question}
                              onChange={(e) => {
                                setFormData((prev) => ({ ...prev, question: e.target.value }))
                                if (errors.question) setErrors((prev) => ({ ...prev, question: '' }))
                              }}
                              placeholder="How can we help you?"
                              maxLength={1000}
                              className={`w-full bg-white/5 border rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none resize-none transition-all duration-200 ${
                                errors.question
                                  ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/40'
                                  : 'border-white/10 focus:border-primary/60 focus:bg-white/8 focus:ring-1 focus:ring-primary/40'
                              }`}
                            />
                          </div>
                          {errors.question && (
                            <p className="text-[11px] text-red-400 mt-1 font-medium pl-1">
                              {errors.question}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          disabled={submitting}
                          whileTap={submitting ? {} : { scale: 0.98 }}
                          className="w-full mt-2 py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{
                            background:
                              'linear-gradient(135deg, #00A6FF 0%, #0070E0 60%, #FF6D00 100%)',
                            boxShadow: '0 4px 20px rgba(0, 166, 255, 0.35)',
                          }}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>Connecting to Assistant...</span>
                            </>
                          ) : (
                            <>
                              <span>Start Chat</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>

                        {/* Privacy note */}
                        <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1 mt-1">
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>We respect your privacy. No spam guaranteed.</span>
                        </p>
                      </form>
                    </div>
                  ) : (
                    /* ────────────────────────────────────────────────────────── */
                    /* VIEW 2: ACTIVE CHAT CONVERSATION                           */
                    /* ────────────────────────────────────────────────────────── */
                    <div className="flex flex-col" style={{ maxHeight: '460px' }}>
                      {/* Active Contact Pill */}
                      {session?.name && (
                        <div className="px-3.5 py-1.5 bg-primary/10 border-b border-primary/20 flex items-center justify-between text-[11px] text-slate-300">
                          <span className="flex items-center gap-1.5 truncate">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>Chatting as <strong className="text-white">{session.name}</strong></span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {session.email}
                          </span>
                        </div>
                      )}

                      {/* Messages Container */}
                      <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto py-3 space-y-1 scroll-smooth"
                        style={{
                          height: '320px',
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(0,166,255,0.3) transparent',
                        }}
                      >
                        {messages.map((msg) => (
                          <Message key={msg.id} msg={msg} />
                        ))}
                        {typing && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Scroll to bottom button */}
                      <AnimatePresence>
                        {showScrollBtn && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => scrollToBottom()}
                            className="absolute bottom-20 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                          >
                            <ChevronDown className="w-4 h-4 text-white" />
                          </motion.button>
                        )}
                      </AnimatePresence>

                      {/* Quick Replies */}
                      <div
                        className="px-3 pt-2 pb-1.5 flex gap-1.5 overflow-x-auto flex-nowrap"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        {QUICK_REPLIES.map((qr) => (
                          <button
                            key={qr}
                            onClick={() => sendMessage(qr)}
                            className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-200 whitespace-nowrap"
                            style={{ background: 'rgba(0,166,255,0.06)' }}
                          >
                            {qr}
                          </button>
                        ))}
                      </div>

                      {/* Input Area */}
                      <div
                        className="flex items-center gap-2 px-3 py-2.5"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your message..."
                          maxLength={400}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-primary/60 focus:bg-white/8 transition-all duration-200"
                        />
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => sendMessage()}
                          disabled={!input.trim() || typing}
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            background:
                              input.trim() && !typing
                                ? 'linear-gradient(135deg, #00A6FF, #0085CC)'
                                : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          <Send className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button ── */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: open
            ? 'linear-gradient(135deg, #EF4444, #DC2626)'
            : 'linear-gradient(135deg, #00A6FF, #FF6D00)',
          boxShadow: open
            ? '0 0 30px rgba(239,68,68,0.4), 0 8px 32px rgba(0,0,0,0.5)'
            : '0 0 30px rgba(0,166,255,0.45), 0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Ripple ring */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{ border: '2px solid rgba(0,166,255,0.6)' }}
          />
        )}
      </motion.button>
    </div>
  )
}
