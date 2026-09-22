import { useEffect, useRef } from 'react'
import gsap from '@animations/gsap'

/**
 * Safe React hook for running GSAP animations with automatic lifecycle cleanup
 * Uses gsap.context() under the hood to ensure zero memory leaks and clean teardown.
 * 
 * @param {Function} callback - Function containing GSAP tweens/timelines
 * @param {Array} dependencies - React dependency array
 * @param {React.RefObject} scopeRef - Optional scope container ref
 */
export function useGSAP(callback, dependencies = [], scopeRef = null) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scope = scopeRef?.current || undefined
    const ctx = gsap.context(() => {
      callbackRef.current()
    }, scope)

    return () => {
      ctx.revert() // Automatically kills all ScrollTriggers, timelines, and tweens created inside context
    }
  }, dependencies)
}

export default useGSAP
