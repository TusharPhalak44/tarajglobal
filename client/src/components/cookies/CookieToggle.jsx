import React from 'react'
import { motion } from 'framer-motion'

const CookieToggle = ({ checked, onChange, disabled = false, label }) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
        checked ? 'bg-primary' : 'bg-white/20'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <motion.span
        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

export default CookieToggle
