import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Share2, Download, Printer } from "lucide-react"

interface MobileResultsDisplayProps {
  results: {
    score: number
    risk: string
  } | null
}

export default function MobileResultsDisplay({ results }: MobileResultsDisplayProps) {
  if (!results) return null

  const { score, risk } = results
  const isHighRisk = risk === "High" || risk === "Very High"

  // Determine color based on risk level
  const getColorClass = () => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Moderate":
        return "text-yellow-600"
      case "High":
        return "text-orange-600"
      case "Very High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // Determine progress color based on risk level
  const getProgressColor = () => {
    switch (risk) {
      case "Low":
        return "bg-green-600"
      case "Moderate":
        return "bg-yellow-600"
      case "High":
        return "bg-orange-600"
      case "Very High":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Risk Assessment Results</CardTitle>
        <CardDescription>Based on your answers, we've calculated the CTCL risk assessment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            <span className={getColorClass()}>{risk} Risk</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Score: {score.toFixed(1)} out of 10</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
            <span>Very High</span>
          </div>
          <Progress value={score * 10} className="h-2" indicatorClassName={getProgressColor()} />
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">What does this mean?</h4>
          <p className="text-sm text-muted-foreground">
            {risk === "Low" &&
              "Your answers suggest a low risk for CTCL. However, if symptoms persist or worsen, consult with a dermatologist."}
            {risk === "Moderate" &&
              "Your answers suggest a moderate risk for CTCL. It is recommended to consult with a dermatologist for further evaluation."}
            {risk === "High" &&
              "Your answers suggest a high risk for CTCL. It is strongly recommended to consult with a dermatologist or hematologist-oncologist for further evaluation."}
            {risk === "Very High" &&
              "Your answers suggest a very high risk for CTCL. It is strongly recommended to consult with a dermatologist or hematologist-oncologist as soon as possible."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="mr-1 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="mr-1 h-4 w-4" /> Save
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Printer className="mr-1 h-4 w-4" /> Print
          </Button>
        </div>
      </CardContent>

      {isHighRisk && (
        <CardFooter>
          <Link href="/next-steps" className="w-full">
            <Button className="w-full" variant="default">
              View Next Steps <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
