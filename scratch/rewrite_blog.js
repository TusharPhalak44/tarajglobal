const fs = require('fs');

function rewriteBlog(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add tags state
  content = content.replace(
    /featured_image: ''\s*\}\)/,
    "featured_image: '',\n    tags: [],\n    meta_title: '',\n    meta_description: '',\n    focus_keyword: '',\n    publish_date: ''\n  })"
  );
  if (content.includes("featured_image: blog.featured_image || null")) {
    content = content.replace(
      /featured_image: blog\.featured_image \|\| null\s*\n\s*\}\)/,
      "featured_image: blog.featured_image || null,\n    tags: blog.tags || [],\n    meta_title: blog.meta_title || '',\n    meta_description: blog.meta_description || '',\n    focus_keyword: blog.focus_keyword || '',\n    publish_date: blog.publish_date || ''\n  })"
    );
  }

  // Add tagsInput state
  if (!content.includes('const [tagsInput, setTagsInput]')) {
    content = content.replace(
      /const \[showSeoPanel, setShowSeoPanel\] = useState\(true\)/,
      "const [showSeoPanel, setShowSeoPanel] = useState(true)\n  const [tagsInput, setTagsInput] = useState('')"
    );
  }

  // Handle Tags Input logic
  const handleTagAdd = `
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      e.preventDefault();
      if (!createForm.tags) createForm.tags = [];
      if (!createForm.tags.includes(tagsInput.trim())) {
        setCreateForm(prev => ({ ...prev, tags: [...(prev.tags || []), tagsInput.trim()] }));
      }
      setTagsInput('');
    }
  }
  const removeTag = (tagToRemove) => {
    setCreateForm(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tagToRemove) }));
  }
  `;
  if (!content.includes('handleTagKeyDown')) {
    content = content.replace(
      /const generateSlug = \(text\) => \{/,
      handleTagAdd + "\n  const generateSlug = (text) => {"
    );
  }

  // Replace the entire return statement
  const newReturn = `
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header - Wireframe style */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/blogs')} className="p-2 hover:bg-[var(--admin-bg-elevated)] rounded-full text-[var(--admin-text-primary)]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--admin-text-primary)] tracking-tight">Create New Blog Post</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCreateForm(p => ({...p, status: 'draft'}))}
            className="admin-btn admin-btn-secondary bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm font-semibold"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={filePath.includes('Edit') ? handleUpdateBlog : handleCreateBlog}
            disabled={saving}
            className="admin-btn admin-btn-primary shadow-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
          >
            {saving ? <><Clock className="w-4 h-4 animate-spin" /> Saving...</> : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[var(--admin-danger-soft)] border border-[#F43F5E]/30 text-[#F43F5E] text-xs font-semibold flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={filePath.includes('Edit') ? handleUpdateBlog : handleCreateBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-card p-6 space-y-5">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              Basic Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={createForm.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    className="admin-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="slug"
                      value={createForm.slug}
                      onChange={handleInputChange}
                      placeholder="enter-blog-slug"
                      className="admin-input bg-slate-50 dark:bg-slate-900/50 pr-8"
                    />
                    <TrendingUp className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={createForm.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Write a short description..."
                  className="admin-input resize-none"
                />
                <span className="text-[11px] text-[var(--admin-text-muted)] mt-1 block">
                  {createForm.excerpt?.length || 0}/160 characters
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Content <span className="text-red-500">*</span>
                </label>
                {/* Fake rich text toolbar */}
                <div className="border border-[var(--admin-border-subtle)] border-b-0 rounded-t-lg bg-[var(--admin-bg-elevated)] p-2 flex items-center gap-2 overflow-x-auto">
                  <select className="text-xs bg-transparent border-none outline-none text-[var(--admin-text-primary)] font-medium pr-4">
                    <option>Paragraph</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                  <div className="w-px h-4 bg-[var(--admin-border-base)] mx-1" />
                  <button type="button" className="p-1 hover:bg-[var(--admin-bg-card)] rounded text-[var(--admin-text-secondary)] font-serif font-bold">B</button>
                  <button type="button" className="p-1 hover:bg-[var(--admin-bg-card)] rounded text-[var(--admin-text-secondary)] font-serif italic">I</button>
                  <button type="button" className="p-1 hover:bg-[var(--admin-bg-card)] rounded text-[var(--admin-text-secondary)] underline">U</button>
                  <div className="w-px h-4 bg-[var(--admin-border-base)] mx-1" />
                  <button type="button" className="p-1 hover:bg-[var(--admin-bg-card)] rounded text-[var(--admin-text-secondary)]">
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-[var(--admin-bg-card)] rounded text-[var(--admin-text-secondary)]">
                    <Image className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex-1" />
                  <button type="button" className="text-[10px] font-semibold flex items-center gap-1 text-pink-500 bg-pink-50 dark:bg-pink-500/10 px-2 py-1 rounded border border-pink-200 dark:border-pink-500/20">
                    <Sparkles className="w-3 h-3" /> Write with AI
                  </button>
                </div>
                <textarea
                  name="content"
                  value={createForm.content}
                  onChange={handleInputChange}
                  rows={15}
                  placeholder="Start writing your content here..."
                  className="admin-input resize-y rounded-t-none font-sans"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div className="space-y-6">
          <div className="admin-card p-6 space-y-4">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              Post Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-[var(--admin-border-subtle)] rounded-xl p-4 text-center hover:border-[var(--admin-primary)] transition-colors cursor-pointer bg-[var(--admin-bg-elevated)] group">
                  <div className="w-10 h-10 rounded-full bg-[var(--admin-bg-card)] mx-auto mb-2 flex items-center justify-center text-[var(--admin-text-muted)] group-hover:text-[var(--admin-primary)] shadow-sm">
                    <Image className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-[var(--admin-text-primary)] mb-1">Upload featured image</div>
                  <div className="text-[10px] text-[var(--admin-text-muted)]">(Recommended size: 1200 x 630 px)<br/>Max 2MB</div>
                </div>
                <div className="mt-2 text-right">
                  <button type="button" className="text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <Image className="w-3 h-3 inline-block mr-1" /> Change Image
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Categories <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={createForm.category_id}
                  onChange={handleInputChange}
                  className="admin-select text-xs"
                >
                  <option value="">Select categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags (press enter)"
                  className="admin-input mb-2 text-xs"
                />
                <div className="flex flex-wrap gap-2">
                  {createForm.tags?.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Author
                </label>
                <select
                  name="author_id"
                  value={createForm.author_id}
                  onChange={handleInputChange}
                  className="admin-select text-xs"
                >
                  <option value="">Select Author</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Status
                </label>
                <div className="flex items-center gap-4 text-xs text-[var(--admin-text-primary)]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="status" value="draft" checked={createForm.status === 'draft'} onChange={handleInputChange} className="accent-blue-600" />
                    Draft
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="status" value="published" checked={createForm.status === 'published'} onChange={handleInputChange} className="accent-blue-600" />
                    <span className="font-semibold text-blue-600">Publish Now</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="status" value="scheduled" checked={createForm.status === 'scheduled'} onChange={handleInputChange} className="accent-blue-600" />
                    Schedule
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Publish Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="publish_date"
                    value={createForm.publish_date ? createForm.publish_date.split('T')[0] : ''}
                    onChange={(e) => setCreateForm(p => ({...p, publish_date: e.target.value + 'T00:00'}))}
                    className="admin-input text-xs"
                  />
                  <input
                    type="time"
                    className="admin-input text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="admin-card p-6 space-y-4">
            <h3 className="text-base font-bold text-[var(--admin-text-primary)] border-b border-[var(--admin-border-subtle)] pb-4">
              SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={createForm.meta_title}
                  onChange={handleInputChange}
                  placeholder="Enter meta title (max 60 characters)"
                  className="admin-input text-xs"
                />
                <span className="text-[11px] text-[var(--admin-text-muted)] mt-1 block">
                  {createForm.meta_title?.length || 0}/60 characters
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={createForm.meta_description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter meta description (max 160 characters)"
                  className="admin-input resize-none text-xs"
                />
                <span className="text-[11px] text-[var(--admin-text-muted)] mt-1 block">
                  {createForm.meta_description?.length || 0}/160 characters
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  name="focus_keyword"
                  value={createForm.focus_keyword}
                  onChange={handleInputChange}
                  placeholder="Enter focus keyword"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  SEO Preview
                </label>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 text-[10px] font-bold">G</span>
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
                      https://www.tarajglobal.com › blog › {createForm.slug || 'your-blog-slug'}
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold truncate hover:underline cursor-pointer">
                    {createForm.meta_title || createForm.title || 'Your Blog Title Will Appear Here'}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {createForm.meta_description || createForm.excerpt || 'Your meta description will appear here. This is how your blog post will look in search engine results.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
  `;

  let replacedReturn = newReturn;
  if (filePath.includes('EditBlog')) {
    replacedReturn = replacedReturn.replace(/>Create New Blog Post</, '>Edit Blog Post<');
  } else {
    replacedReturn = replacedReturn.replace(/handleUpdateBlog/g, 'handleCreateBlog');
  }
  
  content = content.replace(/return \([\s\S]*?\)\s*\}\s*export default/g, replacedReturn + '\n}\n\nexport default');
  
  fs.writeFileSync(filePath, content);
}

rewriteBlog('c:/Users/TGS33/Desktop/TGS/tarajglobal/client/src/pages/Admin/CreateBlog.jsx');
rewriteBlog('c:/Users/TGS33/Desktop/TGS/tarajglobal/client/src/pages/Admin/EditBlog.jsx');
