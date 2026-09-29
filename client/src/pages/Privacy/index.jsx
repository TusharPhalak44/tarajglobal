import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
  UserCheck,
  Share2,
  Server,
  Scale,
  Clock,
  ArrowRight,
  ChevronDown
} from 'lucide-react'
import Container from '@components/layout/Container'
import ChatBot from '@components/chatbot/ChatBot'
import SEO from '@components/common/SEO'
import { Link } from 'react-router-dom'

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Taraj Global",
  "url": "https://tarajglobal.com/privacy",
  "description": "Comprehensive Privacy Policy for Taraj Global detailing data collection, processing, security, GDPR, CCPA rights, and enterprise compliance.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com",
    "logo": "https://tarajglobal.com/OnlyTG-%203.png"
  }
}

const TOC_SECTIONS = [
  { id: 'introduction', label: '1. Introduction & Overview' },
  { id: 'information-we-collect', label: '2. Information We Collect' },
  { id: 'how-we-use-information', label: '3. How We Use Information' },
  { id: 'legal-basis', label: '4. Legal Basis for Processing' },
  { id: 'b2b-data-practices', label: '5. B2B Intelligence & Demand Gen Practices' },
  { id: 'information-sharing', label: '6. Information Sharing & Disclosure' },
  { id: 'cookies-tracking', label: '7. Cookies & Tracking Technologies' },
  { id: 'data-security', label: '8. Data Security & Storage' },
  { id: 'data-retention', label: '9. Data Retention' },
  { id: 'privacy-rights', label: '10. Your Privacy Rights (GDPR / CCPA)' },
  { id: 'international-transfers', label: '11. International Data Transfers' },
  { id: 'childrens-privacy', label: '12. Children\'s Privacy' },
  { id: 'policy-changes', label: '13. Changes to This Privacy Policy' },
  { id: 'contact-us', label: '14. Contact Information & Data Protection Officer' },
]

