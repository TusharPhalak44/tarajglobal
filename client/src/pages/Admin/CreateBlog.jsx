import React, { useEffect, useState } from 'react'
import { ArrowLeft, Save, Clock, FileText, TrendingUp, X } from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate } from 'react-router-dom'
import FeaturedMedia from '@components/Admin/FeaturedMedia'
import { analyzeSEO, getSEOStatusColor, getSEOStatusBg } from '@utils/seoAnalyzer'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [seoAnalysis, setSeoAnalysis] = useState(null)
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  
  const [createForm, setCreateForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    author_id: '',
    status: 'draft',
    featured_image: ''
  })

  useEffect(() => {
    fetchCategories()
    fetchAuthors()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories()
      const categoriesData = response.data?.data || response.data || []
      setCategories(categoriesData)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await adminAPI.getAuthors()
      const authorsData = response.data?.data || response.data || []
      setAuthors(authorsData)
    } catch (error) {
      console.error('Failed to fetch authors:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCreateForm({ ...createForm, [name]: value })
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    setError('')

    if (!createForm.title.trim()) {
      setError('Title is required')
      return
    }
    if (!createForm.content.trim()) {
      setError('Content is required')
      return
    }

    setSaving(true)

    try {
      const blogData = {
        title: createForm.title.trim(),
        slug: createForm.slug?.trim() || undefined,
        content: createForm.content,
        excerpt: createForm.excerpt || createForm.content.substring(0, 150),
        category_id: createForm.category_id ? parseInt(createForm.category_id, 10) : null,
        author_id: createForm.author_id ? parseInt(createForm.author_id, 10) : null,
        status: createForm.status || 'draft',
        featured_image: createForm.featured_image || null,
        seo_score: seoAnalysis?.score || 0,
        seo_analysis: seoAnalysis || null
      }
      const response = await adminAPI.createBlog(blogData)
      alert('Blog created successfully')
      navigate('/admin/blogs')
    } catch (error) {
      console.error('Failed to create blog:', error)
      const msg = error.response?.data?.message || 
                  (error.response?.data?.errors && error.response.data.errors.map(err => err.msg).join(', ')) || 
                  error.message || 
                  'Failed to create blog. Please try again.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleCheckSEO = () => {
    const analysis = analyzeSEO({
      title: createForm.title,
      slug: createForm.slug,
      content: createForm.content,
      excerpt: createForm.excerpt,
      featured_image: createForm.featured_image
    })
    setSeoAnalysis(analysis)
    setShowSeoPanel(true)
  }

  const handleCancel = () => {
    navigate('/admin/blogs')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Create New Blog</h1>
            <p className="text-text-secondary">Create a new blog post</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-surface rounded-xl border border-border p-6">
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg text-error">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={createForm.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              value={createForm.slug}
              onChange={handleInputChange}
              placeholder="blog-post-slug (auto-generated if empty)"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Content *</label>
            <textarea
              name="content"
              value={createForm.content}
              onChange={handleInputChange}
              placeholder="Write your blog content..."
              rows={12}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={createForm.excerpt}
              onChange={handleInputChange}
              placeholder="Short description (optional)"
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
              <select
                name="category_id"
                value={createForm.category_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                disabled={saving}
              >
                <option value="">Select category</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Author</label>
              <select
                name="author_id"
                value={createForm.author_id}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                disabled={saving}
              >
                <option value="">Select author</option>
                {Array.isArray(authors) && authors.map((author) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
            <select
              name="status"
              value={createForm.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              disabled={saving}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <FeaturedMedia
            value={createForm.featured_image}
            onChange={(value) => setCreateForm({ ...createForm, featured_image: value })}
            disabled={saving}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCheckSEO}
              className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors"
              disabled={saving}
            >
              <TrendingUp className="w-4 h-4" />
              Check SEO
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? <><Clock className="w-4 h-4 animate-spin" /> Creating...</> : <><Save className="w-4 h-4" /> Create Blog</>}
            </button>
          </div>

          {/* SEO Analysis Panel */}
          {showSeoPanel && seoAnalysis && (
            <div className={`mt-4 p-4 rounded-lg border ${getSEOStatusBg(seoAnalysis.status)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary">SEO Score</h3>
                <button
                  type="button"
                  onClick={() => setShowSeoPanel(false)}
                  className="text-text-muted hover:text-text-primary"
                >
                  <Clock className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold ${getSEOStatusColor(seoAnalysis.status)}`}>
                  {seoAnalysis.score} / 100
                </div>
                <div className={`text-sm font-medium ${getSEOStatusColor(seoAnalysis.status)}`}>
                  {seoAnalysis.status}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {seoAnalysis.checks.map((check, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className={check.status === 'success' ? 'text-green-500' : check.status === 'warning' ? 'text-yellow-500' : 'text-red-500'}>
                      {check.status === 'success' ? '✓' : check.status === 'warning' ? '⚠' : '✗'}
                    </span>
                    <span className="text-text-primary">{check.name}</span>
                  </div>
                ))}
              </div>

              {seoAnalysis.recommendations.length > 0 && (
                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Recommendations:</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    {seoAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="pl-4 border-l-2 border-border">
                        <p className="font-medium text-text-primary">{rec.issue}</p>
                        <p className="text-xs mt-1">{rec.how}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreateBlog
