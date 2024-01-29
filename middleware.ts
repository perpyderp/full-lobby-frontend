export { default } from "next-auth/middleware"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

// export default withAuth(
//     function middleware(req) {
//         const { nextUrl } = req
//         const isLoggedIn = !!req.nextauth

//         const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//         const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//         const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    
//         if(isApiAuthRoute) return null
    
//         if(isAuthRoute) {
//             if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    
//             return null
//         }
    
//         if(!isLoggedIn && !isPublicRoute) return Response.redirect(new URL("/login", nextUrl))
    
//     }
// )


// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// }

export const config = {
    matcher: ["/settings"]
}