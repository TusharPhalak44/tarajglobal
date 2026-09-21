import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import StatisticsHeader from './StatisticsHeader'
import StatisticsGrid from './StatisticsGrid'
import './Statistics.css'

const Statistics = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const panelRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <section className="statistics-section">
      {/* Background Effects */}
      <div className="statistics-background">
        <div className="floating-glow floating-glow-blue" />
        <div className="floating-glow floating-glow-orange" />
        <div className="grid-texture" />
        <div className="particles" />
      </div>

      {/* Glass Panel */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        }}
      >
        {/* Radial Light Effect */}
        <div className="radial-light" />

        {/* Light Reflection */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="light-reflection"
        />

        {/* Content */}
        <StatisticsHeader />
        <StatisticsGrid />
      </motion.div>
    </section>
  )
}

export default Statistics
