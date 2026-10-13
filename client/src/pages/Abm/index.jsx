import React from 'react'
import SEO from '@components/common/SEO'
import ServiceStory from '@components/recovery/ServiceStory'

const STORY = {
  name: 'Account-Based Marketing',
  shortName: 'Taraj ABM',
  symptomLine: 'Strategic Priority: High-Precision Enterprise Account Acquisition & Pipeline Velocity',
  headline: 'Target the right accounts',
  headlineAccent: 'and build stronger B2B opportunities.',
  intro:
    'Taraj Global helps B2B technology and SaaS companies identify high-value target accounts, engage key decision-makers, and create qualified opportunities through data-driven account-based marketing.',
  pillars: ['Target Account Selection', 'Decision-Maker Mapping', 'Sales-Ready Opportunities'],

  problems: [
    { id: 'precision', problem: 'Wasted Outreach', problemDetail: 'Unqualified leads and broad lists', solution: 'Precision Targeting', solutionDetail: 'High-value account lists' },
    { id: 'reach', problem: 'Low Engagement', problemDetail: 'Generic outreach gets ignored', solution: 'Executive Messaging', solutionDetail: 'Tailored by role and industry' },
    { id: 'alignment', problem: 'Team Misalignment', problemDetail: 'Sales and marketing work in silos', solution: 'Unified RevOps Flow', solutionDetail: 'Seamless lead routing' },
    { id: 'omnichannel', problem: 'Single-Touch Drops', problemDetail: 'Ineffective lead nurturing', solution: 'Omnichannel Cadence', solutionDetail: 'Coordinated multi-touch flows' },
    { id: 'telemetry', problem: 'Zero Visibility', problemDetail: 'Blind to account intent', solution: 'Account Intelligence', solutionDetail: 'Intent and pipeline attribution' },
    { id: 'velocity', problem: 'Stalled Sales Cycles', problemDetail: 'Long buying delays', solution: 'Accelerated Velocity', solutionDetail: 'High-value buying touchpoints' },
  ],

  diagnosisTitle: 'Market Reality: Why Broad Outreach Fails in Enterprise Tech',
  diagnosis: [
    'Traditional lead generation casts a broad net to generate high lead volumes, often resulting in unqualified leads. Your team spends its time on companies that were never going to buy.',
    'Account-Based Marketing flips the funnel. Marketing and sales identify best-fit target accounts upfront, then engage each buying committee with hyper-personalized campaigns.',
  ],

  treatmentTitle: 'The Execution Framework: Multi-Touch ABM Orchestration',
  treatmentIntro: 'A multi-stage targeted outreach pipeline converting verified B2B decision-makers into sales-qualified meetings.',
  outcome: 'Proven Outcome: High-value sales-ready enterprise opportunities and verified decision-makers in active pipeline.',
  steps: [
    { title: 'Identify Accounts', description: 'Define ideal customer profiles (ICP) and curate high-fit target account lists.', deliverable: 'Tiered target account list, scored on firmographics and live intent' },
    { title: 'Account Research', description: 'Deep dive into account structure, pain points, tech stacks, and buying cycles.', deliverable: 'Account dossiers covering org structure, tech stack and pain points' },
    { title: 'Map Decision-Makers', description: 'Identify verified stakeholders, committee champions, and key budget holders.', deliverable: 'Verified buying committee: stakeholders, champions and budget holders' },
    { title: 'Content & Personalize', description: 'Create bespoke value propositions, tailored copy, and account-specific assets.', deliverable: '1:1 messaging and value narratives for each stakeholder persona' },
    { title: 'Multi-Channel Engage', description: 'Deploy synchronized outreach across email, LinkedIn, and high-impact digital touchpoints.', deliverable: 'Synchronized email, LinkedIn and executive digital touchpoints' },
    { title: 'Track Intent Signals', description: 'Monitor account engagement, content consumption, and first-party intent surges.', deliverable: 'Real-time account engagement and intent surge alerts' },
    { title: 'Account Qualification', description: 'Score stakeholder responses and validate active enterprise buying interest.', deliverable: 'Accounts scored on engagement depth and buying-stage readiness' },
    { title: 'Create Opportunities', description: 'Package deep account dossiers and warm pipeline ready for sales closing.', deliverable: 'Warm pipeline with account dossiers, ready for closing' },
    { title: 'Sales Handoff', description: 'Seamlessly route qualified accounts directly to your sales reps with CRM sync.', deliverable: 'Sales-ready briefs synced straight into your CRM' },
  ],

  audiences: [
    {
      id: 'saas',
      label: 'B2B SaaS Companies',
      description: 'Engage CTOs, VP of Product, and engineering stakeholders across key high-ARR target accounts with multi-threaded, personalized ABM campaigns.',
      points: [
        'Account-level targeting filtered by verified tech stack and growth stage',
        'Messaging aligned to SaaS evaluation criteria, security audits, and POCs',
        'Multi-stakeholder touchpoints engaging both technical evaluators and finance heads',
      ],
    },
    {
      id: 'tech',
      label: 'Technology Companies',
      description: 'Connect with engineering directors, IT executives, and architecture leaders evaluating complex platform upgrades and cloud infrastructure.',
      points: [
        'Targeting verified IT leaders and system architects at named enterprise accounts',
        'Technical messaging highlighting deployment benchmarks, SLA reliability, and security',
        'Coordinated multi-touch outreach accelerating complex technical evaluations',
      ],
    },
    {
      id: 'enterprise',
      label: 'Enterprise Solutions',
      description: 'Navigate multi-layered enterprise buying committees, procurement heads, and executive sponsors with tailored account-specific narratives.',
      points: [
        'Account-level mapping aligned to your Tier-1 enterprise target account lists (TAL)',
        'Messaging addressing executive ROI, procurement timelines, and compliance',
        'Strategic touches across C-suite sponsors and operational decision-makers',
      ],
    },
    {
      id: 'high-value',
      label: 'High-Value B2B Businesses',
      description: 'Focus marketing and sales resources where deal sizes justify bespoke, high-touch account campaigns designed to generate large ACV pipeline.',
      points: [
        'High-touch 1:1 and 1:few account campaign orchestration',
        'Custom bespoke content and personalized executive briefings',
        'Deep engagement tracking across key account committee members',
      ],
    },
    {
      id: 'long-cycles',
      label: 'Companies With Long Sales Cycles',
      description: 'Sustain account momentum and keep buying committees aligned across 6 to 12-month enterprise evaluation cycles with steady, context-rich engagement.',
      points: [
        'Persistent, multi-channel touches that maintain account interest over long cycles',
        'Stage-specific content matching buying committee progression from discovery to contract',
        'Real-time intent telemetry alerting sales teams when buying interest spikes',
      ],
    },
    {
      id: 'specific-accounts',
      label: 'Businesses Targeting Specific Accounts',
      description: 'Penetrate tightly defined lists of must-win enterprise logos with surgical account intelligence, personalized messaging, and coordinated outreach.',
      points: [
        'Deep account intelligence profiling tech stack, org structure, and active initiatives',
        'Direct multi-channel engagement reaching key decision-makers within named logos',
        'Continuous qualification and warm sales handoff directly to account executives',
      ],
    },
  ],

  reasons: [
    { title: 'Targeted Account Selection', description: 'Campaigns built around verified high-yield accounts matching your exact ICP criteria. Every outreach decision is grounded in deep firmographic fit.' },
    { title: 'Decision-Maker Intelligence', description: 'Direct access to mapped buying committees, key budget holders, and internal champions instead of broad untargeted contact lists.' },
    { title: 'Personalized Engagement', description: 'Account-specific, 1-to-1 executive messaging tailored by industry context, role priorities, and real enterprise initiatives.' },
    { title: 'Account & Intent Intelligence', description: 'Multi-channel intent monitoring and engagement telemetry across touchpoints to identify accounts showing active buying surges.' },
    { title: 'Revenue-Driven Execution', description: 'Focus on sales-ready qualified accounts and high-value opportunities that accelerate deal velocity and pipeline conversion.' },
  ],

  faqs: [
    { id: 'faq-1', question: 'What is Account-Based Marketing (ABM)?', answer: 'Account-Based Marketing (ABM) is a focused B2B growth strategy where marketing and sales teams collaborate to target, engage, and close specific high-value enterprise accounts with hyper-personalized campaigns.' },
    { id: 'faq-2', question: 'How does ABM differ from traditional B2B lead generation?', answer: 'Traditional lead generation casts a broad net to generate high lead volumes, often resulting in unqualified leads. ABM flips the funnel: it identifies best-fit target accounts upfront and engages buying committees with tailored experiences.' },
    { id: 'faq-3', question: 'What types of businesses benefit most from ABM?', answer: 'B2B SaaS companies, enterprise software vendors, IT service providers, and companies with high annual contract values (ACVs) and complex, multi-stakeholder buying cycles benefit most.' },
    { id: 'faq-4', question: 'How do you select and tier target accounts?', answer: 'We analyze historical closed-won deals, define your Ideal Customer Profile (ICP), map total addressable market (TAM), and tier accounts (Tier 1: 1-to-1, Tier 2: 1-to-Few, Tier 3: 1-to-Many) based on revenue potential and intent signals.' },
    { id: 'faq-5', question: 'What channels do you use for ABM outreach?', answer: 'We orchestrate synchronized multi-channel outreach across personalized email cadences, executive LinkedIn touchpoints, content syndication, and tailored digital experiences.' },
    { id: 'faq-6', question: 'How does intent data enhance ABM campaigns?', answer: 'Intent data detects when target accounts are actively researching solutions in your space, allowing us to reach them at peak purchase intent and accelerate sales velocity.' },
    { id: 'faq-7', question: 'How do you measure the success of an ABM program?', answer: 'We track account engagement depth, buying committee penetration, pipeline velocity, meeting conversion rates, and revenue attribution directly tied to target accounts.' },
    { id: 'faq-8', question: 'What role does DemandFlow Bridge play in your ABM services?', answer: 'DemandFlow Bridge powers our end-to-end ABM infrastructure — from account scoring and organizational mapping to automated multi-channel sequences, real-time intent telemetry, and CRM handoff.' },
  ],
}

const abmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Account-Based Marketing (ABM) Services",
      "description": "Win high-value enterprise accounts with bespoke ABM programs. Taraj Global aligns intent data, multi-stakeholder mapping, and personalized 1:1 campaigns powered by DemandFlow Bridge.",
      "url": "https://tarajglobal.com/abm",
      "provider": {
        "@type": "Organization",
        "name": "Taraj Global",
        "url": "https://tarajglobal.com",
      },
      "areaServed": "Global",
      "serviceType": "Account-Based Marketing Services",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarajglobal.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://tarajglobal.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Account-Based Marketing", "item": "https://tarajglobal.com/abm" },
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

const Abm = () => (
  <>
    <SEO
      title="Account-Based Marketing (ABM) Services | Enterprise B2B Growth | Taraj Global"
      description="Win high-value enterprise accounts with bespoke ABM programs. Taraj Global aligns intent data, multi-stakeholder mapping, and personalized 1:1 campaigns powered by DemandFlow Bridge."
      keywords="account-based marketing services, account-based marketing, ABM services, enterprise lead generation, ABM agency, 1:1 ABM campaigns, target account list, buying committee engagement, intent data ABM, DemandFlow Bridge, enterprise pipeline growth"
      canonical="/abm"
      ogTitle="Account-Based Marketing (ABM) Services | Enterprise B2B Growth | Taraj Global"
      ogDescription="Engage, penetrate, and close your highest-value target accounts with bespoke multi-stakeholder ABM programs powered by DemandFlow Bridge."
      ogType="website"
      twitterCard="summary_large_image"
      schemaJson={abmSchema}
    />
    <ServiceStory story={STORY} path="/abm" />
  </>
)

export default Abm
