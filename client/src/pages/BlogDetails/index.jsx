import React, { useEffect, useState, useMemo } from 'react'
import DOMPurify from 'dompurify'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronRight,
  User,
  Sparkles,
  ArrowRight,
  ListFilter,
  CheckCircle2,
  Quote,
  Target,
  ExternalLink,
  Eye
} from 'lucide-react'
import Container from '@components/layout/Container'
import ShareArticle from '@components/blog/ShareArticle'
import SEO from '@components/common/SEO'
import BlogCard from '@components/blog/BlogCard'
import { publicAPI } from '@api/public.api'
import { mediaUrl } from '@utils/media'

function BlogDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState('')

  // Scroll reading progress
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

  // Process and sanitize blog content, extracting Table of Contents and ensuring headings have IDs
  const processedArticle = useMemo(() => {
    if (!blog?.content) return { html: '', toc: [] }

    // Normalize non-breaking spaces and strip Google Docs blue colors and duplicate <u> tags
    const rawContent = blog.content
      .replace(/&nbsp;/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/color:\s*(rgb\(\s*17\s*,\s*85\s*,\s*204\s*\)|#1155cc)[;]?/gi, '')
      .replace(/<u>\s*(<a\b[^>]*>.*?<\/a>)\s*<\/u>/gi, '$1')
      .replace(/(<a\b[^>]*>)\s*<u>(.*?)<\/u>\s*(<\/a>)/gi, '$1$2$3')
      .trim()
    const isHtml = /<[a-z][\s\S]*>/i.test(rawContent)

    let htmlToProcess = rawContent

    if (!isHtml) {
      // Content is Markdown or plain text with newlines
      const lines = rawContent.split('\n')
      const htmlLines = []
      let inList = false
      let listType = null

      lines.forEach((line) => {
        const trimmed = line.trim()
        if (trimmed.startsWith('## ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<h2>${trimmed.replace('## ', '')}</h2>`)
        } else if (trimmed.startsWith('### ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<h3>${trimmed.replace('### ', '')}</h3>`)
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          if (!inList || listType !== 'ul') {
            if (inList) htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
            htmlLines.push('<ul>')
            inList = true
            listType = 'ul'
          }
          const text = trimmed.replace(/^[-*]\s+/, '')
          htmlLines.push(`<li>${text}</li>`)
        } else if (trimmed.match(/^\d+\.\s*/)) {
          if (!inList || listType !== 'ol') {
            if (inList) htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
            htmlLines.push('<ol>')
            inList = true
            listType = 'ol'
          }
          const text = trimmed.replace(/^\d+\.\s*/, '')
          htmlLines.push(`<li>${text}</li>`)
        } else if (trimmed.startsWith('> ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<blockquote><p>${trimmed.replace('> ', '')}</p></blockquote>`)
        } else if (trimmed === '') {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
        } else {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          const formattedLine = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          htmlLines.push(`<p>${formattedLine}</p>`)
        }
      })
      if (inList) {
        htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
      }
      htmlToProcess = htmlLines.join('\n')
    }

    // Extract Headings, wrap tables, and assign anchor IDs using DOMParser
    const headings = []
    let finalHtml = htmlToProcess

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlToProcess, 'text/html')
      const headingElements = doc.querySelectorAll('h1, h2, h3, h4')

      headingElements.forEach((h, index) => {
        const text = h.textContent.trim()
        if (!text) return
        let id = h.getAttribute('id')
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `section-${index + 1}`
          h.setAttribute('id', id)
        }
        // Include h2 and h3 in Table of Contents
        if (h.tagName.toLowerCase() === 'h2' || h.tagName.toLowerCase() === 'h3') {
          headings.push({
            id,
            title: text,
            level: h.tagName.toLowerCase()
          })
        }
      })

      // Ensure all anchor links have single #00A6FF underline, no redundant <u> or dark blue colors
      const links = doc.querySelectorAll('a')
      links.forEach((a) => {
        const href = a.getAttribute('href') || ''
        if (href.startsWith('http') || href.startsWith('//')) {
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noopener noreferrer')
        }
        // Unwrap redundant <u> parent to eliminate secondary blue underline
        if (a.parentElement && a.parentElement.tagName.toLowerCase() === 'u') {
          const u = a.parentElement
          u.parentNode.insertBefore(a, u)
          u.remove()
        }
        // Unwrap redundant <u> child
        const childU = a.querySelector('u')
        if (childU) {
          while (childU.firstChild) {
            childU.parentNode.insertBefore(childU.firstChild, childU)
          }
          childU.remove()
        }
        // Clean any parent style with Google Docs blue
        if (a.parentElement) {
          const pStyle = a.parentElement.getAttribute('style') || ''
          if (pStyle.includes('17, 85, 204') || pStyle.includes('#1155cc')) {
            a.parentElement.setAttribute('style', pStyle.replace(/color:\s*(rgb\(\s*17\s*,\s*85\s*,\s*204\s*\)|#1155cc)[;]?/gi, ''))
          }
        }
      })

      // Wrap tables in responsive wrapper so table columns never truncate or distort
      const tables = doc.querySelectorAll('table')
      tables.forEach((table) => {
        if (!table.parentElement || !table.parentElement.classList.contains('blog-table-responsive')) {
          const wrapper = doc.createElement('div')
          wrapper.className = 'blog-table-responsive'
          table.parentNode.insertBefore(wrapper, table)
          wrapper.appendChild(table)
        }
      })

      finalHtml = doc.body.innerHTML
    } catch (e) {
      console.warn('Error parsing article headings and tables:', e)
    }

    const sanitizedHtml = DOMPurify.sanitize(finalHtml, {
      ADD_TAGS: ['iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div'],
      ADD_ATTR: ['target', 'id', 'class', 'style', 'href', 'src', 'alt', 'width', 'height', 'frameborder', 'allowfullscreen', 'rel']
    })

    return {
      html: sanitizedHtml,
      toc: headings
    }
  }, [blog?.content])

  const tableOfContents = processedArticle.toc

  // Estimated read time
  const estimateReadTime = (content) => {
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

  const featuredImg =
    blog?.featured_image ||
    blog?.image ||
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'

  // Schema Markup
  const articleSchema = blog
    ? {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt || blog.title,
      image: featuredImg,
      datePublished: blog.published_at || blog.created_at || new Date().toISOString(),
      dateModified: blog.updated_at || blog.published_at || blog.created_at || new Date().toISOString(),
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
      <div className="min-h-screen bg-background pt-10 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-5 bg-slate-200 dark:bg-white/10 rounded w-1/4" />
            <div className="h-12 bg-slate-200 dark:bg-white/10 rounded-2xl w-4/5" />
            <div className="h-6 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
            <div className="h-80 bg-slate-200 dark:bg-white/10 rounded-3xl w-full" />
            <div className="space-y-3 pt-6">
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-full" />
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-5/6" />
              <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
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
        <SEO title="Playbook Not Found | Taraj Global" noIndex={true} />
        <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 text-center">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 max-w-md w-full">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary dark:text-white mb-2">
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
        keywords={blog.keywords || `${blog.title}, B2B demand generation, ABM insights, Taraj Global`}
        canonical={`/blog/${slug}`}
        ogTitle={blog.title}
        ogDescription={blog.excerpt || blog.title}
        ogImage={featuredImg}
        ogType="article"
        schemaJson={articleSchema}
      />

      {/* ── STICKY READING PROGRESS BAR ───────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00] origin-left z-50 shadow-xs"
        style={{ scaleX }}
      />

      <div className="bg-background min-h-screen text-text-primary transition-colors duration-300 pb-20">
        {/* ── PREVIEW MODE BANNER ── */}
        {new URLSearchParams(window.location.search).get('preview') === 'true' && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-500 dark:text-amber-400 py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 sticky top-nav z-30 backdrop-blur-md">
            <Eye size={16} />
            <span>Admin Preview Mode &bull; Status: <strong className="uppercase">{blog?.status || 'Draft'}</strong></span>
          </div>
        )}

        {/* ── TOP BREADCRUMB & BACK ACTION ─────────────────────────── */}
        <section className="pt-8 pb-6 lg:pt-10 border-b border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
          <Container>
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">

              {/* Back to Blog */}
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00A6FF] hover:underline cursor-pointer group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>ALL PLAYBOOKS & INSIGHTS</span>
              </button>

              {/* Breadcrumbs */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-tertiary">
                <Link to="/" className="hover:text-text-accent transition-colors">
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link to="/blog" className="hover:text-text-accent transition-colors">
                  Blog
                </Link>
                <ChevronRight size={12} />
                <span className="text-text-primary dark:text-text-primary dark:text-white font-semibold truncate max-w-[200px]">
                  {blog.category_name || 'Playbook'}
                </span>
              </div>

            </div>
          </Container>
        </section>

        {/* ── ARTICLE HERO SECTION ─────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Category Pill & Read Meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] ">
                  {blog.category_name || 'B2B Strategy'}
                </span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Clock size={13} className="text-[#FF6D00]" />
                  <span>{estimateReadTime(blog.content)}</span>
                </span>
                <span className="text-xs font-mono text-text-tertiary hidden sm:inline">•</span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#00A6FF]" />
                  <span>{formatDate(blog.published_at || blog.created_at)}</span>
                </span>
              </div>

              {/* Article Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-text-primary dark:text-text-primary dark:text-white leading-[1.18]">
                {blog.title}
              </h1>

              {/* Article Subtitle Excerpt */}
              {blog.excerpt && (
                <p className="text-sm sm:text-base lg:text-lg text-text-secondary dark:text-[#A7ADB7] leading-relaxed font-normal">
                  {blog.excerpt}
                </p>
              )}

              {/* Author Strip */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  {blog.author_photo ? (
                    <img
                      src={blog.author_photo}
                      alt={blog.author_name || 'Author'}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-[#00A6FF]/40 shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#007AC0] text-text-primary dark:text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {(blog.author_name || 'T').charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-text-primary dark:text-text-primary dark:text-white">
                      {blog.author_name || 'Taraj Global Editorial Team'}
                    </div>
                    <div className="text-xs text-text-tertiary font-mono">
                      {blog.author_designation || 'B2B Revenue Architecture'}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Peer-Reviewed Strategy</span>
                  </span>
                </div>
              </div>

              {/* Featured Cover Image - 100% Clear & Visible */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] my-6 sm:my-8 bg-slate-900">
                <img
                  src={mediaUrl(featuredImg)}
                  alt={blog.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'
                  }}
                  className="w-full h-auto max-h-[520px] aspect-[16/9] object-cover object-center"
                />
              </div>

            </div>
          </Container>
        </section>

        {/* ── 2-COLUMN MAIN CONTENT & SIDEBAR ──────────────────────── */}
        <section className="pb-16">
          <Container>
            <div className={`max-w-6xl mx-auto ${tableOfContents.length > 0 ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start' : 'max-w-4xl'}`}>

              {/* LEFT / CENTER: MAIN ARTICLE CONTENT */}
              <div className={tableOfContents.length > 0 ? 'lg:col-span-8' : 'w-full'}>
                {/* Mobile Collapsible Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="lg:hidden mb-6 p-4 sm:p-5 rounded-2xl bg-surface border border-slate-200/90 dark:border-white/10 shadow-xs">
                    <details className="group">
                      <summary className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-text-primary cursor-pointer list-none select-none">
                        <span className="flex items-center gap-2">
                          <ListFilter size={15} className="text-[#00A6FF]" />
                          <span>TABLE OF CONTENTS ({tableOfContents.length})</span>
                        </span>
                        <span className="text-[#00A6FF] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <nav className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                        {tableOfContents.map((item, idx) => (
                          <a
                            key={`mobile-toc-${item.id || idx}`}
                            href={`#${item.id}`}
                            className="block text-xs text-text-secondary dark:text-[#A7ADB7] hover:text-[#00A6FF] py-1 leading-snug font-medium"
                          >
                            <span className="font-mono text-[10px] text-text-tertiary mr-2">0{idx + 1}.</span>
                            {item.title}
                          </a>
                        ))}
                      </nav>
                    </details>
                  </div>
                )}

                <article className="prose prose-slate dark:prose-invert max-w-none">

                  {/* Executive Key Takeaway Card */}
                  <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 mb-8 shadow-xs not-prose">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] mb-2.5">
                      <Target size={14} />
                      <span>EXECUTIVE SUMMARY // CORE PLAYBOOK TAKEAWAYS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed">
                      {blog.excerpt || 'This playbook details real-world B2B demand generation architectures, qualification criteria, and cold engagement cadences proven across high-growth enterprise pipelines.'}
                    </p>
                  </div>

                  {/* Formatted Article Body */}
                  <div className="blog-article-content text-text-primary dark:text-slate-200 leading-relaxed font-normal">
                    <style>{`
                      .blog-article-content {
                        font-size: 1.0625rem;
                        line-height: 1.85;
                        color: #cbd5e1;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content p {
                        margin-top: 0;
                        margin-bottom: 1.5rem;
                        line-height: 1.85;
                        color: #cbd5e1;
                        text-align: justify;
                        text-justify: inter-word;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content .ql-align-justify,
                      .blog-article-content p.ql-align-justify,
                      .blog-article-content div.ql-align-justify,
                      .blog-article-content h1.ql-align-justify,
                      .blog-article-content h2.ql-align-justify,
                      .blog-article-content h3.ql-align-justify {
                        text-align: justify !important;
                        text-justify: inter-word !important;
                      }
                      .blog-article-content .ql-align-center,
                      .blog-article-content p.ql-align-center,
                      .blog-article-content h1.ql-align-center,
                      .blog-article-content h2.ql-align-center,
                      .blog-article-content h3.ql-align-center {
                        text-align: center !important;
                      }
                      .blog-article-content .ql-align-right,
                      .blog-article-content p.ql-align-right,
                      .blog-article-content h1.ql-align-right,
                      .blog-article-content h2.ql-align-right,
                      .blog-article-content h3.ql-align-right {
                        text-align: right !important;
                      }
                      .blog-article-content .ql-align-left,
                      .blog-article-content p.ql-align-left,
                      .blog-article-content h1.ql-align-left,
                      .blog-article-content h2.ql-align-left,
                      .blog-article-content h3.ql-align-left {
                        text-align: left !important;
                      }
                      .blog-article-content span,
                      .blog-article-content a,
                      .blog-article-content strong,
                      .blog-article-content em,
                      .blog-article-content b,
                      .blog-article-content i,
                      .blog-article-content li {
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h1 {
                        font-size: 2.25rem;
                        font-weight: 800;
                        line-height: 1.25;
                        letter-spacing: -0.025em;
                        margin-top: 2.75rem;
                        margin-bottom: 1.25rem;
                        color: #ffffff;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h2 {
                        font-size: 1.75rem;
                        font-weight: 800;
                        line-height: 1.3;
                        letter-spacing: -0.02em;
                        margin-top: 2.5rem;
                        margin-bottom: 1rem;
                        color: #ffffff;
                        padding-top: 1.25rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        scroll-margin-top: 6rem;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h3 {
                        font-size: 1.35rem;
                        font-weight: 700;
                        line-height: 1.4;
                        letter-spacing: -0.015em;
                        margin-top: 2rem;
                        margin-bottom: 0.75rem;
                        color: #f1f5f9;
                        scroll-margin-top: 6rem;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h4 {
                        font-size: 1.15rem;
                        font-weight: 600;
                        line-height: 1.45;
                        margin-top: 1.5rem;
                        margin-bottom: 0.5rem;
                        color: #f1f5f9;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content strong,
                      .blog-article-content b {
                        font-weight: 700;
                        color: #ffffff;
                      }
                      .blog-article-content em,
                      .blog-article-content i {
                        font-style: italic;
                      }
                      /* Unordered / Bullet Lists */
                      .blog-article-content ul {
                        list-style-type: disc !important;
                        margin: 1rem 0 1.5rem 0 !important;
                        padding-left: 1.75rem !important;
                      }
                      .blog-article-content ul li {
                        list-style-type: disc !important;
                        margin-bottom: 0.625rem;
                        line-height: 1.75;
                        color: #cbd5e1;
                      }
                      /* Ordered Lists */
                      .blog-article-content ol {
                        list-style-type: decimal !important;
                        margin: 1rem 0 1.5rem 0 !important;
                        padding-left: 1.75rem !important;
                      }
                      .blog-article-content ol li {
                        list-style-type: decimal !important;
                        margin-bottom: 0.625rem;
                        line-height: 1.75;
                        color: #cbd5e1;
                      }
                      /* Hyperlinks: ONLY ONE #00A6FF UNDERLINE */
                      .blog-article-content a {
                        color: #00A6FF !important;
                        text-decoration: underline !important;
                        text-decoration-color: #00A6FF !important;
                        text-decoration-thickness: 1.5px;
                        text-underline-offset: 3px;
                        font-weight: 500;
                        transition: opacity 0.2s ease, text-shadow 0.2s ease;
                        display: inline;
                      }
                      .blog-article-content a:hover {
                        opacity: 0.85;
                        text-shadow: 0 0 10px rgba(0, 166, 255, 0.45);
                      }
                      /* Remove any secondary underline from nested or parent tags */
                      .blog-article-content a *,
                      .blog-article-content a u,
                      .blog-article-content u:has(a),
                      .blog-article-content em:has(a),
                      .blog-article-content span:has(a) {
                        text-decoration: none !important;
                        color: #00A6FF !important;
                      }
                      /* Blockquotes */
                      .blog-article-content blockquote {
                        margin: 1.75rem 0;
                        padding: 1.25rem 1.5rem;
                        border-left: 4px solid #00A6FF;
                        background: rgba(0, 166, 255, 0.05);
                        border-radius: 0 1rem 1rem 0;
                        color: #e2e8f0;
                        font-style: italic;
                      }
                      .blog-article-content blockquote p {
                        margin-bottom: 0;
                      }
                      /* Tables & Responsive Wrapper */
                      .blog-article-content .blog-table-responsive {
                        width: 100%;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        margin: 2rem 0;
                        border-radius: 0.875rem;
                        border: 1px solid #334155;
                        background: rgba(15, 23, 42, 0.4);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                      }
                      .blog-article-content table {
                        width: 100%;
                        min-width: 620px;
                        border-collapse: collapse;
                        margin: 0 !important;
                        border: none !important;
                      }
                      .blog-article-content th,
                      .blog-article-content td {
                        border: 1px solid #334155;
                        padding: 12px 18px;
                        text-align: left;
                        vertical-align: top;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                        white-space: normal !important;
                        line-height: 1.6;
                      }
                      .blog-article-content th {
                        background-color: #1e293b;
                        color: #ffffff;
                        font-weight: 700;
                        font-size: 0.95rem;
                        letter-spacing: 0.01em;
                        white-space: nowrap;
                      }
                      .blog-article-content tr:nth-child(even) td {
                        background-color: rgba(15, 23, 42, 0.6);
                      }
                      .blog-article-content tr:nth-child(odd) td {
                        background-color: rgba(30, 41, 59, 0.35);
                      }
                      /* Light mode adjustments */
                      html:not(.dark) .blog-article-content {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content p {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content h1,
                      html:not(.dark) .blog-article-content h2,
                      html:not(.dark) .blog-article-content h3,
                      html:not(.dark) .blog-article-content h4,
                      html:not(.dark) .blog-article-content strong {
                        color: #0f172a;
                      }
                      html:not(.dark) .blog-article-content ul li,
                      html:not(.dark) .blog-article-content ol li {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content a {
                        color: #007bb5 !important;
                      }
                      html:not(.dark) .blog-article-content blockquote {
                        border-left-color: #00A6FF;
                        background: rgba(0, 166, 255, 0.06);
                        color: #1e293b;
                      }
                      html:not(.dark) .blog-article-content table,
                      html:not(.dark) .blog-article-content th,
                      html:not(.dark) .blog-article-content td {
                        border-color: #e2e8f0;
                      }
                      html:not(.dark) .blog-article-content th {
                        background-color: #f1f5f9;
                        color: #0f172a;
                      }
                      html:not(.dark) .blog-article-content tr:nth-child(even) td {
                        background-color: #ffffff;
                      }
                      html:not(.dark) .blog-article-content tr:nth-child(odd) td {
                        background-color: #f8fafc;
                      }
                    `}</style>
                    <div dangerouslySetInnerHTML={{ __html: processedArticle.html }} />
                  </div>

                  {/* Share This Article Section */}
                  <ShareArticle title={blog.title} />

                </article>
              </div>

              {/* RIGHT: STICKY EDITORIAL SIDEBAR (Only rendered on desktop) */}
              {tableOfContents.length > 0 && (
                <aside className="hidden lg:block lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                  <div className="p-6 rounded-3xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-tertiary pb-3 mb-4 border-b border-slate-100 dark:border-white/5">
                      <ListFilter size={14} className="text-[#00A6FF]" />
                      <span>TABLE OF CONTENTS</span>
                    </div>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, idx) => (
                        <a
                          key={item.id || idx}
                          href={`#${item.id}`}
                          className="block text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] hover:text-[#00A6FF] dark:hover:text-[#00A6FF] transition-colors py-1 leading-snug font-medium"
                        >
                          <span className="font-mono text-[10px] text-text-tertiary mr-2">
                            0{idx + 1}.
                          </span>
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}

            </div>
          </Container>
        </section>

        {/* ── RELATED ARTICLES / NEXT READS ─────────────────────────── */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200/80 dark:border-white/5">
            <Container>
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00A6FF]">
                      MORE FROM THE KNOWLEDGE HUB
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary dark:text-white mt-1">
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
              </div>
            </Container>
          </section>
        )}

      </div>
    </>
  )
}

export default BlogDetails
