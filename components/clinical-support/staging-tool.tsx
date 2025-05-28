"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, HelpCircle, CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export function StagingTool() {
  const router = useRouter()
  const [tCategory, setTCategory] = useState<string>("")
  const [nCategory, setNCategory] = useState<string>("")
  const [mCategory, setMCategory] = useState<string>("")
  const [bCategory, setBCategory] = useState<string>("")
  const [stage, setStage] = useState<string>("")
  const [stageDescription, setStageDescription] = useState<string>("")
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [progress, setProgress] = useState<number>(0)
  const [activeSection, setActiveSection] = useState<string>("t")

  // Update progress whenever a category is selected
  useEffect(() => {
    let completed = 0
    if (tCategory) completed += 25
    if (nCategory) completed += 25
    if (mCategory) completed += 25
    if (bCategory) completed += 25
    setProgress(completed)
  }, [tCategory, nCategory, mCategory, bCategory])

  // Calculate stage whenever TNMB categories change
  useEffect(() => {
    if (tCategory && nCategory && mCategory && bCategory) {
      calculateStage()
    } else {
      setStage("")
      setStageDescription("")
      setRecommendations([])
    }
  }, [tCategory, nCategory, mCategory, bCategory])

  const calculateStage = () => {
    // ISCL/EORTC staging for MF/SS
    let calculatedStage = ""
    let calculatedDescription = ""
    let calculatedRecommendations: string[] = []

    if (tCategory === "T1" && nCategory === "N0" && mCategory === "M0" && (bCategory === "B0" || bCategory === "B1")) {
      calculatedStage = "IA"
      calculatedDescription = "Limited patches/plaques (<10% BSA)"
      calculatedRecommendations = [
        "Skin-directed therapies (topical corticosteroids, topical retinoids, phototherapy)",
        "Regular follow-up every 3-6 months",
        "Patient education on skin care and symptom management",
        "Consider clinical trial participation",
      ]
    } else if (
      tCategory === "T2" &&
      nCategory === "N0" &&
      mCategory === "M0" &&
      (bCategory === "B0" || bCategory === "B1")
    ) {
      calculatedStage = "IB"
      calculatedDescription = "Generalized patches/plaques (≥10% BSA)"
      calculatedRecommendations = [
        "Skin-directed therapies (phototherapy, topical nitrogen mustard, topical retinoids)",
        "Consider combination of skin-directed therapies",
        "Regular follow-up every 3-4 months",
        "Consider referral to CTCL specialist center",
        "Consider clinical trial participation",
      ]
    } else if (
      (tCategory === "T1" || tCategory === "T2") &&
      nCategory === "N1" &&
      mCategory === "M0" &&
      (bCategory === "B0" || bCategory === "B1")
    ) {
      calculatedStage = "IIA"
      calculatedDescription = "Skin involvement + clinically abnormal lymph nodes without histologic involvement"
      calculatedRecommendations = [
        "Skin-directed therapies as in stage IA/IB",
        "Consider systemic therapies if skin-directed therapies fail",
        "Regular follow-up every 3 months",
        "Lymph node monitoring",
        "Referral to CTCL specialist center recommended",
      ]
    } else if (
      tCategory === "T3" &&
      nCategory === "N0-N1" &&
      mCategory === "M0" &&
      (bCategory === "B0" || bCategory === "B1")
    ) {
      calculatedStage = "IIB"
      calculatedDescription = "One or more skin tumors"
      calculatedRecommendations = [
        "Referral to multidisciplinary cutaneous lymphoma clinic strongly recommended",
        "Consider radiation therapy for localized tumors",
        "Systemic therapies often required (retinoids, interferon, HDAC inhibitors)",
        "Regular follow-up every 2-3 months",
        "Consider clinical trial participation",
      ]
    } else if (
      tCategory === "T4" &&
      nCategory === "N0-N1" &&
      mCategory === "M0" &&
      (bCategory === "B0" || bCategory === "B1")
    ) {
      calculatedStage = "IIIA"
      calculatedDescription = "Erythroderma without significant blood involvement"
      calculatedRecommendations = [
        "Referral to multidisciplinary cutaneous lymphoma clinic strongly recommended",
        "Consider photopheresis, particularly for erythrodermic disease",
        "Systemic therapies (retinoids, interferon, HDAC inhibitors)",
        "Regular follow-up every 1-2 months",
        "Monitor for blood involvement with flow cytometry",
        "Consider clinical trial participation",
      ]
    } else if (tCategory === "T4" && nCategory === "N0-N1" && mCategory === "M0" && bCategory === "B2") {
      calculatedStage = "IIIB"
      calculatedDescription = "Erythroderma with significant blood involvement (B2)"
      calculatedRecommendations = [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Extracorporeal photopheresis often first-line therapy",
        "Systemic therapies (mogamulizumab, HDAC inhibitors, alemtuzumab)",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Monitor for disease progression and infection risk",
      ]
    } else if (
      (tCategory === "T1-T4" && nCategory === "N2-N3" && mCategory === "M0") ||
      (tCategory === "T1-T4" && nCategory === "N0-N3" && mCategory === "M0" && bCategory === "B3")
    ) {
      calculatedStage = "IVA1/IVA2"
      calculatedDescription = "Lymph node involvement (N2-N3) and/or significant blood involvement (B3)"
      calculatedRecommendations = [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Systemic therapies (mogamulizumab, brentuximab vedotin for CD30+ disease)",
        "Consider combination therapies",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Consider stem cell transplantation for eligible patients",
      ]
    } else if (tCategory === "T1-T4" && nCategory === "N0-N3" && mCategory === "M1" && bCategory === "B0-B3") {
      calculatedStage = "IVB"
      calculatedDescription = "Visceral organ involvement"
      calculatedRecommendations = [
        "Urgent referral to multidisciplinary cutaneous lymphoma clinic",
        "Systemic chemotherapy often required",
        "Consider targeted therapies based on disease characteristics",
        "Regular follow-up every 1-2 months",
        "Consider clinical trial participation",
        "Consider stem cell transplantation for eligible patients",
        "Palliative care consultation for symptom management",
      ]
    } else {
      calculatedStage = "Indeterminate"
      calculatedDescription = "Unable to determine stage with the provided information"
      calculatedRecommendations = [
        "Ensure all TNMB categories are correctly assessed",
        "Consider additional diagnostic workup",
        "Consult with CTCL specialist",
      ]
    }

    // Set the stage data in state (still needed for potential local use)
    setStage(calculatedStage)
    setStageDescription(calculatedDescription)
    setRecommendations(calculatedRecommendations)

    // Navigate to the results page with query parameters
    router.push(
      `/staging-results?stage=${calculatedStage}&t=${tCategory}&n=${nCategory}&m=${mCategory}&b=${bCategory}&description=${encodeURIComponent(calculatedDescription)}&recommendations=${encodeURIComponent(JSON.stringify(calculatedRecommendations))}`,
    )
  }

  const resetForm = () => {
    setTCategory("")
    setNCategory("")
    setMCategory("")
    setBCategory("")
    setStage("")
    setStageDescription("")
    setRecommendations([])
    setActiveSection("t")
  }

  const handleNextSection = () => {
    if (activeSection === "t" && tCategory) {
      setActiveSection("n")
    } else if (activeSection === "n" && nCategory) {
      setActiveSection("m")
    } else if (activeSection === "m" && mCategory) {
      setActiveSection("b")
    }
  }

  const handlePreviousSection = () => {
    if (activeSection === "b") {
      setActiveSection("m")
    } else if (activeSection === "m") {
      setActiveSection("n")
    } else if (activeSection === "n") {
      setActiveSection("t")
    }
  }

  const renderTooltip = (content: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground ml-1 inline cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="staging" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staging">Interactive Staging Tool</TabsTrigger>
          <TabsTrigger value="reference">TNMB Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="staging" className="space-y-6 pt-4">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">CTCL Staging Progress</CardTitle>
              <CardDescription>Complete all TNMB categories to calculate the stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{progress}% complete</span>
                  <span>100%</span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <div
                    className={`text-center p-1 rounded ${tCategory ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    <span className="text-xs font-medium">T: {tCategory || "Not set"}</span>
                  </div>
                  <div
                    className={`text-center p-1 rounded ${nCategory ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    <span className="text-xs font-medium">N: {nCategory || "Not set"}</span>
                  </div>
                  <div
                    className={`text-center p-1 rounded ${mCategory ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    <span className="text-xs font-medium">M: {mCategory || "Not set"}</span>
                  </div>
                  <div
                    className={`text-center p-1 rounded ${bCategory ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    <span className="text-xs font-medium">B: {bCategory || "Not set"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {activeSection === "t" && (
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center">
                  T: Skin Involvement {renderTooltip("Describes the extent and type of skin lesions")}
                </CardTitle>
                <CardDescription>Select the option that best describes the skin involvement</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup value={tCategory} onValueChange={setTCategory} className="space-y-4">
                  <div
                    className={`p-3 rounded-lg border ${tCategory === "T1" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="T1" id="T1" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="T1" className="font-medium">
                            T1: Limited patches/plaques
                          </Label>
                          {tCategory === "T1" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">&lt;10% of total body surface area (BSA)</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${tCategory === "T2" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="T2" id="T2" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="T2" className="font-medium">
                            T2: Generalized patches/plaques
                          </Label>
                          {tCategory === "T2" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">≥10% of total body surface area (BSA)</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${tCategory === "T3" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="T3" id="T3" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="T3" className="font-medium">
                            T3: Tumors
                          </Label>
                          {tCategory === "T3" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">One or more tumors (≥1 cm diameter)</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${tCategory === "T4" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="T4" id="T4" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="T4" className="font-medium">
                            T4: Erythroderma
                          </Label>
                          {tCategory === "T4" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">Diffuse erythema covering ≥80% BSA</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex justify-end mt-4">
                  <Button onClick={handleNextSection} disabled={!tCategory}>
                    Next: Lymph Nodes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "n" && (
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center">
                  N: Lymph Node Involvement {renderTooltip("Describes the status of lymph nodes")}
                </CardTitle>
                <CardDescription>Select the option that best describes the lymph node involvement</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup value={nCategory} onValueChange={setNCategory} className="space-y-4">
                  <div
                    className={`p-3 rounded-lg border ${nCategory === "N0" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="N0" id="N0" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="N0" className="font-medium">
                            N0: No abnormal lymph nodes
                          </Label>
                          {nCategory === "N0" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">No clinically abnormal peripheral lymph nodes</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${nCategory === "N1" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="N1" id="N1" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="N1" className="font-medium">
                            N1: Clinically abnormal, histologically negative
                          </Label>
                          {nCategory === "N1" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">Enlarged nodes, no histologic involvement</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${nCategory === "N2" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="N2" id="N2" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="N2" className="font-medium">
                            N2: Clinically normal, histologically positive
                          </Label>
                          {nCategory === "N2" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Normal-appearing nodes with histologic involvement
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${nCategory === "N3" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="N3" id="N3" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="N3" className="font-medium">
                            N3: Clinically abnormal, histologically positive
                          </Label>
                          {nCategory === "N3" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">Enlarged nodes with histologic involvement</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handlePreviousSection}>
                    Previous: Skin
                  </Button>
                  <Button onClick={handleNextSection} disabled={!nCategory}>
                    Next: Visceral Organs
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "m" && (
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center">
                  M: Visceral Organ Involvement {renderTooltip("Describes involvement of internal organs")}
                </CardTitle>
                <CardDescription>Select the option that best describes visceral organ involvement</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup value={mCategory} onValueChange={setMCategory} className="space-y-4">
                  <div
                    className={`p-3 rounded-lg border ${mCategory === "M0" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="M0" id="M0" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="M0" className="font-medium">
                            M0: No visceral organ involvement
                          </Label>
                          {mCategory === "M0" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">No evidence of disease in internal organs</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${mCategory === "M1" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="M1" id="M1" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="M1" className="font-medium">
                            M1: Visceral organ involvement
                          </Label>
                          {mCategory === "M1" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">Histologically confirmed visceral involvement</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handlePreviousSection}>
                    Previous: Lymph Nodes
                  </Button>
                  <Button onClick={handleNextSection} disabled={!mCategory}>
                    Next: Blood
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "b" && (
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 rounded-t-lg">
                <CardTitle className="text-lg flex items-center">
                  B: Blood Involvement {renderTooltip("Describes the level of blood involvement with Sézary cells")}
                </CardTitle>
                <CardDescription>Select the option that best describes the blood involvement</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup value={bCategory} onValueChange={setBCategory} className="space-y-4">
                  <div
                    className={`p-3 rounded-lg border ${bCategory === "B0" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="B0" id="B0" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="B0" className="font-medium">
                            B0: Absent/minimal blood involvement
                          </Label>
                          {bCategory === "B0" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ≤5% of peripheral blood lymphocytes are Sézary cells
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${bCategory === "B1" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="B1" id="B1" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="B1" className="font-medium">
                            B1: Low blood involvement
                          </Label>
                          {bCategory === "B1" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          &gt;5% Sézary cells but does not meet criteria for B2
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border ${bCategory === "B2" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"}`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="B2" id="B2" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Label htmlFor="B2" className="font-medium">
                            B2: High blood involvement
                          </Label>
                          {bCategory === "B2" && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ≥1000/μL Sézary cells or CD4/CD8 ratio ≥10 with abnormal immunophenotype
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handlePreviousSection}>
                    Previous: Visceral Organs
                  </Button>
                  <Button onClick={calculateStage} disabled={!bCategory} className="bg-green-600 hover:bg-green-700">
                    <Calculator className="mr-2 h-4 w-4" /> Calculate Stage
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Remove this entire section
  {stage && (
    <Card className="p-6 bg-slate-50 border-2 border-blue-300">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-800">Stage {stage}</h3>
          <p className="text-lg text-blue-700">{stageDescription}</p>
        </div>

        <div className="p-4 bg-white rounded-md border">
          <h4 className="font-medium mb-3">TNMB Classification</h4>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">SKIN</div>
              <span className="font-bold text-lg">T{tCategory.substring(1)}</span>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">NODES</div>
              <span className="font-bold text-lg">N{nCategory.substring(1)}</span>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">VISCERAL</div>
              <span className="font-bold text-lg">M{mCategory.substring(1)}</span>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 font-medium mb-1">BLOOD</div>
              <span className="font-bold text-lg">B{bCategory.substring(1)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-md border">
          <h4 className="font-medium mb-3">Management Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertTitle>Prognosis Information</AlertTitle>
          <AlertDescription className="text-blue-700">
            {stage === "IA" &&
              "Excellent prognosis with 5-year survival >90%. Many patients have normal life expectancy."}
            {stage === "IB" &&
              "Very good prognosis with 5-year survival >80%. Disease may wax and wane but is generally controllable with appropriate therapy."}
            {stage === "IIA" &&
              "Good prognosis with 5-year survival >70%. Higher risk of progression than stages IA/IB."}
            {stage === "IIB" &&
              "Moderate prognosis with 5-year survival of 40-65%. Increased risk of disease progression and need for systemic therapy."}
            {stage === "IIIA" &&
              "Moderate prognosis with 5-year survival of 40-60%. Requires more aggressive management."}
            {stage === "IIIB" &&
              "Guarded prognosis with 5-year survival of 30-50%. Significant blood involvement indicates more aggressive disease."}
            {stage === "IVA1/IVA2" &&
              "Poor prognosis with 5-year survival of 20-40%. Requires aggressive systemic therapy."}
            {stage === "IVB" &&
              "Poor prognosis with 5-year survival <20%. Visceral involvement indicates advanced disease requiring aggressive management."}
          </AlertDescription>
        </Alert>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={resetForm}>
            Start Over
          </Button>
          <Button>Print Results</Button>
        </div>
      </div>
    </Card>
  )}
*/}
        </TabsContent>

        <TabsContent value="reference" className="space-y-6 pt-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">ISCL/EORTC TNMB Classification for MF/SS</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">T (Skin)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">T1</td>
                        <td className="border p-2">
                          Limited patches, papules, and/or plaques covering &lt;10% of the skin surface
                          <div className="mt-1 text-xs">
                            <span className="font-medium">T1a:</span> Patch only
                            <br />
                            <span className="font-medium">T1b:</span> Plaque ± patch
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">T2</td>
                        <td className="border p-2">
                          Patches, papules, and/or plaques covering ≥10% of the skin surface
                          <div className="mt-1 text-xs">
                            <span className="font-medium">T2a:</span> Patch only
                            <br />
                            <span className="font-medium">T2b:</span> Plaque ± patch
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">T2</td>
                        <td className="border p-2">
                          Patches, papules, and/or plaques covering ≥10% of the skin surface
                          <div className="mt-1 text-xs">
                            <span className="font-medium">T2a:</span> Patch only
                            <br />
                            <span className="font-medium">T2b:</span> Plaque ± patch
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">T3</td>
                        <td className="border p-2">One or more tumors (≥1 cm in diameter)</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">T4</td>
                        <td className="border p-2">Confluence of erythema covering ≥80% of body surface area</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">N (Lymph Nodes)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">N0</td>
                        <td className="border p-2">
                          No clinically abnormal peripheral lymph nodes; biopsy not required
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">N1</td>
                        <td className="border p-2">
                          Clinically abnormal peripheral lymph nodes; histopathologically negative for CTCL
                          <div className="mt-1 text-xs">
                            <span className="font-medium">N1a:</span> Clone negative
                            <br />
                            <span className="font-medium">N1b:</span> Clone positive
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">N2</td>
                        <td className="border p-2">
                          Clinically normal lymph nodes; histopathologically positive for CTCL
                          <div className="mt-1 text-xs">
                            <span className="font-medium">N2a:</span> Clone negative
                            <br />
                            <span className="font-medium">N2b:</span> Clone positive
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">N3</td>
                        <td className="border p-2">
                          Clinically abnormal lymph nodes; histopathologically positive for CTCL
                          <div className="mt-1 text-xs">
                            <span className="font-medium">N3a:</span> Clone negative
                            <br />
                            <span className="font-medium">N3b:</span> Clone positive
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">M (Visceral Organs)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">M0</td>
                        <td className="border p-2">No visceral organ involvement</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">M1</td>
                        <td className="border p-2">
                          Visceral involvement (must have pathological confirmation and organ involved should be
                          specified)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">B (Blood)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">B0</td>
                        <td className="border p-2">
                          Absence of significant blood involvement: ≤5% of peripheral blood lymphocytes are Sézary cells
                          <div className="mt-1 text-xs">
                            <span className="font-medium">B0a:</span> Clone negative
                            <br />
                            <span className="font-medium">B0b:</span> Clone positive
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">B1</td>
                        <td className="border p-2">
                          Low blood tumor burden: &gt;5% of peripheral blood lymphocytes are Sézary cells but does not
                          meet the criteria of B2
                          <div className="mt-1 text-xs">
                            <span className="font-medium">B1a:</span> Clone negative
                            <br />
                            <span className="font-medium">B1b:</span> Clone positive
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">B2</td>
                        <td className="border p-2">
                          High blood tumor burden: ≥1000/μL Sézary cells with positive clone or one of the following:
                          (1) expanded CD4+ or CD3+ cells with CD4/CD8 ratio ≥10, (2) expanded CD4+ cells with abnormal
                          immunophenotype
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">ISCL/EORTC Staging for MF/SS</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Stage</th>
                        <th className="border p-2 text-left">T</th>
                        <th className="border p-2 text-left">N</th>
                        <th className="border p-2 text-left">M</th>
                        <th className="border p-2 text-left">B</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">IA</td>
                        <td className="border p-2">T1</td>
                        <td className="border p-2">N0</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IB</td>
                        <td className="border p-2">T2</td>
                        <td className="border p-2">N0</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIA</td>
                        <td className="border p-2">T1-2</td>
                        <td className="border p-2">N1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIB</td>
                        <td className="border p-2">T3</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIA</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIB</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA1</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N2-3</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0-2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA2</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-3</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B3</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVB</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-3</td>
                        <td className="border p-2">M0-1</td>
                        <td className="border p-2">B0-3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
