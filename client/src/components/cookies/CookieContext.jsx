import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CookieContext = createContext(null)

const STORAGE_KEY = 'cookieConsent'

const defaultPreferences = {
  necessary: true,
  analytics: false,
  functional: true,
  marketing: false,
  consentGiven: false,
  timestamp: null,
}

export const CookieProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setPreferences(parsed)
          setIsBannerVisible(!parsed.consentGiven)
        } else {
          setIsBannerVisible(true)
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error)
        setIsBannerVisible(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [])

  // Save preferences to localStorage
  const savePreferences = useCallback((newPreferences) => {
    const updated = {
      ...newPreferences,
      consentGiven: true,
      timestamp: new Date().toISOString(),
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setPreferences(updated)
      setIsBannerVisible(false)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving cookie preferences:', error)
    }
  }, [])

  // Accept all cookies
  const acceptAll = useCallback(() => {
    savePreferences({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    })
  }, [savePreferences])

  // Reject non-essential cookies
  const rejectNonEssential = useCallback(() => {
    savePreferences({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    })
  }, [savePreferences])

  // Open preferences modal
  const openPreferences = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  // Close preferences modal
  const closePreferences = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Close / dismiss cookie banner
  const closeBanner = useCallback(() => {
    setIsBannerVisible(false)
  }, [])

  // Update single preference
  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  // Reset cookie consent (for testing purposes)
  const resetCookieConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setPreferences(defaultPreferences)
      setIsBannerVisible(true)
    } catch (error) {
      console.error('Error resetting cookie consent:', error)
    }
  }, [])

  const value = {
    preferences,
    isBannerVisible,
    closeBanner,
    isModalOpen,
    isLoading,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    openPreferences,
    closePreferences,
    updatePreference,
    resetCookieConsent,
  }

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
}

export const useCookies = () => {
  const context = useContext(CookieContext)
  if (!context) {
    throw new Error('useCookies must be used within a CookieProvider')
  }
  return context
}

export default CookieContext
