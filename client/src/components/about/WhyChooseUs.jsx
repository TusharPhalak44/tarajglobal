import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Zap, Shield, Clock, Headphones } from 'lucide-react'
import Container from '@components/layout/Container'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized industry leader with multiple awards for excellence in service delivery and innovation.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly skilled professionals with deep expertise across various technologies and industries.'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Agile methodology and efficient processes ensure quick turnaround without compromising quality.'
    },
    {
      icon: Shield,
      title: 'Reliable Security',
      description: 'Enterprise-grade security measures to protect your data and ensure compliance with regulations.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock support team available to assist you whenever you need help.'
    },
    {
      icon: Headphones,
      title: 'Client Focus',
      description: 'Client-centric approach ensuring your needs and goals are always our top priority.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            The Right Partner for Your Success
          </h2>
          <p className="text-lg text-gray-600">
            We combine expertise, innovation, and dedication to deliver exceptional results that drive your business forward.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <Icon className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
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

export default WhyChooseUs
