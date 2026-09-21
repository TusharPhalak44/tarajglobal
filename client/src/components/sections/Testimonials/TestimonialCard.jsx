import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TestimonialCard = ({ company, rating, testimonial, companyLogo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="relative bg-surface rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-border hover:border-primary/50 h-full flex flex-col overflow-hidden"
    >
      {/* Company Logo and Name */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
        className="flex items-center gap-4 mb-4 relative z-10"
      >
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primary/30 flex-shrink-0 bg-white flex items-center justify-center"
        >
          {companyLogo ? (
            <img 
              src={companyLogo} 
              alt={company} 
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-cta flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {company.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Company Information */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
          className="flex-1"
        >
          <motion.h4 
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
            className="font-bold text-text-primary text-lg"
          >
            {company}
          </motion.h4>
        </motion.div>
      </motion.div>

      {/* Testimonial Text */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
        className="text-text-secondary leading-relaxed mb-4 text-sm flex-grow relative z-10 font-light"
      >
        {testimonial}
      </motion.p>

      {/* Star Rating */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
        className="flex space-x-1 mb-4 relative z-10"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: -180 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5 + i * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.3, rotate: 15 }}
          >
            <Star
              size={16}
              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-tertiary'}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default TestimonialCard
