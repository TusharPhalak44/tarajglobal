import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  Download, 
  X, 
  Save, 
  Trash2, 
  FileCheck,
  ChevronRight
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialJobId = searchParams.get('job_id') || ''
  const initialJobTitle = searchParams.get('job_title') || ''
  
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', job_id: initialJobId, search: '' })
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const jId = searchParams.get('job_id') || ''
    if (jId !== filters.job_id) {
      setFilters(prev => ({ ...prev, job_id: jId }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchApplications()
  }, [filters.status, filters.job_id, pagination.page])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApplications()
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getApplications({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      const applicationsData = Array.isArray(response.data?.data?.applications)
        ? response.data.data.applications
        : Array.isArray(response.data?.applications)
        ? response.data.applications
        : []
      const paginationData = response.data?.data?.pagination || response.data?.pagination || { page: 1, limit: 20, total: applicationsData.length, totalPages: 1 }
      setApplications(applicationsData)
      setPagination(paginationData)

      if (!selectedApplication && applicationsData.length > 0) {
        handleSelectApp(applicationsData[0])
      } else if (selectedApplication) {
        const updated = applicationsData.find(a => a.id === selectedApplication.id)
        if (updated) setSelectedApplication(prev => ({ ...prev, ...updated }))
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectApp = async (app) => {
    try {
      const response = await adminAPI.getApplicationById(app.id)
      const details = response.data.data || response.data || app
      setSelectedApplication(details)
    } catch {
      setSelectedApplication(app)
    }
    setNewNote('')
  }

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedApplication) return
    try {
      setSaving(true)
      await adminAPI.updateApplicationStatus(selectedApplication.id, { status: newStatus })
      setSelectedApplication(prev => ({ ...prev, status: newStatus }))
      fetchApplications()
    } catch (error) {
      console.error('Failed to update status:', error)
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleNoteSubmit = async (e) => {
    e.preventDefault()
    if (!newNote.trim() || !selectedApplication) return
    try {
      setSaving(true)
      await adminAPI.addApplicationNote(selectedApplication.id, { note: newNote })
      setNewNote('')
      const response = await adminAPI.getApplicationById(selectedApplication.id)
      setSelectedApplication(response.data.data || response.data || selectedApplication)
      fetchApplications()
    } catch (error) {
      console.error('Failed to add note:', error)
      alert(`Failed to save note: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (application) => {
    if (window.confirm(`Delete candidate record for "${application.first_name} ${application.last_name}"?`)) {
      try {
        await adminAPI.deleteApplication(application.id)
        setSelectedApplication(null)
        fetchApplications()
      } catch (error) {
        console.error('Failed to delete application:', error)
      }
    }
  }

  const clearJobFilter = () => {
    setSearchParams({})
    setFilters(prev => ({ ...prev, job_id: '' }))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Matrix"
        subtitle="Review talent pipeline submissions, interviewer evaluations, and candidate status."
        breadcrumbs={[{ label: 'Applications' }]}
        onRefresh={fetchApplications}
        isRefreshing={loading}
      />

      {/* Position Filter Banner */}
      {filters.job_id && (
        <div className="admin-card p-3 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
            <span>Filtered by Position:</span>
            <strong className="text-[var(--admin-text-primary)]">{initialJobTitle || `#${filters.job_id}`}</strong>
          </div>
          <button onClick={clearJobFilter} className="text-xs text-[var(--admin-primary)] font-bold hover:underline">
            Clear filter
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search candidate name, email, skills..."
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
          className="admin-select min-w-[160px] w-full sm:w-auto"
        >
          <option value="">All Recruitment Stages</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* 2-Column Recruitment Workspace */}
      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No candidate submissions"
          description="Candidate applications submitted on the Careers page will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Candidate List (Col 7/12) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-2.5">
              {applications.map((app) => {
                const isSelected = selectedApplication?.id === app.id

                return (
                  <div
                    key={app.id}
                    onClick={() => handleSelectApp(app)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex items-center justify-between gap-4 ${
                      isSelected 
                        ? 'bg-[var(--admin-primary-soft)] border-[var(--admin-primary)] shadow-md' 
                        : 'bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)] hover:border-[var(--admin-border-hover)] hover:shadow-sm hover:translate-x-1'
                    }`}
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2.5">
                        <p className="text-sm font-bold text-[var(--admin-text-primary)] truncate">
                          {app.first_name} {app.last_name}
                        </p>
                        <StatusBadge status={app.status || 'applied'} />
                      </div>
                      <p className="text-xs text-[var(--admin-text-secondary)] truncate">
                        {app.job_title || 'General Position'} • <span className="text-[var(--admin-text-muted)]">{app.email}</span>
                      </p>
                    </div>

                    <span className="text-xs font-medium text-[var(--admin-text-dim)] shrink-0">
                      {new Date(app.applied_at || app.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                )
              })}
            </div>

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

          {/* Right: Candidate Details (Col 5/12) */}
          <div className="lg:col-span-5 admin-card p-6 space-y-6 sticky top-20">
            {selectedApplication ? (
              <>
                <div className="flex items-start justify-between pb-4 border-b border-[var(--admin-border-subtle)]">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--admin-text-primary)]">
                      {selectedApplication.first_name} {selectedApplication.last_name}
                    </h3>
                    <p className="text-xs text-[var(--admin-text-secondary)] mt-0.5">
                      {selectedApplication.job_title || 'General Position'}
                    </p>
                  </div>
                  <StatusBadge status={selectedApplication.status || 'applied'} />
                </div>

                {/* Stage Progression Buttons */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Recruitment Funnel Stage
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['applied', 'screening', 'shortlisted', 'interview', 'selected', 'rejected'].map((stage) => (
                      <button
                        key={stage}
                        disabled={saving}
                        onClick={() => handleUpdateStatus(stage)}
                        className={`py-2 px-2 rounded-lg border text-center font-semibold transition-all capitalize ${
                          (selectedApplication.status || 'applied') === stage
                            ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border-[var(--admin-primary)] shadow-xs'
                            : 'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] border-[var(--admin-border-base)] hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text-primary)]'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resume Download Action */}
                {selectedApplication.resume_url && (
                  <div className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] flex items-center justify-between text-xs">
                    <span className="text-[var(--admin-text-primary)] flex items-center gap-2 font-semibold">
                      <FileCheck className="w-4 h-4 text-[#10B981]" /> Resume Attached
                    </span>
                    <a
                      href={selectedApplication.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-btn admin-btn-secondary h-8 px-3 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                )}

                {/* Contact Channels */}
                <div className="space-y-2.5 pt-4 border-t border-[var(--admin-border-subtle)] text-xs">
                  <span className="text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Candidate Channels
                  </span>
                  <div className="flex justify-between p-2 rounded-lg bg-[var(--admin-bg-elevated)]">
                    <span className="text-[var(--admin-text-muted)]">Email</span>
                    <a href={`mailto:${selectedApplication.email}`} className="text-[var(--admin-primary)] font-bold hover:underline">
                      {selectedApplication.email}
                    </a>
                  </div>
                  {selectedApplication.phone && (
                    <div className="flex justify-between p-2 rounded-lg bg-[var(--admin-bg-elevated)]">
                      <span className="text-[var(--admin-text-muted)]">Phone</span>
                      <a href={`tel:${selectedApplication.phone}`} className="text-[var(--admin-text-primary)] font-bold hover:underline">
                        {selectedApplication.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Cover Letter */}
                {selectedApplication.cover_letter && (
                  <div className="space-y-2 pt-4 border-t border-[var(--admin-border-subtle)]">
                    <span className="text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                      Cover Letter / Statement
                    </span>
                    <p className="text-xs text-[var(--admin-text-secondary)] leading-relaxed whitespace-pre-wrap bg-[var(--admin-bg-elevated)] p-3.5 rounded-xl border border-[var(--admin-border-base)] shadow-xs">
                      {selectedApplication.cover_letter}
                    </p>
                  </div>
                )}

                {/* Recruiter Evaluation Notes */}
                <div className="space-y-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                  <span className="text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Interviewer Notes & Logs
                  </span>

                  {selectedApplication.notes && selectedApplication.notes.length > 0 && (
                    <div className="space-y-2">
                      {selectedApplication.notes.map((n, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[var(--admin-bg-elevated)] text-xs text-[var(--admin-text-primary)] border border-[var(--admin-border-subtle)]">
                          {typeof n === 'string' ? n : n.note}
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleNoteSubmit} className="space-y-2.5">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add evaluation note or interview feedback..."
                      rows={3}
                      className="admin-textarea w-full text-xs"
                      disabled={saving}
                    />
                    <div className="flex justify-between items-center pt-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedApplication)}
                        className="text-xs font-semibold text-[var(--admin-danger)] hover:underline"
                      >
                        Delete Record
                      </button>

                      <button
                        type="submit"
                        disabled={saving || !newNote.trim()}
                        className="admin-btn admin-btn-primary h-8 px-4 text-xs disabled:opacity-40"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <p className="text-xs text-[var(--admin-text-muted)] py-12 text-center">
                Select a candidate from the list to view profile details.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Applications
