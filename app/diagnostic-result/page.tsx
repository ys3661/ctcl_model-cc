import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function DiagnosticResult() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/biopsy-results">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Biopsy Results
            </Button>
          </Link>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start">
          <AlertCircle className="text-red-500 mr-3 h-5 w-5 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-red-800">Definitive Diagnosis of CTCL</h2>
            <p className="text-sm text-red-700">
              The biopsy results show definitive features of Cutaneous T-Cell Lymphoma.
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Recommended Next Steps</h1>

        <p className="text-lg text-muted-foreground mb-8">
          An equivocal biopsy result requires careful follow-up and specialist consultation to determine the best course
          of action.
        </p>

        <div className="mt-8">
          <Link href="/resources">
            <Button>View Resources & Specialists</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
