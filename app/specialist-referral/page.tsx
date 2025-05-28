import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function SpecialistReferralPage() {
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

        <h1 className="text-3xl font-bold mb-4">CTCL Specialist Referral</h1>
        <p className="text-lg mb-8">
          For patients with suspicious biopsy results, referral to a specialist with expertise in cutaneous lymphomas is
          recommended.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Why Refer to a Specialist?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                CTCL is a rare condition that requires specialized expertise for accurate diagnosis and optimal
                management. Early referral to a specialist can lead to:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>More accurate diagnosis through specialized testing</li>
                <li>Appropriate staging and risk assessment</li>
                <li>Access to the latest treatment options</li>
                <li>Opportunity to participate in clinical trials</li>
                <li>Multidisciplinary care approach</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>When to Refer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Consider referral to a CTCL specialist in the following situations:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Biopsy suspicious for or diagnostic of CTCL</li>
                <li>Persistent, unexplained patches or plaques</li>
                <li>Recalcitrant dermatitis unresponsive to standard treatments</li>
                <li>Erythroderma of unknown cause</li>
                <li>Suspected disease progression in known CTCL</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Find a CTCL Specialist</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cutaneous Lymphoma Foundation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The CLF maintains a directory of specialists experienced in treating cutaneous lymphomas.
              </p>
              <a
                href="https://www.clfoundation.org/find-a-physician"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Find a Physician <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Academic Medical Centers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Many academic medical centers have specialized clinics for cutaneous lymphomas.
              </p>
              <a
                href="https://www.aamc.org/about-aamc/aamc-member-medical-schools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Find Academic Medical Centers <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">NCCN Cancer Centers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                NCCN-designated cancer centers often have dermatologic oncology programs.
              </p>
              <a
                href="https://www.nccn.org/home/member-institutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Find NCCN Cancer Centers <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/clinical-support">
            <Button>Go to CTCL Staging Tool</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
