import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Save,
  Trash2,
  Briefcase
} from 'lucide-react'
import { adminAPI } from '@api'

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialJobId = searchParams.get('job_id') || ''
  const initialJobTitle = searchParams.get('job_title') || ''
  
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', job_id: initialJobId, search: '' })
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)

  // Sync URL params if they change
  useEffect(() => {
    const jId = searchParams.get('job_id') || ''
    if (jId !== filters.job_id) {
      setFilters(prev => ({ ...prev, job_id: jId }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchApplications()
  }, [filters, pagination.page])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getApplications({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      console.log('Applications response:', response.data)
      const applicationsData = Array.isArray(response.data?.data?.applications)
        ? response.data.data.applications
        : Array.isArray(response.data?.applications)
        ? response.data.applications
        : []
      const paginationData = response.data?.data?.pagination || response.data?.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
      setApplications(applicationsData)
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
      setPagination({ page: 1, limit: 20, total: 0, totalPages: 0 })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      applied: 'bg-blue-500/20 text-blue-400',
      screening: 'bg-yellow-500/20 text-yellow-400',
      shortlisted: 'bg-purple-500/20 text-purple-400',
      interview: 'bg-orange-500/20 text-orange-400',
      selected: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400'
    }
    const icons = {
      applied: Clock,
      screening: Clock,
      shortlisted: Clock,
      interview: Clock,
      selected: CheckCircle,
      rejected: XCircle
    }
    const Icon = icons[status] || Clock
    
    return (
      <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.applied}`}>
        <Icon className="w-3 h-3" />
        {status?.replace('_', ' ').toUpperCase() || 'APPLIED'}
      </span>
    )
  }

  const handleViewDetails = async (application) => {
    try {
      const response = await adminAPI.getApplicationById(application.id)
      const appData = response.data.data || response.data
      setSelectedApplication(appData)
      setActiveDropdown(null)
      // Show details in a modal or navigate to details page
      alert(`Application Details:\n\nName: ${appData.first_name} ${appData.last_name}\nEmail: ${appData.email}\nPhone: ${appData.phone || 'N/A'}\nJob: ${appData.job_title}\nStatus: ${appData.status}\nApplied: ${new Date(appData.applied_at).toLocaleDateString()}`)
    } catch (error) {
      console.error('Failed to fetch application details:', error)
      alert('Failed to load application details')
    }
  }

  const handleUpdateStatus = (application) => {
    setSelectedApplication(application)
    setNewStatus(application.status)
    setShowStatusModal(true)
    setActiveDropdown(null)
  }

  const handleStatusSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminAPI.updateApplicationStatus(selectedApplication.id, { status: newStatus })
      setShowStatusModal(false)
      fetchApplications()
      alert('Status updated successfully')
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update status. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleAddNote = (application) => {
    setSelectedApplication(application)
    setNewNote('')
    setShowNoteModal(true)
    setActiveDropdown(null)
  }

  const handleNoteSubmit = async (e) => {
    e.preventDefault()
    if (!newNote.trim()) {
      alert('Note cannot be empty')
      return
    }
    try {
      setSaving(true)
      await adminAPI.addApplicationNote(selectedApplication.id, { note: newNote })
      setShowNoteModal(false)
      fetchApplications()
      alert('Note added successfully')
    } catch (error) {
      console.error('Failed to add note:', error)
      alert('Failed to add note. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (application) => {
    if (window.confirm(`Are you sure you want to delete the application from "${application.first_name} ${application.last_name}"? This action cannot be undone.`)) {
      try {
        await adminAPI.deleteApplication(application.id)
        setActiveDropdown(null)
        fetchApplications()
        alert('Application deleted successfully')
      } catch (error) {
        console.error('Failed to delete application:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete application'
        alert(`Failed to delete application: ${errorMessage}`)
      }
    }
  }

  const clearJobFilter = () => {
    setSearchParams({})
    setFilters(prev => ({ ...prev, job_id: '' }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Applications</h1>
          <p className="text-text-secondary">Manage job applications</p>
        </div>
      </div>

      {/* Job Filter Pill */}
      {filters.job_id && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-xl text-sm">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="text-text-secondary">Filtering for job:</span>
          <span className="font-semibold text-text-primary">
            {initialJobTitle || `Job #${filters.job_id}`}
          </span>
          <button
            onClick={clearJobFilter}
            className="ml-auto flex items-center gap-1 text-xs text-primary hover:text-primary-dark font-medium bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Show All Applications
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search applications by name or email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-10 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
        {loading && (
          <span className="text-xs text-primary animate-pulse font-medium">Refreshing...</span>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Candidate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Job</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Applied</th>
                <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{app.first_name} {app.last_name}</p>
                        <p className="text-sm text-text-muted">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{app.job_title || '-'}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div className="flex flex-col gap-1 text-sm">
                      {app.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {app.phone}
                        </div>
                      )}
                      {app.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {app.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-text-secondary">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === app.id ? null : app.id)}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {activeDropdown === app.id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-10">
                          <button 
                            onClick={() => handleViewDetails(app)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            View Details
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Update Status
                          </button>
                          <button 
                            onClick={() => handleAddNote(app)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Add Note
                          </button>
                          <button 
                            onClick={() => handleDelete(app)}
                            className="flex items-center gap-3 w-full px-4 py-2 text-left text-error hover:bg-error/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No applications found</p>
            <p className="text-text-muted text-sm">Applications will appear here when candidates apply</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} applications
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

      {/* Status Update Modal */}
      {showStatusModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Update Status</h2>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleStatusSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? <><Clock className="w-4 h-4 animate-spin" /> Updating...</> : <><Save className="w-4 h-4" /> Update Status</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Add Note</h2>
              <button 
                onClick={() => setShowNoteModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleNoteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Note</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your note..."
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                  disabled={saving}
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? <><Clock className="w-4 h-4 animate-spin" /> Adding...</> : <><Save className="w-4 h-4" /> Add Note</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications
