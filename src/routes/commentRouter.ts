import { Router } from "express";
import authentication from "../middleware/authentication";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentControllers";

const router = Router();

router.post("/comment/:blogId", authentication(), createComment);
router.patch("/comment/:id", authentication(), updateComment);
router.delete("/comment/:id", authentication(), deleteComment);

export default router;
