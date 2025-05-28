import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, AlertCircle, CheckCircle, Calendar } from "lucide-react"

export default function NonSuspiciousResult() {
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

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start">
          <CheckCircle className="text-green-500 mr-3 h-5 w-5 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-green-800">Not Suspicious for CTCL</h2>
            <p className="text-sm text-green-700">
              The biopsy results do not show features consistent with Cutaneous T-Cell Lymphoma.
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Recommended Next Steps</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" /> Consider Alternative Diagnoses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                If the patient has persistent symptoms, consider other potential diagnoses such as:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Atopic dermatitis</li>
                <li>Psoriasis</li>
                <li>Contact dermatitis</li>
                <li>Drug eruption</li>
                <li>Pityriasis rosea</li>
                <li>Other inflammatory dermatoses</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Follow-up Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Even with a non-suspicious biopsy, clinical follow-up may be warranted in certain situations:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Schedule follow-up in 3-6 months if symptoms persist</li>
                <li>Consider repeat biopsy if clinical suspicion remains high despite negative results</li>
                <li>Document and photograph any persistent or changing lesions</li>
                <li>Consider patch testing if contact dermatitis is suspected</li>
              </ul>
              <div className="pt-4">
                <Link href="/calculator">
                  <Button variant="outline">Return to Risk Calculator</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
