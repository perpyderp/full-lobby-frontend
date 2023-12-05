import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/navbar'

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'

import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Lobby',
  description: 'Socialize, review, and share gaming experiences',
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode,
  session: JSX.Element
}) {
  return (
      <html lang="en">
          <SessionProvider session={session}>
   
          <body className={(cn("relative h-full"), inter.className)}>
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
          </body>
        </SessionProvider>
      </html>
  )
}