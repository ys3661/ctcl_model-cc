import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LesionTracker } from "@/components/body-map/lesion-tracker"

export const metadata = {
  title: "Lesion Tracker | CTCL Insight",
  description: "Map lesions on a body diagram and track photos over time for longitudinal MF follow-up.",
}

export default function LesionTrackerPage() {
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
          <h1 className="text-2xl md:text-3xl font-bold">Lesion Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Map lesions and follow them with serial photos. Data stays in this browser on this device.
          </p>
        </div>

        <LesionTracker />
      </div>
    </main>
  )
}
