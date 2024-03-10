import { ResponseJson } from "@/types";
import { AppAxios } from "@/utility/AppAxios";
import { AxiosError } from "axios";

interface createCommentBody {
  blogId: string;
  commentText: string;
}

interface CommentParams {
  commentId: string;
}

interface CommentBody extends CommentParams {
  commentText: string;
}

const postComment = async (data: createCommentBody) => {
  try {
    const res = await AppAxios.post<ResponseJson<string>>(
      `/api/comment/${data.blogId}`,
      { comment: data.commentText }
    );
    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

const editComment = async (data: CommentBody) => {
  try {
    const res = await AppAxios.patch<ResponseJson<string>>(
      `/api/comment/${data.commentId}`,
      { comment: data.commentText }
    );
    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

const deleteComment = async (data: CommentParams) => {
  try {
    const res = await AppAxios.delete<ResponseJson<string>>(
      `/api/comment/${data.commentId}`
    );
    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export { postComment, editComment, deleteComment };
