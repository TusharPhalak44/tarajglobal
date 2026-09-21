import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const ProcessCard = ({ step, icon: Icon, title, description, details, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 * index }}
      className="relative"
    >
      {/* Step Number */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white relative z-10">
          {step}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-6">
          <Icon className="text-primary" size={28} />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>
        
        <ul className="space-y-3 text-left">
          {details.map((detail) => (
            <li key={detail} className="flex items-start text-sm text-gray-400">
              <CheckCircle size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default ProcessCard
