"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FlaskConical, Lightbulb, Microscope, Dna } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { IHC_PANEL, MOLECULAR_STUDIES, BIOPSY_PEARLS, buildRequisition } from "@/lib/requisition"

const FEATURE_OPTIONS = [
  "persistent scaly patches/plaques",
  "refractory to topical corticosteroids",
  "poikiloderma",
  "pruritus",
  "multiple prior nondiagnostic biopsies",
  "lesions in non–sun-exposed (bathing-trunk) distribution",
  "hypopigmented patches",
]

export function BiopsyRequisitionBuilder() {
  const [lesionSite, setLesionSite] = useState("")
  const [lesionType, setLesionType] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [includeClonality, setIncludeClonality] = useState(true)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature],
    )
  }

  const requisition = buildRequisition({
    lesionSite,
    lesionType,
    patientAge,
    includeClonality,
    clinicalFeatures: selectedFeatures,
  })

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Alert className="border-amber-200 bg-amber-50">
          <Lightbulb className="h-4 w-4 text-amber-600" />
          <AlertTitle>Why this matters</AlertTitle>
          <AlertDescription className="text-amber-800">
            Nonspecific &quot;spongiotic dermatitis&quot; reads are a leading cause of delayed CTCL diagnosis. Telling
            pathology to rule out MF and ordering the right stains and clonality studies changes what gets reported.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Specimen details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="age" className="text-sm">
                  Patient age/sex (optional)
                </Label>
                <Input
                  id="age"
                  placeholder="e.g., 58-year-old man"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-sm">
                  Lesion type (optional)
                </Label>
                <Input
                  id="type"
                  placeholder="e.g., indurated plaque"
                  value={lesionType}
                  onChange={(e) => setLesionType(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="site" className="text-sm">
                Lesion site (optional)
              </Label>
              <Input
                id="site"
                placeholder="e.g., left thigh"
                value={lesionSite}
                onChange={(e) => setLesionSite(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Relevant history to include</Label>
              <div className="flex flex-wrap gap-2">
                {FEATURE_OPTIONS.map((feature) => {
                  const active = selectedFeatures.includes(feature)
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-border bg-background text-muted-foreground hover:border-blue-400"
                      }`}
                    >
                      {feature}
                    </button>
                  )
                })}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-green-600 h-4 w-4"
                checked={includeClonality}
                onChange={(e) => setIncludeClonality(e.target.checked)}
              />
              Request TCR gene rearrangement (clonality) studies
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="mr-2 h-5 w-5 text-amber-500" /> Biopsy pearls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {BIOPSY_PEARLS.map((pearl) => (
                <li key={pearl} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">{pearl}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <FlaskConical className="mr-2 h-5 w-5" /> Requisition text
            </CardTitle>
            <p className="text-sm text-muted-foreground">Paste into the pathology order&apos;s clinical history field.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
              {requisition}
            </pre>
            <CopyButton value={requisition} label="Copy requisition" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Microscope className="mr-2 h-5 w-5" /> Immunohistochemistry panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {IHC_PANEL.map((m) => (
                <div key={m.marker} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex min-w-[3rem] justify-center rounded bg-slate-800 px-2 py-0.5 text-xs font-semibold text-white">
                    {m.marker}
                  </span>
                  <span className="text-muted-foreground">{m.rationale}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Dna className="mr-2 h-5 w-5" /> Molecular studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {MOLECULAR_STUDIES.map((s) => (
                <div key={s.name} className="text-sm">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-muted-foreground">{s.rationale}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
