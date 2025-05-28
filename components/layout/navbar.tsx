"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Calculator, BookOpen, Pill, FileText, InfoIcon, ClipboardList, HelpCircle } from "lucide-react"
import { SearchInput } from "@/components/search/search-input"

export function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on home page
  if (pathname === "/") return null

  return (
    <div className="border-b">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">CTCL Risk Assessment Tool</span>
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
              <Home className="mr-1 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/calculator"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/calculator") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Calculator className="mr-1 h-4 w-4" />
              <span>Calculator</span>
            </Link>
            <Link
              href="/clinical-support"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/clinical-support") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              <span>Clinical Support</span>
            </Link>
            <Link
              href="/information"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/information") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <InfoIcon className="mr-1 h-4 w-4" />
              <span>Information</span>
            </Link>
            <Link
              href="/documentation"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/documentation") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <ClipboardList className="mr-1 h-4 w-4" />
              <span>Documentation</span>
            </Link>
            <Link
              href="/resources"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/resources") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              <span>Resources</span>
            </Link>
            <Link
              href="/treatments"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/treatments") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Pill className="mr-1 h-4 w-4" />
              <span>Treatments</span>
            </Link>
            <Link
              href="/about"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname.includes("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <FileText className="mr-1 h-4 w-4" />
              <span>About</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full md:w-auto md:flex-none">
            <SearchInput className="w-full md:w-[200px] lg:w-[300px]" />
          </div>
          <div className="flex md:hidden">
            <Button variant="outline" asChild className="ml-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
