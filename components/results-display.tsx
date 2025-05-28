"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, BarChart3, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import FeatureImportanceChart from "./feature-importance-chart"

interface FeatureImportance {
  id: string
  name: string
  importance: number
  direction: "positive" | "negative" | "neutral"
}

interface ResultsDisplayProps {
  results: {
    score: number
    risk: string
    confidence?: number
    featureImportance?: FeatureImportance[]
    details?: any
    description?: string
    recommendation?: string
  } | null
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState(false)

  if (!results) {
    return null
  }

  const { score, risk, confidence, featureImportance, details, description, recommendation } = results

  // Determine color based on risk level
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
      case "Low":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "High":
        return "bg-orange-500"
      case "Very High":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Very Low":
      case "Low":
        return "outline"
      case "Moderate":
        return "secondary"
      case "High":
        return "default"
      case "Very High":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Risk Assessment Results</CardTitle>
        <CardDescription>Based on the provided information, here is the calculated risk assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">
              <FileText className="mr-2 h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="explanation">
              <BarChart3 className="mr-2 h-4 w-4" />
              Explanation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Risk Level</h3>
                <Badge variant={getBadgeVariant(risk)} className="text-sm">
                  {risk}
                </Badge>
              </div>
              <Progress value={score * 10} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Very Low</span>
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Risk Score</h3>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">{score.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">out of 10</div>
              </div>
            </div>

            {confidence !== undefined && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Prediction Confidence</h3>
                <Progress value={confidence * 100} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {(confidence * 100).toFixed(1)}% confidence in this prediction
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Recommended Actions</h3>
              <ul className="list-disc pl-5 space-y-1">
                {risk === "Very Low" ||
                  (risk === "Low" && (
                    <>
                      <li>Continue routine skin examinations</li>
                      <li>Monitor for any changes in symptoms</li>
                      <li>Follow up in 6-12 months</li>
                    </>
                  ))}
                {risk === "Moderate" && (
                  <>
                    <li>Consider a dermatology referral</li>
                    <li>Schedule follow-up in 3-6 months</li>
                    <li>Document all skin findings with photographs</li>
                  </>
                )}
                {risk === "High" && (
                  <>
                    <li>Prompt dermatology referral recommended</li>
                    <li>Consider skin biopsy of representative lesions</li>
                    <li>Schedule follow-up in 1-3 months</li>
                  </>
                )}
                {risk === "Very High" && (
                  <>
                    <li>Urgent dermatology/oncology referral required</li>
                    <li>Immediate skin biopsy recommended</li>
                    <li>Consider additional staging workup</li>
                  </>
                )}
              </ul>
            </div>

            {description && (
              <div>
                <h4 className="font-medium mb-1">Interpretation:</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            )}

            {recommendation && (
              <div>
                <h4 className="font-medium mb-1">Recommendation:</h4>
                <p className="text-sm text-muted-foreground">{recommendation}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="explanation" className="space-y-6 pt-4">
            {featureImportance && featureImportance.length > 0 ? (
              <FeatureImportanceChart featureImportance={featureImportance} />
            ) : (
              <Card className="bg-muted">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">No explanation data available</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Feature importance information could not be generated for this prediction.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Key Risk Factors</h3>
              <div className="space-y-2">
                {featureImportance && featureImportance.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      The following factors had the strongest influence on this risk assessment:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {featureImportance.slice(0, 3).map((feature) => (
                        <li key={feature.id} className="text-sm">
                          <span className="font-medium">{feature.name}</span>
                          {feature.direction === "positive" && " (present)"}
                          {feature.direction === "negative" && " (absent)"}
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm text-muted-foreground mt-4">
                      {risk === "Very Low" ||
                        (risk === "Low" &&
                          "These factors suggest a lower likelihood of CTCL, but continued monitoring is recommended.")}
                      {risk === "Moderate" &&
                        "These factors suggest a moderate concern for CTCL that warrants clinical follow-up."}
                      {risk === "High" &&
                        "These factors indicate a concerning pattern that should be evaluated by a specialist."}
                      {risk === "Very High" &&
                        "This combination of factors strongly suggests the need for immediate specialist evaluation."}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Risk factor information is not available for this assessment.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {details && (
          <Collapsible open={showDetails} onOpenChange={setShowDetails} className="border rounded-md p-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex w-full justify-between p-2">
                <span>Technical Details</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? "transform rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2">
              <div className="rounded bg-muted p-3 font-mono text-sm overflow-auto max-h-60">
                <pre>{JSON.stringify(details, null, 2)}</pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}
