import * as z from "zod"

export const LoginSchema = z.object({
    username: z
        .string()
        .min(1, { message: "Username is required"})
        .max(50),
    password: z
        .string()
        .min(1, { message: "Password is required"})
})

export const registerSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be longer than 2 characters"})
        .max(50),
    email: z
        .string()
        .min(2, { message: "Email is required" })
        .email("Not a valid email"),
    password: z
        .string()
        .min(8, { message: "Password must be longer than 8 characters"})
})

export const settingsFormSchema = z.object({
    firstName: z
        .string()
        .min(0)
        .max(20)
        .optional(),
    lastName: z
        .string()
        .min(0)
        .max(20)
        .optional(),
    dob: z
        .date()
        .optional(),
    username: z
        .string()
        .min(0)
        .max(50)
        .optional(),
    email: z
        .string()
        .min(0)
        .optional(),
    password: z
        .string()
        .min(0)
        .optional(),
})