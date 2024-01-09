import * as z from "zod"

export const LoginSchema = z.object({
    username: z
        .string()
        .min(5, { message: "Username must be longer than 5 characters"})
        .max(50),
    password: z
        .string()
        .min(8, { message: "Password must be longer than 8 characters"})
        .regex(/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}/)
})