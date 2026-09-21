import React from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Target, Award } from 'lucide-react'

const AboutFeatures = () => {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Clients Served'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Client Retention'
    },
    {
      icon: Target,
      value: '10M+',
      label: 'Leads Generated'
    },
    {
      icon: TrendingUp,
      value: '50+',
      label: 'Team Members'
    }
  ]

  return (
    <div className="mt-12">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        Our B2B Growth & Business Impact
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="text-center p-6 rounded-xl"
            style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--primary-light)' }}
            >
              <Icon className="text-primary" size={24} />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              {stat.value}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {stat.label}
            </motion.p>
          </motion.div>
        )
      })}
      </motion.div>
    </div>
  )
}

export default AboutFeatures
