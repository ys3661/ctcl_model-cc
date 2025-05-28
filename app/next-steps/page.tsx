import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, FileText, Phone } from "lucide-react"

export default function NextSteps() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Risk Calculator
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Next Steps for High-Risk CTCL Assessment</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Recommended Diagnostic Procedures
              </CardTitle>
              <CardDescription>
                These procedures are commonly recommended for patients with high CTCL risk.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Skin Biopsy</h3>
                <p className="text-sm text-muted-foreground">A 4mm punch biopsy is recommended for diagnosing CTCL.</p>

                <div className="mt-4">
                  <Link href="/biopsy-results">
                    <Button className="bg-black hover:bg-gray-800 text-white">Next Steps</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" /> Contact Information
              </CardTitle>
              <CardDescription>Important contacts for immediate assistance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                For immediate medical concerns, please contact your primary care physician or visit the nearest
                emergency room.
              </p>
              <p className="text-sm text-muted-foreground">
                For questions about this assessment tool, please contact:
                <br />
                <span className="font-medium">Email:</span> ctcl.support@example.com
                <br />
                <span className="font-medium">Phone:</span> (555) 123-4567
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
