import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Quote,
  Target,
  Eye,
  Check,
  Link2,
  TrendingUp,
  Layers,
  Video,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react'
import Container from '@components/layout/Container'
import ShareArticle from '@components/blog/ShareArticle'
import SEO from '@components/common/SEO'
import ChatBot from '@components/chatbot/ChatBot'
import BlogCard from '@components/blog/BlogCard'
import { publicAPI } from '@api/public.api'
import { parseVideoInfo, parsePdfInfo, resolveMediaUrl } from '@utils/mediaHelper'

// Helper to resolve author profile photo with fallback
const resolveAuthorPhoto = (photo) => {
  if (!photo) return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&q=80'
  if (photo.startsWith('http://') || photo.startsWith('https://')) return photo
  if (photo.startsWith('/images/author') || photo.includes('author1') || photo.includes('author2')) {
    return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&q=80'
  }
  if (photo.startsWith('/uploads')) {
    const apiHost = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'
    return `${apiHost}${photo}`
  }
  return photo
}

function BlogDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Scroll reading progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError(null)
      const searchParams = new URLSearchParams(window.location.search)
      const isPreview = searchParams.get('preview') === 'true'
      const response = await publicAPI.getBlogBySlug(slug, isPreview ? { preview: 'true' } : undefined)
      const currentBlog = response?.data?.data
      setBlog(currentBlog)

      // Fetch related blogs (latest 3 excluding current)
      try {
        const relatedRes = await publicAPI.getBlogs({ limit: 4 })
        const all = relatedRes?.data?.data || []
        setRelatedBlogs(all.filter((b) => b.slug !== slug).slice(0, 3))
      } catch (relErr) {
        console.warn('Could not load related blogs:', relErr)
      }
    } catch (err) {
      console.error('Failed to fetch blog:', err)
      setError('Article not found or could not be loaded.')
    } finally {
      setLoading(false)
    }
  }

  // Clean raw content: remove duplicate title at line 1, FAQ section, and SEO meta keywords
  const cleanedContent = useMemo(() => {
    if (!blog?.content) return ''
    let text = blog.content.trim()

    // If starts with identical title, strip it so it is not repeated
    if (blog.title && text.toLowerCase().startsWith(blog.title.toLowerCase().trim())) {
      text = text.slice(blog.title.length).trim()
    }

    // Strip FAQ section completely as requested
    if (text.includes('## Frequently Asked Questions')) {
      text = text.split('## Frequently Asked Questions')[0].trim()
    } else if (text.includes('Frequently Asked Questions')) {
      text = text.split('Frequently Asked Questions')[0].trim()
    }

    // Strip trailing SEO keyword lines if present
    text = text.replace(/Primary SEO keyword:.*$/gmi, '')
    text = text.replace(/Secondary keywords:.*$/gmi, '')

    return text.trim()
  }, [blog])

  // Copy article link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Estimated read time
  const estimateReadTime = (content) => {
    if (blog?.reading_time) return `${blog.reading_time} min read`
    if (!content) return '5 min read'
    const words = content.trim().split(/\s+/).length
    const minutes = Math.max(3, Math.ceil(words / 200))
    return `${minutes} min read`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently Published'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Detect if featured media is a video (YouTube, Vimeo, or direct MP4/WebM) or a PDF
  const rawFeaturedMedia = blog?.featured_image || blog?.image
  const featuredVideoInfo = useMemo(() => parseVideoInfo(rawFeaturedMedia), [rawFeaturedMedia])
  const featuredPdfInfo = useMemo(() => parsePdfInfo(rawFeaturedMedia), [rawFeaturedMedia])
  const featuredImg = resolveMediaUrl(rawFeaturedMedia) || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'
  const authorImg = resolveAuthorPhoto(blog?.author_photo)

  // Format inline text (supports **bold** and [markdown links](url))
  const formatInlineText = (text) => {
    if (!text) return ''
    let html = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-text-primary dark:text-white font-bold">$1</strong>'
    )
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#00A6FF] hover:underline font-semibold inline-flex items-center gap-0.5">$1</a>'
    )
    return html
  }

  // Universal content parser: Handles Markdown, plain text, embedded videos, and PDF resources
  const renderFormattedContent = (content) => {
    if (!content) return null

    const rawLines = content.split('\n')
    const elements = []
    let inListGroup = false

    rawLines.forEach((line, index) => {
      const trimmed = line.trim()

      if (trimmed === '') {
        inListGroup = false
        elements.push({ type: 'spacer', key: `space-${index}` })
        return
      }

      // 0. Check for inline video embeds in content (YouTube, Vimeo, or MP4)
      const inlineVideo = parseVideoInfo(trimmed)
      if (inlineVideo) {
        inListGroup = false
        elements.push({ type: 'inline-video', video: inlineVideo, key: `video-${index}` })
        return
      }

      // 0.1 Check for inline PDF documents or downloads in content
      const inlinePdf = parsePdfInfo(trimmed)
      if (inlinePdf) {
        inListGroup = false
        elements.push({ type: 'inline-pdf', pdf: inlinePdf, key: `pdf-${index}` })
        return
      }

      // 1. Explicit Markdown H2 Headings
      if (trimmed.startsWith('## ')) {
        inListGroup = false
        const text = trimmed.replace('## ', '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        elements.push({ type: 'h2', text, id, key: `h2-${index}` })
        return
      }

      // 2. Explicit Markdown H3 Headings / Step phases
      if (trimmed.startsWith('### ')) {
        inListGroup = false
        const text = trimmed.replace('### ', '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        const stepMatch = text.match(/^(\d+)\.\s*(.*)/)
        if (stepMatch) {
          elements.push({
            type: 'step',
            number: stepMatch[1],
            title: stepMatch[2],
            id,
            key: `step-${index}`
          })
        } else {
          elements.push({ type: 'h3', text, id, key: `h3-${index}` })
        }
        return
      }

      // 3. Blockquotes / Callout Highlights
      if (trimmed.startsWith('> ')) {
        inListGroup = false
        const quote = trimmed.replace('> ', '')
        elements.push({ type: 'quote', text: quote, key: `quote-${index}` })
        return
      }

      // 4. Explicit Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        inListGroup = true
        const rawText = trimmed.replace(/^[-*•]\s*/, '')
        elements.push({ type: 'list-item', text: rawText, key: `list-${index}` })
        return
      }

      // 5. Numbered lists
      if (trimmed.match(/^\d+\.\s*/)) {
        inListGroup = false
        const rawText = trimmed.replace(/^\d+\.\s*/, '')
        elements.push({ type: 'num-item', text: rawText, key: `num-${index}` })
        return
      }

      // 6. Journey Flow Lines with Arrows (e.g. Awareness → Engagement → Interest → ...)
      if (trimmed.includes('→') || trimmed.includes('->')) {
        inListGroup = false
        const steps = trimmed.split(/→|->/).map((s) => s.trim()).filter(Boolean)
        elements.push({ type: 'journey-flow', steps, key: `journey-${index}` })
        return
      }

      // 7. Taraj Global in-article brand CTA highlight
      if (trimmed.includes('Taraj Global') && (trimmed.includes('demand generation') || trimmed.includes('lead generation') || trimmed.includes('pipeline') || trimmed.includes('combines'))) {
        inListGroup = false
        elements.push({ type: 'brand-highlight', text: trimmed, key: `brand-${index}` })
        return
      }

      // 8. Implicit Headings (for plain text blogs without ##)
      const isHeaderQuestion = trimmed.endsWith('?') && trimmed.length < 80
      const isKnownHeader = /^(What Is|Why|How|Building|Demand Generation vs|Common|Final Thoughts|Step \d+:|Define Your|Create Educational|Distribute the|Connect Demand|Qualify and)/i.test(trimmed) && trimmed.length < 75 && !trimmed.endsWith('.')
      
      if (isHeaderQuestion || isKnownHeader) {
        inListGroup = false
        const id = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        elements.push({ type: 'h2', text: trimmed, id, key: `h2-auto-${index}` })
        return
      }

      // 9. Lead-in lines that precede a list (ends with a colon, e.g. "It can include:", "Identify:")
      if (trimmed.endsWith(':') && trimmed.length < 70) {
        inListGroup = true
        elements.push({ type: 'lead-in', text: trimmed, key: `leadin-${index}` })
        return
      }

      // 10. Implicit list items under an active list lead-in
      if (inListGroup && trimmed.length < 70 && !trimmed.endsWith('.') && !trimmed.endsWith('?')) {
        elements.push({ type: 'list-item', text: trimmed, key: `list-auto-${index}` })
        return
      }

      // Fallback: normal paragraph
      inListGroup = false
      elements.push({ type: 'p', text: trimmed, key: `p-${index}` })
    })

    return (
      <div className="space-y-4">
        {elements.map((el) => {
          if (el.type === 'inline-video') {
            return (
              <div key={el.key} className="my-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-xl aspect-video w-full bg-black">
                {el.video.type === 'direct' ? (
                  <video
                    src={el.video.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support playing this video.
                  </video>
                ) : (
                  <iframe
                    src={el.video.embedUrl}
                    title="Embedded Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            )
          }

          if (el.type === 'inline-pdf') {
            return (
              <div
                key={el.key}
                className="my-8 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/90 dark:bg-white/[0.03] border border-red-500/25 dark:border-red-500/35 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                    <FileText size={24} className="text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/15 text-red-500 dark:text-red-400 border border-red-500/30">
                        PDF DOCUMENT
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-text-primary dark:text-white truncate">
                      {el.pdf.title || el.pdf.fileName}
                    </h4>
                    <p className="text-xs text-text-tertiary font-mono truncate max-w-[300px] sm:max-w-md">
                      {el.pdf.fileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <a
                    href={el.pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-xs font-semibold text-text-primary dark:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>View PDF</span>
                  </a>
                  <a
                    href={el.pdf.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#00A6FF] hover:bg-[#0088D6] text-xs font-bold text-white transition-colors shadow-md shadow-[#00A6FF]/25"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            )
          }

          if (el.type === 'h2') {
            return (
              <div key={el.key} className="pt-8 sm:pt-10 first:pt-0">
                <h2
                  id={el.id}
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary dark:text-white pb-3 border-b border-slate-200/80 dark:border-white/10 scroll-mt-28 flex items-center gap-3"
                >
                  <span className="w-1.5 h-6 rounded-full bg-[#00A6FF]" />
                  <span>{el.text}</span>
                </h2>
              </div>
            )
          }

          if (el.type === 'step') {
            return (
              <div key={el.key} id={el.id} className="pt-6 sm:pt-8 scroll-mt-28">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30">
                    STEP 0{el.number}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-slate-100">
                  {el.title}
                </h3>
              </div>
            )
          }

          if (el.type === 'h3') {
            return (
              <h3
                key={el.key}
                id={el.id}
                className="text-xl sm:text-2xl font-bold text-text-primary dark:text-slate-100 pt-6 scroll-mt-28"
              >
                {el.text}
              </h3>
            )
          }

          if (el.type === 'quote') {
            return (
              <div
                key={el.key}
                className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#00A6FF]/[0.08] via-[#00A6FF]/[0.03] to-transparent border-l-4 border-[#00A6FF] italic text-text-primary dark:text-slate-200 text-base sm:text-lg leading-relaxed flex items-start gap-4 shadow-xs"
              >
                <Quote size={24} className="text-[#00A6FF] shrink-0 mt-1 not-italic" />
                <span>{el.text}</span>
              </div>
            )
          }

          if (el.type === 'lead-in') {
            return (
              <p key={el.key} className="text-text-primary dark:text-white font-semibold text-base sm:text-[17px] mt-4 mb-2">
                {el.text}
              </p>
            )
          }

          if (el.type === 'list-item') {
            const formatted = formatInlineText(el.text)
            return (
              <div key={el.key} className="flex items-start gap-3 py-1">
                <div className="w-5 h-5 rounded-full bg-[#00A6FF]/15 text-[#00A6FF] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={13} className="text-[#00A6FF]" />
                </div>
                <div
                  className="text-text-secondary dark:text-slate-300 leading-relaxed text-base sm:text-[17px] font-normal"
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              </div>
            )
          }

          if (el.type === 'num-item') {
            const formatted = formatInlineText(el.text)
            return (
              <div key={el.key} className="flex items-start gap-3 py-1">
                <div className="w-2 h-2 rounded-full bg-[#00A6FF] shrink-0 mt-2.5" />
                <div
                  className="text-text-secondary dark:text-slate-300 leading-relaxed text-base sm:text-[17px] font-normal"
                  dangerouslySetInnerHTML={{ __html: formatted }}
                />
              </div>
            )
          }

          if (el.type === 'journey-flow') {
            return (
              <div key={el.key} className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] mb-3">
                  <Layers size={14} />
                  <span>CONNECTED REVENUE PIPELINE JOURNEY</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {el.steps.map((st, i) => (
                    <React.Fragment key={i}>
                      <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm font-semibold text-text-primary dark:text-white shadow-xs">
                        {st}
                      </span>
                      {i < el.steps.length - 1 && (
                        <span className="text-[#00A6FF] font-bold text-sm">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )
          }

          if (el.type === 'brand-highlight') {
            return (
              <div key={el.key} className="my-8 p-6 rounded-2xl bg-[#00A6FF]/[0.06] border border-[#00A6FF]/30 text-text-primary dark:text-slate-200 leading-relaxed text-base sm:text-lg flex items-start gap-4">
                <Sparkles size={20} className="text-[#00A6FF] shrink-0 mt-1" />
                <div>{el.text}</div>
              </div>
            )
          }

          if (el.type === 'p') {
            const html = formatInlineText(el.text)
            return (
              <p
                key={el.key}
                className="text-text-secondary dark:text-slate-300 mb-4 leading-relaxed sm:leading-[1.8] text-base sm:text-[17px] font-normal"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )
          }

          return null
        })}
      </div>
    )
  }

  // Schema Markup
  const articleSchema = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt || blog.title,
        image: featuredVideoInfo?.thumbnailUrl || featuredImg,
        datePublished: blog.created_at || new Date().toISOString(),
        dateModified: blog.updated_at || blog.created_at || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: blog.author_name || 'Taraj Global Editorial Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Taraj Global',
          url: 'https://tarajglobal.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://tarajglobal.com/OnlyTG-%203.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://tarajglobal.com/blog/${slug}`
        }
      }
    : null

  // ── LOADING STATE ──
  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-20">
        <Container maxWidth="max-w-4xl">
          <div className="space-y-6 animate-pulse">
            <div className="h-5 bg-slate-200 dark:bg-white/10 rounded w-1/4" />
            <div className="h-12 bg-slate-200 dark:bg-white/10 rounded-2xl w-4/5" />
            <div className="h-6 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
            <div className="h-96 bg-slate-200 dark:bg-white/10 rounded-3xl w-full" />
            <div className="space-y-4 pt-8">
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-4/6" />
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // ── ERROR OR NOT FOUND ──
  if (error || !blog) {
    return (
      <>
        <SEO title="Article Not Found | Taraj Global" noIndex={true} />
        <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 text-center">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 max-w-md w-full">
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-2">
              Article Not Found
            </h2>
            <p className="text-sm text-text-secondary dark:text-[#A7ADB7] mb-6">
              {error || 'The B2B marketing playbook you are looking for has been archived or moved.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00A6FF] text-white text-xs font-bold hover:bg-[#0088D6] transition-colors cursor-pointer shadow-md shadow-[#00A6FF]/25"
            >
              <ArrowLeft size={15} />
              <span>Back to Knowledge Hub</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title={`${blog.title} | B2B Strategy & Insights | Taraj Global`}
        description={blog.excerpt || blog.title}
        keywords={blog.seo_keywords || `${blog.title}, B2B demand generation, ABM insights, Taraj Global`}
        canonical={`/blog/${slug}`}
        ogTitle={blog.title}
        ogDescription={blog.excerpt || blog.title}
        ogImage={featuredVideoInfo?.thumbnailUrl || featuredImg}
        ogType="article"
        schemaJson={articleSchema}
      />

      {/* ── TOP READING PROGRESS BAR ──────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00] origin-left z-50 shadow-xs"
        style={{ scaleX }}
      />

      <div className="bg-background min-h-screen text-text-primary transition-colors duration-300 pb-20">
        {/* ── PREVIEW MODE BANNER ── */}
        {new URLSearchParams(window.location.search).get('preview') === 'true' && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-500 dark:text-amber-400 py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 sticky top-0 z-40 backdrop-blur-md">
            <Eye size={16} />
            <span>Admin Preview Mode &bull; Status: <strong className="uppercase">{blog?.status || 'Draft'}</strong></span>
          </div>
        )}

        {/* ── CLEAN CENTERED ARTICLE CONTAINER (PERFECTLY ALIGNED) ── */}
        <Container maxWidth="max-w-4xl">
          
          {/* ── BREADCRUMBS & TOP BAR ──────────────────────────────── */}
          <div className="pt-24 sm:pt-28 pb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/5">
            {/* Back to Blog */}
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00A6FF] hover:underline cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>ALL PLAYBOOKS & INSIGHTS</span>
            </button>

            {/* Breadcrumb Links */}
            <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
              <Link to="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link to="/blog" className="hover:text-text-primary transition-colors">
                Blog
              </Link>
              <ChevronRight size={12} />
              <span className="text-text-primary dark:text-white font-semibold truncate max-w-[200px]">
                {blog.category_name || 'Playbook'}
              </span>
            </div>
          </div>

          {/* ── ARTICLE HERO SECTION ───────────────────────────────── */}
          <header className="py-8 sm:py-10 space-y-6">
            {/* Category Pill & Reading Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/25 shadow-xs">
                {featuredVideoInfo ? (
                  <Video size={13} className="text-[#00A6FF]" />
                ) : featuredPdfInfo ? (
                  <FileText size={13} className="text-red-500" />
                ) : null}
                <span>{featuredPdfInfo ? 'PDF PLAYBOOK' : (blog.category_name || 'B2B Strategy')}</span>
              </span>
              <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                <Clock size={13} className="text-[#FF6D00]" />
                <span>
                  {featuredVideoInfo
                    ? 'Watch Video'
                    : featuredPdfInfo
                    ? 'Interactive PDF Document'
                    : estimateReadTime(cleanedContent)}
                </span>
              </span>
              <span className="text-xs font-mono text-text-tertiary hidden sm:inline">•</span>
              <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                <Calendar size={13} className="text-[#00A6FF]" />
                <span>{formatDate(blog.created_at)}</span>
              </span>
            </div>

            {/* Article Main Headline (H1) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary dark:text-white leading-[1.18]">
              {blog.title}
            </h1>

            {/* Article Subtitle Excerpt */}
            {blog.excerpt && (
              <p className="text-lg sm:text-xl text-text-secondary dark:text-slate-300 leading-relaxed font-normal">
                {blog.excerpt}
              </p>
            )}

            {/* Author & Header Actions Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3.5">
                <img
                  src={authorImg}
                  alt={blog.author_name || 'Author'}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&q=80'
                  }}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#00A6FF]/40 shadow-xs"
                />
                <div>
                  <div className="text-sm font-bold text-text-primary dark:text-white flex items-center gap-1.5">
                    <span>{blog.author_name || 'Taraj Global Team'}</span>
                    <span className="text-xs font-normal text-text-tertiary">/</span>
                    <span className="text-xs font-normal text-text-secondary dark:text-slate-400">
                      {blog.author_designation || 'Strategy Lead'}
                    </span>
                  </div>
                  <div className="text-xs text-[#00A6FF] font-mono font-medium">
                    Taraj Global Editorial Team
                  </div>
                </div>
              </div>

              {/* Verified Badge & Fast Share */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Peer-Reviewed Strategy</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-semibold text-text-secondary transition-colors cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Link2 size={14} />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Featured Cover Media (Video Player, PDF Viewer, or Cover Image) */}
            {featuredVideoInfo ? (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] mt-6 aspect-video w-full bg-black">
                {featuredVideoInfo.type === 'direct' ? (
                  <video
                    src={featuredVideoInfo.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={featuredVideoInfo.embedUrl}
                    title={blog.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            ) : featuredPdfInfo ? (
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] mt-6 bg-slate-900 text-white">
                {/* PDF Header Action Bar */}
                <div className="px-5 py-3.5 bg-slate-950/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                      <FileText size={20} className="text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                          PDF PLAYBOOK
                        </span>
                        <span className="text-xs font-medium text-slate-300 truncate max-w-[260px] sm:max-w-md">
                          {featuredPdfInfo.fileName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Interactive Document &bull; Taraj Global Research
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={featuredPdfInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>Open Fullscreen</span>
                    </a>
                    <a
                      href={featuredPdfInfo.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#00A6FF] hover:bg-[#0088D6] text-xs font-bold text-white transition-colors shadow-md shadow-[#00A6FF]/25 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>

                {/* PDF Embedded Iframe */}
                <div className="relative w-full h-[520px] sm:h-[650px] bg-slate-900">
                  <iframe
                    src={`${featuredPdfInfo.url}#view=FitH`}
                    title={blog.title}
                    className="w-full h-full border-0 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] mt-6">
                <img
                  src={featuredImg}
                  alt={blog.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'
                  }}
                  className="w-full h-64 sm:h-96 md:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </header>

          {/* ── MAIN ARTICLE CANVAS (CENTERED, CLEAN READ) ─────────── */}
          <main className="py-6 sm:py-10">
            <article>
              {/* Executive Key Takeaways Card (if excerpt exists) */}
              {blog.excerpt && (
                <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 mb-8 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] mb-2.5">
                    <Target size={15} />
                    <span>EXECUTIVE SUMMARY // CORE PLAYBOOK TAKEAWAYS</span>
                  </div>
                  <p className="text-sm sm:text-base text-text-secondary dark:text-slate-300 leading-relaxed font-normal">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              {/* Formatted Article Body */}
              <div className="text-text-primary dark:text-slate-200 leading-relaxed font-normal">
                {renderFormattedContent(cleanedContent)}
              </div>

              {/* 1. Share Option immediately after the blog */}
              <div className="mt-10">
                <ShareArticle title={blog.title} />
              </div>

            </article>
          </main>

        </Container>

        {/* ── 2. RECOMMENDED NEXT READS (AFTER SHARE OPTION) ─────────── */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200/80 dark:border-white/5 mt-10">
            <Container maxWidth="max-w-6xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00A6FF]">
                    MORE FROM THE KNOWLEDGE HUB
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-white mt-1">
                    Recommended Next Reads
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/blog')}
                  className="text-xs font-mono font-bold text-[#00A6FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((item, idx) => (
                  <BlogCard
                    key={item.id || item.slug || idx}
                    blog={item}
                    index={idx}
                    onReadMore={(b) => navigate(`/blog/${b.slug}`)}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── 3. ACCELERATE YOUR SALES PIPELINE (AFTER RECOMMENDED NEXT READS) ── */}
        <section className="py-14 border-t border-slate-200/80 dark:border-white/5">
          <Container maxWidth="max-w-6xl">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#071322] to-[#041a2e] text-white border border-[#00A6FF]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A6FF]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/20 text-[#00E5FF] border border-[#00A6FF]/30">
                    <TrendingUp size={13} />
                    <span>FREE STRATEGY AUDIT</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Accelerate Your Sales Pipeline
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Get 50 verified ICP decision-maker contacts and an outbound acquisition blueprint tailored to your market.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#007AC0] text-white font-bold text-sm sm:text-base hover:shadow-xl hover:shadow-[#00A6FF]/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <ChatBot />
      </div>
    </>
  )
}

export default BlogDetails
