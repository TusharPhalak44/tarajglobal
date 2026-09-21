import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react'
import { StarButton } from '@components/ui/StarButton'
import { useTheme } from '@context/ThemeContext'

const SELECTOR_SERVICES = [
  {
    id: 'demand-generation',
    name: 'Demand Generation',
    link: '/demand-generation',
    shortDesc: 'Build long-term brand authority and capture in-market account demand through targeted omnichannel programs.',
    howItWorks: [
      { step: '01', title: 'TAM & ICP Blueprint', desc: 'Identify your total addressable market and build firmographic target matrices.' },
      { step: '02', title: 'Content & Intent Syndication', desc: 'Distribute authoritative assets to buyers exhibiting active purchasing triggers.' },
      { step: '03', title: 'Lead Scoring & Routing', desc: 'Real-time telemetry and qualification before direct routing to sales.' },
    ],
    whyItMatters: 'Creating sustainable pipeline requires educating buyers early in their journey so your company is the obvious choice when budget is allocated.',
    sla: '3.4x Average Pipeline Velocity',
  },
  {
    id: 'sql-services',
    name: 'Sales Qualified Leads (SQL)',
    link: '/sql-services',
    shortDesc: 'Connect with decision-makers who possess immediate requirements and validated buying intent for your solution.',
    howItWorks: [
      { step: '01', title: 'Decision-Maker Discovery', desc: 'Direct-dial identification across VP, C-Suite, and Director stakeholders.' },
      { step: '02', title: 'Need & Fit Interrogation', desc: 'Confirming tech stack gaps and strategic organizational priorities.' },
      { step: '03', title: 'Sales Handshake Protocol', desc: 'Detailed call dossier delivered directly to your AE prior to discovery.' },
    ],
    whyItMatters: 'SQLs maximize your sales reps’ time by ensuring they only speak with accounts with validated intent and confirmed purchasing authority.',
    sla: '100% Guaranteed Show-Up & Verification',
  },
  {
    id: 'bant-lead-generation',
    name: 'BANT Lead Generation',
    link: '/bant-lead-generation',
    shortDesc: 'Leads rigorously qualified across Budget, Authority, Need, and Timeline parameters for maximum conversion predictability.',
    howItWorks: [
      { step: '01', title: 'Custom BANT Framework', desc: 'Tailoring fiscal thresholds and authority tiers to your enterprise requirements.' },
      { step: '02', title: 'Multi-Touch Phone & Email Vetting', desc: 'Live conversational qualification with verified budget holders.' },
      { step: '03', title: 'Rigorous Quality Auditing', desc: 'Secondary internal review before lead distribution to your CRM.' },
    ],
    whyItMatters: 'Removes deal ambiguity and pipeline bloat by ensuring every qualified prospect has allocated spend and an active project window.',
    sla: 'Zero Ghosting & Transparent Criteria',
  },
  {
    id: 'mql-services',
    name: 'Marketing Qualified Leads (MQL)',
    link: '/mql-services',
    shortDesc: 'High-volume qualified prospects engaging with your digital assets, webinars, and educational collateral.',
    howItWorks: [
      { step: '01', title: 'Gated Asset Distribution', desc: 'Hosting your whitepapers and guides across high-authority B2B networks.' },
      { step: '02', title: 'Engagement Telemetry', desc: 'Tracking download activity, reading duration, and corporate domains.' },
      { step: '03', title: 'Validation & Enrichment', desc: 'Enriching with phone numbers, LinkedIn URLs, and corporate headquarters data.' },
    ],
    whyItMatters: 'Fills the top of your funnel with verified business emails from target accounts, establishing the foundation for systematic nurture cadences.',
    sla: '99.8% Data Deliverability',
  },
  {
    id: 'b2b-appointment-setting',
    name: 'B2B Appointment Setting',
    link: '/b2b-appointment-setting',
    shortDesc: 'Confirmed introductory calls and software demonstrations booked straight onto your sales team’s calendars.',
    howItWorks: [
      { step: '01', title: 'Dedicated SDR Cadence', desc: 'Bespoke multi-channel outreach tailored to your value proposition.' },
      { step: '02', title: 'Double-Opt-In Confirmation', desc: 'Securing explicit calendar acceptance and confirming timezone alignment.' },
      { step: '03', title: 'Pre-Meeting Prep Briefing', desc: 'Sharing comprehensive buyer notes, company pain points, and current tools.' },
    ],
    whyItMatters: 'Free your account executives from cold prospecting so they can focus 100% of their energy on closing deals and generating revenue.',
    sla: 'Verified Show-Up Assurance',
  },
  {
    id: 'b2b-email-marketing',
    name: 'B2B Email Marketing',
    link: '/b2b-email-marketing',
    shortDesc: 'High-deliverability 1-on-1 cold email campaigns engineered to reach primary inboxes and drive high response rates.',
    howItWorks: [
      { step: '01', title: 'Infrastructure & Warmup', desc: 'Configuring SPF, DKIM, DMARC, and custom tracking domains.' },
      { step: '02', title: 'Persona-Specific Copywriting', desc: 'Pain-point driven messaging optimized for executive reply rates.' },
      { step: '03', title: 'Inbox Monitoring & Reply Handling', desc: 'Categorizing responses and immediate handoff of positive replies.' },
    ],
    whyItMatters: 'Cold email remains the highest ROI outbound channel when executed with clean deliverability infrastructure and hyper-relevant messaging.',
    sla: '< 1% Bounce Rate Guaranteed',
  },
  {
    id: 'abm',
    name: 'Account-Based Marketing (ABM)',
    link: '/abm',
    shortDesc: 'Precision orchestration targeting Tier-1 enterprise accounts with unified multi-stakeholder messaging.',
    howItWorks: [
      { step: '01', title: 'Named Account Selection', desc: 'Collaborative alignment on your top 50 to 500 dream enterprise logos.' },
      { step: '02', title: 'Committee-Wide Penetration', desc: 'Reaching champions, technical buyers, and economic decision-makers simultaneously.' },
      { step: '03', title: 'Omnichannel Air Cover', desc: 'Synchronizing email, direct calls, and content for maximum brand ubiquity.' },
    ],
    whyItMatters: 'Enterprise deals are won by consensus. ABM ensures all 6 to 10 decision-makers on the buying committee know your solution.',
    sla: '38% Faster Enterprise Deal Cycles',
  },
  {
    id: 'content-syndication',
    name: 'Content Syndication',
    link: '/content-syndication',
    shortDesc: 'Distribute your research papers, buyer guides, and case studies across a global B2B audience of 45M+ business professionals.',
    howItWorks: [
      { step: '01', title: 'Asset Placement', desc: 'Publishing your content on top-tier publisher ecosystems.' },
      { step: '02', title: 'Filter Criteria Gating', desc: 'Enforcing company size, revenue, and seniority filters on all downloads.' },
      { step: '03', title: 'Opt-In Lead Extraction', desc: 'Exporting GDPR/CAN-SPAM compliant leads with complete verification.' },
    ],
    whyItMatters: 'Build thought leadership while generating pipeline from buyers actively seeking information about your problem domain.',
    sla: 'Guaranteed Lead Volume Allocation',
  },
  {
    id: 'webinar-services',
    name: 'B2B Webinar Services',
    link: '/webinar-services',
    shortDesc: 'Drive qualified registrants, live attendees, and post-event conversions for virtual roundtables and product launches.',
    howItWorks: [
      { step: '01', title: 'Targeted Attendee Sourcing', desc: 'Direct outreach to invite ICP executives to your digital summit.' },
      { step: '02', title: 'SMS & Email Reminder Cadence', desc: 'Multi-touch reminders to maximize live attendee turnout.' },
      { step: '03', title: 'Post-Event Hot Lead Follow-Up', desc: 'Engaging attendees immediately with relevant next steps.' },
    ],
    whyItMatters: 'Interactive digital events create an unmatched environment to educate multiple accounts simultaneously and accelerate trust.',
    sla: '45%+ Average Attendee Show Rate',
  },
  {
    id: 'lead-nurturing',
    name: 'Lead Nurturing',
    link: '/lead-nurturing',
    shortDesc: 'Turn unresponsive, cold, or dormant leads into active sales conversations through educational multi-stage cadences.',
    howItWorks: [
      { step: '01', title: 'Dormant Database Audit', desc: 'Identifying stalled opportunities in your CRM ripe for re-activation.' },
      { step: '02', title: 'Dynamic Trigger Messaging', desc: 'Serving progressive case studies based on user behavior and stage.' },
      { step: '03', title: 'Re-Engagement Escalation', desc: 'Alerting sales reps the moment a dormant contact shows renewed buying activity.' },
    ],
    whyItMatters: 'Most leads don’t buy immediately. Nurturing ensures your brand stays top-of-mind until the prospect is ready to transact.',
    sla: '22% Re-engagement Rate',
  },
  {
    id: 'b2b-list-building',
    name: 'B2B List Building',
    link: '/b2b-list-building',
    shortDesc: 'Bespoke prospect databases built from scratch with verified phone numbers, direct emails, and company attributes.',
    howItWorks: [
      { step: '01', title: 'Custom Query Scoping', desc: 'Defining exact industry codes, revenue brackets, geography, and technologies.' },
      { step: '02', title: 'Human-in-the-Loop Validation', desc: 'Double-verifying job titles and email addresses via active ping.' },
      { step: '03', title: 'Clean CRM Ready Delivery', desc: 'Formatted CSV or direct integration ready for immediate campaign activation.' },
    ],
    whyItMatters: 'Outreach is only as effective as the list you feed into it. Fresh, clean contact data guarantees your message lands.',
    sla: '99.8% Contact Deliverability SLA',
  },
  {
    id: 'database-cleansing',
    name: 'Database Cleansing',
    link: '/database-cleansing',
    shortDesc: 'Cleanse, deduplicate, and enrich your CRM database to protect sender reputation and improve campaign conversions.',
    howItWorks: [
      { step: '01', title: 'Decay & Syntax Audit', desc: 'Identifying spam traps, invalid domains, bounced contacts, and duplicates.' },
      { step: '02', title: 'Real-Time SMTP & Phone Ping', desc: 'Verifying every record against live mail exchange servers.' },
      { step: '03', title: 'Missing Field Enrichment', desc: 'Appending updated titles, LinkedIn profiles, and company headcount.' },
    ],
    whyItMatters: 'B2B data decays by ~30% each year due to job changes. Cleansing preserves your domain reputation and boosts SDR productivity.',
    sla: 'Complete Database Health Recovery',
  },
]

