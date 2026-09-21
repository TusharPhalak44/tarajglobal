import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [shouldSlide, setShouldSlide] = useState(false)

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    // Non-linear loading progress with pauses at specific percentages
    const loadingSequence = [
      { target: 23, pause: 1000 },  // Pause 1 second at 23%
      { target: 60, pause: 2000 },  // Pause 2 seconds at 60%
      { target: 79, pause: 2000 },  // Pause 2 seconds at 79%
      { target: 99, pause: 2100 },  // Pause 2.1 seconds at 99%
      { target: 100, pause: 200 }   // Pause 0.2 seconds at 100% before exit
    ]

    let currentSequenceIndex = 0
    let currentProgress = 0

    const runSequence = () => {
      if (currentSequenceIndex >= loadingSequence.length) {
        setIsExiting(true)
        // Start compression phase
        setTimeout(() => {
          setShouldSlide(true)
        }, prefersReducedMotion ? 300 : 600)
        return
      }

      const { target, pause } = loadingSequence[currentSequenceIndex]
      const increment = (target - currentProgress) / 20 // Smooth transition to target

      let step = 0
      const progressTimer = setInterval(() => {
        step++
        currentProgress += increment
        if (step >= 20 || currentProgress >= target) {
          currentProgress = target
          clearInterval(progressTimer)
          setProgress(Math.round(currentProgress))
          
          // Pause at this percentage
          setTimeout(() => {
            currentSequenceIndex++
            runSequence()
          }, pause)
        } else {
          setProgress(Math.round(currentProgress))
        }
      }, 30)
    }

    runSequence()

    return () => {
      // Cleanup would be handled by the sequence logic
    }
  }, [])

  useEffect(() => {
    if (shouldSlide) {
      // Wait for slide animation to complete
      setTimeout(() => {
        onComplete()
      }, prefersReducedMotion ? 300 : 500)
    }
  }, [shouldSlide, onComplete, prefersReducedMotion])

  return (
    <>
      {/* Disable scrolling */}
      {!isExiting && <style>{`body { overflow: hidden; }`}</style>}
      
      {/* Main Preloader Screen */}
      <motion.div
        initial={{ y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
        animate={{ 
          y: shouldSlide ? '-100%' : 0,
          scale: isExiting ? 0.7 : 1,
          clipPath: isExiting ? 'inset(25% 25% 25% 25%)' : 'inset(0% 0% 0% 0%)'
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0.5 : 0.6, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background: '#F5F5F5'
        }}
      >
        {/* Black Border Overlay */}
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              border: '10px solid #000',
              clipPath: 'inset(25% 25% 25% 25%)'
            }}
          />
        )}
            {/* Animated Gradient Mesh Background */}
            <motion.div
              className="absolute inset-0 opacity-50"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(0, 102, 204, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 107, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Floating Particles */}
            {!prefersReducedMotion && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 80 + 30,
                      height: Math.random() * 80 + 30,
                      background: `rgba(0, 102, 204, ${Math.random() * 0.2 + 0.1})`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      filter: 'blur(0.5px)',
                    }}
                    animate={{
                      y: [0, -50 - Math.random() * 30, 0],
                      x: [0, 30 + Math.random() * 20, 0],
                      scale: [1, 1.2 + Math.random() * 0.3, 1],
                      opacity: [0.1, 0.3 + Math.random() * 0.2, 0.1],
                      rotate: [0, Math.random() * 360, 0],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </>
            )}

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Logo with Premium Bottom-to-Top Reveal */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.4 : 0.8, 
                  delay: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  width: '200px',
                  height: '200px',
                }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    scale: progress === 100 ? [1, 1.03, 1] : 1,
                  }}
                  transition={{
                    scale: progress === 100 ? {
                      duration: 0.5,
                      times: [0, 0.5, 1],
                      ease: [0.16, 1, 0.3, 1]
                    } : { duration: 0 }
                  }}
                >
                  {/* Subtle glow behind logo */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(10, 168, 245, 0.3) 0%, rgba(255, 138, 0, 0.2) 50%, rgba(114, 212, 107, 0.1) 100%)',
                      opacity: progress / 200,
                    }}
                    animate={{
                      opacity: [progress / 300, progress / 200, progress / 300],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Actual logo image with clip-path reveal */}
                  <motion.img
                    src="/OnlyTG-3.png"
                    alt="Taraj Global"
                    className="w-full h-full object-contain"
                    style={{
                      clipPath: `inset(0% 0% ${100 - progress}% 0%)`,
                      filter: 'drop-shadow(0 0 25px rgba(10, 168, 245, 0.2))',
                    }}
                    initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                    animate={{ clipPath: `inset(0% 0% ${100 - progress}% 0%)` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
    )
}

export default Preloader
