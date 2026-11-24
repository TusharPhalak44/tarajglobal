import db from '../../config/db.js'
import { invalidateBlogCache } from '../../services/blogSeoRenderer.js'

export const SEEDED_CATEGORIES = [
  {
    name: 'Account-Based Marketing (ABM)',
    slug: 'account-based-marketing',
    description: 'Strategies, account tiering, and signal-led ABM plays for high-value B2B tech and SaaS accounts.'
  },
  {
    name: 'AI & Sales Technology',
    slug: 'ai-sales-technology',
    description: 'Agentic AI, modern revenue tech stacks, sales intelligence tools, and automated outbound workflows.'
  },
  {
    name: 'B2B SaaS Growth & GTM Strategy',
    slug: 'b2b-saas-growth-gtm',
    description: 'Go-to-market architecture, post-funding scaling roadmaps, and revenue acceleration playbooks for SaaS founders.'
  },
  {
    name: 'Lead Qualification & Scoring',
    slug: 'lead-qualification-scoring',
    description: 'Practical frameworks for MQL, SQL, SAL, BANT qualification and predictive lead scoring models sales trusts.'
  },
  {
    name: 'B2B Data & Intent Intelligence',
    slug: 'b2b-data-intent-intelligence',
    description: 'First-party and third-party intent data signals, data enrichment, decay prevention, and pipeline verification.'
  },
  {
    name: 'Pipeline Strategy & ICP Foundations',
    slug: 'pipeline-strategy-icp-foundations',
    description: 'Ideal customer profiles (ICP), trigger-based prospecting, buying committees, and predictable pipeline foundations.'
  }
]

export const BLOG_CATEGORY_MAP = {
  // Account-Based Marketing (ABM)
  'abm-trends-2027-smart-signals': 'account-based-marketing',
  'account-based-marketing-strategy-2027': 'account-based-marketing',
  'build-a-target-account-list': 'account-based-marketing',
  'learn-how-b2b-companies-can-build-a-predictable-lead-generation-engine-using-abm-content-syndication-appointment-setting-and-data-driven-optimization': 'account-based-marketing',
  'learn-how-b2b-companies-can-build-a-predictable-lead-generation-engine-using-abm-content-syndication-appointment-setting-and-data-driven-optimization-1': 'account-based-marketing',

  // AI & Sales Technology
  'ai-agents-b2b-revenue-copilots-to-agents': 'ai-sales-technology',
  'agentic-ai-b2b-sales-revenue-stack': 'ai-sales-technology',

  // B2B SaaS Growth & GTM Strategy
  'saas-go-to-market-plan-90-days-series-b': 'b2b-saas-growth-gtm',
  'saas-growth-slowing-old-playbook': 'b2b-saas-growth-gtm',
  'b2b-saas-growth-strategy-2027': 'b2b-saas-growth-gtm',
  'post-funding-pipeline-plan': 'b2b-saas-growth-gtm',

  // Lead Qualification & Scoring
  'mql-vs-sql-vs-sal-vs-bant': 'lead-qualification-scoring',
  'lead-scoring-sales-trusts': 'lead-qualification-scoring',
  'add-a-strong-lead-qualification-process': 'lead-qualification-scoring',

  // B2B Data & Intent Intelligence
  'intent-data-first-party-vs-third-party': 'b2b-data-intent-intelligence',
  'b2b-data-enrichment-and-verification': 'b2b-data-intent-intelligence',
  'b2b-data-decay-cost': 'b2b-data-intent-intelligence',

  // Pipeline Strategy & ICP Foundations
  'future-of-b2b-lead-generation-2027': 'pipeline-strategy-icp-foundations',
  'b2b-trigger-signals-that-predict-pipeline': 'pipeline-strategy-icp-foundations',
  'icp-vs-buyer-persona-vs-buying-committee': 'pipeline-strategy-icp-foundations',
  'how-to-build-an-ideal-customer-profile': 'pipeline-strategy-icp-foundations',
  'b2b-pipeline-foundation-playbook': 'pipeline-strategy-icp-foundations',
  'how-b2b-companies-can-build-a-predictable-lead-generation-engine-in-2026': 'pipeline-strategy-icp-foundations',
  'how-b2b-companies-can-build-a-predictable-lead-generation-engine-in-2026-1': 'pipeline-strategy-icp-foundations'
}

export const seedCategories = async () => {
  try {
    console.log('🔄 Checking and seeding categories...')

    // 1. Insert each category if it does not exist
    for (const cat of SEEDED_CATEGORIES) {
      const [existing] = await db.execute(
        'SELECT id FROM categories WHERE slug = ? OR name = ?',
        [cat.slug, cat.name]
      )

      if (existing.length === 0) {
        await db.execute(
          `INSERT INTO categories (name, slug, description, status) 
           VALUES (?, ?, ?, 'active')`,
          [cat.name, cat.slug, cat.description]
        )
        console.log(`  ➕ Added category: ${cat.name}`)
      } else {
        await db.execute(
          `UPDATE categories 
           SET name = ?, description = ?, status = 'active' 
           WHERE id = ?`,
          [cat.name, cat.description, existing[0].id]
        )
      }
    }

    // 2. Fetch all categories into a slug -> id map
    const [allCategories] = await db.execute('SELECT id, slug, name FROM categories')
    const slugToId = {}
    for (const c of allCategories) {
      slugToId[c.slug] = c.id
    }

    // 3. Update initial blogs with their specific category IDs only if they are unset or still on generic category (id: 1)
    let updatedCount = 0
    for (const [slug, categorySlug] of Object.entries(BLOG_CATEGORY_MAP)) {
      const targetCatId = slugToId[categorySlug]
      if (!targetCatId) continue

      const [result] = await db.execute(
        'UPDATE blogs SET category_id = ? WHERE slug = ? AND (category_id IS NULL OR category_id = 1)',
        [targetCatId, slug]
      )
      if (result.affectedRows > 0) {
        updatedCount++
      }
    }

    console.log(`✅ Categorization completed: ${updatedCount} blog(s) assigned to specific categories.`)

    // Invalidate SEO renderer HTML cache
    invalidateBlogCache()
  } catch (error) {
    console.warn('⚠️  seedCategories notice:', error.message)
  }
}

export default seedCategories
