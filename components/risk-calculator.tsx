"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Info, Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

interface MLFeatures {
  multiple_biopsies: boolean
  failed_steroids: boolean
  otherrash: boolean
  scaly_patch_plaque: boolean
  erythema: boolean
  xerosis: boolean
  pruritus: boolean
  other_failed_therapies: boolean
}

interface Question {
  id: keyof MLFeatures
  text: string
  description: string
  category: string
}

const questions: Question[] = [
  {
    id: "multiple_biopsies",
    text: "Multiple Biopsies",
    description: "Patient has undergone multiple skin biopsies",
    category: "Diagnostic History",
  },
  {
    id: "failed_steroids",
    text: "Failed Steroids",
    description: "Topical or systemic steroids have been ineffective",
    category: "Treatment Response",
  },
  {
    id: "other_failed_therapies",
    text: "Other Failed Therapies",
    description: "Other medical treatments have been tried and failed",
    category: "Treatment Response",
  },
  {
    id: "scaly_patch_plaque",
    text: "Scaly Patch/Plaque",
    description: "Presence of scaly patches or raised plaques on skin",
    category: "Clinical Presentation",
  },
  {
    id: "erythema",
    text: "Erythema",
    description: "Areas of skin redness or erythematous lesions",
    category: "Clinical Presentation",
  },
  {
    id: "xerosis",
    text: "Xerosis",
    description: "Abnormal skin dryness or xerotic changes",
    category: "Clinical Presentation",
  },
  {
    id: "otherrash",
    text: "Other Rash",
    description: "Presence of other concurrent skin rashes or lesions",
    category: "Clinical Presentation",
  },
  {
    id: "pruritus",
    text: "Pruritus",
    description: "Significant itching or pruritic symptoms",
    category: "Symptoms",
  },
]

function getRiskInterpretation(riskScore: number) {
  if (riskScore < 0.3) {
    return {
      risk: "Low",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle2,
      description: "Low probability of CTCL. Continue routine monitoring.",
      recommendation: "Standard dermatological follow-up as needed.",
      showNextSteps: false,
    }
  } else if (riskScore < 0.7) {
    return {
      risk: "Moderate",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      icon: AlertTriangle,
      description: "Moderate risk warrants closer evaluation.",
      recommendation: "Consider additional testing and specialist consultation.",
      showNextSteps: false,
    }
  } else {
    return {
      risk: "High",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: XCircle,
      description: "High risk of CTCL.",
      recommendation: "Immediate specialist evaluation and comprehensive workup needed.",
      showNextSteps: true,
    }
  }
}

export default function RiskCalculator() {
  const [features, setFeatures] = useState<MLFeatures>({
    multiple_biopsies: false,
    failed_steroids: false,
    otherrash: false,
    scaly_patch_plaque: false,
    erythema: false,
    xerosis: false,
    pruritus: false,
    other_failed_therapies: false,
  })

  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate risk score when features change
  useEffect(() => {
    // Only calculate if at least one feature is set to true
    const hasSelectedFeatures = Object.values(features).some((value) => value === true)

    if (hasSelectedFeatures) {
      calculateRisk()
    } else {
      setRiskScore(null)
      setError(null)
    }
  }, [features])

  const calculateRisk = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setRiskScore(data.risk_score)
    } catch (err) {
      console.error("Error calculating risk:", err)
      setError(err instanceof Error ? err.message : "Failed to calculate risk score")
      setRiskScore(null)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureToggle = (featureId: keyof MLFeatures, value: boolean) => {
    setFeatures((prev) => ({
      ...prev,
      [featureId]: value,
    }))
  }

  const handleReset = () => {
    setFeatures({
      multiple_biopsies: false,
      failed_steroids: false,
      otherrash: false,
      scaly_patch_plaque: false,
      erythema: false,
      xerosis: false,
      pruritus: false,
      other_failed_therapies: false,
    })
    setRiskScore(null)
    setError(null)
  }

  const selectedCount = Object.values(features).filter((value) => value === true).length
  const riskInterpretation = riskScore !== null ? getRiskInterpretation(riskScore) : null

  // Group questions by category
  const groupedQuestions = questions.reduce(
    (acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = []
      }
      acc[question.category].push(question)
      return acc
    },
    {} as Record<string, Question[]>,
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
          CTCL Risk Assessment Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Select all applicable clinical features to calculate the ML-based risk score for cutaneous T-cell lymphoma
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Clinical Features - ML Model Input */}
        <div className="xl:col-span-3 space-y-6">
          {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
            <Card key={category} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryQuestions.map((question) => (
                  <div
                    key={question.id}
                    className={`group p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                      features[question.id]
                        ? "border-blue-300 bg-blue-50/50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => handleFeatureToggle(question.id, !features[question.id])}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name={question.id}
                          checked={features[question.id]}
                          onChange={() => handleFeatureToggle(question.id, !features[question.id])}
                          className="h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
                        />
                        {features[question.id] && (
                          <CheckCircle2 className="absolute -top-1 -right-1 h-3 w-3 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Label className="text-base font-semibold text-gray-800 block mb-2 cursor-pointer">
                          {question.text}
                        </Label>
                        <p className="text-sm text-gray-600 leading-relaxed">{question.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Score Display */}
          <Card className="xl:sticky xl:top-6 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">ML Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {loading ? (
                <div className="flex flex-col items-center space-y-4 py-8">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                    <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-blue-100"></div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Calculating risk score...</div>
                </div>
              ) : selectedCount === 0 ? (
                <div className="py-12 space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Calculator className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-gray-500 text-sm">Select clinical features to calculate risk score</div>
                </div>
              ) : error ? (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="text-red-600 text-sm space-y-2">
                    <p className="font-medium">Calculation Error</p>
                    <p className="text-xs">{error}</p>
                  </div>
                </div>
              ) : riskScore !== null ? (
                <>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {(riskScore * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Risk Probability</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {riskInterpretation && (
                    <div className="space-y-4">
                      <div
                        className={`${riskInterpretation.bgColor} ${riskInterpretation.borderColor} border-2 rounded-xl p-4`}
                      >
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <riskInterpretation.icon className={`h-5 w-5 ${riskInterpretation.color}`} />
                          <Badge
                            className={`${riskInterpretation.color} border-current px-4 py-1 text-sm font-bold`}
                            variant="outline"
                          >
                            {riskInterpretation.risk} Risk
                          </Badge>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Interpretation:</p>
                            <p className="text-gray-700">{riskInterpretation.description}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 mb-1">Recommendation:</p>
                            <p className="text-gray-700">{riskInterpretation.recommendation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Next Steps Box - only for High risk */}
                      {riskInterpretation.showNextSteps && (
                        <Button
                          onClick={() => (window.location.href = "/next-steps")}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          View Next Steps
                        </Button>
                      )}
                    </div>
                  )}
                </>
              ) : null}

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Features Selected</span>
                  <Badge variant="secondary" className="font-semibold">
                    {selectedCount} of {questions.length}
                  </Badge>
                </div>

                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full border-2 hover:bg-gray-50 transition-all duration-300"
                >
                  Reset Calculator
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Risk Guide */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-gray-800">
                <Info className="mr-2 h-5 w-5 text-blue-600" />
                Risk Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">0-30%:</span>
                <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                  Low Risk
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">30-70%:</span>
                <Badge className="bg-amber-100 text-amber-800 border-amber-200" variant="outline">
                  Moderate Risk
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">70-100%:</span>
                <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline">
                  High Risk
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
