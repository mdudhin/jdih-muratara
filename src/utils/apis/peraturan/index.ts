import {
  Peraturan,
  PeraturanSchema,
  peraturanSchema,
  NewPeraturan,
} from "./type";

import {
  getPeraturan,
  createPeraturan,
  editPeraturan,
  getPeraturanId,
} from "./api";

export type { PeraturanSchema, Peraturan, NewPeraturan };
export {
  peraturanSchema,
  getPeraturan,
  createPeraturan,
  editPeraturan,
  getPeraturanId,
};
