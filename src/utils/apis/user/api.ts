import { UserSchema } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const updateProfile = async (id: string, body: UserSchema) => {
  try {
    const array = body.password.split("");

    const encrypt = array.map((item, i) =>
      i % 2 === 0 ? `${item}#$` : `*!${item}`
    );

    const joinEncrypt = encrypt.join("");

    const payload = {
      ...body,
      password: `^*&!${joinEncrypt}=+(&&)`,
    };
    const response = await axiosWithConfig.put(
      `api/user/update/${id}`,
      payload
    );
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const registerUser = async (body: UserSchema) => {
  try {
    const array = body.password.split("");

    const encrypt = array.map((item, i) =>
      i % 2 === 0 ? `${item}#$` : `*!${item}`
    );

    const joinEncrypt = encrypt.join("");

    const payload = {
      ...body,
      password: `^*&!${joinEncrypt}=+(&&)`,
    };

    const response = await axiosWithConfig.post(`api/user/register/`, payload);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};
