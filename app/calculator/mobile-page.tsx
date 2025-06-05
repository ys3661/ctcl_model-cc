"use client"

import RiskCalculator from "@/components/risk-calculator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator } from "lucide-react"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="mb-6 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                CTCL Risk Calculator
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Select all applicable clinical features to calculate the risk of Cutaneous T-Cell Lymphoma (CTCL) using
                our machine learning model.
              </p>
            </div>
          </div>

          <RiskCalculator />
        </div>
      </div>
    </div>
  )
}
