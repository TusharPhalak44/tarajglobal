import React from 'react'
import { motion } from 'framer-motion'
import { Target, Building2, Users, Database, CheckCircle, FileText } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Define Your Ideal Customer Profile',
      description: 'We understand your target industries, company size, geographic markets, job functions, seniority levels, technologies, and other criteria to create a clear ideal customer profile.'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Identify Target Companies',
      description: 'We research and identify businesses that match your defined criteria, helping create a focused database of relevant target accounts.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Find Relevant Decision-Makers',
      description: 'We identify key contacts and decision-makers within target organizations based on job title, department, seniority, and purchasing responsibilities.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Collect & Build Prospect Data',
      description: 'We organize relevant company and contact information to create customized B2B prospect lists based on your campaign requirements.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Verify & Validate Contact Data',
      description: 'We review and validate available information to help improve data accuracy, relevance, and usability for your sales and marketing campaigns.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Organize & Deliver Your B2B List',
      description: 'We structure the final prospect database according to your requirements, making it easier for your sales and marketing teams to use the data for targeted outreach.'
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
            How Our B2B List Building Service Works
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
