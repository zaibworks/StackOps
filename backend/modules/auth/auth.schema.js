import {email, z} from "zod";

export const signupSchema = z.object({
    email: z.string().email("Invalid email"),
    password :z.string({
  required_error: "Password is required",
  invalid_type_error: "Password should contain Numbers and letters"
}).min(6, "Password must be at least 6 characters long"),
    name: z.string().optional()
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required")
})