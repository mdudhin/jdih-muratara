import axiosWithConfig from "../axiosWithConfig";

import { ProfileSchema } from "./type";

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const response = await axiosWithConfig.put(`api/user/update`, body);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
