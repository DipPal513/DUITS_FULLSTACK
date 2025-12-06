import express from 'express';
import { createBlog, DeleteBlog, GetBlogById, GetBlogs, updateBlog } from './blog.controller.js';


const router = express.Router();

router.post('/', createBlog);
router.get('/', GetBlogs);
router.get('/:id', GetBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', DeleteBlog);

export default router;