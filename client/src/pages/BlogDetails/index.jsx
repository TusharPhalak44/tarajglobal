import React, { useEffect, useState, useMemo } from 'react'
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
import ChatBot from '@components/chatbot/ChatBot'
import BlogCard from '@components/blog/BlogCard'
import { publicAPI } from '@api/public.api'

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

  // Extract Table of Contents (TOC) from content
  const tableOfContents = useMemo(() => {
    if (!blog?.content) return []
    const headings = []
    const lines = blog.content.split('\n')
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim()
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        headings.push({ id, title })
      }
    })
    return headings
  }, [blog])

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

  // Formatted content parser
  const renderFormattedContent = (content) => {
    if (!content) return null

    const lines = content.split('\n')
    return lines.map((line, index) => {
      const trimmed = line.trim()

      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '')
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return (
          <h2
            key={index}
            id={id}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary dark:text-white mt-12 mb-4 pt-6 border-t border-slate-100 dark:border-white/5 scroll-mt-28"
          >
            {text}
          </h2>
        )
      } else if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '')
        return (
          <h3
            key={index}
            className="text-xl sm:text-2xl font-bold text-text-primary dark:text-slate-100 mt-8 mb-3"
          >
            {text}
          </h3>
        )
      } else if (trimmed.startsWith('> ')) {
        const quote = trimmed.replace('> ', '')
        return (
          <div
            key={index}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-[#00A6FF]/[0.05] dark:bg-[#00A6FF]/[0.08] border-l-4 border-[#00A6FF] italic text-text-primary dark:text-slate-200 text-sm sm:text-base leading-relaxed flex items-start gap-3"
          >
            <Quote size={20} className="text-[#00A6FF] shrink-0 mt-0.5 not-italic" />
            <span>{quote}</span>
          </div>
        )
      } else if (trimmed.startsWith('- ')) {
        const rawText = trimmed.replace('- ', '')
        const parts = rawText.split(':')
        return (
          <li key={index} className="text-text-secondary dark:text-[#CBD5E1] ml-6 mb-2.5 list-disc leading-relaxed text-sm sm:text-base">
            {parts.length > 1 ? (
              <>
                <strong className="text-text-primary dark:text-white font-bold">{parts[0]}:</strong>
                {parts.slice(1).join(':')}
              </>
            ) : (
              rawText
            )}
          </li>
        )
      } else if (trimmed.match(/^\d+\.\s*/)) {
        const rawText = trimmed.replace(/^\d+\.\s*/, '')
        const parts = rawText.split(':')
        return (
          <li key={index} className="text-text-secondary dark:text-[#CBD5E1] ml-6 mb-2.5 list-decimal leading-relaxed text-sm sm:text-base">
            {parts.length > 1 ? (
              <>
                <strong className="text-text-primary dark:text-white font-bold">{parts[0]}:</strong>
                {parts.slice(1).join(':')}
              </>
            ) : (
              rawText
            )}
          </li>
        )
      } else if (trimmed === '') {
        return <div key={index} className="h-3" />
      } else {
        const html = trimmed.replace(
          /\*\*(.*?)\*\*/g,
          '<strong class="text-text-primary dark:text-white font-bold">$1</strong>'
        )
        return (
          <p
            key={index}
            className="text-text-secondary dark:text-[#A7ADB7] mb-5 leading-relaxed text-sm sm:text-base lg:text-[17px] font-normal"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      }
    })
  }

  // Schema Markup
  const articleSchema = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt || blog.title,
        image: featuredImg,
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
          <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-500 dark:text-amber-400 py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 sticky top-0 z-40 backdrop-blur-md">
            <Eye size={16} />
            <span>Admin Preview Mode &bull; Status: <strong className="uppercase">{blog?.status || 'Draft'}</strong></span>
          </div>
        )}
        
        {/* ── TOP BREADCRUMB & BACK ACTION ─────────────────────────── */}
        <section className="pt-24 pb-6 lg:pt-28 border-b border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
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
          </Container>
        </section>

        {/* ── ARTICLE HERO SECTION ─────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Category Pill & Read Meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/25 shadow-xs">
                  {blog.category_name || 'B2B Strategy'}
                </span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Clock size={13} className="text-[#FF6D00]" />
                  <span>{estimateReadTime(blog.content)}</span>
                </span>
                <span className="text-xs font-mono text-text-tertiary hidden sm:inline">•</span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#00A6FF]" />
                  <span>{formatDate(blog.created_at)}</span>
                </span>
              </div>

              {/* Article Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-text-primary dark:text-white leading-[1.18]">
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#007AC0] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {(blog.author_name || 'T').charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-text-primary dark:text-white">
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

              {/* Featured Cover Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] my-6 sm:my-8">
                <img
                  src={featuredImg}
                  alt={blog.title}
                  onError={(e) => {
                    if (featuredImg && typeof featuredImg === 'string' && featuredImg.startsWith('/uploads') && !e.currentTarget.src.includes(':5000')) {
                      e.currentTarget.src = `http://localhost:5000${featuredImg}`
                      return
                    }
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'
                  }}
                  className="w-full h-52 min-[375px]:h-64 sm:h-96 lg:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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
                  <div className="text-text-primary dark:text-slate-200 leading-relaxed font-normal overflow-hidden break-words">
                    {renderFormattedContent(blog.content)}
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
                          className="block text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] hover:text-[#00A6FF] dark:hover:text-[#00E5FF] transition-colors py-1 leading-snug font-medium"
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
              </div>
            </Container>
          </section>
        )}

        <ChatBot />
      </div>
    </>
  )
}

export default BlogDetails
