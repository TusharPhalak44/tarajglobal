import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Award, Heart, Users, BookOpen } from 'lucide-react'

const CoreValues = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We embrace creativity and constantly push boundaries to deliver cutting-edge solutions.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our business dealings and relationships.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality',
      description: 'We are committed to excellence and never compromise on the quality of our deliverables.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Our clients are at the heart of everything we do. Their success is our success.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster a culture of open collaboration.'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Continuous Learning',
      description: 'We constantly learn and evolve to stay ahead in the rapidly changing tech landscape.'
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
            Our
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Core Values
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The principles that guide our actions and define who we are as an organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
            >
              {/* Floating background shapes */}
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#00A6FF]/10 to-transparent"
              />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-[#00A6FF]">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A6FF]/0 to-[#FF6D00]/0 group-hover:from-[#00A6FF]/20 group-hover:to-[#FF6D00]/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
