import React from 'react'
import { motion } from 'framer-motion'

const ProcessStep = ({ step, index, totalSteps }) => {
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
        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.div>

      {/* Step Icon */}
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <step.icon className="text-primary" size={24} />
      </div>

      {/* Step Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {step.title}
      </h3>

      {/* Step Description */}
      <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default ProcessStep
