import React, { useEffect, useState, useRef } from 'react'
import {
  User,
  Mail,
  Shield,
  Edit3,
  Save,
  X,
  CheckCircle,
  Lock,
  Key,
  ShieldCheck,
  Calendar,
  Sparkles,
  Smartphone,
  Laptop,
  Activity,
  AlertTriangle,
  UserPlus,
  Users,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  Building,
  Clock,
  ExternalLink,
  Trash2,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react'
import { authAPI, adminAPI } from '@api'
import { useAuth } from '@context/AuthContext'
import StatusBadge from '@components/admin/StatusBadge'
import PageHeader from '@components/admin/PageHeader'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(!user)
  const [activeTab, setActiveTab] = useState('overview')
  const [message, setMessage] = useState({ type: '', text: '' })

  // Avatar Upload State
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileInputRef = useRef(null)
  const tabFileInputRef = useRef(null)

  // Profile Edit State
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || 'Revenue Operations'
  })

  // Change Password State
  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passSaving, setPassSaving] = useState(false)
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)

  // Add Administrator / Operator State
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [addingUser, setAddingUser] = useState(false)
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  })

  // Team Administrators list (fetched if super_admin / admin)
  const [teamUsers, setTeamUsers] = useState([])
  const [loadingTeam, setLoadingTeam] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null })

  useEffect(() => {
    fetchProfile()
    if (user?.role === 'super_admin' || user?.role === 'admin') {
      fetchTeamUsers()
    }
  }, [])

  const fetchProfile = async () => {
    try {
      if (!user) setLoading(true)
      const response = await authAPI.getMe()
      const userData = response.data?.user || response.data
      if (userData) {
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          department: userData.department || 'Revenue Operations'
        })
        if (updateUser) {
          updateUser(userData)
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeamUsers = async () => {
    try {
      setLoadingTeam(true)
      const response = await adminAPI.getUsers()
      const usersList = Array.isArray(response.data?.data)
        ? response.data.data
        : (Array.isArray(response.data) ? response.data : [])
      setTeamUsers(usersList)
    } catch (error) {
      console.error('Failed to fetch team users:', error)
    } finally {
      setLoadingTeam(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4500)
  }

  // 1. Handle Profile Avatar Upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please upload a valid image file (PNG, JPG, WebP, GIF)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Image size must be under 5MB')
      return
    }

    try {
      setAvatarUploading(true)
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('avatar', file)

      let uploadedUrl = null
      let updatedUser = null

      try {
        // Preferred route: dedicated avatar endpoint
        const uploadRes = await authAPI.uploadAvatar(uploadFormData)
        uploadedUrl = uploadRes.data?.url || uploadRes.data?.file_url || uploadRes.data?.data?.url || uploadRes.data?.data?.file_url || uploadRes.data?.user?.avatar
        if (uploadRes.data?.user) {
          updatedUser = uploadRes.data.user
        }
      } catch (authUploadErr) {
        console.warn('Dedicated avatar upload route fallback to media upload:', authUploadErr)
        const mediaRes = await adminAPI.uploadMedia(uploadFormData)
        uploadedUrl = mediaRes.data?.url || mediaRes.data?.file_url || mediaRes.data?.data?.url || mediaRes.data?.data?.file_url
      }

      if (!uploadedUrl && !updatedUser) {
        throw new Error('Image upload failed: no valid URL returned by server')
      }

      // If user wasn't already updated directly by the upload endpoint, update user profile now
      if (!updatedUser && uploadedUrl) {
        const res = await authAPI.updateProfile({ avatar: uploadedUrl })
        updatedUser = res.data?.user || { ...user, avatar: uploadedUrl }
      }

      if (updatedUser && updateUser) {
        updateUser(updatedUser)
      } else if (uploadedUrl && updateUser) {
        updateUser({ ...user, avatar: uploadedUrl })
      }

      showMessage('success', 'Profile photo updated successfully!')
    } catch (err) {
      console.error('Avatar upload failed:', err)
      showMessage('error', err.response?.data?.message || err.message || 'Failed to upload profile photo')
    } finally {
      setAvatarUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (tabFileInputRef.current) tabFileInputRef.current.value = ''
    }
  }

  const handleRemoveAvatar = async () => {
    if (window.confirm('Are you sure you want to remove your profile photo?')) {
      try {
        setAvatarUploading(true)
        const res = await authAPI.updateProfile({ avatar: '' })
        const updatedUserData = res.data?.user || { ...user, avatar: null }
        if (updateUser) {
          updateUser(updatedUserData)
        }
        showMessage('success', 'Profile photo removed.')
      } catch (err) {
        showMessage('error', 'Failed to remove profile photo.')
      } finally {
        setAvatarUploading(false)
      }
    }
  }

  // 2. Handle Update Profile Info
  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!formData.name?.trim() || !formData.email?.trim()) {
      showMessage('error', 'Name and Email are required fields')
      return
    }

    try {
      setSaving(true)
      const response = await authAPI.updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim()
      })
      const updated = response.data?.user || response.data
      if (updated && updateUser) {
        updateUser(updated)
      }
      setEditing(false)
      showMessage('success', 'Profile details updated successfully')
    } catch (error) {
      console.error('Failed to update profile:', error)
      showMessage('error', error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  // 3. Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!passData.currentPassword) {
      showMessage('error', 'Please enter your current password')
      return
    }
    if (passData.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters')
      return
    }
    if (passData.newPassword !== passData.confirmPassword) {
      showMessage('error', 'New password and confirmation do not match')
      return
    }

    try {
      setPassSaving(true)
      await authAPI.changePassword({
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword
      })
      showMessage('success', 'Password changed successfully! Keep your new credentials secure.')
      setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Password change error:', error)
      showMessage('error', error.response?.data?.message || 'Current password was incorrect')
    } finally {
      setPassSaving(false)
    }
  }

  // 4. Handle Add New Admin / User
  const handleCreateUser = async (e) => {
    e.preventDefault()
    if (!newUserData.name || !newUserData.email || !newUserData.password) {
      showMessage('error', 'All fields are required to register a new administrator')
      return
    }

    try {
      setAddingUser(true)
      await adminAPI.createUser(newUserData)
      showMessage('success', `Administrator "${newUserData.name}" registered successfully with ${newUserData.role} role!`)
      setShowAddUserModal(false)
      setNewUserData({ name: '', email: '', password: '', role: 'admin' })
      fetchTeamUsers()
    } catch (error) {
      console.error('Failed to create user:', error)
      showMessage('error', error.response?.data?.message || 'Failed to register administrator')
    } finally {
      setAddingUser(false)
    }
  }

  // 5. Handle Delete User
  const handleDeleteUser = async () => {
    if (!deleteModal.user) return
    try {
      await adminAPI.deleteUser(deleteModal.user.id)
      showMessage('success', `Administrator "${deleteModal.user.name}" removed`)
      setDeleteModal({ open: false, user: null })
      fetchTeamUsers()
    } catch (error) {
      console.error('Delete user error:', error)
      showMessage('error', error.response?.data?.message || 'Failed to remove user')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Operator Profile" subtitle="Manage your identity, access keys, and security privileges" />
        <LoadingSkeleton type="card" count={3} />
      </div>
    )
  }

  const isAdminOrSuper = user?.role === 'super_admin' || user?.role === 'admin'
  const avatarUrl = user?.avatar?.startsWith('http') ? user.avatar : user?.avatar ? `http://localhost:5000${user.avatar}` : null

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="Admin Profile & Security"
        subtitle="Manage personal operator credentials, rotate security keys, and customize profile picture."
        badge={
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--admin-primary-soft)] text-[var(--admin-primary)] border border-[var(--admin-primary)]/20">
            {user?.role || 'Admin'}
          </span>
        }
        actions={
          isAdminOrSuper
            ? [
              {
                label: 'Add New Admin',
                icon: UserPlus,
                onClick: () => setShowAddUserModal(true),
                variant: 'primary'
              }
            ]
            : []
        }
      />

      {/* Toast Alert Message */}
      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all shadow-sm ${message.type === 'success'
              ? 'bg-[var(--admin-bg-surface)] border-[var(--admin-success)] text-[var(--admin-success)]'
              : 'bg-[var(--admin-bg-surface)] border-[var(--admin-danger)] text-[var(--admin-danger)]'
            }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Hidden File Inputs for Avatar Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
        disabled={avatarUploading}
      />
      <input
        ref={tabFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
        disabled={avatarUploading}
      />

      {/* Top Profile Summary HUD Card */}
      <div className="admin-card p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {/* Operator Avatar Emblem with Photo Upload */}
            <div
              className="relative group/avatar cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              title="Click to upload profile photo"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00A6FF] via-[#0077CC] to-[#FF6D00] p-[2px] shadow-lg shadow-[#00A6FF]/20 relative overflow-hidden group-hover/avatar:scale-105 transition-transform">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name || 'Administrator'}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--admin-bg-surface)] rounded-[14px] flex items-center justify-center font-black text-2xl text-[var(--admin-primary)] font-mono">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}

                {/* Hover Camera Overlay */}
                <div className="absolute inset-0 bg-background dark:bg-black/75 rounded-[14px] opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1">
                  {avatarUploading ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-[#00A6FF]" />
                  ) : (
                    <>
                      <Camera className="w-5 h-5 text-[#00A6FF]" />
                      <span>{avatarUrl ? 'Change' : 'Upload'}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Session Active Indicator Beacon */}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--admin-bg-surface)] flex items-center justify-center z-10"
                title="Session Active"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--admin-text-primary)]">
                  {user?.name || 'Administrator'}
                </h2>
                <StatusBadge status={user?.role || 'admin'} size="md" />
              </div>
              <p className="text-xs text-[var(--admin-text-muted)] font-mono flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--admin-primary)]" />
                <span>{user?.email || 'admin@tarajglobal.com'}</span>
              </p>
              <p className="text-xs text-[var(--admin-text-secondary)] flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[var(--admin-text-muted)]" />
                <span>Taraj Global Solutions Command Center</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap border-t md:border-t-0 pt-4 md:pt-0 border-[var(--admin-border-subtle)]">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
              className="admin-btn admin-btn-secondary text-xs flex items-center gap-2"
            >
              <Camera className="w-3.5 h-3.5 text-[var(--admin-primary)]" />
              {avatarUploading ? 'Uploading...' : avatarUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
            <button
              onClick={() => {
                setActiveTab('edit')
                setEditing(true)
              }}
              className="admin-btn admin-btn-secondary text-xs flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className="admin-btn admin-btn-secondary text-xs flex items-center gap-2"
            >
              <Key className="w-3.5 h-3.5 text-[#FF6D00]" />
              Change Password
            </button>
            {isAdminOrSuper && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="admin-btn admin-btn-primary text-xs flex items-center gap-2 shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 border-b border-[var(--admin-border-base)] overflow-x-auto pb-0.5">
        {[
          { id: 'overview', label: 'Operator Overview', icon: User },
          { id: 'edit', label: 'Edit Profile & Avatar', icon: Edit3 },
          { id: 'password', label: 'Change Security Password', icon: Key },
          ...(isAdminOrSuper ? [{ id: 'team', label: `Manage Team Admins (${teamUsers.length})`, icon: Users }] : []),
          { id: 'security', label: 'Security & Access Permissions', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${isActive
                  ? 'border-[var(--admin-primary)] text-[var(--admin-primary)] bg-[var(--admin-primary-soft)] rounded-t-lg font-bold'
                  : 'border-transparent text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-primary)] hover:border-[var(--admin-border-base)]'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* ==================== TAB 1: OPERATOR OVERVIEW ==================== */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Identity Credentials */}
          <div className="lg:col-span-8 admin-card p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--admin-border-subtle)]">
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Profile Information</h3>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Verified credentials for this administrative console</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('edit')
                  setEditing(true)
                }}
                className="text-xs font-semibold text-[var(--admin-primary)] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Modify Details
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1">Full Legal Name</p>
                <p className="text-sm font-bold text-[var(--admin-text-primary)]">{user?.name || 'Administrator'}</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1">Email Endpoint</p>
                <p className="text-sm font-bold font-mono text-[var(--admin-text-primary)]">{user?.email || 'admin@tarajglobal.com'}</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1">Privilege Role</p>
                <div className="mt-1">
                  <StatusBadge status={user?.role || 'admin'} size="sm" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1">System Node ID</p>
                <p className="text-sm font-mono font-bold text-[var(--admin-primary)]">NODE-{user?.id || '01'}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--admin-primary-soft)] flex items-center justify-center text-[var(--admin-primary)]">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">Password Protection</h4>
                  <p className="text-xs text-[var(--admin-text-muted)]">Secured with bcrypt 12-round salted hash</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('password')}
                className="admin-btn admin-btn-secondary text-xs flex items-center gap-1.5"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="admin-card p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Access Telemetry
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[var(--admin-border-subtle)]">
                  <span className="text-[var(--admin-text-muted)]">Authentication Method</span>
                  <span className="font-mono font-semibold text-[var(--admin-text-primary)]">JWT (Bearer)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--admin-border-subtle)]">
                  <span className="text-[var(--admin-text-muted)]">Session Status</span>
                  <span className="font-mono font-bold text-emerald-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--admin-border-subtle)]">
                  <span className="text-[var(--admin-text-muted)]">Access Level</span>
                  <span className="font-mono font-semibold text-[var(--admin-primary)] uppercase">{user?.role || 'Admin'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[var(--admin-text-muted)]">Command Palette</span>
                  <span className="font-mono text-[var(--admin-text-secondary)]">Ctrl + K</span>
                </div>
              </div>
            </div>

            {isAdminOrSuper && (
              <div className="admin-card p-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#FF6D00]" />
                  Quick Administration
                </h3>
                <p className="text-xs text-[var(--admin-text-secondary)] leading-relaxed">
                  As an authorized administrator, you can grant team operators access to CMS, Leads CRM, or Recruitment pipelines.
                </p>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="admin-btn admin-btn-primary w-full text-xs flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Register New Administrator
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 2: EDIT PROFILE & AVATAR ==================== */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 admin-card p-6 space-y-6">
            <div className="pb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Edit Profile & Profile Picture</h3>
              <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Upload your custom avatar and update personal operator details</p>
            </div>

            {/* Profile Avatar Card inside Edit Tab */}
            <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00A6FF] via-[#0077CC] to-[#FF6D00] p-[2px] shrink-0 overflow-hidden shadow-md">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--admin-bg-surface)] rounded-[14px] flex items-center justify-center font-bold text-2xl text-[var(--admin-primary)]">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-[var(--admin-text-primary)]">Profile Photo</h4>
                <p className="text-xs text-[var(--admin-text-muted)]">Upload a high-resolution PNG, JPG, or WebP avatar image (max 5MB).</p>
                <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start flex-wrap">
                  <button
                    type="button"
                    onClick={() => tabFileInputRef.current?.click()}
                    disabled={avatarUploading}
                    className="admin-btn admin-btn-primary h-8 px-3 text-xs flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{avatarUploading ? 'Uploading...' : 'Choose Image'}</span>
                  </button>

                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={avatarUploading}
                      className="admin-btn admin-btn-secondary text-[var(--admin-danger)] h-8 px-3 text-xs flex items-center gap-1.5 hover:bg-[var(--admin-danger-soft)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="admin-input pl-10 w-full"
                    placeholder="e.g. Alexander Vance"
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="admin-input pl-10 font-mono text-xs w-full"
                    placeholder="admin@tarajglobal.com"
                    required
                    disabled={saving}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  Assigned Authority Role
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type="text"
                    value={user?.role || 'Admin'}
                    className="admin-input pl-10 capitalize opacity-60 cursor-not-allowed font-mono text-xs w-full"
                    disabled
                  />
                </div>
                <p className="text-[11px] text-[var(--admin-text-muted)] mt-1">Role assignments can only be modified through the RBAC Team registry.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                      department: user?.department || 'Revenue Operations'
                    })
                    setActiveTab('overview')
                  }}
                  className="admin-btn admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary flex items-center gap-2 shadow-md"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 admin-card p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--admin-primary)]" />
              Security Information
            </h4>
            <p className="text-xs text-[var(--admin-text-secondary)] leading-relaxed">
              Updating your email address changes where system notifications and security recovery links are dispatched. Ensure your email is accessible and secure.
            </p>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: CHANGE SECURITY PASSWORD ==================== */}
      {activeTab === 'password' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 admin-card p-6 space-y-6">
            <div className="pb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Rotate Access Password</h3>
              <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Maintain high security hygiene by periodically updating your operator password</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  Current Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={passData.currentPassword}
                    onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                    className="admin-input pl-10 pr-10 w-full"
                    placeholder="••••••••••••"
                    required
                    disabled={passSaving}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={passData.newPassword}
                    onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                    className="admin-input pl-10 pr-10 w-full"
                    placeholder="At least 6 characters..."
                    required
                    disabled={passSaving}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] mb-1.5">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={passData.confirmPassword}
                    onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                    className="admin-input pl-10 pr-10 w-full"
                    placeholder="Confirm matching password..."
                    required
                    disabled={passSaving}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button
                  type="button"
                  onClick={() => setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                  className="admin-btn admin-btn-secondary"
                  disabled={passSaving}
                >
                  Clear Fields
                </button>
                <button
                  type="submit"
                  disabled={passSaving || !passData.currentPassword || !passData.newPassword}
                  className="admin-btn admin-btn-action flex items-center gap-2 shadow-md"
                >
                  {passSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" /> Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 admin-card p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-text-muted)] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#FF6D00]" />
              Password Security Policy
            </h4>
            <ul className="text-xs text-[var(--admin-text-secondary)] space-y-2 list-disc pl-4">
              <li>Minimum length of 6 alphanumeric characters</li>
              <li>Include uppercase, numbers, or symbols for maximum security</li>
              <li>Never share or write down administrator access keys</li>
            </ul>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: MANAGE TEAM ADMINS ==================== */}
      {activeTab === 'team' && isAdminOrSuper && (
        <div className="space-y-6">
          <div className="admin-card p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <div>
                <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Authorized Team Operators</h3>
                <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Active operators authorized to administer Taraj Global Solutions platforms</p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="admin-btn admin-btn-primary text-xs flex items-center gap-2 shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                Add New Administrator
              </button>
            </div>

            <div className="divide-y divide-[var(--admin-border-subtle)]">
              {teamUsers.map((u) => {
                const isCurrent = u.id === user?.id
                const uAvatar = u.avatar?.startsWith('http') ? u.avatar : u.avatar ? `http://localhost:5000${u.avatar}` : null
                return (
                  <div key={u.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-base)] flex items-center justify-center font-bold text-xs text-[var(--admin-primary)] shrink-0 overflow-hidden">
                        {uAvatar ? (
                          <img src={uAvatar} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          u.name ? u.name.charAt(0).toUpperCase() : 'U'
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[var(--admin-text-primary)] truncate">{u.name}</p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--admin-primary-soft)] text-[var(--admin-primary)]">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--admin-text-muted)] truncate">{u.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={u.role || 'admin'} size="sm" />
                      {!isCurrent && (
                        <button
                          onClick={() => setDeleteModal({ open: true, user: u })}
                          className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] transition-colors"
                          title="Revoke Administrator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 5: SECURITY & PERMISSIONS ==================== */}
      {activeTab === 'security' && (
        <div className="admin-card p-6 space-y-6">
          <div className="pb-4 border-b border-[var(--admin-border-subtle)]">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Security Protocols & Permissions Matrix</h3>
            <p className="text-xs text-[var(--admin-text-muted)] mt-0.5">Authorization privileges assigned to your current operator tier</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] space-y-2">
              <span className="text-xs font-bold text-[var(--admin-primary)] uppercase tracking-wider block">CMS & Content</span>
              <p className="text-xs text-[var(--admin-text-secondary)]">Create, publish, edit, and delete blogs, drafts, categories, and media vault assets.</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] space-y-2">
              <span className="text-xs font-bold text-[#FF6D00] uppercase tracking-wider block">Revenue & CRM</span>
              <p className="text-xs text-[var(--admin-text-secondary)]">Inspect inbound enterprise client leads, assign specialists, and advance sales pipeline stages.</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] space-y-2">
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">Talent Matrix</span>
              <p className="text-xs text-[var(--admin-text-secondary)]">Manage career requisitions, review candidate resumes, and log interviewer feedback.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Admin Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowAddUserModal(false)} />
          <div className="relative max-w-md w-full bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Register Administrator</h3>
              <button onClick={() => setShowAddUserModal(false)} className="p-1 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  placeholder="e.g. Jessica Chen"
                  className="admin-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  placeholder="jessica@tarajglobal.com"
                  className="admin-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Initial Password *</label>
                <input
                  type="password"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="admin-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-secondary)] mb-1.5">Privilege Tier</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                  className="admin-select w-full"
                >
                  <option value="admin">Administrator</option>
                  <option value="editor">Content Editor</option>
                  <option value="hr_recruiter">HR Recruiter</option>
                  <option value="super_admin">Super Administrator</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="admin-btn admin-btn-secondary h-9 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={addingUser} className="admin-btn admin-btn-primary h-9 px-4 text-xs shadow-md">
                  {addingUser ? 'Registering...' : 'Register Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, user: null })}
        onConfirm={handleDeleteUser}
        title="Revoke Administrator Authorization"
        message={`Are you sure you want to revoke administrative access for "${deleteModal.user?.name}"?`}
        confirmText="Revoke Access"
      />
    </div>
  )
}

export default Profile
