import { Router } from "express";
import * as blogController from '../controllers/blog.js'
const router = Router();

router.route('/createBlog').post(blogController.createBlog);
router.route('/getAllBlogs').get(blogController.getAllBlogs);
router.route('/deleteBlog/:id').delete(blogController.deleteBlog);
router.route('/updateBlog/:id').post(blogController.updateBlog);

export default router;