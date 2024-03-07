import { Handler } from "express";
import ResponseJson from "../utility/ResponseJson";

const uploadBanner: Handler = (req, res) => {
  return res.status(201).json(
    new ResponseJson(true, "banner uploaded", {
      url: `http://localhost:3000/static/${req.file?.filename}`,
    })
  );
};

export { uploadBanner };
