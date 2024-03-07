import { Handler } from "express";
import ResponseJson from "../utility/ResponseJson";

const uploadBanner: Handler = (req, res) => {
  return res.status(201).json(new ResponseJson(true, "banner uploaded", {}));
};

export {uploadBanner}