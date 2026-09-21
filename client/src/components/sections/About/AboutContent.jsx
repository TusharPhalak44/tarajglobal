import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const AboutContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
        style={{ color: 'var(--primary)' }}
      >
        <span className="w-8 h-px" style={{ background: 'var(--primary)' }} />
        About Our Company
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        Powering Smarter B2B Growth
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-base leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        Taraj Global is a B2B demand generation and technology marketing partner helping organizations connect with the right companies, decision-makers, and buying audiences. We combine audience intelligence, verified B2B data, targeted outreach, and full-funnel marketing strategies to create qualified opportunities and support sustainable pipeline growth.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hero-button-primary"
        >
          Discover Taraj Global
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default AboutContent
