import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  X, 
  Building, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Leads = () => {
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState([])
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', assigned_to: '', search: '' })
  const [selectedLead, setSelectedLead] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchLeads()
    fetchUsers()
  }, [filters.status, filters.assigned_to, pagination.page])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads()
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers({ limit: 100, status: 'active' })
      const usersData = Array.isArray(response.data?.data?.users) 
        ? response.data.data.users 
        : Array.isArray(response.data?.users)
        ? response.data.users
        : []
      setUsers(usersData)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getLeads({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      const leadsList = response.data?.data?.leads || response.data?.leads || []
      setLeads(leadsList)
      setPagination(response.data?.data?.pagination || response.data?.pagination || pagination)

      // Auto-select first lead on desktop if none selected
      if (!selectedLead && leadsList.length > 0) {
        setSelectedLead(leadsList[0])
      } else if (selectedLead) {
        const updated = leadsList.find(l => l.id === selectedLead.id)
        if (updated) setSelectedLead(updated)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedLead) return
    try {
      setSaving(true)
      await adminAPI.updateLeadStatus(selectedLead.id, { status: newStatus })
      setSelectedLead(prev => ({ ...prev, status: newStatus }))
      fetchLeads()
    } catch (error) {
      console.error('Failed to update status:', error)
      alert(`Failed to update status: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleAssignMember = async (userId) => {
    if (!selectedLead) return
    try {
      setSaving(true)
      await adminAPI.updateLeadStatus(selectedLead.id, { assigned_to: userId })
      const assignedUser = users.find(u => String(u.id) === String(userId))
      setSelectedLead(prev => ({ 
        ...prev, 
        assigned_to: userId,
        assigned_to_name: assignedUser ? assignedUser.name : 'Unassigned'
      }))
      fetchLeads()
    } catch (error) {
      console.error('Failed to assign lead:', error)
      alert(`Failed to assign: ${error.response?.data?.message || error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbound Leads CRM"
        subtitle="Qualify and manage enterprise business inquiries and client opportunities."
        breadcrumbs={[{ label: 'Inbound Leads' }]}
        onRefresh={fetchLeads}
        isRefreshing={loading}
      />

      {/* Filter Bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="admin-input pl-10 pr-8 w-full"
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

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="admin-select min-w-[150px]"
          >
            <option value="">All Stages</option>
            <option value="new">New Inbound</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filters.assigned_to}
            onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })}
            className="admin-select min-w-[150px]"
          >
            <option value="">All Owners</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column CRM Workspace */}
      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : leads.length === 0 ? (
        <EmptyState
          icon={Building}
          title="No leads found"
          description="Inbound lead records will automatically stream here when clients submit contact forms."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Lead List (Col 7/12) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-2.5">
              {leads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex items-center justify-between gap-4 ${
                      isSelected 
                        ? 'bg-[var(--admin-primary-soft)] border-[var(--admin-primary)] shadow-md' 
                        : 'bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)] hover:border-[var(--admin-border-hover)] hover:shadow-sm hover:translate-x-1'
                    }`}
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2.5">
                        <p className="text-base font-bold text-[var(--admin-text-primary)] truncate">
                          {lead.name}
                        </p>
                        <StatusBadge status={lead.status || 'new'} />
                      </div>
                      <p className="text-sm text-[var(--admin-text-secondary)] truncate">
                        {lead.company || 'Private Entity'} • <span className="text-[var(--admin-text-muted)]">{lead.email}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-medium text-[var(--admin-text-dim)] block">
                        {new Date(lead.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pt-4 flex items-center justify-between text-sm text-[var(--admin-text-muted)]">
                <span>Page {pagination.page} of {pagination.totalPages}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="admin-btn admin-btn-secondary h-8 px-3 text-sm disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                    className="admin-btn admin-btn-secondary h-8 px-3 text-sm disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Contextual Dossier Panel (Col 5/12) */}
          <div className="lg:col-span-5 admin-card p-6 space-y-6 sticky top-20">
            {selectedLead ? (
              <>
                <div className="flex items-start justify-between pb-4 border-b border-[var(--admin-border-subtle)]">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--admin-text-primary)]">
                      {selectedLead.name}
                    </h3>
                    <p className="text-sm text-[var(--admin-text-secondary)] mt-0.5">
                      {selectedLead.company || 'Private Organization'}
                    </p>
                  </div>
                  <StatusBadge status={selectedLead.status || 'new'} />
                </div>

                {/* Stage Progression Selector */}
                <div className="space-y-2">
                  <span className="text-[13px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Pipeline Stage
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {['new', 'contacted', 'qualified', 'converted', 'closed'].map((stage) => (
                      <button
                        key={stage}
                        disabled={saving}
                        onClick={() => handleUpdateStatus(stage)}
                        className={`py-2 px-2.5 rounded-lg border text-center font-semibold transition-all capitalize ${
                          (selectedLead.status || 'new') === stage
                            ? 'bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border-[var(--admin-primary)] shadow-xs'
                            : 'bg-[var(--admin-bg-elevated)] text-[var(--admin-text-secondary)] border-[var(--admin-border-base)] hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text-primary)]'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Account Owner */}
                <div className="space-y-2">
                  <span className="text-[13px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Assigned Specialist
                  </span>
                  <select
                    value={selectedLead.assigned_to || ''}
                    onChange={(e) => handleAssignMember(e.target.value)}
                    disabled={saving}
                    className="admin-select w-full"
                  >
                    <option value="">-- Unassigned --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>

                {/* Contact Channels */}
                <div className="space-y-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                  <span className="text-[13px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                    Contact Channels
                  </span>
                  
                  {selectedLead.email && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-sm">
                      <span className="text-[var(--admin-text-primary)] font-medium truncate mr-2">{selectedLead.email}</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-[var(--admin-primary)] hover:underline font-bold shrink-0">
                        Send Mail →
                      </a>
                    </div>
                  )}

                  {selectedLead.phone && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] text-sm">
                      <span className="text-[var(--admin-text-primary)] font-medium">{selectedLead.phone}</span>
                      <a href={`tel:${selectedLead.phone}`} className="text-[var(--admin-success)] hover:underline font-bold shrink-0">
                        Call →
                      </a>
                    </div>
                  )}
                </div>

                {/* Inbound Message */}
                {selectedLead.message && (
                  <div className="space-y-2 pt-4 border-t border-[var(--admin-border-subtle)]">
                    <span className="text-[13px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider block">
                      Inbound Inquiry Details
                    </span>
                    <p className="text-sm text-[var(--admin-text-secondary)] leading-relaxed whitespace-pre-wrap bg-[var(--admin-bg-elevated)] p-3.5 rounded-xl border border-[var(--admin-border-base)] shadow-xs">
                      {selectedLead.message}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-[var(--admin-text-muted)] py-12 text-center">
                Select a lead from the list to view profile dossier.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Leads
