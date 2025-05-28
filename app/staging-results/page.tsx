"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, CheckCircle, ArrowLeft, Printer } from "lucide-react"
import Link from "next/link"

export default function StagingResultsPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)

  // Get parameters from URL
  const stage = searchParams.get("stage") || "Unknown"
  const tCategory = searchParams.get("t") || ""
  const nCategory = searchParams.get("n") || ""
  const mCategory = searchParams.get("m") || ""
  const bCategory = searchParams.get("b") || ""
  const description = searchParams.get("description") || ""

  // Parse recommendations from JSON string
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    // This should only run once when the component mounts
    try {
      const recommendationsParam = searchParams.get("recommendations")
      if (recommendationsParam) {
        setRecommendations(JSON.parse(recommendationsParam))
      }
    } catch (error) {
      console.error("Error parsing recommendations:", error)
    }

    // Set loading to false after we've processed the parameters
    setIsLoading(false)

    // This effect should only run once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-medium">Loading staging results...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Link href="/clinical-support" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Staging Tool
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">CTCL Staging Results</h1>
      </div>

      <Card className="p-6 bg-slate-50 border-2 border-blue-300 print:border print:shadow-none">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-blue-800">Stage {stage}</h3>
            <p className="text-xl text-blue-700 mt-2">{description}</p>
          </div>

          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-medium mb-3 text-lg">TNMB Classification</h4>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">SKIN</div>
                <span className="font-bold text-lg">{tCategory}</span>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">NODES</div>
                <span className="font-bold text-lg">{nCategory}</span>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">VISCERAL</div>
                <span className="font-bold text-lg">{mCategory}</span>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">BLOOD</div>
                <span className="font-bold text-lg">{bCategory}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-medium mb-3 text-lg">Management Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle>Prognosis Information</AlertTitle>
            <AlertDescription className="text-blue-700">
              {stage === "IA" &&
                "Excellent prognosis with 5-year survival >90%. Many patients have normal life expectancy."}
              {stage === "IB" &&
                "Very good prognosis with 5-year survival >80%. Disease may wax and wane but is generally controllable with appropriate therapy."}
              {stage === "IIA" &&
                "Good prognosis with 5-year survival >70%. Higher risk of progression than stages IA/IB."}
              {stage === "IIB" &&
                "Moderate prognosis with 5-year survival of 40-65%. Increased risk of disease progression and need for systemic therapy."}
              {stage === "IIIA" &&
                "Moderate prognosis with 5-year survival of 40-60%. Requires more aggressive management."}
              {stage === "IIIB" &&
                "Guarded prognosis with 5-year survival of 30-50%. Significant blood involvement indicates more aggressive disease."}
              {(stage === "IVA1" || stage === "IVA2" || stage === "IVA1/IVA2") &&
                "Poor prognosis with 5-year survival of 20-40%. Requires aggressive systemic therapy."}
              {stage === "IVB" &&
                "Poor prognosis with 5-year survival <20%. Visceral involvement indicates advanced disease requiring aggressive management."}
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-3 print:hidden">
            <Link href="/clinical-support">
              <Button variant="outline">Return to Staging Tool</Button>
            </Link>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print Results
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
