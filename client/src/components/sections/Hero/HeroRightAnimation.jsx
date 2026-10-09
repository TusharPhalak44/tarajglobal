import React, { useRef, useEffect } from 'react'
import { useReducedMotion } from '@hooks/useReducedMotion'

export const HeroRightAnimation = () => {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
    }
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-surface/10 rounded-[2rem] border border-white/5">
        <span className="text-white/40 font-mono text-sm">Animation Disabled</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] pointer-events-none -z-10 rounded-full" />
      
      {/* Video Container */}
      <div className="relative w-full max-w-[560px] rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] bg-black/40">
        <video
          ref={videoRef}
          src="/video.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-auto max-h-[420px] object-cover block"
        />
      </div>
    </div>
  )
}

export default HeroRightAnimation