function Privacy() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180

      for (const section of TOC_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
      setMobileTocOpen(false)
    }
  }

  return (
    <>
      <SEO
        title="Privacy Policy | Data Protection & Compliance | Taraj Global"
        description="Learn how Taraj Global collects, processes, and protects your personal data. Read our comprehensive Privacy Policy covering GDPR, CCPA, and enterprise B2B compliance."
        keywords="Taraj Global privacy policy, B2B data protection, GDPR compliance, CCPA compliance, enterprise privacy policy, data security"
        canonical="/privacy"
        ogTitle="Privacy Policy | Taraj Global"
        ogDescription="Read Taraj Global's privacy commitments, data governance framework, and regulatory compliance standards."
        schemaJson={privacySchema}
      />

      <div className="min-h-screen bg-background pt-24 sm:pt-28 pb-20 select-text">
        <Container>
          {/* ══ Header / Hero Area ══════════════════════════════════════════ */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-wider uppercase mb-4"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Enterprise Data Governance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-4"
            >
              Privacy Policy
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-text-secondary font-medium"
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cta" />
                <strong>Effective Date:</strong> January 1, 2025
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span>
                <strong>Last Updated:</strong> January 1, 2025
              </span>
            </motion.div>
          </div>

          {/* ══ Main Content Grid (Sidebar TOC + Main Content) ════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ── Desktop Sticky Table of Contents (Span 4) ───────────────── */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-surface/80 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border text-text-primary font-bold text-sm uppercase tracking-wider font-mono">
                <FileText className="w-4 h-4 text-primary" />
                <span>Table of Contents</span>
              </div>
              <nav aria-label="Privacy Policy Table of Contents">
                <ul className="space-y-1.5 text-xs">
                  {TOC_SECTIONS.map((section) => {
                    const isActive = activeSection === section.id
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                              ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary'
                              : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                            }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mt-6 pt-4 border-t border-border/80">
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-text-secondary">
                  <div className="font-semibold text-text-primary mb-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    <span>Data Protection Officer</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2">
                    Have privacy inquiries or want to exercise your statutory rights?
                  </p>
                  <a
                    href="mailto:info@tarajglobal.com"
                    className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-xs"
                  >
                    <span>Contact Privacy Team</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* ── Mobile Collapsible Table of Contents ────────────────────── */}
            <div className="block lg:hidden col-span-1 bg-surface border border-border rounded-xl p-4 shadow-sm">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-text-primary cursor-pointer"
                aria-expanded={mobileTocOpen}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Quick Navigation / Table of Contents</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileTocOpen && (
                <ul className="mt-3 pt-3 border-t border-border space-y-1.5 text-xs">
                  {TOC_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left py-1.5 px-2 text-text-secondary hover:text-primary hover:bg-surface-elevated rounded transition-colors"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Main Policy Content Body (Span 8) ────────────────────────── */}
            <div className="lg:col-span-8 space-y-8 text-text-secondary leading-relaxed text-sm sm:text-base">

              {/* 1. Introduction & Overview */}
              <section id="introduction" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span>1. Introduction &amp; Overview</span>
                </h2>
                <p className="mb-4">
                  Welcome to <strong>Taraj Global Solutions Private Limited</strong> (&quot;Taraj Global,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are a dedicated B2B Demand Generation, Account-Based Marketing (ABM), and Lead Intelligence partner providing data-driven marketing services through our official website located at <a href="https://tarajglobal.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">https://tarajglobal.com</a> (&quot;Website&quot;) and associated digital platforms.
                </p>
                <p className="mb-4">
                  We are deeply committed to protecting the privacy, confidentiality, and security of individuals who visit our website, communicate with our team, or whose business contact information is processed as part of our enterprise B2B marketing campaigns.
                </p>
                <p>
                  This Privacy Policy details how we collect, use, process, disclose, retain, and safeguard personal information, as well as the choices and rights available to you under applicable global data protection laws, including the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>California Consumer Privacy Act (CCPA / CPRA)</strong>, and other international data privacy regulations.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-primary shrink-0" />
                  <span>2. Information We Collect</span>
                </h2>
                <p className="mb-4">
                  We collect information that identifies, relates to, describes, or is reasonably capable of being associated with an identified or identifiable individual (&quot;Personal Information&quot;). We collect information through three primary channels:
                </p>

                <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">A. Information You Voluntarily Provide to Us</h3>
                <p className="mb-3">When you interact with our website, request a consultation, book a strategy call, or submit an inquiry, you may provide:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-6 text-sm">
                  <li><strong>Contact Identifiers:</strong> First and last name, business email address, phone number.</li>
                  <li><strong>Professional Profile:</strong> Company name, job title, department, company size, and industry.</li>
                  <li><strong>Inquiry Briefs &amp; Communications:</strong> Project requirements, volume expectations, messaging, and notes submitted via contact forms or strategy call bookings.</li>
                  <li><strong>Job Application Records:</strong> Resumes, CVs, portfolio links, and employment background submitted via our Careers portal.</li>
                </ul>

                <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">B. Information Collected Automatically</h3>
                <p className="mb-3">When you visit and navigate our Website, our servers and analytics tools automatically log standard device and telemetry data:</p>
                <ul className="list-disc pl-6 space-y-1.5 mb-6 text-sm">
                  <li><strong>Device &amp; Connection Data:</strong> IP address, browser type and version, operating system, device identifiers, and language settings.</li>
                  <li><strong>Usage Metrics:</strong> Pages visited, dwell time, navigation paths, referring URLs, clickstream data, and interaction timestamps.</li>
                  <li><strong>Cookies &amp; Local Storage:</strong> Session tokens and telemetry preferences stored via browser cookies.</li>
                </ul>

                <h3 className="text-lg font-bold text-text-primary mt-6 mb-2">C. B2B Business Intelligence &amp; Professional Contact Data</h3>
                <p className="mb-3">As a specialized B2B provider, we process professionally relevant business contact information sourced from publicly available registries, verified business social profiles, corporate websites, and enterprise data partnerships:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm">
                  <li>Business email address, business direct dial / office phone, work location, job title, and company firmographics.</li>
                  <li><em>We do not intentionally collect or process sensitive personal data (e.g., government IDs, health records, biometric data, or racial/ethnic origin).</em></li>
                </ul>
              </section>

              {/* 3. How We Use Information */}
              <section id="how-we-use-information" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Eye className="w-5 h-5 text-primary shrink-0" />
                  <span>3. How We Use Your Information</span>
                </h2>
                <p className="mb-4">
                  We process personal and business information strictly for legitimate commercial and business operations:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                  <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
                    <div className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <span>Service Delivery</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Executing demand generation programs, B2B lead verification, ABM outreach, and appointment setting.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
                    <div className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <span>Communications &amp; Scheduling</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Responding to inquiries, confirming strategy calls, sending proposals, and providing customer support.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
                    <div className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <span>Platform Optimization</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Monitoring website performance, debugging technical errors, optimizing page load speeds, and enhancing UX.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-elevated border border-border">
                    <div className="font-semibold text-text-primary text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      <span>Security &amp; Legal Compliance</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Detecting fraudulent activities, protecting against cybersecurity threats, and fulfilling statutory requirements.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Legal Basis for Processing */}
              <section id="legal-basis" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-primary shrink-0" />
                  <span>4. Legal Basis for Processing (GDPR Compliance)</span>
                </h2>
                <p className="mb-4">
                  For individuals located in the European Economic Area (EEA), the United Kingdom, or Switzerland, our legal basis for collecting and processing personal data depends on the context and purpose:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Legitimate Interests (Article 6(1)(f) GDPR):</strong> When we process B2B business contact information to connect relevant technology solutions with enterprise decision-makers, provided such interests are balanced against your fundamental privacy rights.</li>
                  <li><strong>Consent (Article 6(1)(a) GDPR):</strong> When you explicitly consent to receive newsletters, marketing communications, or accept non-essential cookies.</li>
                  <li><strong>Performance of a Contract (Article 6(1)(b) GDPR):</strong> When processing is necessary to fulfill our service agreements and deliver client deliverables.</li>
                  <li><strong>Legal Obligation (Article 6(1)(c) GDPR):</strong> When compliance with accounting, tax, or statutory disclosure laws is mandated.</li>
                </ul>
              </section>

              {/* 5. B2B Intelligence Practices */}
              <section id="b2b-data-practices" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>5. B2B Intelligence &amp; Demand Gen Practices</span>
                </h2>
                <p className="mb-4">
                  Taraj Global operates strictly within the B2B marketplace. We do not conduct consumer marketing (B2C). Our proprietary DemandFlow Bridge and qualification methodologies adhere to the following principles:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Strict Business Relevancy:</strong> Outreach is limited to professional business personas based on verifiable corporate need and ICP alignment.</li>
                  <li><strong>Immediate Opt-Out Mechanism:</strong> Every electronic communication includes a direct, one-click unsubscribe mechanism.</li>
                  <li><strong>Data Hygiene &amp; Verification:</strong> Contact databases are regularly cleansed and validated to maintain accuracy and prevent outdated record retention.</li>
                </ul>
              </section>

              {/* 6. Information Sharing */}
              <section id="information-sharing" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Share2 className="w-5 h-5 text-primary shrink-0" />
                  <span>6. Information Sharing &amp; Disclosure</span>
                </h2>
                <p className="mb-4">
                  <strong>We do not sell, rent, or trade your personal information.</strong> We only share information under strict contractual safeguards in the following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Trusted Service Providers:</strong> Sub-processors who provide cloud hosting (e.g., secure data centers), email delivery infrastructure, analytics, and CRM systems bound by confidentiality and Data Processing Agreements (DPAs).</li>
                  <li><strong>Client Campaign Delivery:</strong> When you express interest in a client&apos;s solution or participate in a co-branded webinar or content syndication program.</li>
                  <li><strong>Corporate Reorganization:</strong> In connection with a merger, acquisition, or sale of corporate assets with continuing privacy obligations.</li>
                  <li><strong>Legal Requirements:</strong> When compelled by subpoena, court order, or governmental regulation to protect legal rights and physical safety.</li>
                </ul>
              </section>

              {/* 7. Cookies & Tracking */}
              <section id="cookies-tracking" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Eye className="w-5 h-5 text-primary shrink-0" />
                  <span>7. Cookies &amp; Tracking Technologies</span>
                </h2>
                <p className="mb-4">
                  Our website uses cookies, web beacons, and local storage to ensure smooth navigation, remember theme preferences (light/dark mode), and analyze aggregated website traffic.
                </p>
                <p className="mb-4">
                  You can manage your cookie preferences at any time using our dedicated <Link to="/cookies" className="text-primary font-semibold hover:underline">Cookies Policy</Link> page or by adjusting your browser settings to reject non-essential cookies.
                </p>
              </section>

              {/* 8. Data Security */}
              <section id="data-security" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-primary shrink-0" />
                  <span>8. Data Security &amp; Storage</span>
                </h2>
                <p className="mb-4">
                  We implement multi-layered administrative, technical, and physical safeguards to prevent unauthorized access, disclosure, alteration, or destruction of your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-sm mb-4">
                  <li>256-bit TLS/SSL encryption for all data in transit across our web applications.</li>
                  <li>AES-256 encrypted storage for confidential database entries and credentials.</li>
                  <li>Role-based access control (RBAC) limiting data access solely to authorized personnel.</li>
                  <li>Regular vulnerability scanning, code security reviews, and secure cloud backups.</li>
                </ul>
                <p className="text-xs text-text-muted italic">
                  While we employ rigorous industry-standard measures, please note that no electronic transmission over the internet or cloud repository can be guaranteed to be 100% impenetrable.
                </p>
              </section>

              {/* 9. Data Retention */}
              <section id="data-retention" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>9. Data Retention</span>
                </h2>
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, satisfy contractual commitments, resolve disputes, and comply with legal, tax, or statutory reporting obligations. When data is no longer required, it is securely deleted or anonymized.
                </p>
              </section>

              {/* 10. Your Privacy Rights */}
              <section id="privacy-rights" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-primary shrink-0" />
                  <span>10. Your Privacy Rights (GDPR &amp; CCPA/CPRA)</span>
                </h2>
                <p className="mb-4">
                  Depending on your geographic location and applicable jurisdiction, you possess specific legal rights regarding your personal information:
                </p>

                <div className="space-y-3 mb-6">
                  <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                    <h3 className="font-bold text-text-primary text-sm mb-1">Under GDPR (EEA &amp; UK Residents):</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-text-secondary">
                      <li><strong>Right to Access &amp; Portability:</strong> Request copies of the personal data we hold about you.</li>
                      <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
                      <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request deletion of your personal data.</li>
                      <li><strong>Right to Object &amp; Restrict:</strong> Object to processing based on legitimate interests or direct marketing.</li>
                      <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time without affecting prior lawful processing.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated border border-border">
                    <h3 className="font-bold text-text-primary text-sm mb-1">Under CCPA / CPRA (California Residents):</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-text-secondary">
                      <li><strong>Right to Know:</strong> Know what categories and specific pieces of personal information are collected and shared.</li>
                      <li><strong>Right to Delete:</strong> Request deletion of personal information collected from you.</li>
                      <li><strong>Right to Opt-Out of Sale or Sharing:</strong> Submit a Do Not Sell or Share request (Taraj Global does not sell personal data).</li>
                      <li><strong>Right to Non-Discrimination:</strong> Receive equal service and pricing without discrimination for exercising privacy rights.</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm">
                  To exercise any of these statutory rights, please submit a request to our privacy team via email at{' '}
                  <a href="mailto:info@tarajglobal.com" className="text-primary font-bold hover:underline">
                    info@tarajglobal.com
                  </a>
                  . We will respond within thirty (30) days of identity verification.
                </p>
              </section>

              {/* 11. International Transfers */}
              <section id="international-transfers" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-primary shrink-0" />
                  <span>11. International Data Transfers</span>
                </h2>
                <p>
                  As an international organization, your information may be processed in servers located outside your country of residence, including India and the United States. Where cross-border data transfers occur, we implement Standard Contractual Clauses (SCCs) approved by the European Commission and enforce robust technical measures to guarantee data protection equivalence.
                </p>
              </section>

              {/* 12. Children's Privacy */}
              <section id="childrens-privacy" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-primary shrink-0" />
                  <span>12. Children&apos;s Privacy</span>
                </h2>
                <p>
                  Our services and website are exclusively intended for adult enterprise professionals and businesses. We do not knowingly collect or solicit personal data from children under the age of eighteen (18). If we learn that we have inadvertently collected data from a child, we will promptly delete it.
                </p>
              </section>

              {/* 13. Changes to Policy */}
              <section id="policy-changes" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>13. Changes to This Privacy Policy</span>
                </h2>
                <p>
                  We may periodically revise this Privacy Policy to reflect modifications in our operational practices, technological enhancements, or evolving legal frameworks. All updates will be published on this page with an updated &quot;Last Updated&quot; timestamp. We encourage you to review this policy periodically.
                </p>
              </section>

              {/* 14. Contact Information */}
              <section id="contact-us" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>14. Contact Information &amp; Data Protection Officer</span>
                </h2>
                <p className="mb-6">
                  If you have questions, comments, or data rights requests regarding this Privacy Policy, please reach out to our legal and data protection team:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start">
                    <Mail className="w-5 h-5 text-cta mb-2" />
                    <span className="text-xs font-mono font-bold text-text-muted uppercase">Email</span>
                    <a href="mailto:info@tarajglobal.com" className="text-sm font-semibold text-text-primary hover:text-primary hover:underline mt-1">
                      info@tarajglobal.com
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start">
                    <Phone className="w-5 h-5 text-cta mb-2" />
                    <span className="text-xs font-mono font-bold text-text-muted uppercase">Direct Phone</span>
                    <a href="tel:+919665599442" className="text-sm font-semibold text-text-primary hover:text-primary hover:underline mt-1">
                      +91-96655-99442
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start">
                    <MapPin className="w-5 h-5 text-cta mb-2" />
                    <span className="text-xs font-mono font-bold text-text-muted uppercase">Headquarters</span>
                    <address className="text-xs text-text-secondary not-italic mt-1 leading-relaxed">
                      The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014, India
                    </address>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-text-secondary">
                    Looking for our general service terms? Read our <Link to="/terms" className="text-primary font-semibold hover:underline">Terms of Service</Link>.
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors shadow-sm"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </Container>
        <ChatBot />
      </div>
    </>
  )
}

export default Privacy
