import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FlaskConical, Send, MapPin, FileText } from "lucide-react"

const ACTIONS = [
  {
    href: "/biopsy-requisition",
    icon: FlaskConical,
    title: "Build the biopsy requisition",
    description:
      "Generate a rule-out-MF clinical history with the right IHC panel and TCR clonality request so pathology applies the correct criteria.",
  },
  {
    href: "/specialist-referral",
    icon: Send,
    title: "Route the referral",
    description: "Check for red flags to decide between urgent, routine, or observe — and see what to send with the patient.",
  },
  {
    href: "/lesion-tracker",
    icon: MapPin,
    title: "Track the lesions",
    description: "Map lesions and record baseline photos so you can compare over time while the workup proceeds.",
  },
  {
    href: "/patient-handout",
    icon: FileText,
    title: "Give the patient a handout",
    description: "Print a reassuring explanation of why a biopsy or referral is a precautionary step.",
  },
]

export default function NextSteps() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/calculator">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Risk Calculator
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">Next Steps for High-Risk CTCL Assessment</h1>
        <p className="text-muted-foreground mb-8">
          A high-risk result warrants tissue diagnosis. A 4&ndash;6 mm punch biopsy of the thickest lesion is
          recommended&nbsp;&mdash; ideally after the patient has been off topical steroids for 2&ndash;4 weeks.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {ACTIONS.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/40">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <action.icon className="mr-2 h-5 w-5 text-blue-600" />
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
