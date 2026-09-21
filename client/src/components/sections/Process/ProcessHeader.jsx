import React from 'react'
import { motion } from 'framer-motion'

const ProcessHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
        Our Process
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
        How We Deliver Results
      </h2>
      <p className="text-lg text-gray-600">
        Our proven methodology ensures successful project delivery from start to finish.
      </p>
    </motion.div>
  )
}

export default ProcessHeader
