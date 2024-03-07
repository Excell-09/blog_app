import { Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/authenticationControllers";
import authentication from "../middleware/authentication";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", authentication(), refreshToken);

export default router;
