import express from 'express'
import { body, query } from 'express-validator'
import { validate } from '../../middleware/validation.middleware.js'
import { checkPermission, hasAnyPermission } from '../../middleware/permission.middleware.js'
import * as blogController from '../../controllers/admin/blog.controller.js'

const router = express.Router()

// @route   GET /api/admin/blogs
// @desc    Get all blogs with filtering and pagination
// @access  Private
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().custom((value) => {
    if (!value || value === '') return true;
    if (!['draft', 'published', 'archived'].includes(value)) {
      throw new Error('Invalid status value');
    }
    return true;
  }),
  query('category').optional(),
  query('author').optional(),
  query('tag').optional(),
  query('search').optional()
], validate, hasAnyPermission(['blog.create', 'blog.edit', 'blog.delete', 'blog.publish', 'blog.approve', 'blog.archive']), blogController.getAllBlogs)

// @route   GET /api/admin/blogs/:id
// @desc    Get single blog by ID
// @access  Private
router.get('/:id', hasAnyPermission(['blog.create', 'blog.edit', 'blog.delete', 'blog.publish', 'blog.approve', 'blog.archive']), blogController.getBlogById)

// @route   POST /api/admin/blogs
// @desc    Create new blog
// @access  Private
router.post('/', [
  checkPermission('blog.create'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').optional({ nullable: true, checkFalsy: true }),
  body('category_id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Category ID must be an integer'),
  body('author_id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Author ID must be an integer'),
  body('tags').optional({ nullable: true, checkFalsy: true }).isArray(),
  body('status').optional({ nullable: true, checkFalsy: true }).isIn(['draft', 'published', 'archived']),
  body('featured').optional({ nullable: true, checkFalsy: true }).isBoolean(),
  body('featured_image').optional({ nullable: true, checkFalsy: true }),
  body('seo_title').optional({ nullable: true, checkFalsy: true }),
  body('seo_description').optional({ nullable: true, checkFalsy: true }),
  body('seo_keywords').optional({ nullable: true, checkFalsy: true }),
  body('canonical_url').optional({ nullable: true, checkFalsy: true }),
  body('scheduled_at').optional({ nullable: true, checkFalsy: true })
], validate, blogController.createBlog)

// @route   PUT /api/admin/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', [
  checkPermission('blog.edit'),
  body('title').optional({ nullable: true, checkFalsy: true }).trim().notEmpty(),
  body('content').optional({ nullable: true, checkFalsy: true }).notEmpty(),
  body('excerpt').optional({ nullable: true, checkFalsy: true }),
  body('category_id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Category ID must be an integer'),
  body('author_id').optional({ nullable: true, checkFalsy: true }).isInt().withMessage('Author ID must be an integer'),
  body('status').optional({ nullable: true, checkFalsy: true }).isIn(['draft', 'published', 'archived']),
  body('featured').optional({ nullable: true, checkFalsy: true }).isBoolean(),
  body('featured_image').optional({ nullable: true, checkFalsy: true }),
  body('seo_title').optional({ nullable: true, checkFalsy: true }),
  body('seo_description').optional({ nullable: true, checkFalsy: true }),
  body('seo_keywords').optional({ nullable: true, checkFalsy: true }),
  body('canonical_url').optional({ nullable: true, checkFalsy: true }),
  body('scheduled_at').optional({ nullable: true, checkFalsy: true })
], validate, blogController.updateBlog)

// @route   DELETE /api/admin/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', checkPermission('blog.delete'), blogController.deleteBlog)

// @route   PATCH /api/admin/blogs/:id/status
// @desc    Update blog status
// @access  Private
router.patch('/:id/status', [
  hasAnyPermission(['blog.publish', 'blog.approve', 'blog.archive']),
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], validate, blogController.updateBlogStatus)

// @route   POST /api/admin/blogs/:id/duplicate
// @desc    Duplicate blog
// @access  Private
router.post('/:id/duplicate', checkPermission('blog.create'), blogController.duplicateBlog)

// @route   GET /api/admin/blogs/:id/revisions
// @desc    Get blog revision history
// @access  Private
router.get('/:id/revisions', hasAnyPermission(['blog.create', 'blog.edit', 'blog.delete', 'blog.publish', 'blog.approve', 'blog.archive']), blogController.getBlogRevisions)

// @route   POST /api/admin/blogs/:id/revisions/:versionId/restore
// @desc    Restore blog to specific revision
// @access  Private
router.post('/:id/revisions/:versionId/restore', checkPermission('blog.edit'), blogController.restoreBlogRevision)

// @route   POST /api/admin/blogs/bulk
// @desc    Bulk actions on blogs
// @access  Private
router.post('/bulk', [
  hasAnyPermission(['blog.delete', 'blog.publish', 'blog.archive']),
  body('action').isIn(['delete', 'publish', 'archive', 'category']).withMessage('Invalid action'),
  body('blog_ids').isArray({ min: 1 }).withMessage('Blog IDs array is required'),
  body('category_id').optional().isInt()
], validate, blogController.bulkBlogAction)

export default router
