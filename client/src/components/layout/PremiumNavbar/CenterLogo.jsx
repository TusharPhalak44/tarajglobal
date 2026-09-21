import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const CenterLogo = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <NavLink to="/" aria-label="Home">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center justify-center relative"
        >
          {/* Logo with shake effect */}
          <motion.img
            src="/middle.png"
            alt="Taraj Global - B2B Growth & Lead Generation Agency"
            className="h-12 w-auto relative z-10"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              rotate: [0, 5, -5, 3, -3, 0]
            }}
            transition={{ 
              duration: 0.8,
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 }
            }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}
          />

          {/* Fallback text */}
          <motion.div
            className="hidden text-2xl font-bold text-primary"
            style={{ display: 'none' }}
          >
            GlobalCorp
          </motion.div>
        </motion.div>
      </NavLink>
    </div>
  )
}

export default CenterLogo
