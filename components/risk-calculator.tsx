"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Loader2 } from "lucide-react"

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
    description: "Presence of or tendency to develop other skin rashes or lesions",
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
  if (riskScore < 0.3) {
    return {
      risk: "Low Risk",
      color: "text-green-600 border-green-600",
      description: "Low probability of CTCL. Continue routine monitoring.",
      recommendation: "Standard dermatological follow-up as needed.",
      showNextSteps: false,
    }
  } else {
    return {
      risk: "High Risk",
      color: "text-red-600 border-red-600",
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
      // Log the features being sent to the API for debugging
      console.log("Sending features to API:", features)

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      })

      if (!response.ok) {
        // If response is not ok, use fallback calculation
        console.warn(`API returned ${response.status}, using fallback calculation`)
        const fallbackScore = calculateFallbackRiskScore(features)
        setRiskScore(fallbackScore)
        setError("API temporarily unavailable. Using offline calculation.")
        return
      }

      // Get response text for better error logging
      const responseText = await response.text()

      // Try to parse as JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.warn("Failed to parse API response, using fallback calculation")
        const fallbackScore = calculateFallbackRiskScore(features)
        setRiskScore(fallbackScore)
        setError("API response error. Using offline calculation.")
        return
      }

      if (data.error) {
        console.warn("API returned error, using fallback calculation")
        const fallbackScore = calculateFallbackRiskScore(features)
        setRiskScore(fallbackScore)
        setError("API error. Using offline calculation.")
        return
      }

      // Success case
      setRiskScore(data.risk_score)
      setError(null)
    } catch (err) {
      console.warn("Network error, using fallback calculation:", err)

      // Always use fallback calculation when there's any error
      const fallbackScore = calculateFallbackRiskScore(features)
      setRiskScore(fallbackScore)
      setError("Network unavailable. Using offline calculation.")
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

  // Fallback calculation when API is unavailable
  const calculateFallbackRiskScore = (features: MLFeatures): number => {
    // Use the exact same weights as the API for consistency
    const weights = {
      multiple_biopsies: 0.230368,
      failed_steroids: 0.210547,
      otherrash: 0.130172,
      scaly_patch_plaque: 0.11293,
      erythema: 0.083891,
      xerosis: 0.082167,
      pruritus: 0.079507,
      other_failed_therapies: 0.070418,
    }

    let score = 0
    for (const [feature, isPresent] of Object.entries(features)) {
      if (isPresent && feature in weights) {
        score += weights[feature as keyof typeof weights]
      }
    }

    return score
  }

  const selectedCount = Object.values(features).filter((value) => value === true).length
  const riskInterpretation = riskScore !== null ? getRiskInterpretation(riskScore) : null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl sm:text-2xl">
            <Calculator className="mr-3 h-6 w-6" />
            CTCL Risk Assessment Calculator
          </CardTitle>
          <p className="text-muted-foreground">
            Select all applicable clinical features to calculate the ML-based risk score for cutaneous T-cell lymphoma
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Clinical Features - ML Model Input */}
        <div className="xl:col-span-2 space-y-4">
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
                <div key={question.id} className="p-3 sm:p-4 rounded-lg border border-border space-y-2">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name={question.id}
                      checked={features[question.id]}
                      onChange={() => handleFeatureToggle(question.id, !features[question.id])}
                      className="accent-green-600 h-5 w-5 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm font-medium block mb-1 leading-tight">{question.text}</Label>
                      <p className="text-xs text-muted-foreground leading-relaxed">{question.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Score Display */}
          <Card className="xl:sticky xl:top-4">
            <CardHeader className="text-center">
              <CardTitle>ML Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {loading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <div className="text-sm text-muted-foreground">Calculating...</div>
                </div>
              ) : selectedCount === 0 ? (
                <div className="text-muted-foreground text-sm py-8">
                  Select clinical features to calculate risk assessment
                </div>
              ) : error ? (
                <div className="text-red-600 text-sm py-4">
                  <p className="font-medium">Error:</p>
                  <p>{error}</p>
                </div>
              ) : riskScore !== null ? (
                <>
                  <div className="py-4">
                    <Badge className={`${riskInterpretation?.color} px-4 py-2 text-lg font-medium`} variant="outline">
                      {riskInterpretation?.risk}
                    </Badge>
                  </div>

                  <Separator />

                  {riskInterpretation && (
                    <div className="space-y-3">
                      <div className="text-sm space-y-2">
                        <p className="font-medium">Interpretation:</p>
                        <p className="text-muted-foreground">{riskInterpretation.description}</p>
                      </div>
                      <div className="text-sm space-y-2">
                        <p className="font-medium">Recommendation:</p>
                        <p className="text-muted-foreground">{riskInterpretation.recommendation}</p>
                      </div>
                      {/* Next Steps Box - only for High risk */}
                      {riskInterpretation.showNextSteps && (
                        <div className="mt-4">
                          <Button
                            onClick={() => (window.location.href = "/next-steps")}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Next Steps
                          </Button>
                        </div>
                      )}
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
        </div>
      </div>
    </div>
  )
}
