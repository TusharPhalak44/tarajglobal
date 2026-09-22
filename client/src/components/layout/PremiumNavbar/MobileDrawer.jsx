import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
  LogIn,
  Layers,
  Sparkles
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const SOLUTIONS_GROUPS = [
  {
    category: 'Lead Generation',
    items: [
      { name: 'Email Marketing', path: '/b2b-email-marketing' },
      { name: 'MQL Services', path: '/mql-services' },
      { name: 'HQL Services', path: '/hql-services' },
      { name: 'BANT Services', path: '/bant-lead-generation' },
      { name: 'SQL Services', path: '/sql-services' },
      { name: 'Appointment Generation', path: '/b2b-appointment-setting' },
    ],
  },
  {
    category: 'Demand & ABM',
    items: [
      { name: 'Lead Nurturing', path: '/lead-nurturing' },
      { name: 'Content Syndication', path: '/content-syndication' },
      { name: 'Account-Based Marketing', path: '/abm' },
      { name: 'Webinar Services', path: '/webinar-services' },
      { name: 'Demand Generation', path: '/demand-generation' },
    ],
  },
  {
    category: 'Data & Operations',
    items: [
      { name: 'B2B List Building', path: '/b2b-list-building' },
      { name: 'Database Cleansing', path: '/database-cleansing' },
    ],
  },
]

export const MobileDrawer = ({ isOpen, onClose }) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#070B14] border-l border-slate-200/80 dark:border-white/10 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <Link to="/" onClick={onClose} className="flex items-center">
                <img
                  src="/OnlyTG- 3.png"
                  alt="Taraj Global"
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Links Body */}
            <div className="p-5 space-y-2 flex-1">

              {/* Home */}
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${isActive
                    ? 'bg-sky-500/10 text-[#00A6FF]'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <span>Home</span>
                <ChevronRight size={15} className="text-slate-400" />
              </NavLink>

              {/* Solutions Accordion */}
              <div>
                <button
                  onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-expanded={isSolutionsOpen}
                >
                  <span className="flex items-center gap-2">
                    <span>Solutions</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00A6FF]/10 text-[#00A6FF]">
                      12
                    </span>
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 text-slate-400 ${isSolutionsOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-3 pr-1 py-1 space-y-3"
                    >
                      {/* View All Solutions link */}
                      <Link
                        to="/services"
                        onClick={onClose}
                        className="flex items-center gap-1.5 p-2 rounded-lg text-xs font-bold text-[#00A6FF] bg-sky-500/5 hover:bg-sky-500/10"
                      >
                        <Sparkles size={13} />
                        <span>View All Solutions &amp; Frameworks →</span>
                      </Link>

                      {SOLUTIONS_GROUPS.map((grp) => (
                        <div key={grp.category} className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                            {grp.category}
                          </span>
                          {grp.items.map((it) => (
                            <Link
                              key={it.path}
                              to={it.path}
                              onClick={onClose}
                              className="block py-1.5 px-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:text-[#00A6FF] hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                            >
                              {it.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Us */}
              <NavLink
                to="/about"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${isActive
                    ? 'bg-sky-500/10 text-[#00A6FF]'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <span>About Us</span>
                <ChevronRight size={15} className="text-slate-400" />
              </NavLink>

              {/* Blogs & Insights */}
              <NavLink
                to="/blog"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${isActive
                    ? 'bg-sky-500/10 text-[#00A6FF]'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <span>Blogs &amp; Insights</span>
                <ChevronRight size={15} className="text-slate-400" />
              </NavLink>

              {/* Careers */}
              <NavLink
                to="/careers"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${isActive
                    ? 'bg-sky-500/10 text-[#00A6FF]'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <span>Careers</span>
                <ChevronRight size={15} className="text-slate-400" />
              </NavLink>

              {/* Contact Us */}
              <NavLink
                to="/contact"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors ${isActive
                    ? 'bg-sky-500/10 text-[#00A6FF]'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <span>Contact Us</span>
                <ChevronRight size={15} className="text-slate-400" />
              </NavLink>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-slate-200/80 dark:border-white/10 space-y-3 bg-slate-50/80 dark:bg-black/20">

              {/* Primary CTA */}
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-sky-500/25 active:scale-98 transition-all"
              >
                <span>Start a Conversation</span>
                <ArrowRight size={15} />
              </Link>

              {/* Login link */}
              <Link
                to="/login"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-white/5 transition-colors"
              >
                <LogIn size={14} />
                <span>Client Portal / Login</span>
              </Link>

              {/* Quick Contacts */}
              <div className="pt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between px-1">
                <a href="tel:+919665599442" className="flex items-center gap-1 hover:text-[#00A6FF]">
                  <Phone size={11} /> +91 96655-99442
                </a>
                <a href="mailto:info@tarajglobal.com" className="flex items-center gap-1 hover:text-[#00A6FF]">
                  <Mail size={11} /> info@tarajglobal.com
                </a>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MobileDrawer
