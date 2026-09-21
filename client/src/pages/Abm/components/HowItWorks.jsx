import React from 'react'
import { motion } from 'framer-motion'
import { Target, Search, Users, Activity, Mail, Share2, BarChart } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Define Your Ideal Customer Profile',
      description: 'We analyze your existing customers, target industries, company size, business characteristics, decision-makers, and growth objectives to develop a clear ideal customer profile (ICP).'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Identify High-Value Target Accounts',
      description: 'We research and prioritize organizations that closely match your ICP and demonstrate strong potential for your products or services.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Map Key Decision-Makers',
      description: 'We identify relevant stakeholders and decision-makers within each target account to understand who influences the purchasing process.'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Analyze Account Intent & Engagement',
      description: 'We use relevant account intelligence, engagement signals, and intent data to understand which target accounts may have an active interest in your solutions.'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Create Personalized ABM Campaigns',
      description: 'We develop targeted messaging and campaigns based on the specific account, industry, business challenges, buyer roles, and potential needs.'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Engage Accounts Across Multiple Channels',
      description: 'We use relevant channels and coordinated marketing activities to engage target accounts and create consistent interactions throughout the buying journey.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Measure & Optimize Account Engagement',
      description: 'We analyze campaign engagement, account activity, and performance data to identify opportunities for improvement and optimize your ABM strategy.'
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
            How Our Account-Based Marketing Service Works
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
