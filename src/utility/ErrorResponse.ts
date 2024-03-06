class ErrorResponse {
  message: string;
  status: number;
  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }
}

export default ErrorResponse;
