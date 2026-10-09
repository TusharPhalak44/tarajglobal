import React, { useState, useEffect } from 'react'
import {
  Scale,
  Shield,
  FileText,
  Clock,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ExternalLink,
  BookOpen,
  Users,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Eye
} from 'lucide-react'
import Container from '@components/layout/Container'
import SEO from '@components/common/SEO'
import { Link } from 'react-router-dom'

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service | Taraj Global",
  "url": "https://tarajglobal.com/terms",
  "description": "Comprehensive Terms of Service and legal agreements governing the use of Taraj Global's website, lead generation, and B2B marketing services.",
  "publisher": {
    "@type": "Organization",
    "name": "Taraj Global",
    "url": "https://tarajglobal.com",
    "logo": "https://tarajglobal.com/OnlyTG-%203.png"
  }
}

const TOC_SECTIONS = [
  { id: 'about-our-website', label: '1. About Our Website' },
  { id: 'eligibility', label: '2. Eligibility' },
  { id: 'acceptable-use', label: '3. Acceptable Use' },
  { id: 'intellectual-property', label: '4. Intellectual Property' },
  { id: 'third-party-content', label: '5. Third-Party Content' },
  { id: 'user-submitted-information', label: '6. User-Submitted Information' },
  { id: 'lead-generation-inquiries', label: '7. Lead Generation and Business Inquiries' },
  { id: 'downloadable-resources', label: '8. Downloadable Resources' },
  { id: 'webinars-events', label: '9. Webinars and Events' },
  { id: 'newsletters-marketing', label: '10. Newsletters and Marketing Communications' },
  { id: 'accuracy-of-information', label: '11. Accuracy of Information' },
  { id: 'no-professional-advice', label: '12. No Professional Advice' },
  { id: 'third-party-services-links', label: '13. Third-Party Services and Links' },
  { id: 'website-availability', label: '14. Website Availability' },
  { id: 'disclaimer-warranties', label: '15. Disclaimer of Warranties' },
  { id: 'limitation-of-liability', label: '16. Limitation of Liability' },
  { id: 'indemnification', label: '17. Indemnification' },
  { id: 'privacy', label: '18. Privacy' },
  { id: 'cookies', label: '19. Cookies' },
  { id: 'changes-to-terms', label: '20. Changes to These Terms' },
  { id: 'governing-law', label: '21. Governing Law' },
  { id: 'severability', label: '22. Severability' },
  { id: 'entire-agreement', label: '23. Entire Agreement' },
  { id: 'contact-us', label: '24. Contact Us' },
]

