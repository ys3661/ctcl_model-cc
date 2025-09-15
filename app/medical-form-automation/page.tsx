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
import { ArrowLeft, Download, FileText, Calculator, User, Activity, Clipboard, Database, Upload, AlertCircle, CheckCircle } from "lucide-react"

interface CTCLFormData {
  // Patient Information
  name: string
  age: string
  sex: string
  mrn: string
  dob: string
  
  // EPIC Integration
  epicPatientId?: string
  epicEncounterId?: string
  
  // Registry Data
  dateOfInitialVisit: string
  dateOfOnset: string
  initialSymptoms: {
    itching: number
    flaking: boolean
    colorChange: boolean
  }
  initialLesionType: string
  initialQuantity: string
  initialLocation: string
  priorDiagnosis: string
  priorTreatments: string
  priorBiopsies: string
  diseaseCourse: string
  medicationChanges: string
  exposures: string
  currentSymptoms: {
    itching: number
    flaking: boolean
    colorChange: boolean
  }
  currentTreatments: string
  currentLocation: string
  
  // Patient History
  allergies: string
  pastMedical: string
  pastSurgical: string
  familyHistory: string
  socialHistory: string
  ros: string
  
  // Body Surface Area Assessment (11 regions from template)
  bsaRegions: {
    head: { patch: number, plaque: number, tumor: number }
    neck: { patch: number, plaque: number, tumor: number }
    anteriorTrunk: { patch: number, plaque: number, tumor: number }
    arms: { patch: number, plaque: number, tumor: number }
    forearms: { patch: number, plaque: number, tumor: number }
    hands: { patch: number, plaque: number, tumor: number }
    posteriorTrunk: { patch: number, plaque: number, tumor: number }
    buttocks: { patch: number, plaque: number, tumor: number }
    thighs: { patch: number, plaque: number, tumor: number }
    legs: { patch: number, plaque: number, tumor: number }
    feet: { patch: number, plaque: number, tumor: number }
    groin: { patch: number, plaque: number, tumor: number }
  }
  
  // Physical Exam
  vitals: string
  generalExam: string
  lymphNodes: string
  
  // Laboratory and Imaging
  laboratory: string
  flowCytometry: string
  pathology: string
  imaging: string
  
  // Assessment and Plan
  stage: string
  ctclExplanation: string
  treatmentPlan: string
  followUp: string
  
  // CLIPI Assessment
  clipiType: 'early' | 'late'
  earlyClipi: {
    male: boolean
    ageOver60: boolean
    plaques: boolean
    folliculotropic: boolean
    n1nx: boolean
  }
  lateClipi: {
    male: boolean
    ageOver60: boolean
    b1b2: boolean
    n23: boolean
    visceralInvolvement: boolean
  }
}

