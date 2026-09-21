import React from 'react'
import { motion } from 'framer-motion'

const Technologies = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express', icon: '⚡' },
    { name: 'MySQL', icon: '🐬' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '🎬' },
    { name: 'GraphQL', icon: '🔷' }
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
            Technologies
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}We Use
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Leveraging the latest and most powerful technologies to build exceptional digital solutions.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.2, y: -5 }}
              className="group relative"
            >
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all cursor-pointer">
                <div className="text-4xl mb-2">{tech.icon}</div>
                <div className="text-white font-semibold">{tech.name}</div>
              </div>

              {/* Glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="absolute inset-0 rounded-2xl bg-[#00A6FF]/20 blurxl -z-10"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies
