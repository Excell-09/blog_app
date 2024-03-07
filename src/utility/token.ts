import jwt from "jsonwebtoken";
import { opts } from "../controllers/authenticationControllers";

function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, opts.secretOrKey, {
    expiresIn: "1m",
  });
}

export { generateAccessToken };
