import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const CompanyStats = () => {
  const [counters, setCounters] = useState({
    clients: 0,
    retention: 0,
    leads: 0,
    team: 0
  })
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      const targets = {
        clients: 500,
        retention: 95,
        leads: 10,
        team: 50
      }

      let step = 0
      const timer = setInterval(() => {
        step++
        setCounters({
          clients: Math.min(Math.round((targets.clients / steps) * step), targets.clients),
          retention: Math.min(Math.round((targets.retention / steps) * step), targets.retention),
          leads: Math.min(Math.round((targets.leads / steps) * step), targets.leads),
          team: Math.min(Math.round((targets.team / steps) * step), targets.team)
        })

        if (step >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])

  const stats = [
    { 
      value: counters.clients, 
      suffix: '+', 
      label: 'Clients Served', 
      gradient: 'from-red-500 to-rose-400',
      blobShape: 'rounded-[40%_60%_70%_30%_/_50%_60%_30%_70%]',
      glowColor: 'rgba(239, 68, 68, 0.3)'
    },
    { 
      value: counters.retention, 
      suffix: '%', 
      label: 'Client Retention', 
      gradient: 'from-orange-500 to-amber-400',
      blobShape: 'rounded-[60%_40%_30%_70%_/_70%_30%_60%_40%]',
      glowColor: 'rgba(249, 115, 22, 0.3)'
    },
    { 
      value: counters.leads, 
      suffix: 'M+', 
      label: 'Leads Generated', 
      gradient: 'from-purple-500 to-violet-400',
      blobShape: 'rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]',
      glowColor: 'rgba(168, 85, 247, 0.3)'
    },
    { 
      value: counters.team, 
      suffix: '+', 
      label: 'Team Members', 
      gradient: 'from-blue-500 to-cyan-400',
      blobShape: 'rounded-[50%_50%_30%_70%_/_60%_40%_60%_40%]',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    }
  ]

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
          >
            OUR IMPACT
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Numbers That
            <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent ml-2">
              Speak
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our track record of success in delivering exceptional B2B marketing solutions and driving measurable results for our clients.
          </p>
        </motion.div>

        {/* Stats Blob Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative connecting line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.path
              d="M 200,150 Q 400,100 600,200 T 1000,180"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFC754" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Decorative dots */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/40"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 2) * 30}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative" style={{ zIndex: 1 }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2 + index * 0.15, 
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: index % 2 === 0 ? 2 : -2 
                }}
                className="relative flex items-center justify-center min-h-[280px]"
                style={{
                  marginTop: index % 2 === 0 ? '0' : '40px',
                }}
              >
                {/* Blob card */}
                <div className={`
                  relative w-full max-w-[400px] p-8 flex flex-col items-center justify-center text-center
                  bg-gradient-to-br ${stat.gradient}
                  ${stat.blobShape}
                  shadow-2xl
                  hover:shadow-3xl
                  transition-all duration-500
                `}>
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
                  
                  {/* Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.5 + index * 0.15, 
                      type: 'spring',
                      stiffness: 200 
                    }}
                    className="relative z-10 text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                  >
                    {stat.value}
                    <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.7 + index * 0.15, 
                      duration: 0.6,
                      ease: 'easeOut'
                    }}
                    className="relative z-10 h-0.5 bg-white/50 rounded-full mb-4"
                  />

                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.9 + index * 0.15, 
                      duration: 0.5 
                    }}
                    className="relative z-10 text-sm md:text-base text-white/90 uppercase tracking-wider font-medium"
                  >
                    {stat.label}
                  </motion.div>

                  {/* Floating decorative elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"
                  />
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: index * 0.5 + 0.5,
                    }}
                    className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm"
                  />
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 blur-3xl transition-opacity duration-500"
                  style={{ background: stat.glowColor }}
                  whileHover={{ opacity: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyStats
