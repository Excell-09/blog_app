import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utility/ErrorResponse";
import { ValidationError } from "yup";

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  const errorResponse = {
    error: {
      message: err.message,
    },
  };

  if (err instanceof ValidationError) {
    err.status = 400;
  }

  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  return res.status(err.status).json(errorResponse);
};

export default errorMiddleware;
