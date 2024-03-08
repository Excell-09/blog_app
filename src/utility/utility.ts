import { Response } from "express";

const attackCookie = (res: Response, accessToken: string) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

export default attackCookie;
