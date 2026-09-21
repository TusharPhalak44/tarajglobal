import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Building2 } from 'lucide-react'

const StatsCounter = () => {
  const [counts, setCounts] = useState({
    campaigns: 0,
    leads: 0,
    clients: 0,
    sectors: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)

  const stats = [
    { 
      label: 'CAMPAIGNS DELIVERED', 
      value: 12, 
      suffix: '+', 
      key: 'campaigns',
      icon: <TrendingUp className="w-8 h-8" />
    },
    { 
      label: 'MONTHLY LEADS', 
      value: 2139, 
      suffix: '', 
      key: 'leads',
      icon: <Users className="w-8 h-8" />
    },
    { 
      label: 'CLIENTS', 
      value: 1500, 
      suffix: '+', 
      key: 'clients',
      icon: <Target className="w-8 h-8" />
    },
    { 
      label: 'SECTORS', 
      value: 16, 
      suffix: '+', 
      key: 'sectors',
      icon: <Building2 className="w-8 h-8" />
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          startCounterAnimation()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const startCounterAnimation = () => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const timer = setInterval(() => {
      setCounts((prev) => {
        const newCounts = { ...prev }
        let allComplete = true

        stats.forEach((stat) => {
          const increment = stat.value / steps
          if (newCounts[stat.key] < stat.value) {
            newCounts[stat.key] = Math.min(newCounts[stat.key] + increment, stat.value)
            allComplete = false
          }
        })

        if (allComplete) {
          clearInterval(timer)
        }

        return newCounts
      })
    }, interval)
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-4">
            Talent you can trust
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1.5 mx-auto bg-gradient-to-r from-primary to-cta rounded-full"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-10 rounded-3xl bg-surface backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 to-cta/0 group-hover:from-primary/10 group-hover:to-cta/10 transition-all duration-300" />
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                >
                  <div className="text-primary">{stat.icon}</div>
                </motion.div>

                {/* Counter */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5, type: 'spring' }}
                  className="mb-3"
                >
                  <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
                    {Math.round(counts[stat.key]).toLocaleString()}
                    <span className="text-4xl md:text-5xl">{stat.suffix}</span>
                  </h3>
                </motion.div>

                {/* Label */}
                <p className="text-base font-semibold text-text-secondary uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
