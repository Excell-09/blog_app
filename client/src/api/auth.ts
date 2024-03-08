import { ResponseJson, User } from "@/types";
import { AppAxios } from "@/utility/AppAxios";
import { AxiosError } from "axios";
import * as Yup from "yup";

const userBody = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const register = async (user: User) => {
  try {
    const userValidated = await userBody.validate(user);
    const res = await AppAxios.post<ResponseJson<User>>(
      "/auth/register",
      userValidated
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

const login = async (user: User) => {
  try {
    const userValidated = await userBody.validate(user);
    const res = await AppAxios.post<ResponseJson<User>>(
      "/auth/login",
      userValidated
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

export { register, login };
