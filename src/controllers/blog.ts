import { Handler } from "express";
import ResponseJson from "../utility/ResponseJson";
import * as yup from "yup";
import prisma from "../lib/prisma";
import { opts } from "./authenticationControllers";
import AUTHCONFIG from "../config/auth";

const blogBody = yup.object().shape({
  title: yup.string().required(),
  article: yup.string().required(),
  banner: yup.string().required(),
});

const idBlogParams = yup.object().shape({
  id: yup.string().required(),
});

const uploadBanner: Handler = (req, res) => {
  return res.status(201).json(
    new ResponseJson(true, "banner uploaded", {
      url: `${AUTHCONFIG.backendUrl}/static/${req.file?.filename}`,
    })
  );
};

const createBlog: Handler = async (req, res, next) => {
  try {
    const { article, banner, title } = await blogBody.validate(req.body);

    await prisma.blog.create({
      data: { article, banner, title, author: { connect: req.user } },
    });

    return res.status(200).json(new ResponseJson(true, "Blog Created", {}));
  } catch (error) {
    return next(error);
  }
};

const getAllBlogs: Handler = async (req, res, next) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: true, Comment: true },
    });

    return res.status(200).json(
      new ResponseJson(true, "Success", {
        blogs,
      })
    );
  } catch (error) {
    return next(error);
  }
};
const getBlog: Handler = async (req, res, next) => {
  try {
    const { id } = await idBlogParams.validate(req.params);

    const blog = await prisma.blog.findUniqueOrThrow({
      where: { id },
      include: {
        Comment: {
          include: { author: { select: { id: true, username: true } } },
        },
        author: true,
      },
    });

    return res.status(200).json(
      new ResponseJson(true, "Success", {
        blog,
      })
    );
  } catch (error) {
    return next(error);
  }
};

export { uploadBanner, createBlog, getAllBlogs, getBlog };
