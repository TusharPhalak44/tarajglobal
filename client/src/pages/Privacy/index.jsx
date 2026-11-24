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
  ChevronDown,
  Info
} from 'lucide-react'
import Container from '@components/layout/Container'
import SEO from '@components/common/SEO'
import useSEOData from '@/hooks/useSEOData'
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
  { id: 'who-we-are', label: '1. Who we are and what this policy covers' },
  { id: 'summary-at-a-glance', label: '2. Summary at a glance' },
  { id: 'information-we-collect', label: '3. Information we collect' },
  { id: 'where-we-get-business-contact-data', label: '4. Where we get business contact data' },
  { id: 'how-we-use-information', label: '5. How we use information and our legal bases' },
  { id: 'b2b-outreach', label: '6. B2B outreach and marketing communications' },
  { id: 'profiling-lead-scoring', label: '7. Profiling, lead scoring and automated decisions' },
  { id: 'sharing-disclosure', label: '8. Sharing and disclosure' },
  { id: 'cookies-tracking', label: '9. Cookies and tracking technologies' },
  { id: 'security-breach-notification', label: '10. Security and breach notification' },
  { id: 'data-retention', label: '11. Data retention' },
  { id: 'international-transfers', label: '12. International data transfers' },
  { id: 'your-rights', label: '13. Your rights and how to use them' },
  { id: 'california-notice', label: '14. Additional notices for California, Germany and the Gulf region' },
  { id: 'india-dpdp', label: '15. India: applicable law and Grievance Officer' },
  { id: 'children-changes', label: '16. Children, third-party links and changes to this policy' },
  { id: 'contact-us', label: '17. Contact us' },
]

