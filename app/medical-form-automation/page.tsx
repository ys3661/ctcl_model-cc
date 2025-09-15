"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, FileText, Calculator, User, Activity, Clipboard } from "lucide-react"

interface PatientData {
  // Patient Information
  name: string
  mrn: string
  dob: string
  age: string
  sex: string

  // Registry Data
  registryId: string
  enrollmentDate: string

  // Body Surface Area Assessment
  headNeck: number
  trunk: number
  upperExtremities: number
  lowerExtremities: number

  // CLIPI Assessment
  clipiAge: boolean
  clipiStage: boolean
  clipiLdh: boolean

  // Clinical Assessment
  clinicalNotes: string
  treatmentPlan: string
  followUpPlan: string
}

export default function MedicalFormAutomation() {
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    mrn: "",
    dob: "",
    age: "",
    sex: "",
    registryId: "",
    enrollmentDate: "",
    headNeck: 0,
    trunk: 0,
    upperExtremities: 0,
    lowerExtremities: 0,
    clipiAge: false,
    clipiStage: false,
    clipiLdh: false,
    clinicalNotes: "",
    treatmentPlan: "",
    followUpPlan: "",
  })

  // Calculate mSWAT score
  const calculateMSWAT = () => {
    return patientData.headNeck + patientData.trunk + patientData.upperExtremities + patientData.lowerExtremities
  }

  // Calculate TBSA percentage
  const calculateTBSA = () => {
    // Head/Neck: 9%, Trunk: 36%, Upper Extremities: 18%, Lower Extremities: 36%
    const headNeckPercent = (patientData.headNeck / 6) * 9
    const trunkPercent = (patientData.trunk / 6) * 36
    const upperExtremitiesPercent = (patientData.upperExtremities / 6) * 18
    const lowerExtremitiesPercent = (patientData.lowerExtremities / 6) * 36

    return headNeckPercent + trunkPercent + upperExtremitiesPercent + lowerExtremitiesPercent
  }

  // Calculate CLIPI score
  const calculateCLIPI = () => {
    let score = 0
    if (patientData.clipiAge) score += 1
    if (patientData.clipiStage) score += 1
    if (patientData.clipiLdh) score += 1
    return score
  }

  // Generate and export report
  const exportReport = () => {
    const mswat = calculateMSWAT()
    const tbsa = calculateTBSA()
    const clipi = calculateCLIPI()

    const report = `
CTCL MEDICAL ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}

PATIENT INFORMATION
Name: ${patientData.name}
MRN: ${patientData.mrn}
Date of Birth: ${patientData.dob}
Age: ${patientData.age}
Sex: ${patientData.sex}

REGISTRY DATA
Registry ID: ${patientData.registryId}
Enrollment Date: ${patientData.enrollmentDate}

BODY SURFACE AREA ASSESSMENT
Head/Neck: ${patientData.headNeck}/6
Trunk: ${patientData.trunk}/6
Upper Extremities: ${patientData.upperExtremities}/6
Lower Extremities: ${patientData.lowerExtremities}/6

CALCULATED SCORES
mSWAT Score: ${mswat}
TBSA Involvement: ${tbsa.toFixed(1)}%

CLIPI ASSESSMENT
Age > 60 years: ${patientData.clipiAge ? "Yes" : "No"}
Stage III/IV: ${patientData.clipiStage ? "Yes" : "No"}
Elevated LDH: ${patientData.clipiLdh ? "Yes" : "No"}
CLIPI Score: ${clipi}/3

CLINICAL ASSESSMENT
Clinical Notes: ${patientData.clinicalNotes}
Treatment Plan: ${patientData.treatmentPlan}
Follow-up Plan: ${patientData.followUpPlan}
    `

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `CTCL_Assessment_${patientData.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            CTCL Medical Assessment Form
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive form for CTCL patient evaluation and documentation
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patient-name">Patient Name</Label>
                    <Input
                      id="patient-name"
                      value={patientData.name}
                      onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mrn">Medical Record Number</Label>
                    <Input
                      id="mrn"
                      value={patientData.mrn}
                      onChange={(e) => setPatientData({ ...patientData, mrn: e.target.value })}
                      placeholder="Enter MRN"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={patientData.dob}
                      onChange={(e) => setPatientData({ ...patientData, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={patientData.age}
                      onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sex">Sex</Label>
                    <Select
                      value={patientData.sex}
                      onValueChange={(value) => setPatientData({ ...patientData, sex: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registry Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clipboard className="mr-2 h-5 w-5" />
                  Registry Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registry-id">Registry ID</Label>
                    <Input
                      id="registry-id"
                      value={patientData.registryId}
                      onChange={(e) => setPatientData({ ...patientData, registryId: e.target.value })}
                      placeholder="Enter registry ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="enrollment-date">Enrollment Date</Label>
                    <Input
                      id="enrollment-date"
                      type="date"
                      value={patientData.enrollmentDate}
                      onChange={(e) => setPatientData({ ...patientData, enrollmentDate: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Body Surface Area Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Body Surface Area Assessment
                </CardTitle>
                <CardDescription>Rate each body region from 0-6 based on involvement severity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="head-neck">Head/Neck (0-6)</Label>
                    <Input
                      id="head-neck"
                      type="number"
                      min="0"
                      max="6"
                      value={patientData.headNeck}
                      onChange={(e) =>
                        setPatientData({ ...patientData, headNeck: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="trunk">Trunk (0-6)</Label>
                    <Input
                      id="trunk"
                      type="number"
                      min="0"
                      max="6"
                      value={patientData.trunk}
                      onChange={(e) => setPatientData({ ...patientData, trunk: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="upper-extremities">Upper Extremities (0-6)</Label>
                    <Input
                      id="upper-extremities"
                      type="number"
                      min="0"
                      max="6"
                      value={patientData.upperExtremities}
                      onChange={(e) =>
                        setPatientData({ ...patientData, upperExtremities: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lower-extremities">Lower Extremities (0-6)</Label>
                    <Input
                      id="lower-extremities"
                      type="number"
                      min="0"
                      max="6"
                      value={patientData.lowerExtremities}
                      onChange={(e) =>
                        setPatientData({ ...patientData, lowerExtremities: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CLIPI Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  CLIPI Assessment
                </CardTitle>
                <CardDescription>Cutaneous Lymphoma International Prognostic Index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clipi-age"
                      checked={patientData.clipiAge}
                      onCheckedChange={(checked) => setPatientData({ ...patientData, clipiAge: checked as boolean })}
                    />
                    <Label htmlFor="clipi-age">{"Age > 60 years"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clipi-stage"
                      checked={patientData.clipiStage}
                      onCheckedChange={(checked) => setPatientData({ ...patientData, clipiStage: checked as boolean })}
                    />
                    <Label htmlFor="clipi-stage">Stage III/IV disease</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clipi-ldh"
                      checked={patientData.clipiLdh}
                      onCheckedChange={(checked) => setPatientData({ ...patientData, clipiLdh: checked as boolean })}
                    />
                    <Label htmlFor="clipi-ldh">Elevated LDH</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Clinical Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="clinical-notes">Clinical Notes</Label>
                  <Textarea
                    id="clinical-notes"
                    value={patientData.clinicalNotes}
                    onChange={(e) => setPatientData({ ...patientData, clinicalNotes: e.target.value })}
                    placeholder="Enter clinical observations and findings..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="treatment-plan">Treatment Plan</Label>
                  <Textarea
                    id="treatment-plan"
                    value={patientData.treatmentPlan}
                    onChange={(e) => setPatientData({ ...patientData, treatmentPlan: e.target.value })}
                    placeholder="Enter proposed treatment plan..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="follow-up-plan">Follow-up Plan</Label>
                  <Textarea
                    id="follow-up-plan"
                    value={patientData.followUpPlan}
                    onChange={(e) => setPatientData({ ...patientData, followUpPlan: e.target.value })}
                    placeholder="Enter follow-up recommendations..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Calculated Scores</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>mSWAT Score:</span>
                      <span className="font-medium">{calculateMSWAT()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TBSA Involvement:</span>
                      <span className="font-medium">{calculateTBSA().toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIPI Score:</span>
                      <span className="font-medium">{calculateCLIPI()}/3</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Patient Info</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Name: {patientData.name || "Not entered"}</div>
                    <div>MRN: {patientData.mrn || "Not entered"}</div>
                    <div>Age: {patientData.age || "Not entered"}</div>
                  </div>
                </div>

                <Button onClick={exportReport} className="w-full" disabled={!patientData.name || !patientData.mrn}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
