import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react'
import { adminAPI } from '@api'

const CMSFooter = () => {
  const [loading, setLoading] = useState(true)
  const [footerLinks, setFooterLinks] = useState([])
  const [footerSocialLinks, setFooterSocialLinks] = useState([])
  const [editingLink, setEditingLink] = useState(null)
  const [editingSocial, setEditingSocial] = useState(null)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      setLoading(true)
      console.log('Fetching footer data...')
      const [linksRes, socialRes] = await Promise.all([
        adminAPI.getFooterLinks(),
        adminAPI.getFooterSocialLinks()
      ])
      console.log('Footer data received:', { links: linksRes.data, social: socialRes.data })
      
      // Ensure data is always an array
      const linksData = Array.isArray(linksRes.data) ? linksRes.data : []
      const socialData = Array.isArray(socialRes.data) ? socialRes.data : []
      
      setFooterLinks(linksData)
      setFooterSocialLinks(socialData)
    } catch (error) {
      console.error('Failed to fetch footer data:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load footer data'
      setMessage({ type: 'error', text: errorMessage })
      // Set empty arrays on error to prevent map errors
      setFooterLinks([])
      setFooterSocialLinks([])
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleAddLink = () => {
    setEditingLink({ section: 'Useful Links', title: '', url: '', display_order: footerLinks.length, is_active: true })
    setShowLinkModal(true)
  }

  const handleEditLink = (item) => {
    setEditingLink({ ...item })
    setShowLinkModal(true)
  }

  const handleSaveLink = async () => {
    try {
      setSaving(true)
      
      // Validate required fields
      if (!editingLink.title || !editingLink.url) {
        showMessage('error', 'Title and URL are required')
        setSaving(false)
        return
      }

      if (editingLink.id) {
        await adminAPI.updateFooterLink(editingLink.id, editingLink)
        showMessage('success', 'Footer link updated successfully')
      } else {
        await adminAPI.createFooterLink(editingLink)
        showMessage('success', 'Footer link created successfully')
      }
      setShowLinkModal(false)
      setEditingLink(null)
      fetchFooterData()
    } catch (error) {
      console.error('Failed to save footer link:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save footer link'
      showMessage('error', errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteLink = async (id) => {
    if (!window.confirm('Are you sure you want to delete this footer link?')) return
    
    try {
      await adminAPI.deleteFooterLink(id)
      showMessage('success', 'Footer link deleted successfully')
      fetchFooterData()
    } catch (error) {
      console.error('Failed to delete footer link:', error)
      showMessage('error', 'Failed to delete footer link')
    }
  }

  const handleAddSocial = () => {
    setEditingSocial({ platform: '', icon: '', url: '', display_order: footerSocialLinks.length, is_active: true })
    setShowSocialModal(true)
  }

  const handleEditSocial = (item) => {
    setEditingSocial({ ...item })
    setShowSocialModal(true)
  }

  const handleSaveSocial = async () => {
    try {
      setSaving(true)
      
      // Validate required fields
      if (!editingSocial.platform || !editingSocial.icon || !editingSocial.url) {
        showMessage('error', 'Platform, Icon, and URL are required')
        setSaving(false)
        return
      }

      if (editingSocial.id) {
        await adminAPI.updateFooterSocialLink(editingSocial.id, editingSocial)
        showMessage('success', 'Social link updated successfully')
      } else {
        await adminAPI.createFooterSocialLink(editingSocial)
        showMessage('success', 'Social link created successfully')
      }
      setShowSocialModal(false)
      setEditingSocial(null)
      fetchFooterData()
    } catch (error) {
      console.error('Failed to save social link:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save social link'
      showMessage('error', errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSocial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social link?')) return
    
    try {
      await adminAPI.deleteFooterSocialLink(id)
      showMessage('success', 'Social link deleted successfully')
      fetchFooterData()
    } catch (error) {
      console.error('Failed to delete social link:', error)
      showMessage('error', 'Failed to delete social link')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {message.text && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-error/10 text-error'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Footer</h1>
          <p className="text-text-secondary">Manage footer links and social media</p>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Footer Links</h2>
          <button 
            onClick={handleAddLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Section</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">URL</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {footerLinks.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-surface/50">
                  <td className="px-4 py-3 text-text-secondary">{item.section}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{item.title}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.url}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditLink(item)}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLink(item.id)}
                        className="p-2 text-text-muted hover:text-error rounded-lg hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {footerLinks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-text-secondary">No footer links found</p>
            </div>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Social Links</h2>
          <button 
            onClick={handleAddSocial}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Social Link
          </button>
        </div>

        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Icon</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">URL</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {footerSocialLinks.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-surface/50">
                  <td className="px-4 py-3 font-medium text-text-primary">{item.platform}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.icon}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.url}</td>
                  <td className="px-4 py-3 text-text-secondary">{item.display_order}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditSocial(item)}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSocial(item.id)}
                        className="p-2 text-text-muted hover:text-error rounded-lg hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {footerSocialLinks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-text-secondary">No social links found</p>
            </div>
          )}
        </div>
      </div>

      {/* Link Modal */}
      {showLinkModal && editingLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingLink.id ? 'Edit Footer Link' : 'Add Footer Link'}
              </h2>
              <button 
                onClick={() => {
                  setShowLinkModal(false)
                  setEditingLink(null)
                }}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Section</label>
                <select
                  value={editingLink.section}
                  onChange={(e) => setEditingLink({ ...editingLink, section: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                >
                  <option value="Useful Links">Useful Links</option>
                  <option value="Company">Company</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
                <input
                  type="text"
                  value={editingLink.title}
                  onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">URL *</label>
                <input
                  type="text"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingLink.display_order}
                  onChange={(e) => setEditingLink({ ...editingLink, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="link_active"
                  checked={editingLink.is_active}
                  onChange={(e) => setEditingLink({ ...editingLink, is_active: e.target.checked })}
                  disabled={saving}
                />
                <label htmlFor="link_active" className="text-sm text-text-secondary">Active</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowLinkModal(false)
                    setEditingLink(null)
                  }}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLink}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? <><AlertCircle className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Modal */}
      {showSocialModal && editingSocial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingSocial.id ? 'Edit Social Link' : 'Add Social Link'}
              </h2>
              <button 
                onClick={() => {
                  setShowSocialModal(false)
                  setEditingSocial(null)
                }}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Platform *</label>
                <input
                  type="text"
                  value={editingSocial.platform}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Icon *</label>
                <input
                  type="text"
                  value={editingSocial.icon}
                  onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">URL *</label>
                <input
                  type="text"
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingSocial.display_order}
                  onChange={(e) => setEditingSocial({ ...editingSocial, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="social_active"
                  checked={editingSocial.is_active}
                  onChange={(e) => setEditingSocial({ ...editingSocial, is_active: e.target.checked })}
                  disabled={saving}
                />
                <label htmlFor="social_active" className="text-sm text-text-secondary">Active</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowSocialModal(false)
                    setEditingSocial(null)
                  }}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSocial}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? <><AlertCircle className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CMSFooter
