"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import type { Patient, Assessment } from "@/lib/types"
import { ClinicalReport } from "@/components/reports/clinical-report"

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

export default function PatientReportsPage() {
  const params = useParams()
  const patientId = params.id as string

  const [patient, setPatient] = useState<Patient | null>(null)
  const [assessments, setAssessments] = useState<Assessment[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedPatient = mockPatients[patientId]
    const fetchedAssessments = mockAssessments[patientId] || []

    if (fetchedPatient) {
      setPatient(fetchedPatient)
      setAssessments(fetchedAssessments)
    }
  }, [patientId])

  const handleExport = (format: "pdf" | "docx") => {
    // In a real app, this would generate and download the report
    alert(`Exporting report as ${format.toUpperCase()}...`)
  }

  const handlePrint = () => {
    // In a real app, this would open the print dialog
    alert("Opening print dialog...")
  }

  if (!patient) {
    return <div className="container mx-auto py-6 px-4">Loading patient data...</div>
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/patients/${patientId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient Profile
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Generate Clinical Report</h1>
          <p className="text-muted-foreground">Create a customized clinical report for {patient.name}</p>
        </div>

        <ClinicalReport patient={patient} assessments={assessments} onExport={handleExport} onPrint={handlePrint} />
      </div>
    </main>
  )
}
