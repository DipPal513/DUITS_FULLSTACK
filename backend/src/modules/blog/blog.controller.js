import {
  createBlogService,
  getBlogsService,
  getBlogByIdService,
  deleteBlogService,
  updateBlogService,
} from './blog.model.js';

export const createBlog = async (req, res, next) => {
  try {
    const blog = await createBlogService(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};
export const GetBlogs = async (req, res, next) => {
  try {
     const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const finalLimit = Math.min(limit, 50); 
      const blogs = await getBlogsService(finalLimit, page);
      res.status(200).json({ success: true, data: blogs });} catch (err) {
      console.error(err);
      next(err);
    }
};
export const GetBlogById = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data:blog });
  } catch (err) {
    next(err);
  }
};
export const DeleteBlog = async (req, res, next) => {
  try {
    const blog = await deleteBlogService(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await updateBlogService(req.params.id, req.body);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};