export interface ResponseJson<T> {
  message: string;
  success: boolean;
  data: T;
}

export interface UserBody {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
}
