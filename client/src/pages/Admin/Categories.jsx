import React, { useEffect, useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FolderOpen, 
  X, 
  Save, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Hash
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import ConfirmModal from '@components/admin/ConfirmModal'
import { TableSkeleton } from '@components/admin/LoadingSkeleton'

const Categories = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const [createForm, setCreateForm] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'active'
  })
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'active'
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getCategories()
      setCategories(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!createForm.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setSaving(true)
      const categoryData = {
        ...createForm,
        slug: createForm.slug || createForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }
      await adminAPI.createCategory(categoryData)
      setShowCreateModal(false)
      setCreateForm({ name: '', slug: '', description: '', status: 'active' })
      fetchCategories()
      setMessage({ type: 'success', text: 'Category created successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category')
    } finally {
      setSaving(false)
    }
  }

  const handleEditClick = (category) => {
    setEditingCategory(category)
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      status: category.status || 'active'
    })
    setShowEditModal(true)
    setActiveMenu(null)
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!editForm.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setSaving(true)
      await adminAPI.updateCategory(editingCategory.id, editForm)
      setShowEditModal(false)
      setEditingCategory(null)
      fetchCategories()
      setMessage({ type: 'success', text: 'Category updated successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCategory = async () => {
    if (!deleteConfirm) return
    try {
      setSaving(true)
      await adminAPI.deleteCategory(deleteConfirm.id)
      setDeleteConfirm(null)
      fetchCategories()
      setMessage({ type: 'success', text: 'Category deleted successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete category' })
      setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    } finally {
      setSaving(false)
    }
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories
    const q = searchQuery.toLowerCase()
    return categories.filter(c => 
      c.name.toLowerCase().includes(q) ||
      (c.slug && c.slug.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q))
    )
  }, [categories, searchQuery])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Categories & Taxonomies"
        subtitle="Manage blog taxonomies, topic clusters, and navigation tags."
        breadcrumbs={[{ label: 'Categories' }]}
        onRefresh={fetchCategories}
        isRefreshing={loading}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#00A6FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Category</span>
          </button>
        }
      />

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between animate-slide-down ${
          message.type === 'success' 
            ? 'bg-[var(--admin-success-soft)] border border-[#72D669]/30 text-[#72D669]' 
            : 'bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 text-[#F43F5E]'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage({ type: '', text: '' })} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter / Search */}
      <div className="admin-card p-4 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-text-muted)]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input pl-10 pr-9 text-sm"
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

        <span className="text-sm font-semibold text-[var(--admin-text-muted)]">
          {filteredCategories.length} categories
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={4} />
      ) : filteredCategories.length === 0 ? (
        <div className="admin-card">
          <EmptyState
            icon={FolderOpen}
            title="No categories found"
            description="Create your first content category to organize your platform articles."
            actionLabel="Add Category"
            onAction={() => setShowCreateModal(true)}
          />
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="admin-table-wrapper admin-scrollbar">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>URL Slug</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr key={category.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[var(--admin-primary-soft)] border border-[#00A6FF]/20 flex items-center justify-center text-[var(--admin-primary)] font-bold text-sm shrink-0">
                          <Hash className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm sm:text-base text-[var(--admin-text-primary)] group-hover:text-[var(--admin-primary)] transition-colors">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm font-mono text-[var(--admin-text-muted)]">
                      {category.slug}
                    </td>
                    <td className="text-sm text-[var(--admin-text-secondary)] max-w-xs truncate">
                      {category.description || 'No description'}
                    </td>
                    <td>
                      <StatusBadge status={category.status || 'active'} />
                    </td>
                    <td className="text-right">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenu(activeMenu === category.id ? null : category.id)
                          }}
                          className="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {activeMenu === category.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                            <div className={`absolute right-0 ${
                              index >= Math.max(1, filteredCategories.length - 2) && filteredCategories.length > 2
                                ? 'bottom-full mb-2'
                                : 'top-full mt-2'
                            } w-40 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down flex flex-col`}>
                              <div className="py-1">
                                <button
                                  onClick={() => handleEditClick(category)}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-[var(--admin-text-secondary)] hover:text-[#FF6D00] hover:bg-[#FF6D00]/10 rounded-lg transition-colors"
                                >
                                  <Edit className="w-5 h-5 text-[#FF6D00]" />
                                  <span>Edit</span>
                                </button>
                              </div>
                              <div className="pt-1">
                                <button
                                  onClick={() => {
                                    setDeleteConfirm(category)
                                    setActiveMenu(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-[#F43F5E] hover:bg-[#F43F5E]/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-5 h-5" />
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

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowCreateModal(false)} />
          <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Add New Category</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g., Demand Generation"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={createForm.slug}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value })}
                  placeholder="e.g., demand-generation"
                  className="admin-input font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of this content category..."
                  className="admin-input resize-none text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  {saving ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background dark:bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowEditModal(false)} />
          <div className="relative w-full max-w-md bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-2xl shadow-2xl p-6 z-10 animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--admin-border-subtle)]">
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">Edit Category</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-[var(--admin-danger-soft)] text-[#F43F5E] text-sm font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Category Name *
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
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="admin-input font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="admin-input resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="admin-select text-sm"
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
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deleteConfirm?.name}"? Any articles assigned to this category will need reassignment.`}
        confirmText="Delete Category"
        isLoading={saving}
      />
    </div>
  )
}

export default Categories
