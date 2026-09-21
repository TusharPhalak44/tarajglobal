import React from 'react'
import { motion } from 'framer-motion'

export const SectionDivider = ({ accent = 'cyan' }) => {
  const isOrange = accent === 'orange'
  
  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 py-4 overflow-hidden pointer-events-none select-none">
      <div className="relative flex items-center justify-center">
        {/* Left Fading Energy Beam */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`h-[1px] w-1/2 origin-right bg-gradient-to-r from-transparent ${
            isOrange 
              ? 'via-orange-400/40 to-orange-400/80 dark:via-orange-500/40 dark:to-orange-500/90' 
              : 'via-primary/40 to-primary/80 dark:via-primary/40 dark:to-primary/90'
          }`}
        />

        {/* Center Glowing Kinetic Diamond Beacon */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
          className={`relative w-3 h-3 mx-2 flex-shrink-0 border transition-all duration-300 ${
            isOrange 
              ? 'bg-orange-500/20 border-orange-400 shadow-[0_0_12px_rgba(255,109,0,0.6)]' 
              : 'bg-primary/20 border-primary shadow-[0_0_12px_rgba(0,166,255,0.6)]'
          }`}
        >
          <div className={`absolute inset-0.5 rounded-xs ${isOrange ? 'bg-orange-400' : 'bg-primary'} animate-pulse`} />
        </motion.div>

        {/* Right Fading Energy Beam */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`h-[1px] w-1/2 origin-left bg-gradient-to-l from-transparent ${
            isOrange 
              ? 'via-orange-400/40 to-orange-400/80 dark:via-orange-500/40 dark:to-orange-500/90' 
              : 'via-primary/40 to-primary/80 dark:via-primary/40 dark:to-primary/90'
          }`}
        />
      </div>
    </div>
  )
}

export default SectionDivider
