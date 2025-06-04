"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Info, Loader2 } from "lucide-react"

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
}

const questions: Question[] = [
  {
    id: "multiple_biopsies",
    text: "Multiple Biopsies",
    description: "Patient has undergone multiple skin biopsies",
  },
  {
    id: "failed_steroids",
    text: "Failed Steroids",
    description: "Topical or systemic steroids have been ineffective",
  },
  {
    id: "otherrash",
    text: "Other Rash",
    description: "Presence of other concurrent skin rashes or lesions",
  },
  {
    id: "scaly_patch_plaque",
    text: "Scaly Patch/Plaque",
    description: "Presence of scaly patches or raised plaques on skin",
  },
  {
    id: "erythema",
    text: "Erythema",
    description: "Areas of skin redness or erythematous lesions",
  },
  {
    id: "xerosis",
    text: "Xerosis",
    description: "Abnormal skin dryness or xerotic changes",
  },
  {
    id: "pruritus",
    text: "Pruritus",
    description: "Significant itching or pruritic symptoms",
  },
  {
    id: "other_failed_therapies",
    text: "Other Failed Therapies",
    description: "Other medical treatments have been tried and failed",
  },
]

function getRiskInterpretation(riskScore: number) {
  if (riskScore < 0.2) {
    return {
      risk: "Very Low",
      color: "text-green-600 border-green-600",
      description: "Very low probability of CTCL. Continue routine monitoring.",
      recommendation: "Standard dermatological follow-up as needed.",
    }
  } else if (riskScore < 0.4) {
    return {
      risk: "Low",
      color: "text-green-600 border-green-600",
      description: "Low probability of CTCL. Monitor for changes.",
      recommendation: "Regular follow-up and monitoring recommended.",
    }
  } else if (riskScore < 0.6) {
    return {
      risk: "Moderate",
      color: "text-yellow-600 border-yellow-600",
      description: "Moderate risk warrants closer evaluation.",
      recommendation: "Consider additional testing and specialist consultation.",
    }
  } else if (riskScore < 0.8) {
    return {
      risk: "High",
      color: "text-orange-600 border-orange-600",
      description: "High risk requires immediate attention.",
      recommendation: "Urgent dermatology/oncology consultation recommended.",
    }
  } else {
    return {
      risk: "Very High",
      color: "text-red-600 border-red-600",
      description: "Very high risk of CTCL.",
      recommendation: "Immediate specialist evaluation and comprehensive workup needed.",
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Calculator className="mr-3 h-6 w-6" />
            CTCL Risk Assessment Calculator
          </CardTitle>
          <p className="text-muted-foreground">
            Select all applicable clinical features to calculate the ML-based risk score for cutaneous T-cell lymphoma
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinical Features - ML Model Input */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Clinical Features Assessment</CardTitle>
              <p className="text-sm text-muted-foreground">
                Check all clinical features that apply to this patient. The ML model will analyze these features to
                provide a risk assessment.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="p-4 rounded-lg border border-border space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium block">{question.text}</Label>
                    <p className="text-xs text-muted-foreground">{question.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={question.id}
                        checked={features[question.id]}
                        onChange={() => handleFeatureToggle(question.id, !features[question.id])}
                        className="accent-green-600 h-5 w-5"
                      />
                      <span className="text-sm font-medium">
                        {question.text}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Score Display */}
          <Card className="sticky top-4">
            <CardHeader className="text-center">
              <CardTitle>ML Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {loading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <div className="text-sm text-muted-foreground">Calculating...</div>
                </div>
              ) : selectedCount === 0 ? (
                <div className="text-muted-foreground text-sm py-8">
                  Select clinical features to calculate risk score
                </div>
              ) : error ? (
                <div className="text-red-600 text-sm py-4">
                  <p className="font-medium">Error:</p>
                  <p>{error}</p>
                </div>
              ) : riskScore !== null ? (
                <>
                  <div className="text-6xl font-bold text-primary">{(riskScore * 100).toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Risk Probability</div>

                  <Separator />

                  {riskInterpretation && (
                    <div className="space-y-3">
                      <Badge className={`${riskInterpretation.color} px-3 py-1 text-sm font-medium`} variant="outline">
                        {riskInterpretation.risk} Risk
                      </Badge>

                      <div className="text-sm space-y-2">
                        <p className="font-medium">Interpretation:</p>
                        <p className="text-muted-foreground">{riskInterpretation.description}</p>
                      </div>

                      <div className="text-sm space-y-2">
                        <p className="font-medium">Recommendation:</p>
                        <p className="text-muted-foreground">{riskInterpretation.recommendation}</p>
                      </div>

                      {/* Next Steps Box */}
                      <div className="mt-4">
                        <Button
                          onClick={() => (window.location.href = "/next-steps")}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Steps
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              <Separator />

              <div className="text-sm text-muted-foreground">
                {selectedCount} of {questions.length} features selected
              </div>

              <Button onClick={handleReset} variant="outline" className="w-full">
                Reset Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Risk Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="mr-2 h-4 w-4" />
                Risk Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>0-20%:</span>
                <span className="font-medium text-green-600">Very Low Risk</span>
              </div>
              <div className="flex justify-between">
                <span>20-40%:</span>
                <span className="font-medium text-green-600">Low Risk</span>
              </div>
              <div className="flex justify-between">
                <span>40-60%:</span>
                <span className="font-medium text-yellow-600">Moderate Risk</span>
              </div>
              <div className="flex justify-between">
                <span>60-80%:</span>
                <span className="font-medium text-orange-600">High Risk</span>
              </div>
              <div className="flex justify-between">
                <span>80-100%:</span>
                <span className="font-medium text-red-600">Very High Risk</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
