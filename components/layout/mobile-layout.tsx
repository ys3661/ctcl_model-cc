"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Calculator, HelpCircle, Info, ClipboardList, BookOpen, Pill, FileText, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { OfflineMode } from "@/components/mobile/offline-mode"

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Only render the mobile layout on mobile devices
  if (!isMobile) {
    return <>{children}</>
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/calculator", icon: Calculator, label: "Calculator" },
    { href: "/clinical-support", icon: HelpCircle, label: "Clinical Support" },
    { href: "/information", icon: Info, label: "Information" },
    { href: "/documentation", icon: ClipboardList, label: "Documentation" },
    { href: "/resources", icon: BookOpen, label: "Resources" },
    { href: "/treatments", icon: Pill, label: "Treatments" },
    { href: "/about", icon: FileText, label: "About" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-14 items-center">
          <div className="flex-1 text-center">
            <h1 className="text-base font-semibold">CTCL Risk Assessment</h1>
          </div>
          <div className="flex items-center">
            <Link href="/patients">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Patients</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-4 px-3">{children}</main>

      {/* Offline mode banner */}
      <OfflineMode />

      {/* Mobile bottom navigation */}
      <div className="sticky bottom-0 z-40 w-full border-t bg-background">
        <div className="container flex h-14 items-center justify-around">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Home className="h-5 w-5 mb-1" />
            Home
          </Link>
          <Link
            href="/calculator"
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              pathname === "/calculator" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Calculator className="h-5 w-5 mb-1" />
            Calculator
          </Link>
          <Link
            href="/clinical-support"
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              pathname === "/clinical-support" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <HelpCircle className="h-5 w-5 mb-1" />
            Support
          </Link>
          <Link
            href="/information"
            className={cn(
              "flex flex-col items-center justify-center text-xs",
              pathname === "/information" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Info className="h-5 w-5 mb-1" />
            Info
          </Link>
        </div>
      </div>
    </div>
  )
}
