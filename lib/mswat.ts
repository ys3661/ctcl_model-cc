/**
 * Modified Severity-Weighted Assessment Tool (mSWAT) and total body surface
 * area (TBSA) for MF/SS skin burden. Shared by the medical-form automation page
 * and the standalone /mswat calculator so a patient's numbers are computed the
 * same way everywhere.
 *
 * mSWAT = Σ over regions of (%patch × 1 + %plaque × 2 + %tumor × 4).
 * TBSA  = Σ over regions of (max(%patch,%plaque,%tumor) / 100 × region BSA weight).
 */

export interface RegionInvolvement {
  patch: number
  plaque: number
  tumor: number
}

export interface RegionMeta {
  key: string
  label: string
  /** Region's share of total body surface area (%). */
  bsa: number
}

export const BODY_REGIONS: RegionMeta[] = [
  { key: "head", label: "Head", bsa: 7 },
  { key: "neck", label: "Neck", bsa: 2 },
  { key: "anteriorTrunk", label: "Anterior Trunk", bsa: 13 },
  { key: "arms", label: "Arms", bsa: 8 },
  { key: "forearms", label: "Forearms", bsa: 6 },
  { key: "hands", label: "Hands", bsa: 5 },
  { key: "posteriorTrunk", label: "Posterior Trunk", bsa: 13 },
  { key: "buttocks", label: "Buttocks", bsa: 5 },
  { key: "thighs", label: "Thighs", bsa: 19 },
  { key: "legs", label: "Legs", bsa: 14 },
  { key: "feet", label: "Feet", bsa: 7 },
  { key: "groin", label: "Groin", bsa: 1 },
]

export type RegionMap = Record<string, RegionInvolvement>

export function emptyRegions(): RegionMap {
  return BODY_REGIONS.reduce((acc, r) => {
    acc[r.key] = { patch: 0, plaque: 0, tumor: 0 }
    return acc
  }, {} as RegionMap)
}

export function computeMswat(regions: RegionMap): number {
  return Object.values(regions).reduce(
    (total, r) => total + r.patch * 1 + r.plaque * 2 + r.tumor * 4,
    0,
  )
}

export function computeTbsa(regions: RegionMap): number {
  return BODY_REGIONS.reduce((total, region) => {
    const involvement = regions[region.key]
    if (!involvement) return total
    const maxPercentage = Math.max(involvement.patch, involvement.plaque, involvement.tumor)
    return total + (maxPercentage / 100) * region.bsa
  }, 0)
}

/** mSWAT ranges from 0 to 400; this gives a rough qualitative band for display. */
export function mswatSeverityBand(mswat: number): string {
  if (mswat === 0) return "No measurable skin involvement"
  if (mswat < 50) return "Mild skin burden"
  if (mswat < 150) return "Moderate skin burden"
  return "High skin burden"
}
