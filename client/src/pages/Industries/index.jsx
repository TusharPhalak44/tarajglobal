import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  ShieldCheck, 
  CreditCard, 
  HeartPulse, 
  Radio, 
  Cpu, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Target,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@components/common/SEO'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'
import { SectionLaserDivider } from '@components/animations'

const industriesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://tarajglobal.com/industries#webpage",
      "url": "https://tarajglobal.com/industries",
      "name": "B2B Industries Served | Taraj Global",
      "description": "Specialized B2B demand generation and sales qualification for SaaS, Cybersecurity, FinTech, Healthcare, Telecom, and Enterprise AI."
    },
    {
      "@type": "ItemList",
      "name": "B2B Industry Solutions",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Enterprise SaaS & Cloud Platforms",
          "description": "Demand generation and SQL pipeline acceleration for high-growth SaaS and enterprise software companies."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cybersecurity & Identity Management",
          "description": "Connecting cybersecurity vendors with CISOs, SOC leads, and enterprise security architects."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "FinTech & Banking Solutions",
          "description": "Targeted B2B outreach to CFOs, compliance heads, and financial technology decision-makers."
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Healthcare & Life Sciences Technology",
          "description": "HIPAA-conscious outreach to hospital networks, health tech providers, and medical directors."
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Telecommunications & UCaaS",
          "description": "Pipeline acceleration for telecom providers, CPaaS platforms, and network infrastructure leaders."
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Manufacturing & Industrial IoT",
          "description": "Connecting smart manufacturing and supply chain tech providers with VP Operations and plant managers."
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Artificial Intelligence & Data Platforms",
          "description": "B2B lead generation for generative AI platforms, MLOps tooling, and data engineering solutions."
        }
      ]
    }
  ]
}

