import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Thompson',
      position: 'CEO, TechCorp',
      image: '👨‍💼',
      rating: 5,
      text: 'Exceptional work! The team delivered beyond our expectations. Their attention to detail and innovative approach transformed our digital presence completely.'
    },
    {
      name: 'Sarah Williams',
      position: 'CTO, InnovateTech',
      image: '👩‍💼',
      rating: 5,
      text: 'Professional, responsive, and incredibly skilled. They understood our vision and brought it to life with precision. Highly recommend their services.'
    },
    {
      name: 'Michael Brown',
      position: 'Founder, StartupXYZ',
      image: '👨‍🚀',
      rating: 5,
      text: 'Working with this team was a game-changer for our startup. Their expertise and dedication helped us launch our product ahead of schedule.'
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Testimonials
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            What our clients say about working with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all"
            >
              {/* Quote icon */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="absolute top-6 right-6 text-[#00A6FF]/20"
              >
                <Quote className="w-12 h-12" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFA600] text-[#FFA600]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00A6FF]/20 to-[#FF6D00]/20 flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-[#00A6FF] text-sm">{testimonial.position}</div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A6FF]/0 to-[#FF6D00]/0 group-hover:from-[#00A6FF]/10 group-hover:to-[#FF6D00]/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
