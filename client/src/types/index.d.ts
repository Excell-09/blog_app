export interface ResponseJson<T> {
  message: string;
  success: boolean;
  data: T;
}

export interface UserBody {
  username: string;
  password: string;
}

export interface BlogBody {
  title: string;
  banner: string;
  article: string;
}

export interface Blog {
  id: string;
  title: string;
  banner: string;
  article: string;
  author: User;
  Comment: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  comment: string;
  blog: Blog;
  author: User;
}

export interface User {
  username: string;
}
