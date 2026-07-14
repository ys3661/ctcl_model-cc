import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, MessageSquarePlus } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          About This Tool
        </h1>

        <Card className="mb-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
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

        <Card className="mb-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
          <CardHeader>
            <CardTitle>Data and Methodology</CardTitle>
            <CardDescription>How the risk assessment is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The risk assessment is a transparent weighted score derived from a study in the Geskin lab, which trained
              a supervised machine-learning classifier (Random Forest) on structured clinical data extracted from
              electronic health records prior to diagnosis. That study used key binary historical variables—including
              history of multiple biopsies, failed topical steroids, other failed therapies, scaly patches or plaques,
              erythema, xerosis, pruritus, and presence of other rashes—to distinguish patients with cutaneous T-cell
              lymphoma (CTCL) from those with benign inflammatory skin conditions. Prioritizing sensitivity to minimize
              false negatives, that research model reported approximately 72% accuracy, 87% sensitivity, and 55%
              specificity in its development cohort. This calculator is a simplified weighted score based on those
              relative feature weightings; the reported figures reflect the original research model and have not been
              prospectively validated for this tool.
            </p>
            <p>
              It's important to note that this tool provides a risk assessment, not a diagnosis. A high-risk result
              should prompt consideration of appropriate next steps, which may include biopsy, referral to a specialist,
              or additional testing.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
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

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
          <CardHeader>
            <CardTitle>Suggestions for Improvement</CardTitle>
            <CardDescription>Help us enhance the CTCL Risk Assessment Tool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We are continuously working to improve the accuracy and usability of this application. Your feedback and
              suggestions are valuable in helping us enhance the tool's performance and clinical utility.
            </p>
            <div className="flex justify-center mt-6">
              <Link href="/feedback">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <MessageSquarePlus className="h-5 w-5" />
                  Submit Feedback Form
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
