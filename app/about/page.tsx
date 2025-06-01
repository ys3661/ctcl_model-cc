import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, MessageSquarePlus } from "lucide-react"

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
              The risk assessment is calculated based on a study in the Geskin lab which created a supervised machine
              learning classifier based on a Random Forest algorithm, trained on structured clinical data extracted from
              electronic health records prior to diagnosis. This model used key binary historical variables—including
              history of multiple biopsies, failed topical steroids, other failed therapies, scaly patches or plaques,
              erythema, xerosis, pruritus, and presence of other rashes—to distinguish patients with cutaneous T-cell
              lymphoma (CTCL) from those with benign inflammatory skin conditions. Prioritizing sensitivity to minimize
              false negatives, the final model achieved an accuracy of 72%, with a sensitivity of 87% and a specificity
              of 55%.
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
                <Button className="flex items-center gap-2">
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
