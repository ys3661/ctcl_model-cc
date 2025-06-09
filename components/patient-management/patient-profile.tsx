"use client"

import { TabsContent } from "@/components/ui/tabs"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Patient, Assessment } from "@/lib/types"
import { useParams, useRouter } from "next/navigation"
import { BodyMapViewer } from "@/components/body-map/body-map-viewer"
import { TreatmentResponseChart } from "@/components/treatment/treatment-response-chart"

// Mock data - in a real app, this would come from an API or database
const mockPatients: Record<string, Patient> = {
  p1: {
    id: "p1",
    name: "John Doe",
    dateOfBirth: "1975-05-15",
    medicalRecordNumber: "MRN12345",
    createdAt: "2023-01-10",
    lastAssessment: "2023-06-22",
  },
  p2: {
    id: "p2",
    name: "Jane Smith",
    dateOfBirth: "1982-11-23",
    medicalRecordNumber: "MRN67890",
    createdAt: "2023-02-15",
    lastAssessment: "2023-07-05",
  },
  p3: {
    id: "p3",
    name: "Robert Johnson",
    dateOfBirth: "1968-03-30",
    medicalRecordNumber: "MRN54321",
    createdAt: "2023-03-22",
    lastAssessment: "2023-05-18",
  },
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

export default function PatientProfile() {
  const params = useParams()
  const patientId = params.id as string
  const router = useRouter()

  const [patient, setPatient] = useState<Patient | null>(null)
  const [assessments, setAssessments] = useState<Assessment[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedPatient = mockPatients[patientId]
    const fetchedAssessments = mockAssessments[patientId] || []

    if (fetchedPatient) {
      setPatient(fetchedPatient)
      setAssessments(fetchedAssessments)
    } else {
      // Patient not found
      router.push("/patients")
    }
  }, [patientId, router])

  if (!patient) {
    return <div className="container mx-auto py-6 px-4">Loading patient data...</div>
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="font-medium">
                  {patient.dateOfBirth} ({calculateAge(patient.dateOfBirth)} years)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Record Number</p>
                <p className="font-medium">{patient.medicalRecordNumber || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patient Since</p>
                <p className="font-medium">{patient.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="assessments" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="body-map">Body Map</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
          </TabsList>
          <TabsContent value="assessments" className="space-y-4 pt-4">
            {assessments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">No assessment history available</p>
                <Link href={`/patients/${patientId}/assessment`}>
                  <Button>Create First Assessment</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {assessments
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((assessment) => (
                    <Card key={assessment.id} className="overflow-hidden">
                      <div
                        className={`h-2 w-full 
                      ${assessment.risk === "Low" ? "bg-green-500" : ""}
                      ${assessment.risk === "Moderate" ? "bg-yellow-500" : ""}
                      ${assessment.risk === "High" ? "bg-orange-500" : ""}
                      ${assessment.risk === "Very High" ? "bg-red-500" : ""}
                    `}
                      />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{assessment.date}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Risk: <span className="font-medium">{assessment.risk}</span> • Score:{" "}
                              <span className="font-medium">{assessment.score.toFixed(1)}/10</span>
                            </p>
                            {assessment.notes && (
                              <p className="text-sm mt-2 bg-slate-50 p-2 rounded-md">{assessment.notes}</p>
                            )}
                          </div>
                          <Link href={`/patients/${patientId}/assessment/${assessment.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="body-map" className="space-y-4 pt-4">
            <BodyMapViewer patientId={patientId} />
          </TabsContent>

          <TabsContent value="treatment" className="space-y-4 pt-4">
            <TreatmentResponseChart patientId={patientId} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Link href={`/patients/${patientId}/reports`}>
            <Button>Generate Clinical Report</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
