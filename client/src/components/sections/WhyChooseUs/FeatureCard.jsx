import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, description, index, bgImage, darkBgImage }) => {
  const [isDark, setIsDark] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const currentBgImage = isDark ? darkBgImage : bgImage

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -8,
        scale: 1.025
      }}
      className="bg-surface/90 dark:bg-surface/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(0,102,204,0.18),0_0_20px_-3px_rgba(0,166,255,0.12)] hover:border-primary/50 dark:hover:shadow-[0_10px_30px_-5px_rgba(0,166,255,0.35),0_0_15px_-2px_rgba(0,166,255,0.2)] dark:hover:border-primary/50 transition-all duration-300 border border-border/80 dark:border-white/10 group relative flex flex-col justify-between min-h-[220px]"
    >
      {/* Dynamic Cursor Torchlight Inner Glow */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-1"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 166, 255, 0.2), transparent 70%)`
          }}
        />
      )}

      {/* Background Image - appears on hover */}
      {currentBgImage && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"
        >
          <img 
            src={currentBgImage} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5 relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Icon Header */}
          <div className="flex items-center justify-between mb-4">
            {Icon && (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <span className="text-[10px] font-mono font-bold text-text-muted opacity-60">
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-extrabold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed text-xs">
            {description}
          </p>
        </div>

        {/* Bottom Accent line */}
        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-orange-500 mt-4 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  )
}

export default FeatureCard
