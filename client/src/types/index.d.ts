export interface ResponseJson<T> {
  message: string;
  success: boolean;
  data: T;
}


export interface User {
  username: string;
  password: string;
}
