import React, { useEffect, useState, useMemo } from 'react'
import { 
  Search, 
  MoreVertical, 
  Trash2, 
  Eye, 
  Archive,
  FileText,
  Calendar,
  X,
  CheckCircle,
  RefreshCw,
  Briefcase
} from 'lucide-react'
import { adminAPI } from '@api'
import { analyzeSEO } from '@utils/seoAnalyzer'

const Archives = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('blogs')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)

  const fetchArchivedBlogs = async () => {
    try {
      const response = await adminAPI.getBlogs({ status: 'archived', page: 1, limit: 100 })
      const blogsData = response.data.data?.blogs || response.data.blogs || []
      setBlogs(blogsData)
    } catch (error) {
      console.error('Failed to fetch archived blogs:', error)
      setBlogs([])
    }
  }

  const fetchArchivedJobs = async () => {
    try {
      const response = await adminAPI.getJobs({ status: 'archived', page: 1, limit: 100 })
      const jobsData = response.data.data?.jobs || response.data.jobs || []
      setJobs(jobsData)
    } catch (error) {
      console.error('Failed to fetch archived jobs:', error)
      setJobs([])
    }
  }

  const loadArchives = async (isInitial = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setRefreshing(true)
    }
    await Promise.all([fetchArchivedBlogs(), fetchArchivedJobs()])
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    loadArchives(true)
  }, [])

  // 1. PREVIEW Action: Opens item in preview mode with ?preview=true
  const handlePreviewBlog = (blog) => {
    setActiveDropdown(null)
    const slugOrId = blog.slug || blog.id
    window.open(`/blog/${slugOrId}?preview=true`, '_blank')
  }

  const handlePreviewJob = (job) => {
    setActiveDropdown(null)
    window.open(`/careers?jobId=${job.id}`, '_blank')
  }

  // 2. RESTORE Action: Restores blog to published or draft with SEO recalculation
  const handleRestoreBlog = async (blog, targetStatus = 'published') => {
    setActiveDropdown(null)
    try {
      const seoAnalysis = analyzeSEO(blog)
      await adminAPI.updateBlog(blog.id, { 
        status: targetStatus,
        seo_score: seoAnalysis.score,
        seo_analysis: seoAnalysis
      })
      await fetchArchivedBlogs()
      if (targetStatus === 'published') {
        alert(`"${blog.title}" restored and published! It is now live on the public blog (/blog).`)
      } else {
        alert(`"${blog.title}" restored as draft! You can view and edit it in Drafts (/admin/drafts).`)
      }
    } catch (error) {
      console.error('Failed to restore blog:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to restore blog.'
      alert(`Failed to restore blog: ${errorMsg}`)
    }
  }

  const handleRestoreJob = async (job, targetStatus = 'published') => {
    setActiveDropdown(null)
    try {
      await adminAPI.updateJob(job.id, { status: targetStatus })
      await fetchArchivedJobs()
      if (targetStatus === 'published') {
        alert(`"${job.title}" restored and published! It is now live on Careers (/careers).`)
      } else {
        alert(`"${job.title}" restored as draft! You can view it in Drafts (/admin/drafts).`)
      }
    } catch (error) {
      console.error('Failed to restore job:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to restore job.'
      alert(`Failed to restore job: ${errorMsg}`)
    }
  }

  // 3. DELETE Action: Permanently deletes the record
  const handleDeleteBlog = async (blog) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to permanently delete "${blog.title}"? This action cannot be undone.`)) {
      try {
        await adminAPI.deleteBlog(blog.id)
        await fetchArchivedBlogs()
        alert(`"${blog.title}" deleted permanently!`)
      } catch (error) {
        console.error('Failed to delete blog:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to delete blog.'
        alert(`Failed to delete blog: ${errorMsg}`)
      }
    }
  }

  const handleDeleteJob = async (job) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to permanently delete "${job.title}"? This action cannot be undone.`)) {
      try {
        await adminAPI.deleteJob(job.id)
        await fetchArchivedJobs()
        alert(`"${job.title}" deleted permanently!`)
      } catch (error) {
        console.error('Failed to delete job:', error)
        const errorMsg = error.response?.data?.message || error.message || 'Failed to delete job.'
        alert(`Failed to delete job: ${errorMsg}`)
      }
    }
  }

  // Reactive filtering
  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs
    const q = searchTerm.toLowerCase().trim()
    return blogs.filter(b => 
      (b.title || '').toLowerCase().includes(q) ||
      (b.excerpt || '').toLowerCase().includes(q) ||
      (b.author_name || '').toLowerCase().includes(q) ||
      (b.category_name || '').toLowerCase().includes(q) ||
      (b.slug || '').toLowerCase().includes(q)
    )
  }, [blogs, searchTerm])

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs
    const q = searchTerm.toLowerCase().trim()
    return jobs.filter(j => 
      (j.title || '').toLowerCase().includes(q) ||
      (j.description || '').toLowerCase().includes(q) ||
      (j.location || '').toLowerCase().includes(q) ||
      (j.type || '').toLowerCase().includes(q)
    )
  }, [jobs, searchTerm])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Archives</h1>
          <p className="text-text-secondary text-sm">Manage your archived blogs and career postings</p>
        </div>
        <button
          type="button"
          onClick={() => loadArchives(false)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3.5 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface/80 transition-colors text-sm cursor-pointer"
          title="Refresh archives list"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-primary' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2.5 font-medium text-sm transition-colors cursor-pointer ${
            activeTab === 'blogs'
              ? 'text-primary border-b-2 border-primary font-semibold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Blogs ({blogs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 font-medium text-sm transition-colors cursor-pointer ${
            activeTab === 'jobs'
              ? 'text-primary border-b-2 border-primary font-semibold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Jobs ({jobs.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          placeholder={`Search archived ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm transition-colors"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 rounded cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-xl border border-border">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mb-3" />
          <div className="text-text-muted text-sm">Loading archives...</div>
        </div>
      ) : activeTab === 'blogs' ? (
        /* Archived Blogs Table */
        <div className="bg-surface rounded-xl border border-border">
          <div className={`overflow-x-auto ${filteredBlogs.length > 0 ? 'min-h-[340px] pb-20' : ''}`}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Archived Date</th>
                  <th className="w-16 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-text-secondary">
                      <Archive className="w-12 h-12 text-text-muted mx-auto mb-3" />
                      <p className="font-medium text-text-primary">No archived blogs found</p>
                      <p className="text-xs text-text-muted mt-1">
                        {searchTerm ? `No archived blogs match "${searchTerm}"` : 'Archived blogs will appear here'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog, index) => {
                    const rowId = `blog-${blog.id}`
                    return (
                      <tr key={blog.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {blog.featured_image || blog.image ? (
                              <img 
                                src={blog.featured_image || blog.image} 
                                alt="" 
                                className="w-12 h-12 rounded-lg object-cover bg-background border border-border"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-surface/80 border border-border/50 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-text-muted" />
                              </div>
                            )}
                            <div className="max-w-md">
                              <p className="font-semibold text-text-primary text-sm sm:text-base line-clamp-1">{blog.title}</p>
                              <p className="text-xs text-text-muted truncate max-w-sm">{blog.excerpt || 'No excerpt'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{blog.author_name || '-'}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{blog.category_name || '-'}</td>
                        <td className="px-6 py-4 text-text-secondary">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Calendar className="w-4 h-4 text-text-muted" />
                            <span>{new Date(blog.updated_at || blog.created_at).toLocaleDateString()}</span>
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
                              aria-label="Blog archive actions"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            {activeDropdown === rowId && (
                              <>
                                <div 
                                  className="fixed inset-0 z-40" 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdown(null)
                                  }}
                                />
                                <div className={`absolute right-0 ${
                                  index >= Math.max(1, filteredBlogs.length - 2) && filteredBlogs.length > 2
                                    ? 'bottom-full mb-2' 
                                    : 'top-full mt-2'
                                } w-52 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1.5 divide-y divide-border/40 backdrop-blur-md`}>
                                  <div className="py-1">
                                    {/* 1. PREVIEW */}
                                    <button 
                                      type="button"
                                      onClick={() => handlePreviewBlog(blog)}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <Eye className="w-4 h-4 text-[#00A6FF]" />
                                      <span>Preview</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {/* 2. RESTORE & PUBLISH */}
                                    <button 
                                      type="button"
                                      onClick={() => handleRestoreBlog(blog, 'published')}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                                      <span>Restore &amp; Publish</span>
                                    </button>

                                    {/* 3. RESTORE AS DRAFT */}
                                    <button 
                                      type="button"
                                      onClick={() => handleRestoreBlog(blog, 'draft')}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <FileText className="w-4 h-4 text-amber-500" />
                                      <span>Restore to Drafts</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {/* 4. DELETE PERMANENTLY */}
                                    <button 
                                      type="button"
                                      onClick={() => handleDeleteBlog(blog)}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4 text-error" />
                                      <span>Delete Permanently</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Archived Jobs Table */
        <div className="bg-surface rounded-xl border border-border">
          <div className={`overflow-x-auto ${filteredJobs.length > 0 ? 'min-h-[340px] pb-20' : ''}`}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Archived Date</th>
                  <th className="w-16 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-text-secondary">
                      <Briefcase className="w-12 h-12 text-text-muted mx-auto mb-3" />
                      <p className="font-medium text-text-primary">No archived jobs found</p>
                      <p className="text-xs text-text-muted mt-1">
                        {searchTerm ? `No archived jobs match "${searchTerm}"` : 'Archived jobs will appear here'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job, index) => {
                    const rowId = `job-${job.id}`
                    return (
                      <tr key={job.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-text-primary text-sm sm:text-base">{job.title}</p>
                          <p className="text-xs text-text-muted truncate max-w-sm">{job.description || 'No description'}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{job.location || '-'}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{job.type || '-'}</td>
                        <td className="px-6 py-4 text-text-secondary">
                          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Calendar className="w-4 h-4 text-text-muted" />
                            <span>{new Date(job.updated_at || job.created_at).toLocaleDateString()}</span>
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
                              aria-label="Job archive actions"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            {activeDropdown === rowId && (
                              <>
                                <div 
                                  className="fixed inset-0 z-40" 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveDropdown(null)
                                  }}
                                />
                                <div className={`absolute right-0 ${
                                  index >= Math.max(1, filteredJobs.length - 2) && filteredJobs.length > 2
                                    ? 'bottom-full mb-2' 
                                    : 'top-full mt-2'
                                } w-52 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1.5 divide-y divide-border/40 backdrop-blur-md`}>
                                  <div className="py-1">
                                    {/* 1. PREVIEW */}
                                    <button 
                                      type="button"
                                      onClick={() => handlePreviewJob(job)}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <Eye className="w-4 h-4 text-[#00A6FF]" />
                                      <span>Preview</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {/* 2. RESTORE & PUBLISH */}
                                    <button 
                                      type="button"
                                      onClick={() => handleRestoreJob(job, 'published')}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                                      <span>Restore &amp; Publish</span>
                                    </button>

                                    {/* 3. RESTORE AS DRAFT */}
                                    <button 
                                      type="button"
                                      onClick={() => handleRestoreJob(job, 'draft')}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors cursor-pointer"
                                    >
                                      <FileText className="w-4 h-4 text-amber-500" />
                                      <span>Restore to Drafts</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {/* 4. DELETE PERMANENTLY */}
                                    <button 
                                      type="button"
                                      onClick={() => handleDeleteJob(job)}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4 text-error" />
                                      <span>Delete Permanently</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Archives
