import React, { useState, useEffect, useRef } from 'react'
import { 
  MessageSquare, User, Mail, Phone, Clock, Send, Search, RefreshCw, 
  CheckCircle, ShieldAlert, Bot, Sparkles, Filter, XCircle, ChevronRight 
} from 'lucide-react'

export default function LiveChat() {
  const [sessions, setSessions] = useState([])
  const [selectedSessionId, setSelectedSessionId] = useState(null)
  const [currentSession, setCurrentSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [adminReplyInput, setAdminReplyInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const messagesEndRef = useRef(null)

  // Fetch all chat sessions
  const fetchSessions = async (quiet = false) => {
    if (!quiet) setLoading(true)
    try {
      const res = await fetch('/api/chat/admin/sessions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSessions(data.data || [])
        if (!selectedSessionId && data.data && data.data.length > 0) {
          setSelectedSessionId(data.data[0].id)
        }
      }
    } catch (err) {
      if (!quiet) setError('Failed to load chat sessions.')
    } finally {
      if (!quiet) setLoading(false)
    }
  }

  // Fetch messages for selected session
  const fetchSessionMessages = async (sessionId, quiet = false) => {
    if (!sessionId) return
    try {
      const res = await fetch(`/api/chat/admin/sessions/${sessionId}/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setCurrentSession(data.data.session)
        setMessages(data.data.messages || [])
      }
    } catch (err) {
      console.error('Error loading session messages:', err)
    }
  }

  // Initial load
  useEffect(() => {
    fetchSessions()
  }, [])

  // When selected session changes, load its messages
  useEffect(() => {
    if (selectedSessionId) {
      fetchSessionMessages(selectedSessionId)
    }
  }, [selectedSessionId])

  // Polling every 4 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSessions(true)
      if (selectedSessionId) {
        fetchSessionMessages(selectedSessionId, true)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedSessionId])

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Send Admin Reply
  const handleSendAdminReply = async (e) => {
    e.preventDefault()
    if (!adminReplyInput.trim() || !selectedSessionId) return

    setSending(true)
    try {
      const res = await fetch(`/api/chat/admin/sessions/${selectedSessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: adminReplyInput.trim() })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setAdminReplyInput('')
        fetchSessionMessages(selectedSessionId, true)
        fetchSessions(true)
      } else {
        alert(data.message || 'Failed to send message.')
      }
    } catch (err) {
      alert('Network error. Failed to send reply.')
    } finally {
      setSending(false)
    }
  }

  // Filter sessions
  const filteredSessions = sessions.filter(s => {
    const query = searchQuery.toLowerCase()
    return (
      s.first_name?.toLowerCase().includes(query) ||
      s.last_name?.toLowerCase().includes(query) ||
      s.email?.toLowerCase().includes(query) ||
      s.phone?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20">
            <MessageSquare size={26} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Live Chat & Visitor Console</h1>
            <p className="text-xs text-slate-400 mt-1">Monitor visitor leads, view real-time chat transcripts, and take over live conversations.</p>
          </div>
        </div>

        <button
          onClick={() => { fetchSessions(); if (selectedSessionId) fetchSessionMessages(selectedSessionId); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Left Column: Sessions List (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-lg">
          {/* Search Bar */}
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 outline-none focus:border-[#00A6FF] transition-colors"
              />
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {loading && sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">Loading chat sessions...</div>
            ) : filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No chat sessions found.</div>
            ) : (
              filteredSessions.map((s) => {
                const isSelected = s.id === selectedSessionId
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSessionId(s.id)}
                    className={`p-4 cursor-pointer transition-all border-l-4 ${
                      isSelected
                        ? 'bg-slate-800/80 border-l-[#00A6FF]'
                        : 'hover:bg-slate-800/40 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-white truncate">{s.first_name} {s.last_name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(s.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 truncate mb-2 font-mono">{s.email}</p>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        s.isLiveAgentActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}>
                        {s.isLiveAgentActive ? '🟢 Live Agent Mode' : '🤖 Bot Mode'}
                      </span>

                      <span className="text-slate-500">{s.user_msg_count || 0} msgs</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Conversation (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-lg">
          {currentSession ? (
            <>
              {/* Visitor Details Card Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center text-white font-bold text-sm shadow">
                    {currentSession.first_name?.[0]}{currentSession.last_name?.[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{currentSession.first_name} {currentSession.last_name}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-mono"><Mail size={12} /> {currentSession.email}</span>
                      {currentSession.phone && <span className="flex items-center gap-1 font-mono"><Phone size={12} /> {currentSession.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* Mode Status Indicator */}
                <div className="flex items-center gap-2">
                  {currentSession.isLiveAgentActive ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Agent Active (Bot Muted)
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
                      <Bot size={13} />
                      Bot Responding Automatically
                    </span>
                  )}
                </div>
              </div>

              {/* Chat Transcript Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-slate-950/40">
                {messages.map((m) => {
                  const isUser = m.sender_type === 'user'
                  const isAdmin = m.sender_type === 'admin'
                  const isBot = m.sender_type === 'bot'

                  return (
                    <div key={m.id} className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {isUser ? `${currentSession.first_name} (Visitor)` : isAdmin ? 'You (Live Admin)' : 'Bot Auto-Reply'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-sm'
                          : isAdmin
                          ? 'bg-gradient-to-r from-[#00A6FF] to-[#0077CC] text-white rounded-tr-sm shadow-md font-medium'
                          : 'bg-slate-900 border border-slate-700/80 text-slate-300 rounded-tr-sm'
                      }`}>
                        {m.message}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Admin Reply Form */}
              <form onSubmit={handleSendAdminReply} className="p-4 border-t border-slate-800 bg-slate-900 flex items-center gap-3">
                <input
                  type="text"
                  value={adminReplyInput}
                  onChange={(e) => setAdminReplyInput(e.target.value)}
                  placeholder="Type your live reply to visitor (will mute bot for 2 mins)..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-[#00A6FF] transition-colors"
                />

                <button
                  type="submit"
                  disabled={!adminReplyInput.trim() || sending}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#0077CC] hover:from-[#0077CC] hover:to-[#0055A0] text-white text-xs font-bold shadow-lg shadow-[#00A6FF]/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Send size={14} />
                  <span>Send Reply</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <MessageSquare size={40} className="mb-3 text-slate-600" />
              <p className="text-sm font-semibold">Select a chat session from the left to view visitor details and reply live.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
