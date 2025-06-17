"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileDown, FileText, Download } from "lucide-react"

export default function NoteTemplatesSection() {
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null)

  // Function to download note templates
  const downloadTemplate = async (templateId: string, title: string) => {
    setDownloadingTemplate(templateId)
    try {
      const link = document.createElement('a')
      link.href = `/templates/${templateId}.docx`
      link.download = `${title}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading template:', error)
      alert('Error downloading template. Please try again.')
    } finally {
      setDownloadingTemplate(null)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
        <div className="mb-6">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Documentation & Resources
        </h1>

        <div className="space-y-8">
          {/* CTCL Note Templates Section */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> CTCL Note Templates
              </CardTitle>
              <CardDescription>Standardized templates for CTCL clinical documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4 border border-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Initial CTCL Evaluation Note Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive template for documenting first-time CTCL evaluations
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => downloadTemplate('initial-evaluation', 'Initial CTCL Evaluation Note Template')}
                      disabled={downloadingTemplate === 'initial-evaluation'}
                    >
                      {downloadingTemplate === 'initial-evaluation' ? (
                        <Download className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <FileDown className="mr-1 h-4 w-4" />
                      )}
                      <span>Download</span>
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border border-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">CTCL Follow-up Visit Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Structured template for routine follow-up visits for CTCL patients
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => downloadTemplate('follow-up-visit', 'CTCL Follow-up Visit Template')}
                      disabled={downloadingTemplate === 'follow-up-visit'}
                    >
                      {downloadingTemplate === 'follow-up-visit' ? (
                        <Download className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <FileDown className="mr-1 h-4 w-4" />
                      )}
                      <span>Download</span>
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border border-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">CTCL Staging Documentation</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Template for comprehensive TNMB staging and disease assessment
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => downloadTemplate('staging-documentation', 'CTCL Staging Documentation Template')}
                      disabled={downloadingTemplate === 'staging-documentation'}
                    >
                      {downloadingTemplate === 'staging-documentation' ? (
                        <Download className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <FileDown className="mr-1 h-4 w-4" />
                      )}
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
                      <h4 className="font-medium">Physical Examination:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Body surface area affected: [% BSA]
                        <br />- Lesion types: [patches/plaques/tumors]
                        <br />- Distribution pattern: [sun-exposed vs protected areas]
                        <br />- Lymph node examination: [normal/enlarged - describe]
                        <br />- Hepatosplenomegaly: [present/absent]
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Assessment:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Diagnosis: [MF/SS/other CTCL variant]
                        <br />- TNMB staging: [T_, N_, M_, B_]
                        <br />- Clinical stage: [IA, IB, IIA, IIB, III, IVA, IVB]
                        <br />- Disease burden: [mSWAT score if available]
                        <br />- Risk stratification: [low/intermediate/high risk]
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Plan:</h4>
                      <p className="text-sm text-muted-foreground">
                        - Diagnostic workup: [additional biopsies, blood tests, imaging]
                        <br />- Treatment plan: [specific therapies with dosing and schedule]
                        <br />- Monitoring plan: [laboratory studies, imaging frequency]
                        <br />- Patient education: [materials provided, counseling topics]
                        <br />- Follow-up: [timing and parameters to monitor]
                        <br />- Supportive care: [symptom management, skin care]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
