import { Handler } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import * as yup from "yup";
import { Prisma, User } from "@prisma/client";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utility/ErrorResponse";

const userRequestBody = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const register: Handler = async (req, res, next) => {
  try {
    const userValidated = await userRequestBody.validate(req.body);

    const hashedPassword = await bcrypt.hash(userValidated.password, 10);

    await prisma.user.create({
      data: {
        username: userValidated.username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "user created" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        error.message = "Account already exists";
        (error as any).status = 409;
      }
    }
    return next(error);
  }
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new LocalStrategy(async function (username: string, password: string, done) {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { username: username },
      });

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return done(new Error("No User Found"), false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });

      if (!user) {
        return done(new Error("No User Found"), false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export const login: Handler = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: User) => {
      if (err) {
        return next(new ErrorResponse(err.message, 401));
      }
      const token = jwt.sign({ id: user.id }, opts.secretOrKey, {
        expiresIn: "1d",
      });
      return res.status(200).json({ token });
    }
  )(req, res, next);
};

export { passport };
