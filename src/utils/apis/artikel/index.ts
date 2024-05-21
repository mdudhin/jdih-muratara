import { ArtikelSchema, artikelSchema } from "./type";
import {
  createArtikel,
  deleteArtikel,
  editArtikel,
  getArtikel,
  getArtikelId,
} from "./api";

export {
  getArtikel,
  artikelSchema,
  createArtikel,
  getArtikelId,
  editArtikel,
  deleteArtikel,
};
export type { ArtikelSchema };
