import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye } from 'lucide-react'

const MissionVision = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mission &
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Vision
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group"
          >
            {/* Animated SVG background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#00A6FF]/10 to-transparent"
            />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-[#00A6FF]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To empower businesses with innovative technology, strategic digital solutions, and 
                measurable business outcomes that accelerate growth, strengthen market presence, and 
                create long-term value. We are dedicated to building trusted partnerships through 
                excellence, innovation, and customer-centric service.
              </p>
            </div>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A6FF]/0 to-[#FF6D00]/0 group-hover:from-[#00A6FF]/10 group-hover:to-[#FF6D00]/10 transition-all duration-500" />
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden group"
          >
            {/* Animated SVG background */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#FF6D00]/10 to-transparent"
            />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6D00]/20 to-[#00A6FF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-10 h-10 text-[#FF6D00]" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be the most trusted global B2B technology partner, transforming businesses through 
                innovation, intelligent digital experiences, and sustainable solutions that drive success 
                in a rapidly evolving world.
              </p>
            </div>

            {/* Glow border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF6D00]/0 to-[#00A6FF]/0 group-hover:from-[#FF6D00]/10 group-hover:to-[#00A6FF]/10 transition-all duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MissionVision
