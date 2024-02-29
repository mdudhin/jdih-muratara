import axiosWithConfig from "../axiosWithConfig";

import { UserSchema } from "./type";

export const updateProfile = async (id: string, body: UserSchema) => {
  try {
    const response = await axiosWithConfig.put(`api/user/update/${id}`, body);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const registerUser = async (body: UserSchema) => {
  try {
    const response = await axiosWithConfig.post(`api/user/register/`, body);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};
