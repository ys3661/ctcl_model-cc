"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StagingTool() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="reference" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="reference">TNMB Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="reference" className="space-y-6 pt-4">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">ISCL/EORTC TNMB Classification for MF/SS</h3>

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
                          Clinically abnormal peripheral lymph nodes; histopathologically negative for CTCL
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
                          Clinically normal lymph nodes; histopathologically positive for CTCL
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
                          Clinically abnormal lymph nodes; histopathologically positive for CTCL
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
                          Absence of significant blood involvement: ≤5% of peripheral blood lymphocytes are Sézary cells
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
                          Low blood tumor burden: &gt;5% of peripheral blood lymphocytes are Sézary cells but does not
                          meet the criteria of B2
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
                          High blood tumor burden: ≥1000/μL Sézary cells with positive clone or one of the following:
                          (1) expanded CD4+ or CD3+ cells with CD4/CD8 ratio ≥10, (2) expanded CD4+ cells with abnormal
                          immunophenotype
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
                        <td className="border p-2">N1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIB</td>
                        <td className="border p-2">T3</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIA</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0, B1</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IIIB</td>
                        <td className="border p-2">T4</td>
                        <td className="border p-2">N0-1</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA1</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N2-3</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B0-2</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVA2</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-3</td>
                        <td className="border p-2">M0</td>
                        <td className="border p-2">B3</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">IVB</td>
                        <td className="border p-2">T1-4</td>
                        <td className="border p-2">N0-3</td>
                        <td className="border p-2">M0-1</td>
                        <td className="border p-2">B0-3</td>
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
