import * as z from "zod";

const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const peraturanSchema = z.object({
  jenisPeraturan: z.string().min(1, "Jenis peraturan is required"),
  bentukPeraturan: z.string(),
  judul: z.string().min(1, "Judul is required"),
  nomorPeraturan: z.string().min(1, "Nomor peraturan is required"),
  tahun: z.string().min(1, "Tahun is required"),
  tempatPenetapan: z.string(),
  tanggalPenetapan: z.string().min(1, "Tanggal penetapan is required"),
  penandatanganan: z.string(),
  tanggalPengundangan: z.string(),
  pemrakarsa: z.string(),
  sumber: z.string(),
  status: z.string().min(1, "Status is required"),
  note: z.string(),
  file: z
    .any()
    .refine((file) => file?.length == 1, "PDF is required.")
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file?.[0]?.type),
      "Only .pdf formats are supported"
    )
    .refine((file) => file[0]?.size <= 10000000, `Max PDF size is 10MB`)
    .optional()
    .or(z.literal("")),
});

export type PeraturanSchema = z.infer<typeof peraturanSchema>;

export interface Peraturan {
  id: string;
  jenis_peraturan: string;
  bentuk_peraturan: string;
  judul: string;
  no_peraturan: string;
  tahun: string;
  tmpt_penetapan: string;
  tgl_penetapan: string;
  penandatanganan: string;
  tgl_penandatanganan: string;
  pemrakarsa: string;
  sumber: string;
  status: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}
