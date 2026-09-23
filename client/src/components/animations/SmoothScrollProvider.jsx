import React, { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useLocation } from 'react-router-dom'
import { LenisContext } from '@hooks/useLenis'
import { connectLenisWithGSAP, refreshScrollTrigger } from '@animations/gsap'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Global SmoothScrollProvider
 * Wraps the app to provide hardware-accelerated, buttery smooth Lenis scrolling,
 * seamless synchronization with GSAP ScrollTrigger and Framer Motion,
 * anchor navigation with navbar offset, and accessibility fallbacks.
 */
export const SmoothScrollProvider = ({ children }) => {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const [lenisInstance, setLenisInstance] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    // If user prefers reduced motion, disable smooth inertia scrolling
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        setLenisInstance(null)
        window.lenis = null
      }
      return
    }

    // Initialize single global Lenis instance with agency-grade tuning
    const lenis = new Lenis({
      duration: 1.15, // Responsive yet buttery continuous glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Studio exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // 1:1 input responsiveness without initial delay
      touchMultiplier: 1.5,
      syncTouch: false, // Ensures natural, native-feeling touch scroll on mobile
      infinite: false,
      autoRaf: false, // Driven cleanly by GSAP ticker
    })

    lenisRef.current = lenis
    setLenisInstance(lenis)
    window.lenis = lenis

    // Connect Lenis RAF with GSAP ScrollTrigger
    const disconnectGSAP = connectLenisWithGSAP(lenis)

    // Handle Anchor Links globally (#about, #services, #contact, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Check if it is a hash anchor on current page
      if (href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, {
            offset: -85, // Account for fixed navbar height
            duration: 1.2,
          })
          window.history.pushState(null, '', href)
        }
      } else if (href.includes('#') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        const [path, hash] = href.split('#')
        if (path === '' || path === window.location.pathname) {
          const element = document.getElementById(hash)
          if (element) {
            e.preventDefault()
            lenis.scrollTo(element, {
              offset: -85,
              duration: 1.2,
            })
            window.history.pushState(null, '', `#${hash}`)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick, { capture: true })

    // Observe body size changes (e.g. accordion expansions, image loading) to auto-recalculate scroll bounds
    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize()
        refreshScrollTrigger()
      })
      resizeObserver.observe(document.body)
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true })
      if (resizeObserver) resizeObserver.disconnect()
      disconnectGSAP()
      lenis.destroy()
      lenisRef.current = null
      window.lenis = null
      setLenisInstance(null)
    }
  }, [prefersReducedMotion])

  // Scroll to top or target hash and refresh ScrollTrigger on route transition
  useEffect(() => {
    const hash = location.hash

    if (hash && hash.length > 1) {
      // If navigating to a specific hash anchor
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(hash)
        if (targetElement) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetElement, { offset: -85, duration: 1.0 })
          } else {
            const top = targetElement.getBoundingClientRect().top + window.scrollY - 85
            window.scrollTo({ top, behavior: 'smooth' })
          }
        }
        refreshScrollTrigger()
      }, 150)
      return () => clearTimeout(timer)
    } else {
      // Standard page navigation: reset scroll to top immediately across window & Lenis
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      } catch {
        window.scrollTo(0, 0)
      }
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
        lenisRef.current.resize()
      }

      // Allow DOM & Framer Motion transitions to settle, then refresh ScrollTrigger & Lenis
      const t1 = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize()
        refreshScrollTrigger()
      }, 100)
      const t2 = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize()
        refreshScrollTrigger()
      }, 350)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [location.pathname, location.hash])

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  )
}

export default SmoothScrollProvider
