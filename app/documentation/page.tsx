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
  )
}
