import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const IndustryCard = ({ icon: Icon, title, description, color, link, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6 group-hover:opacity-90 transition-opacity`}
      >
        <Icon className="text-white" size={32} />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Learn More Link */}
      {link ? (
        <Link to={link}>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </Link>
      ) : (
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors"
        >
          <span>Learn More</span>
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      )}
    </motion.div>
  )
}

export default IndustryCard
