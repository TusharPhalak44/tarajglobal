import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

const ContactCard = ({ icon: Icon, title, information, index, onCopy }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(information)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (onCopy) onCopy()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8 }}
      onClick={handleCopy}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
    >
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="text-primary" size={28} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-3">
        {information}
      </p>
      <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <>
            <Check size={16} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={16} />
            <span>Click to copy</span>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default ContactCard
