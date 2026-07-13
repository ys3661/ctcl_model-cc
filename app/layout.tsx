import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { MobileLayout } from "@/components/layout/mobile-layout"
import { SearchProvider } from "@/context/search-context"
import { PwaRegister } from "@/components/pwa-register"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CTCL Insight",
  description: "A comprehensive tool for dermatologists to assess CTCL risk",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "CTCL Insight", statusBarStyle: "default" },
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
        <PwaRegister />
      </body>
    </html>
  )
}
