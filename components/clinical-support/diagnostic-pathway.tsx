"use client"

import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangle, CheckCircle2, FileDown } from "lucide-react"
import { DiagnosticImages } from "./diagnostic-images"

export function DiagnosticPathway() {
  const [currentStep, setCurrentStep] = useState(1)
  const [clinicalFeatures, setClinicalFeatures] = useState<string[]>([])
  const [biopsyDecision, setBiopsyDecision] = useState<string | null>(null)
  const [biopsyType, setBiopsyType] = useState<string | null>(null)
  const [selectedStains, setSelectedStains] = useState<string[]>([])

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setClinicalFeatures([...clinicalFeatures, feature])
    } else {
      setClinicalFeatures(clinicalFeatures.filter((f) => f !== feature))
    }
  }

  const handleBiopsyDecisionChange = (value: string) => {
    setBiopsyDecision(value)
  }

  const handleBiopsyTypeChange = (value: string) => {
    setBiopsyType(value)
  }

  const handleStainChange = (stain: string, checked: boolean) => {
    if (checked) {
      setSelectedStains([...selectedStains, stain])
    } else {
      setSelectedStains(selectedStains.filter((s) => s !== stain))
    }
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const resetForm = () => {
    setCurrentStep(1)
    setClinicalFeatures([])
    setBiopsyDecision(null)
    setBiopsyType(null)
    setSelectedStains([])
  }

  const getBiopsyRecommendation = () => {
    const suspiciousFeatures = [
      "persistent-patches",
      "treatment-resistant",
      "poikiloderma",
      "unusual-distribution",
      "large-cell-transformation",
    ]

    const suspiciousCount = clinicalFeatures.filter((feature) => suspiciousFeatures.includes(feature)).length

    if (suspiciousCount >= 3) {
      return "high"
    } else if (suspiciousCount >= 1) {
      return "moderate"
    } else {
      return "low"
    }
  }

  const recommendedStains = [
    { id: "cd3", name: "CD3", description: "Pan T-cell marker" },
    { id: "cd4", name: "CD4", description: "Helper T-cell marker, often expressed in MF/SS" },
    { id: "cd7", name: "CD7", description: "T-cell marker often lost in CTCL" },
    { id: "cd8", name: "CD8", description: "Cytotoxic T-cell marker" },
    { id: "cd20", name: "CD20", description: "B-cell marker to rule out B-cell lymphomas" },
    {
      id: "cd30",
      name: "CD30",
      description: "Activation marker, important for large cell transformation and CD30+ lymphoproliferative disorders",
    },
    { id: "cd45ro", name: "CD45RO", description: "Memory T-cell marker" },
    { id: "cd5", name: "CD5", description: "T-cell marker sometimes lost in CTCL" },
    { id: "foxp3", name: "FOXP3", description: "Regulatory T-cell marker" },
    { id: "tcr", name: "TCR gene rearrangement", description: "For assessment of T-cell clonality" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pathway" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pathway">Interactive Pathway</TabsTrigger>
          <TabsTrigger value="guidelines">Biopsy Guidelines</TabsTrigger>
          <TabsTrigger value="stains">Stain Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="pathway" className="space-y-4 pt-4">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 1: Assess Clinical Features</h3>
                <p className="text-sm text-muted-foreground">
                  Select all clinical features that apply to your patient. This will help determine the suspicion level
                  for CTCL.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Morphology</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="persistent-patches"
                          checked={clinicalFeatures.includes("persistent-patches")}
                          onCheckedChange={(checked) => handleFeatureChange("persistent-patches", checked as boolean)}
                        />
                        <Label htmlFor="persistent-patches">Persistent patches/plaques</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="poikiloderma"
                          checked={clinicalFeatures.includes("poikiloderma")}
                          onCheckedChange={(checked) => handleFeatureChange("poikiloderma", checked as boolean)}
                        />
                        <Label htmlFor="poikiloderma">Poikiloderma (atrophy, telangiectasia, dyspigmentation)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="follicular-prominence"
                          checked={clinicalFeatures.includes("follicular-prominence")}
                          onCheckedChange={(checked) =>
                            handleFeatureChange("follicular-prominence", checked as boolean)
                          }
                        />
                        <Label htmlFor="follicular-prominence">Follicular prominence</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tumors"
                          checked={clinicalFeatures.includes("tumors")}
                          onCheckedChange={(checked) => handleFeatureChange("tumors", checked as boolean)}
                        />
                        <Label htmlFor="tumors">Tumors</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="erythroderma"
                          checked={clinicalFeatures.includes("erythroderma")}
                          onCheckedChange={(checked) => handleFeatureChange("erythroderma", checked as boolean)}
                        />
                        <Label htmlFor="erythroderma">Erythroderma</Label>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sun-protected"
                          checked={clinicalFeatures.includes("sun-protected")}
                          onCheckedChange={(checked) => handleFeatureChange("sun-protected", checked as boolean)}
                        />
                        <Label htmlFor="sun-protected">Sun-protected areas (buttocks, trunk)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="unusual-distribution"
                          checked={clinicalFeatures.includes("unusual-distribution")}
                          onCheckedChange={(checked) => handleFeatureChange("unusual-distribution", checked as boolean)}
                        />
                        <Label htmlFor="unusual-distribution">Unusual distribution for common dermatoses</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="asymmetric"
                          checked={clinicalFeatures.includes("asymmetric")}
                          onCheckedChange={(checked) => handleFeatureChange("asymmetric", checked as boolean)}
                        />
                        <Label htmlFor="asymmetric">Asymmetric distribution</Label>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Clinical History</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="treatment-resistant"
                          checked={clinicalFeatures.includes("treatment-resistant")}
                          onCheckedChange={(checked) => handleFeatureChange("treatment-resistant", checked as boolean)}
                        />
                        <Label htmlFor="treatment-resistant">
                          Treatment-resistant dermatosis (not responding to appropriate therapy)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="waxing-waning"
                          checked={clinicalFeatures.includes("waxing-waning")}
                          onCheckedChange={(checked) => handleFeatureChange("waxing-waning", checked as boolean)}
                        />
                        <Label htmlFor="waxing-waning">Waxing and waning but persistent over years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="progressive"
                          checked={clinicalFeatures.includes("progressive")}
                          onCheckedChange={(checked) => handleFeatureChange("progressive", checked as boolean)}
                        />
                        <Label htmlFor="progressive">Progressive course</Label>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Additional Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pruritus"
                          checked={clinicalFeatures.includes("pruritus")}
                          onCheckedChange={(checked) => handleFeatureChange("pruritus", checked as boolean)}
                        />
                        <Label htmlFor="pruritus">Significant pruritus</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lymphadenopathy"
                          checked={clinicalFeatures.includes("lymphadenopathy")}
                          onCheckedChange={(checked) => handleFeatureChange("lymphadenopathy", checked as boolean)}
                        />
                        <Label htmlFor="lymphadenopathy">Lymphadenopathy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="large-cell-transformation"
                          checked={clinicalFeatures.includes("large-cell-transformation")}
                          onCheckedChange={(checked) =>
                            handleFeatureChange("large-cell-transformation", checked as boolean)
                          }
                        />
                        <Label htmlFor="large-cell-transformation">
                          Rapid growth or ulceration (suggestive of large cell transformation)
                        </Label>
                      </div>
                    </div>
                  </Card>
                </div>

                {clinicalFeatures.length > 0 && (
                  <Alert
                    className={`mt-4 ${
                      getBiopsyRecommendation() === "high"
                        ? "border-red-400 bg-red-50"
                        : getBiopsyRecommendation() === "moderate"
                          ? "border-amber-400 bg-amber-50"
                          : "border-green-400 bg-green-50"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        getBiopsyRecommendation() === "high"
                          ? "text-red-600"
                          : getBiopsyRecommendation() === "moderate"
                            ? "text-amber-600"
                            : "text-green-600"
                      }`}
                    />
                    <AlertTitle
                      className={`${
                        getBiopsyRecommendation() === "high"
                          ? "text-red-800"
                          : getBiopsyRecommendation() === "moderate"
                            ? "text-amber-800"
                            : "text-green-800"
                      }`}
                    >
                      {getBiopsyRecommendation() === "high"
                        ? "High suspicion for CTCL"
                        : getBiopsyRecommendation() === "moderate"
                          ? "Moderate suspicion for CTCL"
                          : "Low suspicion for CTCL"}
                    </AlertTitle>
                    <AlertDescription
                      className={`${
                        getBiopsyRecommendation() === "high"
                          ? "text-red-700"
                          : getBiopsyRecommendation() === "moderate"
                            ? "text-amber-700"
                            : "text-green-700"
                      }`}
                    >
                      {getBiopsyRecommendation() === "high"
                        ? "Multiple concerning features present. Skin biopsy strongly recommended."
                        : getBiopsyRecommendation() === "moderate"
                          ? "Some concerning features present. Consider skin biopsy, especially if persistent."
                          : "Few concerning features. Consider other diagnoses, but monitor closely."}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={clinicalFeatures.length === 0}>
                    Next: Biopsy Decision
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 2: Biopsy Decision</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your clinical assessment, decide whether to perform a biopsy and select the appropriate
                  technique.
                </p>

                <Alert
                  className={`${
                    getBiopsyRecommendation() === "high"
                      ? "border-red-400 bg-red-50"
                      : getBiopsyRecommendation() === "moderate"
                        ? "border-amber-400 bg-amber-50"
                        : "border-green-400 bg-green-50"
                  }`}
                >
                  <InfoIcon
                    className={`h-4 w-4 ${
                      getBiopsyRecommendation() === "high"
                        ? "text-red-600"
                        : getBiopsyRecommendation() === "moderate"
                          ? "text-amber-600"
                          : "text-green-600"
                    }`}
                  />
                  <AlertTitle>Clinical Assessment Summary</AlertTitle>
                  <AlertDescription>
                    <span className="font-medium">Suspicion level:</span>{" "}
                    {getBiopsyRecommendation() === "high"
                      ? "High"
                      : getBiopsyRecommendation() === "moderate"
                        ? "Moderate"
                        : "Low"}
                    <br />
                    <span className="font-medium">Key features:</span>{" "}
                    {clinicalFeatures.length > 0
                      ? clinicalFeatures
                          .map((feature) =>
                            feature
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" "),
                          )
                          .join(", ")
                      : "None selected"}
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Biopsy Decision</h4>
                    <RadioGroup value={biopsyDecision || ""} onValueChange={handleBiopsyDecisionChange}>
                      <div className="flex items-start space-x-2 mb-3">
                        <RadioGroupItem value="perform" id="perform" className="mt-1" />
                        <div>
                          <Label htmlFor="perform" className="font-medium">
                            Perform biopsy
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recommended for moderate to high suspicion or persistent/progressive lesions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 mb-3">
                        <RadioGroupItem value="monitor" id="monitor" className="mt-1" />
                        <div>
                          <Label htmlFor="monitor" className="font-medium">
                            Monitor and reassess
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Consider for low suspicion cases; document and follow up in 2-3 months
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="refer" id="refer" className="mt-1" />
                        <div>
                          <Label htmlFor="refer" className="font-medium">
                            Refer to specialist
                          </Label>
                          <p className="text-sm text-muted-foreground">Consider for high suspicion or complex cases</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </Card>

                  <div>
                    <DiagnosticImages.BiopsyTechnique />
                  </div>
                </div>

                {biopsyDecision === "perform" && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Biopsy Type</h4>
                    <RadioGroup value={biopsyType || ""} onValueChange={handleBiopsyTypeChange}>
                      <div className="flex items-start space-x-2 mb-3">
                        <RadioGroupItem value="punch" id="punch" className="mt-1" />
                        <div>
                          <Label htmlFor="punch" className="font-medium">
                            Punch biopsy (4-6mm)
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Standard approach for most suspected CTCL lesions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 mb-3">
                        <RadioGroupItem value="incisional" id="incisional" className="mt-1" />
                        <div>
                          <Label htmlFor="incisional" className="font-medium">
                            Incisional biopsy
                          </Label>
                          <p className="text-sm text-muted-foreground">For tumors or when larger sample is needed</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="multiple" id="multiple" className="mt-1" />
                        <div>
                          <Label htmlFor="multiple" className="font-medium">
                            Multiple biopsies
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            For different morphologies or stages (patch, plaque, tumor)
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </Card>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous: Clinical Assessment
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!biopsyDecision || (biopsyDecision === "perform" && !biopsyType)}
                  >
                    {biopsyDecision === "perform"
                      ? "Next: Stain Selection"
                      : biopsyDecision === "monitor"
                        ? "Next: Monitoring Plan"
                        : "Next: Referral Information"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && biopsyDecision === "perform" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 3: Stain Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Select the appropriate stains for your pathology request. The recommended stains are pre-selected
                  based on standard CTCL workup.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Recommended Immunohistochemical Stains</h4>
                    <div className="space-y-3">
                      {recommendedStains.map((stain) => (
                        <div key={stain.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={stain.id}
                            checked={selectedStains.includes(stain.id)}
                            onCheckedChange={(checked) => handleStainChange(stain.id, checked as boolean)}
                          />
                          <div>
                            <Label htmlFor={stain.id} className="font-medium">
                              {stain.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">{stain.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div>
                    <DiagnosticImages.StainSelection />
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <InfoIcon className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Stain Selection Guidance</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>CD3, CD4, CD7, and CD8 are essential for basic CTCL evaluation</li>
                      <li>CD30 is critical if large cell transformation is suspected</li>
                      <li>TCR gene rearrangement studies help assess T-cell clonality</li>
                      <li>
                        Consider additional stains based on differential diagnosis (e.g., CD20 to rule out B-cell
                        lymphomas)
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous: Biopsy Decision
                  </Button>
                  <Button onClick={handleNextStep} disabled={selectedStains.length === 0}>
                    Next: Summary
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && biopsyDecision === "monitor" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 3: Monitoring Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Recommendations for monitoring the patient when biopsy is deferred.
                </p>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Recommended Monitoring Approach</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Follow-up Schedule</h5>
                      <p className="text-sm text-muted-foreground">
                        Re-evaluate in 2-3 months, or sooner if lesions progress or symptoms worsen
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Documentation</h5>
                      <p className="text-sm text-muted-foreground">
                        Take clinical photographs for comparison at follow-up visits
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Patient Instructions</h5>
                      <p className="text-sm text-muted-foreground">
                        Advise patient to report any changes in lesions, new lesions, or worsening symptoms
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Threshold for Biopsy</h5>
                      <p className="text-sm text-muted-foreground">
                        Consider biopsy if lesions persist beyond 6 months despite appropriate treatment, or if any
                        concerning features develop
                      </p>
                    </div>
                  </div>
                </Card>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Important Considerations</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Document your decision-making process in the medical record</li>
                      <li>
                        Consider empiric treatment for the most likely alternative diagnosis (e.g., eczema, psoriasis)
                      </li>
                      <li>
                        Set a clear threshold for when to proceed with biopsy if the condition persists or worsens
                      </li>
                      <li>
                        Consider consultation with dermatopathologist or CTCL specialist if clinical suspicion remains
                        high
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous: Biopsy Decision
                  </Button>
                  <Button onClick={handleNextStep}>Next: Summary</Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && biopsyDecision === "refer" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 3: Referral Information</h3>
                <p className="text-sm text-muted-foreground">Guidance on appropriate referrals for suspected CTCL.</p>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Recommended Referral Options</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Dermatologic Oncology</h5>
                      <p className="text-sm text-muted-foreground">
                        Specialized in the diagnosis and management of cutaneous lymphomas and other skin cancers
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Multidisciplinary Cutaneous Lymphoma Clinic</h5>
                      <p className="text-sm text-muted-foreground">
                        Ideal for complex cases, offering coordinated care from dermatology, hematology-oncology, and
                        pathology
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h5 className="font-medium text-sm mb-1">Hematology-Oncology</h5>
                      <p className="text-sm text-muted-foreground">
                        Particularly if there are signs of systemic involvement or advanced disease
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Information to Include in Referral</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm">Detailed description of skin lesions and their evolution</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm">Duration of symptoms and response to previous treatments</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm">Clinical photographs if available</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm">Results of any previous biopsies or relevant laboratory tests</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm">Relevant medical history and current medications</p>
                    </div>
                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous: Biopsy Decision
                  </Button>
                  <Button onClick={handleNextStep}>Next: Summary</Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step 4: Summary and Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Review your diagnostic pathway decisions and generate a summary for documentation.
                </p>

                <Card className="p-6 bg-slate-50">
                  <h4 className="font-medium mb-4 text-center">Diagnostic Pathway Summary</h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium">Clinical Assessment</h5>
                      <p className="text-sm">
                        <span className="font-medium">Suspicion level:</span>{" "}
                        {getBiopsyRecommendation() === "high"
                          ? "High"
                          : getBiopsyRecommendation() === "moderate"
                            ? "Moderate"
                            : "Low"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Key features:</span>{" "}
                        {clinicalFeatures.length > 0
                          ? clinicalFeatures
                              .map((feature) =>
                                feature
                                  .split("-")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" "),
                              )
                              .join(", ")
                          : "None selected"}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="text-sm font-medium">Management Decision</h5>
                      <p className="text-sm">
                        <span className="font-medium">Plan:</span>{" "}
                        {biopsyDecision === "perform"
                          ? "Perform skin biopsy"
                          : biopsyDecision === "monitor"
                            ? "Monitor and reassess"
                            : "Refer to specialist"}
                      </p>
                      {biopsyDecision === "perform" && (
                        <p className="text-sm">
                          <span className="font-medium">Biopsy type:</span>{" "}
                          {biopsyType === "punch"
                            ? "Punch biopsy (4-6mm)"
                            : biopsyType === "incisional"
                              ? "Incisional biopsy"
                              : "Multiple biopsies"}
                        </p>
                      )}
                    </div>

                    {biopsyDecision === "perform" && (
                      <>
                        <Separator />
                        <div>
                          <h5 className="text-sm font-medium">Pathology Request</h5>
                          <p className="text-sm">
                            <span className="font-medium">Stains:</span>{" "}
                            {selectedStains.length > 0
                              ? selectedStains
                                  .map((stain) => {
                                    const stainInfo = recommendedStains.find((s) => s.id === stain)
                                    return stainInfo ? stainInfo.name : stain
                                  })
                                  .join(", ")
                              : "None selected"}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Clinical suspicion:</span> Cutaneous T-cell lymphoma
                          </p>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div>
                      <h5 className="text-sm font-medium">Next Steps</h5>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {biopsyDecision === "perform" && (
                          <>
                            <li>Schedule biopsy procedure</li>
                            <li>Submit pathology request with selected stains</li>
                            <li>Follow up with patient after results are available</li>
                          </>
                        )}
                        {biopsyDecision === "monitor" && (
                          <>
                            <li>Schedule follow-up in 2-3 months</li>
                            <li>Document baseline with clinical photographs</li>
                            <li>Provide patient with warning signs that should prompt earlier evaluation</li>
                          </>
                        )}
                        {biopsyDecision === "refer" && (
                          <>
                            <li>Prepare referral to appropriate specialist</li>
                            <li>Include all relevant clinical information and photographs</li>
                            <li>Follow up to ensure patient completes referral appointment</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={resetForm}>
                      Start Over
                    </Button>
                    <Button>
                      <FileDown className="mr-2 h-4 w-4" /> Download Summary
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>CTCL Biopsy Guidelines</CardTitle>
              <CardDescription>Best practices for obtaining diagnostic biopsies in suspected CTCL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <DiagnosticImages.DiagnosticFlowchart />

              <div>
                <h3 className="text-lg font-medium mb-2">When to Biopsy</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">High Priority for Biopsy</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>Persistent, treatment-resistant patches or plaques</li>
                      <li>Lesions with poikilodermatous features (atrophy, telangiectasia, dyspigmentation)</li>
                      <li>Unusual distribution for common dermatoses (e.g., sun-protected areas)</li>
                      <li>Rapidly growing or ulcerating tumors (suspect large cell transformation)</li>
                      <li>Erythroderma with lymphadenopathy</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Consider Biopsy</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                      <li>Dermatoses that fail to respond to appropriate therapy after 3-6 months</li>
                      <li>Recurrent rashes in the same locations</li>
                      <li>Asymmetric distribution of lesions</li>
                      <li>Significant pruritus disproportionate to clinical findings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Biopsy Technique</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <h4 className="font-medium text-sm">Optimal Biopsy Sites</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                        <li>Select thick, infiltrated, or indurated lesions when available</li>
                        <li>Avoid recently treated areas (at least 2-4 weeks after treatment)</li>
                        <li>For multiple morphologies, biopsy each distinct type</li>
                        <li>Avoid lower legs if possible (high background inflammation)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-md">
                      <h4 className="font-medium text-sm">Biopsy Size and Depth</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                        <li>Punch biopsy: 4-6mm preferred (3mm often insufficient)</li>
                        <li>Include subcutaneous fat when possible</li>
                        <li>For tumors: incisional biopsy may be more appropriate</li>
                        <li>Consider multiple biopsies for diagnostic certainty</li>
                      </ul>
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Specimen Handling</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Place specimen in formalin for routine histopathology and immunohistochemistry</li>
                        <li>
                          If TCR gene rearrangement studies are planned, consider a separate specimen in appropriate
                          medium (consult with your laboratory)
                        </li>
                        <li>
                          Clearly indicate clinical suspicion of CTCL on the pathology requisition to ensure appropriate
                          processing
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Clinical Information to Include</h3>
                <div className="p-3 bg-slate-50 rounded-md">
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Duration and evolution of lesions</li>
                    <li>Distribution pattern</li>
                    <li>Previous treatments and responses</li>
                    <li>Presence of systemic symptoms (e.g., pruritus, weight loss)</li>
                    <li>Relevant medical history</li>
                    <li>Specific clinical suspicion (e.g., "R/O mycosis fungoides")</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Repeat Biopsies</h3>
                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">Consider Repeat Biopsy When:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                    <li>Initial biopsy is non-diagnostic but clinical suspicion remains high</li>
                    <li>Histopathology shows "suggestive of" or "consistent with" CTCL but is not definitive</li>
                    <li>Clinical appearance or behavior of lesions changes</li>
                    <li>New lesions develop with different morphology</li>
                    <li>Suspected disease progression or large cell transformation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stains" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Immunohistochemical Stain Selection Guide</CardTitle>
              <CardDescription>Comprehensive guide to selecting appropriate stains for CTCL diagnosis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <DiagnosticImages.StainSelection />

              <div>
                <h3 className="text-lg font-medium mb-2">Essential Stains</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Stain</th>
                        <th className="border p-2 text-left">Purpose</th>
                        <th className="border p-2 text-left">Typical Findings in CTCL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">CD3</td>
                        <td className="border p-2">Pan T-cell marker</td>
                        <td className="border p-2">Positive in neoplastic T-cells</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD4</td>
                        <td className="border p-2">Helper T-cell marker</td>
                        <td className="border p-2">Positive in most MF/SS cases (CD4+ phenotype is most common)</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD7</td>
                        <td className="border p-2">T-cell marker</td>
                        <td className="border p-2">Often negative or reduced (loss of CD7 is common in CTCL)</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD8</td>
                        <td className="border p-2">Cytotoxic T-cell marker</td>
                        <td className="border p-2">Usually negative in classic MF/SS (positive in CD8+ variants)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Additional Useful Stains</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Stain</th>
                        <th className="border p-2 text-left">Purpose</th>
                        <th className="border p-2 text-left">When to Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">CD30</td>
                        <td className="border p-2">Activation marker</td>
                        <td className="border p-2">
                          Always order for tumors or rapidly growing lesions (to assess for large cell transformation);
                          also for CD30+ lymphoproliferative disorders
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD20</td>
                        <td className="border p-2">B-cell marker</td>
                        <td className="border p-2">
                          To rule out B-cell lymphomas or assess B-cell component in the infiltrate
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD5</td>
                        <td className="border p-2">T-cell marker</td>
                        <td className="border p-2">
                          Can be lost in some CTCL cases; useful in the immunophenotypic panel
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">CD45RO</td>
                        <td className="border p-2">Memory T-cell marker</td>
                        <td className="border p-2">
                          Typically positive in CTCL; helps characterize the T-cell population
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">FOXP3</td>
                        <td className="border p-2">Regulatory T-cell marker</td>
                        <td className="border p-2">
                          For suspected Sézary syndrome or to characterize specific variants
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">PD-1</td>
                        <td className="border p-2">Follicular helper T-cell marker</td>
                        <td className="border p-2">For folliculotropic MF or to characterize specific variants</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Molecular Studies</h3>
                <div className="p-3 bg-slate-50 rounded-md">
                  <h4 className="font-medium text-sm">T-cell Receptor (TCR) Gene Rearrangement</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                    <li>
                      Purpose: To assess for T-cell clonality, which supports (but does not confirm) a diagnosis of CTCL
                    </li>
                    <li>
                      When to order: Cases with suggestive but non-diagnostic histology and immunophenotype; to
                      differentiate from reactive conditions
                    </li>
                    <li>
                      Interpretation: Clonality supports CTCL diagnosis but is not specific (can be seen in benign
                      conditions); absence of clonality does not rule out CTCL
                    </li>
                    <li>
                      Note: Correlation with clinical and histopathological findings is essential for proper
                      interpretation
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Stain Selection by Clinical Scenario</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Scenario 1: Suspected Early MF (Patch/Plaque)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Basic panel:</span> CD3, CD4, CD7, CD8
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Consider adding:</span> CD5, CD20, TCR gene rearrangement
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Scenario 2: Suspected Tumor Stage MF</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Basic panel:</span> CD3, CD4, CD7, CD8, CD30
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Consider adding:</span> Ki-67 (proliferation index), TCR gene
                      rearrangement
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Scenario 3: Suspected Sézary Syndrome</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Basic panel:</span> CD3, CD4, CD7, CD8
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Consider adding:</span> CD26 (often lost in SS), FOXP3, TCR gene
                      rearrangement
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Additional:</span> Flow cytometry on peripheral blood
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md">
                    <h4 className="font-medium text-sm">Scenario 4: Suspected CD30+ Lymphoproliferative Disorder</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">Basic panel:</span> CD3, CD4, CD8, CD30, ALK-1
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Consider adding:</span> CD15, PAX5, EMA, TCR gene rearrangement
                    </p>
                  </div>
                </div>
              </div>

              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle>Important Considerations</AlertTitle>
                <AlertDescription className="text-amber-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Immunophenotypic findings must be interpreted in the context of clinical and histopathological
                      features
                    </li>
                    <li>Early lesions may show subtle or non-specific findings; repeat biopsies may be necessary</li>
                    <li>
                      Consider consultation with dermatopathologist experienced in cutaneous lymphomas for challenging
                      cases
                    </li>
                    <li>Stain selection may vary based on laboratory availability and specific clinical features</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
