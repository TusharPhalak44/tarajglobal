// Category-wise FAQs and metadata for TaRaj Global B2B Blog
// Categories:
// 1. Thought Leadership Insights (CEO authors)
// 2. Sales & Marketing Insights (Sales Director & Marketing Manager authors)
// 3. B2B Tech & AI-Enabled Insights (Tech Director authors)

export const CATEGORY_KEYS = {
  THOUGHT_LEADERSHIP: 'thought-leadership',
  SALES_MARKETING: 'sales-marketing',
  TECH_AI: 'tech-ai'
}

export const CATEGORIES_DATA = [
  {
    key: 'thought-leadership',
    name: 'Thought Leadership Insights',
    shortName: 'Thought Leadership',
    authorRole: 'CEO authors',
    authorNames: 'Hanmant Dhotre',
    subtitle: 'Executive strategy for predictable growth',
    accentColor: '#00A6FF',
    accentBorder: 'border-[#00A6FF]',
    accentGlow: 'shadow-[#00A6FF]/20',
    iconBg: 'bg-[#00A6FF]/10 text-[#00A6FF]'
  },
  {
    key: 'sales-marketing',
    name: 'Sales & Marketing Insights',
    shortName: 'Sales & Marketing',
    authorRole: 'Sales Director & Marketing Manager authors',
    authorNames: 'Abhishek Rikibe & Wasim Attar',
    subtitle: 'Field-tested tactics for qualified pipeline',
    accentColor: '#10B981',
    accentBorder: 'border-emerald-500',
    accentGlow: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-500'
  },
  {
    key: 'tech-ai',
    name: 'B2B Tech & AI-Enabled Insights',
    shortName: 'B2B Tech & AI',
    authorRole: 'Tech Director authors',
    authorNames: 'Tushar Phalak',
    subtitle: 'CRM, data and automation for revenue teams',
    accentColor: '#FF6D00',
    accentBorder: 'border-[#FF6D00]',
    accentGlow: 'shadow-[#FF6D00]/20',
    iconBg: 'bg-[#FF6D00]/10 text-[#FF6D00]'
  }
]

