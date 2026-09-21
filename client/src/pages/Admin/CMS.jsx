import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, GripVertical, ExternalLink, Image as ImageIcon, Save, X, CheckCircle, AlertCircle } from 'lucide-react'
import { adminAPI } from '@api'
import { useLocation } from 'react-router-dom'

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
      setActiveTab('navbar') // default
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

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'navbar') {
        const response = await adminAPI.getNavbarItems()
        setNavbarItems(response.data || [])
      } else if (activeTab === 'footer') {
        const [linksRes, socialRes] = await Promise.all([
          adminAPI.getFooterLinks(),
          adminAPI.getFooterSocialLinks()
        ])
        setFooterLinks(linksRes.data || [])
        setFooterSocialLinks(socialRes.data || [])
      } else if (activeTab === 'clients') {
        const response = await adminAPI.getClients()
        setClients(response.data || [])
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
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  // ==================== NAVBAR FUNCTIONS ====================
  
  const handleAddNavbar = () => {
    setEditingNavbar({ label: '', url: '', parent_id: null, display_order: navbarItems.length, is_active: true })
    setShowNavbarModal(true)
  }

  const handleEditNavbar = (item) => {
    setEditingNavbar({ ...item })
    setShowNavbarModal(true)
  }

  const handleSaveNavbar = async () => {
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

  const handleDeleteNavbar = async (id) => {
    if (!confirm('Are you sure you want to delete this navbar item?')) return
    try {
      await adminAPI.deleteNavbarItem(id)
      showMessage('success', 'Navbar item deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Failed to delete navbar item:', error)
      showMessage('error', 'Failed to delete navbar item')
    }
  }

  // ==================== FOOTER LINKS FUNCTIONS ====================
  
  const handleAddFooterLink = () => {
    setEditingFooterLink({ section: 'Useful Links', title: '', url: '', display_order: footerLinks.length, is_active: true })
    setShowFooterLinkModal(true)
  }

  const handleEditFooterLink = (item) => {
    setEditingFooterLink({ ...item })
    setShowFooterLinkModal(true)
  }

  const handleSaveFooterLink = async () => {
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

  const handleDeleteFooterLink = async (id) => {
    if (!confirm('Are you sure you want to delete this footer link?')) return
    try {
      await adminAPI.deleteFooterLink(id)
      showMessage('success', 'Footer link deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Failed to delete footer link:', error)
      showMessage('error', 'Failed to delete footer link')
    }
  }

  // ==================== FOOTER SOCIAL LINKS FUNCTIONS ====================
  
  const handleAddSocialLink = () => {
    setEditingSocialLink({ platform: '', icon: '', url: '', display_order: footerSocialLinks.length, is_active: true })
    setShowSocialLinkModal(true)
  }

  const handleEditSocialLink = (item) => {
    setEditingSocialLink({ ...item })
    setShowSocialLinkModal(true)
  }

  const handleSaveSocialLink = async () => {
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

  const handleDeleteSocialLink = async (id) => {
    if (!confirm('Are you sure you want to delete this social link?')) return
    try {
      await adminAPI.deleteFooterSocialLink(id)
      showMessage('success', 'Social link deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Failed to delete social link:', error)
      showMessage('error', 'Failed to delete social link')
    }
  }

  // ==================== CLIENTS FUNCTIONS ====================
  
  const handleAddClient = () => {
    setEditingClient({ client_name: '', logo_path: '', website_url: '', display_order: clients.length, is_active: true })
    setShowClientModal(true)
  }

  const handleEditClient = (item) => {
    setEditingClient({ ...item })
    setShowClientModal(true)
  }

  const handleSaveClient = async () => {
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

  const handleDeleteClient = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return
    try {
      await adminAPI.deleteClient(id)
      showMessage('success', 'Client deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Failed to delete client:', error)
      showMessage('error', 'Failed to delete client')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-text-muted">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Website Content Management</h1>
          <p className="text-text-secondary">Manage header, footer, and client logos</p>
        </div>
      </div>

      {message.text && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-error/10 border border-error/30 text-error'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('navbar')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'navbar'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Header & Navbar
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'footer'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Footer
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'clients'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Our Clients
        </button>
      </div>

      {/* Navbar Tab */}
      {activeTab === 'navbar' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-text-primary">Navbar Menu Items</h2>
            <button
              onClick={handleAddNavbar}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Menu Item
            </button>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Label</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">URL</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Order</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {navbarItems.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 text-text-primary">{item.label}</td>
                    <td className="px-6 py-4 text-text-secondary">{item.url}</td>
                    <td className="px-6 py-4 text-text-secondary">{item.display_order}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditNavbar(item)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button
                          onClick={() => handleDeleteNavbar(item.id)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Tab */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          {/* Footer Links */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-text-primary">Footer Links</h2>
              <button
                onClick={handleAddFooterLink}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Link
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Section</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Title</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">URL</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Order</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footerLinks.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-b-0">
                      <td className="px-6 py-4 text-text-primary">{item.section}</td>
                      <td className="px-6 py-4 text-text-primary">{item.title}</td>
                      <td className="px-6 py-4 text-text-secondary">{item.url || '-'}</td>
                      <td className="px-6 py-4 text-text-secondary">{item.display_order}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditFooterLink(item)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => handleDeleteFooterLink(item.id)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-text-primary">Social Media Links</h2>
              <button
                onClick={handleAddSocialLink}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Social Link
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Platform</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Icon</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">URL</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Order</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {footerSocialLinks.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-b-0">
                      <td className="px-6 py-4 text-text-primary">{item.platform}</td>
                      <td className="px-6 py-4 text-text-secondary">{item.icon}</td>
                      <td className="px-6 py-4 text-text-secondary">{item.url}</td>
                      <td className="px-6 py-4 text-text-secondary">{item.display_order}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditSocialLink(item)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button
                            onClick={() => handleDeleteSocialLink(item.id)}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Clients Tab */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-text-primary">Client Logos</h2>
            <button
              onClick={handleAddClient}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Client
            </button>
          </div>

          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Client Name</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Logo</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Website URL</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Order</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 text-text-primary">{item.client_name}</td>
                    <td className="px-6 py-4">
                      <img src={item.logo_path} alt={item.client_name} className="h-8 w-auto" />
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {item.website_url ? (
                        <a href={item.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          <ExternalLink className="w-3 h-3" />
                          {item.website_url}
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{item.display_order}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClient(item)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(item.id)}
                          className="p-2 hover:bg-background rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Navbar Modal */}
      {showNavbarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingNavbar.id ? 'Edit Menu Item' : 'Add Menu Item'}
              </h3>
              <button onClick={() => setShowNavbarModal(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Label</label>
                <input
                  type="text"
                  value={editingNavbar.label}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, label: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">URL</label>
                <input
                  type="text"
                  value={editingNavbar.url}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingNavbar.display_order}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="navbar-active"
                  checked={editingNavbar.is_active}
                  onChange={(e) => setEditingNavbar({ ...editingNavbar, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="navbar-active" className="text-sm text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveNavbar}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setShowNavbarModal(false)}
                  className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Link Modal */}
      {showFooterLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingFooterLink.id ? 'Edit Footer Link' : 'Add Footer Link'}
              </h3>
              <button onClick={() => setShowFooterLinkModal(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Section</label>
                <select
                  value={editingFooterLink.section}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, section: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="Useful Links">Useful Links</option>
                  <option value="Company">Company</option>
                  <option value="Services">Services</option>
                  <option value="Resources">Resources</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Title</label>
                <input
                  type="text"
                  value={editingFooterLink.title}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">URL</label>
                <input
                  type="text"
                  value={editingFooterLink.url}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingFooterLink.display_order}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="footerlink-active"
                  checked={editingFooterLink.is_active}
                  onChange={(e) => setEditingFooterLink({ ...editingFooterLink, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="footerlink-active" className="text-sm text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveFooterLink}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setShowFooterLinkModal(false)}
                  className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Link Modal */}
      {showSocialLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingSocialLink.id ? 'Edit Social Link' : 'Add Social Link'}
              </h3>
              <button onClick={() => setShowSocialLinkModal(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Platform</label>
                <input
                  type="text"
                  value={editingSocialLink.platform}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, platform: e.target.value })}
                  placeholder="e.g., LinkedIn, Twitter"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Icon Class</label>
                <input
                  type="text"
                  value={editingSocialLink.icon}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, icon: e.target.value })}
                  placeholder="e.g., bi-linkedin"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">URL</label>
                <input
                  type="text"
                  value={editingSocialLink.url}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingSocialLink.display_order}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sociallink-active"
                  checked={editingSocialLink.is_active}
                  onChange={(e) => setEditingSocialLink({ ...editingSocialLink, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="sociallink-active" className="text-sm text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveSocialLink}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setShowSocialLinkModal(false)}
                  className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-xl border border-border p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingClient.id ? 'Edit Client' : 'Add Client'}
              </h3>
              <button onClick={() => setShowClientModal(false)} className="text-text-secondary hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Client Name</label>
                <input
                  type="text"
                  value={editingClient.client_name}
                  onChange={(e) => setEditingClient({ ...editingClient, client_name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Logo Path</label>
                <input
                  type="text"
                  value={editingClient.logo_path}
                  onChange={(e) => setEditingClient({ ...editingClient, logo_path: e.target.value })}
                  placeholder="/path/to/logo.png"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Website URL</label>
                <input
                  type="text"
                  value={editingClient.website_url}
                  onChange={(e) => setEditingClient({ ...editingClient, website_url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingClient.display_order}
                  onChange={(e) => setEditingClient({ ...editingClient, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="client-active"
                  checked={editingClient.is_active}
                  onChange={(e) => setEditingClient({ ...editingClient, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="client-active" className="text-sm text-text-secondary">Active</label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveClient}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setShowClientModal(false)}
                  className="px-4 py-2 bg-background border border-border rounded-lg hover:bg-border transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CMS
