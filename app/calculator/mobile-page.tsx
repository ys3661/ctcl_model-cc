"use client"

import RiskCalculator from "@/components/risk-calculator"

export default function CalculatorPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">CTCL Risk Calculator</h1>
          <p className="text-muted-foreground">
            Select all applicable clinical features to calculate the risk of Cutaneous T-Cell Lymphoma (CTCL).
          </p>
        </div>

        <RiskCalculator />
      </div>
    </div>
  )
}
