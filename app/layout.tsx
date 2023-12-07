import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/navbar'

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'
import AuthProvider from './Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Lobby',
  description: 'Socialize, review, and share gaming experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
      <html lang="en">
          <body className={(cn("relative h-full"), inter.className)}>
            <AuthProvider >
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
          </body>
      </html>
  )
}