import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  BookOpen,
  Clock,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Container from '@components/layout/Container'
import BlogCard from './BlogCard'
import BlogFAQ from './BlogFAQ'
import {
  CATEGORIES_DATA,
  normalizeCategory
} from './categoryFaqs'
import { publicAPI } from '@api/public.api'

const POSTS_PER_PAGE = 6

const BlogListings = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicAPI.getBlogs({ limit: 100 })
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

  const handleCategoryClick = (categoryKey) => {
    // Toggle: if already active, clear; otherwise activate
    setSelectedCategory((prev) => (prev === categoryKey ? null : categoryKey))
    setCurrentPage(1)
    const gridEl = document.getElementById('articles-grid')
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClearFilter = () => {
    setSelectedCategory(null)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return
    setCurrentPage(newPage)
    const gridEl = document.getElementById('articles-grid')
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Filter blogs based on selected category (matches category_name or category)
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => normalizeCategory(blog.category_name || blog.category) === selectedCategory)
    : blogs

  const activeCategoryObj = CATEGORIES_DATA.find((c) => c.key === selectedCategory)

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE))
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Generate page numbers array with intelligent ellipsis
  const getPageNumbers = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total]
    }
    if (current >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total]
    }
    return [1, '...', current - 1, current, current + 1, '...', total]
  }

  // Icons map for the 3 categories
  const categoryIcons = {
    'thought-leadership': <BookOpen size={18} />,
    'sales-marketing': <TrendingUp size={18} />,
    'tech-ai': <Clock size={18} />
  }

  return (
    <div className="bg-background text-text-primary transition-colors duration-300">

      {/* ── 1. PROFESSIONAL EDITORIAL HERO SECTION ────────────────────── */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-slate-200/80 dark:border-white/5 bg-gradient-to-b from-slate-50/60 via-background to-background">

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
              className="inline-flex items-center gap-2"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
                RESEARCH & STRATEGY INSIGHTS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-text-primary dark:text-text-primary dark:text-white mb-4 sm:mb-5"
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
              Expert B2B demand generation insights from TaRaj Global’s leadership, sales, marketing, and technology teams, covering ICP, intent data, lead qualification, and CRM strategy to help revenue leaders build predictable, sales-ready pipeline.
            </motion.p>

            {/* Interactive Value Proposition Category Cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
            >
              {CATEGORIES_DATA.map((cat) => {
                const isActive = selectedCategory === cat.key

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryClick(cat.key)}
                    aria-pressed={isActive}
                    title={isActive ? `Active filter: ${cat.name} (Click to show all)` : `Click to filter: ${cat.name}`}
                    className={`relative p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-center gap-3.5 group outline-none ${isActive
                      ? `bg-white dark:bg-[#131929] ${cat.accentBorder} shadow-lg ${cat.accentGlow} ring-2 ring-offset-2 ring-offset-background ${cat.accentBorder} scale-[1.02]`
                      : 'bg-white dark:bg-[#11141e] border-slate-200/90 dark:border-white/10 shadow-xs hover:border-[#00A6FF]/60 hover:shadow-md hover:shadow-[#00A6FF]/10 hover:-translate-y-0.5'
                      }`}
                  >
                    {/* Active Accent Top Indicator */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300 ${isActive
                        ? 'opacity-100 bg-[#00A6FF]'
                        : 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent'
                        }`}
                    />

                    {/* Icon Box */}
                    <div className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {categoryIcons[cat.key] || <BookOpen size={18} />}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className={`text-sm font-bold truncate transition-colors duration-200 ${isActive ? 'text-[#00A6FF]' : 'text-text-primary dark:text-text-primary dark:text-white group-hover:text-[#00A6FF]'}`}>
                          {cat.name}
                        </div>
                        {isActive && (
                          <CheckCircle2 size={14} className="text-[#00A6FF] shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-text-tertiary line-clamp-1 mt-0.5">
                        {cat.subtitle}
                      </div>
                    </div>
                  </button>
                )
              })}
            </motion.div>

            {/* Active Filter Clear Chip in Hero (shows when filtered) */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2 flex items-center justify-center gap-2"
              >
                <span className="text-xs font-mono text-text-tertiary">
                  Filtering by: <strong className="text-text-primary dark:text-white">{activeCategoryObj?.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleClearFilter}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#00A6FF] hover:underline cursor-pointer bg-[#00A6FF]/10 px-2 py-0.5 rounded-md"
                >
                  <X size={12} />
                  <span>Show All ({blogs.length})</span>
                </button>
              </motion.div>
            )}

          </div>
        </Container>
      </section>

      {/* ── 2. UNIFORM ARTICLES GRID SECTION ─────────────────────────── */}
      <section id="articles-grid" className="py-14 lg:py-20 scroll-mt-20">
        <Container>

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-5 border-b border-slate-200/80 dark:border-white/5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00A6FF]">
                  {selectedCategory ? `CATEGORY: ${activeCategoryObj?.name}` : 'ALL ARTICLES & PLAYBOOKS'}
                </span>
                {selectedCategory && (
                  <button
                    type="button"
                    onClick={handleClearFilter}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-500 hover:text-[#00A6FF] transition-colors cursor-pointer bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md"
                  >
                    <X size={11} />
                    <span>Clear Filter</span>
                  </button>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary dark:text-white tracking-tight mt-1">
                {selectedCategory ? activeCategoryObj?.name : 'Explore Our Knowledge Hub'}
              </h2>
            </div>
            {!loading && !error && (
              <div className="font-mono text-xs text-text-tertiary">
                Showing{' '}
                <span className="text-text-primary dark:text-text-primary dark:text-white font-semibold">
                  {filteredBlogs.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + POSTS_PER_PAGE, filteredBlogs.length)}
                </span>{' '}
                of <span className="text-text-primary dark:text-text-primary dark:text-white font-semibold">{filteredBlogs.length}</span> {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
                {selectedCategory && blogs.length > 0 && ` (of ${blogs.length} total)`}
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
                className="px-5 py-2 rounded-xl bg-[#FF6D00] text-white text-xs font-bold hover:bg-[#0088D6] transition-colors cursor-pointer"
              >
                Try Refreshing
              </button>
            </div>
          )}

          {/* Empty State: When category has no articles yet */}
          {!loading && !error && filteredBlogs.length === 0 && selectedCategory && (
            <div className="p-16 text-center rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 max-w-xl mx-auto my-10">
              <h3 className="text-lg font-bold text-text-primary dark:text-text-primary dark:text-white mb-2">
                No articles published under "{activeCategoryObj?.name}" yet
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] mb-6 leading-relaxed">
                Our editorial team is currently preparing playbooks for this track. You can clear the filter to view all articles or explore other categories.
              </p>
              <button
                type="button"
                onClick={handleClearFilter}
                className="px-5 py-2.5 rounded-xl bg-[#00A6FF] text-white text-xs font-bold hover:bg-[#0088D6] transition-all cursor-pointer shadow-md shadow-[#00A6FF]/25"
              >
                View All Articles ({blogs.length})
              </button>
            </div>
          )}

          {/* Empty State: When no blogs exist at all */}
          {!loading && !error && blogs.length === 0 && !selectedCategory && (
            <div className="p-16 text-center rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 max-w-xl mx-auto my-10">
              <h3 className="text-lg font-bold text-text-primary dark:text-text-primary dark:text-white mb-2">
                No articles published yet
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] mb-6 leading-relaxed">
                Stay tuned as our research team prepares new demand generation playbooks.
              </p>
            </div>
          )}

          {/* Unified Professional Blog Cards Grid with Paginated Items */}
          {!loading && !error && paginatedBlogs.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id || blog.slug || index}
                    blog={blog}
                    index={index}
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>

              {/* ── PAGINATION CONTROLS (BACK & NEXT WITH NUMBERED PAGES) ── */}
              {totalPages > 1 && (
                <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Status Indicator */}
                  <div className="text-xs sm:text-sm font-mono text-text-tertiary">
                    Page <span className="font-bold text-text-primary dark:text-white">{currentPage}</span> of{' '}
                    <span className="font-bold text-text-primary dark:text-white">{totalPages}</span>
                  </div>

                  {/* Navigation Buttons Stack */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous Page"
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition-all duration-200 cursor-pointer ${currentPage === 1
                        ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-white/5 text-slate-400 bg-slate-50 dark:bg-white/[0.02]'
                        : 'border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-white dark:bg-[#11141e] hover:border-[#00A6FF]/60 hover:text-[#00A6FF] hover:shadow-xs active:scale-95'
                        }`}
                    >
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>

                    {/* Numeric Page Buttons */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {getPageNumbers(currentPage, totalPages).map((p, idx) => {
                        if (p === '...') {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs font-mono text-text-tertiary select-none"
                            >
                              …
                            </span>
                          )
                        }
                        const isCurrent = p === currentPage
                        return (
                          <button
                            key={`page-${p}`}
                            type="button"
                            onClick={() => handlePageChange(p)}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center justify-center transition-all duration-200 cursor-pointer border ${isCurrent
                              ? 'bg-[#00A6FF] text-white border-[#00A6FF] shadow-md shadow-[#00A6FF]/25 scale-105'
                              : 'border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#11141e] hover:border-[#00A6FF]/60 hover:text-[#00A6FF] hover:shadow-xs'
                              }`}
                          >
                            {p}
                          </button>
                        )
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next Page"
                      className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition-all duration-200 cursor-pointer ${currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-white/5 text-slate-400 bg-slate-50 dark:bg-white/[0.02]'
                        : 'border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-white dark:bg-[#11141e] hover:border-[#00A6FF]/60 hover:text-[#00A6FF] hover:shadow-xs active:scale-95'
                        }`}
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </Container>
      </section>

      {/* ── 3. DYNAMIC CATEGORY-WISE FREQUENTLY ASKED QUESTIONS SECTION ── */}
      <BlogFAQ
        selectedCategory={selectedCategory}
        onCategoryChange={(newKey) => {
          setSelectedCategory(newKey)
          setCurrentPage(1)
        }}
      />

    </div>
  )
}

export default BlogListings
