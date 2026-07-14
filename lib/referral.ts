/**
 * Referral routing for suspected/confirmed CTCL. Maps clinical red flags to an
 * urgency tier and specifies what to send with the patient. Not a substitute
 * for clinical judgment.
 */

export type ReferralInput = {
  erythroderma: boolean
  tumors: boolean
  lymphadenopathy: boolean
  rapidProgression: boolean
  bloodInvolvement: boolean
  largeCellTransformation: boolean
  biopsyProvenCtcl: boolean
  refractoryPersistent: boolean
}

export type UrgencyTier = "urgent" | "routine" | "observe"

export interface ReferralRecommendation {
  tier: UrgencyTier
  title: string
  timeframe: string
  destination: string
  summary: string
  redFlags: string[]
}

export const REFERRAL_FLAGS: { id: keyof ReferralInput; label: string; description: string }[] = [
  { id: "erythroderma", label: "Erythroderma", description: "Diffuse erythema over ≥80% BSA (possible Sézary syndrome)" },
  { id: "tumors", label: "Cutaneous tumors", description: "One or more tumors (≥1 cm)" },
  { id: "lymphadenopathy", label: "Lymphadenopathy", description: "Clinically enlarged or firm lymph nodes" },
  { id: "rapidProgression", label: "Rapid progression", description: "Rapidly enlarging, ulcerating, or spreading lesions" },
  { id: "bloodInvolvement", label: "Blood involvement", description: "Circulating Sézary cells / abnormal flow cytometry" },
  { id: "largeCellTransformation", label: "Large-cell transformation", description: "Large cells >25% of the infiltrate on pathology (CD30 positive or negative)" },
  { id: "biopsyProvenCtcl", label: "Biopsy-proven CTCL", description: "Histologically confirmed cutaneous T-cell lymphoma" },
  { id: "refractoryPersistent", label: "Refractory / persistent", description: "Persistent lesions refractory to appropriate therapy" },
]

const URGENT_FLAGS: (keyof ReferralInput)[] = [
  "erythroderma",
  "tumors",
  "lymphadenopathy",
  "rapidProgression",
  "bloodInvolvement",
  "largeCellTransformation",
]

export const WHAT_TO_SEND: string[] = [
  "Pathology report(s) and, if possible, the biopsy slides/blocks for expert dermatopathology review.",
  "Results of any TCR gene rearrangement (clonality) studies.",
  "CBC with differential; add Sézary flow cytometry and LDH if blood involvement is suspected.",
  "Clinical photographs documenting extent and morphology of lesions.",
  "Body surface area / mSWAT estimate and a brief treatment history (what was tried and the response).",
]

export function routeReferral(input: ReferralInput): ReferralRecommendation {
  const activeRedFlags = URGENT_FLAGS.filter((f) => input[f]).map(
    (f) => REFERRAL_FLAGS.find((x) => x.id === f)!.label,
  )

  if (activeRedFlags.length > 0) {
    return {
      tier: "urgent",
      title: "Urgent specialist referral",
      timeframe: "Refer within 1–2 weeks",
      destination:
        "Cutaneous lymphoma multidisciplinary clinic or hematology-oncology with dermatology co-management.",
      summary:
        "Red-flag features suggest advanced or aggressive disease. Expedite referral and begin the staging workup.",
      redFlags: activeRedFlags,
    }
  }

  if (input.biopsyProvenCtcl) {
    return {
      tier: "routine",
      title: "Routine specialist referral",
      timeframe: "Refer within 4–6 weeks",
      destination: "Dermatologic oncology or a dermatologist with cutaneous lymphoma expertise.",
      summary:
        "Biopsy-proven early-stage CTCL without red flags. Refer for staging confirmation and to establish a skin-directed treatment plan.",
      redFlags: [],
    }
  }

  if (input.refractoryPersistent) {
    return {
      tier: "observe",
      title: "Re-biopsy and close follow-up",
      timeframe: "Re-evaluate in 4–8 weeks",
      destination: "Manage in dermatology; low threshold to refer if features evolve.",
      summary:
        "Persistent but unproven disease. Repeat biopsy of the most indurated lesion (off topical steroids) with clonality studies, and track lesions over time before or alongside referral.",
      redFlags: [],
    }
  }

  return {
    tier: "observe",
    title: "Routine dermatologic follow-up",
    timeframe: "Routine interval",
    destination: "Continue in dermatology.",
    summary:
      "No red flags and no confirmed diagnosis. Continue monitoring and reassess if lesions persist, progress, or fail therapy.",
    redFlags: [],
  }
}
