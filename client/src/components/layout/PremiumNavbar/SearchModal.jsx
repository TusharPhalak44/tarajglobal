import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Sparkles, FileText, Layers, Building, Briefcase, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const SEARCH_DIRECTORY = [
  // Solutions
  { title: 'SQL Services', path: '/sql-services', category: 'Solutions', desc: 'Sales Qualified Leads matching strict ICP criteria', icon: Layers },
  { title: 'BANT Services', path: '/bant-lead-generation', category: 'Solutions', desc: 'Budget, Authority, Need and Timeline verified', icon: Layers },
  { title: 'MQL Services', path: '/mql-services', category: 'Solutions', desc: 'Marketing Qualified Leads for demand generation', icon: Layers },
  { title: 'HQL Services', path: '/hql-services', category: 'Solutions', desc: 'High-Quality Leads with verified intent and interest', icon: Layers },
  { title: 'B2B Appointment Setting', path: '/b2b-appointment-setting', category: 'Solutions', desc: 'Direct discovery meetings with key buyers', icon: Layers },
  { title: 'Account-Based Marketing (ABM)', path: '/abm', category: 'Solutions', desc: 'Targeted high-value enterprise account campaigns', icon: Layers },
  { title: 'Content Syndication', path: '/content-syndication', category: 'Solutions', desc: 'Multi-touch enterprise whitepaper distribution', icon: Layers },
  { title: 'Demand Generation', path: '/demand-generation', category: 'Solutions', desc: 'End-to-end full funnel demand acceleration', icon: Layers },
  { title: 'Webinar Services', path: '/webinar-services', category: 'Solutions', desc: 'Executive audience registration and engagement', icon: Layers },
  { title: 'Lead Nurturing', path: '/lead-nurturing', category: 'Solutions', desc: 'Multi-channel outbound warming sequences', icon: Layers },
  { title: 'B2B List Building', path: '/b2b-list-building', category: 'Solutions', desc: 'Human-verified custom prospect databases', icon: Layers },
  { title: 'Database Cleansing', path: '/database-cleansing', category: 'Solutions', desc: 'Data hygiene, enrichment and deduplication', icon: Layers },
  { title: 'B2B Email Marketing', path: '/b2b-email-marketing', category: 'Solutions', desc: 'High-converting personalized email cadences', icon: Layers },

  // Pages
  { title: 'All Solutions & Services', path: '/services', category: 'Pages', desc: 'Explore all demand generation services', icon: Sparkles },
  { title: 'Industries We Serve', path: '/industries', category: 'Pages', desc: 'SaaS, Cloud, Cybersecurity, FinTech & Enterprise', icon: Building },
  { title: 'About Taraj Global', path: '/about', category: 'Pages', desc: 'Our mission, vision, and executive leadership', icon: FileText },
  { title: 'Careers at Taraj Global', path: '/careers', category: 'Pages', desc: 'Join our fast-growing demand generation team', icon: Briefcase },
  { title: 'Blogs & Insights', path: '/blog', category: 'Pages', desc: 'Latest B2B demand generation research and guides', icon: FileText },
  { title: 'Contact Us', path: '/contact', category: 'Pages', desc: 'Schedule a free pipeline and TAM consultation', icon: Mail },
]

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setQuery('')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filteredResults = query.trim() === ''
    ? SEARCH_DIRECTORY.slice(0, 6)
    : SEARCH_DIRECTORY.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    )

  const handleSelect = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0D1322] border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Quick Search"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]">
              <Search size={18} className="text-[#00A6FF] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search solutions, services, or pages (e.g., ABM, SQL, About)..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/15 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                {query ? `Search Results (${filteredResults.length})` : 'Popular Destinations'}
              </div>

              {filteredResults.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                  No matching services or pages found for "<span className="text-slate-800 dark:text-slate-200 font-semibold">{query}</span>"
                </div>
              ) : (
                filteredResults.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleSelect(item.path)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 dark:bg-sky-500/15 text-[#00A6FF] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00A6FF] transition-colors">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00A6FF]" />
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 sm:px-6 py-2.5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              <span>Quick Navigation</span>
              <span>Taraj Global Growth Network</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SearchModal
