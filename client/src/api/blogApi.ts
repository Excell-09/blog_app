import { BlogBody, ResponseJson } from "@/types";
import { AppAxios } from "@/utility/AppAxios";
import { AxiosError } from "axios";
import * as Yup from "yup";

const blogBody = Yup.object().shape({
  title: Yup.string().required(),
  banner: Yup.string().required(),
  article: Yup.string().required(),
});

interface ResponseUploadBanner {
  url: string;
}

const uploadBanner = async (image: FileList | null) => {
  try {
    if (!image) {
      throw new Error("Images not found!");
    }
    const formData = new FormData();
    formData.append("banner", image[0]);

    const res = await AppAxios.post<ResponseJson<ResponseUploadBanner>>(
      "/api/upload/banner",
      formData
    );

    console.log(res);
    return res.data;
  } catch (error) {
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

const postBlog = async (data: BlogBody) => {
  try {
    const blogValidated = await blogBody.validate(data);
    const res = await AppAxios.post<ResponseJson<{}>>(
      "/api/blog",
      blogValidated
    );

    return res.data;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(error.message);
    }
    const errorResponse = error as AxiosError<ResponseJson<{}>>;
    throw new Error(errorResponse.response?.data.message);
  }
};

export { postBlog, uploadBanner };
