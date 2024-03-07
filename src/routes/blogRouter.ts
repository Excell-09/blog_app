import { Router } from "express";
import upload from "../config/multer";
import { uploadBanner } from "../controllers/blog";
import authentication from "../middleware/authentication";

const router = Router();

router.post(
  "/upload/banner",
  authentication(),
  upload.single("banner"),
  uploadBanner
);

export default router;
