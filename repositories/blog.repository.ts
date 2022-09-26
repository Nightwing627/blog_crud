import dao from './dao';
import BlogComments from '../models/blogComments';
import Blog from '../models/blog';


export default class {

    static async getAllBlogs(): Promise<Blog[]> {
        const blogs = await dao.all("SELECT * FROM blogs", [])
        return <Blog[]>blogs
    }

    static async getAllPublishedBlogs(): Promise<Blog[]> {
        const blogs = await dao.all("SELECT * FROM blogs WHERE publish= ?", [true])
        return <Blog[]>blogs
    }

    static async getBlogById(id: number): Promise<Blog> {
        const item = await dao.get("SELECT * FROM blogs WHERE id = ?", [id])
        return <Blog>item;
    }

    static async createBlog(blog: Blog): Promise<boolean> {
        const stmt = `INSERT INTO blogs (title, content, user_id, publish) VALUES (?,?,?,?);`
        try {
            await dao.run(stmt, [blog.title, blog.content, blog.user_id, false]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async updateBlog(blog: Blog): Promise<boolean> {
        const stmt = `UPDATE blogs SET title = ?, content = ? user_id = ? publish = ? WHERE id = ?;`
        try {
            await dao.run(stmt, [blog.title, blog.content, blog.user_id, blog.publish, blog.id]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async deleteBlog(blogId: number) {
        const stmt = `DELETE FROM blogs WHERE id = ?;`
        try {
            await dao.run(stmt, [blogId]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async getComments(blogId: number): Promise<BlogComments[]> {
        const comments = await dao.all("SELECT * FROM blog_comments where blog_id = ?", [blogId])
        return <BlogComments[]>comments
    }

    static async createComment(comment: BlogComments) {
        const stmt = `INSERT INTO blog_comments (blog_id, user_id, content) VALUES (?, ?, ?)`
        try {
            await dao.run(stmt, [comment.blog_id, comment.user_id, comment.content]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async deleteCommentsByBlogId(blogId: number) {
        const stmt = `DELETE FROM blog_comments WHERE blog_id = ?;`
        try {
            await dao.run(stmt, [blogId]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    static async deleteComment(id: number) {
        const stmt = `DELETE FROM blog_comments WHERE id = ?;`
        try {
            await dao.run(stmt, [id]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}
