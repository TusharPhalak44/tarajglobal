import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, Code, Users, CheckCircle } from 'lucide-react'
import Container from '@components/layout/Container'
import ProcessStep from './ProcessStep'

const HiringProcess = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Application',
      description: 'Submit your application and resume through our online portal'
    },
    {
      icon: Search,
      title: 'Resume Screening',
      description: 'Our HR team reviews your qualifications and experience'
    },
    {
      icon: Code,
      title: 'Technical Interview',
      description: 'Showcase your skills through technical assessments'
    },
    {
      icon: Users,
      title: 'HR Discussion',
      description: 'Meet with our team to discuss culture and expectations'
    },
    {
      icon: CheckCircle,
      title: 'Final Selection',
      description: 'Receive your offer and join our amazing team'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Hiring Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Your Journey With Us
          </h2>
          <p className="text-lg text-gray-600">
            Our hiring process is designed to be transparent, fair, and efficient. Here's what you can expect.
          </p>
        </motion.div>

        {/* Desktop - Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <svg className="absolute top-8 left-0 w-full h-1 pointer-events-none">
              <motion.line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>

            {/* Steps */}
            <div className="flex justify-between items-start relative z-10 px-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex-1">
                  <ProcessStep step={step} index={index} totalSteps={steps.length} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet - 2 Rows */}
        <div className="hidden md:block lg:hidden">
          <div className="space-y-16">
            {/* Row 1 */}
            <div className="relative">
              <svg className="absolute top-8 left-0 w-full h-1 pointer-events-none">
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              <div className="flex justify-between items-start relative z-10 px-4">
                {steps.slice(0, 3).map((step, index) => (
                  <div key={step.title} className="flex-1">
                    <ProcessStep step={step} index={index} totalSteps={3} />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            <div className="relative">
              <svg className="absolute top-8 left-0 w-full h-1 pointer-events-none">
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </svg>
              <div className="flex justify-between items-start relative z-10 px-4">
                {steps.slice(3, 5).map((step, index) => (
                  <div key={step.title} className="flex-1">
                    <ProcessStep step={step} index={index + 3} totalSteps={2} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile - Vertical Timeline */}
        <div className="md:hidden">
          <div className="space-y-8 relative">
            {/* Vertical Connecting Line */}
            <svg className="absolute left-8 top-0 w-16 h-full pointer-events-none">
              <motion.line
                x1="32"
                y1="0"
                x2="32"
                y2="100%"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>

            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start">
                  <div className="w-16 flex-shrink-0 flex justify-center">
                    <ProcessStep step={step} index={index} totalSteps={steps.length} />
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
      </Container>
    </section>
  )
}

export default HiringProcess
