import { useEffect } from 'react'
import { ScrollTrigger } from '@animations/gsap'

/**
 * Hook to automatically refresh ScrollTrigger on dependency changes or lifecycle events
 * @param {Array} dependencies
 */
export function useScrollTriggerRefresh(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, dependencies)
}

export default useScrollTriggerRefresh
