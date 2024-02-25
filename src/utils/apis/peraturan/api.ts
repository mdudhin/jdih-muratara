import { PeraturanSchema } from ".";
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

export const createPeraturan = async (body: PeraturanSchema) => {
  const formData: any = new FormData();
  console.log(body.file[0]);
  formData.append("jenis_peraturan", body.jenis_peraturan);
  formData.append("bentuk_peraturan", body.bentuk_peraturan);
  formData.append("judul", body.judul);
  formData.append("no_peraturan", body.no_peraturan);
  formData.append("tahun", body.tahun);
  formData.append("tmpt_penetapan", body.tmpt_penetapan);
  formData.append("tgl_penetapan", body.tgl_penetapan);
  formData.append("penandatanganan", body.penandatanganan);
  formData.append("tgl_penandatanganan", body.tgl_penandatanganan);
  formData.append("pemrakarsa", body.pemrakarsa);
  formData.append("sumber", body.sumber);
  formData.append("status", body.status);
  /* formData.append("note", body.note); */
  formData.append("file", body.file[0]);
  try {
    const response = await axiosWithConfig.post("api/data-hukum", formData);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
