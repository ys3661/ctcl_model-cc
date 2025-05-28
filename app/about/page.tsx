import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">About This Tool</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Purpose and Development</CardTitle>
            <CardDescription>The story behind the CTCL Risk Assessment Tool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The CTCL Risk Assessment Tool was developed to help dermatologists identify patients who may be at higher
              risk for Cutaneous T-Cell Lymphoma (CTCL). Early diagnosis of CTCL can be challenging due to its
              resemblance to common skin conditions like eczema and psoriasis, often leading to delays in diagnosis and
              treatment.
            </p>
            <p>
              This tool uses a set of clinical indicators that have been associated with CTCL to generate a risk
              assessment. It is designed to be used by general dermatologists as an aid in clinical decision-making,
              particularly when considering whether to perform a biopsy or refer to a specialist.
            </p>
            <p>
              The risk calculator is based on clinical research and expert consensus on the most common presenting
              features of CTCL. It is intended to supplement, not replace, clinical judgment and does not provide a
              definitive diagnosis.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data and Methodology</CardTitle>
            <CardDescription>How the risk assessment is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The risk assessment is calculated based on the presence of seven clinical features that have been
              associated with CTCL in the literature:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>History of multiple biopsies</li>
              <li>Failed response to steroids</li>
              <li>Presence of other rash</li>
              <li>Scaly patch or plaque</li>
              <li>Erythema</li>
              <li>Xerosis (dry skin)</li>
              <li>Pruritus (itching)</li>
            </ul>
            <p className="mt-4">
              The current version uses a simple scoring system where each positive response contributes to the overall
              risk score. Future versions may incorporate weighted scoring based on the relative importance of each
              factor, as determined by ongoing research.
            </p>
            <p>
              It's important to note that this tool provides a risk assessment, not a diagnosis. A high-risk result
              should prompt consideration of appropriate next steps, which may include biopsy, referral to a specialist,
              or additional testing.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
            <CardDescription>Important considerations when using this tool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Users should be aware of the following limitations:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                This tool is designed for use by healthcare professionals and is not intended for self-diagnosis by
                patients
              </li>
              <li>
                The risk assessment is based on clinical features and does not incorporate histopathological,
                immunophenotypic, or molecular data
              </li>
              <li>A low-risk result does not rule out CTCL, particularly in cases with strong clinical suspicion</li>
              <li>
                The tool has not been validated in all populations and may perform differently in various demographic
                groups
              </li>
              <li>Clinical judgment should always take precedence over the risk assessment provided by this tool</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Team</CardTitle>
            <CardDescription>The experts behind the CTCL Risk Assessment Tool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This tool was developed by a multidisciplinary team of dermatologists, dermatopathologists,
              hematologist-oncologists, and data scientists with expertise in cutaneous lymphomas.
            </p>
            <p>
              The team continues to refine the tool based on user feedback and emerging research. Future versions will
              incorporate additional clinical features and may include integration with electronic health records and
              decision support systems.
            </p>
            <p>
              We welcome feedback from healthcare professionals using this tool. Please contact us at
              ctcl.support@example.com with any questions, suggestions, or concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
