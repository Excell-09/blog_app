import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utility/ErrorResponse";
import { ValidationError } from "yup";
import ResponseJson from "../utility/ResponseJson";

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  console.log(err)
  if (err instanceof ValidationError) {
    err.status = 400;
  }

  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  return res.status(err.status).json(new ResponseJson(false, err.message, {}));
};

export default errorMiddleware;
