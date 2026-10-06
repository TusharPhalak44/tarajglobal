import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const WhyChooseUsHeader = () => {
  return (
    <div className="relative text-center max-w-4xl mx-auto mb-12">


      {/* Masked Kinetic Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary mb-4 tracking-tight leading-[1.16] overflow-hidden py-1">
        <motion.span
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          Why Businesses Choose{' '}
          <span className="bg-gradient-to-r from-primary via-[#00E5FF] to-cta bg-clip-text text-transparent">
            Taraj Global
          </span>
        </motion.span>
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="h-1 w-24 mx-auto bg-gradient-to-r from-primary via-[#00E5FF] to-cta rounded-full"
      />
    </div>
  )
}

export default WhyChooseUsHeader

