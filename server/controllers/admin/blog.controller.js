import db from '../../config/db.js'
import slugify from 'slugify'
import { analyzeSEO } from '../../helpers/seoAnalyzer.js'
import fs from 'fs'
import path from 'path'

// Helper function to calculate reading time
export const calculateReadingTime = (content) => {
  if (!content) return 1
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

// Helper to save base64 data image to disk in uploads/media and return relative URL
export const saveImageIfBase64 = (imageData) => {
  if (!imageData || typeof imageData !== 'string') return imageData
  if (!imageData.startsWith('data:image/')) return imageData

  try {
    const uploadDir = 'uploads/media'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const matches = imageData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) return imageData

    const mimeType = matches[1]
    const base64Data = matches[2]
    const ext = mimeType.split('/')[1] || 'png'
    const cleanExt = ext === 'jpeg' ? 'jpg' : ext.split('+')[0]
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${cleanExt}`
    const filePath = path.join(uploadDir, filename)

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'))
    return `/uploads/media/${filename}`
  } catch (err) {
    console.error('Failed to save base64 image:', err)
    return imageData
  }
}

// Helper function to generate slug
const generateSlug = (title, existingSlugs = []) => {
  let slug = slugify(title, { lower: true, strict: true })
  let counter = 1
  let finalSlug = slug
  
  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${slug}-${counter}`
    counter++
  }
  
  return finalSlug
}

