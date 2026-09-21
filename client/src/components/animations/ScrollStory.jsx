import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../../animations/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * ScrollStory
 * Desktop: Pins container and scrubs progress through stages smoothly using GSAP ScrollTrigger.
 * Mobile / Reduced Motion: Gracefully falls back to standard scrolling without pinning.
 */
export const ScrollStory = ({
  stages = [],
  renderStage,
  renderIndicator,
  className = '',
}) => {
  const containerRef = useRef(null)
  const pinRef = useRef(null)
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Disable pinning on mobile devices or when reduced motion is preferred
    const isMobile = window.innerWidth < 1024
    if (prefersReducedMotion || isMobile || !containerRef.current || !pinRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      const totalStages = stages.length
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinRef.current,
        start: 'top top+=90px',
        end: `+=${totalStages * 450}px`,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentProgress = self.progress
          setProgress(currentProgress)
          const stageIndex = Math.min(
            Math.floor(currentProgress * totalStages),
            totalStages - 1
          )
          setActiveStage(stageIndex)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [stages.length, prefersReducedMotion])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={pinRef} className="w-full">
        {renderIndicator && renderIndicator({ activeStage, progress, stages })}
        <div className="w-full">
          {stages.map((stage, idx) => (
            <div key={idx}>
              {renderStage({
                stage,
                index: idx,
                isActive: idx === activeStage,
                isPast: idx < activeStage,
                isFuture: idx > activeStage,
                progress,
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollStory
