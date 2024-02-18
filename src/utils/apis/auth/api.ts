import { LoginSchema } from ".";
import { RegisterSchema } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const postLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`api/user/login`, body);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const postRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`api/user/register`, body);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
