import React, { useEffect, useState } from 'react'
import { Plus, Search, MoreVertical, Edit, Trash2, FolderOpen, X, Save, Clock } from 'lucide-react'
import { adminAPI } from '@api'

const Categories = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
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
  const [activeMenu, setActiveMenu] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getCategories()
      setCategories(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
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
      setCreateForm({
        name: '',
        slug: '',
        description: '',
        status: 'active'
      })
      fetchCategories()
      setMessage({ type: 'success', text: 'Category created successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create category')
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
      const categoryData = {
        ...editForm,
        slug: editForm.slug || editForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }
      await adminAPI.updateCategory(editingCategory.id, categoryData)
      setShowEditModal(false)
      setEditingCategory(null)
      setEditForm({
        name: '',
        slug: '',
        description: '',
        status: 'active'
      })
      fetchCategories()
      setMessage({ type: 'success', text: 'Category updated successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update category')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (category) => {
    try {
      await adminAPI.deleteCategory(category.id)
      setDeleteConfirm(null)
      fetchCategories()
      setMessage({ type: 'success', text: 'Category deleted successfully' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete category')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading categories...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Categories</h1>
          <p className="text-text-secondary">Manage blog categories</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Category
        </button>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {message.type === 'success' ? <Save className="w-5 h-5" /> : <X className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Posts</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
              <th className="w-12 px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">{cat.name}</td>
                <td className="px-6 py-4 text-text-secondary">{cat.slug}</td>
                <td className="px-6 py-4 text-text-secondary">{cat.post_count || 0}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${cat.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {cat.status?.toUpperCase() || 'ACTIVE'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative group">
                    <button className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button 
                        onClick={() => handleEditClick(cat)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-text-secondary hover:bg-surface/80 hover:text-text-primary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(cat)}
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

        {categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="w-16 h-16 text-text-muted mb-4" />
            <p className="text-text-secondary mb-2">No categories found</p>
          </div>
        )}
      </div>

      {/* Create Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Create Category</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Category Name *</label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="e.g. Technology"
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
                  placeholder="category-slug (auto-generated if empty)"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder="Category description (optional)"
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
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

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Edit Category</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Category Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g. Technology"
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
                  placeholder="category-slug (auto-generated if empty)"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Category description (optional)"
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
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
              <h3 className="text-lg font-bold text-text-primary mb-2">Delete Category</h3>
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

export default Categories
