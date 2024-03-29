import { Router } from "express";
import upload from "../config/multer";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  uploadBanner,
} from "../controllers/blog";
import authentication from "../middleware/authentication";

const router = Router();

router.post(
  "/upload/banner",
  authentication(),
  upload.single("banner"),
  uploadBanner
);

router.post("/blog", authentication(), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlog);

export default router;
