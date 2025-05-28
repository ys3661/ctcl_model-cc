"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, FileText, User } from "lucide-react"
import type { Patient } from "@/lib/types"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

// Mock data - in a real app, this would come from an API or database
const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Doe",
    dateOfBirth: "1975-05-15",
    medicalRecordNumber: "MRN12345",
    createdAt: "2023-01-10",
    lastAssessment: "2023-06-22",
  },
  {
    id: "p2",
    name: "Jane Smith",
    dateOfBirth: "1982-11-23",
    medicalRecordNumber: "MRN67890",
    createdAt: "2023-02-15",
    lastAssessment: "2023-07-05",
  },
  {
    id: "p3",
    name: "Robert Johnson",
    dateOfBirth: "1968-03-30",
    medicalRecordNumber: "MRN54321",
    createdAt: "2023-03-22",
    lastAssessment: "2023-05-18",
  },
]

export default function MobilePatientList() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: "",
    dateOfBirth: "",
    medicalRecordNumber: "",
  })
  const router = useRouter()

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalRecordNumber?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.dateOfBirth) return

    const patient: Patient = {
      id: `p${patients.length + 1}`,
      name: newPatient.name,
      dateOfBirth: newPatient.dateOfBirth,
      medicalRecordNumber: newPatient.medicalRecordNumber,
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }

    setPatients([...patients, patient])
    setNewPatient({
      name: "",
      dateOfBirth: "",
      medicalRecordNumber: "",
    })
    setIsAddingPatient(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Patients</h2>
        <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mrn">Medical Record Number (Optional)</Label>
                <Input
                  id="mrn"
                  value={newPatient.medicalRecordNumber}
                  onChange={(e) => setNewPatient({ ...newPatient, medicalRecordNumber: e.target.value })}
                  placeholder="Enter MRN"
                />
              </div>
              <Button className="w-full" onClick={handleAddPatient}>
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">DOB: {patient.dateOfBirth}</p>
                  <p className="text-xs text-muted-foreground">MRN: {patient.medicalRecordNumber || "—"}</p>
                  {patient.lastAssessment && (
                    <p className="text-xs mt-1">
                      Last assessment: <span className="font-medium">{patient.lastAssessment}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push(`/patients/${patient.id}`)}
                  >
                    <User className="mr-1 h-3 w-3" /> Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push(`/patients/${patient.id}/assessment`)}
                  >
                    <FileText className="mr-1 h-3 w-3" /> Assess
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
