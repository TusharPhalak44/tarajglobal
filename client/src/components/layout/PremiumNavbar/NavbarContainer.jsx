import React from 'react'
import { motion } from 'framer-motion'

const NavbarContainer = ({ children, isScrolled }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[60]"
      style={{ height: '90px' }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          backdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
          boxShadow: isScrolled
            ? 'var(--shadow-lg)'
            : 'var(--shadow-md)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(135deg, var(--background) 0%, color-mix(in srgb, var(--background) 90%, var(--primary) 10%) 50%, var(--background) 100%)',
        }}
      >
        {/* Animated gradient glow - Light Theme optimized */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'radial-gradient(circle at 70% 50%, rgba(0, 102, 204, 0.08) 0%, transparent 50%)',
          }}
        />

        {/* Subtle accent glow - Light Theme optimized */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(255, 107, 0, 0.06) 0%, transparent 50%)',
          }}
        />
      </motion.div>
      
      <div className="relative h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-full flex items-center justify-between">
          {children}
        </div>
      </div>
    </motion.header>
  )
}

export default NavbarContainer
