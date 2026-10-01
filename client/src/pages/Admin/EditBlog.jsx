import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  X,
  Clock,
  FileText,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Image,
  Layers,
  Eye
} from 'lucide-react'
import { adminAPI } from '@api'
import FeaturedMedia from '@components/admin/FeaturedMedia'
import { analyzeSEO } from '@utils/seoAnalyzer'
import PageHeader from '@components/admin/PageHeader'
import { DashboardSkeleton } from '@components/admin/LoadingSkeleton'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image'],
    ['clean']
  ],
};

const EditBlog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tagsInput, setTagsInput] = useState('')
  const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
  const [seoAnalysis, setSeoAnalysis] = useState(null)
  const [editForm, setEditForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category_id: '',
    author_id: '',
    featured_image: '',
    tags: [],
    meta_title: '',
    meta_description: '',
    focus_keyword: '',
    publish_date: ''
  })
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    fetchBlog()
    fetchCategories()
    fetchAuthors()
  }, [id])

  // Live SEO scoring
  useEffect(() => {
    if (editForm.title || editForm.content) {
      const analysis = analyzeSEO(editForm)
      setSeoAnalysis(analysis)
    }
  }, [editForm.title, editForm.slug, editForm.content, editForm.excerpt, editForm.featured_image])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getBlogById(id)
      const blogData = response.data.data || response.data
      
        const sDate = blogData.scheduled_at ? new Date(new Date(blogData.scheduled_at).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0] : ''
        const sTime = blogData.scheduled_at ? new Date(new Date(blogData.scheduled_at).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[1].substring(0, 5) : ''
        const initialForm = {
          title: blogData.title || '',
          slug: blogData.slug || '',
          content: blogData.content || '',
          excerpt: blogData.excerpt || '',
          status: blogData.status || 'draft',
          category_id: blogData.category_id || '',
          author_id: blogData.author_id || '',
          featured_image: blogData.featured_image || blogData.image || '',
          tags: blogData.tags || [],
          scheduled_date: sDate,
          scheduled_time: sTime,
          meta_title: blogData.seo_title || '',
          meta_description: blogData.seo_description || '',
          focus_keyword: blogData.seo_keywords || ''
        }

      setEditForm(initialForm)
      setSeoAnalysis(analyzeSEO(initialForm))
    } catch (err) {
      console.error('Failed API:', err)
        if (err.response?.status === 409 || (err.response?.data?.message || '').toLowerCase().includes('duplicate') || (err.response?.data?.message || '').toLowerCase().includes('already exists')) {
          setFieldErrors({ ...fieldErrors, slug: 'This slug already exists. Please choose another.' })
          setError('Slug must be unique.')
        } else if (err.response?.status === 413 || (err.response?.data?.message || '').toLowerCase().includes('too large')) {
           setError('The uploaded image is too large.')
        } else {
          setError(err.response?.data?.message || 'Failed to save blog. Please try again.')
        }
      setError('Failed to load blog data.')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories()
      setCategories(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed API:', err)
        if (err.response?.status === 409 || (err.response?.data?.message || '').toLowerCase().includes('duplicate') || (err.response?.data?.message || '').toLowerCase().includes('already exists')) {
          setFieldErrors({ ...fieldErrors, slug: 'This slug already exists. Please choose another.' })
          setError('Slug must be unique.')
        } else if (err.response?.status === 413 || (err.response?.data?.message || '').toLowerCase().includes('too large')) {
           setError('The uploaded image is too large.')
        } else {
          setError(err.response?.data?.message || 'Failed to save blog. Please try again.')
        }
    }
  }

  const fetchAuthors = async () => {
    try {
      const response = await adminAPI.getAuthors()
      setAuthors(response.data?.data || response.data || [])
    } catch (err) {
      console.error('Failed API:', err)
        if (err.response?.status === 409 || (err.response?.data?.message || '').toLowerCase().includes('duplicate') || (err.response?.data?.message || '').toLowerCase().includes('already exists')) {
          setFieldErrors({ ...fieldErrors, slug: 'This slug already exists. Please choose another.' })
          setError('Slug must be unique.')
        } else if (err.response?.status === 413 || (err.response?.data?.message || '').toLowerCase().includes('too large')) {
           setError('The uploaded image is too large.')
        } else {
          setError(err.response?.data?.message || 'Failed to save blog. Please try again.')
        }
    }
  }

  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      const currentTags = editForm.tags || [];
      if (!currentTags.includes(tagsInput.trim())) {
        setEditForm(prev => ({ ...prev, tags: [...currentTags, tagsInput.trim()] }));
      }
      setTagsInput('');
    }
  }

  const removeTag = (tagToRemove) => {
    setEditForm(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tagToRemove) }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateBlog = async (e, overrideStatus = null) => {
    e.preventDefault()
      setError('')
      const newErrors = {}
      
      if (!editForm.title || !editForm.title.trim()) {
        newErrors.title = 'Title is required.'
      }
      
      if (!editForm.slug || !editForm.slug.trim()) {
        newErrors.slug = 'Slug is required.'
      } else if (!/^[a-z0-9-]+$/.test(editForm.slug)) {
        newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens.'
      }
      
      if (!editForm.content || !editForm.content.trim() || editForm.content === '<p><br></p>') {
        newErrors.content = 'Content is required.'
      }
      
      if (!editForm.category_id) {
        newErrors.category_id = 'Category is required.'
      }
      
      const targetStatus = overrideStatus || editForm.status || 'draft'

      if (targetStatus === 'scheduled') {
        if (!editForm.scheduled_date) newErrors.scheduled_date = 'Date is required.'
        if (!editForm.scheduled_time) newErrors.scheduled_time = 'Time is required.'
        if (editForm.scheduled_date && editForm.scheduled_time) {
          const scheduledAt = new Date(`${editForm.scheduled_date}T${editForm.scheduled_time}`)
          if (scheduledAt <= new Date()) {
            newErrors.scheduled_date = 'Scheduled date must be in the future.'
          }
        }
      }
      
      setFieldErrors(newErrors)
      if (Object.keys(newErrors).length > 0) {
        setError('Please fix the errors in the form.')
        return
      }

    setError('')

    if (!editForm.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!editForm.content || !editForm.content.trim() || editForm.content === '<p><br></p>') {
      setError('Content is required.')
      return
    }

    if (targetStatus === 'scheduled') {
      if (!editForm.scheduled_date || !editForm.scheduled_time) {
        setError('Please select both a date and time for scheduling.')
        return
      }
      const scheduledAt = new Date(`${editForm.scheduled_date}T${editForm.scheduled_time}`)
      if (scheduledAt <= new Date()) {
        setError('Scheduled date must be in the future.')
        return
      }
    }

    setSaving(true)

    try {
      const currentSeo = analyzeSEO(editForm)
      const updateData = {
        title: editForm.title.trim(),
        slug: editForm.slug?.trim() || undefined,
        content: editForm.content,
        excerpt: editForm.excerpt || editForm.content.substring(0, 150),
        category_id: editForm.category_id ? parseInt(editForm.category_id, 10) : null,
        author_id: editForm.author_id ? parseInt(editForm.author_id, 10) : null,
        status: targetStatus,
        scheduled_at: targetStatus === 'scheduled' ? `${editForm.scheduled_date} ${editForm.scheduled_time}:00` : null,
        tags: editForm.tags || [],
        featured_image: editForm.featured_image || null,
        seo_score: currentSeo?.score || 0,
        seo_analysis: currentSeo || null,
        seo_title: editForm.meta_title || null,
        seo_description: editForm.meta_description || null,
        seo_keywords: editForm.focus_keyword || null
      }

      await adminAPI.updateBlog(id, updateData)
      alert('Article updated successfully!')
      navigate('/admin/blogs')
    } catch (err) {
      console.error('Failed API:', err)
        if (err.response?.status === 409 || (err.response?.data?.message || '').toLowerCase().includes('duplicate') || (err.response?.data?.message || '').toLowerCase().includes('already exists')) {
          setFieldErrors({ ...fieldErrors, slug: 'This slug already exists. Please choose another.' })
          setError('Slug must be unique.')
        } else if (err.response?.status === 413 || (err.response?.data?.message || '').toLowerCase().includes('too large')) {
           setError('The uploaded image is too large.')
        } else {
          setError(err.response?.data?.message || 'Failed to save blog. Please try again.')
        }
      const msg = err.response?.data?.message ||
        (err.response?.data?.errors && err.response.data.errors.map(e => e.msg).join(', ')) ||
        err.message ||
        'Failed to update blog. Please try again.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  const seoScore = seoAnalysis?.score || 0

  if (loading) {
    return <DashboardSkeleton />
  }

  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header - Wireframe style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/blogs')} className="p-2 hover:bg-[var(--admin-bg-elevated)] rounded-full text-[var(--admin-text-primary)]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--admin-text-primary)] tracking-tight">Edit Blog Post</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              setEditForm(p => ({ ...p, status: 'draft' }))
              handleUpdateBlog(e, 'draft')
            }}
            className="admin-btn admin-btn-secondary font-semibold"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleUpdateBlog}
            disabled={saving}
            className="admin-btn admin-btn-primary font-semibold px-6"
          >
            {saving ? <><Clock className="w-4 h-4 animate-spin" /> Saving...</> : 'Publish'}
          </button>
        </div>
      </div>

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

      <form onSubmit={handleUpdateBlog} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT MAIN COLUMN */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8 order-1 min-w-0">
          <div className="admin-section space-y-5">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              Basic Information
            </h3>

            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title" value={editForm.title} onChange={handleInputChange} maxLength={200}
                    placeholder="Enter blog post title"
                    className="admin-input w-full shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"
                    required
                  />
                  {fieldErrors.title && <span className="text-red-500 text-[13px] mt-1 block">{fieldErrors.title}</span>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="slug" value={editForm.slug} onChange={handleInputChange} onBlur={(e) => setEditForm(prev => ({...prev, slug: generateSlug(e.target.value)}))} maxLength={200}
                      placeholder="enter-blog-slug"
                      className="admin-input w-full pr-8"
                    />
                    <TrendingUp className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  </div>
                  {fieldErrors.slug && <span className="text-red-500 text-[13px] mt-1 block">{fieldErrors.slug}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Excerpt
                </label>
                <textarea
                  name="excerpt" value={editForm.excerpt} onChange={handleInputChange} rows={2} maxLength={160}
                  placeholder="Write a short description..."
                  className="admin-textarea w-full resize-none"
                />
                <span className="text-[13px] text-[var(--admin-text-muted)] mt-1 block">
                  {editForm.excerpt?.length || 0}/160 characters
                </span>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Content <span className="text-red-500">*</span>
                </label>
                <div className="bg-[var(--admin-bg-canvas)] rounded-lg">
                  <style>{`
                    .ql-container {
                      min-height: 500px;
                      font-size: 16px;
                      border-bottom-left-radius: 0.5rem;
                      border-bottom-right-radius: 0.5rem;
                      font-family: inherit;
                    }
                    .ql-toolbar {
                      border-top-left-radius: 0.5rem;
                      border-top-right-radius: 0.5rem;
                      background-color: var(--admin-bg-elevated, #f8fafc);
                    }
                    .dark .ql-snow .ql-toolbar button, .dark .ql-snow .ql-toolbar .ql-picker-label {
                      color: #cbd5e1;
                    }
                    .dark .ql-snow .ql-stroke { stroke: #cbd5e1; }
                    .dark .ql-snow .ql-fill { fill: #cbd5e1; }
                    .dark .ql-picker-options { background-color: #1e293b; color: #cbd5e1; }
                  `}</style>
                  <ReactQuill 
                    theme="snow"
                    value={editForm.content}
                    onChange={(val) => setEditForm(prev => ({...prev, content: val}))}
                    modules={quillModules}
                    placeholder="Start writing your content here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4 order-2 min-w-0">
          <div className="admin-section space-y-4">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              Post Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Featured Image <span className="text-[12px] text-[var(--admin-text-muted)] font-normal ml-2">(Max 50MB)</span>
                </label>
                <FeaturedMedia 
                  value={editForm.featured_image || editForm.image} 
                  onChange={(url) => setEditForm(prev => ({...prev, featured_image: url, image: url}))} 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Categories <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={editForm.category_id}
                  onChange={handleInputChange}
                  className="admin-select w-full text-sm"
                >
                  <option value="">Select categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                  {fieldErrors.category_id && <span className="text-red-500 text-[13px] mt-1 block">{fieldErrors.category_id}</span>}
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags (press enter)"
                  className="admin-input w-full mb-2 text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  {editForm.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-[var(--admin-bg-elevated)] text-[var(--admin-text-primary)] border border-[var(--admin-border-base)]">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Author
                </label>
                <select
                  name="author_id"
                  value={editForm.author_id}
                  onChange={handleInputChange}
                  className="admin-select w-full text-sm"
                >
                  <option value="">Select Author</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Status
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--admin-text-primary)]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="draft" checked={editForm.status === 'draft'} onChange={handleInputChange} className="accent-blue-600" />
                    <span className="whitespace-nowrap">Draft</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="published" checked={editForm.status === 'published'} onChange={handleInputChange} className="accent-blue-600" />
                    <span className="font-semibold text-blue-600 whitespace-nowrap">Publish Now</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="scheduled" checked={editForm.status === 'scheduled'} onChange={handleInputChange} className="accent-blue-600" />
                    <span className="whitespace-nowrap">Schedule</span>
                  </label>
                </div>
              </div>

              {editForm.status === 'scheduled' && (
              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Publish Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="scheduled_date"
                    value={editForm.scheduled_date || ''}
                    onChange={handleInputChange}
                    className="admin-input w-full text-sm"
                  />
                  {fieldErrors.scheduled_date && <span className="text-red-500 text-[13px] mt-1 block">{fieldErrors.scheduled_date}</span>}
                  <input
                    type="time"
                    name="scheduled_time"
                    value={editForm.scheduled_time || ''}
                    onChange={handleInputChange}
                    className="admin-input w-full text-sm"
                  />
                  {fieldErrors.scheduled_time && <span className="text-red-500 text-[13px] mt-1 block">{fieldErrors.scheduled_time}</span>}
                </div>
              </div>
              )}
            </div>
          </div>

          </div>
        {/* SEO SECTION */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8 order-3 min-w-0">
          <div className="admin-section space-y-4">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={editForm.meta_title}
                  onChange={handleInputChange}
                  placeholder="Enter meta title (max 60 characters)"
                  className="admin-input w-full text-sm"
                />
                <span className="text-[13px] text-[var(--admin-text-muted)] mt-1 block">
                  {editForm.meta_title?.length || 0}/60 characters
                </span>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={editForm.meta_description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter meta description (max 160 characters)"
                  className="admin-textarea w-full resize-none text-sm"
                />
                <span className="text-[13px] text-[var(--admin-text-muted)] mt-1 block">
                  {editForm.meta_description?.length || 0}/160 characters
                </span>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  name="focus_keyword"
                  value={editForm.focus_keyword}
                  onChange={handleInputChange}
                  placeholder="Enter focus keyword"
                  className="admin-input w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--admin-text-primary)] mb-1.5">
                  SEO Preview
                </label>
                <div className="p-4 rounded-xl bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)] space-y-1 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--admin-bg-elevated)] flex items-center justify-center shrink-0">
                      <span className="text-blue-600 text-[12px] font-bold">G</span>
                    </div>
                    <div className="text-[12px] text-[var(--admin-text-secondary)] truncate">
                      https://www.tarajglobal.com › blog › {editForm.slug || 'your-blog-slug'}
                    </div>
                  </div>
                  <div className="text-[var(--admin-primary)] text-base font-semibold truncate hover:underline cursor-pointer">
                    {editForm.meta_title || editForm.title || 'Your Blog Title Will Appear Here'}
                  </div>
                  <div className="text-sm text-[var(--admin-text-secondary)] line-clamp-2">
                    {editForm.meta_description || editForm.excerpt || 'Your meta description will appear here. This is how your blog post will look in search engine results.'}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--admin-border-subtle)]">
                <h4 className="text-sm font-bold text-[var(--admin-text-primary)] mb-3 flex items-center gap-2"><Globe className="w-4 h-4"/> Google Search Preview</h4>
                <div className="p-4 bg-[var(--admin-bg-surface)] border-[var(--admin-border-base)] rounded-lg shadow-sm font-sans">
                  <div className="text-sm mb-1.5 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--admin-bg-elevated)] dark:bg-slate-800 flex items-center justify-center text-[12px] font-bold text-slate-700 dark:text-slate-300">TG</div>
                    <div className="leading-tight">
                      <div className="text-sm text-[var(--admin-text-primary)]">Taraj Global</div>
                      <div className="text-[13px] text-[var(--admin-text-secondary)]">https://tarajglobal.com/blog/{editForm.slug || 'blog-slug'}</div>
                    </div>
                  </div>
                  <div className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-tight line-clamp-1">
                    {editForm.meta_title || editForm.title || 'Blog Title'}
                  </div>
                  <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2">
                    {editForm.meta_description || editForm.excerpt || 'Meta description appears here...'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
  
}

export default EditBlog
