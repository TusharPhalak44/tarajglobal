import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Globe, Newspaper, Building, Users, Zap } from 'lucide-react'

const Platforms = () => {
  const platforms = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Industry Blogs',
      description: 'Publish on authoritative industry-specific blogs and publications.'
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: 'Business Websites',
      description: 'Feature on reputable business websites and online magazines.'
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: 'News Portals',
      description: 'Distribute through major news portals and media outlets.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Partner Websites',
      description: 'Leverage our network of partner websites for wider reach.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Professional Communities',
      description: 'Engage with professional communities and forums.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Content Publishing Platforms',
      description: 'Utilize premium content publishing platforms and networks.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30" style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(255, 109, 0, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 30% 70%, rgba(0, 166, 255, 0.1) 0%, transparent 50%)
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
            Platforms We
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Distribute To
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We publish your content across a network of trusted and authoritative digital platforms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
                <div className="w-full h-full rounded-3xl bg-[#050505]" />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-[#00A6FF]">{platform.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{platform.title}</h3>
                <p className="text-gray-400 leading-relaxed">{platform.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Platforms
