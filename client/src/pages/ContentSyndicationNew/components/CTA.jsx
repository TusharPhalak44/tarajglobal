import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CTA = () => {
  const navigate = useNavigate()

  const handleGetConsultation = () => {
    navigate('/contact')
  }

  const handleContactExperts = () => {
    navigate('/contact')
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
        
        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cta/15 blur-[80px]"
        />
      </div>

      {/* Floating shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-surface/50"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
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
            Ready to Turn Your Content into a
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent hero-text-gradient">
              {' '}Lead Generation Engine?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Let our experts help you extend the reach of your content and connect with relevant audiences across trusted digital channels.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetConsultation}
              className="group flex items-center gap-2 px-8 py-4 hero-button-primary text-white rounded-xl font-semibold text-lg cursor-pointer"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactExperts}
              className="flex items-center gap-2 px-8 py-4 hero-button-secondary rounded-xl font-semibold text-lg cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              Contact Our Experts
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
