import React, { useState, useRef, useEffect } from 'react'
import DOMPurify from 'dompurify'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Minimize2, Maximize2, RotateCcw, ChevronDown, Sparkles, Phone, Mail, UserCheck } from 'lucide-react'

const QUICK_REPLIES = [
  'What services do you offer?',
  'Tell me about Taraj Global',
  'How can I contact you?',
  'What industries do you serve?',
]

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

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/40 dark:bg-primary/20 flex-shrink-0">
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

function MessageItem({ msg }) {
  const isBot = msg.sender_type === 'bot' || msg.sender_type === 'admin'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 px-4 py-1 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/40 dark:bg-primary/20 flex-shrink-0 mb-0.5">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? 'bg-white/5 border border-white/10 rounded-tl-sm text-white'
            : 'bg-primary text-white rounded-br-sm'
        }`}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatMessage(msg.message)) }}
      />
      {!isBot && (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 flex-shrink-0 mb-0.5">
          <User className="w-4 h-4 text-white/70" />
        </div>
      )}
    </motion.div>
  )
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  
  // Session State
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [formError, setFormError] = useState('')

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // Load existing session from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('taraj_chat_token')
      const savedSession = localStorage.getItem('taraj_chat_session')
      if (savedToken && savedSession) {
        const parsed = JSON.parse(savedSession)
        setSession(parsed)
      }
    } catch (e) {}
  }, [])

  // Auto-scroll
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
  }

  useEffect(() => {
    if (open && !minimised && session) {
      scrollToBottom()
      setUnread(0)
    }
  }, [messages, open, minimised, session])

  useEffect(() => {
    if (open && !minimised && session) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, minimised, session])

  // Poll for new messages every 3 seconds when chat is open and session exists
  useEffect(() => {
    if (!session || !session.session_token) return

    let isMounted = true

    const poll = async () => {
      try {
        const lastId = messages.length > 0 ? messages[messages.length - 1].id : 0
        const res = await fetch(`/api/chat/poll?session_token=${session.session_token}&last_id=${lastId}`)
        const data = await res.json()

        if (isMounted && data.success && data.data?.messages?.length > 0) {
          const newMsgs = data.data.messages
          setMessages((prev) => {
            const existingIds = new Set(prev.map(m => m.id))
            const filtered = newMsgs.filter(m => !existingIds.has(m.id))
            if (filtered.length > 0) {
              if (!open || minimised) setUnread((n) => n + filtered.length)
              return [...prev, ...filtered]
            }
            return prev
          })
        }
      } catch (err) {}
    }

    // Initial poll
    poll()

    const interval = setInterval(poll, 3000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [session, messages, open, minimised])

  // Scroll detection
  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setShowScrollBtn(distFromBottom > 80)
  }

  // Handle Form Input Change
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Submit Pre-Chat Lead Form
  const handleStartChat = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setFormError('Please fill in First Name, Last Name, and Email.')
      return
    }

    setIsSubmittingForm(true)

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim()
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        const newSession = data.data.session
        setSession(newSession)
        setMessages(data.data.messages || [])
        localStorage.setItem('taraj_chat_token', newSession.session_token)
        localStorage.setItem('taraj_chat_session', JSON.stringify(newSession))
      } else {
        setFormError(data.message || 'Failed to start conversation. Please try again.')
      }
    } catch (err) {
      setFormError('Network error. Please try again.')
    } finally {
      setIsSubmittingForm(false)
    }
  }

  // Send User Message
  const sendMessage = async (textToSend) => {
    const trimmed = (textToSend || input).trim()
    if (!trimmed || !session) return

    const tempUserMsg = {
      id: Date.now(),
      session_id: session.id,
      sender_type: 'user',
      sender_name: `${session.first_name} ${session.last_name}`,
      message: trimmed,
      created_at: new Date()
    }

    setMessages((prev) => [...prev, tempUserMsg])
    setInput('')
    setTyping(true)

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_token: session.session_token,
          message: trimmed
        })
      })

      const data = await res.json()
      setTyping(false)

      if (res.ok && data.success) {
        if (data.data.botMessage) {
          setMessages((prev) => [...prev, data.data.botMessage])
        }
      }
    } catch (err) {
      setTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    localStorage.removeItem('taraj_chat_token')
    localStorage.removeItem('taraj_chat_session')
    setSession(null)
    setMessages([])
    setFormData({ firstName: '', lastName: '', email: '', phone: '' })
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
            className="w-[360px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(10,10,18,0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,166,255,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,166,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,166,255,0.18) 0%, rgba(255,109,0,0.12) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #00A6FF, #FF6D00)' }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a12]" />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Taraj Assistant</p>
                <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1 leading-tight mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online · Replies instantly
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {session && (
                  <button
                    onClick={resetChat}
                    title="New Session"
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
                  {minimised ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
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

            {/* Body */}
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
                  {!session ? (
                    /* ── Pre-Chat Lead Form ── */
                    <form onSubmit={handleStartChat} className="p-5 space-y-3.5 text-left">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center justify-center p-2 rounded-xl bg-[#00A6FF]/10 text-[#00A6FF] mb-2">
                          <Sparkles size={20} />
                        </div>
                        <h3 className="text-base font-bold text-white">Welcome to Taraj Global</h3>
                        <p className="text-xs text-slate-400 mt-1">Please introduce yourself to start chatting with our assistant.</p>
                      </div>

                      {formError && (
                        <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleFormChange}
                            placeholder="John"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00A6FF] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleFormChange}
                            placeholder="Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00A6FF] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Email Address *</label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="john@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00A6FF] transition-colors"
                          />
                          <Mail size={14} className="absolute left-3 top-2.5 text-slate-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00A6FF] transition-colors"
                          />
                          <Phone size={14} className="absolute left-3 top-2.5 text-slate-400" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingForm}
                        className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#0077CC] hover:from-[#0077CC] hover:to-[#0055A0] text-white font-bold text-xs shadow-lg shadow-[#00A6FF]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingForm ? (
                          <span>Starting Chat...</span>
                        ) : (
                          <>
                            <UserCheck size={15} />
                            <span>Start Conversation</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* ── Active Chat Interface ── */
                    <div className="flex flex-col" style={{ maxHeight: '440px' }}>
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
                          <MessageItem key={msg.id || Math.random()} msg={msg} />
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

                      {/* Message Input */}
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
                          placeholder="Type your message..."
                          maxLength={300}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-primary/50 transition-all duration-200"
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
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
        style={{
          background: open
            ? 'linear-gradient(135deg, #EF4444, #DC2626)'
            : 'linear-gradient(135deg, #FF6D00, #FF6D00)',
          boxShadow: open
            ? '0 0 30px rgba(239,68,68,0.4), 0 8px 32px rgba(0,0,0,0.5)'
            : '0 0 30px rgba(255,109,0,0.45), 0 8px 32px rgba(0,0,0,0.5)',
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
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow"
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
            style={{ border: '2px solid rgba(255,109,0,0.6)' }}
          />
        )}
      </motion.button>
    </div>
  )
}
