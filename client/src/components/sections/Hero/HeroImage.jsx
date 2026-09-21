import React from 'react'
import { motion } from 'framer-motion'

const HeroImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div className="bg-white rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-full" />
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-3 bg-gray-100 rounded w-24 mt-2" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="h-20 bg-primary/10 rounded-lg" />
              <div className="h-20 bg-primary/5 rounded-lg" />
              <div className="h-20 bg-primary/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">25%</div>
          <div className="text-xs text-gray-600">Growth</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-xl font-bold text-primary">A+</div>
          <div className="text-xs text-gray-600">Rating</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroImage
