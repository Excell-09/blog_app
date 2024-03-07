class ResponseJson<T> {
  success: boolean;
  message: string;
  data: T;
  constructor(isSuccess: boolean, message: string, data: T) {
    this.success = isSuccess;
    this.message = message;
    this.data = data;
  }
}

export default ResponseJson