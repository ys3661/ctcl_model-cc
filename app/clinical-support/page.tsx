import { StagingTool } from "@/components/clinical-support/staging-tool"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ClinicalSupportPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">CTCL Staging Tool</h1>

        <StagingTool />
      </div>
    </main>
  )
}
