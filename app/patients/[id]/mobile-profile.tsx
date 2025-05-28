"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, FileText, Calendar, Activity, Map } from "lucide-react"
import type { Patient, Assessment } from "@/lib/types"
import { useParams, useRouter } from "next/navigation"
import { MobileBodyMap } from "@/components/mobile/mobile-body-map"

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

export default function MobilePatientProfile() {
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
    return <div className="py-6 px-4">Loading patient data...</div>
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

  const getLatestAssessment = () => {
    if (assessments.length === 0) return null

    return assessments.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest
    })
  }

  const latestAssessment = getLatestAssessment()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/patients">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-lg font-bold">{patient.name}</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      <Card>
        <CardContent className="p-4">
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">DOB</dt>
              <dd>
                {patient.dateOfBirth} ({calculateAge(patient.dateOfBirth)} yrs)
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">MRN</dt>
              <dd>{patient.medicalRecordNumber || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Patient Since</dt>
              <dd>{patient.createdAt}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Last Assessment</dt>
              <dd>{patient.lastAssessment || "None"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Button className="h-auto py-3" onClick={() => router.push(`/patients/${patient.id}/assessment`)}>
          <FileText className="h-4 w-4 mb-1" />
          <span className="text-xs">New Assessment</span>
        </Button>
        <Button className="h-auto py-3" onClick={() => router.push(`/patients/${patient.id}/body-map`)}>
          <Map className="h-4 w-4 mb-1" />
          <span className="text-xs">Body Map</span>
        </Button>
        <Button className="h-auto py-3" onClick={() => router.push(`/patients/${patient.id}/treatment`)}>
          <Activity className="h-4 w-4 mb-1" />
          <span className="text-xs">Treatment</span>
        </Button>
        <Button className="h-auto py-3" onClick={() => router.push(`/patients/${patient.id}/history`)}>
          <Calendar className="h-4 w-4 mb-1" />
          <span className="text-xs">History</span>
        </Button>
      </div>

      <Tabs defaultValue="assessments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="body-map">Body Map</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-4 pt-4">
          {assessments.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">No assessment history available</p>
              <Link href={`/patients/${patient.id}/assessment`}>
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
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">{assessment.date}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Risk: <span className="font-medium">{assessment.risk}</span> • Score:{" "}
                            <span className="font-medium">{assessment.score.toFixed(1)}/10</span>
                          </p>
                          {assessment.notes && (
                            <p className="text-xs mt-2 bg-slate-50 p-2 rounded-md">{assessment.notes}</p>
                          )}
                        </div>
                        <Link href={`/patients/${patient.id}/assessment/${assessment.id}`}>
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

        <TabsContent value="body-map" className="pt-4">
          <MobileBodyMap patientId={patient.id} />
        </TabsContent>

        <TabsContent value="treatment" className="pt-4">
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">Treatment tracking coming soon</p>
            <Button variant="outline">Request Feature</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
