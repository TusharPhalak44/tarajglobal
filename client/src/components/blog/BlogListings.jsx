import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  TrendingUp,
  BookOpen,
  Clock
} from 'lucide-react'
import Container from '@components/layout/Container'
import BlogCard from './BlogCard'
import { publicAPI } from '@api/public.api'

const BlogListings = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicAPI.getBlogs({ limit: 50 })
      const data = response?.data?.data || []
      setBlogs(data)
    } catch (err) {
      console.error('Failed to fetch blogs:', err)
      setError('Unable to load articles right now. Please check back shortly.')
    } finally {
      setLoading(false)
    }
  }

  const handleReadMore = (blog) => {
    if (blog?.slug) {
      navigate(`/blog/${blog.slug}`)
    }
  }

  return (
    <div className="bg-background text-text-primary transition-colors duration-300">
      
      {/* ── 1. PROFESSIONAL EDITORIAL HERO SECTION ────────────────────── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-slate-200/80 dark:border-white/5 bg-gradient-to-b from-slate-50/60 via-background to-background">
        
        {/* Subtle Ambient Background Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00A6FF]/15 via-[#00E5FF]/10 to-transparent rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            
            {/* Professional Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A6FF]/10 border border-[#00A6FF]/25 shadow-xs"
            >
              <Sparkles size={13} className="text-[#00A6FF]" />
              <span className="font-mono text-xs font-bold text-[#00A6FF] tracking-wider uppercase">
                RESEARCH & STRATEGY INSIGHTS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-text-primary dark:text-white mb-4 sm:mb-5"
            >
              B2B Demand Generation &{' '}
              <span className="bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#38BDF8] bg-clip-text text-transparent">
                Market Intelligence
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-text-secondary dark:text-[#A7ADB7] leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Practical sales qualification frameworks, verified demand generation playbooks, and account-based marketing benchmarks curated by Taraj Global's revenue architects.
            </motion.p>

            {/* Value Proposition Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#00A6FF]/10 text-[#00A6FF] flex items-center justify-center shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary dark:text-white">Strategy Playbooks</div>
                  <div className="text-xs text-text-tertiary">Verified B2B methodologies</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary dark:text-white">Enterprise RevOps</div>
                  <div className="text-xs text-text-tertiary">Pipeline & conversion data</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#FF6D00]/10 text-[#FF6D00] flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary dark:text-white">Regular Updates</div>
                  <div className="text-xs text-text-tertiary">Fresh field intelligence</div>
                </div>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ── 2. UNIFORM ARTICLES GRID SECTION ─────────────────────────── */}
      <section id="articles-grid" className="py-14 lg:py-20 scroll-mt-20">
        <Container>
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-slate-200/80 dark:border-white/5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00A6FF]">
                ALL ARTICLES & PLAYBOOKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-white tracking-tight mt-1">
                Explore Our Knowledge Hub
              </h2>
            </div>
            {!loading && !error && blogs.length > 0 && (
              <div className="font-mono text-xs text-text-tertiary">
                Showing <span className="text-text-primary dark:text-white font-semibold">{blogs.length}</span> {blogs.length === 1 ? 'Article' : 'Articles'}
              </div>
            )}
          </div>

          {/* Loading Skeleton State */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 overflow-hidden animate-pulse flex flex-col h-[400px]"
                >
                  <div className="h-52 bg-slate-200 dark:bg-white/5 w-full" />
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-1/3" />
                      <div className="h-6 bg-slate-200 dark:bg-white/10 rounded w-full" />
                      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-4/5" />
                    </div>
                    <div className="h-8 bg-slate-200 dark:bg-white/5 rounded-xl w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-12 text-center rounded-3xl bg-red-500/5 border border-red-500/20 max-w-xl mx-auto my-12">
              <p className="text-sm font-semibold text-red-500 mb-4">{error}</p>
              <button
                type="button"
                onClick={fetchBlogs}
                className="px-5 py-2 rounded-xl bg-[#00A6FF] text-white text-xs font-bold hover:bg-[#0088D6] transition-colors cursor-pointer"
              >
                Try Refreshing
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="p-16 text-center rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 max-w-xl mx-auto my-10">
              <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                No articles published yet
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] mb-6 leading-relaxed">
                Stay tuned as our research team prepares new demand generation playbooks.
              </p>
            </div>
          )}

          {/* Unified Professional Blog Cards Grid */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog.id || blog.slug || index}
                  blog={blog}
                  index={index}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

        </Container>
      </section>

      {/* ── 3. UNIFORM ARTICLES GRID SECTION ENDS ── */}
    </div>
  )
}

export default BlogListings
