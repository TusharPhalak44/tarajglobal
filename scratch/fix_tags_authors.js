const fs = require('fs');

function fixCreateBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/CreateBlog.jsx', 'utf8');
  
  if (!content.includes('tags: createForm.tags || [],')) {
    content = content.replace(
      /status: createForm\.status \|\| 'draft',/,
      "status: createForm.status || 'draft',\n        tags: createForm.tags || [],"
    );
  }

  fs.writeFileSync('client/src/pages/Admin/CreateBlog.jsx', content);
}

function fixEditBlog() {
  let content = fs.readFileSync('client/src/pages/Admin/EditBlog.jsx', 'utf8');

  if (!content.includes('const [tagsInput, setTagsInput] = useState(')) {
    content = content.replace(
      /const \[saving, setSaving\] = useState\(false\)/,
      "const [saving, setSaving] = useState(false)\n  const [tagsInput, setTagsInput] = useState('')"
    );
  }

  if (!content.includes('const handleTagKeyDown')) {
    const handlerCode = `
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
  }`;
    content = content.replace(
      /const handleInputChange = \(e\) => \{/,
      handlerCode + "\n\n  const handleInputChange = (e) => {"
    );
  }

  if (!content.includes('tags: editForm.tags || [],')) {
    content = content.replace(
      /status: editForm\.status \|\| 'draft',/,
      "status: editForm.status || 'draft',\n        tags: editForm.tags || [],"
    );
  }

  fs.writeFileSync('client/src/pages/Admin/EditBlog.jsx', content);
}

fixCreateBlog();
fixEditBlog();
