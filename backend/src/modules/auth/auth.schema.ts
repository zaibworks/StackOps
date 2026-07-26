import {z} from "zod";

export const signupSchema = z.object({
  name: z.string().min(1,"Name in madatory in StackOps"),
    email: z.string().email("Invalid email"),
    password :z.string().min(6,"Password must be 6 characters")
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required")
})

export type SignupInput = z.infer<typeof signupSchema>;

export type LoginInput = z.infer<typeof loginSchema>;