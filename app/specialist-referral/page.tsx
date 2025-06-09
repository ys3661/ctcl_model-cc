import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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

        <h2 className="text-2xl font-semibold mb-4">Find a CTCL Specialist</h2>
        <div className="text-center mb-8">
          <p className="text-muted-foreground mb-4">
            Find comprehensive specialist directories and resources on our resources page.
          </p>
          <Link href="/resources">
            <Button size="lg">View Specialist Resources</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
