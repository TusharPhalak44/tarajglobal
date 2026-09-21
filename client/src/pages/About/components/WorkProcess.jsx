import React from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, Layout, Code, TestTube, Rocket, MessageSquare, Settings } from 'lucide-react'

const WorkProcess = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Discovery',
      description: 'Understanding your business goals and requirements'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Research',
      description: 'Deep dive into market analysis and user needs'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Planning',
      description: 'Creating detailed project roadmap and strategy'
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Design',
      description: 'Crafting intuitive and visually stunning interfaces'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Development',
      description: 'Building robust and scalable solutions'
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: 'Testing',
      description: 'Rigorous quality assurance and bug fixing'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Deployment',
      description: 'Seamless launch and go-live support'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Support',
      description: 'Ongoing maintenance and optimization'
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
            A proven methodology that ensures successful project delivery every time.
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] hidden md:block" />

          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  {index + 1}
                </motion.div>

                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all text-center">
                  <div className="text-[#00A6FF] mb-3 flex justify-center">{step.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="hidden md:block absolute top-8 right-0 translate-x-1/2"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#00A6FF]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkProcess
