"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  BarChart3,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import FeatureImportanceChart from "./feature-importance-chart"
import Link from "next/link"

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

  // Determine styling based on risk level
  const getRiskStyling = (risk: string) => {
    switch (risk) {
      case "Very Low":
      case "Low":
        return {
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          progressColor: "bg-green-500",
          icon: CheckCircle2,
          badgeVariant: "outline" as const,
        }
      case "Moderate":
        return {
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          progressColor: "bg-amber-500",
          icon: AlertTriangle,
          badgeVariant: "secondary" as const,
        }
      case "High":
        return {
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          progressColor: "bg-orange-500",
          icon: TrendingUp,
          badgeVariant: "default" as const,
        }
      case "Very High":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          progressColor: "bg-red-500",
          icon: XCircle,
          badgeVariant: "destructive" as const,
        }
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          progressColor: "bg-gray-500",
          icon: AlertTriangle,
          badgeVariant: "outline" as const,
        }
    }
  }

  const styling = getRiskStyling(risk)
  const RiskIcon = styling.icon

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Risk Assessment Results
          </CardTitle>
        </div>
        <CardDescription className="text-base text-gray-600">
          Based on the provided information, here is the calculated risk assessment
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100/50 p-1 rounded-xl">
            <TabsTrigger
              value="summary"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Summary</span>
            </TabsTrigger>
            <TabsTrigger
              value="explanation"
              className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Explanation</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-8 pt-6">
            {/* Risk Level Display */}
            <div className={`${styling.bgColor} ${styling.borderColor} border-2 rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Risk Level</h3>
                <div className="flex items-center space-x-2">
                  <RiskIcon className={`h-5 w-5 ${styling.color}`} />
                  <Badge variant={styling.badgeVariant} className="text-sm font-bold px-3 py-1">
                    {risk}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Progress
                  value={score * 10}
                  className="h-4 bg-gray-200/50"
                  indicatorClassName={styling.progressColor}
                />
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Very Low</span>
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
              </div>
            </div>

            {/* Score Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Risk Score</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {score.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">out of 10</div>
                </CardContent>
              </Card>

              {confidence !== undefined && (
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Confidence</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                      {(confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">prediction confidence</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recommendations */}
            <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {risk === "Very Low" || risk === "Low" ? (
                    <>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Continue routine skin examinations</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Monitor for any changes in symptoms</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Follow up in 6-12 months</span>
                      </li>
                    </>
                  ) : risk === "Moderate" ? (
                    <>
                      <li className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Consider a dermatology referral</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Schedule follow-up in 3-6 months</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Document all skin findings with photographs</span>
                      </li>
                    </>
                  ) : risk === "High" ? (
                    <>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Prompt dermatology referral recommended</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Consider skin biopsy of representative lesions</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Schedule follow-up in 1-3 months</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Urgent dermatology/oncology referral required</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Immediate skin biopsy recommended</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Consider additional staging workup</span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* High Risk Alert */}
            {(risk === "High" || risk === "Very High" || score >= 8.0) && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">High Risk Alert</h3>
                </div>
                <p className="text-red-100 mb-6 text-lg">
                  This assessment indicates a high risk for CTCL. Immediate medical consultation is strongly
                  recommended.
                </p>
                <Link href="/next-steps">
                  <Button className="w-full bg-white text-red-600 hover:bg-red-50 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    View Recommended Next Steps <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="explanation" className="space-y-8 pt-6">
            {featureImportance && featureImportance.length > 0 ? (
              <div className="space-y-6">
                <FeatureImportanceChart featureImportance={featureImportance} />

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Key Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      The following factors had the strongest influence on this risk assessment:
                    </p>
                    <div className="space-y-3">
                      {featureImportance.slice(0, 3).map((feature, index) => (
                        <div
                          key={feature.id}
                          className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200"
                        >
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-800">{feature.name}</span>
                            <span className="text-gray-600 ml-2">
                              {feature.direction === "positive" && "(present)"}
                              {feature.direction === "negative" && "(absent)"}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-blue-600">
                            {(feature.importance * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="flex items-center justify-center p-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-800">No explanation data available</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      Feature importance information could not be generated for this prediction.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Technical Details */}
        {details && (
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex w-full justify-between p-4 hover:bg-gray-50 transition-colors">
                <span className="font-medium">Technical Details</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${showDetails ? "transform rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="bg-gray-900 text-gray-100">
                <CardContent className="p-4">
                  <pre className="text-sm overflow-auto max-h-60 font-mono">{JSON.stringify(details, null, 2)}</pre>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}
