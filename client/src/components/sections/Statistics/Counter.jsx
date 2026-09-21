import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const gradients = [
  ['#00A6FF', '#79D8FF'],
  ['#FF6D00', '#FFA600'],
  ['#72D669', '#A8F5E5'],
  ['#FFFFFF', '#E5E5E5'],
]

const Counter = ({ end, duration = 2, suffix = '', index = 0 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const gradient = gradients[index % gradients.length]

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="kpi-number"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shine 6s ease-in-out infinite',
      }}
    >
      {count}{suffix}
    </motion.div>
  )
}

export default Counter
