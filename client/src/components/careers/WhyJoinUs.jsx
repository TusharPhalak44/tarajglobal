import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Globe, Lightbulb, Heart, Award } from 'lucide-react'
import Container from '@components/layout/Container'

const WhyJoinUs = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Accelerate your career with clear growth paths and regular promotions based on performance and potential.'
    },
    {
      icon: BookOpen,
      title: 'Learning & Development',
      description: 'Access world-class training programs, workshops, and certifications to continuously upgrade your skills.'
    },
    {
      icon: Globe,
      title: 'Global Exposure',
      description: 'Work with international clients and collaborate with diverse teams across multiple countries.'
    },
    {
      icon: Lightbulb,
      title: 'Innovative Environment',
      description: 'Be part of a culture that encourages innovation, creativity, and out-of-the-box thinking.'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Enjoy flexible working hours, remote work options, and policies that prioritize your well-being.'
    },
    {
      icon: Award,
      title: 'Employee Recognition',
      description: 'Get recognized and rewarded for your contributions through our comprehensive recognition programs.'
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
            Why Join Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Build Your Future With Us
          </h2>
          <p className="text-lg text-gray-600">
            We believe in empowering our employees to reach their full potential. Discover what makes our workplace special.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyJoinUs
