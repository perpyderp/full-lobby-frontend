import type { Session, User } from "next-auth/";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        id: long,
        username: string | null,
        email?: string | null,
        firstName?: string | null,
        avatar?: string | null,
        authorities: [
            {
                roleId: 1 | 2,
                authority: "USER" | "ADMIN"
            }
        ]
        accessToken?: string | null,
    }
}

declare module "next-auth/" {
    interface Session {
        user: User,
    }
    interface User {
        id: long,
        username?: string | null,
        email?: string | null,
        firstName?: string | null,
        avatar?: string | null,
        authorities: [
            {
                roleId: 1 | 2,
                authority: "USER" | "ADMIN"
            }
        ]
        accessToken?: string | null,
    }
}