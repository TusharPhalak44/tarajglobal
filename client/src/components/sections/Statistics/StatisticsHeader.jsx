import React from 'react'
import { motion } from 'framer-motion'

const StatisticsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="statistics-header"
    >
      <h2>Our Impact</h2>
      <p>Numbers that reflect our commitment to innovation, growth, and client success.</p>
    </motion.div>
  )
}

export default StatisticsHeader
