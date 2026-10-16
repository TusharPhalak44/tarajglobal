import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useCookies } from './CookieContext'
import CookieToggle from './CookieToggle'

const cookieCategories = [
  {
    key: 'necessary',
    title: 'Necessary Cookies',
    description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
    required: true,
  },
  {
    key: 'analytics',
    title: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    required: false,
  },
  {
    key: 'functional',
    title: 'Functional Cookies',
    description: 'These cookies enable enhanced functionality and personalization, such as videos and live chats.',
    required: false,
  },
  {
    key: 'marketing',
    title: 'Marketing Cookies',
    description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
    required: false,
  },
]

const CookieModal = () => {
  const { isModalOpen, closePreferences, preferences, updatePreference, savePreferences, acceptAll } = useCookies()
  const modalRef = useRef(null)
  const firstFocusableRef = useRef(null)

  // Focus trap
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [isModalOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closePreferences()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, closePreferences])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleSave = () => {
    savePreferences(preferences)
  }

  const handleAcceptAll = () => {
    acceptAll()
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background dark:bg-black/60 backdrop-blur-sm z-50"
            onClick={closePreferences}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div
              ref={modalRef}
              className="bg-surface dark:bg-[#121212]/95 backdrop-blur-xl border border-border dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border dark:border-white/10">
                <h2 id="cookie-modal-title" className="text-lg font-semibold text-text-primary dark:text-white">
                  Cookie Preferences
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePreferences}
                  className="p-2 rounded-full text-text-secondary hover:text-text-accent dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Close"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cookieCategories.map((category) => (
                  <div
                    key={category.key}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface/80 dark:bg-white/5 border border-border dark:border-white/10 hover:border-border dark:border-white/20 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-text-primary dark:text-white">{category.title}</h3>
                        {category.required && (
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/40 dark:bg-primary/20 text-primary rounded-full">
                            Always Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <CookieToggle
                      checked={preferences[category.key]}
                      onChange={(value) => updatePreference(category.key, value)}
                      disabled={category.required}
                      label={`Toggle ${category.title}`}
                    />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-2.5 p-4 sm:p-5 border-t border-border dark:border-white/10 bg-surface/90 dark:bg-[#0C111C]/90 backdrop-blur-md">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex-1 h-11 px-5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all cursor-pointer select-none flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #FF6D00 0%, #FF8533 100%)',
                    boxShadow: '0 4px 16px -2px rgba(255, 109, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  }}
                >
                  Save Preferences
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAcceptAll}
                  className="flex-1 h-11 px-5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all cursor-pointer select-none flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00A6FF 0%, #0077EE 100%)',
                    boxShadow: '0 4px 16px -2px rgba(0, 166, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                  }}
                >
                  Accept All
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closePreferences}
                  className="h-11 px-5 rounded-xl font-medium text-xs sm:text-sm text-text-secondary hover:text-white transition-all border border-border dark:border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer select-none flex items-center justify-center"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CookieModal
