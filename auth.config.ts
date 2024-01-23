import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

import { LoginSchema } from "./schemas"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)

                if(validatedFields.success) {
                    const { username, password } = validatedFields.data

                    const res = await fetch("http://localhost:8080/api/auth/login", {
                        method: 'POST',
                        body: JSON.stringify({username, password}),
                        headers: { "Content-Type": "application/json" }
                    })
                    const user = await res.json()
                    // console.log(user);
                    if (res.ok && user.user != null) {
                        return {
                            ...user.user,
                            accessToken: user.token
                        }
                    }

                    return null
                }
            }
        })
    ],
} satisfies NextAuthConfig