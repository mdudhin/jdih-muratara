import axiosWithConfig from "../axiosWithConfig";

export const getPeraturan = async (searchBy?: string, search?: number) => {
  try {
    const response = await axiosWithConfig.get(
      `api/data-hukum/all-data?searchBy=${searchBy || ""}&search=${
        search || ""
      }`
    );

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
