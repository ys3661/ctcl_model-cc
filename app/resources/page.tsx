"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, BookOpen, MapPin, FileDown, ArrowUp, Building, Bookmark, Printer } from "lucide-react"
import Link from "next/link"

// Embedded document data
const embeddedDocuments = {
  "geskin-regimen": {
    title: "GeSkin Care Routine for Xerosis",
    description: "Specialized skincare regimen involving nightly dilute vinegar soaks and emollient application to preserve skin barrier integrity",
    category: "Self-Care",
    content: `The GeSkin Regimen
A specialized skincare regimen involving nightly dilute vinegar soaks
and emollient application to preserve skin barrier integrity.

STEP 01 - Prepare
Fill a clean bathtub, with warm water (body temperature: 98-100°F) and 1-2 cups of 1% white table vinegar.

STEP 02 - Soak
Soak in bathtub, with water up to neck, for at least 20 minutes. Make sure to keep water warm.

STEP 03 - Dry
Gently pat skin dry with a clean towel. Keep skin damp and do not rub skin.

STEP 04 - Apply
Apply a bland emollient +/- steroid ointment to the skin. If applying a steroid, a staggered regimen is recommended: one week on, one week off. Apply emollient +/- steroid twice daily (once in the morning and once at night after vinegar soaks).

STEP 05 - Cover
Following application, cover skin with plastic wrap followed by cotton pajamas. If the skin feels cold, consider warming up the bed using a heated blanket.`
  },
  "ctcl-template": {
    title: "CTCL Clinical Documentation Template",
    description: "Comprehensive initial visit template for healthcare providers treating cutaneous T-cell lymphoma patients",
    category: "Clinical Tools",
    content: `Division of Cutaneous Oncology - Initial Visit Template

This comprehensive template includes:

• History of Present Illness documentation
• Registry data collection including:
  - Date of onset and initial symptoms
  - Initial lesion types (patch, plaque, tumor, erythroderma)
  - Initial quantity and location of lesions
  - Prior diagnoses and treatments
  - Disease course progression

• Patient History sections:
  - Allergies, Past Medical/Surgical History
  - Family History, Social History
  - Review of Systems

• Physical Examination:
  - Complete Total Body Skin Examination
  - mSWAT scoring system for disease assessment
  - Body surface area calculations by region

• Diagnostic Data sections:
  - Laboratory results
  - Flow cytometry findings
  - Pathology reports
  - Imaging studies

• Assessment and Treatment Planning
• CLIPI Prognostic Index calculations for both early and late stage disease

This template supports structured documentation for mycosis fungoides and Sezary syndrome patients with standardized staging and prognostic assessments.`
  }
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Resources", icon: <Bookmark className="h-4 w-4" /> },
    { id: "organizations", name: "Organizations", icon: <Building className="h-4 w-4" /> },
    { id: "education", name: "Educational", icon: <BookOpen className="h-4 w-4" /> },
    { id: "specialists", name: "Specialists", icon: <MapPin className="h-4 w-4" /> },
    { id: "handouts", name: "Patient Handouts", icon: <Printer className="h-4 w-4" /> },
  ]

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Filter resources based on search term and active category
  const filterResources = (category: string) => {
    return activeCategory === "all" || activeCategory === category
  }

  // Search functionality
  const matchesSearch = (text: string) => {
    return true
  }

  // Download embedded document function
  const downloadEmbeddedDocument = (docId: string) => {
    const doc = embeddedDocuments[docId as keyof typeof embeddedDocuments]
    if (doc) {
      const element = document.createElement("a")
      const file = new Blob([doc.content], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${doc.title.replace(/\s+/g, '_')}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      URL.revokeObjectURL(element.href)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
        <div ref={topRef} className="max-w-5xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg mb-8 border border-blue-200 shadow-lg">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CTCL Resources
            </h1>
            <p className="text-blue-700 mb-6 max-w-3xl">
              Comprehensive resources for patients and healthcare providers dealing with Cutaneous T-Cell Lymphoma. Find
              organizations, educational materials, support groups, and more.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-1.5"
                >
                  {category.icon}
                  {category.name}
                  {category.id !== "all" && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.id === "organizations"
                        ? "4"
                        : category.id === "education"
                          ? "2"
                          : category.id === "specialists"
                            ? "1"
                            : category.id === "handouts"
                              ? "8"
                              : ""}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-8">
            {/* Organizations Section */}
            {filterResources("organizations") && (
              <section className="space-y-4" id="organizations">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold">Organizations</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Cutaneous Lymphoma Foundation",
                      description: "The primary patient advocacy organization for cutaneous lymphomas",
                      url: "https://www.clfoundation.org/",
                      badge: "Recommended",
                    },
                    {
                      title: "Leukemia & Lymphoma Society",
                      description: "Offers information and support services for patients with blood cancers",
                      url: "https://www.lls.org/",
                    },
                    {
                      title: "Lymphoma Research Foundation",
                      description:
                        "Dedicated to funding innovative lymphoma research and providing information and support to patients and caregivers",
                      url: "https://www.lymphoma.org/",
                    },
                    {
                      title: "United States Cutaneous Lymphoma Consortium",
                      description:
                        "Professional organization dedicated to improving the quality of life and prognosis for patients with cutaneous lymphomas",
                      url: "https://www.usclc.org/",
                    },
                  ]
                    .filter((item) => matchesSearch(item.title) || matchesSearch(item.description))
                    .map((org, index) => (
                      <Card
                        key={index}
                        className="transition-all hover:shadow-xl duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{org.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{org.description}</p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={org.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              <span>Visit Website</span>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* Educational Resources Section */}
            {filterResources("education") && (
              <section className="space-y-4" id="education">
                <div className="flex items-center gap-2 border-b pb-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-2xl font-bold">Educational Resources</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "NCCN Guidelines for Patients: T-Cell Lymphomas",
                      description: "Patient-friendly version of the NCCN Clinical Practice Guidelines",
                      url: "https://www.nccn.org/patients/guidelines/content/PDF/ctcl-patient.pdf",
                      type: "PDF",
                    },
                    {
                      title: "Cutaneous Lymphoma Foundation Educational Videos",
                      description: "Video presentations from experts on various aspects of CTCL",
                      url: "https://www.youtube.com/watch?v=NdMDwX48Mjg",
                      type: "Videos",
                    },
                  ]
                    .filter((item) => matchesSearch(item.title) || matchesSearch(item.description))
                    .map((resource, index) => (
                      <Card
                        key={index}
                        className="transition-all hover:shadow-xl duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{resource.title}</h3>
                            <Badge className="ml-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                              {resource.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              <span>
                                {resource.type === "PDF"
                                  ? "Download PDF"
                                  : resource.type === "Videos"
                                    ? "Watch Videos"
                                    : "View Guidelines"}
                              </span>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* Find a Specialist Section */}
            {filterResources("specialists") && (
              <section className="space-y-4" id="specialists">
                <div className="flex items-center gap-2 border-b pb-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <h2 className="text-2xl font-bold">Find a Specialist</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      title: "Cutaneous Lymphoma Foundation Specialist Directory",
                      description: "Comprehensive directory of CTCL treatment centers and clinical trials worldwide",
                      url: "https://www.clfoundation.org/directory",
                    },
                  ]
                    .filter((item) => matchesSearch(item.title) || matchesSearch(item.description))
                    .map((specialist, index) => (
                      <Card
                        key={index}
                        className="transition-all hover:shadow-xl duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200"
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-2">{specialist.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{specialist.description}</p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={specialist.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              <span>Find a Specialist</span>
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* Patient Education and Handouts Section */}
            {filterResources("handouts") && (
              <section className="space-y-4" id="handouts">
                <div className="flex items-center gap-2 border-b pb-2">
                  <Printer className="h-5 w-5 text-purple-600" />
                  <h2 className="text-2xl font-bold">Patient Education & Handouts</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Regular handouts */}
                  {[
                    {
                      title: "Understanding CTCL: A Patient's Guide",
                      description: "Comprehensive overview of CTCL for newly diagnosed patients",
                      category: "Overview",
                      url: "https://www.clfoundation.org/sites/default/files/2017-08/2013_guide.pdf",
                      isEmbedded: false,
                    },
                    {
                      title: "CTCL vs. Other Skin Conditions",
                      description: "How CTCL differs from eczema, psoriasis, and other common skin conditions",
                      category: "Diagnosis",
                      url: "#",
                      isEmbedded: false,
                    },
                    {
                      title: "CTCL Treatment Options Overview",
                      description: "Comprehensive guide to available treatments for different stages of CTCL",
                      category: "Treatment",
                      url: "#",
                      isEmbedded: false,
                    },
                    {
                      title: "Managing Itching and Discomfort",
                      description: "Strategies for relieving pruritus and other symptoms",
                      category: "Symptom Management",
                      url: "#",
                      isEmbedded: false,
                    },
                    {
                      title: "Emotional Well-being with CTCL",
                      description: "Coping strategies and resources for emotional support",
                      category: "Support",
                      url: "#",
                      isEmbedded: false,
                    },
                  ]
                    .concat(
                      // Add embedded documents
                      Object.entries(embeddedDocuments).map(([id, doc]) => ({
                        title: doc.title,
                        description: doc.description,
                        category: doc.category,
                        url: "#",
                        isEmbedded: true,
                        embedId: id,
                      }))
                    )
                    .filter(
                      (item) =>
                        matchesSearch(item.title) || matchesSearch(item.description) || matchesSearch(item.category),
                    )
                    .map((handout, index) => (
                      <Card
                        key={index}
                        className={`transition-all hover:shadow-xl duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200 ${
                          handout.isEmbedded ? 'ring-2 ring-green-200 border-green-300' : ''
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{handout.title}</h3>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="ml-2">
                                {handout.category}
                              </Badge>
                              {handout.isEmbedded && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  Available
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{handout.description}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handout.isEmbedded ? () => downloadEmbeddedDocument(handout.embedId!) : undefined}
                            asChild={!handout.isEmbedded}
                          >
                            {handout.isEmbedded ? (
                              <>
                                <FileDown className="mr-1 h-4 w-4" />
                                <span>Download Document</span>
                              </>
                            ) : (
                              <a href={handout.url} target="_blank" rel="noopener noreferrer">
                                <FileDown className="mr-1 h-4 w-4" />
                                <span>Download PDF</span>
                              </a>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-md mt-6 shadow-lg">
                  <h3 className="text-lg font-medium mb-2 text-amber-800">Additional Patient Resources</h3>
                  <p className="text-amber-700 mb-2">For more educational materials and resources:</p>
                  <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                    <Link href="/documentation">View Clinical Documentation Templates</Link>
                  </Button>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Back to top button */}
        {showScrollTop && (
          <Button
            variant="secondary"
            size="icon"
            className="fixed bottom-6 right-6 rounded-full shadow-md"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
    </main>
  )
}
