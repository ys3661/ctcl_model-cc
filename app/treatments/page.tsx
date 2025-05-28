"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TreatmentsPage() {
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

        <h1 className="text-3xl font-bold mb-4">CTCL Treatment Options</h1>
        <p className="text-muted-foreground mb-8">
          Cutaneous T-Cell Lymphoma (CTCL) has various treatment approaches depending on the stage, type, and individual
          patient factors. Treatment is typically managed by a multidisciplinary team of specialists.
          <sup className="text-xs ml-0.5">[1-2]</sup>
        </p>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topical">Topical</TabsTrigger>
            <TabsTrigger value="light">Light Therapy</TabsTrigger>
            <TabsTrigger value="radiation">Radiation</TabsTrigger>
            <TabsTrigger value="systemic">Systemic</TabsTrigger>
            <TabsTrigger value="emerging">Emerging</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Approach Overview</CardTitle>
                <CardDescription>Understanding the general approach to CTCL treatment and management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Treatment Philosophy</h3>
                  <p className="text-muted-foreground">
                    CTCL is often a chronic condition that may not be curable in its advanced stages, but can be
                    effectively managed to control symptoms, improve quality of life, and extend survival. Treatment
                    approaches are typically stage-based and individualized.
                    <sup className="text-xs ml-0.5">[1-3]</sup>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Treatment Goals</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Reduce or eliminate skin lesions</li>
                    <li>Relieve symptoms such as itching, pain, and redness</li>
                    <li>Maintain or improve quality of life</li>
                    <li>Prevent disease progression</li>
                    <li>Achieve long-term remission when possible</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Treatment Selection Factors</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      Disease stage (IA, IB, IIA, IIB, III, IVA, IVB)
                      <sup className="text-xs ml-0.5">[4]</sup>
                    </li>
                    <li>CTCL subtype (Mycosis Fungoides, Sézary Syndrome, etc.)</li>
                    <li>Previous treatments and responses</li>
                    <li>Patient age and overall health</li>
                    <li>Comorbidities and potential drug interactions</li>
                    <li>Patient preferences and quality of life considerations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Treatment Categories</h3>
                  <p className="text-muted-foreground mb-2">
                    CTCL treatments can be broadly categorized into the following approaches:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Skin-directed therapies:</strong> Topical medications, phototherapy, and radiation therapy
                      that target the skin lesions directly
                      <sup className="text-xs ml-0.5">[5-6]</sup>
                    </li>
                    <li>
                      <strong>Systemic therapies:</strong> Medications that work throughout the body, including
                      biologics, targeted therapies, immunomodulators, and chemotherapy
                      <sup className="text-xs ml-0.5">[7]</sup>
                    </li>
                    <li>
                      <strong>Combination approaches:</strong> Using multiple treatment modalities simultaneously or
                      sequentially
                      <sup className="text-xs ml-0.5">[8]</sup>
                    </li>
                    <li>
                      <strong>Stem cell transplantation:</strong> For advanced or refractory disease
                      <sup className="text-xs ml-0.5">[9]</sup>
                    </li>
                    <li>
                      <strong>Supportive care:</strong> Symptom management and quality of life improvements
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Treatment Sequencing</h3>
                  <p className="text-muted-foreground">
                    Treatment typically follows a stepwise approach, starting with less aggressive therapies and
                    progressing to more intensive treatments as needed. Many patients will require multiple different
                    treatments over the course of their disease, either in sequence or in combination.
                    <sup className="text-xs ml-0.5">[2,7]</sup>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TOPICAL TAB */}
          <TabsContent value="topical">
            <Card>
              <CardHeader>
                <CardTitle>Topical Treatments</CardTitle>
                <CardDescription>Medications applied directly to the skin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Corticosteroids</h3>
                  <p className="text-muted-foreground mb-2">
                    Topical corticosteroids are often the first-line treatment for limited patch or plaque stage CTCL.
                    <sup className="text-xs ml-0.5">[2,5,10]</sup>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Clobetasol, betamethasone, triamcinolone
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 82-94% in early-stage disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Skin thinning, striae, telangiectasia, adrenal suppression with
                      long-term use over large areas
                    </li>
                    <li>
                      <strong>Usage:</strong> Applied once or twice daily to affected areas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Nitrogen Mustard (Mechlorethamine)</h3>
                  <p className="text-muted-foreground mb-2">
                    A topical chemotherapy agent used for early-stage CTCL that doesn't respond to steroids.
                    <sup className="text-xs ml-0.5">[2,5,11-12]</sup>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Formulations:</strong> Valchlor® gel (FDA-approved) or compounded preparations
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 40-60% of patients with early-stage disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Skin irritation, allergic contact dermatitis, hyperpigmentation
                    </li>
                    <li>
                      <strong>Usage:</strong> Applied once daily to affected areas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Retinoids (Bexarotene Gel)</h3>
                  <p className="text-muted-foreground mb-2">
                    A vitamin A derivative that regulates cell growth and differentiation.
                    <sup className="text-xs ml-0.5">[2,5,13]</sup>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Brand name:</strong> Targretin® gel
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 40-50% in early-stage disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Skin irritation, redness, peeling
                    </li>
                    <li>
                      <strong>Usage:</strong> Applied once to four times daily to affected areas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Imiquimod</h3>
                  <p className="text-muted-foreground mb-2">
                    An immune response modifier that stimulates the immune system to fight abnormal cells.
                    <sup className="text-xs ml-0.5">[14]</sup>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Brand name:</strong> Aldara®, Zyclara®
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Effective for limited, localized lesions
                    </li>
                    <li>
                      <strong>Side effects:</strong> Skin irritation, redness, erosions, flu-like symptoms
                    </li>
                    <li>
                      <strong>Usage:</strong> Applied 3-5 times weekly to affected areas
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Tacrolimus and Pimecrolimus</h3>
                  <p className="text-muted-foreground mb-2">
                    Calcineurin inhibitors that reduce inflammation without the side effects of steroids.
                    <sup className="text-xs ml-0.5">[15-19]</sup>
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Brand names:</strong> Protopic® (tacrolimus), Elidel® (pimecrolimus)
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Modest efficacy, useful for sensitive areas like face and skin folds
                    </li>
                    <li>
                      <strong>Side effects:</strong> Burning sensation, irritation, possible very small increased risk
                      of lymphoma with pimecrolimus
                    </li>
                    <li>
                      <strong>Usage:</strong> Applied twice daily to affected areas
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LIGHT THERAPY TAB */}
          <TabsContent value="light">
            <Card>
              <CardHeader>
                <CardTitle>
                  Light Therapy (Phototherapy)
                  <sup className="text-xs ml-0.5">[20-25]</sup>
                </CardTitle>
                <CardDescription>Treatment using ultraviolet light to target skin lesions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Narrowband UVB (NB-UVB)</h3>
                  <p className="text-muted-foreground mb-2">
                    A type of phototherapy that uses a specific wavelength of ultraviolet B light.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Patch-stage or thin plaque disease
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of up to 80-90% in early-stage disease, depending on
                      Fitzpatrick skin type
                    </li>
                    <li>
                      <strong>Side effects:</strong> Redness, burning, increased risk of skin cancer with long-term use
                    </li>
                    <li>
                      <strong>Protocol:</strong> 2-3 treatments per week, gradually increasing exposure time
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">PUVA (Psoralen + UVA)</h3>
                  <p className="text-muted-foreground mb-2">
                    Combines a photosensitizing medication (psoralen) with ultraviolet A light exposure.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Thicker plaques and more advanced skin disease
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of up to over 90% in early-stage disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Nausea (from psoralen), photosensitivity, increased risk of skin
                      cancer, cataracts
                    </li>
                    <li>
                      <strong>Protocol:</strong> Psoralen taken orally or applied topically, followed by UVA exposure
                      2-3 times weekly
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Extracorporeal Photopheresis (ECP)</h3>
                  <p className="text-muted-foreground mb-2">
                    A procedure where blood is removed, treated with a photosensitizing agent and UV light, then
                    returned to the body.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Erythrodermic CTCL and Sézary Syndrome
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 31-86% in erythrodermic disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Generally well-tolerated; temporary hypotension, mild fever
                    </li>
                    <li>
                      <strong>Protocol:</strong> Typically performed on two consecutive days every 2-4 weeks
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Excimer Laser (308nm)</h3>
                  <p className="text-muted-foreground mb-2">
                    A targeted form of UVB light therapy that can be directed at specific lesions.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Limited, localized lesions
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Effective for treating individual lesions
                    </li>
                    <li>
                      <strong>Side effects:</strong> Redness, blistering, hyperpigmentation
                    </li>
                    <li>
                      <strong>Protocol:</strong> 1-3 treatments per week for several weeks
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium mb-2 text-amber-800">Important Considerations</h3>
                  <ul className="list-disc pl-6 space-y-1 text-amber-700">
                    <li>
                      Phototherapy requires specialized equipment and is typically administered in a dermatology clinic
                      or hospital setting
                    </li>
                    <li>Maintenance therapy is often required after achieving remission to prevent relapse</li>
                    <li>Patients should avoid additional sun exposure on treatment days and use sun protection</li>
                    <li>Regular skin examinations are recommended to monitor for skin cancer development</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RADIATION TAB */}
          <TabsContent value="radiation">
            <Card>
              <CardHeader>
                <CardTitle>
                  Radiation Therapy
                  <sup className="text-xs ml-0.5">[26-33]</sup>
                </CardTitle>
                <CardDescription>Using radiation to target cancer cells</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Localized Radiation Therapy</h3>
                  <p className="text-muted-foreground mb-2">
                    Targeted radiation to specific skin lesions or lymph nodes.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Thick, localized plaques or tumors that don't respond to other
                      treatments
                    </li>
                    <li>
                      <strong>Dosage:</strong> Typically 8 to 12 Gy administered in 1 to 6 fractions
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 90-95% for localized lesions
                    </li>
                    <li>
                      <strong>Side effects:</strong> Skin irritation, redness, dry or moist desquamation, fatigue
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Total Skin Electron Beam Therapy (TSEBT)</h3>
                  <p className="text-muted-foreground mb-2">
                    A specialized form of radiation therapy that treats the entire skin surface.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Widespread skin involvement
                    </li>
                    <li>
                      <strong>Dosage:</strong> Conventional (30-36 Gy) or low-dose (10-12 Gy) regimens
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of up to 95%, though with skin relapse in up to 54% of
                      patients at one year post-treatment
                    </li>
                    <li>
                      <strong>Side effects:</strong> Temporary hair loss, nail changes, skin erythema, edema,
                      blistering, fatigue
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Low-Dose TSEBT</h3>
                  <p className="text-muted-foreground mb-2">
                    A modified approach using lower radiation doses to reduce side effects while maintaining efficacy.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Advantage:</strong> Fewer side effects, can be repeated multiple times
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of ~90%, with complete response of ~30%
                    </li>
                    <li>
                      <strong>Protocol:</strong> 10-12 Gy delivered over 2-3 weeks
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Palliative Radiation</h3>
                  <p className="text-muted-foreground mb-2">
                    Targeted radiation to relieve symptoms in specific areas.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Best for:</strong> Symptomatic lesions causing pain, bleeding, or cosmetic concerns
                    </li>
                    <li>
                      <strong>Dosage:</strong> Typically lower doses (8-12 Gy) delivered over a short period
                    </li>
                    <li>
                      <strong>Goal:</strong> Symptom relief rather than curative intent
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium mb-2 text-amber-800">Important Considerations</h3>
                  <ul className="list-disc pl-6 space-y-1 text-amber-700">
                    <li>
                      Radiation therapy requires specialized equipment and expertise, available only at certain centers
                    </li>
                    <li>TSEBT is labor-intensive and requires daily treatments over several weeks</li>
                    <li>Radiation can be combined with other therapies for enhanced efficacy</li>
                    <li>There is a lifetime limit to the amount of radiation a person can receive</li>
                    <li>Proper skin care during and after radiation is essential to manage side effects</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SYSTEMIC TAB */}
          <TabsContent value="systemic">
            <Card>
              <CardHeader>
                <CardTitle>Systemic Treatments</CardTitle>
                <CardDescription>Medications that work throughout the entire body</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Retinoids
                    <sup className="text-xs ml-0.5">[13,34]</sup>
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Vitamin A derivatives that regulate cell growth and differentiation.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Bexarotene (Targretin®), Acitretin (Soriatane®)
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 45-65%, with complete responses of 20%
                    </li>
                    <li>
                      <strong>Side effects:</strong> Elevated lipids, hypothyroidism, dry skin, hair loss,
                      teratogenicity
                    </li>
                    <li>
                      <strong>Monitoring:</strong> Regular blood tests for lipids, thyroid function, and liver enzymes
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Histone Deacetylase (HDAC) Inhibitors
                    <sup className="text-xs ml-0.5">[35-37]</sup>
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Epigenetic modifiers that help restore normal gene expression in cancer cells.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Vorinostat (Zolinza®), Romidepsin (Istodax®)
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 30-38%
                    </li>
                    <li>
                      <strong>Side effects:</strong> Fatigue, nausea, diarrhea, thrombocytopenia, QT prolongation
                    </li>
                    <li>
                      <strong>Monitoring:</strong> Regular blood tests and ECG monitoring
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Immunomodulators</h3>
                  <p className="text-muted-foreground mb-2">
                    Medications that modify the immune response to target cancer cells.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Interferon alfa, Mogamulizumab (Poteligeo®)
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 40-60% for interferon, 28-37% for mogamulizumab
                    </li>
                    <li>
                      <strong>Side effects:</strong> Flu-like symptoms, fatigue, depression, cytopenias, infusion
                      reactions
                    </li>
                    <li>
                      <strong>Usage:</strong> Interferon is typically administered by subcutaneous injection;
                      mogamulizumab is given intravenously
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Antibody-Drug Conjugates</h3>
                  <p className="text-muted-foreground mb-2">
                    Targeted therapies that combine antibodies with cytotoxic drugs.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Example:</strong> Brentuximab vedotin (Adcetris®)
                    </li>
                    <li>
                      <strong>Target:</strong> CD30+ CTCL
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Response rates of 65-70% in CD30+ disease
                    </li>
                    <li>
                      <strong>Side effects:</strong> Peripheral neuropathy, fatigue, nausea, neutropenia
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Chemotherapy</h3>
                  <p className="text-muted-foreground mb-2">
                    Cytotoxic drugs used primarily for advanced or refractory disease.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Single agents:</strong> Methotrexate, gemcitabine, liposomal doxorubicin, pralatrexate
                    </li>
                    <li>
                      <strong>Combination regimens:</strong> CHOP, EPOCH
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Variable response rates, often short-lived
                    </li>
                    <li>
                      <strong>Side effects:</strong> Myelosuppression, nausea, fatigue, increased infection risk, organ
                      toxicity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Stem Cell Transplantation</h3>
                  <p className="text-muted-foreground mb-2">
                    A procedure to replace diseased bone marrow with healthy stem cells.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Types:</strong> Autologous (using patient's own cells) or allogeneic (using donor cells)
                    </li>
                    <li>
                      <strong>Best for:</strong> Young, fit patients with advanced, refractory disease
                    </li>
                    <li>
                      <strong>Efficacy:</strong> Potential for long-term remission or cure in some patients
                    </li>
                    <li>
                      <strong>Risks:</strong> Significant treatment-related mortality, graft-versus-host disease
                      (allogeneic)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EMERGING TAB */}
          <TabsContent value="emerging">
            <Card>
              <CardHeader>
                <CardTitle>Emerging & Experimental Treatments</CardTitle>
                <CardDescription>New approaches being investigated for CTCL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Checkpoint Inhibitors</h3>
                  <p className="text-muted-foreground mb-2">
                    Immunotherapy drugs that block proteins that prevent T-cells from attacking cancer.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Pembrolizumab, Nivolumab, Ipilimumab
                    </li>
                    <li>
                      <strong>Mechanism:</strong> Block PD-1, PD-L1, or CTLA-4 to enhance immune response against cancer
                      cells
                    </li>
                    <li>
                      <strong>Status:</strong> Currently in clinical trials for CTCL
                    </li>
                    <li>
                      <strong>Preliminary results:</strong> Response rates of 30-40% in small studies
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">CAR-T Cell Therapy</h3>
                  <p className="text-muted-foreground mb-2">
                    A treatment that uses genetically modified T-cells to target cancer cells.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Targets:</strong> Various, including CD4, CD30, CCR4
                    </li>
                    <li>
                      <strong>Status:</strong> Early-phase clinical trials
                    </li>
                    <li>
                      <strong>Potential:</strong> May offer durable responses in advanced disease
                    </li>
                    <li>
                      <strong>Challenges:</strong> Cytokine release syndrome, neurotoxicity, manufacturing complexity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">JAK Inhibitors</h3>
                  <p className="text-muted-foreground mb-2">
                    Medications that block Janus kinase enzymes involved in signaling pathways that drive CTCL.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Ruxolitinib, Tofacitinib
                    </li>
                    <li>
                      <strong>Administration:</strong> Oral tablets
                    </li>
                    <li>
                      <strong>Status:</strong> Clinical trials ongoing, some off-label use
                    </li>
                    <li>
                      <strong>Preliminary results:</strong> Promising responses, especially for pruritus control
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">PI3K Inhibitors</h3>
                  <p className="text-muted-foreground mb-2">
                    Targeted therapies that block phosphoinositide 3-kinase, a key enzyme in cancer cell growth.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Duvelisib, Copanlisib
                    </li>
                    <li>
                      <strong>Status:</strong> Clinical trials for CTCL, approved for other lymphomas
                    </li>
                    <li>
                      <strong>Side effects:</strong> Diarrhea, colitis, pneumonitis, hepatotoxicity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Toll-like Receptor (TLR) Agonists</h3>
                  <p className="text-muted-foreground mb-2">
                    Compounds that activate TLRs to stimulate immune responses against cancer cells.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Resiquimod, SD-101
                    </li>
                    <li>
                      <strong>Administration:</strong> Topical or intralesional
                    </li>
                    <li>
                      <strong>Status:</strong> Clinical trials
                    </li>
                    <li>
                      <strong>Mechanism:</strong> Activate innate and adaptive immune responses in the tumor
                      microenvironment
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">EZH2 Inhibitors</h3>
                  <p className="text-muted-foreground mb-2">
                    Targeted therapies that inhibit enhancer of zeste homolog 2, a protein involved in gene expression.
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>
                      <strong>Examples:</strong> Tazemetostat
                    </li>
                    <li>
                      <strong>Status:</strong> Early clinical trials for CTCL
                    </li>
                    <li>
                      <strong>Potential:</strong> May be effective in certain molecular subtypes of CTCL
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium mb-2 text-amber-800">Clinical Trials Information</h3>
                  <p className="text-amber-700 mb-2">
                    Many emerging treatments are only available through clinical trials. Patients interested in these
                    options should:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-amber-700">
                    <li>Discuss clinical trial options with their healthcare team</li>
                    <li>Search for trials at clinical trial registries</li>
                    <li>Contact major cancer centers with CTCL expertise</li>
                    <li>Reach out to the Cutaneous Lymphoma Foundation for trial information and support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Treatment Decision Making</h2>
          <p className="text-muted-foreground mb-4">
            CTCL treatment decisions should be made in consultation with a multidisciplinary team experienced in
            managing this rare disease. Treatment plans are individualized based on disease stage, previous treatments,
            patient preferences, and overall health status.
          </p>
          <p className="text-muted-foreground mb-4">
            Many patients will require multiple different treatments over the course of their disease, either
            sequentially as the disease progresses or in combination to achieve better responses.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>

        {/* References Section */}
        <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200" id="references">
          <h2 className="text-xl font-bold mb-4">References</h2>
          <div className="text-sm text-muted-foreground space-y-2">
            <ol className="list-decimal pl-5 space-y-1">
              <li id="ref1">
                Hristov AC, Tejasvi T, Wilcox RA. Cutaneous T-cell lymphomas: 2023 update on diagnosis, risk
                stratification, and management. Am J Hematol. 2023;98(5):644-664.
              </li>
              <li id="ref2">
                Scarisbrick JJ, Bagot M, Ortiz‐Romero P. Cutaneous T‐cell lymphoma: a review of clinical and
                pathological features and management. Br J Dermatol. 2021;185(5):925-938.
              </li>
              <li id="ref3">
                Trautinger F. European Organisation for Research and Treatment of Cancer consensus recommendations for
                the treatment of mycosis fungoides/Sézary syndrome. Eur J Cancer. 2018;77:57-74.
              </li>
              <li id="ref4">
                Olsen E, Vonderheid E, Pimpinelli N, et al. Revisions to the staging and classification of mycosis
                fungoides and Sezary syndrome: a proposal of the International Society for Cutaneous Lymphomas (ISCL)
                and the cutaneous lymphoma task force of the European Organization of Research and Treatment of Cancer
                (EORTC). Blood. 2007;110(6):1713-1722.
              </li>
              <li id="ref5">
                Knobler R. Topical therapeutic options for cutaneous T-cell lymphoma. Semin Cutan Med Surg.
                2004;23(3):208-212.
              </li>
              <li id="ref6">
                Lansigan F, Foss FM. Current and emerging treatment strategies for cutaneous T-cell lymphoma. Drugs.
                2010;70(3):273-286.
              </li>
              <li id="ref7">
                Weiner DM, Durgin JS, Wysocka M, et al. The cutaneous T-cell lymphoma systemic therapy pipeline: a
                review of recently completed and ongoing clinical trials. Cancers. 2021;13(21):5509.
              </li>
              <li id="ref8">
                Yonekura K. Combination therapy for cutaneous T-cell lymphoma. J Dermatol. 2022;49(1):28-36.
              </li>
              <li id="ref9">
                Hedebo KL, Jørgensen CLT, Gniadecki R. Stem cell transplantation in cutaneous T-cell lymphoma. Cancers.
                2025;15(2):456.
              </li>
              <li id="ref10">
                Zackheim HS, Kashani-Sabet M, Amin S. Topical corticosteroids for mycosis fungoides. Arch Dermatol.
                1998;134(8):949-954.
              </li>
              <li id="ref11">
                Guenova E, Hoetzenecker W, Rozati S, et al. Novel therapies for cutaneous T-cell lymphoma: what does the
                future hold? Expert Opin Investig Drugs. 2023;23(4):457-467.
              </li>
              <li id="ref12">
                Lessin SR, Duvic M, Guitart J, et al. Topical chemotherapy in cutaneous T-cell lymphoma: positive
                results of a randomized, controlled, multicenter trial testing the efficacy and safety of a novel
                mechlorethamine, 0.02%, gel in mycosis fungoides. JAMA Dermatol. 2013;149(1):25-32.
              </li>
              <li id="ref13">
                Heald P, Mehlmauer M, Martin AG, et al. Topical bexarotene therapy for patients with refractory or
                persistent early-stage cutaneous T-cell lymphoma: results of the phase III clinical trial. J Am Acad
                Dermatol. 2003;49(5):801-815.
              </li>
              <li id="ref14">
                Martínez-González MC, Verea-Hernando MM, Yebra-Pimentel MT, et al. Imiquimod in mycosis fungoides. Eur J
                Dermatol. 2008;18(2):148-152.
              </li>
              <li id="ref15">
                Akilov OE, Geskin L. Therapeutic advances in cutaneous T-cell lymphoma. Skin Therapy Lett.
                2011;16(2):1-5.
              </li>
              <li id="ref16">
                Arana A, Pottegård A, Kuiper JG, et al. Long-term risk of skin cancer and lymphoma in users of topical
                tacrolimus and pimecrolimus: final results from the extension of the cohort study Protopic Joint
                European Longitudinal Lymphoma and Skin Cancer Evaluation (JOELLE). Clin Epidemiol. 2021;13:1141-1153.
              </li>
              <li id="ref17">
                Ortiz-Romero PL, Sánchez-Schmidt JM, Quirós E, et al. Recommendations for the use of tacrolimus ointment
                in the treatment of cutaneous T-cell lymphoma. J Eur Acad Dermatol Venereol. 2022;36(1):13-19.
              </li>
              <li id="ref18">
                Scarisbrick JJ. Tacrolimus ointment in cutaneous T-cell lymphoma: a review of the clinical evidence. Br
                J Dermatol. 2022;187(1):18-25.
              </li>
              <li id="ref19">
                Weiner DM, Durgin JS, Wysocka M, et al. The cutaneous T-cell lymphoma systemic therapy pipeline: a
                review of recently completed and ongoing clinical trials. Cancers. 2022;13(21):5509.
              </li>
              <li id="ref20">
                Deaver D, Cauthen A, Cohen G, et al. Excimer laser in the treatment of mycosis fungoides. J Am Acad
                Dermatol. 2014;70(6):1058-1060.
              </li>
              <li id="ref21">
                Marka A, Carter JB. Phototherapy for cutaneous T-cell lymphoma. Dermatol Clin. 2020;38(1):127-135.
              </li>
              <li id="ref22">
                Olsen EA, Hodak E, Anderson T, et al. Guidelines for phototherapy of mycosis fungoides and Sézary
                syndrome: A consensus statement of the United States Cutaneous Lymphoma Consortium. J Am Acad Dermatol.
                2016;74(1):27-58.
              </li>
              <li id="ref23">
                Phan K, Ramachandran V, Fassihi H, et al. Comparison of narrowband UV-B with psoralen-UV-A phototherapy
                for patients with early-stage mycosis fungoides: a systematic review and meta-analysis. JAMA Dermatol.
                2019;155(3):335-341.
              </li>
              <li id="ref24">
                Quaglino P, Knobler R, Fierro MT, et al. Extracorporeal photopheresis for the treatment of erythrodermic
                cutaneous T-cell lymphoma: a single center clinical experience with long-term follow-up data and a brief
                overview of the literature. Int J Dermatol. 2013;52(11):1308-1318.
              </li>
              <li id="ref25">
                Tsai EY, Zic J, Fatteh S, et al. Phototherapy for the treatment of cutaneous T-cell lymphoma. Dermatol
                Clin. 2023;41(1):75-85.
              </li>
              <li id="ref26">
                Elsayad K, Kriz J, Moustakis C, et al. Total skin electron beam for primary cutaneous T-cell lymphoma.
                Int J Radiat Oncol Biol Phys. 2015;93(5):1077-1086.
              </li>
              <li id="ref27">
                Hoppe RT, Harrison C, Tavallaee M, et al. Low-dose total skin electron beam therapy as an effective
                modality to reduce disease burden in patients with mycosis fungoides: results of a pooled analysis from
                3 phase-II clinical trials. J Am Acad Dermatol. 2015;72(2):286-292.
              </li>
              <li id="ref28">
                Kamstrup MR, Lindahl LM, Gniadecki R, et al. Low-dose total skin electron beam therapy as a debulking
                agent for cutaneous T-cell lymphoma: an open-label prospective phase II study. Br J Dermatol.
                2015;173(3):783-788.
              </li>
              <li id="ref29">
                King J, Smith A, Tang G, et al. Long-term outcomes of radiation therapy for cutaneous T-cell lymphoma.
                Pract Radiat Oncol. 2020;10(5):e384-e391.
              </li>
              <li id="ref30">
                Morris S, Scarisbrick J, Frew J, et al. The results of low-dose total skin electron beam radiation
                therapy (TSEB) in patients with mycosis fungoides from the UK Cutaneous Lymphoma Group. Int J Radiat
                Oncol Biol Phys. 2017;99(3):627-633.
              </li>
              <li id="ref31">
                Neelis KJ, Schimmel EC, Vermeer MH, et al. Low-dose palliative radiotherapy for cutaneous B- and T-cell
                lymphomas. Int J Radiat Oncol Biol Phys. 2009;74(1):154-158.
              </li>
              <li id="ref32">
                Thomas TO, Agrawal P, Guitart J, et al. Outcome of patients treated with a single-fraction dose of
                palliative radiation for cutaneous T-cell lymphoma. Int J Radiat Oncol Biol Phys. 2013;85(3):747-753.
              </li>
              <li id="ref33">
                Ysebaert L, Truc G, Dalac S, et al. Ultimate results of radiation therapy for T1-T2 mycosis fungoides
                (including reirradiation). Int J Radiat Oncol Biol Phys. 2004;58(4):1128-1134.
              </li>
              <li id="ref34">
                Breneman D, Duvic M, Kuzel T, et al. Phase 1 and 2 trial of bexarotene gel for skin-directed treatment
                of patients with cutaneous T-cell lymphoma. Arch Dermatol. 2002;138(3):325-332.
              </li>
              <li id="ref35">
                Duvic M, Talpur R, Ni X, et al. Phase 2 trial of oral vorinostat (suberoylanilide hydroxamic acid, SAHA)
                for refractory cutaneous T-cell lymphoma (CTCL). Blood. 2007;109(1):31-39.
              </li>
              <li id="ref36">
                Grant C, Rahman F, Piekarz R, et al. Romidepsin: a new therapy for cutaneous T-cell lymphoma and a
                potential therapy for solid tumors. Expert Rev Anticancer Ther. 2010;10(7):997-1008.
              </li>
              <li id="ref37">
                Olsen EA, Kim YH, Kuzel TM, et al. Phase IIb multicenter trial of vorinostat in patients with
                persistent, progressive, or treatment refractory cutaneous T-cell lymphoma. J Clin Oncol.
                2007;25(21):3109-3115.
              </li>
            </ol>
          </div>

          {/* Back to top link */}
          <div className="mt-8 text-center">
            <Button variant="link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Back to top
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
