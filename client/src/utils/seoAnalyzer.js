/**
 * SEO Analyzer Utility
 * Calculates SEO score for blog posts based on various factors
 */

export const analyzeSEO = (blogData) => {
  const { title, slug, content, excerpt, featured_image } = blogData
  
  const analysis = {
    score: 0,
    maxScore: 100,
    checks: [],
    recommendations: []
  }

  // Weights for each category
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
  const titleAnalysis = analyzeTitle(title)
  analysis.score += titleAnalysis.score * (weights.title / 15)
  analysis.checks.push(titleAnalysis)
  analysis.recommendations.push(...titleAnalysis.recommendations)

  // 2. Slug Analysis (10 points)
  const slugAnalysis = analyzeSlug(slug, title)
  analysis.score += slugAnalysis.score * (weights.slug / 10)
  analysis.checks.push(slugAnalysis)
  analysis.recommendations.push(...slugAnalysis.recommendations)

  // 3. Excerpt/Meta Description Analysis (15 points)
  const excerptAnalysis = analyzeExcerpt(excerpt)
  analysis.score += excerptAnalysis.score * (weights.excerpt / 15)
  analysis.checks.push(excerptAnalysis)
  analysis.recommendations.push(...excerptAnalysis.recommendations)

  // 4. Content Analysis (20 points)
  const contentAnalysis = analyzeContent(content)
  analysis.score += contentAnalysis.score * (weights.content / 20)
  analysis.checks.push(contentAnalysis)
  analysis.recommendations.push(...contentAnalysis.recommendations)

  // 5. Headings Analysis (10 points)
  const headingsAnalysis = analyzeHeadings(content)
  analysis.score += headingsAnalysis.score * (weights.headings / 10)
  analysis.checks.push(headingsAnalysis)
  analysis.recommendations.push(...headingsAnalysis.recommendations)

  // 6. Media Analysis (10 points)
  const mediaAnalysis = analyzeMedia(featured_image)
  analysis.score += mediaAnalysis.score * (weights.media / 10)
  analysis.checks.push(mediaAnalysis)
  analysis.recommendations.push(...mediaAnalysis.recommendations)

  // 7. Links Analysis (10 points)
  const linksAnalysis = analyzeLinks(content)
  analysis.score += linksAnalysis.score * (weights.links / 10)
  analysis.checks.push(linksAnalysis)
  analysis.recommendations.push(...linksAnalysis.recommendations)

  // 8. Readability Analysis (10 points)
  const readabilityAnalysis = analyzeReadability(content)
  analysis.score += readabilityAnalysis.score * (weights.readability / 10)
  analysis.checks.push(readabilityAnalysis)
  analysis.recommendations.push(...readabilityAnalysis.recommendations)

  // Round final score
  analysis.score = Math.round(analysis.score)
  analysis.status = getSEOStatus(analysis.score)

  return analysis
}

const analyzeTitle = (title) => {
  const result = {
    name: 'SEO Title',
    score: 0,
    maxScore: 15,
    status: 'error',
    message: '',
    recommendations: []
  }

  if (!title || title.trim().length === 0) {
    result.status = 'error'
    result.message = 'Title is missing'
    result.recommendations.push({
      issue: 'Missing title',
      why: 'The title is crucial for SEO and user engagement',
      how: 'Add a descriptive, keyword-rich title for your blog post'
    })
    return result
  }

  let score = 0

  // Length check (ideal: 50-60 characters)
  if (title.length >= 30 && title.length <= 70) {
    score += 5
  } else if (title.length >= 20 && title.length <= 80) {
    score += 3
  } else {
    result.recommendations.push({
      issue: 'Title length is not optimal',
      why: 'Titles between 50-60 characters perform best in search results',
      how: 'Keep your title between 30-70 characters for better SEO'
    })
  }

  // Contains keywords (basic check - assumes title has meaningful words)
  const words = title.split(/\s+/).filter(w => w.length > 3)
  if (words.length >= 3) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Title is too short or lacks meaningful words',
      why: 'Descriptive titles help search engines understand your content',
      how: 'Use at least 3 meaningful words in your title'
    })
  }

  // Title case check
  if (/^[A-Z]/.test(title)) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Title should start with capital letter',
      why: 'Proper capitalization improves readability and professionalism',
      how: 'Start your title with a capital letter'
    })
  }

  result.score = score
  result.status = score >= 12 ? 'success' : score >= 8 ? 'warning' : 'error'
  result.message = score >= 12 ? 'Good title' : score >= 8 ? 'Title needs improvement' : 'Poor title'

  return result
}

const analyzeSlug = (slug, title) => {
  const result = {
    name: 'SEO Slug',
    score: 0,
    maxScore: 10,
    status: 'error',
    message: '',
    recommendations: []
  }

  if (!slug || slug.trim().length === 0) {
    result.status = 'warning'
    result.message = 'Slug is missing (will be auto-generated)'
    result.score = 5
    return result
  }

  let score = 0

  // Lowercase check
  if (slug === slug.toLowerCase()) {
    score += 3
  } else {
    result.recommendations.push({
      issue: 'Slug contains uppercase letters',
      why: 'URLs should be lowercase for consistency and SEO',
      how: 'Convert your slug to lowercase'
    })
  }

  // Hyphen check (should use hyphens, not underscores or spaces)
  if (slug.includes('_') || slug.includes(' ')) {
    result.recommendations.push({
      issue: 'Slug uses underscores or spaces',
      why: 'Hyphens are preferred over underscores in URLs',
      how: 'Replace underscores and spaces with hyphens'
    })
  } else if (slug.includes('-')) {
    score += 3
  }

  // Length check (ideal: 3-5 words)
  const words = slug.split('-').filter(w => w.length > 0)
  if (words.length >= 2 && words.length <= 6) {
    score += 4
  } else {
    result.recommendations.push({
      issue: 'Slug length is not optimal',
      why: 'Slugs with 2-6 words are more SEO-friendly',
      how: 'Keep your slug between 2-6 words separated by hyphens'
    })
  }

  result.score = score
  result.status = score >= 8 ? 'success' : score >= 5 ? 'warning' : 'error'
  result.message = score >= 8 ? 'Good slug' : score >= 5 ? 'Slug needs improvement' : 'Poor slug'

  return result
}

const analyzeExcerpt = (excerpt) => {
  const result = {
    name: 'Meta Description',
    score: 0,
    maxScore: 15,
    status: 'error',
    message: '',
    recommendations: []
  }

  if (!excerpt || excerpt.trim().length === 0) {
    result.status = 'error'
    result.message = 'Meta description is missing'
    result.recommendations.push({
      issue: 'Missing meta description',
      why: 'Meta descriptions appear in search results and affect click-through rates',
      how: 'Write a compelling 120-155 character description of your content'
    })
    return result
  }

  let score = 0

  // Length check (ideal: 120-155 characters)
  if (excerpt.length >= 120 && excerpt.length <= 160) {
    score += 8
  } else if (excerpt.length >= 80 && excerpt.length <= 200) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Meta description length is not optimal',
      why: 'Descriptions between 120-155 characters display fully in search results',
      how: 'Keep your meta description between 120-160 characters'
    })
  }

  // Contains keywords (basic check)
  const words = excerpt.split(/\s+/).filter(w => w.length > 3)
  if (words.length >= 5) {
    score += 7
  } else {
    result.recommendations.push({
      issue: 'Meta description is too short',
      why: 'Longer descriptions provide more context to search engines',
      how: 'Use at least 5 meaningful words in your meta description'
    })
  }

  result.score = score
  result.status = score >= 12 ? 'success' : score >= 8 ? 'warning' : 'error'
  result.message = score >= 12 ? 'Good meta description' : score >= 8 ? 'Meta description needs improvement' : 'Poor meta description'

  return result
}

const analyzeContent = (content) => {
  const result = {
    name: 'Content Length',
    score: 0,
    maxScore: 20,
    status: 'error',
    message: '',
    recommendations: []
  }

  if (!content || content.trim().length === 0) {
    result.status = 'error'
    result.message = 'Content is missing'
    result.recommendations.push({
      issue: 'Missing content',
      why: 'Content is essential for SEO and user value',
      how: 'Write comprehensive content for your blog post'
    })
    return result
  }

  let score = 0
  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length

  // Word count check (ideal: 300+ words)
  if (wordCount >= 300) {
    score += 10
  } else if (wordCount >= 150) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Content is too short',
      why: 'Longer content tends to rank better in search results',
      how: 'Aim for at least 300 words for better SEO performance'
    })
  }

  // Paragraph count
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0)
  if (paragraphs.length >= 3) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Content lacks proper paragraph structure',
      why: 'Well-structured content is easier to read and rank',
      how: 'Break your content into multiple paragraphs'
    })
  }

  // Sentence variety
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  if (sentences.length >= 5) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Content lacks sentence variety',
      why: 'Varied sentence structure improves readability',
      how: 'Use a mix of short and long sentences'
    })
  }

  result.score = score
  result.status = score >= 15 ? 'success' : score >= 10 ? 'warning' : 'error'
  result.message = score >= 15 ? 'Good content length' : score >= 10 ? 'Content length needs improvement' : 'Content is too short'

  return result
}

const analyzeHeadings = (content) => {
  const result = {
    name: 'Headings Structure',
    score: 0,
    maxScore: 10,
    status: 'warning',
    message: '',
    recommendations: []
  }

  if (!content) {
    result.status = 'warning'
    result.message = 'No content to analyze headings'
    result.score = 0
    return result
  }

  let score = 0

  // Check for H1 (should be the title, but check if content has headings)
  const hasH1 = /<h1|#{1}\s/.test(content)
  if (hasH1) {
    score += 3
  }

  // Check for H2/H3 structure
  const hasH2 = /<h2|#{2}\s/.test(content)
  const hasH3 = /<h3|#{3}\s/.test(content)

  if (hasH2) {
    score += 4
  } else {
    result.recommendations.push({
      issue: 'Content lacks H2 headings',
      why: 'H2 headings help structure content for readers and search engines',
      how: 'Add H2 headings to organize your content sections'
    })
  }

  if (hasH3) {
    score += 3
  }

  result.score = score
  result.status = score >= 7 ? 'success' : score >= 4 ? 'warning' : 'error'
  result.message = score >= 7 ? 'Good heading structure' : score >= 4 ? 'Heading structure needs improvement' : 'Poor heading structure'

  return result
}

