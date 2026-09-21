import React, { useEffect, useState } from 'react'
import { 
  ArrowLeft, 
  Save, 
  X, 
  Clock,
  FileText,
  TrendingUp
} from 'lucide-react'
import { adminAPI } from '@api'
import { useNavigate, useParams } from 'react-router-dom'
import FeaturedMedia from '@components/Admin/FeaturedMedia'
import { analyzeSEO, getSEOStatusColor, getSEOStatusBg } from '@utils/seoAnalyzer'

const EditBlog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [seoAnalysis, setSeoAnalysis] = useState(null)
  const [showSeoPanel, setShowSeoPanel] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category_id: '',
    author_id: '',
    featured_image: ''
  })
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetchBlog()
    fetchCategories()
    fetchAuthors()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getBlogById(id)
      const blogData = response.data.data || response.data
      const initialForm = {
        title: blogData.title || '',
        slug: blogData.slug || '',
        content: blogData.content || '',
        excerpt: blogData.excerpt || '',
        status: blogData.status || 'draft',
        category_id: blogData.category_id || '',
        author_id: blogData.author_id || '',
        featured_image: blogData.featured_image || blogData.image || ''
      }
      setEditForm(initialForm)

      // Calculate initial live SEO analysis immediately
      const initialAnalysis = analyzeSEO(initialForm)
      setSeoAnalysis(initialAnalysis)
    } catch (error) {
      console.error('Failed to fetch blog:', error)
      setError('Failed to load blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

  const handleUpdateBlog = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!editForm.title.trim()) {
      setError('Title is required')
      return
    }
    if (!editForm.content.trim()) {
      setError('Content is required')
      return
    }

    try {
      setSaving(true)

      // Always calculate the latest SEO score right before saving
      const latestSeo = analyzeSEO({
        title: editForm.title,
        slug: editForm.slug,
        content: editForm.content,
        excerpt: editForm.excerpt || editForm.content.substring(0, 150),
        featured_image: editForm.featured_image
      })
      setSeoAnalysis(latestSeo)

      const blogData = {
        title: editForm.title,
        slug: editForm.slug,
        content: editForm.content,
        excerpt: editForm.excerpt || editForm.content.substring(0, 150),
        category_id: editForm.category_id ? parseInt(editForm.category_id) : null,
        author_id: editForm.author_id ? parseInt(editForm.author_id) : null,
        status: editForm.status,
        featured_image: editForm.featured_image || null,
        image: editForm.featured_image || null,
        seo_score: latestSeo.score,
        seo_analysis: latestSeo
      }

      console.log('Updating blog with ID:', id, 'Payload:', blogData)
      const response = await adminAPI.updateBlog(id, blogData)
      console.log('Update response:', response)
      
      if (editForm.status === 'published') {
        alert('Blog updated and published successfully! It is now live on the public blog section (/blog).')
      } else {
        alert(`Blog updated successfully (saved as ${editForm.status}). Set status to "Published" to show on the public blog.`)
      }

      navigate('/admin/blogs')
    } catch (error) {
      console.error('Blog update error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update blog'
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handleCheckSEO = () => {
    const analysis = analyzeSEO({
      title: editForm.title,
      slug: editForm.slug,
      content: editForm.content,
      excerpt: editForm.excerpt,
      featured_image: editForm.featured_image
    })
    setSeoAnalysis(analysis)
    setShowSeoPanel(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => {
      const updated = { ...prev, [name]: value }
      const newSeo = analyzeSEO({
        title: updated.title,
        slug: updated.slug,
        content: updated.content,
        excerpt: updated.excerpt,
        featured_image: updated.featured_image
      })
      setSeoAnalysis(newSeo)
      return updated
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-text-muted">Loading blog...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Edit Blog</h1>
              {seoAnalysis && (
                <button
                  type="button"
                  onClick={() => setShowSeoPanel(!showSeoPanel)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${getSEOStatusBg(seoAnalysis.status)} ${getSEOStatusColor(seoAnalysis.status)} hover:scale-105 shadow-xs`}
                  title="Click to view detailed SEO breakdown"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>SEO Score: {seoAnalysis.score}/100 ({seoAnalysis.status})</span>
                </button>
              )}
            </div>
            <p className="text-text-secondary text-xs sm:text-sm mt-0.5">
              Update your content and publication status for the public blog section
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <form onSubmit={handleUpdateBlog} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={editForm.title}
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
              value={editForm.slug}
              onChange={handleInputChange}
              placeholder="blog-post-slug (auto-generated if empty)"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary font-mono text-sm"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Content *</label>
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleInputChange}
              placeholder="Write your blog content..."
              rows={12}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Excerpt / Meta Description</label>
            <textarea
              name="excerpt"
              value={editForm.excerpt}
              onChange={handleInputChange}
              placeholder="Short description for blog preview & Google search results (120-160 characters recommended)"
              rows={3}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary resize-none"
              disabled={saving}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
              <select
                name="category_id"
                value={editForm.category_id}
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
                value={editForm.author_id}
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Status *
                <span className="ml-2 text-xs font-normal text-primary">
                  (Must be &quot;Published&quot; to appear on /blog)
                </span>
              </label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary font-medium"
                disabled={saving}
              >
                <option value="published">Published (Live &amp; visible on /blog)</option>
                <option value="draft">Draft (Private draft, hidden from /blog)</option>
                <option value="archived">Archived (Stored in archive section)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Featured Image</label>
              <FeaturedMedia
                value={editForm.featured_image}
                onChange={(value) => {
                  setEditForm(prev => {
                    const updated = { ...prev, featured_image: value }
                    const newSeo = analyzeSEO({
                      title: updated.title,
                      slug: updated.slug,
                      content: updated.content,
                      excerpt: updated.excerpt,
                      featured_image: value
                    })
                    setSeoAnalysis(newSeo)
                    return updated
                  })
                }}
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheckSEO}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-sm font-medium cursor-pointer"
                disabled={saving}
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                {showSeoPanel ? 'Hide SEO Details' : 'View SEO Details'}
              </button>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={() => navigate('/admin/blogs')}
                className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 transition-colors text-sm"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 text-sm font-semibold shadow-md shadow-primary/20 cursor-pointer"
              >
                {saving ? (
                  <><Clock className="w-4 h-4 animate-spin" /> Updating...</>
                ) : (
                  <><Save className="w-4 h-4" /> Update Blog</>
                )}
              </button>
            </div>
          </div>

          {/* SEO Analysis Panel */}
          {showSeoPanel && seoAnalysis && (
            <div className={`mt-4 p-5 rounded-xl border ${getSEOStatusBg(seoAnalysis.status)}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-text-primary">SEO Score Breakdown</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSeoPanel(false)}
                  className="p-1 text-text-muted hover:text-text-primary rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-6 py-3 bg-surface/60 rounded-xl border border-border/50">
                <div className={`text-4xl font-black ${getSEOStatusColor(seoAnalysis.status)}`}>
                  {seoAnalysis.score} / 100
                </div>
                <div className={`text-sm font-bold uppercase tracking-wider mt-1 ${getSEOStatusColor(seoAnalysis.status)}`}>
                  {seoAnalysis.status}
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                {seoAnalysis.checks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-surface/40 border border-border/40 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={check.status === 'success' ? 'text-green-500 font-bold' : check.status === 'warning' ? 'text-amber-500 font-bold' : 'text-red-500 font-bold'}>
                        {check.status === 'success' ? '✓' : check.status === 'warning' ? '⚠' : '✗'}
                      </span>
                      <span className="text-text-primary font-medium">{check.name}</span>
                    </div>
                    <span className="text-xs font-mono text-text-muted">{check.score} pts</span>
                  </div>
                ))}
              </div>

              {seoAnalysis.recommendations && seoAnalysis.recommendations.length > 0 && (
                <div className="border-t border-border/60 pt-4">
                  <h4 className="text-sm font-bold text-text-primary mb-3">SEO Optimization Recommendations:</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    {seoAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="p-3 rounded-lg bg-surface/30 border border-border/30">
                        <p className="font-semibold text-text-primary">{rec.issue}</p>
                        <p className="text-xs text-text-muted mt-1">{rec.how}</p>
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

export default EditBlog
