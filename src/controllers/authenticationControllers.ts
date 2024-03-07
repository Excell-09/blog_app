import { Handler } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import * as yup from "yup";
import { Prisma, User } from "@prisma/client";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import ErrorResponse from "../utility/ErrorResponse";
import { generateAccessToken, generateRefreshToken } from "../utility/token";
import ResponseJson from "../utility/ResponseJson";

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

    return res.status(201).json(new ResponseJson(true, "user created", {}));
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return next(new ErrorResponse("Account already exists", 409));
      }
    }
    return next(error);
  }
};

export const opts = {
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
        throw new ErrorResponse("No User Found", 401);
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
        throw new ErrorResponse("No User Found", 401);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export const login: Handler = async (req, res, next) => {
  try {
    await userRequestBody.validate(req.body);

    passport.authenticate("local", (err: Error, user: User) => {
      if (err) {
        return next(new ErrorResponse(err.message, 401));
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      return res.status(200).json(
        new ResponseJson(true, "User logged in successfully", {
          user: {
            ...user,
            password: undefined,
          },
          accessToken,
          refreshToken,
        })
      );
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export { passport };
