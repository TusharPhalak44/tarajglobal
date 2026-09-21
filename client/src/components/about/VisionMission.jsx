import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Target, Heart } from 'lucide-react'
import Container from '@components/layout/Container'

const VisionMission = () => {
  const values = [
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the global leader in technology solutions, empowering businesses to achieve their full potential through innovation and excellence.'
    },
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver exceptional value to our clients by providing innovative, reliable, and scalable technology solutions that drive growth and success.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, innovation, excellence, and client success are at the core of everything we do. We believe in building lasting relationships based on trust and mutual respect.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Vision & Mission
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What Drives Us Forward
          </h2>
          <p className="text-lg text-gray-600">
            Our vision, mission, and values guide every decision we make and every solution we deliver.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <Icon className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default VisionMission
