import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-cta to-accent text-text-primary rounded-lg font-semibold hover:from-cta-hover hover:to-accent transition-all flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 shadow-lg shadow-cta/20"
      >
        <span>Get Started</span>
        <ArrowRight size={20} />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Learn More
      </motion.button>
    </motion.div>
  )
}

export default HeroButtons
