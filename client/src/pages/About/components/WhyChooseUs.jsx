import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Cpu, ArrowUpRight, Headphones, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Industry Expertise',
      description: 'Deep knowledge across multiple industries with proven track record of success.',
      cta: 'Learn More'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Experienced Team',
      description: 'Skilled professionals with diverse expertise and passion for innovation.',
      cta: 'Meet Our Team'
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: 'Latest Technology',
      description: 'Cutting-edge tools and frameworks to build modern, scalable solutions.',
      cta: 'Our Tech Stack'
    },
    {
      icon: <ArrowUpRight className="w-12 h-12" />,
      title: 'Scalable Solutions',
      description: 'Architecture designed to grow with your business needs seamlessly.',
      cta: 'See Solutions'
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: 'Reliable Support',
      description: '24/7 dedicated support to ensure your systems run smoothly.',
      cta: 'Contact Support'
    },
    {
      icon: <Lock className="w-12 h-12" />,
      title: 'Security First',
      description: 'Enterprise-grade security measures to protect your data and assets.',
      cta: 'Security Features'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Choose Us
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover what sets us apart and makes us the ideal partner for your digital transformation journey.
          </p>
        </motion.div>

        <div className="space-y-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Icon/Illustration */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="relativeaspect-square max-w-md mx-auto">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-white/10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 rounded-full border-2 border-white/5"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center backdrop-blur-xl border border-white/10">
                      <div className="text-[#00A6FF]">{reason.icon}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{reason.description}</p>
                <Link
                  to="#"
                  className="inline-flex items-center gap-2 text-[#00A6FF] font-semibold hover:gap-3 transition-all"
                >
                  {reason.cta}
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
