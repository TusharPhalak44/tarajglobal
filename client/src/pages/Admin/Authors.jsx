import React, { useEffect, useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  User, 
  X, 
  Save, 
  Clock, 
  Mail, 
  Briefcase,
  CheckCircle2
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Authors = () => {
  const [loading, setLoading] = useState(true)
  const [authors, setAuthors] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [error, setError] = useState('')

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

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getAuthors()
      setAuthors(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed to fetch authors:', err)
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
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create author')
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
    setActiveMenu(null)
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
      await adminAPI.updateAuthor(editingAuthor.id, editForm)
      setShowEditModal(false)
      setEditingAuthor(null)
      fetchAuthors()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update author')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAuthor = async () => {
    if (!deleteConfirm) return
    try {
      setSaving(true)
      await adminAPI.deleteAuthor(deleteConfirm.id)
      setDeleteConfirm(null)
      fetchAuthors()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete author')
    } finally {
      setSaving(false)
    }
  }

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authors
    const q = searchQuery.toLowerCase()
    return authors.filter(a => 
      a.name.toLowerCase().includes(q) ||
      (a.email && a.email.toLowerCase().includes(q)) ||
      (a.designation && a.designation.toLowerCase().includes(q))
    )
  }, [authors, searchQuery])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Editorial Authors & Contributors"
        subtitle="Manage blog bylines, leadership bios, and editorial contributor profiles."
        breadcrumbs={[{ label: 'Authors' }]}
        onRefresh={fetchAuthors}
        isRefreshing={loading}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Author</span>
          </button>
        }
      />

      {/* Filter / Search */}
      <div className="admin-card p-4 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search authors by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input pl-10 pr-9 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <span className="text-xs font-semibold text-[var(--admin-text-muted)]">
          {filteredAuthors.length} authors
        </span>
      </div>

      {/* Main Grid / Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={4} />
      ) : filteredAuthors.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={User}
            title="No authors found"
            description="Add editorial authors and contributors to attribute articles and insights."
            actionLabel="Add Author"
            onAction={() => setShowCreateModal(true)}
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Author Profile</th>
                  <th>Designation / Title</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.map((author, index) => (
                  <tr key={author.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        {author.profile_photo ? (
                          <img
                            src={author.profile_photo}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover bg-[var(--admin-bg-elevated)] border border-[var(--admin-border-subtle)] shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A6FF]/20 to-[#0077CC]/20 border border-[#00A6FF]/30 flex items-center justify-center font-bold text-sm text-[#00A6FF] shrink-0">
                            {author.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-xs sm:text-sm text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors">
                            {author.name}
                          </p>
                          <p className="text-[11px] text-[var(--admin-text-muted)] font-mono">
                            /author/{author.slug || author.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-xs text-[var(--admin-text-secondary)] font-medium">
                      {author.designation || 'Contributing Author'}
                    </td>
                    <td className="text-xs text-[var(--admin-text-muted)]">
                      {author.email || '-'}
                    </td>
                    <td>
                      <StatusBadge status={author.status || 'active'} />
                    </td>
                    <td className="text-right">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenu(activeMenu === author.id ? null : author.id)
                          }}
                          className="p-1.5 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenu === author.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                            <div className={`absolute right-0 ${
                              index >= Math.max(1, filteredAuthors.length - 2) && filteredAuthors.length > 2
                                ? 'bottom-full mb-2'
                                : 'top-full mt-2'
                            } w-40 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down`}>
                              <div className="py-1">
                                <button
                                  onClick={() => handleEditClick(author)}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--admin-text-secondary)] hover:text-[#FF6D00] hover:bg-[#FF6D00]/10 rounded-lg transition-colors"
                                >
                                  <Edit className="w-3.5 h-3.5 text-[#FF6D00]" />
                                  <span>Edit</span>
                                </button>
                              </div>
                              <div className="pt-1">
                                <button
                                  onClick={() => {
                                    setDeleteConfirm(author)
                                    setActiveMenu(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
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
        </div>
      )}

      {/* Create Author Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up max-h-[90vh] overflow-y-auto admin-scrollbar">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Add New Author</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateAuthor} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    placeholder="e.g., Jane Doe"
                    className="admin-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={createForm.designation}
                    onChange={(e) => setCreateForm({ ...createForm, designation: e.target.value })}
                    placeholder="e.g., VP of Growth"
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="jane.doe@tarajglobal.com"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={createForm.profile_photo}
                  onChange={(e) => setCreateForm({ ...createForm, profile_photo: e.target.value })}
                  placeholder="https://..."
                  className="admin-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Short Bio
                </label>
                <textarea
                  value={createForm.bio}
                  onChange={(e) => setCreateForm({ ...createForm, bio: e.target.value })}
                  rows={3}
                  placeholder="Brief author biography..."
                  className="admin-input resize-none text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Saving...' : 'Add Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Author Modal */}
      {showEditModal && editingAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full max-w-lg bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up max-h-[90vh] overflow-y-auto admin-scrollbar">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Edit Author</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateAuthor} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                    Author Name *
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
                    Designation
                  </label>
                  <input
                    type="text"
                    value={editForm.designation}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={editForm.profile_photo}
                  onChange={(e) => setEditForm({ ...editForm, profile_photo: e.target.value })}
                  className="admin-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Short Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="admin-input resize-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="admin-select text-xs"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteAuthor}
        title="Delete Author"
        message={`Are you sure you want to remove "${deleteConfirm?.name}"?`}
        confirmText="Delete Author"
        isLoading={saving}
      />
    </div>
  )
}

export default Authors
