"use server"

import { registerSchema } from "@/schemas"
import next from "next"
import { cache } from "react"
import * as z from "zod"

export const register = async(values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Invalid fields!" }
    }

    const {username, email } = validatedFields.data

    const emailTaken = await fetch(`${process.env.BACKEND_BASE_URL}/api/user/exists/email/${email}`)

    if(await emailTaken.json()) return { error: "Email is already in use!" }

    const usernameTaken = await fetch(`${process.env.BACKEND_BASE_URL}/api/user/exists/username/${username}`)

    if(await usernameTaken.json()) return { error: "Username is already in use!" }

    try {
        await fetch(`${process.env.BACKEND_BASE_URL}/api/auth/register`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch(error) {
        console.log(error)
        return { error: "Something went wrong!" }
    }


    return { success: "Registration successful! Redirecting in 5 seconds" }
}