import { Handler } from "express";
import ResponseJson from "../utility/ResponseJson";
import * as yup from "yup";
import prisma from "../lib/prisma";

const commentBody = yup.object().shape({
  comment: yup.string().required(),
});

const blogIdParams = yup.object().shape({
  blogId: yup.string().required(),
});

const commentIdParams = yup.object().shape({
  id: yup.string().required(),
});

const createComment: Handler = async (req, res, next) => {
  try {
    const { comment } = await commentBody.validate(req.body);

    const { blogId } = await blogIdParams.validate(req.params);

    await prisma.blog.update({
      where: { id: blogId },
      data: {
        Comment: { create: { comment, author: { connect: req.user } } },
      },
    });

    return res.status(200).json(new ResponseJson(true, "comment Created", {}));
  } catch (error) {
    return next(error);
  }
};

const updateComment: Handler = async (req, res, next) => {
  try {
    const { id } = await commentIdParams.validate(req.params);
    const { comment } = await commentBody.validate(req.body);

    await prisma.comment.update({
      where: { id },
      data: { comment },
    });

    return res.status(200).json(new ResponseJson(true, "Success", {}));
  } catch (error) {
    return next(error);
  }
};

const deleteComment: Handler = async (req, res, next) => {
  try {
    const { id } = await commentIdParams.validate(req.params);

    await prisma.comment.delete({ where: { id } });

    return res.status(204).json(new ResponseJson(true, "comemnt deleted", {}));
  } catch (error) {
    return next(error);
  }
};

export { createComment, updateComment, deleteComment };
