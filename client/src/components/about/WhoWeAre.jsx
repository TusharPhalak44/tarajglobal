import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Container from '@components/layout/Container'

const WhoWeAre = () => {
  const highlights = [
    'Industry-leading expertise across multiple sectors',
    'Commitment to innovation and continuous improvement',
    'Client-centric approach with focus on results',
    'Global presence with local understanding',
    'Sustainable and ethical business practices'
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-primary/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Company Image Placeholder</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-xl" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Powering Smarter B2B Growth
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Taraj Global is a B2B demand generation and technology marketing partner helping organizations connect with the right companies, decision-makers, and buying audiences. We combine audience intelligence, verified B2B data, targeted outreach, and full-funnel marketing strategies to create qualified opportunities and support sustainable pipeline growth.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Discover Taraj Global
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default WhoWeAre
