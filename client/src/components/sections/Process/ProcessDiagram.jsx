import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProcessStep from './ProcessStep'
import { processSteps } from './processData'

const ProcessDiagram = () => {
  const svgRef = useRef(null)

  // Generate curved connector path
  const generateConnectorPath = (fromIndex, toIndex, layout = 'horizontal') => {
    if (layout === 'horizontal') {
      // Horizontal layout - simple curved line
      return `M 100 80 Q 150 80, 200 80`
    } else if (layout === 'tablet') {
      // Tablet 2-row layout
      if (fromIndex === 3) {
        // Connect from row 1 end to row 2 start
        return `M 350 80 Q 350 120, 350 160 Q 350 200, 300 240`
      }
      return `M 100 80 Q 150 80, 200 80`
    } else {
      // Vertical mobile layout
      return `M 50 100 Q 50 130, 50 160`
    }
  }

  return (
    <div className="relative">
      {/* Desktop - Horizontal Layout */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* SVG Connector Lines */}
          <svg
            ref={svgRef}
            className="absolute top-10 left-0 w-full h-20 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <motion.path
              d="M 140 80 L 220 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M 360 80 L 440 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
            <motion.path
              d="M 580 80 L 660 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.9 }}
            />
            <motion.path
              d="M 800 80 L 880 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.1 }}
            />
            <motion.path
              d="M 1020 80 L 1100 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.3 }}
            />
            <motion.path
              d="M 1240 80 L 1320 80"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
          </svg>

          {/* Steps */}
          <div className="flex justify-between items-start relative z-10 px-4">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <ProcessStep step={step} index={index} totalSteps={processSteps.length} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet - 2 Row Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="space-y-16">
          {/* Row 1 */}
          <div className="relative">
            <svg className="absolute top-10 left-0 w-full h-20 pointer-events-none">
              <motion.path
                d="M 140 80 L 220 80"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 360 80 L 440 80"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
            </svg>
            <div className="flex justify-between items-start relative z-10 px-4">
              {processSteps.slice(0, 3).map((step, index) => (
                <div key={step.id} className="flex-1">
                  <ProcessStep step={step} index={index} totalSteps={3} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative">
            <svg className="absolute top-10 left-0 w-full h-20 pointer-events-none">
              <motion.path
                d="M 140 80 L 220 80"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />
              <motion.path
                d="M 360 80 L 440 80"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.1 }}
              />
            </svg>
            <div className="flex justify-between items-start relative z-10 px-4">
              {processSteps.slice(3, 6).map((step, index) => (
                <div key={step.id} className="flex-1">
                  <ProcessStep step={step} index={index + 3} totalSteps={3} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Last step centered */}
          <div className="flex justify-center">
            <ProcessStep step={processSteps[6]} index={6} totalSteps={1} />
          </div>
        </div>
      </div>

      {/* Mobile - Vertical Layout */}
      <div className="md:hidden">
        <div className="space-y-8 relative">
          {/* Vertical Connector Line */}
          <svg className="absolute left-8 top-0 w-16 h-full pointer-events-none">
            <motion.path
              d="M 32 80 L 32 600"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>

          <div className="space-y-12 relative z-10">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-start">
                <div className="w-16 flex-shrink-0 flex justify-center">
                  <ProcessStep step={step} index={index} totalSteps={processSteps.length} />
                </div>
                <div className="ml-4 flex-1 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessDiagram
