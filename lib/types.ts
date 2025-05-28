export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  medicalRecordNumber?: string
  createdAt: string
  lastAssessment?: string
}

export interface Assessment {
  id: string
  patientId: string
  date: string
  answers: Record<string, boolean>
  score: number
  risk: string
  notes?: string
}

export interface TreatmentResponse {
  id: string
  patientId: string
  assessmentId: string
  date: string
  treatment: string
  response: "improved" | "stable" | "worsened"
  notes?: string
  lesionChanges?: LesionChange[]
}

export interface LesionChange {
  location: string
  previousSize?: number
  currentSize?: number
  previousAppearance?: string
  currentAppearance?: string
  imageUrl?: string
}

export interface LesionMapping {
  id: string
  patientId: string
  assessmentId: string
  date: string
  lesions: Lesion[]
}

export interface Lesion {
  id: string
  location: BodyLocation
  type: "patch" | "plaque" | "tumor" | "erythroderma"
  size: number // in cm
  description?: string
  imageUrl?: string
}

export interface BodyLocation {
  x: number // percentage from left
  y: number // percentage from top
  side: "front" | "back"
}
