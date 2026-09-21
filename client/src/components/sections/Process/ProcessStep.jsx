import React from 'react'
import { motion } from 'framer-motion'

const ProcessStep = ({ step, index, totalSteps }) => {
  const getIconSVG = (iconType) => {
    const icons = {
      discussion: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <circle cx="24" cy="24" r="6" fill="#3B82F6"/>
          <circle cx="44" cy="24" r="6" fill="#3B82F6"/>
          <path d="M18 40C18 36 22 34 24 34C26 34 28 36 28 40" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 40C36 36 40 34 42 34C44 34 46 36 46 40" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M28 46C28 44 30 42 32 42C34 42 36 44 36 46" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      research: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <rect x="16" y="16" width="32" height="28" rx="2" stroke="#3B82F6" strokeWidth="2"/>
          <line x1="20" y1="24" x2="44" y2="24" stroke="#3B82F6" strokeWidth="2"/>
          <line x1="20" y1="30" x2="40" y2="30" stroke="#3B82F6" strokeWidth="2"/>
          <line x1="20" y1="36" x2="36" y2="36" stroke="#3B82F6" strokeWidth="2"/>
          <circle cx="48" cy="48" r="8" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <line x1="42" y1="42" x2="46" y2="46" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      strategy: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <path d="M32 16L36 24H28L32 16Z" fill="#3B82F6"/>
          <rect x="20" y="28" width="24" height="4" rx="2" fill="#3B82F6"/>
          <rect x="24" y="36" width="16" height="4" rx="2" fill="#3B82F6"/>
          <rect x="28" y="44" width="8" height="4" rx="2" fill="#3B82F6"/>
        </svg>
      ),
      approval: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <path d="M20 32L28 40L44 24" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="32" r="8" stroke="#3B82F6" strokeWidth="2" fill="none"/>
        </svg>
      ),
      launch: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <path d="M32 20V32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 32L40 40" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="12" stroke="#3B82F6" strokeWidth="2"/>
          <path d="M32 12V16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 48V52" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 32H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 32H52" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      monitoring: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <rect x="16" y="20" width="32" height="24" rx="2" stroke="#3B82F6" strokeWidth="2"/>
          <path d="M20 40L28 32L36 36L44 28" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="44" cy="28" r="2" fill="#3B82F6"/>
          <line x1="20" y1="48" x2="44" y2="48" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      results: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="#3B82F6" strokeWidth="2" fill="#1E3A5F"/>
          <path d="M20 40L28 32L36 36L44 24" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="16" y="16" width="32" height="32" rx="2" stroke="#3B82F6" strokeWidth="2"/>
          <circle cx="44" cy="24" r="4" fill="#3B82F6"/>
        </svg>
      )
    }
    return icons[iconType] || icons.discussion
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 * index }}
      className="flex flex-col items-center text-center relative"
    >
      {/* Step Number Badge */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
      >
        {step.id}
      </motion.div>

      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="w-20 h-20 mb-4 relative"
      >
        {getIconSVG(step.icon)}
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default ProcessStep
