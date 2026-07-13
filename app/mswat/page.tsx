import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MswatCalculator } from "@/components/mswat-calculator"

export const metadata = {
  title: "mSWAT / BSA Calculator | CTCL Insight",
  description: "Modified Severity-Weighted Assessment Tool and body-surface-area calculator for MF/SS skin burden.",
}

export default function MswatPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">mSWAT / BSA Calculator</h1>
          <p className="text-muted-foreground mt-1">
            Quantify skin burden at diagnosis and track response at follow-up visits.
          </p>
        </div>

        <MswatCalculator />
      </div>
    </main>
  )
}
