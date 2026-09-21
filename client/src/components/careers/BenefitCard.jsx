import React from 'react'
import { motion } from 'framer-motion'

const BenefitCard = ({ benefit, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <benefit.icon className="text-primary" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {benefit.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {benefit.description}
      </p>
    </motion.div>
  )
}

export default BenefitCard
