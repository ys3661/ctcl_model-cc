"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Activity } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import {
  BODY_REGIONS,
  emptyRegions,
  computeMswat,
  computeTbsa,
  mswatSeverityBand,
  type RegionMap,
} from "@/lib/mswat"

const LESION_TYPES = [
  { key: "patch", label: "Patch", weight: "×1" },
  { key: "plaque", label: "Plaque", weight: "×2" },
  { key: "tumor", label: "Tumor", weight: "×4" },
] as const

export function MswatCalculator() {
  const [regions, setRegions] = useState<RegionMap>(emptyRegions())

  const setValue = (regionKey: string, lesion: "patch" | "plaque" | "tumor", raw: string) => {
    const clamped = Math.max(0, Math.min(100, Number(raw) || 0))
    setRegions((prev) => ({
      ...prev,
      [regionKey]: { ...prev[regionKey], [lesion]: clamped },
    }))
  }

  const mswat = computeMswat(regions)
  const mswatDisplay = mswat.toFixed(1)
  const tbsa = computeTbsa(regions)

  const summary = `mSWAT: ${mswatDisplay} | Estimated TBSA: ${tbsa.toFixed(1)}% (${mswatSeverityBand(mswat)})`

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Regional involvement (% of each region)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the percentage of each body region covered by patch, plaque, or tumor.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium">Region</th>
                  <th className="p-2 text-center font-medium">BSA%</th>
                  {LESION_TYPES.map((lt) => (
                    <th key={lt.key} className="p-2 text-center font-medium">
                      {lt.label} <span className="text-xs text-muted-foreground">{lt.weight}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BODY_REGIONS.map((region) => (
                  <tr key={region.key} className="border-b last:border-0">
                    <td className="p-2 font-medium">{region.label}</td>
                    <td className="p-2 text-center text-muted-foreground">{region.bsa}</td>
                    {LESION_TYPES.map((lt) => (
                      <td key={lt.key} className="p-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={regions[region.key][lt.key] || ""}
                          onChange={(e) => setValue(region.key, lt.key, e.target.value)}
                          placeholder="0"
                          className="w-16 rounded border border-border px-2 py-1 text-center focus:border-blue-500 focus:outline-none"
                          aria-label={`${region.label} ${lt.label} percentage`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:sticky lg:top-4 lg:h-fit">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Activity className="mr-2 h-5 w-5" /> Scores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">mSWAT</div>
            <div className="text-4xl font-bold text-blue-700">{mswatDisplay}</div>
            <div className="text-xs text-muted-foreground">range 0–400</div>
          </div>
          <Separator />
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Estimated TBSA</div>
            <div className="text-3xl font-bold">{tbsa.toFixed(1)}%</div>
          </div>
          <Separator />
          <p className="text-center text-sm font-medium text-muted-foreground">{mswatSeverityBand(mswat)}</p>
          <p className="text-center text-xs text-muted-foreground">
            Illustrative band only — mSWAT has no validated severity cutoffs; interpret in clinical context.
          </p>
          <div className="flex flex-col gap-2">
            <CopyButton value={summary} label="Copy scores" className="w-full" />
            <Button variant="outline" className="w-full" onClick={() => setRegions(emptyRegions())}>
              Reset
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            mSWAT weights each region&apos;s involved area by the region&apos;s share of body surface area and by lesion
            type (patch ×1, plaque ×2, tumor ×4).
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
