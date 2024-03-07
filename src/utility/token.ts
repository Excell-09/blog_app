import jwt from "jsonwebtoken";
import { opts } from "../controllers/authenticationControllers";

function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, opts.secretOrKey, {
    expiresIn: "15s",
  });
}

function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, opts.secretOrKey, {
    expiresIn: "30s",
  });
}

export { generateAccessToken, generateRefreshToken };
