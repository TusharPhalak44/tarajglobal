import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react'
import { publicAPI } from '@api/public.api'
import BlogCard from '@components/blog/BlogCard'
import { useReducedMotion } from '@hooks/useReducedMotion'

export default function LatestInsights() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const res = await publicAPI.getBlogs({ limit: 3, page: 1 })
        const items = res?.data?.data || []
        if (isMounted) {
          // Only show published articles with valid slugs
          const published = Array.isArray(items)
            ? items.filter((b) => b && b.slug && b.status !== 'draft').slice(0, 3)
            : []
          setBlogs(published)
        }
      } catch (err) {
        // Handle gracefully as required
        console.warn('LatestInsights: Failed to fetch recent articles', err)
        if (isMounted) setBlogs([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchArticles()
    return () => {
      isMounted = false
    }
  }, [])

  const handleReadMore = (blog) => {
    if (blog?.slug) {
      navigate(`/blog/${blog.slug}`)
    }
  }

  return (
    <section
      id="insights"
      className="relative bg-surface/50 py-16 sm:py-20 lg:py-24 border-b border-border/80 overflow-hidden"
      aria-labelledby="insights-heading"
    >
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-border/60">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
              <span>KNOWLEDGE &amp; PLAYBOOKS</span>
            </div>
            <h2
              id="insights-heading"
              className="text-2xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] leading-[1.12] text-text-primary"
            >
              Ideas for Building a{' '}
              <span className="text-primary">Stronger B2B Pipeline.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-secondary">
              Actionable outbound strategies, qualification frameworks, and demand generation research from our revenue team.
            </p>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-primary hover:text-primary transition-colors self-start md:self-auto"
          >
            <span>Explore All Articles &amp; Playbooks</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border bg-surface p-6 animate-pulse flex flex-col gap-4"
                >
                  <div className="h-44 w-full rounded-2xl bg-slate-200 dark:bg-white/5" />
                  <div className="h-4 w-24 rounded bg-slate-200 dark:bg-white/5" />
                  <div className="h-6 w-full rounded bg-slate-200 dark:bg-white/5" />
                  <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-white/5" />
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog.id || blog.slug || index}
                  blog={blog}
                  index={index}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/80 bg-surface/80 p-8 text-center max-w-xl mx-auto">
              <BookOpen size={32} className="mx-auto text-primary mb-3" />
              <h3 className="text-lg font-bold text-text-primary mb-2">Continuous Outbound Intelligence</h3>
              <p className="text-xs sm:text-sm text-text-secondary mb-4">
                Explore our full archive of B2B demand generation case studies, lead qualification guides, and email outbound blueprints.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:underline"
              >
                <span>Browse our blog directory</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
