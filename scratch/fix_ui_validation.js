const fs = require('fs');

function applyValidation(filePath, isEdit) {
  let content = fs.readFileSync(filePath, 'utf8');
  const formName = isEdit ? 'editForm' : 'createForm';
  const handlerName = isEdit ? 'handleUpdateBlog' : 'handleCreateBlog';

  // 1. Add field errors state
  if (!content.includes('const [fieldErrors, setFieldErrors] = useState({})')) {
    content = content.replace(
      /const \[error, setError\] = useState\(''\)/,
      "const [error, setError] = useState('')\n    const [fieldErrors, setFieldErrors] = useState({})"
    );
  }

  // 2. Add validation logic inside handler
  const oldValidation = new RegExp(`e\\.preventDefault\\(\\)\\s*setError\\(''\\)`);
  const newValidation = `e.preventDefault()
      setError('')
      const newErrors = {}
      
      if (!${formName}.title || !${formName}.title.trim()) {
        newErrors.title = 'Title is required.'
      }
      
      if (!${formName}.slug || !${formName}.slug.trim()) {
        newErrors.slug = 'Slug is required.'
      } else if (!/^[a-z0-9-]+$/.test(${formName}.slug)) {
        newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens.'
      }
      
      if (!${formName}.content || !${formName}.content.trim() || ${formName}.content === '<p><br></p>') {
        newErrors.content = 'Content is required.'
      }
      
      if (!${formName}.category_id) {
        newErrors.category_id = 'Category is required.'
      }
      
      if (${formName}.status === 'scheduled') {
        if (!${formName}.scheduled_date) newErrors.scheduled_date = 'Date is required.'
        if (!${formName}.scheduled_time) newErrors.scheduled_time = 'Time is required.'
        if (${formName}.scheduled_date && ${formName}.scheduled_time) {
          const scheduledAt = new Date(\`\${${formName}.scheduled_date}T\${${formName}.scheduled_time}\`)
          if (scheduledAt <= new Date()) {
            newErrors.scheduled_date = 'Scheduled date must be in the future.'
          }
        }
      }
      
      setFieldErrors(newErrors)
      if (Object.keys(newErrors).length > 0) {
        setError('Please fix the errors in the form.')
        return
      }`;

  // Replace old simple validation block up to setSaving(true)
  if (content.match(/e\.preventDefault\(\)[\s\S]*?setSaving\(true\)/)) {
    content = content.replace(/e\.preventDefault\(\)[\s\S]*?setSaving\(true\)/, newValidation + '\n\n      setSaving(true)');
  }
  
  // 3. API Error handling (duplicate slug etc)
  const oldApiCatch = new RegExp(`console\\.error\\('Failed to.*:\\', err\\)`);
  if (content.match(oldApiCatch)) {
    // Modify the catch block
    content = content.replace(
      /console\.error\('Failed to.*?err\)\s*const msg = [^]*?setError\(msg\)/,
      `console.error('Failed API:', err)
        if (err.response?.status === 409 || (err.response?.data?.message || '').toLowerCase().includes('duplicate') || (err.response?.data?.message || '').toLowerCase().includes('already exists')) {
          setFieldErrors({ ...fieldErrors, slug: 'This slug already exists. Please choose another.' })
          setError('Slug must be unique.')
        } else if (err.response?.status === 413 || (err.response?.data?.message || '').toLowerCase().includes('too large')) {
           setError('The uploaded image is too large.')
        } else {
          setError(err.response?.data?.message || 'Failed to save blog. Please try again.')
        }`
    );
  }

  // 4. Inject UI Field Errors
  
  // Title
  content = content.replace(
    /(<input[^>]*name="title"[^>]*>)/,
    "$1\n                  {fieldErrors.title && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.title}</span>}"
  );
  
  // Slug
  content = content.replace(
    /(<input[^>]*name="slug"[^>]*>)/,
    "$1\n                  {fieldErrors.slug && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.slug}</span>}"
  );
  
  // Content (ReactQuill)
  content = content.replace(
    /(<ReactQuill[^>]*>[\s\S]*?<\/ReactQuill>)/,
    "$1\n                {fieldErrors.content && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.content}</span>}"
  );
  
  // Category
  content = content.replace(
    /(<select[^>]*name="category_id"[^>]*>[\s\S]*?<\/select>)/,
    "$1\n                  {fieldErrors.category_id && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.category_id}</span>}"
  );
  
  // Schedule Date & Time
  content = content.replace(
    /(<input[^>]*name="scheduled_date"[^>]*>)/,
    "$1\n                  {fieldErrors.scheduled_date && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.scheduled_date}</span>}"
  );
  content = content.replace(
    /(<input[^>]*name="scheduled_time"[^>]*>)/,
    "$1\n                  {fieldErrors.scheduled_time && <span className=\"text-red-500 text-[11px] mt-1 block\">{fieldErrors.scheduled_time}</span>}"
  );

  fs.writeFileSync(filePath, content);
}

applyValidation('client/src/pages/Admin/CreateBlog.jsx', false);
applyValidation('client/src/pages/Admin/EditBlog.jsx', true);
