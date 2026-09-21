import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue, useScroll } from 'framer-motion'

export const CursorSpotlight = () => {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const [isVisible, setIsVisible] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const springX = useSpring(mouseX, { stiffness: 250, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 250, damping: 25 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible, mouseX, mouseY])

  return (
    <>
      {/* Mouse Follower Spotlight Aura */}
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-30 rounded-full blur-[100px] transition-opacity duration-300"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            width: 450,
            height: 450,
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 166, 255, 0.12) 0%, rgba(255, 109, 0, 0.06) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 166, 255, 0.08) 0%, rgba(255, 109, 0, 0.04) 45%, transparent 70%)',
          }}
        />
      )}
    </>
  )
}

export default CursorSpotlight
