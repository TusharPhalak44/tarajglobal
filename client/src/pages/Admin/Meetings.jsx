import React, { useEffect, useState } from 'react'
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Video,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  RefreshCw,
  User,
  Building,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react'
import { adminAPI } from '@api'

const Meetings = () => {
  const [loading, setLoading] = useState(true)
  const [meetings, setMeetings] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', search: '', date: '' })

  // Modals state
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  // Forms state
  const [rescheduleForm, setRescheduleForm] = useState({ date: '', time: '' })
  const [cancelReason, setCancelReason] = useState('')
  const [statusVal, setStatusVal] = useState('')
  const [saving, setSaving] = useState(false)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    fetchMeetings()
  }, [filters.status, filters.date, pagination.page])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMeetings()
    }, 350)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchMeetings = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getMeetings({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      if (response.data && response.data.success) {
        setMeetings(response.data.data || [])
        if (response.data.pagination) {
          setPagination(response.data.pagination)
        }
      }
    } catch (error) {
      console.error('Failed to load meetings:', error)
      setMeetings([])
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDetail = (meeting) => {
    setSelectedMeeting(meeting)
    setShowDetailModal(true)
  }

  const handleOpenReschedule = (meeting) => {
    setSelectedMeeting(meeting)
    const curDate = meeting.meeting_date ? new Date(meeting.meeting_date).toISOString().split('T')[0] : ''
    setRescheduleForm({
      date: curDate,
      time: meeting.meeting_time || '10:00 AM'
    })
    setActionError('')
    setShowRescheduleModal(true)
  }

  const handleOpenCancel = (meeting) => {
    setSelectedMeeting(meeting)
    setCancelReason('')
    setActionError('')
    setShowCancelModal(true)
  }

  const handleOpenStatus = (meeting) => {
    setSelectedMeeting(meeting)
    setStatusVal(meeting.status || 'pending')
    setActionError('')
    setShowStatusModal(true)
  }

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault()
    if (!rescheduleForm.date || !rescheduleForm.time) {
      setActionError('Both date and time are required.')
      return
    }

    try {
      setSaving(true)
      setActionError('')
      const response = await adminAPI.rescheduleMeeting(selectedMeeting.id, {
        date: rescheduleForm.date,
        time: rescheduleForm.time
      })

      if (response.data?.success) {
        setShowRescheduleModal(false)
        fetchMeetings()
      } else {
        setActionError(response.data?.message || 'Failed to reschedule.')
      }
    } catch (err) {
      setActionError(err.response?.data?.message || err.message || 'Reschedule failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setActionError('')
      const response = await adminAPI.cancelMeeting(selectedMeeting.id, {
        cancellationReason: cancelReason
      })

      if (response.data?.success) {
        setShowCancelModal(false)
        fetchMeetings()
      } else {
        setActionError(response.data?.message || 'Failed to cancel meeting.')
      }
    } catch (err) {
      setActionError(err.response?.data?.message || err.message || 'Cancellation failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setActionError('')
      const response = await adminAPI.updateMeetingStatus(selectedMeeting.id, {
        status: statusVal
      })

      if (response.data?.success) {
        setShowStatusModal(false)
        fetchMeetings()
      } else {
        setActionError(response.data?.message || 'Failed to update status.')
      }
    } catch (err) {
      setActionError(err.response?.data?.message || err.message || 'Failed to update status.')
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Confirmed</span>
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Pending</span>
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Completed</span>
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-500 border border-slate-500/20">Cancelled</span>
      case 'failed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">Failed</span>
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/5 text-text-muted">{status}</span>
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Strategy Call Meetings</h1>
          <p className="text-sm text-text-secondary">
            Manage inbound strategy call bookings, Google Calendar synchronization, and Google Meet rooms.
          </p>
        </div>
        <button
          onClick={fetchMeetings}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-text-primary text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name, email, company, ID..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#00A6FF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2.5 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:border-[#00A6FF] cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="px-3 py-2 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:border-[#00A6FF] cursor-pointer"
          />

          {(filters.status || filters.date || filters.search) && (
            <button
              onClick={() => setFilters({ status: '', search: '', date: '' })}
              className="text-xs text-[#00A6FF] hover:underline font-bold cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Meetings Table */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center text-text-muted text-xs font-mono">
            <span className="inline-block animate-spin mr-2">⟳</span>
            Loading meetings...
          </div>
        ) : meetings.length === 0 ? (
          <div className="p-16 text-center text-text-muted">
            <CalendarIcon size={36} className="mx-auto mb-2 text-text-muted opacity-40" />
            <p className="text-sm font-semibold text-text-primary">No meetings found</p>
            <p className="text-xs text-text-secondary mt-1">Try adjusting your filters or date range.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-slate-50/50 dark:bg-white/[0.015] text-[11px] font-mono uppercase text-text-muted tracking-wider">
                  <th className="py-3 px-4">Attendee &amp; Company</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Interest</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Google Meet / Cal</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {meetings.map((meeting) => {
                  const dateStr = meeting.meeting_date
                    ? new Date(meeting.meeting_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'N/A'

                  return (
                    <tr key={meeting.id} className="hover:bg-slate-50/60 dark:hover:bg-white/[0.015] transition-colors">
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-text-primary text-[13px]">
                          {meeting.full_name || meeting.name}
                        </div>
                        <div className="text-text-secondary text-xs flex items-center gap-1.5 mt-0.5">
                          <Building size={12} className="text-[#00A6FF]" />
                          <span>{meeting.company}</span>
                        </div>
                        <div className="text-text-muted text-[11px] font-mono mt-0.5">
                          {meeting.email} &bull; {meeting.phone || 'No phone'}
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-text-primary flex items-center gap-1.5">
                          <CalendarIcon size={13} className="text-[#00A6FF]" />
                          <span>{dateStr}</span>
                        </div>
                        <div className="text-text-muted text-[11px] font-mono flex items-center gap-1 mt-0.5">
                          <Clock size={12} />
                          <span>{meeting.meeting_time} ({meeting.time_zone || 'IST'})</span>
                        </div>
                        <div className="text-[10px] text-text-muted font-mono mt-0.5">
                          ID: {meeting.booking_id}
                        </div>
                      </td>

                      {/* Interest */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-border/60 text-text-secondary text-[11px] font-medium">
                          {meeting.interest || 'Strategy Call'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(meeting.status)}
                      </td>

                      {/* Links */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1.5">
                          {meeting.meeting_link ? (
                            <a
                              href={meeting.meeting_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#00A6FF] hover:underline font-bold text-[11px]"
                            >
                              <Video size={12} />
                              <span>Join Meet</span>
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <span className="text-text-muted text-[10px] font-mono">No Meet link</span>
                          )}

                          {meeting.calendar_event_link && (
                            <a
                              href={meeting.calendar_event_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-text-secondary hover:text-[#00A6FF] text-[11px]"
                            >
                              <CalendarIcon size={11} />
                              <span>Calendar</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(meeting)}
                            className="px-2.5 py-1.5 rounded-lg border border-border/80 hover:bg-slate-100 dark:hover:bg-white/5 text-[11px] font-semibold text-text-primary cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleOpenReschedule(meeting)}
                            disabled={meeting.status === 'cancelled'}
                            className="px-2.5 py-1.5 rounded-lg bg-[#00A6FF]/10 text-[#00A6FF] hover:bg-[#00A6FF]/20 text-[11px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleOpenCancel(meeting)}
                            disabled={meeting.status === 'cancelled'}
                            className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-[11px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-border flex items-center justify-between text-xs text-text-secondary">
            <span>
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} bookings
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-primary disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-2 font-mono font-bold">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-primary disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: MEETING DETAILS */}
      {showDetailModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl p-6 max-w-lg w-full shadow-2xl relative my-auto">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-text-primary mb-1">Meeting Details</h3>
            <p className="text-xs text-text-muted font-mono mb-4">
              Booking Reference: {selectedMeeting.booking_id}
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-background border border-border/70">
                <span className="text-text-muted block text-[10px] font-mono uppercase">Customer</span>
                <div className="font-bold text-sm text-text-primary mt-0.5">{selectedMeeting.full_name}</div>
                <div className="text-text-secondary mt-1">{selectedMeeting.company}</div>
                <div className="text-text-muted font-mono mt-0.5">{selectedMeeting.email} &bull; {selectedMeeting.phone || 'N/A'}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border/70">
                  <span className="text-text-muted block text-[10px] font-mono uppercase">Date &amp; Time</span>
                  <div className="font-semibold text-text-primary mt-0.5">
                    {new Date(selectedMeeting.meeting_date).toLocaleDateString()}
                  </div>
                  <div className="text-text-secondary font-mono mt-0.5">
                    {selectedMeeting.meeting_time} ({selectedMeeting.time_zone || 'IST'})
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-background border border-border/70">
                  <span className="text-text-muted block text-[10px] font-mono uppercase">Status</span>
                  <div className="mt-1">{getStatusBadge(selectedMeeting.status)}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-background border border-border/70">
                <span className="text-text-muted block text-[10px] font-mono uppercase">Area of Interest</span>
                <div className="font-semibold text-text-primary mt-0.5">{selectedMeeting.interest || 'Strategy Call'}</div>
              </div>

              {selectedMeeting.message && (
                <div className="p-3 rounded-xl bg-background border border-border/70">
                  <span className="text-text-muted block text-[10px] font-mono uppercase">Message / Requirements</span>
                  <div className="text-text-secondary mt-0.5 leading-relaxed">{selectedMeeting.message}</div>
                </div>
              )}

              {selectedMeeting.meeting_link && (
                <div className="p-3 rounded-xl bg-[#00A6FF]/10 border border-[#00A6FF]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video size={16} className="text-[#00A6FF]" />
                    <span className="font-bold text-[#00A6FF]">Google Meet Video Room</span>
                  </div>
                  <a
                    href={selectedMeeting.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#00A6FF] text-white text-[11px] font-bold"
                  >
                    Join
                  </a>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-border">
                <span>Calendar Sync: {selectedMeeting.calendar_sync_status}</span>
                <span>Email Status: {selectedMeeting.email_status}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => handleOpenStatus(selectedMeeting)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-text-secondary hover:text-text-primary cursor-pointer"
              >
                Change Status
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RESCHEDULE */}
      {showRescheduleModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleRescheduleSubmit} className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl relative my-auto">
            <button
              type="button"
              onClick={() => setShowRescheduleModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-text-primary mb-1">Reschedule Meeting</h3>
            <p className="text-xs text-text-secondary mb-4">
              Select a new date and time for {selectedMeeting.full_name}. The existing Google Calendar event will be updated.
            </p>

            {actionError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                {actionError}
              </div>
            )}

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleForm.date}
                  onChange={(e) => setRescheduleForm(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:border-[#00A6FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">New Time Slot</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM or 3:30 PM"
                  value={rescheduleForm.time}
                  onChange={(e) => setRescheduleForm(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:border-[#00A6FF]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-text-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#00A6FF] hover:bg-[#0090e0] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Updating Calendar...' : 'Confirm Reschedule'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: CANCELLATION */}
      {showCancelModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCancelSubmit} className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl relative my-auto">
            <button
              type="button"
              onClick={() => setShowCancelModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">Cancel Strategy Call</h3>
            <p className="text-xs text-text-secondary mb-4">
              This will mark the meeting as cancelled, delete the Google Calendar event, notify the attendee, and release the slot.
            </p>

            {actionError && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500">
                {actionError}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-xs font-semibold text-text-secondary mb-1">
                Cancellation Reason (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Client requested postponement or schedule conflict..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-text-secondary cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: STATUS UPDATE */}
      {showStatusModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleStatusSubmit} className="bg-surface border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl relative my-auto">
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-text-primary mb-3">Update Status</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-text-secondary mb-1">Status</label>
              <select
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:border-[#00A6FF] cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-text-secondary cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#00A6FF] text-white text-xs font-bold cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Meetings
