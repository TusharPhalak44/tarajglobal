import React, { useEffect, useState, useRef } from 'react'
import {
  Plus, Edit, Trash2, Save, X, Eye, EyeOff, Upload,
  CheckCircle, XCircle, Settings, ImageIcon, ExternalLink, RefreshCw
} from 'lucide-react'
import { adminAPI } from '@api'

/* ─── helpers ─── */
const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || ''

const imgSrc = (path) => {
  if (!path) return null
  if (path.startsWith('http') || path.startsWith('//')) return path
  if (path.startsWith('/uploads/')) return `${BASE_URL}${path}`
  return path  // public folder (e.g. /mitel.png)
}

const EMPTY_CLIENT = { client_name: '', logo_path: '', website_url: '', display_order: 0, is_active: true }
const EMPTY_SETTINGS = {
  eyebrow: 'GLOBAL PARTNERSHIPS',
  title_white: 'TRUSTED BY',
  title_gradient: 'LEADING B2B BRANDS',
  subtitle: 'Building demand with the technology ecosystem trusted by modern enterprises.',
  is_visible: true,
}

/* ─── Main Component ─── */
const CMSOurClients = () => {
  const [loading, setLoading]               = useState(true)
  const [clients, setClients]               = useState([])
  const [sectionSettings, setSettings]      = useState(EMPTY_SETTINGS)
  const [editingClient, setEditing]         = useState(null)
  const [showModal, setShowModal]           = useState(false)
  const [saving, setSaving]                 = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)
  const [uploadingLogo, setUploadingLogo]   = useState(false)
  const [message, setMessage]               = useState({ type: '', text: '' })
  const fileRef = useRef(null)

  useEffect(() => { loadAll() }, [])

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
      flash('error', 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const flash = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3500)
  }

  /* ── Section Settings ── */
  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true)
      await adminAPI.updateClientSectionSettings(sectionSettings)
      flash('success', 'Section settings saved!')
    } catch {
      flash('error', 'Failed to save settings')
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

  const closeModal = () => { setShowModal(false); setEditing(null) }

  const handleLogoUpload = async (file) => {
    if (!file) return
    try {
      setUploadingLogo(true)
      const fd = new FormData()
      fd.append('logo', file)
      const res = await adminAPI.uploadClientLogo(fd)
      const url = res.data?.url || res.data?.path || ''
      setEditing(prev => ({ ...prev, logo_path: url }))
      flash('success', 'Logo uploaded!')
    } catch {
      flash('error', 'Logo upload failed')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleSaveClient = async () => {
    if (!editingClient?.client_name?.trim()) return flash('error', 'Client name is required')
    if (!editingClient?.logo_path?.trim()) return flash('error', 'Logo path / upload is required')
    try {
      setSaving(true)
      const payload = {
        client_name: editingClient.client_name,
        logo_path: editingClient.logo_path,
        website_url: editingClient.website_url || null,
        display_order: editingClient.display_order || 0,
        is_active: editingClient.is_active ? 1 : 0,
      }
      if (editingClient.id) {
        await adminAPI.updateClient(editingClient.id, payload)
        flash('success', 'Client updated!')
      } else {
        await adminAPI.createClient(payload)
        flash('success', 'Client added!')
      }
      closeModal()
      loadAll()
    } catch {
      flash('error', 'Failed to save client')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleActive = async (client) => {
    try {
      await adminAPI.updateClient(client.id, { ...client, is_active: client.is_active ? 0 : 1 })
      setClients(prev => prev.map(c => c.id === client.id ? { ...c, is_active: !c.is_active } : c))
    } catch {
      flash('error', 'Failed to toggle status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client? This cannot be undone.')) return
    try {
      await adminAPI.deleteClient(id)
      flash('success', 'Client deleted')
      loadAll()
    } catch {
      flash('error', 'Failed to delete client')
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 280, gap: 12 }}>
        <RefreshCw style={{ width: 20, height: 20, animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
        <span style={{ color: 'var(--color-text-secondary)' }}>Loading clients…</span>
      </div>
    )
  }

  const activeClients = clients.filter(c => !!c.is_active)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Flash Message */}
      {message.text && (
        <div style={{
          padding: '14px 18px', borderRadius: 10, fontWeight: 500, fontSize: 14,
          background: message.type === 'success' ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)',
          color: message.type === 'success' ? '#4ade80' : '#f87171',
          border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}`,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {message.text}
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            Our Clients — CMS
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 4, fontSize: 14 }}>
            Manage section content and client logos shown on the homepage
          </p>
        </div>
        <button onClick={openAdd} style={btnPrimary}>
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Section Settings Card */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Settings size={18} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-text-primary)' }}>Section Settings</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Controls text shown above the logo strip</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <Field label="Eyebrow Badge Text">
            <input style={inp} value={sectionSettings.eyebrow}
              onChange={e => setSettings(s => ({ ...s, eyebrow: e.target.value }))}
              placeholder="e.g. GLOBAL PARTNERSHIPS" />
          </Field>
          <Field label="Title — White Part">
            <input style={inp} value={sectionSettings.title_white}
              onChange={e => setSettings(s => ({ ...s, title_white: e.target.value }))}
              placeholder="e.g. TRUSTED BY" />
          </Field>
          <Field label="Title — Gradient Part">
            <input style={inp} value={sectionSettings.title_gradient}
              onChange={e => setSettings(s => ({ ...s, title_gradient: e.target.value }))}
              placeholder="e.g. LEADING B2B BRANDS" />
          </Field>
          <Field label="Subtitle / Supporting Text">
            <textarea style={{ ...inp, resize: 'vertical', minHeight: 68 }} value={sectionSettings.subtitle}
              onChange={e => setSettings(s => ({ ...s, subtitle: e.target.value }))} rows={2} />
          </Field>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, flexWrap: 'wrap', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{
              position: 'relative', width: 44, height: 24, borderRadius: 12,
              background: sectionSettings.is_visible ? 'var(--color-primary)' : 'var(--color-border)',
              transition: 'background .25s', cursor: 'pointer'
            }} onClick={() => setSettings(s => ({ ...s, is_visible: !s.is_visible }))}>
              <div style={{
                position: 'absolute', top: 3, left: sectionSettings.is_visible ? 22 : 3,
                width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left .25s'
              }} />
            </div>
            <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              {sectionSettings.is_visible
                ? <><Eye size={14} style={{ display: 'inline', marginRight: 4 }} />Section Visible on Homepage</>
                : <><EyeOff size={14} style={{ display: 'inline', marginRight: 4 }} />Section Hidden from Homepage</>
              }
            </span>
          </label>

          <button onClick={handleSaveSettings} disabled={savingSettings} style={btnPrimary}>
            <Save size={15} />
            {savingSettings ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Client Logos
            <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 400, color: 'var(--color-text-muted)', background: 'rgba(255,255,255,.06)', padding: '2px 8px', borderRadius: 20 }}>
              {clients.length} total · {activeClients.length} active
            </span>
          </span>
          <button onClick={openAdd} style={{ ...btnOutline, fontSize: 13, padding: '7px 14px' }}>
            <Plus size={14} /> Add Logo
          </button>
        </div>

        {clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '52px 0', color: 'var(--color-text-muted)' }}>
            <ImageIcon size={40} style={{ margin: '0 auto 12px', opacity: .4 }} />
            <p>No clients yet. Click "Add Logo" to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Logo', 'Client Name', 'Website', 'Order', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: h === 'Actions' ? 'right' : 'left', fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: .5, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ width: 80, height: 44, borderRadius: 8, background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        {imgSrc(client.logo_path)
                          ? <img src={imgSrc(client.logo_path)} alt={client.client_name}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: 4 }}
                              onError={e => { e.target.style.display = 'none' }} />
                          : <ImageIcon size={20} style={{ color: 'var(--color-text-muted)' }} />
                        }
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--color-text-primary)', fontSize: 14 }}>
                      {client.client_name}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      {client.website_url
                        ? <a href={client.website_url} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontSize: 13 }}>
                            <ExternalLink size={13} /> Visit
                          </a>
                        : <span style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>—</span>
                      }
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary)', fontSize: 13 }}>
                      {client.display_order}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <button onClick={() => handleToggleActive(client)} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500,
                        background: client.is_active ? 'rgba(34,197,94,.15)' : 'rgba(107,114,128,.15)',
                        color: client.is_active ? '#4ade80' : '#9ca3af',
                      }}>
                        {client.is_active ? <><CheckCircle size={11} />Active</> : <><XCircle size={11} />Inactive</>}
                      </button>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                        <button onClick={() => openEdit(client)} style={iconBtn} title="Edit"><Edit size={15} /></button>
                        <button onClick={() => handleDelete(client.id)} style={{ ...iconBtn, color: '#f87171' }} title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Live Preview Marquee */}
      {activeClients.length > 0 && (
        <div style={card}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>Live Homepage Preview</span>
            <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--color-text-muted)' }}>Showing {activeClients.length} active logos</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 20, padding: '20px 0 16px', borderRadius: 10, background: 'rgba(0,0,0,.25)' }}>
            {sectionSettings.eyebrow && (
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--color-primary)', marginBottom: 8, textTransform: 'uppercase' }}>
                {sectionSettings.eyebrow}
              </div>
            )}
            <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>
              <span style={{ color: '#fff' }}>{sectionSettings.title_white} </span>
              <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {sectionSettings.title_gradient}
              </span>
            </div>
            {sectionSettings.subtitle && (
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8, maxWidth: 420, marginInline: 'auto' }}>
                {sectionSettings.subtitle}
              </p>
            )}
          </div>

          <div style={{ overflow: 'hidden', borderRadius: 8 }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', animation: 'marqueeScroll 20s linear infinite', width: 'max-content' }}>
              {[...activeClients, ...activeClients].map((c, i) => (
                <div key={`${c.id}-${i}`} style={{ width: 110, height: 56, borderRadius: 10, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, flexShrink: 0 }}>
                  {imgSrc(c.logo_path)
                    ? <img src={imgSrc(c.logo_path)} alt={c.client_name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: .7 }}
                        onError={e => { e.target.style.display = 'none' }} />
                    : <span style={{ fontSize: 11, color: 'var(--color-text-muted)', textAlign: 'center' }}>{c.client_name}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && editingClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                {editingClient.id ? 'Edit Client' : 'Add Client'}
              </h2>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Logo upload */}
              <div>
                <label style={lbl}>Logo Image</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 100, height: 60, borderRadius: 10, background: 'rgba(255,255,255,.07)', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {editingClient.logo_path && imgSrc(editingClient.logo_path)
                      ? <img src={imgSrc(editingClient.logo_path)} alt="preview"
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: 4 }}
                          onError={e => { e.target.style.display = 'none' }} />
                      : <ImageIcon size={24} style={{ color: 'var(--color-text-muted)', opacity: .5 }} />
                    }
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button onClick={() => fileRef.current?.click()} disabled={uploadingLogo}
                      style={{ ...btnOutline, justifyContent: 'center', width: '100%', padding: '8px 0' }}>
                      <Upload size={14} /> {uploadingLogo ? 'Uploading…' : 'Upload Image'}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={e => handleLogoUpload(e.target.files?.[0])} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                      <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>or paste path</span>
                      <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
                    </div>

                    <input style={inp} value={editingClient.logo_path}
                      onChange={e => setEditing(prev => ({ ...prev, logo_path: e.target.value }))}
                      placeholder="/logo.png or https://..." />
                  </div>
                </div>
              </div>

              <Field label="Client Name *">
                <input style={inp} value={editingClient.client_name}
                  onChange={e => setEditing(p => ({ ...p, client_name: e.target.value }))}
                  placeholder="e.g. Microsoft" disabled={saving} />
              </Field>

              <Field label="Website URL (optional)">
                <input style={inp} value={editingClient.website_url || ''}
                  onChange={e => setEditing(p => ({ ...p, website_url: e.target.value }))}
                  placeholder="https://example.com" disabled={saving} />
              </Field>

              <Field label="Display Order">
                <input type="number" style={{ ...inp, width: 120 }} value={editingClient.display_order}
                  onChange={e => setEditing(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                  min={0} disabled={saving} />
              </Field>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: editingClient.is_active ? 'var(--color-primary)' : 'var(--color-border)', transition: 'background .2s', cursor: 'pointer', flexShrink: 0 }}
                  onClick={() => setEditing(p => ({ ...p, is_active: !p.is_active }))}>
                  <div style={{ position: 'absolute', top: 2, left: editingClient.is_active ? 19 : 2, width: 18, height: 18, borderRadius: 9, background: '#fff', transition: 'left .2s' }} />
                </div>
                <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  {editingClient.is_active ? 'Active (shown on homepage)' : 'Inactive (hidden)'}
                </span>
              </label>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 8 }}>
                <button onClick={closeModal} disabled={saving} style={btnOutline}>Cancel</button>
                <button onClick={handleSaveClient} disabled={saving || uploadingLogo} style={btnPrimary}>
                  <Save size={15} /> {saving ? 'Saving…' : 'Save Client'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const Field = ({ label, children }) => (
  <div>
    <label style={lbl}>{label}</label>
    {children}
  </div>
)

const card = { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 14, padding: '22px 24px' }
const inp = { width: '100%', padding: '9px 13px', borderRadius: 8, background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 6, letterSpacing: .3 }
const btnPrimary = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }
const btnOutline = { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: 8, fontWeight: 500, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }
const iconBtn = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 7, border: '1px solid var(--color-border)', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer' }

export default CMSOurClients
