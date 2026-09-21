import React from 'react'
import { motion } from 'framer-motion'

const HeroBackground = () => {
  return (
    <>
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-hero" />
      
      {/* Animated orange gradient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255, 166, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 166, 255, 0.05) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Decorative blur circles with brand colors */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 right-20 w-96 h-96 bg-cta/10 rounded-full blur-3xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-20 left-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl"
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#00A6FF 1px, transparent 1px), linear-gradient(90deg, #00A6FF 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </>
  )
}

export default HeroBackground
