import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLenis } from '../../../hooks/useLenis'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      const handleLenisScroll = (e) => {
        setIsVisible(e.scroll > 300)
      }
      lenis.on('scroll', handleLenisScroll)
      return () => {
        lenis.off('scroll', handleLenisScroll)
      }
    } else {
      const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300)
      }
      window.addEventListener('scroll', toggleVisibility, { passive: true })
      return () => window.removeEventListener('scroll', toggleVisibility)
    }
  }, [lenis])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary-dark transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
