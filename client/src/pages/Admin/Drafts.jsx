import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Archive, 
  FileText, 
  Calendar, 
  X, 
  FileEdit, 
  Briefcase, 
  CheckCircle,
  RefreshCw,
  Plus
} from 'lucide-react'
import { adminAPI } from '@api'
import { analyzeSEO } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Drafts = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [allDrafts, setAllDrafts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [selectedDrafts, setSelectedDrafts] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    fetchDrafts(true)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, typeFilter])

  const fetchDrafts = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true)
      else setRefreshing(true)
      
      let blogsData = []
      try {
        const blogsResponse = await adminAPI.getBlogs({ status: 'draft', page: 1, limit: 100 })
        blogsData = blogsResponse.data.data?.blogs || blogsResponse.data.blogs || []
      } catch (blogError) {
        console.error('Failed to fetch blogs:', blogError)
        blogsData = []
      }
      
      let jobsData = []
      try {
        const jobsResponse = await adminAPI.getJobs({ status: 'draft', page: 1, limit: 100 })
        jobsData = jobsResponse.data.data?.jobs || jobsResponse.data.jobs || []
      } catch (jobError) {
        console.error('Failed to fetch jobs:', jobError)
        jobsData = []
      }
      
      const combined = [
        ...blogsData.map(item => ({ ...item, type: 'blog' })),
        ...jobsData.map(item => ({ ...item, type: 'job' }))
      ]

      combined.sort((a, b) => {
        const dateA = new Date(a.updated_at || a.created_at || 0).getTime()
        const dateB = new Date(b.updated_at || b.created_at || 0).getTime()
        return dateB - dateA
      })
      
      setAllDrafts(combined)
    } catch (error) {
      console.error('Failed to fetch drafts:', error)
      setAllDrafts([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredDrafts = useMemo(() => {
    return allDrafts.filter(draft => {
      if (typeFilter && draft.type !== typeFilter) return false
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const title = (draft.title || '').toLowerCase()
        const excerpt = (draft.excerpt || draft.description || '').toLowerCase()
        const authorOrDept = (draft.author_name || draft.department || '').toLowerCase()
        const category = (draft.category_name || '').toLowerCase()
        const slug = (draft.slug || '').toLowerCase()
        const type = (draft.type || '').toLowerCase()

        return title.includes(query) ||
          excerpt.includes(query) ||
          authorOrDept.includes(query) ||
          category.includes(query) ||
          slug.includes(query) ||
          type.includes(query)
      }
      return true
    })
  }, [allDrafts, typeFilter, searchQuery])

  const totalPages = Math.ceil(filteredDrafts.length / pageSize) || 1
  const paginatedDrafts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredDrafts.slice(startIndex, startIndex + pageSize)
  }, [filteredDrafts, currentPage, pageSize])

  const handleSelectDraft = (id) => {
    setSelectedDrafts(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedDrafts.length === paginatedDrafts.length && paginatedDrafts.length > 0) {
      setSelectedDrafts([])
    } else {
      setSelectedDrafts(paginatedDrafts.map(d => d.id))
    }
  }

  const handlePreview = (draft) => {
    setActiveDropdown(null)
    if (draft.type === 'blog') {
      const slugOrId = draft.slug || draft.id
      window.open(`/blog/${slugOrId}?preview=true`, '_blank')
    } else if (draft.type === 'job') {
      window.open(`/careers?jobId=${draft.id}`, '_blank')
    }
  }

  const handleEdit = (draft) => {
    setActiveDropdown(null)
    if (draft.type === 'blog') {
      navigate(`/admin/blogs/edit/${draft.id}`)
    } else if (draft.type === 'job') {
      navigate(`/admin/jobs/edit/${draft.id}`)
    }
  }

  const handlePublish = async (draft) => {
    setActiveDropdown(null)
    try {
      if (draft.type === 'blog') {
        const seoResult = analyzeSEO({
          title: draft.title,
          slug: draft.slug,
          content: draft.content,
          excerpt: draft.excerpt,
          featured_image: draft.featured_image || draft.image
        })
        await adminAPI.updateBlog(draft.id, { 
          status: 'published',
          seo_score: seoResult.score,
          seo_analysis: seoResult
        })
      } else if (draft.type === 'job') {
        await adminAPI.updateJob(draft.id, { status: 'active' })
      }
      await fetchDrafts(false)
      alert(`"${draft.title}" published live successfully!`)
    } catch (error) {
      console.error('Failed to publish draft:', error)
      alert(`Failed to publish: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleArchive = async (draft) => {
    setActiveDropdown(null)
    if (window.confirm(`Archive "${draft.title}"?`)) {
      try {
        if (draft.type === 'blog') {
          await adminAPI.updateBlog(draft.id, { status: 'archived' })
        } else if (draft.type === 'job') {
          await adminAPI.updateJob(draft.id, { status: 'archived' })
        }
        await fetchDrafts(false)
        alert(`"${draft.title}" archived successfully`)
      } catch (error) {
        console.error('Failed to archive draft:', error)
        alert(`Failed to archive: ${error.response?.data?.message || error.message}`)
      }
    }
  }

  const handleDelete = async (draft) => {
    setActiveDropdown(null)
    if (window.confirm(`Permanently delete "${draft.title}"? This action cannot be undone.`)) {
      try {
        if (draft.type === 'blog') {
          await adminAPI.deleteBlog(draft.id)
        } else if (draft.type === 'job') {
          await adminAPI.deleteJob(draft.id)
        }
        await fetchDrafts(false)
        alert('Draft deleted successfully')
      } catch (error) {
        console.error('Failed to delete draft:', error)
        alert(`Failed to delete: ${error.response?.data?.message || error.message}`)
      }
    }
  }

  const handleBulkPublish = async () => {
    if (selectedDrafts.length === 0) return
    try {
      const selectedItems = allDrafts.filter(d => selectedDrafts.includes(d.id))
      await Promise.all(selectedItems.map(item => {
        if (item.type === 'blog') {
          return adminAPI.updateBlog(item.id, { status: 'published' })
        } else {
          return adminAPI.updateJob(item.id, { status: 'active' })
        }
      }))
      setSelectedDrafts([])
      fetchDrafts(false)
      alert(`${selectedItems.length} draft(s) published live!`)
    } catch (error) {
      console.error('Failed to bulk publish:', error)
      alert('Failed to publish selected drafts.')
    }
  }

  const handleBulkArchive = async () => {
    if (selectedDrafts.length === 0) return
    if (!window.confirm(`Archive ${selectedDrafts.length} draft(s)?`)) return
    try {
      const selectedItems = allDrafts.filter(d => selectedDrafts.includes(d.id))
      await Promise.all(selectedItems.map(item => {
        if (item.type === 'blog') {
          return adminAPI.updateBlog(item.id, { status: 'archived' })
        } else {
          return adminAPI.updateJob(item.id, { status: 'archived' })
        }
      }))
      setSelectedDrafts([])
      fetchDrafts(false)
      alert(`${selectedItems.length} draft(s) archived successfully`)
    } catch (error) {
      console.error('Failed to bulk archive:', error)
      alert('Failed to archive selected drafts.')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedDrafts.length === 0) return
    if (!window.confirm(`Permanently delete ${selectedDrafts.length} draft(s)? This action cannot be undone.`)) return
    try {
      const selectedItems = allDrafts.filter(d => selectedDrafts.includes(d.id))
      await Promise.all(selectedItems.map(item => {
        if (item.type === 'blog') {
          return adminAPI.deleteBlog(item.id)
        } else {
          return adminAPI.deleteJob(item.id)
        }
      }))
      setSelectedDrafts([])
      fetchDrafts(false)
      alert(`${selectedItems.length} draft(s) deleted successfully`)
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete selected drafts.')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Draft Content & Listings"
        subtitle="Unpublished blog articles and career requisitions currently in draft preparation."
        breadcrumbs={[{ label: 'Drafts' }]}
        onRefresh={() => fetchDrafts(false)}
        isRefreshing={refreshing}
        actions={
          <button
            onClick={() => navigate('/admin/blogs/create')}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Draft Article</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search drafts by title, department, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input pl-10 pr-9 text-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="admin-select text-xs min-w-[140px]"
          >
            <option value="">All Content Types</option>
            <option value="blog">Blog Articles</option>
            <option value="job">Career Openings</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedDrafts.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--admin-primary-soft)] border border-[var(--admin-border-active)] flex items-center justify-between gap-4 animate-slide-down flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A6FF] animate-ping" />
            <span className="text-xs font-bold text-[var(--admin-text-primary)]">
              {selectedDrafts.length} draft(s) selected
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleBulkPublish} className="admin-btn admin-btn-primary text-xs py-1.5 px-3">
              Publish Live
            </button>
            <button onClick={handleBulkArchive} className="admin-btn admin-btn-secondary text-xs py-1.5 px-3">
              Archive
            </button>
            <button onClick={handleBulkDelete} className="admin-btn admin-btn-danger text-xs py-1.5 px-3">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Drafts Table */}
      {loading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : filteredDrafts.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={FileEdit}
            title="No draft records found"
            description={searchQuery || typeFilter ? "No drafts match your current search criteria." : "All your platform content is published live. Create a new draft article anytime."}
            actionLabel="Create New Draft"
            onAction={() => navigate('/admin/blogs/create')}
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="w-10">
                    <input
                      type="checkbox"
                      checked={selectedDrafts.length === paginatedDrafts.length && paginatedDrafts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-[var(--admin-border-base)] accent-[#00A6FF] cursor-pointer"
                    />
                  </th>
                  <th>Draft Title & Details</th>
                  <th>Content Type</th>
                  <th>Category / Department</th>
                  <th>Last Modified</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDrafts.map((draft, index) => {
                  const Icon = draft.type === 'job' ? Briefcase : FileText

                  return (
                    <tr key={`${draft.type}-${draft.id}`} className="group">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedDrafts.includes(draft.id)}
                          onChange={() => handleSelectDraft(draft.id)}
                          className="rounded border-[var(--admin-border-base)] accent-[#00A6FF] cursor-pointer"
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-3 min-w-[240px] max-w-sm">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-[var(--admin-border-subtle)] ${
                            draft.type === 'job' ? 'bg-purple-500/10 text-purple-400' : 'bg-[#00A6FF]/10 text-[#00A6FF]'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs sm:text-sm text-[var(--admin-text-primary)] truncate group-hover:text-[var(--admin-primary)] transition-colors">
                              {draft.title}
                            </p>
                            <p className="text-[11px] text-[var(--admin-text-muted)] truncate mt-0.5">
                              {draft.excerpt || draft.description || 'Draft work in progress'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          draft.type === 'job' 
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                            : 'bg-[#00A6FF]/10 text-[#00A6FF] border border-[#00A6FF]/20'
                        }`}>
                          {draft.type === 'job' ? 'Career Opening' : 'Article'}
                        </span>
                      </td>
                      <td className="text-xs text-[var(--admin-text-secondary)] font-medium">
                        {draft.category_name || draft.department || '-'}
                      </td>
                      <td className="text-xs text-[var(--admin-text-muted)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(draft.updated_at || draft.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === draft.id ? null : draft.id)
                            }}
                            className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeDropdown === draft.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className={`absolute right-0 ${
                                index >= Math.max(1, paginatedDrafts.length - 2) && paginatedDrafts.length > 2
                                  ? 'bottom-full mb-2' 
                                  : 'top-full mt-2'
                              } w-48 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down`}>
                                <div className="py-1">
                                  <button
                                    onClick={() => handlePreview(draft)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#00A6FF] hover:bg-[var(--admin-primary-soft)] rounded-lg transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-[#00A6FF]" />
                                    <span>Preview Draft</span>
                                  </button>
                                  <button
                                    onClick={() => handleEdit(draft)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#FF6D00] hover:bg-[#FF6D00]/10 rounded-lg transition-colors"
                                  >
                                    <Edit className="w-3.5 h-3.5 text-[#FF6D00]" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handlePublish(draft)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#72D669] hover:bg-[#72D669]/10 rounded-lg transition-colors"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 text-[#72D669]" />
                                    <span>Publish Live</span>
                                  </button>
                                  <button
                                    onClick={() => handleArchive(draft)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                                  >
                                    <Archive className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Archive</span>
                                  </button>
                                </div>
                                <div className="pt-1">
                                  <button
                                    onClick={() => handleDelete(draft)}
                                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[var(--admin-border-subtle)] flex items-center justify-between gap-4 flex-wrap text-xs text-[var(--admin-text-muted)]">
              <span>
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredDrafts.length)} of {filteredDrafts.length} drafts
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="admin-btn admin-btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="font-semibold text-[var(--admin-text-primary)] px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="admin-btn admin-btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Drafts
