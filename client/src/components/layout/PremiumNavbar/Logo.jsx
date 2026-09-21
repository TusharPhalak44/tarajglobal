import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Logo = () => {
  return (
    <NavLink to="/" aria-label="Home">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center"
      >
        <img
          src="/OnlyTG- 2.png"
          alt="Taraj Global - B2B Lead Generation"
          className="h-10 w-auto"
        />
      </motion.div>
    </NavLink>
  )
}

export default Logo