const industryList = [
  {
    id: 'saas-cloud',
    icon: Cloud,
    badge: 'High Growth',
    title: 'Enterprise SaaS & Cloud',
    subtitle: 'Scale Annual Recurring Revenue & Shorten Sales Velocity',
    description: 'B2B SaaS companies face complex multi-stakeholder evaluations. We target key buying committee members across engineering, IT, finance, and operations to accelerate product-led and sales-led deal cycles.',
    challenges: [
      'Multi-stakeholder buying committee consensus',
      'High customer acquisition cost (CAC) pressures',
      'Differentiating in crowded software categories'
    ],
    solutions: [
      'Account-Based Marketing for tier-1 enterprise targets',
      'Content syndication of technical whitepapers and ROI calculators',
      'BANT-qualified discovery calls with validated software budget'
    ],
    personas: ['Chief Technology Officer (CTO)', 'VP of Engineering', 'VP Product', 'Head of IT Procurement'],
    stats: { roi: '3.8x', metric: 'Average Pipeline ROI' },
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-[#00A6FF]'
  },
  {
    id: 'cybersecurity',
    icon: ShieldCheck,
    badge: 'Mission Critical',
    title: 'Cybersecurity & Compliance',
    subtitle: 'Engage CISOs & Security Executives with Contextual Pain Points',
    description: 'Security buyers receive hundreds of generic pitches weekly. Our specialized cybersecurity outreach leverages zero-trust frameworks, compliance mandates, and breach threat intelligence to book qualified meetings.',
    challenges: [
      'Highly guarded security leaders and spam filters',
      'Strict vendor validation and security audits',
      'Evolving regulatory requirements (GDPR, SOC2, HIPAA)'
    ],
    solutions: [
      'Direct-to-CISO appointment setting cadences',
      'Threat-intelligence-focused email copywriting',
      'Webinar attendee generation for live security briefings'
    ],
    personas: ['Chief Information Security Officer (CISO)', 'Director of InfoSec', 'Head of Cloud Security', 'Security Architect'],
    stats: { roi: '92%', metric: 'Decision-Maker Show Rate' },
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400'
  },
  {
    id: 'fintech',
    icon: CreditCard,
    badge: 'High Value',
    title: 'FinTech & Banking Solutions',
    subtitle: 'Connect with Financial Decision-Makers & RegTech Leaders',
    description: 'From core banking modernisation to payment orchestration and fraud prevention, we identify in-market financial institutions, credit unions, and fintechs ready for modernization.',
    challenges: [
      'Lengthy compliance and risk management reviews',
      'Complex legacy system integration requirements',
      'High compliance risk sensitivity'
    ],
    solutions: [
      'Custom ICP database building for banking institutions',
      'Lead nurturing workflows addressing compliance & ROI',
      'Sales Qualified Leads with verified budget authorization'
    ],
    personas: ['Chief Financial Officer (CFO)', 'Chief Risk Officer (CRO)', 'Head of Payments', 'VP Digital Banking'],
    stats: { roi: '4.2x', metric: 'Deal Pipeline Expansion' },
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400'
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    badge: 'Regulated',
    title: 'Healthcare & Life Sciences',
    subtitle: 'Navigate HealthTech & Hospital System Procurement',
    description: 'Health systems require trust-first engagement. We help medical device, EHR, telehealth, and clinical workflow vendors connect with hospital administrators and health IT leadership.',
    challenges: [
      'Stringent HIPAA and clinical compliance hurdles',
      'Complex hospital board approval hierarchies',
      'Reluctance to alter existing clinical workflows'
    ],
    solutions: [
      'Human-verified database building across health networks',
      'Case-study-driven content syndication campaigns',
      'Targeted B2B email sequences focused on clinical efficiency'
    ],
    personas: ['Chief Medical Officer (CMO)', 'Chief Nursing Informatics Officer', 'Director of Health Informatics', 'Hospital CIO'],
    stats: { roi: '98%', metric: 'Data Accuracy Guarantee' },
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400'
  },
  {
    id: 'telecom',
    icon: Radio,
    badge: 'Enterprise',
    title: 'Telecom & UCaaS Infrastructure',
    subtitle: 'Empower Cloud Communications & Unified Network Growth',
    description: 'We help telecommunications providers, VoIP platforms, and network infrastructure firms discover enterprise clients undergoing digital transformation and hybrid-work upgrades.',
    challenges: [
      'Commoditized market perceptions',
      'High churn risk during vendor migrations',
      'Lengthy enterprise RFP procedures'
    ],
    solutions: [
      'Technographic intent data trigger identification',
      'Multi-channel appointment setting with telecom buyers',
      'Database cleansing for legacy CRM contact lists'
    ],
    personas: ['VP Infrastructure', 'Head of Telecom', 'Director of Enterprise Networking', 'Chief Information Officer (CIO)'],
    stats: { roi: '65%', metric: 'Faster Sales Discovery' },
    gradient: 'from-purple-500/20 to-indigo-500/20',
    iconColor: 'text-purple-400'
  },
  {
    id: 'manufacturing',
    icon: Cpu,
    badge: 'Industrial',
    title: 'Manufacturing & Smart Industry',
    subtitle: 'Drive Adoption for Industry 4.0 & Supply Chain Tech',
    description: 'Engage plant managers, VP Operations, and logistics directors looking to modernize production lines, automate inventory, and implement predictive maintenance.',
    challenges: [
      'Skeptical operational stakeholders',
      'Heavy capital expenditure considerations',
      'Long-tail evaluation and proof-of-concept stages'
    ],
    solutions: [
      'BANT lead qualification tailored to capex cycles',
      'ABM programs focused on tier-1 global manufacturers',
      'Targeted webinars showcasing factory floor ROI'
    ],
    personas: ['VP Operations', 'Director of Supply Chain', 'Plant General Manager', 'Head of Automation'],
    stats: { roi: '3.5x', metric: 'Qualified Pipeline Growth' },
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-[#FF6D00]'
  },
  {
    id: 'ai-data',
    icon: Bot,
    badge: 'Emerging',
    title: 'AI & Data Infrastructure',
    subtitle: 'Scale Traction for Generative AI, MLOps & Analytics',
    description: 'In the fast-moving AI landscape, reaching the exact data science and engineering leads before competitors is critical. We deliver high-velocity pipeline generation for modern data stack and AI vendors.',
    challenges: [
      'Cutting through market hype and buyer fatigue',
      'Reaching technical evaluators alongside budget holders',
      'Proving tangible business value beyond experimentation'
    ],
    solutions: [
      'Developer & data leader targeted content syndication',
      'Direct SQL meeting booking with enterprise AI buyers',
      'Custom list building across companies hiring AI talent'
    ],
    personas: ['Head of Data Science', 'Chief Data Officer (CDO)', 'VP of AI / Machine Learning', 'Enterprise Architect'],
    stats: { roi: '4.8x', metric: 'Pipeline Growth Multiple' },
    gradient: 'from-blue-600/20 to-purple-600/20',
    iconColor: 'text-blue-400'
  }
]

function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState(industryList[0])

  return (
    <>
      <SEO
        title="B2B Industries We Serve | Specialized Demand Generation | Taraj Global"
        description="Discover Taraj Global's industry-tailored B2B lead generation solutions for SaaS, Cybersecurity, FinTech, Healthcare, Telecom, Manufacturing, and Enterprise AI."
        keywords="B2B lead generation industries, SaaS demand generation, Cybersecurity appointment setting, FinTech B2B marketing, Healthcare lead generation, Telecom sales pipeline, AI lead generation"
        canonical="/industries"
        ogTitle="Tailored B2B Lead Generation Across Key Tech Industries | Taraj Global"
        ogDescription="Connect with the exact decision-makers driving pipeline in your industry sector. Explore our tailored B2B demand gen playbooks."
        schemaJson={industriesSchema}
      />

      <div className="min-h-screen bg-background">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(0, 166, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 109, 0, 0.12) 0%, transparent 50%)
              `
            }}
          />

          <Container>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sector-Specific B2B Demand Generation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6 leading-tight"
              >
                B2B Lead Generation Tailored to{' '}
                <span className="bg-gradient-to-r from-primary to-cta bg-clip-text text-transparent">
                  Your Industry
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-10"
              >
                Every industry has unique buying committees, compliance hurdles, and decision-making cadences. Taraj Global builds specialized demand generation frameworks that resonate with the exact leaders who hold budget.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4"
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 min-h-[44px] bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  Book Industry Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 min-h-[44px] bg-surface border border-border text-text-primary hover:border-primary/50 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center w-full sm:w-auto text-center"
                >
                  Explore All Services
                </Link>
              </motion.div>
            </div>
          </Container>

          {/* Bottom Laser Divider */}
          <SectionLaserDivider variant="cyan" position="bottom" />
        </section>

        {/* INDUSTRY SELECTOR & DEEP DIVE */}
        <section className="relative py-20 lg:py-28 bg-surface/30 overflow-hidden">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Industry Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">
                Explore Our Sector-Specific Playbooks
              </h2>
              <p className="text-text-secondary text-base md:text-lg">
                Select an industry below to see how we penetrate buying committees and accelerate high-value deal pipelines.
              </p>
            </div>

            {/* Industry Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-12">
              {industryList.map((ind) => {
                const Icon = ind.icon
                const isActive = selectedIndustry.id === ind.id
                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 text-center ${
                      isActive
                        ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                        : 'bg-surface border-border hover:border-primary/40 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
                    <span className={`text-xs font-semibold leading-tight line-clamp-2 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {ind.title.split('&')[0].trim()}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Industry Detail Card */}
            <motion.div
              key={selectedIndustry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-surface rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                      {selectedIndustry.badge}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                      Tailored B2B Framework
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
                    {selectedIndustry.title}
                  </h3>
                  <p className="text-lg font-medium text-primary">
                    {selectedIndustry.subtitle}
                  </p>
                  <p className="text-text-secondary leading-relaxed text-base">
                    {selectedIndustry.description}
                  </p>

                  {/* Challenges vs Solutions */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4 text-cta" />
                        Common Sector Roadblocks
                      </h4>
                      <ul className="space-y-2">
                        {selectedIndustry.challenges.map((c, i) => (
                          <li key={i} className="text-xs md:text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-cta mt-0.5">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        Taraj Global Solution
                      </h4>
                      <ul className="space-y-2">
                        {selectedIndustry.solutions.map((s, i) => (
                          <li key={i} className="text-xs md:text-sm text-text-secondary flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Personas & Stats Box */}
                <div className="lg:col-span-5 bg-background/60 backdrop-blur-md rounded-2xl border border-border p-5 sm:p-6 md:p-8 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Key Decision-Maker Personas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIndustry.personas.map((p, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-text-primary font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/15 to-cta/15 border border-primary/20 flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-extrabold text-text-primary">
                          {selectedIndustry.stats.roi}
                        </div>
                        <div className="text-xs text-text-secondary font-medium mt-1">
                          {selectedIndustry.stats.metric}
                        </div>
                      </div>
                      <TrendingUp className="w-10 h-10 text-primary opacity-80" />
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="w-full py-3.5 min-h-[44px] bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    Build an Industry Campaign
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </Container>

          {/* Bottom Laser Divider */}
          <SectionLaserDivider variant="amber" position="bottom" />
        </section>

        {/* VALUE PILLARS ACROSS ALL INDUSTRIES */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-cta font-semibold text-sm uppercase tracking-wider">
                Why Industry Leaders Partner With Taraj Global
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">
                Enterprise Standards Built For Every B2B Market
              </h2>
            </div>

            {/* Value Pillars Across All Industries */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">100% Verified Decision Makers</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Every prospect is human-verified against recent job transitions, current email deliverability, and confirmed budgetary influence.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4 hover:shadow-xl hover:border-cta/40 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-cta/20 flex items-center justify-center text-cta">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Predictable Pipeline Velocity</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Avoid dry quarters with a continuous flow of Sales Qualified Leads (SQL) and BANT meetings delivered directly to your calendar.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4 hover:shadow-xl hover:border-green-500/40 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Global Compliance & Privacy</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Full adherence to GDPR, CCPA, CAN-SPAM, and enterprise data security protocols across every campaign and list building touchpoint.
                </p>
              </motion.div>
            </motion.div>
          </Container>

          {/* Bottom Laser Divider */}
          <SectionLaserDivider variant="cyan" position="bottom" />
        </section>

        {/* BOTTOM CTA */}
        <section className="relative py-16 bg-gradient-to-r from-primary/10 via-background to-cta/10 overflow-hidden">
          <Container>
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Ready to Dominate Your B2B Market Vertical?
              </h2>
              <p className="text-lg text-text-secondary">
                Let our dedicated industry specialists audit your current pipeline and construct a custom demand generation roadmap.
              </p>
              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    Schedule an Industry Discovery Call
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </Container>

          {/* Bottom Laser Divider */}
          <SectionLaserDivider variant="amber" position="bottom" />
        </section>

        <ChatBot />
      </div>
    </>
  )
}

export default Industries
