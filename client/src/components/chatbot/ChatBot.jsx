import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Minimize2, Maximize2, RotateCcw, ChevronDown } from 'lucide-react'

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
    response: "Hello! 👋 Welcome to **Taraj Global**! I'm your virtual assistant. I can help you learn about our services, industries we serve, or connect you with our team. What can I help you with today?",
  },
  {
    patterns: ['service', 'services', 'what do you do', 'offer', 'offerings', 'solutions', 'provide'],
    response: "We offer a comprehensive suite of B2B marketing solutions:\n\n**Lead Generation Services:**\n• Content Syndication — Turn high-intent prospects into qualified sales opportunities\n• BANT Lead Generation — Qualify smarter, connect with buyers ready to act\n• MQL Services — Turn marketing engagement into sales-ready opportunities\n• B2B Appointment Setting — Turn targeted outreach into qualified sales meetings\n• B2B Email Marketing — Transform email outreach into qualified opportunities\n• ABM — Target the accounts that drive growth\n• Webinar Services — Create meaningful connections with engaging B2B webinars\n• Lead Nurturing — Nurture every opportunity into a lasting customer relationship\n• Demand Generation — Build a predictable pipeline with strategic demand generation\n\n**Database Services:**\n• B2B List Building — Build a high-precision B2B prospect database\n• Database Cleansing — Maintain accurate data for better business decisions\n\nWould you like to know more about any specific service?",
  },
  {
    patterns: ['about', 'taraj', 'company', 'who are you', 'taraj global', 'tell me about'],
    response: "**Taraj Global** is an ISO 9001:2015 (Quality) and ISO 27001:2022 (Data Security) certified B2B demand generation and technology marketing agency.\n\nWe deliver performance-driven solutions that help technology companies generate high-quality leads, build brand awareness, and accelerate revenue growth.\n\n🏆 Certified. Trusted. Results-focused.",
  },
  {
    patterns: ['contact', 'reach', 'email', 'phone', 'call', 'touch', 'talk'],
    response: "You can reach us through multiple channels:\n\n📧 **Email:** info@tarajglobal.com\n📞 **Phone:** +91 96655-99442\n📍 **Office:** The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014\n\nOr visit our [Contact page](/contact) to send us a message directly!",
  },
  {
    patterns: ['industry', 'industries', 'sector', 'sectors', 'vertical', 'verticals', 'market'],
    response: "We serve a wide range of industries:\n\n• 💻 **Technology & SaaS**\n• ☁️ **Cloud & Infrastructure**\n• 🔒 **Cybersecurity**\n• 📊 **Data & Analytics**\n• 🤖 **Artificial Intelligence**\n• 🏥 **Healthcare IT**\n• 💰 **FinTech**\n• 📦 **Enterprise Software**\n\nOur expertise spans the entire B2B technology landscape.",
  },
  {
    patterns: ['lead', 'leads', 'lead generation', 'generate', 'qualified'],
    response: "Our lead generation engine is built on **precision targeting** and **data intelligence**:\n\n✅ Intent-based targeting\n✅ Multi-channel outreach\n✅ Verified & qualified contacts\n✅ Real-time reporting dashboards\n✅ Full GDPR & CCPA compliance\n\nWe focus on quality over quantity — every lead delivered is ready to engage.",
  },
  {
    patterns: ['abm', 'account based', 'account-based marketing'],
    response: "**Account-Based Marketing (ABM)** is one of our specialisations. We help you:\n\n🎯 Identify & prioritise high-value target accounts\n🎯 Create hyper-personalised content & messaging\n🎯 Engage decision-makers across multiple channels\n🎯 Measure account engagement & pipeline influence\n\nABM with Taraj Global means less waste and more meaningful conversations with the right people.",
  },
  {
    patterns: ['content syndication', 'content', 'syndication', 'publish', 'distribute'],
    response: "Our **Content Syndication** service puts your content in front of your ideal audience:\n\n📰 Distribute whitepapers, eBooks, webinars & more\n📰 Access our network of premium B2B publishers\n📰 Target by job title, company size, industry & intent\n📰 Receive guaranteed lead volumes with full transparency\n\nTurn great content into a powerful pipeline engine.",
  },
  {
    patterns: ['iso', 'certified', 'certification', 'quality', 'security', 'data security'],
    response: "Taraj Global holds two prestigious certifications:\n\n🏆 **ISO 9001:2015** — Quality Management Systems\nEnsures consistent, high-quality delivery across all our processes.\n\n🔐 **ISO 27001:2022** — Information Security Management\nGuarantees your data is protected to the highest international standards.\n\nYour trust and data security are our top priorities.",
  },
  {
    patterns: ['career', 'careers', 'job', 'jobs', 'hiring', 'work', 'join', 'team', 'openings'],
    response: "We're always looking for talented people to join the Taraj Global family! 🚀\n\nVisit our [Careers page](/careers) to:\n\n• Browse current job openings\n• Learn about our culture & benefits\n• Understand our hiring process\n• Apply online\n\nWe believe in growing together!",
  },
  {
    patterns: ['price', 'pricing', 'cost', 'how much', 'budget', 'quote', 'plan'],
    response: "Our pricing is fully **customised** to your business goals and scale. There's no one-size-fits-all approach here!\n\nFactors we consider:\n• Target audience & geography\n• Lead volume requirements\n• Service mix\n• Campaign duration\n\n📞 Reach out to our team for a tailored proposal: **info@tarajglobal.com** or call **+91 96655-99442**.",
  },
  {
    patterns: ['blog', 'article', 'articles', 'insights', 'news', 'resource', 'resources', 'read'],
    response: "Check out our [Blog](/blog) for the latest insights on:\n\n📖 B2B demand generation strategies\n📖 Marketing technology trends\n📖 Account-based marketing guides\n📖 Industry reports & thought leadership\n\nStay ahead of the curve with Taraj Global's knowledge hub!",
  },
  {
    patterns: ['location', 'address', 'where', 'office', 'pune', 'india', 'headquarters'],
    response: "Our headquarters is located in the heart of Pune's tech corridor:\n\n📍 **The Space Business Complex**\nOffice No. 512 to 517, Grant Rd, Kharadi\nPune, Maharashtra 411014, India\n\nKharadi is one of Pune's fastest-growing IT hubs — a fitting home for a forward-thinking agency!",
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome', 'perfect', 'helpful'],
    response: "You're welcome! 😊 I'm glad I could help. Is there anything else you'd like to know about Taraj Global? I'm here anytime!",
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'farewell', 'take care'],
    response: "Goodbye! 👋 Thanks for chatting with us. Don't hesitate to reach out anytime — we're always here to help. Have a wonderful day! 🌟",
  },
]

