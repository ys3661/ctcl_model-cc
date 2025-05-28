"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, FileText, Calendar, User } from "lucide-react"
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

export default function PatientList() {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Patient Management</CardTitle>
        <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Patient
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
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or MRN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>MRN</TableHead>
                <TableHead>Last Assessment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.dateOfBirth}</TableCell>
                    <TableCell>{patient.medicalRecordNumber || "—"}</TableCell>
                    <TableCell>{patient.lastAssessment || "No assessments"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/patients/${patient.id}`)}>
                          <User className="mr-1 h-4 w-4" /> Profile
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/patients/${patient.id}/assessment`)}
                        >
                          <FileText className="mr-1 h-4 w-4" /> New Assessment
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/patients/${patient.id}/history`)}
                        >
                          <Calendar className="mr-1 h-4 w-4" /> History
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
