import React from 'react'
import { motion } from 'framer-motion'
import { Target, FileText, Megaphone, UserCheck, MessageSquare, BarChart, Send } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Define Your Webinar Strategy',
      description: 'We understand your target audience, industry, buyer personas, webinar goals, and business objectives to create a strategy aligned with your B2B marketing and lead generation goals.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Plan & Structure Your Webinar',
      description: 'We help develop the webinar format, topic, messaging, agenda, speakers, and content structure to create a valuable experience for your target audience.'
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Promote Your Webinar',
      description: 'Our team uses targeted promotional strategies to reach relevant professionals and decision-makers through appropriate B2B marketing channels.'
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Manage Webinar Registration',
      description: 'We create a streamlined registration experience designed to capture relevant attendee information and make it easy for your target audience to register.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Engage Your Audience',
      description: 'During the webinar, we help create meaningful audience interaction through Q&A sessions, polls, discussions, and other engagement opportunities.'
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'Track Attendee Engagement',
      description: 'We monitor registrations, attendance, participation, engagement, and other relevant metrics to understand audience interest and webinar performance.'
    },
    {
      icon: <Send className="w-8 h-8" />,
      title: 'Follow Up & Nurture Leads',
      description: 'After the webinar, we use attendee insights and engagement data to identify potential opportunities and support targeted lead nurturing and sales follow-up.'
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
            How Our B2B Webinar Service Works
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
