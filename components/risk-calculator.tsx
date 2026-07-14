"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Loader2 } from "lucide-react"
import {
  FEATURES,
  computeRiskScore,
  interpretRisk,
  emptyFeatures,
  type FeatureId,
  type RiskFeatures,
} from "@/lib/risk-model"
import { NoteGenerator } from "@/components/note-generator"

export default function RiskCalculator() {
  const [features, setFeatures] = useState<RiskFeatures>(emptyFeatures())

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // If response is not ok, use fallback calculation
        console.warn(`API returned ${response.status}, using fallback calculation`)
        setRiskScore(computeRiskScore(features))
        setError("API temporarily unavailable. Using offline calculation.")
        return
      }

      const responseText = await response.text()

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.warn("Failed to parse API response, using fallback calculation")
        setRiskScore(computeRiskScore(features))
        setError("API response error. Using offline calculation.")
        return
      }

      if (data.error) {
        console.warn("API returned error, using fallback calculation")
        setRiskScore(computeRiskScore(features))
        setError("API error. Using offline calculation.")
        return
      }

      // Success case
      setRiskScore(data.risk_score)
      setError(null)
    } catch (err) {
      console.warn("Network error, using fallback calculation:", err)

      // Always use the shared offline calculation when there's any error
      setRiskScore(computeRiskScore(features))
      setError("Network unavailable. Using offline calculation.")
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureToggle = (featureId: FeatureId) => {
    setFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }))
  }

  const handleReset = () => {
    setFeatures(emptyFeatures())
    setRiskScore(null)
    setError(null)
  }

  const selectedCount = Object.values(features).filter((value) => value === true).length
  const riskInterpretation = riskScore !== null ? interpretRisk(riskScore) : null

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
            Select all applicable clinical features to calculate the weighted risk score for cutaneous T-cell lymphoma
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Clinical Features */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Clinical Features Assessment</CardTitle>
              <p className="text-sm text-muted-foreground">
                Check all clinical features that apply to this patient. Selected features are combined into a
                transparent weighted risk score.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {FEATURES.map((question) => (
                <div key={question.id} className="p-3 sm:p-4 rounded-lg border border-border space-y-2">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name={question.id}
                      checked={features[question.id]}
                      onChange={() => handleFeatureToggle(question.id)}
                      className="accent-green-600 h-5 w-5 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm font-medium block mb-1 leading-tight">{question.label}</Label>
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
              <CardTitle>Risk Assessment</CardTitle>
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
                    <Badge className={`${riskInterpretation?.colorClass} px-4 py-2 text-lg font-medium`} variant="outline">
                      {riskInterpretation?.level}
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
                {selectedCount} of {FEATURES.length} features selected
              </div>

              <Button onClick={handleReset} variant="outline" className="w-full">
                Reset Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assessment & plan note generator */}
      {riskScore !== null && selectedCount > 0 && !loading && (
        <NoteGenerator features={features} score={riskScore} />
      )}
    </div>
  )
}
