import { StagingTool } from "@/components/clinical-support/staging-tool"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, HelpCircle, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClinicalSupportPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">CTCL Staging Tool</h1>
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-800">
              <HelpCircle className="mr-2 h-5 w-5" /> About This Tool
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <p className="mb-2">
              This staging tool uses the official ISCL/EORTC TNMB classification system for Mycosis Fungoides and Sézary
              Syndrome as endorsed by the Cutaneous Lymphoma Foundation.
            </p>
            <div className="flex items-center mt-3">
              <BookOpen className="h-4 w-4 mr-2" />
              <a
                href="https://www.clfoundation.org/staging-cutaneous-t-cell-lymphoma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                View official staging information from the Cutaneous Lymphoma Foundation
              </a>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tool" className="w-full">
          <TabsList className="grid w-full grid-cols-1 h-12">
            <TabsTrigger
              value="tool"
              className="w-full h-full px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-sm"
            >
              Interactive Staging Tool
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tool" className="pt-6">
            <StagingTool />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
