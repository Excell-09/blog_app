import { Handler } from "express";
import ErrorResponse from "../utility/ErrorResponse";

const notFound: Handler = (req, res) => {
  res.status(404).json(new ErrorResponse("Endpoint Not Found", 404));
};

export default notFound;