const analyzeMedia = (featuredImage) => {
  const result = {
    name: 'Featured Media',
    score: 0,
    maxScore: 10,
    status: 'error',
    message: '',
    recommendations: []
  }

  if (!featuredImage || featuredImage.trim().length === 0) {
    result.status = 'warning'
    result.message = 'No featured media'
    result.score = 0
    result.recommendations.push({
      issue: 'Missing featured media',
      why: 'Featured images improve engagement and social sharing',
      how: 'Add a relevant featured image to your blog post'
    })
    return result
  }

  let score = 0

  // Has featured image
  score += 7

  // Check if it's a valid URL
  if (featuredImage.startsWith('http') || featuredImage.startsWith('/')) {
    score += 3
  }

  result.score = score
  result.status = score >= 8 ? 'success' : score >= 5 ? 'warning' : 'error'
  result.message = score >= 8 ? 'Good featured media' : 'Featured media present'

  return result
}

const analyzeLinks = (content) => {
  const result = {
    name: 'Internal/External Links',
    score: 0,
    maxScore: 10,
    status: 'warning',
    message: '',
    recommendations: []
  }

  if (!content) {
    result.status = 'warning'
    result.message = 'No content to analyze links'
    result.score = 5
    return result
  }

  let score = 0

  // Check for links
  const linkRegex = /<a\s+href|https?:\/\/[^\s]+/g
  const links = content.match(linkRegex) || []

  if (links.length > 0) {
    score += 5
  }

  // Check for internal links (basic check)
  const hasInternalLinks = links.some(link => link.includes(window?.location?.hostname || ''))
  if (hasInternalLinks) {
    score += 5
  } else if (links.length > 0) {
    result.recommendations.push({
      issue: 'No internal links found',
      why: 'Internal links help users discover more content and improve site structure',
      how: 'Add links to other relevant pages on your website'
    })
  }

  // Too many links warning
  if (links.length > 10) {
    result.recommendations.push({
      issue: 'Too many links in content',
      why: 'Excessive links can dilute SEO and user experience',
      how: 'Limit links to the most relevant and valuable ones'
    })
  }

  result.score = score
  result.status = score >= 8 ? 'success' : score >= 5 ? 'warning' : 'error'
  result.message = score >= 8 ? 'Good link structure' : score >= 5 ? 'Links present' : 'No links found'

  return result
}

const analyzeReadability = (content) => {
  const result = {
    name: 'Readability',
    score: 0,
    maxScore: 10,
    status: 'warning',
    message: '',
    recommendations: []
  }

  if (!content) {
    result.status = 'warning'
    result.message = 'No content to analyze readability'
    result.score = 5
    return result
  }

  let score = 0

  const words = content.split(/\s+/).filter(w => w.length > 0)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)

  if (sentences.length === 0) {
    result.status = 'error'
    result.message = 'No sentences found'
    result.score = 0
    return result
  }

  // Average sentence length (ideal: 15-20 words)
  const avgSentenceLength = words.length / sentences.length
  if (avgSentenceLength >= 10 && avgSentenceLength <= 25) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Average sentence length is not optimal',
      why: 'Sentences between 10-25 words are easier to read',
      how: 'Break long sentences into shorter ones for better readability'
    })
  }

  // Paragraph length check
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0)
  const avgParagraphLength = words.length / (paragraphs.length || 1)
  if (avgParagraphLength <= 100) {
    score += 5
  } else {
    result.recommendations.push({
      issue: 'Paragraphs are too long',
      why: 'Shorter paragraphs improve readability and user engagement',
      how: 'Break long paragraphs into smaller ones'
    })
  }

  result.score = score
  result.status = score >= 8 ? 'success' : score >= 5 ? 'warning' : 'error'
  result.message = score >= 8 ? 'Good readability' : score >= 5 ? 'Readability needs improvement' : 'Poor readability'

  return result
}

const getSEOStatus = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Needs Improvement'
  return 'Poor'
}

export const getSEOStatusColor = (status) => {
  switch (status) {
    case 'Excellent':
      return 'text-green-500'
    case 'Good':
      return 'text-blue-500'
    case 'Needs Improvement':
      return 'text-yellow-500'
    case 'Poor':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export const getSEOStatusBg = (status) => {
  switch (status) {
    case 'Excellent':
      return 'bg-green-500/10 border-green-500/30'
    case 'Good':
      return 'bg-blue-500/10 border-blue-500/30'
    case 'Needs Improvement':
      return 'bg-yellow-500/10 border-yellow-500/30'
    case 'Poor':
      return 'bg-red-500/10 border-red-500/30'
    default:
      return 'bg-gray-500/10 border-gray-500/30'
  }
}
