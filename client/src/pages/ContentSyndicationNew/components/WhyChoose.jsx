import React from 'react'
import { motion } from 'framer-motion'
import { Target, Share2, Users, Search, Eye, TrendingUp } from 'lucide-react'

const WhyChoose = () => {
  const benefits = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Reach Your Target B2B Audience',
      description: 'Get your content in front of professionals and decision-makers who closely match your ideal customer profile.'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Expand Content Reach',
      description: 'Extend the visibility of your whitepapers, eBooks, webinars, research reports, and other valuable content beyond your existing audience.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Generate Qualified B2B Leads',
      description: 'Turn content engagement into relevant prospect information that can support your B2B lead generation efforts.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Connect With Relevant Decision-Makers',
      description: 'Reach professionals and stakeholders who may influence purchasing decisions within your target organizations.'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Gain Valuable Audience Insights',
      description: 'Understand how your target audience interacts with your content and identify prospects showing stronger engagement.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Improve Content Marketing ROI',
      description: 'Use campaign data and performance insights to optimize content distribution and generate more valuable opportunities from your marketing investment.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30" style={{
        background: `
          radial-gradient(circle at 30% 50%, rgba(0, 166, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 50%, rgba(255, 109, 0, 0.1) 0%, transparent 50%)
        `
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Why Choose Our Content Syndication
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
              {' '}Services?
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Partner with Taraj Global to turn valuable content into a scalable B2B lead generation opportunity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
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
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{benefit.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-1">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
