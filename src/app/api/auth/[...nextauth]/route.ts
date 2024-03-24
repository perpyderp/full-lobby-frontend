import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string,
                    password: string
                }
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
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user, session }) {
            // console.log("JWT Callback: " + JSON.stringify({token, user, session}, null, 2))

            if(token.username) {
                const res = await fetch(`http://localhost:8080/api/user/${token.username}`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                })
    
                const userData = await res.json()

                return {
                    ...token,
                    ...userData
                };
            }


            // user only exists on sign-in
            if(user) {
                return {
                    ...token,
                    ...user
                }
            }
            return {
                ...token,
                
            }
        },
        async session({ session, user, token }) {
            // console.log("Session Callback: " + JSON.stringify({token, user, session}, null, 2) )

            /*
                token contains all the user information we need, we can pass whatever we want to the session in the return statement.
            */ 
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    dob: token.dob,
                    bio: token.bio,
                    nickname: token.nickname,
                    avatar: token.avatar,
                    banner: token.banner,
                    verified: token.verified,
                    accessToken: token.accessToken
                }
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }