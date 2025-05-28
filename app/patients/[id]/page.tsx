"use client"

import { useEffect, useState } from "react"
import PatientProfile from "@/components/patient-management/patient-profile"
import MobilePatientProfile from "./mobile-profile"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function PatientProfilePage() {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return isMobile ? <MobilePatientProfile /> : <PatientProfile />
}
