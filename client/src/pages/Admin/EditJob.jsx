import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Save, 
  X, 
  Clock, 
  Briefcase, 
  Users, 
  MapPin, 
  DollarSign, 
  AlertCircle 
} from 'lucide-react'
import { adminAPI } from '@api'
import PageHeader from '@components/admin/PageHeader'
import { DashboardSkeleton } from '@components/admin/LoadingSkeleton'

const EditJob = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editForm, setEditForm] = useState({
    title: '',
    department: '',
    experience: '',
    description: '',
    requirements: '',
    location: '',
    type: 'Full-Time',
    salary: '',
    status: 'published'
  })

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getJobById(id)
      const jobData = response.data.data || response.data
      setEditForm({
        title: jobData.title || '',
        department: jobData.department || '',
        experience: jobData.experience || '',
        description: jobData.description || '',
        requirements: jobData.requirements || '',
        location: jobData.location || '',
        type: jobData.type || 'Full-Time',
        salary: jobData.salary || '',
        status: jobData.status || 'published'
      })
    } catch (err) {
      console.error('Failed to fetch job:', err)
      setError('Failed to load career requisition.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateJob = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!editForm.title.trim()) {
      setError('Title is required')
      return
    }
    if (!editForm.description.trim()) {
      setError('Description is required')
      return
    }

    try {
      setSaving(true)
      await adminAPI.updateJob(id, editForm)
      alert('Career opportunity updated successfully!')
      navigate('/admin/jobs')
    } catch (err) {
      console.error('Job update error:', err)
      setError(err.response?.data?.message || err.message || 'Failed to update job')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Edit Career Requisition"
        subtitle={`Updating position #${id}: ${editForm.title}`}
        breadcrumbs={[
          { label: 'Jobs', path: '/admin/jobs' },
          { label: `Edit #${id}` }
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Link
              to={`/admin/applications?job_id=${id}&job_title=${encodeURIComponent(editForm.title)}`}
              className="admin-btn admin-btn-secondary"
            >
              <Users className="w-4 h-4 text-[#00A6FF]" />
              <span>View Candidates</span>
            </Link>
            <button
              type="button"
              onClick={handleUpdateJob}
              disabled={saving}
              className="admin-btn admin-btn-primary shadow-lg shadow-[#FF6D00]/25"
            >
              {saving ? <><Clock className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Position</>}
            </button>
          </div>
        }
      />

      {error && (
        <div className="p-4 rounded-xl bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 text-[#F43F5E] text-sm font-semibold flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleUpdateJob} className="space-y-6">
        <div className="admin-card p-6 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--admin-border-subtle)]">
            <div className="w-8 h-8 rounded-lg bg-[var(--admin-accent-soft)] text-[var(--admin-accent)] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--admin-text-primary)]">
                Position Details & Logistics
              </h3>
              <p className="text-sm text-[var(--admin-text-muted)]">Title, department category, location parameters, and requirements.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Position Title <span className="text-[#F43F5E]">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="admin-input font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Department / Category
                </label>
                <input
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleInputChange}
                  placeholder="e.g. SALES & DEMAND GEN"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Kharadi, Pune (On-Site)"
                  className="admin-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Employment Type
                </label>
                <select
                  name="type"
                  value={editForm.type}
                  onChange={handleInputChange}
                  className="admin-select text-sm"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <input
                  type="text"
                  name="experience"
                  value={editForm.experience}
                  onChange={handleInputChange}
                  placeholder="e.g. 1 - 3 Years"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                  Salary / Compensation
                </label>
                <input
                  type="text"
                  name="salary"
                  value={editForm.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. Competitive / $60k - $80k"
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Job Description <span className="text-[#F43F5E]">*</span>
              </label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows={4}
                className="admin-input resize-y text-sm leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Requirements & Qualifications (One per line)
              </label>
              <textarea
                name="requirements"
                value={editForm.requirements}
                onChange={handleInputChange}
                rows={5}
                className="admin-input resize-y text-sm leading-relaxed font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-primary)] uppercase tracking-wider mb-1.5">
                Publication Status
              </label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleInputChange}
                className="admin-select text-sm font-semibold"
              >
                <option value="published">Published (Live on Careers)</option>
                <option value="active">Active (Open to Public)</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived (Closed)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border-subtle)]">
          <button
            type="button"
            onClick={() => navigate('/admin/jobs')}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="admin-btn admin-btn-primary shadow-lg shadow-[#FF6D00]/25"
          >
            {saving ? <><Clock className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Position</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditJob
