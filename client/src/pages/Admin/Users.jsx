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
  User as UserIcon
} from 'lucide-react'
import { adminAPI } from '@api'

const Users = () => {
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [filters, setFilters] = useState({ role: '', status: '', search: '' })
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  
  // Active target objects
  const [editingUser, setEditingUser] = useState(null)
  const [resettingUser, setResettingUser] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  
  // Form states
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

  // Toast Notification Helper
  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type })
    setTimeout(() => setToastMessage({ text: '', type: 'success' }), 4000)
  }

  useEffect(() => {
    fetchUsers()
  }, [filters.role, filters.status, pagination.page])

  // Debounced search trigger for backend
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

  // Real-time client side search for immediate response
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (filters.role && user.role !== filters.role) return false
      if (filters.status && user.status !== filters.status) return false
      if (filters.search) {
        const q = filters.search.toLowerCase().trim()
        const nameMatch = user.name?.toLowerCase().includes(q)
        const emailMatch = user.email?.toLowerCase().includes(q)
        const roleMatch = user.role?.toLowerCase().includes(q)
        return nameMatch || emailMatch || roleMatch
      }
      return true
    })
  }, [users, filters])

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setModalError('')
    setCreateForm({
      name: '',
      email: '',
      password: '',
      role: 'admin',
      status: 'active'
    })
    setShowPassword(false)
    setShowCreateModal(true)
  }

  // Create User Handler
  const handleCreateUser = async (e) => {
    e.preventDefault()
    setModalError('')

    if (!createForm.name.trim()) {
      setModalError('Full Name is required')
      return
    }
    if (!createForm.email.trim()) {
      setModalError('Email address is required')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(createForm.email.trim())) {
      setModalError('Please enter a valid email address')
      return
    }
    if (!createForm.password) {
      setModalError('Password is required')
      return
    }
    if (createForm.password.length < 6) {
      setModalError('Password must be at least 6 characters')
      return
    }

    try {
      setSaving(true)
      const res = await adminAPI.createUser({
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        password: createForm.password,
        role: createForm.role,
        status: createForm.status
      })
      
      setShowCreateModal(false)
      showToast(res.data?.message || `User "${createForm.name}" created successfully!`)
      fetchUsers(true)
    } catch (err) {
      console.error('Create user error:', err)
      setModalError(err.response?.data?.message || err.message || 'Failed to create user. Please check your inputs.')
    } finally {
      setSaving(false)
    }
  }

  // Open Edit Modal
  const handleEditClick = (user) => {
    setActiveDropdown(null)
    setEditingUser(user)
    setModalError('')
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      status: user.status || 'active'
    })
    setShowEditModal(true)
  }

  // Update User Handler
  const handleUpdateUser = async (e) => {
    e.preventDefault()
    setModalError('')

    if (!editForm.name.trim()) {
      setModalError('Full Name is required')
      return
    }
    if (!editForm.email.trim()) {
      setModalError('Email address is required')
      return
    }

    try {
      setSaving(true)
      const res = await adminAPI.updateUser(editingUser.id, {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        role: editForm.role,
        status: editForm.status
      })

      // Update in state
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u))
      setShowEditModal(false)
      setEditingUser(null)
      showToast(res.data?.message || `User "${editForm.name}" updated successfully!`)
      fetchUsers(true)
    } catch (err) {
      console.error('Update user error:', err)
      setModalError(err.response?.data?.message || err.message || 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  // Toggle User Status (Deactivate / Activate)
  const handleToggleStatus = async (user) => {
    setActiveDropdown(null)
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    const actionName = newStatus === 'active' ? 'activate' : 'deactivate'

    if (window.confirm(`Are you sure you want to ${actionName} "${user.name}"?`)) {
      try {
        await adminAPI.updateUserStatus(user.id, { status: newStatus })
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u))
        showToast(`User "${user.name}" ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`)
      } catch (err) {
        console.error('Status toggle error:', err)
        const msg = err.response?.data?.message || `Failed to ${actionName} user`
        showToast(msg, 'error')
      }
    }
  }

  // Open Reset Password Modal
  const handleResetPasswordClick = (user) => {
    setActiveDropdown(null)
    setResettingUser(user)
    setModalError('')
    setResetPasswordForm({ new_password: '', confirm_password: '' })
    setShowNewPassword(false)
    setShowResetPasswordModal(true)
  }

  // Reset Password Handler
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setModalError('')

    if (!resetPasswordForm.new_password) {
      setModalError('New password is required')
      return
    }
    if (resetPasswordForm.new_password.length < 6) {
      setModalError('New password must be at least 6 characters')
      return
    }
    if (resetPasswordForm.new_password !== resetPasswordForm.confirm_password) {
      setModalError('Passwords do not match')
      return
    }

    try {
      setSaving(true)
      const res = await adminAPI.resetUserPassword(resettingUser.id, {
        new_password: resetPasswordForm.new_password
      })

      setShowResetPasswordModal(false)
      setResettingUser(null)
      showToast(res.data?.message || `Password for "${resettingUser.name}" reset successfully!`)
    } catch (err) {
      console.error('Reset password error:', err)
      setModalError(err.response?.data?.message || 'Failed to reset password')
    } finally {
      setSaving(false)
    }
  }

  // Open Delete Confirmation
  const handleDeleteClick = (user) => {
    setActiveDropdown(null)
    setDeleteConfirm(user)
  }

  // Delete User Handler
  const handleDelete = async (user) => {
    try {
      setSaving(true)
      const res = await adminAPI.deleteUser(user.id)
      setUsers(prev => prev.filter(u => u.id !== user.id))
      setDeleteConfirm(null)
      showToast(res.data?.message || `User "${user.name}" deleted successfully!`)
    } catch (err) {
      console.error('Delete user error:', err)
      const msg = err.response?.data?.message || 'Failed to delete user'
      showToast(msg, 'error')
      setDeleteConfirm(null)
    } finally {
      setSaving(false)
    }
  }

  const getRoleBadge = (role) => {
    const styles = {
      super_admin: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
      admin: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
      editor: 'bg-green-500/15 text-green-400 border border-green-500/20',
      hr_recruiter: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
      content_manager: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20',
      user: 'bg-gray-500/15 text-gray-400 border border-gray-500/20'
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[role] || styles.user}`}>
        {role?.replace('_', ' ').toUpperCase() || 'USER'}
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-500/15 text-green-400 border border-green-500/20',
      inactive: 'bg-gray-500/15 text-gray-400 border border-gray-500/20',
      suspended: 'bg-red-500/15 text-red-400 border border-red-500/20'
    }
    const icons = {
      active: UserCheck,
      inactive: UserX,
      suspended: UserX
    }
    const Icon = icons[status] || UserCheck
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || styles.active}`}>
        <Icon className="w-3 h-3" />
        {status?.toUpperCase() || 'ACTIVE'}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage.text && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl animate-fade-in text-sm font-medium border ${
          toastMessage.type === 'error'
            ? 'bg-red-600 text-white border-red-500/30'
            : 'bg-primary text-white border-white/20'
        }`}>
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-white" />
          )}
          {toastMessage.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Users</h1>
          <p className="text-text-secondary text-sm">Manage system administrators, staff roles, access permissions, and account statuses</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchUsers(true)}
            className="p-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors hover:bg-surface/80"
            title="Refresh users"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          </button>
          <button 
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="w-full pl-9 pr-9 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-sm"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Roles Filter */}
        <div className="flex items-center gap-2">
          <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm font-medium"
          >
            <option value="">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="hr_recruiter">HR/Recruiter</option>
            <option value="content_manager">Content Manager</option>
            <option value="user">User</option>
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm font-medium"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          {(filters.role || filters.status || filters.search) && (
            <button
              onClick={() => setFilters({ role: '', status: '', search: '' })}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-text-muted hover:text-text-primary bg-surface border border-border rounded-lg hover:bg-surface/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Users Count Bar */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}</span>
        {filters.role && (
          <span className="px-2 py-0.5 bg-surface border border-border rounded text-text-secondary">
            Role: <b className="text-text-primary uppercase">{filters.role.replace('_', ' ')}</b>
          </span>
        )}
        {filters.status && (
          <span className="px-2 py-0.5 bg-surface border border-border rounded text-text-secondary">
            Status: <b className="text-text-primary uppercase">{filters.status}</b>
          </span>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/50 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Last Login</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-primary" />
                      <span>Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Shield className="w-12 h-12 text-text-muted mb-3 opacity-50" />
                      <p className="text-base font-semibold text-text-primary mb-1">No users found</p>
                      <p className="text-text-muted text-xs mb-4">Try clearing your filters or create a new user.</p>
                      <button
                        onClick={handleOpenCreateModal}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create New User
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const isBottomHalf = index >= filteredUsers.length - 2 && index > 1
                  const isDropdownOpen = activeDropdown === user.id

                  return (
                    <tr key={user.id} className="hover:bg-surface/70 transition-colors group">
                      {/* Name & Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary group-hover:text-primary transition-colors">{user.name}</p>
                            <span className="text-[11px] text-text-muted">ID: #{user.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-text-secondary">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-text-muted" />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status)}
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-4 text-text-muted text-xs">
                        {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never'}
                      </td>

                      {/* Action Dropdown */}
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            type="button"
                            onClick={() => setActiveDropdown(isDropdownOpen ? null : user.id)}
                            className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background border border-transparent hover:border-border transition-colors"
                            aria-label="User actions"
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

                          {/* Action Menu */}
                          {isDropdownOpen && (
                            <div className={`absolute right-0 ${isBottomHalf ? 'bottom-full mb-2' : 'top-full mt-2'} w-52 bg-surface border border-border rounded-xl shadow-2xl z-50 py-1.5 backdrop-blur-md animate-in fade-in zoom-in-95`}>
                              
                              {/* 1. Deactivate / Activate Action */}
                              {user.status === 'active' ? (
                                <button 
                                  type="button"
                                  onClick={() => handleToggleStatus(user)}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-orange-400 hover:bg-orange-500/10 transition-colors text-left"
                                >
                                  <Power className="w-3.5 h-3.5" />
                                  Deactivate User
                                </button>
                              ) : (
                                <button 
                                  type="button"
                                  onClick={() => handleToggleStatus(user)}
                                  className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-green-500 hover:bg-green-500/10 transition-colors text-left"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                  Activate User
                                </button>
                              )}

                              {/* 2. Edit Action */}
                              <button 
                                type="button"
                                onClick={() => handleEditClick(user)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors text-left"
                              >
                                <Edit className="w-3.5 h-3.5 text-text-muted" />
                                Edit Details
                              </button>

                              {/* 3. Reset Password Action */}
                              <button 
                                type="button"
                                onClick={() => handleResetPasswordClick(user)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors text-left"
                              >
                                <Key className="w-3.5 h-3.5 text-text-muted" />
                                Reset Password
                              </button>

                              <div className="my-1 border-t border-border/70" />

                              {/* 4. Delete Action */}
                              <button 
                                type="button"
                                onClick={() => handleDeleteClick(user)}
                                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete User
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
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
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

      {/* CREATE USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Create User</h2>
                <p className="text-xs text-text-muted">Add a new admin or staff member</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form 
              onSubmit={handleCreateUser} 
              className="p-6 space-y-4 text-sm"
              autoComplete="off"
            >
              {/* Hidden dummy inputs to absorb aggressive browser autofill */}
              <div style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true">
                <input type="text" name="chrome_prevent_autofill_user" tabIndex={-1} autoComplete="username" readOnly />
                <input type="password" name="chrome_prevent_autofill_pwd" tabIndex={-1} autoComplete="current-password" readOnly />
              </div>

              {modalError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="create_user_full_name"
                  id="create_user_full_name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  autoComplete="off"
                  data-lpignore="true"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="create_user_contact_email"
                    id="create_user_contact_email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    placeholder="jane.doe@tarajglobal.com"
                    className="w-full pl-3.5 pr-9 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-form-type="other"
                  />
                  {createForm.email && (
                    <button
                      type="button"
                      onClick={() => setCreateForm({ ...createForm, email: '' })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
                      title="Clear email"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="create_user_new_credential"
                    id="create_user_new_credential"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full pl-3.5 pr-16 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                    autoComplete="new-password"
                    data-lpignore="true"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {createForm.password && (
                      <button
                        type="button"
                        onClick={() => setCreateForm({ ...createForm, password: '' })}
                        className="text-text-muted hover:text-text-primary p-1"
                        title="Clear password"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-text-muted hover:text-text-primary p-1"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Role</label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="hr_recruiter">HR/Recruiter</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Status</label>
                  <select
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-xs disabled:opacity-50 shadow-md"
                >
                  {saving ? <><Clock className="w-3.5 h-3.5 animate-spin" /> Creating...</> : <><Save className="w-3.5 h-3.5" /> Create User</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Edit User</h2>
                <p className="text-xs text-text-muted">Update {editingUser.name}'s details</p>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form 
              onSubmit={handleUpdateUser} 
              className="p-6 space-y-4 text-sm"
              autoComplete="off"
            >
              {/* Hidden dummy inputs to absorb aggressive browser autofill */}
              <div style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true">
                <input type="text" name="chrome_prevent_autofill_edit_user" tabIndex={-1} autoComplete="username" readOnly />
                <input type="password" name="chrome_prevent_autofill_edit_pwd" tabIndex={-1} autoComplete="current-password" readOnly />
              </div>

              {modalError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="edit_user_full_name"
                  id="edit_user_full_name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  autoComplete="off"
                  data-lpignore="true"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="edit_user_contact_email"
                  id="edit_user_contact_email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  autoComplete="new-password"
                  data-lpignore="true"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Role</label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="hr_recruiter">HR/Recruiter</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-xs disabled:opacity-50 shadow-md"
                >
                  {saving ? <><Clock className="w-3.5 h-3.5 animate-spin" /> Updating...</> : <><Save className="w-3.5 h-3.5" /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetPasswordModal && resettingUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Reset Password</h2>
                  <p className="text-xs text-text-muted">{resettingUser.name} ({resettingUser.email})</p>
                </div>
              </div>
              <button 
                onClick={() => setShowResetPasswordModal(false)}
                className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form 
              onSubmit={handleResetPassword} 
              className="p-6 space-y-4 text-sm"
              autoComplete="off"
            >
              {/* Hidden dummy inputs to absorb aggressive browser autofill */}
              <div style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} tabIndex={-1} aria-hidden="true">
                <input type="text" name="chrome_prevent_autofill_pwd_user" tabIndex={-1} autoComplete="username" readOnly />
                <input type="password" name="chrome_prevent_autofill_pwd_pwd" tabIndex={-1} autoComplete="current-password" readOnly />
              </div>

              {modalError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">New Password *</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="reset_new_user_pwd"
                    id="reset_new_user_pwd"
                    value={resetPasswordForm.new_password}
                    onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, new_password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                    disabled={saving}
                    autoComplete="new-password"
                    data-lpignore="true"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Confirm New Password *</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="reset_confirm_user_pwd"
                  id="reset_confirm_user_pwd"
                  value={resetPasswordForm.confirm_password}
                  onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, confirm_password: e.target.value })}
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm"
                  disabled={saving}
                  autoComplete="new-password"
                  data-lpignore="true"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowResetPasswordModal(false)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-xs disabled:opacity-50 shadow-md"
                >
                  {saving ? <><Clock className="w-3.5 h-3.5 animate-spin" /> Resetting...</> : <><Save className="w-3.5 h-3.5" /> Update Password</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-md shadow-2xl">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-500">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">Delete User</h3>
                  <p className="text-xs text-text-muted">This action is permanent and cannot be undone</p>
                </div>
              </div>

              <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                Are you sure you want to permanently delete user <span className="font-semibold text-text-primary">"{deleteConfirm.name}"</span> (<span className="text-text-primary">{deleteConfirm.email}</span>)?
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-xs font-medium"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 shadow-md"
                >
                  {saving ? <><Clock className="w-3.5 h-3.5 animate-spin" /> Deleting...</> : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
