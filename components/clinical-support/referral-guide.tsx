"use client"

import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle, FileDown, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ReferralImages } from "./referral-images"

export function ReferralGuide() {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])
  const [referralType, setReferralType] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<string | null>(null)

  const handleCriteriaChange = (criterion: string, checked: boolean) => {
    if (checked) {
      setSelectedCriteria([...selectedCriteria, criterion])
    } else {
      setSelectedCriteria(selectedCriteria.filter((c) => c !== criterion))
    }
  }

  const calculateReferralRecommendation = () => {
    // High-priority criteria that suggest specialist referral
    const highPriorityCriteria = [
      "tumor-stage",
      "erythroderma",
      "large-cell",
      "blood-involvement",
      "lymphadenopathy",
      "visceral-involvement",
      "treatment-failure",
      "rapid-progression",
    ]

    // Count high-priority criteria
    const highPriorityCount = selectedCriteria.filter((criterion) => highPriorityCriteria.includes(criterion)).length

    // Determine referral type based on criteria
    if (highPriorityCount >= 2 || selectedCriteria.includes("visceral-involvement")) {
      setReferralType("multidisciplinary")
      setUrgency("urgent")
    } else if (highPriorityCount === 1 || selectedCriteria.length >= 3) {
      setReferralType("dermatologic-oncology")
      setUrgency("soon")
    } else if (selectedCriteria.length > 0) {
      setReferralType("dermatologic-oncology")
      setUrgency("routine")
    } else {
      setReferralType(null)
      setUrgency(null)
    }
  }

  const resetForm = () => {
    setSelectedCriteria([])
    setReferralType(null)
    setUrgency(null)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="interactive" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interactive">Interactive Guide</TabsTrigger>
          <TabsTrigger value="criteria">Referral Criteria</TabsTrigger>
          <TabsTrigger value="centers">Specialist Centers</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive" className="space-y-6 pt-4">
          <div className="mb-6">
            <ReferralImages.ReferralPathway />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Clinical Criteria</h3>
            <p className="text-sm text-muted-foreground">
              Check all criteria that apply to your patient. This will help determine the appropriate referral pathway.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h4 className="font-medium mb-3">Disease Characteristics</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tumor-stage"
                      checked={selectedCriteria.includes("tumor-stage")}
                      onCheckedChange={(checked) => handleCriteriaChange("tumor-stage", checked as boolean)}
                    />
                    <Label htmlFor="tumor-stage">Tumor stage (T3) disease</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="erythroderma"
                      checked={selectedCriteria.includes("erythroderma")}
                      onCheckedChange={(checked) => handleCriteriaChange("erythroderma", checked as boolean)}
                    />
                    <Label htmlFor="erythroderma">Erythroderma (T4)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="large-cell"
                      checked={selectedCriteria.includes("large-cell")}
                      onCheckedChange={(checked) => handleCriteriaChange("large-cell", checked as boolean)}
                    />
                    <Label htmlFor="large-cell">Large cell transformation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="blood-involvement"
                      checked={selectedCriteria.includes("blood-involvement")}
                      onCheckedChange={(checked) => handleCriteriaChange("blood-involvement", checked as boolean)}
                    />
                    <Label htmlFor="blood-involvement">Blood involvement (B1 or B2)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lymphadenopathy"
                      checked={selectedCriteria.includes("lymphadenopathy")}
                      onCheckedChange={(checked) => handleCriteriaChange("lymphadenopathy", checked as boolean)}
                    />
                    <Label htmlFor="lymphadenopathy">Lymphadenopathy with histologic involvement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visceral-involvement"
                      checked={selectedCriteria.includes("visceral-involvement")}
                      onCheckedChange={(checked) => handleCriteriaChange("visceral-involvement", checked as boolean)}
                    />
                    <Label htmlFor="visceral-involvement">Visceral organ involvement</Label>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-3">Clinical Course</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="treatment-failure"
                      checked={selectedCriteria.includes("treatment-failure")}
                      onCheckedChange={(checked) => handleCriteriaChange("treatment-failure", checked as boolean)}
                    />
                    <Label htmlFor="treatment-failure">Failure of first-line therapies</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rapid-progression"
                      checked={selectedCriteria.includes("rapid-progression")}
                      onCheckedChange={(checked) => handleCriteriaChange("rapid-progression", checked as boolean)}
                    />
                    <Label htmlFor="rapid-progression">Rapid disease progression</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="diagnostic-uncertainty"
                      checked={selectedCriteria.includes("diagnostic-uncertainty")}
                      onCheckedChange={(checked) => handleCriteriaChange("diagnostic-uncertainty", checked as boolean)}
                    />
                    <Label htmlFor="diagnostic-uncertainty">Diagnostic uncertainty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="unusual-variant"
                      checked={selectedCriteria.includes("unusual-variant")}
                      onCheckedChange={(checked) => handleCriteriaChange("unusual-variant", checked as boolean)}
                    />
                    <Label htmlFor="unusual-variant">Unusual variant or presentation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="refractory-symptoms"
                      checked={selectedCriteria.includes("refractory-symptoms")}
                      onCheckedChange={(checked) => handleCriteriaChange("refractory-symptoms", checked as boolean)}
                    />
                    <Label htmlFor="refractory-symptoms">Refractory symptoms (e.g., severe pruritus)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="clinical-trial"
                      checked={selectedCriteria.includes("clinical-trial")}
                      onCheckedChange={(checked) => handleCriteriaChange("clinical-trial", checked as boolean)}
                    />
                    <Label htmlFor="clinical-trial">Clinical trial consideration</Label>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button onClick={calculateReferralRecommendation} disabled={selectedCriteria.length === 0}>
                Generate Recommendation
              </Button>
            </div>

            {referralType && (
              <Card className="p-6 bg-slate-50">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold">Referral Recommendation</h3>
                    <p className="text-muted-foreground">Based on selected clinical criteria</p>
                  </div>

                  <div className="p-4 bg-white rounded-md border">
                    <h4 className="font-medium mb-2">Recommended Referral</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Referral Type:</p>
                        <p className="text-lg">
                          {referralType === "multidisciplinary"
                            ? "Multidisciplinary Cutaneous Lymphoma Clinic"
                            : referralType === "dermatologic-oncology"
                              ? "Dermatologic Oncology"
                              : "General Dermatology"}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Urgency:</p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={
                              urgency === "urgent" ? 100 : urgency === "soon" ? 66 : urgency === "routine" ? 33 : 0
                            }
                            className={`h-2 ${
                              urgency === "urgent" ? "bg-red-100" : urgency === "soon" ? "bg-amber-100" : "bg-green-100"
                            }`}
                            indicatorClassName={`${
                              urgency === "urgent" ? "bg-red-500" : urgency === "soon" ? "bg-amber-500" : "bg-green-500"
                            }`}
                          />
                          <span
                            className={`${
                              urgency === "urgent"
                                ? "text-red-600"
                                : urgency === "soon"
                                  ? "text-amber-600"
                                  : "text-green-600"
                            } font-medium`}
                          >
                            {urgency === "urgent"
                              ? "Urgent (within 2 weeks)"
                              : urgency === "soon"
                                ? "Soon (within 4-6 weeks)"
                                : "Routine (next available)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert
                    className={`${
                      urgency === "urgent"
                        ? "border-red-400 bg-red-50"
                        : urgency === "soon"
                          ? "border-amber-400 bg-amber-50"
                          : "border-green-400 bg-green-50"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        urgency === "urgent" ? "text-red-600" : urgency === "soon" ? "text-amber-600" : "text-green-600"
                      }`}
                    />
                    <AlertTitle>Rationale for Referral</AlertTitle>
                    <AlertDescription>
                      {urgency === "urgent" && (
                        <p>
                          Patient has multiple high-priority criteria that suggest advanced or aggressive disease
                          requiring prompt specialist evaluation and management.
                        </p>
                      )}
                      {urgency === "soon" && (
                        <p>
                          Patient has concerning features that would benefit from specialist evaluation, but may not
                          require immediate intervention.
                        </p>
                      )}
                      {urgency === "routine" && (
                        <p>
                          Patient has features that warrant specialist evaluation, but the condition appears stable and
                          can be seen at the next available appointment.
                        </p>
                      )}
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-medium mb-2">Key Information to Include in Referral</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Duration and evolution of skin lesions</li>
                      <li>Previous treatments and responses</li>
                      <li>Biopsy results (including immunohistochemistry and molecular studies)</li>
                      <li>Blood work results (CBC with differential, flow cytometry if performed)</li>
                      <li>Imaging results (if performed)</li>
                      <li>Current symptoms and their impact on quality of life</li>
                      <li>Clinical photographs (if available)</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <FileDown className="mr-2 h-4 w-4" /> Download Referral Template
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="criteria" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>CTCL Referral Criteria</CardTitle>
              <CardDescription>Guidelines for when to refer patients to specialized care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Urgent Referral Criteria</h3>
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <ul className="list-disc pl-5 space-y-1 text-sm text-red-800">
                    <li>Erythroderma (T4) with or without blood involvement</li>
                    <li>Tumor stage disease (T3), especially with ulceration</li>
                    <li>Suspected or confirmed large cell transformation</li>
                    <li>Significant blood involvement (B2)</li>
                    <li>Lymph node or visceral organ involvement</li>
                    <li>Rapid disease progression</li>
                    <li>Severe, refractory symptoms affecting quality of life</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Routine Referral Criteria</h3>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
                    <li>Early-stage disease (T1-T2) that fails to respond to first-line therapies</li>
                    <li>Diagnostic uncertainty despite multiple biopsies</li>
                    <li>Unusual clinical presentations or variants</li>
                    <li>Consideration for clinical trials or novel therapies</li>
                    <li>Patients requiring systemic therapy</li>
                    <li>Patients with comorbidities that complicate management</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Referral Types</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Multidisciplinary Cutaneous Lymphoma Clinic</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ideal for complex cases requiring coordinated care from multiple specialists
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>Advanced-stage disease (IIB-IV)</li>
                      <li>Erythrodermic disease</li>
                      <li>Blood involvement</li>
                      <li>Lymph node or visceral involvement</li>
                      <li>Cases requiring multiple treatment modalities</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Dermatologic Oncology</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Appropriate for most CTCL cases, especially early-stage disease
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>Early-stage disease (IA-IIA)</li>
                      <li>Diagnostic challenges</li>
                      <li>Management of skin-directed therapies</li>
                      <li>Monitoring for disease progression</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Hematology-Oncology</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      For cases with significant systemic involvement
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>Significant blood involvement</li>
                      <li>Lymph node or visceral involvement</li>
                      <li>Cases requiring systemic chemotherapy</li>
                      <li>Consideration for stem cell transplantation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertTitle>Referral Best Practices</AlertTitle>
                <AlertDescription className="text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Include all relevant clinical information, including duration of symptoms, treatments tried, and
                      response
                    </li>
                    <li>Send all pathology reports and, when possible, arrange for slides to be sent for review</li>
                    <li>Include clinical photographs when available</li>
                    <li>
                      Clearly communicate the reason for referral and any specific questions you would like addressed
                    </li>
                    <li>Consider calling the specialist directly for urgent cases to expedite the referral process</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="centers" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>CTCL Specialist Centers</CardTitle>
              <CardDescription>Directory of specialized centers for CTCL treatment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ReferralImages.SpecialistMap />

              <div>
                <h3 className="text-lg font-medium mb-2">Multidisciplinary Cutaneous Lymphoma Centers</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">United States</h4>
                    <div className="grid gap-2 mt-2 md:grid-cols-2">
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">Stanford University</p>
                        <p className="text-xs text-muted-foreground">Stanford Cutaneous Lymphoma Program</p>
                        <a
                          href="https://stanfordhealthcare.org/medical-clinics/cutaneous-lymphoma-clinic.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">MD Anderson Cancer Center</p>
                        <p className="text-xs text-muted-foreground">Cutaneous Lymphoma Clinic</p>
                        <a
                          href="https://www.mdanderson.org/patients-family/diagnosis-treatment/care-centers-clinics/lymphoma-center/cutaneous-lymphoma.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">Memorial Sloan Kettering</p>
                        <p className="text-xs text-muted-foreground">Cutaneous Lymphoma Program</p>
                        <a
                          href="https://www.mskcc.org/cancer-care/types/lymphoma/types/cutaneous-t-cell-lymphoma"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">Yale University</p>
                        <p className="text-xs text-muted-foreground">Yale Cutaneous Lymphoma Program</p>
                        <a
                          href="https://www.yalemedicine.org/conditions/cutaneous-t-cell-lymphoma"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Europe</h4>
                    <div className="grid gap-2 mt-2 md:grid-cols-2">
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">St. John's Institute of Dermatology</p>
                        <p className="text-xs text-muted-foreground">London, UK</p>
                        <a
                          href="https://www.guysandstthomas.nhs.uk/our-services/dermatology/specialties/skin-cancer/cutaneous-lymphoma"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="p-2 bg-white rounded border">
                        <p className="font-medium text-sm">Leiden University Medical Center</p>
                        <p className="text-xs text-muted-foreground">Leiden, Netherlands</p>
                        <a
                          href="https://www.lumc.nl/org/huidziekten/patientenzorg/wat-wij-doen/Cutane-Lymfomen/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center mt-1"
                        >
                          Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Finding a CTCL Specialist</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Specialist Directories</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>
                        <a
                          href="https://www.clfoundation.org/physician-directory"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center"
                        >
                          Cutaneous Lymphoma Foundation Physician Directory <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.usclc.org/resources/treatment-centers"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center"
                        >
                          USCLC Treatment Centers <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.lls.org/support-resources/find-doctor"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center"
                        >
                          Leukemia & Lymphoma Society Doctor Finder <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle>Important Considerations</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Consider patient travel limitations when selecting a referral center</li>
                        <li>Some centers may offer telemedicine consultations for initial evaluation or follow-up</li>
                        <li>Check insurance coverage and network status before referring to specialized centers</li>
                        <li>
                          For patients unable to travel to specialized centers, consider requesting a remote case review
                          or consultation
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
