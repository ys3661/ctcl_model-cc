"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { TreatmentResponse, Assessment } from "@/lib/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { format, parseISO } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Mock data - in a real app, this would come from an API or database
const mockTreatmentResponses: Record<string, TreatmentResponse[]> = {
  p1: [
    {
      id: "tr1",
      patientId: "p1",
      assessmentId: "a1",
      date: "2023-03-20",
      treatment: "Topical corticosteroids",
      response: "stable",
      notes: "Started treatment with clobetasol 0.05% ointment BID",
    },
    {
      id: "tr2",
      patientId: "p1",
      assessmentId: "a1",
      date: "2023-04-15",
      treatment: "Topical corticosteroids",
      response: "improved",
      notes: "Reduction in erythema and scaling",
    },
    {
      id: "tr3",
      patientId: "p1",
      assessmentId: "a2",
      date: "2023-05-10",
      treatment: "Topical corticosteroids + NB-UVB",
      response: "improved",
      notes: "Added phototherapy 3x weekly",
    },
    {
      id: "tr4",
      patientId: "p1",
      assessmentId: "a2",
      date: "2023-06-22",
      treatment: "Topical corticosteroids + NB-UVB",
      response: "worsened",
      notes: "New lesions on trunk despite treatment",
    },
  ],
}

const mockAssessments: Record<string, Assessment[]> = {
  p1: [
    {
      id: "a1",
      patientId: "p1",
      date: "2023-03-15",
      answers: {
        q1: true,
        q2: false,
        q3: true,
        q4: true,
        q5: false,
        q6: true,
        q7: false,
      },
      score: 5.7,
      risk: "Moderate",
      notes: "Patient reports increasing pruritus over the past month.",
    },
    {
      id: "a2",
      patientId: "p1",
      date: "2023-06-22",
      answers: {
        q1: true,
        q2: true,
        q3: true,
        q4: true,
        q5: true,
        q6: true,
        q7: false,
      },
      score: 8.6,
      risk: "High",
      notes: "New lesions appeared on trunk. Considering biopsy.",
    },
  ],
}

interface TreatmentResponseChartProps {
  patientId: string
}

export function TreatmentResponseChart({ patientId }: TreatmentResponseChartProps) {
  const [treatmentResponses, setTreatmentResponses] = useState<TreatmentResponse[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [chartMetric, setChartMetric] = useState<"response" | "score">("response")

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedResponses = mockTreatmentResponses[patientId] || []
    const fetchedAssessments = mockAssessments[patientId] || []

    setTreatmentResponses(fetchedResponses)
    setAssessments(fetchedAssessments)

    // Prepare chart data
    prepareChartData(fetchedResponses, fetchedAssessments)
  }, [patientId])

  useEffect(() => {
    prepareChartData(treatmentResponses, assessments)
  }, [chartMetric, treatmentResponses, assessments])

  const prepareChartData = (responses: TreatmentResponse[], assessments: Assessment[]) => {
    // Create a map of assessment dates to scores
    const assessmentMap = new Map<string, number>()
    assessments.forEach((assessment) => {
      assessmentMap.set(assessment.date, assessment.score)
    })

    // Create chart data points
    const data = responses.map((response) => {
      // Convert response to numeric value for charting
      let responseValue = 0
      if (response.response === "improved") responseValue = 1
      else if (response.response === "stable") responseValue = 0
      else if (response.response === "worsened") responseValue = -1

      // Find the closest assessment score
      const assessmentScore =
        assessmentMap.get(response.date) ||
        assessments.reduce((closest, assessment) => {
          const currentDiff = Math.abs(new Date(response.date).getTime() - new Date(assessment.date).getTime())
          const closestDiff = Math.abs(new Date(response.date).getTime() - new Date(closest.date).getTime())
          return currentDiff < closestDiff ? assessment : closest
        }, assessments[0])?.score ||
        0

      return {
        date: response.date,
        formattedDate: format(parseISO(response.date), "MMM d, yyyy"),
        response: responseValue,
        score: assessmentScore,
        treatment: response.treatment,
        notes: response.notes,
      }
    })

    setChartData(data)
  }

  const getResponseLabel = (value: number) => {
    if (value === 1) return "Improved"
    if (value === 0) return "Stable"
    if (value === -1) return "Worsened"
    return ""
  }

  return (
    <div className="space-y-4">
      {treatmentResponses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No treatment response data available</p>
          <Button>Add Treatment Response</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Label htmlFor="chart-metric">Chart Metric</Label>
              <Select value={chartMetric} onValueChange={(value) => setChartMetric(value as "response" | "score")}>
                <SelectTrigger className="w-[180px]" id="chart-metric">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="response">Treatment Response</SelectItem>
                  <SelectItem value="score">Risk Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm">
              Add Treatment Response
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    response: {
                      label: "Treatment Response",
                      color: "hsl(var(--chart-1))",
                    },
                    score: {
                      label: "Risk Score",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} />
                      <YAxis
                        yAxisId="left"
                        domain={chartMetric === "response" ? [-1.2, 1.2] : [0, 10]}
                        ticks={chartMetric === "response" ? [-1, 0, 1] : [0, 2.5, 5, 7.5, 10]}
                        tickFormatter={chartMetric === "response" ? getResponseLabel : undefined}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      {chartMetric === "response" ? (
                        <Line
                          type="monotone"
                          dataKey="response"
                          stroke="var(--color-response)"
                          yAxisId="left"
                          name="Treatment Response"
                        />
                      ) : (
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="var(--color-score)"
                          yAxisId="left"
                          name="Risk Score"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Treatment History</h3>
            <div className="space-y-3">
              {treatmentResponses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((response) => (
                  <Card key={response.id} className="overflow-hidden">
                    <div
                      className={`h-2 w-full 
                    ${response.response === "improved" ? "bg-green-500" : ""}
                    ${response.response === "stable" ? "bg-blue-500" : ""}
                    ${response.response === "worsened" ? "bg-red-500" : ""}
                  `}
                    />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{response.date}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Treatment: <span className="font-medium">{response.treatment}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Response:{" "}
                            <span
                              className={`font-medium capitalize
                            ${response.response === "improved" ? "text-green-600" : ""}
                            ${response.response === "stable" ? "text-blue-600" : ""}
                            ${response.response === "worsened" ? "text-red-600" : ""}
                          `}
                            >
                              {response.response}
                            </span>
                          </p>
                          {response.notes && (
                            <p className="text-sm mt-2 bg-slate-50 p-2 rounded-md">{response.notes}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
