import React from 'react'
import { motion } from 'framer-motion'
import { Globe, TrendingUp, Shield, Users } from 'lucide-react'

const WhatIsContentSyndication = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Greater Online Visibility',
      description: 'Expand your reach across multiple platforms'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Increased Website Traffic',
      description: 'Drive more visitors to your website'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Stronger Brand Authority',
      description: 'Establish credibility in your industry'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Wider Audience Reach',
      description: 'Connect with new potential customers'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              {/* Central content source */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center shadow-2xl"
              >
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <Globe className="w-12 h-12 text-[#00A6FF]" />
                </div>
              </motion.div>

              {/* Distribution nodes */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180)
                const radius = 120
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#00A6FF]" />
                  </motion.div>
                )
              })}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60) * (Math.PI / 180)
                  const radius = 120
                  const x = Math.cos(angle) * radius + 192
                  const y = Math.sin(angle) * radius + 192
                  return (
                    <motion.line
                      key={i}
                      x1="192"
                      y1="192"
                      x2={x}
                      y2={y}
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.8 }}
                    />
                  )
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00A6FF" />
                    <stop offset="100%" stopColor="#FF6D00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What is Content
              <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
                {' '}Syndication?
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-12">
              Content Syndication is the process of publishing your articles, blogs, news, or business 
              content across trusted third-party platforms to reach a wider audience, increase brand 
              awareness, drive website traffic, and generate quality leads. It helps businesses maximize 
              the value of existing content without creating new content from scratch.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#00A6FF]/50 transition-all cursor-pointer"
                >
                  <div className="text-[#00A6FF] mb-3">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhatIsContentSyndication
