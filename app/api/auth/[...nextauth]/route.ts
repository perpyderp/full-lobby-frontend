import CredentialsProvider from "next-auth/providers/credentials"

providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 
            accept: "*/*",
            "Content-Type": "application/json",
        }
      })
      const user = await res.json()

      if (res.ok && user) {
        return user
      }

      return null
    }
  })
]

export { handler as GET, handler as POST }