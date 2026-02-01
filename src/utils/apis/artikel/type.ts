import * as z from "zod";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const baseArtikelSchema = z.object({
  judul: z.string().min(1, "Judul is required"),
  deskripsi: z.string().min(1, "Deskripsi is required"),
});

export const createArtikelSchema = z
  .object({
    mode: z.literal("create"),
    file: z
      .any()
      .refine((file) => file?.length == 1, "Image file is required.")
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.[0]?.type),
        "Only JPEG, PNG, and GIF formats are supported"
      )
      .optional(),
  })
  .merge(baseArtikelSchema);

export const editArtikelSchema = z
  .object({
    mode: z.literal("edit"),
    file: z
      .any()
      .refine(
        (file) =>
          !file[0] ||
          file[0].type === "" ||
          ACCEPTED_FILE_TYPES.includes(file?.[0]?.type),
        "Only JPEG, PNG, and GIF formats are supported"
      )
      .optional(),
  })
  .merge(baseArtikelSchema);

export const artikelSchema = z.discriminatedUnion("mode", [
  createArtikelSchema,
  editArtikelSchema,
]);
export type ArtikelSchema = z.infer<typeof artikelSchema>;
