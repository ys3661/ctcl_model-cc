import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calculator,
  FlaskConical,
  Send,
  Layers,
  Activity,
  MapPin,
  FileText,
  ClipboardList,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "Clinical Tools | CTCL Insight",
  description: "Point-of-care tools for evaluating, staging, documenting, and following cutaneous T-cell lymphoma.",
}

const TOOLS = [
  {
    href: "/calculator",
    icon: Calculator,
    title: "Risk Calculator",
    description: "Weighted CTCL risk score with a copy-paste assessment & plan note.",
    color: "bg-blue-600",
  },
  {
    href: "/biopsy-requisition",
    icon: FlaskConical,
    title: "Biopsy Requisition Builder",
    description: "Rule-out-MF clinical history, IHC panel, and TCR clonality request.",
    color: "bg-rose-600",
  },
  {
    href: "/specialist-referral",
    icon: Send,
    title: "Referral Routing",
    description: "Urgent vs. routine vs. observe — and what to send with the patient.",
    color: "bg-amber-600",
  },
  {
    href: "/clinical-support",
    icon: Layers,
    title: "TNMB Stager",
    description: "Interactive ISCL/EORTC stage calculator plus the full reference.",
    color: "bg-indigo-600",
  },
  {
    href: "/mswat",
    icon: Activity,
    title: "mSWAT / BSA",
    description: "Quantify skin burden at baseline and track treatment response.",
    color: "bg-emerald-600",
  },
  {
    href: "/lesion-tracker",
    icon: MapPin,
    title: "Lesion Tracker",
    description: "Map lesions on a body diagram and follow them with serial photos.",
    color: "bg-violet-600",
  },
  {
    href: "/patient-handout",
    icon: FileText,
    title: "Patient Handouts",
    description: "Printable, reassuring explanations of a biopsy or referral.",
    color: "bg-teal-600",
  },
  {
    href: "/documentation",
    icon: ClipboardList,
    title: "Documentation",
    description: "Note templates and the EPIC assessment form helper.",
    color: "bg-slate-600",
  },
]

export default function ToolsPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Clinical Tools</h1>
          <p className="text-muted-foreground mt-1">
            Point-of-care aids for evaluating, staging, documenting, and following CTCL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/40">
                <CardContent className="flex h-full flex-col gap-3 p-5">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tool.color}`}>
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold">{tool.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
