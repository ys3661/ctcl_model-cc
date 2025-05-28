"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link"
import { ArrowLeft, FileDown, FileText } from "lucide-react"

// Define handout types for better type safety
type HandoutCategory = "diagnosis" | "treatment" | "symptoms" | "daily-care"
type Handout = {
  id: string
  title: string
  description: string
  category: HandoutCategory
  previewContent: React.ReactNode
}

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | HandoutCategory>("all")
  const [previewHandout, setPreviewHandout] = useState<Handout | null>(null)

  // Define all handouts with their preview content
  const handouts: Handout[] = [
    {
      id: "understanding-ctcl",
      title: "Understanding CTCL: A Patient's Guide",
      description: "Comprehensive overview of CTCL for newly diagnosed patients",
      category: "diagnosis",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Understanding CTCL: A Patient's Guide</h2>
          <p>
            Cutaneous T-cell lymphoma (CTCL) is a rare type of cancer that affects the skin. This guide will help you
            understand your diagnosis and what to expect.
          </p>

          <h3 className="text-lg font-semibold mt-4">What is CTCL?</h3>
          <p>
            CTCL is a type of non-Hodgkin lymphoma that primarily affects the skin. It occurs when certain white blood
            cells called T-lymphocytes become cancerous and affect the skin.
          </p>

          <h3 className="text-lg font-semibold mt-4">Common Types of CTCL</h3>
          <ul className="list-disc pl-6">
            <li>Mycosis Fungoides (MF) - The most common type of CTCL</li>
            <li>Sézary Syndrome (SS) - A more advanced form that affects both the skin and blood</li>
            <li>Primary Cutaneous CD30+ Lymphoproliferative Disorders</li>
            <li>Other rare subtypes</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "ctcl-vs-other",
      title: "CTCL vs. Other Skin Conditions",
      description: "How CTCL differs from eczema, psoriasis, and other common skin conditions",
      category: "diagnosis",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">CTCL vs. Other Skin Conditions</h2>
          <p>
            CTCL can sometimes be mistaken for other common skin conditions. This guide helps explain the differences.
          </p>

          <h3 className="text-lg font-semibold mt-4">CTCL vs. Eczema</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-50 p-3 rounded">
              <h4 className="font-medium">CTCL</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Persistent patches in sun-protected areas</li>
                <li>Doesn't respond well to typical eczema treatments</li>
                <li>May have fine scaling</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-3 rounded">
              <h4 className="font-medium">Eczema</h4>
              <ul className="list-disc pl-5 text-sm">
                <li>Often in flexural areas</li>
                <li>Responds to topical steroids</li>
                <li>Often has a personal or family history of atopy</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "treatment-options",
      title: "CTCL Treatment Options Overview",
      description: "Comprehensive guide to available treatments for different stages of CTCL",
      category: "treatment",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">CTCL Treatment Options Overview</h2>
          <p>
            Treatment for CTCL depends on the type and stage of the disease. This guide provides an overview of
            available options.
          </p>

          <h3 className="text-lg font-semibold mt-4">Skin-Directed Therapies</h3>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-medium">Topical Corticosteroids:</span> Anti-inflammatory medications applied
              directly to the skin
            </li>
            <li>
              <span className="font-medium">Topical Retinoids:</span> Vitamin A derivatives that can help control cell
              growth
            </li>
            <li>
              <span className="font-medium">Phototherapy:</span> Treatment with ultraviolet light (UVB or PUVA)
            </li>
            <li>
              <span className="font-medium">Topical Chemotherapy:</span> Medications like nitrogen mustard or carmustine
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Systemic Therapies</h3>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-medium">Retinoids:</span> Oral medications that regulate cell growth
            </li>
            <li>
              <span className="font-medium">Interferons:</span> Proteins that boost the immune system
            </li>
            <li>
              <span className="font-medium">Targeted Therapies:</span> Medications that target specific cancer cells
            </li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "topical-treatments",
      title: "Topical Treatments Guide",
      description: "Instructions for applying topical medications and managing side effects",
      category: "treatment",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Topical Treatments Guide</h2>
          <p>
            Topical treatments are applied directly to the skin and are often the first line of treatment for
            early-stage CTCL.
          </p>

          <h3 className="text-lg font-semibold mt-4">Application Instructions</h3>
          <ol className="list-decimal pl-6">
            <li>Wash hands thoroughly before and after application</li>
            <li>Apply a thin layer to affected areas only, unless directed otherwise</li>
            <li>Allow the medication to dry before covering with clothing</li>
            <li>Follow your doctor's instructions regarding frequency and duration</li>
          </ol>

          <h3 className="text-lg font-semibold mt-4">Common Side Effects</h3>
          <ul className="list-disc pl-6">
            <li>Skin irritation or redness</li>
            <li>Burning or stinging sensation</li>
            <li>Dryness or peeling</li>
            <li>Temporary worsening of symptoms</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "symptoms-guide",
      title: "CTCL Symptoms and What to Expect",
      description: "Guide to common symptoms and their management",
      category: "symptoms",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">CTCL Symptoms and What to Expect</h2>
          <p>
            CTCL can cause various symptoms that may change over time. This guide helps you understand what to expect.
          </p>

          <h3 className="text-lg font-semibold mt-4">Common Symptoms</h3>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-medium">Skin patches:</span> Flat, red, scaly areas that may be itchy
            </li>
            <li>
              <span className="font-medium">Plaques:</span> Raised, thickened areas of skin
            </li>
            <li>
              <span className="font-medium">Tumors:</span> Raised lumps or nodules
            </li>
            <li>
              <span className="font-medium">Itching (pruritus):</span> Can range from mild to severe
            </li>
            <li>
              <span className="font-medium">Skin pain or tenderness</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">When to Contact Your Doctor</h3>
          <ul className="list-disc pl-6">
            <li>New or worsening symptoms</li>
            <li>Severe or uncontrolled itching</li>
            <li>Signs of infection (increased redness, warmth, swelling, discharge)</li>
            <li>Symptoms that interfere with daily activities or sleep</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "managing-itching",
      title: "Managing Itching and Discomfort",
      description: "Strategies for relieving pruritus and other symptoms",
      category: "symptoms",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Managing Itching and Discomfort</h2>
          <p>
            Itching (pruritus) is one of the most common and distressing symptoms of CTCL. This guide provides
            strategies to help manage it.
          </p>

          <h3 className="text-lg font-semibold mt-4">Skin Care Tips</h3>
          <ul className="list-disc pl-6">
            <li>Use lukewarm (not hot) water for bathing</li>
            <li>Limit baths or showers to 10-15 minutes</li>
            <li>Use mild, fragrance-free soaps or cleansers</li>
            <li>Pat skin dry gently rather than rubbing</li>
            <li>Apply moisturizer immediately after bathing</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Itch Relief Strategies</h3>
          <ul className="list-disc pl-6">
            <li>Cold compresses can provide temporary relief</li>
            <li>Wear loose-fitting, cotton clothing</li>
            <li>Keep nails short to prevent damage from scratching</li>
            <li>Use a humidifier in dry environments</li>
            <li>Practice stress reduction techniques</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "skin-care",
      title: "Daily Skin Care Routine",
      description: "Recommended skin care practices for CTCL patients",
      category: "daily-care",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Daily Skin Care Routine</h2>
          <p>Proper skin care is essential for managing CTCL. This guide outlines a recommended daily routine.</p>

          <h3 className="text-lg font-semibold mt-4">Morning Routine</h3>
          <ol className="list-decimal pl-6">
            <li>Gentle cleansing with a mild, fragrance-free cleanser</li>
            <li>Apply any morning medications as prescribed</li>
            <li>Apply a fragrance-free moisturizer</li>
            <li>Use broad-spectrum sunscreen (SPF 30+) on exposed skin</li>
          </ol>

          <h3 className="text-lg font-semibold mt-4">Evening Routine</h3>
          <ol className="list-decimal pl-6">
            <li>Gentle cleansing to remove the day's impurities</li>
            <li>Apply evening medications as prescribed</li>
            <li>Apply a richer moisturizer or emollient for overnight hydration</li>
          </ol>

          <h3 className="text-lg font-semibold mt-4">Recommended Products</h3>
          <ul className="list-disc pl-6">
            <li>Fragrance-free, hypoallergenic cleansers</li>
            <li>Ceramide-containing moisturizers</li>
            <li>Mineral-based sunscreens</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
    {
      id: "emotional-wellbeing",
      title: "Emotional Well-being with CTCL",
      description: "Coping strategies and resources for emotional support",
      category: "daily-care",
      previewContent: (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Emotional Well-being with CTCL</h2>
          <p>
            Living with CTCL can affect your emotional health. This guide offers strategies for maintaining emotional
            well-being.
          </p>

          <h3 className="text-lg font-semibold mt-4">Common Emotional Responses</h3>
          <ul className="list-disc pl-6">
            <li>Anxiety about diagnosis and treatment</li>
            <li>Frustration with chronic symptoms</li>
            <li>Concerns about appearance</li>
            <li>Worry about the future</li>
            <li>Feelings of isolation</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Coping Strategies</h3>
          <ul className="list-disc pl-6">
            <li>Learn about your condition to reduce uncertainty</li>
            <li>Connect with others who have CTCL through support groups</li>
            <li>Practice stress reduction techniques like meditation or deep breathing</li>
            <li>Maintain regular activities and social connections</li>
            <li>Consider speaking with a mental health professional</li>
          </ul>

          <p className="text-sm text-muted-foreground mt-6">
            This is a preview of the full document. Download the complete guide for more information.
          </p>
        </div>
      ),
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "diagnosis", label: "Diagnosis" },
    { id: "treatment", label: "Treatment" },
    { id: "symptoms", label: "Symptoms" },
    { id: "daily-care", label: "Daily Care" },
  ]

  const shouldShowCategory = (categoryId: string) => {
    return activeCategory === "all" || activeCategory === categoryId
  }

  // Helper function to get handouts for a specific category
  const getHandoutsByCategory = (category: HandoutCategory) => {
    return handouts.filter((handout) => handout.category === category)
  }

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

        <h1 className="text-3xl font-bold mb-8">Documentation & Resources</h1>

        <div className="space-y-8">
          {/* CTCL Note Templates Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> CTCL Note Templates
              </CardTitle>
              <CardDescription>Standardized templates for CTCL clinical documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 border border-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Initial CTCL Evaluation Note Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive template for documenting first-time CTCL evaluations
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center" asChild>
                      <Link href="/documentation/templates/initial-evaluation">
                        <FileDown className="mr-1 h-4 w-4" />
                        <span>View Template</span>
                      </Link>
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border border-muted">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">CTCL Follow-up Visit Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Structured template for routine follow-up visits for CTCL patients
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <FileDown className="mr-1 h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Sample CTCL Clinical Note Structure</h3>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Chief Complaint / Reason for Visit:</h4>
                      <p className="text-sm text-muted-foreground">
                        [Patient name] is a [age]-year-old [gender] presenting for [initial evaluation/follow-up] of
                        suspected/confirmed cutaneous T-cell lymphoma.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">History of Present Illness:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Duration of skin lesions: [X months/years]
                        <br />- Distribution: [describe areas affected]
                        <br />- Morphology: [patches/plaques/tumors/erythroderma]
                        <br />- Associated symptoms: [pruritus, pain, burning]
                        <br />- Previous treatments: [list with responses]
                        <br />- Previous biopsies: [dates and results]
                        <br />- Recent changes: [progression, new lesions, etc.]
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Assessment:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Diagnosis: [MF/SS/other CTCL variant]
                        <br />- TNMB staging: [T_, N_, M_, B_]
                        <br />- Clinical stage: [IA, IB, etc.]
                        <br />- Disease burden: [mSWAT score if available]
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Plan:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Diagnostic workup: [biopsies, blood tests, imaging]
                        <br />- Treatment plan: [specific therapies with dosing]
                        <br />- Patient education: [materials provided]
                        <br />- Follow-up: [timing and parameters to monitor]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewHandout !== null} onOpenChange={(open) => !open && setPreviewHandout(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>Preview of {previewHandout?.title}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-white rounded-md border">{previewHandout?.previewContent}</div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewHandout(null)}>
              Close
            </Button>
            <Button>
              <FileDown className="mr-1 h-4 w-4" />
              Download Full Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
