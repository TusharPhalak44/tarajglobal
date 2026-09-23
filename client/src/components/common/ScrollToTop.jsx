import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { refreshScrollTrigger } from '@animations/gsap'

// Disable automatic browser scroll restoration globally and safely
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// SSR-safe layout effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Perform immediate, instant scroll reset to top
 */
export const resetScrollToTop = () => {
  if (typeof window === 'undefined') return

  // 1. Reset standard browser window scroll instantly
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  } catch {
    window.scrollTo(0, 0)
  }

  // 2. Reset document elements
  if (document.documentElement) document.documentElement.scrollTop = 0
  if (document.body) document.body.scrollTop = 0

  // 3. Reset active Lenis instance if initialized
  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    try {
      window.lenis.scrollTo(0, { immediate: true })
      window.lenis.resize()
    } catch (e) {
      console.warn('ScrollToTop: Lenis reset error', e)
    }
  }
}

/**
 * Centralized ScrollToTop Router Component
 * Listens to route navigation changes and ensures the user always lands at the top of the destination page.
 * Preserves intentional in-page anchor links (e.g. /about#team, /services#contact).
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation()

  useIsomorphicLayoutEffect(() => {
    // If navigating to a specific in-page anchor (#something)
    if (hash && hash.length > 1) {
      const targetElement = document.querySelector(hash)
      if (targetElement) {
        if (window.lenis) {
          window.lenis.scrollTo(targetElement, { offset: -85, duration: 1.0 })
        } else {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 85
          window.scrollTo({ top, behavior: 'smooth' })
        }
        return
      }
    }

    // Immediate instant reset before paint
    resetScrollToTop()

    // Secondary micro-check on next animation frame to prevent layout shift jumping
    const rafId = requestAnimationFrame(() => {
      resetScrollToTop()
      refreshScrollTrigger()
    })

    // Third settlement check after route transitions / animations finish
    const timer1 = setTimeout(() => {
      resetScrollToTop()
      refreshScrollTrigger()
    }, 120)

    const timer2 = setTimeout(() => {
      if (window.lenis) window.lenis.resize()
      refreshScrollTrigger()
    }, 300)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [pathname, search, hash])

  return null
}

export default ScrollToTop
