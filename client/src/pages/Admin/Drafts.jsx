import React, { useEffect, useState, useMemo } from 'react'
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
  RefreshCw
} from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate } from 'react-router-dom'
import { analyzeSEO } from '@utils/seoAnalyzer'

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

  // Reset pagination to page 1 on search or filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, typeFilter])

  const fetchDrafts = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true)
      } else {
        setRefreshing(true)
      }
      
      // Fetch draft blogs
      let blogsData = []
      try {
        const blogsResponse = await adminAPI.getBlogs({ status: 'draft', page: 1, limit: 100 })
        blogsData = blogsResponse.data.data?.blogs || blogsResponse.data.blogs || []
      } catch (blogError) {
        console.error('Failed to fetch blogs:', blogError)
        blogsData = []
      }
      
      // Fetch draft jobs
      let jobsData = []
      try {
        const jobsResponse = await adminAPI.getJobs({ status: 'draft', page: 1, limit: 100 })
        jobsData = jobsResponse.data.data?.jobs || jobsResponse.data.jobs || []
      } catch (jobError) {
        console.error('Failed to fetch jobs:', jobError)
        jobsData = []
      }
      
      // Combine drafts with type indicator
      const combined = [
        ...blogsData.map(item => ({ ...item, type: 'blog' })),
        ...jobsData.map(item => ({ ...item, type: 'job' }))
      ]

      // Sort by updated_at or created_at descending
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

  // Reactive and instant search filtering without page unmounting
  const filteredDrafts = useMemo(() => {
    return allDrafts.filter(draft => {
      // Type filter
      if (typeFilter && draft.type !== typeFilter) {
        return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const title = (draft.title || '').toLowerCase()
        const excerpt = (draft.excerpt || draft.description || '').toLowerCase()
        const authorOrDept = (draft.author_name || draft.department || '').toLowerCase()
        const category = (draft.category_name || '').toLowerCase()
        const slug = (draft.slug || '').toLowerCase()
        const type = (draft.type || '').toLowerCase()

        const matches = title.includes(query) ||
          excerpt.includes(query) ||
          authorOrDept.includes(query) ||
          category.includes(query) ||
          slug.includes(query) ||
          type.includes(query)

        if (!matches) return false
      }

      return true
    })
  }, [allDrafts, typeFilter, searchQuery])

  // Paginated slice
  const totalPages = Math.ceil(filteredDrafts.length / pageSize) || 1
  const paginatedDrafts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredDrafts.slice(startIndex, startIndex + pageSize)
  }, [filteredDrafts, currentPage, pageSize])

  const handleSelectDraft = (id) => {
    setSelectedDrafts(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id) 
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedDrafts.length === paginatedDrafts.length && paginatedDrafts.length > 0) {
      setSelectedDrafts([])
    } else {
      setSelectedDrafts(paginatedDrafts.map(d => d.id))
    }
  }

  const getTypeBadge = (type) => {
    const styles = {
      blog: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      job: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    }
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${styles[type] || styles.blog}`}>
        {type || 'BLOG'}
      </span>
    )
  }

  const getTypeIcon = (type) => {
    return type === 'job' ? Briefcase : FileText
  }

  // 1. PREVIEW Action: Opens draft in new tab with preview=true
  const handlePreview = (draft) => {
    setActiveDropdown(null)
    if (draft.type === 'blog') {
      const slugOrId = draft.slug || draft.id
      window.open(`/blog/${slugOrId}?preview=true`, '_blank')
    } else if (draft.type === 'job') {
      window.open(`/careers?jobId=${draft.id}`, '_blank')
    }
  }

  // 2. EDIT Action: Navigates to edit page
  const handleEdit = (draft) => {
    setActiveDropdown(null)
    if (draft.type === 'blog') {
      navigate(`/admin/blogs/edit/${draft.id}`)
    } else if (draft.type === 'job') {
      navigate(`/admin/jobs/edit/${draft.id}`)
    }
  }

  // 3. PUBLISH Action: Sets status to published, recalculates SEO score, alerts user
  const handlePublish = async (draft) => {
    setActiveDropdown(null)
    try {
      if (draft.type === 'blog') {
        const seoAnalysis = analyzeSEO(draft)
        await adminAPI.updateBlog(draft.id, { 
          status: 'published',
          seo_score: seoAnalysis.score
        })
      } else if (draft.type === 'job') {
        await adminAPI.updateJob(draft.id, { status: 'published' })
      }
      await fetchDrafts(false)
      alert(`"${draft.title}" published successfully! It is now live on the website.`)
    } catch (error) {
      console.error('Failed to publish:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to publish. Please try again.'
      alert(`Failed to publish: ${errorMsg}`)
    }
  }

  // 4. ARCHIVE Action: Moves to archive
  const handleArchive = async (draft) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to archive "${draft.title}"?`)) {
      try {
        if (draft.type === 'blog') {
          const seoAnalysis = analyzeSEO(draft)
          await adminAPI.updateBlog(draft.id, { 
            status: 'archived',
            seo_score: seoAnalysis.score
          })
        } else if (draft.type === 'job') {
          await adminAPI.updateJob(draft.id, { status: 'archived' })
        }
        await fetchDrafts(false)
        alert(`"${draft.title}" archived successfully!`)
      } catch (error) {
        console.error('Failed to archive:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to archive.'
        alert(`Failed to archive: ${errorMsg}`)
      }
    }
  }

  // 5. DELETE Action: Permanently deletes draft
  const handleDelete = async (draft) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to permanently delete "${draft.title}"? This action cannot be undone.`)) {
      try {
        if (draft.type === 'blog') {
          await adminAPI.deleteBlog(draft.id)
        } else if (draft.type === 'job') {
          await adminAPI.deleteJob(draft.id)
        }
        await fetchDrafts(false)
        alert(`"${draft.title}" deleted successfully!`)
      } catch (error) {
        console.error('Failed to delete:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete'
        alert(`Failed to delete: ${errorMessage}`)
      }
    }
  }

  // Bulk Actions
  const handleBulkPublish = async () => {
    if (selectedDrafts.length === 0) return
    try {
      await Promise.all(selectedDrafts.map(id => {
        const draft = allDrafts.find(d => d.id === id)
        if (draft) {
          if (draft.type === 'blog') {
            const seoAnalysis = analyzeSEO(draft)
            return adminAPI.updateBlog(draft.id, { 
              status: 'published',
              seo_score: seoAnalysis.score
            })
          } else if (draft.type === 'job') {
            return adminAPI.updateJob(draft.id, { status: 'published' })
          }
        }
      }))
      setSelectedDrafts([])
      await fetchDrafts(false)
      alert(`${selectedDrafts.length} item(s) published successfully!`)
    } catch (error) {
      console.error('Failed to bulk publish:', error)
      alert('Failed to publish items. Please try again.')
    }
  }

  const handleBulkArchive = async () => {
    if (selectedDrafts.length === 0) return
    if (!window.confirm(`Are you sure you want to archive ${selectedDrafts.length} item(s)?`)) return
    try {
      await Promise.all(selectedDrafts.map(id => {
        const draft = allDrafts.find(d => d.id === id)
        if (draft) {
          if (draft.type === 'blog') {
            const seoAnalysis = analyzeSEO(draft)
            return adminAPI.updateBlog(draft.id, { 
              status: 'archived',
              seo_score: seoAnalysis.score
            })
          } else if (draft.type === 'job') {
            return adminAPI.updateJob(draft.id, { status: 'archived' })
          }
        }
      }))
      setSelectedDrafts([])
      await fetchDrafts(false)
      alert(`${selectedDrafts.length} item(s) archived successfully!`)
    } catch (error) {
      console.error('Failed to bulk archive:', error)
      alert('Failed to archive items. Please try again.')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedDrafts.length === 0) return
    if (!window.confirm(`Are you sure you want to permanently delete ${selectedDrafts.length} item(s)? This action cannot be undone.`)) return
    try {
      await Promise.all(selectedDrafts.map(id => {
        const draft = allDrafts.find(d => d.id === id)
        if (draft) {
          if (draft.type === 'blog') {
            return adminAPI.deleteBlog(draft.id)
          } else if (draft.type === 'job') {
            return adminAPI.deleteJob(draft.id)
          }
        }
      }))
      setSelectedDrafts([])
      await fetchDrafts(false)
      alert(`${selectedDrafts.length} item(s) deleted successfully!`)
    } catch (error) {
      console.error('Failed to bulk delete:', error)
      alert('Failed to delete items. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Drafts</h1>
          <p className="text-text-secondary text-sm">
            Manage your unpublished draft blogs and career listings
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchDrafts(false)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface/80 transition-colors text-sm cursor-pointer"
          title="Refresh drafts list"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-primary' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search drafts by title, excerpt, author, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary text-sm cursor-pointer"
          >
            <option value="">All Types ({allDrafts.length})</option>
            <option value="blog">Blogs ({allDrafts.filter(d => d.type === 'blog').length})</option>
            <option value="job">Jobs ({allDrafts.filter(d => d.type === 'job').length})</option>
          </select>
        </div>

        {/* Active search indicator */}
        {(searchQuery || typeFilter) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setTypeFilter('')
            }}
            className="text-xs text-primary hover:underline self-center"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedDrafts.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <span className="text-text-primary text-sm font-medium">
            {selectedDrafts.length} draft{selectedDrafts.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={handleBulkPublish}
              className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Publish Selected
            </button>
            <button 
              type="button"
              onClick={handleBulkArchive}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs sm:text-sm font-medium hover:bg-surface/80 transition-colors cursor-pointer"
            >
              Archive
            </button>
            <button 
              type="button"
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-error/20 text-error rounded-lg text-xs sm:text-sm font-medium hover:bg-error/30 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Loading state for initial load */}
      {loading && allDrafts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-xl border border-border">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-text-secondary text-sm">Loading drafts...</p>
        </div>
      ) : (
        /* Drafts Table */
        <div className="bg-surface rounded-xl border border-border">
          <div className={`overflow-x-auto ${paginatedDrafts.length > 0 ? 'min-h-[380px] pb-24' : ''}`}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-12 px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDrafts.length === paginatedDrafts.length && paginatedDrafts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Author / Department</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Last Modified</th>
                  <th className="w-16 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDrafts.map((draft, index) => {
                  const TypeIcon = getTypeIcon(draft.type)
                  const rowId = `${draft.type}-${draft.id}`
                  return (
                    <tr 
                      key={rowId} 
                      className="border-b border-border hover:bg-surface/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedDrafts.includes(draft.id)}
                          onChange={() => handleSelectDraft(draft.id)}
                          className="rounded border-border cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-surface/80 border border-border/50 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="max-w-md">
                            <p className="font-semibold text-text-primary text-sm sm:text-base line-clamp-1">
                              {draft.title}
                            </p>
                            <p className="text-xs text-text-muted truncate max-w-sm">
                              {draft.type === 'blog' ? (draft.excerpt || 'No excerpt') : (draft.description || 'No description')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getTypeBadge(draft.type)}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {draft.type === 'blog' ? (draft.author_name || draft.category_name || '-') : (draft.department || draft.location || '-')}
                      </td>
                      <td className="px-6 py-4 text-text-secondary">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                          <Calendar className="w-4 h-4 text-text-muted" />
                          <span>{new Date(draft.updated_at || draft.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === rowId ? null : rowId)
                            }}
                            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors cursor-pointer"
                            aria-label="Draft actions"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          
                          {activeDropdown === rowId && (
                            <>
                              {/* Backdrop to close dropdown on click outside */}
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveDropdown(null)
                                }}
                              />

                              {/* Dropdown Menu */}
                              <div 
                                className={`absolute right-0 ${
                                  index >= Math.max(1, paginatedDrafts.length - 2) && paginatedDrafts.length > 2
                                    ? 'bottom-full mb-2' 
                                    : 'top-full mt-2'
                                } w-52 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1.5 divide-y divide-border/40 backdrop-blur-md`}
                              >
                                <div className="py-1">
                                  {/* 1. PREVIEW */}
                                  <button 
                                    type="button"
                                    onClick={() => handlePreview(draft)}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4 text-[#00A6FF]" />
                                    <span>Preview</span>
                                  </button>

                                  {/* 2. EDIT */}
                                  <button 
                                    type="button"
                                    onClick={() => handleEdit(draft)}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                  >
                                    <Edit className="w-4 h-4 text-[#FF6D00]" />
                                    <span>Edit</span>
                                  </button>
                                </div>

                                <div className="py-1">
                                  {/* 3. PUBLISH */}
                                  <button 
                                    type="button"
                                    onClick={() => handlePublish(draft)}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                  >
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span>Publish</span>
                                  </button>

                                  {/* 4. ARCHIVE */}
                                  <button 
                                    type="button"
                                    onClick={() => handleArchive(draft)}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                  >
                                    <Archive className="w-4 h-4 text-purple-400" />
                                    <span>Archive</span>
                                  </button>
                                </div>

                                <div className="py-1">
                                  {/* 5. DELETE */}
                                  <button 
                                    type="button"
                                    onClick={() => handleDelete(draft)}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4 text-error" />
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

          {/* Empty State */}
          {filteredDrafts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <FileEdit className="w-14 h-14 text-text-muted mb-3" />
              <p className="text-text-primary font-semibold text-base mb-1">
                {searchQuery || typeFilter ? 'No matching drafts found' : 'No drafts found'}
              </p>
              <p className="text-text-muted text-xs sm:text-sm max-w-sm mb-4">
                {searchQuery || typeFilter 
                  ? `No drafts match "${searchQuery || typeFilter}". Try adjusting your filters.` 
                  : 'Content saved as draft will appear here.'}
              </p>
              {(searchQuery || typeFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setTypeFilter('')
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Clear search &amp; filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-xs sm:text-sm text-text-muted">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredDrafts.length)} of {filteredDrafts.length} drafts
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs sm:text-sm text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs sm:text-sm text-text-secondary px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-xs sm:text-sm text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface/80 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Drafts
