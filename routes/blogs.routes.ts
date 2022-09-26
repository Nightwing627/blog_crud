import BlogController from '../controllers/blog.controller';
import { authenticated } from '../controllers/auth.controller';
import * as express from 'express';
const router = express.Router()

router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById)
router.post("/", authenticated, BlogController.createBlog);
router.put("/", authenticated, BlogController.updateBlog);
router.put("/publish", authenticated, BlogController.publishBlog);
router.delete("/:id", authenticated, BlogController.deleteBlog)
router.get("/:id/comments", BlogController.getComments);
router.post("/comments", authenticated, BlogController.createComment);
router.delete("/comments/:id", authenticated, BlogController.deleteComments)
export default router