// Helper function to create blog revision
const createRevision = async (blogId, blogData, userId, notes = null) => {
  // Get current version number
  const [versionResult] = await db.execute(
    'SELECT COALESCE(MAX(version), 0) as max_version FROM blog_revisions WHERE blog_id = ?',
    [blogId]
  )
  
  const version = versionResult[0].max_version + 1
  
  await db.execute(`
    INSERT INTO blog_revisions 
    (blog_id, version, title, content, excerpt, featured_image, seo_title, seo_description, seo_keywords, canonical_url, created_by, change_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    blogId,
    version,
    blogData.title,
    blogData.content,
    blogData.excerpt,
    blogData.featured_image,
    blogData.seo_title,
    blogData.seo_description,
    blogData.seo_keywords,
    blogData.canonical_url,
    userId,
    notes
  ])
}

// @desc    Get all blogs with filtering and pagination
// @route   GET /api/admin/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, author, search } = req.query
    const offset = (page - 1) * limit

    let whereClause = 'WHERE 1=1'
    const params = []

    if (status && status !== '') {
      whereClause += ' AND b.status = ?'
      params.push(status)
    }

    if (category && category !== '') {
      whereClause += ' AND b.category_id = ?'
      params.push(category)
    }

    if (author && author !== '') {
      whereClause += ' AND b.author_id = ?'
      params.push(author)
    }

    if (search && search !== '') {
      whereClause += ' AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)'
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    const [blogs] = await db.execute(`
      SELECT 
        b.*,
        c.name as category_name,
        a.name as author_name
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      ${whereClause}
      ORDER BY b.updated_at DESC, b.created_at DESC 
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit), parseInt(offset)])
    
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM blogs b ${whereClause}`, params)
    
    res.json({
      success: true,
      data: {
        blogs: blogs.map(blog => {
          let score = blog.seo_score
          if (!score || score <= 0) {
            const calculated = analyzeSEO(blog)
            score = calculated.score
          }
          return {
            ...blog,
            tags: [],
            status: blog.status || 'draft',
            featured_image: blog.featured_image || blog.image,
            image: blog.image || blog.featured_image,
            seo_score: score
          }
        }),
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Get all blogs error:', error)
    res.json({
      success: true,
      data: {
        blogs: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      }
    })
  }
}

// @desc    Get single blog by ID
// @route   GET /api/admin/blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params

    const [blogs] = await db.execute(`
      SELECT 
        b.*,
        c.name as category_name,
        a.name as author_name,
        a.profile_photo as author_photo,
        a.designation as author_designation,
        a.bio as author_bio,
        GROUP_CONCAT(t.name) as tags,
        GROUP_CONCAT(t.id) as tag_ids
      FROM blogs b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN blog_tags bt ON b.id = bt.blog_id
      LEFT JOIN tags t ON bt.tag_id = t.id
      WHERE b.id = ?
      GROUP BY b.id
    `, [id])

    if (blogs.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      })
    }

    const blog = blogs[0]
    blog.featured_image = blog.featured_image || blog.image
    blog.image = blog.image || blog.featured_image
    blog.tags = blog.tags ? blog.tags.split(',') : []
    blog.tag_ids = blog.tag_ids ? blog.tag_ids.split(',').map(Number) : []

    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    console.error('Get blog error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Create new blog
// @route   POST /api/admin/blogs
export const createBlog = async (req, res) => {
  try {
    console.log('=== CREATE BLOG REQUEST ===')
    console.log('Request body:', req.body)
    console.log('User:', req.user)
    
    const {
      title,
      content,
      excerpt,
      category_id,
      author_id,
      tags,
      status = 'draft',
      featured = false,
      featured_image,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      seo_score,
      seo_analysis,
      scheduled_at
    } = req.body

    console.log('Extracted fields:', { title, content, excerpt, category_id, author_id, status, featured_image })

    // Check which columns exist in the blogs table
    const [columns] = await db.execute(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'blogs'
    `)
    const columnNames = columns.map(c => c.COLUMN_NAME)

    // Generate slug if slug column exists
    let slug = null
    if (columnNames.includes('slug')) {
      const [existingBlogs] = await db.execute('SELECT slug FROM blogs WHERE slug IS NOT NULL')
      const existingSlugs = existingBlogs.map(b => b.slug)
      slug = generateSlug(title, existingSlugs)
      console.log('Generated slug:', slug)
    }

    // Calculate reading time if column exists
    let reading_time = null
    if (columnNames.includes('reading_time')) {
      reading_time = calculateReadingTime(content)
      console.log('Reading time:', reading_time)
    }

    // Build dynamic INSERT query based on available columns
    const insertColumns = ['title', 'content', 'excerpt']
    const insertValues = [title, content, excerpt || null]
    const valuePlaceholders = ['?', '?', '?']

    // Add timestamp columns
    if (columnNames.includes('created_at')) {
      insertColumns.push('created_at')
      valuePlaceholders.push('NOW()')
    }
    if (columnNames.includes('updated_at')) {
      insertColumns.push('updated_at')
      valuePlaceholders.push('NOW()')
    }

    if (columnNames.includes('slug') && slug) {
      insertColumns.push('slug')
      insertValues.push(slug)
      valuePlaceholders.push('?')
    }

    const rawImage = featured_image || req.body.image
    const processedImage = saveImageIfBase64(rawImage)

    if (columnNames.includes('image') && processedImage) {
      insertColumns.push('image')
      insertValues.push(processedImage)
      valuePlaceholders.push('?')
    }
    if (columnNames.includes('featured_image') && processedImage) {
      insertColumns.push('featured_image')
      insertValues.push(processedImage)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('author_id') && author_id) {
      insertColumns.push('author_id')
      insertValues.push(author_id)
      valuePlaceholders.push('?')
    } else if (columnNames.includes('author') && author_id) {
      insertColumns.push('author')
      insertValues.push(author_id)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('category_id') && category_id) {
      insertColumns.push('category_id')
      insertValues.push(category_id)
      valuePlaceholders.push('?')
    } else if (columnNames.includes('category') && category_id) {
      insertColumns.push('category')
      insertValues.push(category_id)
      valuePlaceholders.push('?')
    }

    // Always try to add status column, if it doesn't exist, add it to the table
    if (!columnNames.includes('status')) {
      try {
        await db.execute(`ALTER TABLE blogs ADD COLUMN status ENUM('draft', 'published', 'archived') DEFAULT 'draft'`)
        console.log('Added status column to blogs table')
        columnNames.push('status')
      } catch (alterError) {
        console.log('Could not add status column:', alterError.message)
      }
    } else {
      // If status column exists but has old enum values, update it
      try {
        // Check if the column has the old enum values
        const [columnInfo] = await db.execute(`
          SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'blogs' AND COLUMN_NAME = 'status'
        `)
        
        if (columnInfo.length > 0 && columnInfo[0].COLUMN_TYPE.includes('in_review')) {
          // Update existing rows to use new status values
          await db.execute(`
            UPDATE blogs 
            SET status = CASE 
              WHEN status IN ('in_review', 'approved', 'scheduled') THEN 'draft'
              ELSE status
            END
          `)
          
          // Modify the column to use new enum
          await db.execute(`
            ALTER TABLE blogs 
            MODIFY COLUMN status ENUM('draft', 'published', 'archived') DEFAULT 'draft'
          `)
          console.log('Updated status column enum to draft, published, archived')
        }
      } catch (alterError) {
        console.log('Could not update status column:', alterError.message)
      }
    }
    
    if (columnNames.includes('status')) {
      insertColumns.push('status')
      insertValues.push(status || 'draft')
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('featured') && featured !== undefined) {
      insertColumns.push('featured')
      insertValues.push(featured ? 1 : 0)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('seo_title') && seo_title) {
      insertColumns.push('seo_title')
      insertValues.push(seo_title)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('seo_description') && seo_description) {
      insertColumns.push('seo_description')
      insertValues.push(seo_description)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('seo_keywords') && seo_keywords) {
      insertColumns.push('seo_keywords')
      insertValues.push(seo_keywords)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('canonical_url') && canonical_url) {
      insertColumns.push('canonical_url')
      insertValues.push(canonical_url)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('reading_time')) {
      insertColumns.push('reading_time')
      insertValues.push(calculateReadingTime(content))
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('tags') && tags) {
      insertColumns.push('tags')
      insertValues.push(JSON.stringify(tags))
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('views')) {
      insertColumns.push('views')
      insertValues.push(0)
      valuePlaceholders.push('?')
    }

    // Add SEO score columns if they exist
    if (columnNames.includes('seo_score') && seo_score !== undefined) {
      insertColumns.push('seo_score')
      insertValues.push(seo_score)
      valuePlaceholders.push('?')
    }

    if (columnNames.includes('seo_analysis') && seo_analysis) {
      insertColumns.push('seo_analysis')
      insertValues.push(JSON.stringify(seo_analysis))
      valuePlaceholders.push('?')
    }

    // Insert blog
    console.log('Executing INSERT query...')
    const query = `INSERT INTO blogs (${insertColumns.join(', ')}) VALUES (${valuePlaceholders.join(', ')})`
    const [result] = await db.execute(query, insertValues)

    console.log('INSERT result:', result)
    console.log('Insert ID:', result.insertId)

    const blogId = result.insertId

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: { id: blogId, slug }
    })
  } catch (error) {
    console.error('Create blog error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Update blog
// @route   PUT /api/admin/blogs/:id
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      slug: customSlug,
      content,
      excerpt,
      category_id,
      author_id,
      tags,
      status,
      featured,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      seo_score,
      seo_analysis,
      scheduled_at
    } = req.body

    // Get current blog with all existing attributes
    const [currentBlogs] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id])
    if (currentBlogs.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      })
    }

    const currentBlog = currentBlogs[0]

    // Handle slug generation/update
    let slug = currentBlog.slug
    if (customSlug && customSlug !== currentBlog.slug) {
      const [existingBlogs] = await db.execute('SELECT slug FROM blogs WHERE id != ?', [id])
      const existingSlugs = existingBlogs.map(b => b.slug)
      slug = generateSlug(customSlug, existingSlugs)
    } else if (title && title !== currentBlog.title && !customSlug) {
      const [existingBlogs] = await db.execute('SELECT slug FROM blogs WHERE id != ?', [id])
      const existingSlugs = existingBlogs.map(b => b.slug)
      slug = generateSlug(title, existingSlugs)
    }

    // Build update query dynamically
    const updates = []
    const values = []

    if (title !== undefined) { updates.push('title = ?'); values.push(title) }
    if (slug !== currentBlog.slug) { updates.push('slug = ?'); values.push(slug) }
    if (content !== undefined) { updates.push('content = ?'); values.push(content) }
    if (excerpt !== undefined) { updates.push('excerpt = ?'); values.push(excerpt) }
    if (category_id !== undefined) { updates.push('category_id = ?'); values.push(category_id || null) }
    if (author_id !== undefined) { updates.push('author_id = ?'); values.push(author_id || null) }
    
    // Always include status if provided in request
    if (status !== undefined) { 
      updates.push('status = ?')
      values.push(status)
    }
    
    const rawImage = req.body.featured_image !== undefined ? req.body.featured_image : req.body.image
    const featImage = saveImageIfBase64(rawImage)
    if (featImage !== undefined) { 
      updates.push('image = ?')
      values.push(featImage || null) 
      updates.push('featured_image = ?')
      values.push(featImage || null) 
    }

    if (featured !== undefined) {
      updates.push('featured = ?')
      values.push(featured ? 1 : 0)
    }

    if (seo_title !== undefined) {
      updates.push('seo_title = ?')
      values.push(seo_title || null)
    }

    if (seo_description !== undefined) {
      updates.push('seo_description = ?')
      values.push(seo_description || null)
    }

    if (seo_keywords !== undefined) {
      updates.push('seo_keywords = ?')
      values.push(seo_keywords || null)
    }

    if (canonical_url !== undefined) {
      updates.push('canonical_url = ?')
      values.push(canonical_url || null)
    }

    if (content !== undefined) {
      updates.push('reading_time = ?')
      values.push(calculateReadingTime(content))
    }

    // Determine SEO score and analysis
    let finalSeoScore = seo_score
    let finalSeoAnalysis = seo_analysis

    if (finalSeoScore === undefined || finalSeoScore === null || Number(finalSeoScore) <= 0) {
      const blogForSeo = {
        title: title !== undefined ? title : currentBlog.title,
        slug: slug,
        content: content !== undefined ? content : currentBlog.content,
        excerpt: excerpt !== undefined ? excerpt : currentBlog.excerpt,
        featured_image: featImage !== undefined ? featImage : currentBlog.image
      }
      const calculated = analyzeSEO(blogForSeo)
      finalSeoScore = calculated.score
      finalSeoAnalysis = calculated
    }

    updates.push('seo_score = ?')
    values.push(finalSeoScore)

    if (finalSeoAnalysis !== undefined && finalSeoAnalysis !== null) {
      updates.push('seo_analysis = ?')
      values.push(typeof finalSeoAnalysis === 'string' ? finalSeoAnalysis : JSON.stringify(finalSeoAnalysis))
    }

    updates.push('updated_at = NOW()')
    values.push(id)

    await db.execute(
      `UPDATE blogs SET ${updates.join(', ')} WHERE id = ?`,
      values
    )

    // Create revision if content changed (optional - table may not exist)
    if (content || title || excerpt) {
      try {
        await createRevision(id, {
          title: title || currentBlog.title,
          content: content || currentBlog.content,
          excerpt: excerpt || currentBlog.excerpt,
          featured_image: featImage || currentBlog.image,
          seo_title: seo_title || currentBlog.seo_title,
          seo_description: seo_description || currentBlog.seo_description,
          seo_keywords: seo_keywords || currentBlog.seo_keywords,
          canonical_url: canonical_url || currentBlog.canonical_url
        }, req.user?.id || 1, 'Content updated')
      } catch (revisionError) {
        console.log('Revision creation skipped:', revisionError.message)
      }
    }

    // Update tags if provided
    if (tags !== undefined) {
      try {
        await db.execute('DELETE FROM blog_tags WHERE blog_id = ?', [id])
        for (const tagId of tags) {
          await db.execute('INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)', [id, tagId])
        }
        await db.execute('UPDATE tags SET post_count = (SELECT COUNT(*) FROM blog_tags WHERE tag_id = tags.id)')
      } catch (tagErr) {
        console.log('Tag update warning:', tagErr.message)
      }
    }

    // Safely update category post count if changed
    try {
      if (category_id !== undefined && category_id !== currentBlog.category_id) {
        if (currentBlog.category_id) {
          await db.execute('UPDATE categories SET post_count = GREATEST(0, post_count - 1) WHERE id = ?', [currentBlog.category_id])
        }
        if (category_id) {
          await db.execute('UPDATE categories SET post_count = post_count + 1 WHERE id = ?', [category_id])
        }
      }
    } catch (catErr) {
      console.log('Category post count warning:', catErr.message)
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: { id, slug, status: status || currentBlog.status, seo_score: finalSeoScore }
    })
  } catch (error) {
    console.error('Update blog error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Delete blog
// @route   DELETE /api/admin/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    // Get blog before deletion for cleanup
    const [blogs] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id])
    if (blogs.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      })
    }

    const blog = blogs[0]

    // Delete related records safely before deleting the blog
    try {
      await db.execute('DELETE FROM blog_tags WHERE blog_id = ?', [id])
    } catch (tagErr) {
      console.log('Cleanup blog_tags notice:', tagErr.message)
    }

    try {
      await db.execute('DELETE FROM blog_revisions WHERE blog_id = ?', [id])
    } catch (revErr) {
      console.log('Cleanup blog_revisions notice:', revErr.message)
    }

    // Delete blog
    await db.execute('DELETE FROM blogs WHERE id = ?', [id])

    // Update category post count safely
    if (blog.category_id) {
      try {
        await db.execute(
          'UPDATE categories SET post_count = GREATEST(0, post_count - 1) WHERE id = ?',
          [blog.category_id]
        )
      } catch (catErr) {
        console.log('Update category count notice:', catErr.message)
      }
    }

    // Update tag post counts safely
    try {
      await db.execute('UPDATE tags SET post_count = (SELECT COUNT(*) FROM blog_tags WHERE tag_id = tags.id)')
    } catch (tagCountErr) {
      console.log('Update tag post count notice:', tagCountErr.message)
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.error('Delete blog error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Update blog status
// @route   PATCH /api/admin/blogs/:id/status
export const updateBlogStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const [blogs] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id])
    if (blogs.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      })
    }

    const currentBlog = blogs[0]
    let seoScore = currentBlog.seo_score
    let seoAnalysis = currentBlog.seo_analysis

    if (!seoScore || Number(seoScore) <= 0) {
      const calculated = analyzeSEO(currentBlog)
      seoScore = calculated.score
      seoAnalysis = JSON.stringify(calculated)
    }

    await db.execute(
      'UPDATE blogs SET status = ?, seo_score = ?, seo_analysis = ?, updated_at = NOW() WHERE id = ?',
      [status, seoScore, typeof seoAnalysis === 'string' ? seoAnalysis : JSON.stringify(seoAnalysis), id]
    )

    res.json({
      success: true,
      message: 'Blog status updated successfully',
      data: { id, status, seo_score: seoScore }
    })
  } catch (error) {
    console.error('Update blog status error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Duplicate blog
// @route   POST /api/admin/blogs/:id/duplicate
export const duplicateBlog = async (req, res) => {
  try {
    const { id } = req.params

    const [blogs] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id])
    if (blogs.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog not found' 
      })
    }

    const original = blogs[0]

    // Generate new slug
    const [existingBlogs] = await db.execute('SELECT slug FROM blogs')
    const existingSlugs = existingBlogs.map(b => b.slug)
    const slug = generateSlug(original.title + ' copy', existingSlugs)

    // Insert duplicate
    const [result] = await db.execute(`
      INSERT INTO blogs 
      (title, slug, content, excerpt, image, featured_image, category_id, author_id, status, featured, seo_title, seo_description, seo_keywords, canonical_url, seo_score, seo_analysis, reading_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      original.title + ' (Copy)',
      slug,
      original.content,
      original.excerpt,
      original.image,
      original.featured_image || original.image,
      original.category_id,
      original.author_id,
      'draft',
      false,
      original.seo_title,
      original.seo_description,
      original.seo_keywords,
      original.canonical_url,
      original.seo_score,
      original.seo_analysis,
      original.reading_time || calculateReadingTime(original.content)
    ])

    const blogId = result.insertId

    // Copy tags
    const [tags] = await db.execute('SELECT tag_id FROM blog_tags WHERE blog_id = ?', [id])
    for (const tag of tags) {
      await db.execute(
        'INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)',
        [blogId, tag.tag_id]
      )
    }

    res.status(201).json({
      success: true,
      message: 'Blog duplicated successfully',
      data: { id: blogId, slug }
    })
  } catch (error) {
    console.error('Duplicate blog error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Get blog revision history
// @route   GET /api/admin/blogs/:id/revisions
export const getBlogRevisions = async (req, res) => {
  try {
    const { id } = req.params

    const [revisions] = await db.execute(`
      SELECT 
        br.*,
        u.name as created_by_name
      FROM blog_revisions br
      LEFT JOIN users u ON br.created_by = u.id
      WHERE br.blog_id = ?
      ORDER BY br.version DESC
    `, [id])

    res.json({
      success: true,
      data: revisions
    })
  } catch (error) {
    console.error('Get blog revisions error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Restore blog to specific revision
// @route   POST /api/admin/blogs/:id/revisions/:versionId/restore
export const restoreBlogRevision = async (req, res) => {
  try {
    const { id, versionId } = req.params

    // Get revision
    const [revisions] = await db.execute(
      'SELECT * FROM blog_revisions WHERE id = ? AND blog_id = ?',
      [versionId, id]
    )

    if (revisions.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Revision not found' 
      })
    }

    const revision = revisions[0]

    // Restore blog content
    await db.execute(`
      UPDATE blogs 
      SET title = ?, content = ?, excerpt = ?, featured_image = ?, seo_title = ?, seo_description = ?, seo_keywords = ?, canonical_url = ?, updated_by = ?
      WHERE id = ?
    `, [
      revision.title,
      revision.content,
      revision.excerpt,
      revision.featured_image,
      revision.seo_title,
      revision.seo_description,
      revision.seo_keywords,
      revision.canonical_url,
      req.user.id,
      id
    ])

    // Create new revision for the restore action
    await createRevision(id, {
      title: revision.title,
      content: revision.content,
      excerpt: revision.excerpt,
      featured_image: revision.featured_image,
      seo_title: revision.seo_title,
      seo_description: revision.seo_description,
      seo_keywords: revision.seo_keywords,
      canonical_url: revision.canonical_url
    }, req.user.id, `Restored from version ${revision.version}`)

    res.json({
      success: true,
      message: 'Blog restored successfully'
    })
  } catch (error) {
    console.error('Restore blog revision error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}

// @desc    Bulk actions on blogs
// @route   POST /api/admin/blogs/bulk
export const bulkBlogAction = async (req, res) => {
  try {
    const { action, blog_ids, category_id } = req.body

    if (!blog_ids || blog_ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Blog IDs are required' 
      })
    }

    const placeholders = blog_ids.map(() => '?').join(',')

    switch (action) {
      case 'delete':
        await db.execute(`DELETE FROM blogs WHERE id IN (${placeholders})`, blog_ids)
        // Update category and tag counts
        await db.execute('UPDATE categories SET post_count = (SELECT COUNT(*) FROM blogs WHERE category_id = categories.id)')
        await db.execute('UPDATE tags SET post_count = (SELECT COUNT(*) FROM blog_tags WHERE tag_id = tags.id)')
        break

      case 'publish':
        await db.execute(
          `UPDATE blogs SET status = 'published', published_at = NOW(), updated_by = ? WHERE id IN (${placeholders})`,
          [req.user.id, ...blog_ids]
        )
        break

      case 'archive':
        await db.execute(
          `UPDATE blogs SET status = 'archived', updated_by = ? WHERE id IN (${placeholders})`,
          [req.user.id, ...blog_ids]
        )
        break

      case 'category':
        if (!category_id) {
          return res.status(400).json({ 
            success: false, 
            message: 'Category ID is required for category action' 
          })
        }
        await db.execute(
          `UPDATE blogs SET category_id = ?, updated_by = ? WHERE id IN (${placeholders})`,
          [category_id, req.user.id, ...blog_ids]
        )
        break

      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid action' 
        })
    }

    res.json({
      success: true,
      message: `Bulk ${action} completed successfully`
    })
  } catch (error) {
    console.error('Bulk blog action error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message 
    })
  }
}
