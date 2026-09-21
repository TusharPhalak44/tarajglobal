import React from 'react'
import { motion } from 'framer-motion'

const TestimonialsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl mx-auto mb-0"
    >
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-1">
        B2B Marketing Success Stories
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '120px' }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="h-1.5 mx-auto bg-gradient-to-r from-primary to-cta rounded-full mb-2"
      />
      <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
        See how businesses use Taraj Global's B2B lead generation, demand generation, and targeted outreach services to connect with decision-makers, generate qualified opportunities, and build stronger sales pipelines.
      </p>
    </motion.div>
  )
}

export default TestimonialsHeader
