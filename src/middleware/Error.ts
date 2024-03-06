import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utility/ErrorResponse";

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  return res
    .status(err.status)
    .json(new ErrorResponse(err.message, err.status));
};

export default errorMiddleware;
