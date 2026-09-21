import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Cpu, Heart, Factory, Building2, GraduationCap, Briefcase, Users } from 'lucide-react'

const WhoIsThisFor = () => {
  const industries = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Startups',
      description: 'Build brand awareness and reach early adopters quickly.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'IT Companies',
      description: 'Showcase expertise and attract tech-savvy customers.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Healthcare',
      description: 'Share valuable health information with broader audiences.'
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Manufacturing',
      description: 'Highlight innovation and industry leadership.'
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Real Estate',
      description: 'Build trust and attract property investors.'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Education',
      description: 'Share educational content with students and professionals.'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Finance',
      description: 'Establish authority in financial services and investment.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Professional Services',
      description: 'Demonstrate expertise and attract high-value clients.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30" style={{
        background: `
          radial-gradient(circle at 50% 30%, rgba(0, 166, 255, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 70%, rgba(255, 109, 0, 0.1) 0%, transparent 50%)
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Who Is This
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Service For?
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our content syndication services benefit businesses across various industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-[#00A6FF]">{industry.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{industry.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoIsThisFor
