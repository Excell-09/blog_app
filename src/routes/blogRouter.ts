import { Router } from "express";
import upload from "../config/multer";
import { uploadBanner } from "../controllers/blog";

const router = Router();

router.post("/upload/banner", upload.single("banner"), uploadBanner);

export default router;
