"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Patient, Assessment } from "@/lib/types"
import { FileDown, Printer, FileText } from "lucide-react"

interface ClinicalReportProps {
  patient: Patient
  assessments: Assessment[]
  onExport: (format: "pdf" | "docx") => void
  onPrint: () => void
}

export function ClinicalReport({ patient, assessments, onExport, onPrint }: ClinicalReportProps) {
  const [includePatientInfo, setIncludePatientInfo] = useState(true)
  const [includeAssessmentHistory, setIncludeAssessmentHistory] = useState(true)
  const [includeBodyMap, setIncludeBodyMap] = useState(true)
  const [includeTreatmentHistory, setIncludeTreatmentHistory] = useState(true)

  const latestAssessment =
    assessments.length > 0
      ? assessments.reduce((latest, current) => {
          return new Date(current.date) > new Date(latest.date) ? current : latest
        })
      : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Clinical Report Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-patient-info"
                checked={includePatientInfo}
                onCheckedChange={(checked) => setIncludePatientInfo(!!checked)}
              />
              <Label htmlFor="include-patient-info">Include Patient Information</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-assessment-history"
                checked={includeAssessmentHistory}
                onCheckedChange={(checked) => setIncludeAssessmentHistory(!!checked)}
              />
              <Label htmlFor="include-assessment-history">Include Assessment History</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-body-map"
                checked={includeBodyMap}
                onCheckedChange={(checked) => setIncludeBodyMap(!!checked)}
              />
              <Label htmlFor="include-body-map">Include Body Map</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-treatment-history"
                checked={includeTreatmentHistory}
                onCheckedChange={(checked) => setIncludeTreatmentHistory(!!checked)}
              />
              <Label htmlFor="include-treatment-history">Include Treatment History</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onPrint}>
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </Button>
            <Button variant="outline" onClick={() => onExport("docx")}>
              <FileText className="mr-2 h-4 w-4" /> Export as DOCX
            </Button>
            <Button onClick={() => onExport("pdf")}>
              <FileDown className="mr-2 h-4 w-4" /> Export as PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 p-6 border rounded-md bg-white">
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold">CTCL Clinical Assessment Report</h1>
              <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {includePatientInfo && (
              <div className="space-y-2 border-b pb-4">
                <h2 className="text-xl font-bold">Patient Information</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Medical Record Number</p>
                    <p className="font-medium">{patient.medicalRecordNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Since</p>
                    <p className="font-medium">{patient.createdAt}</p>
                  </div>
                </div>
              </div>
            )}

            {includeAssessmentHistory && assessments.length > 0 && (
              <div className="space-y-4 border-b pb-4">
                <h2 className="text-xl font-bold">Risk Assessment</h2>

                {latestAssessment && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Latest Assessment ({latestAssessment.date})</h3>
                    <div className="p-4 bg-slate-50 rounded-md">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <p
                            className={`text-lg font-bold
                            ${latestAssessment.risk === "Low" ? "text-green-600" : ""}
                            ${latestAssessment.risk === "Moderate" ? "text-yellow-600" : ""}
                            ${latestAssessment.risk === "High" ? "text-orange-600" : ""}
                            ${latestAssessment.risk === "Very High" ? "text-red-600" : ""}
                          `}
                          >
                            {latestAssessment.risk}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className="text-lg font-bold">{latestAssessment.score.toFixed(1)}/10</p>
                        </div>
                      </div>

                      {latestAssessment.notes && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground">Clinical Notes</p>
                          <p>{latestAssessment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Assessment History</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Risk Level</th>
                        <th className="border p-2 text-left">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((assessment) => (
                          <tr key={assessment.id}>
                            <td className="border p-2">{assessment.date}</td>
                            <td className="border p-2">{assessment.risk}</td>
                            <td className="border p-2">{assessment.score.toFixed(1)}/10</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {includeBodyMap && (
              <div className="space-y-2 border-b pb-4">
                <h2 className="text-xl font-bold">Body Map</h2>
                <p className="text-muted-foreground">
                  [Body map visualization would appear here in the exported report]
                </p>
              </div>
            )}

            {includeTreatmentHistory && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Treatment History</h2>
                <p className="text-muted-foreground">[Treatment history would appear here in the exported report]</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
