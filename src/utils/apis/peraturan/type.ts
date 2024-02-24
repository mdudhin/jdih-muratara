import * as z from "zod";

const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const peraturanSchema = z.object({
  jenis_peraturan: z.string().min(1, "Jenis peraturan is required"),
  bentuk_peraturan: z.string(),
  judul: z.string().min(1, "Judul is required"),
  no_peraturan: z.string().min(1, "Nomor peraturan is required"),
  tahun: z.string().min(1, "Tahun is required"),
  tmpt_penetapan: z.string(),
  tgl_penetapan: z.string().min(1, "Tanggal penetapan is required"),
  penandatanganan: z.string(),
  tgl_penandatanganan: z.string(),
  pemrakarsa: z.string(),
  sumber: z.string(),
  status: z.string().min(1, "Status is required"),
  /* note: z.string().optional(), */
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
