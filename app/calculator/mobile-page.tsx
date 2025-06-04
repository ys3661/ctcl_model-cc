"use client"

import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import RiskCalculator from "@/components/risk-calculator"

interface Question {
  id: string
  text: string
}

const questions: Question[] = [
  { id: "q1", text: "Does the patient have a history of Multiple Biopsies?" },
  { id: "q2", text: "Does the patient have a history of Failed Steroids?" },
  { id: "q3", text: "Does the patient have a history of Other Rash?" },
  { id: "q4", text: "Does the patient have a history of Scaly Patch or Plaque?" },
  { id: "q5", text: "Does the patient have a history of Erythema?" },
  { id: "q6", text: "Does the patient have a history of Xerosis?" },
  { id: "q7", text: "Does the patient have a history of Pruritus?" },
]

export default function MobileCalculatorPage() {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">CTCL Risk Calculator</h1>
          <p className="text-muted-foreground">
            Answer the following questions to calculate the risk of Cutaneous T-Cell Lymphoma (CTCL).
          </p>
        </div>

        <RiskCalculator />
      </div>
    </div>
  )
}
