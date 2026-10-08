import React, { useEffect, useState } from 'react'
import ActionDropdown from '../../components/admin/ActionDropdown'
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
  MoreVertical,
  Image
} from 'lucide-react'
import { adminAPI } from '@api'
import { analyzeSEO } from '@utils/seoAnalyzer'
import { useAuth } from '@context/AuthContext'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Blogs = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
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
      {/* Editorial Header - Matches Wireframe Top Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text-primary)] tracking-tight">Blog Posts</h1>
          <p className="text-base text-[var(--admin-text-muted)] mt-1">Manage, create and publish your blog content</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="admin-input pl-9 pr-8 text-base w-full h-10"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button className="admin-btn admin-btn-secondary h-10 px-3">
            <TrendingUp className="w-4 h-4 text-[var(--admin-text-muted)]" />
          </button>
          <button
            onClick={() => navigate('/admin/blogs/create')}
            className="admin-btn admin-btn-primary shadow-md h-10 px-4"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-[var(--admin-border-subtle)] pb-2 overflow-visible hide-scrollbar">
        {[
          { id: '', label: 'All Posts' },
          { id: 'published', label: 'Published' },
          { id: 'draft', label: 'Drafts' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'archived', label: 'Archived' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilters(prev => ({ ...prev, status: tab.id }))}
            className={`px-4 py-2 rounded-t-lg transition-all text-base font-semibold whitespace-nowrap ${filters.status === tab.id
              ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)] bg-[var(--admin-primary-soft)]'
              : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editorial Table */}
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
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar" style={{ paddingBottom: activeDropdown ? '160px' : '0', transition: 'padding 0.2s' }}>
            <table className="w-full text-left text-base whitespace-nowrap">
            <thead className="bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] font-semibold text-sm uppercase tracking-wider border-b border-[var(--admin-border-subtle)]">
              <tr>
                <th className="px-4 py-3 w-12 text-center"><input type="checkbox" className="rounded admin-checkbox" /></th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Featured Image</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Publish Date</th>
                <th className="px-4 py-3 text-center">Views</th>
                <th className="px-4 py-3 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border-subtle)]">
              {blogs.map((blog, index) => {
                return (
                  <tr key={blog.id} className="hover:bg-[var(--admin-bg-elevated)] transition-colors group">
                    <td className="px-4 py-4 text-center">
                      <input type="checkbox" className="rounded admin-checkbox" />
                    </td>
                    <td className="px-4 py-4 max-w-[300px] whitespace-normal">
                      <div className="flex flex-col">
                        <span
                          onClick={() => handleEdit(blog)}
                          className="font-bold text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] cursor-pointer truncate"
                          title={blog.title}
                        >
                          {blog.title}
                        </span>
                        <span className="text-sm text-[var(--admin-text-muted)] line-clamp-1 mt-0.5" title={blog.excerpt}>
                          {blog.excerpt || 'No excerpt provided'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {blog.featured_image || blog.image ? (
                        <div className="w-16 h-10 rounded-md overflow-hidden bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-center shrink-0">
                          <img src={blog.featured_image || blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-10 rounded-md bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-center text-[var(--admin-text-muted)]">
                          <Image className="w-4 h-4 opacity-50" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[12px] font-bold bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-primary)]/20">
                        {blog.category_name || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                          <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">
                            {(blog.author_name || 'E')[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-[var(--admin-text-secondary)]">
                          {blog.author_name || 'Editorial Team'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={blog.status || 'draft'} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col text-sm text-[var(--admin-text-secondary)]">
                        <span>{new Date(blog.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-[12px] text-[var(--admin-text-muted)]">{new Date(blog.created_at || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-[var(--admin-text-primary)]">
                      {blog.view_count >= 1000 ? (blog.view_count / 1000).toFixed(1) + 'K' : (blog.view_count || 0)}
                    </td>
                    <td className="px-4 py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5 min-w-max">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="shrink-0 p-2 rounded-lg border border-[var(--admin-border-subtle)] hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handlePreview(blog)}
                          className="shrink-0 p-2 rounded-lg border border-[var(--admin-border-subtle)] hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <ActionDropdown buttonClassName="shrink-0 p-2 rounded-lg border border-[var(--admin-border-subtle)] hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] transition-colors" dropdownClassName="p-2 min-w-[9rem]">
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
                                {user?.role !== 'user' && (
                                  <button
                                    onClick={() => handleDelete(blog)}
                                    className="w-full text-left px-3 py-2 text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] rounded-lg font-semibold mt-1"
                                  >
                                    Delete
                                  </button>
                                )}
                        </ActionDropdown>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="px-5 py-4 border-t border-[var(--admin-border-subtle)] flex items-center justify-between text-sm text-[var(--admin-text-muted)]">
            <div>
              Showing {blogs.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}-{Math.min(pagination.page * pagination.limit, pagination.total || blogs.length)} of {pagination.total || blogs.length} posts
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--admin-bg-elevated)] disabled:opacity-40"
                >
                  &lt;
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPagination({ ...pagination, page: pageNum })}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium ${pagination.page === pageNum
                      ? 'bg-[var(--admin-primary)] text-white shadow-md'
                      : 'hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)]'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--admin-bg-elevated)] disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs
