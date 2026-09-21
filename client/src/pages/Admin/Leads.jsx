import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Archive,
  Building,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  User,
  X,
  Save
} from 'lucide-react'
import { adminAPI } from '@api'

const Leads = () => {
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState([])
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ status: '', assigned_to: '', search: '' })
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState(null)
  const [saving, setSaving] = useState(false)
  const [statusForm, setStatusForm] = useState({ status: '' })
  const [assignForm, setAssignForm] = useState({ assigned_to: '' })

  useEffect(() => {
    fetchLeads()
    fetchUsers()
  }, [filters, pagination.page])

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers({ limit: 100, status: 'active' })
      setUsers(response.data.users || [])
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
      setLeads(response.data?.data?.leads || response.data?.leads || [])
      setPagination(response.data?.data?.pagination || response.data?.pagination || pagination)
    } catch (error) {
      console.error('Failed to fetch leads:', error)
      setLeads([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusClick = (lead) => {
    setSelectedLead(lead)
    setStatusForm({ status: lead.status || 'new' })
    setShowStatusModal(true)
  }

  const handleAssignClick = (lead) => {
    setSelectedLead(lead)
    setAssignForm({ assigned_to: lead.assigned_to || '' })
    setShowAssignModal(true)
  }

  const handleUpdateStatus = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminAPI.updateLeadStatus(selectedLead.id, { status: statusForm.status })
      setShowStatusModal(false)
      setSelectedLead(null)
      fetchLeads()
    } catch (error) {
      console.error('Failed to update lead status:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await adminAPI.updateLeadStatus(selectedLead.id, { assigned_to: assignForm.assigned_to })
      setShowAssignModal(false)
      setSelectedLead(null)
      fetchLeads()
    } catch (error) {
      console.error('Failed to assign lead:', error)
    } finally {
      setSaving(false)
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-500/20 text-blue-400',
      contacted: 'bg-yellow-500/20 text-yellow-400',
      qualified: 'bg-purple-500/20 text-purple-400',
      converted: 'bg-green-500/20 text-green-400',
      closed: 'bg-gray-500/20 text-gray-400'
    }
    const icons = {
      new: Clock,
      contacted: Clock,
      qualified: Clock,
      converted: CheckCircle,
      closed: Archive
    }
    const Icon = icons[status] || Clock
    
    return (
      <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.new}`}>
        <Icon className="w-3 h-3" />
        {status?.replace('_', ' ').toUpperCase() || 'NEW'}
      </span>
    )
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading leads...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Leads</h1>
          <p className="text-text-secondary">Manage contact leads</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search leads..."
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
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={filters.assigned_to}
          onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Assignees</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Lead</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Company</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Assigned To</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Source</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Created</th>
              <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{lead.name}</p>
                      <p className="text-sm text-text-muted">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {lead.company || '-'}
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  <div className="flex flex-col gap-1 text-sm">
                    {lead.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                <td className="px-6 py-4 text-text-secondary">{lead.assigned_to_name || '-'}</td>
                <td className="px-6 py-4 text-text-secondary">{lead.source || '-'}</td>
                <td className="px-6 py-4 text-text-secondary">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative group">
                    <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button 
                        onClick={() => handleStatusClick(lead)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Update Status
                      </button>
                      <button 
                        onClick={() => handleAssignClick(lead)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Assign
                      </button>
                      <button 
                        onClick={() => handleStatusClick({ ...lead, status: 'closed' })}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                      >
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Building className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No leads found</p>
            <p className="text-text-muted text-sm">Leads will appear here when contacts are submitted</p>
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} leads
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

      {/* Update Status Modal */}
      {showStatusModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Update Lead Status</h2>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateStatus} className="p-6 space-y-4">
              <p className="text-text-secondary text-sm">
                Update status for lead from <span className="font-semibold text-text-primary">{selectedLead.name}</span>
              </p>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
                <select
                  value={statusForm.status}
                  onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
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
                  {saving ? <><Clock className="w-4 h-4 animate-spin" /> Updating...</> : <><Save className="w-4 h-4" /> Update</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Lead Modal */}
      {showAssignModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Assign Lead</h2>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAssign} className="p-6 space-y-4">
              <p className="text-text-secondary text-sm">
                Assign lead from <span className="font-semibold text-text-primary">{selectedLead.name}</span>
              </p>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Assign To</label>
                <select
                  value={assignForm.assigned_to}
                  onChange={(e) => setAssignForm({ ...assignForm, assigned_to: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
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
                  {saving ? <><Clock className="w-4 h-4 animate-spin" /> Assigning...</> : <><Save className="w-4 h-4" /> Assign</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leads
