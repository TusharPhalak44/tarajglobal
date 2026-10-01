import React, { useEffect, useState, useRef } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Upload,
  CheckCircle,
  AlertCircle,
  Settings,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Building2,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import StatusBadge from '@components/admin/StatusBadge'
import EmptyState from '@components/admin/EmptyState'
import LoadingSkeleton from '@components/admin/LoadingSkeleton'
import ConfirmModal from '@components/admin/ConfirmModal'

/* ─── helpers ─── */
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''

const imgSrc = (path) => {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path // public folder (e.g. /mitel.png)
}

const EMPTY_CLIENT = { client_name: '', logo_path: '', website_url: '', display_order: 0, is_active: true }
const EMPTY_SETTINGS = {
  eyebrow: 'GLOBAL PARTNERSHIPS',
  title_white: 'TRUSTED BY',
  title_gradient: 'LEADING B2B BRANDS',
  subtitle: 'Building demand with the technology ecosystem trusted by modern enterprises.',
  is_visible: true,
}

const CMSOurClients = () => {
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [sectionSettings, setSettings] = useState(EMPTY_SETTINGS)
  const [editingClient, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' })
  const fileRef = useRef(null)

  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    try {
      setLoading(true)
      const [clientsRes, settingsRes] = await Promise.all([
        adminAPI.getClients(),
        adminAPI.getClientSectionSettings(),
      ])
      const rawClients = clientsRes.data?.data || clientsRes.data || []
      setClients(Array.isArray(rawClients) ? rawClients : [])
      if (settingsRes.data?.data) setSettings(settingsRes.data.data)
    } catch (err) {
      console.error('Failed to load:', err)
      flash('error', 'Failed to load client roster data')
    } finally {
      setLoading(false)
    }
  }

  const flash = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  /* ── Section Settings ── */
  const handleSaveSettings = async (e) => {
    e?.preventDefault()
    try {
      setSavingSettings(true)
      await adminAPI.updateClientSectionSettings(sectionSettings)
      flash('success', 'Client section parameters updated and deployed!')
    } catch {
      flash('error', 'Failed to save section settings')
    } finally {
      setSavingSettings(false)
    }
  }

  /* ── Clients CRUD ── */
  const openAdd = () => {
    setEditing({ ...EMPTY_CLIENT, display_order: clients.length + 1 })
    setShowModal(true)
  }

  const openEdit = (c) => {
    setEditing({ ...c, is_active: !!c.is_active })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditing(null)
  }

  const handleLogoUpload = async (file) => {
    if (!file) return
    try {
      setUploadingLogo(true)
      const fd = new FormData()
      fd.append('logo', file)
      const res = await adminAPI.uploadClientLogo(fd)
      const url = res.data?.url || res.data?.path || ''
      setEditing(prev => ({ ...prev, logo_path: url }))
      flash('success', 'Partner logo uploaded successfully!')
    } catch {
      flash('error', 'Logo upload failed. Please verify file format.')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSaveClient = async (e) => {
    e?.preventDefault()
    if (!editingClient?.client_name?.trim()) return flash('error', 'Client name is required')
    if (!editingClient?.logo_path?.trim()) return flash('error', 'Logo path or uploaded image is required')

    try {
      setSaving(true)
      const payload = {
        client_name: editingClient.client_name.trim(),
        logo_path: editingClient.logo_path.trim(),
        website_url: editingClient.website_url?.trim() || null,
        display_order: Number(editingClient.display_order) || 0,
        is_active: editingClient.is_active ? 1 : 0,
      }

      if (editingClient.id) {
        await adminAPI.updateClient(editingClient.id, payload)
        flash('success', `Client "${payload.client_name}" updated!`)
      } else {
        await adminAPI.createClient(payload)
        flash('success', `Client "${payload.client_name}" added to showcase!`)
      }
      closeModal()
      loadAll()
    } catch {
      flash('error', 'Failed to save client details')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleActive = async (client) => {
    try {
      const nextStatus = client.is_active ? 0 : 1
      await adminAPI.updateClient(client.id, { ...client, is_active: nextStatus })
      setClients(prev => prev.map(c => c.id === client.id ? { ...c, is_active: !c.is_active } : c))
      flash('success', `Client "${client.client_name}" ${nextStatus ? 'activated' : 'deactivated'}`)
    } catch {
      flash('error', 'Failed to toggle client visibility status')
    }
  }

  const executeDelete = async () => {
    if (!deleteConfirm.id) return
    try {
      await adminAPI.deleteClient(deleteConfirm.id)
      flash('success', `Client "${deleteConfirm.name}" removed`)
      setDeleteConfirm({ open: false, id: null, name: '' })
      loadAll()
    } catch {
      flash('error', 'Failed to delete client')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Enterprise Clients CMS" subtitle="Showcase global brand partnerships and verified client logos" />
        <LoadingSkeleton type="table" rows={6} />
      </div>
    )
  }

  const activeClients = clients.filter(c => !!c.is_active)

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="Enterprise Clients CMS"
        subtitle="Manage brand showcase, section copy, and client logo reel on the live website"
        badge="Showcase Engine"
        actions={[
          {
            label: 'Add Client Logo',
            icon: Plus,
            onClick: openAdd,
            variant: 'primary'
          }
        ]}
      />

      {/* Alert Notification */}
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

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-text-muted">Total Brands</div>
            <div className="text-2xl font-black text-text-primary mt-1">{clients.length}</div>
          </div>
          <div className="w-5 h-5 rounded-xl bg-primary/30 dark:bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-text-muted">Active in Marquee</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{activeClients.length}</div>
          </div>
          <div className="w-5 h-5 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-text-muted">Section State</div>
            <div className="text-base font-bold mt-1.5">
              {sectionSettings.is_visible ? (
                <span className="text-emerald-400">Live on Site</span>
              ) : (
                <span className="text-text-muted">Hidden</span>
              )}
            </div>
          </div>
          <div className="w-5 h-5 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="admin-card p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-text-muted">Reel Speed</div>
            <div className="text-sm font-mono font-bold text-text-primary mt-1.5">Continuous 20s</div>
          </div>
          <div className="w-5 h-5 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Section Settings Card */}
      <div className="admin-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
          <div>
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Homepage Clients Section Parameters
            </h2>
            <p className="text-sm text-text-muted mt-0.5">Customize the heading, gradient accents, and subtext displayed above the marquee</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-text-secondary select-none">
              <input
                type="checkbox"
                checked={sectionSettings.is_visible}
                onChange={(e) => setSettings(s => ({ ...s, is_visible: e.target.checked }))}
                className="w-4 h-4 rounded text-primary"
              />
              <span>Display Section on Homepage</span>
            </label>
            <button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="admin-btn-primary text-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {savingSettings ? 'Deploying...' : 'Save Parameters'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Eyebrow Badge Text
            </label>
            <input
              type="text"
              value={sectionSettings.eyebrow || ''}
              onChange={(e) => setSettings(s => ({ ...s, eyebrow: e.target.value }))}
              placeholder="GLOBAL PARTNERSHIPS"
              className="admin-input font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Title (White Part)
            </label>
            <input
              type="text"
              value={sectionSettings.title_white || ''}
              onChange={(e) => setSettings(s => ({ ...s, title_white: e.target.value }))}
              placeholder="TRUSTED BY"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Title (Gradient Highlight)
            </label>
            <input
              type="text"
              value={sectionSettings.title_gradient || ''}
              onChange={(e) => setSettings(s => ({ ...s, title_gradient: e.target.value }))}
              placeholder="LEADING B2B BRANDS"
              className="admin-input"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
              Supporting Subtitle Text
            </label>
            <textarea
              value={sectionSettings.subtitle || ''}
              onChange={(e) => setSettings(s => ({ ...s, subtitle: e.target.value }))}
              rows={2}
              className="admin-textarea text-sm"
              placeholder="Building demand with the technology ecosystem trusted by modern enterprises."
            />
          </div>
        </div>
      </div>

      {/* Clients Roster Table */}
      <div className="admin-card overflow-hidden">
        <div className="p-5 border-b border-[var(--admin-border)] flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Client Brand Roster ({clients.length})
          </h3>
          <button onClick={openAdd} className="admin-btn-primary text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Partner Logo
          </button>
        </div>

        {clients.length === 0 ? (
          <EmptyState
            title="No Client Logos Configured"
            description="Add enterprise logos to start showing trusted brand proof on the website."
            actionLabel="Add Client Logo"
            onAction={openAdd}
          />
        ) : (
          <div className="overflow-visible">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Brand Asset</th>
                  <th>Client / Enterprise</th>
                  <th>Website Link</th>
                  <th>Sort Order</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="w-20 h-10 rounded-lg bg-background dark:bg-[#07090E] border border-[var(--admin-border)] flex items-center justify-center p-2 overflow-hidden">
                        {imgSrc(client.logo_path) ? (
                          <img
                            src={imgSrc(client.logo_path)}
                            alt={client.client_name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-text-muted opacity-40" />
                        )}
                      </div>
                    </td>
                    <td className="font-semibold text-text-primary text-base">
                      {client.client_name}
                    </td>
                    <td>
                      {client.website_url ? (
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <span>{client.website_url.replace(/^https?:\/\//, '')}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-text-muted text-sm">—</span>
                      )}
                    </td>
                    <td className="font-mono text-sm text-text-secondary">
                      #{client.display_order}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleActive(client)}
                        className="cursor-pointer"
                        title="Click to toggle active state"
                      >
                        <StatusBadge status={client.is_active ? 'active' : 'inactive'} />
                      </button>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(client)}
                          className="admin-btn-icon"
                          title="Edit Client"
                        >
                          <Edit2 className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ open: true, id: client.id, name: client.client_name })}
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

      {/* Live Homepage Marquee Simulation */}
      {activeClients.length > 0 && (
        <div className="admin-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Live Client Strip Preview
            </span>
            <span className="text-sm text-text-muted font-mono">{activeClients.length} logos in active stream</span>
          </div>

          <div className="p-6 rounded-2xl bg-background dark:bg-[#07090E] border border-[var(--admin-border)] overflow-hidden">
            <div className="text-center mb-6">
              {sectionSettings.eyebrow && (
                <div className="text-[12px] font-mono font-bold tracking-widest text-primary uppercase mb-1">
                  {sectionSettings.eyebrow}
                </div>
              )}
              <h4 className="text-lg font-black text-text-primary dark:text-white">
                <span>{sectionSettings.title_white} </span>
                <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
                  {sectionSettings.title_gradient}
                </span>
              </h4>
            </div>

            <div className="flex gap-6 items-center justify-center flex-wrap">
              {activeClients.map((c) => (
                <div
                  key={c.id}
                  className="w-28 h-14 rounded-xl bg-surface/80 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center p-2.5 transition-transform hover:scale-105"
                  title={c.client_name}
                >
                  {imgSrc(c.logo_path) ? (
                    <img
                      src={imgSrc(c.logo_path)}
                      alt={c.client_name}
                      className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-sm text-text-muted font-semibold">{c.client_name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Client Modal */}
      {showModal && editingClient && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-content max-w-lg">
            <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  {editingClient.id ? 'Edit Client Record' : 'Register New Partner'}
                </h3>
                <p className="text-sm text-text-muted mt-0.5">Configure client brand identity and external URL</p>
              </div>
              <button onClick={closeModal} className="admin-btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="p-6 space-y-4">
              {/* Logo file upload / path */}
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Client Logo Asset *
                </label>
                <div className="flex gap-3 items-center">
                  <div className="w-20 h-14 rounded-xl bg-background dark:bg-[#07090E] border border-[var(--admin-border)] flex items-center justify-center p-2 shrink-0 overflow-hidden">
                    {editingClient.logo_path && imgSrc(editingClient.logo_path) ? (
                      <img
                        src={imgSrc(editingClient.logo_path)}
                        alt="preview"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-text-muted opacity-40" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingLogo}
                      className="admin-btn-secondary w-full text-sm flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-primary" />
                      {uploadingLogo ? 'Uploading Asset...' : 'Upload Image File'}
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    value={editingClient.logo_path || ''}
                    onChange={(e) => setEditing(prev => ({ ...prev, logo_path: e.target.value }))}
                    placeholder="/mitel.png or https://example.com/logo.svg"
                    className="admin-input text-sm font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Client / Enterprise Name *
                </label>
                <input
                  type="text"
                  value={editingClient.client_name || ''}
                  onChange={(e) => setEditing(p => ({ ...p, client_name: e.target.value }))}
                  placeholder="e.g. Mitel Networks"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                  Official Website URL (Optional)
                </label>
                <input
                  type="url"
                  value={editingClient.website_url || ''}
                  onChange={(e) => setEditing(p => ({ ...p, website_url: e.target.value }))}
                  placeholder="https://mitel.com"
                  className="admin-input font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-text-muted mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingClient.display_order}
                    onChange={(e) => setEditing(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                    className="admin-input font-mono"
                    min={0}
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-text-secondary select-none">
                    <input
                      type="checkbox"
                      checked={editingClient.is_active}
                      onChange={(e) => setEditing(p => ({ ...p, is_active: e.target.checked }))}
                      className="w-4 h-4 rounded text-primary"
                    />
                    <span>Active in Marquee</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={closeModal}
                  className="admin-btn-secondary"
                  disabled={saving || uploadingLogo}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingLogo}
                  className="admin-btn-primary flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        title="Remove Enterprise Client"
        message={`Are you sure you want to delete "${deleteConfirm.name}"? This brand logo will immediately be removed from the public website marquee.`}
        confirmLabel="Delete Client"
        variant="danger"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ open: false, id: null, name: '' })}
      />
    </div>
  )
}

export default CMSOurClients
