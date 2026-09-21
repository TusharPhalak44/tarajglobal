/**
 * Server-side SEO Analyzer Utility
 * Calculates SEO score (0-100) and analysis checks for blog posts
 */

export const analyzeSEO = (blogData = {}) => {
  const title = blogData.title || ''
  const slug = blogData.slug || ''
  const content = blogData.content || ''
  const excerpt = blogData.excerpt || ''
  const featured_image = blogData.featured_image || blogData.image || ''

  const analysis = {
    score: 0,
    maxScore: 100,
    status: 'Poor',
    checks: [],
    recommendations: []
  }

  // Weights for each category (total 100)
  const weights = {
    title: 15,
    slug: 10,
    excerpt: 15,
    content: 20,
    headings: 10,
    media: 10,
    links: 10,
    readability: 10
  }

  // 1. Title Analysis (15 points)
  let titleScore = 0
  if (title.length >= 30 && title.length <= 70) {
    titleScore += 5
  } else if (title.length >= 20 && title.length <= 80) {
    titleScore += 3
  }
  const words = title.split(/\s+/).filter(w => w.length > 3)
  if (words.length >= 3) titleScore += 5
  if (/^[A-Z]/.test(title)) titleScore += 5
  analysis.score += titleScore * (weights.title / 15)
  analysis.checks.push({
    name: 'SEO Title',
    score: titleScore,
    status: titleScore >= 12 ? 'success' : titleScore >= 8 ? 'warning' : 'error'
  })

  // 2. Slug Analysis (10 points)
  let slugScore = 0
  if (slug && /^[a-z0-9-]+$/.test(slug)) slugScore += 4
  if (slug && slug.length >= 10 && slug.length <= 60) slugScore += 3
  if (slug && words.some(w => slug.toLowerCase().includes(w.toLowerCase()))) slugScore += 3
  analysis.score += slugScore * (weights.slug / 10)
  analysis.checks.push({
    name: 'URL Slug',
    score: slugScore,
    status: slugScore >= 8 ? 'success' : slugScore >= 5 ? 'warning' : 'error'
  })

  // 3. Excerpt/Meta Description (15 points)
  let excerptScore = 0
  if (excerpt.length >= 120 && excerpt.length <= 160) {
    excerptScore += 7
  } else if (excerpt.length >= 80 && excerpt.length <= 200) {
    excerptScore += 4
  }
  if (excerpt.length > 0) excerptScore += 4
  if (words.some(w => excerpt.toLowerCase().includes(w.toLowerCase()))) excerptScore += 4
  analysis.score += excerptScore * (weights.excerpt / 15)
  analysis.checks.push({
    name: 'Meta Description',
    score: excerptScore,
    status: excerptScore >= 12 ? 'success' : excerptScore >= 7 ? 'warning' : 'error'
  })

  // 4. Content Length (20 points)
  const contentWords = content.trim().split(/\s+/).filter(Boolean).length
  let contentScore = 0
  if (contentWords >= 1000) contentScore = 20
  else if (contentWords >= 600) contentScore = 16
  else if (contentWords >= 300) contentScore = 12
  else if (contentWords >= 100) contentScore = 6
  analysis.score += contentScore * (weights.content / 20)
  analysis.checks.push({
    name: 'Content Length',
    score: contentScore,
    status: contentScore >= 16 ? 'success' : contentScore >= 12 ? 'warning' : 'error'
  })

  // 5. Headings (10 points)
  const h2Count = (content.match(/<h2|##\s+/gi) || []).length
  const h3Count = (content.match(/<h3|###\s+/gi) || []).length
  let headingsScore = 0
  if (h2Count >= 2) headingsScore += 6
  else if (h2Count >= 1) headingsScore += 3
  if (h3Count >= 1) headingsScore += 4
  analysis.score += headingsScore * (weights.headings / 10)
  analysis.checks.push({
    name: 'Headings Structure',
    score: headingsScore,
    status: headingsScore >= 7 ? 'success' : headingsScore >= 3 ? 'warning' : 'error'
  })

  // 6. Media (10 points)
  let mediaScore = 0
  if (featured_image) mediaScore += 6
  const inlineImages = (content.match(/<img|!\[/gi) || []).length
  if (inlineImages > 0) mediaScore += 4
  analysis.score += mediaScore * (weights.media / 10)
  analysis.checks.push({
    name: 'Media & Images',
    score: mediaScore,
    status: mediaScore >= 6 ? 'success' : 'warning'
  })

  // 7. Links (10 points)
  let linksScore = 0
  const links = (content.match(/<a\s+|\[.*?\]\(.*?\)/gi) || []).length
  if (links >= 2) linksScore = 10
  else if (links >= 1) linksScore = 6
  else linksScore = 2
  analysis.score += linksScore * (weights.links / 10)
  analysis.checks.push({
    name: 'Internal/External Links',
    score: linksScore,
    status: linksScore >= 6 ? 'success' : 'warning'
  })

  // 8. Readability (10 points)
  let readabilityScore = 7
  if (contentWords > 100) readabilityScore = 9
  analysis.score += readabilityScore * (weights.readability / 10)
  analysis.checks.push({
    name: 'Readability',
    score: readabilityScore,
    status: 'success'
  })

  // Round final score
  analysis.score = Math.min(100, Math.max(0, Math.round(analysis.score)))
  if (analysis.score >= 80) analysis.status = 'Excellent'
  else if (analysis.score >= 60) analysis.status = 'Good'
  else if (analysis.score >= 40) analysis.status = 'Needs Improvement'
  else analysis.status = 'Poor'

  return analysis
}

export default analyzeSEO
