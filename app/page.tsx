import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calculator, BookOpen, Pill, InfoIcon, ClipboardList, HelpCircle } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">CTCL Risk Assessment Tool</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          A clinical decision support tool to help dermatologists identify patients at risk for cutaneous T-cell
          lymphoma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          <Link href="/calculator" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <Calculator className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Risk Calculator</h2>
                <p className="text-sm text-muted-foreground">Assess CTCL risk based on clinical features</p>
              </div>
            </Button>
          </Link>

          <Link href="/clinical-support" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <HelpCircle className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Clinical Support</h2>
                <p className="text-sm text-muted-foreground">Staging tool and referral guide</p>
              </div>
            </Button>
          </Link>

          <Link href="/information" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <InfoIcon className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Information</h2>
                <p className="text-sm text-muted-foreground">Learn about CTCL types and presentations</p>
              </div>
            </Button>
          </Link>

          <Link href="/documentation" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <ClipboardList className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Documentation</h2>
                <p className="text-sm text-muted-foreground">Templates and clinical note examples</p>
              </div>
            </Button>
          </Link>

          <Link href="/resources" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <BookOpen className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Resources</h2>
                <p className="text-sm text-muted-foreground">Guidelines, research, and referral networks</p>
              </div>
            </Button>
          </Link>

          <Link href="/treatments" className="w-full">
            <Button
              variant="outline"
              className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <Pill className="h-8 w-8" />
              <div>
                <h2 className="text-lg font-medium">Treatments</h2>
                <p className="text-sm text-muted-foreground">Overview of CTCL treatment approaches</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CTCL Risk Assessment Tool. All rights reserved.
          </p>
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
