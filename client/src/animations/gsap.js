import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Connect Lenis smooth scroll instance with GSAP ScrollTrigger
 * @param {import('lenis').default} lenisInstance
 */
export const connectLenisWithGSAP = (lenisInstance) => {
  if (!lenisInstance || typeof window === 'undefined') return () => {}

  // Update ScrollTrigger on every Lenis scroll event
  const handleScroll = () => {
    ScrollTrigger.update()
  }
  lenisInstance.on('scroll', handleScroll)

  // Sync GSAP ticker with Lenis RAF
  const tickerCallback = (time) => {
    lenisInstance.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)

  // Disable GSAP lag smoothing to ensure fluid sync with Lenis
  gsap.ticker.lagSmoothing(0)

  // Return cleanup teardown function
  return () => {
    lenisInstance.off('scroll', handleScroll)
    gsap.ticker.remove(tickerCallback)
  }
}

/**
 * Safely refresh all active ScrollTrigger instances
 */
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh()
  }
}

/**
 * Kill all active ScrollTriggers and tweens cleanly (useful during unmount/page change)
 */
export const killAllScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}

export { gsap, ScrollTrigger }
export default gsap
