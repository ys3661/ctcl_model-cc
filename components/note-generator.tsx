"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { buildAssessmentPlan } from "@/lib/note-builder"
import type { RiskFeatures } from "@/lib/risk-model"

interface NoteGeneratorProps {
  features: RiskFeatures
  score: number
}

export function NoteGenerator({ features, score }: NoteGeneratorProps) {
  const [lesionSite, setLesionSite] = useState("")
  const [biopsyPlanned, setBiopsyPlanned] = useState(true)
  const [clonalityRequested, setClonalityRequested] = useState(true)
  const [referralPlanned, setReferralPlanned] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState("")

  const note = buildAssessmentPlan(features, score, {
    lesionSite,
    biopsyPlanned,
    clonalityRequested,
    referralPlanned,
    additionalNotes,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <FileText className="mr-2 h-5 w-5" />
          Assessment &amp; Plan Note
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate a copy-paste note documenting that CTCL was considered, with the recommended workup.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="lesion-site" className="text-sm">
              Lesion site (optional)
            </Label>
            <Input
              id="lesion-site"
              placeholder="e.g., left thigh plaque"
              value={lesionSite}
              onChange={(e) => setLesionSite(e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:pt-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-green-600 h-4 w-4"
                checked={biopsyPlanned}
                onChange={(e) => setBiopsyPlanned(e.target.checked)}
              />
              Biopsy planned/obtained
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-green-600 h-4 w-4"
                checked={clonalityRequested}
                onChange={(e) => setClonalityRequested(e.target.checked)}
              />
              Request TCR clonality studies
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-green-600 h-4 w-4"
                checked={referralPlanned}
                onChange={(e) => setReferralPlanned(e.target.checked)}
              />
              Specialist referral placed
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="additional-notes" className="text-sm">
            Additional notes (optional)
          </Label>
          <Textarea
            id="additional-notes"
            placeholder="Anything else to append to the note..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={2}
          />
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{note}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <CopyButton value={note} label="Copy note" />
        </div>
      </CardContent>
    </Card>
  )
}
