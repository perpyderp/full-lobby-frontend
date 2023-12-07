import NextAuth from "next-auth/";

declare module "next-auth" {
    interface Session {
        user: {
            info: {
                id: long,
                username: string,
                email: string,
                firstName: string,
                lastName: string,
                dob: string,
                bio: string,
                nickname: string,
                avatar: string,
                banner: string,
                verified: Boolean,
                authorities: [
                    {
                        roleId: 1 | 2,
                        authority: "USER" | "ADMIN"
                    }
                ]
            },
            token: string,
        }
    }
}