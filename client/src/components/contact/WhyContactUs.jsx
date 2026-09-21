import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Users, Clock, Globe, Shield, HeadphonesIcon } from 'lucide-react'
import Container from '@components/layout/Container'
import FeatureCard from './FeatureCard'

const WhyContactUs = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'We respond to all inquiries within 24 hours. Your time is valuable, and we respect that.'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Our team of experts is committed to understanding your needs and delivering exceptional results.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock support for urgent matters. We\'re always here when you need us.'
    },
    {
      icon: Globe,
      title: 'Global Clients',
      description: 'Trusted by clients worldwide. We understand diverse business needs across cultures.'
    },
    {
      icon: Shield,
      title: 'Secure Communication',
      description: 'Your data is protected with enterprise-grade security. Privacy is our top priority.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Professional Consultation',
      description: 'Get expert advice from our experienced consultants. We help you make informed decisions.'
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
            Why Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600">
            We're committed to providing exceptional service and support. Here's what sets us apart.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default WhyContactUs
