import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BiopsyRequisitionBuilder } from "@/components/biopsy-requisition-builder"

export const metadata = {
  title: "Biopsy Requisition Builder | CTCL Insight",
  description: "Build a pathology requisition for suspected CTCL with the right stains and clonality studies.",
}

export default function BiopsyRequisitionPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Biopsy Requisition Builder</h1>
          <p className="text-muted-foreground mt-1">
            Tell dermatopathology to rule out mycosis fungoides and request the right workup.
          </p>
        </div>

        <BiopsyRequisitionBuilder />
      </div>
    </main>
  )
}