const FALLBACK_RESPONSES = [
  "That's a great question! For detailed information, I'd recommend reaching out to our team directly at **info@tarajglobal.com** or visiting our [Contact page](/contact).",
  "I'm not sure I have the best answer for that, but our team would love to help! You can reach us at **info@tarajglobal.com** or call **+91 96655-99442**.",
  "Let me connect you with the right people — drop us a line at **info@tarajglobal.com** and our team will get back to you promptly.",
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
  // Bold **text**
  let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Links [label](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-primary/80" target="_self">$1</a>'
  )
  // Newlines
  formatted = formatted.replace(/\n/g, '<br/>')
  return formatted
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 flex-shrink-0">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
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
      className={`flex items-end gap-2 px-4 py-1 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 flex-shrink-0 mb-0.5">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-white/5 border border-white/10 rounded-tl-sm text-white'
            : 'bg-primary text-white rounded-br-sm'
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

// ─── Main Component ──────────────────────────────────────────────────────────

const WELCOME_MSG = {
  id: 'welcome',
  role: 'bot',
  text: "Hi there! 👋 I'm **Taraj**, your virtual assistant. Ask me anything about our services, industries, or how to get in touch — I'm here to help!",
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
  }

  useEffect(() => {
    if (open && !minimised) {
      scrollToBottom()
      setUnread(0)
    }
  }, [messages, open, minimised])

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, minimised])

  // Show scroll-down button when user scrolls up
  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(distFromBottom > 80)
  }

  // ── Send logic ─────────────────────────────────────────────────────────────
  const sendMessage = (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed) return

    const userMsg = { id: Date.now(), role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const delay = 800 + Math.random() * 700
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, role: 'bot', text: getBotResponse(trimmed) }
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

  const resetChat = () => {
    setMessages([WELCOME_MSG])
    setInput('')
    setTyping(false)
    setUnread(0)
  }

  const toggleOpen = () => {
    setOpen((v) => {
      if (!v) {
        setMinimised(false)
        setUnread(0)
      } else {
        // Reset chat when closing
        setMessages([WELCOME_MSG])
        setInput('')
        setTyping(false)
      }
      return !v
    })
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="w-[360px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10,10,18,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,166,255,0.18)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,166,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,166,255,0.15) 0%, rgba(255,109,0,0.10) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00A6FF, #FF6D00)' }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0a12]" />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Taraj Assistant</p>
                <p className="text-green-400 text-[11px] leading-tight">Online · Typically replies instantly</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Reset chat"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMinimised((v) => !v)}
                  title={minimised ? 'Expand' : 'Minimise'}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {minimised ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Body — collapses when minimised */}
            <AnimatePresence initial={false}>
              {!minimised && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex flex-col overflow-hidden"
                  style={{ maxHeight: '440px' }}
                >
                  {/* Messages */}
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto py-3 space-y-0.5 scroll-smooth"
                    style={{
                      maxHeight: '340px',
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

                  {/* Scroll to bottom */}
                  <AnimatePresence>
                    {showScrollBtn && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => scrollToBottom()}
                        className="absolute bottom-20 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg"
                      >
                        <ChevronDown className="w-4 h-4 text-white" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Quick Replies */}
                  <div
                    className="px-3 pt-2 pb-1 flex gap-1.5 overflow-x-auto flex-nowrap"
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

                  {/* Input */}
                  <div
                    className="flex items-center gap-2 px-3 py-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything…"
                      maxLength={300}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 focus:bg-white/8 transition-all duration-200"
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || typing}
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: input.trim() && !typing
                          ? 'linear-gradient(135deg, #00A6FF, #0085CC)'
                          : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
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
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{ border: '2px solid rgba(0,166,255,0.6)' }}
          />
        )}
      </motion.button>
    </div>
  )
}
