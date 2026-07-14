/**
 * ISCL/EORTC TNMB classification and staging for mycosis fungoides / Sézary
 * syndrome. Single source of truth for the reference table, the interactive
 * stage calculator, and the /staging-results page.
 *
 * Reference: Olsen EA, et al. Primary cutaneous lymphoma: recommendations for
 * clinical trial design and staging update from the ISCL, USCLC, and EORTC.
 * Blood. 2022;140(5):419-437 (updates the 2007 ISCL/EORTC revision,
 * Blood 2007;110:1713). The 2022 update keeps the MF/SS stage groupings but
 * redefines blood (B) staging by flow-cytometry counts of CD4+CD26-/CD4+CD7-
 * cells rather than morphologic Sézary-cell percentages.
 */

export interface TnmbCategory {
  value: string
  label: string
  description: string
}

export const T_CATEGORIES: TnmbCategory[] = [
  { value: "T1", label: "T1", description: "Limited patches/plaques covering <10% of skin surface" },
  { value: "T2", label: "T2", description: "Patches/plaques covering ≥10% of skin surface" },
  { value: "T3", label: "T3", description: "One or more tumors (≥1 cm diameter)" },
  { value: "T4", label: "T4", description: "Confluence of erythema covering ≥80% of body surface area" },
]

export const N_CATEGORIES: TnmbCategory[] = [
  { value: "N0", label: "N0", description: "No clinically abnormal peripheral lymph nodes" },
  { value: "N1", label: "N1", description: "Clinically abnormal nodes; Dutch grade 1 (NCI LN0-2)" },
  { value: "N2", label: "N2", description: "Clinically abnormal nodes; Dutch grade 2 (NCI LN3)" },
  { value: "N3", label: "N3", description: "Clinically abnormal nodes; Dutch grade 3-4 (NCI LN4)" },
]

export const M_CATEGORIES: TnmbCategory[] = [
  { value: "M0", label: "M0", description: "No visceral organ involvement" },
  { value: "M1", label: "M1", description: "Visceral involvement (pathologically confirmed)" },
]

export const B_CATEGORIES: TnmbCategory[] = [
  { value: "B0", label: "B0", description: "<250/μL CD4+CD26− (or CD4+CD7−) cells; no significant blood involvement" },
  { value: "B1", label: "B1", description: "Low blood tumor burden; does not meet criteria for B0 or B2 (~250–1000/μL)" },
  { value: "B2", label: "B2", description: "High blood tumor burden; ≥1000/μL CD4+CD26− (or CD4+CD7−) cells with a clone" },
]

export interface StageResult {
  stage: string
  description: string
  recommendations: string[]
}

const STAGE_DESCRIPTIONS: Record<string, string> = {
  IA: "Early-stage, limited skin involvement",
  IB: "Early-stage, extensive skin involvement",
  IIA: "Early-stage with lymph node enlargement",
  IIB: "Tumor-stage disease",
  IIIA: "Erythrodermic, no significant blood involvement (B0)",
  IIIB: "Erythrodermic, low blood tumor burden (B1)",
  IVA1: "High blood tumor burden (B2), e.g. Sézary syndrome",
  IVA2: "High-grade nodal involvement (N3)",
  IVB: "Visceral involvement",
}

const EARLY_STAGE_RECS = [
  "Skin-directed therapy is first-line (topical corticosteroids, topical chlormethine, phototherapy — nbUVB or PUVA).",
  "Confirm diagnosis with skin biopsy including immunohistochemistry and TCR gene rearrangement.",
  "Baseline labs: CBC with differential, comprehensive metabolic panel, LDH.",
  "Consider referral to a cutaneous lymphoma multidisciplinary clinic for staging confirmation.",
]

const ADVANCED_STAGE_RECS = [
  "Refer urgently to a cutaneous lymphoma / hematology-oncology multidisciplinary team.",
  "Staging workup: CBC with Sézary flow cytometry, LDH, peripheral blood TCR clonality, and imaging (CT or PET-CT).",
  "Systemic therapy is generally indicated (e.g., retinoids, HDAC inhibitors, brentuximab vedotin, mogamulizumab, or ECP for blood involvement).",
  "Consider lymph node biopsy of the largest/firmest node if nodal disease is suspected.",
]

/**
 * Compute ISCL/USCLC/EORTC clinical stage from TNMB categories (Olsen 2022;
 * MF/SS stage groupings are unchanged from the 2007 revision).
 * Precedence: M1 (IVB) > N3 (IVA2) > B2 (IVA1) > T4 (III) > T3 (IIB) > N1-2 (IIA) > T2 (IB) > T1 (IA).
 * Blood is B0–B2 (there is no B3).
 */
export function computeStage(t: string, n: string, m: string, b: string): StageResult {
  let stage = "Undetermined"

  if (m === "M1") {
    stage = "IVB"
  } else if (n === "N3") {
    stage = "IVA2"
  } else if (b === "B2") {
    stage = "IVA1"
  } else if (t === "T4") {
    // Erythroderma with M0, N0-2, B0-1: IIIA (B0) vs IIIB (B1)
    stage = b === "B1" ? "IIIB" : "IIIA"
  } else if (t === "T3") {
    stage = "IIB"
  } else if (n === "N1" || n === "N2") {
    stage = "IIA"
  } else if (t === "T2") {
    stage = "IB"
  } else if (t === "T1") {
    stage = "IA"
  }

  const isAdvanced = ["IIB", "IIIA", "IIIB", "IVA1", "IVA2", "IVB"].includes(stage)

  return {
    stage,
    description: STAGE_DESCRIPTIONS[stage] ?? "Stage could not be determined from the selected categories",
    recommendations: isAdvanced ? ADVANCED_STAGE_RECS : EARLY_STAGE_RECS,
  }
}

/** 5-year-survival prognosis text keyed by stage (for display only). */
export const STAGE_PROGNOSIS: Record<string, string> = {
  IA: "Excellent prognosis with 5-year survival >90%. Many patients have a normal life expectancy.",
  IB: "Very good prognosis with 5-year survival >80%. Disease may wax and wane but is generally controllable.",
  IIA: "Good prognosis with 5-year survival >70%. Higher risk of progression than stages IA/IB.",
  IIB: "Moderate prognosis with 5-year survival of 40–65%. Increased risk of progression and need for systemic therapy.",
  IIIA: "Moderate prognosis with 5-year survival of 40–60%. Requires more aggressive management.",
  IIIB: "Guarded prognosis with 5-year survival of 30–50%. Significant blood involvement indicates more aggressive disease.",
  IVA1: "Poor prognosis with 5-year survival of 20–40%. Requires aggressive systemic therapy.",
  IVA2: "Poor prognosis with 5-year survival of 20–40%. Requires aggressive systemic therapy.",
  IVB: "Poor prognosis with 5-year survival <20%. Visceral involvement indicates advanced disease.",
}
