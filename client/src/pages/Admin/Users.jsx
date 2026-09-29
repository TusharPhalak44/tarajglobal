import React, { useEffect, useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  UserCheck, 
  UserX, 
  X, 
  Save, 
  Clock, 
  Power,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Mail,
  User as UserIcon,
  ShieldCheck,
  Lock
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Users = () => {
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ role: '', status: '', search: '' })
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  
  const [editingUser, setEditingUser] = useState(null)
  const [resettingUser, setResettingUser] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' })
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    status: 'active'
  })

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  })

  const [resetPasswordForm, setResetPasswordForm] = useState({
    new_password: '',
    confirm_password: ''
  })

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 4000)
  }

  useEffect(() => {
    fetchUsers()
  }, [filters.role, filters.status, pagination.page])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(true)
    }, 350)
    return () => clearTimeout(timer)
  }, [filters.search])

  const fetchUsers = async (silent = false) => {
    try {
      if (!silent) setLoading(true)
      else setIsRefreshing(true)

      const response = await adminAPI.getUsers({
        role: filters.role,
        status: filters.status,
        search: filters.search,
        page: pagination.page,
        limit: pagination.limit
      })

      const usersData = Array.isArray(response.data?.data?.users)
        ? response.data.data.users
        : Array.isArray(response.data?.users)
        ? response.data.users
        : []
      
      const paginationData = response.data?.data?.pagination || response.data?.pagination || { page: 1, limit: 20, total: usersData.length, totalPages: 1 }

      setUsers(usersData)
      setPagination(paginationData)
    } catch (err) {
      console.error('Failed to fetch users:', err)
      if (!silent) setUsers([])
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setModalError('')
    
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password.trim()) {
      setModalError('All fields are required.')
      return
    }

    try {
      setSaving(true)
      await adminAPI.createUser(createForm)
      setShowCreateModal(false)
      setCreateForm({ name: '', email: '', password: '', role: 'admin', status: 'active' })
      fetchUsers()
      showToast('Team member account created successfully!')
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to create user account')
    } finally {
      setSaving(false)
    }
  }

  const handleEditClick = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      status: user.status || 'active'
    })
    setShowEditModal(true)
    setActiveDropdown(null)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    setModalError('')

    try {
      setSaving(true)
      await adminAPI.updateUser(editingUser.id, editForm)
      setShowEditModal(false)
      setEditingUser(null)
      fetchUsers(true)
      showToast('User credentials updated successfully!')
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleResetPasswordClick = (user) => {
    setResettingUser(user)
    setResetPasswordForm({ new_password: '', confirm_password: '' })
    setShowResetPasswordModal(true)
    setActiveDropdown(null)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setModalError('')

    if (!resetPasswordForm.new_password) {
      setModalError('New password is required.')
      return
    }
    if (resetPasswordForm.new_password !== resetPasswordForm.confirm_password) {
      setModalError('Password confirmation does not match.')
      return
    }

    try {
      setSaving(true)
      await adminAPI.resetUserPassword(resettingUser.id, { password: resetPasswordForm.new_password })
      setShowResetPasswordModal(false)
      setResettingUser(null)
      showToast(`Password successfully reset for ${resettingUser.name}`)
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to reset password')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleStatus = async (user) => {
    setActiveDropdown(null)
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    try {
      await adminAPI.updateUserStatus(user.id, { status: newStatus })
      fetchUsers(true)
      showToast(`User status updated to ${newStatus}`)
    } catch (err) {
      alert(`Failed to update status: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleDeleteUser = async () => {
    if (!deleteConfirm) return
    try {
      setSaving(true)
      await adminAPI.deleteUser(deleteConfirm.id)
      setDeleteConfirm(null)
      fetchUsers(true)
      showToast('User deleted successfully')
    } catch (err) {
      alert(`Failed to delete user: ${err.response?.data?.message || err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team & Role-Based Access Control (RBAC)"
        subtitle="Manage administrative operators, editorial staff, HR recruiters, and system permissions."
        breadcrumbs={[{ label: 'Users & RBAC' }]}
        onRefresh={() => fetchUsers(true)}
        isRefreshing={isRefreshing}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create User Account</span>
          </button>
        }
      />

      {toastMessage.text && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between animate-slide-down ${
          toastMessage.type === 'success' 
            ? 'bg-[var(--admin-success-soft)] border border-[#72D669]/30 text-[#72D669]' 
            : 'bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 text-[#F43F5E]'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage({ text: '', type: 'success' })} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="admin-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="admin-input pl-10 pr-9 text-xs"
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

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="admin-select text-xs min-w-[140px]"
          >
            <option value="">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="hr_recruiter">HR Recruiter</option>
            <option value="content_manager">Content Manager</option>
            <option value="user">Standard User</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="admin-select text-xs min-w-[130px]"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <TableSkeleton rows={6} cols={5} />
      ) : users.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={ShieldCheck}
            title="No team members found"
            description="Create operator accounts and assign role privileges for your platform."
            actionLabel="Add User"
            onAction={() => setShowCreateModal(true)}
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Team Member</th>
                  <th>Role & Privilege</th>
                  <th>Status</th>
                  <th>Member Since</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id} className="group">
                    <td>
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A6FF]/20 to-[#0077CC]/20 border border-[#00A6FF]/30 flex items-center justify-center font-bold text-xs text-[#00A6FF] shrink-0">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors truncate">
                            {u.name}
                          </p>
                          <p className="text-[11px] text-[var(--admin-text-muted)] flex items-center gap-1 mt-0.5 truncate">
                            <Mail className="w-3 h-3 shrink-0" />
                            <span>{u.email}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={u.role || 'admin'} />
                    </td>
                    <td>
                      <StatusBadge status={u.status || 'active'} />
                    </td>
                    <td className="text-xs text-[var(--admin-text-muted)]">
                      {new Date(u.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="text-right">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveDropdown(activeDropdown === u.id ? null : u.id)
                          }}
                          className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeDropdown === u.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                            <div className={`absolute right-0 ${
                              index >= Math.max(1, users.length - 2) && users.length > 2
                                ? 'bottom-full mb-2'
                                : 'top-full mt-2'
                            } w-44 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down`}>
                              <div className="py-1">
                                <button
                                  onClick={() => handleEditClick(u)}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#00A6FF] hover:bg-[var(--admin-primary-soft)] rounded-lg transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5 text-[#00A6FF]" />
                                  <span>Edit User</span>
                                </button>
                                <button
                                  onClick={() => handleResetPasswordClick(u)}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#FFA600] hover:bg-[#FFA600]/10 rounded-lg transition-colors"
                                >
                                  <Key className="w-3.5 h-3.5 text-[#FFA600]" />
                                  <span>Reset Password</span>
                                </button>
                              </div>

                              <div className="py-1">
                                <button
                                  onClick={() => handleToggleStatus(u)}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#72D669] hover:bg-[#72D669]/10 rounded-lg transition-colors"
                                >
                                  <Power className="w-3.5 h-3.5" />
                                  <span>{u.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                                </button>
                              </div>

                              <div className="pt-1">
                                <button
                                  onClick={() => {
                                    setDeleteConfirm(u)
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete User</span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-[var(--admin-border-subtle)] flex items-center justify-between gap-4 flex-wrap text-xs text-[var(--admin-text-muted)]">
              <span>
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} accounts
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="admin-btn admin-btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="font-semibold text-[var(--admin-text-primary)] px-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.totalPages}
                  className="admin-btn admin-btn-secondary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Add Team Member</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g., Alex Johnson"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="alex.j@tarajglobal.com"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="admin-input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    RBAC Role
                  </label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    className="admin-select text-xs font-semibold"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="hr_recruiter">HR Recruiter</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="user">Standard User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    className="admin-select text-xs font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Edit User Account</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="admin-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Role Privilege
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="admin-select text-xs font-semibold"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="hr_recruiter">HR Recruiter</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="user">Standard User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Account Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="admin-select text-xs font-semibold"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowEditModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && resettingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowResetPasswordModal(false)} />
          <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Reset Operator Password</h3>
              <button onClick={() => setShowResetPasswordModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-xs font-semibold">
                {modalError}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-[var(--admin-text-secondary)]">
                Setting new authentication credentials for <strong className="text-[var(--admin-text-primary)]">{resettingUser.name}</strong> ({resettingUser.email})
              </p>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={resetPasswordForm.new_password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, new_password: e.target.value })}
                    placeholder="••••••••"
                    className="admin-input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={resetPasswordForm.confirm_password}
                  onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirm_password: e.target.value })}
                  placeholder="••••••••"
                  className="admin-input"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowResetPasswordModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Resetting...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteUser}
        title="Revoke User Access"
        message={`Permanently delete user account for "${deleteConfirm?.name}" (${deleteConfirm?.email})?`}
        confirmText="Revoke Access & Delete"
        isLoading={saving}
      />
    </div>
  )
}

export default Users
