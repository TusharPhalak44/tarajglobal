import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ServicesHeader from './ServicesHeader'
import ServicesGrid from './ServicesGrid'

import { AnimatedSectionBackground, SectionLaserDivider } from '@components/animations'

const Services = () => {
  return (
    <section 
      className="relative py-16 lg:py-24 overflow-hidden" 
      style={{ 
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Reusable Section Ambient Background */}
      <AnimatedSectionBackground accent="cyan" />

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <ServicesHeader />
        <ServicesGrid />
      </motion.div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="cyan" position="bottom" />
    </section>
  )
}

export default Services

