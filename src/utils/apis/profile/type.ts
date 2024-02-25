import * as z from "zod";

export const profileSchema = z.object({
  username: z.string().min(1, { message: "Enter your username " }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
