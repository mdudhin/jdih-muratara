import {
  Peraturan,
  PeraturanSchema,
  peraturanSchema,
  NewPeraturan,
  Username,
} from "./type";

import {
  getPeraturan,
  createPeraturan,
  editPeraturan,
  getPeraturanId,
} from "./api";

export type { PeraturanSchema, Peraturan, NewPeraturan, Username };
export {
  peraturanSchema,
  getPeraturan,
  createPeraturan,
  editPeraturan,
  getPeraturanId,
};