export const CATEGORY_FAQS = {
  'thought-leadership': {
    categoryKey: 'thought-leadership',
    categoryName: 'Thought Leadership Insights',
    eyebrow: 'SOMETHING ON YOUR MIND?',
    title: 'FREQUENTLY ASKED',
    highlightTitle: 'QUESTIONS',
    subtext: 'Answers about our executive perspectives on B2B revenue strategy and growth.',
    faqs: [
      {
        id: 'faq-tl-1',
        num: '01',
        question: 'What is B2B thought leadership?',
        answer: 'B2B thought leadership is expert-led content that shares an original point of view on strategy, markets, and buyer behavior, helping revenue leaders make better decisions. Ours is written by TaRaj Global’s CEOs.'
      },
      {
        id: 'faq-tl-2',
        num: '02',
        question: 'What topics do the CEO-authored articles cover?',
        answer: 'They cover B2B revenue strategy, go-to-market planning, pipeline predictability, and demand generation trends across the US, EMEA, and APAC.'
      },
      {
        id: 'faq-tl-3',
        num: '03',
        question: 'Who should read these articles?',
        answer: 'CROs, VPs of Demand Generation, RevOps leaders, and founders at B2B SaaS, cloud, and enterprise IT companies who are shaping revenue strategy and want a senior view on what works.'
      },
      {
        id: 'faq-tl-4',
        num: '04',
        question: 'How is thought leadership different from the sales and marketing playbooks?',
        answer: 'Thought leadership explains why and where the market is heading. The sales and marketing insights show how to execute, with steps, checklists, and benchmarks.'
      },
      {
        id: 'faq-tl-5',
        num: '05',
        question: 'How does executive strategy connect to pipeline results?',
        answer: 'Strategy decisions such as who to target, which signals to act on, and how to measure qualification set the quality of your pipeline before outreach begins. These articles explain those decisions.'
      },
      {
        id: 'faq-tl-6',
        num: '06',
        question: 'Can we suggest a topic for a CEO article?',
        answer: 'Yes. Contact us through the Contact page with the strategy question your leadership team is working on, and we’ll consider it for a future article.'
      }
    ]
  },

  'sales-marketing': {
    categoryKey: 'sales-marketing',
    categoryName: 'Sales & Marketing Insights',
    eyebrow: 'SOMETHING ON YOUR MIND?',
    title: 'FREQUENTLY ASKED',
    highlightTitle: 'QUESTIONS',
    subtext: 'Answers about our B2B sales and marketing playbooks, from qualification to outreach.',
    faqs: [
      {
        id: 'faq-sm-1',
        num: '01',
        question: 'What do the sales and marketing insights cover?',
        answer: 'They cover lead qualification (BANT, MQL, SQL, SAL), lead scoring, target account lists, account-based marketing, outbound cadences, and SDR conversion, drawn from live B2B campaigns.'
      },
      {
        id: 'faq-sm-2',
        num: '02',
        question: 'What is the difference between MQL, SQL, SAL, and BANT?',
        answer: 'An MQL is a lead marketing judges ready for nurturing. An SQL is one sales confirms as a real opportunity. An SAL is a lead sales has accepted to work. BANT is a framework that qualifies on budget, authority, need, and timeline.'
      },
      {
        id: 'faq-sm-3',
        num: '03',
        question: 'How can sales and marketing agree on what a qualified lead is?',
        answer: 'Agree on shared lead definitions, a scoring model both teams trust, and a clear handoff process. Our articles show how to set these up without disputes between teams.'
      },
      {
        id: 'faq-sm-4',
        num: '04',
        question: 'Who writes the sales and marketing articles?',
        answer: 'Our Sales Director and Marketing Manager write them, based on the campaigns and qualification workflows their teams run every day.'
      },
      {
        id: 'faq-sm-5',
        num: '05',
        question: 'Can SDR teams use these playbooks directly?',
        answer: 'Yes. Each playbook includes practical execution checklists and benchmarks that SDR and marketing operations teams can apply right away.'
      },
      {
        id: 'faq-sm-6',
        num: '06',
        question: 'Can we request a sales or marketing topic?',
        answer: 'Yes. If your team faces a specific pipeline or qualification challenge, contact us through the Contact page and suggest a topic.'
      }
    ]
  },

  'tech-ai': {
    categoryKey: 'tech-ai',
    categoryName: 'B2B Tech & AI-Enabled Insights',
    eyebrow: 'SOMETHING ON YOUR MIND?',
    title: 'FREQUENTLY ASKED',
    highlightTitle: 'QUESTIONS',
    subtext: 'Answers about CRM, data, and AI in B2B lead generation.',
    faqs: [
      {
        id: 'faq-ta-1',
        num: '01',
        question: 'What topics do the B2B tech and AI insights cover?',
        answer: 'They cover CRM architecture, data enrichment and verification, intent data, automation, and AI-assisted targeting and scoring, including integration with Salesforce, HubSpot, Apollo, and Outreach.'
      },
      {
        id: 'faq-ta-2',
        num: '02',
        question: 'How is AI used in B2B lead generation?',
        answer: 'AI helps with account research, signal-led targeting, lead scoring, and email orchestration. Human verification stays in the process so data stays accurate and leads stay sales-ready.'
      },
      {
        id: 'faq-ta-3',
        num: '03',
        question: 'What is the difference between first-party and third-party intent data?',
        answer: 'First-party intent data comes from your own website, CRM, and engagement. Third-party intent data comes from outside sources that track buyer research activity across the web.'
      },
      {
        id: 'faq-ta-4',
        num: '04',
        question: 'How do we keep CRM data accurate?',
        answer: 'Enrich and verify contacts on a regular schedule and remove decayed records, because contact data goes stale over time. Our Database Cleansing service is backed by a 99.8% Data Accuracy SLA.'
      },
      {
        id: 'faq-ta-5',
        num: '05',
        question: 'Can we apply these guides in Salesforce or HubSpot?',
        answer: 'Yes. The guides include integration blueprints and checklists for common CRM and sales engagement tools, which your marketing operations and sales engineering teams can adopt.'
      },
      {
        id: 'faq-ta-6',
        num: '06',
        question: 'How do these articles relate to DemandFlow Bridge?',
        answer: 'DemandFlow Bridge is TaRaj Global’s CRM product. These articles explore the CRM, data, and automation topics behind modern revenue stacks, and the product page explains the platform itself.'
      }
    ]
  }
}

