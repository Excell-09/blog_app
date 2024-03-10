import { Response } from "express";
import AUTHCONFIG from "../config/auth";

const attackCookie = (res: Response, accessToken: string) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: AUTHCONFIG.NodeEnv === "production" ? true : false,
  });
};

export default attackCookie;
