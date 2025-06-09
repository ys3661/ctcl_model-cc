import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calculator, BookOpen, Pill, InfoIcon, User, Mail, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          CTCL Risk Assessment Tool
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          A clinical decision support tool to help dermatologists identify patients at risk for cutaneous T-cell
          lymphoma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          <Link href="/calculator" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Risk Calculator</h2>
                  <p className="text-sm text-muted-foreground">Assess CTCL risk based on clinical features</p>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/information" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <InfoIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Information</h2>
                  <p className="text-sm text-muted-foreground">Learn about CTCL types and staging</p>
                </div>
                <ArrowRight className="h-4 w-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/treatments" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Treatments</h2>
                  <p className="text-sm text-muted-foreground">Overview of CTCL treatment approaches</p>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/resources" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Resources</h2>
                  <p className="text-sm text-muted-foreground">Guidelines, research, and referral networks</p>
                </div>
                <ArrowRight className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/about" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">About</h2>
                  <p className="text-sm text-muted-foreground">Learn about this tool and its development</p>
                </div>
                <ArrowRight className="h-4 w-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/feedback" className="w-full group">
            <Card className="w-full h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Contact Us</h2>
                  <p className="text-sm text-muted-foreground">Provide feedback or get support</p>
                </div>
                <ArrowRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
