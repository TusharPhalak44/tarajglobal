import React, { useEffect, useState } from 'react'
import { User, Mail, Shield, Edit3, Save, X, CheckCircle, Lock } from 'lucide-react'
import { authAPI } from '@api'
import { useAuth } from '@context/AuthContext'

const Profile = () => {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await authAPI.getMe()
      const userData = response.data.user
      setFormData({ name: userData.name, email: userData.email })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      setMessage({ type: 'error', text: 'Failed to load profile' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await authAPI.updateProfile(formData)
      setUser(response.data.user)
      setEditing(false)
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Failed to update profile:', error)
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Profile</h1>
        <p className="text-text-secondary">Manage your account information</p>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl border border-border p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-1">{user?.name || 'Admin User'}</h2>
            <p className="text-text-muted mb-4">{user?.email || 'admin@tarajglobal.com'}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <Shield className="w-4 h-4" />
              {user?.role || 'Admin'}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Profile Information</h3>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Role
                  </label>
                  <input
                    type="text"
                    value={user?.role || 'Admin'}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-muted cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false)
                      setFormData({ name: user?.name || '', email: user?.email || '' })
                    }}
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
                    {saving ? <><Lock className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Full Name</p>
                    <p className="font-medium text-text-primary">{user?.name || 'Admin User'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Email Address</p>
                    <p className="font-medium text-text-primary">{user?.email || 'admin@tarajglobal.com'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Role</p>
                    <p className="font-medium text-text-primary">{user?.role || 'Admin'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
