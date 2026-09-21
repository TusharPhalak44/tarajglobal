import React from 'react'
import { motion } from 'framer-motion'
import { Target, Search, FileText, Megaphone, Share2, Activity, Filter, BarChart } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Define Your Ideal Customer Profile',
      description: 'We identify your target industries, company characteristics, buyer personas, decision-makers, business challenges, and ideal customer profile to establish a clear foundation for your demand generation strategy.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Research Your Target Market',
      description: 'We analyze your market, audience, competitors, industry trends, and potential buyer needs to identify opportunities for reaching and engaging relevant prospects.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Develop a Demand Generation Strategy',
      description: 'We create a customized B2B demand generation strategy based on your business objectives, target audience, buyer journey, marketing channels, and revenue goals.'
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Create & Distribute Relevant Content',
      description: 'We develop and promote valuable content designed to educate your target audience, build awareness, demonstrate expertise, and encourage prospects to engage with your brand.'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Launch Multi-Channel Campaigns',
      description: 'We use relevant marketing channels and campaign strategies to reach potential buyers at different stages of the B2B buying journey.'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Identify Intent & Engagement Signals',
      description: 'We analyze relevant engagement and intent signals to understand which prospects and accounts are demonstrating stronger interest in your solutions.'
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: 'Generate & Qualify Opportunities',
      description: 'We convert relevant audience engagement into potential leads and identify prospects that meet your defined qualification criteria.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Measure & Optimize Performance',
      description: 'We monitor campaign performance, audience engagement, lead quality, and pipeline contribution to continuously improve your demand generation campaigns.'
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
            How Our Demand Generation Service Works
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
