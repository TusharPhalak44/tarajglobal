import React, { useEffect, useState } from 'react'
import { Plus, Search, MoreVertical, Edit, Trash2, User, X, Save, Clock } from 'lucide-react'
import { adminAPI } from '@api'

const Authors = () => {
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [createForm, setCreateForm] = useState({
    name: '',
    slug: '',
    email: '',
    designation: '',
    bio: '',
    profile_photo: '',
    status: 'active'
  })
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    email: '',
    designation: '',
    bio: '',
    profile_photo: '',
    status: 'active'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAuthors()
      setAuthors(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Failed to fetch authors:', error)
      setAuthors([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAuthor = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!createForm.name.trim()) {
      setError('Author name is required')
      return
    }

    try {
      setSaving(true)
      const authorData = {
        ...createForm,
        slug: createForm.slug || createForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }
      await adminAPI.createAuthor(authorData)
      setShowCreateModal(false)
      setCreateForm({
        name: '',
        slug: '',
        email: '',
        designation: '',
        bio: '',
        profile_photo: '',
        status: 'active'
      })
      fetchAuthors()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create author')
    } finally {
      setSaving(false)
    }
  }

  const handleEditClick = (author) => {
    setEditingAuthor(author)
    setEditForm({
      name: author.name,
      slug: author.slug,
      email: author.email || '',
      designation: author.designation || '',
      bio: author.bio || '',
      profile_photo: author.profile_photo || '',
      status: author.status || 'active'
    })
    setShowEditModal(true)
  }

  const handleUpdateAuthor = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!editForm.name.trim()) {
      setError('Author name is required')
      return
    }

    try {
      setSaving(true)
      const authorData = {
        ...editForm,
        slug: editForm.slug || editForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }
      await adminAPI.updateAuthor(editingAuthor.id, authorData)
      setShowEditModal(false)
      setEditingAuthor(null)
      setEditForm({
        name: '',
        slug: '',
        email: '',
        designation: '',
        bio: '',
        profile_photo: '',
        status: 'active'
      })
      fetchAuthors()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update author')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (author) => {
    try {
      await adminAPI.deleteAuthor(author.id)
      setDeleteConfirm(null)
      fetchAuthors()
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete author')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading authors...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Authors</h1>
          <p className="text-text-secondary">Manage blog authors</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Author
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Author</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Designation</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Posts</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
              <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {author.profile_photo ? (
                      <img src={author.profile_photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-text-primary">{author.name}</p>
                      <p className="text-sm text-text-muted">{author.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-secondary">{author.designation || '-'}</td>
                <td className="px-6 py-4 text-text-secondary">{author.email || '-'}</td>
                <td className="px-6 py-4 text-text-secondary">{author.post_count || 0}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${author.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {author.status?.toUpperCase() || 'ACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative group">
                    <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button 
                        onClick={() => handleEditClick(author)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(author)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-error hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {authors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <User className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No authors found</p>
          </div>
        )}
      </div>

      {/* Create Author Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Create Author</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateAuthor} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Author Name *</label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Slug</label>
                <input
                  type="text"
                  value={createForm.slug}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value })}
                  placeholder="author-slug (auto-generated if empty)"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="author@example.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Designation</label>
                <input
                  type="text"
                  value={createForm.designation}
                  onChange={(e) => setCreateForm({ ...createForm, designation: e.target.value })}
                  placeholder="e.g. Senior Writer"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
                <textarea
                  value={createForm.bio}
                  onChange={(e) => setCreateForm({ ...createForm, bio: e.target.value })}
                  placeholder="Author biography (optional)"
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Profile Photo URL</label>
                <input
                  type="url"
                  value={createForm.profile_photo}
                  onChange={(e) => setCreateForm({ ...createForm, profile_photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  {saving ? <><Clock className="w-4 h-4 animate-spin" /> Creating...</> : <><Save className="w-4 h-4" /> Create</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Author Modal */}
      {showEditModal && editingAuthor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Edit Author</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateAuthor} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Author Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Slug</label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  placeholder="author-slug (auto-generated if empty)"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="author@example.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Designation</label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                  placeholder="e.g. Senior Writer"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Author biography (optional)"
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Profile Photo URL</label>
                <input
                  type="url"
                  value={editForm.profile_photo}
                  onChange={(e) => setEditForm({ ...editForm, profile_photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">Delete Author</h3>
              <p className="text-text-secondary mb-4">
                Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Authors
