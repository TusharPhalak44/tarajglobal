import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Trash2, 
  Archive, 
  Briefcase, 
  Calendar, 
  Users, 
  MapPin, 
  X, 
  Clock, 
  Eye, 
  CheckCircle2, 
  MoreVertical,
  Edit
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

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
  const [viewJob, setViewJob] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [error, setError] = useState('')

  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    salary: '',
    status: 'draft'
  })

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  useEffect(() => {
    fetchJobs()
  }, [filters.status, pagination.page])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

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

  const handleCreateJob = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!createForm.title.trim()) {
      setError('Job position title is required')
      return
    }
    if (!createForm.description.trim()) {
      setError('Job description is required')
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
      fetchJobs()
      showToast('Career position created successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create position')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (job, newStatus) => {
    setActiveDropdown(null)
    try {
      await adminAPI.updateJob(job.id, { status: newStatus })
      fetchJobs(true)
      showToast(`Position status updated.`)
    } catch (err) {
      alert(`Failed to update status: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleDeleteJob = async () => {
    if (!deleteConfirm) return
    try {
      setSaving(true)
      await adminAPI.deleteJob(deleteConfirm.id)
      setDeleteConfirm(null)
      fetchJobs(true)
      showToast('Position deleted.')
    } catch (err) {
      alert(`Failed to delete: ${err.response?.data?.message || err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Career Openings"
        subtitle="Manage job requisitions, hiring requirements, and candidate pipelines."
        breadcrumbs={[{ label: 'Jobs' }]}
        onRefresh={() => fetchJobs(true)}
        isRefreshing={isRefreshing}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn admin-btn-primary shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Post Position</span>
          </button>
        }
      />

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-[var(--admin-bg-surface)] border border-[var(--admin-success)] text-[var(--admin-success)] text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search positions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="admin-input pl-10 pr-8 w-full"
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

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="admin-select min-w-[150px] w-full sm:w-auto"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Jobs List */}
      {loading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No career positions found"
          description="Create job requisitions to attract candidate applications."
          actionLabel="Post Position"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="admin-card p-4 sm:p-5 flex items-center justify-between gap-6 group"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 
                    onClick={() => setViewJob(job)}
                    className="text-sm sm:text-base font-bold text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors cursor-pointer truncate"
                  >
                    {job.title}
                  </h3>
                  <StatusBadge status={job.status || 'draft'} />
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--admin-text-muted)] flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--admin-primary)]" />
                    <span className="text-[var(--admin-text-secondary)]">{job.location || 'Remote'}</span>
                  </span>
                  <span>•</span>
                  <span className="capitalize font-medium text-[var(--admin-text-secondary)]">{job.type || 'Full-time'}</span>
                  <span>•</span>
                  <span className="text-[var(--admin-text-secondary)]">{job.salary || 'Competitive'}</span>
                  <span>•</span>
                  <Link 
                    to={`/admin/applications?job_id=${job.id}&job_title=${encodeURIComponent(job.title)}`}
                    className="text-[var(--admin-primary)] hover:underline font-bold"
                  >
                    {job.application_count ?? job.applications_count ?? 0} applicants →
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setViewJob(job)}
                  className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                  title="View Position"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate(`/admin/jobs/edit/${job.id}`)}
                  className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                  title="Edit Position"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDropdown(activeDropdown === job.id ? null : job.id)
                    }}
                    className="p-2 rounded-lg hover:bg-[var(--admin-bg-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeDropdown === job.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                      <div className="absolute right-0 top-full mt-1.5 w-40 bg-[var(--admin-bg-card)] border border-[var(--admin-border-base)] rounded-xl shadow-xl p-1.5 z-50 text-xs admin-card-hover">
                        {job.status !== 'active' ? (
                          <button
                            onClick={() => handleStatusChange(job, 'active')}
                            className="w-full text-left px-3 py-2 text-[var(--admin-success)] hover:bg-[var(--admin-bg-elevated)] rounded-lg font-semibold"
                          >
                            Set Active
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(job, 'draft')}
                            className="w-full text-left px-3 py-2 text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg-elevated)] rounded-lg font-medium"
                          >
                            Move to Draft
                          </button>
                        )}
                        <button
                          onClick={() => handleStatusChange(job, 'archived')}
                          className="w-full text-left px-3 py-2 text-[var(--admin-text-secondary)] hover:bg-[var(--admin-bg-elevated)] rounded-lg font-medium"
                        >
                          Archive
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirm(job)
                            setActiveDropdown(null)
                          }}
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
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="fixed inset-0" onClick={() => setViewJob(null)} />
          <div className="relative max-w-lg w-full bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-[var(--admin-border-subtle)]">
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">{viewJob.title}</h3>
                <p className="text-xs text-[var(--admin-text-secondary)] mt-0.5">{viewJob.location || 'Remote'} • {viewJob.type || 'Full-time'}</p>
              </div>
              <button onClick={() => setViewJob(null)} className="p-1 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[var(--admin-text-secondary)]">
              <div>
                <span className="font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">Description</span>
                <p className="leading-relaxed whitespace-pre-wrap bg-[var(--admin-bg-elevated)] p-3.5 rounded-xl border border-[var(--admin-border-base)]">{viewJob.description}</p>
              </div>

              {viewJob.requirements && (
                <div>
                  <span className="font-bold uppercase tracking-wider text-[var(--admin-text-muted)] block mb-1">Requirements</span>
                  <p className="leading-relaxed whitespace-pre-wrap bg-[var(--admin-bg-elevated)] p-3.5 rounded-xl border border-[var(--admin-border-base)]">{viewJob.requirements}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--admin-border-subtle)]">
              <Link to={`/admin/jobs/edit/${viewJob.id}`} className="admin-btn admin-btn-primary h-9 px-4 text-xs">
                Edit Position
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative max-w-lg w-full bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Post Career Position</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-[var(--admin-danger-soft)] border border-[var(--admin-danger)]/30 text-[var(--admin-danger)] text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Position Title *</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Senior B2B Demand Strategist"
                  className="admin-input w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Location</label>
                  <input
                    type="text"
                    value={createForm.location}
                    onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                    placeholder="e.g. Remote / Hybrid"
                    className="admin-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Employment Type</label>
                  <select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                    className="admin-select w-full"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Description *</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  rows={3}
                  placeholder="Responsibilities and day-to-day role overview..."
                  className="admin-textarea w-full"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn admin-btn-secondary h-9 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary h-9 px-4 text-xs shadow-md">
                  {saving ? 'Posting...' : 'Post Position'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteJob}
        title="Delete Career Position"
        message={`Permanently delete position "${deleteConfirm?.title}"?`}
        confirmText="Delete"
      />
    </div>
  )
}

export default Jobs
