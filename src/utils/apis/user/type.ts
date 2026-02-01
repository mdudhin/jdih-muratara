import * as z from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "Enter your username " }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type UserSchema = z.infer<typeof userSchema>;
