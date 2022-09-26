import repo from '../repositories/blog.repository';
import { Request, Response } from 'express'
import Blog from '../models/blog';
import BlogComments from '../models/blogComments';

export default class {
    static async getAllBlogs(req: Request, res: Response, next: Function) {
        let blogs = await repo.getAllBlogs();
        return res.send({ blogs });
    };

    static async getBlogById(req: Request, res: Response, next: Function) {
        if (!req.params.id) {
            const err: Error = new Error("Blog id is required.");
            return next(err)
        }
        let blog = await repo.getBlogById(Number(req.params.id))
        if(!blog){
            return res.status(404).send('There is no blog for id');
        }
        return res.send({ blog });
    }

    static async createBlog(req: Request, res: Response, next: Function) {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send("Blog title and content are required.")
        }
        const newBlog = new Blog(
            req.body.title,
            req.body.content,
            req.body.userId,
            false
        );
        const success = await repo.createBlog(newBlog);
        return res.send({ success, item: newBlog });
    }

    static async updateBlog(req: Request, res: Response, next: Function) {
        if (!req.body.id) {
            return res.status(400).send('Blog id is required')
        }
        const blog = await repo.getBlogById(Number(req.body.id));
        console.log(blog)
        if (!blog) {
            return res.status(400).send("This blog doesn't exist")
        }
        blog.title = req.body.title ? req.body.title : blog.title;
        blog.content = req.body.content ? req.body.content : blog.content;
        blog.publish = req.body.publish ? req.body.publish : blog.publish;
        let success = await repo.updateBlog(blog);
        return res.send({ success });
    }

    static async publishBlog(req: Request, res: Response, next: Function) {
        if (!req.body.id) {
            return res.status(400).send('Blog id is required')
        }
        const blog = await repo.getBlogById(Number(req.body.id));
        console.log(blog)
        if (!blog) {
            return res.status(400).send('This blog doesn\'t exist')
        }
        blog.publish = true;
        let success = await repo.updateBlog(blog);
        return res.send({ success, item: req.body });
    }


    static async deleteBlog(req: Request, res: Response, next: Function) {
        if (!req.params.id) {
            const err: Error = new Error("Blog id is required.");
            return next(err)
        }
        let deleted = await repo.deleteBlog(Number(req.params.id));
        if (deleted) {
            deleted = await repo.deleteCommentsByBlogId(Number(req.params.id));
        }
        if (!deleted) {
            const err: Error = new Error("Blog delete failed.");
            return next(err)
        }
        return res.send({ success: deleted });
    }

    static async getComments(req: Request, res: Response, next: Function) {
        if (!req.params.id) {
            const err: Error = new Error("Blog id is required.");
            return next(err)
        }
        let comments = await repo.getComments(Number(req.params.id));
        return res.send({ comments });
    };

    static async createComment(req: Request, res: Response, next: Function) {
        if (!req.body.blog_id) {
            const err: Error = new Error("Blog id is required.");
            return next(err)
        }
        if (!req.body.userId) {
            const err: Error = new Error("User id is required.");
            return next(err)
        }
        if (!req.body.content) {
            const err: Error = new Error("Content is required.");
            return next(err)
        }
        const newComment = new BlogComments(
            req.body.blog_id,
            req.body.userId,
            req.body.content
        );
        const success = await repo.createComment(newComment);
        return res.send({ success, item: newComment });
    }

    static async deleteComments(req: Request, res: Response, next: Function) {
        if (!req.params.id) {
            const err: Error = new Error("Comment id is required.");
            return next(err)
        }
        const deleted = await repo.deleteComment(Number(req.params.id));
    
        if (!deleted) {
            const err: Error = new Error("Comment delete failed.");
            return next(err)
        }
        return res.send({ success: deleted });
    }
}