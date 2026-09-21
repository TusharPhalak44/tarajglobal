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
  Settings
} from 'lucide-react'
import { adminAPI } from '@api'

const AuditLogs = () => {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ user_id: '', action: '', module: '' })

  useEffect(() => {
    fetchLogs()
  }, [filters, pagination.page])

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

  const getActionIcon = (action) => {
    const icons = {
      create: Activity,
      update: Edit,
      delete: Trash2,
      publish: CheckCircle,
      archive: Archive
    }
    return icons[action] || Activity
  }

  const getModuleIcon = (module) => {
    const icons = {
      blog: FileText,
      job: Briefcase,
      media: Image,
      user: User,
      settings: Settings
    }
    return icons[module] || Activity
  }

  const getActionBadge = (action) => {
    const styles = {
      create: 'bg-green-500/20 text-green-400',
      update: 'bg-blue-500/20 text-blue-400',
      delete: 'bg-red-500/20 text-red-400',
      publish: 'bg-purple-500/20 text-purple-400',
      archive: 'bg-gray-500/20 text-gray-400'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[action] || 'bg-gray-500/20 text-gray-400'}`}>
        {action?.toUpperCase() || 'ACTION'}
      </span>
    )
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading audit logs...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Audit Logs</h1>
          <p className="text-text-secondary">Track system activity and changes</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search logs..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={filters.action}
          onChange={(e) => setFilters({ ...filters, action: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="publish">Publish</option>
        </select>
        <select
          value={filters.module}
          onChange={(e) => setFilters({ ...filters, module: e.target.value })}
          className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All Modules</option>
          <option value="blog">Blog</option>
          <option value="job">Job</option>
          <option value="media">Media</option>
          <option value="user">User</option>
          <option value="settings">Settings</option>
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
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Action</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Module</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Record</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">IP Address</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">{log.user_name || 'System'}</p>
                      <p className="text-xs text-text-muted">{log.user_email || ''}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{getActionBadge(log.action)}</td>
                <td className="px-6 py-4 text-text-secondary capitalize">{log.module}</td>
                <td className="px-6 py-4 text-text-secondary">
                  {log.record_type && <span className="text-xs bg-surface px-2 py-1 rounded">{log.record_type}</span>}
                  {log.record_id && <span className="text-xs text-text-muted ml-1">#{log.record_id}</span>}
                </td>
                <td className="px-6 py-4 text-text-secondary text-sm">{log.ip_address || '-'}</td>
                <td className="px-6 py-4 text-text-secondary text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Activity className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No audit logs found</p>
            <p className="text-text-muted text-sm">Activity will appear here as users interact with the system</p>
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} logs
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
    </div>
  )
}

export default AuditLogs
