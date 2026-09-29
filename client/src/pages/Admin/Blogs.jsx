import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Trash2,
  Eye,
  Edit,
  Archive,
  FileText,
  Plus,
  CheckCircle,
  X,
  TrendingUp,
  MoreVertical
} from 'lucide-react'
import { adminAPI } from '@api'
import { analyzeSEO } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Blogs = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', category: '', search: '' })
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [filters.status, filters.category, pagination.page])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs()
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getBlogs({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      const blogsData = response.data.data?.blogs || response.data.blogs || []
      const paginationData = response.data.data?.pagination || response.data.pagination || { page: 1, limit: 15, total: 0, totalPages: 0 }
      setBlogs(blogsData)
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = (blog) => {
    window.open(`/blog/${blog.slug}?preview=true`, '_blank')
  }

  const handleEdit = (blog) => {
    navigate(`/admin/blogs/edit/${blog.id}`)
  }

  const handleArchive = async (blog) => {
    const isArchived = blog.status === 'archived'
    const confirmMsg = isArchived
      ? `Restore "${blog.title}" to drafts?`
      : `Archive "${blog.title}"?`

    if (window.confirm(confirmMsg)) {
      try {
        const nextStatus = isArchived ? 'draft' : 'archived'
        await adminAPI.updateBlog(blog.id, { status: nextStatus })
        await fetchBlogs()
        setActiveDropdown(null)
      } catch (error) {
        console.error('Failed to update status:', error)
      }
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Permanently delete "${blog.title}"?`)) {
      try {
        await adminAPI.deleteBlog(blog.id)
        await fetchBlogs()
        setActiveDropdown(null)
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
  }

  const handlePublish = async (blog) => {
    try {
      await adminAPI.updateBlog(blog.id, { status: 'published' })
      await fetchBlogs()
      setActiveDropdown(null)
    } catch (error) {
      console.error('Failed to publish blog:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <PageHeader
        title="Editorial Publishing"
        subtitle="Write, edit, organize, and publish high-impact articles."
        breadcrumbs={[{ label: 'Blogs' }]}
        onRefresh={fetchBlogs}
        isRefreshing={loading}
        actions={
          <button
            onClick={() => navigate('/admin/blogs/create')}
            className="admin-btn admin-btn-primary shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
        }
      />

      {/* Editorial Status Tabs & Search */}
      <div className="admin-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] self-start sm:self-auto text-xs">
          {[
            { id: '', label: 'All Content' },
            { id: 'published', label: 'Published' },
            { id: 'draft', label: 'Drafts' },
            { id: 'archived', label: 'Archived' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilters(prev => ({ ...prev, status: tab.id }))}
              className={`px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
                filters.status === tab.id
                  ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] shadow-xs'
                  : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="admin-input pl-10 pr-8 text-xs w-full"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editorial Content List */}
      {loading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No articles found"
          description="Create your first article to publish content on the website."
          actionLabel="New Article"
          onAction={() => navigate('/admin/blogs/create')}
        />
      ) : (
        <div className="space-y-3">
          {blogs.map((blog, index) => {
            const seoScore = (blog.seo_score !== undefined && blog.seo_score !== null && Number(blog.seo_score) > 0)
              ? Number(blog.seo_score)
              : analyzeSEO({
                title: blog.title,
                slug: blog.slug,
                content: blog.content,
                excerpt: blog.excerpt,
                featured_image: blog.featured_image || blog.image
              }).score

            return (
              <div
                key={blog.id}
                className="admin-card p-4 sm:p-5 flex items-center justify-between gap-6 group"
              >
                {/* Title, Excerpt, Metadata */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3
                      onClick={() => handleEdit(blog)}
                      className="text-sm sm:text-base font-bold text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors cursor-pointer truncate"
                    >
                      {blog.title}
                    </h3>
                    <StatusBadge status={blog.status || 'draft'} />
                  </div>

                  <p className="text-xs text-[var(--admin-text-secondary)] line-clamp-1">
                    {blog.excerpt || 'No excerpt provided'}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[var(--admin-text-muted)] flex-wrap">
                    <span className="text-[var(--admin-text-secondary)] font-medium">{blog.author_name || 'Editorial Team'}</span>
                    <span>•</span>
                    <span className="text-[var(--admin-text-secondary)]">{blog.category_name || 'General'}</span>
                    <span>•</span>
                    <span>{new Date(blog.created_at || Date.now()).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="font-semibold text-[var(--admin-text-primary)]">{blog.view_count || 0} views</span>
                  </div>
                </div>

                {/* SEO Score & Action Controls */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-[var(--admin-text-secondary)] hidden sm:inline">
                    SEO {seoScore}/100
                  </span>

                  <button
                    onClick={() => handlePreview(blog)}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                    title="Live Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDropdown(activeDropdown === blog.id ? null : blog.id)
                      }}
                      className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeDropdown === blog.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                        <div className={`absolute right-0 ${index >= Math.max(1, blogs.length - 2) && blogs.length > 2
                            ? 'bottom-full mb-1.5'
                            : 'top-full mt-1.5'
                          } w-40 bg-[var(--admin-bg-card)] border border-[var(--admin-border-base)] rounded-xl shadow-xl p-1.5 z-50 text-xs admin-card-hover`}>
                          {blog.status !== 'published' ? (
                            <button
                              onClick={() => handlePublish(blog)}
                              className="w-full text-left px-3 py-2 text-[var(--admin-success)] hover:bg-[var(--admin-bg-elevated)] rounded-lg font-semibold"
                            >
                              Publish Live
                            </button>
                          ) : (
                            <button
                              onClick={() => handleArchive(blog)}
                              className="w-full text-left px-3 py-2 text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg-elevated)] rounded-lg font-medium"
                            >
                              Move to Draft
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(blog)}
                            className="w-full text-left px-3 py-2 text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] rounded-lg font-semibold mt-1"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pt-4 flex items-center justify-between text-xs text-[var(--admin-text-muted)]">
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="admin-btn admin-btn-secondary h-8 px-3 text-xs disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.totalPages}
              className="admin-btn admin-btn-secondary h-8 px-3 text-xs disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs
