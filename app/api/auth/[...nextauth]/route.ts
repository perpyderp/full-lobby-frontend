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


                if (res.ok && user.id !== "") {
                    return user;
                }

                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }