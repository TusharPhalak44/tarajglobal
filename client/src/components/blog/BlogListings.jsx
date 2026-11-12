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
  ChevronRight,
  Users,
  Cpu,
  ArrowRight
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

const CARD_THEMES = {
  'thought-leadership': {
    border: 'border-[#00A6FF]/40 hover:border-[#00A6FF]/80',
    activeBorder: 'border-2 border-[#00A6FF] shadow-[0_12px_40px_rgba(0,166,255,0.30)] ring-1 ring-[#00A6FF]/40',
    bg: 'bg-[#070D1B]',
    iconGradient: 'from-[#00A6FF] to-[#0066EE]',
    iconShadow: 'shadow-[0_4px_20px_rgba(0,166,255,0.45)]',
    pillColor: 'bg-[#00A6FF] shadow-[0_0_12px_#00A6FF]',
    cornerGlow: 'from-[#00A6FF]/30 to-transparent',
    orbOuter: 'border-[#00A6FF]/25 bg-[#00A6FF]/15',
    orbInner: 'border-[#00A6FF]/40 bg-[#00A6FF]/25',
    arrowHover: 'group-hover:bg-[#00A6FF] group-hover:text-white group-hover:border-[#00A6FF]',
    icon: Users,
  },
  'sales-marketing': {
    border: 'border-[#10B981]/40 hover:border-[#10B981]/80',
    activeBorder: 'border-2 border-[#10B981] shadow-[0_12px_40px_rgba(16,185,129,0.30)] ring-1 ring-[#10B981]/40',
    bg: 'bg-[#06120E]',
    iconGradient: 'from-[#10B981] to-[#059669]',
    iconShadow: 'shadow-[0_4px_20px_rgba(16,185,129,0.45)]',
    pillColor: 'bg-[#10B981] shadow-[0_0_12px_#10B981]',
    cornerGlow: 'from-[#10B981]/30 to-transparent',
    orbOuter: 'border-[#10B981]/25 bg-[#10B981]/15',
    orbInner: 'border-[#10B981]/40 bg-[#10B981]/25',
    arrowHover: 'group-hover:bg-[#10B981] group-hover:text-white group-hover:border-[#10B981]',
    icon: TrendingUp,
  },
  'tech-ai': {
    border: 'border-[#FF6D00]/40 hover:border-[#FF6D00]/80',
    activeBorder: 'border-2 border-[#FF6D00] shadow-[0_12px_40px_rgba(255,109,0,0.30)] ring-1 ring-[#FF6D00]/40',
    bg: 'bg-[#140C06]',
    iconGradient: 'from-[#FF6D00] to-[#E65100]',
    iconShadow: 'shadow-[0_4px_20px_rgba(255,109,0,0.45)]',
    pillColor: 'bg-[#FF6D00] shadow-[0_0_12px_#FF6D00]',
    cornerGlow: 'from-[#FF6D00]/30 to-transparent',
    orbOuter: 'border-[#FF6D00]/25 bg-[#FF6D00]/15',
    orbInner: 'border-[#FF6D00]/40 bg-[#FF6D00]/25',
    arrowHover: 'group-hover:bg-[#FF6D00] group-hover:text-white group-hover:border-[#FF6D00]',
    icon: Cpu,
  },
}


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

            {/* Interactive Value Proposition Category Cards - Compact Height & Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl xl:max-w-6xl mx-auto"
            >
              {CATEGORIES_DATA.map((cat) => {
                const isActive = selectedCategory === cat.key
                const theme = CARD_THEMES[cat.key] || CARD_THEMES['thought-leadership']
                const IconComponent = theme.icon

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryClick(cat.key)}
                    aria-pressed={isActive}
                    title={isActive ? `Active filter: ${cat.name} (Click to show all)` : `Click to filter: ${cat.name}`}
                    className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-[22px] border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden outline-none min-h-[168px] sm:min-h-[178px] ${
                      isActive ? theme.activeBorder : theme.border
                    } ${theme.bg} shadow-lg hover:-translate-y-1`}
                  >
                    {/* Top-Left Ambient Subtle Glow */}
                    <div
                      className={`absolute -top-8 -left-8 w-28 h-28 rounded-full bg-gradient-to-br ${theme.cornerGlow} blur-xl pointer-events-none`}
                    />

                    {/* Bottom-Right Translucent Overlapping Glowing Curved Arcs */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none select-none">
                      <div className={`absolute inset-0 rounded-full border ${theme.orbOuter}`} />
                      <div className={`absolute bottom-2.5 right-2.5 w-24 h-24 rounded-full border ${theme.orbInner}`} />
                      <div className={`absolute bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-tl ${theme.cornerGlow} blur-sm`} />
                    </div>

                    {/* Top Row: Squircle Gradient Icon + FILTER VIEW + Arrow Circle */}
                    <div className="relative z-10 flex items-center justify-between w-full mb-2.5">
                      {/* Gradient Squircle Icon */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${theme.iconGradient} flex items-center justify-center text-white ${theme.iconShadow} transition-transform duration-300 group-hover:scale-105`}
                      >
                        <IconComponent size={18} className="text-white" strokeWidth={2.2} />
                      </div>

                      {/* Right Action: FILTER VIEW + Circle Arrow */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-slate-300/80 uppercase font-bold group-hover:text-white transition-colors">
                          FILTER VIEW
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-slate-200 transition-all duration-300 group-hover:scale-110 ${theme.arrowHover}`}
                        >
                          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Middle Content: Title + Subtitle (Completely Visible, No Truncation) */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center my-auto">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-300/85 leading-relaxed font-normal mt-1">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Bottom Row: Accent Color Pill Dash */}
                    <div className="relative z-10 pt-3 mt-auto flex items-center justify-between">
                      <div className={`w-8 h-1 rounded-full ${theme.pillColor}`} />
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
