
export default class {
  constructor(blog_id: number, user_id: number, content: string) {
      this.blog_id = blog_id;
      this.user_id = user_id;
      this.content = content;
  }

  id!: number;
  blog_id!: number;
  user_id!: number;
  content!: string;
}