"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Calculator, BookOpen, Pill, FileText, InfoIcon } from "lucide-react"
import { SearchInput } from "@/components/search/search-input"

export function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on home page
  if (pathname === "/") return null

  return (
    <div className="border-b border-gray-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              CTCL Risk Assessment
            </span>
          </Link>
          <nav className="flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-medium transition-all hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/calculator"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-blue-50 rounded-lg ${
                pathname.includes("/calculator")
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </Link>
            <Link
              href="/information"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-purple-50 rounded-lg ${
                pathname.includes("/information")
                  ? "text-purple-600 bg-purple-50 font-semibold"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <InfoIcon className="mr-2 h-4 w-4" />
              <span>Information</span>
            </Link>
            <Link
              href="/resources"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-teal-50 rounded-lg ${
                pathname.includes("/resources")
                  ? "text-teal-600 bg-teal-50 font-semibold"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Resources</span>
            </Link>
            <Link
              href="/treatments"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-orange-50 rounded-lg ${
                pathname.includes("/treatments")
                  ? "text-orange-600 bg-orange-50 font-semibold"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              <Pill className="mr-2 h-4 w-4" />
              <span>Treatments</span>
            </Link>
            <Link
              href="/about"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-gray-50 rounded-lg ${
                pathname.includes("/about")
                  ? "text-gray-900 bg-gray-100 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>About</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full md:w-auto md:flex-none">
            <SearchInput className="w-full md:w-[250px] lg:w-[350px]" />
          </div>
          <div className="flex md:hidden">
            <Button variant="outline" asChild className="ml-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
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
