import React from 'react'
import { motion } from 'framer-motion'
import Counter from './Counter'

const StatisticsGrid = () => {
  const statistics = [
    {
      value: 500,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Trusted by businesses worldwide',
    },
    {
      value: 1200,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully delivered solutions',
    },
    {
      value: 30,
      suffix: '+',
      label: 'Countries Served',
      description: 'Global presence and reach',
    },
    {
      value: 50,
      suffix: '+',
      label: 'Industry Awards',
      description: 'Recognition for excellence',
    }
  ]

  return (
    <div className="kpi-grid">
      {statistics.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className="kpi-block"
        >
          <Counter end={stat.value} suffix={stat.suffix} duration={2.5} index={index} />
          <div className="kpi-label">{stat.label}</div>
          <div className="kpi-description">{stat.description}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatisticsGrid
