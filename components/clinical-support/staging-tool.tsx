"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, ArrowRight } from "lucide-react"
import {
  T_CATEGORIES,
  N_CATEGORIES,
  M_CATEGORIES,
  B_CATEGORIES,
  computeStage,
  STAGE_PROGNOSIS,
  type TnmbCategory,
} from "@/lib/ctcl-staging"

function CategorySelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  options: TnmbCategory[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label} — {opt.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function StageCalculator() {
  const router = useRouter()
  const [t, setT] = useState("")
  const [n, setN] = useState("")
  const [m, setM] = useState("")
  const [b, setB] = useState("")

  const complete = t && n && m && b
  const result = complete ? computeStage(t, n, m, b) : null

  const handleViewResults = () => {
    if (!result) return
    const params = new URLSearchParams({
      stage: result.stage,
      t,
      n,
      m,
      b,
      description: result.description,
      recommendations: JSON.stringify(result.recommendations),
    })
    router.push(`/staging-results?${params.toString()}`)
  }

  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground">
        Select the T, N, M, and B categories to compute the ISCL/EORTC clinical stage.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <CategorySelect id="t-cat" label="T — Skin" options={T_CATEGORIES} value={t} onChange={setT} />
        <CategorySelect id="n-cat" label="N — Lymph Nodes" options={N_CATEGORIES} value={n} onChange={setN} />
        <CategorySelect id="m-cat" label="M — Visceral" options={M_CATEGORIES} value={m} onChange={setM} />
        <CategorySelect id="b-cat" label="B — Blood" options={B_CATEGORIES} value={b} onChange={setB} />
      </div>

      {result ? (
        <Card className="border-2 border-blue-200 bg-blue-50/60">
          <CardContent className="space-y-4 p-6">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-700">Computed Stage</div>
              <div className="text-3xl font-bold text-blue-800">Stage {result.stage}</div>
              <p className="mt-1 text-blue-700">{result.description}</p>
            </div>
            {STAGE_PROGNOSIS[result.stage] && (
              <p className="rounded-md bg-white/70 p-3 text-center text-sm text-blue-800">
                {STAGE_PROGNOSIS[result.stage]}
              </p>
            )}
            <div className="flex justify-center">
              <Button onClick={handleViewResults}>
                View full results &amp; management <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          Select all four categories to compute a stage.
        </div>
      )}
    </div>
  )
}

export function StagingTool() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">
            <Calculator className="mr-2 h-4 w-4" /> Stage Calculator
          </TabsTrigger>
          <TabsTrigger value="reference">TNMB Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <StageCalculator />
        </TabsContent>

        <TabsContent value="reference" className="space-y-6 pt-4">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-1">ISCL/EORTC TNMB Classification for MF/SS</h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Per the ISCL/USCLC/EORTC 2022 staging update (Olsen et al., Blood 2022;140:419). Stage groupings are
              unchanged from the 2007 revision; blood (B) staging is defined by flow-cytometry counts of CD4+CD26−/CD7−
              cells.
            </p>

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
                          Clinically abnormal peripheral lymph nodes; histopathology Dutch grade 1 (NCI LN0-2)
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
                          Clinically abnormal peripheral lymph nodes; histopathology Dutch grade 2 (NCI LN3)
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
                          Clinically abnormal peripheral lymph nodes; histopathology Dutch grade 3-4 (NCI LN4)
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
                          No significant blood involvement: &lt;250/μL CD4+CD26− (or CD4+CD7−) cells
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
                          Low blood tumor burden: does not meet the criteria for B0 or B2 (~250–1000/μL CD4+CD26− or
                          CD4+CD7− cells)
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
                          High blood tumor burden: ≥1000/μL CD4+CD26− (or CD4+CD7−) cells (or another aberrant clonal
                          population identified by flow cytometry), with a T-cell clone in the blood
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
                        <td className="border p-2">N1-2</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIB</td>
                        <td className="border p-2">T3</td>
                        <td className="border p-2">N0-2</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIA</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-2</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIB</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-2</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA1</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-2</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA2</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N3</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0-2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVB</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-3</td>
                        <td className="border p-2">M1</td>
                        <td className="border p-2">B0-2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