function Privacy() {
  const [activeSection, setActiveSection] = useState('who-we-are')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      let currentId = TOC_SECTIONS[0]?.id || ''

      for (const section of TOC_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          const top = rect.top + window.scrollY
          if (scrollPosition >= top) {
            currentId = section.id
          }
        }
      }

      // Check if user has scrolled near bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        currentId = TOC_SECTIONS[TOC_SECTIONS.length - 1]?.id || currentId
      }

      setActiveSection(currentId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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

  const { seoData } = useSEOData('page', 'privacy', {
    title: "Privacy Policy | Data Protection & Compliance | Taraj Global",
    description: "Learn how Taraj Global collects, processes, and protects your personal data. Read our comprehensive Privacy Policy covering GDPR, CCPA, and enterprise B2B compliance.",
    keywords: "Taraj Global privacy policy, B2B data protection, GDPR compliance, CCPA compliance, enterprise privacy policy, data security",
    canonical: "/privacy",
    ogTitle: "Privacy Policy | Taraj Global",
    ogDescription: "Read Taraj Global's privacy commitments, data governance framework, and regulatory compliance standards.",
    schemaJson: privacySchema,
  })

  return (
    <>
      <SEO {...seoData} schemaJson={privacySchema} />

      <div className="min-h-screen bg-background pt-8 sm:pt-10 pb-20 select-text">
        <Container>
          {/* ══ Header / Hero Area ══════════════════════════════════════════ */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="inline-flex items-center gap-2 bg-primary/30 dark:bg-primary/10 text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4"
>
  <span>Enterprise Data Governance</span>
</motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight mb-4"
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
                <div className="p-3 rounded-xl bg-primary/25 dark:bg-primary/5 border border-primary/15 text-xs text-text-secondary">
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
              <section id="who-we-are" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-primary shrink-0" />
                  <span>1.Who we are and what this policy covers</span>
                </h2>
                <p className="mb-4">
                  <strong>Taraj Global Solutions Private Limited</strong> (“Taraj Global”, “we”, “us”) is a B2B demand generation and lead generation agency based in Pune, India. We run campaigns for business clients, including lead generation (MQL, HQL, BANT and SQL programs), appointment generation, account-based marketing, content syndication, webinars, email marketing, B2B list building and database cleansing.
                  <br />This policy applies to four groups of people:

                </p>
                      <ul className="list-disc pl-6 space-y-3 marker:text-primary">
                     <li>
                       <strong className="font-bold text-text-primary">Website visitors:</strong>{" "}
                       to tarajglobal.com and our related pages.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Enquirers and clients:</strong>{" "}
                       who contact us, book a call or buy our services.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Job applicants:</strong>{" "}
                       who apply through our Careers page.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Business Contacts:</strong>{" "}
                       business professionals whose work contact details we hold in our B2B
                       database or process in a campaign.
                     </li>
                   </ul><br />
                   <p className="mb-4">
                    We work only in the B2B market. We do not market to consumers, and we do not collect personal details such as home addresses or private email addresses.
                    </p>
        <h3 className="text-base sm:text-lg font-bold text-primary mb-3">
         Our role in each activity
       </h3>
       <p className="mb-4">
        Our legal role depends on what we are doing. We set the role for each client campaign in the client contract.
       </p>

       {/* Roles in Activity Table */}
       <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
         <table className="w-full text-left border-collapse text-xs sm:text-sm">
           <thead>
             <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
               <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[32%] min-w-[190px] border-r border-border">
                 Activity
               </th>
               <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[30%] min-w-[170px] border-r border-border">
                 Our role
               </th>
               <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[220px]">
                 What it means for you
               </th>
             </tr>
           </thead>
           <tbody className="divide-y divide-border">
             <tr className="hover:bg-primary/[0.03] transition-colors">
               <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                 Running our website, handling enquiries, managing clients, recruiting
               </td>
               <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
                 Controller (Data Fiduciary under Indian law)
               </td>
               <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                 We decide why and how your data is used, and this policy is your main notice.
               </td>
             </tr>
             <tr className="hover:bg-primary/[0.03] transition-colors">
               <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                 Building and maintaining our own B2B database; programs we run under our own brand, such as content syndication and webinars
               </td>
               <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
                 Controller, sometimes jointly with the client
               </td>
               <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                 We are responsible for the notice, the legal basis and your rights. Where a client also uses your data, it is responsible for its own use.
               </td>
             </tr>
             <tr className="hover:bg-primary/[0.03] transition-colors">
               <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                 Campaigns where a client gives us its own contacts or tells us exactly whom to contact
               </td>
               <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
                 Processor (Data Processor) acting on the client’s instructions
               </td>
               <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                 The client’s privacy notice applies. We forward your request to the client and help it respond.
               </td>
             </tr>
           </tbody>
         </table>
       </div>
              </section>

              {/* 2. Summary at a glance */}
              <section id="summary-at-a-glance" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-primary shrink-0" />
                  <span>2.  Summary at a glance</span>
                </h2>
                <p className="mb-4">
                  This table is a quick guide. The sections that follow are the full policy and prevail if anything differs.
                </p>

                {/* Summary at a Glance Table */}
                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[32%] min-w-[200px] border-r border-border">
                          Question
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[260px] border-r border-border">
                          Short answer
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[14%] min-w-[80px]">
                          Section
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          What do we hold about business professionals?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Work contact details, job role, employer data and how you interact with our campaigns.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          3
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Where does the data come from?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          You, public business sources, licensed data partners, clients, and event or content registrations.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          4
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Do we send marketing?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Yes, B2B only, relevant to your role, with an opt-out in every message. We follow each country’s rules and ask for consent where the law requires it.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          6
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Do we pass your details to clients?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Yes, when you register for or show interest in a client’s offer, or where the law and our contracts allow it. We tell you who receives them.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          8
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Do we sell personal data?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          We treat paid lead delivery to clients as a “sale” or “sharing” under US state privacy laws and let you opt out.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          8, 14
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Do we profile people?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Yes, for lead scoring and campaign targeting. No decision with a legal or similar effect is made by a machine alone.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          7
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Where is data processed?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          India, the United States and other places where our providers and clients operate, with safeguards.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          12
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          How do you opt out or use your rights?
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Use the unsubscribe link, or email <a
                            href="mailto:privacy@tarajglobal.com"
                            className="text-primary hover:underline font-medium"
                          >
                            privacy@tarajglobal.com
                          </a>.
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-text-primary align-top leading-relaxed">
                          6, 13
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

               
              </section>

              {/* 3. Information We Collect */}
              <section id="information-we-collect" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Eye className="w-5 h-5 text-primary shrink-0" />
                  <span>3. Information we collect
</span>
                </h2>
               <p className="mb-4 text-[#00A6FF]"> A. Website visitors</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                  <li>
                    <strong className="font-bold text-text-primary">
                      Device and connection data:
                    </strong>{" "}
                    IP address, browser type and version, operating system, device identifiers,
                    language settings and approximate location derived from the IP address.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">
                      Usage data:
                    </strong>{" "}
                    pages viewed, time on page, navigation paths, referring URLs, clicks and timestamps.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">
                      Cookie and local storage data:
                    </strong>{" "}
                    identifiers and preferences, as described in Section 9.
                  </li>
                </ul><br />
                <p className="mb-4 text-[#00A6FF]">B. Enquirers and clients</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                   <li>
                     <strong className="font-bold text-text-primary">
                       Contact and company details:
                     </strong>{" "}
                     name, business email, business phone, company name, job title, department,
                     company size and industry.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">
                       Enquiry content:
                     </strong>{" "}
                     project requirements, volumes, messages, call notes and meeting bookings.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">
                       Commercial records:
                     </strong>{" "}
                     contracts, invoices and payment details of the client business, and our
                     correspondence with you.
                   </li>
                 </ul>
                 <p className="mb-4 text-[#00A6FF]"> C. Job applicants</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                     <li >
                       <strong className="font-bold text-text-primary">
                         Application details:
                       </strong>{" "}
                       name, contact details, CV or resume, portfolio links, employment and
                       education history, assessment results, interview notes and references.
                     </li>
                   
                     <li >
                       We do not ask for sensitive details such as religion, health or caste,
                       and ask you not to include them. We run background checks only after an
                       offer, and only where the law allows.
                     </li>
                 </ul>
                  <p className="mb-4 text-[#00A6FF]">D. Business Contacts</p>
                  <p >
                    These are professionals whose work details we hold to run B2B campaigns.
                  </p>

                  <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[35%] min-w-[180px] border-r border-border">
                            Category
                          </th>
                          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
                            Examples
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Identity and work contact
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Name, business email, office or direct-dial phone, work location, LinkedIn or other business profile URL
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Professional profile
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Job title, function, seniority, employer, department, tenure in role
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Company data
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Industry, size, revenue band, technologies used, buying signals tied to the business
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Campaign interaction
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Emails opened or clicked, content downloaded, webinars registered for or attended, forms submitted, answers to qualification questions (for example on budget, authority, need and timeline for a business purchase)
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Call and meeting records
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Notes and, where lawful and with notice, recordings of qualification and appointment-setting calls
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Suppression records
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            Opt-outs, do-not-contact requests and bounced or invalid addresses
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                        <p>
                            <strong className="font-bold text-white">
                              What we do not collect:
                            </strong>{" "}
                            sensitive personal data (health, biometrics, race or ethnicity, political or
                            religious beliefs, sexual orientation, government ID numbers, financial
                            account details), personal or home contact details, or information about
                            family or private life.
                          </p>
             </section>

              {/* 4. Where We Get Business Contact Data */}
              <section id="where-we-get-business-contact-data" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-primary shrink-0" />
                  <span>4.  Where we get business contact data</span>
                </h2>
                <p className="mb-4">
                  We do not collect all Business Contact data from the people it describes. We obtain it from these types of source:
                </p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                     <li >
                       <strong className="font-bold text-text-primary">You:</strong>{" "}
                       forms, registrations, call and meeting answers, and replies to our messages.
                     </li>
                   
                     <li >
                       <strong className="font-bold text-text-primary">Public business sources:</strong>{" "}
                       company websites, business directories, professional networking profiles you have made visible for business use, press releases, conference speaker and exhibitor lists, and government or trade registries.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Licensed data partners:</strong>{" "}
                       commercial B2B data providers and verification services, under contracts that require them to have collected and shared the data lawfully.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Clients:</strong>{" "}
                       contact lists or leads a client gives us to run its campaign.
                     </li>
                   
                     <li>
                       <strong className="font-bold text-text-primary">Events and programs:</strong>{" "}
                       registrations for webinars, content syndication, surveys and co-branded events.
                     </li>
                   </ul>
            <br />
                   <p className="mb-4 text-[#00A6FF]"> How we tell you</p>
                   <p>When we first hold your details from a source other than you, we tell you at or before our first contact, and in any case within one month. Our first message states who we are, the categories of data we hold, the type of source, why we are contacting you, your right to object and opt out, and a link to this policy. You can ask us at any time to name the specific source of your data.</p>
                   <p className="mb-4 text-[#00A6FF]">Our standards for data sources</p>
                   <ul className="list-disc pl-6 space-y-3 marker:text-white">
                     <li>
                       We use public information for business purposes only, and we respect the terms of the sites we use.
                     </li>
                   
                     <li>
                       We check each data partner before use and re-check it at least once a year. We keep records of how the data was collected and what notice the individuals received.
                     </li>
                   
                     <li>
                       We stop using a source, and delete data obtained from it, if it cannot show that the data was lawfully collected.
                     </li>
                   
                     <li>
                       We remove Business Contacts who have opted out from every list and campaign, and we keep a suppression record so they are not added again.
                     </li>
                   </ul>
              </section>

              {/* 5. How We Use Information */}
              <section id="how-we-use-information" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-primary shrink-0" />
                  <span> 5. How we use information and our legal bases
</span>
                </h2>
                <p className="mb-4">
                  We use personal data only for the purposes below. For people in the European Economic Area (EEA), the United Kingdom and Switzerland, the table also gives our legal basis under the GDPR and UK GDPR.
                </p>

                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[32%] min-w-[180px] border-r border-border">
                          Purpose
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[28%] min-w-[160px] border-r border-border">
                          Data used
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[260px]">
                          Legal basis (GDPR / UK GDPR)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Run, secure and improve our website
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Website visitor data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legitimate interests (security, performance); consent for non-essential cookies
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Respond to enquiries, book calls, send proposals
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Enquirer and client data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Steps before a contract; legitimate interests
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Deliver client campaigns: lead generation, appointment setting, ABM, content syndication, webinars
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Business Contact and campaign data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Contract (where we act as processor for a client); legitimate interests; consent where a program or local law requires it
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Build, verify, enrich and cleanse our B2B database
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Business Contact data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legitimate interests
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Send B2B marketing and outreach
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Business Contact data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legitimate interests, subject to the local email and phone rules in Section 6; consent where required
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Qualify and score leads
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Business Contact and campaign data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legitimate interests
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Honour opt-outs and keep suppression lists
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Suppression records
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legal obligation; legitimate interests
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Invoice, account, pay tax
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Client and supplier data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legal obligation; contract
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Recruit staff
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Applicant data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Steps before a contract; legitimate interests; consent for talent-pool retention
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Prevent fraud, enforce rights, audits, corporate transactions
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Any data needed
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Legitimate interests; legal obligation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p >
                   <strong className="font-bold text-text-primary">
                     Legitimate interests.
                   </strong>{" "}
                   Where we rely on them, we have recorded why our interest is lawful and necessary, and how we weigh it against your rights. Our interest is promoting relevant business solutions to the professionals likely to need them. A summary of this assessment is available on request, and you may object at any time (Section 13).
                 </p>
                 <p>
                   <strong className="font-bold text-text-primary">
                     India.
                   </strong>{" "}
                   Our processing in India is governed by the Information Technology Act, 2000
                   and the SPDI Rules, 2011, and by the Digital Personal Data Protection Act,
                   2023 (DPDP Act) and the DPDP Rules, 2025 as they come into force. The core
                   consent, notice and data-fiduciary duties apply from May 2027. We are building
                   our processes to meet them, and for Business Contacts in India we will give
                   notice and request consent where the DPDP Act requires it. See Section 15.
                 </p>
              </section>

              {/* 6. B2B Outreach and Marketing Communications */}
              <section id="b2b-outreach" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Share2 className="w-5 h-5 text-primary shrink-0" />
                  <span>6. B2B outreach and marketing communications</span>
                </h2>
                <p className="mb-4">
                 Every message we send follows these rules:
                </p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                       <li>
                      <strong className="font-bold text-text-primary">Business relevance only.</strong>{" "}
                      We contact people about solutions that fit their professional role and company.
                    </li>
                  
                    <li>
                      <strong className="font-bold text-text-primary">Clear sender.</strong>{" "}
                      Each message identifies Taraj Global (and the client we are working for, where relevant), gives a valid postal address and uses an honest subject line.
                    </li>
                  
                    <li>
                      <strong className="font-bold text-text-primary">Easy opt-out.</strong>{" "}
                      Every email carries a one-click unsubscribe link, and you can also reply or write to{" "}
                      <a
                        href="mailto:privacy@tarajglobal.com"
                        className="text-primary font-medium hover:underline"
                      >
                        privacy@tarajglobal.com
                      </a>
                      . We process opt-outs immediately where automated, and in any case within five business days. We never charge for opting out or require more than your email address.
                    </li>
                  
                    <li>
                      <strong className="font-bold text-text-primary">Calls.</strong>{" "}
                      We check national do-not-call registers before calling, state who we are and why we are calling, and record calls only where the law allows and after telling you.
                    </li>
                  </ul><br />
                  <p className="mb-4 text-[#00A6FF]">How we apply local law</p>
                  <p className="mb-4">Email and phone marketing are regulated separately from general data protection law, and the rules differ by country.</p>

                  <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[30%] min-w-[160px] border-r border-border">
                            Region
                          </th>
                          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
                            How we approach outreach
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            EU / EEA
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                           Rules differ by member state. In countries that require prior consent for B2B email (Germany is a common example, under Section 7 of the UWG; see Section 14), we send cold email only with consent. Elsewhere we rely on legitimate interests with a clear opt-out. We respect national call-suppression lists.
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            United Kingdom
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We may email corporate subscribers (company addresses) with identification and an opt-out. Sole traders and some partnerships count as individuals and need consent. We screen against the TPS and CTPS for calls.
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            United States
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We follow the CAN-SPAM Act: accurate sender information, a postal address and opt-outs honoured within 10 business days. For calls and texts we follow the TCPA and state rules, screen against do-not-call lists and do not use autodialled or prerecorded calls or texts to mobile numbers without the required consent.
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Canada
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We follow CASL: we send commercial electronic messages only with express consent or valid implied consent, identify the sender and honour unsubscribes within 10 business days.
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            India
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We follow TRAI rules for commercial communications, including the preference registry, and the DPDP Act when it applies.
                          </td>
                        </tr>

                           <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                        Gulf (UAE, Saudi Arabia, Qatar, Bahrain, Oman, Kuwait)
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We contact people only after they opt in, include an opt-out in every message and keep a suppression record. See Section 14.
                          </td>
                        </tr>


                        <tr className="hover:bg-primary/[0.03] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                            Other countries
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                            We follow the local law that applies to the recipient.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mb-4"> If you opt out, we keep a minimal suppression record, such as your email address, so that we do not contact you again. We keep it because we have a legal and legitimate interest in honouring your request.
 </p>
              </section>

              {/* 7. Profiling, Lead Scoring and Automated Decisions */}
              <section id="profiling-lead-scoring" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Eye className="w-5 h-5 text-primary shrink-0" />
                  <span>7. Profiling, lead scoring and automated decisions</span>
                </h2>
                <p className="mb-4">
                 We profile Business Contacts to decide which professionals are relevant to which campaign. We match job role, seniority and company data against a client’s ideal customer profile, and we score leads using campaign engagement and qualification answers.

                </p>
                <p className="mb-4">
                This profiling decides whom we contact and which leads we pass to a client. It does not produce legal or similarly significant effects on you, and we make no decision of that kind by automated means alone. A person reviews how we set the scoring rules and can review an individual score if you ask.</p>
                <p className="mb-4">
                  You can object to profiling for marketing at any time, and that objection is absolute for direct marketing. See Section 13.

                </p>
              </section>

              {/* 8. Sharing and Disclosure */}
              <section id="sharing-disclosure" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-primary shrink-0" />
                  <span>8.Sharing and disclosure</span>
                </h2>
                <p className="mb-4 text-[#00A6FF]">Service providers (sub-processors)
</p>
                <p className="mb-4">
                 <p>
                    We use providers for cloud hosting, email delivery, CRM and sales engagement,
                    data verification and enrichment, dialing and call recording, webinar hosting,
                    analytics, support and professional advice. They process data only on our
                    instructions under written agreements that require confidentiality and
                    security. We keep a current list of sub-processors and provide it on request
                    at{" "}
                    <a
                       href="mailto:privacy@tarajglobal.com"
                       className="text-[#00A6FF] hover:underline"
                     >
                       privacy@tarajglobal.com
                     </a>.
                  </p>
                </p>
                <p className="mb-4 text-[#00A6FF]">Clients: how we deliver leads</p>
                <p className="mb-4">Delivering leads and contact data to clients is the core of our service, so we explain it plainly.</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                  <li>
                    <strong className="font-bold text-text-primary">Content syndication and webinars.</strong>{" "}
                    When you download a report, register for an event or ask for information, the form tells you which sponsor or client will receive your details. We pass your details only to the clients named at that point and, where the law requires it, only if you have agreed.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">Lead generation and appointment setting.</strong>{" "}
                    We pass a client the details of professionals who confirmed interest or met the client’s qualification criteria, and who have been told that we will do so. We tell you which client receives them.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">List building and database services.</strong>{" "}
                    We may deliver business contact records that match a client’s targeting criteria. We deliver them only where our legal basis and notice duties are met.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">What clients must do.</strong>{" "}
                    Once a client receives your details for its own purposes, it becomes responsible for that use. Our contracts require clients to use leads only for the stated campaign, give you their own privacy notice and opt-out, respect your rights, protect the data and not resell it.
                  </li>
                </ul><br />
                <p className="mb-4 text-[#00A6FF]">Sale and sharing under US privacy</p> 
                <p>
                    Some US state laws, including California’s, treat disclosing personal
                    information for money or other valuable consideration as a “sale”, and
                    disclosing it for cross-context behavioural advertising as “sharing”.
                    Because clients pay for our campaigns, we treat lead delivery as a sale and
                    sharing for those laws. You can opt out at any time through the “Do Not Sell
                    or Share My Personal Information” link or by email to{" "}
                       <a
                    href="mailto:privacy@tarajglobal.com"
                    className="text-[#00A6FF] hover:underline"
                  >
                    privacy@tarajglobal.com
                  </a>
                      , or through a browser opt-out signal such as Global Privacy Control, which
                      we honour. We do not knowingly sell or share the personal information of
                      anyone under 16.
                    </p>
                <p className="mb-4 text-[#00A6FF]">Other disclosures</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                  <li>
                    <strong className="font-bold text-text-primary">Corporate transactions:</strong>{" "}
                    a merger, acquisition, financing or sale of assets, with the buyer bound to honour this policy.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">Legal reasons:</strong>{" "}
                    a court order, a lawful request from authorities, or protecting our rights, safety and security or those of others.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">With your direction:</strong>{" "}
                    where you ask us to share data or agree to it.
                  </li>
                
                  <li>
                    <strong className="font-bold text-text-primary">De-identified data:</strong>{" "}
                    aggregated or anonymised information that does not identify you.
                  </li>
                </ul>
              </section>

              {/* 9. Cookies and Tracking Technologies */}
              <section id="cookies-tracking" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span>9.Cookies and tracking technologies</span>
                </h2>
                <p>
                  Our website uses cookies, web beacons and local storage. In the EEA, the UK and Switzerland we place non-essential cookies only after you opt in through our cookie banner. Elsewhere, you can still change your choices at any time.
                </p>

                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[25%] min-w-[140px] border-r border-border">
                          Type
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[45%] min-w-[240px] border-r border-border">
                          Purpose
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[180px]">
                          Consent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Strictly necessary
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Page loading, security, remembering your cookie choices
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Not required
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Preferences
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Remembering settings such as light or dark mode
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Required in EEA, UK and Switzerland
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Analytics
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Measuring traffic and improving the site using [analytics tool name]
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Required in EEA, UK and Switzerland
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Marketing
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          [Delete this row if none are used]
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Required in EEA, UK and Switzerland
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                   You can manage your choices through the “Cookie settings” link in our footer,
                   through your browser settings, or with a browser opt-out signal such as Global
                   Privacy Control, which we treat as an opt-out of sale and sharing. A full list
                   of cookies is in our{" "}
                   <a
                     href="https://tarajglobal.com/cookies"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#00A6FF] hover:underline"
                   >
                     Cookie Policy
                   </a>.
                 </p>
              </section>

              {/* 10. Security and Breach Notification */}
              <section id="security-breach-notification" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Scale className="w-5 h-5 text-primary shrink-0" />
                  <span>10.Security and breach notification,</span>
                </h2>
                <p className="mb-4">
                 We protect personal data with administrative, technical and physical safeguards that fit the risk, including:
                </p>
               <ul className="list-disc pl-6 space-y-3 marker:text-white">
                     <li>encryption in transit using TLS, and encryption at rest for databases and credentials;</li>
                     <li>role-based access control and multi-factor authentication for systems that hold personal data;</li>
                     <li>logging, regular vulnerability scanning and code review, and secured backups;</li>
                     <li>confidentiality duties and privacy training for staff, and security review of our providers.</li>
                </ul>
                 <p>No system is completely secure, and we cannot guarantee absolute security.</p>
                 <p>If a personal data breach occurs, we will investigate and contain it and notify the relevant authorities, clients and affected individuals within the time the law requires. This includes India’s CERT-In, EU and UK supervisory authorities, and, from May 2027, the Data Protection Board of India.
               </p>
              </section>

              {/* 11. Data Retention */}
              <section id="data-retention" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-primary shrink-0" />
                  <span>11.  Data retention</span>
                </h2>
                <p>
                  We keep personal data only as long as needed for the purpose it was collected for, and then delete or anonymise it. These are our standard periods.
                </p>

                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[35%] min-w-[180px] border-r border-border">
                          Data
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
                          Retention
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Website logs and analytics
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          [14] months; cookies as listed in our Cookie Policy
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Enquiries that do not become clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          [24] months after last contact
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Client records, contracts and invoices
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Contract term plus the period the law requires for accounting and tax records (generally [8] years in India)
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Business Contact database records
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Verified at least every [12] months; deleted or anonymised if there has been no verification or engagement for [24] months
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Client campaign data
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          As the client contract says; returned or deleted within [60] days of campaign end
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Call recordings
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          [90] days, unless needed for a dispute or legal claim
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Opt-out and suppression records
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Kept for as long as needed so that we continue to honour the opt-out
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Unsuccessful job applications
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          [12] months; [24] months in a talent pool only if you agree
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Records needed for legal claims
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Until the matter is resolved and limitation periods have run
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 12. International Data Transfers */}
              <section id="international-transfers" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-primary shrink-0" />
                  <span>12.  International data transfers</span>
                </h2>
                <p>
                  We are based in India, and our providers and clients operate in the United States, the EEA, the UK and other countries. Your data may therefore be processed outside your country.
                </p><br />
                <p>India has no EU or UK adequacy decision, so for personal data that originates in the EEA, UK or Switzerland we use these safeguards:</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                   <li>
                     <strong className="font-bold text-text-primary">EEA:</strong>{" "}
                     the European Commission’s Standard Contractual Clauses (2021/914), using the module that fits each transfer (controller to controller, controller to processor, or processor to sub-processor).
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">UK:</strong>{" "}
                     the UK International Data Transfer Agreement or the UK Addendum to the SCCs.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">Switzerland:</strong>{" "}
                     the SCCs with the Swiss addendum.
                   </li>
                 
                   <li>
                     <strong className="font-bold text-text-primary">United States:</strong>{" "}
                     the EU-US, UK Extension and Swiss-US Data Privacy Framework where the recipient is certified, and otherwise the SCCs.
                   </li>
                 </ul>
                 <p >
                      We assess the law and practice of the destination country, add technical and
                      organisational measures such as encryption and access controls where needed,
                      and suspend a transfer if we cannot protect the data. You can request a copy
                      of the relevant clauses by writing to{" "}
                     <a
                         href="mailto:dpo@tarajglobal.com"
                         className="text-[#00A6FF] hover:underline"
                       >
                         dpo@tarajglobal.com
                       </a>
                      ; we may redact commercial terms.
                    </p><br />
                    <p>For personal data processed under India’s DPDP Act, we will transfer data abroad only as the Act and any restrictions notified by the Government of India allow.</p>
              </section>

              {/* 13. Your Rights and How to Use Them */}
              <section id="your-rights" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                  <span>13.Your rights and how to use them</span>
                </h2>
                <p>
                 Which rights you have depends on where you live. We give the rights below to everyone we can reasonably identify, wherever they are, and we do not discriminate against you for using them.
                </p>

                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[35%] min-w-[180px] border-r border-border">
                          Region
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
                          Your rights
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          EEA, UK and Switzerland
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Access and a copy of your data; correction; erasure; restriction; portability; object to processing based on legitimate interests; object to direct marketing at any time (absolute right); withdraw consent at any time; not be subject to solely automated decisions with significant effects; complain to your supervisory authority
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          California and other US states with privacy laws
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Know and access the personal information we hold, its sources and recipients; delete; correct; opt out of sale and sharing; limit use of sensitive personal information (we do not use it); portability; non-discrimination; appeal a refusal where state law gives that right
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          India
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Under the DPDP Act from May 2027, and now where practical: access a summary of your data and the parties it is shared with; correction and erasure; grievance redressal; nominate another person to exercise your rights
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Elsewhere
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          The rights your local law gives you
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-4 text-[#00A6FF]">How to make a request</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                     <li>
                        <strong className="font-bold text-text-primary">Email:</strong>{" "}
                        <a
                          href="mailto:privacy@tarajglobal.com"
                          className="text-[#00A6FF] hover:underline"
                        >
                          privacy@tarajglobal.com
                        </a>
                      </li>
                    
                      {/* <li>
                        <strong className="font-bold text-text-primary">Web form:</strong>{" "}
                        <a
                          href="https://tarajglobal.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00A6FF] hover:underline"
                        >
                          https://tarajglobal.com/
                        </a>
                      </li> */}
                    
                      <li>
                        <strong className="font-bold text-text-primary">Phone:</strong>{" "}
                        <a href="tel:+919665599442" className="text-[#00A6FF] hover:underline">
                        IN - +91 96655-99442
                        </a>
                        {", "}
                        <a href="tel:+13464878307" className="text-[#00A6FF] hover:underline">
                          / US - +1 346-487-8307
                        </a>
                      </li>
                    
                      <li>
                        <strong className="font-bold text-text-primary">Opt out of marketing:</strong>{" "}
                        use the unsubscribe link in any email.
                      </li>
                    </ul>
                <p className="mb-4 text-[#00A6FF]">What happens next</p>
                <ul className="list-disc pl-6 space-y-3 marker:text-white">
                   <li>
                     <strong className="font-bold text-text-primary">Verification.</strong>{" "}
                     We ask only for what we need to confirm you are who you say you are, usually a response from your work email address.
                   </li>

                <li>
                  <strong className="font-bold text-text-primary">Timing.</strong>{" "}
                  We confirm receipt within 10 business days and respond within one month (45 days for US state-law requests). If the request is complex we may extend the period as the law allows, and we will tell you why.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Cost.</strong>{" "}
                  There is no charge, unless a request is clearly unfounded or excessive.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Authorised agents.</strong>{" "}
                  You may use an agent, and we may ask for proof of their authority.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Client campaigns.</strong>{" "}
                  Where we are a processor for a client, we will pass your request to the client and help it respond.
                </li>
              
                <li>
                  <strong className="font-bold text-text-primary">Appeals.</strong>{" "}
                  If we refuse a request, we will explain why. You may appeal by replying to our decision, and we will answer within the time your state’s law requires.
                </li>
              </ul>
                  <p className="mb-4 text-[#00A6FF]">Complaints</p>
                  <p>Please contact us first so we can try to resolve your concern. You may also complain to your data protection authority, such as the Information Commissioner’s Office (UK), your EU national authority, or the California Privacy Protection Agency or state attorney general in the US. In India, you may take a complaint to our Grievance Officer (Section 15), and to the Data Protection Board of India once the relevant provisions apply.</p>
              </section>

              {/* 14. Additional Notice for California, Germany and the Gulf Region */}
              <section id="california-notice" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>14. Additional notices for California, Germany and the Gulf region</span>
                </h2>
                <p className="mb-4">These notices add to the rest of this policy. If they differ from it, the notice for your location applies to you.</p>
                <p className="mb-4">
                  California law requires us to describe the personal information we collected in the last 12 months. Business contact information of California residents is covered like any other personal information.
                </p>

                <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[18%] min-w-[140px] border-r border-border">
                          Category
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[24%] min-w-[180px] border-r border-border">
                          Examples
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[20%] min-w-[150px] border-r border-border">
                          Source
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[18%] min-w-[140px] border-r border-border">
                          Disclosed to
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[160px]">
                          Sold or shared
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Identifiers
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Name, business email, business phone, IP address
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          You, public sources, data partners, clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers; clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Yes (lead delivery)
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Professional or employment information
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Job title, employer, department, seniority, work location
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          You, public sources, data partners, clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers; clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Yes (lead delivery)
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Internet or network activity
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Pages viewed, clicks, email and webinar engagement
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Your devices; our systems
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers; clients (for campaign engagement)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Yes for campaign engagement shared with clients; no for website analytics [confirm]
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Approximate geolocation
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Region derived from IP address
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Your devices
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          No
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Audio information
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Call recordings
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          You, on calls
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          No
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/[0.03] transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
                          Inferences
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Lead score, fit with a client’s target profile
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Derived by us
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
                          Service providers; clients
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
                          Yes (lead delivery)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                                     <p>
                       <strong className="font-bold text-text-primary">Sensitive personal information.</strong>{" "}
                       We do not collect it.
                     </p>
                     
                     <p >
                       <strong className="font-bold text-text-primary">Business purposes.</strong>{" "}
                       We use and disclose this information for the purposes in Sections 5 and 8.
                       We retain it for the periods in Section 11.
                     </p>
                     
                     <p>
                       <strong className="font-bold text-text-primary">Sale and sharing.</strong>{" "}
                       We treat lead delivery to clients as a sale or sharing. You can opt out as
                       described in Section 8. We honour opt-out preference signals, and we do not
                       charge you or reduce service quality for using your rights.
                     </p><br />
                     
                    <p className="mb-4 text-[#00A6FF]">California residents: your rights under the CCPA</p>
                    <p>California law gives you these rights over your personal information, including your business contact details:</p>
                     
                     <ul className="list-disc pl-6 space-y-2 marker:text-white">
  <li>
    <strong className="font-bold text-text-primary">Know and access.</strong>{" "}
    Ask what personal information we collected about you, where it came from,
    why we use it and who received it, and ask for a copy of the specific
    information we hold. You can ask about periods longer than the last 12
    months if we still hold the data.
  </li>

  <li>
    <strong className="font-bold text-text-primary">Delete.</strong>{" "}
    Ask us to delete personal information we collected from you, subject to
    legal exceptions.
  </li>

  <li>
    <strong className="font-bold text-text-primary">Correct.</strong>{" "}
    Ask us to correct inaccurate information.
  </li>

  <li>
    <strong className="font-bold text-text-primary">
      Opt out of sale and sharing.
    </strong>{" "}
    Tell us to stop selling or sharing your personal information. We do not
    knowingly sell or share the personal information of anyone under 16.
  </li>

  <li>
    <strong className="font-bold text-text-primary">
      Limit sensitive information.
    </strong>{" "}
    We do not collect sensitive personal information, so there is nothing to
    limit.
  </li>

  <li>
    <strong className="font-bold text-text-primary">No retaliation.</strong>{" "}
    We will not refuse service, charge different prices or give lower quality
    because you used your rights.
  </li>
</ul>
<p>
  <strong className="font-bold text-text-primary">How to make a request.</strong>{" "}
  Email{" "}
  <a
    href="mailto:privacy@tarajglobal.com"
    className="text-[#00A6FF] hover:underline"
  >
    privacy@tarajglobal.com
  </a>
  , or call IN{" "}
  <a
    href="tel:+919665599442"
    className="text-[#00A6FF] hover:underline"
  >
    +91 96655-99442
  </a>{" "}
  or US{" "}
  <a
    href="tel:+13464878307"
    className="text-[#00A6FF] hover:underline"
  >
    +1 346-487-8307
  </a>.
</p>

<>
  <p>
    <strong className="font-bold text-text-primary">Opt-out link.</strong>{" "}
    Use the{" "}
    <a
      href="mailto:privacy@tarajglobal.com?subject=Do%20Not%20Sell%20or%20Share%20My%20Personal%20Information"
      className="text-[#00A6FF] hover:underline"
    >
      “Do Not Sell or Share My Personal Information”
    </a>{" "}
    link in our website footer.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Verification and agents.</strong>{" "}
    We ask only for what we need to confirm it is you, such as your name,
    business email and employer. You may use an authorised agent. We will ask
    for your written permission and may check your identity with you directly.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Timing.</strong>{" "}
    We confirm your request within 10 business days and respond within 45 days.
    If we need up to 45 more days, we will tell you why.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Shine the Light.</strong>{" "}
    Once a year, you can ask which categories of personal information we shared
    with third parties for their direct marketing. Email us at{" "}
    <a
      href="mailto:privacy@tarajglobal.com"
      className="text-[#00A6FF] hover:underline"
    >
      privacy@tarajglobal.com
    </a>.
  </p>
</>
<br />

<p className="mb-4 text-[#00A6FF]">California Delete Act and DROP standards</p>
<p>California’s Delete Act lets California residents ask registered data brokers to delete their personal information with one request through the Delete Request and Opt-out Platform (DROP), run by the California Privacy Protection Agency. We are not currently registered as a data broker in California. We still handle California residents’ deletion and opt-out requests to the same standard. When a California resident asks us to delete their information or opt out of sale or sharing, we:</p>

<ul className="list-disc pl-6 marker:text-white">
  <li>
    <p>  
        Process the request within 45 days. 
    </p>
  </li>
  <li>
    <p>
        Delete matching personal information, subject to exceptions the law allows.
    </p>
  </li>
  <li>
    <p>
        Treat a request we cannot verify as an opt-out of sale and sharing.
    </p>
  </li>
  <li>
    <p>
        Tell our service providers and contractors to delete it too.
    </p>
  </li>
  <li>
    <p>
        Keep a suppression record so your details are not added back to our database or lead lists.
    </p>
  </li>
  <li>
    <p>
        Do not sell or share new information about you after a deletion unless you ask us to or the law allows it.
    </p>
  </li>
</ul>
<p>You can contact us directly at any time, including if you have already used DROP. Using DROP or contacting us does not limit your other rights under the CCPA.</p>
<br />
<p className="mb-4 text-[#00A6FF]">Germany: GDPR, BDSG and UWG</p>

<>
  <p>
    <strong className="font-bold text-text-primary">Laws that apply.</strong>{" "}
    For people in Germany, we follow the GDPR, the Federal Data Protection Act
    (BDSG), Section 7 of the Act Against Unfair Competition (UWG) for advertising,
    and Section 25 of the TDDDG for cookies and similar technologies.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Email marketing needs prior consent.</strong>{" "}
    A business email address does not remove the need for consent under the UWG.
    We send marketing email to people in Germany only after they give prior
    express consent, for example by ticking an unticked box. We confirm sign-ups
    with a confirmation email (double opt-in) and keep a record of when, how and
    to what you agreed.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Existing customers.</strong>{" "}
    We email existing customers about similar services without fresh consent
    only where Section 7(3) UWG allows it. That means we obtained the address
    in connection with a sale, told them at the time and in every message that
    they can object, and they have not objected.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Phone calls.</strong>{" "}
    We call business contacts in Germany only where there is at least presumed
    consent based on their business interests, and we stop as soon as you ask.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Clients.</strong>{" "}
    We pass a German contact to a client for email follow-up only if their
    consent covers that client.
  </p>

  <p>
    <strong className="font-bold text-text-primary">Cookies.</strong>{" "}
    We set non-essential cookies only after you consent (Section 9).
  </p>

  <p>
    <strong className="font-bold text-text-primary">Rights and complaints.</strong>{" "}
    Your GDPR rights in Section 13 apply, including the right to object to
    direct marketing at any time. You may complain to the data protection
    authority of your German federal state or to the Federal Commissioner
    (BfDI). Our EU representative is listed in Section 17. You can also contact
    our Data Protection Officer at{" "}
    <a
      href="mailto:dpo@tarajglobal.com"
      className="text-[#00A6FF] hover:underline"
    >
      dpo@tarajglobal.com
    </a>.
  </p>
</> <br />
<p className="mb-4 text-[#00A6FF]">Gulf region: UAE, Saudi Arabia, Qatar, Bahrain, Oman and Kuwait</p>

<p>We are based in Pune, India and do not operate a branch in the Gulf. When we process business contact details of people in these countries, we follow local data protection law where it applies to us. Across the whole region we use the same consent-first approach.
</p>

{/* Gulf Region Data Protection Table */}
<div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
  <table className="w-full text-left border-collapse text-xs sm:text-sm">
    <thead>
      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[22%] min-w-[150px] border-r border-border">
          Country or zone
        </th>
        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[38%] min-w-[240px] border-r border-border">
          Main law
        </th>
        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[260px]">
          What it means for you
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      {/* UAE (mainland) */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          UAE (mainland)
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          Federal Decree-Law No. 45 of 2021 (PDPL)
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          We use a lawful basis (usually consent for marketing), limit use to stated purposes, secure the data and honour your rights.
        </td>
      </tr>

      {/* UAE free zones */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          UAE free zones
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          DIFC Data Protection Law No. 5 of 2020; ADGM Data Protection Regulations 2021
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          If you are in DIFC or ADGM, we honour objections to direct marketing and your other rights under that regime.
        </td>
      </tr>

      {/* Saudi Arabia */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          Saudi Arabia
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          Personal Data Protection Law, its Implementing Regulations, and the Regulations on Transfer of Personal Data outside the Kingdom
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          We market to you only with your consent, honour withdrawal, and transfer data abroad only as the transfer rules allow.
        </td>
      </tr>

      {/* Qatar */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          Qatar
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          Law No. 13 of 2016 (Personal Data Privacy Protection)
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          We send electronic marketing only with your prior consent and include an opt-out in every message.
        </td>
      </tr>

      {/* Bahrain */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          Bahrain
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          Law No. 30 of 2018 (Personal Data Protection Law)
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          We market only with consent and honour access, correction and objection requests.
        </td>
      </tr>

      {/* Oman */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          Oman
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          Personal Data Protection Law (Royal Decree 6/2022) and its Executive Regulations
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          We rely on consent, honour your rights and follow the transfer controls.
        </td>
      </tr>

      {/* Kuwait */}
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-primary align-top border-r border-border leading-relaxed">
          Kuwait
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top border-r border-border leading-relaxed">
          CITRA Data Privacy Protection Regulation (Decision No. 26 of 2024)
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          There is no general data protection law. The regulation covers licensed service providers, but we apply the same consent-first practice.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<ul className="list-disc pl-6 marker:text-white">
  <li>
    <p>
      <strong className="font-bold text-text-primary">Marketing.</strong>{" "}
      We contact people in these countries for marketing only after they opt in,
      include an opt-out in every message and keep a suppression record.
    </p>
  </li>

  <li>
    <p>
      <strong className="font-bold text-text-primary">Your rights.</strong>{" "}
      You can ask us to give you access to, correct or delete your data,
      withdraw consent, or stop marketing. Email{" "}
      <a
        href="mailto:privacy@tarajglobal.com"
        className="text-[#00A6FF] hover:underline"
      >
        privacy@tarajglobal.com
      </a>{" "}
      and see Section 13 for timing.
    </p>
  </li>

  <li>
    <p>
      <strong className="font-bold text-text-primary">Transfers.</strong>{" "}
      We transfer data to India and other countries under the safeguards in
      Section 12 and, where local law requires, any approval or notification.
    </p>
  </li>

  <li>
    <p>
      <strong className="font-bold text-text-primary">Complaints.</strong>{" "}
      Contact us first. You may also complain to your local authority, such as
      the UAE Data Office, the DIFC or ADGM Commissioner, SDAIA (Saudi Arabia),
      Qatar’s Ministry of Transport and Communications, Bahrain’s Personal
      Data Protection Authority, or Oman’s Ministry of Transport,
      Communications and Information Technology.
    </p>
  </li>
</ul>








              </section>

              {/* 15. India: Applicable Law and Grievance Officer */}
              <section id="india-dpdp" className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>15. India: applicable law and Grievance Officer</span>
                </h2>
                <p >
  <strong className="font-bold text-text-primary">Current law.</strong>{" "}
  We handle personal data in line with the Information Technology Act, 2000 and
  the Information Technology (Reasonable Security Practices and Procedures and
  Sensitive Personal Data or Information) Rules, 2011. We do not intentionally
  collect sensitive personal data or information from Business Contacts.
</p>

<p >
  <strong className="font-bold text-text-primary">DPDP Act.</strong>{" "}
  The Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025 are
  being phased in, and the core duties for data fiduciaries take effect from
  May 2027. By then we will give a clear notice at or before collection, rely
  on valid consent or a permitted legitimate use for each purpose, honour
  correction, erasure and grievance requests, apply retention limits, protect
  children’s data and report breaches to the Data Protection Board of India
  and affected individuals.
</p>

<p >
  <strong className="font-bold text-text-primary">Grievance Officer.</strong>{" "}
  If you have a concern about how we handle your personal data, contact our
  Grievance Officer:
</p>

<div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
  <table className="w-full text-left border-collapse text-xs sm:text-sm">
    <thead>
      <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[30%] min-w-[140px] border-r border-border">
          Detail
        </th>
        <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
          Information
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Name
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          Tushar Phalak
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Designation
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          Director of Growth and marketing
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Email
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          <a href="mailto:tushar@tarajglobal.com" className="text-primary hover:underline font-medium">
            tushar@tarajglobal.com
          </a>
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Address
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014, India
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.03] transition-colors">
        <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Hours
        </td>
        <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
          Mon–Fri, 10:00–18:00 EST
        </td>
      </tr>
    </tbody>
  </table>
</div>


<p>We acknowledge grievances within [two business days] and resolve them within one month of receipt.</p>
               

             
              </section>
                  {/* 16. Children, Third-Party Links and Changes to This Policy */}
<section
  id="children-changes"
  className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28"
>
  <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
    <Info className="w-5 h-5 text-primary shrink-0" />
    <span>16. Children, third-party links and changes to this policy
</span>
  </h2>

  <p>
  <strong className="font-bold text-text-primary">Children.</strong>{" "}
  Our services and website are for adult business professionals only. We do not
  knowingly collect personal data from anyone under 18, and where a country
  sets a different minimum age, we apply it. If we learn that we hold a child’s
  data, we will delete it promptly.
</p>

<p>
  <strong className="font-bold text-text-primary">Third-party links.</strong>{" "}
  Our website and messages may link to other sites, such as client pages and
  professional networks. Their privacy practices are their own, and this policy
  does not cover them.
</p>

<p>
  <strong className="font-bold text-text-primary">Changes.</strong>{" "}
  We may update this policy as our practices or the law change. We will post
  the new version on this page with a new “Last updated” date. For material
  changes we will also notify you in a way the law requires, such as by email
  to existing subscribers, before they take effect. Earlier versions are
  available on request.
</p>
</section>

{/* 17. Contact Us */}
<section
  id="contact-us"
  className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28"
>
  <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 flex items-center gap-2.5">
    <FileText className="w-5 h-5 text-primary shrink-0" />
    <span>17. Contact us
</span>
  </h2>

 
  <div className="overflow-x-auto w-full my-6 rounded-xl border border-border bg-surface-alt/40 dark:bg-white/[0.02]">
    <table className="w-full text-left border-collapse text-xs sm:text-sm">
      <thead>
        <tr className="border-b border-border bg-surface-elevated/70 dark:bg-white/[0.04]">
          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs w-[35%] min-w-[180px] border-r border-border">
            Role
          </th>
          <th className="py-3 px-4 sm:px-6 font-bold text-text-primary uppercase tracking-wider text-xs min-w-[280px]">
            Contact
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            Company
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            Taraj Global Solutions Private Limited, registered office
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            Operating address
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014, India
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            Privacy team (all rights requests)
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            <a
              href="mailto:privacy@tarajglobal.com"
              className="text-primary hover:underline font-medium"
            >
              privacy@tarajglobal.com
            </a>
            {" · "}
            <a href="tel:+919665599442" className="hover:text-primary transition-colors">+91-96655-99442</a>
            {" / "}
            <a href="tel:+13464878307" className="hover:text-primary transition-colors">+1 346-487-8307</a>
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            Data Protection Email
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            <a
            href="mailto:dpo@tarajglobal.com"
            className="text-primary hover:underline font-medium"
          >
            dpo@tarajglobal.com
          </a>
          </td>
        </tr>

           <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
          Legal notices
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            <a
              href="mailto:legal@tarajglobal.com"
              className="text-primary hover:underline font-medium"
            >
              legal@tarajglobal.com
            </a>
          </td>
        </tr>

        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            Grievance Officer (India)
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            See Section 15
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            EU representative email
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            <a
               href="mailto:dpo@tarajglobal.com"
               className="text-primary hover:underline font-medium"
             >
               dpo@tarajglobal.com
             </a>
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            UK representative
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
           <a
              href="mailto:dpo@tarajglobal.com"
              className="text-primary hover:underline font-medium"
            >
              dpo@tarajglobal.com
            </a>
          </td>
        </tr>
        <tr className="hover:bg-primary/[0.03] transition-colors">
          <td className="py-3.5 px-4 sm:px-6 font-medium text-text-primary align-top border-r border-border leading-relaxed">
            General enquiries
          </td>
          <td className="py-3.5 px-4 sm:px-6 text-text-secondary align-top leading-relaxed">
            <a href="mailto:info@tarajglobal.com" className="text-primary hover:underline font-medium">info@tarajglobal.com</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
<p>
  Our general service terms are in our{" "}
  (<a
    href="https://tarajglobal.com/terms"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary hover:underline font-semibold"
  >
    Terms of Service
  </a>)
</p>
</section>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Privacy
