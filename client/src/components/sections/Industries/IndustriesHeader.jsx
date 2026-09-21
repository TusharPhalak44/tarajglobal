import React from 'react'
import { motion } from 'framer-motion'

const IndustriesHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
        Industries We Serve
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-foreground mt-4 mb-6">
        Expertise Across Multiple Sectors
      </h2>
      <p className="text-lg text-gray-600 dark:text-muted-foreground">
        We bring deep industry knowledge and specialized solutions to help businesses across various sectors achieve their goals.
      </p>
    </motion.div>
  )
}

export default IndustriesHeader
