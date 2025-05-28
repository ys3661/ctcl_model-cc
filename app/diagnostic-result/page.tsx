import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, AlertCircle, FileText, Stethoscope, Calendar } from "lucide-react"

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
            <h2 className="text-lg font-semibold text-red-800">Diagnostic of CTCL</h2>
            <p className="text-sm text-red-700">
              The biopsy results show definitive features of Cutaneous T-Cell Lymphoma.
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Critical Next Steps</h1>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" /> Immediate Specialist Referral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">A definitive CTCL diagnosis requires immediate referral to specialists:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Dermatologist with expertise in cutaneous lymphomas</li>
                <li>Hematologist-oncologist for comprehensive care</li>
                <li>Multidisciplinary team at a specialized center when possible</li>
              </ul>
              <div className="pt-4">
                <Link href="/specialist-referral">
                  <Button>Find CTCL Specialists</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Complete Staging Workup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Accurate staging is essential for treatment planning:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Complete skin examination with body mapping</li>
                <li>Blood tests including flow cytometry</li>
                <li>Imaging studies (CT, PET/CT) as appropriate</li>
                <li>Lymph node assessment and possible biopsy</li>
                <li>Bone marrow biopsy in selected cases</li>
              </ul>
              <div className="pt-4">
                <Link href="/clinical-support">
                  <Button>Go to Staging Tool</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Treatment Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Treatment depends on disease stage, type, and patient factors:</p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Early-stage: Skin-directed therapies (topical steroids, phototherapy, radiotherapy)</li>
              <li>Advanced-stage: Systemic therapies (retinoids, interferon, antibodies, chemotherapy)</li>
              <li>Consider clinical trials when appropriate</li>
              <li>Develop a long-term monitoring plan</li>
            </ul>
            <div className="pt-4">
              <Link href="/treatments">
                <Button>View Treatment Options</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