/**
 * Resolves which category key a blog belongs to strictly based on its author:
 * - 'thought-leadership': Hanmant Dhotre
 * - 'sales-marketing': Abhishek Rikibe, Wasim Attar
 * - 'tech-ai': Tushar / Tushar Phalak
 * Returns null if author does not belong to any of these three tracks.
 */
export const getBlogCategoryKey = (blog) => {
  if (!blog || typeof blog !== 'object') return null

  const authorId = Number(blog.author_id)
  const authorFields = [
    blog.author_name,
    blog.author,
    blog.author_email,
    blog.author_slug,
    blog.author_table_name,
    blog.user_name,
    blog.user_email
  ].filter(Boolean).join(' ').toLowerCase()

  // 1. Thought Leadership Insights -> ONLY Hanmant Dhotre
  if (
    authorFields.includes('hanmant') ||
    authorFields.includes('dhotre') ||
    authorId === 6 ||
    authorId === 8
  ) {
    return 'thought-leadership'
  }

  // 2. Sales & Marketing Insights -> ONLY Abhishek Rikibe and Wasim Attar
  if (
    authorFields.includes('abhishek') ||
    authorFields.includes('rikibe') ||
    authorFields.includes('wasim') ||
    authorFields.includes('attar') ||
    authorId === 5 ||
    authorId === 10
  ) {
    return 'sales-marketing'
  }

  // 3. B2B Tech & AI-Enabled Insights -> ONLY Tushar / Tushar Phalak
  if (
    authorFields.includes('tushar') ||
    authorFields.includes('phalak') ||
    authorId === 9
  ) {
    return 'tech-ai'
  }

  return null
}

/**
 * Checks whether a blog matches a given category track key ('thought-leadership', 'sales-marketing', 'tech-ai') strictly by author.
 */
export const isBlogMatchingCategory = (blog, categoryKey) => {
  if (!blog || !categoryKey) return false
  const targetKey = normalizeCategory(categoryKey)
  if (!targetKey) return false
  return getBlogCategoryKey(blog) === targetKey
}

/**
 * Normalizes any category string or blog object into one of the 3 category keys.
 * When passed a blog object (or if categoryName is an object representing a blog),
 * classification is strictly determined by author:
 * - Hanmant Dhotre -> 'thought-leadership'
 * - Abhishek Rikibe & Wasim Attar -> 'sales-marketing'
 * - Tushar / Tushar Phalak -> 'tech-ai'
 */
export const normalizeCategory = (categoryName = '', blog = null) => {
  // If blog is passed as the second argument, or if categoryName itself is a blog object:
  const blogObj = (blog && typeof blog === 'object')
    ? blog
    : (categoryName && typeof categoryName === 'object' ? categoryName : null)

  if (blogObj) {
    const authorCategory = getBlogCategoryKey(blogObj)
    if (authorCategory) {
      return authorCategory
    }
  }

  // If a category string is provided, normalize it:
  const norm = String(typeof categoryName === 'string' ? categoryName : '').toLowerCase().trim()

  if (
    norm === 'thought-leadership' ||
    norm.includes('thought leadership') ||
    norm.includes('thought and leader') ||
    norm.includes('leadership')
  ) {
    return 'thought-leadership'
  }
  if (
    norm === 'sales-marketing' ||
    norm.includes('sales & marketing') ||
    norm.includes('sales and marketing') ||
    norm.includes('sales') ||
    norm.includes('marketing')
  ) {
    return 'sales-marketing'
  }
  if (
    norm === 'tech-ai' ||
    norm.includes('tech & ai') ||
    norm.includes('tech and ai') ||
    norm.includes('b2b tech') ||
    norm.includes('ai-enabled') ||
    norm.includes('ai enabled') ||
    norm.includes('tech') ||
    norm.includes('ai')
  ) {
    return 'tech-ai'
  }

  return null
}

/**
 * Get FAQ package for a given category name or key.
 * Defaults to 'thought-leadership' if not found.
 */
export const getCategoryFaq = (categoryNameOrKey = '') => {
  const key = normalizeCategory(categoryNameOrKey) || 'thought-leadership'
  return CATEGORY_FAQS[key] || CATEGORY_FAQS['thought-leadership']
}

// Flat list of all default FAQs for backwards compatibility
export const DEFAULT_BLOG_FAQS = CATEGORY_FAQS['thought-leadership'].faqs

