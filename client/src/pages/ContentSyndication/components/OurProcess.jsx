import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, Settings, Globe, BarChart, FileCheck } from 'lucide-react'

const OurProcess = () => {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Content Analysis',
      description: 'We analyze your existing content to identify syndication opportunities.'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Content Optimization',
      description: 'Optimize content for maximum impact and SEO benefits.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Platform Selection',
      description: 'Select the most relevant and authoritative platforms for distribution.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Content Distribution',
      description: 'Publish your content across selected trusted platforms.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Performance Monitoring',
      description: 'Track performance metrics and engagement in real-time.'
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Reporting & Optimization',
      description: 'Provide detailed reports and optimize strategy for better results.'
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
            Our
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Process
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A streamlined approach to content syndication that delivers results.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00A6FF] to-[#FF6D00] hidden md:block" style={{ transform: 'translateX(-50%)' }} />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Step number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center text-white font-bold text-xl shadow-lg"
                >
                  {index + 1}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="flex-1 max-w-md"
                >
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-[#00A6FF]">{step.icon}</div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="hidden md:flex absolute left-1/2 top-full mt-8"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    <ArrowDown className="w-6 h-6 text-[#00A6FF]" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProcess
