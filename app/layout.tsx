import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { MobileLayout } from "@/components/layout/mobile-layout"
import { SearchProvider } from "@/context/search-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CTCL Risk Assessment Tool",
  description: "A comprehensive tool for dermatologists to assess CTCL risk",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SearchProvider>
            <Suspense>
              <MobileLayout>
                <Navbar />
                {children}
              </MobileLayout>
            </Suspense>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
