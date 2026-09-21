import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Shield, Globe } from 'lucide-react'

const WhoWeAre = () => {
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
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Animated circles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10"
                  style={{
                    width: 150 + i * 80,
                    height: 150 + i * 80,
                  }}
                />
              ))}

              {/* Center icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center"
              >
                <Globe className="w-16 h-16 text-white" />
              </motion.div>

              {/* Floating elements */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180)
                const radius = 180
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                return (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00A6FF]" />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Who
              <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
                {' '}We Are
              </span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                We work with the leading business firms globally to deliver what actually drives them 
                providing consumer leads that increase their sales.
              </p>
              <p>
                We motivate consumers to embrace your business.
              </p>
              <p>
                Understanding the buying potential of the consumers and analyzing their spending around 
                the year helps us in delivering the right customer for any business.
              </p>
              <p>
                Our story started up in 2021 and we have been on a challenging ride ever since. From the 
                beginning we have been true to our core belief in providing QUALITY and to retain the client, 
                ensuring they are part of our journey.
              </p>
              <p>
                We keep the lines of communication simple, clear and interactive with your consumers and you. 
                We grab the attention of the consumer by providing him with the actual need of the product. 
                We think that's key to generating the interest of a consumer for any business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre
