/**
 * Builds a copy-paste assessment & plan snippet from a CTCL risk assessment.
 * Documenting that CTCL was considered has real medico-legal value given the
 * long diagnostic delay and missed-diagnosis liability around MF.
 */

import { HIGH_RISK_THRESHOLD, presentFeatures, interpretRisk, type RiskFeatures } from "@/lib/risk-model"

export interface NoteOptions {
  lesionSite?: string
  biopsyPlanned?: boolean
  clonalityRequested?: boolean
  referralPlanned?: boolean
  additionalNotes?: string
}

function joinPhrases(phrases: string[]): string {
  if (phrases.length === 0) return ""
  if (phrases.length === 1) return phrases[0]
  if (phrases.length === 2) return `${phrases[0]} and ${phrases[1]}`
  return `${phrases.slice(0, -1).join(", ")}, and ${phrases[phrases.length - 1]}`
}

export function buildAssessmentPlan(
  features: RiskFeatures,
  score: number,
  options: NoteOptions = {},
): string {
  const interpretation = interpretRisk(score)
  const present = presentFeatures(features)
  const featureText = present.length
    ? `Contributing features: ${joinPhrases(present.map((f) => f.notePhrase))}.`
    : "No contributing features selected."

  const site = options.lesionSite?.trim()
  const plan: string[] = []

  if (options.biopsyPlanned) {
    const biopsyLine = site
      ? `Skin biopsy of ${site} obtained/ordered`
      : "Skin biopsy obtained/ordered"
    plan.push(
      options.clonalityRequested
        ? `${biopsyLine} with immunohistochemistry and TCR gene rearrangement (clonality) studies; clinical history noted as "rule out mycosis fungoides / CTCL."`
        : `${biopsyLine}; clinical history noted as "rule out mycosis fungoides / CTCL."`,
    )
  }
  if (options.referralPlanned) {
    plan.push("Referral to dermatologic oncology / cutaneous lymphoma clinic placed.")
  }
  if (interpretation.level === "High Risk" && plan.length === 0) {
    plan.push("Consider skin biopsy with clonality studies and specialist referral.")
  }
  if (plan.length === 0) {
    plan.push("Continue routine dermatologic monitoring; re-evaluate if lesions persist or progress.")
  }

  const extra = options.additionalNotes?.trim()

  return [
    `CTCL risk assessment performed using CTCL Insight. ${featureText}`,
    `Weighted risk score ${score.toFixed(3)} (${interpretation.level}; High-risk threshold ${HIGH_RISK_THRESHOLD}).`,
    `Plan: ${plan.join(" ")}`,
    extra ? `Additional notes: ${extra}` : "",
    "Cutaneous T-cell lymphoma was considered and documented. Score is decision support only and does not replace clinical judgment or histopathology.",
  ]
    .filter(Boolean)
    .join(" ")
}
