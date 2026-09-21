import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-alt to-background" />
        
        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cta/8 blur-[80px]"
        />
      </div>

      {/* Floating shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-[1000px] mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Let's Build Something
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent hero-text-gradient">
              {' '}Amazing Together
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Partner with us to transform your business through innovative digital solutions 
            that drive growth and create lasting impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-8 py-4 hero-button-primary text-white rounded-xl font-semibold text-lg cursor-pointer"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 hero-button-secondary rounded-xl font-semibold text-lg cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
