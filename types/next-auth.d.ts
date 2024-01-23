import type NextAuth from "next-auth/";
import type { JWT } from "next-auth/jwt";
import type { Image } from "@/types/index"

declare module "test/" {
    interface Session {
        user: {
            id: number,
            username: string,
            email: string,
            firstName?: string | null,
            lastName?: string | null,
            dob?: string | null,
            bio?: string | null,
            nickname?: string | null,
            avatar?: Avatar | null,
            banner?: Avatar | null,
            verified: Boolean,
            accessToken: string
        }
    }
    interface User {
        id: number,
        username: string,
        email: string,
        firstName?: string | null,
        lastName?: string | null,
        dob?: string | null,
        bio?: string | null,
        nickname?: string | null,
        avatar?: Avatar | null,
        banner?: Avatar | null,
        verified: Boolean,
        authorities?: [
            {
                roleId: number,
                authority: string
            }
        ]
        accessToken: string
    }
}