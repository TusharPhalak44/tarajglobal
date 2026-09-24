import React, { useEffect, useState, useMemo } from 'react'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Archive,
  Briefcase,
  Calendar,
  Users,
  MapPin,
  X,
  Save,
  Clock,
  Eye,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  FileText
} from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate } from 'react-router-dom'

const Jobs = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [jobs, setJobs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', search: '', type: '' })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewJob, setViewJob] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    salary: '',
    status: 'draft'
  })
  const [error, setError] = useState('')

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  useEffect(() => {
    fetchJobs()
  }, [filters.status, pagination.page])

  // Debounced search trigger for backend
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(true)
    }, 350)
    return () => clearTimeout(timer)
  }, [filters.search])

  // Prevent background page from scrolling when any modal is open
  useEffect(() => {
    if (showCreateModal || showViewModal) {
      const mainEl = document.querySelector('main')
      const originalBodyOverflow = document.body.style.overflow
      const originalMainOverflow = mainEl ? mainEl.style.overflow : ''

      document.body.style.overflow = 'hidden'
      if (mainEl) mainEl.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalBodyOverflow
        if (mainEl) mainEl.style.overflow = originalMainOverflow
      }
    }
  }, [showCreateModal, showViewModal])

  const fetchJobs = async (silent = false) => {
    try {
      if (!silent) setLoading(true)
      else setIsRefreshing(true)

      const response = await adminAPI.getJobs({
        status: filters.status,
        search: filters.search,
        page: pagination.page,
        limit: pagination.limit
      })

      const jobsData = Array.isArray(response.data?.data?.jobs)
        ? response.data.data.jobs
        : Array.isArray(response.data?.jobs)
          ? response.data.jobs
          : []
      const paginationData = response.data?.data?.pagination || response.data?.pagination || { page: 1, limit: 10, total: jobsData.length, totalPages: 1 }

      setJobs(jobsData)
      setPagination(paginationData)
    } catch (err) {
      console.error('Failed to fetch jobs:', err)
      if (!silent) setJobs([])
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  // Client-side quick filter for instantaneous typing response
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (filters.status && job.status !== filters.status) return false
      if (filters.type && job.type !== filters.type) return false
      if (filters.search) {
        const q = filters.search.toLowerCase().trim()
        const titleMatch = job.title?.toLowerCase().includes(q)
        const locMatch = job.location?.toLowerCase().includes(q)
        const typeMatch = job.type?.toLowerCase().includes(q)
        const descMatch = job.description?.toLowerCase().includes(q)
        const reqMatch = job.requirements?.toLowerCase().includes(q)
        return titleMatch || locMatch || typeMatch || descMatch || reqMatch
      }
      return true
    })
  }, [jobs, filters])

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setError('')

    if (!createForm.title.trim()) {
      setError('Title is required')
      return
    }
    if (!createForm.description.trim()) {
      setError('Description is required')
      return
    }

    try {
      setSaving(true)
      await adminAPI.createJob(createForm)
      setShowCreateModal(false)
      setCreateForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        type: 'full-time',
        salary: '',
        status: 'draft'
      })
      showToast('Job created successfully')
      fetchJobs()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job')
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20',
      published: 'bg-green-500/15 text-green-400 border border-green-500/20',
      archived: 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || styles.draft}`}>
        {status?.replace('_', ' ').toUpperCase() || 'DRAFT'}
      </span>
    )
  }

  const handleEdit = (job) => {
    setActiveDropdown(null)
    navigate(`/admin/jobs/edit/${job.id}`)
  }

  const handlePreview = (job) => {
    setActiveDropdown(null)
    window.open(`/careers?jobId=${job.id}`, '_blank')
  }

  const handleViewApplications = (job) => {
    setActiveDropdown(null)
    navigate(`/admin/applications?job_id=${job.id}&job_title=${encodeURIComponent(job.title)}`)
  }

  const handleViewJob = (job) => {
    setActiveDropdown(null)
    setViewJob(job)
    setShowViewModal(true)
  }

  const handleArchive = async (job) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to archive "${job.title}"?`)) {
      try {
        await adminAPI.updateJob(job.id, { status: 'archived' })
        setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: 'archived' } : j))
        showToast(`"${job.title}" archived successfully`)
      } catch (err) {
        console.error('Failed to archive job:', err)
        alert('Failed to archive job. Please try again.')
      }
    }
  }

  const handleRestore = async (job, targetStatus = 'published') => {
    setActiveDropdown(null)
    try {
      await adminAPI.updateJob(job.id, { status: targetStatus })
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: targetStatus } : j))
      showToast(`"${job.title}" restored as ${targetStatus}`)
    } catch (err) {
      console.error('Failed to restore job:', err)
      alert('Failed to restore job. Please try again.')
    }
  }

  const handleTogglePublish = async (job) => {
    setActiveDropdown(null)
    const newStatus = job.status === 'published' ? 'draft' : 'published'
    try {
      await adminAPI.updateJob(job.id, { status: newStatus })
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: newStatus } : j))
      showToast(`"${job.title}" moved to ${newStatus}`)
    } catch (err) {
      console.error('Failed to update job status:', err)
      alert('Failed to update status. Please try again.')
    }
  }

  const handleDelete = async (job) => {
    setActiveDropdown(null)
    if (window.confirm(`Are you sure you want to permanently delete "${job.title}"? This action cannot be undone.`)) {
      try {
        await adminAPI.deleteJob(job.id)
        setJobs(prev => prev.filter(j => j.id !== job.id))
        showToast(`Job "${job.title}" permanently deleted`)
      } catch (err) {
        console.error('Failed to delete job:', err)
        alert(err.response?.data?.message || 'Failed to delete job. Please try again.')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl shadow-2xl animate-fade-in text-sm font-medium border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-white" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Jobs</h1>
          <p className="text-text-secondary text-sm">Manage job postings, requirements, and candidate applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchJobs(true)}
            className="p-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors hover:bg-surface/80"
            title="Refresh jobs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Job
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Job */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search job title, location, type, skills..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-9 pr-9 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* All Status Filter */}
        <div className="flex items-center gap-2">
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm font-medium"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm font-medium"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          {(filters.status || filters.search || filters.type) && (
            <button
              onClick={() => setFilters({ status: '', search: '', type: '' })}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-text-muted hover:text-text-primary bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Indicators */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}</span>
        {filters.status && (
          <span className="px-2 py-0.5 bg-surface border border-border rounded text-text-secondary">
            Status: <b className="text-text-primary uppercase">{filters.status}</b>
          </span>
        )}
        {filters.type && (
          <span className="px-2 py-0.5 bg-surface border border-border rounded text-text-secondary">
            Type: <b className="text-text-primary">{filters.type}</b>
          </span>
        )}
        {filters.search && (
          <span className="px-2 py-0.5 bg-surface border border-border rounded text-text-secondary">
            Query: "<b className="text-text-primary">{filters.search}</b>"
          </span>
        )}
      </div>

      {/* Jobs Table Container */}
      <div className="bg-surface rounded-xl border border-border shadow-sm">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/50 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-3.5">Job Title</th>
                <th className="px-6 py-3.5">Location</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Applications</th>
                <th className="px-6 py-3.5">Posted</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                      <span>Loading jobs...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Briefcase className="w-12 h-12 text-text-muted mb-3 opacity-60" />
                      <p className="text-base font-semibold text-text-primary mb-1">No jobs found</p>
                      <p className="text-text-muted text-xs mb-4">Try clearing filters or post a new job opening.</p>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create New Job
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job, index) => {
                  const isBottomHalf = index >= filteredJobs.length - 2 && index > 1
                  const isDropdownOpen = activeDropdown === job.id

                  return (
                    <tr
                      key={job.id}
                      className="hover:bg-surface/70 transition-colors group"
                    >
                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text-primary group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleViewJob(job)}>
                          {job.title}
                        </div>
                        {job.salary && (
                          <span className="text-xs text-text-muted">{job.salary}</span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4 text-text-secondary">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                          <span>{job.location || 'Remote'}</span>
                        </div>
                      </td>

                      {/* Employment Type */}
                      <td className="px-6 py-4 text-text-secondary capitalize">
                        {job.type || 'Full-time'}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(job.status)}
                      </td>

                      {/* Applications Count */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewApplications(job)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background border border-border hover:border-primary/40 hover:text-primary transition-colors text-xs font-medium"
                          title="View applications for this job"
                        >
                          <Users className="w-3.5 h-3.5 text-text-muted" />
                          <span className="font-semibold text-text-primary">{job.application_count || 0}</span>
                          <span className="text-text-muted hidden sm:inline">apps</span>
                        </button>
                      </td>

                      {/* Posted Date */}
                      <td className="px-6 py-4 text-text-secondary text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                          <span>{new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Action Dropdown */}
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setActiveDropdown(isDropdownOpen ? null : job.id)}
                            className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background border border-transparent hover:border-border transition-colors"
                            aria-label="Job actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Backdrop Click Dismiss */}
                          {isDropdownOpen && (
                            <div
                              className="fixed inset-0 z-40 bg-transparent"
                              onClick={() => setActiveDropdown(null)}
                            />
                          )}

                          {/* Dropdown Menu */}
                          {isDropdownOpen && (
                            <div
                              className={`absolute right-0 ${isBottomHalf ? 'bottom-full mb-2' : 'top-full mt-2'} w-52 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1.5 backdrop-blur-md animate-in fade-in zoom-in-95`}
                            >
                              {/* View Details */}
                              <button
                                onClick={() => handleViewJob(job)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-primary/10 hover:text-primary transition-colors text-left"
                              >
                                <Eye className="w-3.5 h-3.5 text-primary" />
                                View Details
                              </button>

                              {/* Preview on Public Careers */}
                              <button
                                onClick={() => handlePreview(job)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors text-left"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                                Preview on Careers
                              </button>

                              {/* Edit Job */}
                              <button
                                onClick={() => handleEdit(job)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors text-left"
                              >
                                <Edit className="w-3.5 h-3.5 text-text-muted" />
                                Edit Job
                              </button>

                              {/* View Applications */}
                              <button
                                onClick={() => handleViewApplications(job)}
                                className="flex items-center justify-between w-full px-3.5 py-2 text-xs font-medium text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors text-left"
                              >
                                <span className="flex items-center gap-2.5">
                                  <Users className="w-3.5 h-3.5 text-text-muted" />
                                  View Applications
                                </span>
                                {job.application_count > 0 && (
                                  <span className="px-1.5 py-0.2 bg-primary/20 text-primary text-[10px] rounded-full font-bold">
                                    {job.application_count}
                                  </span>
                                )}
                              </button>

                              <div className="my-1 border-t border-border/70" />

                              {/* Publish / Draft Toggle */}
                              {job.status === 'published' ? (
                                <button
                                  onClick={() => handleTogglePublish(job)}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-yellow-500 hover:bg-yellow-500/10 transition-colors text-left"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  Move to Draft
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleTogglePublish(job)}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-green-500 hover:bg-green-500/10 transition-colors text-left"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Publish Job
                                </button>
                              )}

                              {/* Archive or Restore */}
                              {job.status === 'archived' ? (
                                <button
                                  onClick={() => handleRestore(job, 'published')}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-emerald-500 hover:bg-emerald-500/10 transition-colors text-left"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  Restore & Publish
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleArchive(job)}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-orange-400 hover:bg-orange-500/10 transition-colors text-left"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                  Archive
                                </button>
                              )}

                              <div className="my-1 border-t border-border/70" />

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(job)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Permanently
                              </button>
                            </div>
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

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border text-xs text-text-secondary">
            <div>
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} jobs
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-3 py-1.5 bg-background border border-border rounded-lg text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface transition-colors"
              >
                Previous
              </button>
              <span className="font-semibold text-text-primary">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1.5 bg-background border border-border rounded-lg text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Job Details Modal */}
      {showViewModal && viewJob && (
        <div
          className="fixed inset-0 bg-black/60 z-50 p-3 sm:p-6 backdrop-blur-sm animate-fade-in flex items-center justify-center overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowViewModal(false)
          }}
        >
          <div
            className="bg-surface rounded-2xl border border-border w-full max-w-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between shrink-0 bg-surface z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{viewJob.title}</h2>
                  <p className="text-xs text-text-muted">Job ID: #{viewJob.id} &bull; Created {new Date(viewJob.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 overscroll-contain">
              {/* Quick Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-background rounded-xl border border-border">
                  <span className="text-xs text-text-muted block mb-1">Status</span>
                  {getStatusBadge(viewJob.status)}
                </div>
                <div className="p-3.5 bg-background rounded-xl border border-border">
                  <span className="text-xs text-text-muted block mb-1">Employment</span>
                  <span className="font-semibold text-text-primary text-sm capitalize">{viewJob.type || 'Full-time'}</span>
                </div>
                <div className="p-3.5 bg-background rounded-xl border border-border">
                  <span className="text-xs text-text-muted block mb-1">Location</span>
                  <span className="font-semibold text-text-primary text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {viewJob.location || 'Remote'}
                  </span>
                </div>
                <div className="p-3.5 bg-background rounded-xl border border-border">
                  <span className="text-xs text-text-muted block mb-1">Applications</span>
                  <span className="font-semibold text-text-primary text-sm flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    {viewJob.application_count || 0} received
                  </span>
                </div>
              </div>

              {viewJob.salary && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-text-primary">
                  <span className="text-text-muted font-medium">Offered Salary: </span>
                  <span className="font-bold text-primary">{viewJob.salary}</span>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Job Description
                </h4>
                <div className="p-4 bg-background rounded-xl border border-border text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                  {viewJob.description || 'No description provided.'}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Key Requirements & Qualifications
                </h4>
                <div className="p-4 bg-background rounded-xl border border-border text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                  {viewJob.requirements || 'No specific requirements listed.'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreview(viewJob)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-background border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary/40 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview on Careers
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowViewModal(false)
                      handleViewApplications(viewJob)
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-background border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary/40 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    View Applications ({viewJob.application_count || 0})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowViewModal(false)
                      handleEdit(viewJob)
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs font-medium cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 p-3 sm:p-6 backdrop-blur-sm animate-fade-in flex items-center justify-center overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) setShowCreateModal(false)
          }}
        >
          <div
            className="bg-surface rounded-2xl border border-border w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between shrink-0 bg-surface z-10">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Create New Job</h2>
                <p className="text-xs text-text-muted">Post a new career role on the website</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background transition-colors cursor-pointer"
                disabled={saving}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleCreateJob}
              className="p-5 sm:p-6 space-y-4 text-sm overflow-y-auto flex-1 overscroll-contain"
            >
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Job Title *</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Description *</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Detailed job description and day-to-day responsibilities..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Location</label>
                  <input
                    type="text"
                    value={createForm.location}
                    onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                    placeholder="e.g. Remote / New York"
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Employment Type</label>
                  <select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm cursor-pointer"
                    disabled={saving}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Offered Salary / Range</label>
                  <input
                    type="text"
                    value={createForm.salary}
                    onChange={(e) => setCreateForm({ ...createForm, salary: e.target.value })}
                    placeholder="e.g. $70,000 - $95,000 / year"
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Status</label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm cursor-pointer"
                    disabled={saving}
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live on Careers)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Requirements & Qualifications</label>
                <textarea
                  value={createForm.requirements}
                  onChange={(e) => setCreateForm({ ...createForm, requirements: e.target.value })}
                  placeholder="Required skills, years of experience, certifications..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border shrink-0 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium cursor-pointer"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-xs disabled:opacity-50 shadow-md cursor-pointer"
                >
                  {saving ? <><Clock className="w-3.5 h-3.5 animate-spin" /> Creating...</> : <><Save className="w-3.5 h-3.5" /> Post Job</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs
