import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Accordion = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <motion.button
        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="text-primary" size={20} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-2 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
