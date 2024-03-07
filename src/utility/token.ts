import jwt from "jsonwebtoken";
import { opts } from "../controllers/authenticationControllers";
import AUTHCONFIG from "../config/auth";

function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, opts.secretOrKey, {
    expiresIn: AUTHCONFIG.expired_access_token,
  });
}

export { generateAccessToken };
