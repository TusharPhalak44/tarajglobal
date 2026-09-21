import React from 'react'
import { motion } from 'framer-motion'

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src="/OnlyTG- 3.png" 
            alt="Loading" 
            className="w-24 h-24 object-contain"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}

export default PageLoader
