import React, { useEffect, useState } from 'react'
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Activity, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Archive, 
  FileText, 
  Briefcase, 
  Image, 
  Settings,
  ShieldAlert,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const AuditLogs = () => {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ user_id: '', action: '', module: '', search: '' })

  useEffect(() => {
    fetchLogs()
  }, [filters.action, filters.module, pagination.page])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAuditLogs({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      })
      setLogs(response.data?.data?.logs || response.data?.logs || [])
      setPagination(response.data?.data?.pagination || response.data?.pagination || pagination)
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  const getActionBadge = (action) => {
    const act = (action || '').toLowerCase()
    if (act.includes('create') || act.includes('insert')) return <span className="admin-badge admin-badge-cyan">CREATED</span>
    if (act.includes('update') || act.includes('edit')) return <span className="admin-badge admin-badge-orange">UPDATED</span>
    if (act.includes('delete') || act.includes('remove')) return <span className="admin-badge admin-badge-danger">DELETED</span>
    if (act.includes('publish')) return <span className="admin-badge admin-badge-success">PUBLISHED</span>
    if (act.includes('archive')) return <span className="admin-badge admin-badge-warning">ARCHIVED</span>
    return <span className="admin-badge admin-badge-neutral">{action?.toUpperCase() || 'ACTION'}</span>
  }

  const getModuleIcon = (module) => {
    const mod = (module || '').toLowerCase()
    if (mod.includes('blog')) return FileText
    if (mod.includes('job') || mod.includes('application')) return Briefcase
    if (mod.includes('media')) return Image
    if (mod.includes('user') || mod.includes('auth')) return User
    return Settings
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & Platform Audit Trail"
        subtitle="Immutable audit log records of all administrator actions, updates, deletions, and publishing events."
        breadcrumbs={[{ label: 'Audit Logs' }]}
        onRefresh={fetchLogs}
        isRefreshing={loading}
      />

      {/* Filters Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <select
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
            className="admin-select text-sm min-w-[140px]"
          >
            <option value="">All Action Types</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="publish">Published</option>
            <option value="archive">Archived</option>
          </select>

          <select
            value={filters.module}
            onChange={(e) => setFilters({ ...filters, module: e.target.value })}
            className="admin-select text-sm min-w-[140px]"
          >
            <option value="">All Modules</option>
            <option value="blog">Blogs & Content</option>
            <option value="job">Careers & Jobs</option>
            <option value="media">Media Library</option>
            <option value="user">Users & RBAC</option>
            <option value="settings">Settings & CMS</option>
          </select>
        </div>

        <span className="text-sm font-semibold text-[var(--admin-text-muted)]">
          Showing {logs.length} audit entries
        </span>
      </div>

      {/* Audit Log Table */}
      {loading ? (
        <TableSkeleton rows={8} cols={5} />
      ) : logs.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={ShieldCheck}
            title="No audit logs recorded"
            description="All platform modifications, administrative operations, and updates will be securely recorded in this tamper-evident log."
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Action Event</th>
                  <th>System Module</th>
                  <th>Operating User</th>
                  <th>IP Address / Payload</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => {
                  const ModuleIcon = getModuleIcon(log.module || log.entity_type)

                  return (
                    <tr key={log.id || index} className="group">
                      <td>
                        <div className="flex items-center gap-2.5">
                          {getActionBadge(log.action)}
                          <span className="text-sm font-bold text-[var(--admin-text-primary)] truncate max-w-xs">
                            {log.action_description || log.details || log.action}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)] font-medium">
                          <ModuleIcon className="w-4 h-4 text-[var(--admin-primary)] shrink-0" />
                          <span className="capitalize">{log.module || log.entity_type || 'System'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--admin-primary)] shrink-0">
                            {log.user_name ? log.user_name.charAt(0) : 'A'}
                          </div>
                          <span className="text-sm font-bold text-[var(--admin-text-primary)]">
                            {log.user_name || 'System Operator'}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm font-mono text-[var(--admin-text-muted)] truncate max-w-xs">
                        {log.ip_address || log.ip || '127.0.0.1'}
                      </td>
                      <td className="text-sm text-[var(--admin-text-muted)]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(log.created_at || Date.now()).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-[var(--admin-border-subtle)] flex items-center justify-between gap-4 flex-wrap text-sm text-[var(--admin-text-muted)]">
              <span>
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} audit logs
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="admin-btn admin-btn-secondary text-sm py-1.5 px-3 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="font-semibold text-[var(--admin-text-primary)] px-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.totalPages}
                  className="admin-btn admin-btn-secondary text-sm py-1.5 px-3 disabled:opacity-40"
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

export default AuditLogs
