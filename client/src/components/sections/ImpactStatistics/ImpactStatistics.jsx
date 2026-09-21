import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { TrendingUp, Target, Users, Globe, Sparkles } from 'lucide-react'
import './ImpactStatistics.css'

const AnimatedCounter = ({ end, duration = 2.5, suffix = '', prefix = '', embedded = false }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime = null
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        setCount(Math.floor(easeOutExpo * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration, hasAnimated])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
      className="stat-number"
      style={{ fontSize: embedded ? '36px' : undefined }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}

const FloatingParticle = ({ delay, duration, size }) => {
  return (
    <motion.div
      className="floating-particle"
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.6, ],
        y: [0, -100, -200],
        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
      }}
      transition={{
        duration: duration || 8,
        delay: delay || 0,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        width: size || 4,
        height: size || 4,
      }}
    />
  )
}

const StatItem = ({ index, number, suffix, label, sublabel, icon: Icon, embedded = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const icons = [TrendingUp, Target, Users, Globe]
  const StatIcon = Icon || icons[index % icons.length]
  
  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: embedded ? 40 : 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: embedded ? 40 : 60, rotateX: -15 }}
      transition={{ 
        duration: embedded ? 0.6 : 0.8, 
        delay: index * (embedded ? 0.1 : 0.2),
        type: 'spring',
        stiffness: 80,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={embedded ? { 
        y: -5,
        scale: 1.02,
      } : { 
        y: -10,
        scale: 1.02,
      }}
    >
      {/* Animated Border */}
      <motion.div 
        className="stat-border-glow"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Card Content */}
      <div className="stat-card">
        {/* Icon with Animation */}
        <motion.div 
          className="stat-icon-wrapper"
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <motion.div
            className="stat-icon-bg"
            animate={{
              boxShadow: isHovered 
                ? '0 0 30px rgba(0, 166, 255, 0.4)' 
                : '0 0 20px rgba(0, 166, 255, 0.2)',
            }}
          />
          <StatIcon className="stat-icon" size={embedded ? 24 : 32} />
        </motion.div>

        {/* Index Badge */}
        <motion.div 
          className="stat-index-badge"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * (embedded ? 0.1 : 0.2) + 0.4, type: 'spring' }}
        >
          <span className="stat-index-text">0{index + 1}</span>
        </motion.div>

        {/* Main Number */}
        <div className="stat-number-wrapper">
          <AnimatedCounter 
            end={number} 
            suffix={suffix} 
            duration={embedded ? 1.5 : 2.5}
            embedded={embedded}
          />
        </div>

        {/* Labels */}
        <div className="stat-labels">
          <motion.h3 
            className="stat-label"
            animate={{ 
              color: isHovered ? 'var(--primary)' : 'var(--text-primary)',
            }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.h3>
          <motion.p 
            className="stat-sublabel"
            animate={{ 
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 5,
            }}
          >
            {sublabel}
          </motion.p>
        </div>

        {/* Sparkle Effect on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="sparkle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${20 + i * 20}%`,
                  }}
                >
                  <Sparkles size={12} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Reflection Effect */}
      <motion.div 
        className="stat-reflection"
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

const ImpactStatistics = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const stats = [
    {
      number: 12,
      suffix: '+',
      label: 'Sectors',
      sublabel: 'Industries served',
      icon: TrendingUp
    },
    {
      number: 2139,
      suffix: '',
      label: 'Campaigns',
      sublabel: 'Delivered',
      icon: Target
    },
    {
      number: 1500,
      suffix: '+',
      label: 'Monthly',
      sublabel: 'Leads',
      icon: Users
    },
    {
      number: 16,
      suffix: '+',
      label: 'Clients',
      sublabel: 'Worldwide',
      icon: Globe
    }
  ]

  return (
    <div ref={sectionRef} className="impact-statistics-embedded">
      {/* Content */}
      <div className="impact-container-embedded">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="impact-header-embedded"
        >
          <motion.div 
            className="impact-eyebrow-embedded"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={16} className="eyebrow-icon" />
            THE NUMBERS BEHIND OUR IMPACT
          </motion.div>
          <motion.h2 
            className="impact-title-embedded"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Results that speak for themselves.
          </motion.h2>
        </motion.div>

        {/* Statistics Grid */}
        <div className="impact-stats-grid-embedded">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              index={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              icon={stat.icon}
              embedded={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImpactStatistics
