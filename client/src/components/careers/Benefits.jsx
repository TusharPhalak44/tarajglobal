import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, TrendingUp, GraduationCap, Calendar, Users, Award, Building2 } from 'lucide-react'
import Container from '@components/layout/Container'
import BenefitCard from './BenefitCard'

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive medical, dental, and vision coverage for you and your family.'
    },
    {
      icon: Clock,
      title: 'Flexible Working',
      description: 'Work from home options and flexible hours to support your lifestyle.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths with regular performance reviews and promotions.'
    },
    {
      icon: GraduationCap,
      title: 'Training Programs',
      description: 'Continuous learning opportunities with workshops, courses, and certifications.'
    },
    {
      icon: Calendar,
      title: 'Paid Leave',
      description: 'Generous paid time off, holidays, and parental leave policies.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work in a supportive team environment with regular team-building activities.'
    },
    {
      icon: Award,
      title: 'Performance Rewards',
      description: 'Competitive bonuses and recognition for outstanding performance.'
    },
    {
      icon: Building2,
      title: 'Modern Workspace',
      description: 'State-of-the-art office facilities with ergonomic workstations.'
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
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600">
            We take care of our people with a comprehensive benefits package designed to support your personal and professional growth.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Benefits
