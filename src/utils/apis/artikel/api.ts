import { ArtikelSchema } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const getArtikel = async () => {
  try {
    const response = await axiosWithConfig.get(`api/data-artikel/all-data`);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const createArtikel = async (body: ArtikelSchema) => {
  const formData: any = new FormData();
  formData.append("judul", body.judul);
  formData.append("deskripsi", body.deskripsi);
  formData.append("file", body.file[0]);
  try {
    const response = await axiosWithConfig.post("api/data-artikel", formData);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editArtikel = async (id: string, body: ArtikelSchema) => {
  const formData: any = new FormData();
  formData.append("judul", body.judul);
  formData.append("deskripsi", body.deskripsi);
  if (body.file[0]) {
    formData.append("file", body.file[0]);
  }

  try {
    const response = await axiosWithConfig.put(
      `api/data-artikel/${id}`,
      formData
    );
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getArtikelId = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/api/data-artikel/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteArtikel = async (id: string) => {
  try {
    const response = await axiosWithConfig.delete(`api/data-artikel/${id}`);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
