import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"

import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"
import AuthProvider from "./Provider"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/Toaster"
import { inter, silkscreen } from "./font"

export const metadata: Metadata = {
    title: "Full Lobby",
    description: "Socialize, review, and share gaming experiences",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={(cn("relative h-full"), inter.className)}>
                <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar/>
                    <main>
                    {children}
                    </main>
                </ThemeProvider>
                </AuthProvider>
                <Toaster />
                <SpeedInsights />
            </body>
        </html>
    )
}