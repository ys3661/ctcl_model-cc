import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Pill, CheckCircle, HelpCircle, AlertCircle } from "lucide-react"

export default function BiopsyResults() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/next-steps">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Next Steps
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Biopsy Results</h1>
        <p className="text-lg mb-8">Select the appropriate biopsy result:</p>

        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/non-suspicious-result" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full border-green-200">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-4 text-green-500">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Not suspicious for CTCL</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Biopsy shows no evidence of atypical lymphocytes or other features consistent with CTCL.
                </p>
                <ul className="text-xs text-left text-muted-foreground space-y-2">
                  <li>
                    <span className="font-medium">Histology:</span> Normal or inflammatory dermatosis
                  </li>
                  <li>
                    <span className="font-medium">Immunohistochemistry:</span> No aberrant T-cell populations
                  </li>
                  <li>
                    <span className="font-medium">Next steps:</span> Consider alternative diagnoses if symptoms persist
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/specialist-referral" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full border-amber-200">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-4 text-amber-500">
                  <HelpCircle className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Unequivocal</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Biopsy shows concerning features but lacks definitive criteria for CTCL diagnosis.
                </p>
                <ul className="text-xs text-left text-muted-foreground space-y-2">
                  <li>
                    <span className="font-medium">Histology:</span> Atypical lymphocytic infiltrate
                  </li>
                  <li>
                    <span className="font-medium">Immunohistochemistry:</span> Possible T-cell predominance
                  </li>
                  <li>
                    <span className="font-medium">Next steps:</span> Specialist referral, possible rebiopsy or clonality
                    studies
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/diagnostic-result" className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full border-red-200">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-4 text-red-500">
                  <AlertCircle className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Diagnostic of CTCL</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Biopsy shows definitive histopathological and immunophenotypic features of CTCL.
                </p>
                <ul className="text-xs text-left text-muted-foreground space-y-2">
                  <li>
                    <span className="font-medium">Histology:</span> Epidermotropic atypical lymphocytes, Pautrier
                    microabscesses
                  </li>
                  <li>
                    <span className="font-medium">Immunohistochemistry:</span> Aberrant T-cell phenotype, possible
                    clonality
                  </li>
                  <li>
                    <span className="font-medium">Next steps:</span> Urgent specialist referral, staging workup,
                    treatment planning
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Pill className="mr-2 h-5 w-5" /> Treatment Options
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            CTCL has many treatment options depending on the stage, type, and individual factors. Visit our
            comprehensive treatment page to learn about all available options.
          </p>
          <Link href="/treatments">
            <Button>View Treatment Options</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
