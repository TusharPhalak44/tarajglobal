import React, { useEffect, useState } from 'react'
import { 
  ArrowLeft, 
  Save, 
  X, 
  Clock,
  Briefcase
} from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate, useParams } from 'react-router-dom'

const EditJob = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    salary: '',
    status: 'draft'
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
        description: jobData.description || '',
        requirements: jobData.requirements || '',
        location: jobData.location || '',
        type: jobData.type || 'full-time',
        salary: jobData.salary || '',
        status: jobData.status || 'draft'
      })
    } catch (error) {
      console.error('Failed to fetch job:', error)
      setError('Failed to load job. Please try again.')
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
      const jobData = {
        title: editForm.title,
        description: editForm.description,
        requirements: editForm.requirements,
        location: editForm.location,
        type: editForm.type,
        salary: editForm.salary,
        status: editForm.status
      }
      console.log('Updating job with ID:', id)
      console.log('Job data:', jobData)
      const response = await adminAPI.updateJob(id, jobData)
      console.log('Update response:', response)
      alert('Job updated successfully')
      navigate('/admin/jobs')
    } catch (error) {
      console.error('Job update error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update job'
      console.error('Error message:', errorMessage)
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading job...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/jobs')}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Edit Job</h1>
            <p className="text-text-secondary">Update job posting details</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <form onSubmit={handleUpdateJob} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleInputChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Description *</label>
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleInputChange}
              placeholder="Job description and responsibilities..."
              rows={8}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleInputChange}
                placeholder="e.g. Remote, New York"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                disabled={saving}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Employment Type</label>
              <select
                name="type"
                value={editForm.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                disabled={saving}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={editForm.salary}
              onChange={handleInputChange}
              placeholder="e.g. $50,000 - $80,000"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Requirements</label>
            <textarea
              name="requirements"
              value={editForm.requirements}
              onChange={handleInputChange}
              placeholder="Required qualifications and skills..."
              rows={6}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
            <select
              name="status"
              value={editForm.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => navigate('/admin/jobs')}
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
              {saving ? <><Clock className="w-4 h-4 animate-spin" /> Updating...</> : <><Save className="w-4 h-4" /> Update Job</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditJob
