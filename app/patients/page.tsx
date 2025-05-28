"use client"

import { useEffect, useState } from "react"
import PatientList from "@/components/patient-management/patient-list"
import MobilePatientList from "@/components/mobile/mobile-patient-list"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PatientsPage() {
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">Manage your patients and their CTCL risk assessments.</p>
        </div>

        {isMobile ? <MobilePatientList /> : <PatientList />}
      </div>
    </div>
  )
}
