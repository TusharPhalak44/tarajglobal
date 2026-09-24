import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, User, Play, Video, FileText } from 'lucide-react'
import { parseVideoInfo, parsePdfInfo, resolveMediaUrl } from '@utils/mediaHelper'

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

  const rawMedia = blog.featured_image || blog.image
  const videoInfo = parseVideoInfo(rawMedia)
  const pdfInfo = parsePdfInfo(rawMedia)
  const displayImg = videoInfo?.thumbnailUrl || resolveMediaUrl(rawMedia) || fallbackImg

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

      {/* Featured Cover Media Container */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        {videoInfo?.type === 'direct' ? (
          <video
            src={videoInfo.src}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : pdfInfo ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#0a121e] to-[#041a2e] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center mb-3 shadow-lg shadow-red-500/20">
              <FileText size={26} />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              PDF RESEARCH PLAYBOOK
            </span>
            <span className="text-[11px] text-slate-400 mt-1 max-w-[200px] truncate">
              {pdfInfo.fileName}
            </span>
          </div>
        ) : (
          <img
            src={displayImg}
            alt={blog.title}
            loading="lazy"
            onError={(e) => {
              if (videoInfo?.fallbackThumb && e.currentTarget.src !== videoInfo.fallbackThumb) {
                e.currentTarget.src = videoInfo.fallbackThumb
                return
              }
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
        )}

        {/* Video Play Icon Overlay */}
        {videoInfo && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-[#00A6FF]/90 text-white flex items-center justify-center shadow-lg shadow-[#00A6FF]/40 group-hover:scale-115 transition-transform duration-300">
              <Play size={20} className="fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase backdrop-blur-md bg-black/50 text-[#00E5FF] border border-[#00E5FF]/30 shadow-xs">
            {videoInfo && <Video size={12} className="text-[#00E5FF]" />}
            {pdfInfo && <FileText size={12} className="text-red-400" />}
            <span>{category}</span>
          </span>
        </div>

        {/* Read/Watch/PDF Tag */}
        <div className="absolute bottom-3 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md bg-black/60 text-white/90 border border-white/15">
            <Clock size={11} className="text-[#00A6FF]" />
            {videoInfo ? 'Watch Video' : pdfInfo ? 'PDF Document' : estimateReadTime(blog.content)}
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
                className="w-7 h-7 rounded-full object-cover border border-[#00A6FF]/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#007AC0] text-white flex items-center justify-center font-bold text-[11px]">
                {authorName.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium text-text-secondary dark:text-slate-300 truncate">
              {authorName}
            </span>
          </div>

          {/* Action Link */}
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#00A6FF] group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>{videoInfo ? 'Watch' : pdfInfo ? 'View PDF' : 'Read'}</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default BlogCard
