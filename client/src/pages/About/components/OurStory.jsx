import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Globe, Target, TrendingUp } from 'lucide-react'

const OurStory = () => {
  const milestones = [
    {
      year: '2021',
      title: 'Founded',
      icon: <Calendar className="w-6 h-6" />,
      description: 'TaRaj Global Solutions Private Limited was incorporated on 12 May 2021 in Pune, Maharashtra. The company was registered for software publishing, consultancy and related technology services.'
    },
    {
      year: '2021–22',
      title: 'Foundation & Growth',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'TaRaj Global established its operations and developed its capabilities in B2B lead generation, demand generation, digital marketing and technology-focused business services. The company began building its client-focused delivery model.'
    },
    {
      year: '2022–23',
      title: 'Major Client Partnerships',
      icon: <Users className="w-6 h-6" />,
      description: 'TaRaj Global expanded its client portfolio and worked with recognized global technology brands including Avaya, Microsoft, Mitel, Cisco, Oracle and RingCentral.'
    },
    {
      year: '2023–24',
      title: 'International Projects',
      icon: <Globe className="w-6 h-6" />,
      description: 'With clients and business relationships across different markets, TaRaj Global strengthened its global B2B demand-generation capabilities, serving business firms globally and delivering performance-driven lead-generation solutions.'
    },
    {
      year: '2024–25',
      title: 'Expansion & Expertise',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'TaRaj Global expanded its service portfolio across Sales Qualified Leads, BANT Leads, Marketing Qualified Leads, Appointment Setting, Demand Generation, List Building and Database Cleansing, including ABM, intent and install-based targeting.'
    },
    {
      year: '2026',
      title: 'Future Goals',
      icon: <Target className="w-6 h-6" />,
      description: 'TaRaj Global\'s next phase is focused on expanding its global presence, strengthening technology-driven demand generation, building long-term client partnerships, and delivering measurable business growth through data-driven solutions.'
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              Our
              <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
                {' '}Journey
              </span>
            </h2>

            <div className="relative">
              {/* Timeline animated line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10">
                <motion.div 
                  className="w-full bg-gradient-to-b from-[#00A6FF] to-[#FF6D00]"
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-20"
                  >
                    {/* Year badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.1, duration: 0.35, type: 'spring' }}
                      className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white font-bold text-[10px] text-center leading-tight px-1">{milestone.year}</span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all shadow-sm hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-[#00A6FF]">{milestone.icon}</div>
                        <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">How We Started</h3>
                <p className="text-gray-400 leading-relaxed">
                  Founded in <span className="text-white font-semibold">2021</span>, TaRaj Global began with a vision to help businesses grow. We started by focusing on meaningful B2B connections and quality opportunities.
                </p>
                <p className="text-gray-400 leading-relaxed mt-3">
                  Over time, we expanded our expertise in demand generation and technology marketing. Today, we help businesses connect with the right audiences across global markets.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">Our mission is to help businesses build stronger and more predictable growth pipelines.</p>
                <p className="text-gray-400 leading-relaxed mt-2">We combine data, technology, and strategic marketing to create quality opportunities.</p>
                <p className="text-gray-400 leading-relaxed mt-2">We focus on delivering measurable results and meaningful business connections.</p>
                <p className="text-gray-400 leading-relaxed mt-2">We believe in long-term partnerships built on trust, transparency, and performance.</p>
              </div>

              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Future Vision</h3>
                <p className="text-gray-400 leading-relaxed">Our vision is to become a trusted global leader in B2B demand generation.</p>
                <p className="text-gray-400 leading-relaxed mt-2">We aim to continuously adopt innovative technologies and smarter growth strategies.</p>
                <p className="text-gray-400 leading-relaxed mt-2">We strive to expand our global reach while delivering measurable business impact.</p>
                <p className="text-gray-400 leading-relaxed mt-2">Our goal is to help businesses build sustainable growth and lasting success.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurStory
