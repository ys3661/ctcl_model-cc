import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InformationPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">CTCL Information</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What is Cutaneous T-Cell Lymphoma?</CardTitle>
            <CardDescription>Understanding the basics of CTCL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Cutaneous T-cell lymphomas (CTCLs) are a group of rare non-Hodgkin lymphomas that primarily affect the
              skin. They develop when T-lymphocytes (a type of white blood cell) become malignant and affect the skin.
            </p>
            <p>
              The two most common types of CTCL are mycosis fungoides (MF) and Sézary syndrome (SS). Other less common
              types include primary cutaneous anaplastic large cell lymphoma, lymphomatoid papulosis, and subcutaneous
              panniculitis-like T-cell lymphoma.
            </p>
            <p>
              CTCL typically presents with persistent, scaly patches or plaques on the skin that may resemble eczema or
              psoriasis. Early diagnosis can be challenging due to this resemblance to common skin conditions.
            </p>

            <div className="flex justify-end mt-4">
              <a
                href="https://rdcu.be/emmZJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-primary rounded-md bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary/80 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
              >
                Learn more about CTCL
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Clinical Presentation</CardTitle>
            <CardDescription>Common signs and symptoms of CTCL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium">Mycosis Fungoides</h3>
            <p>Mycosis fungoides typically progresses through several stages:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <strong>Patch stage:</strong> Flat, scaly, red patches that may resemble eczema or psoriasis, commonly
                on sun-protected areas
              </li>
              <li>
                <strong>Plaque stage:</strong> Raised, firm lesions that may be itchy and can ulcerate
              </li>
              <li>
                <strong>Tumor stage:</strong> Solid, raised tumors that may ulcerate and become infected
              </li>
              <li>
                <strong>Erythrodermic stage:</strong> Widespread redness, scaling, and itching affecting most of the
                skin surface
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Sézary Syndrome</h3>
            <p>
              Sézary syndrome is characterized by the triad of erythroderma (widespread red skin), lymphadenopathy
              (enlarged lymph nodes), and the presence of malignant T-cells in the blood (Sézary cells).
            </p>

            <h3 className="text-lg font-medium mt-4">Common Symptoms</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Persistent, severe itching (pruritus)</li>
              <li>Dry, flaky skin (xerosis)</li>
              <li>Redness (erythema)</li>
              <li>Scaly patches or plaques</li>
              <li>Skin pain or soreness</li>
              <li>Thickened skin on palms and soles (hyperkeratosis)</li>
              <li>Hair loss in affected areas</li>
              <li>Nail changes</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Diagnostic Approach</CardTitle>
            <CardDescription>Key steps in diagnosing CTCL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Diagnosing CTCL often requires a multidisciplinary approach and may take time due to its resemblance to
              other skin conditions. The diagnostic process typically includes:
            </p>

            <h3 className="text-lg font-medium">Clinical Evaluation</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Detailed medical history, including duration and evolution of skin lesions</li>
              <li>Complete skin examination</li>
              <li>Lymph node palpation</li>
              <li>Assessment of treatment response to conventional therapies</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Skin Biopsy</h3>
            <p>
              Multiple skin biopsies are often necessary, as early CTCL can be difficult to diagnose histologically.
              Biopsies should be taken from different lesions and from untreated areas.
            </p>

            <h3 className="text-lg font-medium mt-4">Additional Testing</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <strong>Immunohistochemistry:</strong> To identify abnormal T-cell populations and their immunophenotype
              </li>
              <li>
                <strong>T-cell receptor gene rearrangement studies:</strong> To detect clonal T-cell populations
              </li>
              <li>
                <strong>Flow cytometry:</strong> For blood involvement assessment
              </li>
              <li>
                <strong>Imaging studies:</strong> CT, PET/CT, or MRI to assess for lymph node or visceral involvement
              </li>
              <li>
                <strong>Lymph node biopsy:</strong> If lymphadenopathy is present
              </li>
            </ul>
            <div className="flex justify-end mt-4">
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/36226409/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-primary rounded-md bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary/80 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
              >
                Diagnostic approaches
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staging and Prognosis</CardTitle>
            <CardDescription>Understanding disease extent and outlook</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              CTCL is staged using the TNMB system (Tumor, Node, Metastasis, Blood), which was revised by the
              International Society for Cutaneous Lymphomas (ISCL) and the European Organization for Research and
              Treatment of Cancer (EORTC).
            </p>

            <h3 className="text-lg font-medium">Stages of Mycosis Fungoides and Sézary Syndrome</h3>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>
                <strong>Stage IA:</strong> Limited patches/plaques covering &lt;10% of skin surface
              </li>
              <li>
                <strong>Stage IB:</strong> Patches/plaques covering ≥10% of skin surface
              </li>
              <li>
                <strong>Stage IIA:</strong> Skin involvement plus palpable lymphadenopathy without histologic
                involvement
              </li>
              <li>
                <strong>Stage IIB:</strong> One or more skin tumors
              </li>
              <li>
                <strong>Stage IIIA/B:</strong> Erythroderma with varying degrees of blood involvement
              </li>
              <li>
                <strong>Stage IVA:</strong> Lymph node involvement with or without erythroderma
              </li>
              <li>
                <strong>Stage IVB:</strong> Visceral organ involvement
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Prognosis</h3>
            <p>
              Prognosis varies significantly based on disease stage, type, and patient factors. Early-stage disease
              (IA-IIA) generally has an excellent prognosis with a normal life expectancy. Advanced stages have a less
              favorable prognosis, though new therapies continue to improve outcomes.
            </p>

            <p className="mt-4">
              Factors associated with poorer prognosis include advanced age, large cell transformation, elevated lactate
              dehydrogenase (LDH), and significant blood involvement.
            </p>
            <div className="flex justify-end mt-4 space-x-3">
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/26433839/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-primary rounded-md bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary/80 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
              >
                CTCL staging
              </a>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/16029336/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-primary rounded-md bg-primary/5 text-primary hover:bg-primary/20 hover:border-primary/80 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
              >
                Prognosis factors
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>CTCL Staging Chart</CardTitle>
            <CardDescription>Visual guide to CTCL staging system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
                <h4 className="font-semibold text-lg mb-4 text-center">TNMB Staging System</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* T Stage */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium text-blue-700 mb-3">T (Tumor/Skin)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">T1:</span>
                        <span>&lt;10% body surface</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">T2:</span>
                        <span>≥10% body surface</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">T3:</span>
                        <span>Tumors present</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">T4:</span>
                        <span>Erythroderma</span>
                      </div>
                    </div>
                  </div>

                  {/* N Stage */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium text-green-700 mb-3">N (Lymph Nodes)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">N0:</span>
                        <span>No involvement</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">N1:</span>
                        <span>Palpable, uninvolved</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">N2:</span>
                        <span>Non-palpable, uninvolved</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">N3:</span>
                        <span>Histologically involved</span>
                      </div>
                    </div>
                  </div>

                  {/* M Stage */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium text-purple-700 mb-3">M (Metastasis)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">M0:</span>
                        <span>No visceral involvement</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">M1:</span>
                        <span>Visceral involvement</span>
                      </div>
                    </div>
                  </div>

                  {/* B Stage */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h5 className="font-medium text-red-700 mb-3">B (Blood)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">B0:</span>
                        <span>&lt;5% Sézary cells</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">B1:</span>
                        <span>5-19% Sézary cells</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">B2:</span>
                        <span>≥20% Sézary cells</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stage Summary */}
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Overall Stages</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <strong>Stage IA:</strong> T1N0M0B0
                    </div>
                    <div>
                      <strong>Stage IB:</strong> T2N0M0B0
                    </div>
                    <div>
                      <strong>Stage IIA:</strong> T1-2N1M0B0
                    </div>
                    <div>
                      <strong>Stage IIB:</strong> T3N0-1M0B0
                    </div>
                    <div>
                      <strong>Stage IIIA:</strong> T4N0M0B0
                    </div>
                    <div>
                      <strong>Stage IIIB:</strong> T4N0M0B1
                    </div>
                    <div>
                      <strong>Stage IVA:</strong> T1-4N2-3M0B0-1
                    </div>
                    <div>
                      <strong>Stage IVB:</strong> T1-4N0-3M1B0-2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
