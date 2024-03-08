import { Handler, Request } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import * as yup from "yup";
import { Prisma, User } from "@prisma/client";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import ErrorResponse from "../utility/ErrorResponse";
import { generateAccessToken } from "../utility/token";
import ResponseJson from "../utility/ResponseJson";
import AUTHCONFIG from "../config/auth";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import attackCookie from "../utility/utility";

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

const cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

export const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: AUTHCONFIG.secretKey,
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

passport.use(
  new GoogleStrategy(
    {
      clientID: AUTHCONFIG.googleClientId,
      clientSecret: AUTHCONFIG.googleClientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await prisma.user.findUnique({
          where: { username: profile.displayName },
        });

        if (!user) {
          user = await prisma.user.create({
            data: { username: profile.displayName, password: "" },
          });
        }

        return cb(null, user);
      } catch (error) {
        return cb(error as Error);
      }
    }
  )
);

export const login: Handler = async (req, res, next) => {
  try {
    await userRequestBody.validate(req.body);

    passport.authenticate("local", (err: Error, user: User) => {
      if (err) {
        return next(new ErrorResponse(err.message, 401));
      }

      const accessToken = generateAccessToken(user.id);

      attackCookie(res, accessToken);

      return res.status(200).json(
        new ResponseJson(true, "User logged in successfully", {
          user: {
            ...user,
            password: undefined,
          },
        })
      );
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export const refreshToken: Handler = async (req, res, next) => {
  return res.status(200).json(
    new ResponseJson(true, "Token Refreshed successfully", {
      user: {
        ...req.user,
        password: undefined,
      },
    })
  );
};

export const redirectToGoogleAuth: Handler = async (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })(req, res, next);
};

export const handleGoogleAuthCallback: Handler = async (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/register",
      session: false,
    },
    (err: Error, user: User) => {
      const accessToken = generateAccessToken(user.id);

      attackCookie(res, accessToken);
      return res.redirect("http://localhost:5173");
    }
  )(req, res, next);
};

export { passport };
