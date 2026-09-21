import React from 'react'
import { motion } from 'framer-motion'

const ServicesHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-4xl mx-auto px-4 mb-2 md:mb-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          delay: 0.2, 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight mb-6 dark:text-white"
      >
        <motion.span
          className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ 
            delay: 0.4, 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 30px rgba(0, 166, 255, 0.5)"
          }}
        >
          B2B Growth Expertise
        </motion.span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          delay: 0.5, 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto dark:text-gray-300"
      >
        Identify and connect with high-value prospects through targeted, data-driven lead generation.
      </motion.p>

      {/* Animated underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          delay: 0.7, 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="h-0.5 bg-gradient-to-r from-primary via-accent to-transparent mx-auto mt-8 max-w-xs"
      />
    </motion.div>
  )
}

export default ServicesHeader
