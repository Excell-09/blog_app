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

export interface User {
  username: string;
  password: string;
}
