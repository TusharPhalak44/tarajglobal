import React, { useEffect, useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Link2,
  Share2,
  ExternalLink,
  Layers,
  Globe,
  Sliders
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'
import ConfirmModal from '@components/admin/ConfirmModal'

const CMSFooter = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('links')
  const [footerLinks, setFooterLinks] = useState([])
  const [footerSocialLinks, setFooterSocialLinks] = useState([])
  const [editingLink, setEditingLink] = useState(null)
  const [editingSocial, setEditingSocial] = useState(null)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: 'link', id: null, title: '' })

  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      setLoading(true)
      const [linksRes, socialRes] = await Promise.all([
        adminAPI.getCMSFooterLinks(),
        adminAPI.getCMSFooterSocialLinks()
      ])
      
      const linksData = Array.isArray(linksRes.data) ? linksRes.data : (linksRes.data?.data || [])
      const socialData = Array.isArray(socialRes.data) ? socialRes.data : (socialRes.data?.data || [])
      
      setFooterLinks(linksData)
      setFooterSocialLinks(socialData)
    } catch (error) {
      console.error('Failed to fetch footer data:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load footer data'
      setMessage({ type: 'error', text: errorMessage })
      setFooterLinks([])
      setFooterSocialLinks([])
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // --- Link Handlers ---
  const handleAddLink = () => {
    setEditingLink({ section: 'Useful Links', title: '', url: '', display_order: footerLinks.length + 1, is_active: true })
    setShowLinkModal(true)
  }

  const handleEditLink = (item) => {
    setEditingLink({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowLinkModal(true)
  }

  const handleSaveLink = async (e) => {
    e?.preventDefault()
    if (!editingLink.title?.trim() || !editingLink.url?.trim()) {
      showMessage('error', 'Link title and URL are required')
      return
    }

    try {
      setSaving(true)
      const payload = {
        section: editingLink.section || 'Useful Links',
        title: editingLink.title.trim(),
        url: editingLink.url.trim(),
        display_order: Number(editingLink.display_order) || 0,
        is_active: editingLink.is_active ? 1 : 0
      }

      if (editingLink.id) {
        await adminAPI.updateCMSFooterLink(editingLink.id, payload)
        showMessage('success', `Footer link "${payload.title}" updated`)
      } else {
        await adminAPI.createCMSFooterLink(payload)
        showMessage('success', `Footer link "${payload.title}" created`)
      }
      setShowLinkModal(false)
      setEditingLink(null)
      fetchFooterData()
    } catch (error) {
      console.error('Failed to save footer link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save footer link')
    } finally {
      setSaving(false)
    }
  }

  // --- Social Handlers ---
  const handleAddSocial = () => {
    setEditingSocial({ platform: '', icon: 'bi-globe', url: '', display_order: footerSocialLinks.length + 1, is_active: true })
    setShowSocialModal(true)
  }

  const handleEditSocial = (item) => {
    setEditingSocial({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowSocialModal(true)
  }

  const handleSaveSocial = async (e) => {
    e?.preventDefault()
    if (!editingSocial.platform?.trim() || !editingSocial.url?.trim()) {
      showMessage('error', 'Platform and URL are required')
      return
    }

    try {
      setSaving(true)
      const payload = {
        platform: editingSocial.platform.trim(),
        icon: editingSocial.icon?.trim() || 'bi-globe',
        url: editingSocial.url.trim(),
        display_order: Number(editingSocial.display_order) || 0,
        is_active: editingSocial.is_active ? 1 : 0
      }

      if (editingSocial.id) {
        await adminAPI.updateCMSFooterSocialLink(editingSocial.id, payload)
        showMessage('success', `Social link "${payload.platform}" updated`)
      } else {
        await adminAPI.createCMSFooterSocialLink(payload)
        showMessage('success', `Social link "${payload.platform}" created`)
      }
      setShowSocialModal(false)
      setEditingSocial(null)
      fetchFooterData()
    } catch (error) {
      console.error('Failed to save social link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save social link')
    } finally {
      setSaving(false)
    }
  }

  const executeDelete = async () => {
    if (!deleteConfirm.id) return
    try {
      if (deleteConfirm.type === 'link') {
        await adminAPI.deleteCMSFooterLink(deleteConfirm.id)
        showMessage('success', `Footer link "${deleteConfirm.title}" removed`)
      } else {
        await adminAPI.deleteCMSFooterSocialLink(deleteConfirm.id)
        showMessage('success', `Social link "${deleteConfirm.title}" removed`)
      }
      setDeleteConfirm({ open: false, type: 'link', id: null, title: '' })
      fetchFooterData()
    } catch (error) {
      console.error('Delete error:', error)
      showMessage('error', 'Failed to delete item')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Footer Architecture CMS" subtitle="Configure footer columns, directory paths, and social channel endpoints" />
        <LoadingSkeleton type="table" rows={6} />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="Footer Architecture CMS"
        subtitle="Manage website footer directory columns, internal links, and social channel endpoints"
        badge="Footer Engine"
        actions={[
          {
            label: activeTab === 'links' ? 'Add Footer Link' : 'Add Social Channel',
            icon: Plus,
            onClick: activeTab === 'links' ? handleAddLink : handleAddSocial,
            variant: 'primary'
          }
        ]}
      />

      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--admin-border)] overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTab('links')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all ${
            activeTab === 'links'
              ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>Footer Directory Links ({footerLinks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all ${
            activeTab === 'social'
              ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Social Endpoints ({footerSocialLinks.length})</span>
        </button>
      </div>

      {/* TAB 1: Links */}
      {activeTab === 'links' && (
        <div className="admin-card overflow-hidden">
          <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Directory Navigation Links ({footerLinks.length})
            </h3>
            <button onClick={handleAddLink} className="admin-btn-primary text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Add Link
            </button>
          </div>

          {footerLinks.length === 0 ? (
            <EmptyState
              title="No Footer Links Found"
              description="Create navigation links to organize your website footer columns."
              actionLabel="Add Link"
              onAction={handleAddLink}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Column Section</th>
                    <th>Link Title</th>
                    <th>Target Destination</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footerLinks.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs text-primary font-semibold">
                        {item.section}
                      </td>
                      <td className="font-semibold text-text-primary text-sm">
                        {item.title}
                      </td>
                      <td className="text-xs font-mono text-text-secondary">
                        {item.url}
                      </td>
                      <td className="font-mono text-xs text-text-muted">
                        #{item.display_order}
                      </td>
                      <td>
                        <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditLink(item)}
                            className="admin-btn-icon"
                            title="Edit Link"
                          >
                            <Edit2 className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, type: 'link', id: item.id, title: item.title })}
                            className="admin-btn-icon hover:text-rose-400"
                            title="Delete Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Social Links */}
      {activeTab === 'social' && (
        <div className="admin-card overflow-hidden">
          <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Share2 className="w-4 h-4 text-primary" />
              Social Media Endpoints ({footerSocialLinks.length})
            </h3>
            <button onClick={handleAddSocial} className="admin-btn-primary text-xs flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Add Social Profile
            </button>
          </div>

          {footerSocialLinks.length === 0 ? (
            <EmptyState
              title="No Social Profiles Configured"
              description="Add corporate social media handles to display across the website footer."
              actionLabel="Add Social Channel"
              onAction={handleAddSocial}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Icon Token</th>
                    <th>Target Profile URL</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footerSocialLinks.map((item) => (
                    <tr key={item.id}>
                      <td className="font-semibold text-text-primary text-sm">
                        {item.platform}
                      </td>
                      <td className="font-mono text-xs text-text-muted">
                        {item.icon}
                      </td>
                      <td className="text-xs font-mono text-primary">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                          <span>{item.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="font-mono text-xs text-text-muted">
                        #{item.display_order}
                      </td>
                      <td>
                        <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditSocial(item)}
                            className="admin-btn-icon"
                            title="Edit Profile"
                          >
                            <Edit2 className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, type: 'social', id: item.id, title: item.platform })}
                            className="admin-btn-icon hover:text-rose-400"
                            title="Delete Profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Link Edit/Add Modal */}
      {showLinkModal && editingLink && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {editingLink.id ? 'Edit Directory Link' : 'Add Directory Link'}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Specify column assignment and URL route</p>
              </div>
              <button onClick={() => { setShowLinkModal(false); setEditingLink(null); }} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLink} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Column Section
                </label>
                <select
                  value={editingLink.section}
                  onChange={(e) => setEditingLink({ ...editingLink, section: e.target.value })}
                  className="admin-select"
                >
                  <option value="Useful Links">Useful Links</option>
                  <option value="Company">Company</option>
                  <option value="Services">Services</option>
                  <option value="Resources">Resources</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Link Title *
                </label>
                <input
                  type="text"
                  value={editingLink.title}
                  onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                  placeholder="e.g. MQL Services"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Target URL *
                </label>
                <input
                  type="text"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  placeholder="/mql-services or https://..."
                  className="admin-input font-mono text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={editingLink.display_order}
                    onChange={(e) => setEditingLink({ ...editingLink, display_order: parseInt(e.target.value) || 0 })}
                    className="admin-input font-mono"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-secondary select-none">
                    <input
                      type="checkbox"
                      checked={editingLink.is_active}
                      onChange={(e) => setEditingLink({ ...editingLink, is_active: e.target.checked })}
                      className="w-4 h-4 rounded text-primary"
                    />
                    <span>Active in Footer</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => { setShowLinkModal(false); setEditingLink(null); }}
                  className="admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Edit/Add Modal */}
      {showSocialModal && editingSocial && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {editingSocial.id ? 'Edit Social Handle' : 'Add Social Channel'}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">Configure platform name and link</p>
              </div>
              <button onClick={() => { setShowSocialModal(false); setEditingSocial(null); }} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSocial} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Platform Name *
                </label>
                <input
                  type="text"
                  value={editingSocial.platform}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                  placeholder="e.g. LinkedIn, GitHub"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Icon Identifier
                </label>
                <input
                  type="text"
                  value={editingSocial.icon}
                  onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                  placeholder="e.g. bi-linkedin"
                  className="admin-input font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Profile URL *
                </label>
                <input
                  type="url"
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                  className="admin-input font-mono text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={editingSocial.display_order}
                    onChange={(e) => setEditingSocial({ ...editingSocial, display_order: parseInt(e.target.value) || 0 })}
                    className="admin-input font-mono"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-secondary select-none">
                    <input
                      type="checkbox"
                      checked={editingSocial.is_active}
                      onChange={(e) => setEditingSocial({ ...editingSocial, is_active: e.target.checked })}
                      className="w-4 h-4 rounded text-primary"
                    />
                    <span>Active in Footer</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => { setShowSocialModal(false); setEditingSocial(null); }}
                  className="admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        title="Delete Footer Item"
        message={`Are you sure you want to remove "${deleteConfirm.title}" from the footer configuration?`}
        confirmLabel="Delete Item"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ open: false, type: 'link', id: null, title: '' })}
      />
    </div>
  )
}

export default CMSFooter
