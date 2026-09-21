import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Briefcase, Globe, Award } from 'lucide-react'
import Container from '@components/layout/Container'

const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-4xl md:text-5xl font-bold text-white"
    >
      {count}{suffix}
    </motion.span>
  )
}

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Trusted by businesses worldwide'
    },
    {
      icon: Briefcase,
      value: 1200,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully delivered solutions'
    },
    {
      icon: Globe,
      value: 30,
      suffix: '+',
      label: 'Countries Served',
      description: 'Global presence and reach'
    },
    {
      icon: Award,
      value: 50,
      suffix: '+',
      label: 'Industry Awards',
      description: 'Recognition for excellence'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-primary">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-lg text-white/80">
            Our track record demonstrates our commitment to delivering exceptional results.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-white" size={32} />
                </div>
                
                <Counter end={stat.value} suffix={stat.suffix} duration={2.5} />
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-white/70 text-sm">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/20"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">98%</div>
            <div className="text-white/70 text-sm">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-white/70 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">200+</div>
            <div className="text-white/70 text-sm">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-white/70 text-sm">Support Available</div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Statistics
