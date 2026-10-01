const fs = require('fs');

function fixCreateBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/CreateBlog.jsx', 'utf8');

  // Fix validation
  if (!content.includes('if (createForm.status === \'scheduled\') {')) {
    content = content.replace(
      /setSaving\(true\)/,
      `if (createForm.status === 'scheduled') {
      if (!createForm.scheduled_date || !createForm.scheduled_time) {
        setError('Please select both a date and time for scheduling.')
        return
      }
      const scheduledAt = new Date(\`\${createForm.scheduled_date}T\${createForm.scheduled_time}\`)
      if (scheduledAt <= new Date()) {
        setError('Scheduled date must be in the future.')
        return
      }
    }

    setSaving(true)`
    );
  }

  // Add scheduled_at to blogData
  if (!content.includes('scheduled_at: createForm.status === \'scheduled\'')) {
    content = content.replace(
      /status: createForm\.status \|\| 'draft',/,
      "status: createForm.status || 'draft',\n        scheduled_at: createForm.status === 'scheduled' ? `${createForm.scheduled_date} ${createForm.scheduled_time}:00` : null,"
    );
  }

  // Replace UI
  const oldUI = /<div>\s*<label className="block text-xs font-bold text-\[var\(--admin-text-primary\)\] mb-1\.5">\s*Publish Date\s*<\/label>[\s\S]*?<\/div>\s*<\/div>/;
  const newUI = `{createForm.status === 'scheduled' && (
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Publish Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="scheduled_date"
                    value={createForm.scheduled_date || ''}
                    onChange={handleInputChange}
                    className="admin-input text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"
                  />
                  <input
                    type="time"
                    name="scheduled_time"
                    value={createForm.scheduled_time || ''}
                    onChange={handleInputChange}
                    className="admin-input text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
              )}`;

  if (content.match(oldUI)) {
    content = content.replace(oldUI, newUI);
  }

  fs.writeFileSync('client/src/pages/Admin/CreateBlog.jsx', content);
}

function fixEditBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/EditBlog.jsx', 'utf8');

  // Fix validation
  if (!content.includes('if (editForm.status === \'scheduled\') {')) {
    content = content.replace(
      /setSaving\(true\)/,
      `if (editForm.status === 'scheduled') {
      if (!editForm.scheduled_date || !editForm.scheduled_time) {
        setError('Please select both a date and time for scheduling.')
        return
      }
      const scheduledAt = new Date(\`\${editForm.scheduled_date}T\${editForm.scheduled_time}\`)
      if (scheduledAt <= new Date()) {
        setError('Scheduled date must be in the future.')
        return
      }
    }

    setSaving(true)`
    );
  }

  // Fix init logic to parse scheduled_at
  if (!content.includes('scheduled_date: blogData.scheduled_at')) {
    const initCode = `
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
          scheduled_time: sTime
        }
`;
    content = content.replace(
      /const initialForm = \{[\s\S]*?tags: blogData\.tags \|\| \[\]\n      \}/,
      initCode
    );
  }

  // Add scheduled_at to updateData
  if (!content.includes('scheduled_at: editForm.status === \'scheduled\'')) {
    content = content.replace(
      /status: editForm\.status \|\| 'draft',/,
      "status: editForm.status || 'draft',\n        scheduled_at: editForm.status === 'scheduled' ? `${editForm.scheduled_date} ${editForm.scheduled_time}:00` : null,"
    );
  }

  // Replace UI
  const oldUI = /<div>\s*<label className="block text-xs font-bold text-\[var\(--admin-text-primary\)\] mb-1\.5">\s*Publish Date\s*<\/label>[\s\S]*?<\/div>\s*<\/div>/;
  const newUI = `{editForm.status === 'scheduled' && (
              <div>
                <label className="block text-xs font-bold text-[var(--admin-text-primary)] mb-1.5">
                  Publish Date & Time <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    name="scheduled_date"
                    value={editForm.scheduled_date || ''}
                    onChange={handleInputChange}
                    className="admin-input text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"
                  />
                  <input
                    type="time"
                    name="scheduled_time"
                    value={editForm.scheduled_time || ''}
                    onChange={handleInputChange}
                    className="admin-input text-xs shadow-none focus:ring-0 focus:ring-offset-0 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
              )}`;

  if (content.match(oldUI)) {
    content = content.replace(oldUI, newUI);
  }

  fs.writeFileSync('client/src/pages/Admin/EditBlog.jsx', content);
}

fixCreateBlog();
fixEditBlog();
