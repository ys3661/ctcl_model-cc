"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileDown, FileText, Download, Bot, ExternalLink } from "lucide-react"

export default function NoteTemplatesSection() {
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null)
  
  // Function to download note templates
  const downloadTemplate = async (templateId: string, title: string) => {
    setDownloadingTemplate(templateId)
    try {
      const link = document.createElement("a")
      link.href = `/templates/${templateId}.docx`
      link.download = `${title}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading template:", error)
      alert("Error downloading template. Please try again.")
    } finally {
      setDownloadingTemplate(null)
    }
  }

  // Function to navigate to automation tool
  const navigateToAutomationTool = () => {
    // Replace with your actual route/URL to the Medical Form Automation Tool
    window.location.href = "/medical-form-automation"
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
          {/* Medical Form Automation Tool Section */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50/50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-green-600" /> Medical Form Automation Tool
              </CardTitle>
              <CardDescription>AI-powered tool for automated medical form generation and processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div>
                  <h3 className="font-medium mb-1 text-green-800">Automated Form Processing</h3>
                  <p className="text-sm text-green-700 mb-2">
                    Streamline your medical documentation workflow with intelligent form automation
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Auto-populate patient information</li>
                    <li>• Generate standardized reports</li>
                    <li>• Integrate with existing templates</li>
                  </ul>
                </div>
                <Button
                  onClick={navigateToAutomationTool}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center whitespace-nowrap"
                >
                  Launch Tool
                </Button>
              </div>
            </CardContent>
          </Card>

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
                      className="flex items-center bg-transparent"
                      onClick={() => downloadTemplate("initial-evaluation", "Initial CTCL Evaluation Note Template")}
                      disabled={downloadingTemplate === "initial-evaluation"}
                    >
                      {downloadingTemplate === "initial-evaluation" ? (
                        <Download className="mr-1 h-4 w-4 animate-spin" />
                      ) : (
                        <FileDown className="mr-1 h-4 w-4" />
                      )}
                      <span>Download</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