export default function MedicalFormAutomation() {
  const [formData, setFormData] = useState<CTCLFormData>({
    name: "",
    age: "",
    sex: "",
    mrn: "",
    dob: "",
    dateOfInitialVisit: "",
    dateOfOnset: "",
    initialSymptoms: { itching: 0, flaking: false, colorChange: false },
    initialLesionType: "",
    initialQuantity: "",
    initialLocation: "",
    priorDiagnosis: "",
    priorTreatments: "",
    priorBiopsies: "",
    diseaseCourse: "",
    medicationChanges: "",
    exposures: "",
    currentSymptoms: { itching: 0, flaking: false, colorChange: false },
    currentTreatments: "",
    currentLocation: "",
    allergies: "",
    pastMedical: "",
    pastSurgical: "",
    familyHistory: "",
    socialHistory: "",
    ros: "",
    bsaRegions: {
      head: { patch: 0, plaque: 0, tumor: 0 },
      neck: { patch: 0, plaque: 0, tumor: 0 },
      anteriorTrunk: { patch: 0, plaque: 0, tumor: 0 },
      arms: { patch: 0, plaque: 0, tumor: 0 },
      forearms: { patch: 0, plaque: 0, tumor: 0 },
      hands: { patch: 0, plaque: 0, tumor: 0 },
      posteriorTrunk: { patch: 0, plaque: 0, tumor: 0 },
      buttocks: { patch: 0, plaque: 0, tumor: 0 },
      thighs: { patch: 0, plaque: 0, tumor: 0 },
      legs: { patch: 0, plaque: 0, tumor: 0 },
      feet: { patch: 0, plaque: 0, tumor: 0 },
      groin: { patch: 0, plaque: 0, tumor: 0 }
    },
    vitals: "",
    generalExam: "",
    lymphNodes: "",
    laboratory: "",
    flowCytometry: "",
    pathology: "",
    imaging: "",
    stage: "",
    ctclExplanation: "",
    treatmentPlan: "",
    followUp: "",
    clipiType: 'early',
    earlyClipi: {
      male: false,
      ageOver60: false,
      plaques: false,
      folliculotropic: false,
      n1nx: false
    },
    lateClipi: {
      male: false,
      ageOver60: false,
      b1b2: false,
      n23: false,
      visceralInvolvement: false
    }
  })

  // EPIC Configuration
  const [epicConfig, setEpicConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('epicConfig')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return {
      configured: false,
      serverUrl: "",
      clientId: "",
      clientSecret: "",
      organizationName: ""
    }
  })

  const [showEpicSetup, setShowEpicSetup] = useState(false)

  // BSA percentages from template
  const bsaPercentages = {
    head: 7, neck: 2, anteriorTrunk: 13, arms: 8, forearms: 6, hands: 5,
    posteriorTrunk: 13, buttocks: 5, thighs: 19, legs: 14, feet: 7, groin: 1
  }

  // Calculate mSWAT score
  const calculateMSWAT = () => {
    let total = 0
    Object.values(formData.bsaRegions).forEach(region => {
      total += (region.patch * 1) + (region.plaque * 2) + (region.tumor * 4)
    })
    return total
  }

  // Calculate total BSA
  const calculateTBSA = () => {
    let totalBSA = 0
    Object.entries(formData.bsaRegions).forEach(([regionKey, region]) => {
      const maxPercentage = Math.max(region.patch, region.plaque, region.tumor)
      const regionBSA = bsaPercentages[regionKey as keyof typeof bsaPercentages]
      totalBSA += (maxPercentage / 100) * regionBSA
    })
    return totalBSA
  }

  // Calculate CLIPI scores
  const calculateEarlyClipi = () => {
    const { male, ageOver60, plaques, folliculotropic, n1nx } = formData.earlyClipi
    return [male, ageOver60, plaques, folliculotropic, n1nx].filter(Boolean).length
  }

  const calculateLateClipi = () => {
    const { male, ageOver60, b1b2, n23, visceralInvolvement } = formData.lateClipi
    return [male, ageOver60, b1b2, n23, visceralInvolvement].filter(Boolean).length
  }

  // Generate EPIC note matching the exact template format
  const generateEpicNote = () => {
    const mswat = calculateMSWAT()
    const tbsa = calculateTBSA()
    const earlyClipi = calculateEarlyClipi()
    const lateClipi = calculateLateClipi()

    return `Division of Cutaneous Oncology
Initial Visit

History of Present Illness: ${formData.name} is a ${formData.age} ${formData.sex} who presents for initial consultation for suspected CTCL, referred by [referring provider].

Narrative HPI: [To be completed]

Registry:
Date of initial visit with CTCL specialist: ${formData.dateOfInitialVisit}
Date of onset of skin lesions: ${formData.dateOfOnset}
Initial symptoms at presentation:
- Itching (1-10): ${formData.initialSymptoms.itching}
- Flaking/scaling: ${formData.initialSymptoms.flaking ? 'Yes' : 'No'}
- Color change: ${formData.initialSymptoms.colorChange ? 'Yes' : 'No'}
Initial lesion type: ${formData.initialLesionType}
Initial quantity of lesions: ${formData.initialQuantity}
Initial location of lesions: ${formData.initialLocation}
Prior diagnosis for CTCL lesions: ${formData.priorDiagnosis}
Prior treatments for CTCL lesions: ${formData.priorTreatments}
Prior skin biopsies: ${formData.priorBiopsies}
Disease course since lesion onset: ${formData.diseaseCourse}
Medication changes prior to lesion onset: ${formData.medicationChanges}
Exposures: ${formData.exposures}
Current symptoms:
- Itching (1-10): ${formData.currentSymptoms.itching}
- Flaking/scaling: ${formData.currentSymptoms.flaking ? 'Yes' : 'No'}
- Color change: ${formData.currentSymptoms.colorChange ? 'Yes' : 'No'}
Current treatments: ${formData.currentTreatments}
Current location of lesions: ${formData.currentLocation}

Patient History:
Allergies: ${formData.allergies}
Past Medical: ${formData.pastMedical}
Past Surgical: ${formData.pastSurgical}
Family History: ${formData.familyHistory}
Social History: ${formData.socialHistory}
ROS: ${formData.ros}

Physical Exam:
Vitals: ${formData.vitals}
General: ${formData.generalExam}
Lymph: ${formData.lymphNodes}

TBSE including mucosal surfaces was performed. Notable findings:
[Physical exam findings to be documented]

TBSA: ${tbsa.toFixed(1)}%, mSWAT: ${mswat}

Body Surface Area Assessment:
${Object.entries(formData.bsaRegions).map(([region, values]) => {
  const regionName = region.charAt(0).toUpperCase() + region.slice(1).replace(/([A-Z])/g, ' $1')
  const percentage = bsaPercentages[region as keyof typeof bsaPercentages]
  return `${regionName} (${percentage}%): Patch ${values.patch}%, Plaque ${values.plaque}%, Tumor ${values.tumor}%`
}).join('\n')}

Severity Weighting Factors:
Patches (x1): ${Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.patch, 0)}%
Plaques (x2): ${Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.plaque, 0)}%
Tumors (x4): ${Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.tumor, 0)}%
mSWAT Total: ${mswat}

PATHOLOGY, IMAGING AND LABORATORY DATA:
Laboratory: ${formData.laboratory}
Flow Cytometry: ${formData.flowCytometry}
Pathology: ${formData.pathology}
Imaging: ${formData.imaging}

ASSESSMENT:
${formData.name} is a ${formData.age} ${formData.sex} with stage ${formData.stage}. Today patient with ${tbsa.toFixed(1)}% TBSA involvement, mSWAT ${mswat}.

${formData.ctclExplanation}

PLAN:
${formData.treatmentPlan}

Prognostic Index (${formData.clipiType === 'early' ? 'Early' : 'Late'} CLIPI):
${formData.clipiType === 'early' ? `
Early CLIPI Prognostic Index:
Male: ${formData.earlyClipi.male ? 'Yes (1 point)' : 'No (0 points)'}
Age > 60: ${formData.earlyClipi.ageOver60 ? 'Yes (1 point)' : 'No (0 points)'}
Plaques: ${formData.earlyClipi.plaques ? 'Yes (1 point)' : 'No (0 points)'}
Folliculotropic: ${formData.earlyClipi.folliculotropic ? 'Yes (1 point)' : 'No (0 points)'}
N1/Nx: ${formData.earlyClipi.n1nx ? 'Yes (1 point)' : 'No (0 points)'}
Total Points: ${earlyClipi}/5
Risk Group: Group ${earlyClipi <= 1 ? '1' : earlyClipi === 2 ? '2' : '3'}
` : `
Late CLIPI Prognostic Index:
Male: ${formData.lateClipi.male ? 'Yes (1 point)' : 'No (0 points)'}
Age > 60: ${formData.lateClipi.ageOver60 ? 'Yes (1 point)' : 'No (0 points)'}
B1/B2: ${formData.lateClipi.b1b2 ? 'Yes (1 point)' : 'No (0 points)'}
N2/3: ${formData.lateClipi.n23 ? 'Yes (1 point)' : 'No (0 points)'}
Visceral involvement: ${formData.lateClipi.visceralInvolvement ? 'Yes (1 point)' : 'No (0 points)'}
Total Points: ${lateClipi}/5
Risk Group: Group ${lateClipi <= 1 ? '1' : lateClipi === 2 ? '2' : '3'}
`}

Follow-up: ${formData.followUp}

---
Generated by CTCL Assessment Tool
Date: ${new Date().toLocaleString()}`
  }

  // Save EPIC configuration
  const saveEpicConfig = (config) => {
    const updatedConfig = { ...config, configured: true }
    setEpicConfig(updatedConfig)
    localStorage.setItem('epicConfig', JSON.stringify(updatedConfig))
    setShowEpicSetup(false)
  }

  // Reset EPIC configuration
  const resetEpicConfig = () => {
    const resetConfig = {
      configured: false,
      serverUrl: "",
      clientId: "",
      clientSecret: "",
      organizationName: ""
    }
    setEpicConfig(resetConfig)
    localStorage.removeItem('epicConfig')
    setShowEpicSetup(true)
  }

  // EPIC Export Function
  const handleEpicExport = async () => {
    if (!epicConfig.configured) {
      alert('EPIC integration not configured. Please configure first.')
      return
    }

    if (!formData.name || !formData.mrn) {
      alert('Patient name and MRN are required for EPIC export.')
      return
    }

    try {
      const clinicalNote = generateEpicNote()
      const base64Content = btoa(clinicalNote)
      
      const documentReference = {
        resourceType: "DocumentReference",
        status: "current",
        type: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11506-3"
            }
          ]
        },
        subject: {
          reference: `/Patient/${formData.epicPatientId || formData.mrn}`
        },
        content: [
          {
            attachment: {
              contentType: "text/plain",
              data: base64Content
            }
          }
        ],
        context: {
          encounter: {
            reference: `/Encounter/${formData.epicEncounterId}`
          }
        }
      }

      const token = await getEpicOAuthToken()
      
      const response = await fetch(`${epicConfig.serverUrl}/DocumentReference`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(documentReference)
      })

      if (!response.ok) {
        throw new Error(`EPIC API Error: ${response.status} ${response.statusText}`)
      }

      const location = response.headers.get('Location')
      const documentId = location ? location.split('/').pop() : 'Unknown'
      
      alert(`Success! CTCL assessment filed to EPIC chart.\n\nDocument ID: ${documentId}\nPatient: ${formData.name}\nmSWAT: ${calculateMSWAT()}, TBSA: ${calculateTBSA().toFixed(1)}%`)
      
    } catch (error) {
      console.error('EPIC Export Error:', error)
      alert(`Export failed: ${error.message}`)
    }
  }

  const getEpicOAuthToken = async () => {
    const baseUrl = epicConfig.serverUrl.replace('/api/FHIR/STU3', '').replace('/interconnect-fhir-oauth', '')
    const tokenEndpoint = `${baseUrl}/interconnect-fhir-oauth/oauth2/token`
    
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: epicConfig.clientId,
      client_secret: epicConfig.clientSecret,
      scope: 'system/DocumentReference.write system/Patient.read system/Encounter.read'
    })

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params
    })

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`)
    }

    const tokenData = await response.json()
    return tokenData.access_token
  }

  // EPIC Setup Component
  const EpicSetupForm = () => {
    const [tempConfig, setTempConfig] = useState({
      serverUrl: epicConfig.serverUrl || "",
      clientId: epicConfig.clientId || "",
      clientSecret: epicConfig.clientSecret || "",
      organizationName: epicConfig.organizationName || ""
    })

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            EPIC EMR Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Organization Name</Label>
              <Input
                value={tempConfig.organizationName}
                onChange={(e) => setTempConfig({...tempConfig, organizationName: e.target.value})}
                placeholder="e.g., Memorial Hospital"
              />
            </div>
            <div>
              <Label>EPIC FHIR Server URL *</Label>
              <Input
                value={tempConfig.serverUrl}
                onChange={(e) => setTempConfig({...tempConfig, serverUrl: e.target.value})}
                placeholder="https://your-epic-server/api/FHIR/STU3"
              />
            </div>
            <div>
              <Label>Client ID *</Label>
              <Input
                value={tempConfig.clientId}
                onChange={(e) => setTempConfig({...tempConfig, clientId: e.target.value})}
                placeholder="Your EPIC app client ID"
              />
            </div>
            <div>
              <Label>Client Secret *</Label>
              <Input
                type="password"
                value={tempConfig.clientSecret}
                onChange={(e) => setTempConfig({...tempConfig, clientSecret: e.target.value})}
                placeholder="OAuth 2.0 client secret"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => saveEpicConfig(tempConfig)}>Save Configuration</Button>
            <Button variant="outline" onClick={() => setShowEpicSetup(false)}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    )
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
            CTCL Initial Visit Assessment
          </h1>
          <p className="text-lg text-muted-foreground">
            Division of Cutaneous Oncology - Complete assessment form matching clinical template
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
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
                    <Label>Patient Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <Label>Age</Label>
                    <Input
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <Label>Sex</Label>
                    <Select
                      value={formData.sex}
                      onValueChange={(value) => setFormData({ ...formData, sex: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>MRN</Label>
                    <Input
                      value={formData.mrn}
                      onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                      placeholder="Medical record number"
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>EPIC Patient ID (Optional)</Label>
                    <Input
                      value={formData.epicPatientId || ''}
                      onChange={(e) => setFormData({ ...formData, epicPatientId: e.target.value })}
                      placeholder="EPIC Patient ID"
                    />
                  </div>
                </div>
                <div>
                  <Label>EPIC Encounter ID (Optional)</Label>
                  <Input
                    value={formData.epicEncounterId || ''}
                    onChange={(e) => setFormData({ ...formData, epicEncounterId: e.target.value })}
                    placeholder="Current encounter ID"
                  />
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
                    <Label>Date of Initial Visit with CTCL Specialist</Label>
                    <Input
                      type="date"
                      value={formData.dateOfInitialVisit}
                      onChange={(e) => setFormData({ ...formData, dateOfInitialVisit: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Date of Onset of Skin Lesions</Label>
                    <Input
                      type="date"
                      value={formData.dateOfOnset}
                      onChange={(e) => setFormData({ ...formData, dateOfOnset: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Initial Symptoms at Presentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Itching (1-10)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.initialSymptoms.itching}
                        onChange={(e) => setFormData({
                          ...formData,
                          initialSymptoms: { ...formData.initialSymptoms, itching: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        checked={formData.initialSymptoms.flaking}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          initialSymptoms: { ...formData.initialSymptoms, flaking: checked as boolean }
                        })}
                      />
                      <Label>Flaking/Scaling</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        checked={formData.initialSymptoms.colorChange}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          initialSymptoms: { ...formData.initialSymptoms, colorChange: checked as boolean }
                        })}
                      />
                      <Label>Color Change</Label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Initial Lesion Type</Label>
                    <Select
                      value={formData.initialLesionType}
                      onValueChange={(value) => setFormData({ ...formData, initialLesionType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lesion type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patch">Patch</SelectItem>
                        <SelectItem value="plaque">Plaque</SelectItem>
                        <SelectItem value="tumor">Tumor</SelectItem>
                        <SelectItem value="erythroderma">Erythroderma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Initial Quantity of Lesions</Label>
                    <Select
                      value={formData.initialQuantity}
                      onValueChange={(value) => setFormData({ ...formData, initialQuantity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="multiple">Multiple</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Initial Location of Lesions</Label>
                  <Textarea
                    value={formData.initialLocation}
                    onChange={(e) => setFormData({ ...formData, initialLocation: e.target.value })}
                    placeholder="Where anatomically located"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Prior Diagnosis for CTCL Lesions</Label>
                  <Input
                    value={formData.priorDiagnosis}
                    onChange={(e) => setFormData({ ...formData, priorDiagnosis: e.target.value })}
                    placeholder="e.g., psoriasis, eczema, etc."
                  />
                </div>

                <div>
                  <Label>Prior Treatments for CTCL Lesions</Label>
                  <Textarea
                    value={formData.priorTreatments}
                    onChange={(e) => setFormData({ ...formData, priorTreatments: e.target.value })}
                    placeholder="Name, date started/stopped, reason for stopping, dose, response"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Prior Skin Biopsies</Label>
                  <Textarea
                    value={formData.priorBiopsies}
                    onChange={(e) => setFormData({ ...formData, priorBiopsies: e.target.value })}
                    placeholder="Dates and results"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Disease Course Since Lesion Onset</Label>
                  <Textarea
                    value={formData.diseaseCourse}
                    onChange={(e) => setFormData({ ...formData, diseaseCourse: e.target.value })}
                    placeholder="Clearance, progression, relapse"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Medication Changes Prior to Lesion Onset</Label>
                  <Input
                    value={formData.medicationChanges}
                    onChange={(e) => setFormData({ ...formData, medicationChanges: e.target.value })}
                    placeholder="If yes, specify"
                  />
                </div>

                <div>
                  <Label>Exposures (Travel, Recreation, Occupation, Environment)</Label>
                  <Textarea
                    value={formData.exposures}
                    onChange={(e) => setFormData({ ...formData, exposures: e.target.value })}
                    placeholder="Industrial, pesticides, pollution, etc."
                    rows={2}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Current Symptoms</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Itching (1-10)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        value={formData.currentSymptoms.itching}
                        onChange={(e) => setFormData({
                          ...formData,
                          currentSymptoms: { ...formData.currentSymptoms, itching: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        checked={formData.currentSymptoms.flaking}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          currentSymptoms: { ...formData.currentSymptoms, flaking: checked as boolean }
                        })}
                      />
                      <Label>Flaking/Scaling</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        checked={formData.currentSymptoms.colorChange}
                        onCheckedChange={(checked) => setFormData({
                          ...formData,
                          currentSymptoms: { ...formData.currentSymptoms, colorChange: checked as boolean }
                        })}
                      />
                      <Label>Color Change</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Current Treatments</Label>
                  <Textarea
                    value={formData.currentTreatments}
                    onChange={(e) => setFormData({ ...formData, currentTreatments: e.target.value })}
                    placeholder="Date started, dose, response"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Current Location of Lesions</Label>
                  <Textarea
                    value={formData.currentLocation}
                    onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                    placeholder="Where anatomically located"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Patient History */}
            <Card>
              <CardHeader>
                <CardTitle>Patient History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Allergies</Label>
                  <Textarea
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="Patient allergies"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Past Medical History</Label>
                  <Textarea
                    value={formData.pastMedical}
                    onChange={(e) => setFormData({ ...formData, pastMedical: e.target.value })}
                    placeholder="Past medical history"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Past Surgical History</Label>
                  <Textarea
                    value={formData.pastSurgical}
                    onChange={(e) => setFormData({ ...formData, pastSurgical: e.target.value })}
                    placeholder="Past surgical history"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Family History</Label>
                  <Textarea
                    value={formData.familyHistory}
                    onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                    placeholder="Family history"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Social History</Label>
                  <Textarea
                    value={formData.socialHistory}
                    onChange={(e) => setFormData({ ...formData, socialHistory: e.target.value })}
                    placeholder="Social history"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Review of Systems (ROS)</Label>
                  <Textarea
                    value={formData.ros}
                    onChange={(e) => setFormData({ ...formData, ros: e.target.value })}
                    placeholder="Review of systems"
                    rows={3}
                  />
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
                <CardDescription>Enter percentage for each lesion type by body region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Body Region</th>
                        <th className="border border-gray-300 p-2 text-center">% BSA for Region</th>
                        <th className="border border-gray-300 p-2 text-center">% BSA as Patch</th>
                        <th className="border border-gray-300 p-2 text-center">% BSA as Plaque</th>
                        <th className="border border-gray-300 p-2 text-center">% BSA as Tumor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(bsaPercentages).map(([region, percentage]) => (
                        <tr key={region}>
                          <td className="border border-gray-300 p-2 font-medium">
                            {region.charAt(0).toUpperCase() + region.slice(1).replace(/([A-Z])/g, ' $1')}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">{percentage}%</td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={formData.bsaRegions[region as keyof typeof formData.bsaRegions].patch}
                              onChange={(e) => setFormData({
                                ...formData,
                                bsaRegions: {
                                  ...formData.bsaRegions,
                                  [region]: {
                                    ...formData.bsaRegions[region as keyof typeof formData.bsaRegions],
                                    patch: parseInt(e.target.value) || 0
                                  }
                                }
                              })}
                              className="w-full text-center"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={formData.bsaRegions[region as keyof typeof formData.bsaRegions].plaque}
                              onChange={(e) => setFormData({
                                ...formData,
                                bsaRegions: {
                                  ...formData.bsaRegions,
                                  [region]: {
                                    ...formData.bsaRegions[region as keyof typeof formData.bsaRegions],
                                    plaque: parseInt(e.target.value) || 0
                                  }
                                }
                              })}
                              className="w-full text-center"
                            />
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={formData.bsaRegions[region as keyof typeof formData.bsaRegions].tumor}
                              onChange={(e) => setFormData({
                                ...formData,
                                bsaRegions: {
                                  ...formData.bsaRegions,
                                  [region]: {
                                    ...formData.bsaRegions[region as keyof typeof formData.bsaRegions],
                                    tumor: parseInt(e.target.value) || 0
                                  }
                                }
                              })}
                              className="w-full text-center"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Severity Weighting Calculation</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">Patches (x1)</div>
                      <div className="text-lg font-bold text-blue-600">
                        {Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.patch, 0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Plaques (x2)</div>
                      <div className="text-lg font-bold text-blue-600">
                        {Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.plaque, 0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Tumors (x4)</div>
                      <div className="text-lg font-bold text-blue-600">
                        {Object.values(formData.bsaRegions).reduce((sum, r) => sum + r.tumor, 0)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical Exam */}
            <Card>
              <CardHeader>
                <CardTitle>Physical Examination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Vitals</Label>
                  <Input
                    value={formData.vitals}
                    onChange={(e) => setFormData({ ...formData, vitals: e.target.value })}
                    placeholder="Vital signs"
                  />
                </div>
                <div>
                  <Label>General Examination</Label>
                  <Textarea
                    value={formData.generalExam}
                    onChange={(e) => setFormData({ ...formData, generalExam: e.target.value })}
                    placeholder="General appearance, neuro, mood, TBSE findings"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Lymph Nodes</Label>
                  <Input
                    value={formData.lymphNodes}
                    onChange={(e) => setFormData({ ...formData, lymphNodes: e.target.value })}
                    placeholder="Lymph node examination findings"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Laboratory and Imaging */}
            <Card>
              <CardHeader>
                <CardTitle>Pathology, Imaging and Laboratory Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Laboratory</Label>
                  <Textarea
                    value={formData.laboratory}
                    onChange={(e) => setFormData({ ...formData, laboratory: e.target.value })}
                    placeholder="Laboratory results"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Flow Cytometry</Label>
                  <Textarea
                    value={formData.flowCytometry}
                    onChange={(e) => setFormData({ ...formData, flowCytometry: e.target.value })}
                    placeholder="Flow cytometry results"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Pathology</Label>
                  <Textarea
                    value={formData.pathology}
                    onChange={(e) => setFormData({ ...formData, pathology: e.target.value })}
                    placeholder="Pathology results"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Imaging</Label>
                  <Textarea
                    value={formData.imaging}
                    onChange={(e) => setFormData({ ...formData, imaging: e.target.value })}
                    placeholder="Imaging results"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* CLIPI Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  CLIPI Prognostic Index
                </CardTitle>
                <CardDescription>Cutaneous Lymphoma International Prognostic Index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>CLIPI Type</Label>
                  <Select
                    value={formData.clipiType}
                    onValueChange={(value) => setFormData({ ...formData, clipiType: value as 'early' | 'late' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">Early CLIPI</SelectItem>
                      <SelectItem value="late">Late CLIPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.clipiType === 'early' ? (
                  <div>
                    <h4 className="font-medium mb-3">Early CLIPI Factors (1 point each)</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.earlyClipi.male}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            earlyClipi: { ...formData.earlyClipi, male: checked as boolean }
                          })}
                        />
                        <Label>Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.earlyClipi.ageOver60}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            earlyClipi: { ...formData.earlyClipi, ageOver60: checked as boolean }
                          })}
                        />
                        <Label>Age over 60</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.earlyClipi.plaques}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            earlyClipi: { ...formData.earlyClipi, plaques: checked as boolean }
                          })}
                        />
                        <Label>Plaques</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.earlyClipi.folliculotropic}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            earlyClipi: { ...formData.earlyClipi, folliculotropic: checked as boolean }
                          })}
                        />
                        <Label>Folliculotropic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.earlyClipi.n1nx}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            earlyClipi: { ...formData.earlyClipi, n1nx: checked as boolean }
                          })}
                        />
                        <Label>N1/Nx</Label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium mb-3">Late CLIPI Factors (1 point each)</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.lateClipi.male}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            lateClipi: { ...formData.lateClipi, male: checked as boolean }
                          })}
                        />
                        <Label>Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.lateClipi.ageOver60}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            lateClipi: { ...formData.lateClipi, ageOver60: checked as boolean }
                          })}
                        />
                        <Label>Age over 60</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.lateClipi.b1b2}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            lateClipi: { ...formData.lateClipi, b1b2: checked as boolean }
                          })}
                        />
                        <Label>B1/B2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.lateClipi.n23}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            lateClipi: { ...formData.lateClipi, n23: checked as boolean }
                          })}
                        />
                        <Label>N2/3</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.lateClipi.visceralInvolvement}
                          onCheckedChange={(checked) => setFormData({
                            ...formData,
                            lateClipi: { ...formData.lateClipi, visceralInvolvement: checked as boolean }
                          })}
                        />
                        <Label>Visceral involvement</Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Assessment and Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment and Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Stage</Label>
                  <Input
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    placeholder="CTCL stage"
                  />
                </div>
                <div>
                  <Label>CTCL Explanation</Label>
                  <Textarea
                    value={formData.ctclExplanation}
                    onChange={(e) => setFormData({ ...formData, ctclExplanation: e.target.value })}
                    placeholder="Clinical explanation and assessment"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Treatment Plan</Label>
                  <Textarea
                    value={formData.treatmentPlan}
                    onChange={(e) => setFormData({ ...formData, treatmentPlan: e.target.value })}
                    placeholder="Treatment plan and recommendations"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Follow-up Plan</Label>
                  <Textarea
                    value={formData.followUp}
                    onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                    placeholder="Follow-up recommendations"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* EPIC Export Integration */}
            {showEpicSetup ? (
              <EpicSetupForm />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Export to EPIC EMR
                    {epicConfig.configured && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Connected to {epicConfig.organizationName || 'EPIC'}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!epicConfig.configured ? (
                    <div className="text-center py-6">
                      <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-900 mb-2">EPIC Integration Not Configured</h4>
                      <p className="text-gray-600 mb-4">
                        Configure your EPIC connection to file clinical notes directly to patient charts.
                      </p>
                      <Button onClick={() => setShowEpicSetup(true)}>
                        <Database className="h-4 w-4 mr-2" />
                        Configure EPIC Integration
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Assessment Summary</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                              <div><strong>Patient:</strong> {formData.name || 'Unknown'}</div>
                              <div><strong>mSWAT Score:</strong> {calculateMSWAT()}</div>
                              <div><strong>TBSA:</strong> {calculateTBSA().toFixed(1)}%</div>
                              <div><strong>CLIPI Score:</strong> {formData.clipiType === 'early' ? calculateEarlyClipi() : calculateLateClipi()}/5</div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={resetEpicConfig}>
                            Reconfigure
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900">File Clinical Note</h4>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">
                          This will create a comprehensive CTCL initial visit note in the patient's EPIC chart matching the Division of Cutaneous Oncology template format.
                        </p>

                        <Button
                          disabled={!formData.name || !formData.mrn}
                          onClick={handleEpicExport}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          File to EPIC Chart
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
                      <span>TBSA:</span>
                      <span className="font-medium">{calculateTBSA().toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CLIPI Score:</span>
                      <span className="font-medium">
                        {formData.clipiType === 'early' ? calculateEarlyClipi() : calculateLateClipi()}/5
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Group:</span>
                      <span className="font-medium">
                        Group {(() => {
                          const score = formData.clipiType === 'early' ? calculateEarlyClipi() : calculateLateClipi()
                          return score <= 1 ? '1' : score === 2 ? '2' : '3'
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Patient Info</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Name: {formData.name || "Not entered"}</div>
                    <div>Age: {formData.age || "Not entered"}</div>
                    <div>MRN: {formData.mrn || "Not entered"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">EPIC Integration</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {epicConfig.configured ? (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Connected to {epicConfig.organizationName || 'EPIC'}</span>
                        </div>
                        <div>Patient ID: {formData.epicPatientId || formData.mrn || "Using MRN"}</div>
                        <div>Encounter: {formData.epicEncounterId || "Current"}</div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-3 w-3 text-amber-600" />
                        <span>Not configured</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    const note = generateEpicNote()
                    const blob = new Blob([note], { type: "text/plain" })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `CTCL_Assessment_${formData.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="w-full" 
                  disabled={!formData.name}
                >
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