function Terms() {
  const [activeSection, setActiveSection] = useState('about-our-website')
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
        title="Terms of Service | Service Agreement | Taraj Global"
        description="Read the complete Terms of Service governing the use of Taraj Global's website, B2B demand generation, lead qualification, and digital solutions."
        keywords="Taraj Global terms, terms and conditions, terms of service, B2B marketing service agreement, lead generation terms"
        canonical="/terms"
        ogTitle="Terms of Service | Taraj Global"
        ogDescription="Read the comprehensive Terms of Service and legal agreement for Taraj Global."
        schemaJson={termsSchema}
      />

      <div className="min-h-screen bg-background pt-8 sm:pt-10 pb-20 select-text">
        <Container>
          {/* ══ Header / Hero Area ══════════════════════════════════════════ */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/30 dark:bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wide mb-4">
              <Scale className="w-3.5 h-3.5 text-primary" />
              <span>Legal Service Agreement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight mb-4">
              Terms of Service
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-text-secondary font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cta" />
                <strong>Effective Date:</strong> [Effective Date]
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span>
                <strong>Last Updated:</strong> [Last Updated]
              </span>
            </div>
          </div>

          {/* ══ Main Content Grid (Sidebar TOC + Main Content) ════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* ── Desktop Sticky Table of Contents (Span 4) ───────────────── */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-surface/90 backdrop-blur-md rounded-2xl border border-border p-5 sm:p-6 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border text-text-primary font-bold text-sm tracking-wide font-mono">
                <FileText className="w-4 h-4 text-primary" />
                <span>Table of Contents</span>
              </div>
              <nav aria-label="Terms of Service Table of Contents">
                <ul className="space-y-1 text-xs">
                  {TOC_SECTIONS.map((section) => {
                    const isActive = activeSection === section.id
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors duration-150 cursor-pointer ${isActive
                              ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary pl-2'
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
                <div className="p-3.5 rounded-xl bg-primary/25 dark:bg-primary/5 border border-primary/15 text-xs text-text-secondary">
                  <div className="font-semibold text-text-primary mb-1 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-primary" />
                    <span>Legal Inquiries</span>
                  </div>
                  <p className="text-[11px] leading-relaxed mb-2.5">
                    Questions regarding these terms or commercial service contracts?
                  </p>
                  <a
                    href="mailto:info@tarajglobal.com"
                    className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline text-xs"
                  >
                    <span>Contact Legal Team</span>
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
                  <span>Quick Navigation (24 Sections)</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileTocOpen && (
                <ul className="mt-3 pt-3 border-t border-border space-y-1 text-xs max-h-72 overflow-y-auto">
                  {TOC_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left py-1.5 px-2 rounded transition-colors ${activeSection === section.id
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-text-secondary hover:text-primary hover:bg-surface-elevated'
                          }`}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Main Terms Content Body (Span 8) ─────────────────────────── */}
            <div className="lg:col-span-8 space-y-6 text-text-secondary leading-relaxed text-sm sm:text-base">

              {/* 1. About Our Website */}
              <section
                id="about-our-website"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    1. About Our Website
                  </h2>
                </div>
                <p className="mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated by <strong>[Company Name]</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), located at <strong>[Website URL]</strong> (the &quot;Website&quot;), including all content, resources, functionality, and services offered on or through the Website.
                </p>
                <p>
                  Please read these Terms carefully before using the Website. By accessing, browsing, or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Website.
                </p>
              </section>

              {/* 2. Eligibility */}
              <section
                id="eligibility"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    2. Eligibility
                  </h2>
                </div>
                <p className="mb-4">
                  The Website is intended solely for business professionals, enterprise entities, and individuals who are at least 18 years of age or the age of majority in their jurisdiction. By using this Website, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base marker:text-primary">
                  <li>You are at least 18 years of age.</li>
                  <li>You possess the legal capacity to enter into these binding Terms.</li>
                  <li>If you are accessing the Website on behalf of a company, organization, or other legal entity, you have the full power and authority to bind that entity to these Terms.</li>
                </ul>
              </section>

              {/* 3. Acceptable Use */}
              <section
                id="acceptable-use"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    3. Acceptable Use
                  </h2>
                </div>
                <p className="mb-4">
                  You agree to use the Website only for lawful business purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc pl-5 space-y-2.5 text-sm sm:text-base marker:text-primary">
                  <li>Use the Website in any manner that violates applicable federal, state, local, or international laws or regulations.</li>
                  <li>Transmit, distribute, or upload any computer viruses, worms, Trojan horses, or other malicious, destructive, or technologically harmful material.</li>
                  <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is hosted, or any server, computer, or database connected to the Website.</li>
                  <li>Use automated systems, robots, spiders, scrapers, or data-mining tools to extract content or data from the Website without our prior express written permission.</li>
                  <li>Engage in any conduct that restricts, inhibits, or impairs anyone&apos;s use or enjoyment of the Website, or which may expose the Company or its users to harm or liability.</li>
                  <li>Impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                </ul>
              </section>

              {/* 4. Intellectual Property */}
              <section
                id="intellectual-property"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    4. Intellectual Property
                  </h2>
                </div>
                <p className="mb-4">
                  The Website and its entire contents, features, and functionality (including but not limited to all information, software, code, text, displays, images, illustrations, video, audio, logos, trademarks, and design elements) are owned by the Company, its licensors, or other providers of such material and are protected by copyright, trademark, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p className="mb-4">
                  You are granted a limited, revocable, non-exclusive, non-transferable license to access and view the Website solely for internal business evaluation purposes. You must not:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base marker:text-primary">
                  <li>Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Website without prior written authorization.</li>
                  <li>Remove or alter any copyright, trademark, or other proprietary rights notices contained in the materials.</li>
                </ul>
              </section>

              {/* 5. Third-Party Content */}
              <section
                id="third-party-content"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    5. Third-Party Content
                  </h2>
                </div>
                <p>
                  The Website may display, include, or make available content, data, statistics, articles, case studies, or opinions supplied by third parties. All statements, opinions, and materials expressed by third parties are solely the opinions and responsibility of the person or entity authoring them and do not necessarily reflect the position of the Company. We do not warrant the accuracy, completeness, or usefulness of third-party content.
                </p>
              </section>

              {/* 6. User-Submitted Information */}
              <section
                id="user-submitted-information"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    6. User-Submitted Information
                  </h2>
                </div>
                <p className="mb-4">
                  Any information, suggestions, feedback, materials, or communications you transmit or submit to the Website (excluding personal data processed in accordance with our Privacy Policy) will be considered non-confidential and non-proprietary.
                </p>
                <p>
                  By submitting information to the Website, you grant the Company a perpetual, worldwide, irrevocable, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such feedback or suggestions for any commercial or non-commercial purpose without compensation or attribution to you.
                </p>
              </section>

              {/* 7. Lead Generation and Business Inquiries */}
              <section
                id="lead-generation-inquiries"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    7. Lead Generation and Business Inquiries
                  </h2>
                </div>
                <p className="mb-4">
                  When you submit inquiries, book strategy meetings, or request consultation regarding our B2B lead generation, demand generation, or marketing services through the Website, you represent that all information provided is accurate, current, and complete.
                </p>
                <p>
                  Submission of an inquiry or strategy call request does not constitute a binding commercial agreement or guarantee of business engagement until a formal master services agreement (MSA) or statement of work (SOW) is mutually executed by authorized representatives of both parties.
                </p>
              </section>

              {/* 8. Downloadable Resources */}
              <section
                id="downloadable-resources"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    8. Downloadable Resources
                  </h2>
                </div>
                <p className="mb-4">
                  We may offer downloadable materials, whitepapers, e-books, research reports, templates, or guides through the Website. All downloadable resources are provided under a limited, non-transferable license for your internal business reference only.
                </p>
                <p>
                  You may not resell, redistribute, sub-license, repackage, or publicly republish any downloadable resources without express written consent from the Company.
                </p>
              </section>

              {/* 9. Webinars and Events */}
              <section
                id="webinars-events"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    9. Webinars and Events
                  </h2>
                </div>
                <p className="mb-4">
                  From time to time, the Company may host or co-host online webinars, virtual summits, or industry events. Registration for webinars is subject to availability and our acceptance.
                </p>
                <p>
                  We reserve the right to modify schedules, cancel events, substitute speakers, or revoke registrations at our discretion. Event recordings and presentation materials remain the intellectual property of the Company or designated co-hosts.
                </p>
              </section>

              {/* 10. Newsletters and Marketing Communications */}
              <section
                id="newsletters-marketing"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    10. Newsletters and Marketing Communications
                  </h2>
                </div>
                <p className="mb-4">
                  By subscribing to our newsletter or providing your business email address on our Website, you consent to receive periodic marketing emails, industry insights, and updates from the Company.
                </p>
                <p>
                  You may opt out of receiving promotional emails at any time by clicking the &quot;Unsubscribe&quot; link included at the bottom of each email communication or by emailing us directly at <a href="mailto:info@tarajglobal.com" className="text-primary hover:underline font-medium">info@tarajglobal.com</a>.
                </p>
              </section>

              {/* 11. Accuracy of Information */}
              <section
                id="accuracy-of-information"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    11. Accuracy of Information
                  </h2>
                </div>
                <p>
                  While we strive to ensure that all information on the Website is accurate and up-to-date, the materials and descriptions may occasionally contain typographical errors, inaccuracies, or outdated information. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice.
                </p>
              </section>

              {/* 12. No Professional Advice */}
              <section
                id="no-professional-advice"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center shrink-0 text-cta">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    12. No Professional Advice
                  </h2>
                </div>
                <p>
                  The content, metrics, case studies, and insights provided on the Website are for general informational and marketing purposes only and should not be construed as legal, financial, tax, or investment advice. You should consult qualified professional advisors before making strategic or financial decisions based on website content.
                </p>
              </section>

              {/* 13. Third-Party Services and Links */}
              <section
                id="third-party-services-links"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    13. Third-Party Services and Links
                  </h2>
                </div>
                <p className="mb-4">
                  The Website may contain links to external third-party websites, applications, or services that are not owned or controlled by the Company. We have no control over, and assume no responsibility for, the content, privacy policies, terms, or practices of any third-party websites.
                </p>
                <p>
                  Inclusion of any third-party link does not imply endorsement or affiliation by the Company. You access external websites entirely at your own risk.
                </p>
              </section>

              {/* 14. Website Availability */}
              <section
                id="website-availability"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    14. Website Availability
                  </h2>
                </div>
                <p>
                  We strive to maintain continuous website availability; however, we do not guarantee uninterrupted, secure, or error-free access to the Website. We may suspend, withdraw, or restrict the availability of all or any part of the Website for business, technical, security, or operational reasons without prior notice.
                </p>
              </section>

              {/* 15. Disclaimer of Warranties */}
              <section
                id="disclaimer-warranties"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center shrink-0 text-cta">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    15. Disclaimer of Warranties
                  </h2>
                </div>
                <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border/80 mb-4">
                  <p className="text-xs sm:text-sm font-semibold tracking-wide text-text-primary">
                    The Website and all content, materials, and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, either express or implied.
                  </p>
                </div>
                <p>
                  To the fullest extent permissible under applicable law, the Company disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, and freedom from computer viruses or malware.
                </p>
              </section>

              {/* 16. Limitation of Liability */}
              <section
                id="limitation-of-liability"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    16. Limitation of Liability
                  </h2>
                </div>
                <p className="mb-4">
                  To the maximum extent permitted by applicable law, in no event shall the Company, its affiliates, directors, officers, employees, agents, suppliers, or licensors be liable for any indirect, incidental, special, exemplary, or consequential damages (including damages for loss of profits, revenue, data, goodwill, or business interruption) arising out of or in connection with your access to or inability to access or use the Website.
                </p>
                <div className="p-4 rounded-xl bg-surface-elevated/70 border border-border/80">
                  <p className="text-text-primary font-medium text-xs sm:text-sm">
                    Our total aggregate liability for all claims arising out of or relating to these Terms or the Website shall be limited to one hundred United States dollars ($100.00 USD) or the equivalent local currency amount.
                  </p>
                </div>
              </section>

              {/* 17. Indemnification */}
              <section
                id="indemnification"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    17. Indemnification
                  </h2>
                </div>
                <p>
                  You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, and successors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms, your misuse of the Website, or your infringement of any intellectual property or other rights of any third party.
                </p>
              </section>

              {/* 18. Privacy */}
              <section
                id="privacy"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    18. Privacy
                  </h2>
                </div>
                <p>
                  Your privacy is important to us. All personal data collected through the Website or in connection with our services is processed in accordance with our <Link to="/privacy" className="text-accent font-bold hover:underline">Privacy Policy</Link>. Please review our <Link to="/privacy" className="text-accent font-bold hover:underline">Privacy Policy</Link> to understand our data collection, usage, security, and disclosure practices.
                </p>
              </section>

              {/* 19. Cookies */}
              <section
                id="cookies"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    19. Cookies
                  </h2>
                </div>
                <p>
                  Our Website utilizes cookies and tracking technologies to enhance user experience, remember preferences, and analyze website traffic. For comprehensive information regarding our cookie usage and instructions on how to manage your consent preferences, please consult our <Link to="/cookies" className="text-accent font-bold hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              {/* 20. Changes to These Terms */}
              <section
                id="changes-to-terms"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    20. Changes to These Terms
                  </h2>
                </div>
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify, update, or replace these Terms at any time. When updates occur, we will revise the &quot;Last Updated&quot; date at the top of this document.
                </p>
                <p>
                  Your continued access to or use of the Website following the posting of revised Terms constitutes your binding acceptance of the changes. If you do not agree to the amended Terms, you must discontinue your use of the Website.
                </p>
              </section>

              {/* 21. Governing Law */}
              <section
                id="governing-law"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    21. Governing Law
                  </h2>
                </div>
                <p className="mb-4">
                  These Terms and any dispute or claim arising out of or related to them, their subject matter, or their formation shall be governed by and construed in accordance with the internal laws of [Jurisdiction/State/Country], without giving effect to any choice or conflict of law provision or rule.
                </p>
                <p>
                  Any legal suit, action, or proceeding arising out of or related to these Terms or the Website shall be instituted exclusively in the competent courts located in [Jurisdiction]. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
                </p>
              </section>

              {/* 22. Severability */}
              <section
                id="severability"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    22. Severability
                  </h2>
                </div>
                <p>
                  If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent necessary such that the remaining provisions of the Terms will continue in full force and effect.
                </p>
              </section>

              {/* 23. Entire Agreement */}
              <section
                id="entire-agreement"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    23. Entire Agreement
                  </h2>
                </div>
                <p>
                  These Terms, together with our Privacy Policy and Cookie Policy, constitute the sole and entire agreement between you and the Company with respect to the Website and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Website.
                </p>
              </section>

              {/* 24. Contact Us */}
              <section
                id="contact-us"
                className="bg-surface rounded-2xl border border-border p-6 sm:p-8 scroll-mt-28 shadow-sm transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    24. Contact Us
                  </h2>
                </div>
                <p className="mb-6">
                  If you have any questions, feedback, or legal inquiries regarding these Terms of Service, please contact us:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start justify-between min-h-[110px]">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center text-cta mb-2">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-text-muted tracking-wide block">Email</span>
                    </div>
                    <a href="mailto:info@tarajglobal.com" className="text-xs sm:text-sm font-semibold text-text-primary hover:text-primary hover:underline break-all mt-1">
                      [Legal/Contact Email Address]
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start justify-between min-h-[110px]">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center text-cta mb-2">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-text-muted tracking-wide block">Direct Phone</span>
                    </div>
                    <a href="tel:+919665599442" className="text-xs sm:text-sm font-semibold text-text-primary hover:text-primary hover:underline mt-1">
                      +91-96655-99442
                    </a>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-elevated border border-border flex flex-col items-start justify-between min-h-[110px]">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-cta/30 dark:bg-cta/10 flex items-center justify-center text-cta mb-2">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-text-muted tracking-wide block">Headquarters</span>
                    </div>
                    <address className="text-xs text-text-secondary not-italic mt-1 leading-relaxed">
                      [Company Address]
                    </address>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm text-text-secondary">
                    Review our data protection framework in our <Link to="/privacy" className="text-accent font-semibold hover:underline">Privacy Policy</Link>.
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-black font-bold text-xs tracking-wider hover:bg-accent-light transition-colors shadow-sm shrink-0"
                  >
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Terms
