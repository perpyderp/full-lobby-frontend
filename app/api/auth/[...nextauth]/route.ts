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
                const userInfo = user.user;
                // console.log(user);
                if (res.ok && user.id !== "") {
                    return {
                        id: userInfo.id,
                        username: userInfo.username,
                        email: userInfo.email,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        dob: userInfo.dob,
                        bio: userInfo.bio,
                        nickname: userInfo.nickname,
                        avatar: userInfo.avatar,
                        banner: userInfo.banner,
                        verified: userInfo.verified,
                        authorities: userInfo.authorities,
                        accessToken: userInfo.token,
                    };
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
          if(token) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.avatar = token.avatar;
            session.user.username = token.username;
            session.user.accessToken = token.accessToken;

          }
          return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }