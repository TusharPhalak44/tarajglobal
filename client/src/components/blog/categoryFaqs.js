// Category-wise FAQs and metadata for TaRaj Global B2B Blog
// Author Mapping:
// 1. Thought Leadership Insights -> Hanmant Dhotre (Founder & CEO / Admin)
// 2. Sales & Marketing Insights   -> Tushar Phalak (Director of Growth & Marketing / Author)
// 3. B2B Tech & AI-Enabled Insights -> Wasim Attar (B2B Tech & AI Strategist / Author)

import { formatAuthorName } from '@utils/formatAuthor'

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
    author: 'Hanmant Dhotre',
    authorBadge: 'Admin',
    authorRole: 'Founder & CEO (Admin)',
    subtitle: 'Executive strategy & market intelligence by Hanmant Dhotre',
    accentColor: '#00A6FF',
    accentBorder: 'border-[#00A6FF]',
    accentGlow: 'shadow-[#00A6FF]/20',
    iconBg: 'bg-[#00A6FF]/10 text-[#00A6FF]'
  },
  {
    key: 'sales-marketing',
    name: 'Sales & Marketing Insights',
    shortName: 'Sales & Marketing',
    author: 'Tushar Phalak',
    authorBadge: 'Author',
    authorRole: 'Director of Growth & Marketing (Author)',
    subtitle: 'Field-tested pipeline & ABM playbooks by Tushar Phalak',
    accentColor: '#10B981',
    accentBorder: 'border-emerald-500',
    accentGlow: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-500'
  },
  {
    key: 'tech-ai',
    name: 'B2B Tech & AI-Enabled Insights',
    shortName: 'B2B Tech & AI',
    author: 'Wasim Attar',
    authorBadge: 'Author',
    authorRole: 'B2B Tech & AI Strategist (Author)',
    subtitle: 'CRM, data engineering & AI architecture by Wasim Attar',
    accentColor: '#FF6D00',
    accentBorder: 'border-[#FF6D00]',
    accentGlow: 'shadow-[#FF6D00]/20',
    iconBg: 'bg-[#FF6D00]/10 text-[#FF6D00]'
  }
]

/**
 * Checks whether a blog post belongs to a given category track based strictly on author mapping:
 * - 'thought-leadership' -> Hanmant Dhotre (Admin) ONLY
 * - 'sales-marketing'   -> Tushar Phalak (Author) ONLY
 * - 'tech-ai'           -> Wasim Attar (Author) ONLY
 */
export const matchesCategoryAuthor = (blog, categoryKey) => {
  if (!blog || !categoryKey) return true

  const authorFormatted = formatAuthorName(blog.author_name || blog.author || '').toLowerCase().trim()
  const rawAuthor = String(blog.author || '').toLowerCase().trim()
  const rawAuthorName = String(blog.author_name || '').toLowerCase().trim()
  const rawEmail = String(blog.author_email || blog.email || '').toLowerCase().trim()
  const rawSlug = String(blog.author_slug || '').toLowerCase().trim()
  const createdByName = String(blog.created_by_name || '').toLowerCase().trim()

  const combinedAuthorText = `${authorFormatted} ${rawAuthor} ${rawAuthorName} ${rawEmail} ${rawSlug} ${createdByName}`
  const catText = String(blog.category_name || blog.category || '').toLowerCase().trim()

  if (categoryKey === 'thought-leadership') {
    // Exclude other authors strictly
    if (
      combinedAuthorText.includes('tushar') ||
      combinedAuthorText.includes('phalak') ||
      combinedAuthorText.includes('wasim') ||
      combinedAuthorText.includes('attar') ||
      combinedAuthorText.includes('atarwasim')
    ) {
      return false
    }

    // Match Hanmant Dhotre or Admin
    if (
      combinedAuthorText.includes('hanmant') ||
      combinedAuthorText.includes('dhotre') ||
      combinedAuthorText.includes('admin') ||
      combinedAuthorText.includes('founder') ||
      combinedAuthorText.includes('ceo') ||
      catText.includes('thought') ||
      catText.includes('leadership')
    ) {
      return true
    }

    // Fallback: Default unassigned/general posts from Admin belong to Hanmant Dhotre
    if (!rawAuthor && !rawAuthorName && !catText.includes('sales') && !catText.includes('marketing') && !catText.includes('tech') && !catText.includes('ai')) {
      return true
    }

    return false
  }

  if (categoryKey === 'sales-marketing') {
    // Exclude Hanmant/Admin and Wasim strictly
    if (
      combinedAuthorText.includes('wasim') ||
      combinedAuthorText.includes('attar') ||
      combinedAuthorText.includes('atarwasim') ||
      combinedAuthorText.includes('hanmant') ||
      combinedAuthorText.includes('dhotre') ||
      combinedAuthorText.includes('admin')
    ) {
      return false
    }

    // Strictly match Tushar Phalak
    if (
      combinedAuthorText.includes('tushar') ||
      combinedAuthorText.includes('phalak')
    ) {
      return true
    }

    // Fallback: Sales & Marketing category without conflicting author
    if (
      (catText.includes('sales') || catText.includes('marketing')) &&
      !combinedAuthorText.includes('admin') &&
      !combinedAuthorText.includes('hanmant')
    ) {
      return true
    }

    return false
  }

  if (categoryKey === 'tech-ai') {
    // Exclude Hanmant/Admin and Tushar strictly
    if (
      combinedAuthorText.includes('tushar') ||
      combinedAuthorText.includes('phalak') ||
      combinedAuthorText.includes('hanmant') ||
      combinedAuthorText.includes('dhotre') ||
      combinedAuthorText.includes('admin')
    ) {
      return false
    }

    // Strictly match Wasim Attar
    if (
      combinedAuthorText.includes('wasim') ||
      combinedAuthorText.includes('attar') ||
      combinedAuthorText.includes('atarwasim')
    ) {
      return true
    }

    // Fallback: Tech & AI category without conflicting author
    if (
      (catText.includes('tech') || catText.includes('ai') || catText.includes('crm') || catText.includes('data')) &&
      !combinedAuthorText.includes('admin') &&
      !combinedAuthorText.includes('hanmant')
    ) {
      return true
    }

    return false
  }

  return false
}

export const CATEGORY_FAQS = {
  'thought-leadership': {
    categoryKey: 'thought-leadership',
    categoryName: 'Thought Leadership Insights',
    eyebrow: 'SOMETHING ON YOUR MIND?',
    title: 'FREQUENTLY ASKED',
    highlightTitle: 'QUESTIONS',
    subtext: 'Executive perspectives on B2B revenue strategy and growth authored by Hanmant Dhotre, Founder & CEO.',
    faqs: [
      {
        id: 'faq-tl-1',
        num: '01',
        question: 'What is B2B thought leadership at TaRaj Global?',
        answer: 'B2B thought leadership is expert-led content that shares an original point of view on strategy, markets, and buyer behavior, helping revenue leaders make better decisions. Ours is authored by Hanmant Dhotre, Founder & CEO at TaRaj Global.'
      },
      {
        id: 'faq-tl-2',
        num: '02',
        question: 'What topics do Hanmant Dhotre’s articles cover?',
        answer: 'They cover B2B revenue strategy, go-to-market planning, pipeline predictability, and demand generation trends across the US, EMEA, and APAC markets.'
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
        question: 'How is thought leadership different from sales and marketing playbooks?',
        answer: 'Thought leadership explains why and where the market is heading. The sales and marketing insights show how to execute tactical campaigns with steps, checklists, and benchmarks.'
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
    subtext: 'B2B sales and marketing playbooks authored by Tushar Phalak, Director of Growth & Marketing.',
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
        answer: 'Our Director of Growth and Marketing, Tushar Phalak, writes them based on the campaigns and qualification workflows our teams run every day.'
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
    subtext: 'Deep dives into CRM architecture, data engineering, and AI automation authored by Wasim Attar.',
    faqs: [
      {
        id: 'faq-ta-1',
        num: '01',
        question: 'What topics do the B2B tech and AI insights cover?',
        answer: 'They cover CRM architecture, data enrichment and verification, intent data, automation, and AI-assisted targeting and scoring, authored by Wasim Attar.'
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
 * Normalizes any category string or blog object into one of the 3 category keys.
 */
export const normalizeCategory = (categoryName = '', blog = null) => {
  if (blog) {
    if (matchesCategoryAuthor(blog, 'thought-leadership')) return 'thought-leadership'
    if (matchesCategoryAuthor(blog, 'sales-marketing')) return 'sales-marketing'
    if (matchesCategoryAuthor(blog, 'tech-ai')) return 'tech-ai'
  }

  const norm = String(categoryName || '').toLowerCase().trim()

  if (norm === 'thought-leadership' || norm.includes('thought leadership') || norm.includes('leadership')) {
    return 'thought-leadership'
  }
  if (norm === 'sales-marketing' || norm.includes('sales') || norm.includes('marketing')) {
    return 'sales-marketing'
  }
  if (norm === 'tech-ai' || norm.includes('tech') || norm.includes('ai') || norm.includes('ai-enabled')) {
    return 'tech-ai'
  }

  return 'thought-leadership'
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
