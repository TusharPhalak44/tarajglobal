import React from 'react'
import { motion } from 'framer-motion'
import { Search, Copy, AlertTriangle, FileText, CheckCircle, PlusCircle, Database } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Analyze Your Existing Database',
      description: 'We review your existing customer, prospect, or business database to identify common data quality issues and understand your specific cleansing requirements.'
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: 'Identify Duplicate Records',
      description: 'We identify duplicate company and contact records that may cause inaccurate reporting, repeated outreach, or inefficient use of your CRM and marketing systems.'
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Identify Incomplete & Outdated Data',
      description: 'We review records for missing fields, outdated information, inconsistent entries, and other data issues that may affect the usability of your database.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Standardize Database Information',
      description: 'We standardize fields, formats, naming conventions, and other information to create a more consistent and organized database structure.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Validate & Cleanse Data',
      description: 'We validate relevant information and remove, correct, or flag records according to your defined data quality requirements.'
    },
    {
      icon: <PlusCircle className="w-8 h-8" />,
      title: 'Enrich Data Where Required',
      description: 'Where applicable, relevant missing business information can be supplemented to improve the completeness and usefulness of your customer and prospect database.'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Deliver a Clean & Organized Database',
      description: 'After the cleansing process, we provide an organized database designed to make your customer and prospect information easier for your sales and marketing teams to use.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
            How Our Database Cleansing Service Works
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 mx-auto bg-gradient-to-r from-primary to-cta rounded-full"
          />
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-surface backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-300 h-full"
            >
              {/* Glowing border effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 to-cta/0 group-hover:from-primary/10 group-hover:to-cta/10 transition-all duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform flex-shrink-0">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
