import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cookie, Shield, Check, X, Save, RefreshCw } from 'lucide-react'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'

function CookieSettings() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: false,
    functionality: false,
    marketing: false
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPrefs = localStorage.getItem('cookiePreferences')
    if (savedPrefs) {
      setCookiePreferences(JSON.parse(savedPrefs))
    }
  }, [])

  const handleToggle = (type) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      functionality: true,
      marketing: true
    })
    setSaved(false)
  }

  const handleRejectAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
      functionality: false,
      marketing: false
    })
    setSaved(false)
  }

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      icon: <Shield className="w-5 h-5" />,
      locked: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website by collecting anonymous data.',
      icon: <Cookie className="w-5 h-5" />,
      locked: false
    },
    {
      id: 'functionality',
      name: 'Functionality Cookies',
      description: 'Remember your preferences and provide enhanced features.',
      icon: <Cookie className="w-5 h-5" />,
      locked: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track marketing campaigns.',
      icon: <Cookie className="w-5 h-5" />,
      locked: false
    }
  ]

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-cta mb-6"
            >
              <Cookie className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Cookie Settings
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Manage your cookie preferences. You can enable or disable different types of cookies based on your preferences.
            </p>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="px-6 py-3 bg-surface/10 text-text-primary font-semibold rounded-xl border border-border hover:bg-surface/20 transition-all duration-300 flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Reject Non-Essential
            </button>
          </motion.div>

          {/* Cookie Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`bg-surface backdrop-blur-xl rounded-2xl border ${
                  cookie.locked ? 'border-primary/30' : 'border-border'
                } p-6`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        cookie.locked ? 'bg-primary/20' : 'bg-surface/10'
                      }`}>
                        <span className={cookie.locked ? 'text-primary' : 'text-text-muted'}>
                          {cookie.icon}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">{cookie.name}</h3>
                      {cookie.locked && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                          Always Active
                        </span>
                      )}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {cookie.description}
                    </p>
                  </div>
                  
                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleToggle(cookie.id)}
                    disabled={cookie.locked}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      cookiePreferences[cookie.id] 
                        ? 'bg-gradient-to-r from-primary to-primary-dark' 
                        : 'bg-surface/20'
                    } ${cookie.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <motion.div
                      animate={{ x: cookiePreferences[cookie.id] ? 28 : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-gradient-to-r from-cta to-cta-hover text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cta/30 transition-all duration-300 flex items-center gap-2 text-lg"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
            
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-success"
              >
                <Check className="w-5 h-5" />
                <span>Preferences saved successfully!</span>
              </motion.div>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12 bg-surface backdrop-blur-xl rounded-2xl border border-border p-6"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Need More Information?
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Learn more about how we use cookies and your rights by reading our detailed 
              <a href="/cookies" className="text-primary hover:underline mx-1">Cookies Policy</a>.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              You can change these settings at any time. Changes will be applied to your current session and future visits to our website.
            </p>
          </motion.div>
        </motion.div>
      </Container>
      <ChatBot />
    </div>
  )
}

export default CookieSettings
