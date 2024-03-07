import multer from "multer";
import path from "path";
import ErrorResponse from "../utility/ErrorResponse";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "/uploads/banner/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ErrorResponse("Please upload a valid image file", 400));
    }
    cb(null, true);
  },
});

export default upload;
