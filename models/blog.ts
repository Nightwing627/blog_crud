
export default class {
  constructor(title: string, content: string, user_id: number, publish: boolean) {
      this.title = title;
      this.content = content;
      this.user_id = user_id;
      this.publish = publish
  }

  id!: number;
  title!: string;
  content!: string;
  user_id!: number;
  publish!: boolean;
}