export default function InteractiveSelector() {
  const [selectedId, setSelectedId] = useState(SELECTOR_SERVICES[0].id)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const activeService = SELECTOR_SERVICES.find((s) => s.id === selectedId) || SELECTOR_SERVICES[0]

  return (
    <section
      id="service-selector"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
      aria-label="Interactive Service Selector — Find the Right Solution"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] mb-4">
            <span>INTERACTIVE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-[1.12] mb-4">
            Find the Right{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta">
              Solution.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            Select a capability to inspect operational methodology, business impact, and deployment frameworks.
          </p>
        </div>

        {/* Mobile Horizontal Pill Scroller */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-none flex gap-2.5">
          {SELECTOR_SERVICES.map((srv) => {
            const isActive = srv.id === selectedId
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedId(srv.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-surface border border-border text-text-secondary'
                }`}
              >
                {srv.name}
              </button>
            )
          })}
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ══════════ LEFT COLUMN: Vertical Service Navigation (Span 4) ══════════ */}
          <div className="hidden lg:block lg:col-span-4 space-y-1.5 pr-4 border-r border-border/60">
            {SELECTOR_SERVICES.map((srv, idx) => {
              const isActive = srv.id === selectedId
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedId(srv.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-primary/10 border border-primary/30 text-primary font-bold shadow-xs'
                      : 'hover:bg-surface/60 text-text-secondary border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-muted">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                      {srv.name}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'translate-x-0.5 text-primary opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* ══════════ RIGHT COLUMN: Smoothly Transitioning Details Panel (Span 8) ══════════ */}
          <div className="lg:col-span-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-10 rounded-3xl border border-border/80 bg-surface/30 dark:bg-white/[0.02] backdrop-blur-md"
              >
                {/* Header: Service Name & SLA Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border/60">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-cta block mb-1">
                      CAPABILITY BRIEF
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
                      {activeService.name}
                    </h3>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 text-xs font-mono font-bold tracking-wider">
                    {activeService.sla}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal mb-8">
                  {activeService.shortDesc}
                </p>

                {/* Section: HOW IT WORKS (3 Simple Steps) */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono font-bold tracking-[0.22em] uppercase text-text-muted mb-4">
                    HOW IT WORKS — 3 STEP EXECUTION
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeService.howItWorks.map((item) => (
                      <div
                        key={item.step}
                        className="p-4 rounded-xl bg-surface border border-border/60 flex flex-col justify-between"
                      >
                        <div>
                          <span className="font-mono text-xs font-bold text-primary block mb-2">
                            {item.step}
                          </span>
                          <h5 className="font-bold text-sm text-text-primary mb-1.5">
                            {item.title}
                          </h5>
                          <p className="text-xs text-text-secondary leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section: WHY IT MATTERS */}
                <div className="p-5 rounded-2xl bg-primary/[0.03] dark:bg-primary/[0.05] border border-primary/20 mb-8">
                  <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>WHY IT MATTERS TO YOUR REVENUE</span>
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {activeService.whyItMatters}
                  </p>
                </div>

                {/* Action Link Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                  <Link
                    to={activeService.link}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group"
                  >
                    <StarButton
                      as="div"
                      className="h-11 px-6 text-xs font-bold uppercase tracking-wider text-white dark:text-neutral-900 flex items-center gap-2"
                      lightColor={isDark ? '#87CEEB' : '#FF8533'}
                      backgroundColor={isDark ? '#00A6FF' : '#FF6D00'}
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </StarButton>
                  </Link>

                  <Link
                    to="/contact"
                    className="text-xs font-mono text-text-muted hover:text-primary transition-colors"
                  >
                    Need custom scoping? Consult with our pipeline architects →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
