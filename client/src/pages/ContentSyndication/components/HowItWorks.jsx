import React from 'react'
import { motion } from 'framer-motion'
import { Target, Search, Filter, Database, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Define Your Ideal Customer Profile',
      description: 'We identify your target industries, company size, decision-makers, business needs, and other key criteria to build a clear ideal customer profile (ICP).'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Identify Target Prospects',
      description: 'We research companies and decision-makers that match your ICP, helping your sales team focus on prospects that are relevant to your business.'
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: 'Qualify Sales-Ready Leads',
      description: 'Our team evaluates prospects based on business relevance, potential need, decision-making authority, and buying signals to identify qualified B2B leads.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Verify & Enrich Lead Data',
      description: 'We validate and enrich company and contact information to provide accurate, relevant, and actionable prospect data.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Deliver Qualified Sales Opportunities',
      description: 'We deliver organized, qualified prospects with the information your sales team needs to start meaningful conversations and move opportunities through the sales pipeline.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            How Our Sales Qualified Leads Service Works
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 mx-auto bg-gradient-to-r from-primary to-cta rounded-full"
          />
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-surface backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300 h-full"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 to-cta/0 group-hover:from-primary/10 group-hover:to-cta/10 transition-all duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
