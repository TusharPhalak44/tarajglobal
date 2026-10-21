import React from 'react'
import SEO from '@components/common/SEO'
import ServiceStory from '@components/recovery/ServiceStory'

const STORY = {
  name: 'Account Based Experience',
  shortName: 'Taraj ABX',
  symptomLine: 'Strategic Priority: Human-Centric, Synchronized Enterprise Account Engagement Across the Complete Lifecycle',
  headline: 'Transform account targeting into',
  headlineAccent: 'meaningful Account Based Experiences.',
  intro:
    'Taraj Global evolves traditional ABM into cohesive Account Based Experiences (ABX). We orchestrate hyper-personalized, multi-stakeholder buyer journeys that unite marketing, sales, and executive engagement around your most critical enterprise accounts.',
  pillars: ['Unified Buying Group Intelligence', 'Personalized Experience Orchestration', 'Synchronized RevOps Execution'],

  problems: [
    { id: 'impersonal', problem: 'Cold, Robotic Outreach', problemDetail: 'Generic templates that alienate C-suite executives', solution: 'Bespoke Account Experiences', solutionDetail: 'High-touch personalized executive briefings and content' },
    { id: 'silos', problem: 'GTM Team Silos', problemDetail: 'Sales and marketing operating on conflicting data', solution: 'Unified RevOps Cadence', solutionDetail: 'Single pane of glass for account intent and touches' },
    { id: 'disconnect', problem: 'Disconnected Committee Personas', problemDetail: 'Outreach targets one person while the buying group stalls', solution: 'Multi-Persona Orchestration', solutionDetail: 'Tailored value messaging mapped to all 6-10 stakeholders' },
    { id: 'timing', problem: 'Tone-Deaf Timing', problemDetail: 'Pitching accounts before or after their buying window', solution: 'Real-Time Intent Telemetry', solutionDetail: 'Outreach triggered at peak organizational research signals' },
    { id: 'velocity', problem: 'Enterprise Friction', problemDetail: 'Deals drag through compliance and security delays', solution: 'Aircover & Enablement', solutionDetail: 'Preemptive collateral resolving procurement bottlenecks' },
    { id: 'retention', problem: 'Post-Sale Disconnect', problemDetail: 'High churn and missed expansion revenue', solution: 'Full-Lifecycle ABX', solutionDetail: 'Ongoing engagement driving expansion and executive advocacy' },
  ],

  diagnosisTitle: 'The Shift: Why Modern Enterprise Buyers Demand ABX Over Basic ABM',
  diagnosis: [
    'Traditional ABM too often turns into aggressive outbound targeting: marketing blasts logos with ads while sales hammers LinkedIn inboxes. Modern enterprise buying committees consist of 6 to 10 cross-functional leaders who quickly disregard impersonal, uncoordinated outreach.',
    'Account Based Experience (ABX) puts the buyer at the center of the strategy. By understanding organizational priorities, tech stacks, and active evaluation cycles, we deliver timely, relevant, and empathetic experiences that build trust and foster unanimous buying consensus.',
  ],

  treatmentTitle: 'The Execution Framework: Full-Lifecycle ABX Orchestration',
  treatmentIntro: 'A 9-step engineered journey transforming target enterprise accounts into lifelong high-ARR client relationships.',
  outcome: 'Proven Outcome: 3x deeper account penetration, higher win rates, compressed enterprise deal cycles, and expanded ACV.',
  steps: [
    { title: 'Tiered Account Selection & TAM Mapping', description: 'Analyze historical closed-won patterns to segment target accounts into 1:1, 1:Few, and 1:Many tiers.', deliverable: 'Prioritized Tier-1 and Tier-2 account dossiers with TAM expansion metrics' },
    { title: 'Buying Committee Intelligence', description: 'Map key personas across business, technical, financial, and executive leadership within each target logo.', deliverable: 'Validated organizational charts profiling decision-makers and champions' },
    { title: 'Multi-Signal Intent Sensing', description: 'Synthesize first-party web telemetry, third-party surge topics, and technology install changes.', deliverable: 'Live intent scoring alerting teams the instant an account enters a buying cycle' },
    { title: 'Contextual Narrative Architecture', description: 'Develop bespoke value narratives tailored to each account’s specific strategic initiatives and pain points.', deliverable: 'Customized executive pitch decks, 1:1 microsites, and role-specific case studies' },
    { title: 'Synchronized Omnichannel Engagement', description: 'Coordinate touches across personalized email, executive LinkedIn messages, digital aircover, and tele-connects.', deliverable: 'Multi-channel sequence cadence synchronized across sales and marketing touchpoints' },
    { title: 'Executive Briefings & VIP Touches', description: 'Facilitate exclusive peer roundtables, executive briefings, and high-impact custom research reports.', deliverable: 'Confirmed executive discussions connecting your leaders with target account C-suite' },
    { title: 'Consensus Building & Objection Handling', description: 'Deploy stage-specific enablement content that equips internal champions to sell on your behalf.', deliverable: 'Champion enablement kits and security/compliance pre-briefings' },
    { title: 'Opportunity Handshake & Sales Handoff', description: 'Transition engaged buying committees to enterprise account executives with complete contextual briefing.', deliverable: 'Warm discovery meetings scheduled with verified buying committees' },
    { title: 'Expansion, Advocacy & Retention Mapping', description: 'Maintain engagement post-close to identify cross-sell, upsell, and advocacy opportunities across business units.', deliverable: 'Customer lifecycle ABX roadmap driving net revenue retention (NRR)' },
  ],

  audiences: [
    {
      id: 'enterprise-saas',
      label: 'Enterprise SaaS Platforms',
      description: 'Engage multi-million dollar annual contract value (ACV) enterprise software accounts with tailored buying committee journeys.',
      points: [
        'Multi-stakeholder touchpoints engaging CTOs, CIOs, and CFOs concurrently',
        'Bespoke value propositions aligned to total cost of ownership (TCO) and rapid deployment',
        'Seamless orchestration across marketing aircover and executive sales discovery',
      ],
    },
    {
      id: 'cloud-infrastructure',
      label: 'Cloud & Infrastructure Providers',
      description: 'Navigate complex technical architectures and enterprise IT evaluations with precision account intelligence.',
      points: [
        'Target system architects, VP Infrastructure, and SecOps directors at Tier-1 companies',
        'Technical briefings addressing workload reliability, migration safety, and multi-cloud SLAs',
        'Deep intent monitoring alerting sales to RFP research and vendor evaluations',
      ],
    },
    {
      id: 'cybersecurity',
      label: 'Enterprise Cybersecurity Solutions',
      description: 'Connect security innovators with CISOs and risk executives seeking trusted solutions for urgent compliance mandates.',
      points: [
        'Executive-level threat intelligence and compliance benchmarking briefings',
        'High-trust engagement maintaining strict confidentiality and regulatory alignment',
        'Multi-touch consensus building that unites security practitioners with finance approvers',
      ],
    },
    {
      id: 'fintech-banking',
      label: 'Banking & Financial Technology',
      description: 'Engage institutional financial entities and fintech leaders with institutional-grade messaging and proof of ROI.',
      points: [
        'Strict regulatory alignment and compliance-ready communication frameworks',
        'Messaging highlighting risk mitigation, fraud prevention, and operational agility',
        'Direct connection with chief compliance officers, CROs, and digital transformation heads',
      ],
    },
    {
      id: 'healthtech',
      label: 'Healthcare & Life Sciences Tech',
      description: 'Engage hospital systems, biotech enterprises, and medical technology leaders navigating strict healthcare standards.',
      points: [
        'HIPAA-compliant, highly contextual outreach tailored to medical and operational executives',
        'Focus on clinical workflows, patient data governance, and organizational scalability',
        'Consensus building across clinical directors, CMIOs, and procurement boards',
      ],
    },
    {
      id: 'high-value-services',
      label: 'Global Professional & Advisory Services',
      description: 'Position consulting, engineering, and implementation firms for large-scale enterprise transformation contracts.',
      points: [
        'Thought leadership and proprietary research delivered directly to executive sponsors',
        'Bespoke account dossiers outlining corporate restructuring and digital modernization goals',
        'High-touch executive introductions and peer-to-peer advisory roundtables',
      ],
    },
  ],

  reasons: [
    { title: 'Buyer-Centric Orchestration', description: 'We replace high-pressure sales pitches with high-value buyer experiences that respect the committee’s time and strategic priorities.' },
    { title: 'True RevOps Alignment', description: 'Marketing, sales development, and account executives share unified intelligence, messaging, and account milestones in real time.' },
    { title: 'Deep Buying Group Penetration', description: 'Every engagement reaches across executive, technical, and commercial stakeholders, preventing single-threaded deal collapse.' },
    { title: 'DemandFlow Telemetry & Automation', description: 'Our proprietary DemandFlow Bridge infrastructure tracks intent across digital, email, and tele-touchpoints to time every outreach perfectly.' },
    { title: 'Sustained Pipeline & Expansion Lift', description: 'ABX doesn’t stop at the first meeting. Our programs maintain account momentum through contract signature and into multi-divisional expansion.' },
  ],

  faqs: [
    { id: 'faq-1', question: 'What is Account Based Experience (ABX)?', answer: 'Account Based Experience (ABX) is a customer-centric evolution of Account-Based Marketing (ABM). It synchronizes marketing, sales, and customer success touchpoints to deliver tailored, high-value experiences to buying committees at every stage of their evaluation.' },
    { id: 'faq-2', question: 'How is ABX different from traditional ABM?', answer: 'Traditional ABM focuses primarily on identifying and targeting accounts with marketing ads and sales emails. ABX focuses on the entire experience delivered to the buyer, combining real-time intent telemetry, multi-stakeholder personalization, and empathetic timing to build authentic consensus.' },
    { id: 'faq-3', question: 'How do you tier accounts for an ABX strategy?', answer: 'We segment target accounts into three distinct tiers: Tier 1 (1:1 hyper-personalized campaigns for top enterprise logos), Tier 2 (1:Few tailored cluster campaigns for specific verticals), and Tier 3 (1:Many programmatic scale with dynamic personalization).' },
    { id: 'faq-4', question: 'What role does intent data play in ABX?', answer: 'Intent data serves as the catalyst for ABX execution. Instead of blind cold outreach, our systems detect when target accounts are actively researching your category, competitors, or pain points, allowing us to initiate context-rich engagement at the exact right moment.' },
    { id: 'faq-5', question: 'How does ABX engage entire buying committees?', answer: 'Enterprise deals involve an average of 6-10 stakeholders. We map each persona—from technical evaluators and end-users to financial gatekeepers and C-suite champions—and deliver tailored content that answers each role’s unique evaluation criteria.' },
    { id: 'faq-6', question: 'What channels are used during an ABX program?', answer: 'We orchestrate synchronized touches across personalized 1:1 email sequences, LinkedIn executive outreach, high-impact content syndication, tailored digital aircover, peer roundtables, and direct tele-discovery.' },
    { id: 'faq-7', question: 'How do you measure ABX performance and ROI?', answer: 'Key metrics include account engagement velocity, buying committee coverage percentage, meeting conversion rates, opportunity win rates, enterprise deal sizes (ACV), and overall pipeline acceleration.' },
    { id: 'faq-8', question: 'Does ABX help with account retention and expansion?', answer: 'Yes. ABX applies to the entire customer lifecycle. Post-sale, we use account intelligence to identify cross-sell opportunities, drive executive sponsor check-ins, and build multi-division advocacy.' },
  ],
}

const abxSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Account Based Experience (ABX) Services",
      "description": "Engage high-value enterprise accounts with synchronized Account Based Experiences (ABX). Taraj Global unites marketing, sales, and executive engagement powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/account-based-experience",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "Account Based Experience Services",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarajglobal.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tarajglobal.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Account Based Experience", "item": "https://tarajglobal.com/account-based-experience" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": STORY.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

const AccountBasedExperience = () => (
  <>
    <SEO
      title="Account Based Experience (ABX) Services | Modern Account Growth | Taraj Global"
      description="Evolve your ABM into synchronized Account Based Experiences. Taraj Global unifies buyer intent, multi-stakeholder personalization, and high-impact RevOps execution powered by DemandFlow Bridge."
      keywords="account based experience, ABX services, modern ABM, enterprise account engagement, buying committee orchestration, intent data ABX, B2B pipeline acceleration, DemandFlow Bridge"
      canonical="/account-based-experience"
      ogTitle="Account Based Experience (ABX) Services | Modern Account Growth | Taraj Global"
      ogDescription="Deliver personalized, synchronized buying experiences to your most important enterprise accounts. Accelerate consensus, deal velocity, and pipeline revenue."
      ogType="website"
      twitterCard="summary_large_image"
      schemaJson={abxSchema}
    />
    <ServiceStory story={STORY} path="/account-based-experience" />
  </>
)

export default AccountBasedExperience
