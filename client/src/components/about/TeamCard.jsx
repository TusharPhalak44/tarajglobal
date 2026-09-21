import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const TeamCard = ({ name, designation, description, avatar, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      {/* Avatar Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
        <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">{avatar}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-primary font-medium mb-3">
          {designation}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label={`LinkedIn profile of ${name}`}
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label={`Twitter profile of ${name}`}
          >
            <Twitter size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
            aria-label={`Email ${name}`}
          >
            <Mail size={18} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default TeamCard
