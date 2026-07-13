"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer } from "lucide-react"

type HandoutType = "biopsy" | "referral"

const CONTENT: Record<
  HandoutType,
  { title: string; intro: string; sections: { heading: string; body: string }[] }
> = {
  biopsy: {
    title: "Understanding Your Skin Biopsy",
    intro:
      "Your dermatologist has recommended a small skin biopsy. This is a routine, precautionary step to get a clearer answer about a rash that has been persistent or slow to improve — it does not mean you have been diagnosed with anything serious.",
    sections: [
      {
        heading: "Why a biopsy?",
        body: "Some skin conditions look alike to the eye but behave differently under the microscope. A biopsy lets a specialist pathologist examine a tiny sample of skin so your care team can choose the right treatment with confidence.",
      },
      {
        heading: "What to expect",
        body: "The area is numbed with a small injection, and a sample a few millimeters wide is taken. It usually takes only a few minutes. You may have a small stitch and mild soreness for a day or two. Results typically take one to two weeks.",
      },
      {
        heading: "Before your biopsy",
        body: "If you have been using a steroid cream or ointment on the area, your clinician may ask you to stop it for a couple of weeks beforehand, because it can affect the accuracy of the result.",
      },
      {
        heading: "Questions to ask your clinician",
        body: "What are you looking for? When and how will I get results? What are the next steps depending on what you find? Is there anything I should do to care for the biopsy site?",
      },
    ],
  },
  referral: {
    title: "Understanding Your Specialist Referral",
    intro:
      "Your dermatologist is referring you to a specialist who focuses on skin conditions like yours. A referral is a precautionary step to make sure you get expert input — it is a normal part of thorough care, not a cause for alarm.",
    sections: [
      {
        heading: "Why a referral?",
        body: "Specialists in cutaneous (skin) lymphoma and dermatologic oncology see these conditions often and can confirm the diagnosis, complete any additional tests, and tailor a treatment plan. Getting the right expertise early leads to the best outcomes.",
      },
      {
        heading: "What to bring",
        body: "Bring a list of your current medications, any previous biopsy or lab results you have, and photos of your skin over time if you have them. It also helps to note what treatments you have already tried and how your skin responded.",
      },
      {
        heading: "What to expect",
        body: "The specialist will review your history, examine your skin, and may recommend additional blood tests or imaging to understand the full picture. Many people are reassured after this visit; others begin a treatment plan tailored to them.",
      },
      {
        heading: "Questions to ask",
        body: "What is the diagnosis, or what are we ruling out? What tests do I need and why? What are my treatment options? How will we monitor my skin over time?",
      },
    ],
  },
}

export default function PatientHandoutPage() {
  const searchParams = useSearchParams()
  const initial = (searchParams.get("type") as HandoutType) || "biopsy"
  const [type, setType] = useState<HandoutType>(initial === "referral" ? "referral" : "biopsy")
  const content = CONTENT[type]

  return (
    <main className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant={type === "biopsy" ? "default" : "outline"} size="sm" onClick={() => setType("biopsy")}>
              Biopsy
            </Button>
            <Button variant={type === "referral" ? "default" : "outline"} size="sm" onClick={() => setType("referral")}>
              Referral
            </Button>
            <Button size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>
        </div>

        <article className="rounded-lg border bg-white p-8 print:border-0 print:p-0">
          <header className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="mt-2 text-muted-foreground">{content.intro}</p>
          </header>

          <div className="space-y-5">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold">{section.heading}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>

          <footer className="mt-8 border-t pt-4 text-sm text-muted-foreground">
            <p className="mb-4">
              This handout is general information and does not replace advice from your own care team. Please contact
              your clinic with any questions or concerns.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-6 border-b border-dashed" />
                <span className="text-xs">Clinic / provider</span>
              </div>
              <div>
                <div className="mb-6 border-b border-dashed" />
                <span className="text-xs">Contact / follow-up date</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  )
}
