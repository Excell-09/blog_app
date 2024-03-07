import { Router } from "express";
import {
  login,
  refreshToken,
  register,
  handleGoogleAuthCallback,
  redirectToGoogleAuth,
} from "../controllers/authenticationControllers";
import authentication from "../middleware/authentication";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", authentication(), refreshToken);

router.get("/google", redirectToGoogleAuth);

router.get("/google/callback", handleGoogleAuthCallback);

export default router;
