/**
 * Biopsy / pathology requisition builder for suspected CTCL.
 *
 * Ordering the wrong biopsy — or not telling the pathologist to think about MF —
 * is a major reason specimens come back as nonspecific "spongiotic dermatitis."
 * This module encodes what to request so derm-path applies the right criteria.
 */

export interface IhcMarker {
  marker: string
  rationale: string
}

/** Core immunohistochemistry panel for evaluating a cutaneous lymphoid infiltrate. */
export const IHC_PANEL: IhcMarker[] = [
  { marker: "CD3", rationale: "Pan–T-cell marker; establishes T-cell lineage of the infiltrate." },
  { marker: "CD4", rationale: "Helper T-cell marker; MF is typically CD4-predominant." },
  { marker: "CD8", rationale: "Cytotoxic T-cell marker; assesses the CD4:CD8 ratio and CD8+ variants." },
  { marker: "CD7", rationale: "Frequently reduced or lost in MF; a supporting feature but not specific (CD7 loss also occurs in benign dermatoses)." },
  { marker: "CD30", rationale: "Marks large-cell transformation and lymphomatoid papulosis / pcALCL." },
  { marker: "CD20", rationale: "B-cell marker; helps exclude a B-cell lymphoid process." },
]

export interface MolecularStudy {
  name: string
  rationale: string
}

export const MOLECULAR_STUDIES: MolecularStudy[] = [
  {
    name: "TCR gene rearrangement (PCR or NGS)",
    rationale: "Detects a clonal T-cell population supporting CTCL; NGS clonality is more sensitive than PCR.",
  },
]

/** Pre-biopsy and technique pearls that most affect diagnostic yield. */
export const BIOPSY_PEARLS: string[] = [
  "Hold topical/intralesional corticosteroids for 2–4 weeks before biopsy — treatment can suppress the diagnostic infiltrate.",
  "Sample the thickest / most indurated lesion; avoid recently treated or excoriated sites.",
  "Take multiple biopsies (2–4) from different representative lesions to improve yield.",
  "Use a 4–6 mm punch (or a broad shave/incisional biopsy of a plaque) reaching reticular dermis.",
  "Send fresh/appropriately fixed tissue if flow cytometry or molecular clonality is requested.",
]

export interface RequisitionOptions {
  lesionSite?: string
  lesionType?: string
  clinicalFeatures?: string[]
  patientAge?: string
  includeClonality?: boolean
}

/**
 * Assembles a formatted requisition/clinical-history block the clinician can
 * paste into a pathology order.
 */
export function buildRequisition(options: RequisitionOptions = {}): string {
  const { lesionSite, lesionType, clinicalFeatures = [], patientAge, includeClonality = true } = options

  const lines: string[] = []
  lines.push("CLINICAL HISTORY / REQUEST TO PATHOLOGY")
  lines.push("Clinical question: Rule out mycosis fungoides / cutaneous T-cell lymphoma (CTCL).")

  const desc = [
    patientAge ? `${patientAge}` : "",
    lesionType ? `${lesionType}` : "lesion",
    lesionSite ? `of the ${lesionSite}` : "",
  ]
    .filter(Boolean)
    .join(" ")
  if (desc.trim()) {
    lines.push(`Specimen: ${desc}.`)
  }

  if (clinicalFeatures.length) {
    lines.push(`Relevant history: ${clinicalFeatures.join("; ")}.`)
  }

  lines.push("")
  lines.push("Requested immunohistochemistry:")
  lines.push(`  ${IHC_PANEL.map((m) => m.marker).join(", ")}`)

  if (includeClonality) {
    lines.push("")
    lines.push("Requested molecular studies:")
    MOLECULAR_STUDIES.forEach((s) => lines.push(`  ${s.name}`))
  }

  lines.push("")
  lines.push("Please correlate with clinical presentation and comment on features of MF/CTCL")
  lines.push("(epidermotropism, Pautrier microabscesses, atypical lymphocytes, CD7 loss).")

  return lines.join("\n")
}
