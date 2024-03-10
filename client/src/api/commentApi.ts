import { ResponseJson } from "@/types";
import { AppAxios } from "@/utility/AppAxios";
import { AxiosError } from "axios";

interface CommentBody {
  blogId: string;
  commentText: string;
}

const postComment = async (data: CommentBody) => {
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

export { postComment };
