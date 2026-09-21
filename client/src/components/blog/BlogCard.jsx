import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'

const BlogCard = ({ blog, index, onReadMore }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently Published'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  // Calculate estimated read time (assuming ~200 words/min)
  const estimateReadTime = (content) => {
    if (!content) return '5 min read'
    const words = content.trim().split(/\s+/).length
    const minutes = Math.max(3, Math.ceil(words / 200))
    return `${minutes} min read`
  }

  const category = blog.category_name || 'B2B Strategy'
  const authorName = blog.author_name || 'Taraj Global Editorial'
  const authorPhoto = blog.author_photo || null
  const fallbackImg = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.05 * (index % 6), duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ translateY: -4 }}
      onClick={() => onReadMore(blog)}
      className="group relative flex flex-col rounded-3xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(0,166,255,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_16px_36px_rgba(0,166,255,0.15)] hover:border-[#00A6FF]/40 dark:hover:border-[#00A6FF]/40 overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Top Hairline Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#00A6FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Featured Cover Image Container */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={blog.featured_image || blog.image || fallbackImg}
          alt={blog.title}
          loading="lazy"
          onError={(e) => {
            const rawImg = blog.featured_image || blog.image
            if (rawImg && typeof rawImg === 'string' && rawImg.startsWith('/uploads') && !e.currentTarget.src.includes(':5000')) {
              e.currentTarget.src = `http://localhost:5000${rawImg}`
              return
            }
            e.currentTarget.onerror = null
            e.currentTarget.src = fallbackImg
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase backdrop-blur-md bg-black/50 text-[#00E5FF] border border-[#00E5FF]/30 shadow-xs">
            {category}
          </span>
        </div>

        {/* Read Time Tag */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md bg-black/60 text-white/90 border border-white/15">
            <Clock size={11} className="text-[#00A6FF]" />
            {estimateReadTime(blog.content)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-xs text-text-tertiary mb-3 font-mono">
            <Calendar size={13} className="text-[#00A6FF]" />
            <span>{formatDate(blog.created_at)}</span>
          </div>

          {/* Article Title */}
          <h3 className="text-lg sm:text-xl font-bold text-text-primary dark:text-white tracking-tight leading-snug mb-2.5 line-clamp-2 group-hover:text-[#00A6FF] transition-colors duration-200">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed line-clamp-3 mb-6 font-normal">
            {blog.excerpt || 'Discover actionable strategies, architectural frameworks, and expert guidance to accelerate your enterprise B2B sales pipeline.'}
          </p>
        </div>

        {/* Card Footer: Author + Read Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3 mt-auto">
          {/* Author Chip */}
          <div className="flex items-center gap-2.5 min-w-0">
            {authorPhoto ? (
              <img
                src={authorPhoto}
                alt={authorName}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="w-7 h-7 rounded-full object-cover border border-[#00A6FF]/30 shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#00A6FF]/10 text-[#00A6FF] flex items-center justify-center font-bold text-[11px] shrink-0 border border-[#00A6FF]/20">
                {authorName.charAt(0)}
              </div>
            )}
            <span className="text-xs font-semibold text-text-primary dark:text-slate-200 truncate">
              {authorName}
            </span>
          </div>

          {/* Custom Animated Read Blog Button */}
          <a
            href={blog.slug ? `/blog/${blog.slug}` : '#'}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onReadMore(blog)
            }}
            className="btn-read-article shrink-0"
          >
            <span>Read Blog</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard
