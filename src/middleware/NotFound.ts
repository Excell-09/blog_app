import { Handler } from "express";
import ResponseJson from "../utility/ResponseJson";

const notFound: Handler = (req, res) => {
  res.status(404).json(new ResponseJson(false, "Endpoint Not Found", {}));
};

export default notFound;
