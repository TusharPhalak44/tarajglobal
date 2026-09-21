import React, { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, ExternalLink, Save, X, AlertCircle } from 'lucide-react'
import { adminAPI } from '@api'

const CMSOurClients = () => {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [editingClient, setEditingClient] = useState(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getClients()
      setClients(response.data || [])
    } catch (error) {
      console.error('Failed to fetch clients:', error)
      setMessage({ type: 'error', text: 'Failed to load clients' })
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

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
      setSaving(true)
      if (editingClient.id) {
        await adminAPI.updateClient(editingClient.id, editingClient)
        showMessage('success', 'Client updated successfully')
      } else {
        await adminAPI.createClient(editingClient)
        showMessage('success', 'Client created successfully')
      }
      setShowClientModal(false)
      setEditingClient(null)
      fetchClients()
    } catch (error) {
      console.error('Failed to save client:', error)
      showMessage('error', 'Failed to save client')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClient = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return
    
    try {
      await adminAPI.deleteClient(id)
      showMessage('success', 'Client deleted successfully')
      fetchClients()
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
      {message.text && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-error/10 text-error'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Our Clients</h1>
          <p className="text-text-secondary">Manage client logos and information</p>
        </div>
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
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Client Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Logo Path</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Website</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Order</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-border hover:bg-surface/50">
                <td className="px-6 py-4 font-medium text-text-primary">{client.client_name}</td>
                <td className="px-6 py-4 text-text-secondary">{client.logo_path}</td>
                <td className="px-6 py-4">
                  {client.website_url ? (
                    <a 
                      href={client.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  ) : (
                    <span className="text-text-muted">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-text-secondary">{client.display_order}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {client.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditClient(client)}
                      className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClient(client.id)}
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

        {clients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-text-secondary">No clients found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showClientModal && editingClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-md">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                {editingClient.id ? 'Edit Client' : 'Add Client'}
              </h2>
              <button 
                onClick={() => {
                  setShowClientModal(false)
                  setEditingClient(null)
                }}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Client Name *</label>
                <input
                  type="text"
                  value={editingClient.client_name}
                  onChange={(e) => setEditingClient({ ...editingClient, client_name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Logo Path *</label>
                <input
                  type="text"
                  value={editingClient.logo_path}
                  onChange={(e) => setEditingClient({ ...editingClient, logo_path: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Website URL</label>
                <input
                  type="text"
                  value={editingClient.website_url}
                  onChange={(e) => setEditingClient({ ...editingClient, website_url: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Display Order</label>
                <input
                  type="number"
                  value={editingClient.display_order}
                  onChange={(e) => setEditingClient({ ...editingClient, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="client_active"
                  checked={editingClient.is_active}
                  onChange={(e) => setEditingClient({ ...editingClient, is_active: e.target.checked })}
                  disabled={saving}
                />
                <label htmlFor="client_active" className="text-sm text-text-secondary">Active</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowClientModal(false)
                    setEditingClient(null)
                  }}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClient}
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

export default CMSOurClients
