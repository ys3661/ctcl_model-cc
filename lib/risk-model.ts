/**
 * CTCL risk model — single source of truth.
 *
 * The score is a transparent weighted sum of eight clinical features (weights
 * sum to 1.0). It is a decision-support heuristic, not a validated diagnostic
 * device. Both the API route (app/api/predict) and the client calculator import
 * from here so the two can never drift apart.
 */

export type FeatureId =
  | "multiple_biopsies"
  | "failed_steroids"
  | "otherrash"
  | "scaly_patch_plaque"
  | "erythema"
  | "xerosis"
  | "pruritus"
  | "other_failed_therapies"

export type RiskFeatures = Record<FeatureId, boolean>

export interface FeatureMeta {
  id: FeatureId
  label: string
  description: string
  /** Phrase used when this feature is woven into a generated clinical note. */
  notePhrase: string
  weight: number
}

/**
 * Feature weights derived from the model's relative weightings. Order here is
 * the canonical feature order used across the app.
 */
export const FEATURES: FeatureMeta[] = [
  {
    id: "multiple_biopsies",
    label: "Multiple Biopsies",
    description: "Patient has undergone multiple skin biopsies",
    notePhrase: "multiple prior nondiagnostic skin biopsies",
    weight: 0.230368,
  },
  {
    id: "failed_steroids",
    label: "Failed Steroids",
    description: "Topical or systemic steroids have been ineffective",
    notePhrase: "refractory to topical/systemic corticosteroids",
    weight: 0.210547,
  },
  {
    id: "otherrash",
    label: "Other Rash",
    description: "Presence of or tendency to develop other skin rashes or lesions",
    notePhrase: "a persistent atypical eruption",
    weight: 0.130172,
  },
  {
    id: "scaly_patch_plaque",
    label: "Scaly Patch/Plaque",
    description: "Presence of scaly patches or raised plaques on skin",
    notePhrase: "scaly patches/plaques",
    weight: 0.11293,
  },
  {
    id: "erythema",
    label: "Erythema",
    description: "Areas of skin redness or erythematous lesions",
    notePhrase: "erythema",
    weight: 0.083891,
  },
  {
    id: "xerosis",
    label: "Xerosis",
    description: "Abnormal skin dryness or xerotic changes",
    notePhrase: "xerosis",
    weight: 0.082167,
  },
  {
    id: "pruritus",
    label: "Pruritus",
    description: "Significant itching or pruritic symptoms",
    notePhrase: "pruritus",
    weight: 0.079507,
  },
  {
    id: "other_failed_therapies",
    label: "Other Failed Therapies",
    description: "Other medical treatments have been tried and failed",
    notePhrase: "failure of additional directed therapies",
    weight: 0.070418,
  },
]

/** Convenience map of feature id → weight (mirrors the previous MODEL_WEIGHTS). */
export const MODEL_WEIGHTS = FEATURES.reduce(
  (acc, f) => {
    acc[f.id] = f.weight
    return acc
  },
  {} as Record<FeatureId, number>,
)

export const FEATURE_IDS = FEATURES.map((f) => f.id)

/** Score at or above which a patient is flagged High Risk. */
export const HIGH_RISK_THRESHOLD = 0.3

export function emptyFeatures(): RiskFeatures {
  return FEATURE_IDS.reduce((acc, id) => {
    acc[id] = false
    return acc
  }, {} as RiskFeatures)
}

/** Weighted-sum risk score in the range 0–1. */
export function computeRiskScore(features: Partial<RiskFeatures>): number {
  return FEATURES.reduce((sum, f) => (features[f.id] ? sum + f.weight : sum), 0)
}

export interface RiskInterpretation {
  level: "Low Risk" | "High Risk"
  colorClass: string
  description: string
  recommendation: string
  showNextSteps: boolean
}

export function interpretRisk(score: number): RiskInterpretation {
  if (score < HIGH_RISK_THRESHOLD) {
    return {
      level: "Low Risk",
      colorClass: "text-green-600 border-green-600",
      description:
        "Lower calculated risk score based on the selected features. A low score does not rule out CTCL — pursue biopsy if clinical suspicion persists.",
      recommendation: "Standard dermatologic follow-up as clinically indicated.",
      showNextSteps: false,
    }
  }
  return {
    level: "High Risk",
    colorClass: "text-red-600 border-red-600",
    description:
      "Elevated risk score. Clinical correlation with skin biopsy is recommended to establish or exclude the diagnosis.",
    recommendation:
      "Prompt dermatologic evaluation recommended; consider skin biopsy with histopathology and TCR clonality studies.",
    showNextSteps: true,
  }
}

/** Features that are present, in canonical order. */
export function presentFeatures(features: Partial<RiskFeatures>): FeatureMeta[] {
  return FEATURES.filter((f) => features[f.id])
}
