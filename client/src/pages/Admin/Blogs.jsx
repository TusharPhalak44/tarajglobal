import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Eye, 
  Edit,
  Archive,
  FileText,
  Calendar,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Plus,
  CheckCircle
} from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate } from 'react-router-dom'
import { analyzeSEO, getSEOStatusColor } from '@utils/seoAnalyzer'

const Blogs = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', category: '', search: '' })
  const [selectedBlogs, setSelectedBlogs] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [filters, pagination.page])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getBlogs({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      console.log('Blogs API response:', response.data)
      const blogsData = response.data.data?.blogs || response.data.blogs || []
      const paginationData = response.data.data?.pagination || response.data.pagination
      setBlogs(blogsData)
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectBlog = (id) => {
    setSelectedBlogs(prev => 
      prev.includes(id) 
        ? prev.filter(b => b !== id) 
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([])
    } else {
      setSelectedBlogs(blogs.map(b => b.id))
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
      ? `Are you sure you want to restore "${blog.title}" from archive to draft?`
      : `Are you sure you want to archive "${blog.title}"?`

    if (window.confirm(confirmMsg)) {
      try {
        const nextStatus = isArchived ? 'draft' : 'archived'
        const seoResult = analyzeSEO({
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          excerpt: blog.excerpt,
          featured_image: blog.featured_image || blog.image
        })
        await adminAPI.updateBlog(blog.id, { 
          status: nextStatus,
          seo_score: seoResult.score,
          seo_analysis: seoResult
        })
        await fetchBlogs()
        setActiveDropdown(null)
        alert(isArchived ? 'Blog restored to draft successfully' : 'Blog archived successfully')
      } catch (error) {
        console.error('Failed to update archive status:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to update archive status'
        alert(`Failed to update archive status: ${errorMessage}`)
      }
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to permanently delete "${blog.title}"? This action cannot be undone.`)) {
      try {
        await adminAPI.deleteBlog(blog.id)
        await fetchBlogs()
        setActiveDropdown(null)
        alert('Blog deleted successfully')
      } catch (error) {
        console.error('Failed to delete blog:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete blog'
        alert(`Failed to delete blog: ${errorMessage}`)
      }
    }
  }

  const handlePublish = async (blog) => {
    try {
      const seoResult = analyzeSEO({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt,
        featured_image: blog.featured_image || blog.image
      })
      await adminAPI.updateBlog(blog.id, { 
        status: 'published',
        seo_score: seoResult.score,
        seo_analysis: seoResult
      })
      await fetchBlogs()
      setActiveDropdown(null)
      alert('Blog published successfully! It is now live on the public blog section (/blog).')
    } catch (error) {
      console.error('Failed to publish blog:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to publish blog'
      alert(`Failed to publish blog: ${errorMessage}`)
    }
  }

  const handleMoveToDraft = async (blog) => {
    try {
      const seoResult = analyzeSEO({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt,
        featured_image: blog.featured_image || blog.image
      })
      await adminAPI.updateBlog(blog.id, { 
        status: 'draft',
        seo_score: seoResult.score,
        seo_analysis: seoResult
      })
      await fetchBlogs()
      setActiveDropdown(null)
      alert(`"${blog.title}" moved to Drafts successfully! You can view and manage it in the Drafts section (http://localhost:3000/admin/drafts).`)
    } catch (error) {
      console.error('Failed to move blog to draft:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to move blog to draft'
      alert(`Failed to move blog to draft: ${errorMessage}`)
    }
  }

  const handleUnpublish = handleMoveToDraft

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-gray-500/20 text-gray-400',
      published: 'bg-green-500/20 text-green-400',
      archived: 'bg-orange-500/20 text-orange-400'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
        {status?.replace('_', ' ').toUpperCase() || 'DRAFT'}
      </span>
    )
  }

  const handleBulkPublish = async () => {
    if (selectedBlogs.length === 0) return
    try {
      await Promise.all(selectedBlogs.map(id => adminAPI.updateBlog(id, { status: 'published' })))
      setSelectedBlogs([])
      fetchBlogs()
      alert(`${selectedBlogs.length} blog(s) published successfully`)
    } catch (error) {
      console.error('Failed to bulk publish:', error)
      alert('Failed to publish blogs. Please try again.')
    }
  }

  const handleBulkDraft = async () => {
    if (selectedBlogs.length === 0) return
    try {
      await Promise.all(selectedBlogs.map(id => adminAPI.updateBlog(id, { status: 'draft' })))
      setSelectedBlogs([])
      fetchBlogs()
      alert(`${selectedBlogs.length} blog(s) moved to Drafts! You can view them at http://localhost:3000/admin/drafts`)
    } catch (error) {
      console.error('Failed to bulk move to draft:', error)
      alert('Failed to move blogs to draft. Please try again.')
    }
  }

  const handleBulkArchive = async () => {
    if (selectedBlogs.length === 0) return
    if (!window.confirm(`Are you sure you want to archive ${selectedBlogs.length} blog(s)?`)) return
    try {
      await Promise.all(selectedBlogs.map(id => adminAPI.updateBlog(id, { status: 'archived' })))
      setSelectedBlogs([])
      fetchBlogs()
      alert(`${selectedBlogs.length} blog(s) archived successfully`)
    } catch (error) {
      console.error('Failed to bulk archive:', error)
      alert('Failed to archive blogs. Please try again.')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) return
    if (!window.confirm(`Are you sure you want to permanently delete ${selectedBlogs.length} blog(s)? This action cannot be undone.`)) return
    try {
      await Promise.all(selectedBlogs.map(id => adminAPI.deleteBlog(id)))
      setSelectedBlogs([])
      fetchBlogs()
      alert(`${selectedBlogs.length} blog(s) deleted successfully`)
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete blogs. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading blogs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Blogs</h1>
          <p className="text-text-secondary">Manage your blog content</p>
        </div>
        <button 
          onClick={() => navigate('/admin/blogs/create')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Blog
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <span className="text-text-primary">{selectedBlogs.length} blogs selected</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBulkPublish}
              className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Publish
            </button>
            <button 
              onClick={handleBulkDraft}
              className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-sm hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              Move to Drafts
            </button>
            <button 
              onClick={handleBulkArchive}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm hover:bg-surface/80 transition-colors cursor-pointer"
            >
              Archive
            </button>
            <button 
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-error/20 text-error rounded-lg text-sm hover:bg-error/30 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-surface rounded-xl border border-border">
        <div className="overflow-x-auto min-h-[320px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="w-12 px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.length === blogs.length && blogs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">SEO Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Views</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Date</th>
                <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBlogs.includes(blog.id)}
                      onChange={() => handleSelectBlog(blog.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {blog.featured_image && (
                        <img 
                          src={blog.featured_image} 
                          alt="" 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-text-primary">{blog.title}</p>
                        <p className="text-sm text-text-muted truncate max-w-xs">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{blog.author_name || '-'}</td>
                  <td className="px-6 py-4 text-text-secondary">{blog.category_name || '-'}</td>
                  <td className="px-6 py-4">{getStatusBadge(blog.status)}</td>
                  <td className="px-6 py-4">
                    {(() => {
                      const score = (blog.seo_score !== undefined && blog.seo_score !== null && Number(blog.seo_score) > 0)
                        ? Number(blog.seo_score)
                        : analyzeSEO({
                            title: blog.title,
                            slug: blog.slug,
                            content: blog.content,
                            excerpt: blog.excerpt,
                            featured_image: blog.featured_image || blog.image
                          }).score
                      const status = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Improvement' : 'Poor'
                      return (
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getSEOStatusColor(status)} bg-surface border border-border shadow-xs`}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{score}/100</span>
                        </div>
                      )
                    })()}
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{blog.view_count || 0}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdown(activeDropdown === blog.id ? null : blog.id)
                        }}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors cursor-pointer"
                        aria-label="Blog actions"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {activeDropdown === blog.id && (
                        <>
                          {/* Invisible backdrop to dismiss dropdown on click outside */}
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(null)
                            }}
                          />
                          <div className={`absolute right-0 ${
                            index >= Math.max(1, blogs.length - 2) && blogs.length > 2
                              ? 'bottom-full mb-2' 
                              : 'top-full mt-2'
                          } w-48 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1 divide-y divide-border/40`}>
                            <div className="py-1">
                              <button 
                                type="button"
                                onClick={() => {
                                  handlePreview(blog)
                                  setActiveDropdown(null)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4 text-[#00A6FF]" />
                                <span>Preview</span>
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  handleEdit(blog)
                                  setActiveDropdown(null)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                              >
                                <Edit className="w-4 h-4 text-[#FF6D00]" />
                                <span>Edit</span>
                              </button>
                              {/* Draft Option */}
                              {blog.status === 'draft' ? (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdown(null)
                                    navigate('/admin/drafts')
                                  }}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                >
                                  <FileText className="w-4 h-4 text-blue-400" />
                                  <span>In Drafts (View)</span>
                                </button>
                              ) : (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    handleMoveToDraft(blog)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                >
                                  <FileText className="w-4 h-4 text-amber-500" />
                                  <span>Draft (Move to Drafts)</span>
                                </button>
                              )}

                              {/* Publish Option */}
                              {blog.status !== 'published' && (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    handlePublish(blog)
                                    setActiveDropdown(null)
                                  }}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                >
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                  <span>Publish</span>
                                </button>
                              )}

                              {/* Archive Option */}
                              <button 
                                type="button"
                                onClick={() => {
                                  handleArchive(blog)
                                  setActiveDropdown(null)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                              >
                                <Archive className="w-4 h-4 text-purple-500" />
                                <span>{blog.status === 'archived' ? 'Restore' : 'Archive'}</span>
                              </button>
                            </div>
                            <div className="py-1">
                              <button 
                                type="button"
                                onClick={() => {
                                  handleDelete(blog)
                                  setActiveDropdown(null)
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-left text-xs sm:text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No blogs found</p>
            <p className="text-text-muted text-sm">Create your first blog to get started</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} blogs
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors"
            >
              Previous
            </button>
            <span className="text-text-primary">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors"
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
