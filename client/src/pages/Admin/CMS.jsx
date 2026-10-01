import React, { useEffect, useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Link2,
  Layers,
  Building2,
  Sliders,
  Globe,
  Share2
} from 'lucide-react'
import { adminAPI } from '@api'
import { useLocation } from 'react-router-dom'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'
import ConfirmModal from '@components/admin/ConfirmModal'

const CMS = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('navbar')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/navbar')) {
      setActiveTab('navbar')
    } else if (path.includes('/footer')) {
      setActiveTab('footer')
    } else if (path.includes('/clients')) {
      setActiveTab('clients')
    } else {
      setActiveTab('navbar')
    }
  }, [location.pathname])
  
  // Navbar state
  const [navbarItems, setNavbarItems] = useState([])
  const [editingNavbar, setEditingNavbar] = useState(null)
  const [showNavbarModal, setShowNavbarModal] = useState(false)
  
  // Footer links state
  const [footerLinks, setFooterLinks] = useState([])
  const [editingFooterLink, setEditingFooterLink] = useState(null)
  const [showFooterLinkModal, setShowFooterLinkModal] = useState(false)
  
  // Footer social links state
  const [footerSocialLinks, setFooterSocialLinks] = useState([])
  const [editingSocialLink, setEditingSocialLink] = useState(null)
  const [showSocialLinkModal, setShowSocialLinkModal] = useState(false)
  
  // Clients state
  const [clients, setClients] = useState([])
  const [editingClient, setEditingClient] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)

  // Confirm delete state
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null, title: '' })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'navbar') {
        const response = await adminAPI.getNavbarItems()
        setNavbarItems(Array.isArray(response.data?.data) ? response.data.data : (response.data || []))
      } else if (activeTab === 'footer') {
        const [linksRes, socialRes] = await Promise.all([
          adminAPI.getFooterLinks(),
          adminAPI.getFooterSocialLinks()
        ])
        setFooterLinks(Array.isArray(linksRes.data?.data) ? linksRes.data.data : (linksRes.data || []))
        setFooterSocialLinks(Array.isArray(socialRes.data?.data) ? socialRes.data.data : (socialRes.data || []))
      } else if (activeTab === 'clients') {
        const response = await adminAPI.getClients()
        setClients(Array.isArray(response.data?.data) ? response.data.data : (response.data || []))
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setMessage({ type: 'error', text: 'Failed to load data' })
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  // ==================== NAVBAR FUNCTIONS ====================
  const handleAddNavbar = () => {
    setEditingNavbar({ label: '', url: '', parent_id: null, display_order: navbarItems.length + 1, is_active: true })
    setShowNavbarModal(true)
  }

  const handleEditNavbar = (item) => {
    setEditingNavbar({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowNavbarModal(true)
  }

  const handleSaveNavbar = async (e) => {
    e?.preventDefault()
    try {
      if (editingNavbar.id) {
        await adminAPI.updateNavbarItem(editingNavbar.id, editingNavbar)
        showMessage('success', 'Navbar item updated successfully')
      } else {
        await adminAPI.createNavbarItem(editingNavbar)
        showMessage('success', 'Navbar item created successfully')
      }
      setShowNavbarModal(false)
      setEditingNavbar(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save navbar item:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save navbar item')
    }
  }

  // ==================== FOOTER LINKS FUNCTIONS ====================
  const handleAddFooterLink = () => {
    setEditingFooterLink({ section: 'Useful Links', title: '', url: '', display_order: footerLinks.length + 1, is_active: true })
    setShowFooterLinkModal(true)
  }

  const handleEditFooterLink = (item) => {
    setEditingFooterLink({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowFooterLinkModal(true)
  }

  const handleSaveFooterLink = async (e) => {
    e?.preventDefault()
    try {
      if (editingFooterLink.id) {
        await adminAPI.updateFooterLink(editingFooterLink.id, editingFooterLink)
        showMessage('success', 'Footer link updated successfully')
      } else {
        await adminAPI.createFooterLink(editingFooterLink)
        showMessage('success', 'Footer link created successfully')
      }
      setShowFooterLinkModal(false)
      setEditingFooterLink(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save footer link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save footer link')
    }
  }

  // ==================== FOOTER SOCIAL LINKS FUNCTIONS ====================
  const handleAddSocialLink = () => {
    setEditingSocialLink({ platform: '', icon: 'bi-globe', url: '', display_order: footerSocialLinks.length + 1, is_active: true })
    setShowSocialLinkModal(true)
  }

  const handleEditSocialLink = (item) => {
    setEditingSocialLink({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowSocialLinkModal(true)
  }

  const handleSaveSocialLink = async (e) => {
    e?.preventDefault()
    try {
      if (editingSocialLink.id) {
        await adminAPI.updateFooterSocialLink(editingSocialLink.id, editingSocialLink)
        showMessage('success', 'Social link updated successfully')
      } else {
        await adminAPI.createFooterSocialLink(editingSocialLink)
        showMessage('success', 'Social link created successfully')
      }
      setShowSocialLinkModal(false)
      setEditingSocialLink(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save social link:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save social link')
    }
  }

  // ==================== CLIENTS FUNCTIONS ====================
  const handleAddClient = () => {
    setEditingClient({ client_name: '', logo_path: '', website_url: '', display_order: clients.length + 1, is_active: true })
    setShowClientModal(true)
  }

  const handleEditClient = (item) => {
    setEditingClient({ ...item, is_active: item.is_active === 1 || item.is_active === true })
    setShowClientModal(true)
  }

  const handleSaveClient = async (e) => {
    e?.preventDefault()
    try {
      if (editingClient.id) {
        await adminAPI.updateClient(editingClient.id, editingClient)
        showMessage('success', 'Client updated successfully')
      } else {
        await adminAPI.createClient(editingClient)
        showMessage('success', 'Client created successfully')
      }
      setShowClientModal(false)
      setEditingClient(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save client:', error)
      showMessage('error', error.response?.data?.message || 'Failed to save client')
    }
  }

  const executeDelete = async () => {
    if (!deleteConfirm.id) return
    try {
      if (deleteConfirm.type === 'navbar') {
        await adminAPI.deleteNavbarItem(deleteConfirm.id)
        showMessage('success', 'Navbar item deleted successfully')
      } else if (deleteConfirm.type === 'footerLink') {
        await adminAPI.deleteFooterLink(deleteConfirm.id)
        showMessage('success', 'Footer link deleted successfully')
      } else if (deleteConfirm.type === 'socialLink') {
        await adminAPI.deleteFooterSocialLink(deleteConfirm.id)
        showMessage('success', 'Social link deleted successfully')
      } else if (deleteConfirm.type === 'client') {
        await adminAPI.deleteClient(deleteConfirm.id)
        showMessage('success', 'Client deleted successfully')
      }
      setDeleteConfirm({ open: false, type: '', id: null, title: '' })
      fetchData()
    } catch (error) {
      console.error('Delete error:', error)
      showMessage('error', 'Failed to delete item')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Content Management Engine" subtitle="Centralized website layout, menu routing, and brand asset management" />
        <LoadingSkeleton type="table" rows={6} />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="Content Management Engine"
        subtitle="Manage public header routes, footer structure, and client logo showcase"
        badge="Live CMS"
        actions={[
          {
            label: activeTab === 'navbar' ? 'Add Menu Item' : activeTab === 'footer' ? 'Add Footer Link' : 'Add Client',
            icon: Plus,
            onClick: activeTab === 'navbar' ? handleAddNavbar : activeTab === 'footer' ? handleAddFooterLink : handleAddClient,
            variant: 'primary'
          }
        ]}
      />

      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-base font-medium transition-all ${
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
      <div className="flex gap-2 border-b border-[var(--admin-border)] overflow-visible pb-0.5">
        <button
          onClick={() => setActiveTab('navbar')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-base transition-all whitespace-nowrap ${
            activeTab === 'navbar'
              ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>Header & Navbar Menu ({navbarItems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-base transition-all whitespace-nowrap ${
            activeTab === 'footer'
              ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Footer Structure ({footerLinks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-base transition-all whitespace-nowrap ${
            activeTab === 'clients'
              ? 'border-primary text-primary bg-primary/5 rounded-t-lg'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[var(--admin-border)]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Client Logos ({clients.length})</span>
        </button>
      </div>

      {/* Navbar Tab */}
      {activeTab === 'navbar' && (
        <div className="admin-card overflow-hidden">
          <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              Main Navigation Links ({navbarItems.length})
            </h3>
            <button onClick={handleAddNavbar} className="admin-btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Menu Item
            </button>
          </div>

          {navbarItems.length === 0 ? (
            <EmptyState
              title="No Navigation Items Found"
              description="Configure header links to populate the public website navbar."
              actionLabel="Add Menu Item"
              onAction={handleAddNavbar}
            />
          ) : (
            <div className="overflow-visible">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Navigation Label</th>
                    <th>Route / Destination</th>
                    <th>Display Order</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {navbarItems.map((item) => (
                    <tr key={item.id}>
                      <td className="font-semibold text-text-primary text-base">
                        {item.label}
                      </td>
                      <td className="font-mono text-sm text-text-secondary">
                        {item.url}
                      </td>
                      <td className="font-mono text-sm text-text-muted">
                        #{item.display_order}
                      </td>
                      <td>
                        <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditNavbar(item)}
                            className="admin-btn-icon"
                            title="Edit Menu Item"
                          >
                            <Edit2 className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, type: 'navbar', id: item.id, title: item.label })}
                            className="admin-btn-icon hover:text-rose-400"
                            title="Delete Menu Item"
                          >
                            <Trash2 className="w-5 h-5" />
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

      {/* Footer Tab */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          <div className="admin-card overflow-hidden">
            <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                Footer Column Links ({footerLinks.length})
              </h3>
              <button onClick={handleAddFooterLink} className="admin-btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>

            {footerLinks.length === 0 ? (
              <EmptyState
                title="No Footer Links Found"
                description="Configure directory columns for the footer."
                actionLabel="Add Link"
                onAction={handleAddFooterLink}
              />
            ) : (
              <div className="overflow-visible">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Column Group</th>
                      <th>Title</th>
                      <th>Target URL</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {footerLinks.map((item) => (
                      <tr key={item.id}>
                        <td className="font-mono text-sm text-primary font-semibold">{item.section}</td>
                        <td className="font-semibold text-text-primary text-base">{item.title}</td>
                        <td className="font-mono text-sm text-text-secondary">{item.url || '-'}</td>
                        <td className="font-mono text-sm text-text-muted">#{item.display_order}</td>
                        <td>
                          <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                        </td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditFooterLink(item)}
                              className="admin-btn-icon"
                              title="Edit Link"
                            >
                              <Edit2 className="w-4 h-4 text-text-secondary" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ open: true, type: 'footerLink', id: item.id, title: item.title })}
                              className="admin-btn-icon hover:text-rose-400"
                              title="Delete Link"
                            >
                              <Trash2 className="w-5 h-5" />
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

          {/* Social Links Section */}
          <div className="admin-card overflow-hidden">
            <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                Social Media Links ({footerSocialLinks.length})
              </h3>
              <button onClick={handleAddSocialLink} className="admin-btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Social Channel
              </button>
            </div>

            {footerSocialLinks.length === 0 ? (
              <EmptyState
                title="No Social Profiles Found"
                description="Add social channels to display in the footer."
                actionLabel="Add Social Channel"
                onAction={handleAddSocialLink}
              />
            ) : (
              <div className="overflow-visible">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Icon Token</th>
                      <th>Target Link</th>
                      <th>Order</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {footerSocialLinks.map((item) => (
                      <tr key={item.id}>
                        <td className="font-semibold text-text-primary text-base">{item.platform}</td>
                        <td className="font-mono text-sm text-text-muted">{item.icon}</td>
                        <td className="font-mono text-sm text-primary">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            <span>{item.url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="font-mono text-sm text-text-muted">#{item.display_order}</td>
                        <td>
                          <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                        </td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditSocialLink(item)}
                              className="admin-btn-icon"
                              title="Edit Social Profile"
                            >
                              <Edit2 className="w-4 h-4 text-text-secondary" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ open: true, type: 'socialLink', id: item.id, title: item.platform })}
                              className="admin-btn-icon hover:text-rose-400"
                              title="Delete Social Profile"
                            >
                              <Trash2 className="w-5 h-5" />
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
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="admin-card overflow-hidden">
          <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
            <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Client Brand Showcase ({clients.length})
            </h3>
            <button onClick={handleAddClient} className="admin-btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </button>
          </div>

          {clients.length === 0 ? (
            <EmptyState
              title="No Client Logos Found"
              description="Register enterprise logos to showcase on the homepage."
              actionLabel="Add Client"
              onAction={handleAddClient}
            />
          ) : (
            <div className="overflow-visible">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Logo Asset</th>
                    <th>Enterprise Name</th>
                    <th>Website URL</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="w-16 h-8 rounded-lg bg-background dark:bg-[#07090E] border border-[var(--admin-border)] flex items-center justify-center p-1">
                          {item.logo_path ? (
                            <img src={item.logo_path} alt={item.client_name} className="max-h-full max-w-full object-contain" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-text-muted opacity-40" />
                          )}
                        </div>
                      </td>
                      <td className="font-semibold text-text-primary text-base">{item.client_name}</td>
                      <td className="font-mono text-sm text-primary">
                        {item.website_url ? (
                          <a href={item.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                            <span>{item.website_url.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : '-'}
                      </td>
                      <td className="font-mono text-sm text-text-muted">#{item.display_order}</td>
                      <td>
                        <StatusBadge status={item.is_active ? 'active' : 'inactive'} />
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClient(item)}
                            className="admin-btn-icon"
                            title="Edit Client"
                          >
                            <Edit2 className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, type: 'client', id: item.id, title: item.client_name })}
                            className="admin-btn-icon hover:text-rose-400"
                            title="Delete Client"
                          >
                            <Trash2 className="w-5 h-5" />
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

      {/* Navbar Modal */}
      {showNavbarModal && editingNavbar && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">
                {editingNavbar.id ? 'Edit Menu Item' : 'Add Menu Item'}
              </h3>
              <button onClick={() => setShowNavbarModal(false)} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveNavbar} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Label</label>
                <input
                  type="text"
                  value={editingNavbar.label}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, label: e.target.value })}
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">URL</label>
                <input
                  type="text"
                  value={editingNavbar.url}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, url: e.target.value })}
                  className="admin-input font-mono text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={editingNavbar.display_order}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, display_order: parseInt(e.target.value) || 0 })}
                  className="admin-input font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="navbar-active"
                  checked={editingNavbar.is_active}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="navbar-active" className="text-sm font-semibold text-text-secondary">Active in Header</label>
              </div>
              <div className="flex gap-2 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setShowNavbarModal(false)}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Link Modal */}
      {showFooterLinkModal && editingFooterLink && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">
                {editingFooterLink.id ? 'Edit Footer Link' : 'Add Footer Link'}
              </h3>
              <button onClick={() => setShowFooterLinkModal(false)} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveFooterLink} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Section</label>
                <select
                  value={editingFooterLink.section}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, section: e.target.value })}
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
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Title</label>
                <input
                  type="text"
                  value={editingFooterLink.title}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, title: e.target.value })}
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">URL</label>
                <input
                  type="text"
                  value={editingFooterLink.url}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, url: e.target.value })}
                  className="admin-input font-mono text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={editingFooterLink.display_order}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, display_order: parseInt(e.target.value) || 0 })}
                  className="admin-input font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="footerlink-active"
                  checked={editingFooterLink.is_active}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="footerlink-active" className="text-sm font-semibold text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setShowFooterLinkModal(false)}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Social Link Modal */}
      {showSocialLinkModal && editingSocialLink && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">
                {editingSocialLink.id ? 'Edit Social Link' : 'Add Social Link'}
              </h3>
              <button onClick={() => setShowSocialLinkModal(false)} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveSocialLink} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Platform</label>
                <input
                  type="text"
                  value={editingSocialLink.platform}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, platform: e.target.value })}
                  placeholder="e.g. LinkedIn"
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Icon Class</label>
                <input
                  type="text"
                  value={editingSocialLink.icon}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, icon: e.target.value })}
                  placeholder="bi-linkedin"
                  className="admin-input font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">URL</label>
                <input
                  type="text"
                  value={editingSocialLink.url}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, url: e.target.value })}
                  placeholder="https://..."
                  className="admin-input font-mono text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={editingSocialLink.display_order}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, display_order: parseInt(e.target.value) || 0 })}
                  className="admin-input font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sociallink-active"
                  checked={editingSocialLink.is_active}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="sociallink-active" className="text-sm font-semibold text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setShowSocialLinkModal(false)}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {showClientModal && editingClient && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-md">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-primary">
                {editingClient.id ? 'Edit Client' : 'Add Client'}
              </h3>
              <button onClick={() => setShowClientModal(false)} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveClient} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Client Name *</label>
                <input
                  type="text"
                  value={editingClient.client_name}
                  onChange={(e) => setEditingClient({ ...editingClient, client_name: e.target.value })}
                  placeholder="e.g. Microsoft"
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Logo Path / URL *</label>
                <input
                  type="text"
                  value={editingClient.logo_path}
                  onChange={(e) => setEditingClient({ ...editingClient, logo_path: e.target.value })}
                  placeholder="/mitel.png or https://..."
                  className="admin-input font-mono text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Website URL</label>
                <input
                  type="text"
                  value={editingClient.website_url || ''}
                  onChange={(e) => setEditingClient({ ...editingClient, website_url: e.target.value })}
                  placeholder="https://..."
                  className="admin-input font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={editingClient.display_order}
                  onChange={(e) => setEditingClient({ ...editingClient, display_order: parseInt(e.target.value) || 0 })}
                  className="admin-input font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="client-active"
                  checked={editingClient.is_active}
                  onChange={(e) => setEditingClient({ ...editingClient, is_active: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="client-active" className="text-sm font-semibold text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        title="Confirm Removal"
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This item will immediately be removed.`}
        confirmLabel="Delete Item"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ open: false, type: '', id: null, title: '' })}
      />
    </div>
  )
}

export default CMS
